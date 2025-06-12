import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Pets,
  Favorite,
  VolunteerActivism,
  AccountBalanceWallet,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { AnimatedButton } from '@shelter/ui';

const featuredAnimals = [
  {
    id: 1,
    name: 'Buddy',
    image: '/api/placeholder/300/200',
    breed: 'Golden Retriever',
    age: '2 years',
  },
  {
    id: 2,
    name: 'Luna',
    image: '/api/placeholder/300/200',
    breed: 'Tabby Cat',
    age: '1 year',
  },
  {
    id: 3,
    name: 'Charlie',
    image: '/api/placeholder/300/200',
    breed: 'Beagle Mix',
    age: '3 years',
  },
];

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentAnimal, setCurrentAnimal] = useState(0);

  const floatingAnimation = useSpring({
    transform: 'translateY(-10px)',
    from: { transform: 'translateY(10px)' },
    config: { duration: 3000 },
    loop: { reverse: true },
  });

  const counterAnimation = useSpring({
    from: { number: 0 },
    to: { number: 1247 },
    config: { duration: 2000 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimal((prev) => (prev + 1) % featuredAnimals.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create spotlight effect
    e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(76, 175, 80, 0.1) 0%, transparent 50%)`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #4CAF50 0%, #FF6B35 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Floating Animal Silhouettes */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          opacity: 0.1,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Pets sx={{ fontSize: 40 + Math.random() * 20, color: 'white' }} />
          </motion.div>
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  lineHeight: 1.1,
                  mb: 3,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Every Animal
                <br />
                <motion.span
                  style={{
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Deserves Love
                </motion.span>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Join our mission to find loving homes for animals in need. 
                Together, we can make a difference, one paw at a time.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <AnimatedButton
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                    },
                  }}
                  startIcon={<Pets />}
                  animationType="glow"
                  glowColor="#4CAF50"
                >
                  Adopt Now
                </AnimatedButton>

                <AnimatedButton
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  startIcon={<VolunteerActivism />}
                  animationType="bounce"
                >
                  Volunteer
                </AnimatedButton>
              </Box>

              {/* Statistics */}
              <Box sx={{ mt: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Box>
                  <animated.div>
                    <Typography
                      variant="h3"
                      sx={{ color: 'white', fontWeight: 700 }}
                    >
                      {counterAnimation.number.to(n => Math.floor(n))}+
                    </Typography>
                  </animated.div>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Animals Rescued
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="h3"
                    sx={{ color: 'white', fontWeight: 700 }}
                  >
                    956+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Happy Adoptions
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="h3"
                    sx={{ color: 'white', fontWeight: 700 }}
                  >
                    150+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Active Volunteers
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <animated.div style={floatingAnimation}>
                <Box
                  sx={{
                    position: 'relative',
                    maxWidth: 500,
                    mx: 'auto',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentAnimal}
                      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Card
                        sx={{
                          background: 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: 4,
                          overflow: 'hidden',
                          transform: 'perspective(1000px) rotateX(5deg)',
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="300"
                          image={featuredAnimals[currentAnimal].image}
                          alt={featuredAnimals[currentAnimal].name}
                          sx={{
                            filter: 'brightness(1.1) contrast(1.1)',
                          }}
                        />
                        <CardContent sx={{ p: 3 }}>
                          <Typography
                            variant="h5"
                            sx={{ color: 'white', fontWeight: 600, mb: 1 }}
                          >
                            {featuredAnimals[currentAnimal].name}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: 'rgba(255,255,255,0.8)' }}
                          >
                            {featuredAnimals[currentAnimal].breed} • {featuredAnimals[currentAnimal].age}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Indicators */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    {featuredAnimals.map((_, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentAnimal(index)}
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: index === currentAnimal ? 'white' : 'rgba(255,255,255,0.4)',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </animated.div>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;