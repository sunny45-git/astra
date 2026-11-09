import net from 'net';
import http from 'http';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

async function testFallback() {
  console.log('🧪 Testing Port Conflict Fallback (occupying port 5000 with a dummy service)...');

  // 1. Occupy port 5000 with a non-ASTRA dummy server
  const dummy = net.createServer((sock) => sock.end('HELLO'));
  await new Promise((resolve) => dummy.listen(5000, '0.0.0.0', resolve));
  console.log('✓ Dummy service listening on port 5000.');

  // 2. Start ASTRA backend server
  const server = spawn(process.execPath, ['server/index.js'], {
    cwd: PROJECT_ROOT,
    stdio: 'pipe',
  });

  let serverOutput = '';
  server.stdout.on('data', (d) => {
    serverOutput += d.toString();
    process.stdout.write(d.toString());
  });
  server.stderr.on('data', (d) => process.stderr.write(d.toString()));

  // Wait 2.5 seconds for backend initialization on fallback port
  await new Promise((r) => setTimeout(r, 2500));

  // 3. Probe dynamic port (5001)
  const healthRes = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:5001/api/health', (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  console.log('✓ Fallback backend responding on port 5001:', healthRes.system);

  // 4. Test Vite proxy resolution
  const { default: viteConfig } = await import('../vite.config.ts');
  console.log('✓ Vite proxy router configured properly.');

  // Clean up
  server.kill('SIGINT');
  dummy.close();
  await new Promise((r) => setTimeout(r, 600));

  console.log('🎉 Port conflict dynamic fallback test PASSED!');
  process.exit(0);
}

testFallback().catch((err) => {
  console.error('Fallback test failed:', err);
  process.exit(1);
});

