import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, CheckCircle2, ShieldCheck, Truck, Store, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Order, RestaurantSettings } from '../types';

interface CheckoutPageProps {
  settings: RestaurantSettings;
  setActiveTab: (tab: string) => void;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  settings,
  setActiveTab,
  onOrderPlaced,
}) => {
  const { cart, subtotal, deliveryFee, total, clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#1c1511] border border-[#2b2118] flex items-center justify-center text-[#6e5f50] mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#faf6ee]">
          Your Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-[#9c8e7c] max-w-sm mx-auto">
          You don't have any items to checkout yet. Browse our delicious Karahi, Handi, BBQ, and fast food dishes.
        </p>
        <button
          onClick={() => setActiveTab('menu')}
          className="px-6 py-3 text-xs uppercase tracking-wider font-bold bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] rounded-lg shadow-md transition-colors"
        >
          Explore Menu
        </button>
      </div>
    );
  }

  const effectiveDeliveryFee = orderType === 'pickup' ? 0 : deliveryFee;
  const effectiveTotal = subtotal + effectiveDeliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage('Please enter your full name and phone number.');
      return;
    }

    if (orderType === 'delivery' && (!address.trim() || address.trim().length < 5)) {
      setErrorMessage('Please provide a complete delivery address in Badin.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        orderType,
        address: orderType === 'delivery' ? address.trim() : undefined,
        notes: notes.trim() || undefined,
        items: cart.map((item) => ({
          menuItemId: item.menuItemId,
          name: item.name,
          variantName: item.variantName,
          price: item.price,
          quantity: item.quantity,
          itemTotal: item.price * item.quantity,
        })),
        subtotal,
        deliveryFee: effectiveDeliveryFee,
        total: effectiveTotal,
        paymentMethod: orderType === 'delivery' ? 'Cash on Delivery' : 'Cash on Pickup',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to place order');
      }

      const createdOrder: Order = await res.json();
      clearCart();
      onOrderPlaced(createdOrder);
      setActiveTab('order-confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Error processing order. Please try again or call ' + settings.phone);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Top back button */}
      <div>
        <button
          onClick={() => setActiveTab('menu')}
          className="inline-flex items-center gap-1.5 text-xs text-[#a89680] hover:text-[#d4a343] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Menu</span>
        </button>
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#faf6ee]">
          Complete Your Order
        </h1>
        <p className="text-xs text-[#8c7d6b]">
          Fork & Flame · Thar Coal Road, Tokhar, Badin ({settings.phone})
        </p>
      </div>

      {errorMessage && (
        <div className="max-w-3xl mx-auto p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Customer & Delivery Form Column */}
        <div className="lg:col-span-7 bg-[#14100d] border border-[#2b2118] rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl">
          {/* Order Type Toggle */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9e907e] mb-2">
              Select Service Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-3.5 rounded-xl border flex items-center justify-center gap-2.5 transition-all ${
                  orderType === 'delivery'
                    ? 'bg-[#241a13] border-[#d4a343] text-[#faf6ee] font-bold shadow-md'
                    : 'bg-[#18130f] border-[#291f17] text-[#a89680] hover:text-white'
                }`}
              >
                <Truck className="w-4 h-4 text-[#d4a343]" />
                <span className="text-xs">Home Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`p-3.5 rounded-xl border flex items-center justify-center gap-2.5 transition-all ${
                  orderType === 'pickup'
                    ? 'bg-[#241a13] border-[#d4a343] text-[#faf6ee] font-bold shadow-md'
                    : 'bg-[#18130f] border-[#291f17] text-[#a89680] hover:text-white'
                }`}
              >
                <Store className="w-4 h-4 text-[#d4a343]" />
                <span className="text-xs">Self Takeaway / Pickup</span>
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#faf6ee] flex items-center gap-2">
              <span>Customer Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Aslam Khan"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-xs text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0332-1234567"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-xs text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors"
                />
              </div>
            </div>

            {orderType === 'delivery' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Delivery Address in Badin / Tokhar *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Flat / Shop Number, Street, Sector / Near Landmark in Badin City or Tokhar"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-xs text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors"
                />
                <p className="text-[11px] text-[#786b5b] mt-1">
                  We deliver across Badin city, Tokhar, and nearby areas.
                </p>
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                Kitchen / Cooking Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Extra spicy karahi, deliver garlic naan hot, less salt"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-xs text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="pt-2 border-t border-[#241c16] space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9e907e]">
              Payment Method
            </label>
            <div className="p-3.5 rounded-xl bg-[#1c1511] border border-[#2e2319] flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs text-[#f5ecd8]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">
                  {orderType === 'delivery' ? 'Cash on Delivery (COD)' : 'Cash on Pickup'}
                </span>
              </div>
              <span className="text-[11px] text-[#8c7d6b]">Pay in PKR upon receiving</span>
            </div>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-5 bg-[#14100d] border border-[#2b2118] rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl">
          <h2 className="font-serif text-xl font-bold text-[#faf6ee] pb-3 border-b border-[#241c16]">
            Order Summary ({cart.length} items)
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-start text-xs gap-3">
                <div className="flex-1">
                  <div className="font-semibold text-[#f5ecd8]">{item.name}</div>
                  <div className="text-[11px] text-[#7d6e5d]">
                    Rs. {item.price.toLocaleString()} × {item.quantity}
                  </div>
                </div>
                <div className="font-bold text-[#e5b85c]">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#241c16] space-y-2 text-xs">
            <div className="flex justify-between text-[#a39480]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#f5ecd8]">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-[#a39480]">
              <span>Delivery Fee</span>
              <span className="font-semibold text-[#f5ecd8]">
                {effectiveDeliveryFee === 0 ? (
                  <span className="text-emerald-400 font-bold">FREE</span>
                ) : (
                  `Rs. ${effectiveDeliveryFee.toLocaleString()}`
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-[#291f17] flex justify-between items-baseline">
              <span className="font-bold text-sm text-[#faf6ee]">Total Payable</span>
              <span className="font-bold text-xl text-[#e5b85c]">
                Rs. {effectiveTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#c9922c] to-[#e5b85c] hover:brightness-110 active:scale-95 text-[#0f0c0a] rounded-xl shadow-xl shadow-amber-950/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Order...' : 'Confirm & Place Order'}</span>
            </button>
            <p className="text-[11px] text-center text-[#7d6e5d] mt-2.5">
              By confirming, your order will be dispatched immediately.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
