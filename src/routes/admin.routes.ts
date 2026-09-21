import { Router, Request, Response } from 'express';
import { loadDb, saveDb } from '../config/database';
import { AuthService } from '../middleware/auth';

const router = Router();

// GET /api/admin/dashboard
router.get('/dashboard', (req: Request, res: Response) => {
  const { user } = AuthService.authenticate(req);
  const role = (user?.role || '').toUpperCase();

  if (role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied. ADMIN role required.',
    });
  }

  const db = loadDb();
  const users = db.users || [];
  const products = db.products || [];
  const brands = db.brands || [];
  const orders = db.orders || [];
  const applications = db.sellerApplications || [];

  const adminData = {
    kpis: {
      totalUsers: 12840,
      totalSellers: 48,
      totalBrands: brands.length,
      totalProducts: products.length,
      totalOrders: 34910,
      totalRevenue: 4829100,
      activeOffers: (db.fitnessOffers || []).length,
      pendingApprovals: applications.filter(a => a.status === 'PENDING').length,
    },
    pendingSellers: applications,
    brands,
    recentOrders: orders,
  };

  res.json(adminData);
});

// POST /api/admin/sellers/approve
router.post('/sellers/approve', (req: Request, res: Response) => {
  const { user } = AuthService.authenticate(req);
  const role = (user?.role || '').toUpperCase();

  if (role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied. ADMIN role required.',
    });
  }

  const db = loadDb();
  const appId = req.body?.id;
  const app = (db.sellerApplications || []).find(a => a.id === appId);

  if (!app) {
    return res.status(404).json({ error: 'Application not found' });
  }

  app.status = 'APPROVED';
  saveDb(db);

  res.json({
    success: true,
    message: `Brand ${app.brandName} approved!`,
  });
});

// POST /api/admin/sellers/reject
router.post('/sellers/reject', (req: Request, res: Response) => {
  const { user } = AuthService.authenticate(req);
  const role = (user?.role || '').toUpperCase();

  if (role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied. ADMIN role required.',
    });
  }

  const db = loadDb();
  const appId = req.body?.id;
  const app = (db.sellerApplications || []).find(a => a.id === appId);

  if (!app) {
    return res.status(404).json({ error: 'Application not found' });
  }

  app.status = 'REJECTED';
  saveDb(db);

  res.json({
    success: true,
    message: 'Seller application rejected.',
  });
});

export default router;
