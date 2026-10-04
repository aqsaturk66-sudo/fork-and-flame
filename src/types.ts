export interface MenuItemVariant {
  key: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: number | string;
  name: string;
  category: string;
  description?: string;
  price: number;
  prices?: Record<string, number>;
  variants?: { name: string; price: number; key?: string }[];
  image: string;
  note?: string;
  isAvailable?: boolean;
  isPopular?: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  order: number;
}

export interface CartItem {
  id: string; // unique cart line item id, e.g. `${menuItemId}-${variantName || 'default'}`
  menuItemId: string | number;
  name: string;
  variantName?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface RestaurantSettings {
  name: string;
  tagline: string;
  urduTagline: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  addressUrdu: string;
  hours: string;
  deliveryArea: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  announcement: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
}

export interface OrderItem {
  menuItemId: string | number;
  name: string;
  variantName?: string;
  price: number;
  quantity: number;
  itemTotal: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  orderType: 'delivery' | 'pickup' | 'dine-in';
  address?: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
  createdAt: string;
  paymentMethod: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'hidden';
  isDemo?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read';
}

export const defaultSettings: RestaurantSettings = {
  name: "Fork & Flame",
  tagline: "Flame. Flavour. Fantastic.",
  urduTagline: "ہر نوالہ... ذائقے اور صحت کا وعدہ!",
  phone: "0332-0789999",
  whatsappNumber: "923320789999",
  address: "Thar Coal Road, Tokhar, Badin, Sindh, Pakistan",
  addressUrdu: "تھر کول روڈ، ٹکر، بدین",
  hours: "Lunch & High Tea: 12:00 PM – 5:00 PM | Dinner: 6:00 PM – 1:00 AM",
  deliveryArea: "Badin City, Tokhar & adjacent areas (Fast home & office delivery)",
  deliveryFee: 100,
  freeDeliveryThreshold: 2000,
  announcement: "Now Open for Lunch & High Tea alongside our Famous Dinner Service! Special arrangements for Family Birthdays, Get-Togethers & Catering.",
  socialLinks: {
    facebook: "https://facebook.com/forkandflame_bdn",
    instagram: "https://instagram.com/forkandflame_bdn",
    tiktok: "https://tiktok.com/@forkandflame_bdn"
  }
};
