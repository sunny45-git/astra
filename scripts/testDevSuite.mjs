import { spawn } from 'child_process';
import http from 'http';
import { cleanProjectOrphans } from './processManager.mjs';

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

function post(url, body) {
  return new Promise((resolve, reject) => {
    const jsonStr = JSON.stringify(body);
    const req = http.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(jsonStr),
      },
    }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.write(jsonStr);
    req.end();
  });
}

function getWithAuth(url, token) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function runSuite() {
  console.log('🧪 Starting ASTRA Diagnostic & Verification Suite...\n');

  // Pre-clean any stale orphans
  await cleanProjectOrphans();

  // Launch dev runner
  const dev = spawn('node', ['scripts/devRunner.mjs'], { stdio: 'pipe' });
  dev.stdout.on('data', (d) => process.stdout.write(d.toString()));
  dev.stderr.on('data', (d) => process.stderr.write(d.toString()));

  // Wait 4 seconds for full initialization
  await new Promise((r) => setTimeout(r, 4500));

  let passed = 0;
  let total = 0;

  async function check(name, fn) {
    total++;
    try {
      await fn();
      console.log(`\x1b[32m  ✓ PASS:\x1b[0m ${name}`);
      passed++;
    } catch (err) {
      console.error(`\x1b[31m  ✗ FAIL:\x1b[0m ${name} - ${err.message}`);
    }
  }

  // 1. Direct Backend Health Check
  await check('Backend Health Endpoint (Direct :5000/api/health)', async () => {
    const res = await get('http://127.0.0.1:5000/api/health');
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = JSON.parse(res.data);
    if (json.status !== 'online') throw new Error('Status not online');
  });

  // 2. Direct Public Data Check
  await check('Backend Public Data Endpoint (Direct :5000/api/public/data)', async () => {
    const res = await get('http://127.0.0.1:5000/api/public/data');
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = JSON.parse(res.data);
    if (!json.success || !json.data.profile) throw new Error('No profile data');
    if (json.data.profile.founderName !== 'Sunny Pendela') {
      throw new Error(`Expected founder Sunny Pendela, got ${json.data.profile.founderName}`);
    }
  });

  // 3. Frontend Vite Server Check
  await check('Frontend Vite Dev Server (:5173)', async () => {
    const res = await get('http://127.0.0.1:5173');
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.data.includes('html') && !res.data.includes('vite')) {
      throw new Error('Vite HTML response incomplete');
    }
  });

  // 4. Vite Reverse Proxy Check for Public API
  await check('Vite Reverse Proxy (:5173/api/public/data -> Backend)', async () => {
    const res = await get('http://127.0.0.1:5173/api/public/data');
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = JSON.parse(res.data);
    if (json.data.profile.name !== 'ASTRA') {
      throw new Error(`Expected brand ASTRA, got ${json.data.profile.name}`);
    }
  });

  // 5. Admin Authentication through Vite Proxy
  let authToken = null;
  await check('Admin Login via Proxy (:5173/api/auth/login)', async () => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@astra.dev';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AstraAdmin@2026';
    const res = await post('http://127.0.0.1:5173/api/auth/login', {
      email: adminEmail,
      password: adminPassword,
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}: ${res.data}`);
    const json = JSON.parse(res.data);
    if (!json.success || !json.token) throw new Error('No JWT token returned');
    authToken = json.token;
  });

  // 6. Admin Profile via Proxy with Auth
  await check('Admin Profile via Proxy with JWT (:5173/api/admin/profile)', async () => {
    if (!authToken) throw new Error('No token from previous test');
    const res = await getWithAuth('http://127.0.0.1:5173/api/admin/profile', authToken);
    if (res.status !== 200) throw new Error(`Status ${res.status}: ${res.data}`);
    const json = JSON.parse(res.data);
    if (!json.success || !json.profile) throw new Error('No profile in admin response');
  });

  // Clean shutdown
  console.log('\nStopping dev runner and testing process cleanup...');
  dev.kill('SIGINT');
  await new Promise((r) => setTimeout(r, 1200));
  await cleanProjectOrphans();

  console.log(`\n======================================================`);
  console.log(`Diagnostic Suite Result: ${passed}/${total} checks passed.`);
  console.log(`======================================================\n`);

  process.exit(passed === total ? 0 : 1);
}

runSuite().catch((e) => {
  console.error('Fatal test error:', e);
  process.exit(1);
});

