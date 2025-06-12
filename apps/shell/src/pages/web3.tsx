import React from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import Web3DonationPlatform from '@/components/web3/Web3DonationPlatform';

const Web3Page: NextPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Web3DonationPlatform />
    </motion.div>
  );
};

export default Web3Page;