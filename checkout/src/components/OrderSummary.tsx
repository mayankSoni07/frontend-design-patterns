import React from 'react';
import { useSelector } from 'react-redux';
import { Card, formatCurrency } from 'frontend-common';
import { RootState } from '../redux/store';

export const OrderSummary: React.FC = () => {
  const { cartItems, orderSummary } = useSelector((state: RootState) => state.checkout);

  return (
    <Card title="Order Summary">
      <div className="space-y-4">
        {/* Cart Items */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-12 w-12 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-sm font-medium text-gray-900">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Order Totals */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">{formatCurrency(orderSummary.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900">
              {orderSummary.shipping === 0 ? 'Free' : formatCurrency(orderSummary.shipping)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">{formatCurrency(orderSummary.tax)}</span>
          </div>
          <div className="flex justify-between text-base font-medium border-t pt-2">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">{formatCurrency(orderSummary.total)}</span>
          </div>
        </div>

        {orderSummary.shipping === 0 && orderSummary.subtotal > 50 && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-green-800 text-sm">
              🎉 You qualify for free shipping!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
