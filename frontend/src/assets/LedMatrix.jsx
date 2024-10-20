import React from 'react';
import { motion } from 'framer-motion';

const LedMatrix = () => {
  const rows = 10; 
  const columns = 10; 
  const ledSize = 30; 

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <motion.div
              key={columnIndex}
              className="m-1"
              style={{
                width: `${ledSize}px`,
                height: `${ledSize}px`,
                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                borderRadius: '50%', 
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LedMatrix;
