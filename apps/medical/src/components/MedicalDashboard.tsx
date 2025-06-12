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
  Avatar,
  IconButton,
  LinearProgress,
  Tabs,
  Tab,
  Alert,
  Badge,
  Tooltip,
  Fab,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  LocalHospital,
  Vaccines,
  Medication,
  MonitorHeart,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle,
  Schedule,
  Add,
  Notifications,
  Print,
  Share,
  Edit,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Animal, HealthRecord } from '@shelter/types';

// Mock data for medical records
const mockHealthData = {
  weight: [
    { date: '2024-01-01', weight: 45 },
    { date: '2024-01-15', weight: 47 },
    { date: '2024-02-01', weight: 48 },
    { date: '2024-02-15', weight: 50 },
    { date: '2024-03-01', weight: 52 },
  ],
  temperature: [
    { date: '2024-01-01', temp: 102.1 },
    { date: '2024-01-15', temp: 101.8 },
    { date: '2024-02-01', temp: 102.3 },
    { date: '2024-02-15', temp: 101.9 },
  ],
  healthScore: 85,
  vaccinations: [
    { name: 'DHPP', status: 'current', nextDue: '2024-06-15' },
    { name: 'Rabies', status: 'current', nextDue: '2024-12-01' },
    { name: 'Bordetella', status: 'overdue', nextDue: '2024-03-01' },
  ],
  medications: [
    { name: 'Heartgard Plus', dosage: '25mg', frequency: 'Monthly', nextDose: '2024-04-01' },
    { name: 'Bravecto', dosage: '250mg', frequency: 'Every 12 weeks', nextDose: '2024-05-15' },
  ],
};

const mockAnimal: Animal = {
  id: '1',
  name: 'Buddy',
  species: 'dog',
  breed: 'Golden Retriever',
  age: 2,
  gender: 'male',
  weight: 52,
  color: 'Golden',
  description: 'Friendly and energetic dog',
  status: 'available',
  intakeDate: new Date('2024-01-01'),
  photos: ['/api/placeholder/150/150'],
  healthRecords: [],
  behaviorProfile: {
    temperament: ['Friendly', 'Energetic'],
    energyLevel: 4,
    socialWithDogs: true,
    socialWithCats: true,
    socialWithKids: true,
    trainingLevel: 'basic',
  },
};

interface MedicalDashboardProps {
  animalId?: string;
}

const MedicalDashboard: React.FC<MedicalDashboardProps> = ({ animalId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const healthScoreColor = mockHealthData.healthScore >= 80 ? '#4CAF50' : 
                          mockHealthData.healthScore >= 60 ? '#FF9800' : '#F44336';

  const vaccStatusColors = {
    current: '#4CAF50',
    overdue: '#F44336',
    due: '#FF9800',
  };

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
          <Avatar
            src={mockAnimal.photos[0]}
            sx={{ width: 80, height: 80 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" fontWeight={700}>
              {mockAnimal.name}'s Medical Records
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {mockAnimal.breed} • {mockAnimal.age} years • {mockAnimal.weight} lbs
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Print Records">
              <IconButton>
                <Print />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share Records">
              <IconButton>
                <Share />
              </IconButton>
            </Tooltip>
            <Button variant="contained" startIcon={<Add />}>
              Add Record
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Health Score Circle */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Health Score
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <RadialBarChart width={120} height={120} cx={60} cy={60} innerRadius="60%" outerRadius="90%" data={[{ value: mockHealthData.healthScore }]}>
                  <RadialBar dataKey="value" fill={healthScoreColor} />
                </RadialBarChart>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color={healthScoreColor}>
                    {mockHealthData.healthScore}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Overall health status
              </Typography>
            </Card>
          </motion.div>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {[
              { label: 'Weight', value: `${mockAnimal.weight} lbs`, trend: 'up', color: 'success' },
              { label: 'Last Checkup', value: '5 days ago', trend: 'neutral', color: 'info' },
              { label: 'Vaccinations', value: '2/3 Current', trend: 'warning', color: 'warning' },
              { label: 'Next Appointment', value: 'Apr 15', trend: 'neutral', color: 'primary' },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {stat.trend === 'up' && <TrendingUp color="success" />}
                      {stat.trend === 'down' && <TrendingDown color="error" />}
                      {stat.trend === 'warning' && <Warning color="warning" />}
                      {stat.trend === 'neutral' && <Schedule color="action" />}
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="Timeline" icon={<Timeline />} />
          <Tab label="Vaccinations" icon={<Vaccines />} />
          <Tab label="Medications" icon={<Medication />} />
          <Tab label="Health Charts" icon={<MonitorHeart />} />
        </Tabs>
      </Box>

      {/* Timeline Tab */}
      <TabPanel value={selectedTab} index={0}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Timeline position="alternate">
            {[
              {
                date: '2024-03-15',
                type: 'checkup',
                title: 'Annual Wellness Exam',
                description: 'Complete physical examination, blood work normal',
                status: 'completed',
                vet: 'Dr. Sarah Johnson',
              },
              {
                date: '2024-03-01',
                type: 'vaccination',
                title: 'DHPP Vaccination',
                description: 'Distemper, Hepatitis, Parvovirus, Parainfluenza',
                status: 'completed',
                vet: 'Dr. Mike Chen',
              },
              {
                date: '2024-02-15',
                type: 'medication',
                title: 'Flea Treatment',
                description: 'Applied Bravecto flea and tick prevention',
                status: 'completed',
                vet: 'Tech: Jessica',
              },
              {
                date: '2024-04-20',
                type: 'scheduled',
                title: 'Dental Cleaning',
                description: 'Routine dental prophylaxis scheduled',
                status: 'scheduled',
                vet: 'Dr. Sarah Johnson',
              },
            ].map((event, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                  {new Date(event.date).toLocaleDateString()}
                </TimelineOppositeContent>
                
                <TimelineSeparator>
                  <TimelineConnector />
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <TimelineDot
                      color={
                        event.status === 'completed' ? 'success' :
                        event.status === 'scheduled' ? 'primary' : 'warning'
                      }
                    >
                      {event.type === 'checkup' && <LocalHospital />}
                      {event.type === 'vaccination' && <Vaccines />}
                      {event.type === 'medication' && <Medication />}
                      {event.type === 'scheduled' && <Schedule />}
                    </TimelineDot>
                  </motion.div>
                  <TimelineConnector />
                </TimelineSeparator>
                
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card sx={{ p: 2 }}>
                      <Typography variant="h6" component="span">
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {event.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption">
                          {event.vet}
                        </Typography>
                        <Chip
                          label={event.status}
                          size="small"
                          color={
                            event.status === 'completed' ? 'success' :
                            event.status === 'scheduled' ? 'primary' : 'warning'
                          }
                        />
                      </Box>
                    </Card>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.div>
      </TabPanel>

      {/* Vaccinations Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Grid container spacing={3}>
          {mockHealthData.vaccinations.map((vaccine, index) => (
            <Grid item xs={12} md={4} key={vaccine.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Badge
                        color={vaccine.status === 'current' ? 'success' : 'error'}
                        variant="dot"
                      >
                        <Vaccines fontSize="large" />
                      </Badge>
                      <Box>
                        <Typography variant="h6">{vaccine.name}</Typography>
                        <Chip
                          label={vaccine.status}
                          size="small"
                          color={vaccine.status === 'current' ? 'success' : 'error'}
                        />
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary">
                      Next Due: {vaccine.nextDue}
                    </Typography>
                    
                    <LinearProgress
                      variant="determinate"
                      value={vaccine.status === 'current' ? 100 : 0}
                      color={vaccine.status === 'current' ? 'success' : 'error'}
                      sx={{ mt: 2 }}
                    />
                  </CardContent>
                  
                  <CardActions>
                    <Button size="small">View History</Button>
                    <Button size="small">Schedule</Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Health Charts Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Weight Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockHealthData.weight}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area
                      type="monotone"
                      dataKey="weight"
                      stroke="#4CAF50"
                      fill="#4CAF5020"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Temperature History
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockHealthData.temperature}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[100, 104]} />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      stroke="#FF6B35"
                      strokeWidth={3}
                      dot={{ fill: '#FF6B35', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={() => console.log('Add new medical record')}
      >
        <Add />
      </Fab>

      {/* Medication Reminders */}
      <Box sx={{ position: 'fixed', top: 100, right: 24, zIndex: 1000 }}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.5 }}
          >
            <Alert
              severity="info"
              action={
                <IconButton size="small">
                  <Notifications />
                </IconButton>
              }
              sx={{ mb: 1 }}
            >
              <Typography variant="body2">
                Heartgard Plus due in 2 days
              </Typography>
            </Alert>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Container>
  );
};

export default MedicalDashboard;