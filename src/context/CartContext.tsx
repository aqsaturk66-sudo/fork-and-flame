import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, RestaurantSettings } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, variantName?: string, quantity?: number, customPrice?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  lastAddedItem: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'fork_flame_cart_v1';

export const CartProvider: React.FC<{
  children: React.ReactNode;
  settings?: RestaurantSettings | null;
}> = ({ children, settings }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }, [cart]);

  const addToCart = (item: MenuItem, variantName?: string, quantity = 1, customPrice?: number) => {
    let price = customPrice !== undefined ? customPrice : item.price;
    let displayName = item.name;

    if (variantName) {
      if (customPrice === undefined) {
        if (item.variants) {
          const v = item.variants.find((variant) => variant.name === variantName);
          if (v) price = v.price;
        } else if (item.prices) {
          const matchingKey = Object.keys(item.prices).find(
            (k) => k.toLowerCase() === variantName.toLowerCase()
          );
          if (matchingKey) price = item.prices[matchingKey];
        }
      }
      displayName = `${item.name} (${variantName})`;
    }

    const cartItemId = `${item.id}-${variantName || 'standard'}`;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItemId: item.id,
          name: displayName,
          variantName,
          price,
          quantity,
          image: item.image,
        },
      ];
    });

    setLastAddedItem(displayName);
    setTimeout(() => {
      setLastAddedItem(null);
    }, 2800);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryFeeSetting = settings?.deliveryFee ?? 100;
  const freeThreshold = settings?.freeDeliveryThreshold ?? 2000;
  const deliveryFee = subtotal === 0 || subtotal >= freeThreshold ? 0 : deliveryFeeSetting;
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        deliveryFee,
        total,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
