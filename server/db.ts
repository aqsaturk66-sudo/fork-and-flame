import fs from 'fs';
import path from 'path';
import type {
  MenuItem,
  Category,
  RestaurantSettings,
  Order,
  Review,
  ContactMessage,
} from './initialData.ts';
import {
  initialSettings,
  initialCategories,
  initialMenuItems,
  initialReviews,
  initialOrders,
} from './initialData.ts';

interface DatabaseSchema {
  settings: RestaurantSettings;
  categories: Category[];
  menuItems: MenuItem[];
  orders: Order[];
  reviews: Review[];
  contactMessages: ContactMessage[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DATA_DIR, 'database.json');

function getMenuJsonData() {
  try {
    const candidates = [
      path.resolve(process.cwd(), 'public', 'menu.json'),
      path.resolve(process.cwd(), 'menu.json'),
    ];
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        const parsed = JSON.parse(fs.readFileSync(p, 'utf-8'));
        const catMap = new Map<string, number>();
        const menuItems = (parsed.items || []).map((raw: any) => {
          if (!catMap.has(raw.category)) {
            catMap.set(raw.category, catMap.size + 1);
          }
          const prices: Record<string, number> = raw.prices || {};
          const firstPrice = Object.values(prices)[0] || 0;
          return {
            id: raw.id,
            name: raw.name,
            category: raw.category,
            description: raw.note ? `Note: ${raw.note}` : '',
            price: Number(firstPrice),
            prices,
            image: `images/${raw.id}.jpg`,
            note: raw.note,
            isAvailable: true,
            isPopular: [11, 65, 81, 85, 95, 7, 21, 25, 42].includes(raw.id),
          };
        });

        const categories = Array.from(catMap.entries()).map(([name, order]) => ({
          id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name,
          order,
        }));

        return { menuItems, categories };
      }
    }
  } catch (err) {
    console.error('Failed to parse menu.json in server/db.ts:', err);
  }
  return { menuItems: [], categories: [] };
}

class DatabaseStore {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadDatabase();
  }

  private loadDatabase(): DatabaseSchema {
    const fromJson = getMenuJsonData();

    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        return {
          settings: parsed.settings || initialSettings,
          categories: fromJson.categories.length > 0 ? fromJson.categories : (parsed.categories || initialCategories),
          menuItems: fromJson.menuItems.length > 0 ? fromJson.menuItems : (parsed.menuItems || initialMenuItems),
          orders: parsed.orders || initialOrders,
          reviews: parsed.reviews || initialReviews,
          contactMessages: parsed.contactMessages || [],
        };
      }
    } catch (err) {
      console.error('Error loading database.json, initializing fresh store:', err);
    }

    const defaultData: DatabaseSchema = {
      settings: initialSettings,
      categories: fromJson.categories.length > 0 ? fromJson.categories : initialCategories,
      menuItems: fromJson.menuItems.length > 0 ? fromJson.menuItems : initialMenuItems,
      orders: initialOrders,
      reviews: initialReviews,
      contactMessages: [],
    };
    this.persist(defaultData);
    return defaultData;
  }

  private persist(dataToSave?: DatabaseSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const data = dataToSave || this.data;
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database:', err);
    }
  }

  // --- Settings ---
  public getSettings(): RestaurantSettings {
    return this.data.settings;
  }

  public updateSettings(partial: Partial<RestaurantSettings>): RestaurantSettings {
    this.data.settings = { ...this.data.settings, ...partial };
    this.persist();
    return this.data.settings;
  }

  // --- Categories ---
  public getCategories(): Category[] {
    return this.data.categories.sort((a, b) => a.order - b.order);
  }

  public addCategory(name: string): Category {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCategory: Category = {
      id,
      name,
      order: this.data.categories.length + 1,
    };
    this.data.categories.push(newCategory);
    this.persist();
    return newCategory;
  }

  // --- Menu Items ---
  public getMenuItems(): MenuItem[] {
    return this.data.menuItems;
  }

  public getMenuItemById(id: string): MenuItem | undefined {
    return this.data.menuItems.find((item) => item.id === id);
  }

  public addMenuItem(item: Omit<MenuItem, 'id'>): MenuItem {
    const id = 'item-' + Date.now();
    const newItem: MenuItem = {
      id,
      ...item,
    };
    this.data.menuItems.unshift(newItem);
    this.persist();
    return newItem;
  }

  public updateMenuItem(id: string, updates: Partial<MenuItem>): MenuItem | null {
    const index = this.data.menuItems.findIndex((item) => item.id === id);
    if (index === -1) return null;
    this.data.menuItems[index] = { ...this.data.menuItems[index], ...updates };
    this.persist();
    return this.data.menuItems[index];
  }

  public deleteMenuItem(id: string): boolean {
    const index = this.data.menuItems.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.data.menuItems.splice(index, 1);
    this.persist();
    return true;
  }

  // --- Orders ---
  public getOrders(): Order[] {
    return [...this.data.orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getOrderById(id: string): Order | undefined {
    return this.data.orders.find((o) => o.id === id);
  }

  public createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
    const id = 'FF-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id,
      ...orderData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    this.data.orders.unshift(newOrder);
    this.persist();
    return newOrder;
  }

  public updateOrderStatus(id: string, status: Order['status']): Order | null {
    const order = this.data.orders.find((o) => o.id === id);
    if (!order) return null;
    order.status = status;
    this.persist();
    return order;
  }

  // --- Reviews ---
  public getReviews(onlyApproved = true): Review[] {
    if (onlyApproved) {
      return this.data.reviews.filter((r) => r.status === 'approved');
    }
    return this.data.reviews;
  }

  public createReview(review: Omit<Review, 'id' | 'date' | 'status'>): Review {
    const newReview: Review = {
      id: 'rev-' + Date.now(),
      ...review,
      date: new Date().toISOString().split('T')[0],
      status: 'approved', // Auto-approved for customer experience; admin can moderate/hide anytime
      isDemo: false,
    };
    this.data.reviews.unshift(newReview);
    this.persist();
    return newReview;
  }

  public updateReviewStatus(id: string, status: 'approved' | 'hidden'): Review | null {
    const review = this.data.reviews.find((r) => r.id === id);
    if (!review) return null;
    review.status = status;
    this.persist();
    return review;
  }

  public deleteReview(id: string): boolean {
    const index = this.data.reviews.findIndex((r) => r.id === id);
    if (index === -1) return false;
    this.data.reviews.splice(index, 1);
    this.persist();
    return true;
  }

  // --- Contact Messages ---
  public getContactMessages(): ContactMessage[] {
    return [...this.data.contactMessages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public createContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const newMessage: ContactMessage = {
      id: 'msg-' + Date.now(),
      ...msg,
      createdAt: new Date().toISOString(),
      status: 'unread',
    };
    this.data.contactMessages.unshift(newMessage);
    this.persist();
    return newMessage;
  }

  public markContactMessageRead(id: string): boolean {
    const msg = this.data.contactMessages.find((m) => m.id === id);
    if (!msg) return false;
    msg.status = 'read';
    this.persist();
    return true;
  }

  // --- Stats ---
  public getStats() {
    const totalOrders = this.data.orders.length;
    const pendingOrders = this.data.orders.filter(
      (o) => o.status === 'Pending' || o.status === 'Confirmed' || o.status === 'Preparing'
    ).length;
    const completedOrders = this.data.orders.filter((o) => o.status === 'Completed').length;
    const totalRevenue = this.data.orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);
    const approvedReviews = this.data.reviews.filter((r) => r.status === 'approved');
    const avgRating =
      approvedReviews.length > 0
        ? Number(
            (
              approvedReviews.reduce((sum, r) => sum + r.rating, 0) /
              approvedReviews.length
            ).toFixed(1)
          )
        : 5.0;

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      totalReviews: this.data.reviews.length,
      approvedReviewsCount: approvedReviews.length,
      averageRating: avgRating,
      totalMenuItems: this.data.menuItems.length,
      unreadMessages: this.data.contactMessages.filter((m) => m.status === 'unread').length,
    };
  }
}

export const db = new DatabaseStore();
