import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, Button, Card, generateId } from 'frontend-common';
import { CheckoutProgress, OrderSummary, PaymentForm } from '../components';
import { RootState } from '../redux/store';
import { setPaymentMethods, setSelectedPaymentMethod, addPaymentMethod, nextStep, previousStep } from '../redux/slices/checkoutSlice';

export default function PaymentPage() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { paymentMethods, selectedPaymentMethod, selectedAddress, loading } = useSelector((state: RootState) => state.checkout);
  
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    if (!selectedAddress) {
      window.location.href = '/address';
      return;
    }

    // Mock payment methods data - in real app, fetch from API
    const mockPaymentMethods = [
      {
        id: '1',
        type: 'credit_card' as const,
        last4: '4242',
        expiryDate: '12/25',
        isDefault: true,
      },
      {
        id: '2',
        type: 'paypal' as const,
        last4: undefined,
        expiryDate: undefined,
        isDefault: false,
      },
    ];

    dispatch(setPaymentMethods(mockPaymentMethods));
    if (mockPaymentMethods.length > 0 && !selectedPaymentMethod) {
      const defaultPayment = mockPaymentMethods.find(pm => pm.isDefault) || mockPaymentMethods[0];
      dispatch(setSelectedPaymentMethod(defaultPayment));
    }
  }, [isAuthenticated, selectedAddress, dispatch, selectedPaymentMethod]);

  const handlePaymentSelect = (paymentMethod: any) => {
    dispatch(setSelectedPaymentMethod(paymentMethod));
  };

  const handleAddPaymentMethod = (paymentData: any) => {
    const newPaymentMethod = {
      ...paymentData,
      id: generateId(),
    };
    dispatch(addPaymentMethod(newPaymentMethod));
    dispatch(setSelectedPaymentMethod(newPaymentMethod));
    setShowAddForm(false);
  };

  const handleBack = () => {
    dispatch(previousStep());
    window.location.href = '/address';
  };

  const handleContinue = () => {
    if (selectedPaymentMethod) {
      dispatch(nextStep());
      window.location.href = '/summary';
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Payment Method - E-commerce"
        user={user || undefined}
        onLogin={() => window.location.href = '/login'}
        onLogout={() => {}}
        onProfileClick={() => window.location.href = '/profile'}
      />
      
      <CheckoutProgress />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Select Payment Method">
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPaymentMethod?.id === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePaymentSelect(method)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          checked={selectedPaymentMethod?.id === method.id}
                          onChange={() => handlePaymentSelect(method)}
                          className="mt-1 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {getPaymentMethodDisplay(method)}
                          </div>
                          {method.expiryDate && (
                            <div className="text-sm text-gray-600">
                              Expires {method.expiryDate}
                            </div>
                          )}
                          {method.isDefault && (
                            <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
                >
                  <div className="text-gray-600">
                    <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Payment Method
                  </div>
                </button>
              </div>
              
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                >
                  Back to Address
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={!selectedPaymentMethod}
                >
                  Continue to Summary
                </Button>
              </div>
            </Card>

            {showAddForm && (
              <PaymentForm
                onSave={handleAddPaymentMethod}
                onCancel={() => setShowAddForm(false)}
                loading={loading}
              />
            )}
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
