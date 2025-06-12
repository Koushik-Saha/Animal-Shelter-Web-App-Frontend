import React from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import LegalCompliance from '@/components/legal/LegalCompliance';

const LegalPage: NextPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <LegalCompliance />
    </motion.div>
  );
};

export default LegalPage;