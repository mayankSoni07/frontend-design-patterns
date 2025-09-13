import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { store } from '../redux/store';
import { loadCartFromStorage } from '../middleware/cartMiddleware';
import { loadCartFromStorage as loadCartAction } from '../redux/slices/cartSlice';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Load cart from localStorage on app initialization
    const savedCart = loadCartFromStorage();
    if (savedCart.length > 0) {
      store.dispatch(loadCartAction(savedCart));
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
