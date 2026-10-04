export interface MenuItem {
  id: string | number;
  name: string;
  category: string;
  description: string;
  price: number;
  prices?: Record<string, number>;
  variants?: { name: string; price: number }[];
  image: string;
  note?: string;
  isAvailable: boolean;
  isPopular?: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  order: number;
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

export const initialSettings: RestaurantSettings = {
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

export const initialCategories: Category[] = [
  {
    "id": "chinese",
    "name": "Chinese",
    "order": 1
  },
  {
    "id": "biryani-matka-special",
    "name": "Biryani & Matka Special",
    "order": 2
  },
  {
    "id": "bbq",
    "name": "BBQ",
    "order": 3
  },
  {
    "id": "daal",
    "name": "Daal",
    "order": 4
  },
  {
    "id": "broast",
    "name": "Broast",
    "order": 5
  },
  {
    "id": "burger",
    "name": "Burger",
    "order": 6
  },
  {
    "id": "rolls",
    "name": "Rolls",
    "order": 7
  },
  {
    "id": "fries",
    "name": "Fries",
    "order": 8
  },
  {
    "id": "extra",
    "name": "Extra",
    "order": 9
  },
  {
    "id": "beverages-tea",
    "name": "Beverages & Tea",
    "order": 10
  },
  {
    "id": "pizza",
    "name": "Pizza",
    "order": 11
  },
  {
    "id": "special-flavours-pizza",
    "name": "Special Flavours Pizza",
    "order": 12
  },
  {
    "id": "sandwich",
    "name": "Sandwich",
    "order": 13
  },
  {
    "id": "chicken-karahi",
    "name": "Chicken Karahi",
    "order": 14
  },
  {
    "id": "mutton-karahi",
    "name": "Mutton Karahi",
    "order": 15
  },
  {
    "id": "handi",
    "name": "Handi",
    "order": 16
  },
  {
    "id": "naan",
    "name": "Naan",
    "order": 17
  },
  {
    "id": "ice-cream",
    "name": "Ice Cream",
    "order": 18
  },
  {
    "id": "rice-wok-delights",
    "name": "Rice & Wok Delights",
    "order": 19
  }
];

export const initialMenuItems: MenuItem[] = [
  {
    "id": 1,
    "name": "Chicken Chowmein",
    "category": "Chinese",
    "description": "",
    "price": 900,
    "prices": {
      "regular": 900
    },
    "image": "images/1.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 2,
    "name": "Chicken Chowmein (Black Pepper)",
    "category": "Chinese",
    "description": "",
    "price": 800,
    "prices": {
      "regular": 800
    },
    "image": "images/2.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 3,
    "name": "Vegetable Chowmein",
    "category": "Chinese",
    "description": "",
    "price": 700,
    "prices": {
      "regular": 700
    },
    "image": "images/3.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 4,
    "name": "Chicken Macaroni Pasta",
    "category": "Chinese",
    "description": "",
    "price": 700,
    "prices": {
      "regular": 700
    },
    "image": "images/4.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 5,
    "name": "Chicken Spaghetti",
    "category": "Chinese",
    "description": "",
    "price": 700,
    "prices": {
      "regular": 700
    },
    "image": "images/5.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 6,
    "name": "Chicken Lasagna",
    "category": "Chinese",
    "description": "",
    "price": 800,
    "prices": {
      "regular": 800
    },
    "image": "images/6.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 7,
    "name": "F & F Chicken Handi Biryani",
    "category": "Biryani & Matka Special",
    "description": "",
    "price": 800,
    "prices": {
      "regular": 800
    },
    "image": "images/7.jpg",
    "isAvailable": true,
    "isPopular": true
  },
  {
    "id": 8,
    "name": "Chicken Tikka Biryani",
    "category": "Biryani & Matka Special",
    "description": "",
    "price": 1000,
    "prices": {
      "regular": 1000
    },
    "image": "images/8.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 9,
    "name": "Kashmiri Biryani",
    "category": "Biryani & Matka Special",
    "description": "",
    "price": 800,
    "prices": {
      "regular": 800
    },
    "image": "images/9.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 10,
    "name": "Kofta Biryani",
    "category": "Biryani & Matka Special",
    "description": "",
    "price": 1200,
    "prices": {
      "regular": 1200
    },
    "image": "images/10.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 11,
    "name": "Chicken Tikka",
    "category": "BBQ",
    "description": "",
    "price": 500,
    "prices": {
      "chest": 500,
      "leg": 450
    },
    "image": "images/11.jpg",
    "isAvailable": true,
    "isPopular": true
  },
  {
    "id": 12,
    "name": "Malai Tikka",
    "category": "BBQ",
    "description": "",
    "price": 560,
    "prices": {
      "chest": 560,
      "leg": 500
    },
    "image": "images/12.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 13,
    "name": "Achari Tikka",
    "category": "BBQ",
    "description": "",
    "price": 550,
    "prices": {
      "chest": 550,
      "leg": 500
    },
    "image": "images/13.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 14,
    "name": "Spicy Tikka Boti",
    "category": "BBQ",
    "description": "",
    "price": 500,
    "prices": {
      "regular": 500
    },
    "image": "images/14.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 15,
    "name": "Malai Boti",
    "category": "BBQ",
    "description": "",
    "price": 700,
    "prices": {
      "regular": 700
    },
    "image": "images/15.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 16,
    "name": "Gola Kabab",
    "category": "BBQ",
    "description": "",
    "price": 600,
    "prices": {
      "regular": 600
    },
    "image": "images/16.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 17,
    "name": "Seekh Kabab",
    "category": "BBQ",
    "description": "",
    "price": 550,
    "prices": {
      "regular": 550
    },
    "image": "images/17.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 18,
    "name": "Bihari Boti",
    "category": "BBQ",
    "description": "",
    "price": 650,
    "prices": {
      "regular": 650
    },
    "image": "images/18.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 19,
    "name": "Shashlik Stick",
    "category": "BBQ",
    "description": "",
    "price": 800,
    "prices": {
      "regular": 800
    },
    "image": "images/19.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 20,
    "name": "Makhni Daal Handi",
    "category": "Daal",
    "description": "",
    "price": 650,
    "prices": {
      "regular": 650
    },
    "image": "images/20.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 21,
    "name": "Qutr Broast",
    "category": "Broast",
    "description": "",
    "price": 500,
    "prices": {
      "regular": 500
    },
    "image": "images/21.jpg",
    "isAvailable": true,
    "isPopular": true
  },
  {
    "id": 22,
    "name": "Big Broast",
    "category": "Broast",
    "description": "",
    "price": 600,
    "prices": {
      "regular": 600
    },
    "image": "images/22.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 23,
    "name": "Garlic Broast",
    "category": "Broast",
    "description": "",
    "price": 650,
    "prices": {
      "regular": 650
    },
    "image": "images/23.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 24,
    "name": "Spicy Broast",
    "category": "Broast",
    "description": "",
    "price": 650,
    "prices": {
      "regular": 650
    },
    "image": "images/24.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 25,
    "name": "Zinger Burger",
    "category": "Burger",
    "description": "",
    "price": 500,
    "prices": {
      "regular": 500
    },
    "image": "images/25.jpg",
    "isAvailable": true,
    "isPopular": true
  },
  {
    "id": 26,
    "name": "Malai Boti Burger",
    "category": "Burger",
    "description": "",
    "price": 600,
    "prices": {
      "regular": 600
    },
    "image": "images/26.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 27,
    "name": "American Burger",
    "category": "Burger",
    "description": "",
    "price": 900,
    "prices": {
      "regular": 900
    },
    "image": "images/27.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 28,
    "name": "Diamond Burger",
    "category": "Burger",
    "description": "",
    "price": 900,
    "prices": {
      "regular": 900
    },
    "image": "images/28.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 29,
    "name": "BBQ Burger",
    "category": "Burger",
    "description": "",
    "price": 550,
    "prices": {
      "regular": 550
    },
    "image": "images/29.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 30,
    "name": "Patty Burger",
    "category": "Burger",
    "description": "",
    "price": 500,
    "prices": {
      "regular": 500
    },
    "image": "images/30.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 31,
    "name": "Chicken Mayo Roll",
    "category": "Rolls",
    "description": "",
    "price": 300,
    "prices": {
      "regular": 300
    },
    "image": "images/31.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 32,
    "name": "Chicken Twister Roll",
    "category": "Rolls",
    "description": "",
    "price": 300,
    "prices": {
      "regular": 300
    },
    "image": "images/32.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 33,
    "name": "Chicken Loaded Roll",
    "category": "Rolls",
    "description": "",
    "price": 600,
    "prices": {
      "regular": 600
    },
    "image": "images/33.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 34,
    "name": "Chicken Kabab Roll",
    "category": "Rolls",
    "description": "",
    "price": 300,
    "prices": {
      "regular": 300
    },
    "image": "images/34.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 35,
    "name": "Chutney Roll",
    "category": "Rolls",
    "description": "",
    "price": 320,
    "prices": {
      "regular": 320
    },
    "image": "images/35.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 36,
    "name": "BBQ Roll",
    "category": "Rolls",
    "description": "",
    "price": 350,
    "prices": {
      "regular": 350
    },
    "image": "images/36.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 37,
    "name": "Malai Boti Roll",
    "category": "Rolls",
    "description": "",
    "price": 330,
    "prices": {
      "regular": 330
    },
    "image": "images/37.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 38,
    "name": "Pizza Roll",
    "category": "Rolls",
    "description": "",
    "price": 500,
    "prices": {
      "regular": 500
    },
    "image": "images/38.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 39,
    "name": "Plain Fries",
    "category": "Fries",
    "description": "",
    "price": 250,
    "prices": {
      "regular": 250
    },
    "image": "images/39.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 40,
    "name": "Masala Fries",
    "category": "Fries",
    "description": "",
    "price": 260,
    "prices": {
      "regular": 260
    },
    "image": "images/40.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 41,
    "name": "Spicy Fries",
    "category": "Fries",
    "description": "",
    "price": 270,
    "prices": {
      "regular": 270
    },
    "image": "images/41.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 42,
    "name": "Loaded Fries",
    "category": "Fries",
    "description": "",
    "price": 550,
    "prices": {
      "regular": 550
    },
    "image": "images/42.jpg",
    "isAvailable": true,
    "isPopular": true
  },
  {
    "id": 43,
    "name": "Pizza Fries",
    "category": "Fries",
    "description": "",
    "price": 500,
    "prices": {
      "regular": 500
    },
    "image": "images/43.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 44,
    "name": "Garlic Fries",
    "category": "Fries",
    "description": "",
    "price": 300,
    "prices": {
      "regular": 300
    },
    "image": "images/44.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 45,
    "name": "Mayo Fries",
    "category": "Fries",
    "description": "",
    "price": 320,
    "prices": {
      "regular": 320
    },
    "image": "images/45.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 46,
    "name": "Cheese Sticks",
    "category": "Fries",
    "description": "Note: 5 pieces",
    "price": 600,
    "prices": {
      "regular": 600
    },
    "image": "images/46.jpg",
    "note": "5 pieces",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 47,
    "name": "Cheese Balls",
    "category": "Fries",
    "description": "Note: 5 pieces",
    "price": 800,
    "prices": {
      "regular": 800
    },
    "image": "images/47.jpg",
    "note": "5 pieces",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 48,
    "name": "Chatni",
    "category": "Extra",
    "description": "",
    "price": 100,
    "prices": {
      "regular": 100
    },
    "image": "images/48.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 49,
    "name": "Achar",
    "category": "Extra",
    "description": "",
    "price": 100,
    "prices": {
      "regular": 100
    },
    "image": "images/49.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 50,
    "name": "Mayo",
    "category": "Extra",
    "description": "",
    "price": 100,
    "prices": {
      "regular": 100
    },
    "image": "images/50.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 51,
    "name": "Sauce",
    "category": "Extra",
    "description": "",
    "price": 100,
    "prices": {
      "regular": 100
    },
    "image": "images/51.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 52,
    "name": "Coffee",
    "category": "Beverages & Tea",
    "description": "",
    "price": 300,
    "prices": {
      "regular": 300
    },
    "image": "images/52.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 53,
    "name": "Cold Coffee",
    "category": "Beverages & Tea",
    "description": "",
    "price": 350,
    "prices": {
      "regular": 350
    },
    "image": "images/53.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 54,
    "name": "Special Tea",
    "category": "Beverages & Tea",
    "description": "",
    "price": 130,
    "prices": {
      "regular": 130
    },
    "image": "images/54.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 55,
    "name": "Elaichi Tea",
    "category": "Beverages & Tea",
    "description": "",
    "price": 130,
    "prices": {
      "regular": 130
    },
    "image": "images/55.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 56,
    "name": "Ghur Tea",
    "category": "Beverages & Tea",
    "description": "",
    "price": 150,
    "prices": {
      "regular": 150
    },
    "image": "images/56.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 57,
    "name": "Green Tea",
    "category": "Beverages & Tea",
    "description": "",
    "price": 120,
    "prices": {
      "regular": 120
    },
    "image": "images/57.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 58,
    "name": "Apple Tea",
    "category": "Beverages & Tea",
    "description": "",
    "price": 120,
    "prices": {
      "regular": 120
    },
    "image": "images/58.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 59,
    "name": "Lemon Tea",
    "category": "Beverages & Tea",
    "description": "",
    "price": 120,
    "prices": {
      "regular": 120
    },
    "image": "images/59.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 60,
    "name": "Strawberry Tea",
    "category": "Beverages & Tea",
    "description": "",
    "price": 120,
    "prices": {
      "regular": 120
    },
    "image": "images/60.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 61,
    "name": "Salad",
    "category": "Beverages & Tea",
    "description": "",
    "price": 100,
    "prices": {
      "regular": 100
    },
    "image": "images/61.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 62,
    "name": "Raita",
    "category": "Beverages & Tea",
    "description": "",
    "price": 70,
    "prices": {
      "regular": 70
    },
    "image": "images/62.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 63,
    "name": "Water",
    "category": "Beverages & Tea",
    "description": "",
    "price": 60,
    "prices": {
      "small": 60,
      "large": 120,
      "1.5_ltr": 250
    },
    "image": "images/63.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 64,
    "name": "Cold Drink",
    "category": "Beverages & Tea",
    "description": "",
    "price": 140,
    "prices": {
      "tin": 140
    },
    "image": "images/64.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 65,
    "name": "Chicken Tikka Pizza",
    "category": "Pizza",
    "description": "",
    "price": 600,
    "prices": {
      "small": 600,
      "medium": 1100,
      "large": 1400
    },
    "image": "images/65.jpg",
    "isAvailable": true,
    "isPopular": true
  },
  {
    "id": 66,
    "name": "Chicken Fajita Pizza",
    "category": "Pizza",
    "description": "",
    "price": 600,
    "prices": {
      "small": 600,
      "medium": 1100,
      "large": 1400
    },
    "image": "images/66.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 67,
    "name": "Chicken Supreme Pizza",
    "category": "Pizza",
    "description": "",
    "price": 600,
    "prices": {
      "small": 600,
      "medium": 1100,
      "large": 1400
    },
    "image": "images/67.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 68,
    "name": "Malai Tikka Pizza",
    "category": "Pizza",
    "description": "",
    "price": 600,
    "prices": {
      "small": 600,
      "medium": 1100,
      "large": 1400
    },
    "image": "images/68.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 69,
    "name": "Cheese Lover Pizza",
    "category": "Pizza",
    "description": "",
    "price": 600,
    "prices": {
      "small": 600,
      "medium": 1100,
      "large": 1400
    },
    "image": "images/69.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 70,
    "name": "Mayo Creamy Pizza",
    "category": "Pizza",
    "description": "",
    "price": 600,
    "prices": {
      "small": 600,
      "medium": 1100,
      "large": 1400
    },
    "image": "images/70.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 71,
    "name": "Chicken Seekh Kabab Pizza",
    "category": "Special Flavours Pizza",
    "description": "",
    "price": 1600,
    "prices": {
      "large": 1600
    },
    "image": "images/71.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 72,
    "name": "Chicken Crown Pizza",
    "category": "Special Flavours Pizza",
    "description": "",
    "price": 1700,
    "prices": {
      "large": 1700
    },
    "image": "images/72.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 73,
    "name": "Chicken Bihari Pizza",
    "category": "Special Flavours Pizza",
    "description": "",
    "price": 1700,
    "prices": {
      "large": 1700
    },
    "image": "images/73.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 74,
    "name": "Chicken Lava Pizza",
    "category": "Special Flavours Pizza",
    "description": "",
    "price": 1800,
    "prices": {
      "large": 1800
    },
    "image": "images/74.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 75,
    "name": "Club Sandwich",
    "category": "Sandwich",
    "description": "",
    "price": 600,
    "prices": {
      "regular": 600
    },
    "image": "images/75.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 76,
    "name": "Malai Boti Sandwich",
    "category": "Sandwich",
    "description": "",
    "price": 650,
    "prices": {
      "regular": 650
    },
    "image": "images/76.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 77,
    "name": "BBQ Sandwich",
    "category": "Sandwich",
    "description": "",
    "price": 650,
    "prices": {
      "regular": 650
    },
    "image": "images/77.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 78,
    "name": "Mexican Sandwich",
    "category": "Sandwich",
    "description": "",
    "price": 800,
    "prices": {
      "regular": 800
    },
    "image": "images/78.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 79,
    "name": "Fajita Sandwich",
    "category": "Sandwich",
    "description": "",
    "price": 700,
    "prices": {
      "regular": 700
    },
    "image": "images/79.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 80,
    "name": "Chicken Sandwich",
    "category": "Sandwich",
    "description": "",
    "price": 500,
    "prices": {
      "regular": 500
    },
    "image": "images/80.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 81,
    "name": "Chicken Brown (Dry) Karahi",
    "category": "Chicken Karahi",
    "description": "",
    "price": 2500,
    "prices": {
      "full": 2500,
      "half": 1300
    },
    "image": "images/81.jpg",
    "isAvailable": true,
    "isPopular": true
  },
  {
    "id": 82,
    "name": "Chicken White Karahi",
    "category": "Chicken Karahi",
    "description": "",
    "price": 2500,
    "prices": {
      "full": 2500,
      "half": 1300
    },
    "image": "images/82.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 83,
    "name": "Chicken White Shahi Karahi",
    "category": "Chicken Karahi",
    "description": "",
    "price": 2800,
    "prices": {
      "full": 2800,
      "half": 1400
    },
    "image": "images/83.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 84,
    "name": "Chicken Achari Karahi",
    "category": "Chicken Karahi",
    "description": "",
    "price": 2300,
    "prices": {
      "full": 2300,
      "half": 1200
    },
    "image": "images/84.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 85,
    "name": "Chicken Regular Karahi",
    "category": "Chicken Karahi",
    "description": "",
    "price": 2200,
    "prices": {
      "full": 2200,
      "half": 1100,
      "quarter": 600
    },
    "image": "images/85.jpg",
    "isAvailable": true,
    "isPopular": true
  },
  {
    "id": 86,
    "name": "Chicken Coal Karahi",
    "category": "Chicken Karahi",
    "description": "",
    "price": 2300,
    "prices": {
      "full": 2300,
      "half": 1200
    },
    "image": "images/86.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 87,
    "name": "Chicken Spring Karahi",
    "category": "Chicken Karahi",
    "description": "",
    "price": 2800,
    "prices": {
      "full": 2800,
      "half": 1400
    },
    "image": "images/87.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 88,
    "name": "Mutton Brown (Dry) Karahi",
    "category": "Mutton Karahi",
    "description": "",
    "price": 4000,
    "prices": {
      "full": 4000,
      "half": 2000
    },
    "image": "images/88.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 89,
    "name": "Mutton White Karahi",
    "category": "Mutton Karahi",
    "description": "",
    "price": 4000,
    "prices": {
      "full": 4000,
      "half": 2050
    },
    "image": "images/89.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 90,
    "name": "Mutton White Shahi Karahi",
    "category": "Mutton Karahi",
    "description": "",
    "price": 4500,
    "prices": {
      "full": 4500,
      "half": 2300
    },
    "image": "images/90.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 91,
    "name": "Mutton Achari Karahi",
    "category": "Mutton Karahi",
    "description": "",
    "price": 4000,
    "prices": {
      "full": 4000,
      "half": 2000
    },
    "image": "images/91.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 92,
    "name": "Mutton Regular Karahi",
    "category": "Mutton Karahi",
    "description": "",
    "price": 3800,
    "prices": {
      "full": 3800,
      "half": 1800,
      "quarter": 1000
    },
    "image": "images/92.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 93,
    "name": "Mutton Coal Karahi",
    "category": "Mutton Karahi",
    "description": "",
    "price": 4200,
    "prices": {
      "full": 4200,
      "half": 2100
    },
    "image": "images/93.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 94,
    "name": "Mutton Sulemani Karahi",
    "category": "Mutton Karahi",
    "description": "",
    "price": 4400,
    "prices": {
      "full": 4400,
      "half": 2200
    },
    "image": "images/94.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 95,
    "name": "Chicken Boneless Handi (Red)",
    "category": "Handi",
    "description": "",
    "price": 3300,
    "prices": {
      "full": 3300,
      "half": 1700,
      "quarter": 900
    },
    "image": "images/95.jpg",
    "isAvailable": true,
    "isPopular": true
  },
  {
    "id": 96,
    "name": "Chicken Boneless Handi (White)",
    "category": "Handi",
    "description": "",
    "price": 3500,
    "prices": {
      "full": 3500,
      "half": 1750,
      "quarter": 900
    },
    "image": "images/96.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 97,
    "name": "Chicken Afghani Boneless Handi",
    "category": "Handi",
    "description": "",
    "price": 3600,
    "prices": {
      "full": 3600,
      "half": 1800,
      "quarter": 900
    },
    "image": "images/97.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 98,
    "name": "Chicken Boneless White Shahi Handi",
    "category": "Handi",
    "description": "",
    "price": 4000,
    "prices": {
      "full": 4000,
      "half": 2000
    },
    "image": "images/98.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 99,
    "name": "Chicken Makhani Handi (Red)",
    "category": "Handi",
    "description": "",
    "price": 3700,
    "prices": {
      "full": 3700,
      "half": 1850,
      "quarter": 1000
    },
    "image": "images/99.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 100,
    "name": "Chicken Makhani Handi (White)",
    "category": "Handi",
    "description": "",
    "price": 3900,
    "prices": {
      "full": 3900,
      "half": 1950,
      "quarter": 1000
    },
    "image": "images/100.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 101,
    "name": "Kofta Handi",
    "category": "Handi",
    "description": "",
    "price": 2600,
    "prices": {
      "full": 2600,
      "half": 1300,
      "quarter": 700
    },
    "image": "images/101.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 102,
    "name": "Naan",
    "category": "Naan",
    "description": "",
    "price": 40,
    "prices": {
      "regular": 40
    },
    "image": "images/102.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 103,
    "name": "Garlic Naan",
    "category": "Naan",
    "description": "",
    "price": 70,
    "prices": {
      "regular": 70
    },
    "image": "images/103.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 104,
    "name": "Chapati",
    "category": "Naan",
    "description": "",
    "price": 30,
    "prices": {
      "regular": 30
    },
    "image": "images/104.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 105,
    "name": "Rogni Naan",
    "category": "Naan",
    "description": "",
    "price": 70,
    "prices": {
      "regular": 70
    },
    "image": "images/105.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 106,
    "name": "Kalaunji Naan",
    "category": "Naan",
    "description": "",
    "price": 90,
    "prices": {
      "regular": 90
    },
    "image": "images/106.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 107,
    "name": "Kulfa Ice Cream",
    "category": "Ice Cream",
    "description": "",
    "price": 150,
    "prices": {
      "half": 150,
      "full": 250
    },
    "image": "images/107.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 108,
    "name": "Totti Frutti Ice Cream",
    "category": "Ice Cream",
    "description": "",
    "price": 150,
    "prices": {
      "half": 150,
      "full": 250
    },
    "image": "images/108.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 109,
    "name": "Chocolate Ice Cream",
    "category": "Ice Cream",
    "description": "",
    "price": 150,
    "prices": {
      "half": 150,
      "full": 250
    },
    "image": "images/109.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 110,
    "name": "Pista Ice Cream",
    "category": "Ice Cream",
    "description": "",
    "price": 150,
    "prices": {
      "half": 150,
      "full": 250
    },
    "image": "images/110.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 111,
    "name": "Mango Ice Cream",
    "category": "Ice Cream",
    "description": "",
    "price": 150,
    "prices": {
      "half": 150,
      "full": 250
    },
    "image": "images/111.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 112,
    "name": "Strawberry Ice Cream",
    "category": "Ice Cream",
    "description": "",
    "price": 150,
    "prices": {
      "half": 150,
      "full": 250
    },
    "image": "images/112.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 113,
    "name": "Falouda",
    "category": "Ice Cream",
    "description": "",
    "price": 520,
    "prices": {
      "regular": 520
    },
    "image": "images/113.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 114,
    "name": "Chicken Fried Rice",
    "category": "Rice & Wok Delights",
    "description": "",
    "price": 700,
    "prices": {
      "regular": 700
    },
    "image": "images/114.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 115,
    "name": "Vegetable Rice",
    "category": "Rice & Wok Delights",
    "description": "",
    "price": 600,
    "prices": {
      "regular": 600
    },
    "image": "images/115.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 116,
    "name": "Singaporean Rice",
    "category": "Rice & Wok Delights",
    "description": "",
    "price": 1200,
    "prices": {
      "regular": 1200
    },
    "image": "images/116.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 117,
    "name": "Fajita Rice (New)",
    "category": "Rice & Wok Delights",
    "description": "",
    "price": 1000,
    "prices": {
      "regular": 1000
    },
    "image": "images/117.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 118,
    "name": "White Rice",
    "category": "Rice & Wok Delights",
    "description": "",
    "price": 300,
    "prices": {
      "regular": 300
    },
    "image": "images/118.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 119,
    "name": "Chicken Manchurian with Rice",
    "category": "Rice & Wok Delights",
    "description": "",
    "price": 900,
    "prices": {
      "regular": 900
    },
    "image": "images/119.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 120,
    "name": "Chicken Chilli with Rice",
    "category": "Rice & Wok Delights",
    "description": "",
    "price": 900,
    "prices": {
      "regular": 900
    },
    "image": "images/120.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 121,
    "name": "Chicken Shashlik with Rice",
    "category": "Rice & Wok Delights",
    "description": "",
    "price": 1000,
    "prices": {
      "regular": 1000
    },
    "image": "images/121.jpg",
    "isAvailable": true,
    "isPopular": false
  },
  {
    "id": 122,
    "name": "Chicken Galferzi with Rice",
    "category": "Rice & Wok Delights",
    "description": "",
    "price": 1000,
    "prices": {
      "regular": 1000
    },
    "image": "images/122.jpg",
    "isAvailable": true,
    "isPopular": false
  }
];

export const initialReviews: Review[] = [
  {
    id: "rev-1",
    customerName: "Tariq Memon",
    rating: 5,
    comment: "Best Chicken White Shahi Karahi in Badin! The ambiance is great and food was served sizzling hot.",
    date: "2026-03-20",
    status: "approved",
    isDemo: true
  },
  {
    id: "rev-2",
    customerName: "Sarfraz Ahmed",
    rating: 5,
    comment: "Super fast delivery in Tokhar area. BBQ Seekh Kabab and Naan were fresh and tender.",
    date: "2026-03-24",
    status: "approved",
    isDemo: true
  }
];

export const initialOrders: Order[] = [];
