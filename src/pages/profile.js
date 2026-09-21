// FITSHOP Customer Profile & Fitness Onboarding Controller (FitPages.profile)
window.FitPages = window.FitPages || {};

FitPages.profile = {
  render() {
    const app = document.getElementById('app');
    if (!app) return;

    const user = FitStore.user || {
      name: 'Mohammad Rizwan',
      email: 'customer@fitshop.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      fitnessGoals: ['Improve Stamina', 'Stay Active', 'Weight Loss'],
      preferredActivities: ['Walking', 'Running', 'Cycling'],
      currentStreak: 4,
      longestStreak: 14,
      fitnessPoints: 820,
      totalSaved: 2840,
      completedChallengesCount: 8,
      verifiedProvider: 'Google Health Connect',
      addresses: [
        {
          name: 'Mohammad Rizwan',
          phone: '+91 98765 43210',
          street: 'Flat 402, Skyline Residency, 12th Main Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
          type: 'Home'
        }
      ]
    };

    const allGoals = ['Improve Stamina', 'Stay Active', 'Weight Loss', 'Muscle Gain', 'General Fitness', 'Healthy Lifestyle'];
    const allActivities = ['Walking', 'Running', 'Cycling', 'Gym / HIIT', 'Home Workout', 'Sports'];

    app.innerHTML = `
      <div class="bg-navy-950 text-white py-10 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div class="flex items-center gap-5">
              <img src="${user.avatar}" alt="${user.name}" class="w-20 h-20 rounded-2xl border-2 border-coral-500 object-cover shadow-lg" />
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-2xl sm:text-3xl font-heading font-black">${user.name}</h1>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-coral-500 text-white uppercase tracking-wider">Active Member</span>
                </div>
                <p class="text-xs text-slate-400 mt-0.5">${user.email}</p>
                <div class="flex items-center gap-2 mt-2 text-xs font-bold text-amber-400">
                  <span class="flame-anim">🔥</span> ${user.currentStreak || 4} Days Streak • ${user.fitnessPoints || 820} Points Earned
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button onclick="FitComponents.openSimulatorModal()" class="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm flex items-center gap-1.5 transition-all">
                <i data-lucide="zap" class="w-4 h-4"></i> Test Activity Sync
              </button>
              <button onclick="FitStore.confirmLogout('CUSTOMER')" class="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/30 shadow-sm flex items-center gap-1.5 transition-all">
                <i data-lucide="log-out" class="w-4 h-4 text-red-400"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- LEFT 8 COLS: FITNESS ONBOARDING & SETTINGS -->
          <div class="lg:col-span-8 space-y-8">
            
            <!-- STATS COUNTER STRIP -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Streak</span>
                <span class="text-2xl font-black font-heading text-amber-500">${user.currentStreak || 4} Days 🔥</span>
              </div>
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Longest Streak</span>
                <span class="text-2xl font-black font-heading text-slate-800">${user.longestStreak || 14} Days</span>
              </div>
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fitness Points</span>
                <span class="text-2xl font-black font-heading text-coral-600">${user.fitnessPoints || 820} Pts</span>
              </div>
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Lifetime Savings</span>
                <span class="text-2xl font-black font-heading text-emerald-600">₹${(user.totalSaved || 2840).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <!-- FITNESS ONBOARDING GOALS (CUSTOMIZABLE) -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h2 class="font-heading font-bold text-base text-slate-900">Fitness Goals & Profile</h2>
                  <p class="text-xs text-slate-500">Helps FitShop curate appropriate fitness challenge recommendations</p>
                </div>
                <span class="text-xs font-bold text-coral-600">Preferences</span>
              </div>

              <div class="mb-5">
                <label class="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Primary Fitness Goals</label>
                <div class="flex flex-wrap gap-2">
                  ${allGoals.map(goal => {
                    const isSelected = (user.fitnessGoals || []).includes(goal);
                    return `
                      <button
                        onclick="FitPages.profile.toggleGoal('${goal}')"
                        class="px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-coral-50 border-coral-500 text-coral-600 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }"
                      >
                        ${isSelected ? '✓ ' : ''}${goal}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Preferred Fitness Activities</label>
                <div class="flex flex-wrap gap-2">
                  ${allActivities.map(act => {
                    const isSelected = (user.preferredActivities || []).includes(act);
                    return `
                      <button
                        onclick="FitPages.profile.toggleActivity('${act}')"
                        class="px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }"
                      >
                        ${isSelected ? '✓ ' : ''}${act}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- SAVED DELIVERY ADDRESSES -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h2 class="font-heading font-bold text-base text-slate-900">Saved Addresses</h2>
                <button onclick="FitComponents.renderToast('Address manager ready')" class="text-xs font-bold text-coral-600 hover:underline flex items-center gap-1">
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add New Address
                </button>
              </div>

              <div class="space-y-3 text-xs">
                ${(user.addresses || []).map(addr => `
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between">
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <span class="font-bold text-slate-900">${addr.name}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">${addr.type}</span>
                      </div>
                      <p class="text-slate-600 leading-relaxed">${addr.street}, ${addr.city}, ${addr.state} - ${addr.pincode}</p>
                      <span class="text-slate-500 mt-1 block">Phone: ${addr.phone}</span>
                    </div>
                    <span class="text-xs font-bold text-emerald-600">Default Address</span>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>

          <!-- RIGHT 4 COLS: CONNECTED APPS & SHORTCUTS -->
          <div class="lg:col-span-4 space-y-6">
            
            <!-- HEALTH PROVIDER SYNC STATUS -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 class="font-heading font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <i data-lucide="activity" class="w-4 h-4 text-emerald-500"></i> Connected Fitness Trackers
              </h3>
              
              <div class="space-y-2.5 text-xs">
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <div>
                      <span class="font-bold text-slate-800 block">Google Health Connect</span>
                      <span class="text-[10px] text-slate-400">Steps, Distance & Calories</span>
                    </div>
                  </div>
                  <span class="text-[10px] font-bold text-emerald-600">Connected</span>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between opacity-70">
                  <div class="flex items-center gap-2.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                    <div>
                      <span class="font-bold text-slate-800 block">Apple Health</span>
                      <span class="text-[10px] text-slate-400">iOS HealthKit Sync</span>
                    </div>
                  </div>
                  <button onclick="FitComponents.renderToast('Apple Health connection ready')" class="text-[10px] font-bold text-coral-600 hover:underline">Connect</button>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between opacity-70">
                  <div class="flex items-center gap-2.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                    <div>
                      <span class="font-bold text-slate-800 block">Fitbit & Garmin</span>
                      <span class="text-[10px] text-slate-400">Wearable sensor sync</span>
                    </div>
                  </div>
                  <button onclick="FitComponents.renderToast('Fitbit connection ready')" class="text-[10px] font-bold text-coral-600 hover:underline">Connect</button>
                </div>
              </div>
            </div>

            <!-- QUICK LINKS -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 class="font-heading font-bold text-sm text-slate-900 mb-3">Quick Navigation</h3>
              <div class="space-y-2 text-xs">
                <a href="#/orders" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                  <span class="flex items-center gap-2"><i data-lucide="package" class="w-4 h-4 text-slate-400"></i> My Orders</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
                </a>
                <a href="#/wishlist" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                  <span class="flex items-center gap-2"><i data-lucide="heart" class="w-4 h-4 text-slate-400"></i> Saved Wishlist</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
                </a>
                <a href="#/fitness-rewards" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                  <span class="flex items-center gap-2"><i data-lucide="flame" class="w-4 h-4 text-amber-500"></i> Rewards & Streaks</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
                </a>
                <button onclick="FitStore.confirmLogout('CUSTOMER')" class="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-red-50 text-red-600 font-bold text-left transition-colors">
                  <span class="flex items-center gap-2"><i data-lucide="log-out" class="w-4 h-4 text-red-500"></i> Log Out of Account</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-red-400"></i>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  toggleGoal(goal) {
    const goals = FitStore.user.fitnessGoals || [];
    const idx = goals.indexOf(goal);
    if (idx >= 0) {
      goals.splice(idx, 1);
    } else {
      goals.push(goal);
    }
    FitStore.user.fitnessGoals = goals;
    this.render();
    FitComponents.renderToast(`Fitness goals updated`);
  },

  toggleActivity(act) {
    const acts = FitStore.user.preferredActivities || [];
    const idx = acts.indexOf(act);
    if (idx >= 0) {
      acts.splice(idx, 1);
    } else {
      acts.push(act);
    }
    FitStore.user.preferredActivities = acts;
    this.render();
    FitComponents.renderToast(`Activity preferences updated`);
  }
};
