import { Middleware } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from 'frontend-common';
import { RootState } from '../redux/store';

// Middleware to persist cart to localStorage
export const cartPersistenceMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);
  
  // Save cart to localStorage after any cart action
  if (action.type.startsWith('cart/')) {
    const state = store.getState();
    try {
      localStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(state.cart.items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }
  
  return result;
};

// Load cart from localStorage
export const loadCartFromStorage = () => {
  try {
    const cartData = localStorage.getItem(STORAGE_KEYS.CART_DATA);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};
