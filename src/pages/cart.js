// FITSHOP Shopping Cart Page Controller (FitPages.cart)
window.FitPages = window.FitPages || {};

FitPages.cart = {
  render() {
    const app = document.getElementById('app');
    if (!app) return;

    const cart = FitStore.cart || [];
    const totals = FitStore.getCartTotals();

    if (cart.length === 0) {
      app.innerHTML = `
        <div class="max-w-4xl mx-auto px-4 py-20 text-center">
          <div class="w-20 h-20 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <i data-lucide="shopping-cart" class="w-10 h-10"></i>
          </div>
          <h1 class="text-2xl font-heading font-black text-slate-900 mb-2">Your Shopping Cart is Empty</h1>
          <p class="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            Discover products from top & emerging brands and complete verified fitness activities to unlock exclusive prices!
          </p>
          <a href="#/shop" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-heading font-extrabold text-sm text-white bg-coral-600 hover:bg-coral-500 transition-all shadow-md">
            Start Shopping <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    app.innerHTML = `
      <div class="bg-slate-100/60 border-b border-slate-200 py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-2xl sm:text-3xl font-heading font-black text-slate-900">Shopping Cart (${totals.totalItems} Items)</h1>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <!-- CART ITEMS LIST -->
          <div class="lg:col-span-8 space-y-4">
            
            ${totals.fitnessSavings > 0 ? `
              <div class="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                    <i data-lucide="sparkles" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <span class="text-xs font-black text-emerald-900 block">Fitness Rewards Active!</span>
                    <span class="text-[11px] text-emerald-700">You are saving ₹${totals.fitnessSavings.toLocaleString('en-IN')} on this order through verified activity.</span>
                  </div>
                </div>
                <span class="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-600 text-white">
                  Applied ✓
                </span>
              </div>
            ` : `
              <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <span class="flame-anim text-lg">🔥</span>
                  <div>
                    <span class="text-xs font-bold text-amber-900 block">Unlock Extra Savings With Activity</span>
                    <span class="text-[11px] text-amber-700">Complete challenges to unlock lower prices on these products.</span>
                  </div>
                </div>
                <button onclick="FitComponents.openSimulatorModal()" class="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors">
                  Verify Activity
                </button>
              </div>
            `}

            <div class="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
              ${cart.map(item => {
                const p = item.product;
                const pricing = FitStore.calculateProductPrice(p);
                const lineTotal = pricing.currentPrice * item.quantity;
                const lineOriginal = pricing.originalPrice * item.quantity;

                return `
                  <div class="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-4 flex-1">
                      <img src="${p.image}" alt="${p.name}" class="w-20 h-20 rounded-xl object-cover border border-slate-200 bg-slate-50 flex-shrink-0" />
                      <div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${p.brandName}</span>
                        <h3 class="font-heading font-bold text-sm text-slate-900 line-clamp-1">${p.name}</h3>
                        
                        <!-- FITNESS REWARD PILL -->
                        <div class="mt-1 flex items-center gap-2 text-xs">
                          ${pricing.isApplied ? `
                            <span class="inline-flex items-center gap-1 font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                              <i data-lucide="check-circle" class="w-3 h-3 text-emerald-600"></i> Coupon ${pricing.couponCode} Applied (Saved ₹${pricing.savings * item.quantity})
                            </span>
                          ` : `
                            <div class="flex items-center gap-2">
                              <span class="inline-flex items-center gap-1 text-slate-500 text-[11px]">
                                <i data-lucide="lock" class="w-3 h-3 text-coral-500"></i> ${pricing.requirement} unlocks ${pricing.discountPercent}% OFF
                              </span>
                              <button onclick="FitComponents.openChallengeModal('${p.id}')" class="text-[11px] font-bold text-coral-600 hover:underline">
                                ${pricing.hasUnlockedCoupon ? 'Apply Unlocked Coupon &rarr;' : 'View Challenge &rarr;'}
                              </button>
                            </div>
                          `}
                        </div>
                      </div>
                    </div>

                    <!-- QUANTITY & LINE TOTAL -->
                    <div class="flex items-center justify-between w-full sm:w-auto gap-6 sm:pl-4 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                      <div class="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                        <button onclick="FitStore.updateCartQty('${p.id}', -1)" class="w-7 h-7 rounded-lg text-slate-500 hover:bg-white flex items-center justify-center font-bold text-xs">-</button>
                        <span class="w-8 text-center text-xs font-bold text-slate-800">${item.quantity}</span>
                        <button onclick="FitStore.updateCartQty('${p.id}', 1)" class="w-7 h-7 rounded-lg text-slate-500 hover:bg-white flex items-center justify-center font-bold text-xs">+</button>
                      </div>

                      <div class="text-right min-w-[100px]">
                        <div class="text-base font-black font-heading ${pricing.isApplied ? 'text-emerald-600' : 'text-slate-900'}">
                          ₹${lineTotal.toLocaleString('en-IN')}
                        </div>
                        ${pricing.isApplied ? `
                          <div class="text-[11px] text-slate-400 line-through">₹${lineOriginal.toLocaleString('en-IN')}</div>
                        ` : ''}
                      </div>

                      <button onclick="FitStore.removeFromCart('${p.id}')" class="text-slate-400 hover:text-coral-600 p-1" title="Remove">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="flex items-center justify-between pt-2">
              <a href="#/shop" class="text-xs font-bold text-coral-600 hover:underline flex items-center gap-1">
                &larr; Continue Shopping
              </a>
              <button onclick="FitStore.clearCart()" class="text-xs font-bold text-slate-400 hover:text-slate-600">
                Clear Cart
              </button>
            </div>

          </div>

          <!-- CART ORDER SUMMARY -->
          <div class="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h2 class="font-heading font-black text-lg text-slate-900 pb-3 border-b border-slate-100">Order Summary</h2>

            <div class="space-y-3 text-xs">
              <div class="flex items-center justify-between text-slate-600">
                <span>Original Subtotal</span>
                <span class="font-semibold text-slate-900">₹${totals.subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div class="flex items-center justify-between text-emerald-600 font-bold">
                <span class="flex items-center gap-1"><i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Fitness Activity Savings</span>
                <span>- ₹${totals.fitnessSavings.toLocaleString('en-IN')}</span>
              </div>

              <div class="flex items-center justify-between text-slate-600">
                <span>Delivery Charges</span>
                <span class="font-semibold text-emerald-600">
                  ${totals.shipping === 0 ? 'FREE' : `₹${totals.shipping}`}
                </span>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span class="text-sm font-black font-heading text-slate-900 block">Total Payable</span>
                  <span class="text-[10px] text-slate-400">Inclusive of all taxes</span>
                </div>
                <div class="text-2xl font-black font-heading text-slate-900">
                  ₹${totals.finalTotal.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <!-- PROCEED TO CHECKOUT BUTTON -->
            <button onclick="FitStore.navigate('/checkout')" class="w-full py-3.5 rounded-xl font-heading font-extrabold text-sm text-white bg-coral-600 hover:bg-coral-500 transition-all shadow-lg shadow-coral-600/30 flex items-center justify-center gap-2">
              Proceed to Checkout <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>

            <div class="pt-2 text-[11px] text-slate-400 space-y-1.5 border-t border-slate-100">
              <div class="flex items-center gap-1.5"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-500"></i> 100% Verified Fitness Pricing</div>
              <div class="flex items-center gap-1.5"><i data-lucide="truck" class="w-3.5 h-3.5 text-slate-400"></i> Free 3-Day Express Shipping across India</div>
              <div class="flex items-center gap-1.5"><i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-slate-400"></i> 7 Days Hassle-Free Returns</div>
            </div>

          </div>

        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
};
