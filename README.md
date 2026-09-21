# FitShop Backend (Node.js + Express + TypeScript)

FITSHOP — Move More. Pay Less.  
REST API Server powering the FitShop marketplace.

This repository contains the standalone, production-ready backend for FitShop. It handles authentication, catalog filtering, dynamic fitness challenge verification, order processing, and seller/admin management.

---

## Architecture & Features

- **Runtime & Framework**: Node.js, Express, TypeScript.
- **Role-Based Access Control (RBAC)**: Secure access guards for `CUSTOMER`, `SELLER`, and `ADMIN`.
- **CORS Protection**: Configurable allowed origin (`FRONTEND_URL`) supporting credentials and REST methods.
- **Dual-Mode Database Architecture**:
  - Connects to PostgreSQL when `DATABASE_URL` is set.
  - Automatically falls back to the embedded JSON dataset (`data/database.json`) when PostgreSQL is not configured, guaranteeing that development and preview environments run smoothly out of the box.
- **Fitness Verification Engine**: Handles simulated and real health data from Apple Health, Google Health Connect, Fitbit, and Garmin.

---

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default local variables:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL=
JWT_SECRET=fitshop-dev-secret-key-987654321
```

### 3. Start in Development Mode (Live Reload)
```bash
npm run dev
```
The server will run at:
```
http://localhost:5000
```
API Health Check:
```
http://localhost:5000/api/health
```

### 4. Build & Run Production Bundle
```bash
npm run build
npm start
```

---

## Production Deployment (Render, Railway, Fly.io, or VPS)

### Deploying to Render
1. Push this `FitShop-Backend` directory to a new GitHub repository (e.g. `https://github.com/your-username/FitShop-Backend`).
2. Log in to [Render](https://render.com) and click **"New +" > "Web Service"**.
3. Connect the `FitShop-Backend` repository.
4. Configure the service:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. In the **Environment Variables** tab, add:
   - `NODE_ENV`: `production`
   - `PORT`: `5000` (or Render's default `10000`)
   - `FRONTEND_URL`: `https://YOUR-FRONTEND.vercel.app` (your deployed Vercel frontend URL)
   - `DATABASE_URL`: `postgresql://...` (your PostgreSQL connection string, e.g. from Render PostgreSQL, Supabase, Neon, or NeonDB)
   - `JWT_SECRET`: A secure random secret key
6. Click **Create Web Service**.
7. Once deployed, note your public backend URL (e.g., `https://fitshop-backend.onrender.com`). Set this URL in your Vercel frontend as `VITE_API_URL=https://fitshop-backend.onrender.com/api`.

---

## API Endpoints Reference

### Public & Storefront Endpoints
- `GET /api/health` — System status, time, and environment
- `GET /api/categories` — Product categories with item counts
- `GET /api/brands` — Brands with product counts
- `GET /api/brands/:id` — Brand details & brand products
- `GET /api/offers` — Active fitness discount offers
- `GET /api/products` — Filterable products (`category`, `brand`, `activity`, `minPrice`, `maxPrice`, `search`, `sort`)
- `GET /api/products/:id` — Single product details, linked offers, and reviews

### Authentication Endpoints
- `POST /api/auth/login` — Login by email or persona role
- `POST /api/auth/logout` — Revoke active session token
- `GET /api/auth/me` — Verify session and return active user profile
- `GET /api/user/profile` — Full user profile with fitness metrics

### Fitness Rewards & Coupons
- `POST /api/challenges/start` — Start a fitness challenge for a product
- `POST /api/challenges/verify` — Verify daily progress & unlock coupons
- `POST /api/fitness/verify` — Simulator verification endpoint
- `POST /api/coupons/apply` — Apply unlocked discount coupon to cart

### Orders & Checkout
- `GET /api/orders` — List user orders
- `POST /api/orders` — Submit new order and decrement inventory

### Seller Portal (Role: SELLER or ADMIN)
- `GET /api/seller/analytics` — Real-time revenue, conversion, and order funnel
- `POST /api/seller/products` — Create and list a new seller product
- `POST /api/seller/offers` — Create a new fitness discount challenge
- `DELETE /api/seller/products/:id` — Delete a seller product

### Admin Portal (Role: ADMIN)
- `GET /api/admin/dashboard` — Platform overview, KPIs, pending seller applications
- `POST /api/admin/sellers/approve` — Approve seller application
- `POST /api/admin/sellers/reject` — Reject seller application

---

## Project Structure

```
FitShop-Backend/
├── data/
│   └── database.json       # Fallback JSON database
├── dist/                   # Compiled JavaScript output
├── src/
│   ├── config/
│   │   ├── env.ts          # Environment configuration
│   │   └── database.ts     # Database connection pool & fallback
│   ├── middleware/
│   │   ├── auth.ts         # Authentication & RBAC guards
│   │   └── cors.ts         # Dynamic CORS middleware
│   ├── routes/
│   │   ├── admin.routes.ts
│   │   ├── auth.routes.ts
│   │   ├── fitness.routes.ts
│   │   ├── order.routes.ts
│   │   ├── product.routes.ts
│   │   └── seller.routes.ts
│   ├── services/
│   │   └── fitness.service.ts
│   └── server.ts           # Application entry point
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── package.json            # Scripts & dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # Documentation
```
