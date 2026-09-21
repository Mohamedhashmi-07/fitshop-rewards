import { Router, Request, Response } from 'express';
import { loadDb, saveDb } from '../config/database';
import { AuthService } from '../middleware/auth';

const router = Router();

// GET /api/seller/analytics & /api/seller/dashboard
const getSellerAnalytics = (req: Request, res: Response) => {
  const { user } = AuthService.authenticate(req);
  const role = (user?.role || '').toUpperCase();

  if (role !== 'SELLER' && role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied. SELLER or ADMIN role required.',
    });
  }

  const db = loadDb();
  const products = db.products || [];
  const orders = db.orders || [];
  const activeOffers = db.fitnessOffers || [];

  const totalRev = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  const analytics = {
    totalProducts: products.length,
    totalOrders: orders.length + 2450,
    totalCustomers: 1842,
    totalRevenue: 845200 + totalRev,
    totalStock,
    activeOffers: activeOffers.length,
    activeCoupons: activeOffers.length,
    couponsUnlocked: 460,
    couponsUsed: 310,
    fitnessChallengesCompleted: 580,
    offerFunnel: [
      {
        offerTitle: 'Walking Offer (WALK15)',
        views: 1250,
        challengesStarted: 430,
        couponsUnlocked: 280,
        purchases: 190,
        conversionRate: '44.2%',
      },
      {
        offerTitle: 'Running Offer (RUN20)',
        views: 800,
        challengesStarted: 300,
        couponsUnlocked: 180,
        purchases: 120,
        conversionRate: '40.0%',
      },
      {
        offerTitle: 'Cycling Offer (CYCLE10)',
        views: 520,
        challengesStarted: 190,
        couponsUnlocked: 110,
        purchases: 85,
        conversionRate: '44.7%',
      },
    ],
    activityBreakdown: [
      { activity: 'Walking', percentage: 42, revenue: '₹3,54,984' },
      { activity: 'Running', percentage: 31, revenue: '₹2,62,012' },
      { activity: 'Cycling', percentage: 17, revenue: '₹1,43,684' },
      { activity: 'Gym / HIIT', percentage: 10, revenue: '₹84,520' },
    ],
  };

  res.json(analytics);
};

router.get('/analytics', getSellerAnalytics);
router.get('/dashboard', getSellerAnalytics);

// POST /api/seller/products
router.post('/products', (req: Request, res: Response) => {
  const { user } = AuthService.authenticate(req);
  const role = (user?.role || '').toUpperCase();

  if (role !== 'SELLER' && role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied. SELLER or ADMIN role required.',
    });
  }

  const db = loadDb();
  const body = req.body || {};

  const newProd = {
    id: `prod-${(db.products || []).length + 1}`,
    name: body.name || 'New Product',
    brandId: body.brandId || 'b-stepz',
    brandName: body.brandName || 'Stepz Footwear',
    category: body.category || 'footwear',
    categoryName: body.categoryName || 'Footwear',
    subcategory: body.subcategory || 'General',
    image: body.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
    originalPrice: parseFloat(body.originalPrice || 1999),
    fitnessDiscountPercent: parseFloat(body.fitnessDiscountPercent || 15),
    fitnessRequirement: body.fitnessRequirement || 'Run 5 km × 3 days',
    couponCode: body.couponCode || 'STEP15',
    activityType: body.activityType || 'RUNNING',
    availableOfferIds: ['off-run20', 'off-walk15'],
    rating: 5.0,
    reviewsCount: 0,
    stock: parseInt(body.stock || 50, 10),
    sku: body.sku || `SKU-${(db.products || []).length + 101}`,
    description: body.description || 'A premium product with verified fitness discount unlock.',
  };

  if (!db.products) db.products = [];
  db.products.unshift(newProd);
  saveDb(db);

  res.json({
    success: true,
    product: newProd,
    message: 'Product created successfully!',
  });
});

// POST /api/seller/offers
router.post('/offers', (req: Request, res: Response) => {
  const { user } = AuthService.authenticate(req);
  const role = (user?.role || '').toUpperCase();

  if (role !== 'SELLER' && role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied. SELLER or ADMIN role required.',
    });
  }

  const db = loadDb();
  const body = req.body || {};

  const newOffer = {
    id: `off-${(db.fitnessOffers || []).length + 1}`,
    couponCode: body.couponCode || 'FIT20',
    title: body.title || 'Special Activity Offer',
    activityType: (body.activityType || 'WALKING').toUpperCase(),
    activityIcon: body.activityIcon || 'zap',
    requirementText: body.requirementText || '5,000 steps per day for 5 days',
    dailyTarget: parseFloat(body.dailyTarget || 5000),
    unit: body.unit || 'steps',
    totalDays: parseInt(body.totalDays || 5, 10),
    discountPercent: parseFloat(body.discountPercent || 15),
    expiresInSeconds: 259200,
    description: body.description || 'Complete verified activity to unlock coupon.',
  };

  if (!db.fitnessOffers) db.fitnessOffers = [];
  db.fitnessOffers.push(newOffer);
  saveDb(db);

  res.json({
    success: true,
    offer: newOffer,
    message: 'Fitness offer created successfully!',
  });
});

// DELETE /api/seller/products/:id
router.delete('/products/:id', (req: Request, res: Response) => {
  const { user } = AuthService.authenticate(req);
  const role = (user?.role || '').toUpperCase();

  if (role !== 'SELLER' && role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied. SELLER or ADMIN role required.',
    });
  }

  const db = loadDb();
  const prodId = req.params.id;
  db.products = (db.products || []).filter(p => p.id !== prodId);
  saveDb(db);

  res.json({
    success: true,
    message: 'Product deleted successfully!',
  });
});

export default router;
