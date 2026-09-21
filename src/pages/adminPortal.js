// FITSHOP Admin Dashboard Controller (FitPages.admin)
window.FitPages = window.FitPages || {};

FitPages.admin = {
  activeTab: 'dashboard', // dashboard, users, sellers, brands, products, categories, offers, orders, analytics, settings, login

  render(tab = 'dashboard') {
    const app = document.getElementById('app');
    if (!app) return;

    if (tab === 'overview') tab = 'dashboard';
    this.activeTab = tab;

    // DEDICATED ADMIN LOGIN VIEW (Section 5 Requirement)
    if (tab === 'login') {
      app.innerHTML = `
        <div class="min-h-[80vh] flex items-center justify-center p-4 sm:p-8 bg-[#F8FAFC]">
          <div class="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 animate-in fade-in zoom-in-95 duration-200">
            
            <div class="text-center mb-6">
              <div class="w-14 h-14 rounded-2xl bg-navy-950 text-white flex items-center justify-center mx-auto mb-3 shadow-md border border-slate-800">
                <i data-lucide="shield" class="w-7 h-7 text-coral-500"></i>
              </div>
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-1">
                Platform Master
              </span>
              <h1 class="text-2xl font-black font-heading text-slate-900">Admin Portal Login</h1>
              <p class="text-xs text-slate-500 mt-1">FITSHOP marketplace governance, security & verification control</p>
            </div>

            <form onsubmit="event.preventDefault(); const em = document.getElementById('admin-login-email').value; FitStore.login(em, 'ADMIN', true);" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Super Admin Email</label>
                <input
                  type="email"
                  id="admin-login-email"
                  required
                  value="admin@fitshop.com"
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
                class="w-full py-3.5 rounded-xl font-heading font-black text-xs text-white bg-navy-950 hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <i data-lucide="shield-check" class="w-4 h-4 text-coral-500"></i> Sign In to Admin Portal
              </button>
            </form>

            <div class="mt-6 pt-4 border-t border-slate-100 text-center">
              <span class="text-[11px] text-slate-400 block mb-2">Master Administrator Access:</span>
              <button
                onclick="FitStore.login('admin@fitshop.com', 'ADMIN', true)"
                class="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-500"></i> Quick Login as Super Admin (FitShop Master)
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

    const brands = FitStore.brands || [];
    const products = FitStore.products || [];
    const offers = FitStore.offers || [];

    // Mock pending applications
    const pendingSellers = [
      { id: 'app-101', brandName: 'Kura Hydration', owner: 'Ananya Sharma', email: 'ananya@kurawater.com', gst: '27AAECK1234D1Z2', category: 'Accessories', date: 'Sep 19, 2026' },
      { id: 'app-102', brandName: 'Apex Trail Gear', owner: 'Rohan Deshmukh', email: 'rohan@apextrail.in', gst: '27BBEFA9876C1Z8', category: 'Sports & Sportswear', date: 'Sep 18, 2026' }
    ];

    app.innerHTML = `
      <!-- ADMIN TOP BAR -->
      <div class="bg-navy-950 text-white border-b border-slate-800 py-3 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-coral-600 text-white flex items-center justify-center font-black">
              <i data-lucide="shield" class="w-4 h-4"></i>
            </div>
            <div>
              <span class="font-heading font-black text-sm text-white flex items-center gap-2">
                FITSHOP Super Admin <span class="px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500 text-white uppercase">Platform Master</span>
              </span>
              <span class="text-[11px] text-slate-400">Marketplace Governance & Verification Control</span>
            </div>
          </div>

          <div class="flex items-center gap-2.5 text-xs">
            <button onclick="FitStore.navigate('/shop')" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1">
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i> View Storefront
            </button>
            <button onclick="FitStore.confirmLogout('ADMIN')" class="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-colors flex items-center gap-1 font-bold border border-red-500/30">
              <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Logout
            </button>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- ADMIN SIDEBAR (Section 5 Navigation Requirement) -->
          <aside class="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1 text-xs font-bold">
            ${[
              { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
              { id: 'users', label: 'Users', icon: 'users' },
              { id: 'sellers', label: 'Sellers', icon: 'store' },
              { id: 'brands', label: 'Brands', icon: 'award' },
              { id: 'products', label: 'Products', icon: 'package' },
              { id: 'categories', label: 'Categories', icon: 'grid' },
              { id: 'offers', label: 'Offers', icon: 'zap' },
              { id: 'orders', label: 'Orders', icon: 'shopping-bag' },
              { id: 'analytics', label: 'Analytics', icon: 'bar-chart-2' },
              { id: 'settings', label: 'Settings', icon: 'settings' }
            ].map(item => `
              <button
                onclick="FitPages.admin.switchTab('${item.id}')"
                class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                  this.activeTab === item.id
                    ? 'bg-navy-950 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }"
              >
                <i data-lucide="${item.icon}" class="w-4 h-4"></i>
                <span>${item.label}</span>
              </button>
            `).join('')}

            <!-- CLEARLY VISIBLE ADMIN LOGOUT BUTTON (Section 5) -->
            <div class="pt-2 mt-2 border-t border-slate-100">
              <button
                onclick="FitStore.confirmLogout('ADMIN')"
                class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left text-red-600 hover:bg-red-50 font-bold"
              >
                <i data-lucide="log-out" class="w-4 h-4 text-red-500"></i>
                <span>Logout</span>
              </button>
            </div>
          </aside>

          <!-- ADMIN MAIN WORKSPACE -->
          <main class="lg:col-span-9" id="admin-content">
            ${this.renderContent(this.activeTab, brands, products, offers, pendingSellers)}
          </main>

        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  switchTab(tab) {
    this.activeTab = tab;
    FitStore.navigate(`/admin/${tab}`);
  },

  renderContent(tab, brands, products, offers, pendingSellers) {
    if (tab === 'dashboard') {
      return `
        <!-- ADMIN KPIS (8 STATS) -->
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 mb-6">
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Total Users</span>
            <span class="text-2xl font-black font-heading text-slate-900">12,840</span>
            <span class="text-[10px] text-emerald-600 font-bold block mt-0.5">↑ 18.4% this month</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Verified Sellers</span>
            <span class="text-2xl font-black font-heading text-slate-900">48</span>
            <span class="text-[10px] text-slate-500 font-bold block mt-0.5">2 pending review</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Total Brands</span>
            <span class="text-2xl font-black font-heading text-slate-900">${brands.length}</span>
            <span class="text-[10px] text-indigo-600 font-bold block mt-0.5">100% authentic</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Catalog Size</span>
            <span class="text-2xl font-black font-heading text-slate-900">${products.length}</span>
            <span class="text-[10px] text-slate-500 font-bold block mt-0.5">Across 10 categories</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Total Orders</span>
            <span class="text-2xl font-black font-heading text-slate-900">34,910</span>
            <span class="text-[10px] text-emerald-600 font-bold block mt-0.5">99.2% fulfillment</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Gross GMV</span>
            <span class="text-2xl font-black font-heading text-coral-600">₹48.2L</span>
            <span class="text-[10px] text-emerald-600 font-bold block mt-0.5">↑ 24% vs last qtr</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-400 uppercase block">Active Offers</span>
            <span class="text-2xl font-black font-heading text-emerald-600">${offers.length}</span>
            <span class="text-[10px] text-slate-500 font-bold block mt-0.5">Activity-gated</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/50 shadow-sm">
            <span class="text-[10px] font-bold text-amber-700 uppercase block">Pending Queue</span>
            <span class="text-2xl font-black font-heading text-amber-600">2</span>
            <span class="text-[10px] text-amber-700 font-bold block mt-0.5">Action required</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- PENDING SELLER APPROVALS QUEUE -->
          <div class="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 class="font-heading font-bold text-base text-slate-900">Seller Approval Queue</h3>
                <p class="text-xs text-slate-500">Business legitimacy, GST compliance, and brand verification</p>
              </div>
              <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">2 Pending</span>
            </div>

            <div class="space-y-3 text-xs" id="admin-pending-sellers-list">
              ${pendingSellers.map(s => `
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3" id="pending-${s.id}">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-slate-900 text-sm">${s.brandName}</span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">${s.category}</span>
                    </div>
                    <span class="text-slate-500 text-[11px] block mt-0.5">Owner: ${s.owner} • ${s.email}</span>
                    <span class="text-slate-400 font-mono text-[10px] block mt-0.5">GST: ${s.gst}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <button onclick="FitPages.admin.approveSeller('${s.id}', '${s.brandName}')" class="px-3 py-1.5 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
                      Approve Brand
                    </button>
                    <button onclick="FitPages.admin.rejectSeller('${s.id}')" class="px-3 py-1.5 rounded-lg font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- RECENT PRODUCTS MODERATION -->
          <div class="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 class="font-heading font-bold text-base text-slate-900">Product Moderation & Safety</h3>
                <p class="text-xs text-slate-500">Ensure fitness offers match verified real-world activity guidelines</p>
              </div>
              <span class="text-xs font-bold text-emerald-600">Active</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                    <th class="pb-2">Product & Brand</th>
                    <th class="pb-2">Fitness Offer</th>
                    <th class="pb-2 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${products.slice(0, 5).map(p => `
                    <tr class="hover:bg-slate-50">
                      <td class="py-2.5">
                        <div class="font-bold text-slate-800">${p.name}</div>
                        <div class="text-[10px] text-coral-600 font-semibold">${p.brandName}</div>
                      </td>
                      <td class="py-2.5 font-medium text-slate-600">
                        ${p.fitnessDiscountPercent}% OFF (${p.fitnessRequirement})
                      </td>
                      <td class="py-2.5 text-right">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Approved
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
    }

    if (tab === 'users') {
      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 class="font-heading font-bold text-lg text-slate-900">User Management</h3>
              <p class="text-xs text-slate-500">Inspect registered shoppers, active fitness streaks, and account privileges</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">12,840 Registered</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                  <th class="pb-3">User</th>
                  <th class="pb-3">Role</th>
                  <th class="pb-3">Fitness Streak</th>
                  <th class="pb-3">FitCoins</th>
                  <th class="pb-3">Orders</th>
                  <th class="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr class="hover:bg-slate-50">
                  <td class="py-3">
                    <div class="font-bold text-slate-900">Mohammad Rizwan</div>
                    <div class="text-[11px] text-slate-400 font-mono">customer@fitshop.com</div>
                  </td>
                  <td class="py-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">CUSTOMER</span></td>
                  <td class="py-3 font-bold text-coral-600 flex items-center gap-1 mt-2.5"><i data-lucide="flame" class="w-3.5 h-3.5 fill-coral-500"></i> 14 Days</td>
                  <td class="py-3 font-bold text-amber-600">840</td>
                  <td class="py-3 font-semibold text-slate-700">12 Orders</td>
                  <td class="py-3 text-right"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-3">
                    <div class="font-bold text-slate-900">Vikram Malhotra</div>
                    <div class="text-[11px] text-slate-400 font-mono">seller@fitshop.com</div>
                  </td>
                  <td class="py-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-coral-100 text-coral-800">SELLER</span></td>
                  <td class="py-3 text-slate-400">—</td>
                  <td class="py-3 text-slate-400">—</td>
                  <td class="py-3 font-semibold text-slate-700">Brand Owner</td>
                  <td class="py-3 text-right"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-3">
                    <div class="font-bold text-slate-900">Platform Super Admin</div>
                    <div class="text-[11px] text-slate-400 font-mono">admin@fitshop.com</div>
                  </td>
                  <td class="py-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">ADMIN</span></td>
                  <td class="py-3 text-slate-400">—</td>
                  <td class="py-3 text-slate-400">—</td>
                  <td class="py-3 font-semibold text-slate-700">System Master</td>
                  <td class="py-3 text-right"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">Super Admin</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (tab === 'sellers') {
      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 class="font-heading font-bold text-lg text-slate-900">Marketplace Sellers</h3>
              <p class="text-xs text-slate-500">Verified merchant partners and business compliance records</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">48 Active Sellers</span>
          </div>

          <div class="space-y-3">
            ${brands.map(b => `
              <div class="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="${b.logo}" class="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                  <div>
                    <span class="font-bold text-slate-900 block">${b.name}</span>
                    <span class="text-[11px] text-slate-400">${b.category} • Certified Merchant</span>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified GST</span>
                  <button class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700">Audit</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (tab === 'brands') {
      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 class="font-heading font-bold text-lg text-slate-900">Brand Directory</h3>
              <p class="text-xs text-slate-500">Manage brand identity, logos, and authorized category placement</p>
            </div>
            <button class="px-3 py-1.5 rounded-xl bg-navy-950 text-white font-bold text-xs">+ Register Brand</button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${brands.map(b => `
              <div class="p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                <img src="${b.logo}" class="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                <div class="flex-1 min-w-0">
                  <span class="font-bold text-slate-900 block truncate">${b.name}</span>
                  <span class="text-[11px] text-slate-500 block truncate">${b.tagline || b.category}</span>
                  <span class="text-[10px] font-bold text-emerald-600 block mt-1">Official Brand Partner</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (tab === 'products') {
      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 class="font-heading font-bold text-lg text-slate-900">Global Product Moderation</h3>
              <p class="text-xs text-slate-500">${products.length} products listed across all seller accounts</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                  <th class="pb-3">Product</th>
                  <th class="pb-3">Brand</th>
                  <th class="pb-3">Category</th>
                  <th class="pb-3">Price</th>
                  <th class="pb-3">Fitness Offer</th>
                  <th class="pb-3 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${products.map(p => `
                  <tr class="hover:bg-slate-50">
                    <td class="py-3 font-bold text-slate-900">${p.name}</td>
                    <td class="py-3 text-slate-600 font-semibold">${p.brandName}</td>
                    <td class="py-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">${p.category}</span></td>
                    <td class="py-3 font-bold text-slate-900">₹${p.originalPrice}</td>
                    <td class="py-3 text-emerald-700 font-bold">${p.fitnessDiscountPercent}% OFF</td>
                    <td class="py-3 text-right">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Approved</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (tab === 'categories') {
      const categories = FitStore.categories || [];
      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 class="font-heading font-bold text-lg text-slate-900">Category Governance</h3>
              <p class="text-xs text-slate-500">Multi-category marketplace structure and tax classifications</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${categories.map(c => `
              <div class="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span class="font-bold text-slate-900 block">${c.name}</span>
                  <span class="text-[11px] text-slate-400">Slug: /category/${c.slug}</span>
                </div>
                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (tab === 'offers') {
      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 class="font-heading font-bold text-lg text-slate-900">Fitness Offers & Activity Challenges</h3>
              <p class="text-xs text-slate-500">Platform-wide verification rules and coupon unlock criteria</p>
            </div>
          </div>

          <div class="space-y-3">
            ${offers.map(o => `
              <div class="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-slate-900 text-sm">${o.title}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-coral-100 text-coral-800">${o.discountPercent}% OFF</span>
                  </div>
                  <span class="text-xs text-slate-500 block mt-1">${o.requirementText} • Coupon: <code class="font-mono font-bold text-coral-600">${o.couponCode}</code></span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Gated Verified</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (tab === 'orders') {
      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 class="font-heading font-bold text-lg text-slate-900">Platform Orders & Settlements</h3>
              <p class="text-xs text-slate-500">Recent customer transactions and seller disbursement status</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">34,910 Orders</span>
          </div>

          <div class="space-y-3">
            <div class="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span class="font-mono text-xs font-bold text-slate-900">#FIT-98241</span>
                <span class="text-slate-500 text-xs block">Customer: Mohammad Rizwan • Stepz CloudPulse Shoe</span>
                <span class="text-xs font-bold text-emerald-600">Fitness Offer Applied: 20% OFF (Saved ₹1,200)</span>
              </div>
              <div class="text-right">
                <span class="font-bold text-sm text-slate-900">₹4,799</span>
                <span class="block text-[10px] text-emerald-700 font-bold">Paid via UPI</span>
              </div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span class="font-mono text-xs font-bold text-slate-900">#FIT-98240</span>
                <span class="text-slate-500 text-xs block">Customer: Priya Sharma • GlowPure Vitamin C Serum</span>
                <span class="text-xs font-bold text-emerald-600">Fitness Offer Applied: 15% OFF</span>
              </div>
              <div class="text-right">
                <span class="font-bold text-sm text-slate-900">₹764</span>
                <span class="block text-[10px] text-emerald-700 font-bold">Paid via Card</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (tab === 'analytics') {
      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 class="font-heading font-bold text-lg text-slate-900">Platform Growth & Fitness Analytics</h3>
              <p class="text-xs text-slate-500">Conversion impact of verified activity unlock vs standard e-commerce</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span class="text-xs text-slate-500 font-bold block">Activity Completion Rate</span>
              <span class="text-2xl font-black text-slate-900 font-heading">78.4%</span>
              <span class="text-[11px] text-emerald-600 block mt-1">Users complete the required 3-day challenge</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span class="text-xs text-slate-500 font-bold block">Checkout Conversion</span>
              <span class="text-2xl font-black text-slate-900 font-heading">64.2%</span>
              <span class="text-[11px] text-emerald-600 block mt-1">+38% higher than non-fitness checkouts</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span class="text-xs text-slate-500 font-bold block">Repeat Purchase Rate</span>
              <span class="text-2xl font-black text-slate-900 font-heading">41.8%</span>
              <span class="text-[11px] text-emerald-600 block mt-1">Driven by streak maintenance</span>
            </div>
          </div>
        </div>
      `;
    }

    if (tab === 'settings') {
      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 class="font-heading font-bold text-lg text-slate-900">Security & RBAC Policies</h3>
              <p class="text-xs text-slate-500">Platform authentication and access control configuration</p>
            </div>
          </div>

          <div class="space-y-3 text-xs">
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span class="font-bold text-slate-900 block">Strict Role-Based Access Control (RBAC)</span>
                <span class="text-slate-500">Enforce HTTP 403 / 401 across /seller/* and /admin/* endpoints</span>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span class="font-bold text-slate-900 block">Token Revocation Memory Store</span>
                <span class="text-slate-500">Immediate token invalidation upon user logout</span>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span class="font-bold text-slate-900 block">Multi-Port Development Binding</span>
                <span class="text-slate-500">Automatic fallback: 5173 → 5000 → 3000</span>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Port 5173</span>
            </div>
          </div>
        </div>
      `;
    }

    return `<div class="p-8 text-center text-slate-400">Section under development</div>`;
  },

  async approveSeller(appId, brandName) {
    try {
      const res = await fetch('/api/admin/sellers/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...FitStore.authHeaders()
        },
        body: JSON.stringify({ id: appId })
      });
      const data = await res.json();
      if (data.success) {
        const row = document.getElementById(`pending-${appId}`);
        if (row) row.remove();
        FitComponents.renderToast(`Brand ${brandName} verified and approved! 🎉`, 'success');
      } else {
        FitComponents.renderToast(data.message || 'Approval failed', 'coral');
      }
    } catch (e) {
      console.error(e);
      FitComponents.renderToast('Network error during seller approval', 'coral');
    }
  },

  async rejectSeller(appId) {
    try {
      const res = await fetch('/api/admin/sellers/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...FitStore.authHeaders()
        },
        body: JSON.stringify({ id: appId })
      });
      const data = await res.json();
      if (data.success) {
        const row = document.getElementById(`pending-${appId}`);
        if (row) row.remove();
        FitComponents.renderToast('Application rejected.', 'coral');
      } else {
        FitComponents.renderToast(data.message || 'Rejection failed', 'coral');
      }
    } catch (e) {
      console.error(e);
      FitComponents.renderToast('Network error during seller rejection', 'coral');
    }
  }
};
