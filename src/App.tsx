import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { MenuItem, Category, RestaurantSettings, Review, Order, defaultSettings } from './types';
import { Check, Flame } from 'lucide-react';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [settings, setSettings] = useState<RestaurantSettings>(defaultSettings);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useAuth();
  const { lastAddedItem } = useCart();

  const fetchAppData = async () => {
    try {
      // Load menu directly from menu.json as requested
      const menuPromise = fetch('/menu.json')
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null);

      const [menuData, settingsRes, revRes] = await Promise.all([
        menuPromise,
        fetch('/api/settings').catch(() => null),
        fetch('/api/reviews').catch(() => null),
      ]);

      if (menuData && menuData.items) {
        const transformed: MenuItem[] = menuData.items.map((raw: any) => {
          const prices: Record<string, number> = raw.prices || {};
          const priceVals = Object.values(prices);
          const firstPrice = priceVals.length > 0 ? Number(priceVals[0]) : 0;
          return {
            id: raw.id,
            name: raw.name,
            category: raw.category,
            description: raw.note ? `Note: ${raw.note}` : '',
            price: firstPrice,
            prices,
            image: `images/${raw.id}.jpg`,
            note: raw.note,
            isAvailable: true,
            isPopular: [11, 65, 81, 85, 95, 7, 21, 25, 42].includes(raw.id),
          };
        });

        setMenuItems(transformed);

        // Derive categories in exact order of appearance from menu.json
        const catMap = new Map<string, number>();
        menuData.items.forEach((item: any) => {
          if (!catMap.has(item.category)) {
            catMap.set(item.category, catMap.size + 1);
          }
        });

        const derivedCategories: Category[] = Array.from(catMap.entries()).map(([name, order]) => ({
          id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name,
          order,
        }));
        setCategories(derivedCategories);

        if (menuData.restaurant) {
          setSettings((prev) => ({
            ...prev,
            name: menuData.restaurant.name || prev.name,
            phone: menuData.restaurant.phone || prev.phone,
          }));
        }
      }

      if (settingsRes && settingsRes.ok) {
        const s = await settingsRes.json();
        setSettings((prev) => ({ ...prev, ...s }));
      }
      if (revRes && revRes.ok) setReviews(await revRes.json());
    } catch (err) {
      console.error('Failed to load menu.json and app data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  const featuredItems = menuItems.filter((i) => i.isPopular || i.badge);

  const handleReviewSubmitted = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0a08] flex flex-col items-center justify-center p-4">
        <div className="w-14 h-14 rounded-2xl bg-[#c9922c] text-[#0f0c0a] flex items-center justify-center animate-bounce shadow-2xl">
          <Flame className="w-8 h-8 fill-current" />
        </div>
        <div className="font-serif text-2xl font-bold text-[#faf6ee] mt-4">
          Fork & Flame
        </div>
        <p className="text-xs text-[#d4af37] tracking-wider uppercase mt-1">
          Loading Menu & Flavours...
        </p>
      </div>
    );
  }

  // Handle Admin view
  if (activeTab === 'admin') {
    if (!isAuthenticated) {
      return (
        <AdminLoginPage
          onSuccess={() => setActiveTab('admin')}
          onBackToSite={() => setActiveTab('home')}
        />
      );
    }
    return (
      <AdminDashboard
        onBackToSite={() => setActiveTab('home')}
        onSettingsUpdated={(newSet) => setSettings(newSet)}
        onMenuUpdated={fetchAppData}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0a08] text-[#ede5d8]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} settings={settings} />

      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            settings={settings}
            featuredItems={featuredItems.length > 0 ? featuredItems : menuItems.slice(0, 6)}
            reviews={reviews}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'menu' && (
          <MenuPage
            categories={categories}
            menuItems={menuItems}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage settings={settings} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'gallery' && <GalleryPage />}

        {activeTab === 'reviews' && (
          <ReviewsPage
            reviews={reviews}
            onReviewSubmitted={handleReviewSubmitted}
          />
        )}

        {activeTab === 'contact' && <ContactPage settings={settings} />}

        {activeTab === 'checkout' && (
          <CheckoutPage
            settings={settings}
            setActiveTab={setActiveTab}
            onOrderPlaced={(order) => setLastPlacedOrder(order)}
          />
        )}

        {activeTab === 'order-confirmation' && (
          <OrderConfirmationPage
            order={lastPlacedOrder}
            settings={settings}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      <Footer settings={settings} setActiveTab={setActiveTab} />

      <CartDrawer settings={settings} setActiveTab={setActiveTab} />

      {/* Item Added Toast Feedback */}
      {lastAddedItem && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1511] border border-[#d4a343] text-[#faf6ee] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <div className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>Added "{lastAddedItem}" to cart</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainAppContent />
      </CartProvider>
    </AuthProvider>
  );
}
