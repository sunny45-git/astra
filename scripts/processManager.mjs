import { execSync, spawn } from 'child_process';
import http from 'http';
import net from 'net';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

/**
 * Checks if a TCP port is available on a given host
 */
export function checkPortFree(port, host = '0.0.0.0') {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => {
      resolve(false);
    });
    server.once('listening', () => {
      server.once('close', () => resolve(true)).close();
    });
    server.listen(port, host);
  });
}

/**
 * Probes the /api/health endpoint of a running server
 */
export function probeAstraHealth(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const req = http.get(`http://${host}:${port}/api/health`, { timeout: 1500 }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json && (json.system?.includes('ASTRA') || json.status === 'online')) {
            resolve({ isAstra: true, data: json });
          } else {
            resolve({ isAstra: false });
          }
        } catch {
          resolve({ isAstra: false });
        }
      });
    });
    req.on('error', () => resolve({ isAstra: false }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ isAstra: false });
    });
  });
}

/**
 * Finds all PIDs listening on a specific port (Windows-compatible)
 */
export function getPidsForPort(port) {
  try {
    const output = execSync('netstat -ano -p tcp', { encoding: 'utf8' });
    const pids = new Set();
    const portStr = `:${port}`;

    for (const line of output.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('TCP')) continue;
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 5) {
        const localAddr = parts[1];
        const state = parts[3];
        const pid = parseInt(parts[parts.length - 1], 10);
        if (localAddr.endsWith(portStr) && !isNaN(pid) && pid > 0) {
          pids.add(pid);
        }
      }
    }
    return Array.from(pids);
  } catch {
    return [];
  }
}

/**
 * Checks if a PID belongs to this specific project directory (sunnyport)
 */
export function isProjectProcess(pid) {
  if (!pid || pid === process.pid) return false;
  try {
    const cmd = `powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter 'ProcessId = ${pid}' | Select-Object -ExpandProperty CommandLine"`;
    const result = execSync(cmd, { encoding: 'utf8', timeout: 3000 }).trim();
    if (!result) return false;
    const lowerResult = result.toLowerCase();
    const lowerRoot = PROJECT_ROOT.toLowerCase();
    return lowerResult.includes(lowerRoot) || lowerResult.includes('sunnyport');
  } catch {
    return false;
  }
}

/**
 * Cleanly terminates a process by PID on Windows or Unix
 */
export function killProcess(pid) {
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /pid ${pid} /T /F`, { stdio: 'ignore' });
    } else {
      process.kill(pid, 'SIGTERM');
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely cleans up stale orphan processes belonging ONLY to this project on key ports
 */
export async function cleanProjectOrphans() {
  const targetPorts = [5000, 5173, 5174, 5175];
  const cleaned = [];

  for (const port of targetPorts) {
    const pids = getPidsForPort(port);
    for (const pid of pids) {
      if (pid === process.pid) continue;
      // Safety check: ONLY terminate if it belongs to this project directory!
      if (isProjectProcess(pid)) {
        console.log(`[ASTRA Process Manager] Found stale project process PID ${pid} on port ${port}. Terminating cleanly...`);
        if (killProcess(pid)) {
          cleaned.push({ port, pid });
        }
      } else {
        console.log(`[ASTRA Process Manager] Port ${port} is used by external PID ${pid}. Leaving external process untouched.`);
      }
    }
  }

  // Small delay for OS socket cleanup
  if (cleaned.length > 0) {
    await new Promise((r) => setTimeout(r, 600));
  }
  return cleaned;
}

/**
 * Finds the first available port starting from startPort
 */
export async function findNextFreePort(startPort = 5000, maxAttempts = 30, host = '0.0.0.0') {
  for (let offset = 0; offset < maxAttempts; offset++) {
    const port = startPort + offset;
    const free = await checkPortFree(port, host);
    if (free) {
      return port;
    }
  }
  throw new Error(`Could not find an available port between ${startPort} and ${startPort + maxAttempts - 1}`);
}

