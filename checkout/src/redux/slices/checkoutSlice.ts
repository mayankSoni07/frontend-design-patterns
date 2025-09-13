import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address, PaymentMethod, CartItem } from 'frontend-common';

export interface CheckoutState {
  step: 'address' | 'payment' | 'summary';
  selectedAddress: Address | null;
  selectedPaymentMethod: PaymentMethod | null;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  cartItems: CartItem[];
  orderSummary: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  loading: boolean;
  error: string | null;
  orderPlaced: boolean;
  orderId: string | null;
}

const initialState: CheckoutState = {
  step: 'address',
  selectedAddress: null,
  selectedPaymentMethod: null,
  addresses: [],
  paymentMethods: [],
  cartItems: [],
  orderSummary: {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  loading: false,
  error: null,
  orderPlaced: false,
  orderId: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
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
    setStep: (state, action: PayloadAction<CheckoutState['step']>) => {
      state.step = action.payload;
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    setSelectedAddress: (state, action: PayloadAction<Address>) => {
      state.selectedAddress = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    deleteAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
    },
    setPaymentMethods: (state, action: PayloadAction<PaymentMethod[]>) => {
      state.paymentMethods = action.payload;
    },
    setSelectedPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.selectedPaymentMethod = action.payload;
    },
    addPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethods.push(action.payload);
    },
    deletePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethods = state.paymentMethods.filter(pm => pm.id !== action.payload);
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
      checkoutSlice.caseReducers.calculateOrderSummary(state);
    },
    calculateOrderSummary: (state) => {
      const subtotal = state.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
      const tax = subtotal * 0.08; // 8% tax
      const total = subtotal + shipping + tax;
      
      state.orderSummary = {
        subtotal,
        shipping,
        tax,
        total,
      };
    },
    placeOrder: (state, action: PayloadAction<string>) => {
      state.orderPlaced = true;
      state.orderId = action.payload;
      state.loading = false;
    },
    resetCheckout: (state) => {
      return { ...initialState };
    },
    nextStep: (state) => {
      if (state.step === 'address') {
        state.step = 'payment';
      } else if (state.step === 'payment') {
        state.step = 'summary';
      }
    },
    previousStep: (state) => {
      if (state.step === 'payment') {
        state.step = 'address';
      } else if (state.step === 'summary') {
        state.step = 'payment';
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setStep,
  setAddresses,
  setSelectedAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  setPaymentMethods,
  setSelectedPaymentMethod,
  addPaymentMethod,
  deletePaymentMethod,
  setCartItems,
  calculateOrderSummary,
  placeOrder,
  resetCheckout,
  nextStep,
  previousStep,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
