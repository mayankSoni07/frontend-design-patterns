import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, Loader, Button, formatCurrency, useFetch } from 'frontend-common';
import { RootState } from '../redux/store';
import { setCurrentProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

interface PDPPageProps {
  productId: string;
}

export default function PDPPage({ productId }: PDPPageProps) {
  const dispatch = useDispatch();
  const { currentProduct, loading } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: productData, loading: fetchLoading } = useFetch(`/products/${productId}`);

  useEffect(() => {
    if (productData) {
      dispatch(setCurrentProduct(productData));
    }
  }, [productData, dispatch]);

  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart({ product: currentProduct, quantity }));
    }
  };

  const handleBuyNow = () => {
    if (currentProduct) {
      dispatch(addToCart({ product: currentProduct, quantity }));
      window.location.href = '/checkout';
    }
  };

  if (loading || fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Product Details" user={user || undefined} />
        <div className="flex justify-center py-12">
          <Loader size="lg" text="Loading product..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Product Not Found" user={user || undefined} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Button onClick={() => window.location.href = '/plp'}>
              Browse Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = [currentProduct.image, currentProduct.image, currentProduct.image]; // Mock multiple images

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Product Details - E-commerce"
        user={user || undefined}
        onLogin={() => window.location.href = '/login'}
        onLogout={() => {}}
        onProfileClick={() => window.location.href = '/profile'}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={images[selectedImage]}
                  alt={currentProduct.name}
                  className="h-96 w-full object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${currentProduct.name} ${index + 1}`}
                      className="h-20 w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{currentProduct.name}</h1>
                <p className="text-sm text-gray-500 mt-2">Category: {currentProduct.category}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(currentProduct.price)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  currentProduct.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {currentProduct.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{currentProduct.description}</p>
              </div>

              {currentProduct.inStock && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={handleAddToCart}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={handleBuyNow}
                      size="lg"
                      className="flex-1"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              )}

              {!currentProduct.inStock && (
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-600">This product is currently out of stock.</p>
                  <Button variant="outline" className="mt-2">
                    Notify When Available
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would typically fetch related products */}
            <div className="text-center py-8 col-span-full">
              <p className="text-gray-500">Related products would be displayed here</p>
            </div>
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
      productId: id,
    },
  };
};
