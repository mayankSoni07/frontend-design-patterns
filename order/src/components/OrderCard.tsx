import React from 'react';
import { Order, Button, Card, formatCurrency, dateFormatter } from 'frontend-common';

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onCancelOrder?: (orderId: string) => void;
  onReorder?: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onViewDetails,
  onCancelOrder,
  onReorder,
}) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canCancel = order.status === 'pending' || order.status === 'processing';
  const canReorder = order.status === 'delivered' || order.status === 'cancelled';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
          <p className="text-sm text-gray-600">
            Placed on {dateFormatter(order.createdAt)}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {order.items.slice(0, 2).map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="h-12 w-12 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
        
        {order.items.length > 2 && (
          <p className="text-sm text-gray-600">
            +{order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          <p className="text-lg font-semibold text-gray-900">
            Total: {formatCurrency(order.total)}
          </p>
          <p className="text-sm text-gray-600">
            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(order)}
          >
            View Details
          </Button>
          
          {canReorder && onReorder && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReorder(order)}
            >
              Reorder
            </Button>
          )}
          
          {canCancel && onCancelOrder && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onCancelOrder(order.id)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
