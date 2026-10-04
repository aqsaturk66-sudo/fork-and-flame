import React from 'react';
import { Flame, Clock, Phone, MapPin, ArrowRight, Star, Sparkles, Utensils, ShieldCheck, Award } from 'lucide-react';
import { MenuItem, RestaurantSettings, Review } from '../types';
import { MenuCard } from '../components/MenuCard';

interface HomePageProps {
  settings: RestaurantSettings;
  featuredItems: MenuItem[];
  reviews: Review[];
  setActiveTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  featuredItems,
  reviews,
  setActiveTab,
}) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0d0a08]">
        {/* Background glow and subtle fire ambiance */}
        {/* Subtle decorative motif pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#d4a343_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08] via-transparent to-[#0d0a08]/80 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Top location tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1711] border border-[#382b20] text-xs text-[#d4a343] mb-6 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#d4a343]" />
            <span>Thar Coal Road, Tokhar, Badin, Sindh</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-[#faf6ee] tracking-tight leading-[1.1] mb-6">
            Fork & Flame
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#d6c8b4] font-serif italic max-w-2xl mx-auto mb-4">
            "{settings.tagline}"
          </p>

          <p className="text-base sm:text-lg text-[#e5b85c] font-serif max-w-xl mx-auto mb-8 dir-rtl">
            {settings.urduTagline}
          </p>

          <p className="text-sm sm:text-base text-[#a39480] max-w-2xl mx-auto leading-relaxed mb-10">
            Welcome to Badin’s premier culinary destination. Savor authentic slow-cooked Karahi, fragrant Handi dum specialities, sizzling charcoal BBQ, and artisanal Fast Food crafted fresh over roaring flames.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#c9922c] to-[#e5b85c] hover:brightness-110 active:scale-95 text-[#0f0c0a] rounded-lg shadow-xl shadow-amber-950/60 transition-all flex items-center justify-center gap-2.5"
            >
              <Utensils className="w-4 h-4" />
              <span>Explore Menu & Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full sm:w-auto px-7 py-4 text-xs font-bold uppercase tracking-wider bg-[#1c1510] hover:bg-[#261d16] border border-[#3d2f23] text-[#f5ecd8] rounded-lg transition-colors flex items-center justify-center gap-2.5"
            >
              <Phone className="w-4 h-4 text-[#d4a343]" />
              <span>Call For Delivery ({settings.phone})</span>
            </a>
          </div>

          {/* Service indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-[#241c16]/80 text-left">
            <div className="p-3.5 bg-[#14100d]/80 border border-[#2b2118] rounded-xl">
              <div className="text-[11px] uppercase tracking-wider text-[#d4a343] font-semibold">
                Lunch Service
              </div>
              <div className="text-sm font-serif font-bold text-[#faf6ee] mt-0.5">
                لذیذ اور معیاری
              </div>
              <div className="text-xs text-[#8c7d6b] mt-0.5">From 12:00 PM</div>
            </div>

            <div className="p-3.5 bg-[#14100d]/80 border border-[#2b2118] rounded-xl">
              <div className="text-[11px] uppercase tracking-wider text-[#d4a343] font-semibold">
                High Tea Special
              </div>
              <div className="text-sm font-serif font-bold text-[#faf6ee] mt-0.5">
                شاندار اور اسپیشل
              </div>
              <div className="text-xs text-[#8c7d6b] mt-0.5">Snacks & Karak Tea</div>
            </div>

            <div className="p-3.5 bg-[#14100d]/80 border border-[#2b2118] rounded-xl">
              <div className="text-[11px] uppercase tracking-wider text-[#d4a343] font-semibold">
                Dinner Service
              </div>
              <div className="text-sm font-serif font-bold text-[#faf6ee] mt-0.5">
                لذیذ اور شاندار
              </div>
              <div className="text-xs text-[#8c7d6b] mt-0.5">Till 1:00 AM</div>
            </div>

            <div className="p-3.5 bg-[#14100d]/80 border border-[#2b2118] rounded-xl">
              <div className="text-[11px] uppercase tracking-wider text-[#d4a343] font-semibold">
                Catering & Events
              </div>
              <div className="text-sm font-serif font-bold text-[#faf6ee] mt-0.5">
                فیملی تقریبات
              </div>
              <div className="text-xs text-[#8c7d6b] mt-0.5">Birthday & Hall</div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Announcement Banner from Promotional Poster */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#211812] via-[#1c140e] to-[#17100b] border border-[#3b2d20] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#d4a343]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Update for Badin City</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf6ee]">
                Now Open for Lunch & High Tea!
              </h2>
              <p className="text-xs sm:text-sm text-[#b8aa97] max-w-xl">
                {settings.announcement}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 text-xs uppercase tracking-wider font-bold bg-[#d4a343] hover:bg-[#e5b85c] text-[#0f0c0a] rounded-lg transition-colors shadow-md"
              >
                View High Tea & Lunch Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Chef Specialties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#241c16] gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4a343] font-semibold">
              Handpicked Delights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#faf6ee] mt-1">
              Fork & Flame Specialties
            </h2>
            <p className="text-xs sm:text-sm text-[#9c8e7c] mt-1.5">
              Popular signature dishes ordered every day by our patrons in Badin.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#d4a343] hover:text-[#e5b85c] transition-colors"
          >
            <span>Browse Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.slice(0, 6).map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Why Fork & Flame Section */}
      <section className="bg-[#120e0b] border-y border-[#261d16] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#d4a343] font-semibold">
              The Fork & Flame Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#faf6ee] mt-1">
              Culinary Excellence on Thar Coal Road
            </h2>
            <p className="text-xs sm:text-sm text-[#9e907e] mt-2">
              Every dish is freshly prepared to order using authentic spices and premium ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-[#17110d] border border-[#2e2319] space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#241a13] text-[#d4a343] flex items-center justify-center">
                <Flame className="w-6 h-6 fill-[#d4a343]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#faf6ee]">
                Flames & Live Tandoor
              </h3>
              <p className="text-xs sm:text-sm text-[#9c8e7c] leading-relaxed">
                Charcoal-grilled BBQ marinated in authentic rubs, clay handi curries simmered in rich butter, and puffy naan baked straight from our fiery tandoor.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#17110d] border border-[#2e2319] space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#241a13] text-[#d4a343] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#d4a343]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#faf6ee]">
                Hygiene & Freshness
              </h3>
              <p className="text-xs sm:text-sm text-[#9c8e7c] leading-relaxed">
                "صفائی کا معیار اور صحت بخش غذا" — We guarantee strict food cleanliness standards, premium vegetable oils, and fresh locally sourced meats daily.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#17110d] border border-[#2e2319] space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#241a13] text-[#d4a343] flex items-center justify-center">
                <Award className="w-6 h-6 text-[#d4a343]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#faf6ee]">
                Family Hall & Catering
              </h3>
              <p className="text-xs sm:text-sm text-[#9c8e7c] leading-relaxed">
                A warm, welcoming dining environment for families, birthdays, and private gatherings, accompanied by custom portion catering boxes for events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#241c16] gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4a343] font-semibold">
              Guest Feedback
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#faf6ee] mt-1">
              What Badin Is Saying
            </h2>
          </div>

          <button
            onClick={() => {
              setActiveTab('reviews');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#d4a343] hover:text-[#e5b85c] transition-colors"
          >
            <span>Read All Reviews & Rate Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-xl bg-[#14100d] border border-[#291f17] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-[#d4a343] fill-[#d4a343]'
                          : 'text-[#423528]'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#cfc1af] italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#211a14] flex items-center justify-between text-xs text-[#8c7d6b]">
                <span className="font-serif font-bold text-[#f5ecd8]">
                  {review.customerName}
                </span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location & Quick Contact Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#1a140f] to-[#120e0b] border border-[#33261d] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#261d16] flex items-center justify-center text-[#d4a343]">
            <MapPin className="w-6 h-6" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#faf6ee]">
              Dine With Us or Order To Your Door
            </h2>
            <p className="text-sm text-[#a39480]">
              {settings.address}
            </p>
            <p className="text-xs text-[#8a7a67]">
              {settings.deliveryArea}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="px-6 py-3 rounded-lg bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Call {settings.phone}</span>
            </a>

            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-lg bg-[#241b14] hover:bg-[#30241b] border border-[#3d2f23] text-[#f5ecd8] font-semibold text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <Utensils className="w-4 h-4" />
              <span>Order Online Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
