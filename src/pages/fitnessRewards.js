// FITSHOP Dedicated Fitness Rewards Hub & Activity Recommender (FitPages.fitnessRewards)
window.FitPages = window.FitPages || {};

FitPages.fitnessRewards = {
  selectedActivityTab: 'WALKING', // WALKING, RUNNING, CYCLING, GYM, STREAK

  render() {
    const app = document.getElementById('app');
    if (!app) return;

    const user = FitStore.user || {
      currentStreak: 4,
      longestStreak: 14,
      fitnessPoints: 820,
      totalSaved: 2840,
      todaySteps: 6420,
      todayCalories: 485,
      todayDistanceKm: 4.6,
      completedChallengesCount: 8,
      verifiedProvider: 'Google Health Connect'
    };

    const offers = FitStore.offers || [];

    app.innerHTML = `
      <!-- TOP HERO DASHBOARD BANNER (LIGHT THEME) -->
      <div class="bg-gradient-to-r from-slate-50 via-white to-slate-50 text-slate-900 py-12 border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div class="flex items-center gap-2 text-xs font-bold text-coral-600 uppercase tracking-widest mb-1">
                <span class="flame-anim">🔥</span> Move More. Pay Less.
              </div>
              <h1 class="text-3xl sm:text-4xl font-heading font-black text-slate-900">Fitness Rewards Hub</h1>
              <p class="text-sm text-slate-500 mt-1">Complete verified physical activity to earn streaks, points, and unlock coupons across all product categories.</p>
            </div>

            <!-- Sync Button -->
            <button onclick="FitComponents.openChallengeModal('prod-1', 'off-run20')" class="self-start md:self-auto px-5 py-3 rounded-2xl font-heading font-black text-xs bg-coral-600 hover:bg-coral-500 text-white shadow-lg shadow-coral-600/30 transition-all flex items-center gap-2">
              <i data-lucide="zap" class="w-4 h-4"></i> Start 5 km Running Challenge
            </button>
          </div>

          <!-- USER FITNESS STATS CARDS (LIGHT THEME) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            
            <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
              <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Current Streak</span>
                <span class="flame-anim">🔥</span>
              </div>
              <div class="text-2xl font-black font-heading text-amber-500">${user.currentStreak || 4} Days</div>
              <span class="text-[10px] text-slate-400">Longest: ${user.longestStreak || 14} days</span>
            </div>

            <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
              <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Today's Steps</span>
                <i data-lucide="footprints" class="w-3.5 h-3.5 text-emerald-500"></i>
              </div>
              <div class="text-2xl font-black font-heading text-slate-900">${(user.todaySteps || 6420).toLocaleString('en-IN')}</div>
              <span class="text-[10px] text-emerald-600 font-bold">Target: 10,000 steps</span>
            </div>

            <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
              <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Distance</span>
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-blue-500"></i>
              </div>
              <div class="text-2xl font-black font-heading text-slate-900">${user.todayDistanceKm || 4.6} km</div>
              <span class="text-[10px] text-slate-400">Walking & Running</span>
            </div>

            <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
              <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Calories Burned</span>
                <i data-lucide="flame" class="w-3.5 h-3.5 text-coral-500"></i>
              </div>
              <div class="text-2xl font-black font-heading text-slate-900">${user.todayCalories || 485} kcal</div>
              <span class="text-[10px] text-slate-400">Active burn</span>
            </div>

            <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
              <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Fitness Points</span>
                <i data-lucide="award" class="w-3.5 h-3.5 text-amber-500"></i>
              </div>
              <div class="text-2xl font-black font-heading text-amber-600">${user.fitnessPoints || 820}</div>
              <span class="text-[10px] text-slate-400">+150 per challenge</span>
            </div>

            <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
              <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Total Money Saved</span>
                <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500"></i>
              </div>
              <div class="text-2xl font-black font-heading text-emerald-600">₹${(user.totalSaved || 2840).toLocaleString('en-IN')}</div>
              <span class="text-[10px] text-emerald-700 font-bold">${user.completedChallengesCount || 8} Challenges completed</span>
            </div>

          </div>

        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        <!-- SECTION: STREAK VISUAL SYSTEM -->
        <div>
          <h2 class="text-xl font-heading font-black text-slate-900 mb-4 flex items-center gap-2">
            <span class="flame-anim">🔥</span> Active Streak Progress
          </h2>
          ${FitComponents.renderStreakVisual(user.currentStreak || 4, 5)}
        </div>

        <!-- SECTION: ACTIVE CHALLENGES CARDS -->
        <div>
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-heading font-black text-slate-900">Active Fitness Challenges</h2>
              <p class="text-xs text-slate-500">Pick a challenge to progress and unlock lower prices on tied products</p>
            </div>
            <button onclick="FitComponents.openSimulatorModal()" class="text-xs font-bold text-coral-600 hover:underline">
              Simulate Progress &rarr;
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <!-- CHALLENGE 1 -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center">
                    <i data-lucide="flame" class="w-5 h-5"></i>
                  </div>
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700">In Progress</span>
                </div>
                <h3 class="font-heading font-bold text-slate-900 text-base leading-snug">5 km Running Sprint</h3>
                <p class="text-xs text-slate-500 mt-1 mb-4">Complete 5 km in a single outdoor run or treadmill session</p>
                
                <div class="space-y-1.5 mb-4">
                  <div class="flex items-center justify-between text-xs font-bold">
                    <span class="text-slate-600">Current Progress:</span>
                    <span class="text-coral-600">3.8 / 5.0 km</span>
                  </div>
                  <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div class="bg-coral-500 h-full rounded-full" style="width: 76%"></div>
                  </div>
                  <span class="text-[10px] text-slate-400 block text-right">Complete 1.2 km more to unlock</span>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-slate-400 uppercase font-bold block">Reward</span>
                  <span class="text-xs font-extrabold text-emerald-600">15% OFF across 8 Items</span>
                </div>
                <button onclick="FitComponents.openSimulatorModal()" class="px-4 py-2 rounded-xl text-xs font-bold bg-coral-600 text-white hover:bg-coral-700 transition-colors">
                  Log 1.2 km Run
                </button>
              </div>
            </div>

            <!-- CHALLENGE 2 -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <i data-lucide="footprints" class="w-5 h-5"></i>
                  </div>
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700">In Progress</span>
                </div>
                <h3 class="font-heading font-bold text-slate-900 text-base leading-snug">30,000 Step Milestone</h3>
                <p class="text-xs text-slate-500 mt-1 mb-4">Accumulate 30k total verified steps across 5 days</p>
                
                <div class="space-y-1.5 mb-4">
                  <div class="flex items-center justify-between text-xs font-bold">
                    <span class="text-slate-600">Current Progress:</span>
                    <span class="text-emerald-600">22,400 / 30,000 steps</span>
                  </div>
                  <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div class="bg-emerald-500 h-full rounded-full" style="width: 74%"></div>
                  </div>
                  <span class="text-[10px] text-slate-400 block text-right">7,600 steps remaining</span>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-slate-400 uppercase font-bold block">Reward</span>
                  <span class="text-xs font-extrabold text-emerald-600">12% OFF Tech & Apparel</span>
                </div>
                <button onclick="FitComponents.openSimulatorModal()" class="px-4 py-2 rounded-xl text-xs font-bold bg-navy-900 text-white hover:bg-emerald-600 transition-colors">
                  Sync Steps
                </button>
              </div>
            </div>

            <!-- CHALLENGE 3 -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <i data-lucide="bike" class="w-5 h-5"></i>
                  </div>
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">Ready to Start</span>
                </div>
                <h3 class="font-heading font-bold text-slate-900 text-base leading-snug">15 km Weekend Cycling</h3>
                <p class="text-xs text-slate-500 mt-1 mb-4">Pedal 15 km outdoors or on stationary trainer</p>
                
                <div class="space-y-1.5 mb-4">
                  <div class="flex items-center justify-between text-xs font-bold">
                    <span class="text-slate-600">Current Progress:</span>
                    <span class="text-blue-600">0.0 / 15.0 km</span>
                  </div>
                  <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div class="bg-blue-500 h-full rounded-full" style="width: 0%"></div>
                  </div>
                  <span class="text-[10px] text-slate-400 block text-right">Starts upon activity detection</span>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-slate-400 uppercase font-bold block">Reward</span>
                  <span class="text-xs font-extrabold text-emerald-600">15% OFF Accessories</span>
                </div>
                <button onclick="FitComponents.openSimulatorModal()" class="px-4 py-2 rounded-xl text-xs font-bold bg-navy-900 text-white hover:bg-blue-600 transition-colors">
                  Start Ride
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- ============================================================= -->
        <!-- CORE DIFFERENTIATOR: ACTIVITY → MULTI-CATEGORY PRODUCT RECOMMENDATIONS -->
        <!-- ============================================================= -->
        <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div class="max-w-3xl mb-8">
            <span class="text-xs font-bold text-coral-600 uppercase tracking-wider">Crucial Differentiator</span>
            <h2 class="text-2xl sm:text-3xl font-heading font-black text-slate-900 mt-1">
              Activity &rarr; Multi-Category Product Recommendations
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Select an activity below to see products from <strong>ALL major retail categories</strong> (Fashion, Electronics, Skincare, Footwear, Home, Grocery) whose discounts unlock through that exact physical activity.
            </p>
          </div>

          <!-- ACTIVITY SELECTOR TABS -->
          <div class="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-100 pb-4">
            ${[
              { id: 'WALKING', label: '🚶 Walking & Steps', desc: 'Daily steps & walking streaks' },
              { id: 'RUNNING', label: '🏃 Running & Distance', desc: '5km & 10km runs' },
              { id: 'CYCLING', label: '🚴 Cycling', desc: '15km outdoor & indoor rides' },
              { id: 'GYM', label: '💪 Gym & HIIT Workout', desc: '45-minute fitness sessions' }
            ].map(t => `
              <button
                onclick="FitPages.fitnessRewards.switchActivityTab('${t.id}')"
                class="px-4 py-2.5 rounded-xl font-heading font-bold text-xs transition-all flex items-center gap-2 ${
                  this.selectedActivityTab === t.id
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }"
              >
                ${t.label}
              </button>
            `).join('')}
          </div>

          <!-- RECOMMENDED PRODUCTS FOR THIS ACTIVITY ACROSS DIFFERENT CATEGORIES -->
          <div id="activity-recommended-products-container">
            <!-- Rendered by renderRecommendedProducts() -->
          </div>
        </div>

      </div>
    `;

    if (window.lucide) lucide.createIcons();
    this.renderRecommendedProducts();
  },

  switchActivityTab(tabId) {
    this.selectedActivityTab = tabId;
    this.render();
  },

  renderRecommendedProducts() {
    const container = document.getElementById('activity-recommended-products-container');
    if (!container) return;

    const currentTab = this.selectedActivityTab;
    const products = (FitStore.products || []).filter(p => {
      if (currentTab === 'WALKING') {
        return p.activityType === 'WALKING' || p.activityType === 'STREAK';
      }
      return p.activityType === currentTab;
    });

    // Group items by category to emphasize cross-category capability
    const categoriesRepresented = [...new Set(products.map(p => p.categoryName))];

    container.innerHTML = `
      <div class="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="text-xs">
          <span class="font-bold text-slate-800">Categories unlocked by ${currentTab.toLowerCase()}:</span>
          <div class="flex flex-wrap gap-1.5 mt-1.5">
            ${categoriesRepresented.map(cat => `
              <span class="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-coral-600">
                ${cat}
              </span>
            `).join('')}
          </div>
        </div>

        <button onclick="FitStore.verifyActivityAction('${currentTab}', ${currentTab === 'WALKING' ? 30000 : 5}, '${currentTab === 'WALKING' ? 'steps' : 'km'}')" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all">
          <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Verify & Unlock These Now
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${products.slice(0, 8).map(p => FitComponents.renderProductCard(p)).join('')}
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
};
