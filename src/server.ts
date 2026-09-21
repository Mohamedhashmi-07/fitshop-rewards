import express, { Request, Response } from 'express';
import { config } from './config/env';
import { initDatabase } from './config/database';
import { corsMiddleware } from './middleware/cors';
import { utcIso } from './services/fitness.service';

import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import fitnessRoutes from './routes/fitness.routes';
import orderRoutes from './routes/order.routes';
import sellerRoutes from './routes/seller.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

// Global Middleware
app.use(corsMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    time: utcIso(),
    brand: 'FITSHOP',
    tagline: 'Move More. Pay Less.',
    environment: config.nodeEnv,
    port: config.port,
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', fitnessRoutes);
app.use('/api', orderRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/admin', adminRoutes);

// Root fallback
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'FITSHOP Backend API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// 404 Not Found for any unmatched route
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found', path: req.path });
});

// Start Server
async function startServer() {
  await initDatabase();

  const server = app.listen(config.port, () => {
    console.log('==================================================');
    console.log(`🚀 FITSHOP Backend API running on http://localhost:${config.port}`);
    console.log(`📡 CORS configured for origin: ${config.frontendUrl}`);
    console.log(`🛠️ Mode: ${config.nodeEnv}`);
    console.log('==================================================');
  });

  return server;
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
