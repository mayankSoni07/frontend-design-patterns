import { createBaseStore, baseReducers } from 'frontend-common';
import cartReducer, { CartState } from './slices/cartSlice';
import productReducer, { ProductState } from './slices/productSlice';
import { AuthState } from 'frontend-common';

// Additional reducers specific to home-to-cart
const additionalReducers = {
  cart: cartReducer,
  product: productReducer,
};

// Create store with base + additional reducers
export const store = createBaseStore(additionalReducers);

// Define RootState type explicitly
export interface RootState {
  auth: AuthState;
  cart: CartState;
  product: ProductState;
}

export type AppDispatch = typeof store.dispatch;
