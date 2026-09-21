// FITSHOP Product Detail Page Controller (FitPages.productDetail)
window.FitPages = window.FitPages || {};

FitPages.productDetail = {
  currentQty: 1,

  render(productId) {
    const app = document.getElementById('app');
    if (!app) return;

    this.currentQty = 1;
    const product = (FitStore.products || []).find(p => p.id === productId) || (FitStore.products && FitStore.products[0]);
    if (!product) {
      app.innerHTML = `<div class="p-16 text-center text-sm font-bold text-slate-500">Product not found. <a href="#/shop" class="text-coral-600 underline">Back to shop</a></div>`;
      return;
    }

    const pricing = FitStore.calculateProductPrice(product);
    const brand = (FitStore.brands || []).find(b => b.id === product.brandId) || { name: product.brandName, id: product.brandId };
    const isWishlisted = FitStore.wishlist.includes(product.id);

    // Collect all available fitness offers linked to this product
    const availableOfferIds = product.availableOfferIds || [product.offerId || 'off-run20'];
    const offers = (FitStore.offers || []).filter(o => availableOfferIds.includes(o.id));
    // If no direct match in availableOfferIds, ensure at least primary or default offers are accessible
    const displayOffers = offers.length > 0 ? offers : (FitStore.offers || []).slice(0, 3);

    app.innerHTML = `
      <!-- BREADCRUMBS -->
      <div class="bg-white border-b border-slate-200/80 py-3.5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-500">
          <a href="#/" class="hover:text-coral-600 font-medium">Home</a>
          <span>/</span>
          <a href="#/shop" class="hover:text-coral-600 font-medium">Shop</a>
          <span>/</span>
          <a href="#/category/${product.category}" class="hover:text-coral-600 font-medium capitalize">${product.categoryName || product.category}</a>
          <span>/</span>
          <span class="text-slate-900 font-bold truncate">${product.name}</span>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <!-- LEFT: PRODUCT IMAGE GALLERY -->
          <div class="lg:col-span-6 space-y-4">
            <div class="relative bg-white rounded-3xl border border-slate-200/90 overflow-hidden aspect-square shadow-sm">
              <img
                id="main-product-image"
                src="${product.image}"
                alt="${product.name}"
                class="w-full h-full object-cover"
              />

              <!-- UNLOCKED / LOCKED BADGE OVERLAY -->
              <div class="absolute top-4 left-4">
                ${pricing.isApplied ? `
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-emerald-500 text-white shadow-lg">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> ${pricing.couponCode} Applied ✓
                  </span>
                ` : pricing.hasUnlockedCoupon ? `
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-amber-500 text-white shadow-lg animate-bounce">
                    <i data-lucide="award" class="w-3.5 h-3.5"></i> Coupon Unlocked! Ready to Apply
                  </span>
                ` : `
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-900/90 text-white border border-slate-700 shadow-md">
                    <i data-lucide="lock" class="w-3.5 h-3.5 text-coral-400"></i> ${pricing.discountPercent}% OFF 🔒 Locked
                  </span>
                `}
              </div>

              <!-- WISHLIST FLOATING BUTTON -->
              <button onclick="FitStore.toggleWishlist('${product.id}')" class="absolute top-4 right-4 p-2.5 rounded-full bg-white/95 backdrop-blur-sm text-slate-400 hover:text-coral-500 shadow-md transition-all">
                <i data-lucide="heart" class="w-5 h-5 ${isWishlisted ? 'fill-coral-500 text-coral-500' : ''}"></i>
              </button>
            </div>

            <!-- THUMBNAILS ROW -->
            <div class="grid grid-cols-4 gap-3">
              <button onclick="document.getElementById('main-product-image').src = '${product.image}'" class="aspect-square rounded-2xl border-2 border-coral-500 overflow-hidden bg-white shadow-sm">
                <img src="${product.image}" class="w-full h-full object-cover" />
              </button>
              <button onclick="document.getElementById('main-product-image').src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80'" class="aspect-square rounded-2xl border border-slate-200 overflow-hidden bg-white opacity-80 hover:opacity-100 transition-opacity">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80" class="w-full h-full object-cover" />
              </button>
              <button onclick="document.getElementById('main-product-image').src = 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80'" class="aspect-square rounded-2xl border border-slate-200 overflow-hidden bg-white opacity-80 hover:opacity-100 transition-opacity">
                <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80" class="w-full h-full object-cover" />
              </button>
              <button onclick="document.getElementById('main-product-image').src = 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80'" class="aspect-square rounded-2xl border border-slate-200 overflow-hidden bg-white opacity-80 hover:opacity-100 transition-opacity">
                <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- RIGHT: PRODUCT INFO, PRICE, FITNESS OFFERS & ACTIONS -->
          <div class="lg:col-span-6 space-y-6">
            
            <!-- BRAND & TITLE -->
            <div>
              <a href="#/brand/${brand.id}" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-black text-slate-800 hover:text-coral-600 transition-colors uppercase tracking-wider mb-2">
                <i data-lucide="store" class="w-3.5 h-3.5 text-coral-600"></i> ${product.brandName} &rarr;
              </a>
              <h1 class="text-2xl sm:text-3xl font-heading font-black text-slate-900 leading-tight">
                ${product.name}
              </h1>

              <!-- RATING & REVIEWS -->
              <div class="flex items-center gap-3 mt-2 text-xs">
                <div class="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                  <span>${product.rating || 4.9}</span>
                </div>
                <span class="text-slate-500 font-medium">${product.reviewsCount || 140} verified buyer reviews</span>
                <span class="text-slate-300">•</span>
                <span class="text-emerald-600 font-bold">In Stock (${product.stock || 45} remaining)</span>
              </div>
            </div>

            <!-- PRICE DISPLAY SECTION -->
            <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              ${pricing.isApplied ? `
                <!-- APPLIED DISCOUNT STATE -->
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1">
                      <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Fitness Coupon Applied (${pricing.couponCode})
                    </div>
                    <div class="flex items-baseline gap-3">
                      <span class="text-3xl font-black font-heading text-emerald-600">
                        ₹${pricing.currentPrice.toLocaleString('en-IN')}
                      </span>
                      <span class="text-base text-slate-400 line-through font-semibold">
                        ₹${pricing.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div class="text-right">
                    <span class="inline-block text-xs font-black bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                      You Saved ₹${pricing.savings.toLocaleString('en-IN')} (${pricing.discountPercent}% OFF)
                    </span>
                    <span class="block text-[10px] text-slate-400 mt-1">Free Delivery Included</span>
                  </div>
                </div>
              ` : `
                <!-- NORMAL PRICE WITH LOCKED OFFER TEASER -->
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                      Normal Price
                    </div>
                    <div class="flex items-baseline gap-3">
                      <span class="text-3xl font-black font-heading text-slate-900">
                        ₹${pricing.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div class="text-right">
                    <span class="inline-flex items-center gap-1 text-xs font-extrabold bg-coral-50 border border-coral-200 text-coral-700 px-3 py-1 rounded-full">
                      <i data-lucide="lock" class="w-3.5 h-3.5"></i> Save up to ${pricing.discountPercent}% OFF
                    </span>
                    <span class="block text-[10px] text-slate-400 mt-1">Unlock with fitness challenge below</span>
                  </div>
                </div>
              `}
            </div>

            <!-- ============================================================= -->
            <!-- FITNESS OFFERS SECTION (Section 6 Requirement) -->
            <!-- ============================================================= -->
            <div class="space-y-3 pt-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="p-1 rounded-lg bg-coral-100 text-coral-600">
                    <i data-lucide="flame" class="w-4 h-4"></i>
                  </span>
                  <h3 class="font-heading font-black text-sm text-slate-900 uppercase tracking-wide">
                    FITNESS OFFERS
                  </h3>
                </div>
                <span class="text-[11px] text-slate-500 font-medium">Choose an offer to unlock discount</span>
              </div>

              <div class="space-y-2.5">
                ${displayOffers.map(offer => {
                  const ch = FitStore.getChallenge(product.id, offer.id);
                  const isOffUnlocked = FitStore.isCouponUnlocked(product.id, offer.couponCode);
                  const isOffApplied = FitStore.isCouponApplied(product.id, offer.couponCode);

                  let statusText = '🔒 Locked';
                  let statusBadgeClass = 'bg-slate-100 text-slate-600 border-slate-200';
                  
                  if (isOffApplied) {
                    statusText = '✓ Applied';
                    statusBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
                  } else if (isOffUnlocked || (ch && ch.daysCompleted >= ch.totalDays)) {
                    statusText = '🎉 Unlocked';
                    statusBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-black';
                  } else if (ch) {
                    statusText = `In Progress (${ch.daysCompleted}/${ch.totalDays} Days)`;
                    statusBadgeClass = 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
                  }

                  return `
                    <div class="p-4 rounded-2xl border ${isOffApplied ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-200 bg-white'} shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:border-slate-300">
                      
                      <!-- OFFER INFO -->
                      <div class="flex items-start gap-3">
                        <div class="w-10 h-10 rounded-xl ${isOffApplied ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'} flex items-center justify-center font-bold text-base flex-shrink-0">
                          <i data-lucide="${offer.activityIcon || 'zap'}" class="w-5 h-5"></i>
                        </div>
                        <div>
                          <div class="flex items-center gap-2">
                            <span class="font-heading font-black text-xs text-slate-900 uppercase">
                              ${offer.activityType || 'FITNESS'}
                            </span>
                            <span class="px-2 py-0.5 rounded text-[10px] font-black bg-coral-100 text-coral-700">
                              ${offer.discountPercent}% OFF
                            </span>
                          </div>
                          
                          <div class="text-xs text-slate-600 mt-0.5 font-medium">
                            Complete: <strong>${offer.dailyTarget} ${offer.unit} × ${offer.totalDays} Days</strong>
                          </div>

                          <div class="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                            <span>Coupon: <strong class="text-slate-900 font-mono font-bold">${offer.couponCode}</strong></span>
                            <span>•</span>
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] ${statusBadgeClass}">
                              ${statusText}
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- CTA BUTTON -->
                      <div class="flex items-center justify-end sm:flex-shrink-0">
                        ${isOffApplied ? `
                          <span class="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <i data-lucide="check" class="w-3.5 h-3.5"></i> Applied
                          </span>
                        ` : isOffUnlocked || (ch && ch.daysCompleted >= ch.totalDays) ? `
                          <button onclick="FitComponents.handleApplyCoupon('${product.id}', '${offer.couponCode}')" class="px-4 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md flex items-center gap-1.5">
                            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Apply Coupon
                          </button>
                        ` : `
                          <button onclick="FitComponents.openChallengeModal('${product.id}', '${offer.id}')" class="px-4 py-2 rounded-xl text-xs font-bold bg-navy-900 hover:bg-coral-600 text-white transition-all shadow-sm flex items-center gap-1.5">
                            <i data-lucide="zap" class="w-3.5 h-3.5"></i> ${ch ? 'Continue Challenge' : 'View Challenge'}
                          </button>
                        `}
                      </div>

                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- QUANTITY & CTA BUTTONS -->
            <div class="space-y-3 pt-3 border-t border-slate-200">
              <div class="flex items-center gap-4">
                <div class="flex items-center border border-slate-200 rounded-xl bg-white p-1 shadow-sm">
                  <button onclick="FitPages.productDetail.changeQty(-1)" class="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center font-black">-</button>
                  <span id="detail-qty-val" class="w-10 text-center font-bold text-sm text-slate-800">1</span>
                  <button onclick="FitPages.productDetail.changeQty(1)" class="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center font-black">+</button>
                </div>

                <button onclick="FitStore.addToCart('${product.id}', FitPages.productDetail.currentQty)" class="flex-1 py-3.5 rounded-xl font-heading font-black text-sm text-white bg-coral-600 hover:bg-coral-500 transition-all shadow-lg shadow-coral-600/30 flex items-center justify-center gap-2">
                  <i data-lucide="shopping-cart" class="w-4 h-4"></i> Add to Cart (₹${(pricing.currentPrice * this.currentQty).toLocaleString('en-IN')})
                </button>
              </div>

              <button onclick="FitStore.addToCart('${product.id}', FitPages.productDetail.currentQty); FitStore.navigate('/checkout')" class="w-full py-3 rounded-xl font-heading font-bold text-xs text-white bg-navy-900 hover:bg-slate-800 transition-all">
                Buy Now at ₹${(pricing.currentPrice * this.currentQty).toLocaleString('en-IN')}
              </button>
            </div>

            <!-- DESCRIPTION -->
            <div class="pt-4 border-t border-slate-200">
              <h3 class="font-heading font-bold text-sm text-slate-900 mb-2">Description</h3>
              <p class="text-xs text-slate-600 leading-relaxed">${product.description}</p>
            </div>

            <!-- SPECIFICATIONS TABLE -->
            ${product.specs ? `
              <div class="pt-4 border-t border-slate-200">
                <h3 class="font-heading font-bold text-sm text-slate-900 mb-3">Specifications</h3>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  ${Object.entries(product.specs).map(([k, v]) => `
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="text-[10px] text-slate-400 font-bold uppercase block">${k}</span>
                      <span class="font-semibold text-slate-800">${v}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

          </div>

        </div>

        <!-- VERIFIED CUSTOMER REVIEWS SECTION -->
        <div class="mt-16 pt-10 border-t border-slate-200">
          <h2 class="text-2xl font-heading font-black text-slate-900 mb-6">Verified Customer Reviews</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-coral-100 text-coral-700 font-bold text-xs flex items-center justify-center">KV</div>
                  <div>
                    <span class="font-bold text-xs text-slate-900 block">Karan V.</span>
                    <span class="text-[10px] text-slate-400">Bengaluru • Sep 14, 2026</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                  <i data-lucide="check-circle" class="w-3 h-3"></i> Fitness Verified Purchase
                </span>
              </div>
              <div class="flex items-center gap-1 text-amber-400 mb-2">
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                "Completed my 5km run challenge and unlocked ₹750 off on these. Delivered in 2 days. The carbon plate responsiveness is incredible!"
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">PH</div>
                  <div>
                    <span class="font-bold text-xs text-slate-900 block">Pooja H.</span>
                    <span class="text-[10px] text-slate-400">Mumbai • Sep 11, 2026</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                  <i data-lucide="check-circle" class="w-3 h-3"></i> Fitness Verified Purchase
                </span>
              </div>
              <div class="flex items-center gap-1 text-amber-400 mb-2">
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                "FitShop makes shopping engaging and motivating. Having a genuine discount reward for hitting my daily step streak made this purchase feel earned!"
              </p>
            </div>
          </div>
        </div>

      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  changeQty(delta) {
    this.currentQty = Math.max(1, this.currentQty + delta);
    const el = document.getElementById('detail-qty-val');
    if (el) el.textContent = this.currentQty;
  }
};
