import React from 'react';
import { useDispatch } from 'react-redux';
import { Product, Button, Card, formatCurrency } from 'frontend-common';
import { addToCart } from '../redux/slices/cartSlice';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between mt-4">
        <div>
          <h3 className="text-sm text-gray-700 font-medium mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2 line-clamp-2">
            {product.description}
          </p>
          <p className="text-lg font-medium text-gray-900">
            {formatCurrency(product.price)}
          </p>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Category: {product.category}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleViewDetails}
              className="flex-1"
            >
              View Details
            </Button>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
