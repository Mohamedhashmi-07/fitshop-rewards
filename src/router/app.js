// FITSHOP Client-Side Router & Master Orchestrator (FitRouter)
window.FitRouter = {
  resolve(rawPath) {
    // Remove query params from routing path
    const [path] = rawPath.split('?');
    const role = (FitStore.role || 'CUSTOMER').toUpperCase();
    const user = FitStore.user;

    // -----------------------------------------------------------------
    // ROLE-BASED ROUTE GUARDS (RoleProtectedRoute)
    // -----------------------------------------------------------------

    // 1. SELLER PORTAL PROTECTION
    // /seller/* routes (except /seller/login) require SELLER or ADMIN role
    if (path.startsWith('/seller')) {
      const isSellerLogin = path === '/seller/login';
      if (!isSellerLogin && role !== 'SELLER' && role !== 'ADMIN') {
        FitComponents.renderAccessRestricted({
          currentRole: role,
          requiredRole: 'SELLER',
          portal: 'Seller Portal',
          reason: 'You do not have permission to access the Seller Portal.',
          returnPath: '/shop',
          returnText: 'Return to Shop'
        });
        if (window.lucide) lucide.createIcons();
        return;
      }
    }

    // 2. ADMIN PORTAL PROTECTION
    // /admin/* routes (except /admin/login) require ADMIN role
    if (path.startsWith('/admin')) {
      const isAdminLogin = path === '/admin/login';
      if (!isAdminLogin && role !== 'ADMIN') {
        if (role === 'SELLER') {
          FitComponents.renderAccessRestricted({
            currentRole: 'SELLER',
            requiredRole: 'ADMIN',
            portal: 'Admin Portal',
            reason: 'Seller accounts cannot access the Admin Portal.',
            returnPath: '/seller/dashboard',
            returnText: 'Return to Seller Dashboard'
          });
        } else {
          FitComponents.renderAccessRestricted({
            currentRole: role || 'CUSTOMER',
            requiredRole: 'ADMIN',
            portal: 'Admin Portal',
            reason: 'Customer accounts cannot access the Admin Portal.',
            returnPath: '/',
            returnText: 'Return to Home'
          });
        }
        if (window.lucide) lucide.createIcons();
        return;
      }
    }

    // 3. PROTECTED CUSTOMER ROUTES (Require logged-in session)
    if (['/profile', '/orders', '/checkout'].includes(path)) {
      if (!user || role === 'GUEST') {
        FitComponents.renderToast('Please log in to access this page.', 'coral');
        FitComponents.openAuthModal('login');
        FitPages.home.render();
        if (window.lucide) lucide.createIcons();
        return;
      }
    }

    // -----------------------------------------------------------------
    // ROUTE DISPATCHING
    // -----------------------------------------------------------------
    if (path === '/' || path === '') {
      FitPages.home.render();
    } else if (path === '/shop') {
      FitPages.shop.render();
    } else if (path === '/categories') {
      FitPages.categories.render();
    } else if (path.startsWith('/category/')) {
      const slug = path.replace('/category/', '');
      FitPages.category.render(slug);
    } else if (path === '/brands') {
      FitPages.brands.render();
    } else if (path.startsWith('/brand/')) {
      const brandId = path.replace('/brand/', '');
      FitPages.brandDetail.render(brandId);
    } else if (path === '/fitness-rewards' || path === '/challenges') {
      FitPages.fitnessRewards.render();
    } else if (path.startsWith('/product/')) {
      const prodId = path.replace('/product/', '');
      FitPages.productDetail.render(prodId);
    } else if (path === '/cart') {
      FitPages.cart.render();
    } else if (path === '/checkout') {
      FitPages.checkout.render();
    } else if (path === '/orders') {
      FitPages.orders.render();
    } else if (path === '/wishlist') {
      FitPages.wishlist.render();
    } else if (path === '/profile') {
      FitPages.profile.render();
    } else if (path.startsWith('/seller')) {
      const tab = path.replace('/seller/', '').replace('/seller', '') || 'dashboard';
      FitPages.seller.render(tab);
    } else if (path.startsWith('/admin')) {
      const tab = path.replace('/admin/', '').replace('/admin', '') || 'overview';
      FitPages.admin.render(tab);
    } else if (path === '/login' || path === '/signup') {
      FitComponents.openAuthModal(path.replace('/', ''));
      FitPages.home.render();
    } else {
      FitPages.home.render();
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }
};

// Global Countdown Interval Engine
let countdownSeconds = 194400; // 2 days 6 hours default
setInterval(() => {
  countdownSeconds = Math.max(0, countdownSeconds - 1);
  const days = Math.floor(countdownSeconds / (24 * 3600));
  const hours = Math.floor((countdownSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((countdownSeconds % 3600) / 60);
  const seconds = countdownSeconds % 60;

  const formatted = `${String(days).padStart(2, '0')}d : ${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;

  document.querySelectorAll('[data-countdown]').forEach(el => {
    el.textContent = formatted;
  });
}, 1000);

// Close autocomplete when clicking outside
document.addEventListener('click', (e) => {
  const searchBox = document.getElementById('search-autocomplete-box');
  const searchInput = document.getElementById('global-search-input');
  if (searchBox && !searchBox.contains(e.target) && e.target !== searchInput) {
    searchBox.classList.add('hidden');
  }
});

// App Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 FITSHOP App Bootstrapping...');
  await FitStore.init();
  FitComponents.renderNavbar();
  FitComponents.renderFooter();
});
