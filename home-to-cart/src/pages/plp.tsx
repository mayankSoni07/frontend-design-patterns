import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Footer, Loader, Button, useFetch } from 'frontend-common';
import { ProductCard } from '../components';
import { RootState } from '../redux/store';
import { setProducts, updateFilters, setPage } from '../redux/slices/productSlice';

interface PLPPageProps {
  initialCategory?: string;
}

export default function PLPPage({ initialCategory }: PLPPageProps) {
  const dispatch = useDispatch();
  const { products, loading, pagination, filters } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);

  const queryParams = new URLSearchParams({
    page: pagination.page.toString(),
    limit: pagination.limit.toString(),
    ...(filters.category && { category: filters.category }),
    ...(filters.searchQuery && { search: filters.searchQuery }),
    ...(filters.inStock && { inStock: 'true' }),
  });

  const { data: productsData, loading: fetchLoading } = useFetch(`/products?${queryParams}`);

  useEffect(() => {
    if (initialCategory) {
      dispatch(updateFilters({ category: initialCategory }));
    }
  }, [initialCategory, dispatch]);

  useEffect(() => {
    if (productsData) {
      dispatch(setProducts(productsData));
    }
  }, [productsData, dispatch]);

  const handleSearch = () => {
    dispatch(updateFilters({ searchQuery }));
    dispatch(setPage(1));
  };

  const handleCategoryFilter = (category: string) => {
    dispatch(updateFilters({ category }));
    dispatch(setPage(1));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleProductClick = (product: any) => {
    window.location.href = `/pdp?id=${product.id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Products - E-commerce"
        user={user || undefined}
        onLogin={() => window.location.href = '/login'}
        onLogout={() => {}}
        onProfileClick={() => window.location.href = '/profile'}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Search</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={handleSearch} size="sm">
                  Search
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {['All', 'Electronics', 'Clothing', 'Home & Garden', 'Sports'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category === 'All' ? '' : category.toLowerCase())}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                      (category === 'All' && !filters.category) || 
                      filters.category === category.toLowerCase()
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Availability</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => dispatch(updateFilters({ inStock: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Products {filters.category && `- ${filters.category}`}
              </h1>
              <p className="text-sm text-gray-500">
                {pagination.total} products found
              </p>
            </div>

            {loading || fetchLoading ? (
              <div className="flex justify-center py-12">
                <Loader size="lg" text="Loading products..." />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={handleProductClick}
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
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.query;
  
  return {
    props: {
      initialCategory: category || null,
    },
  };
};
