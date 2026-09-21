// FITSHOP Global Reactive Store (FitStore)
// Powered by centralized FitApi configuration (VITE_API_URL)

const apiEndpoint = (endpoint) => {
  if (window.FitApi && typeof window.FitApi.getUrl === 'function') {
    return window.FitApi.getUrl(endpoint);
  }
  return endpoint;
};

window.FitStore = {
  role: 'CUSTOMER',
  token: null,
  user: null,
  products: [],
  categories: [],
  brands: [],
  offers: [],
  cart: [],
  wishlist: [],
  orders: [],
  currentRoute: '/',
  activeFilter: {
    category: 'all',
    brand: 'all',
    activity: 'all',
    hasOffer: false,
    minPrice: 0,
    maxPrice: 30000,
    rating: 0,
    sort: 'recommended',
    search: ''
  },

  authHeaders(custom = {}) {
    const headers = { 'Content-Type': 'application/json', ...custom };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  },

  async init() {
    try {
      this.token = localStorage.getItem('fitshop_token') || null;
      // Default to customer token for initial storefront browsing if not set
      if (!this.token) {
        this.token = 'fitshop-jwt-usr-1-customer';
        localStorage.setItem('fitshop_token', this.token);
      }

      // Check current session from backend
      let authUser = null;
      if (this.token) {
        try {
          const meRes = await fetch(apiEndpoint('/api/auth/me'), {
            headers: { 'Authorization': `Bearer ${this.token}` }
          });
          if (meRes.ok) {
            const meData = await meRes.json();
            if (meData.authenticated && meData.user) {
              authUser = meData.user;
              this.user = authUser;
              this.role = authUser.role || 'CUSTOMER';
            }
          } else if (meRes.status === 401) {
            this.handleSessionExpired();
          }
        } catch (e) {
          console.warn('Auth validation warning:', e);
        }
      }

      // Load categories, brands, offers, products, user, orders via centralized API
      const [catsRes, brandsRes, offersRes, prodsRes, userProfileRes, ordersRes] = await Promise.all([
        fetch(apiEndpoint('/api/categories')).then(r => r.json()).catch(() => []),
        fetch(apiEndpoint('/api/brands')).then(r => r.json()).catch(() => []),
        fetch(apiEndpoint('/api/offers')).then(r => r.json()).catch(() => []),
        fetch(apiEndpoint('/api/products')).then(r => r.json()).catch(() => []),
        authUser ? Promise.resolve(authUser) : fetch(apiEndpoint('/api/user/profile?demo=true'), { headers: this.authHeaders() }).then(r => r.json()).catch(() => null),
        fetch(apiEndpoint('/api/orders'), { headers: this.authHeaders() }).then(r => r.json()).catch(() => [])
      ]);

      this.categories = catsRes;
      this.brands = brandsRes;
      this.offers = offersRes;
      this.products = prodsRes;
      if (!this.user && userProfileRes && userProfileRes.id) {
        this.user = userProfileRes;
        this.role = userProfileRes.role || 'CUSTOMER';
      }
      this.orders = ordersRes;

      // Load saved cart and wishlist from localStorage
      const savedCart = localStorage.getItem('fitshop_cart');
      if (savedCart) {
        try { this.cart = JSON.parse(savedCart); } catch (e) { this.cart = []; }
      }
      const savedWish = localStorage.getItem('fitshop_wishlist');
      if (savedWish) {
        try { this.wishlist = JSON.parse(savedWish); } catch (e) { this.wishlist = []; }
      }

      this.updateBadges();
      
      // Listen to popstate for URL back/forward navigation
      window.addEventListener('popstate', () => {
        this.routeToCurrentPath();
      });

      // Handle hash change fallback
      window.addEventListener('hashchange', () => {
        const path = window.location.hash.replace('#', '') || '/';
        this.navigate(path, false);
      });

      // Navigate to current URL
      const initialPath = window.location.hash ? window.location.hash.replace('#', '') : window.location.pathname;
      this.navigate(initialPath || '/', false);

    } catch (err) {
      console.error('FitStore initialization error:', err);
    }
  },

  async login(email, role = 'CUSTOMER', redirect = true) {
    try {
      const res = await fetch(apiEndpoint('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role })
      });
      const data = await res.json();
      if (data.success && data.user) {
        this.token = data.token;
        localStorage.setItem('fitshop_token', this.token);
        this.user = data.user;
        this.role = data.user.role;
        this.updateBadges();
        FitComponents.renderNavbar();
        FitComponents.renderToast(data.message || `Welcome back, ${data.user.name}!`, 'success');

        if (redirect) {
          if (this.role === 'SELLER') {
            this.navigate('/seller/dashboard');
          } else if (this.role === 'ADMIN') {
            this.navigate('/admin/dashboard');
          } else {
            this.navigate('/');
          }
        }
        return true;
      } else {
        FitComponents.renderToast(data.error || 'Login failed', 'coral');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      FitComponents.renderToast('Login network error', 'coral');
      return false;
    }
  },

  confirmLogout(targetRole = null) {
    FitComponents.openLogoutModal(targetRole || this.role);
  },

  async logout(targetRole = null) {
    const roleLoggingOut = targetRole || this.role || 'CUSTOMER';
    try {
      if (this.token) {
        await fetch(apiEndpoint('/api/auth/logout'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify({ token: this.token })
        }).catch(() => {});
      }
    } catch (e) {}

    // 1. Clear authentication/session data
    this.token = null;
    localStorage.removeItem('fitshop_token');

    // 2. Clear user session state
    this.user = null;
    this.role = 'GUEST';

    // 3. Clear temporary user-specific UI state
    this.updateBadges();
    FitComponents.closeLogoutModal();
    FitComponents.renderNavbar();

    // 4. Role-specific redirect & toast message
    if (roleLoggingOut === 'SELLER') {
      FitComponents.renderToast('Seller logged out successfully.', 'success');
      this.navigate('/seller/login');
    } else if (roleLoggingOut === 'ADMIN') {
      FitComponents.renderToast('Admin logged out successfully.', 'success');
      this.navigate('/admin/login');
    } else {
      FitComponents.renderToast('Logged out successfully.', 'success');
      this.navigate('/');
    }
  },

  handleSessionExpired() {
    this.token = null;
    localStorage.removeItem('fitshop_token');
    this.user = null;
    this.role = 'GUEST';
    this.updateBadges();
    FitComponents.renderNavbar();
    FitComponents.renderToast('Your session has expired. Please log in again.', 'coral');
    this.navigate('/login');
  },

  setRole(newRole) {
    const seedEmails = {
      'CUSTOMER': 'customer@fitshop.com',
      'SELLER': 'seller@fitshop.com',
      'ADMIN': 'admin@fitshop.com'
    };
    const targetEmail = seedEmails[newRole] || 'customer@fitshop.com';
    this.login(targetEmail, newRole, true);
  },

  navigate(path, updateHistory = true) {
    if (!path.startsWith('/')) path = '/' + path;
    this.currentRoute = path;

    if (updateHistory) {
      window.location.hash = path;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Route execution
    FitRouter.resolve(path);

    // Update active nav links
    FitComponents.updateActiveNavs(path);
  },

  routeToCurrentPath() {
    const path = window.location.hash.replace('#', '') || window.location.pathname || '/';
    this.navigate(path, false);
  },

  calculateProductPrice(product) {
    if (!product) return { originalPrice: 0, currentPrice: 0, unlockedPrice: 0, discountPercent: 0, isUnlocked: false, savings: 0, isApplied: false };
    
    // Check if user has an applied coupon for this product
    const applied = this.user && this.user.appliedCoupons ? this.user.appliedCoupons[product.id] : null;
    const defaultDiscount = product.fitnessDiscountPercent || 15;
    
    if (applied) {
      const discountPercent = applied.discountPercent || defaultDiscount;
      const unlockedPrice = Math.round(product.originalPrice * (1 - discountPercent / 100));
      const savings = product.originalPrice - unlockedPrice;
      return {
        originalPrice: product.originalPrice,
        currentPrice: unlockedPrice,
        unlockedPrice: unlockedPrice,
        discountPercent: discountPercent,
        isUnlocked: true,
        isApplied: true,
        couponCode: applied.couponCode,
        savings: savings,
        requirement: product.fitnessRequirement || 'Complete Fitness Activity'
      };
    }

    // By default, the normal price is active (coupon starts LOCKED)
    const discountPercent = defaultDiscount;
    const unlockedPrice = Math.round(product.originalPrice * (1 - discountPercent / 100));
    const savings = product.originalPrice - unlockedPrice;
    
    // Check if an unlocked coupon exists for this product (ready to apply)
    const unlockedList = (this.user && this.user.unlockedCoupons) || [];
    const hasUnlockedCoupon = unlockedList.some(c => c.productId === product.id);

    return {
      originalPrice: product.originalPrice,
      currentPrice: product.originalPrice,
      unlockedPrice: unlockedPrice,
      discountPercent: discountPercent,
      isUnlocked: false,
      isApplied: false,
      hasUnlockedCoupon: hasUnlockedCoupon,
      couponCode: product.couponCode || 'FIT20',
      savings: savings,
      requirement: product.fitnessRequirement || 'Complete Fitness Activity'
    };
  },

  getChallenge(productId, offerId) {
    if (!this.user || !this.user.challenges) return null;
    return this.user.challenges[`${productId}_${offerId}`] || null;
  },

  isCouponUnlocked(productId, couponCode) {
    if (!this.user || !this.user.unlockedCoupons) return false;
    return this.user.unlockedCoupons.some(c => c.productId === productId && (!couponCode || c.couponCode === couponCode));
  },

  isCouponApplied(productId, couponCode) {
    if (!this.user || !this.user.appliedCoupons) return false;
    const app = this.user.appliedCoupons[productId];
    return app && (!couponCode || app.couponCode === couponCode);
  },

  async startChallenge(offerId, productId) {
    try {
      const res = await fetch(apiEndpoint('/api/challenges/start'), {
        method: 'POST',
        headers: this.authHeaders(),
        body: JSON.stringify({ offerId, productId })
      });
      const data = await res.json();
      if (data.success) {
        this.user = data.user;
        FitComponents.renderToast(`⚡ Challenge Started: ${data.challenge.dailyTarget} ${data.challenge.unit} × ${data.challenge.totalDays} Days`, 'gold');
        return data.challenge;
      } else {
        FitComponents.renderToast(data.error || 'Failed to start challenge', 'coral');
        return null;
      }
    } catch (err) {
      console.error('startChallenge error:', err);
      FitComponents.renderToast('Network error starting challenge', 'coral');
      return null;
    }
  },

  async verifyChallengeStep(offerId, productId) {
    try {
      const res = await fetch(apiEndpoint('/api/challenges/verify'), {
        method: 'POST',
        headers: this.authHeaders(),
        body: JSON.stringify({ offerId, productId })
      });
      const data = await res.json();
      if (data.success) {
        this.user = data.user;
        this.updateBadges();

        if (data.isUnlocked) {
          if (typeof confetti === 'function') {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.55 },
              colors: ['#FF4D5A', '#10B981', '#F59E0B', '#0B132B']
            });
          }
          FitComponents.renderToast(`🎉 CHALLENGE COMPLETED! Coupon ${data.couponCode} UNLOCKED (${data.discountPercent}% OFF)`, 'success');
        } else {
          FitComponents.renderToast(`✓ Activity Verified: ${data.verification.verifiedValue} ${data.verification.unit} (Day ${data.challenge.daysCompleted}/${data.challenge.totalDays})`, 'success');
        }
        return data;
      } else {
        FitComponents.renderToast(data.error || 'Verification failed', 'coral');
        return null;
      }
    } catch (err) {
      console.error('verifyChallengeStep error:', err);
      FitComponents.renderToast('Verification connection error', 'coral');
      return null;
    }
  },

  async applyCoupon(productId, couponCode) {
    try {
      const res = await fetch(apiEndpoint('/api/coupons/apply'), {
        method: 'POST',
        headers: this.authHeaders(),
        body: JSON.stringify({ productId, couponCode })
      });
      const data = await res.json();
      if (data.success) {
        this.user = data.user;

        // Update any existing cart item pricing
        this.cart.forEach(item => {
          if (item.productId === productId) {
            item.pricing = this.calculateProductPrice(item.product);
          }
        });
        localStorage.setItem('fitshop_cart', JSON.stringify(this.cart));

        if (typeof confetti === 'function') {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF4D5A', '#10B981', '#F59E0B', '#0B132B']
          });
        }
        FitComponents.renderToast(`🎉 Coupon ${couponCode} Applied! Discounted price is active.`, 'success');

        // Refresh current route view (e.g. product page or cart)
        this.navigate(this.currentRoute, false);
        return true;
      } else {
        FitComponents.renderToast(data.error || 'Failed to apply coupon', 'coral');
        return false;
      }
    } catch (err) {
      console.error('applyCoupon error:', err);
      FitComponents.renderToast('Error applying coupon', 'coral');
      return false;
    }
  },

  async verifyActivityAction(activityType, value, unit) {
    try {
      FitComponents.closeSimulatorModal();
      
      const res = await fetch(apiEndpoint('/api/fitness/verify'), {
        method: 'POST',
        headers: this.authHeaders(),
        body: JSON.stringify({
          activityType,
          value,
          unit,
          provider: document.querySelector('input[name="provider"]:checked')?.value || 'Google Health Connect'
        })
      });

      const data = await res.json();
      if (data.success) {
        this.user = data.user;

        if (typeof confetti === 'function') {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF4D5A', '#10B981', '#F59E0B', '#0B132B']
          });
        }

        const msg = `✅ Activity recorded! Current streak: ${data.currentStreak} Days 🔥 (+${data.pointsEarned} pts)`;
        FitComponents.renderToast(msg, 'success');

        this.updateBadges();
        this.navigate(this.currentRoute, false);
      }
    } catch (err) {
      console.error('Activity verification error:', err);
      FitComponents.renderToast('Activity verification failed', 'coral');
    }
  },

  addToCart(productId, quantity = 1) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const pricing = this.calculateProductPrice(product);
    const existing = this.cart.find(item => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
      existing.pricing = pricing;
    } else {
      this.cart.push({
        productId,
        quantity,
        product,
        pricing,
        appliedCoupon: pricing.isApplied ? {
          couponCode: pricing.couponCode,
          discountPercent: pricing.discountPercent,
          savings: pricing.savings
        } : null
      });
    }

    localStorage.setItem('fitshop_cart', JSON.stringify(this.cart));
    this.updateBadges();

    const unlockText = pricing.isApplied
      ? `<span class="text-emerald-600 font-bold">Fitness Coupon Applied (Saved ₹${pricing.savings * quantity})</span>`
      : 'Added to cart';

    FitComponents.renderToast(`🛒 ${product.name} — ${unlockText}`, 'success');
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    localStorage.setItem('fitshop_cart', JSON.stringify(this.cart));
    this.updateBadges();
    FitComponents.renderToast('Item removed from cart');
    if (this.currentRoute === '/cart') {
      this.navigate('/cart', false);
    }
  },

  updateCartQty(productId, delta) {
    const item = this.cart.find(i => i.productId === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
      localStorage.setItem('fitshop_cart', JSON.stringify(this.cart));
      this.updateBadges();
      if (this.currentRoute === '/cart') {
        this.navigate('/cart', false);
      }
    }
  },

  clearCart() {
    this.cart = [];
    localStorage.removeItem('fitshop_cart');
    this.updateBadges();
  },

  toggleWishlist(productId) {
    const idx = this.wishlist.indexOf(productId);
    const product = this.products.find(p => p.id === productId);
    if (idx >= 0) {
      this.wishlist.splice(idx, 1);
      FitComponents.renderToast(`Removed ${product ? product.name : 'item'} from wishlist`);
    } else {
      this.wishlist.push(productId);
      FitComponents.renderToast(`❤️ Added ${product ? product.name : 'item'} to wishlist!`, 'coral');
    }
    localStorage.setItem('fitshop_wishlist', JSON.stringify(this.wishlist));
    this.updateBadges();

    // Re-render if on wishlist page
    if (this.currentRoute === '/wishlist') {
      this.navigate('/wishlist', false);
    }
  },

  getCartTotals() {
    let subtotal = 0;
    let fitnessSavings = 0;
    let totalItems = 0;

    this.cart.forEach(item => {
      const prod = this.products.find(p => p.id === item.productId) || item.product;
      const pricing = this.calculateProductPrice(prod);
      totalItems += item.quantity;
      subtotal += pricing.originalPrice * item.quantity;
      if (pricing.isApplied) {
        fitnessSavings += pricing.savings * item.quantity;
      }
    });

    const finalTotal = subtotal - fitnessSavings;
    return {
      subtotal,
      fitnessSavings,
      finalTotal,
      totalItems,
      shipping: finalTotal > 999 || finalTotal === 0 ? 0 : 99
    };
  },

  updateBadges() {
    const count = this.cart.reduce((acc, i) => acc + i.quantity, 0);
    
    // Navbar cart badge
    const cartBadge = document.getElementById('nav-cart-badge');
    if (cartBadge) {
      cartBadge.textContent = count;
      cartBadge.style.display = count > 0 ? 'flex' : 'none';
    }

    // Mobile cart badge
    const mobileCartBadge = document.getElementById('mobile-cart-badge');
    if (mobileCartBadge) {
      mobileCartBadge.textContent = count;
      mobileCartBadge.style.display = count > 0 ? 'flex' : 'none';
    }

    // Wishlist badge
    const wishBadge = document.getElementById('nav-wishlist-badge');
    if (wishBadge) {
      wishBadge.textContent = this.wishlist.length;
      wishBadge.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
    }

    // Streak badge
    const streakBadge = document.getElementById('top-streak-count');
    if (streakBadge && this.user) {
      streakBadge.textContent = `${this.user.currentStreak || 4} Days Streak`;
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }
};
