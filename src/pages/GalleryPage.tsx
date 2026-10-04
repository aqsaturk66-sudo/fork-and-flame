import React, { useState } from 'react';
import { Flame, X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Chicken White Shahi Karahi',
      category: 'Karahi & Handi',
      image: '/images/dishes/chicken_white_shahi.jpg',
      caption: 'Slow cooked in clay and iron woks with fresh cream and whole aromatic spices.',
    },
    {
      id: 'g-2',
      title: 'Charcoal Flame BBQ Seekh Kabab',
      category: 'Charcoal Grill',
      image: '/images/dishes/seekh_kabab.jpg',
      caption: 'Juicy skewered seekh kababs grilled over red-hot charcoal coals.',
    },
    {
      id: 'g-3',
      title: 'Chicken Tikka Charcoal Roast',
      category: 'Charcoal Grill',
      image: '/images/dishes/chicken_tikka.jpg',
      caption: 'Marinated in signature Badin masala and slow roasted over live open flames.',
    },
    {
      id: 'g-4',
      title: 'Chicken Achari Karahi',
      category: 'Karahi & Handi',
      image: '/images/dishes/chicken_achari_karahi.jpg',
      caption: 'Tangy and aromatic pickling spices infused into succulent chicken karahi.',
    },
    {
      id: 'g-5',
      title: 'Mutton White Shahi Karahi',
      category: 'Karahi & Handi',
      image: '/images/dishes/mutton_white_shahi.jpg',
      caption: 'Tender mutton cooked with rich yogurt, butter, almonds, and delicate herbs.',
    },
    {
      id: 'g-6',
      title: 'Sizzling Gola Kabab',
      category: 'Charcoal Grill',
      image: '/images/dishes/gola_kabab.jpg',
      caption: 'Melt-in-mouth spiced minced meat kababs seared with smoky charcoal perfection.',
    },
    {
      id: 'g-7',
      title: 'Chicken Boneless Handi (White)',
      category: 'Karahi & Handi',
      image: '/images/dishes/chicken_boneless_white.jpg',
      caption: 'Creamy boneless chicken fillets simmered in handi with white pepper and butter.',
    },
    {
      id: 'g-8',
      title: 'Chicken Coal Karahi',
      category: 'Karahi & Handi',
      image: '/images/dishes/chicken_coal_karahi.jpg',
      caption: 'Distinctive smoky coal dum infused into hearty tomato masala karahi.',
    },
    {
      id: 'g-9',
      title: 'Mutton Sulemani Karahi',
      category: 'Karahi & Handi',
      image: '/images/dishes/mutton_sulemani_karahi.jpg',
      caption: 'Traditional robust mutton karahi prepared with green chillies and fresh ginger.',
    },
    {
      id: 'g-10',
      title: 'Mutton Regular Karahi',
      category: 'Karahi & Handi',
      image: '/images/dishes/mutton_regular_karahi.jpg',
      caption: 'Tender goat meat braised with fresh tomatoes, ginger and cracked black pepper.',
    },
    {
      id: 'g-11',
      title: 'Chicken Spring Karahi',
      category: 'Karahi & Handi',
      image: '/images/dishes/chicken_spring_karahi.jpg',
      caption: 'Vibrant karahi with julienned ginger, crisp capsicum and rich gravy.',
    },
    {
      id: 'g-12',
      title: 'Chicken Boneless Handi (Red)',
      category: 'Karahi & Handi',
      image: '/images/dishes/chicken_boneless_red.jpg',
      caption: 'Silky red gravy handi cooked with ripe tomatoes and traditional butter dum.',
    },
  ];

  const categories = [
    'all',
    'Karahi & Handi',
    'Charcoal Grill',
    'Biryani & Rice',
    'Fast Food',
    'High Tea & Desserts',
    'Ambiance',
  ];

  const filtered =
    selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter((i) => i.category === selectedCategory);

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1711] border border-[#382b20] text-xs text-[#d4a343]">
          <Flame className="w-3.5 h-3.5 fill-[#d4a343]" />
          <span>Visual Journey</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#faf6ee] tracking-tight">
          Restaurant Gallery
        </h1>
        <p className="text-xs sm:text-sm text-[#9e907e]">
          A glimpse into the kitchen fires, sizzling karahis, and dining atmosphere of Fork & Flame Badin.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg capitalize transition-colors ${
              selectedCategory === cat
                ? 'bg-[#d4a343] text-[#0f0c0a] font-bold shadow-md shadow-amber-950/40'
                : 'bg-[#14100d] text-[#a89680] hover:text-white border border-[#261d16]'
            }`}
          >
            {cat === 'all' ? 'All Photos' : cat}
          </button>
        ))}
      </div>

      {/* Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#14100d] border border-[#2b2118] transition-all duration-300 hover:border-[#d4a343]/50 hover:shadow-2xl"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#1c1511]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            <div className="absolute inset-0 p-5 flex flex-col justify-end text-left">
              <div className="flex items-center justify-between text-xs text-[#d4a343] font-medium mb-1">
                <span>{item.category}</span>
                <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#faf6ee] leading-tight">
                {item.title}
              </h3>
              <p className="text-xs text-[#b8aa97] mt-1 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Image View */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#14100d] border border-[#33261d] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] overflow-hidden bg-black">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-xs uppercase tracking-wider text-[#d4a343] font-semibold mb-1">
                {activeImage.category}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#faf6ee]">
                {activeImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#b8aa97] mt-2">
                {activeImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
