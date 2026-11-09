import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { cleanProjectOrphans, killProcess } from './processManager.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

let backendProcess = null;
let frontendProcess = null;
let isShuttingDown = false;

// Graceful cleanup of all spawned children
function cleanupChildren() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log('\n[ASTRA Dev Runner] Gracefully stopping dev services...');

  if (backendProcess && backendProcess.pid) {
    killProcess(backendProcess.pid);
    backendProcess = null;
  }

  if (frontendProcess && frontendProcess.pid) {
    killProcess(frontendProcess.pid);
    frontendProcess = null;
  }

  // Final check to ensure no orphans linger
  cleanProjectOrphans().catch(() => {});
  setTimeout(() => process.exit(0), 400);
}

// Register termination signals
process.on('SIGINT', cleanupChildren);
process.on('SIGTERM', cleanupChildren);
process.on('SIGHUP', cleanupChildren);
process.on('exit', () => cleanupChildren());

async function start() {
  console.log('\n======================================================');
  console.log('🌌 Starting ASTRA Development Environment');
  console.log('======================================================\n');

  // Step 1: Pre-clean any stale project orphans on Windows
  try {
    await cleanProjectOrphans();
  } catch (err) {
    console.warn('[ASTRA Dev Runner] Orphan check warning:', err.message);
  }

  // Step 2: Spawn Backend Process
  console.log('[ASTRA Dev Runner] Launching Backend API Server (Node/Express)...');
  backendProcess = spawn(process.execPath, ['server/index.js'], {
    cwd: PROJECT_ROOT,
    env: { ...process.env, FORCE_COLOR: '1' },
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  backendProcess.stdout.on('data', (data) => {
    process.stdout.write(`\x1b[35m[SERVER]\x1b[0m ${data.toString()}`);
  });

  backendProcess.stderr.on('data', (data) => {
    process.stderr.write(`\x1b[31m[SERVER ERROR]\x1b[0m ${data.toString()}`);
  });

  backendProcess.on('error', (err) => {
    console.error('\x1b[31m[ASTRA SERVER FAILED TO SPAWN]\x1b[0m', err.message);
    cleanupChildren();
  });

  backendProcess.on('exit', (code, signal) => {
    if (!isShuttingDown) {
      if (code !== 0 && code !== null) {
        console.error(`\x1b[31m[SERVER CRASHED]\x1b[0m Backend exited unexpectedly with code ${code}.`);
      }
      cleanupChildren();
    }
  });

  // Small delay to allow backend socket bind
  await new Promise((r) => setTimeout(r, 800));

  // Step 3: Spawn Frontend Vite Dev Server
  console.log('[ASTRA Dev Runner] Launching Frontend Client (Vite/React)...');
  const viteBinPath = path.join(PROJECT_ROOT, 'node_modules', 'vite', 'bin', 'vite.js');

  frontendProcess = spawn(process.execPath, [viteBinPath], {
    cwd: PROJECT_ROOT,
    env: { ...process.env, FORCE_COLOR: '1' },
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  frontendProcess.stdout.on('data', (data) => {
    process.stdout.write(`\x1b[36m[CLIENT]\x1b[0m ${data.toString()}`);
  });

  frontendProcess.stderr.on('data', (data) => {
    process.stderr.write(`\x1b[33m[CLIENT WARN]\x1b[0m ${data.toString()}`);
  });

  frontendProcess.on('error', (err) => {
    console.error('\x1b[31m[ASTRA CLIENT FAILED TO SPAWN]\x1b[0m', err.message);
    cleanupChildren();
  });

  frontendProcess.on('exit', (code) => {
    if (!isShuttingDown) {
      if (code !== 0 && code !== null) {
        console.error(`\x1b[33m[CLIENT STOPPED]\x1b[0m Frontend exited with code ${code}.`);
      }
      cleanupChildren();
    }
  });
}

start();
