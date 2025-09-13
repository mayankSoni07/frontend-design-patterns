import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, Button, Card, useAuth } from 'frontend-common';
import { CartSummary } from '../components';
import { RootState } from '../redux/store';

export default function ProfilePage() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Profile - E-commerce" />
        <div className="flex justify-center py-12">
          <p>Please log in to view your profile.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile Info' },
    { id: 'cart', label: 'Shopping Cart' },
    { id: 'orders', label: 'Order History' },
    { id: 'addresses', label: 'Addresses' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Profile - E-commerce"
        user={user || undefined}
        onLogin={() => window.location.href = '/login'}
        onLogout={handleLogout}
        onProfileClick={() => window.location.href = '/profile'}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              {user.avatar ? (
                <img
                  className="h-20 w-20 rounded-full border-4 border-white"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center border-4 border-white">
                  <span className="text-2xl font-bold text-blue-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="text-white">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-blue-100">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card title="Personal Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                </Card>

                <Card title="Account Settings">
                  <div className="space-y-4">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Email Preferences</Button>
                    <Button variant="danger" onClick={handleLogout}>
                      Sign Out
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'cart' && (
              <Card title="Shopping Cart">
                <CartSummary onCheckout={() => window.location.href = '/checkout'} />
              </Card>
            )}

            {activeTab === 'orders' && (
              <Card title="Order History">
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No orders found</p>
                  <Button onClick={() => window.location.href = '/plp'}>
                    Start Shopping
                  </Button>
                </div>
              </Card>
            )}

            {activeTab === 'addresses' && (
              <Card title="Saved Addresses">
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No addresses saved</p>
                  <Button variant="outline">Add New Address</Button>
                </div>
              </Card>
            )}
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
