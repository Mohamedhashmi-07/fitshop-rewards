// FITSHOP Category Page Controller (FitPages.category & FitPages.categories)
window.FitPages = window.FitPages || {};

FitPages.categories = {
  render() {
    const app = document.getElementById('app');
    if (!app) return;

    const categories = FitStore.categories || [];

    app.innerHTML = `
      <div class="bg-navy-950 text-white py-12 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto">
          <span class="text-xs font-bold text-coral-400 uppercase tracking-widest">Multi-Category E-Commerce</span>
          <h1 class="text-3xl sm:text-4xl font-heading font-black mt-1">All Product Categories</h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-2">
            FitShop is not just fitness gear. Unlock verified physical activity discounts on Electronics, Fashion, Skincare, Home, and Everyday Essentials.
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${categories.map(c => `
            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover flex flex-col justify-between group">
              <div class="h-44 relative overflow-hidden bg-slate-100">
                <img src="${c.image}" alt="${c.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex items-end p-4">
                  <div class="flex items-center gap-2.5">
                    <div class="w-10 h-10 rounded-xl bg-coral-500 text-white flex items-center justify-center shadow-md">
                      <i data-lucide="${c.icon || 'tag'}" class="w-5 h-5"></i>
                    </div>
                    <div>
                      <h2 class="font-heading font-black text-xl text-white leading-tight">${c.name}</h2>
                      <span class="text-[11px] font-bold text-slate-300">${c.itemCount || 6} Items in Catalog</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-5 flex-1 flex flex-col justify-between">
                <p class="text-xs text-slate-500 leading-relaxed mb-4">${c.description}</p>
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    ${c.featuredDiscount}
                  </span>
                  <a href="#/category/${c.slug}" class="font-heading font-bold text-xs text-navy-900 group-hover:text-coral-600 flex items-center gap-1 transition-colors">
                    Browse <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
};

FitPages.category = {
  render(slug) {
    const app = document.getElementById('app');
    if (!app) return;

    const category = (FitStore.categories || []).find(c => c.slug === slug) || {
      name: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category',
      description: 'Explore products with verified fitness discounts.',
      slug: slug || 'general'
    };

    const products = (FitStore.products || []).filter(p => p.category === slug);
    const categoryBrands = (FitStore.brands || []).filter(b => products.some(p => p.brandId === b.id));

    app.innerHTML = `
      <!-- CATEGORY BANNER -->
      <div class="bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white py-12 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <a href="#/" class="hover:text-coral-400">Home</a>
            <span>/</span>
            <a href="#/categories" class="hover:text-coral-400">Categories</a>
            <span>/</span>
            <span class="text-white font-bold">${category.name}</span>
          </div>

          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 class="text-3xl sm:text-4xl font-heading font-black">${category.name}</h1>
              <p class="text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">${category.description}</p>
            </div>

            <!-- SPECIAL CATEGORY FITNESS PROMO CALLOUT -->
            <div class="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex items-center gap-3.5 backdrop-blur-sm max-w-md">
              <div class="w-10 h-10 rounded-xl bg-coral-500/20 text-coral-400 flex items-center justify-center flex-shrink-0">
                <i data-lucide="zap" class="w-5 h-5"></i>
              </div>
              <div class="text-xs">
                <span class="font-bold text-coral-400 uppercase tracking-wider block">Category Fitness Benefit</span>
                <span class="text-slate-300">Complete physical activity to unlock discounts on any product in ${category.name}.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- POPULAR BRANDS IN THIS CATEGORY -->
      ${categoryBrands.length > 0 ? `
        <div class="bg-white border-b border-slate-200 py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Brands in ${category.name}</span>
            <div class="flex flex-wrap items-center gap-3">
              ${categoryBrands.map(b => `
                <a href="#/brand/${b.id}" class="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-coral-500 transition-all text-xs font-bold text-slate-800">
                  <img src="${b.logo}" class="w-5 h-5 rounded-md object-cover" />
                  <span>${b.name}</span>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- PRODUCTS IN CATEGORY -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="font-heading font-black text-2xl text-slate-900">${category.name} Collection</h2>
            <p class="text-xs text-slate-500 mt-0.5">Showing ${products.length} products</p>
          </div>

          <button onclick="FitStore.navigate('/shop?category=' + '${category.slug}')" class="text-xs font-bold text-coral-600 hover:underline flex items-center gap-1">
            Filter & Sort in Shop &rarr;
          </button>
        </div>

        ${products.length > 0 ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${products.map(p => FitComponents.renderProductCard(p)).join('')}
          </div>
        ` : `
          <div class="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p class="text-sm font-semibold text-slate-600">No products currently listed in ${category.name}.</p>
            <a href="#/shop" class="inline-block mt-4 text-xs font-bold px-4 py-2 bg-navy-900 text-white rounded-xl">View All Marketplace Products</a>
          </div>
        `}
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
};
