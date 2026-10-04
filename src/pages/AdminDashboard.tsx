import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Star,
  Settings,
  Mail,
  LogOut,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  EyeOff,
  Eye,
  RefreshCw,
  Search,
  Save,
  Phone,
  Flame,
  Clock,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  MenuItem,
  Category,
  Order,
  Review,
  ContactMessage,
  RestaurantSettings,
} from '../types';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onSettingsUpdated: (newSettings: RestaurantSettings) => void;
  onMenuUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToSite,
  onSettingsUpdated,
  onMenuUpdated,
}) => {
  const { logout, getAuthHeaders, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'menu' | 'reviews' | 'settings' | 'messages'>('overview');

  // Server state
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settingsForm, setSettingsForm] = useState<RestaurantSettings | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // Filters & modals
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [menuSearch, setMenuSearch] = useState<string>('');
  const [menuCategoryFilter, setMenuCategoryFilter] = useState<string>('all');

  // Edit / Add Item modal
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [itemFormData, setItemFormData] = useState({
    name: '',
    category: '',
    price: 0,
    description: '',
    image: '',
    isAvailable: true,
    isPopular: false,
    badge: '',
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const headers = getAuthHeaders();

      const [statsRes, ordersRes, menuRes, catRes, reviewsRes, msgRes, settingsRes] =
        await Promise.all([
          fetch('/api/stats', { headers }),
          fetch('/api/orders', { headers }),
          fetch('/api/menu'),
          fetch('/api/categories'),
          fetch('/api/reviews?all=true', { headers }),
          fetch('/api/contact', { headers }),
          fetch('/api/settings'),
        ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (ordersRes.ok) setOrders(await ordersRes.json());
      if (menuRes.ok) setMenuItems(await menuRes.json());
      if (catRes.ok) setCategories(await catRes.json());
      if (reviewsRes.ok) setReviews(await reviewsRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());
      if (settingsRes.ok) {
        const s = await settingsRes.json();
        setSettingsForm(s);
      }
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // --- Order status update ---
  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated: Order = await res.json();
        setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
        showNotification(`Order #${orderId} status changed to ${status}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Menu item operations ---
  const handleOpenAddItem = () => {
    setEditingItem(null);
    setItemFormData({
      name: '',
      category: categories.length > 0 ? categories[0].name : 'Chicken Karahi',
      price: 500,
      description: '',
      image: '',
      isAvailable: true,
      isPopular: false,
      badge: '',
    });
    setIsItemModalOpen(true);
  };

  const handleOpenEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setItemFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description || '',
      image: item.image,
      isAvailable: item.isAvailable !== false,
      isPopular: !!item.isPopular,
      badge: item.badge || '',
    });
    setIsItemModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      };

      if (editingItem) {
        const res = await fetch(`/api/menu/${editingItem.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(itemFormData),
        });
        if (res.ok) {
          const updated = await res.json();
          setMenuItems((prev) => prev.map((i) => (i.id === editingItem.id ? updated : i)));
          showNotification(`Updated "${updated.name}"`);
          onMenuUpdated();
        }
      } else {
        const res = await fetch('/api/menu', {
          method: 'POST',
          headers,
          body: JSON.stringify(itemFormData),
        });
        if (res.ok) {
          const created = await res.json();
          setMenuItems((prev) => [created, ...prev]);
          showNotification(`Added new dish "${created.name}"`);
          onMenuUpdated();
        }
      }
      setIsItemModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleItemAvailability = async (item: MenuItem) => {
    try {
      const res = await fetch(`/api/menu/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ isAvailable: !item.isAvailable }),
      });
      if (res.ok) {
        const updated = await res.json();
        setMenuItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
        showNotification(
          `Marked "${item.name}" as ${!item.isAvailable ? 'Available' : 'Unavailable'}`
        );
        onMenuUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteItem = async (itemId: string | number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the menu?`)) return;
    try {
      const res = await fetch(`/api/menu/${itemId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setMenuItems((prev) => prev.filter((i) => i.id !== itemId));
        showNotification(`Deleted "${name}"`);
        onMenuUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Review Moderation ---
  const handleUpdateReviewStatus = async (reviewId: string, status: 'approved' | 'hidden') => {
    try {
      const res = await fetch(`/api/reviews/${reviewId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setReviews((prev) => prev.map((r) => (r.id === reviewId ? updated : r)));
        showNotification(`Review status updated to ${status}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
        showNotification('Review deleted');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Settings update ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingsForm) return;

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(settingsForm),
      });

      if (res.ok) {
        const updated = await res.json();
        setSettingsForm(updated);
        onSettingsUpdated(updated);
        showNotification('Restaurant settings saved successfully!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0a08] text-[#ede5d8] pb-24">
      {/* Top Admin Header */}
      <div className="bg-[#14100d] border-b border-[#241c16] sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#c9922c] text-[#0f0c0a] flex items-center justify-center font-bold">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-[#faf6ee]">
                  Fork & Flame Admin
                </span>
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-950/60 text-[#e5b85c] border border-amber-800/40">
                  Manager Portal
                </span>
              </div>
              <p className="text-[11px] text-[#8c7d6b]">
                Logged in as <strong>{user?.username || 'admin'}</strong> · Badin, Sindh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              className="p-2 rounded-lg bg-[#1a1410] border border-[#2b2118] text-[#a89680] hover:text-white transition-colors"
              title="Refresh all data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onBackToSite}
              className="px-3 py-1.5 text-xs text-[#a89680] hover:text-white transition-colors border border-[#2b2118] rounded-lg"
            >
              View Public Website
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-400 bg-red-950/30 hover:bg-red-950/60 border border-red-900/50 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed top-16 right-4 z-50 bg-[#211811] border border-[#d4a343] text-[#faf6ee] px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-[#120e0b] border-b border-[#211a14] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              activeTab === 'overview'
                ? 'bg-[#d4a343] text-[#0f0c0a] font-bold shadow-sm'
                : 'text-[#a89680] hover:text-white hover:bg-[#1c1511]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 relative ${
              activeTab === 'orders'
                ? 'bg-[#d4a343] text-[#0f0c0a] font-bold shadow-sm'
                : 'text-[#a89680] hover:text-white hover:bg-[#1c1511]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Live Orders</span>
            {orders.filter((o) => o.status === 'Pending').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              activeTab === 'menu'
                ? 'bg-[#d4a343] text-[#0f0c0a] font-bold shadow-sm'
                : 'text-[#a89680] hover:text-white hover:bg-[#1c1511]'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Menu Management ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              activeTab === 'reviews'
                ? 'bg-[#d4a343] text-[#0f0c0a] font-bold shadow-sm'
                : 'text-[#a89680] hover:text-white hover:bg-[#1c1511]'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Reviews Moderation</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              activeTab === 'settings'
                ? 'bg-[#d4a343] text-[#0f0c0a] font-bold shadow-sm'
                : 'text-[#a89680] hover:text-white hover:bg-[#1c1511]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Restaurant Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              activeTab === 'messages'
                ? 'bg-[#d4a343] text-[#0f0c0a] font-bold shadow-sm'
                : 'text-[#a89680] hover:text-white hover:bg-[#1c1511]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Customer Messages</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ================================================= */}
        {/* TAB 1: OVERVIEW METRICS */}
        {/* ================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-[#14100d] border border-[#2b2118] space-y-2">
                <div className="flex items-center justify-between text-[#8c7d6b] text-xs">
                  <span>Total Revenue</span>
                  <TrendingUp className="w-4 h-4 text-[#d4a343]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#faf6ee]">
                  Rs. {(stats?.totalRevenue || 0).toLocaleString()}
                </div>
                <p className="text-[11px] text-[#786b5b]">From all completed/active orders</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#14100d] border border-[#2b2118] space-y-2">
                <div className="flex items-center justify-between text-[#8c7d6b] text-xs">
                  <span>Pending Orders</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="font-serif text-3xl font-bold text-amber-400">
                  {stats?.pendingOrders || 0}
                </div>
                <p className="text-[11px] text-[#786b5b]">Needs kitchen confirmation</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#14100d] border border-[#2b2118] space-y-2">
                <div className="flex items-center justify-between text-[#8c7d6b] text-xs">
                  <span>Total Orders Placed</span>
                  <ShoppingBag className="w-4 h-4 text-[#d4a343]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#faf6ee]">
                  {stats?.totalOrders || 0}
                </div>
                <p className="text-[11px] text-[#786b5b]">Across delivery and pickup</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#14100d] border border-[#2b2118] space-y-2">
                <div className="flex items-center justify-between text-[#8c7d6b] text-xs">
                  <span>Average Rating</span>
                  <Star className="w-4 h-4 text-[#d4a343] fill-[#d4a343]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#faf6ee]">
                  {stats?.averageRating || 5.0} / 5
                </div>
                <p className="text-[11px] text-[#786b5b]">
                  {stats?.approvedReviewsCount || 0} approved customer reviews
                </p>
              </div>
            </div>

            {/* Quick Actions & Recent Orders preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Recent Orders table */}
              <div className="lg:col-span-8 bg-[#14100d] border border-[#2b2118] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#faf6ee]">
                    Recent Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#d4a343] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#241c16] text-[#8c7d6b]">
                        <th className="pb-3 font-semibold">Order ID</th>
                        <th className="pb-3 font-semibold">Customer</th>
                        <th className="pb-3 font-semibold">Items</th>
                        <th className="pb-3 font-semibold">Total</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f1712]">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#1a1410]">
                          <td className="py-3 font-mono font-bold text-[#d4a343]">
                            {ord.id}
                          </td>
                          <td className="py-3">
                            <div className="font-medium text-[#f5ecd8]">{ord.customerName}</div>
                            <div className="text-[11px] text-[#7d6e5d]">{ord.customerPhone}</div>
                          </td>
                          <td className="py-3 text-[#b5a693]">
                            {ord.items.length} items ({ord.items[0]?.name}
                            {ord.items.length > 1 ? ` +${ord.items.length - 1}` : ''})
                          </td>
                          <td className="py-3 font-semibold text-[#faf6ee]">
                            Rs. {ord.total.toLocaleString()}
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                ord.status === 'Completed'
                                  ? 'bg-emerald-950/60 text-emerald-300'
                                  : ord.status === 'Preparing'
                                  ? 'bg-amber-950/60 text-amber-300'
                                  : ord.status === 'Cancelled'
                                  ? 'bg-red-950/60 text-red-300'
                                  : 'bg-blue-950/60 text-blue-300'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Info & Settings summary */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#14100d] border border-[#2b2118] rounded-2xl p-6 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#faf6ee]">
                    Quick Restaurant Actions
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={handleOpenAddItem}
                      className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Menu Dish</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="w-full py-2.5 px-4 text-xs font-semibold bg-[#1a1410] border border-[#2e2319] text-[#f5ecd8] hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Edit Phone / Timings</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#14100d] border border-[#2b2118] rounded-2xl p-6 space-y-3">
                  <h3 className="font-serif text-base font-bold text-[#faf6ee]">
                    Delivery Information
                  </h3>
                  <div className="text-xs text-[#a89987] space-y-1.5">
                    <div><strong>Base Fee:</strong> Rs. {settingsForm?.deliveryFee ?? 100}</div>
                    <div><strong>Free Above:</strong> Rs. {settingsForm?.freeDeliveryThreshold ?? 2000}</div>
                    <div><strong>Coverage:</strong> Badin, Tokhar & adjacent areas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* TAB 2: ORDERS MANAGEMENT */}
        {/* ================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#faf6ee]">
                  Order Management
                </h2>
                <p className="text-xs text-[#8c7d6b]">
                  Update kitchen status, view customer phone, delivery addresses and receipts.
                </p>
              </div>

              {/* Status filter tabs */}
              <div className="flex flex-wrap gap-1.5 bg-[#14100d] p-1 rounded-xl border border-[#261d16]">
                {['all', 'Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                        orderStatusFilter === st
                          ? 'bg-[#d4a343] text-[#0f0c0a] font-bold'
                          : 'text-[#8c7d6b] hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {orders
                .filter((o) =>
                  orderStatusFilter === 'all' ? true : o.status === orderStatusFilter
                )
                .map((order) => (
                  <div
                    key={order.id}
                    className="p-5 bg-[#14100d] border border-[#2b2118] rounded-xl space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#211a14]">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-bold text-[#d4a343]">
                          #{order.id}
                        </span>
                        <span className="text-xs text-[#8c7d6b]">·</span>
                        <span className="font-serif font-bold text-sm text-[#faf6ee]">
                          {order.customerName}
                        </span>
                        <span className="text-xs text-[#8c7d6b]">({order.customerPhone})</span>
                        <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1c1511] text-[#a89680]">
                          {order.orderType}
                        </span>
                      </div>

                      {/* Status Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#8c7d6b]">Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(order.id, e.target.value as Order['status'])
                          }
                          className="px-3 py-1.5 rounded-lg bg-[#1c1511] border border-[#3d2e23] text-xs font-semibold text-[#f5ecd8] focus:outline-none focus:border-[#d4a343]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready">Ready</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        {order.address && (
                          <div className="text-[#a89680]">
                            <strong>Delivery Address:</strong> {order.address}
                          </div>
                        )}
                        {order.notes && (
                          <div className="text-amber-300/90 mt-1">
                            <strong>Kitchen Notes:</strong> {order.notes}
                          </div>
                        )}
                        <div className="text-[#7d6e5d] mt-1">
                          Placed at: {new Date(order.createdAt).toLocaleString()} · Mode: {order.paymentMethod}
                        </div>
                      </div>

                      {/* Items summary */}
                      <div className="bg-[#1a1410] p-3 rounded-lg border border-[#261d16] space-y-1">
                        <div className="font-semibold text-[#faf6ee] mb-1">Items ({order.items.length}):</div>
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-[#b8aa97]">
                            <span>
                              {it.name} × {it.quantity}
                            </span>
                            <span>Rs. {it.itemTotal.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-[#291f17] flex justify-between font-bold text-[#faf6ee]">
                          <span>Total Amount</span>
                          <span className="text-[#e5b85c]">Rs. {order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* TAB 3: MENU MANAGEMENT */}
        {/* ================================================= */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#faf6ee]">
                  Menu Management
                </h2>
                <p className="text-xs text-[#8c7d6b]">
                  Add, edit, change prices, or toggle availability of dishes from the real menu.
                </p>
              </div>

              <button
                onClick={handleOpenAddItem}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] rounded-lg transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Dish</span>
              </button>
            </div>

            {/* Category Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[#8a7b69] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  placeholder="Search dish..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#14100d] border border-[#2e2319] text-xs text-[#f5ecd8] focus:outline-none focus:border-[#d4a343]"
                />
              </div>

              <select
                value={menuCategoryFilter}
                onChange={(e) => setMenuCategoryFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded-lg bg-[#14100d] border border-[#2e2319] text-xs text-[#f5ecd8] focus:outline-none focus:border-[#d4a343]"
              >
                <option value="all">All Categories ({menuItems.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dishes Table */}
            <div className="bg-[#14100d] border border-[#2b2118] rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#241c16] text-[#8c7d6b] bg-[#1a1410]">
                      <th className="p-3.5 font-semibold">Dish</th>
                      <th className="p-3.5 font-semibold">Category</th>
                      <th className="p-3.5 font-semibold">Base Price</th>
                      <th className="p-3.5 font-semibold">Availability</th>
                      <th className="p-3.5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f1712]">
                    {menuItems
                      .filter((i) => {
                        const matchesCategory =
                          menuCategoryFilter === 'all' || i.category === menuCategoryFilter;
                        const matchesSearch =
                          menuSearch === '' ||
                          i.name.toLowerCase().includes(menuSearch.toLowerCase());
                        return matchesCategory && matchesSearch;
                      })
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-[#18120e]">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover bg-[#241c16]"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <div className="font-serif font-bold text-sm text-[#faf6ee]">
                                  {item.name}
                                </div>
                                {item.badge && (
                                  <span className="text-[10px] text-[#d4a343] font-semibold">
                                    ★ {item.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-[#b5a693]">{item.category}</td>
                          <td className="p-3.5 font-semibold text-[#faf6ee]">
                            Rs. {item.price.toLocaleString()}
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => handleToggleItemAvailability(item)}
                              className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                                item.isAvailable
                                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/60'
                                  : 'bg-red-950/60 text-red-300 border border-red-800/40 hover:bg-red-900/60'
                              }`}
                            >
                              {item.isAvailable ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              <span>{item.isAvailable ? 'In Stock' : 'Sold Out'}</span>
                            </button>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditItem(item)}
                                className="p-1.5 rounded bg-[#211a14] text-[#d4a343] hover:text-white hover:bg-[#30251c] transition-colors"
                                title="Edit Dish"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id, item.name)}
                                className="p-1.5 rounded bg-[#211a14] text-[#8c7d6b] hover:text-red-400 hover:bg-red-950/40 transition-colors"
                                title="Delete Dish"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* TAB 4: REVIEWS MODERATION */}
        {/* ================================================= */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#faf6ee]">
                Customer Reviews Moderation
              </h2>
              <p className="text-xs text-[#8c7d6b]">
                Approve, hide, or remove reviews left by customers on the website.
              </p>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-[#14100d] border border-[#2b2118] rounded-xl flex flex-col sm:flex-row items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#faf6ee]">
                        {rev.customerName}
                      </span>
                      <span className="text-xs text-[#7d6e5d]">{rev.date}</span>
                      {rev.isDemo && (
                        <span className="text-[10px] text-[#8c7d6b] px-1.5 py-0.5 rounded bg-[#1e1711]">
                          Demo Review
                        </span>
                      )}
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          rev.status === 'approved'
                            ? 'bg-emerald-950/60 text-emerald-400'
                            : 'bg-red-950/60 text-red-400'
                        }`}
                      >
                        {rev.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#d4a343]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating ? 'fill-current' : 'text-[#382b20]'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-[#cfc1af] leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {rev.status === 'hidden' ? (
                      <button
                        onClick={() => handleUpdateReviewStatus(rev.id, 'approved')}
                        className="px-3 py-1.5 rounded text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/60"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateReviewStatus(rev.id, 'hidden')}
                        className="px-3 py-1.5 rounded text-xs font-semibold bg-[#261d16] text-[#b8aa97] hover:text-white"
                      >
                        Hide
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteReview(rev.id)}
                      className="p-1.5 text-[#736554] hover:text-red-400 transition-colors"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* TAB 5: RESTAURANT SETTINGS */}
        {/* ================================================= */}
        {activeTab === 'settings' && settingsForm && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#faf6ee]">
                Restaurant Information & Configuration
              </h2>
              <p className="text-xs text-[#8c7d6b]">
                Change phone numbers, WhatsApp order target, address, and announcement banner.
              </p>
            </div>

            <div className="bg-[#14100d] border border-[#2b2118] rounded-2xl p-6 sm:p-7 space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                    English Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Urdu Tagline
                </label>
                <input
                  type="text"
                  value={settingsForm.urduTagline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, urduTagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                    Phone (Call / Orders)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                    WhatsApp Number (Format: 923320789999)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Restaurant Address (English)
                </label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Restaurant Address (Urdu)
                </label>
                <input
                  type="text"
                  value={settingsForm.addressUrdu}
                  onChange={(e) => setSettingsForm({ ...settingsForm, addressUrdu: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Operating Hours Description
                </label>
                <input
                  type="text"
                  value={settingsForm.hours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, hours: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Homepage Announcement Banner Text
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.announcement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                    Standard Delivery Fee (PKR)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.deliveryFee}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, deliveryFee: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                    Free Delivery Threshold (PKR)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.freeDeliveryThreshold}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        freeDeliveryThreshold: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] rounded-lg shadow-md transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Restaurant Settings</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ================================================= */}
        {/* TAB 6: CUSTOMER MESSAGES */}
        {/* ================================================= */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#faf6ee]">
                Customer Inquiries & Catering Requests
              </h2>
              <p className="text-xs text-[#8c7d6b]">
                Messages sent via the Contact page.
              </p>
            </div>

            {messages.length === 0 ? (
              <div className="p-8 text-center bg-[#14100d] border border-[#241c16] rounded-xl text-xs text-[#8c7d6b]">
                No customer inquiries logged yet.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-5 bg-[#14100d] border border-[#261d16] rounded-xl space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#faf6ee]">
                          {msg.name}
                        </span>
                        <span className="text-[#a89680]">({msg.phone})</span>
                        {msg.email && <span className="text-[#7d6e5d]">· {msg.email}</span>}
                      </div>
                      <span className="text-[#736554]">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-[#d4a343] font-semibold">
                      Subject: {msg.subject}
                    </div>

                    <p className="text-[#cfc1af] bg-[#1a1410] p-3 rounded border border-[#261d16]">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit / Add Dish Modal */}
      {isItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#14100d] border border-[#33261d] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-[#faf6ee] mb-1">
              {editingItem ? 'Edit Dish' : 'Add New Dish to Menu'}
            </h3>
            <p className="text-xs text-[#8c7d6b] mb-4">
              Enter the dish details, pricing, and category.
            </p>

            <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Dish Name *
                </label>
                <input
                  type="text"
                  required
                  value={itemFormData.name}
                  onChange={(e) => setItemFormData({ ...itemFormData, name: e.target.value })}
                  placeholder="e.g. Chicken Karahi"
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={itemFormData.category}
                    onChange={(e) => setItemFormData({ ...itemFormData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                    Base Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={itemFormData.price}
                    onChange={(e) =>
                      setItemFormData({ ...itemFormData, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={itemFormData.image}
                  onChange={(e) => setItemFormData({ ...itemFormData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={itemFormData.description}
                  onChange={(e) =>
                    setItemFormData({ ...itemFormData, description: e.target.value })
                  }
                  placeholder="Appetizing description of ingredients, spices, and cooking method..."
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                  Badge (Optional)
                </label>
                <input
                  type="text"
                  value={itemFormData.badge}
                  onChange={(e) => setItemFormData({ ...itemFormData, badge: e.target.value })}
                  placeholder="e.g. Specialty, Chef's Special, Signature"
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:border-[#d4a343]"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemFormData.isAvailable}
                    onChange={(e) =>
                      setItemFormData({ ...itemFormData, isAvailable: e.target.checked })
                    }
                    className="accent-[#d4a343]"
                  />
                  <span>Currently Available (In Stock)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemFormData.isPopular}
                    onChange={(e) =>
                      setItemFormData({ ...itemFormData, isPopular: e.target.checked })
                    }
                    className="accent-[#d4a343]"
                  />
                  <span>Featured / Popular</span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#241c16]">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="px-4 py-2 text-[#a89680] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] rounded-lg shadow-md transition-colors"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
