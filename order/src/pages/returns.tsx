import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, Button, Card, formatCurrency, dateFormatter, Loader } from 'frontend-common';
import { OrderStatusBadge } from '../components';
import { RootState } from '../redux/store';

interface ReturnRequest {
  id: string;
  orderId: string;
  items: Array<{
    id: string;
    productName: string;
    quantity: number;
    price: number;
    reason: string;
  }>;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestDate: string;
  refundAmount: number;
}

export default function ReturnsPage() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Mock returns data
    const mockReturns: ReturnRequest[] = [
      {
        id: 'RET-001',
        orderId: 'ORD-001',
        items: [
          {
            id: '1',
            productName: 'Wireless Headphones',
            quantity: 1,
            price: 29.99,
            reason: 'Defective item',
          },
        ],
        status: 'approved',
        requestDate: '2024-01-25T10:00:00Z',
        refundAmount: 29.99,
      },
      {
        id: 'RET-002',
        orderId: 'ORD-002',
        items: [
          {
            id: '2',
            productName: 'Smart Watch',
            quantity: 1,
            price: 89.99,
            reason: 'Changed mind',
          },
        ],
        status: 'pending',
        requestDate: '2024-01-28T14:30:00Z',
        refundAmount: 89.99,
      },
    ];

    setTimeout(() => {
      setReturns(mockReturns);
      setLoading(false);
    }, 1000);
  }, [isAuthenticated]);

  const getStatusColor = (status: ReturnRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Returns & Refunds - E-commerce"
        user={user || undefined}
        onLogin={() => window.location.href = '/login'}
        onLogout={() => {}}
        onProfileClick={() => window.location.href = '/profile'}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Returns & Refunds</h1>
          <Button onClick={() => window.location.href = '/order-list'}>
            View Orders
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" text="Loading returns..." />
          </div>
        ) : returns.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No returns found</h3>
            <p className="text-gray-600 mb-6">You haven't requested any returns yet.</p>
            <Button onClick={() => window.location.href = '/order-list'}>
              View Your Orders
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {returns.map((returnRequest) => (
              <Card key={returnRequest.id}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Return Request #{returnRequest.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Order #{returnRequest.orderId} • Requested on {dateFormatter(returnRequest.requestDate)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(returnRequest.status)}`}>
                    {returnRequest.status.charAt(0).toUpperCase() + returnRequest.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  {returnRequest.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.productName}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Reason: {item.reason}</p>
                      </div>
                      <p className="font-medium text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Refund Amount: {formatCurrency(returnRequest.refundAmount)}
                    </p>
                    {returnRequest.status === 'approved' && (
                      <p className="text-sm text-green-600">
                        Refund will be processed within 3-5 business days
                      </p>
                    )}
                    {returnRequest.status === 'completed' && (
                      <p className="text-sm text-blue-600">
                        Refund has been processed to your original payment method
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {returnRequest.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        Cancel Request
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Return Policy */}
        <Card title="Return Policy" className="mt-8">
          <div className="prose prose-sm max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Return Window</h4>
                <p className="text-gray-600 mb-4">
                  Items can be returned within 30 days of delivery for a full refund.
                </p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Condition Requirements</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Items must be in original condition</li>
                  <li>• Original packaging required</li>
                  <li>• All accessories included</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Refund Process</h4>
                <p className="text-gray-600 mb-4">
                  Refunds are processed within 3-5 business days after approval.
                </p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Non-Returnable Items</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Personalized items</li>
                  <li>• Perishable goods</li>
                  <li>• Digital downloads</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
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
