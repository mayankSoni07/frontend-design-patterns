import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, Button, Loader } from 'frontend-common';
import { CheckoutProgress, OrderSummary } from '../components';
import { RootState } from '../redux/store';
import { setCartItems, setStep } from '../redux/slices/checkoutSlice';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { cartItems, loading } = useSelector((state: RootState) => state.checkout);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Load cart items from localStorage or API
    const savedCart = localStorage.getItem('cart_data');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch(setCartItems(cartData));
      } catch (error) {
        console.error('Failed to load cart data:', error);
      }
    }

    // Set initial step
    dispatch(setStep('address'));
  }, [isAuthenticated, dispatch]);

  const handleStartCheckout = () => {
    window.location.href = '/address';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Checkout - E-commerce" />
        <div className="flex justify-center py-12">
          <Loader size="lg" text="Redirecting to login..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Checkout - E-commerce"
        user={user || undefined}
        onLogin={() => window.location.href = '/login'}
        onLogout={() => {}}
        onProfileClick={() => window.location.href = '/profile'}
      />
      
      <CheckoutProgress />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
              <Button onClick={() => window.location.href = '/plp'}>
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
                <p className="text-gray-600 mb-6">
                  Complete your purchase by providing your shipping address and payment information.
                </p>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Step 1: Shipping Address</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Choose or add a shipping address for your order.
                    </p>
                    <Button onClick={() => window.location.href = '/address'}>
                      Continue to Address
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 opacity-50">
                    <h3 className="font-medium text-gray-900 mb-2">Step 2: Payment Method</h3>
                    <p className="text-sm text-gray-600">
                      Select your preferred payment method.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 opacity-50">
                    <h3 className="font-medium text-gray-900 mb-2">Step 3: Review & Place Order</h3>
                    <p className="text-sm text-gray-600">
                      Review your order details and complete your purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
