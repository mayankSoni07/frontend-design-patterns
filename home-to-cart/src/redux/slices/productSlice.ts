import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, PaginatedResponse } from 'frontend-common';

export interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  categories: string[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    category: string;
    priceRange: [number, number];
    inStock: boolean;
    searchQuery: string;
  };
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  categories: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  filters: {
    category: '',
    priceRange: [0, 1000],
    inStock: true,
    searchQuery: '',
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setProducts: (state, action: PayloadAction<PaginatedResponse<Product>>) => {
      const { data, total, page, limit, totalPages } = action.payload;
      state.products = data;
      state.pagination = { page, limit, total, totalPages };
      state.loading = false;
      state.error = null;
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setCurrentProduct,
  setCategories,
  updateFilters,
  resetFilters,
  setPage,
} = productSlice.actions;

export default productSlice.reducer;
