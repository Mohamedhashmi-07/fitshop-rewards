// FitShop Main Application Entry Point
import './assets/css/style.css';
import './services/api.ts';

// Load store, components, and pages
import './store/store.js';
import './components/components.js';

// Import all page controllers
import './pages/home.js';
import './pages/shop.js';
import './pages/category.js';
import './pages/brands.js';
import './pages/brandDetail.js';
import './pages/fitnessRewards.js';
import './pages/productDetail.js';
import './pages/cart.js';
import './pages/checkout.js';
import './pages/orders.js';
import './pages/wishlist.js';
import './pages/profile.js';
import './pages/sellerPortal.js';
import './pages/adminPortal.js';

// Router & App Orchestrator
import './router/app.js';

console.log('⚡ FitShop Vite Frontend Initialized');
