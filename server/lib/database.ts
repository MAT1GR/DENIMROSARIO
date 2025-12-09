import { 
    authService, 
    productService, 
    orderService,
    customerService,
    settingsService,
    dashboardService,
    notificationService,
    analyticsService,
    cartService
} from './db/services.js';

export const db = {
  auth: authService,
  products: productService,
  orders: orderService,
  customers: customerService,
  settings: settingsService,
  dashboard: dashboardService,
  notifications: notificationService,
  analytics: analyticsService,
  carts: cartService,
};

