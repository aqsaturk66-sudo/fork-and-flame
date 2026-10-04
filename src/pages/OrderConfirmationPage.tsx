import React, { useState } from 'react';
import { CheckCircle2, Clock, Phone, MessageSquare, RefreshCw, MapPin, ArrowRight } from 'lucide-react';
import { Order, RestaurantSettings } from '../types';

interface OrderConfirmationPageProps {
  order: Order | null;
  settings: RestaurantSettings;
  setActiveTab: (tab: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order: initialOrder,
  settings,
  setActiveTab,
}) => {
  const [order, setOrder] = useState<Order | null>(initialOrder);
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#faf6ee]">
          No Active Order Found
        </h2>
        <p className="text-xs sm:text-sm text-[#9c8e7c]">
          You haven't placed an order recently in this session.
        </p>
        <button
          onClick={() => setActiveTab('menu')}
          className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#c9922c] text-[#0f0c0a] rounded-lg"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const refreshStatus = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`);
      if (res.ok) {
        const fresh: Order = await res.json();
        setOrder(fresh);
      }
    } catch {
      // ignore
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const statuses: Order['status'][] = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed'];
  const currentIdx = statuses.indexOf(order.status);

  const handleWhatsAppFollowUp = () => {
    const text = encodeURIComponent(
      `Hello Fork & Flame, I recently placed order *#${order.id}* for *${order.customerName}* (Total: Rs. ${order.total.toLocaleString()}). Could you please update me on delivery progress? Thank you!`
    );
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Top Banner */}
      <div className="text-center space-y-3 bg-[#14100d] border border-[#2b2118] p-8 rounded-2xl shadow-xl">
        <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#faf6ee]">
          Order Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-[#b8ab99]">
          Thank you, <strong className="text-[#faf6ee]">{order.customerName}</strong>. Your order has been dispatched to our kitchen on Thar Coal Road.
        </p>
        <div className="inline-block py-1.5 px-4 rounded-full bg-[#1f1711] border border-[#3b2d20] text-xs font-mono font-bold text-[#d4a343]">
          ORDER #{order.id}
        </div>
      </div>

      {/* Live Order Tracker */}
      <div className="bg-[#14100d] border border-[#2b2118] p-6 rounded-2xl space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#241c16]">
          <h2 className="font-serif text-lg font-bold text-[#faf6ee] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#d4a343]" />
            <span>Live Order Status:</span>
            <span className="text-[#e5b85c]">{order.status}</span>
          </h2>
          <button
            onClick={refreshStatus}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs text-[#a39480] hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#d4a343]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Progress Dots */}
        {order.status !== 'Cancelled' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2 text-center">
              {statuses.map((s, idx) => {
                const isPassed = currentIdx >= idx;
                const isCurrent = currentIdx === idx;
                return (
                  <div key={s} className="space-y-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isPassed
                          ? 'bg-[#d4a343]'
                          : 'bg-[#241c16]'
                      } ${isCurrent ? 'ring-2 ring-amber-400/50 animate-pulse' : ''}`}
                    />
                    <span
                      className={`text-[11px] block truncate font-medium ${
                        isPassed ? 'text-[#faf6ee]' : 'text-[#6e5f50]'
                      }`}
                    >
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-center text-[#8c7d6b] pt-1">
              Estimated preparation & delivery time: 30 - 45 minutes
            </p>
          </div>
        ) : (
          <div className="p-3 bg-red-950/50 border border-red-800 rounded-lg text-xs text-red-300 text-center">
            This order has been cancelled. Please contact restaurant directly.
          </div>
        )}
      </div>

      {/* Receipt Details */}
      <div className="bg-[#14100d] border border-[#2b2118] p-6 rounded-2xl space-y-4 shadow-xl">
        <h2 className="font-serif text-lg font-bold text-[#faf6ee] pb-2 border-b border-[#241c16]">
          Order Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#8c7d6b] block">Customer Phone:</span>
            <span className="font-semibold text-[#f5ecd8]">{order.customerPhone}</span>
          </div>
          <div>
            <span className="text-[#8c7d6b] block">Service Type:</span>
            <span className="font-semibold text-[#f5ecd8] capitalize">
              {order.orderType === 'delivery' ? 'Home Delivery' : 'Self Pickup'}
            </span>
          </div>
          {order.address && (
            <div className="sm:col-span-2">
              <span className="text-[#8c7d6b] block">Delivery Address:</span>
              <span className="font-semibold text-[#f5ecd8]">{order.address}</span>
            </div>
          )}
          {order.notes && (
            <div className="sm:col-span-2">
              <span className="text-[#8c7d6b] block">Cooking Notes:</span>
              <span className="text-[#bfae9b] italic">{order.notes}</span>
            </div>
          )}
          <div>
            <span className="text-[#8c7d6b] block">Payment Mode:</span>
            <span className="font-semibold text-emerald-400">{order.paymentMethod}</span>
          </div>
          <div>
            <span className="text-[#8c7d6b] block">Order Placed At:</span>
            <span className="font-semibold text-[#f5ecd8]">
              {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Item List */}
        <div className="pt-3 border-t border-[#241c16] space-y-2 text-xs">
          <div className="font-semibold text-[#8c7d6b]">Items Ordered:</div>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-1 border-b border-[#1c1511]">
              <span className="text-[#f5ecd8]">
                {item.name} × {item.quantity}
              </span>
              <span className="font-bold text-[#e5b85c]">
                Rs. {item.itemTotal.toLocaleString()}
              </span>
            </div>
          ))}

          <div className="pt-2 space-y-1">
            <div className="flex justify-between text-[#8c7d6b]">
              <span>Subtotal</span>
              <span>Rs. {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#8c7d6b]">
              <span>Delivery Fee</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#faf6ee] pt-2 border-t border-[#241c16]">
              <span>Total Amount</span>
              <span className="text-[#e5b85c] text-base">
                Rs. {order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={() => {
            setActiveTab('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-[#1a1410] border border-[#2e2319] text-[#f5ecd8] hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>Order More Food</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleWhatsAppFollowUp}
            className="flex-1 sm:flex-none px-5 py-3 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Track on WhatsApp</span>
          </button>

          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="p-3 rounded-lg bg-[#241a13] border border-[#3b2d20] text-[#d4a343] hover:text-white transition-colors"
            title="Call Restaurant"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
