import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, Button, Card, formatCurrency, dateFormatter, Loader } from 'frontend-common';
import { OrderStatusBadge, OrderTimeline } from '../components';
import { RootState } from '../redux/store';
import { setCurrentOrder } from '../redux/slices/orderSlice';

interface OrderDetailPageProps {
  orderId: string;
}

export default function OrderDetailPage({ orderId }: OrderDetailPageProps) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { currentOrder, loading } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Mock order data - in real app, fetch from API
    const mockOrder = {
      id: orderId,
      userId: user?.id || '1',
      items: [
        {
          id: '1',
          productId: 'prod-1',
          quantity: 2,
          price: 29.99,
          product: {
            id: 'prod-1',
            name: 'Wireless Headphones',
            price: 29.99,
            description: 'High-quality wireless headphones with noise cancellation',
            image: 'https://via.placeholder.com/150',
            category: 'electronics',
            inStock: true,
          },
        },
        {
          id: '2',
          productId: 'prod-2',
          quantity: 1,
          price: 15.99,
          product: {
            id: 'prod-2',
            name: 'Phone Case',
            price: 15.99,
            description: 'Protective phone case',
            image: 'https://via.placeholder.com/150',
            category: 'accessories',
            inStock: true,
          },
        },
      ],
      total: 75.97,
      status: 'shipped' as const,
      createdAt: '2024-01-20T09:15:00Z',
      updatedAt: '2024-01-21T16:45:00Z',
      shippingAddress: {
        id: '1',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true,
      },
      paymentMethod: {
        id: '1',
        type: 'credit_card' as const,
        last4: '4242',
        expiryDate: '12/25',
        isDefault: true,
      },
    };

    dispatch(setCurrentOrder(mockOrder));
  }, [isAuthenticated, orderId, dispatch, user]);

  const handleTrackPackage = () => {
    // Simulate opening tracking page
    alert('Tracking information would be displayed here');
  };

  const handleContactSupport = () => {
    window.location.href = '/support';
  };

  const handleReorder = () => {
    if (currentOrder) {
      localStorage.setItem('cart_data', JSON.stringify(currentOrder.items));
      window.location.href = '/checkout';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading || !currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Order Details - E-commerce" user={user || undefined} />
        <div className="flex justify-center py-12">
          <Loader size="lg" text="Loading order details..." />
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = currentOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Order Details - E-commerce"
        user={user || undefined}
        onLogin={() => window.location.href = '/login'}
        onLogout={() => {}}
        onProfileClick={() => window.location.href = '/profile'}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/order-list'}
            className="mb-4"
          >
            ← Back to Orders
          </Button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{currentOrder.id}</h1>
              <p className="text-gray-600">
                Placed on {dateFormatter(currentOrder.createdAt)}
              </p>
            </div>
            <OrderStatusBadge status={currentOrder.status} size="lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Timeline */}
            <Card title="Order Status">
              <OrderTimeline order={currentOrder} />
              
              {currentOrder.status === 'shipped' && (
                <div className="mt-6 pt-6 border-t">
                  <Button onClick={handleTrackPackage} className="w-full">
                    Track Package
                  </Button>
                </div>
              )}
            </Card>

            {/* Order Items */}
            <Card title="Order Items">
              <div className="space-y-4">
                {currentOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">{item.product.description}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Shipping Address */}
            <Card title="Shipping Address">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-gray-900">{currentOrder.shippingAddress.street}</div>
                <div className="text-gray-600">
                  {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}
                </div>
                <div className="text-gray-600">{currentOrder.shippingAddress.country}</div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card title="Payment Method">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-gray-900">
                  Credit Card ending in {currentOrder.paymentMethod.last4}
                </div>
                {currentOrder.paymentMethod.expiryDate && (
                  <div className="text-gray-600">
                    Expires {currentOrder.paymentMethod.expiryDate}
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card title="Order Summary">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-medium border-t pt-3">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatCurrency(currentOrder.total)}</span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card title="Order Actions">
              <div className="space-y-3">
                <Button onClick={handleReorder} className="w-full">
                  Reorder Items
                </Button>
                
                {(currentOrder.status === 'pending' || currentOrder.status === 'processing') && (
                  <Button variant="outline" className="w-full">
                    Cancel Order
                  </Button>
                )}
                
                {currentOrder.status === 'delivered' && (
                  <Button variant="outline" onClick={() => window.location.href = '/returns'} className="w-full">
                    Return Items
                  </Button>
                )}
                
                <Button variant="outline" onClick={handleContactSupport} className="w-full">
                  Contact Support
                </Button>
              </div>
            </Card>

            {/* Need Help */}
            <Card title="Need Help?">
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Order Issues:</strong> Contact our support team for any order-related questions.
                </p>
                <p>
                  <strong>Returns:</strong> Items can be returned within 30 days of delivery.
                </p>
                <p>
                  <strong>Tracking:</strong> Use the tracking button to get real-time updates.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  
  if (!id || typeof id !== 'string') {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      orderId: id,
    },
  };
};
