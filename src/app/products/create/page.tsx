'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { createProduct } from '@/store/slices/productSlice';
import { ProductForm } from '@/features/products/components/ProductForm';
import { ProductFormData } from '@/types';
import { toast } from 'sonner';
import { useState } from 'react';

export default function CreateProductPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      await dispatch(createProduct(data)).unwrap();
      toast.success('Product created successfully!');
      router.push('/products');
    } catch (error) {
      toast.error('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductForm
      mode="create"
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
}