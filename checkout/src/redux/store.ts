import { createBaseStore, baseReducers, AuthState } from 'frontend-common';
import checkoutReducer, { CheckoutState } from './slices/checkoutSlice';

// Additional reducers specific to checkout
const additionalReducers = {
  checkout: checkoutReducer,
};

// Create store with base + additional reducers
export const store = createBaseStore(additionalReducers);

// Define RootState type explicitly
export interface RootState {
  auth: AuthState;
  checkout: CheckoutState;
}

export type AppDispatch = typeof store.dispatch;
