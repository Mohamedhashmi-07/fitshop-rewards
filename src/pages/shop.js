// FITSHOP Shopping Catalog Page Controller (FitPages.shop)
window.FitPages = window.FitPages || {};

FitPages.shop = {
  render() {
    const app = document.getElementById('app');
    if (!app) return;

    // Parse URL query parameters if any
    const hash = window.location.hash;
    const qIndex = hash.indexOf('?');
    let searchParam = '';
    let categoryParam = 'all';
    let activityParam = 'all';

    if (qIndex >= 0) {
      const qs = new URLSearchParams(hash.substring(qIndex));
      searchParam = qs.get('search') || '';
      categoryParam = qs.get('category') || 'all';
      activityParam = qs.get('activity') || 'all';
    }

    if (searchParam) FitStore.activeFilter.search = searchParam;
    if (categoryParam !== 'all') FitStore.activeFilter.category = categoryParam;
    if (activityParam !== 'all') FitStore.activeFilter.activity = activityParam;

    const categories = FitStore.categories || [];
    const brands = FitStore.brands || [];

    app.innerHTML = `
      <div class="bg-slate-100/60 border-b border-slate-200 py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <a href="#/" class="hover:text-coral-600">Home</a>
              <span>/</span>
              <span class="text-slate-800 font-bold">Marketplace</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-heading font-black text-slate-900">All Products</h1>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold text-slate-500 hidden sm:inline" id="shop-results-count">Showing products</span>
            <!-- Sort Selector -->
            <div class="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-xs">
              <span class="text-slate-500 font-semibold">Sort by:</span>
              <select id="shop-sort-select" onchange="FitPages.shop.handleSortChange(this.value)" class="bg-transparent font-bold text-slate-800 outline-none cursor-pointer">
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- LEFT FILTER SIDEBAR -->
          <aside class="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 class="font-heading font-bold text-slate-900 text-sm flex items-center gap-2">
                <i data-lucide="sliders-horizontal" class="w-4 h-4 text-coral-600"></i> Filters
              </h2>
              <button onclick="FitPages.shop.resetFilters()" class="text-[11px] font-bold text-coral-600 hover:underline">
                Reset All
              </button>
            </div>

            <!-- SEARCH IN CATALOG -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Search Catalog</label>
              <div class="relative">
                <input
                  type="text"
                  id="shop-search-input"
                  value="${FitStore.activeFilter.search || ''}"
                  placeholder="Shoes, earbuds, shirts..."
                  oninput="FitPages.shop.handleSearch(this.value)"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-8 pr-3 text-xs outline-none focus:ring-2 focus:ring-coral-500"
                />
                <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3"></i>
              </div>
            </div>

            <!-- FITNESS OFFERS ONLY TOGGLE -->
            <div class="p-3.5 bg-coral-50/50 rounded-xl border border-coral-200">
              <label class="flex items-center justify-between cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="flame-anim text-sm">🔥</span>
                  <div>
                    <span class="text-xs font-bold text-slate-900 block">Fitness Offers Only</span>
                    <span class="text-[10px] text-slate-500">Only show discount-locked items</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="filter-has-offer"
                  ${FitStore.activeFilter.hasOffer ? 'checked' : ''}
                  onchange="FitPages.shop.handleOfferToggle(this.checked)"
                  class="w-4 h-4 accent-coral-600 cursor-pointer"
                />
              </label>
            </div>

            <!-- ACTIVITY TYPE FILTER -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Activity Type</label>
              <div class="space-y-1 text-xs">
                ${['all', 'RUNNING', 'WALKING', 'CYCLING', 'GYM', 'STREAK'].map(act => `
                  <label class="flex items-center gap-2 py-1 cursor-pointer hover:text-coral-600">
                    <input
                      type="radio"
                      name="filter-activity"
                      value="${act}"
                      ${FitStore.activeFilter.activity === act ? 'checked' : ''}
                      onchange="FitPages.shop.handleActivityChange('${act}')"
                      class="accent-coral-600"
                    />
                    <span class="capitalize font-semibold text-slate-700">${act === 'all' ? 'All Activities' : act.toLowerCase()}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- CATEGORY FILTER -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Category</label>
              <div class="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
                <label class="flex items-center gap-2 py-1 cursor-pointer hover:text-coral-600">
                  <input
                    type="radio"
                    name="filter-category"
                    value="all"
                    ${FitStore.activeFilter.category === 'all' ? 'checked' : ''}
                    onchange="FitPages.shop.handleCategoryChange('all')"
                    class="accent-coral-600"
                  />
                  <span class="font-bold text-slate-800">All Categories</span>
                </label>
                ${categories.map(c => `
                  <label class="flex items-center justify-between py-1 cursor-pointer hover:text-coral-600">
                    <div class="flex items-center gap-2">
                      <input
                        type="radio"
                        name="filter-category"
                        value="${c.slug}"
                        ${FitStore.activeFilter.category === c.slug ? 'checked' : ''}
                        onchange="FitPages.shop.handleCategoryChange('${c.slug}')"
                        class="accent-coral-600"
                      />
                      <span class="text-slate-700 font-medium">${c.name}</span>
                    </div>
                    <span class="text-[10px] text-slate-400">(${c.itemCount || 0})</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- BRAND FILTER -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Brand</label>
              <div class="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
                <label class="flex items-center gap-2 py-1 cursor-pointer hover:text-coral-600">
                  <input
                    type="radio"
                    name="filter-brand"
                    value="all"
                    ${FitStore.activeFilter.brand === 'all' ? 'checked' : ''}
                    onchange="FitPages.shop.handleBrandChange('all')"
                    class="accent-coral-600"
                  />
                  <span class="font-bold text-slate-800">All Brands</span>
                </label>
                ${brands.map(b => `
                  <label class="flex items-center justify-between py-1 cursor-pointer hover:text-coral-600">
                    <div class="flex items-center gap-2">
                      <input
                        type="radio"
                        name="filter-brand"
                        value="${b.id}"
                        ${FitStore.activeFilter.brand === b.id ? 'checked' : ''}
                        onchange="FitPages.shop.handleBrandChange('${b.id}')"
                        class="accent-coral-600"
                      />
                      <span class="text-slate-700 font-medium">${b.name}</span>
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- MAX PRICE SLIDER -->
            <div>
              <div class="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span class="uppercase tracking-wider">Max Price</span>
                <span id="price-slider-val" class="text-coral-600">₹${(FitStore.activeFilter.maxPrice || 30000).toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="500"
                max="30000"
                step="500"
                value="${FitStore.activeFilter.maxPrice || 30000}"
                oninput="FitPages.shop.handlePriceChange(this.value)"
                class="w-full accent-coral-600 cursor-pointer"
              />
              <div class="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                <span>₹500</span>
                <span>₹30,000+</span>
              </div>
            </div>

          </aside>

          <!-- RIGHT PRODUCTS GRID -->
          <main class="lg:col-span-9">
            
            <!-- ACTIVE FILTER PILLS -->
            <div id="active-filter-pills" class="flex flex-wrap items-center gap-2 mb-6">
              <!-- Rendered dynamically -->
            </div>

            <!-- PRODUCTS CONTAINER -->
            <div id="shop-products-grid" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <!-- Populated by updateGrid() -->
            </div>

            <!-- EMPTY STATE -->
            <div id="shop-empty-state" class="hidden text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
              <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <i data-lucide="package-search" class="w-8 h-8"></i>
              </div>
              <h3 class="font-heading font-bold text-slate-800 text-lg">No products match your filters</h3>
              <p class="text-xs text-slate-500 mt-1 mb-4">Try clearing some filter tags or adjusting your search term</p>
              <button onclick="FitPages.shop.resetFilters()" class="px-5 py-2 rounded-xl text-xs font-bold bg-navy-900 text-white hover:bg-coral-600 transition-all">
                Reset All Filters
              </button>
            </div>

          </main>

        </div>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }

    this.updateGrid();
  },

  updateGrid() {
    let filtered = [...(FitStore.products || [])];
    const f = FitStore.activeFilter;

    if (f.search) {
      const q = f.search.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (f.category && f.category !== 'all') {
      filtered = filtered.filter(p => p.category === f.category);
    }

    if (f.brand && f.brand !== 'all') {
      filtered = filtered.filter(p => p.brandId === f.brand);
    }

    if (f.activity && f.activity !== 'all') {
      filtered = filtered.filter(p => p.activityType && p.activityType.toUpperCase() === f.activity.toUpperCase());
    }

    if (f.hasOffer) {
      filtered = filtered.filter(p => p.fitnessDiscountPercent > 0);
    }

    if (f.maxPrice) {
      filtered = filtered.filter(p => p.originalPrice <= f.maxPrice);
    }

    // Sort
    if (f.sort === 'price-asc') {
      filtered.sort((a, b) => a.originalPrice - b.originalPrice);
    } else if (f.sort === 'price-desc') {
      filtered.sort((a, b) => b.originalPrice - a.originalPrice);
    } else if (f.sort === 'discount') {
      filtered.sort((a, b) => b.fitnessDiscountPercent - a.fitnessDiscountPercent);
    } else if (f.sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (f.sort === 'newest') {
      filtered.reverse();
    }

    const grid = document.getElementById('shop-products-grid');
    const empty = document.getElementById('shop-empty-state');
    const countEl = document.getElementById('shop-results-count');

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} products`;
    }

    if (filtered.length === 0) {
      if (grid) grid.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
    } else {
      if (empty) empty.classList.add('hidden');
      if (grid) {
        grid.innerHTML = filtered.map(p => FitComponents.renderProductCard(p)).join('');
      }
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  },

  handleSearch(val) {
    FitStore.activeFilter.search = val;
    this.updateGrid();
  },

  handleCategoryChange(slug) {
    FitStore.activeFilter.category = slug;
    this.updateGrid();
  },

  handleBrandChange(id) {
    FitStore.activeFilter.brand = id;
    this.updateGrid();
  },

  handleActivityChange(act) {
    FitStore.activeFilter.activity = act;
    this.updateGrid();
  },

  handleOfferToggle(checked) {
    FitStore.activeFilter.hasOffer = checked;
    this.updateGrid();
  },

  handlePriceChange(val) {
    FitStore.activeFilter.maxPrice = Number(val);
    const label = document.getElementById('price-slider-val');
    if (label) label.textContent = `₹${Number(val).toLocaleString('en-IN')}`;
    this.updateGrid();
  },

  handleSortChange(val) {
    FitStore.activeFilter.sort = val;
    this.updateGrid();
  },

  resetFilters() {
    FitStore.activeFilter = {
      category: 'all',
      brand: 'all',
      activity: 'all',
      hasOffer: false,
      minPrice: 0,
      maxPrice: 30000,
      rating: 0,
      sort: 'recommended',
      search: ''
    };
    this.render();
  }
};
