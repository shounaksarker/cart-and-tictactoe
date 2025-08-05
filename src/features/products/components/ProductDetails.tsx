'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash2, Package, Tag, Calendar, DollarSign, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';
import { useState } from 'react';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface ProductDetailsProps {
  product: Product;
  onDelete?: (id: string) => void;
  loading?: boolean;
}

export function ProductDetails({ product, onDelete, loading = false }: ProductDetailsProps) {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(product.id);
    }
    setDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialog(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/products"
            className="p-2 bg-gray-400 hover:bg-gray-500 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Details</h1>
            <p className="text-gray-600">View complete product information</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
        >
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600?text=No+Image';
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              product.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
              {product.isActive ? 'Active' : 'Inactive'}
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/products/edit/${product.id}`}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit size={20} />
              </Link>
              {onDelete && (
                <button
                  onClick={handleDeleteClick}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Product Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className="text-xl font-bold text-gray-900">{product.stock}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Tag className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-500">Category</p>
              </div>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {product.category}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar size={20} />
              Timeline
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-gray-900 font-medium">
                  {new Date(product.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-gray-900 font-medium">
                  {new Date(product.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <DeleteConfirmDialog
        isOpen={deleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        productName={product.name}
        loading={loading}
      />
    </div>
  );
}