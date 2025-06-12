import React from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import ComplaintReporting from '@/components/reporting/ComplaintReporting';

const ReportingPage: NextPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <ComplaintReporting />
    </motion.div>
  );
};

export default ReportingPage;