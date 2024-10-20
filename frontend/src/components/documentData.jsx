import React from 'react';
import { motion } from 'framer-motion';

const DocumentData = () => {
  // Animation for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.05 },
  };

  const steps = [
    {
      title: 'Step 1: Store Data in MongoDB',
      description: 'The collected data, including patient details like blood pressure, oxygen rate, and heartbeat, are stored in MongoDB in a structured format using a specific schema.',
    },
    {
      title: 'Step 2: Pin to IPFS via Pinata',
      description: 'The data is then sent to IPFS for decentralized storage. Using Pinata, we pin the data and retrieve a unique CID (Content Identifier) for the stored data.',
    },
    {
      title: 'Step 3: Store CID on Ethereum',
      description: 'The CID obtained from IPFS is then stored on the Ethereum blockchain using Infura (or Etherlink). This ensures the immutability and decentralization of the CID data.',
    },
    {
      title: 'Step 4: Convert to SHA-256 Hash',
      description: 'To ensure data integrity, the CID is hashed using the SHA-256 algorithm. This hash is compared with the corresponding hash of the original data stored in MongoDB’s third schema.',
    },
    {
      title: 'Step 5: Compare Hashes',
      description: 'The hash generated from the CID is compared with the stored hash in MongoDB. If they match, it confirms that the data remains unchanged and secure.',
    },
    {
      title: 'Step 6: Compare Hashes and Fetch Data',
      description: 'The hash get  from the CID is compared with the stored hash in MongoDB. If they match, it confirms that the data remains data is secure and if not confirm then data is unthorized.',
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Project Guidlines</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg  cursor-pointer rounded-lg p-6 backdrop-filter backdrop-blur-lg border border-gray-200"
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
            <p className="text-gray-700">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DocumentData;
