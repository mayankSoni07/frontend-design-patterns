import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, Loader, useFetch } from 'frontend-common';
import { ProductCard } from '../components';
import { RootState } from '../redux/store';
import { setProducts, setLoading } from '../redux/slices/productSlice';

export const HomeContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.product);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const { data: featuredProducts, loading: fetchLoading } = useFetch('/products?featured=true&limit=8');

  useEffect(() => {
    if (featuredProducts) {
      dispatch(setProducts(featuredProducts));
    }
  }, [featuredProducts, dispatch]);

  useEffect(() => {
    dispatch(setLoading(fetchLoading));
  }, [fetchLoading, dispatch]);

  const handleProductClick = (product: any) => {
    window.location.href = `/pdp?id=${product.id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Home - E-commerce"
        user={user || undefined}
        onLogin={() => window.location.href = '/login'}
        onLogout={() => {}}
        onProfileClick={() => window.location.href = '/profile'}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-xl mb-6">Discover amazing products at great prices</p>
          <button
            onClick={() => window.location.href = '/plp'}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </button>
        </div>

        {/* Featured Products */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader size="lg" text="Loading products..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleProductClick}
                />
              ))}
            </div>
          )}
        </section>

        {/* Categories Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Electronics', 'Clothing', 'Home & Garden', 'Sports'].map((category) => (
              <div
                key={category}
                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => window.location.href = `/plp?category=${category.toLowerCase()}`}
              >
                <h3 className="font-semibold text-center">{category}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};
