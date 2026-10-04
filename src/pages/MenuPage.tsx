import React, { useState, useMemo } from 'react';
import { Search, Flame, ShoppingBag, X, Utensils, Sparkles } from 'lucide-react';
import { MenuItem, Category } from '../types';
import { MenuCard } from '../components/MenuCard';
import { useCart } from '../context/CartContext';

interface MenuPageProps {
  categories: Category[];
  menuItems: MenuItem[];
  setActiveTab: (tab: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ categories, menuItems, setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount, subtotal, setIsCartDrawerOpen } = useCart();

  // Group items by category, taking into account category selection and search
  const { groupedItems, totalFilteredCount } = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // Determine relevant categories
    const targetCategories =
      selectedCategory === 'all'
        ? categories.map((c) => c.name)
        : [selectedCategory];

    const groups: { category: string; items: MenuItem[] }[] = [];
    let count = 0;

    targetCategories.forEach((catName) => {
      const itemsInCat = menuItems.filter((item) => {
        if (item.category !== catName) return false;
        if (!q) return true;
        return (
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.note && item.note.toLowerCase().includes(q))
        );
      });

      if (itemsInCat.length > 0) {
        groups.push({ category: catName, items: itemsInCat });
        count += itemsInCat.length;
      }
    });

    return { groupedItems: groups, totalFilteredCount: count };
  }, [categories, menuItems, selectedCategory, searchQuery]);

  return (
    <div className="pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Title & Tagline Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1711] border border-[#382b20] text-xs text-[#d4a343]">
          <Flame className="w-3.5 h-3.5 fill-[#d4a343]" />
          <span>Authentic Pakistani, BBQ, Karahi & Fast Food</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#faf6ee] tracking-tight">
          Fork & Flame Menu
        </h1>
        <p className="text-xs sm:text-sm text-[#9e907e] max-w-xl mx-auto">
          Loaded directly from our live kitchen menu. Explore all portions, sizes, and genuine flavours cooked fresh to order on Thar Coal Road, Badin.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-[#8a7b69] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search dishes (e.g. Chowmein, Biryani, Tikka, Broast)..."
          className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#14100d] border border-[#2e2319] text-sm text-[#f5ecd8] placeholder-[#6e604f] focus:outline-none focus:border-[#d4a343] transition-colors shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7b69] hover:text-white"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs for Categories */}
      <div className="relative border-b border-[#241c16] pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {/* All tab */}
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`shrink-0 px-4 py-2 text-xs font-semibold rounded-lg transition-all focus:outline-none ${
              selectedCategory === 'all'
                ? 'bg-[#d4a343] text-[#0f0c0a] shadow-md shadow-amber-950/40 font-bold'
                : 'bg-[#15100c] text-[#a89987] hover:bg-[#1f1812] hover:text-[#faf6ee] border border-[#261d16]'
            }`}
          >
            All Categories ({menuItems.length})
          </button>

          {/* Individual Category Tabs */}
          {categories.map((cat) => {
            const count = menuItems.filter((i) => i.category === cat.name).length;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id || cat.name}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`shrink-0 px-4 py-2 text-xs font-semibold rounded-lg transition-all focus:outline-none flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#d4a343] text-[#0f0c0a] shadow-md shadow-amber-950/40 font-bold'
                    : 'bg-[#15100c] text-[#a89987] hover:bg-[#1f1812] hover:text-[#faf6ee] border border-[#261d16]'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-[#0f0c0a]/20 text-[#0f0c0a]' : 'bg-[#201812] text-[#857463]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Subtitle / Active Filter info */}
      <div className="flex items-center justify-between text-xs text-[#8c7d6b] pt-1">
        <span>
          Showing <strong className="text-[#f5ecd8]">{totalFilteredCount}</strong> items
          {selectedCategory !== 'all' ? (
            <span>
              {' '}in <span className="text-[#d4a343] font-semibold">{selectedCategory}</span>
            </span>
          ) : (
            <span> across <span className="text-[#d4a343] font-semibold">{groupedItems.length}</span> categories</span>
          )}
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-[#d4a343] hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Dishes Grouped by Category */}
      {groupedItems.length === 0 ? (
        <div className="text-center py-16 p-8 bg-[#14100d] border border-[#241c16] rounded-2xl max-w-md mx-auto space-y-3">
          <Utensils className="w-8 h-8 text-[#8c7d6b] mx-auto opacity-70" />
          <p className="font-serif text-lg font-bold text-[#faf6ee]">No items found</p>
          <p className="text-xs text-[#8c7d6b]">
            No dishes matched your search criteria. Try a different keyword or reset filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#261d16] text-[#d4a343] rounded-lg hover:bg-[#33261d]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedItems.map((group) => (
            <section
              key={group.category}
              id={`category-${group.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="space-y-5"
            >
              {/* Category Group Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#241c16]">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d4a343]" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf6ee] tracking-tight">
                    {group.category}
                  </h2>
                </div>
                <span className="text-xs text-[#9c8e7c] bg-[#1a1410] border border-[#2d2117] px-3 py-1 rounded-full font-medium">
                  {group.items.length} {group.items.length === 1 ? 'Dish' : 'Dishes'}
                </span>
              </div>

              {/* Grid of Dishes in this Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Floating Cart Trigger for Mobile */}
      {itemCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden">
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#c9922c] to-[#e5b85c] text-[#0f0c0a] font-bold text-xs uppercase tracking-wider flex items-center justify-between shadow-2xl shadow-black active:scale-98"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
            </div>
            <span>View Cart · Rs. {subtotal.toLocaleString()}</span>
          </button>
        </div>
      )}
    </div>
  );
};
