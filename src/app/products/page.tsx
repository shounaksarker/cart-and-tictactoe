'use client';

import { motion } from 'framer-motion';

export default function ProductsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Products CRUD
        </h1>
        <p className="text-gray-600 text-lg">
          Assignment 2 - Coming Soon
        </p>
      </div>
    </motion.div>
  );
}