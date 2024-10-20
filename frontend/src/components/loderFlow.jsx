import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // List of steps to display
  const steps = [
    'Start',
    'Store in MongoDB',
    'Pin to IPFS via Pinata',
    'Store on Ethereum',
    'Convert to Hash',
    'Compare Hashes',
    'End',
  ];

  // Step and Arrow animation variants
  const stepVariant = {
    active: { scale: 1.3, opacity: 1, filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))' },
    inactive: { scale: 0.9, opacity: 0.6, filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' },
  };

  const arrowVariant = {
    active: { scale: 1.3, opacity: 1, filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))' },
    inactive: { scale: 0.9, opacity: 0.6, filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' },
  };

  // Cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500); // Change steps every 1.5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex md:flex-col flex-row items-center justify-center min-h-screen bg-gradient-to-r  animate-gradient-x">
      <div className="flex items-center   max-w-[98%] space-x-1 sm:space-x-2 lg:space-x-2">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Step Animation */}
            <motion.div
              className="step  bg-gradient-to-r from-blue-400 to-blue-600 text-white py-1 px-2 sm:py-3 sm:px-6 rounded-lg text-lg sm:text-1xl font-bold shadow-lg"
              variants={stepVariant}
              animate={index === currentStep ? 'active' : 'inactive'}
              transition={{ duration: 0.5 }}
            >
              {step}
            </motion.div>

            {/* Arrow, only show arrow if it's not the last step */}
            {index < steps.length - 1 && (
              <motion.div
                className="arrow text-white text-4xl sm:text-6xl font-bold"
                variants={arrowVariant}
                animate={index === currentStep ? 'active' : 'inactive'}
                transition={{ duration: 0.5 }}
              >
                →
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Loader;
