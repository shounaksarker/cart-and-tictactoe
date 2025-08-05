'use client';

import { ReactNode } from 'react';
import { Navigation } from '@/components/navigation/Navigation';
import { motion } from 'framer-motion';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        {children}
      </motion.main>
    </div>
  );
}