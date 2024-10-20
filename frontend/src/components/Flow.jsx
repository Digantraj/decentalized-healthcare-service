import React from 'react';
import { motion } from 'framer-motion';

function Flow() {
  const buttonVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  };

  return (
    <div className="flex mt-5 items-center justify-center space-x-10">
      <div className="flex items-center">
        <motion.div className="bg-blue-200 text-black font-bold py-2 px-4 rounded-lg shadow-md" variants={buttonVariants} animate="animate">
          Start
        </motion.div>
        <div className="mx-4 text-white text-xl">→</div>
        <motion.div className="bg-blue-200 text-black font-bold py-2 px-4 rounded-lg shadow-md" variants={buttonVariants} animate="animate">
          Store in MongoDB
        </motion.div>
        <div className="mx-4 text-white text-xl">→</div>
        <motion.div className="bg-blue-200 text-black font-bold py-2 px-4 rounded-lg shadow-md" variants={buttonVariants} animate="animate">
          Pin to IPFS via Pinata
        </motion.div>
        <div className="mx-4 text-white text-xl">→</div>
        <motion.div className="bg-blue-200 text-black font-bold py-2 px-4 rounded-lg shadow-md" variants={buttonVariants} animate="animate">
          Store on Ethereum
        </motion.div>
        <div className="mx-4 text-white text-xl">→</div>
        <motion.div className="bg-blue-200 text-black font-bold py-2 px-4 rounded-lg shadow-md" variants={buttonVariants} animate="animate">
          Convert to Hash
        </motion.div>
        <div className="mx-4 text-white text-xl">→</div>
        <motion.div className="bg-blue-200 text-black font-bold py-2 px-4 rounded-lg shadow-md" variants={buttonVariants} animate="animate">
          Compare Hash
        </motion.div>
        <div className="mx-4 text-white text-xl">→</div>
        <motion.div className="bg-blue-200 text-black font-bold py-2 px-4 rounded-lg shadow-md" variants={buttonVariants} animate="animate">
          End
        </motion.div>
      </div>
    </div>
  );
}

export default Flow;
