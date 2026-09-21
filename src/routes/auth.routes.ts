import { Router, Request, Response } from 'express';
import { loadDb } from '../config/database';
import { AuthService, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// POST /api/auth/login
router.post('/login', (req: Request, res: Response) => {
  const { email, role } = req.body || {};
  const db = loadDb();
  const users = db.users || [];

  let userMatch: any = null;
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanRole = (role || '').trim().toUpperCase();

  if (cleanEmail) {
    userMatch = users.find(u => (u.email || '').toLowerCase() === cleanEmail);
  }
  if (!userMatch && cleanRole) {
    userMatch = users.find(u => (u.role || '').toUpperCase() === cleanRole);
  }
  if (!userMatch) {
    userMatch = users[0];
  }

  const token = AuthService.generateToken(userMatch);
  return res.json({
    success: true,
    token,
    user: userMatch,
    role: userMatch.role || 'CUSTOMER',
    message: `Welcome back, ${userMatch.name || 'User'}!`,
  });
});

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
  const token = AuthService.getTokenFromHeaders(req) || req.body?.token;
  if (token) {
    AuthService.revokeToken(token);
  }
  return res.json({
    success: true,
    message: 'Logged out successfully.',
  });
});

// GET /api/auth/me
router.get('/me', (req: Request, res: Response) => {
  const { user, error } = AuthService.authenticate(req);
  if (user) {
    return res.json({
      authenticated: true,
      user,
      role: user.role || 'CUSTOMER',
    });
  }
  return res.status(401).json({
    authenticated: false,
    error: 'Unauthorized',
    message: error || 'Authentication required.',
  });
});

// GET /api/user/profile
router.get('/user/profile', (req: Request, res: Response) => {
  const { user } = AuthService.authenticate(req);
  if (!user) {
    const isDemo = req.query.demo === 'true' || req.query.fallback === 'true';
    if (isDemo) {
      const db = loadDb();
      const defaultUser = (db.users && db.users[0]) || null;
      return res.json(defaultUser || {});
    }
    return res.status(401).json({
      authenticated: false,
      user: null,
      message: 'Authentication required',
    });
  }
  return res.json(user);
});

export default router;
