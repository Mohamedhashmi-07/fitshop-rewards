# FitShop Frontend (React / Vite)

FITSHOP — Move More. Pay Less.  
The Multi-Category Fitness-Powered Marketplace.

This repository contains the completely decoupled, independent frontend for FitShop. It connects to the FitShop Backend API using a configurable environment variable.

---

## Features Preserved

- **Dynamic Homepage & Brand Carousels**: Hero banners, flash drops, category sliders.
- **Shop & Advanced Filters**: Multi-facet filtering by Category, Brand, Verified Activity, Price Range, and Star Rating.
- **Activity Verification Simulator**: Integrated simulation for Google Health Connect, Apple Health, Fitbit, and Garmin.
- **Dynamic Fitness Rewards**: Real-time challenge tracking, step streaks, and coupon unlocking.
- **Cart & Checkout Engine**: Automatic fitness discount application, shipping calculations, and order confirmation.
- **Role-Based Portals**:
  - Customer Storefront & Order History
  - Seller Portal with real-time sales analytics and product management
  - Admin Portal with seller application approvals and platform KPIs

---

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Ensure `VITE_API_URL` points to your running backend:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```
The app will be accessible at:
```
http://localhost:5173
```

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be created in the `dist/` directory.

---

## Deploying to Vercel (Step-by-Step)

### Option A: Using the Vercel Web Dashboard (Recommended)
1. Push this `FitShop-Frontend` directory as its own GitHub repository (e.g. `https://github.com/your-username/FitShop-Frontend`).
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select and import the `FitShop-Frontend` repository.
4. Verify the build configuration:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. In the **Environment Variables** section, add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://YOUR-BACKEND-DOMAIN.com/api` (the public URL of your deployed backend)
6. Click **Deploy**.
7. Your frontend will be live with full client-side routing at `https://fitshop-frontend.vercel.app`!

### Option B: Using the Vercel CLI
```bash
npm i -g vercel
vercel
```
When prompted for environment variables, set:
```
VITE_API_URL=https://YOUR-BACKEND-DOMAIN.com/api
```

---

## Project Structure

```
FitShop-Frontend/
├── dist/                   # Production build output
├── public/                 # Static assets
├── src/
│   ├── assets/             # CSS design system & icons
│   ├── components/         # Reusable UI components & modals
│   ├── pages/              # 14 complete storefront & portal pages
│   ├── router/             # Route orchestrator & role protection
│   ├── services/           # Centralized API service (api.ts)
│   ├── store/              # Global reactive state manager (store.js)
│   └── main.ts             # Application entry point
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── index.html              # HTML5 template
├── package.json            # Scripts & dependencies
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel SPA routing rewrites
└── README.md               # Documentation
```
