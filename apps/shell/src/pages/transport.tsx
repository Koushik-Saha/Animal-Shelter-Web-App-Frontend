import React from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import TransportTracker from '@/components/transport/TransportTracker';

const TransportPage: NextPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <TransportTracker />
    </motion.div>
  );
};

export default TransportPage;