import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Snackbar,
  Alert,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Pets,
  LocalHospital,
  VolunteerActivism,
  AccountBalanceWallet,
  AdminPanelSettings,
  Notifications,
  AccountCircle,
  Brightness4,
  Brightness7,
  Psychology,
  Token,
  Report,
  LocalShipping,
  Gavel,
  WifiOff,
  CloudOff,
  Download,
  Update,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usePWA } from '@/hooks/usePWA';

interface LayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'Adopt', icon: <Pets />, path: '/adopt' },
  { text: 'Medical', icon: <LocalHospital />, path: '/medical' },
  { text: 'Behavior', icon: <Psychology />, path: '/behavior' },
  { text: 'Volunteer', icon: <VolunteerActivism />, path: '/volunteer' },
  { text: 'Donate', icon: <AccountBalanceWallet />, path: '/donate' },
  { text: 'Web3', icon: <Token />, path: '/web3' },
  { text: 'Transport', icon: <LocalShipping />, path: '/transport' },
  { text: 'Reporting', icon: <Report />, path: '/reporting' },
  { text: 'Legal', icon: <Gavel />, path: '/legal' },
  { text: 'Admin', icon: <AdminPanelSettings />, path: '/admin' },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [offlineSnackbarOpen, setOfflineSnackbarOpen] = useState(false);
  const [updateSnackbarOpen, setUpdateSnackbarOpen] = useState(false);
  const [installSnackbarOpen, setInstallSnackbarOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  
  const {
    isOnline,
    isInstallable,
    isUpdateAvailable,
    installPWA,
    updateServiceWorker,
  } = usePWA();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const scrollProgress = 0; // This would be calculated from scroll position

  // PWA event handlers
  useEffect(() => {
    // Handle online/offline status
    if (!isOnline && !offlineSnackbarOpen) {
      setOfflineSnackbarOpen(true);
    } else if (isOnline && offlineSnackbarOpen) {
      setOfflineSnackbarOpen(false);
    }
  }, [isOnline, offlineSnackbarOpen]);

  useEffect(() => {
    // Show install prompt
    if (isInstallable && !installSnackbarOpen) {
      // Delay showing install prompt to avoid being too aggressive
      const timer = setTimeout(() => {
        setInstallSnackbarOpen(true);
      }, 10000); // Show after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [isInstallable, installSnackbarOpen]);

  useEffect(() => {
    // Show update notification
    if (isUpdateAvailable && !updateSnackbarOpen) {
      setUpdateSnackbarOpen(true);
    }
  }, [isUpdateAvailable, updateSnackbarOpen]);

  const handleInstallApp = async () => {
    await installPWA();
    setInstallSnackbarOpen(false);
  };

  const handleUpdateApp = async () => {
    await updateServiceWorker();
    setUpdateSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #4CAF50, #FF6B35)',
          transformOrigin: '0% 50%',
          zIndex: 1300,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
      />

      {/* App Bar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          color: 'text.primary',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #4CAF50, #FF6B35)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => router.push('/')}
            >
              PawShelter
            </Typography>
          </motion.div>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navigationItems.map((item) => (
                <Link key={item.path} href={item.path} passHref>
                  <Button
                    component={motion.a}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    startIcon={item.icon}
                    sx={{
                      color: router.pathname === item.path ? 'primary.main' : 'text.primary',
                      fontWeight: router.pathname === item.path ? 600 : 400,
                      '&:hover': {
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                </Link>
              ))}
            </Box>
          )}

          {/* User Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>

            <IconButton onClick={handleUserMenuOpen}>
              <Avatar sx={{ width: 32, height: 32 }}>
                <AccountCircle />
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(255, 107, 53, 0.1))',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            PawShelter
          </Typography>
        </Box>
        
        <List>
          {navigationItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                onClick={handleDrawerToggle}
                selected={router.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.3)',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 PawShelter. Made with ❤️ for animals in need.
          </Typography>
        </Container>
      </Box>

      {/* PWA Floating Action Buttons */}
      {(isInstallable || isUpdateAvailable || !isOnline) && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            zIndex: 1000,
          }}
        >
          {!isOnline && (
            <Tooltip title="You're offline">
              <Fab
                size="small"
                onClick={() => router.push('/offline')}
                sx={{
                  bgcolor: 'error.main',
                  '&:hover': { bgcolor: 'error.dark' },
                }}
              >
                <WifiOff />
              </Fab>
            </Tooltip>
          )}
          
          {isInstallable && (
            <Tooltip title="Install App">
              <Fab
                size="small"
                color="primary"
                onClick={handleInstallApp}
              >
                <Download />
              </Fab>
            </Tooltip>
          )}
          
          {isUpdateAvailable && (
            <Tooltip title="Update Available">
              <Fab
                size="small"
                color="warning"
                onClick={handleUpdateApp}
              >
                <Update />
              </Fab>
            </Tooltip>
          )}
        </Box>
      )}

      {/* PWA Notifications */}
      <Snackbar
        open={offlineSnackbarOpen}
        onClose={() => setOfflineSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOfflineSnackbarOpen(false)}
          severity="warning"
          variant="filled"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => router.push('/offline')}
            >
              VIEW
            </Button>
          }
        >
          You're offline. Some features may be limited.
        </Alert>
      </Snackbar>

      <Snackbar
        open={installSnackbarOpen}
        onClose={() => setInstallSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={10000}
      >
        <Alert
          onClose={() => setInstallSnackbarOpen(false)}
          severity="info"
          variant="filled"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleInstallApp}
            >
              INSTALL
            </Button>
          }
        >
          Install PawShelter for faster access and offline features.
        </Alert>
      </Snackbar>

      <Snackbar
        open={updateSnackbarOpen}
        onClose={() => setUpdateSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setUpdateSnackbarOpen(false)}
          severity="success"
          variant="filled"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleUpdateApp}
            >
              UPDATE
            </Button>
          }
        >
          A new version is available. Update now for the latest features.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Layout;