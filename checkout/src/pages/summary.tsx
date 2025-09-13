import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, Button, Card, formatCurrency, generateId } from 'frontend-common';
import { CheckoutProgress, OrderSummary } from '../components';
import { RootState } from '../redux/store';
import { placeOrder, previousStep, setLoading } from '../redux/slices/checkoutSlice';

export default function SummaryPage() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { 
    selectedAddress, 
    selectedPaymentMethod, 
    cartItems, 
    orderSummary, 
    loading, 
    orderPlaced, 
    orderId 
  } = useSelector((state: RootState) => state.checkout);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    if (!selectedAddress || !selectedPaymentMethod) {
      window.location.href = '/address';
      return;
    }
  }, [isAuthenticated, selectedAddress, selectedPaymentMethod]);

  const handleBack = () => {
    dispatch(previousStep());
    window.location.href = '/payment';
  };

  const handlePlaceOrder = async () => {
    dispatch(setLoading(true));
    
    // Simulate API call
    setTimeout(() => {
      const newOrderId = generateId();
      dispatch(placeOrder(newOrderId));
      
      // Clear cart
      localStorage.removeItem('cart_data');
      
      // Redirect to order confirmation
      setTimeout(() => {
        window.location.href = `/order-confirmation?orderId=${newOrderId}`;
      }, 2000);
    }, 2000);
  };

  const getPaymentMethodDisplay = (method: any) => {
    switch (method.type) {
      case 'credit_card':
        return `Credit Card ending in ${method.last4}`;
      case 'debit_card':
        return `Debit Card ending in ${method.last4}`;
      case 'paypal':
        return 'PayPal';
      case 'bank_transfer':
        return 'Bank Transfer';
      default:
        return 'Payment Method';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          title="Order Placed - E-commerce"
          user={user || undefined}
          onLogin={() => window.location.href = '/login'}
          onLogout={() => {}}
          onProfileClick={() => window.location.href = '/profile'}
        />
        
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-4">
              Your order #{orderId} has been placed and is being processed.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You will receive an email confirmation shortly.
            </p>
            <div className="space-x-4">
              <Button onClick={() => window.location.href = '/orders'}>
                View Orders
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Order Summary - E-commerce"
        user={user || undefined}
        onLogin={() => window.location.href = '/login'}
        onLogout={() => {}}
        onProfileClick={() => window.location.href = '/profile'}
      />
      
      <CheckoutProgress />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Review Your Order">
              {/* Shipping Address */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Address</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">{selectedAddress?.street}</div>
                  <div className="text-gray-600">
                    {selectedAddress?.city}, {selectedAddress?.state} {selectedAddress?.zipCode}
                  </div>
                  <div className="text-gray-600">{selectedAddress?.country}</div>
                </div>
                <button 
                  onClick={() => window.location.href = '/address'}
                  className="text-sm text-blue-600 hover:text-blue-800 mt-2"
                >
                  Change address
                </button>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">
                    {selectedPaymentMethod && getPaymentMethodDisplay(selectedPaymentMethod)}
                  </div>
                  {selectedPaymentMethod?.expiryDate && (
                    <div className="text-gray-600">Expires {selectedPaymentMethod.expiryDate}</div>
                  )}
                </div>
                <button 
                  onClick={() => window.location.href = '/payment'}
                  className="text-sm text-blue-600 hover:text-blue-800 mt-2"
                >
                  Change payment method
                </button>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Order Items</h3>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">{formatCurrency(item.price)} each</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-800">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-800">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t">
                <Button variant="outline" onClick={handleBack}>
                  Back to Payment
                </Button>
                <Button 
                  onClick={handlePlaceOrder} 
                  loading={loading}
                  size="lg"
                  className="px-8"
                >
                  {loading ? 'Placing Order...' : `Place Order - ${formatCurrency(orderSummary.total)}`}
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
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
