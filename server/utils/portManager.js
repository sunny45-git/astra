import net from 'net';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const ACTIVE_SERVER_FILE = path.join(DATA_DIR, 'active_server.json');

// Ensure data dir exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Tests if a specific port is available for binding
 */
export function checkPortAvailable(port, host = '0.0.0.0') {
  return new Promise((resolve) => {
    const tester = net.createServer();
    tester.once('error', (err) => {
      resolve(false);
    });
    tester.once('listening', () => {
      tester.once('close', () => resolve(true)).close();
    });
    tester.listen(port, host);
  });
}

/**
 * Searches sequentially for an available port starting from preferredPort
 */
export async function findAvailablePort(preferredPort = 5000, maxAttempts = 25, host = '0.0.0.0') {
  for (let i = 0; i < maxAttempts; i++) {
    const candidate = preferredPort + i;
    const isFree = await checkPortAvailable(candidate, host);
    if (isFree) return candidate;
  }
  throw new Error(`No available ports found between ${preferredPort} and ${preferredPort + maxAttempts - 1}`);
}

/**
 * Probes the /api/health endpoint to see if an ASTRA instance is already answering
 */
export function probeHealth(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const req = http.get(`http://${host}:${port}/api/health`, { timeout: 1200 }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(Boolean(parsed && (parsed.system?.includes('ASTRA') || parsed.status === 'online')));
        } catch {
          resolve(false);
        }
      });
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

/**
 * Records the currently active server coordinates to a runtime discovery file
 */
export function saveActiveServer(port, host = 'localhost') {
  try {
    const payload = {
      port,
      host,
      url: `http://${host}:${port}`,
      pid: process.pid,
      startedAt: new Date().toISOString(),
    };
    fs.writeFileSync(ACTIVE_SERVER_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  } catch (err) {
    console.error('Warning: Could not write active_server.json:', err.message);
  }
}

/**
 * Clears the runtime discovery file on server shutdown
 */
export function clearActiveServer() {
  try {
    if (fs.existsSync(ACTIVE_SERVER_FILE)) {
      fs.unlinkSync(ACTIVE_SERVER_FILE);
    }
  } catch {}
}

