import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Chip,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Grid,
} from '@mui/material';
import {
  PhoneAndroid,
  Download,
  Sync,
  Notifications,
  Storage,
  Delete,
  Update,
  Wifi,
  WifiOff,
  CheckCircle,
  Warning,
  Info,
  CloudSync,
  ClearAll,
  Settings,
  Security,
  Speed,
  InstallMobile,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { usePWA } from '@/hooks/usePWA';

interface PWASettingsProps {
  compact?: boolean;
}

const PWASettings: React.FC<PWASettingsProps> = ({ compact = false }) => {
  const {
    isOnline,
    isInstallable,
    isInstalled,
    isUpdateAvailable,
    syncStatus,
    cacheInfo,
    installPWA,
    updateServiceWorker,
    clearCache,
    requestNotificationPermission,
    subscribeToPush,
    requestBackgroundSync,
    formatCacheSize,
    getOfflineDataStatus,
  } = usePWA();

  const [notifications, setNotifications] = useState(false);
  const [backgroundSync, setBackgroundSync] = useState(true);
  const [offlineData, setOfflineData] = useState(false);
  const [clearCacheDialogOpen, setClearCacheDialogOpen] = useState(false);
  const [offlineStatus, setOfflineStatus] = useState({
    hasAnimals: false,
    hasVolunteers: false,
    hasEvents: false,
    lastSync: null as Date | null,
  });

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setNotifications(Notification.permission === 'granted');
    }

    // Check offline data status
    getOfflineDataStatus().then(status => {
      setOfflineStatus(status);
      setOfflineData(status.hasAnimals || status.hasVolunteers || status.hasEvents);
    });
  }, [getOfflineDataStatus]);

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        await subscribeToPush();
        setNotifications(true);
      }
    } else {
      setNotifications(false);
      // Unsubscribe from push notifications
      // This would typically involve calling an API to remove the subscription
    }
  };

  const handleBackgroundSyncToggle = (enabled: boolean) => {
    setBackgroundSync(enabled);
    localStorage.setItem('backgroundSyncEnabled', enabled.toString());
  };

  const handleClearCache = async () => {
    await clearCache();
    setClearCacheDialogOpen(false);
    setOfflineData(false);
    setOfflineStatus({
      hasAnimals: false,
      hasVolunteers: false,
      hasEvents: false,
      lastSync: null,
    });
  };

  const handleManualSync = async () => {
    await requestBackgroundSync('manual-sync');
  };

  const getInstallationStatus = () => {
    if (isInstalled) {
      return { text: 'Installed', color: 'success' as const, icon: <CheckCircle /> };
    } else if (isInstallable) {
      return { text: 'Ready to Install', color: 'primary' as const, icon: <Download /> };
    } else {
      return { text: 'Not Available', color: 'default' as const, icon: <PhoneAndroid /> };
    }
  };

  const getSyncStatusInfo = () => {
    switch (syncStatus) {
      case 'syncing':
        return { text: 'Syncing...', color: 'info' as const, icon: <Sync className="animate-spin" /> };
      case 'completed':
        return { text: 'Synced', color: 'success' as const, icon: <CheckCircle /> };
      case 'failed':
        return { text: 'Sync Failed', color: 'error' as const, icon: <Warning /> };
      default:
        return { text: 'Ready', color: 'default' as const, icon: <CloudSync /> };
    }
  };

  const installStatus = getInstallationStatus();
  const syncStatusInfo = getSyncStatusInfo();

  if (compact) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            PWA Status
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {isOnline ? <Wifi color="success" /> : <WifiOff color="error" />}
            <Typography variant="body2">
              {isOnline ? 'Online' : 'Offline'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip 
              label={installStatus.text}
              color={installStatus.color}
              size="small"
              icon={installStatus.icon}
            />
            <Chip 
              label={syncStatusInfo.text}
              color={syncStatusInfo.color}
              size="small"
              icon={syncStatusInfo.icon}
            />
            {offlineData && (
              <Chip 
                label="Offline Data"
                color="info"
                size="small"
                icon={<Storage />}
              />
            )}
          </Box>

          {isInstallable && (
            <Button
              variant="contained"
              size="small"
              onClick={installPWA}
              startIcon={<Download />}
              fullWidth
            >
              Install App
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Progressive Web App Settings
      </Typography>
      
      <Grid container spacing={3}>
        {/* Connection Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Connection Status
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <motion.div
                  animate={{ 
                    scale: isOnline ? 1 : [1, 1.1, 1],
                    rotate: isOnline ? 0 : [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: isOnline ? 0.3 : 1,
                    repeat: isOnline ? 0 : Infinity,
                    repeatDelay: 2
                  }}
                >
                  {isOnline ? (
                    <Wifi sx={{ fontSize: 40, color: 'success.main' }} />
                  ) : (
                    <WifiOff sx={{ fontSize: 40, color: 'error.main' }} />
                  )}
                </motion.div>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {isOnline ? 'Online' : 'Offline'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isOnline 
                      ? 'All features available'
                      : 'Limited functionality'
                    }
                  </Typography>
                </Box>
              </Box>

              {!isOnline && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  You're currently offline. Some features may be limited, but cached content is still available.
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label={syncStatusInfo.text}
                  color={syncStatusInfo.color}
                  icon={syncStatusInfo.icon}
                />
                {syncStatus === 'syncing' && (
                  <LinearProgress sx={{ width: '100%', mt: 1 }} />
                )}
              </Box>
            </CardContent>
            
            <CardActions>
              <Button
                onClick={handleManualSync}
                disabled={!isOnline || syncStatus === 'syncing'}
                startIcon={<Sync />}
              >
                Sync Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* App Installation */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                App Installation
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <InstallMobile sx={{ fontSize: 40, color: installStatus.color + '.main' }} />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {installStatus.text}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isInstalled 
                      ? 'App is installed on this device'
                      : isInstallable
                      ? 'Install for better performance'
                      : 'Installation not supported'
                    }
                  </Typography>
                </Box>
              </Box>

              {isInstalled && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Great! You're using the installed version of the app for optimal performance.
                </Alert>
              )}

              {isUpdateAvailable && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  A new version is available. Update to get the latest features.
                </Alert>
              )}
            </CardContent>
            
            <CardActions>
              {isInstallable && (
                <Button
                  variant="contained"
                  onClick={installPWA}
                  startIcon={<Download />}
                >
                  Install App
                </Button>
              )}
              {isUpdateAvailable && (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={updateServiceWorker}
                  startIcon={<Update />}
                >
                  Update Now
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>

        {/* Offline Data & Cache */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Offline Data & Cache
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" gutterBottom>
                  Cache Size: {formatCacheSize(cacheInfo.size)}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {cacheInfo.itemCount} cached items
                </Typography>
                {cacheInfo.lastUpdate && (
                  <Typography variant="body2" color="text.secondary">
                    Last updated: {cacheInfo.lastUpdate.toLocaleString()}
                  </Typography>
                )}
              </Box>

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Available Offline Content
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Storage color={offlineStatus.hasAnimals ? 'success' : 'disabled'} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Animal Data"
                    secondary={offlineStatus.hasAnimals ? 'Available offline' : 'Not cached'}
                  />
                  <ListItemSecondaryAction>
                    <Chip 
                      label={offlineStatus.hasAnimals ? 'Cached' : 'None'}
                      size="small"
                      color={offlineStatus.hasAnimals ? 'success' : 'default'}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Storage color={offlineStatus.hasVolunteers ? 'success' : 'disabled'} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Volunteer Data"
                    secondary={offlineStatus.hasVolunteers ? 'Available offline' : 'Not cached'}
                  />
                  <ListItemSecondaryAction>
                    <Chip 
                      label={offlineStatus.hasVolunteers ? 'Cached' : 'None'}
                      size="small"
                      color={offlineStatus.hasVolunteers ? 'success' : 'default'}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Storage color={offlineStatus.hasEvents ? 'success' : 'disabled'} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Event Data"
                    secondary={offlineStatus.hasEvents ? 'Available offline' : 'Not cached'}
                  />
                  <ListItemSecondaryAction>
                    <Chip 
                      label={offlineStatus.hasEvents ? 'Cached' : 'None'}
                      size="small"
                      color={offlineStatus.hasEvents ? 'success' : 'default'}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>

              {offlineStatus.lastSync && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Last sync: {offlineStatus.lastSync.toLocaleString()}
                </Typography>
              )}
            </CardContent>
            
            <CardActions>
              <Button
                color="error"
                onClick={() => setClearCacheDialogOpen(true)}
                startIcon={<Delete />}
                disabled={cacheInfo.itemCount === 0}
              >
                Clear Cache
              </Button>
              <Button
                onClick={handleManualSync}
                disabled={!isOnline}
                startIcon={<Sync />}
              >
                Refresh Data
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Notifications
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications}
                    onChange={(e) => handleNotificationToggle(e.target.checked)}
                  />
                }
                label="Push Notifications"
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Receive notifications about important updates, emergencies, and reminders.
              </Typography>

              {notifications && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  You'll receive notifications for important updates.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Background Sync Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Background Sync
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={backgroundSync}
                    onChange={(e) => handleBackgroundSyncToggle(e.target.checked)}
                  />
                }
                label="Background Sync"
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Automatically sync data when connection is restored after being offline.
              </Typography>

              {backgroundSync && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Actions performed offline will sync automatically when online.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Clear Cache Confirmation Dialog */}
      <Dialog
        open={clearCacheDialogOpen}
        onClose={() => setClearCacheDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Clear All Cache?</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            This will remove all cached data ({formatCacheSize(cacheInfo.size)}) and offline content.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You'll need to be online to reload the data. This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearCacheDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleClearCache}
            color="error"
            variant="contained"
            startIcon={<ClearAll />}
          >
            Clear Cache
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default PWASettings;