import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, Button, Card, generateId } from 'frontend-common';
import { CheckoutProgress, OrderSummary, AddressForm } from '../components';
import { RootState } from '../redux/store';
import { setAddresses, setSelectedAddress, addAddress, nextStep } from '../redux/slices/checkoutSlice';

export default function AddressPage() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { addresses, selectedAddress, loading } = useSelector((state: RootState) => state.checkout);
  
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Mock addresses data - in real app, fetch from API
    const mockAddresses = [
      {
        id: '1',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true,
      },
      {
        id: '2',
        street: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'United States',
        isDefault: false,
      },
    ];

    dispatch(setAddresses(mockAddresses));
    if (mockAddresses.length > 0 && !selectedAddress) {
      const defaultAddress = mockAddresses.find(addr => addr.isDefault) || mockAddresses[0];
      dispatch(setSelectedAddress(defaultAddress));
    }
  }, [isAuthenticated, dispatch, selectedAddress]);

  const handleAddressSelect = (address: any) => {
    dispatch(setSelectedAddress(address));
  };

  const handleAddAddress = (addressData: any) => {
    const newAddress = {
      ...addressData,
      id: generateId(),
    };
    dispatch(addAddress(newAddress));
    dispatch(setSelectedAddress(newAddress));
    setShowAddForm(false);
  };

  const handleContinue = () => {
    if (selectedAddress) {
      dispatch(nextStep());
      window.location.href = '/payment';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Shipping Address - E-commerce"
        user={user || undefined}
        onLogin={() => window.location.href = '/login'}
        onLogout={() => {}}
        onProfileClick={() => window.location.href = '/profile'}
      />
      
      <CheckoutProgress />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Select Shipping Address">
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedAddress?.id === address.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAddressSelect(address)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          checked={selectedAddress?.id === address.id}
                          onChange={() => handleAddressSelect(address)}
                          className="mt-1 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {address.street}
                          </div>
                          <div className="text-sm text-gray-600">
                            {address.city}, {address.state} {address.zipCode}
                          </div>
                          <div className="text-sm text-gray-600">
                            {address.country}
                          </div>
                          {address.isDefault && (
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
                    Add New Address
                  </div>
                </button>
              </div>
              
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                >
                  Back to Checkout
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={!selectedAddress}
                >
                  Continue to Payment
                </Button>
              </div>
            </Card>

            {showAddForm && (
              <AddressForm
                onSave={handleAddAddress}
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
