import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Base reducers that will be available in all microfrontends
const baseReducers = {
  auth: authReducer,
};

// Create base store configuration
export const createBaseStore = (additionalReducers = {}) => {
  const allReducers = {
    ...baseReducers,
    ...additionalReducers,
  };
  
  const rootReducer = combineReducers(allReducers);

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// Create default store with base reducers only
export const store = createBaseStore();

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export base reducers for use in microfrontends
export { baseReducers };
export { authReducer };
