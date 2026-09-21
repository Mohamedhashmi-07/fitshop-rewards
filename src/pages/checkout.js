// FITSHOP Multi-Step Checkout Page Controller (FitPages.checkout)
window.FitPages = window.FitPages || {};

FitPages.checkout = {
  currentStep: 1,
  selectedPayment: 'UPI',
  deliverySpeed: 'standard',
  confirmedOrder: null,

  render() {
    const app = document.getElementById('app');
    if (!app) return;

    // If order was just placed, show confirmation screen
    if (this.confirmedOrder) {
      this.renderConfirmation(this.confirmedOrder);
      return;
    }

    const cart = FitStore.cart || [];
    const totals = FitStore.getCartTotals();

    if (cart.length === 0) {
      FitStore.navigate('/cart');
      return;
    }

    const user = FitStore.user || { name: 'Mohammad Rizwan', addresses: [] };
    const defaultAddress = (user.addresses && user.addresses[0]) || {
      name: 'Mohammad Rizwan',
      phone: '+91 98765 43210',
      street: 'Flat 402, Skyline Residency, 12th Main Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    };

    app.innerHTML = `
      <div class="bg-slate-100/60 border-b border-slate-200 py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <a href="#/cart" class="hover:text-coral-600">&larr; Back to Cart</a>
          </div>
          <h1 class="text-2xl sm:text-3xl font-heading font-black text-slate-900">Secure Checkout</h1>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <!-- LEFT: CHECKOUT STEPPER -->
          <div class="lg:col-span-8 space-y-6">
            
            <!-- STEP 1: SHIPPING ADDRESS -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-full bg-coral-600 text-white font-bold text-xs flex items-center justify-center">1</span>
                  <h2 class="font-heading font-bold text-base text-slate-900">Delivery Address</h2>
                </div>
                <span class="text-xs font-bold text-emerald-600 flex items-center gap-1"><i data-lucide="check" class="w-3.5 h-3.5"></i> Verified Address</span>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-sm text-slate-900" id="checkout-recipient-name">${defaultAddress.name}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">Home</span>
                </div>
                <p class="text-xs text-slate-600 leading-relaxed" id="checkout-address-street">
                  ${defaultAddress.street}, ${defaultAddress.city}, ${defaultAddress.state} - ${defaultAddress.pincode}
                </p>
                <span class="text-xs text-slate-500 mt-1 block" id="checkout-recipient-phone">Phone: ${defaultAddress.phone}</span>
              </div>
            </div>

            <!-- STEP 2: DELIVERY OPTIONS -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div class="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
                <span class="w-7 h-7 rounded-full bg-coral-600 text-white font-bold text-xs flex items-center justify-center">2</span>
                <h2 class="font-heading font-bold text-base text-slate-900">Delivery Speed</h2>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label class="p-3.5 rounded-xl border border-coral-500 bg-coral-50/30 flex items-center justify-between cursor-pointer">
                  <div class="flex items-center gap-2.5">
                    <input type="radio" name="delivery_opt" checked class="accent-coral-600" />
                    <div>
                      <span class="font-bold text-slate-900 block">Standard Express (3-4 Days)</span>
                      <span class="text-[11px] text-slate-500">Delivered via BlueDart / Delhivery</span>
                    </div>
                  </div>
                  <span class="font-black text-emerald-600">FREE</span>
                </label>

                <label class="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between cursor-pointer opacity-80">
                  <div class="flex items-center gap-2.5">
                    <input type="radio" name="delivery_opt" class="accent-coral-600" />
                    <div>
                      <span class="font-bold text-slate-900 block">Next-Day Priority Air</span>
                      <span class="text-[11px] text-slate-500">Guaranteed within 24 hours</span>
                    </div>
                  </div>
                  <span class="font-bold text-slate-800">₹99</span>
                </label>
              </div>
            </div>

            <!-- STEP 3: PAYMENT METHOD -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div class="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
                <span class="w-7 h-7 rounded-full bg-coral-600 text-white font-bold text-xs flex items-center justify-center">3</span>
                <h2 class="font-heading font-bold text-base text-slate-900">Select Payment Method</h2>
              </div>

              <!-- PAYMENT TABS -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs">
                <button onclick="FitPages.checkout.selectPayment('UPI')" id="pay-tab-UPI" class="p-3 rounded-xl border font-bold flex flex-col items-center gap-1.5 transition-all ${this.selectedPayment === 'UPI' ? 'border-coral-500 bg-coral-50/40 text-coral-600 shadow-sm' : 'border-slate-200 text-slate-600'}">
                  <i data-lucide="smartphone" class="w-5 h-5"></i> UPI / QR
                </button>
                <button onclick="FitPages.checkout.selectPayment('CARD')" id="pay-tab-CARD" class="p-3 rounded-xl border font-bold flex flex-col items-center gap-1.5 transition-all ${this.selectedPayment === 'CARD' ? 'border-coral-500 bg-coral-50/40 text-coral-600 shadow-sm' : 'border-slate-200 text-slate-600'}">
                  <i data-lucide="credit-card" class="w-5 h-5"></i> Cards
                </button>
                <button onclick="FitPages.checkout.selectPayment('NETBANK')" id="pay-tab-NETBANK" class="p-3 rounded-xl border font-bold flex flex-col items-center gap-1.5 transition-all ${this.selectedPayment === 'NETBANK' ? 'border-coral-500 bg-coral-50/40 text-coral-600 shadow-sm' : 'border-slate-200 text-slate-600'}">
                  <i data-lucide="building" class="w-5 h-5"></i> Net Banking
                </button>
                <button onclick="FitPages.checkout.selectPayment('COD')" id="pay-tab-COD" class="p-3 rounded-xl border font-bold flex flex-col items-center gap-1.5 transition-all ${this.selectedPayment === 'COD' ? 'border-coral-500 bg-coral-50/40 text-coral-600 shadow-sm' : 'border-slate-200 text-slate-600'}">
                  <i data-lucide="banknote" class="w-5 h-5"></i> Cash on Delivery
                </button>
              </div>

              <!-- PAYMENT CONTENT PANEL -->
              <div id="payment-panel" class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <!-- Rendered dynamically -->
              </div>
            </div>

          </div>

          <!-- RIGHT: ORDER REVIEW & COMPLETE -->
          <div class="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h2 class="font-heading font-black text-lg text-slate-900 pb-3 border-b border-slate-100">Order Review</h2>

            <!-- ITEMS SUMMARY LIST -->
            <div class="divide-y divide-slate-100 max-h-56 overflow-y-auto pr-1">
              ${cart.map(item => {
                const pricing = FitStore.calculateProductPrice(item.product);
                return `
                  <div class="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div class="flex items-center gap-2.5 truncate">
                      <img src="${item.product.image}" class="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                      <div class="truncate">
                        <div class="font-bold text-slate-800 truncate">${item.product.name}</div>
                        <div class="text-[10px] ${pricing.isApplied ? 'text-emerald-600 font-bold' : 'text-slate-400'}">
                          Qty: ${item.quantity} • ${item.product.brandName} ${pricing.isApplied ? `• Coupon: ${pricing.couponCode}` : ''}
                        </div>
                      </div>
                    </div>
                    <div class="text-right flex-shrink-0">
                      <div class="font-black text-slate-900">
                        ₹${(pricing.currentPrice * item.quantity).toLocaleString('en-IN')}
                      </div>
                      ${pricing.isApplied ? `
                        <div class="text-[10px] text-slate-400 line-through">₹${(pricing.originalPrice * item.quantity).toLocaleString('en-IN')}</div>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- PRICE BREAKDOWN -->
            <div class="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
              <div class="flex items-center justify-between text-slate-600">
                <span>Total Regular Price</span>
                <span>₹${totals.subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div class="flex items-center justify-between text-emerald-600 font-bold">
                <span>Verified Fitness Savings</span>
                <span>- ₹${totals.fitnessSavings.toLocaleString('en-IN')}</span>
              </div>

              <div class="flex items-center justify-between text-slate-600">
                <span>Delivery</span>
                <span class="text-emerald-600 font-bold">FREE</span>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                <span class="text-sm font-black font-heading text-slate-900">Total Payable</span>
                <span class="text-2xl font-black font-heading text-slate-900">₹${totals.finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <!-- PLACE ORDER BUTTON -->
            <button onclick="FitPages.checkout.placeOrder()" class="w-full py-4 rounded-xl font-heading font-extrabold text-sm text-white bg-coral-600 hover:bg-coral-500 transition-all shadow-lg shadow-coral-600/30 flex items-center justify-center gap-2">
              <i data-lucide="lock" class="w-4 h-4"></i> Place Order (Pay ₹${totals.finalTotal.toLocaleString('en-IN')})
            </button>

            <div class="text-center text-[10px] text-slate-400">
              Safe & 256-Bit Encrypted Payment Processing
            </div>
          </div>

        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    this.renderPaymentPanel();
  },

  selectPayment(type) {
    this.selectedPayment = type;
    ['UPI', 'CARD', 'NETBANK', 'COD'].forEach(t => {
      const btn = document.getElementById(`pay-tab-${t}`);
      if (btn) {
        if (t === type) {
          btn.className = 'p-3 rounded-xl border font-bold flex flex-col items-center gap-1.5 transition-all border-coral-500 bg-coral-50/40 text-coral-600 shadow-sm';
        } else {
          btn.className = 'p-3 rounded-xl border font-bold flex flex-col items-center gap-1.5 transition-all border-slate-200 text-slate-600';
        }
      }
    });
    this.renderPaymentPanel();
  },

  renderPaymentPanel() {
    const panel = document.getElementById('payment-panel');
    if (!panel) return;

    if (this.selectedPayment === 'UPI') {
      panel.innerHTML = `
        <div class="flex flex-col sm:flex-row items-center gap-5">
          <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=upi://pay?pa=fitshop@okhdfcbank" alt="UPI QR" class="w-24 h-24" />
            <span class="text-[10px] text-slate-400 mt-1 font-semibold">Scan with any UPI App</span>
          </div>
          <div class="space-y-2 flex-1 text-center sm:text-left">
            <span class="text-xs font-bold text-slate-800 block">UPI ID: <code class="bg-white px-2 py-0.5 rounded text-coral-600 font-mono">fitshop@okhdfcbank</code></span>
            <p class="text-[11px] text-slate-500">Scan QR or enter UPI ID on Google Pay, PhonePe, or Paytm.</p>
            <div class="flex items-center justify-center sm:justify-start gap-2 pt-1">
              <span class="px-2 py-0.5 bg-white rounded border border-slate-200 text-[10px] font-bold text-slate-700">Google Pay</span>
              <span class="px-2 py-0.5 bg-white rounded border border-slate-200 text-[10px] font-bold text-slate-700">PhonePe</span>
              <span class="px-2 py-0.5 bg-white rounded border border-slate-200 text-[10px] font-bold text-slate-700">Paytm</span>
            </div>
          </div>
        </div>
      `;
    } else if (this.selectedPayment === 'CARD') {
      panel.innerHTML = `
        <div class="space-y-2.5 max-w-sm">
          <div>
            <label class="block text-[10px] font-bold text-slate-600 mb-1">Card Number</label>
            <input type="text" value="4532 •••• •••• 8941" class="w-full bg-white px-3 py-1.5 border rounded-lg text-xs" />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] font-bold text-slate-600 mb-1">Expiry</label>
              <input type="text" value="08/29" class="w-full bg-white px-3 py-1.5 border rounded-lg text-xs" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-600 mb-1">CVV</label>
              <input type="password" value="•••" class="w-full bg-white px-3 py-1.5 border rounded-lg text-xs" />
            </div>
          </div>
        </div>
      `;
    } else if (this.selectedPayment === 'NETBANK') {
      panel.innerHTML = `
        <div>
          <label class="block text-[10px] font-bold text-slate-600 mb-2">Select Popular Bank</label>
          <div class="grid grid-cols-2 gap-2">
            <label class="p-2 rounded-lg bg-white border flex items-center gap-2 cursor-pointer border-coral-500 font-bold"><input type="radio" checked name="bank" /> HDFC Bank</label>
            <label class="p-2 rounded-lg bg-white border flex items-center gap-2 cursor-pointer font-bold"><input type="radio" name="bank" /> State Bank of India</label>
            <label class="p-2 rounded-lg bg-white border flex items-center gap-2 cursor-pointer font-bold"><input type="radio" name="bank" /> ICICI Bank</label>
            <label class="p-2 rounded-lg bg-white border flex items-center gap-2 cursor-pointer font-bold"><input type="radio" name="bank" /> Axis Bank</label>
          </div>
        </div>
      `;
    } else {
      panel.innerHTML = `
        <div class="flex items-center gap-3">
          <i data-lucide="check-circle" class="w-5 h-5 text-emerald-600"></i>
          <div>
            <span class="font-bold text-slate-800 block">Cash on Delivery Available</span>
            <span class="text-[11px] text-slate-500">Pay cash or scan courier UPI QR upon arrival at your doorstep.</span>
          </div>
        </div>
      `;
    }

    if (window.lucide) lucide.createIcons();
  },

  async placeOrder() {
    const cart = FitStore.cart || [];
    const totals = FitStore.getCartTotals();

    const orderItems = cart.map(i => ({
      productId: i.productId,
      productName: i.product.name,
      brandName: i.product.brandName,
      image: i.product.image,
      price: i.product.originalPrice,
      discountPercent: i.pricing.isUnlocked ? i.pricing.discountPercent : 0,
      unlockedPrice: i.pricing.currentPrice,
      quantity: i.quantity,
      fitnessOfferApplied: i.pricing.isUnlocked ? i.pricing.requirement : 'None'
    }));

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...FitStore.authHeaders()
        },
        body: JSON.stringify({
          items: orderItems,
          subtotal: totals.subtotal,
          fitnessSavings: totals.fitnessSavings,
          total: totals.finalTotal,
          paymentMethod: `${this.selectedPayment} (Mock Processing)`,
          shippingAddress: {
            name: 'Mohammad Rizwan',
            phone: '+91 98765 43210',
            street: 'Flat 402, Skyline Residency, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560038'
          }
        })
      });

      const data = await res.json();
      if (data.success) {
        FitStore.clearCart();
        this.confirmedOrder = data.order;
        this.renderConfirmation(data.order);
      }
    } catch (err) {
      console.error('Order error:', err);
      FitComponents.renderToast('Error placing order', 'coral');
    }
  },

  renderConfirmation(order) {
    const app = document.getElementById('app');
    if (!app) return;

    // Confetti celebration
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FF4D5A', '#10B981', '#F59E0B', '#0F172A']
      });
    }

    app.innerHTML = `
      <div class="max-w-3xl mx-auto px-4 py-16 text-center">
        
        <div class="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <i data-lucide="check" class="w-10 h-10 stroke-[3]"></i>
        </div>

        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
          Order Successfully Placed
        </span>
        <h1 class="text-3xl font-heading font-black text-slate-900">Thank You for Moving & Saving!</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          Order ID <strong class="text-slate-900">${order.id}</strong> has been confirmed and is being prepped for dispatch.
        </p>

        <!-- SAVINGS HIGHLIGHT -->
        ${order.fitnessSavings > 0 ? `
          <div class="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 max-w-md mx-auto">
            <div class="text-xs font-bold text-emerald-900">Fitness Value Unlocked</div>
            <div class="text-2xl font-black font-heading text-emerald-600">₹${order.fitnessSavings.toLocaleString('en-IN')} Saved</div>
            <span class="text-[11px] text-emerald-700 font-medium">Your verified physical activity earned this discount directly!</span>
          </div>
        ` : ''}

        <!-- ORDER TIMELINE -->
        <div class="mt-10 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-left">
          <h3 class="font-heading font-bold text-sm text-slate-900 mb-4 flex items-center justify-between">
            <span>Delivery Tracking Timeline</span>
            <span class="text-xs font-normal text-slate-400">Estimated: 3-4 Business Days</span>
          </h3>

          <div class="grid grid-cols-5 gap-2 text-center text-xs">
            <div class="flex flex-col items-center gap-1.5">
              <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
                <i data-lucide="check" class="w-4 h-4 stroke-[3]"></i>
              </div>
              <span class="font-bold text-emerald-600 text-[11px]">Confirmed</span>
            </div>

            <div class="flex flex-col items-center gap-1.5">
              <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold">2</div>
              <span class="text-slate-400 text-[11px]">Packed</span>
            </div>

            <div class="flex flex-col items-center gap-1.5">
              <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold">3</div>
              <span class="text-slate-400 text-[11px]">Shipped</span>
            </div>

            <div class="flex flex-col items-center gap-1.5">
              <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold">4</div>
              <span class="text-slate-400 text-[11px]">Out for Delivery</span>
            </div>

            <div class="flex flex-col items-center gap-1.5">
              <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold">5</div>
              <span class="text-slate-400 text-[11px]">Delivered</span>
            </div>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#/orders" class="px-6 py-3 rounded-xl font-heading font-bold text-xs bg-navy-900 text-white hover:bg-slate-800 transition-all">
            View All My Orders
          </a>
          <a href="#/shop" class="px-6 py-3 rounded-xl font-heading font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
            Continue Shopping
          </a>
        </div>

      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
};
