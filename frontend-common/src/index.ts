// Main entry point for frontend-common package

// Export components
export * from './components';

// Export types
export * from './types';

// Export constants
export * from './constants';

// Export utils
export * from './utils';

// Export hooks
export * from './hooks';

// Export store utilities
export { createBaseStore, baseReducers } from './store';
export { authReducer } from './store';
export type { AuthState } from './store/slices/authSlice';

// Export API client
export { apiClient, api } from './store/middleware/apiClient';
