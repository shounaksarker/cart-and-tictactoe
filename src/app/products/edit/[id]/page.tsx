'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductById, updateProduct } from '@/store/slices/productSlice';
import { ProductForm } from '@/features/products/components/ProductForm';
import { ProductFormData } from '@/types';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  const [submitting, setSubmitting] = useState(false);

  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const product = products.find(p => p.id === productId);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, product]);

  const handleSubmit = async (data: ProductFormData) => {
    setSubmitting(true);
    try {
      await dispatch(updateProduct({ id: productId, data })).unwrap();
      toast.success('Product updated successfully!');
      router.push('/products');
    } catch (error) {
      toast.error('Failed to update product. Please try again.', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/products')}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      mode="edit"
      initialData={{
        name: product!.name,
        description: product!.description,
        price: product!.price,
        category: product!.category,
        stock: product!.stock,
        imageUrl: product!.imageUrl,
        tags: product!.tags,
        isActive: product!.isActive,
      }}
      onSubmit={handleSubmit}
      loading={submitting}
    />
  );
}