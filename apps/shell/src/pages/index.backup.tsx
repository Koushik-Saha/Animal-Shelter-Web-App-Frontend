import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip } from '@mui/material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Pets, Favorite, VolunteerActivism, TrendingUp } from '@mui/icons-material';
import HeroSection from '@/components/landing/HeroSection';
import FeaturedAnimals from '@/components/landing/FeaturedAnimals';
import StatsSection from '@/components/landing/StatsSection';
import CallToAction from '@/components/landing/CallToAction';
import ParticleBackground from '@/components/landing/ParticleBackground';

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParticleBackground />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Animals Section */}
      <Box sx={{ py: 8, position: 'relative', zIndex: 2 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              component="h2"
              textAlign="center"
              sx={{
                mb: 6,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #4CAF50, #FF6B35)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Meet Your New Best Friend
            </Typography>
          </motion.div>

          <FeaturedAnimals />
        </Container>
      </Box>

      {/* Statistics Section */}
      <StatsSection />

      {/* Success Stories */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              component="h2"
              textAlign="center"
              sx={{ mb: 6, fontWeight: 700 }}
            >
              Success Stories
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {[1, 2, 3].map((story, index) => (
              <Grid item xs={12} md={4} key={story}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(255, 107, 53, 0.1))',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <Favorite sx={{ color: 'white', fontSize: 30 }} />
                      </Box>

                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        Max's Journey Home
                      </Typography>

                      <Typography variant="body2" color="text.secondary" paragraph>
                        After 6 months in our care, Max found his forever family with the Johnson's. 
                        His new family sends us updates every month showing how happy he is!
                      </Typography>

                      <Chip
                        label="Happy Ending"
                        color="success"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <CallToAction />
    </motion.div>
  );
};

export default Home;