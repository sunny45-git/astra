import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'astra_super_secret_jwt_key_2026_beyond_limits';

export function authenticateAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const admin = db.getAdmin();
    if (!admin || admin.id !== decoded.id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session or admin account not found.',
      });
    }

    req.admin = { id: admin.id, email: admin.email, role: admin.role };
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Authentication token is invalid or has expired.',
      error: error.message,
    });
  }
}

