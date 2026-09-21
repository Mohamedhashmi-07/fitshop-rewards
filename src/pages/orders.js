// FITSHOP Customer Order History Page Controller (FitPages.orders)
window.FitPages = window.FitPages || {};

FitPages.orders = {
  render() {
    const app = document.getElementById('app');
    if (!app) return;

    const orders = FitStore.orders || [];

    app.innerHTML = `
      <div class="bg-slate-100/60 border-b border-slate-200 py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <a href="#/" class="hover:text-coral-600">Home</a>
            <span>/</span>
            <span class="text-slate-800 font-bold">My Orders</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-heading font-black text-slate-900">Order History</h1>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        ${orders.length > 0 ? `
          <div class="space-y-6">
            ${orders.map(o => `
              <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <!-- ORDER HEADER -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Order ID</span>
                    <span class="font-heading font-black text-base text-slate-900">${o.id}</span>
                  </div>
                  <div class="flex items-center gap-4 text-xs">
                    <div>
                      <span class="text-slate-400 block">Placed On:</span>
                      <span class="font-bold text-slate-700">${new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div>
                      <span class="text-slate-400 block">Total Amount:</span>
                      <span class="font-black text-slate-900">₹${o.total.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span class="px-3 py-1 rounded-full text-xs font-bold ${
                        o.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-blue-700'
                      }">
                        ${o.status}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- ITEMS IN ORDER -->
                <div class="py-4 divide-y divide-slate-100">
                  ${(o.items || []).map(item => `
                    <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                      <div class="flex items-center gap-4">
                        <img src="${item.image}" alt="${item.productName}" class="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${item.brandName}</span>
                          <h4 class="font-heading font-bold text-sm text-slate-900">${item.productName}</h4>
                          <span class="text-slate-500">Qty: ${item.quantity} • Paid ₹${item.unlockedPrice.toLocaleString('en-IN')} each</span>
                          ${item.discountPercent > 0 ? `
                            <span class="block text-emerald-600 font-bold mt-0.5">
                              ✨ ${item.discountPercent}% Fitness Discount Applied (${item.fitnessOfferApplied})
                            </span>
                          ` : ''}
                        </div>
                      </div>

                      <div class="flex items-center gap-3">
                        <button onclick="FitStore.addToCart('${item.productId}', 1)" class="px-3.5 py-1.5 rounded-lg border border-slate-200 font-bold hover:bg-slate-50 text-slate-700 transition-colors">
                          Buy Again
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <!-- TRACKING TIMELINE -->
                <div class="pt-4 border-t border-slate-100 bg-slate-50/50 p-4 rounded-xl mt-2">
                  <div class="flex items-center justify-between text-xs mb-3 font-semibold text-slate-700">
                    <span class="flex items-center gap-1.5"><i data-lucide="truck" class="w-4 h-4 text-coral-600"></i> Courier: ${o.trackingNumber || 'BLUEDART-883920141'}</span>
                    <span>Status: <strong class="text-slate-900">${o.status}</strong></span>
                  </div>

                  <div class="grid grid-cols-5 gap-2 text-center text-xs">
                    ${(o.timeline || [
                      { status: 'Confirmed', done: true },
                      { status: 'Packed', done: true },
                      { status: 'Shipped', done: true },
                      { status: 'Out for Delivery', done: false },
                      { status: 'Delivered', done: false }
                    ]).map((step, idx) => `
                      <div class="flex flex-col items-center gap-1">
                        <div class="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          step.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'
                        }">
                          ${step.done ? '<i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>' : idx + 1}
                        </div>
                        <span class="text-[10px] ${step.done ? 'text-emerald-700 font-bold' : 'text-slate-400'}">${step.status}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        ` : `
          <div class="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <p class="text-sm font-semibold text-slate-600">You haven't placed any orders yet.</p>
            <a href="#/shop" class="inline-block mt-4 text-xs font-bold px-6 py-2.5 bg-coral-600 hover:bg-coral-500 text-white rounded-xl shadow-md">
              Start Shopping & Saving
            </a>
          </div>
        `}
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
};
