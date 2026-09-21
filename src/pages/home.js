// FITSHOP Landing Page Controller (FitPages.home) — Light Clean E-Commerce Design
window.FitPages = window.FitPages || {};

FitPages.home = {
  render() {
    const app = document.getElementById('app');
    if (!app) return;

    const categories = FitStore.categories || [];
    const brands = FitStore.brands || [];
    const trendingProducts = (FitStore.products || []).filter(p => p.isTrending).slice(0, 8);
    const offers = FitStore.offers || [];

    app.innerHTML = `
      <!-- ============================================================= -->
      <!-- HERO SECTION (LIGHT, CLEAN, MODERN, PREMIUM E-COMMERCE)       -->
      <!-- ============================================================= -->
      <section class="relative bg-gradient-to-b from-white via-slate-50/60 to-white text-slate-900 overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-slate-200/80">
        
        <!-- Subtle ambient background accents -->
        <div class="absolute top-10 right-10 w-96 h-96 bg-coral-100/50 rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div class="absolute bottom-5 left-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- LEFT COPY -->
            <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-50 border border-coral-200 text-coral-700 text-xs font-bold uppercase tracking-wider shadow-sm">
                <span class="flame-anim text-sm">🔥</span> Move More. Pay Less.
              </div>

              <h1 class="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.08]">
                Shop More.<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 via-rose-600 to-amber-500">
                  Move More. Save More.
                </span>
              </h1>

              <p class="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Discover products from your favorite brands and unlock exclusive coupons through verified fitness challenges. Fashion, electronics, footwear, skincare, and everyday essentials.
              </p>

              <!-- HERO CTAs -->
              <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a href="#/shop" class="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-heading font-black text-white bg-coral-600 hover:bg-coral-500 transition-all shadow-lg shadow-coral-600/30 flex items-center justify-center gap-2 text-sm">
                  Shop Now <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
                <a href="#/fitness-rewards" class="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-heading font-bold text-slate-700 bg-white hover:bg-slate-50 hover:text-coral-600 transition-all border border-slate-300 shadow-sm flex items-center justify-center gap-2 text-sm">
                  <span class="flame-anim">🔥</span> Explore Fitness Rewards
                </a>
              </div>

              <!-- VALUE TRUST BAR -->
              <div class="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <span class="flex items-center gap-1.5 font-medium"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i> Verified Fitness Challenges</span>
                <span class="flex items-center gap-1.5 font-medium"><i data-lucide="lock" class="w-4 h-4 text-coral-600"></i> Automatic Coupon Unlocking</span>
                <span class="flex items-center gap-1.5 font-medium"><i data-lucide="zap" class="w-4 h-4 text-amber-500"></i> Real Dynamic Price Drop</span>
              </div>
            </div>

            <!-- RIGHT HERO VISUAL: INTERACTIVE LIGHT FITNESS-TO-DISCOUNT CARD -->
            <div class="lg:col-span-5">
              <div class="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xl relative backdrop-blur-sm">
                
                <!-- Card Header -->
                <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-coral-500 animate-pulse"></span>
                    <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">How Fitness Unlocks Work</span>
                  </div>
                  <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    Live Demo Flow
                  </span>
                </div>

                <!-- Product Showcase -->
                <div class="flex items-center gap-4 mb-5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80" alt="Running Shoes" class="w-20 h-20 rounded-xl object-cover border border-slate-200 bg-white shadow-sm flex-shrink-0" />
                  <div>
                    <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Stepz Footwear</span>
                    <h3 class="text-sm font-bold text-slate-900 font-heading line-clamp-1">Velocity Carbon Marathon Shoes</h3>
                    
                    <div class="flex items-baseline gap-2 mt-1">
                      <span class="text-sm font-black text-slate-900">Normal: ₹4,999</span>
                      <span class="text-xs text-emerald-600 font-extrabold">→ Unlocks at ₹3,999</span>
                    </div>
                    <span class="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded bg-coral-100 text-coral-700">
                      RUN20 (20% OFF)
                    </span>
                  </div>
                </div>

                <!-- Step-by-Step Flow States -->
                <div class="space-y-2.5 mb-5 text-xs">
                  <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span class="flex items-center gap-2 font-semibold text-slate-700">
                      <i data-lucide="lock" class="w-4 h-4 text-coral-500"></i> Coupon Initial Status:
                    </span>
                    <span class="font-extrabold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">🔒 Locked</span>
                  </div>

                  <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span class="flex items-center gap-2 font-semibold text-slate-700">
                      <i data-lucide="flame" class="w-4 h-4 text-amber-500"></i> Fitness Challenge:
                    </span>
                    <span class="font-bold text-slate-900">Run 5 km × 3 Days</span>
                  </div>

                  <div class="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span class="font-bold text-emerald-800 flex items-center gap-1.5">
                      <i data-lucide="sparkles" class="w-4 h-4 text-emerald-600"></i> Upon Completion:
                    </span>
                    <span class="font-black text-emerald-700 text-sm">Save ₹1,000 Direct</span>
                  </div>
                </div>

                <!-- Interactive Trigger Button -->
                <button onclick="FitComponents.openChallengeModal('prod-1', 'off-run20')" class="w-full py-3.5 rounded-xl font-heading font-black text-xs text-white bg-navy-900 hover:bg-coral-600 transition-all shadow-md flex items-center justify-center gap-2">
                  <i data-lucide="zap" class="w-4 h-4"></i> Test Coupon Unlock Modal
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- 6-STEP VISUAL FLOW STRIP (LIGHT THEME) -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200/80">
          <div class="text-center mb-6">
            <h4 class="text-xs font-black tracking-widest uppercase text-coral-600">How Fitness Activity Becomes Shopping Savings</h4>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
            
            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div class="w-8 h-8 rounded-full bg-coral-100 text-coral-700 font-black text-xs flex items-center justify-center mx-auto mb-1.5">1</div>
              <div class="text-xs font-bold text-slate-900">Find Product</div>
              <div class="text-[10px] text-slate-500">Tech, Fashion, Shoes</div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-black text-xs flex items-center justify-center mx-auto mb-1.5">2</div>
              <div class="text-xs font-bold text-slate-900">Locked Coupon</div>
              <div class="text-[10px] text-slate-500">🔒 15% - 25% OFF</div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center mx-auto mb-1.5">3</div>
              <div class="text-xs font-bold text-slate-900">Start Challenge</div>
              <div class="text-[10px] text-slate-500">Walk, Run, Cycle</div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center mx-auto mb-1.5">4</div>
              <div class="text-xs font-bold text-slate-900">Verify Activity</div>
              <div class="text-[10px] text-slate-500">Mock Sensor Sync</div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center mx-auto mb-1.5">5</div>
              <div class="text-xs font-bold text-slate-900">Coupon Unlocks</div>
              <div class="text-[10px] text-slate-500">🎉 Automatic Unlock</div>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div class="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-black text-xs flex items-center justify-center mx-auto mb-1.5">6</div>
              <div class="text-xs font-bold text-slate-900">Apply & Save</div>
              <div class="text-[10px] text-slate-500">Lower Cart Price</div>
            </div>

          </div>
        </div>

      </section>

      <!-- ============================================================= -->
      <!-- SECTION 1: POPULAR CATEGORIES (10 CATEGORIES)                 -->
      <!-- ============================================================= -->
      <section class="py-16 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span class="text-xs font-bold text-coral-600 uppercase tracking-wider">Multi-Category Marketplace</span>
              <h2 class="text-3xl font-heading font-black text-slate-900 mt-1">Shop by Category</h2>
              <p class="text-sm text-slate-500">Fitness coupons are NOT limited to sports goods — save on Fashion, Tech, Beauty, and Essentials!</p>
            </div>
            <a href="#/categories" class="text-xs font-bold text-slate-900 hover:text-coral-600 flex items-center gap-1 transition-colors">
              View all 10 categories <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            ${categories.map(c => `
              <a href="#/category/${c.slug}" class="group relative bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center hover:bg-white hover:border-coral-500 hover:shadow-lg transition-all card-hover flex flex-col items-center">
                <div class="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-coral-600 group-hover:scale-110 group-hover:bg-coral-500 group-hover:text-white transition-all mb-3">
                  <i data-lucide="${c.icon || 'tag'}" class="w-7 h-7"></i>
                </div>
                <h3 class="font-heading font-bold text-slate-900 text-sm group-hover:text-coral-600 transition-colors">${c.name}</h3>
                <span class="text-[11px] text-slate-400 mt-0.5">${c.itemCount || 6} Products</span>
                <span class="mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  ${c.featuredDiscount || 'Fitness Coupons Linked'}
                </span>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 2: FEATURED & EMERGING BRANDS                         -->
      <!-- ============================================================= -->
      <section class="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">Top & Emerging Brands</span>
              <h2 class="text-3xl font-heading font-black text-slate-900 mt-1">Featured Brands</h2>
              <p class="text-sm text-slate-500">Discover innovative brands offering exclusive verified fitness coupons</p>
            </div>
            <a href="#/brands" class="text-xs font-bold text-slate-900 hover:text-coral-600 flex items-center gap-1 transition-colors">
              Explore all brands <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${brands.slice(0, 8).map(b => `
              <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl transition-all card-hover flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-3 mb-3">
                    <img src="${b.logo}" alt="${b.name}" class="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                    <div>
                      <h3 class="font-heading font-bold text-slate-900 text-base leading-tight">${b.name}</h3>
                      <span class="text-xs text-slate-400 font-medium">${b.category}</span>
                    </div>
                  </div>
                  <p class="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">${b.tagline || b.description}</p>
                </div>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span class="font-bold text-slate-800">${b.productCount || 12} Products</span>
                    <span class="text-slate-400">•</span>
                    <span class="font-bold text-coral-600">${b.activeOffers || 4} Offers</span>
                  </div>
                  <a href="#/brand/${b.id}" class="font-bold text-slate-900 hover:text-coral-600 flex items-center gap-0.5">
                    Store <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 3: TRENDING PRODUCTS (CLEAR BRAND VISIBILITY)         -->
      <!-- ============================================================= -->
      <section class="py-16 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span class="text-xs font-bold text-coral-600 uppercase tracking-wider">Shopper Favorites</span>
              <h2 class="text-3xl font-heading font-black text-slate-900 mt-1">Trending Products</h2>
              <p class="text-sm text-slate-500">Brand names prominently displayed with normal price and locked fitness coupon preview</p>
            </div>
            <a href="#/shop" class="text-xs font-bold text-slate-900 hover:text-coral-600 flex items-center gap-1 transition-colors">
              Explore all products <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${trendingProducts.map(p => FitComponents.renderProductCard(p)).join('')}
          </div>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 4: FITNESS REWARDS (LIGHT THEME)                      -->
      <!-- ============================================================= -->
      <section class="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-bold text-coral-600 uppercase tracking-widest">Move More. Pay Less.</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-black text-slate-900 mt-1">Unlock Offers With Your Activity</h2>
            <p class="text-sm text-slate-500 mt-2">
              Complete verified physical challenges in your daily routine to unlock coupons across fashion, beauty, electronics, and gear.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div class="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-coral-500 transition-all card-hover shadow-sm">
              <div class="w-14 h-14 rounded-2xl bg-coral-100 text-coral-600 flex items-center justify-center mx-auto mb-4">
                <i data-lucide="footprints" class="w-7 h-7"></i>
              </div>
              <h3 class="font-heading font-bold text-slate-900 text-lg">Walking & Steps</h3>
              <p class="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">
                Log 5,000 to 10,000 daily steps to unlock 15% discount coupons across shoes, skincare, and tees.
              </p>
              <span class="text-xs font-bold text-coral-700 bg-coral-50 px-3 py-1 rounded-full border border-coral-200">
                WALK15 (15% OFF)
              </span>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-rose-500 transition-all card-hover shadow-sm">
              <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <i data-lucide="flame" class="w-7 h-7"></i>
              </div>
              <h3 class="font-heading font-bold text-slate-900 text-lg">Running Sprint</h3>
              <p class="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">
                Record 5 km runs for 3 days to unlock 20% discount coupons on carbon plate footwear and wireless audio.
              </p>
              <span class="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                RUN20 (20% OFF)
              </span>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-blue-500 transition-all card-hover shadow-sm">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <i data-lucide="bike" class="w-7 h-7"></i>
              </div>
              <h3 class="font-heading font-bold text-slate-900 text-lg">Cycling Rides</h3>
              <p class="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">
                Hit 15 km rides to unlock 10% coupons on smartwatches, 4K sports cameras, and accessories.
              </p>
              <span class="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                CYCLE10 (10% OFF)
              </span>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-amber-500 transition-all card-hover shadow-sm">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <i data-lucide="dumbbell" class="w-7 h-7"></i>
              </div>
              <h3 class="font-heading font-bold text-slate-900 text-lg">Gym & HIIT</h3>
              <p class="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">
                Log 45-min gym workouts for 4 days to unlock 18% coupons on clean proteins and fitness equipment.
              </p>
              <span class="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                HIIT18 (18% OFF)
              </span>
            </div>

          </div>

          <div class="text-center mt-10">
            <a href="#/fitness-rewards" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-heading font-extrabold text-sm text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all">
              <span class="flame-anim">🔥</span> View All Active Fitness Challenges
            </a>
          </div>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 5: LIMITED-TIME FITNESS OFFERS (REAL-TIME COUNTDOWN)  -->
      <!-- ============================================================= -->
      <section class="py-16 bg-[#FFF5F6] border-b border-coral-200/60">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span class="text-xs font-bold text-coral-600 uppercase tracking-wider flex items-center gap-1">
                <i data-lucide="clock" class="w-4 h-4 text-coral-600"></i> Expiring Limited-Time Offers
              </span>
              <h2 class="text-3xl font-heading font-black text-slate-900 mt-1">Limited-Time Fitness Offers</h2>
              <p class="text-sm text-slate-600">Complete the physical requirement before the timer runs out to claim maximum savings</p>
            </div>
            <a href="#/fitness-rewards" class="text-xs font-bold text-coral-600 hover:underline flex items-center gap-1">
              View all offers <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${offers.slice(0, 3).map((off, idx) => `
              <div class="bg-white rounded-2xl border border-coral-200 p-6 shadow-md hover:shadow-xl transition-all card-hover flex flex-col justify-between relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-coral-500 text-white font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  ${off.discountPercent}% OFF
                </div>

                <div>
                  <div class="w-10 h-10 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center mb-3">
                    <i data-lucide="${off.activityIcon || 'zap'}" class="w-5 h-5"></i>
                  </div>
                  <h3 class="font-heading font-bold text-slate-900 text-lg leading-snug">${off.title}</h3>
                  <p class="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">${off.description}</p>

                  <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4">
                    <div class="text-[10px] text-slate-400 font-bold uppercase">Requirement:</div>
                    <div class="text-xs font-extrabold text-slate-800">${off.requirementText}</div>
                    <div class="text-[11px] text-coral-600 font-bold mt-1">Coupon: ${off.couponCode}</div>
                  </div>
                </div>

                <div>
                  <!-- COUNTDOWN BOX -->
                  <div class="flex items-center justify-between mb-4 text-xs font-mono">
                    <span class="text-slate-500 font-sans text-[11px] font-semibold">Offer Ends In:</span>
                    <span class="countdown-box text-xs" data-countdown="${off.expiresInSeconds || 172800}">
                      02d : 14h : 32m : 15s
                    </span>
                  </div>

                  <button onclick="FitComponents.openChallengeModal('prod-1', '${off.id}')" class="w-full py-2.5 rounded-xl font-heading font-bold text-xs bg-navy-900 hover:bg-coral-600 text-white transition-all flex items-center justify-center gap-1.5">
                    <i data-lucide="play" class="w-3.5 h-3.5 fill-white"></i> View Challenge
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 6: HOW FITSHOP WORKS                                  -->
      <!-- ============================================================= -->
      <section class="py-16 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-bold text-coral-600 uppercase tracking-widest">Simple & Transparent</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-black text-slate-900 mt-1">How FitShop Works</h2>
            <p class="text-sm text-slate-500 mt-2">Connecting physical effort directly to real e-commerce value.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center shadow-sm">
              <div class="w-16 h-16 rounded-2xl bg-coral-100 text-coral-600 flex items-center justify-center mx-auto mb-4 shadow-sm font-black text-xl">
                01
              </div>
              <h3 class="font-heading font-bold text-slate-900 text-lg">Discover Products & Locked Coupons</h3>
              <p class="text-xs text-slate-500 mt-2 leading-relaxed">
                Browse through regular e-commerce catalog items. Every product shows its normal price and available locked fitness coupons.
              </p>
            </div>

            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center shadow-sm">
              <div class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm font-black text-xl">
                02
              </div>
              <h3 class="font-heading font-bold text-slate-900 text-lg">Complete Verified Activity</h3>
              <p class="text-xs text-slate-500 mt-2 leading-relaxed">
                Run, walk, cycle, or build workout streaks. Your connected fitness sensor or Health Connect verifies the activity automatically.
              </p>
            </div>

            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center shadow-sm">
              <div class="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 shadow-sm font-black text-xl">
                03
              </div>
              <h3 class="font-heading font-bold text-slate-900 text-lg">Coupon Unlocks & Price Drops</h3>
              <p class="text-xs text-slate-500 mt-2 leading-relaxed">
                Your coupon automatically unlocks. Click "Apply Coupon" to see prices drop across product details, cart, and checkout.
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 7: WHY FITSHOP? (LIGHT SLATE CARDS)                   -->
      <!-- ============================================================= -->
      <section class="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-bold text-coral-600 uppercase tracking-widest">Built for Everyone</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-black text-slate-900 mt-1">Why FitShop?</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div class="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <div class="text-xs font-bold text-coral-600 uppercase tracking-wider mb-2">For Customers</div>
              <h3 class="text-xl font-heading font-bold text-slate-900 mb-2">Fitness Effort Becomes Real Savings</h3>
              <p class="text-xs text-slate-500 leading-relaxed">
                Every step, sprint, and gym session directly lowers the cost of products you already want to buy. Stay healthy and save money simultaneously.
              </p>
            </div>

            <div class="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <div class="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">For Brands</div>
              <h3 class="text-xl font-heading font-bold text-slate-900 mb-2">Reach Active & Engaged Buyers</h3>
              <p class="text-xs text-slate-500 leading-relaxed">
                Emerging brands bypass saturated ad markets and attract motivated shoppers who intentionally earn purchase discounts through activity.
              </p>
            </div>

            <div class="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <div class="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">For The Ecosystem</div>
              <h3 class="text-xl font-heading font-bold text-slate-900 mb-2">Connect Activity, Commerce & Rewards</h3>
              <p class="text-xs text-slate-500 leading-relaxed">
                Creating the world's first unified marketplace where everyday healthy habits fuel modern multi-category lifestyle commerce.
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 8: CALL TO ACTION BANNER                              -->
      <!-- ============================================================= -->
      <section class="py-16 bg-gradient-to-r from-coral-600 to-rose-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl sm:text-4xl font-heading font-black mb-3">Shop More. Move More. Save More.</h2>
          <p class="text-base text-coral-100 max-w-xl mx-auto mb-8">
            Start discovering products from top brands and turn your morning steps into tangible savings today.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <a href="#/shop" class="px-8 py-3.5 rounded-2xl font-heading font-extrabold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-xl text-sm">
              Start Shopping
            </a>
            <a href="#/fitness-rewards" class="px-8 py-3.5 rounded-2xl font-heading font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all text-sm shadow-md">
              Explore Fitness Challenges
            </a>
          </div>
        </div>
      </section>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }
  }
};
