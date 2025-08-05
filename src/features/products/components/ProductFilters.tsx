'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, DollarSign, Tag, RotateCcw, Sparkles } from 'lucide-react';
import { ProductFilters as Filters } from '@/types';
import { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface ProductFiltersProps {
  filters: Filters;
  categories: string[];
  onFiltersChange: (filters: Partial<Filters>) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  filters,
  categories,
  onFiltersChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const hasActiveFilters = 
    filters.category || 
    filters.minPrice !== undefined || 
    filters.maxPrice !== undefined || 
    filters.isActive !== undefined;

  useEffect(() => {
    const minPrice = filters.minPrice || 0;
    const maxPrice = filters.maxPrice || 5000;
    setPriceRange([minPrice, maxPrice]);
  }, [filters.minPrice, filters.maxPrice]);

  const handlePriceChange = (value: number | number[]) => {
    const [min, max] = value as [number, number];
    setPriceRange([min, max]);
    onFiltersChange({
      minPrice: min > 0 ? min : undefined,
      maxPrice: max < 5000 ? max : undefined,
    });
  };

  return (
    <>
      {/* Fixed Mobile/Tablet Filter Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed right-4 bottom-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center"
      >
        <Filter size={20} />
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-yellow-400 text-purple-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
            >
              {[filters.category, filters.minPrice, filters.maxPrice, filters.isActive].filter(Boolean).length}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Desktop Sidebar & Mobile Overlay */}
      <div className="lg:block">
        {/* Mobile Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Filter Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          className={`fixed right-0 top-4 bottom-4 w-80 z-50 lg:fixed lg:right-8 lg:top-20 lg:w-96 lg:max-w-[25%] transition-transform duration-300 ${
            isOpen ? 'right-1 translate-x-0 lg:translate-x-0' : 'translate-x-full lg:translate-x-0'
          } lg:block`}
        >
          <div className="h-full overflow-y-auto custom-scrollbar">
            <div className="h-full bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Smart Filters
                  </h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <AnimatePresence>
                    {hasActiveFilters && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClearFilters}
                        className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-all duration-200"
                      >
                        <RotateCcw size={12} />
                        Clear
                      </motion.button>
                    )}
                  </AnimatePresence>
                  
                  <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {/* Category Filter */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-purple-600" />
                    <label className="text-sm font-bold text-gray-800">
                      Category
                    </label>
                  </div>
                  <select
                    value={filters.category}
                    onChange={(e) => onFiltersChange({ category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-medium"
                  >
                    <option value="">🌟 All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Price Range Slider */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <label className="text-sm font-bold text-gray-800">
                      Price Range
                    </label>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-purple-100">
                    <div className="mb-6">
                      <Slider
                        range
                        min={0}
                        max={5000}
                        value={priceRange}
                        onChange={handlePriceChange}
                        trackStyle={[
                          {
                            background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
                            height: 6,
                          }
                        ]}
                        handleStyle={[
                          {
                            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                            border: '3px solid white',
                            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                            width: 20,
                            height: 20,
                          },
                          {
                            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                            border: '3px solid white',
                            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                            width: 20,
                            height: 20,
                          }
                        ]}
                        railStyle={{
                          background: '#e5e7eb',
                          height: 6,
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-lg">
                        ${priceRange[0]}
                      </div>
                      <div className="text-gray-400">to</div>
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-lg">
                        ${priceRange[1]}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Status Filter with Radio Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
                    <label className="text-sm font-bold text-gray-800">
                      Product Status
                    </label>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { label: '🌟 All Products', value: undefined },
                      { label: '✅ Active Only', value: true },
                      { label: '❌ Inactive Only', value: false },
                    ].map((option, index) => (
                      <motion.label
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          filters.isActive === option.value
                            ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300 shadow-md'
                            : 'bg-white/60 backdrop-blur border border-gray-200 hover:bg-white/80 hover:border-purple-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          checked={filters.isActive === option.value}
                          onChange={() => onFiltersChange({ isActive: option.value })}
                          className="w-4 h-4 text-purple-600 border-2 border-purple-300 focus:ring-purple-500 focus:ring-2"
                        />
                        <span className={`font-medium ${
                          filters.isActive === option.value 
                            ? 'text-purple-800' 
                            : 'text-gray-700'
                        }`}>
                          {option.label}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* Active Filters Summary */}
                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-200"
                    >
                      <h4 className="text-sm font-bold text-purple-800 mb-2">Active Filters:</h4>
                      <div className="flex flex-wrap gap-2">
                        {filters.category && (
                          <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded-lg text-xs font-medium">
                            {filters.category}
                          </span>
                        )}
                        {(filters.minPrice || filters.maxPrice) && (
                          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-lg text-xs font-medium">
                            ${filters.minPrice || 0} - ${filters.maxPrice || 5000}
                          </span>
                        )}
                        {filters.isActive !== undefined && (
                          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
                            {filters.isActive ? 'Active' : 'Inactive'}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}