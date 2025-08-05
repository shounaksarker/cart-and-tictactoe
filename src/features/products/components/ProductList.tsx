'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Package, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchProducts, 
  deleteProduct, 
  setFilters, 
  clearFilters, 
  setPage 
} from '@/store/slices/productSlice';

import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { ProductSearch } from './ProductSearch';
import { ProductPagination } from './ProductPagination';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { toast } from 'sonner';

export function ProductList() {
  const dispatch = useAppDispatch();
  const { 
    products, 
    loading, 
    error, 
    filters, 
    pagination, 
    categories 
  } = useAppSelector((state) => state.products);
    console.log('📛 👉 ~ ProductList ~ loading:', loading);

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    productId: string;
    productName: string;
  }>({
    isOpen: false,
    productId: '',
    productName: '',
  });

  useEffect(() => {
    dispatch(fetchProducts({
      page: pagination.page,
      limit: pagination.limit,
      filters,
    }));
  }, [dispatch, filters, pagination.limit, pagination.page]);

  const handleSearchChange = (search: string) => {
    dispatch(setFilters({ search }));
  };

  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    dispatch(setFilters(newFilters));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteDialog({
      isOpen: true,
      productId: id,
      productName: name,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteProduct(deleteDialog.productId)).unwrap();
      toast.success('Product deleted successfully');
      setDeleteDialog({ isOpen: false, productId: '', productName: '' });
      
      // Refresh the current page
      dispatch(fetchProducts({
        page: pagination.page,
        limit: pagination.limit,
        filters,
      }));
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, productId: '', productName: '' });
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg font-semibold mb-2">
          Error loading products
        </div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Main Content Container */}
              <div className="lg:max-w-[75%] px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Product Management
              </h1>
              <p className="text-gray-600">
                Manage your product inventory with ease
              </p>
            </div>
            <Link
              href="/products/create"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-sm"
            >
              <Plus size={20} />
              Add Product
            </Link>
          </div>

          <div className="mb-6">
            <ProductSearch
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search products by name..."
            />
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="pb-20 lg:pb-8">
          {loading && !products.length ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          ) : !products.length ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                {filters.search || filters.category || filters.minPrice || filters.maxPrice
                  ? "Try adjusting your search criteria"
                  : "Get started by adding your first product"}
              </p>
              <Link
                href="/products/create"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                <Plus size={20} />
                Add Your First Product
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onDelete={(id) => {
                        const product = products.find(p => p.id === id);
                        if (product) {
                          handleDeleteClick(id, product.name);
                        }
                      }}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              <ProductPagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>

      {/* Fixed Filter Sidebar */}
      <ProductFilters
        filters={filters}
        categories={categories}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        productName={deleteDialog.productName}
        loading={loading}
      />
    </div>
  );
}