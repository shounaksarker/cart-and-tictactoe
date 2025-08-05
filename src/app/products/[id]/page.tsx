'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductById, deleteProduct } from '@/store/slices/productSlice';
import { ProductDetails } from '@/features/products/components/ProductDetails';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  const [deleting, setDeleting] = useState(false);

  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const product = products.find(p => p.id === productId);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, product]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success('Product deleted successfully!');
      router.push('/products');
    } catch (error) {
      toast.error('Failed to delete product. Please try again.', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      setDeleting(false);
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
    <ProductDetails
      product={product!}
      onDelete={handleDelete}
      loading={deleting}
    />
  );
}