import { Router, Request, Response } from 'express';
import { loadDb, saveDb } from '../config/database';
import { AuthService } from '../middleware/auth';
import { utcIso } from '../services/fitness.service';

const router = Router();

// GET /api/orders
router.get('/orders', (req: Request, res: Response) => {
  const db = loadDb();
  res.json(db.orders || []);
});

// POST /api/orders
router.post('/orders', (req: Request, res: Response) => {
  const {
    items = [],
    subtotal = 0,
    fitnessSavings = 0,
    total,
    paymentMethod = 'UPI (fitshop@okhdfcbank)',
    shippingAddress = {},
  } = req.body || {};

  const db = loadDb();
  const { user } = AuthService.authenticate(req);
  const activeUser = user || (db.users && db.users[0]);

  const now = new Date();
  const orderId = `ORD-${now.getUTCFullYear()}-${Math.floor(Date.now() / 1000) % 100000}`;
  const finalTotal = total !== undefined ? total : subtotal - fitnessSavings;

  const newOrder = {
    id: orderId,
    customerId: activeUser?.id || 'usr-1',
    customerName: shippingAddress.name || activeUser?.name || 'Mohammad Rizwan',
    date: utcIso(),
    items,
    subtotal,
    fitnessSavings,
    shipping: 0,
    total: finalTotal,
    paymentMethod,
    status: 'CONFIRMED',
    trackingNumber: `DELHIVERY-${Date.now()}`,
    estimatedDelivery: 'Within 3-4 Business Days',
    timeline: [
      { status: 'Confirmed', time: 'Just now', done: true },
      { status: 'Packed', time: 'Processing', done: false },
      { status: 'Shipped', time: 'Pending', done: false },
      { status: 'Out for Delivery', time: 'Pending', done: false },
      { status: 'Delivered', time: 'Estimated 3-4 Days', done: false },
    ],
  };

  if (!db.orders) db.orders = [];
  db.orders.unshift(newOrder);

  // Decrement inventory stock
  for (const item of items) {
    const prod = (db.products || []).find(p => p.id === item.productId);
    if (prod) {
      prod.stock = Math.max(0, (prod.stock || 10) - (item.quantity || 1));
    }
  }

  if (activeUser) {
    activeUser.totalSaved = (activeUser.totalSaved || 0) + fitnessSavings;
  }

  saveDb(db);
  res.json({
    success: true,
    order: newOrder,
    message: 'Order placed successfully!',
  });
});

export default router;
