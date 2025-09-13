// API endpoints and configuration constants

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  
  // User endpoints
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  
  // Product endpoints
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  PRODUCT_SEARCH: '/products/search',
  CATEGORIES: '/categories',
  
  // Cart endpoints
  CART: '/cart',
  ADD_TO_CART: '/cart/add',
  UPDATE_CART_ITEM: '/cart/update/:id',
  REMOVE_FROM_CART: '/cart/remove/:id',
  CLEAR_CART: '/cart/clear',
  
  // Order endpoints
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  CREATE_ORDER: '/orders',
  CANCEL_ORDER: '/orders/:id/cancel',
  
  // Address endpoints
  ADDRESSES: '/addresses',
  CREATE_ADDRESS: '/addresses',
  UPDATE_ADDRESS: '/addresses/:id',
  DELETE_ADDRESS: '/addresses/:id',
  
  // Payment endpoints
  PAYMENT_METHODS: '/payment-methods',
  CREATE_PAYMENT_METHOD: '/payment-methods',
  DELETE_PAYMENT_METHOD: '/payment-methods/:id',
  PROCESS_PAYMENT: '/payments/process',
};

export const APP_CONFIG = {
  APP_NAME: 'MicroFrontend E-commerce',
  VERSION: '1.0.0',
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
  CURRENCY: {
    SYMBOL: '$',
    CODE: 'USD',
  },
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PLP: '/plp',
    PDP: '/pdp',
    CART: '/cart',
    CHECKOUT: '/checkout',
    ORDERS: '/orders',
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  CART_DATA: 'cart_data',
  THEME: 'theme_preference',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
