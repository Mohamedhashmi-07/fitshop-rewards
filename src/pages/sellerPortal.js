// FITSHOP Seller & Brand Owner Portal Controller (FitPages.seller)
window.FitPages = window.FitPages || {};

FitPages.seller = {
  activeTab: 'dashboard', // dashboard, products, orders, customers, offers, inventory, analytics, brand, settings

  render(tab = 'dashboard') {
    const app = document.getElementById('app');
    if (!app) return;

    this.activeTab = tab;

    // DEDICATED SELLER LOGIN VIEW
    if (tab === 'login') {
      app.innerHTML = `
        <div class="min-h-[80vh] flex items-center justify-center p-4 sm:p-8 bg-[#F8FAFC]">
          <div class="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 animate-in fade-in zoom-in-95 duration-200">
            
            <div class="text-center mb-6">
              <div class="w-14 h-14 rounded-2xl bg-navy-950 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <i data-lucide="store" class="w-7 h-7 text-coral-500"></i>
              </div>
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-coral-100 text-coral-700 mb-1">
                Merchant Center
              </span>
              <h1 class="text-2xl font-black font-heading text-slate-900">Seller Portal Login</h1>
              <p class="text-xs text-slate-500 mt-1">Manage brand catalogs, inventory, and activity-linked offers</p>
            </div>

            <form onsubmit="event.preventDefault(); const em = document.getElementById('seller-login-email').value; FitStore.login(em, 'SELLER', true);" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Seller Email</label>
                <input
                  type="email"
                  id="seller-login-email"
                  required
                  value="seller@fitshop.com"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-coral-500 outline-none text-slate-800"
                />
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value="••••••••••••"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-coral-500 outline-none text-slate-800"
                />
              </div>

              <button
                type="submit"
                class="w-full py-3.5 rounded-xl font-heading font-black text-xs text-white bg-navy-900 hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <i data-lucide="log-in" class="w-4 h-4"></i> Sign In to Seller Portal
              </button>
            </form>

            <div class="mt-6 pt-4 border-t border-slate-100 text-center">
              <span class="text-[11px] text-slate-400 block mb-2">Demo Brand Credentials:</span>
              <button
                onclick="FitStore.login('seller@fitshop.com', 'SELLER', true)"
                class="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-500"></i> Quick Login as Stepz Footwear (Vikram Malhotra)
              </button>
            </div>

            <div class="mt-4 text-center">
              <a href="#/shop" class="text-xs font-bold text-coral-600 hover:underline inline-flex items-center gap-1">
                &larr; Return to FitShop Storefront
              </a>
            </div>

          </div>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    const currentBrand = (FitStore.brands || []).find(b => b.id === 'b-stepz') || (FitStore.brands && FitStore.brands[0]);
    const sellerProducts = (FitStore.products || []).filter(p => p.brandId === currentBrand.id);
    const sellerOffers = (FitStore.offers || []).filter(o => o.linkedProductIds && o.linkedProductIds.some(id => sellerProducts.some(p => p.id === id)));

    app.innerHTML = `
      <!-- SELLER TOP BAR -->
      <div class="bg-navy-950 text-white border-b border-slate-800 py-3 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img src="${currentBrand.logo}" class="w-9 h-9 rounded-xl object-cover border border-slate-700 bg-white" />
            <div>
              <span class="font-heading font-black text-sm text-white flex items-center gap-1.5">
                ${currentBrand.name} <span class="px-2 py-0.2 rounded-full text-[9px] font-bold bg-coral-500 text-white uppercase">Seller Portal</span>
              </span>
              <span class="text-[11px] text-slate-400">Vikram Malhotra (Brand Owner)</span>
            </div>
          </div>

          <div class="flex items-center gap-2.5 text-xs">
            <button onclick="FitStore.navigate('/shop')" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1">
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i> View Storefront
            </button>
            <button onclick="FitStore.confirmLogout('SELLER')" class="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-colors flex items-center gap-1 font-bold border border-red-500/30">
              <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Logout
            </button>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- SELLER SIDEBAR (Section 4 Navigation Requirement) -->
          <aside class="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1 text-xs font-bold">
            ${[
              { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
              { id: 'products', label: 'Products', icon: 'package' },
              { id: 'orders', label: 'Orders', icon: 'shopping-bag' },
              { id: 'customers', label: 'Customers', icon: 'users' },
              { id: 'offers', label: 'Fitness Offers', icon: 'zap' },
              { id: 'inventory', label: 'Inventory', icon: 'boxes' },
              { id: 'analytics', label: 'Analytics', icon: 'bar-chart-2' },
              { id: 'brand', label: 'Brand Profile', icon: 'store' },
              { id: 'settings', label: 'Settings', icon: 'settings' }
            ].map(item => `
              <button
                onclick="FitPages.seller.switchTab('${item.id}')"
                class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                  this.activeTab === item.id
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }"
              >
                <i data-lucide="${item.icon}" class="w-4 h-4"></i>
                <span>${item.label}</span>
              </button>
            `).join('')}

            <!-- CLEARLY VISIBLE SELLER LOGOUT BUTTON (Section 4) -->
            <div class="pt-2 mt-2 border-t border-slate-100">
              <button
                onclick="FitStore.confirmLogout('SELLER')"
                class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left text-red-600 hover:bg-red-50 font-bold"
              >
                <i data-lucide="log-out" class="w-4 h-4 text-red-500"></i>
                <span>Logout</span>
              </button>
            </div>
          </aside>

          <!-- SELLER MAIN WORKSPACE -->
          <main class="lg:col-span-9" id="seller-content">
            <!-- Rendered by renderContent() -->
          </main>

        </div>
      </div>

      <!-- ADD PRODUCT MODAL -->
      <div id="add-product-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 modal-overlay">
        <!-- Rendered dynamically -->
      </div>

      <!-- CREATE OFFER MODAL -->
      <div id="create-offer-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 modal-overlay">
        <!-- Rendered dynamically -->
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    this.renderContent();
  },

  switchTab(tabId) {
    this.activeTab = tabId;
    this.render(tabId);
  },

  renderContent() {
    const container = document.getElementById('seller-content');
    if (!container) return;

    const brand = (FitStore.brands || []).find(b => b.id === 'b-stepz') || FitStore.brands[0];
    const products = (FitStore.products || []).filter(p => p.brandId === brand.id);
    const offers = (FitStore.offers || []).filter(o => o.linkedProductIds && o.linkedProductIds.some(id => products.some(p => p.id === id)));

    if (this.activeTab === 'dashboard') {
      container.innerHTML = `
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-heading font-black text-slate-900">Seller Dashboard</h2>
              <p class="text-xs text-slate-500">Real-time performance metrics for ${brand.name}</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="FitPages.seller.openAddProductModal()" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-navy-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition-all">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Product
              </button>
              <button onclick="FitPages.seller.openCreateOfferModal()" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-coral-600 hover:bg-coral-500 text-white flex items-center gap-1.5 transition-all shadow-sm">
                <i data-lucide="zap" class="w-3.5 h-3.5"></i> Create Fitness Offer
              </button>
            </div>
          </div>

          <!-- KPI STAT CARDS (7 CARDS REQUIRED BY SPEC) -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Products</span>
              <span class="text-2xl font-black font-heading text-slate-900">${products.length || 24}</span>
              <span class="text-[10px] text-emerald-600 font-semibold block mt-1">● All active in marketplace</span>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Orders</span>
              <span class="text-2xl font-black font-heading text-slate-900">2,450</span>
              <span class="text-[10px] text-emerald-600 font-semibold block mt-1">+14% vs last month</span>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Customers</span>
              <span class="text-2xl font-black font-heading text-slate-900">1,842</span>
              <span class="text-[10px] text-slate-500 block mt-1">72% recurring buyers</span>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Revenue</span>
              <span class="text-2xl font-black font-heading text-coral-600">₹8,45,200</span>
              <span class="text-[10px] text-emerald-600 font-semibold block mt-1">₹1,26,780 via Fitness Unlocks</span>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Products Sold</span>
              <span class="text-2xl font-black font-heading text-slate-900">3,120</span>
              <span class="text-[10px] text-slate-500 block mt-1">Across all categories</span>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Remaining Stock</span>
              <span class="text-2xl font-black font-heading text-slate-900">4,820</span>
              <span class="text-[10px] text-amber-600 font-semibold block mt-1">2 Low-stock SKUs</span>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm sm:col-span-2">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Fitness Offers</span>
              <div class="flex items-center justify-between mt-1">
                <span class="text-2xl font-black font-heading text-emerald-600">${offers.length || 8} Active</span>
                <span class="text-xs font-bold text-coral-600 bg-coral-50 px-2.5 py-1 rounded-full">Avg 18% Discount</span>
              </div>
            </div>
          </div>

          <!-- RECENT PRODUCTS TABLE -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-heading font-bold text-base text-slate-900">Featured Products in Brand Store</h3>
              <button onclick="FitPages.seller.switchTab('products')" class="text-xs font-bold text-coral-600 hover:underline">View All &rarr;</button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                    <th class="pb-2">Product</th>
                    <th class="pb-2">Price</th>
                    <th class="pb-2">Fitness Offer</th>
                    <th class="pb-2">Stock</th>
                    <th class="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${products.slice(0, 5).map(p => `
                    <tr class="hover:bg-slate-50">
                      <td class="py-3 flex items-center gap-3">
                        <img src="${p.image}" class="w-9 h-9 rounded-lg object-cover" />
                        <div>
                          <div class="font-bold text-slate-800">${p.name}</div>
                          <div class="text-[10px] text-slate-400">${p.sku}</div>
                        </div>
                      </td>
                      <td class="py-3 font-bold text-slate-900">₹${p.originalPrice.toLocaleString('en-IN')}</td>
                      <td class="py-3">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-coral-50 text-coral-600 border border-coral-200">
                          ${p.fitnessDiscountPercent}% OFF (${p.fitnessRequirement})
                        </span>
                      </td>
                      <td class="py-3 font-semibold text-slate-700">${p.stock} units</td>
                      <td class="py-3 text-right">
                        <button onclick="FitPages.seller.deleteProduct('${p.id}')" class="text-slate-400 hover:text-red-600 p-1">
                          <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'products') {
      container.innerHTML = `
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-heading font-black text-slate-900">Product Management</h2>
              <p class="text-xs text-slate-500">Manage catalog, pricing, images, and tied fitness offers</p>
            </div>
            <button onclick="FitPages.seller.openAddProductModal()" class="px-4 py-2.5 rounded-xl text-xs font-bold bg-coral-600 hover:bg-coral-500 text-white flex items-center gap-1.5 transition-all shadow-md">
              <i data-lucide="plus" class="w-4 h-4"></i> Add New Product
            </button>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase">
                    <th class="pb-3">Product Name</th>
                    <th class="pb-3">Category</th>
                    <th class="pb-3">Price</th>
                    <th class="pb-3">Fitness Discount</th>
                    <th class="pb-3">Stock</th>
                    <th class="pb-3">Rating</th>
                    <th class="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${products.map(p => `
                    <tr class="hover:bg-slate-50">
                      <td class="py-3 flex items-center gap-3">
                        <img src="${p.image}" class="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span class="font-bold text-slate-800 block">${p.name}</span>
                          <span class="text-[10px] text-slate-400">SKU: ${p.sku}</span>
                        </div>
                      </td>
                      <td class="py-3 capitalize text-slate-600 font-medium">${p.categoryName || p.category}</td>
                      <td class="py-3 font-bold text-slate-900">₹${p.originalPrice.toLocaleString('en-IN')}</td>
                      <td class="py-3">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ${p.fitnessDiscountPercent}% (${p.fitnessRequirement})
                        </span>
                      </td>
                      <td class="py-3">
                        <span class="font-semibold ${p.stock < 20 ? 'text-amber-600 font-bold' : 'text-slate-700'}">
                          ${p.stock} units
                        </span>
                      </td>
                      <td class="py-3 text-amber-500 font-bold flex items-center gap-1">
                        <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i> ${p.rating || 4.8}
                      </td>
                      <td class="py-3 text-right space-x-2">
                        <button onclick="FitStore.navigate('/product/${p.id}')" class="text-slate-400 hover:text-navy-900 p-1" title="View in Store">
                          <i data-lucide="eye" class="w-4 h-4"></i>
                        </button>
                        <button onclick="FitPages.seller.deleteProduct('${p.id}')" class="text-slate-400 hover:text-coral-600 p-1" title="Delete">
                          <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'offers') {
      container.innerHTML = `
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-heading font-black text-slate-900">Fitness Offer Engine</h2>
              <p class="text-xs text-slate-500">Define activity requirements that unlock customer discounts</p>
            </div>
            <button onclick="FitPages.seller.openCreateOfferModal()" class="px-4 py-2.5 rounded-xl text-xs font-bold bg-coral-600 hover:bg-coral-500 text-white flex items-center gap-1.5 transition-all shadow-md">
              <i data-lucide="zap" class="w-4 h-4"></i> Create New Fitness Offer
            </button>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 class="font-heading font-bold text-base text-slate-900 mb-4">Active Brand Fitness Campaigns</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase">
                    <th class="pb-3">Offer Title</th>
                    <th class="pb-3">Activity Type</th>
                    <th class="pb-3">Requirement</th>
                    <th class="pb-3">Discount %</th>
                    <th class="pb-3">Expiry</th>
                    <th class="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${(FitStore.offers || []).map(o => `
                    <tr class="hover:bg-slate-50">
                      <td class="py-3 font-bold text-slate-900">${o.title}</td>
                      <td class="py-3">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                          ${o.activityType}
                        </span>
                      </td>
                      <td class="py-3 font-semibold text-slate-700">${o.requirementText}</td>
                      <td class="py-3 font-black text-coral-600">${o.discountPercent}% OFF</td>
                      <td class="py-3 text-slate-500">${o.durationDays} Days</td>
                      <td class="py-3">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                          Active
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'inventory') {
      container.innerHTML = `
        <div class="space-y-6">
          <div>
            <h2 class="text-2xl font-heading font-black text-slate-900">Inventory & Stock Tracking</h2>
            <p class="text-xs text-slate-500">Monitor remaining SKUs, quantities sold, and low-stock alerts</p>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase">
                    <th class="pb-3">Product</th>
                    <th class="pb-3">SKU</th>
                    <th class="pb-3">Current Stock</th>
                    <th class="pb-3">Sold</th>
                    <th class="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${products.map(p => `
                    <tr class="hover:bg-slate-50">
                      <td class="py-3 font-bold text-slate-800">${p.name}</td>
                      <td class="py-3 text-slate-500 font-mono">${p.sku}</td>
                      <td class="py-3 font-black text-slate-900">${p.stock} units</td>
                      <td class="py-3 text-slate-600">${Math.floor(p.stock * 3.2)} sold</td>
                      <td class="py-3">
                        ${p.stock < 20 ? `
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            Low Stock Alert
                          </span>
                        ` : `
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Adequate Stock
                          </span>
                        `}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'analytics') {
      container.innerHTML = `
        <div class="space-y-6">
          <div>
            <h2 class="text-2xl font-heading font-black text-slate-900">Customer & Activity Analytics</h2>
            <p class="text-xs text-slate-500">Understand which physical activities drive the most purchases</p>
          </div>

          <!-- FITNESS ACTIVITY TO PURCHASE CONVERSION -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 class="font-heading font-bold text-base text-slate-900 mb-2">
              Which fitness activities generate the most purchases?
            </h3>
            <p class="text-xs text-slate-500 mb-6">Percentage of discounted conversions attributed by sensor activity type</p>

            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span class="text-xs font-bold text-slate-700 block mb-1">🚶 Walking & Streaks</span>
                <div class="text-2xl font-black text-coral-600">42%</div>
                <div class="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div class="bg-coral-500 h-full rounded-full" style="width: 42%"></div>
                </div>
                <span class="text-[10px] text-slate-500 mt-1 block">₹3,54,984 GMV</span>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span class="text-xs font-bold text-slate-700 block mb-1">🏃 Running (5km/10km)</span>
                <div class="text-2xl font-black text-amber-500">31%</div>
                <div class="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div class="bg-amber-500 h-full rounded-full" style="width: 31%"></div>
                </div>
                <span class="text-[10px] text-slate-500 mt-1 block">₹2,62,012 GMV</span>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span class="text-xs font-bold text-slate-700 block mb-1">🚴 Cycling Rides</span>
                <div class="text-2xl font-black text-blue-500">17%</div>
                <div class="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div class="bg-blue-500 h-full rounded-full" style="width: 17%"></div>
                </div>
                <span class="text-[10px] text-slate-500 mt-1 block">₹1,43,684 GMV</span>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span class="text-xs font-bold text-slate-700 block mb-1">💪 Gym & Workouts</span>
                <div class="text-2xl font-black text-emerald-500">10%</div>
                <div class="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div class="bg-emerald-500 h-full rounded-full" style="width: 10%"></div>
                </div>
                <span class="text-[10px] text-slate-500 mt-1 block">₹84,520 GMV</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'brand') {
      container.innerHTML = `
        <div class="space-y-6">
          <div>
            <h2 class="text-2xl font-heading font-black text-slate-900">Brand Profile & Storefront Customization</h2>
            <p class="text-xs text-slate-500">Manage your brand's public appearance in the FitShop marketplace</p>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 max-w-xl text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Brand Name</label>
              <input type="text" value="${brand.name}" class="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Brand Tagline</label>
              <input type="text" value="${brand.tagline || ''}" class="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Business Category</label>
              <input type="text" value="${brand.category}" class="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">About Story</label>
              <textarea rows="3" class="w-full px-3 py-2 border rounded-xl">${brand.description || ''}</textarea>
            </div>
            <button onclick="FitComponents.renderToast('Brand profile updated successfully!', 'success')" class="px-5 py-2.5 rounded-xl font-bold bg-coral-600 text-white hover:bg-coral-500 transition-all">
              Save Changes
            </button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-xl text-xs space-y-4">
          <h2 class="text-xl font-heading font-black text-slate-900">Seller Settings</h2>
          <div>
            <label class="block font-bold text-slate-700 mb-1">GST Identification Number</label>
            <input type="text" value="29AABCU9603R1ZX" class="w-full px-3 py-2 border rounded-xl font-mono" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Bank Account for Payouts</label>
            <input type="text" value="HDFC Bank •••• 8412" class="w-full px-3 py-2 border rounded-xl" />
          </div>
          <button onclick="FitComponents.renderToast('Settings saved successfully', 'success')" class="px-5 py-2.5 rounded-xl font-bold bg-navy-900 text-white">Save Settings</button>
        </div>
      `;
    }

    if (window.lucide) lucide.createIcons();
  },

  openAddProductModal() {
    const modal = document.getElementById('add-product-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button onclick="document.getElementById('add-product-modal').classList.add('hidden')" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <h3 class="text-xl font-heading font-bold text-slate-900 mb-1">Add New Product</h3>
        <p class="text-xs text-slate-500 mb-4">List a product and attach a verified fitness unlock discount</p>

        <form onsubmit="event.preventDefault(); FitPages.seller.handleAddProductSubmit();" class="space-y-3 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Product Title</label>
            <input type="text" id="seller-new-name" required placeholder="e.g. Velocity Carbon Running Shoes" class="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-coral-500" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Category</label>
              <select id="seller-new-category" class="w-full px-3 py-2 border rounded-xl bg-white">
                <option value="footwear">Footwear</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="skincare-beauty">Skincare & Beauty</option>
                <option value="sports-sportswear">Sports & Sportswear</option>
                <option value="accessories">Accessories</option>
                <option value="home-lifestyle">Home & Lifestyle</option>
                <option value="health-wellness">Health & Wellness</option>
                <option value="fitness-products">Fitness Products</option>
                <option value="grocery">Grocery & Essentials</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Original Price (₹)</label>
              <input type="number" id="seller-new-price" required value="2999" class="w-full px-3 py-2 border rounded-xl outline-none" />
            </div>
          </div>

          <div class="p-3.5 bg-coral-50/60 rounded-xl border border-coral-200">
            <span class="block font-bold text-coral-800 mb-2">Attached Fitness Unlock Offer</span>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10px] font-bold text-slate-600 mb-0.5">Activity Type</label>
                <select id="seller-new-activity" class="w-full px-2 py-1.5 border rounded-lg bg-white text-xs">
                  <option value="RUNNING">5 km Running</option>
                  <option value="WALKING">30,000 Steps</option>
                  <option value="STREAK">5-Day Walking Streak</option>
                  <option value="CYCLING">15 km Cycling</option>
                  <option value="GYM">45-min Gym Workout</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-bold text-slate-600 mb-0.5">Discount %</label>
                <select id="seller-new-discount" class="w-full px-2 py-1.5 border rounded-lg bg-white text-xs">
                  <option value="15">15% OFF</option>
                  <option value="10">10% OFF</option>
                  <option value="20">20% OFF</option>
                  <option value="25">25% OFF</option>
                </select>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Stock Quantity</label>
              <input type="number" id="seller-new-stock" required value="40" class="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Product Image URL</label>
              <input type="url" id="seller-new-image" value="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80" class="w-full px-3 py-2 border rounded-xl" />
            </div>
          </div>

          <button type="submit" class="w-full py-3 rounded-xl font-heading font-bold text-xs bg-coral-600 hover:bg-coral-500 text-white shadow-md transition-all mt-2">
            Publish Product to FitShop
          </button>
        </form>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  async handleAddProductSubmit() {
    const name = document.getElementById('seller-new-name').value;
    const category = document.getElementById('seller-new-category').value;
    const price = Number(document.getElementById('seller-new-price').value);
    const activity = document.getElementById('seller-new-activity').value;
    const discount = Number(document.getElementById('seller-new-discount').value);
    const stock = Number(document.getElementById('seller-new-stock').value);
    const image = document.getElementById('seller-new-image').value;

    const reqText = activity === 'RUNNING' ? 'Run 5 km' : activity === 'STREAK' ? '5-Day Walking Streak' : 'Complete Activity';

    const res = await fetch('/api/seller/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...FitStore.authHeaders()
      },
      body: JSON.stringify({
        name,
        category,
        originalPrice: price,
        fitnessDiscountPercent: discount,
        fitnessRequirement: reqText,
        activityType: activity,
        stock,
        image
      })
    });

    const data = await res.json();
    if (data.success) {
      FitStore.products.unshift(data.product);
      document.getElementById('add-product-modal').classList.add('hidden');
      FitComponents.renderToast(`🎉 ${name} published successfully!`, 'success');
      this.render('products');
    }
  },

  openCreateOfferModal() {
    const modal = document.getElementById('create-offer-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button onclick="document.getElementById('create-offer-modal').classList.add('hidden')" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <h3 class="text-xl font-heading font-bold text-slate-900 mb-1">Create Fitness-Linked Offer</h3>
        <p class="text-xs text-slate-500 mb-4">Set activity goals and rewards to motivate active shoppers</p>

        <form onsubmit="event.preventDefault(); FitPages.seller.handleCreateOfferSubmit();" class="space-y-3.5 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Offer Title</label>
            <input type="text" id="offer-new-title" required value="7-Day Running Sprint Challenge" class="w-full px-3 py-2 border rounded-xl" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Activity Type</label>
              <select id="offer-new-activity" class="w-full px-3 py-2 border rounded-xl bg-white">
                <option value="RUNNING">Running</option>
                <option value="WALKING">Walking</option>
                <option value="STREAK">Streak System</option>
                <option value="CYCLING">Cycling</option>
                <option value="GYM">Gym Workout</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Discount %</label>
              <select id="offer-new-discount" class="w-full px-3 py-2 border rounded-xl bg-white">
                <option value="20">20% OFF</option>
                <option value="15">15% OFF</option>
                <option value="10">10% OFF</option>
                <option value="25">25% OFF</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Requirement Description</label>
              <input type="text" id="offer-new-req" required value="Complete 10 km over 7 days" class="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Offer Duration (Days)</label>
              <input type="number" id="offer-new-days" value="7" class="w-full px-3 py-2 border rounded-xl" />
            </div>
          </div>

          <button type="submit" class="w-full py-3 rounded-xl font-heading font-bold text-xs bg-navy-900 hover:bg-slate-800 text-white shadow-md transition-all mt-2">
            Launch Fitness Campaign
          </button>
        </form>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  async handleCreateOfferSubmit() {
    const title = document.getElementById('offer-new-title').value;
    const activity = document.getElementById('offer-new-activity').value;
    const discount = Number(document.getElementById('offer-new-discount').value);
    const req = document.getElementById('offer-new-req').value;
    const days = Number(document.getElementById('offer-new-days').value);

    const res = await fetch('/api/seller/offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...FitStore.authHeaders()
      },
      body: JSON.stringify({
        title,
        activityType: activity,
        discountPercent: discount,
        requirementText: req,
        durationDays: days
      })
    });

    const data = await res.json();
    if (data.success) {
      FitStore.offers.push(data.offer);
      document.getElementById('create-offer-modal').classList.add('hidden');
      FitComponents.renderToast(`🎉 Fitness offer "${title}" launched!`, 'success');
      this.render('offers');
    }
  },

  async deleteProduct(prodId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/seller/products/${prodId}`, {
        method: 'DELETE',
        headers: {
          ...FitStore.authHeaders()
        }
      });
      const data = await res.json();
      if (data.success) {
        FitStore.products = FitStore.products.filter(p => p.id !== prodId);
        FitComponents.renderToast('Product removed from catalog');
        this.render(this.activeTab);
      }
    } catch (e) {
      console.error(e);
    }
  }
};
