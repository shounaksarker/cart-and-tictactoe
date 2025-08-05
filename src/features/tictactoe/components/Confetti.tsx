'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Confetti() {
  const [particles, setParticles] = useState<Array<{ id: number; color: string; x: number; delay: number }>>([]);
  
  useEffect(() => {
    const colors = ['#9333ea', '#3b82f6', '#f59e0b', '#ef4444', '#10b981'];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            y: -20,
            x: `${particle.x}vw`,
            opacity: 1,
            rotate: 0,
          }}
          animate={{ 
            y: '100vh',
            rotate: 360,
            opacity: 0,
          }}
          transition={{ 
            duration: 3,
            delay: particle.delay,
            ease: 'linear',
          }}
          className="absolute w-3 h-3"
          style={{ 
            backgroundColor: particle.color,
            left: 0,
          }}
        />
      ))}
    </div>
  );
}