import cors, { CorsOptions } from 'cors';
import { config } from '../config/env';

/**
 * Parses FRONTEND_URL which may contain one or multiple comma-separated domains.
 * Example: "http://localhost:5173,https://fitshop-frontend.vercel.app"
 */
function getAllowedOrigins(): string[] {
  const raw = config.frontendUrl || 'http://localhost:5173';
  return raw.split(',').map(s => s.trim().replace(/\/+$/, '')).filter(Boolean);
}

export const corsMiddleware = () => {
  const allowedOrigins = getAllowedOrigins();

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/+$/, '');

      // Allow if exact match
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      // In development or if localhost origin, allow localhost variants
      if (config.nodeEnv === 'development' && /^http:\/\/localhost(:\d+)?$/.test(normalizedOrigin)) {
        return callback(null, true);
      }

      // Allow Vercel preview deployments if main frontend is on Vercel
      const hasVercelAllowed = allowedOrigins.some(o => o.includes('.vercel.app'));
      if (hasVercelAllowed && normalizedOrigin.endsWith('.vercel.app')) {
        return callback(null, true);
      }

      callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-FitShop-Token', 'X-Requested-With'],
  };

  return cors(corsOptions);
};

export default corsMiddleware;
