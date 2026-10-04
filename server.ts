import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { db } from './server/db.ts';

const ADMIN_TOKEN = 'ff-secret-admin-session-token-2026';

function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Admin authentication required.' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_TOKEN) {
    res.status(403).json({ error: 'Forbidden: Invalid admin token.' });
    return;
  }
  next();
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());
  app.use(express.static(path.resolve(process.cwd(), 'public')));

  // ============================================
  // REST API ROUTES
  // ============================================

  // --- Settings ---
  app.get('/api/settings', (_req: Request, res: Response) => {
    try {
      const settings = db.getSettings();
      res.json(settings);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve restaurant settings' });
    }
  });

  app.put('/api/settings', adminAuthMiddleware, (req: Request, res: Response) => {
    try {
      const updated = db.updateSettings(req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update restaurant settings' });
    }
  });

  // --- Categories ---
  app.get('/api/categories', (_req: Request, res: Response) => {
    try {
      res.json(db.getCategories());
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve categories' });
    }
  });

  app.post('/api/categories', adminAuthMiddleware, (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name || typeof name !== 'string') {
        res.status(400).json({ error: 'Category name is required' });
        return;
      }
      const category = db.addCategory(name.trim());
      res.status(201).json(category);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add category' });
    }
  });

  // --- Menu Items ---
  app.get('/api/menu', (_req: Request, res: Response) => {
    try {
      res.json(db.getMenuItems());
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve menu items' });
    }
  });

  app.get('/api/menu/:id', (req: Request, res: Response) => {
    try {
      const item = db.getMenuItemById(req.params.id);
      if (!item) {
        res.status(404).json({ error: 'Menu item not found' });
        return;
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve menu item' });
    }
  });

  app.post('/api/menu', adminAuthMiddleware, (req: Request, res: Response) => {
    try {
      const { name, category, price, description, image, variants, isAvailable, isPopular, badge } = req.body;
      if (!name || !category || price === undefined) {
        res.status(400).json({ error: 'Name, category, and price are required' });
        return;
      }
      const newItem = db.addMenuItem({
        name: name.trim(),
        category: category.trim(),
        price: Number(price),
        description: description || '',
        image: image || '',
        variants: variants || [],
        isAvailable: isAvailable !== false,
        isPopular: !!isPopular,
        badge: badge || undefined,
      });
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create menu item' });
    }
  });

  app.put('/api/menu/:id', adminAuthMiddleware, (req: Request, res: Response) => {
    try {
      const updated = db.updateMenuItem(req.params.id, req.body);
      if (!updated) {
        res.status(404).json({ error: 'Menu item not found' });
        return;
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update menu item' });
    }
  });

  app.delete('/api/menu/:id', adminAuthMiddleware, (req: Request, res: Response) => {
    try {
      const success = db.deleteMenuItem(req.params.id);
      if (!success) {
        res.status(404).json({ error: 'Menu item not found' });
        return;
      }
      res.json({ success: true, message: 'Menu item deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete menu item' });
    }
  });

  // --- Orders ---
  app.get('/api/orders', (req: Request, res: Response) => {
    try {
      // Check if requested by admin or specific customer phone
      const phone = req.query.phone as string;
      const allOrders = db.getOrders();
      if (phone) {
        const filtered = allOrders.filter((o) => o.customerPhone.includes(phone));
        res.json(filtered);
        return;
      }
      res.json(allOrders);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve orders' });
    }
  });

  app.get('/api/orders/:id', (req: Request, res: Response) => {
    try {
      const order = db.getOrderById(req.params.id);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve order' });
    }
  });

  app.post('/api/orders', (req: Request, res: Response) => {
    try {
      const { customerName, customerPhone, orderType, address, notes, items, subtotal, deliveryFee, total, paymentMethod } = req.body;
      if (!customerName || !customerPhone || !items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: 'Invalid order data: Name, phone, and items are required.' });
        return;
      }
      if (orderType === 'delivery' && (!address || address.trim().length < 3)) {
        res.status(400).json({ error: 'Delivery address is required for delivery orders.' });
        return;
      }

      const newOrder = db.createOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        orderType: orderType || 'delivery',
        address: address ? address.trim() : undefined,
        notes: notes ? notes.trim() : undefined,
        items,
        subtotal: Number(subtotal) || 0,
        deliveryFee: Number(deliveryFee) || 0,
        total: Number(total) || (Number(subtotal) + Number(deliveryFee)),
        paymentMethod: paymentMethod || (orderType === 'pickup' ? 'Cash on Pickup' : 'Cash on Delivery'),
      });
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(500).json({ error: 'Failed to process order' });
    }
  });

  app.put('/api/orders/:id/status', adminAuthMiddleware, (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
      if (!status || !validStatuses.includes(status)) {
        res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
        return;
      }
      const updated = db.updateOrderStatus(req.params.id, status);
      if (!updated) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update order status' });
    }
  });

  // --- Reviews ---
  app.get('/api/reviews', (req: Request, res: Response) => {
    try {
      const showAll = req.query.all === 'true';
      res.json(db.getReviews(!showAll));
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve reviews' });
    }
  });

  app.post('/api/reviews', (req: Request, res: Response) => {
    try {
      const { customerName, rating, comment } = req.body;
      if (!customerName || !comment || !rating) {
        res.status(400).json({ error: 'Name, rating, and review comments are required' });
        return;
      }
      const parsedRating = Number(rating);
      if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        res.status(400).json({ error: 'Rating must be between 1 and 5' });
        return;
      }
      const newReview = db.createReview({
        customerName: customerName.trim(),
        rating: parsedRating,
        comment: comment.trim(),
      });
      res.status(201).json(newReview);
    } catch (err) {
      res.status(500).json({ error: 'Failed to submit review' });
    }
  });

  app.put('/api/reviews/:id/status', adminAuthMiddleware, (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      if (status !== 'approved' && status !== 'hidden') {
        res.status(400).json({ error: 'Status must be approved or hidden' });
        return;
      }
      const updated = db.updateReviewStatus(req.params.id, status);
      if (!updated) {
        res.status(404).json({ error: 'Review not found' });
        return;
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update review status' });
    }
  });

  app.delete('/api/reviews/:id', adminAuthMiddleware, (req: Request, res: Response) => {
    try {
      const deleted = db.deleteReview(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: 'Review not found' });
        return;
      }
      res.json({ success: true, message: 'Review deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete review' });
    }
  });

  // --- Contact Messages ---
  app.get('/api/contact', adminAuthMiddleware, (_req: Request, res: Response) => {
    try {
      res.json(db.getContactMessages());
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve contact messages' });
    }
  });

  app.post('/api/contact', (req: Request, res: Response) => {
    try {
      const { name, phone, email, subject, message } = req.body;
      if (!name || !phone || !message) {
        res.status(400).json({ error: 'Name, phone, and message are required' });
        return;
      }
      const newMsg = db.createContactMessage({
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : undefined,
        subject: subject ? subject.trim() : 'General Inquiry',
        message: message.trim(),
      });
      res.status(201).json(newMsg);
    } catch (err) {
      res.status(500).json({ error: 'Failed to submit contact message' });
    }
  });

  app.put('/api/contact/:id/read', adminAuthMiddleware, (req: Request, res: Response) => {
    try {
      const success = db.markContactMessageRead(req.params.id);
      res.json({ success });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update contact message' });
    }
  });

  // --- Admin Stats ---
  app.get('/api/stats', adminAuthMiddleware, (_req: Request, res: Response) => {
    try {
      res.json(db.getStats());
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve stats' });
    }
  });

  // --- Admin Authentication ---
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    // Authorized credentials
    if (
      (username === 'admin' && password === 'forkandflame2026') ||
      (username === 'manager' && password === 'badin2026')
    ) {
      res.json({
        token: ADMIN_TOKEN,
        user: { username, role: 'admin', restaurant: 'Fork & Flame' },
      });
      return;
    }
    res.status(401).json({ error: 'Invalid username or password' });
  });

  app.get('/api/auth/me', adminAuthMiddleware, (_req: Request, res: Response) => {
    res.json({
      authenticated: true,
      user: { username: 'admin', role: 'admin', restaurant: 'Fork & Flame' },
    });
  });

  // ============================================
  // FRONTEND SPA SERVING
  // ============================================
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fork & Flame server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
