import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface DishImageProps {
  itemId: number | string;
  itemName: string;
  category: string;
  className?: string;
  aspectClass?: string;
  imagePath?: string;
}

export const DishImage: React.FC<DishImageProps> = ({
  itemId,
  itemName,
  category,
  className = 'w-full h-full object-cover',
  aspectClass = 'aspect-[16/10]',
  imagePath,
}) => {
  const [hasError, setHasError] = useState(false);

  // Strictly follow requirement: Each item's image path is "images/{id}.jpg" (id from JSON)
  const resolvedPath = imagePath ? (imagePath.startsWith('/') ? imagePath : `/${imagePath}`) : `/images/${itemId}.jpg`;

  if (hasError) {
    return (
      <div
        className={`relative ${aspectClass} w-full overflow-hidden bg-gradient-to-br from-[#1b1511] via-[#14100d] to-[#0c0907] border-b border-[#261d16] flex flex-col items-center justify-center p-4 text-center select-none group`}
        role="img"
        aria-label={`${itemName} - Fork and Flame`}
      >
        {/* Subtle geometric dot pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d4a343_1px,transparent_1px)] [background-size:12px_12px]" />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-11 h-11 rounded-xl bg-[#231a14] border border-[#382a1c] flex items-center justify-center text-[#c99738] shadow-inner mb-2 group-hover:scale-105 transition-transform duration-300">
            <Utensils className="w-5 h-5 opacity-80" />
          </div>
          <span className="font-serif text-xs font-semibold tracking-wider uppercase text-[#c5b8a5]">
            Fork & Flame
          </span>
          <span className="text-[10px] text-[#736352] tracking-wide mt-0.5 max-w-[150px] truncate">
            {category}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${aspectClass} w-full overflow-hidden bg-[#14100d]`}>
      <img
        src={resolvedPath}
        alt={itemName}
        onError={() => setHasError(true)}
        className={`${className} transition-transform duration-500 group-hover:scale-105`}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#14100d] via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};
