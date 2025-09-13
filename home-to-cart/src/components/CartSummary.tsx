import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, formatCurrency } from 'frontend-common';
import { RootState } from '../redux/store';
import { updateQuantity, removeFromCart } from '../redux/slices/cartSlice';

interface CartSummaryProps {
  onCheckout?: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const dispatch = useDispatch();
  const { items, total, itemCount } = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="h-16 w-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.product.name}</h4>
              <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium">Total ({itemCount} items):</span>
          <span className="text-xl font-bold">{formatCurrency(total)}</span>
        </div>
        
        {onCheckout && (
          <Button onClick={onCheckout} className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        )}
      </div>
    </div>
  );
};
