import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDatabase } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import {
  checkPortAvailable,
  findAvailablePort,
  probeHealth,
  saveActiveServer,
  clearActiveServer,
} from './utils/portManager.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded assets statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'ASTRA API Engine v2.0',
    timestamp: new Date().toISOString(),
  });
});

// Initialize database & start server with dynamic port detection
async function startServer() {
  try {
    await initDatabase();

    const preferredPort = parseInt(process.env.PORT, 10) || 5000;
    const HOST = process.env.HOST || '0.0.0.0';
    let activePort = preferredPort;

    // Check if preferred port is available on IPv4 interface
    const isFree = await checkPortAvailable(preferredPort, HOST);
    if (!isFree) {
      const isAstra = await probeHealth(preferredPort);
      if (isAstra) {
        console.log(`ℹ An existing healthy ASTRA server instance is already running on port ${preferredPort}.`);
      } else {
        console.log(`⚠ Preferred port ${preferredPort} is in use by another application.`);
      }
      console.log(`🔍 Resolving available port dynamically...`);
      activePort = await findAvailablePort(preferredPort + 1, 25, HOST);
      console.log(`✓ Bound to next available port: ${activePort}`);
    }

    const server = app.listen(activePort, HOST, () => {
      saveActiveServer(activePort);
      console.log(`\n======================================================`);
      console.log(`🚀 ASTRA Backend Server running at: http://localhost:${activePort}`);
      console.log(`🔒 Admin Auth: http://localhost:${activePort}/api/auth/login`);
      console.log(`🌐 Public API: http://localhost:${activePort}/api/public/data`);
      console.log(`⚡ Bound Interface: ${HOST}:${activePort}`);
      console.log(`======================================================\n`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Error: Port ${activePort} is already in use.`);
        console.error(`💡 Tip: Specify an alternate port via PORT in your .env or restart.`);
      } else {
        console.error(`\n❌ Fatal server error:`, err);
      }
      clearActiveServer();
      process.exit(1);
    });

    // Graceful cleanup handlers
    const handleShutdown = () => {
      clearActiveServer();
      server.close(() => {
        process.exit(0);
      });
    };

    process.on('SIGINT', handleShutdown);
    process.on('SIGTERM', handleShutdown);
    process.on('exit', () => clearActiveServer());

  } catch (err) {
    console.error('Fatal error starting ASTRA server:', err.message || err);
    clearActiveServer();
    process.exit(1);
  }
}

startServer();


