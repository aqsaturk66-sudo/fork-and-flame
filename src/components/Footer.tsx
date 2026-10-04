import React from 'react';
import { Flame, MapPin, Phone, MessageSquare, Clock, ShieldCheck, Heart } from 'lucide-react';
import { RestaurantSettings } from '../types';

interface FooterProps {
  settings: RestaurantSettings;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, setActiveTab }) => {
  return (
    <footer className="bg-[#0a0806] border-t border-[#211a14] pt-16 pb-12 text-[#c2b4a1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4a343] flex items-center justify-center text-[#120e0b]">
                <Flame className="w-6 h-6 fill-[#120e0b]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#faf6ee] tracking-tight">
                  Fork & Flame
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#d4a343]">
                  Restaurant · Badin
                </p>
              </div>
            </div>

            <p className="text-sm text-[#9c8e7b] leading-relaxed">
              {settings.tagline} Experience authentic Karahi, Handi, BBQ, Dum Biryani, and sizzling Wok Delights crafted with fresh ingredients over open flame.
            </p>

            <div className="p-3 bg-[#14100c] border border-[#2b2118] rounded-lg">
              <p className="font-serif text-base text-[#e5b85c] font-medium text-right dir-rtl leading-snug">
                {settings.urduTagline}
              </p>
              <p className="text-[11px] text-[#857665] mt-1 text-right">
                صفائی کا معیار اور صحت بخش غذا
              </p>
            </div>
          </div>

          {/* Timings & Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#f5eedf] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4a343]" />
              Dining Hours & Services
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-[#14100c] border border-[#261d16]">
                <div className="text-xs uppercase tracking-wider text-[#d4a343] font-semibold">
                  Lunch & High Tea
                </div>
                <div className="text-[#ede5d8] mt-0.5">12:00 PM – 5:00 PM</div>
                <div className="text-[11px] text-[#8c7d6b] mt-0.5">Special snacks, tea, rolls & fresh platters</div>
              </div>

              <div className="p-3 rounded-lg bg-[#14100c] border border-[#261d16]">
                <div className="text-xs uppercase tracking-wider text-[#d4a343] font-semibold">
                  Dinner Service
                </div>
                <div className="text-[#ede5d8] mt-0.5">6:00 PM – 1:00 AM</div>
                <div className="text-[11px] text-[#8c7d6b] mt-0.5">Fresh Karahi, Handi, BBQ & Biryani</div>
              </div>

              <p className="text-xs text-[#8c7d6b]">
                ★ Family Hall, Birthday & Get-Together Reservations, and Catering Packs Available.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#f5eedf]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#e5b85c] transition-colors"
                >
                  Full Menu & Prices
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#e5b85c] transition-colors"
                >
                  Specialty Karahi & Handi
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#e5b85c] transition-colors"
                >
                  About Fork & Flame
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#e5b85c] transition-colors"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#e5b85c] transition-colors"
                >
                  Customer Reviews & Ratings
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#e5b85c] transition-colors"
                >
                  Contact & Location
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8a7966] hover:text-[#d4a343] transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Restaurant Owner Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#f5eedf] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d4a343]" />
              Visit & Order
            </h4>

            <div className="space-y-3 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#8a7b68]">Address</div>
                <div className="text-[#f0e6d6] font-medium mt-0.5">{settings.address}</div>
                <div className="text-xs text-[#a39480] mt-0.5 font-serif">{settings.addressUrdu}</div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#8a7b68]">Phone & Delivery</div>
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-[#e5b85c] font-semibold text-base flex items-center gap-1.5 mt-0.5 hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  <span>{settings.phone}</span>
                </a>
                <div className="text-xs text-emerald-400 mt-0.5">Home & Office Delivery Available</div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#8a7b68]">WhatsApp Order</div>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-1 text-xs px-3 py-2 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/50 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#1f1812] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#786b5c]">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Fork & Flame Restaurant. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Thar Coal Road, Tokhar, Badin, Sindh</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-[#d4a343]">
              Crafted with <Heart className="w-3 h-3 fill-current text-amber-500" /> for Badin Food Lovers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
