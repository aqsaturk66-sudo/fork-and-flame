import React from 'react';
import { Flame, Clock, Users, HeartHandshake, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { RestaurantSettings } from '../types';

interface AboutPageProps {
  settings: RestaurantSettings;
  setActiveTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, setActiveTab }) => {
  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1711] border border-[#382b20] text-xs text-[#d4a343]">
          <Flame className="w-3.5 h-3.5 fill-[#d4a343]" />
          <span>Our Story & Philosophy</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#faf6ee] tracking-tight">
          About Fork & Flame
        </h1>
        <p className="text-lg text-[#d4af37] font-serif italic">
          "{settings.tagline}"
        </p>
        <p className="text-base text-[#e5b85c] font-serif dir-rtl">
          {settings.urduTagline}
        </p>
      </div>

      {/* Main Narrative with authentic image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-sm text-[#b5a693] leading-relaxed">
          <h2 className="font-serif text-3xl font-bold text-[#faf6ee] leading-tight">
            A New Standard for Dining in Badin, Sindh
          </h2>
          <p>
            Conveniently situated on Thar Coal Road in Tokhar, Badin, Fork & Flame was established to bring high-standard culinary experiences, rich traditional aromas, and modern family dining under one roof.
          </p>
          <p>
            Our cooking is rooted in the timeless appeal of live fire and charcoal grilling. From sizzling cast-iron karahis and fragrant earthen handis to succulent malai boti skewers and crispy golden broast, every dish is prepared fresh to order using quality spices and carefully selected cuts of meat.
          </p>
          <div className="p-4 bg-[#14100d] border-l-2 border-[#d4a343] rounded-r-lg space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#d4a343] font-semibold">
              Our Core Promise
            </span>
            <p className="text-xs text-[#cfc1af] italic">
              "صفائی، معیار اور صحت بخش غذا — ہمارا وعدہ، آپ کا اعتماد"
              (Cleanliness, quality, and wholesome nourishment — our promise, your trust).
            </p>
          </div>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 text-xs uppercase tracking-wider font-bold bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] rounded-lg shadow-md transition-colors"
            >
              Explore Full Menu
            </button>
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-[#1a1410] border border-[#33261d] text-[#f5ecd8] hover:border-[#d4a343]/50 rounded-lg transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4a343]" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#2e2319] shadow-2xl bg-[#1a1410]">
            <img
              src="/images/dishes/chicken_tikka.jpg"
              alt="Fork & Flame grilling and kitchen"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[#16110d] border border-[#382b20] p-4 rounded-xl shadow-xl hidden sm:flex items-center gap-3 max-w-xs">
            <div className="w-10 h-10 rounded-lg bg-[#261d16] text-[#d4a343] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#cfc1af]">
              <div className="font-bold text-[#f5ecd8]">Thar Coal Road</div>
              <div className="text-[11px] text-[#8c7d6b]">Tokhar, Badin, Sindh</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid based on real menu/poster */}
      <div className="space-y-8 pt-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#d4a343] font-semibold">
            Services & Dining
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#faf6ee]">
            Comprehensive Dining Experience
          </h2>
          <p className="text-xs sm:text-sm text-[#9c8e7c]">
            From noon tea to late night dinners and celebration catering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#14100d] border border-[#2b2118] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#241a13] text-[#d4a343] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#faf6ee]">
              Lunch & High Tea
            </h3>
            <p className="text-xs text-[#9c8e7c] leading-relaxed">
              Open from 12:00 PM onwards. Enjoy hot paratha rolls, loaded sandwiches, zinger burgers, fresh fries, and authentic Karak Doodh Patti and herbal teas.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#14100d] border border-[#2b2118] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#241a13] text-[#d4a343] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#faf6ee]">
              Family Hall & Gatherings
            </h3>
            <p className="text-xs text-[#9c8e7c] leading-relaxed">
              Special accommodations for birthdays, family get-togethers, and private gatherings with comfortable seating and dedicated service.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#14100d] border border-[#2b2118] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#241a13] text-[#d4a343] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#faf6ee]">
              Event Catering & Food Packs
            </h3>
            <p className="text-xs text-[#9c8e7c] leading-relaxed">
              Tailored distribution packs and bulk catering for corporate events, weddings, and parties across Badin city and adjacent areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
