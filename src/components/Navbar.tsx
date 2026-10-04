import React, { useState } from 'react';
import { Flame, ShoppingBag, Phone, MessageSquare, Menu, X, Shield, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RestaurantSettings } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings: RestaurantSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, settings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartDrawerOpen } = useCart();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#17120e] border-b border-[#2d231b] text-xs py-2 px-4 text-[#c7b9a5] hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#d4a343] font-medium">
              <Flame className="w-3.5 h-3.5 fill-[#d4a343]" />
              Flame. Flavour. Fantastic.
            </span>
            <span className="text-[#594d40]">|</span>
            <span className="flex items-center gap-1 text-[#a39480]">
              <Clock className="w-3.5 h-3.5 text-[#d4a343]" />
              Lunch, High Tea & Dinner · Badin, Sindh
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 hover:text-[#e5b85c] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#d4a343]" />
              <span>{settings.phone}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#0f0c0a]/95 backdrop-blur-md border-b border-[#241c16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#d4a343] via-[#b87c24] to-[#7a4c14] flex items-center justify-center shadow-lg shadow-amber-950/40 border border-[#f0c975]/30 group-hover:scale-105 transition-transform duration-300">
                <Flame className="w-6 h-6 text-[#120e0b] fill-[#120e0b]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#fbf8f3] group-hover:text-[#e5b85c] transition-colors">
                    Fork & Flame
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#a89680]">
                  <span>Badin</span>
                  <span>·</span>
                  <span className="text-[#d4a343] font-medium">Restaurant</span>
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 focus:outline-none ${
                      isActive
                        ? 'text-[#e5b85c]'
                        : 'text-[#d6c9b6] hover:text-[#fbf8f3]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4a343] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Order Now CTA (Desktop) */}
              <button
                onClick={() => handleNavClick('menu')}
                className="hidden lg:inline-flex items-center justify-center px-4 py-2.5 text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-[#c9922c] to-[#e5b85c] text-[#120e0a] rounded hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-950/50"
              >
                Order Now
              </button>

              {/* Cart Trigger Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-2.5 rounded-lg bg-[#1a1410] border border-[#33261d] text-[#e5d9c7] hover:border-[#d4a343]/50 hover:text-[#e5b85c] transition-all focus:outline-none"
                aria-label={`Cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-[#d4a343] text-[#0f0c0a] text-[11px] font-bold flex items-center justify-center shadow-md animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Admin Portal Link */}
              <button
                onClick={() => handleNavClick('admin')}
                className="p-2.5 rounded-lg bg-[#14100d] border border-[#241c16] text-[#8a7a67] hover:text-[#d4a343] hover:border-[#3d2e23] transition-colors focus:outline-none"
                title="Restaurant Owner Portal"
              >
                <Shield className="w-4 h-4" />
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-lg bg-[#1a1410] border border-[#33261d] text-[#d6c9b6] hover:text-[#fbf8f3] focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#120e0b] border-b border-[#2b2118] px-4 pt-3 pb-6 space-y-2 shadow-2xl">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-3 px-3 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#241c16] text-[#e5b85c] font-semibold'
                      : 'text-[#d6c9b6] hover:bg-[#1a1410] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#241c16] flex flex-col gap-2.5">
              <button
                onClick={() => handleNavClick('menu')}
                className="w-full py-3 text-center text-xs uppercase tracking-wider font-bold bg-[#d4a343] text-[#0f0c0a] rounded-lg shadow-md hover:bg-[#e5b85c]"
              >
                Explore Full Menu
              </button>
              <div className="flex items-center justify-between text-xs text-[#a39480] px-2 pt-2">
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-1.5 text-[#e5b85c]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{settings.phone}</span>
                </a>
                <span className="text-emerald-400">Delivery Available</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
