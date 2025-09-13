import { createBaseStore, baseReducers, AuthState } from 'frontend-common';
import orderReducer, { OrderState } from './slices/orderSlice';

// Additional reducers specific to order
const additionalReducers = {
  order: orderReducer,
};

// Create store with base + additional reducers
export const store = createBaseStore(additionalReducers);

// Define RootState type explicitly
export interface RootState {
  auth: AuthState;
  order: OrderState;
}

export type AppDispatch = typeof store.dispatch;
