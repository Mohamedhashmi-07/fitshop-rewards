import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { config } from './env';

const DATA_FILE = path.resolve(process.cwd(), 'data', 'database.json');

export interface DatabaseSchema {
  products: any[];
  brands: any[];
  categories: any[];
  fitnessOffers: any[];
  users: any[];
  orders: any[];
  sellerApplications: any[];
  reviews: any[];
}

let pgPool: Pool | null = null;
let isPostgresConnected = false;

// Initialize PostgreSQL pool if DATABASE_URL is configured
export async function initDatabase(): Promise<void> {
  if (config.databaseUrl) {
    try {
      console.log('🔗 Connecting to PostgreSQL database at:', config.databaseUrl.replace(/:[^:@]+@/, ':****@'));
      pgPool = new Pool({
        connectionString: config.databaseUrl,
        ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : undefined,
      });

      const client = await pgPool.connect();
      const res = await client.query('SELECT NOW()');
      client.release();
      isPostgresConnected = true;
      console.log('✅ PostgreSQL connected successfully at:', res.rows[0].now);
    } catch (err: any) {
      console.warn('⚠️ PostgreSQL connection failed:', err.message);
      console.log('📁 Automatically falling back to local JSON database fallback.');
      isPostgresConnected = false;
    }
  } else {
    console.log('ℹ️ DATABASE_URL not set. Running with local JSON database fallback (data/database.json).');
  }
}

export function getPostgresPool(): Pool | null {
  return isPostgresConnected ? pgPool : null;
}

export function isUsingPostgres(): boolean {
  return isPostgresConnected;
}

// In-memory cache for JSON database
let memoryDb: DatabaseSchema | null = null;

export function loadDb(): DatabaseSchema {
  if (memoryDb) {
    return memoryDb;
  }
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb!;
    }
  } catch (e) {
    console.error('Error loading database.json:', e);
  }

  memoryDb = {
    products: [],
    brands: [],
    categories: [],
    fitnessOffers: [],
    users: [],
    orders: [],
    sellerApplications: [],
    reviews: [],
  };
  return memoryDb;
}

export function saveDb(db: DatabaseSchema): boolean {
  try {
    memoryDb = db;
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error saving database.json:', e);
    return false;
  }
}
