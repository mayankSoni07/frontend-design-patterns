import React from 'react';
import { Order } from 'frontend-common';

interface OrderStatusBadgeProps {
  status: Order['status'];
  size?: 'sm' | 'md' | 'lg';
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ 
  status, 
  size = 'md' 
}) => {
  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: '⏳',
          label: 'Pending'
        };
      case 'processing':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: '⚙️',
          label: 'Processing'
        };
      case 'shipped':
        return {
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: '🚚',
          label: 'Shipped'
        };
      case 'delivered':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: '✅',
          label: 'Delivered'
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: '❌',
          label: 'Cancelled'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '❓',
          label: 'Unknown'
        };
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${config.color} ${sizeClasses[size]}`}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </span>
  );
};
