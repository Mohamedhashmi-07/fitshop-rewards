// FITSHOP Wishlist Page Controller (FitPages.wishlist)
window.FitPages = window.FitPages || {};

FitPages.wishlist = {
  render() {
    const app = document.getElementById('app');
    if (!app) return;

    const wishlistIds = FitStore.wishlist || [];
    const products = (FitStore.products || []).filter(p => wishlistIds.includes(p.id));

    app.innerHTML = `
      <div class="bg-slate-100/60 border-b border-slate-200 py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <a href="#/" class="hover:text-coral-600">Home</a>
              <span>/</span>
              <span class="text-slate-800 font-bold">Wishlist</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-heading font-black text-slate-900">Saved Products (${products.length})</h1>
          </div>
          ${products.length > 0 ? `
            <button onclick="FitPages.wishlist.addAllToCart()" class="text-xs font-bold text-coral-600 hover:underline flex items-center gap-1">
              <i data-lucide="shopping-cart" class="w-4 h-4"></i> Add All to Cart
            </button>
          ` : ''}
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        ${products.length > 0 ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${products.map(p => FitComponents.renderProductCard(p)).join('')}
          </div>
        ` : `
          <div class="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
            <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <i data-lucide="heart" class="w-8 h-8"></i>
            </div>
            <h3 class="font-heading font-bold text-slate-800 text-lg">Your Wishlist is Empty</h3>
            <p class="text-xs text-slate-500 mt-1 mb-5">Save products you love and track their fitness unlock progress!</p>
            <a href="#/shop" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-coral-600 hover:bg-coral-500 text-white shadow-md transition-all">
              Explore Products
            </a>
          </div>
        `}
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  addAllToCart() {
    const wishlistIds = FitStore.wishlist || [];
    wishlistIds.forEach(id => FitStore.addToCart(id, 1));
    FitComponents.renderToast('All wishlist items added to cart! 🛒', 'success');
  }
};
