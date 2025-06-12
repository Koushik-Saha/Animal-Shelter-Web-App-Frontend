import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Pets, Favorite, VolunteerActivism, TrendingUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';

const stats = [
  {
    icon: <Pets />,
    number: 1247,
    label: 'Animals Rescued',
    description: 'Total animals we\'ve helped this year',
    color: '#4CAF50',
  },
  {
    icon: <Favorite />,
    number: 956,
    label: 'Successful Adoptions',
    description: 'Happy families created',
    color: '#FF6B35',
  },
  {
    icon: <VolunteerActivism />,
    number: 150,
    label: 'Active Volunteers',
    description: 'Amazing people helping daily',
    color: '#2196F3',
  },
  {
    icon: <TrendingUp />,
    number: 95,
    label: 'Success Rate (%)',
    description: 'Animals finding homes',
    color: '#9C27B0',
  },
];

const CountUpNumber: React.FC<{ end: number; inView: boolean }> = ({ end, inView }) => {
  const { number } = useSpring({
    number: inView ? end : 0,
    config: { duration: 2000 },
  });

  return (
    <animated.span>
      {number.to(n => Math.floor(n).toLocaleString())}
    </animated.span>
  );
};

const StatsSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(255, 107, 53, 0.05))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
            Our Impact in Numbers
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 3,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: `${stat.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        color: stat.color,
                      }}
                    >
                      {React.cloneElement(stat.icon, { sx: { fontSize: 40 } })}
                    </Box>

                    <Typography
                      variant="h3"
                      component="div"
                      sx={{
                        fontWeight: 800,
                        color: stat.color,
                        mb: 1,
                        lineHeight: 1,
                      }}
                    >
                      <CountUpNumber end={stat.number} inView={inView} />
                      {stat.label.includes('%') && '%'}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 1,
                      }}
                    >
                      {stat.label}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.4 }}
                    >
                      {stat.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Progress Visualization */}
        <Box sx={{ mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ mb: 4, fontWeight: 600 }}
            >
              2024 Goals Progress
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Adoption Goal: 1,000 animals
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 12,
                      backgroundColor: 'grey.200',
                      borderRadius: 6,
                      overflow: 'hidden',
                      mb: 1,
                    }}
                  >
                    <motion.div
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #4CAF50, #81C784)',
                        borderRadius: 6,
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: '95.6%' } : { width: 0 }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    956 / 1,000 (95.6%)
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Volunteer Goal: 200 active volunteers
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 12,
                      backgroundColor: 'grey.200',
                      borderRadius: 6,
                      overflow: 'hidden',
                      mb: 1,
                    }}
                  >
                    <motion.div
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #FF6B35, #FF8A65)',
                        borderRadius: 6,
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: '75%' } : { width: 0 }}
                      transition={{ duration: 2, delay: 1.2 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    150 / 200 (75%)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default StatsSection;