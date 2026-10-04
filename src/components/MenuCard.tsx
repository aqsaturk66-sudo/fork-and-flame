import React, { useState, useMemo } from 'react';
import { Plus, Minus, Check, Flame } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { DishImage } from './DishImage';

interface MenuCardProps {
  item: MenuItem;
}

const SIZE_ORDER: Record<string, number> = {
  quarter: 1,
  half: 2,
  full: 3,
  small: 4,
  medium: 5,
  large: 6,
  '1.5_ltr': 7,
  chest: 8,
  leg: 9,
  tin: 10,
  regular: 11,
};

export const formatSizeLabel = (rawKey: string): string => {
  const normalized = rawKey.toLowerCase().trim();
  const knownMap: Record<string, string> = {
    quarter: 'Quarter',
    half: 'Half',
    full: 'Full',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    chest: 'Chest',
    leg: 'Leg',
    '1.5_ltr': '1.5 Ltr',
    tin: 'Tin',
    regular: 'Regular',
  };
  if (knownMap[normalized]) return knownMap[normalized];
  return rawKey.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { addToCart } = useCart();

  // Extract all sizes and prices
  const sizes = useMemo(() => {
    if (item.prices && Object.keys(item.prices).length > 0) {
      return Object.entries(item.prices)
        .map(([key, price]) => ({
          key,
          label: formatSizeLabel(key),
          price: Number(price),
        }))
        .sort((a, b) => {
          const orderA = SIZE_ORDER[a.key.toLowerCase()] ?? 99;
          const orderB = SIZE_ORDER[b.key.toLowerCase()] ?? 99;
          return orderA - orderB;
        });
    }

    if (item.variants && item.variants.length > 0) {
      return item.variants.map((v) => ({
        key: v.key || v.name.toLowerCase(),
        label: v.name,
        price: v.price,
      }));
    }

    return [{ key: 'regular', label: 'Regular', price: item.price }];
  }, [item.prices, item.variants, item.price]);

  const hasMultiplePrices = sizes.length > 1;

  // Selected size state
  const [selectedSizeKey, setSelectedSizeKey] = useState<string>(sizes[0]?.key || 'regular');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Active selected size details
  const activeSize = sizes.find((s) => s.key === selectedSizeKey) || sizes[0];
  const activePrice = activeSize?.price ?? item.price;

  const handleAdd = () => {
    if (item.isAvailable === false) return;
    const variantLabel = hasMultiplePrices ? activeSize.label : undefined;
    addToCart(item, variantLabel, quantity, activePrice);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setQuantity(1);
    }, 1200);
  };

  return (
    <div
      className={`group flex flex-col justify-between bg-[#14100d] border border-[#261d15] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#d4a343]/50 hover:shadow-xl hover:shadow-black/60 ${
        item.isAvailable === false ? 'opacity-65' : ''
      }`}
    >
      <div>
        {/* Dish Image with neutral placeholder on error - Strictly images/{id}.jpg */}
        <div className="relative">
          <DishImage
            itemId={item.id}
            itemName={item.name}
            category={item.category}
            imagePath={item.image}
            aspectClass="aspect-[16/10]"
          />

          {/* Badges / Highlights */}
          {item.badge && (
            <div className="absolute top-2.5 left-2.5 z-20">
              <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded bg-[#b87c24] text-[#0f0c0a] shadow-md">
                {item.badge}
              </span>
            </div>
          )}

          {item.isPopular && !item.badge && (
            <div className="absolute top-2.5 left-2.5 z-20">
              <span className="flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#d4a343] text-[#0f0c0a] shadow-md">
                <Flame className="w-3 h-3 fill-current" />
                Popular
              </span>
            </div>
          )}

          {item.isAvailable === false && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-20">
              <span className="text-xs uppercase tracking-widest font-bold text-red-300 px-3 py-1 bg-red-950/80 border border-red-800 rounded">
                Currently Unavailable
              </span>
            </div>
          )}

          {/* Category Pill Tag */}
          <div className="absolute bottom-2.5 left-3 z-20 text-[11px] font-medium tracking-wide text-[#e8c872] drop-shadow-md">
            {item.category}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-lg font-bold text-[#faf6ee] group-hover:text-[#e5b85c] transition-colors leading-snug">
              {item.name}
            </h3>
          </div>

          {/* Note or description */}
          {item.note && (
            <div className="inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-[#201811] text-[#d4af37] border border-[#3b2d1d] mb-2">
              Note: {item.note}
            </div>
          )}

          {item.description && !item.note && (
            <p className="text-xs text-[#9c8e7c] line-clamp-2 leading-relaxed mb-2">
              {item.description}
            </p>
          )}

          {/* Requirement 3: Show all sizes with their prices for items with multiple prices */}
          {hasMultiplePrices && (
            <div className="mt-3 pt-3 border-t border-[#231a14]">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#a89680] mb-2">
                <span>Sizes & Prices</span>
                <span className="text-[10px] text-[#736352] normal-case">(select size)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {sizes.map((s) => {
                  const isSelected = selectedSizeKey === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSelectedSizeKey(s.key)}
                      className={`px-2.5 py-1.5 rounded-lg border text-left flex flex-col justify-between transition-all focus:outline-none ${
                        isSelected
                          ? 'bg-[#291e14] border-[#d4a343] text-[#faf6ee] ring-1 ring-[#d4a343]/60 shadow-md'
                          : 'bg-[#17120e] border-[#291f16] text-[#a89785] hover:border-[#3d2e20] hover:text-[#faf6ee]'
                      }`}
                      aria-label={`${s.label}: Rs. ${s.price}`}
                    >
                      <span className={`text-[11px] font-bold ${isSelected ? 'text-[#d4af37]' : 'text-[#beb09e]'}`}>
                        {s.label}
                      </span>
                      <span className="text-xs font-bold text-[#faf6ee] mt-0.5">
                        Rs. {s.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Add Controls */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="pt-3 border-t border-[#231a14] flex items-center justify-between gap-2">
          {/* Price display */}
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#7d6f5e]">
              {hasMultiplePrices ? activeSize.label : 'Price'}
            </span>
            <span className="font-sans text-lg font-bold text-[#f5ecd8]">
              Rs. {activePrice.toLocaleString()}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Quantity stepper */}
            {item.isAvailable !== false && (
              <div className="flex items-center bg-[#1a1410] border border-[#2e2319] rounded-lg">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 text-[#a89680] hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-semibold text-[#f5ecd8]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 text-[#a89680] hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Add to Cart button */}
            <button
              type="button"
              disabled={item.isAvailable === false}
              onClick={handleAdd}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : item.isAvailable !== false
                  ? 'bg-[#c9922c] hover:bg-[#d4a343] active:scale-95 text-[#0f0c0a] shadow-md shadow-amber-950/40'
                  : 'bg-[#211a14] text-[#695d4e] cursor-not-allowed'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <span>Add</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
