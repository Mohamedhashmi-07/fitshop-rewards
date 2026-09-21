// FITSHOP Brand Detail Page Controller (FitPages.brandDetail)
window.FitPages = window.FitPages || {};

FitPages.brandDetail = {
  render(brandId) {
    const app = document.getElementById('app');
    if (!app) return;

    const brand = (FitStore.brands || []).find(b => b.id === brandId) || {
      id: brandId,
      name: 'Brand Store',
      tagline: 'Partnered with FitShop.',
      description: 'Official partner store on FitShop.',
      logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80',
      banner: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
      category: 'General',
      rating: 4.8
    };

    const products = (FitStore.products || []).filter(p => p.brandId === brandId);
    const offers = (FitStore.offers || []).filter(o => o.linkedProductIds && o.linkedProductIds.some(id => products.some(p => p.id === id)));

    app.innerHTML = `
      <!-- BRAND HEADER BANNER -->
      <div class="relative h-64 sm:h-80 bg-navy-950 overflow-hidden">
        <img src="${brand.banner}" alt="${brand.name} Banner" class="w-full h-full object-cover opacity-60" />
        <div class="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>
        
        <div class="absolute top-6 left-6 text-xs text-slate-300">
          <a href="#/brands" class="hover:text-coral-400 flex items-center gap-1">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back to Brands
          </a>
        </div>
      </div>

      <!-- BRAND INFO HEADER -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 z-10 mb-10">
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-center gap-5">
            <img src="${brand.logo}" alt="${brand.name} Logo" class="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-lg bg-white" />
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl sm:text-3xl font-heading font-black text-slate-900">${brand.name}</h1>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                  <i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Verified Brand
                </span>
              </div>
              <p class="text-xs text-coral-600 font-bold uppercase tracking-wider mt-0.5">${brand.category} • ${brand.tagline || ''}</p>
              <p class="text-xs text-slate-500 mt-2 max-w-xl leading-relaxed">${brand.description}</p>
            </div>
          </div>

          <div class="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
            <div class="text-center">
              <div class="text-xl font-black font-heading text-slate-900">${products.length}</div>
              <div class="text-[10px] text-slate-400 uppercase font-bold">Products</div>
            </div>
            <div class="text-center">
              <div class="text-xl font-black font-heading text-coral-600">${offers.length}</div>
              <div class="text-[10px] text-slate-400 uppercase font-bold">Fitness Offers</div>
            </div>
            <div class="text-center">
              <div class="text-xl font-black font-heading text-amber-500 flex items-center justify-center gap-0.5">
                <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i> ${brand.rating || 4.8}
              </div>
              <div class="text-[10px] text-slate-400 uppercase font-bold">Brand Score</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ACTIVE FITNESS CAMPAIGNS FOR THIS BRAND -->
      ${offers.length > 0 ? `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div class="bg-gradient-to-r from-coral-50 via-rose-50 to-orange-50 border border-coral-200 rounded-2xl p-6">
            <div class="flex items-center gap-2 mb-4">
              <span class="flame-anim text-lg">🔥</span>
              <h2 class="font-heading font-black text-lg text-slate-900">Active Fitness Campaigns by ${brand.name}</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${offers.map(o => `
                <div class="bg-white p-4 rounded-xl border border-coral-200/80 shadow-sm flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center">
                      <i data-lucide="${o.activityIcon || 'zap'}" class="w-5 h-5"></i>
                    </div>
                    <div>
                      <h3 class="font-heading font-bold text-slate-900 text-sm">${o.title}</h3>
                      <p class="text-[11px] text-slate-500">${o.requirementText} &rarr; <span class="font-bold text-coral-600">${o.discountPercent}% OFF</span></p>
                    </div>
                  </div>
                  <button onclick="FitComponents.openSimulatorModal()" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-navy-900 text-white hover:bg-coral-600 transition-colors">
                    Unlock
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- BRAND CATALOG -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div class="flex items-center justify-between mb-8">
          <h2 class="font-heading font-black text-2xl text-slate-900">${brand.name} Products (${products.length})</h2>
          <button onclick="FitStore.navigate('/shop?brand=' + '${brand.id}')" class="text-xs font-bold text-coral-600 hover:underline">
            View in Catalog with Filters &rarr;
          </button>
        </div>

        ${products.length > 0 ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${products.map(p => FitComponents.renderProductCard(p)).join('')}
          </div>
        ` : `
          <div class="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p class="text-sm font-semibold text-slate-600">No products listed yet under this brand.</p>
          </div>
        `}
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
};
