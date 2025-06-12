import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Badge,
  Avatar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  LinearProgress,
  Fab,
  Tooltip,
  Alert,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AvatarGroup,
} from '@mui/material';
import {
  LocalShipping,
  Add,
  LocationOn,
  Schedule,
  TrendingUp,
  FlightTakeoff,
  DirectionsCar,
  Pets,
  CheckCircle,
  Warning,
  Info,
  Error,
  Navigation,
  Timer,
  Route,
  GPS,
  Emergency,
  Phone,
  Email,
  Visibility,
  Edit,
  Share,
  Download,
  Upload,
  Map,
  Analytics,
  Group,
  Assignment,
  Security,
  ExpandMore,
  MyLocation,
  Speed,
  LocalGasStation,
  Hotel,
  Restaurant,
  LocalHospital,
  VolunteerActivism,
  Timeline as TimelineIcon,
  Flag,
  PhotoCamera,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for transport operations
const mockTransports = [
  {
    id: 'TRN-001',
    type: 'rescue-transport',
    status: 'in-transit',
    priority: 'high',
    animals: [
      { id: '1', name: 'Bella', species: 'dog', urgency: 'critical' },
      { id: '2', name: 'Max', species: 'dog', urgency: 'moderate' },
    ],
    origin: {
      name: 'Hurricane Relief Zone',
      address: '123 Disaster St, New Orleans, LA 70112',
      coordinates: { lat: 29.9511, lng: -90.0715 },
      contactName: 'Emergency Coordinator',
      contactPhone: '(555) 123-4567',
    },
    destination: {
      name: 'Safe Haven Animal Shelter',
      address: '456 Shelter Ave, Springfield, IL 62701',
      coordinates: { lat: 39.7817, lng: -89.6501 },
      contactName: 'Sarah Johnson',
      contactPhone: '(555) 987-6543',
    },
    driver: {
      id: 'DRV-001',
      name: 'Mike Thompson',
      phone: '(555) 555-0123',
      licenseNumber: 'DL123456789',
      experienceLevel: 'expert',
      certifications: ['Animal Transport', 'Emergency Response'],
    },
    vehicle: {
      id: 'VEH-001',
      make: 'Ford',
      model: 'Transit',
      year: 2022,
      licensePlate: 'TRN-123',
      capacity: 12,
      features: ['Climate Control', 'Kennel Systems', 'GPS Tracking'],
    },
    schedule: {
      plannedDeparture: new Date('2024-03-20T08:00:00'),
      actualDeparture: new Date('2024-03-20T08:15:00'),
      estimatedArrival: new Date('2024-03-20T18:30:00'),
      actualArrival: null,
    },
    route: {
      totalDistance: 532,
      plannedDuration: 630, // minutes
      currentPosition: { lat: 32.3668, lng: -89.3985 },
      progressPercentage: 65,
      remainingDistance: 186,
      estimatedTimeRemaining: 220, // minutes
    },
    weatherConditions: {
      current: 'partly-cloudy',
      temperature: 72,
      conditions: 'Good for travel',
      alerts: [],
    },
    checkpoints: [
      {
        id: 'CP-001',
        name: 'Mississippi Rest Stop',
        location: { lat: 32.3540, lng: -90.1782 },
        plannedTime: new Date('2024-03-20T12:00:00'),
        actualTime: new Date('2024-03-20T12:10:00'),
        status: 'completed',
        notes: 'Animals fed and watered. All doing well.',
        photos: ['/api/placeholder/300/200'],
      },
      {
        id: 'CP-002',
        name: 'Memphis Veterinary Check',
        location: { lat: 35.1495, lng: -90.0490 },
        plannedTime: new Date('2024-03-20T15:30:00'),
        actualTime: null,
        status: 'upcoming',
        notes: '',
        photos: [],
      },
    ],
    documentation: {
      healthCertificates: ['HC-001', 'HC-002'],
      transportPermits: ['TP-2024-001'],
      insuranceDocuments: ['INS-2024-TRN-001'],
      veterinaryRecords: ['VR-001', 'VR-002'],
    },
    emergencyContacts: [
      {
        name: 'Emergency Vet Service',
        phone: '(555) 911-PETS',
        available24h: true,
        type: 'veterinary',
      },
      {
        name: 'Transport Coordinator',
        phone: '(555) TRANSPORT',
        available24h: true,
        type: 'logistics',
      },
    ],
    communications: [
      {
        timestamp: new Date('2024-03-20T08:15:00'),
        from: 'Mike Thompson',
        type: 'departure',
        message: 'Departed on schedule with 2 animals. All secure and comfortable.',
      },
      {
        timestamp: new Date('2024-03-20T12:10:00'),
        from: 'Mike Thompson',
        type: 'checkpoint',
        message: 'Rest stop complete. Animals fed and checked. Continuing journey.',
      },
    ],
    specialInstructions: [
      'Bella requires medication at 2 PM',
      'Both animals are nervous travelers - extra comfort items provided',
      'Emergency vet contact available for any medical concerns',
    ],
    estimatedCost: 1250,
    actualCost: null,
    mileageStart: 125430,
    mileageEnd: null,
  },
  {
    id: 'TRN-002',
    type: 'adoption-transport',
    status: 'scheduled',
    priority: 'medium',
    animals: [
      { id: '3', name: 'Luna', species: 'cat', urgency: 'low' },
    ],
    origin: {
      name: 'Safe Haven Animal Shelter',
      address: '456 Shelter Ave, Springfield, IL 62701',
      coordinates: { lat: 39.7817, lng: -89.6501 },
      contactName: 'Sarah Johnson',
      contactPhone: '(555) 987-6543',
    },
    destination: {
      name: 'Johnson Family Home',
      address: '789 Oak Street, Chicago, IL 60614',
      coordinates: { lat: 41.9228, lng: -87.6430 },
      contactName: 'Tom Johnson',
      contactPhone: '(555) 246-8101',
    },
    driver: {
      id: 'DRV-002',
      name: 'Lisa Chen',
      phone: '(555) 555-0124',
      licenseNumber: 'DL987654321',
      experienceLevel: 'intermediate',
      certifications: ['Safe Animal Transport'],
    },
    vehicle: {
      id: 'VEH-002',
      make: 'Honda',
      model: 'Pilot',
      year: 2021,
      licensePlate: 'ADT-456',
      capacity: 6,
      features: ['Carrier Secured', 'Climate Control'],
    },
    schedule: {
      plannedDeparture: new Date('2024-03-22T10:00:00'),
      actualDeparture: null,
      estimatedArrival: new Date('2024-03-22T13:30:00'),
      actualArrival: null,
    },
    route: {
      totalDistance: 198,
      plannedDuration: 210, // minutes
      currentPosition: null,
      progressPercentage: 0,
      remainingDistance: 198,
      estimatedTimeRemaining: 210,
    },
  },
];

const transportMetrics = [
  { month: 'Jan', rescues: 45, adoptions: 32, medical: 12 },
  { month: 'Feb', rescues: 52, adoptions: 38, medical: 15 },
  { month: 'Mar', rescues: 48, adoptions: 42, medical: 18 },
  { month: 'Apr', rescues: 61, adoptions: 35, medical: 14 },
  { month: 'May', rescues: 58, adoptions: 41, medical: 16 },
  { month: 'Jun', rescues: 65, adoptions: 45, medical: 19 },
];

const transportTypeData = [
  { name: 'Rescue Transport', value: 45, color: '#f44336' },
  { name: 'Adoption Transport', value: 35, color: '#4caf50' },
  { name: 'Medical Transport', value: 15, color: '#ff9800' },
  { name: 'Inter-Shelter', value: 5, color: '#2196f3' },
];

interface TransportTrackerProps {
  userId?: string;
}

const TransportTracker: React.FC<TransportTrackerProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [createTransportOpen, setCreateTransportOpen] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<any>(null);
  const [trackingDialogOpen, setTrackingDialogOpen] = useState(false);

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'info';
      case 'in-transit': return 'primary';
      case 'completed': return 'success';
      case 'delayed': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getTransportTypeIcon = (type: string) => {
    switch (type) {
      case 'rescue-transport': return <Emergency />;
      case 'adoption-transport': return <DirectionsCar />;
      case 'medical-transport': return <LocalHospital />;
      case 'inter-shelter': return <LocalShipping />;
      default: return <LocalShipping />;
    }
  };

  const handleViewTracking = (transport: any) => {
    setSelectedTransport(transport);
    setTrackingDialogOpen(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Transport & Relocation Tracking
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitor and coordinate animal transport operations in real-time
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Map />}>
              Live Map
            </Button>
            <Button variant="outlined" startIcon={<Analytics />}>
              Analytics
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={() => setCreateTransportOpen(true)}
            >
              Schedule Transport
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Active Transport Alert */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Alert
          severity="info"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => handleViewTracking(mockTransports[0])}>
              Track Live
            </Button>
          }
        >
          🚛 TRN-001 is currently in transit with 2 rescue animals - 65% complete, ETA 6:30 PM
        </Alert>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <LocalShipping color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="primary">
                  {mockTransports.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Transports
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Emergency color="error" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="error">
                  3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Emergency Rescues
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="success.main">
                  127
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed This Month
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Speed color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  97.2%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  On-Time Rate
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="Active Transports" icon={<LocalShipping />} />
          <Tab label="Fleet Management" icon={<DirectionsCar />} />
          <Tab label="Driver Dashboard" icon={<Group />} />
          <Tab label="Analytics" icon={<Analytics />} />
        </Tabs>
      </Box>

      {/* Active Transports Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {mockTransports.map((transport, index) => (
            <Grid item xs={12} lg={6} key={transport.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {getTransportTypeIcon(transport.type)}
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {transport.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {transport.type.replace('-', ' ').toUpperCase()}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label={transport.status}
                          color={getStatusColor(transport.status) as any}
                          size="small"
                        />
                        <Chip
                          label={transport.priority}
                          color={getPriorityColor(transport.priority) as any}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>

                    {/* Animals */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Animals ({transport.animals.length})
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {transport.animals.map((animal) => (
                          <Chip
                            key={animal.id}
                            label={`${animal.name} (${animal.species})`}
                            size="small"
                            icon={<Pets />}
                            color={animal.urgency === 'critical' ? 'error' : 'default'}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Route Information */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Route
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <LocationOn fontSize="small" color="success" />
                        <Typography variant="body2" color="text.secondary">
                          From: {transport.origin.name}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Flag fontSize="small" color="error" />
                        <Typography variant="body2" color="text.secondary">
                          To: {transport.destination.name}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Progress */}
                    {transport.status === 'in-transit' && (
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {transport.route.progressPercentage}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={transport.route.progressPercentage}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {transport.route.remainingDistance} miles remaining • ETA: {transport.schedule.estimatedArrival?.toLocaleTimeString()}
                        </Typography>
                      </Box>
                    )}

                    {/* Driver & Vehicle */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {transport.driver.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {transport.driver.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {transport.vehicle.make} {transport.vehicle.model} • {transport.vehicle.licensePlate}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Schedule */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        Departure: {transport.schedule.plannedDeparture.toLocaleString()}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Box>
                      <IconButton size="small">
                        <Phone />
                      </IconButton>
                      <IconButton size="small">
                        <Email />
                      </IconButton>
                    </Box>
                    
                    <Box>
                      <Button size="small" startIcon={<Edit />}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<GPS />}
                        onClick={() => handleViewTracking(transport)}
                      >
                        Track Live
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Fleet Management Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Fleet Status
          </Typography>
          
          <Grid container spacing={3}>
            {[
              { id: 'VEH-001', name: 'Transport Unit 1', status: 'in-use', driver: 'Mike Thompson', fuel: 75 },
              { id: 'VEH-002', name: 'Transport Unit 2', status: 'available', driver: null, fuel: 90 },
              { id: 'VEH-003', name: 'Emergency Response', status: 'maintenance', driver: null, fuel: 45 },
            ].map((vehicle, index) => (
              <Grid item xs={12} md={4} key={vehicle.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <DirectionsCar color="primary" />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {vehicle.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {vehicle.id}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Chip
                      label={vehicle.status}
                      color={vehicle.status === 'in-use' ? 'primary' : vehicle.status === 'available' ? 'success' : 'warning'}
                      sx={{ mb: 2 }}
                    />
                    
                    {vehicle.driver && (
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Driver: {vehicle.driver}
                      </Typography>
                    )}
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalGasStation fontSize="small" />
                      <Typography variant="body2">
                        Fuel: {vehicle.fuel}%
                      </Typography>
                    </Box>
                    
                    <LinearProgress
                      variant="determinate"
                      value={vehicle.fuel}
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      color={vehicle.fuel > 50 ? 'success' : vehicle.fuel > 25 ? 'warning' : 'error'}
                    />
                  </CardContent>
                  
                  <CardActions>
                    <Button size="small" startIcon={<Visibility />}>
                      Details
                    </Button>
                    <Button size="small" startIcon={<Edit />}>
                      Manage
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </TabPanel>

      {/* Driver Dashboard Tab */}
      <TabPanel value={selectedTab} index={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Driver Performance
          </Typography>
          
          <Grid container spacing={3}>
            {[
              { name: 'Mike Thompson', trips: 45, rating: 4.9, onTime: 98 },
              { name: 'Lisa Chen', trips: 32, rating: 4.8, onTime: 95 },
              { name: 'John Davis', trips: 28, rating: 4.7, onTime: 92 },
            ].map((driver, index) => (
              <Grid item xs={12} md={4} key={driver.name}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {driver.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {driver.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {driver.trips} trips completed
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Rating: {driver.rating}/5.0
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(driver.rating / 5) * 100}
                        sx={{ height: 6, borderRadius: 3 }}
                        color="success"
                      />
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        On-Time Rate: {driver.onTime}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={driver.onTime}
                        sx={{ height: 6, borderRadius: 3 }}
                        color="primary"
                      />
                    </Box>
                  </CardContent>
                  
                  <CardActions>
                    <Button size="small" startIcon={<Assignment />}>
                      Assign Trip
                    </Button>
                    <Button size="small" startIcon={<Visibility />}>
                      Profile
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </TabPanel>

      {/* Analytics Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Grid container spacing={3}>
          {/* Transport Trends */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Transport Activity by Type
                </Typography>
                
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={transportMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="rescues" fill="#f44336" name="Rescue Transports" />
                    <Bar dataKey="adoptions" fill="#4caf50" name="Adoption Transports" />
                    <Bar dataKey="medical" fill="#ff9800" name="Medical Transports" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Grid>

          {/* Transport Type Distribution */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Transport Distribution
                </Typography>
                
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={transportTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {transportTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <Box sx={{ mt: 2 }}>
                  {transportTypeData.map((item) => (
                    <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: item.color,
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {item.value}%
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Floating Action Buttons */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Tooltip title="Emergency Transport">
          <Fab color="error" size="medium">
            <Emergency />
          </Fab>
        </Tooltip>
        
        <Tooltip title="Schedule Transport">
          <Fab color="primary" onClick={() => setCreateTransportOpen(true)}>
            <Add />
          </Fab>
        </Tooltip>
      </Box>

      {/* Create Transport Dialog */}
      <Dialog open={createTransportOpen} onClose={() => setCreateTransportOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Schedule New Transport</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Transport Type</InputLabel>
                <Select label="Transport Type">
                  <MenuItem value="rescue-transport">Emergency Rescue</MenuItem>
                  <MenuItem value="adoption-transport">Adoption Transport</MenuItem>
                  <MenuItem value="medical-transport">Medical Transport</MenuItem>
                  <MenuItem value="inter-shelter">Inter-Shelter Transfer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select label="Priority">
                  <MenuItem value="critical">Critical</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Origin Location" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Destination Location" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Departure Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Departure Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Animals to Transport"
                fullWidth
                placeholder="Select animals for transport..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Special Instructions"
                fullWidth
                multiline
                rows={3}
                placeholder="Any special care instructions, medical needs, or handling requirements..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateTransportOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setCreateTransportOpen(false)}>
            Schedule Transport
          </Button>
        </DialogActions>
      </Dialog>

      {/* Live Tracking Dialog */}
      <Dialog open={trackingDialogOpen} onClose={() => setTrackingDialogOpen(false)} maxWidth="lg" fullWidth>
        {selectedTransport && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <GPS />
                <Typography variant="h6" fontWeight={600}>
                  Live Tracking - {selectedTransport.id}
                </Typography>
                <Chip
                  label={selectedTransport.status}
                  color={getStatusColor(selectedTransport.status) as any}
                  size="small"
                />
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  {/* Map placeholder */}
                  <Paper sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Map sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                      <Typography variant="h6" color="grey.600">
                        Live GPS Map
                      </Typography>
                      <Typography variant="body2" color="grey.500">
                        Real-time vehicle location and route
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Transport Details
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Driver:</strong> {selectedTransport.driver.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Vehicle:</strong> {selectedTransport.vehicle.licensePlate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Animals:</strong> {selectedTransport.animals.length}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Progress: {selectedTransport.route?.progressPercentage || 0}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={selectedTransport.route?.progressPercentage || 0}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>ETA:</strong> {selectedTransport.schedule.estimatedArrival?.toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Distance Remaining:</strong> {selectedTransport.route?.remainingDistance} miles
                    </Typography>
                  </Box>
                  
                  {/* Recent Communications */}
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Recent Updates
                  </Typography>
                  <List dense>
                    {selectedTransport.communications?.map((comm: any, index: number) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={comm.message}
                          secondary={`${comm.from} - ${comm.timestamp.toLocaleTimeString()}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setTrackingDialogOpen(false)}>
                Close
              </Button>
              <Button variant="outlined" startIcon={<Phone />}>
                Call Driver
              </Button>
              <Button variant="contained" startIcon={<Share />}>
                Share Tracking
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default TransportTracker;