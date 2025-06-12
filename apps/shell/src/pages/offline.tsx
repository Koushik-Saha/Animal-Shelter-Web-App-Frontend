import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  WifiOff,
  Refresh,
  CloudOff,
  Pets,
  Info,
  CheckCircle,
  Schedule,
  Storage,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const OfflinePage: NextPage = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [cachedData, setCachedData] = useState({
    animals: 0,
    volunteers: 0,
    events: 0,
    size: '0 MB'
  });

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for service worker and cached data
    if ('serviceWorker' in navigator) {
      checkCachedData();
    }

    // Check last sync from localStorage
    const lastSyncTime = localStorage.getItem('lastSyncTime');
    if (lastSyncTime) {
      setLastSync(new Date(lastSyncTime));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkCachedData = async () => {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        let totalSize = 0;
        let itemCount = 0;

        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName);
          const requests = await cache.keys();
          itemCount += requests.length;
          
          // Estimate cache size (rough calculation)
          for (const request of requests.slice(0, 10)) { // Sample first 10
            try {
              const response = await cache.match(request);
              if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
              }
            } catch (error) {
              console.warn('Error calculating cache size:', error);
            }
          }
        }

        setCachedData({
          animals: Math.floor(itemCount * 0.3), // Estimate
          volunteers: Math.floor(itemCount * 0.1),
          events: Math.floor(itemCount * 0.05),
          size: `${(totalSize / 1024 / 1024).toFixed(1)} MB`
        });
      }
    } catch (error) {
      console.error('Error checking cached data:', error);
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    
    try {
      // Try to fetch a simple endpoint to check connectivity
      const response = await fetch('/api/health', { 
        method: 'GET',
        cache: 'no-cache'
      });
      
      if (response.ok) {
        // Redirect to home if online
        window.location.href = '/';
      }
    } catch (error) {
      console.log('Still offline');
    } finally {
      setIsRetrying(false);
    }
  };

  const availableFeatures = [
    {
      icon: <Pets />,
      title: 'View Cached Animals',
      description: 'Browse animals that were previously loaded',
      available: cachedData.animals > 0
    },
    {
      icon: <Schedule />,
      title: 'View Cached Events',
      description: 'See previously loaded events and schedules',
      available: cachedData.events > 0
    },
    {
      icon: <Storage />,
      title: 'Offline Forms',
      description: 'Fill out forms that will sync when online',
      available: true
    },
    {
      icon: <Info />,
      title: 'View Policies',
      description: 'Access cached policies and procedures',
      available: true
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Offline Status Header */}
        <Box sx={{ mb: 4 }}>
          <motion.div
            animate={{ 
              rotate: isOnline ? 0 : [0, -10, 10, 0],
              scale: isOnline ? 1 : [1, 1.1, 1]
            }}
            transition={{ 
              duration: isOnline ? 0.3 : 2,
              repeat: isOnline ? 0 : Infinity,
              repeatDelay: 3
            }}
          >
            {isOnline ? (
              <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            ) : (
              <WifiOff sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
            )}
          </motion.div>
          
          <Typography variant="h3" fontWeight={700} gutterBottom>
            {isOnline ? 'Back Online!' : 'You\'re Offline'}
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            {isOnline 
              ? 'Your connection has been restored'
              : 'No internet connection detected'
            }
          </Typography>

          {isOnline ? (
            <Alert severity="success" sx={{ mb: 3 }}>
              Connection restored! You can now access all features.
            </Alert>
          ) : (
            <Alert severity="warning" sx={{ mb: 3 }}>
              Some features are limited while offline, but you can still access cached content.
            </Alert>
          )}
        </Box>

        {/* Action Buttons */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {isOnline ? (
            <Button
              variant="contained"
              size="large"
              onClick={() => window.location.href = '/'}
              startIcon={<CheckCircle />}
            >
              Continue to App
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                size="large"
                onClick={handleRetry}
                disabled={isRetrying}
                startIcon={isRetrying ? <CircularProgress size={20} /> : <Refresh />}
              >
                {isRetrying ? 'Checking...' : 'Try Again'}
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                onClick={() => window.location.href = '/'}
                startIcon={<CloudOff />}
              >
                Continue Offline
              </Button>
            </>
          )}
        </Box>

        {/* Offline Statistics */}
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Offline Data Available
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
                  <Chip 
                    label={`${cachedData.animals} Animals`} 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    label={`${cachedData.volunteers} Volunteers`} 
                    color="secondary" 
                    variant="outlined"
                  />
                  <Chip 
                    label={`${cachedData.events} Events`} 
                    color="info" 
                    variant="outlined"
                  />
                  <Chip 
                    label={`${cachedData.size} Cached`} 
                    color="success" 
                    variant="outlined"
                  />
                </Box>

                {lastSync && (
                  <Typography variant="body2" color="text.secondary">
                    Last synced: {lastSync.toLocaleString()}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Available Features */}
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Available Offline Features
                </Typography>
                
                <List>
                  {availableFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <ListItem>
                        <ListItemIcon>
                          <Box
                            sx={{
                              color: feature.available ? 'success.main' : 'text.disabled',
                              opacity: feature.available ? 1 : 0.5
                            }}
                          >
                            {feature.icon}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle1"
                              sx={{ 
                                color: feature.available ? 'text.primary' : 'text.disabled',
                                fontWeight: feature.available ? 600 : 400
                              }}
                            >
                              {feature.title}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              sx={{ color: feature.available ? 'text.secondary' : 'text.disabled' }}
                            >
                              {feature.description}
                            </Typography>
                          }
                        />
                        {feature.available && (
                          <Chip 
                            label="Available" 
                            size="small" 
                            color="success" 
                            variant="outlined"
                          />
                        )}
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Offline Tips */}
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Offline Tips
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                • Any forms you fill out will be saved and synced when you're back online
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                • You can still view and search through cached animal data
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                • Emergency contact information is always available offline
              </Typography>
              <Typography variant="body1" color="text.secondary">
                • The app will automatically sync when your connection is restored
              </Typography>
            </Box>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default OfflinePage;