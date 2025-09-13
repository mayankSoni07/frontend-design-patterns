import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, Button, Loader, useFetch } from 'frontend-common';
import { OrderCard } from '../components';
import { RootState } from '../redux/store';
import { setOrders, updateFilters, setPage, updateOrderStatus } from '../redux/slices/orderSlice';

export default function OrderListPage() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { orders, loading, pagination, filters } = useSelector((state: RootState) => state.order);

  const queryParams = new URLSearchParams({
    page: pagination.page.toString(),
    limit: pagination.limit.toString(),
    ...(filters.status && { status: filters.status }),
    ...(filters.dateRange.start && { startDate: filters.dateRange.start }),
    ...(filters.dateRange.end && { endDate: filters.dateRange.end }),
  });

  const { data: ordersData, loading: fetchLoading } = useFetch(`/orders?${queryParams}`);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Mock orders data - in real app, this would come from API
    const mockOrders = {
      data: [
        {
          id: 'ORD-001',
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
                description: 'High-quality wireless headphones',
                image: 'https://via.placeholder.com/150',
                category: 'electronics',
                inStock: true,
              },
            },
          ],
          total: 59.98,
          status: 'delivered' as const,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-18T14:20:00Z',
          shippingAddress: {
            id: '1',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'US',
            isDefault: true,
          },
          paymentMethod: {
            id: '1',
            type: 'credit_card' as const,
            last4: '4242',
            isDefault: true,
          },
        },
        {
          id: 'ORD-002',
          userId: user?.id || '1',
          items: [
            {
              id: '2',
              productId: 'prod-2',
              quantity: 1,
              price: 89.99,
              product: {
                id: 'prod-2',
                name: 'Smart Watch',
                price: 89.99,
                description: 'Feature-rich smartwatch',
                image: 'https://via.placeholder.com/150',
                category: 'electronics',
                inStock: true,
              },
            },
          ],
          total: 89.99,
          status: 'shipped' as const,
          createdAt: '2024-01-20T09:15:00Z',
          updatedAt: '2024-01-21T16:45:00Z',
          shippingAddress: {
            id: '1',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'US',
            isDefault: true,
          },
          paymentMethod: {
            id: '1',
            type: 'credit_card' as const,
            last4: '4242',
            isDefault: true,
          },
        },
      ],
      total: 2,
      page: 1,
      limit: 10,
      totalPages: 1,
    };

    dispatch(setOrders(mockOrders));
  }, [isAuthenticated, dispatch, user]);

  const handleViewDetails = (order: any) => {
    window.location.href = `/order-detail?id=${order.id}`;
  };

  const handleCancelOrder = async (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      // Simulate API call
      setTimeout(() => {
        dispatch(updateOrderStatus({ orderId, status: 'cancelled' }));
      }, 1000);
    }
  };

  const handleReorder = (order: any) => {
    // Add items to cart and redirect to checkout
    localStorage.setItem('cart_data', JSON.stringify(order.items));
    window.location.href = '/checkout';
  };

  const handleFilterChange = (filterType: string, value: string | { start: string; end: string }) => {
    dispatch(updateFilters({ [filterType]: value }));
    dispatch(setPage(1));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Order History - E-commerce"
        user={user || undefined}
        onLogin={() => window.location.href = '/login'}
        onLogout={() => {}}
        onProfileClick={() => window.location.href = '/profile'}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
          <Button onClick={() => window.location.href = '/'}>
            Continue Shopping
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Orders List */}
        {loading || fetchLoading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" text="Loading orders..." />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Button onClick={() => window.location.href = '/plp'}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onViewDetails={handleViewDetails}
                  onCancelOrder={handleCancelOrder}
                  onReorder={handleReorder}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === pagination.page ? 'primary' : 'outline'}
                    onClick={() => handlePageChange(page)}
                    size="sm"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
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
