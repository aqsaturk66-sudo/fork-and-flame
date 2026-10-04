import React, { useState } from 'react';
import { X, MessageSquare, Send, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RestaurantSettings } from '../types';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: RestaurantSettings;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({ isOpen, onClose, settings }) => {
  const { cart, subtotal, deliveryFee, total } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<'Delivery' | 'Pickup'>('Delivery');
  const [address, setAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isOpen) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const itemsSummary = cart
      .map((item) => `• ${item.name} × ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`)
      .join('\n');

    const message = `*NEW ORDER - FORK & FLAME RESTAURANT*\n----------------------------------------\n*Customer Details:*\nName: ${customerName}\nPhone: ${customerPhone}\nOrder Type: ${orderType}${orderType === 'Delivery' ? `\nDelivery Address: ${address}` : ''}${specialInstructions ? `\nSpecial Notes: ${specialInstructions}` : ''}\n\n*Order Items:*\n${itemsSummary}\n\n----------------------------------------\n*Subtotal:* Rs. ${subtotal.toLocaleString()}\n*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee.toLocaleString()}`}\n*Total Amount:* Rs. ${total.toLocaleString()}\n\n_Payment Method: Cash on ${orderType === 'Delivery' ? 'Delivery' : 'Pickup'}_\n_Placed via Fork & Flame Website_`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#14100d] border border-[#33261d] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#9e907e] hover:text-white hover:bg-[#211a14] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#faf6ee]">
              Order via WhatsApp
            </h3>
            <p className="text-xs text-[#a39480]">
              Direct connection to Fork & Flame ({settings.phone})
            </p>
          </div>
        </div>

        <form onSubmit={handleSendWhatsApp} className="space-y-4 text-sm">
          {/* Order preview snippet */}
          <div className="p-3 bg-[#1c1511] border border-[#2b2118] rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-xs text-[#8c7d6b]">
              <span>Cart ({cart.length} items)</span>
              <span className="font-bold text-[#f5ecd8]">Total: Rs. {total.toLocaleString()}</span>
            </div>
            <div className="text-xs text-[#b8ab99] max-h-24 overflow-y-auto space-y-1 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9e907e] mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Zahid Ali"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9e907e] mb-1">
              WhatsApp / Mobile Phone *
            </label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="e.g. 0300-1234567"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9e907e] mb-1">
              Service Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('Delivery')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  orderType === 'Delivery'
                    ? 'bg-[#d4a343] text-[#0f0c0a] border-[#d4a343]'
                    : 'bg-[#1a1410] text-[#a89680] border-[#2e2319] hover:text-white'
                }`}
              >
                Home Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType('Pickup')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  orderType === 'Pickup'
                    ? 'bg-[#d4a343] text-[#0f0c0a] border-[#d4a343]'
                    : 'bg-[#1a1410] text-[#a89680] border-[#2e2319] hover:text-white'
                }`}
              >
                Takeaway / Pickup
              </button>
            </div>
          </div>

          {orderType === 'Delivery' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9e907e] mb-1">
                Delivery Address in Badin *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Shop, Street, Area / Landmark in Badin or Tokhar"
                className="w-full px-3.5 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors text-xs"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9e907e] mb-1">
              Cooking Notes / Special Requests (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra spicy, less oil, send hot garlic naan"
              className="w-full px-3.5 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors text-xs"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#a39480] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-950/50 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Send WhatsApp Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
