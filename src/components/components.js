// FITSHOP Reusable UI Components
window.FitComponents = {
  renderNavbar() {
    const nav = document.getElementById('main-header');
    if (!nav) return;

    const user = FitStore.user || { name: 'Shopper', role: 'CUSTOMER' };
    const cartCount = FitStore.cart.reduce((acc, i) => acc + i.quantity, 0);
    const wishCount = FitStore.wishlist.length;

    nav.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 gap-4">
          
          <!-- BRAND LOGO -->
          <div class="flex items-center gap-6">
            <a href="#/" class="flex items-center gap-2.5 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-coral-600 to-coral-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-all">
                <i data-lucide="zap" class="w-6 h-6 fill-white"></i>
              </div>
              <div class="flex flex-col">
                <span class="font-heading font-extrabold text-2xl tracking-tight text-slate-900 flex items-center gap-1">
                  FIT<span class="text-coral-600">SHOP</span>
                </span>
                <span class="text-[10px] font-bold text-slate-500 tracking-wider uppercase -mt-1 hidden sm:block">Move More. Pay Less.</span>
              </div>
            </a>

            <!-- DESKTOP NAV LINKS (LIGHT THEME) -->
            <nav class="hidden md:flex items-center gap-1 text-sm font-semibold">
              <a href="#/" class="px-3 py-1.5 rounded-lg text-slate-700 hover:text-coral-600 hover:bg-slate-100/80 transition-all nav-link" data-path="/">Home</a>
              <a href="#/shop" class="px-3 py-1.5 rounded-lg text-slate-700 hover:text-coral-600 hover:bg-slate-100/80 transition-all nav-link" data-path="/shop">Shop</a>
              <a href="#/categories" class="px-3 py-1.5 rounded-lg text-slate-700 hover:text-coral-600 hover:bg-slate-100/80 transition-all nav-link" data-path="/categories">Categories</a>
              <a href="#/brands" class="px-3 py-1.5 rounded-lg text-slate-700 hover:text-coral-600 hover:bg-slate-100/80 transition-all nav-link" data-path="/brands">Brands</a>
              <a href="#/fitness-rewards" class="px-3 py-1.5 rounded-lg text-coral-600 hover:text-coral-700 hover:bg-coral-50 transition-all flex items-center gap-1.5 nav-link" data-path="/fitness-rewards">
                <span class="flame-anim">🔥</span> Fitness Rewards
              </a>
            </nav>
          </div>

          <!-- GLOBAL SEARCH BAR (LIGHT THEME) -->
          <div class="flex-1 max-w-md hidden lg:block relative">
            <div class="relative flex items-center">
              <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none"></i>
              <input
                type="text"
                id="global-search-input"
                placeholder="Search products, brands, fitness offers..."
                oninput="FitComponents.handleSearchInput(this.value)"
                onfocus="FitComponents.showSearchDropdown()"
                class="w-full bg-slate-100/90 border border-slate-200 focus:border-coral-500 focus:bg-white rounded-full py-2 pl-10 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-coral-500 transition-all"
              />
              <button onclick="FitComponents.clearSearch()" id="clear-search-btn" class="hidden absolute right-3 text-slate-400 hover:text-slate-700">
                <i data-lucide="x" class="w-3.5 h-3.5"></i>
              </button>
            </div>

            <!-- SEARCH AUTOCOMPLETE POPUP -->
            <div id="search-autocomplete-box" class="hidden absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 z-50 max-h-96 overflow-y-auto">
              <!-- Populated dynamically -->
            </div>
          </div>

          <!-- ACTIONS: WISHLIST, CART, USER -->
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- Wishlist -->
            <a href="#/wishlist" class="relative p-2 text-slate-700 hover:text-coral-600 hover:bg-slate-100 rounded-xl transition-all" title="Wishlist">
              <i data-lucide="heart" class="w-5 h-5"></i>
              <span id="nav-wishlist-badge" class="${wishCount > 0 ? 'flex' : 'hidden'} absolute -top-1 -right-1 w-4 h-4 bg-coral-500 text-white rounded-full text-[10px] font-bold items-center justify-center">
                ${wishCount}
              </span>
            </a>

            <!-- Cart Trigger -->
            <a href="#/cart" class="relative p-2 text-slate-700 hover:text-coral-600 hover:bg-slate-100 rounded-xl transition-all flex items-center gap-2" title="Cart">
              <div class="relative">
                <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                <span id="nav-cart-badge" class="${cartCount > 0 ? 'flex' : 'hidden'} absolute -top-1.5 -right-1.5 w-4 h-4 bg-coral-500 text-white rounded-full text-[10px] font-bold items-center justify-center shadow-sm">
                  ${cartCount}
                </span>
              </div>
              <span class="text-xs font-bold text-slate-800 hidden xl:inline">Cart</span>
            </a>

            <!-- User Avatar & Dropdown or Login Buttons (Light Theme) -->
            ${(FitStore.user && FitStore.role !== 'GUEST') ? `
              <div class="relative group">
                <button class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-all text-left">
                  <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}" alt="Avatar" class="w-8 h-8 rounded-full border border-slate-200 object-cover" />
                  <div class="hidden xl:flex flex-col text-xs">
                    <span class="font-bold text-slate-900 leading-tight">${user.name || 'Shopper'}</span>
                    <span class="text-[10px] text-coral-600 font-bold uppercase">${FitStore.role}</span>
                  </div>
                  <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 hidden xl:inline"></i>
                </button>

                <!-- Dropdown Menu (Light Theme) -->
                <div class="hidden group-hover:block absolute right-0 top-full mt-1 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-150">
                  <div class="px-3 py-2 border-b border-slate-100">
                    <p class="font-bold text-slate-900 text-sm">${user.name || 'Customer'}</p>
                    <p class="text-slate-400 text-[11px] truncate">${user.email || 'customer@fitshop.com'}</p>
                    <div class="mt-1.5 flex items-center gap-1.5 text-amber-600 font-bold text-[11px]">
                      <span class="flame-anim">🔥</span> ${user.currentStreak || 4} Days Streak (${user.fitnessPoints || 820} Pts)
                    </div>
                  </div>

                  <div class="py-1">
                    <a href="#/profile" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                      <i data-lucide="user" class="w-4 h-4 text-slate-400"></i> My Profile
                    </a>
                    <a href="#/orders" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                      <i data-lucide="package" class="w-4 h-4 text-slate-400"></i> My Orders
                    </a>
                    <a href="#/fitness-rewards" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-coral-600">
                      <i data-lucide="award" class="w-4 h-4 text-amber-500"></i> My Rewards
                    </a>
                    <a href="#/challenges" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                      <i data-lucide="zap" class="w-4 h-4 text-coral-500"></i> My Challenges
                    </a>
                    <a href="#/profile" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                      <i data-lucide="settings" class="w-4 h-4 text-slate-400"></i> Settings
                    </a>
                  </div>

                  <div class="pt-1 border-t border-slate-100">
                    <button onclick="FitStore.confirmLogout('CUSTOMER')" class="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-bold transition-colors">
                      <i data-lucide="log-out" class="w-4 h-4 text-red-500"></i> Logout
                    </button>
                  </div>
                </div>
              </div>
            ` : `
              <div class="flex items-center gap-2">
                <button onclick="FitComponents.openAuthModal('login')" class="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all">
                  Login
                </button>
                <button onclick="FitComponents.openAuthModal('signup')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-coral-600 hover:bg-coral-500 text-white transition-all shadow-sm">
                  Sign Up
                </button>
              </div>
            `}

          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }
  },

  renderFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <!-- BRAND BIO -->
          <div class="lg:col-span-2">
            <a href="#/" class="flex items-center gap-2.5 mb-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-coral-600 to-coral-500 flex items-center justify-center text-white font-black text-xl shadow-md">
                <i data-lucide="zap" class="w-6 h-6 fill-white"></i>
              </div>
              <span class="font-heading font-extrabold text-2xl tracking-tight text-white">
                FIT<span class="text-coral-500">SHOP</span>
              </span>
            </a>
            <p class="text-xs font-bold text-coral-400 tracking-wider uppercase mb-2">Move More. Pay Less.</p>
            <p class="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              FitShop is India's first multi-category commerce marketplace that rewards your real-world fitness. Complete walking streaks, 5km runs, and gym workouts to unlock verified lower prices on fashion, tech, footwear, beauty, and home essentials.
            </p>
            <div class="flex items-center gap-3 text-slate-400">
              <span class="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 cursor-pointer transition-all"><i data-lucide="instagram" class="w-4 h-4"></i></span>
              <span class="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 cursor-pointer transition-all"><i data-lucide="twitter" class="w-4 h-4"></i></span>
              <span class="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 cursor-pointer transition-all"><i data-lucide="youtube" class="w-4 h-4"></i></span>
              <span class="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 cursor-pointer transition-all"><i data-lucide="linkedin" class="w-4 h-4"></i></span>
            </div>
          </div>

          <!-- SHOP CATEGORIES -->
          <div>
            <h4 class="font-heading font-bold text-white text-sm mb-4 tracking-wide uppercase">Shop All Categories</h4>
            <ul class="space-y-2.5 text-xs">
              <li><a href="#/category/fashion" class="hover:text-coral-400 transition-colors">Fashion & Apparel</a></li>
              <li><a href="#/category/electronics" class="hover:text-coral-400 transition-colors">Electronics & Audio</a></li>
              <li><a href="#/category/skincare-beauty" class="hover:text-coral-400 transition-colors">Skincare & Beauty</a></li>
              <li><a href="#/category/footwear" class="hover:text-coral-400 transition-colors">Performance Footwear</a></li>
              <li><a href="#/category/sports-sportswear" class="hover:text-coral-400 transition-colors">Sports & Sportswear</a></li>
              <li><a href="#/category/home-lifestyle" class="hover:text-coral-400 transition-colors">Home & Lifestyle</a></li>
              <li><a href="#/category/health-wellness" class="hover:text-coral-400 transition-colors">Health & Nutrition</a></li>
              <li><a href="#/category/grocery" class="hover:text-coral-400 transition-colors">Daily Essentials</a></li>
            </ul>
          </div>

          <!-- BRANDS & SELLER -->
          <div>
            <h4 class="font-heading font-bold text-white text-sm mb-4 tracking-wide uppercase">Brands & Sellers</h4>
            <ul class="space-y-2.5 text-xs">
              <li><a href="#/brands" class="hover:text-coral-400 transition-colors">Discover All Brands</a></li>
              <li><a href="#/brands" class="hover:text-coral-400 transition-colors">Emerging Brand Spotlight</a></li>
              <li><a href="#/seller/register" class="text-coral-400 font-bold hover:underline flex items-center gap-1"><i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i> Register Your Brand</a></li>
              <li><a href="#/seller/dashboard" class="hover:text-coral-400 transition-colors">Seller Portal Login</a></li>
              <li><a href="#/seller/offers" class="hover:text-coral-400 transition-colors">Create Fitness Offers</a></li>
              <li><a href="#/admin/dashboard" class="text-slate-500 hover:text-slate-300 transition-colors">Admin Gateway</a></li>
            </ul>
          </div>

          <!-- FITNESS & REWARDS -->
          <div>
            <h4 class="font-heading font-bold text-white text-sm mb-4 tracking-wide uppercase">Fitness & Rewards</h4>
            <ul class="space-y-2.5 text-xs">
              <li><a href="#/fitness-rewards" class="hover:text-amber-400 transition-colors flex items-center gap-1.5"><span class="flame-anim">🔥</span> Rewards Dashboard</a></li>
              <li><a href="#/fitness-rewards" class="hover:text-coral-400 transition-colors">Streak Mechanics</a></li>
              <li><a href="#/fitness-rewards" class="hover:text-coral-400 transition-colors">Activity Verification</a></li>
              <li><a href="javascript:FitComponents.openSimulatorModal()" class="text-emerald-400 font-bold hover:underline flex items-center gap-1"><i data-lucide="zap" class="w-3.5 h-3.5"></i> Health Connect Mock</a></li>
              <li><a href="#/profile" class="hover:text-coral-400 transition-colors">My Fitness Goals</a></li>
            </ul>
          </div>

        </div>

        <!-- BOTTOM STRIP -->
        <div class="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FITSHOP Technologies Pvt. Ltd. All rights reserved. Built with pride in India 🇮🇳</p>
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5 text-slate-400"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i> Verified Activity Engine</span>
            <span class="flex items-center gap-1.5 text-slate-400"><i data-lucide="lock" class="w-4 h-4 text-coral-500"></i> 100% Secure Checkout (₹ INR)</span>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }
  },

  renderProductCard(product, options = {}) {
    const pricing = FitStore.calculateProductPrice(product);
    const isWishlisted = FitStore.wishlist.includes(product.id);

    return `
      <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover flex flex-col group relative">
        
        <!-- TOP BRAND STRIP & WISHLIST -->
        <div class="p-3.5 pb-2 flex items-center justify-between border-b border-slate-100 bg-slate-50/60">
          <a href="#/brand/${product.brandId}" class="flex items-center gap-2 group/brand hover:opacity-80 transition-opacity">
            <div class="w-6 h-6 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center text-[10px] font-bold text-slate-700">
              ${product.brandName.substring(0, 2).toUpperCase()}
            </div>
            <span class="text-xs font-black text-slate-900 group-hover/brand:text-coral-600 transition-colors uppercase tracking-wider">${product.brandName}</span>
          </a>

          <button onclick="FitStore.toggleWishlist('${product.id}')" class="p-1.5 rounded-full hover:bg-white text-slate-400 hover:text-coral-500 transition-all" title="Wishlist">
            <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-coral-500 text-coral-500' : ''}"></i>
          </button>
        </div>

        <!-- IMAGE AREA -->
        <a href="#/product/${product.id}" class="block relative overflow-hidden bg-slate-50 aspect-square">
          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <!-- COUPON BADGE -->
          <div class="absolute top-2.5 left-2.5">
            ${pricing.isApplied ? `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500 text-white shadow-md">
                <i data-lucide="sparkles" class="w-3 h-3"></i> ${pricing.couponCode} Applied ✓
              </span>
            ` : pricing.hasUnlockedCoupon ? `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-500 text-white shadow-md">
                <i data-lucide="award" class="w-3 h-3"></i> Coupon Unlocked!
              </span>
            ` : `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/85 backdrop-blur-sm text-white border border-slate-700 shadow-sm">
                <i data-lucide="lock" class="w-3 h-3 text-coral-400"></i> ${pricing.discountPercent}% OFF 🔒 Locked
              </span>
            `}
          </div>

          <!-- RATING PILL -->
          <div class="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md text-[11px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
            <i data-lucide="star" class="w-3 h-3 fill-amber-400 text-amber-400"></i>
            <span>${product.rating || 4.8}</span>
            <span class="text-slate-400 text-[10px]">(${product.reviewsCount || 42})</span>
          </div>
        </a>

        <!-- CONTENT -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">${product.categoryName || product.category}</div>
            <a href="#/product/${product.id}" class="block font-heading font-bold text-slate-900 text-sm hover:text-coral-600 transition-colors line-clamp-2 leading-snug mb-2">
              ${product.name}
            </a>

            <!-- FITNESS REQUIREMENT BADGE -->
            <div class="bg-gradient-to-r ${pricing.isApplied ? 'from-emerald-50 to-emerald-100/60 border-emerald-200' : 'from-coral-50 to-rose-50 border-coral-200'} border p-2 rounded-xl text-xs mb-3 flex items-center justify-between">
              <div class="flex items-center gap-1.5 font-bold ${pricing.isApplied ? 'text-emerald-700' : 'text-coral-700'} truncate">
                <i data-lucide="${pricing.isApplied ? 'check-circle-2' : 'activity'}" class="w-3.5 h-3.5 flex-shrink-0"></i>
                <span class="truncate">${pricing.requirement}</span>
              </div>
              <span class="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded flex-shrink-0 ${pricing.isApplied ? 'bg-emerald-600 text-white' : 'bg-coral-600 text-white'}">
                ${pricing.discountPercent}% OFF
              </span>
            </div>
          </div>

          <!-- PRICING & ACTIONS -->
          <div class="pt-2 border-t border-slate-100 mt-auto">
            <div class="flex items-baseline justify-between mb-3">
              <div>
                <div class="text-[10px] text-slate-400 font-semibold uppercase">
                  ${pricing.isApplied ? 'Fitness Price Active' : 'Normal Price'}
                </div>
                <div class="flex items-baseline gap-2">
                  <span class="text-lg font-black font-heading ${pricing.isApplied ? 'text-emerald-600' : 'text-slate-900'}">
                    ₹${pricing.currentPrice.toLocaleString('en-IN')}
                  </span>
                  ${pricing.isApplied ? `
                    <span class="text-xs text-slate-400 line-through font-semibold">
                      ₹${pricing.originalPrice.toLocaleString('en-IN')}
                    </span>
                  ` : ''}
                </div>
              </div>
              
              <div class="text-right">
                <span class="inline-block text-[11px] font-bold ${pricing.isApplied ? 'text-emerald-700 bg-emerald-50' : 'text-coral-700 bg-coral-50'} px-2 py-0.5 rounded">
                  ${pricing.isApplied ? `Saved ₹${pricing.savings.toLocaleString('en-IN')}` : `Save ₹${pricing.savings.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            <!-- BUTTONS -->
            <div class="grid grid-cols-5 gap-2">
              <button onclick="FitStore.addToCart('${product.id}', 1)" class="col-span-4 bg-navy-900 hover:bg-coral-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm group-hover:bg-coral-600">
                <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i> Add to Cart
              </button>
              <a href="#/product/${product.id}" class="col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center transition-all" title="View Details">
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>
          </div>

        </div>

      </div>
    `;
  },

  renderStreakVisual(currentStreak = 4, targetDays = 5) {
    let daysHtml = '';
    for (let day = 1; day <= targetDays; day++) {
      const isDone = day <= currentStreak;
      daysHtml += `
        <div class="flex flex-col items-center gap-1.5 flex-1">
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all ${
            isDone
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 ring-2 ring-amber-300'
              : 'bg-slate-100 text-slate-400 border border-slate-300'
          }">
            ${isDone ? '<i data-lucide="check" class="w-5 h-5 stroke-[3]"></i>' : `Day ${day}`}
          </div>
          <span class="text-[10px] font-bold ${isDone ? 'text-amber-600' : 'text-slate-400'}">
            ${isDone ? 'Day ' + day + ' ✓' : 'Day ' + day}
          </span>
        </div>
      `;
    }

    return `
      <div class="bg-gradient-to-br from-amber-50 to-orange-50/70 border border-amber-200 p-5 rounded-2xl">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="flame-anim text-2xl">🔥</span>
            <div>
              <h4 class="font-heading font-extrabold text-slate-900 text-base">5-Day Walking Streak</h4>
              <p class="text-xs text-slate-500">${currentStreak} of ${targetDays} days completed — 20% discount unlock at Day 5</p>
            </div>
          </div>
          <span class="text-xs font-black px-2.5 py-1 rounded-full bg-amber-500 text-white uppercase tracking-wider">
            ${currentStreak >= targetDays ? 'Unlocked 🎉' : 'In Progress'}
          </span>
        </div>

        <div class="flex items-center justify-between gap-2 pt-2">
          ${daysHtml}
        </div>
      </div>
    `;
  },

  renderToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'coral') icon = 'alert-circle';
    if (type === 'gold') icon = 'flame';

    toast.innerHTML = `
      <i data-lucide="${icon}" class="w-5 h-5 flex-shrink-0 ${type === 'success' ? 'text-emerald-400' : type === 'gold' ? 'text-amber-400' : 'text-coral-400'}"></i>
      <div class="text-xs font-semibold leading-snug flex-1">${message}</div>
      <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white p-1">
        <i data-lucide="x" class="w-3.5 h-3.5"></i>
      </button>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s, transform 0.4s';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  },

  openSimulatorModal() {
    const modal = document.getElementById('simulator-modal');
    if (modal) {
      modal.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
  },

  closeSimulatorModal() {
    const modal = document.getElementById('simulator-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  },

  handleSearchInput(query) {
    const clearBtn = document.getElementById('clear-search-btn');
    const box = document.getElementById('search-autocomplete-box');
    if (!box) return;

    if (!query || query.trim().length === 0) {
      if (clearBtn) clearBtn.classList.add('hidden');
      box.classList.add('hidden');
      return;
    }

    if (clearBtn) clearBtn.classList.remove('hidden');

    const q = query.toLowerCase().trim();
    const matchedProducts = FitStore.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brandName.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedBrands = FitStore.brands.filter(b =>
      b.name.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedCategories = FitStore.categories.filter(c =>
      c.name.toLowerCase().includes(q)
    ).slice(0, 3);

    let html = '';

    if (matchedCategories.length > 0) {
      html += `<div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-2">Categories</div>`;
      matchedCategories.forEach(c => {
        html += `
          <a href="#/category/${c.slug}" onclick="FitComponents.hideSearchDropdown()" class="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 text-slate-200 text-xs font-semibold">
            <i data-lucide="tag" class="w-3.5 h-3.5 text-coral-400"></i> ${c.name}
          </a>
        `;
      });
    }

    if (matchedBrands.length > 0) {
      html += `<div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2.5 mb-1.5 px-2">Brands</div>`;
      matchedBrands.forEach(b => {
        html += `
          <a href="#/brand/${b.id}" onclick="FitComponents.hideSearchDropdown()" class="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 text-slate-200 text-xs font-semibold">
            <i data-lucide="store" class="w-3.5 h-3.5 text-amber-400"></i> ${b.name} (${b.category})
          </a>
        `;
      });
    }

    if (matchedProducts.length > 0) {
      html += `<div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2.5 mb-1.5 px-2">Products</div>`;
      matchedProducts.forEach(p => {
        const pricing = FitStore.calculateProductPrice(p);
        html += `
          <a href="#/product/${p.id}" onclick="FitComponents.hideSearchDropdown()" class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-slate-200 text-xs">
            <div class="flex items-center gap-2.5">
              <img src="${p.image}" class="w-8 h-8 rounded-md object-cover" />
              <div>
                <div class="font-bold text-white line-clamp-1">${p.name}</div>
                <div class="text-[10px] text-slate-400">${p.brandName} • ${p.fitnessRequirement}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-bold text-coral-400">₹${pricing.unlockedPrice}</div>
              <div class="text-[10px] text-slate-400 line-through">₹${pricing.originalPrice}</div>
            </div>
          </a>
        `;
      });
    }

    if (!html) {
      html = `<div class="p-4 text-center text-xs text-slate-400">No matching products or brands found for "${query}"</div>`;
    }

    html += `
      <div class="pt-2 mt-2 border-t border-slate-800 text-center">
        <a href="#/shop?search=${encodeURIComponent(query)}" onclick="FitComponents.hideSearchDropdown()" class="text-xs font-bold text-coral-400 hover:underline">
          View all results in Shop &rarr;
        </a>
      </div>
    `;

    box.innerHTML = html;
    box.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  showSearchDropdown() {
    const input = document.getElementById('global-search-input');
    if (input && input.value.trim().length > 0) {
      this.handleSearchInput(input.value);
    }
  },

  hideSearchDropdown() {
    const box = document.getElementById('search-autocomplete-box');
    if (box) setTimeout(() => box.classList.add('hidden'), 200);
  },

  clearSearch() {
    const input = document.getElementById('global-search-input');
    if (input) {
      input.value = '';
      this.handleSearchInput('');
    }
  },

  updateActiveNavs(path) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkPath = link.getAttribute('data-path');
      if (linkPath === path || (path.startsWith(linkPath) && linkPath !== '/')) {
        link.classList.add('text-white', 'bg-slate-800');
        link.classList.remove('text-slate-300');
      } else {
        link.classList.remove('text-white', 'bg-slate-800');
        link.classList.add('text-slate-300');
      }
    });

    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      const btnPath = btn.getAttribute('data-path');
      if (btnPath === path || (path.startsWith(btnPath) && btnPath !== '/')) {
        btn.classList.add('text-coral-500');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('text-coral-500');
        btn.classList.add('text-slate-400');
      }
    });
  },

  openChallengeModal(productId, offerId) {
    const modal = document.getElementById('challenge-modal');
    if (!modal) return;

    const product = (FitStore.products || []).find(p => p.id === productId) || (FitStore.products && FitStore.products[0]);
    if (!product) return;

    const availableOfferIds = product.availableOfferIds || [product.offerId || 'off-run20'];
    const offer = (FitStore.offers || []).find(o => o.id === offerId) 
               || (FitStore.offers || []).find(o => o.id === availableOfferIds[0])
               || product.primaryOffer 
               || (FitStore.offers && FitStore.offers[0]);

    if (!offer) return;

    const challenge = FitStore.getChallenge(product.id, offer.id);
    const lastV = (challenge && challenge.dailyVerifications && challenge.dailyVerifications.length > 0)
      ? challenge.dailyVerifications[challenge.dailyVerifications.length - 1]
      : null;
    const isUnlocked = FitStore.isCouponUnlocked(product.id, offer.couponCode);
    const isApplied = FitStore.isCouponApplied(product.id, offer.couponCode);

    const totalDays = offer.totalDays || 3;
    const daysCompleted = challenge ? challenge.daysCompleted : 0;
    const dailyTarget = offer.dailyTarget || 5;
    const unit = offer.unit || 'km';
    const discountPercent = offer.discountPercent || product.fitnessDiscountPercent || 20;
    const originalPrice = product.originalPrice;
    const discountAmount = Math.round(originalPrice * (discountPercent / 100));
    const finalPrice = originalPrice - discountAmount;

    // Determine current phase: 'NOT_STARTED', 'IN_PROGRESS', 'UNLOCKED', 'APPLIED'
    let phase = 'NOT_STARTED';
    if (isApplied) {
      phase = 'APPLIED';
    } else if (isUnlocked || daysCompleted >= totalDays) {
      phase = 'UNLOCKED';
    } else if (challenge) {
      phase = 'IN_PROGRESS';
    }

    // Days circles
    let dayCirclesHtml = '';
    for (let i = 1; i <= totalDays; i++) {
      if (i <= daysCompleted) {
        dayCirclesHtml += `
          <div class="flex flex-col items-center gap-1">
            <div class="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow-md">
              <i data-lucide="check" class="w-5 h-5 stroke-[3]"></i>
            </div>
            <span class="text-[10px] font-bold text-emerald-700">Day ${i} ✓</span>
          </div>
        `;
      } else if (i === daysCompleted + 1 && phase === 'IN_PROGRESS') {
        dayCirclesHtml += `
          <div class="flex flex-col items-center gap-1">
            <div class="w-10 h-10 rounded-full bg-coral-500 text-white font-bold text-xs flex items-center justify-center animate-pulse shadow-md">
              ${i}
            </div>
            <span class="text-[10px] font-bold text-coral-600">Today</span>
          </div>
        `;
      } else {
        dayCirclesHtml += `
          <div class="flex flex-col items-center gap-1">
            <div class="w-10 h-10 rounded-full border-2 border-slate-300 text-slate-400 font-bold text-xs flex items-center justify-center bg-slate-50">
              ○
            </div>
            <span class="text-[10px] font-medium text-slate-400">Day ${i}</span>
          </div>
        `;
      }
    }

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        <!-- CLOSE BUTTON -->
        <button onclick="FitComponents.closeChallengeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <!-- HEADER -->
        <div class="flex items-center gap-2 mb-1">
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-coral-100 text-coral-700">
            <i data-lucide="lock" class="w-3 h-3"></i> Fitness Challenge
          </span>
          <span class="text-slate-400 text-xs">•</span>
          <span class="text-xs font-bold text-slate-500 uppercase">${product.brandName}</span>
        </div>

        <h2 class="text-2xl font-black font-heading text-slate-900 leading-tight">
          UNLOCK YOUR COUPON
        </h2>
        <p class="text-xs text-slate-500 mt-0.5 mb-5 font-medium">
          ${product.name}
        </p>

        <!-- PRODUCT & REWARD HIGHLIGHT CARD -->
        <div class="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-between mb-5">
          <div class="flex items-center gap-3">
            <img src="${product.image}" alt="${product.name}" class="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-white shadow-sm" />
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Target Reward</span>
              <div class="text-lg font-black font-heading text-coral-600">
                ${discountPercent}% OFF
              </div>
              <div class="text-xs text-slate-600">
                Coupon: <strong class="text-slate-900 tracking-wider">${offer.couponCode}</strong>
              </div>
            </div>
          </div>

          <div class="text-right border-l border-slate-200 pl-4">
            <div class="text-[10px] font-semibold text-slate-400 uppercase">Price Breakdown</div>
            <div class="text-xs text-slate-400 line-through">₹${originalPrice.toLocaleString('en-IN')}</div>
            <div class="text-base font-black text-emerald-600 font-heading">₹${finalPrice.toLocaleString('en-IN')}</div>
            <span class="text-[10px] font-bold text-emerald-700">Save ₹${discountAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- CHALLENGE DETAILS -->
        <div class="space-y-4 mb-6">
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span class="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Challenge</span>
              <span class="font-extrabold text-slate-900 flex items-center gap-1.5 text-sm">
                <i data-lucide="${offer.activityIcon || 'flame'}" class="w-4 h-4 text-coral-500"></i>
                ${dailyTarget} ${unit} / day
              </span>
            </div>
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span class="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Duration</span>
              <span class="font-extrabold text-slate-900 flex items-center gap-1.5 text-sm">
                <i data-lucide="calendar" class="w-4 h-4 text-amber-500"></i>
                ${totalDays} Days Required
              </span>
            </div>
          </div>

          <!-- PROGRESS SECTION -->
          <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-slate-700">Challenge Progress:</span>
              <span class="font-extrabold ${daysCompleted >= totalDays ? 'text-emerald-600' : 'text-coral-600'}">
                ${daysCompleted} / ${totalDays} Days Completed
              </span>
            </div>

            <!-- DAY CIRCLES -->
            <div class="flex items-center justify-around py-2 border-y border-slate-100">
              ${dayCirclesHtml}
            </div>

            <!-- VERIFICATION FEEDBACK BOX -->
            <div id="challenge-verify-feedback" class="text-xs text-center py-1 text-slate-500">
              ${phase === 'NOT_STARTED' ? 'Click "START CHALLENGE" below to begin tracking your activity.' : ''}
              ${phase === 'IN_PROGRESS' && !lastV ? `Ready for Day ${daysCompleted + 1} verification via connected health sensor.` : ''}
              ${lastV ? `
                <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 mt-1">
                  <div class="font-bold flex items-center justify-center gap-1 text-emerald-700 mb-0.5">
                    <i data-lucide="check-circle" class="w-4 h-4"></i> Status: ✓ Activity Verified
                  </div>
                  <div class="flex items-center justify-around text-[11px] text-slate-600 mt-1">
                    <span>Required: <strong>${lastV.requiredValue} ${lastV.unit}</strong></span>
                    <span>Verified: <strong class="text-emerald-700 font-mono font-bold">${lastV.verifiedValue} ${lastV.unit}</strong></span>
                  </div>
                </div>
              ` : ''}
              ${phase === 'UNLOCKED' ? '<span class="text-emerald-600 font-bold block mt-1">✓ Challenge Requirement Met! Coupon is unlocked.</span>' : ''}
              ${phase === 'APPLIED' ? '<span class="text-emerald-600 font-bold block mt-1">✓ Coupon Applied! Discounted price is active on this product.</span>' : ''}
            </div>
          </div>
        </div>

        <!-- ACTION BUTTONS ACCORDING TO PHASE -->
        <div id="challenge-action-area">
          ${phase === 'NOT_STARTED' ? `
            <button onclick="FitComponents.handleStartChallenge('${offer.id}', '${product.id}')" class="w-full py-4 rounded-2xl font-heading font-black text-sm text-white bg-coral-600 hover:bg-coral-500 transition-all shadow-lg shadow-coral-600/30 flex items-center justify-center gap-2">
              <i data-lucide="zap" class="w-4 h-4"></i> START CHALLENGE
            </button>
          ` : ''}

          ${phase === 'IN_PROGRESS' ? `
            <button onclick="FitComponents.handleVerifyChallengeStep('${offer.id}', '${product.id}')" id="btn-verify-activity" class="w-full py-4 rounded-2xl font-heading font-black text-sm text-white bg-navy-900 hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i> Verify Today's Activity
            </button>
          ` : ''}

          ${phase === 'UNLOCKED' ? `
            <div class="space-y-2.5">
              <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <span class="text-xs font-black text-emerald-800 uppercase tracking-wider block">🎉 COUPON UNLOCKED</span>
                <span class="text-xl font-black text-emerald-600 font-heading tracking-widest block my-0.5">${offer.couponCode}</span>
                <span class="text-xs text-emerald-700 block">${discountPercent}% OFF Ready for Immediate Application</span>
              </div>
              <button onclick="FitComponents.handleApplyCoupon('${product.id}', '${offer.couponCode}')" class="w-full py-4 rounded-2xl font-heading font-black text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2">
                <i data-lucide="sparkles" class="w-4 h-4"></i> Apply Coupon
              </button>
            </div>
          ` : ''}

          ${phase === 'APPLIED' ? `
            <div class="space-y-2.5">
              <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-center">
                <span class="text-xs font-black text-emerald-800 uppercase tracking-wider block">✓ COUPON ACTIVE & APPLIED</span>
                <span class="text-sm font-black text-emerald-600 font-heading tracking-widest">${offer.couponCode} (-${discountPercent}%)</span>
                <span class="text-xs text-slate-600 block mt-0.5">Price reduced to ₹${finalPrice.toLocaleString('en-IN')}</span>
              </div>
              <button onclick="FitComponents.closeChallengeModal(); FitStore.addToCart('${product.id}', 1)" class="w-full py-4 rounded-2xl font-heading font-black text-sm text-white bg-coral-600 hover:bg-coral-500 transition-all shadow-lg shadow-coral-600/30 flex items-center justify-center gap-2">
                <i data-lucide="shopping-cart" class="w-4 h-4"></i> Add to Cart at Discounted Price
              </button>
            </div>
          ` : ''}
        </div>

        <!-- FOOTER DISCLOSURE -->
        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span class="flex items-center gap-1">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-500"></i> Mock Fitness Verification Service
          </span>
          <span>Ready for Health Connect & Apple Health</span>
        </div>

      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  closeChallengeModal() {
    const modal = document.getElementById('challenge-modal');
    if (modal) modal.classList.add('hidden');
  },

  async handleStartChallenge(offerId, productId) {
    const res = await FitStore.startChallenge(offerId, productId);
    if (res) {
      this.openChallengeModal(productId, offerId);
    }
  },

  async handleVerifyChallengeStep(offerId, productId) {
    const btn = document.getElementById('btn-verify-activity');
    const feedback = document.getElementById('challenge-verify-feedback');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-coral-400"></i> Verifying Activity...`;
      if (window.lucide) lucide.createIcons();
    }
    if (feedback) {
      feedback.innerHTML = `
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-pulse font-medium">
          <div class="font-bold flex items-center justify-center gap-1 mb-0.5">
            <i data-lucide="activity" class="w-3.5 h-3.5 text-amber-600"></i> Verifying Activity...
          </div>
          Connecting to Mock Fitness Service & reading sensor data...
        </div>
      `;
      if (window.lucide) lucide.createIcons();
    }

    // Realistic verification simulation delay (800ms)
    setTimeout(async () => {
      const res = await FitStore.verifyChallengeStep(offerId, productId);
      if (res && res.success) {
        const v = res.verification;
        if (feedback) {
          feedback.innerHTML = `
            <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 animate-in fade-in duration-150">
              <div class="font-black flex items-center justify-center gap-1.5 text-emerald-700 mb-1">
                <i data-lucide="check-circle" class="w-4 h-4"></i> Status: ✓ Activity Verified
              </div>
              <div class="flex items-center justify-around text-[11px] text-slate-700 font-bold">
                <span>Required: <strong>${v.requiredValue} ${v.unit}</strong></span>
                <span>Verified: <strong class="text-emerald-700 font-mono">${v.verifiedValue} ${v.unit}</strong></span>
              </div>
            </div>
          `;
          if (window.lucide) lucide.createIcons();
        }

        setTimeout(() => {
          this.openChallengeModal(productId, offerId);
        }, 600);
      } else {
        if (btn) btn.disabled = false;
      }
    }, 800);
  },

  async handleApplyCoupon(productId, couponCode) {
    const ok = await FitStore.applyCoupon(productId, couponCode);
    if (ok) {
      this.closeChallengeModal();
    }
  },

  openAuthModal(mode = 'login') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button onclick="document.getElementById('auth-modal').classList.add('hidden')" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="text-center mb-5">
          <div class="w-12 h-12 rounded-xl bg-coral-50 text-coral-600 flex items-center justify-center mx-auto mb-2">
            <i data-lucide="zap" class="w-6 h-6"></i>
          </div>
          <h3 class="text-xl font-bold font-heading text-navy-900">${mode === 'login' ? 'Welcome to FitShop' : 'Create FitShop Account'}</h3>
          <p class="text-xs text-slate-500">Shop your favorite brands and unlock prices through activity</p>
        </div>

        <form onsubmit="event.preventDefault(); FitComponents.handleAuthSubmit('${mode}');" class="space-y-3.5 text-xs">
          ${mode === 'signup' ? `
            <div>
              <label class="block font-bold text-slate-700 mb-1">Full Name</label>
              <input type="text" id="auth-name" required value="Mohammad Rizwan" class="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-coral-500 outline-none" />
            </div>
          ` : ''}

          <div>
            <label class="block font-bold text-slate-700 mb-1">Email Address</label>
            <input type="email" id="auth-email" required value="customer@fitshop.com" class="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-coral-500 outline-none" />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Password</label>
            <input type="password" id="auth-pwd" required value="••••••••" class="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-coral-500 outline-none" />
          </div>

          ${mode === 'signup' ? `
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-2">
              <label class="block font-bold text-slate-700 mb-1">Optional: Select Primary Fitness Goal</label>
              <select id="auth-goal" class="w-full bg-white border rounded-lg px-2 py-1.5 text-xs outline-none">
                <option>Improve Stamina</option>
                <option>Stay Active</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>General Fitness</option>
              </select>
            </div>
          ` : ''}

          <button type="submit" class="w-full bg-coral-600 hover:bg-coral-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-md mt-2">
            ${mode === 'login' ? 'Sign In' : 'Complete Registration & Start Shopping'}
          </button>
        </form>

        <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs">
          <span class="text-slate-500">${mode === 'login' ? "Don't have an account?" : "Already registered?"}</span>
          <button onclick="FitComponents.openAuthModal('${mode === 'login' ? 'signup' : 'login'}')" class="font-bold text-coral-600 hover:underline">
            ${mode === 'login' ? 'Create Account' : 'Sign In'}
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  async handleAuthSubmit(mode) {
    const email = document.getElementById('auth-email')?.value || 'customer@fitshop.com';
    document.getElementById('auth-modal').classList.add('hidden');
    await FitStore.login(email, 'CUSTOMER', true);
  },

  renderAccessRestricted(opts = {}) {
    const app = document.getElementById('app');
    if (!app) return;

    const currentRole = opts.currentRole || FitStore.role || 'CUSTOMER';
    const requiredRole = opts.requiredRole || 'SELLER';
    const reason = opts.reason || "You do not have permission to access this portal.";
    const returnPath = opts.returnPath || (requiredRole === 'SELLER' ? '/shop' : '/');
    const returnText = opts.returnText || (requiredRole === 'SELLER' ? 'Return to Shop' : 'Return to Home');

    app.innerHTML = `
      <div class="min-h-[75vh] flex items-center justify-center p-4 sm:p-8 bg-[#F8FAFC]">
        <div class="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 text-center animate-in fade-in zoom-in-95 duration-200">
          
          <!-- LOCK ICON -->
          <div class="w-16 h-16 rounded-2xl bg-coral-50 border border-coral-200 text-coral-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <i data-lucide="lock" class="w-8 h-8"></i>
          </div>

          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-coral-100 text-coral-800 mb-2">
            Security Authorization
          </span>

          <h1 class="text-2xl sm:text-3xl font-heading font-black text-slate-900 leading-tight">
            ACCESS RESTRICTED
          </h1>

          <p class="text-xs text-slate-600 font-medium mt-2 mb-6 leading-relaxed">
            ${reason}
          </p>

          <!-- ROLE COMPARISON BOX -->
          <div class="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left mb-6">
            <div class="border-r border-slate-200 pr-2">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Your Account Role</span>
              <span class="inline-flex items-center gap-1 font-heading font-black text-xs text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs uppercase">
                <i data-lucide="user" class="w-3.5 h-3.5 text-slate-500"></i> ${currentRole}
              </span>
            </div>
            <div class="pl-2">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Required Role</span>
              <span class="inline-flex items-center gap-1 font-heading font-black text-xs text-coral-700 bg-coral-50 px-2.5 py-1 rounded-lg border border-coral-200 uppercase">
                <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-coral-500"></i> ${requiredRole}
              </span>
            </div>
          </div>

          <!-- ACTION BUTTONS -->
          <div class="space-y-2.5">
            <button
              onclick="FitStore.navigate('${returnPath}')"
              class="w-full py-3.5 rounded-xl font-heading font-black text-xs text-white bg-navy-900 hover:bg-coral-600 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <i data-lucide="arrow-left" class="w-4 h-4"></i> ${returnText}
            </button>

            ${currentRole !== 'CUSTOMER' ? `
              <button
                onclick="FitStore.navigate('/')"
                class="w-full py-3 rounded-xl font-heading font-bold text-xs text-slate-600 hover:bg-slate-100 transition-all"
              >
                Return to Storefront
              </button>
            ` : ''}
          </div>

        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  openLogoutModal(targetRole = null) {
    const modal = document.getElementById('logout-modal');
    if (!modal) return;

    const role = targetRole || FitStore.role || 'CUSTOMER';
    const roleTitle = role === 'SELLER' ? 'Seller Portal' : role === 'ADMIN' ? 'Admin Portal' : 'FitShop Account';

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 text-center">
        
        <div class="w-12 h-12 rounded-2xl bg-coral-50 text-coral-600 flex items-center justify-center mx-auto mb-3">
          <i data-lucide="log-out" class="w-6 h-6"></i>
        </div>

        <h3 class="text-lg font-heading font-black text-slate-900">Confirm Logout</h3>
        <p class="text-xs text-slate-500 mt-1 mb-6">Are you sure you want to log out of your ${roleTitle}?</p>

        <div class="grid grid-cols-2 gap-3 text-xs font-bold">
          <button
            onclick="FitComponents.closeLogoutModal()"
            class="py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onclick="FitStore.logout('${role}')"
            class="py-3 rounded-xl bg-coral-600 hover:bg-coral-700 text-white shadow-md transition-all font-black flex items-center justify-center gap-1.5"
          >
            <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Logout
          </button>
        </div>

      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  closeLogoutModal() {
    const modal = document.getElementById('logout-modal');
    if (modal) modal.classList.add('hidden');
  }
};
