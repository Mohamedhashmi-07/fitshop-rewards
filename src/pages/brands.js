// FITSHOP Brands Directory Page Controller (FitPages.brands)
window.FitPages = window.FitPages || {};

FitPages.brands = {
  currentTab: 'all',

  render() {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="bg-navy-950 text-white py-12 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto">
          <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">Brand Marketplace</span>
          <h1 class="text-3xl sm:text-4xl font-heading font-black mt-1">Discover Brands on FitShop</h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-2">
            Explore 20+ emerging and premium brands partnering with FitShop to reward your physical activity with real price cuts.
          </p>
          
          <!-- TAB SWITCHER -->
          <div class="inline-flex items-center gap-1 bg-navy-900 border border-slate-700 p-1 rounded-xl mt-6">
            <button onclick="FitPages.brands.switchTab('all')" id="tab-all-btn" class="px-4 py-2 rounded-lg text-xs font-bold transition-all ${this.currentTab === 'all' ? 'bg-coral-600 text-white' : 'text-slate-400 hover:text-white'}">
              All Brands
            </button>
            <button onclick="FitPages.brands.switchTab('emerging')" id="tab-emerging-btn" class="px-4 py-2 rounded-lg text-xs font-bold transition-all ${this.currentTab === 'emerging' ? 'bg-coral-600 text-white' : 'text-slate-400 hover:text-white'}">
              🌟 Emerging Brands
            </button>
            <button onclick="FitPages.brands.switchTab('trending')" id="tab-trending-btn" class="px-4 py-2 rounded-lg text-xs font-bold transition-all ${this.currentTab === 'trending' ? 'bg-coral-600 text-white' : 'text-slate-400 hover:text-white'}">
              🔥 Trending Brands
            </button>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div id="brands-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- Populated by renderGrid() -->
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    this.renderGrid();
  },

  switchTab(tab) {
    this.currentTab = tab;
    this.render();
  },

  renderGrid() {
    const brands = FitStore.brands || [];
    let list = [...brands];

    if (this.currentTab === 'emerging') {
      list = list.filter(b => b.isEmerging);
    } else if (this.currentTab === 'trending') {
      list = list.filter(b => b.rating >= 4.8);
    }

    const grid = document.getElementById('brands-grid');
    if (!grid) return;

    grid.innerHTML = list.map(b => `
      <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover flex flex-col justify-between group">
        
        <!-- TOP BANNER -->
        <div class="h-28 relative overflow-hidden bg-slate-100">
          <img src="${b.banner}" alt="${b.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent"></div>
          ${b.isEmerging ? `
            <span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-sm">
              Emerging Brand
            </span>
          ` : ''}
        </div>

        <!-- LOGO & PROFILE -->
        <div class="p-5 pt-0 relative flex-1 flex flex-col justify-between">
          <div class="-mt-8 mb-3 flex items-end justify-between">
            <img src="${b.logo}" alt="${b.name}" class="w-16 h-16 rounded-2xl border-2 border-white object-cover shadow-md bg-white" />
            <div class="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-xs font-bold border border-amber-200">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-500 text-amber-500"></i>
              <span>${b.rating || 4.8}</span>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-1.5 mb-1">
              <h3 class="font-heading font-black text-slate-900 text-base group-hover:text-coral-600 transition-colors">${b.name}</h3>
              <i data-lucide="badge-check" class="w-4 h-4 text-emerald-500" title="Verified Partner"></i>
            </div>
            <span class="text-[11px] font-bold text-coral-600 uppercase tracking-wider block mb-2">${b.category}</span>
            <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">${b.description || b.tagline}</p>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div class="space-y-0.5">
              <span class="font-bold text-slate-800 block">${b.productCount || 12} Products</span>
              <span class="text-[11px] font-bold text-emerald-600">${b.activeOffers || 4} Active Offers</span>
            </div>
            <a href="#/brand/${b.id}" class="px-3.5 py-1.5 rounded-xl font-bold bg-navy-900 text-white hover:bg-coral-600 transition-colors flex items-center gap-1">
              View Brand <i data-lucide="chevron-right" class="w-3 h-3"></i>
            </a>
          </div>

        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }
};
