import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RestaurantSettings } from '../types';
import { WhatsAppOrderModal } from './WhatsAppOrderModal';
import { DishImage } from './DishImage';

interface CartDrawerProps {
  settings: RestaurantSettings;
  setActiveTab: (tab: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ settings, setActiveTab }) => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    total,
  } = useCart();

  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold = settings.freeDeliveryThreshold || 2000;
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    setActiveTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrowseMenu = () => {
    setIsCartDrawerOpen(false);
    setActiveTab('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="w-full max-w-md bg-[#120e0b] border-l border-[#2e2319] h-full flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#241c16] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#241c16] text-[#d4a343] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#faf6ee]">
                  Your Cart
                </h3>
                <span className="text-xs text-[#8c7d6b]">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] text-[#8c7d6b] hover:text-red-400 p-1.5 transition-colors"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 rounded-lg text-[#9e907e] hover:text-white hover:bg-[#211a14] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Delivery Bar */}
          {cart.length > 0 && (
            <div className="px-5 py-3 bg-[#19130f] border-b border-[#241c16]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#b5a693] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4a343]" />
                  {amountNeededForFree === 0 ? (
                    <span className="text-emerald-400 font-semibold">Free Delivery Unlocked!</span>
                  ) : (
                    <span>
                      Add <strong className="text-[#f5ecd8]">Rs. {amountNeededForFree.toLocaleString()}</strong> for Free Delivery
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-bold text-[#d4a343]">{freeProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#2b2118] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#b87c24] to-[#d4a343] transition-all duration-300 rounded-full"
                  style={{ width: `${freeProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1c1511] border border-[#2b2118] flex items-center justify-center text-[#6e5f50]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#faf6ee] mb-1">
                    Your cart is empty
                  </h4>
                  <p className="text-xs text-[#8c7d6b] max-w-xs">
                    Discover our authentic Karahi, Handi, BBQ, Biryani, and Burgers fresh from the flame.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleBrowseMenu}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider font-bold bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] rounded-lg transition-all shadow-md"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#181310] border border-[#291f17] rounded-xl flex gap-3 items-center"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#241c16] shrink-0 border border-[#2e2319] relative">
                    <DishImage
                      itemId={item.menuItemId}
                      itemName={item.name}
                      category=""
                      imagePath={item.image}
                      aspectClass="aspect-square"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-[#f5ecd8] truncate">
                      {item.name}
                    </h4>
                    <div className="text-xs text-[#d4af37] font-semibold mt-0.5">
                      Rs. {item.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 bg-[#120e0b] border border-[#2e2319] rounded p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 text-[#9e907e] hover:text-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#f5ecd8]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 text-[#9e907e] hover:text-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-[#736453] hover:text-red-400 transition-colors"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Actions */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#241c16] bg-[#15100c] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#a39480]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#f5ecd8]">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#a39480]">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-[#f5ecd8]">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400">FREE</span>
                    ) : (
                      `Rs. ${deliveryFee.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#291f17] flex justify-between text-sm">
                  <span className="font-bold text-[#faf6ee]">Total Payable</span>
                  <span className="font-bold text-lg text-[#e5b85c]">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout & WhatsApp Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#c9922c] to-[#e5b85c] hover:brightness-110 active:scale-95 text-[#0f0c0a] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <WhatsAppOrderModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        settings={settings}
      />
    </>
  );
};
