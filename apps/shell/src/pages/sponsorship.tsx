import React from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import SponsorshipPlatform from '@/components/sponsorship/SponsorshipPlatform';

const SponsorshipPage: NextPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <SponsorshipPlatform />
    </motion.div>
  );
};

export default SponsorshipPage;