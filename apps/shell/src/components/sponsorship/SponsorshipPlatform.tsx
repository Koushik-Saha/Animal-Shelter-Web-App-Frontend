import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
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
  LinearProgress,
  Fab,
  Tooltip,
  Alert,
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
  Divider,
  AvatarGroup,
} from '@mui/material';
import {
  Favorite,
  Add,
  Star,
  TrendingUp,
  Pets,
  Visibility,
  Share,
  CardGiftcard,
  AttachMoney,
  Schedule,
  Group,
  Analytics,
  LocalHospital,
  Restaurant,
  Home,
  School,
  PlayArrow,
  CheckCircle,
  Warning,
  Info,
  PhotoCamera,
  Videocam,
  Email,
  Phone,
  Download,
  Upload,
  EmojiEvents,
  VolunteerActivism,
  Timeline as TimelineIcon,
  MonetizationOn,
  CameraAlt,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts';

// Mock data for sponsorships
const mockAnimalsForSponsorship = [
  {
    id: '1',
    name: 'Bella',
    species: 'dog',
    breed: 'Mixed Breed',
    age: 2,
    gender: 'female',
    arrivalDate: new Date('2024-01-15'),
    photos: ['/api/placeholder/400/300'],
    story: 'Bella was found wandering the streets after a storm. She is incredibly gentle and loves children.',
    sponsorshipGoal: 2400, // Annual cost
    currentSponsorship: 1680,
    sponsors: 14,
    medicalNeeds: ['Vaccinations', 'Spaying', 'Dental Care'],
    dailyNeeds: ['Food', 'Exercise', 'Socialization'],
    personality: ['Gentle', 'Playful', 'Social'],
    specialNeeds: false,
    estimatedAdoptionTime: '2-3 months',
    sponsorshipPackages: [
      { name: 'Monthly Meals', cost: 45, description: 'Cover a month of nutritious food' },
      { name: 'Medical Care', cost: 120, description: 'Support veterinary visits and treatments' },
      { name: 'Full Care', cost: 200, description: 'Complete monthly care package' },
    ],
    recentUpdates: [
      {
        id: '1',
        date: new Date('2024-03-18'),
        title: 'Great Progress in Training',
        content: 'Bella has been excelling in her obedience training and is now ready for adoption!',
        photos: ['/api/placeholder/300/200'],
        type: 'milestone',
      },
      {
        id: '2',
        date: new Date('2024-03-10'),
        title: 'Health Check Complete',
        content: 'All vaccinations up to date and dental cleaning completed successfully.',
        type: 'medical',
      },
    ],
    virtualVisits: 12,
    lastVirtualVisit: new Date('2024-03-15'),
  },
  {
    id: '2',
    name: 'Oliver',
    species: 'cat',
    breed: 'Persian',
    age: 5,
    gender: 'male',
    arrivalDate: new Date('2023-11-20'),
    photos: ['/api/placeholder/400/300'],
    story: 'Oliver is a senior cat who was surrendered due to his owner\'s health issues. He needs ongoing medical care.',
    sponsorshipGoal: 3600,
    currentSponsorship: 2100,
    sponsors: 7,
    medicalNeeds: ['Diabetes Management', 'Regular Blood Work', 'Special Diet'],
    dailyNeeds: ['Specialized Food', 'Medication', 'Gentle Exercise'],
    personality: ['Calm', 'Affectionate', 'Independent'],
    specialNeeds: true,
    estimatedAdoptionTime: '6+ months',
    sponsorshipPackages: [
      { name: 'Medical Support', cost: 180, description: 'Monthly diabetes care and monitoring' },
      { name: 'Special Diet', cost: 80, description: 'Prescription food for diabetes management' },
      { name: 'Complete Care', cost: 300, description: 'Full medical and daily care support' },
    ],
    recentUpdates: [
      {
        id: '3',
        date: new Date('2024-03-20'),
        title: 'Blood Sugar Stable',
        content: 'Oliver\'s diabetes is well-controlled with his current treatment plan.',
        type: 'medical',
      },
    ],
    virtualVisits: 8,
    lastVirtualVisit: new Date('2024-03-12'),
  },
];

const mockSponsorships = [
  {
    id: '1',
    animalId: '1',
    animalName: 'Bella',
    sponsorName: 'Sarah Johnson',
    sponsorEmail: 'sarah@email.com',
    packageType: 'Full Care',
    monthlyAmount: 200,
    startDate: new Date('2024-01-01'),
    duration: 12, // months
    totalContributed: 600,
    status: 'active',
    autoRenew: true,
    preferredUpdates: 'weekly',
    personalMessage: 'Thank you for taking care of Bella! I love getting updates about her progress.',
    virtualVisitsUsed: 3,
    virtualVisitsAllowed: 12,
  },
  {
    id: '2',
    animalId: '2',
    animalName: 'Oliver',
    sponsorName: 'Michael Chen',
    sponsorEmail: 'mchen@email.com',
    packageType: 'Medical Support',
    monthlyAmount: 180,
    startDate: new Date('2023-12-01'),
    duration: 6,
    totalContributed: 720,
    status: 'active',
    autoRenew: false,
    preferredUpdates: 'monthly',
    virtualVisitsUsed: 2,
    virtualVisitsAllowed: 6,
  },
];

const sponsorshipImpact = [
  { month: 'Jan', sponsored: 8, total: 45 },
  { month: 'Feb', sponsored: 12, total: 48 },
  { month: 'Mar', sponsored: 15, total: 52 },
  { month: 'Apr', sponsored: 18, total: 49 },
  { month: 'May', sponsored: 22, total: 55 },
  { month: 'Jun', sponsored: 25, total: 58 },
];

const virtualAdoptionBenefits = [
  {
    icon: <PhotoCamera />,
    title: 'Regular Photo Updates',
    description: 'Receive weekly photos of your sponsored animal',
  },
  {
    icon: <Videocam />,
    title: 'Virtual Visit Sessions',
    description: 'Schedule monthly video calls to see your pet',
  },
  {
    icon: <LocalHospital />,
    title: 'Health Reports',
    description: 'Get detailed updates on medical care and progress',
  },
  {
    icon: <EmojiEvents />,
    title: 'Milestone Celebrations',
    description: 'Be the first to know about training achievements',
  },
  {
    icon: <Email />,
    title: 'Personal Messages',
    description: 'Exchange messages with care staff about your pet',
  },
  {
    icon: <CameraAlt />,
    title: 'Custom Content',
    description: 'Request specific photos or videos of activities',
  },
];

interface SponsorshipPlatformProps {
  userId?: string;
}

const SponsorshipPlatform: React.FC<SponsorshipPlatformProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [sponsorDialogOpen, setSponsorDialogOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [sponsorshipDuration, setSponsorshipDuration] = useState(12);
  const [virtualVisitOpen, setVirtualVisitOpen] = useState(false);

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const getSponsorshipProgress = (animal: any) => {
    return (animal.currentSponsorship / animal.sponsorshipGoal) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const handleSponsorAnimal = (animal: any) => {
    setSelectedAnimal(animal);
    setSponsorDialogOpen(true);
  };

  const handleStartSponsorship = () => {
    setSponsorDialogOpen(false);
    // Handle sponsorship creation
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
              Animal Sponsorship & Virtual Adoption
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Support animals in care and create lasting bonds through virtual adoption
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Analytics />}>
              Impact Report
            </Button>
            <Button variant="outlined" startIcon={<Videocam />} onClick={() => setVirtualVisitOpen(true)}>
              Schedule Visit
            </Button>
            <Button variant="contained" startIcon={<Favorite />}>
              Become a Sponsor
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Impact Alert */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small">
              View Impact
            </Button>
          }
        >
          🎉 Thanks to our sponsors, 25 animals have found loving homes this month!
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
                <Pets color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="primary">
                  {mockAnimalsForSponsorship.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Animals Needing Sponsors
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
                <Group color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="secondary">
                  156
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Sponsors
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
                <AttachMoney color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="success.main">
                  $24.5K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monthly Support Raised
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
                <CheckCircle color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  89%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sponsored Animals Adopted
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="Animals Needing Sponsors" icon={<Pets />} />
          <Tab label="My Sponsorships" icon={<Favorite />} />
          <Tab label="Virtual Adoption Benefits" icon={<Star />} />
          <Tab label="Impact Analytics" icon={<Analytics />} />
        </Tabs>
      </Box>

      {/* Animals Needing Sponsors Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {mockAnimalsForSponsorship.map((animal, index) => (
            <Grid item xs={12} md={6} lg={4} key={animal.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card sx={{ height: '100%', position: 'relative' }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={animal.photos[0]}
                      alt={animal.name}
                    />
                    
                    {/* Special Needs Badge */}
                    {animal.specialNeeds && (
                      <Chip
                        label="Special Needs"
                        color="warning"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          fontWeight: 600,
                        }}
                      />
                    )}
                    
                    {/* Sponsors Count */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Group fontSize="small" />
                      <Typography variant="caption">
                        {animal.sponsors} sponsors
                      </Typography>
                    </Box>
                  </Box>

                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {animal.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {animal.breed} • {animal.age} years • {animal.gender}
                    </Typography>

                    <Typography variant="body2" paragraph sx={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {animal.story}
                    </Typography>

                    {/* Sponsorship Progress */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Sponsorship Progress
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          ${animal.currentSponsorship} / ${animal.sponsorshipGoal}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={getSponsorshipProgress(animal)}
                        sx={{ height: 8, borderRadius: 4 }}
                        color={getSponsorshipProgress(animal) >= 100 ? 'success' : 'primary'}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {Math.round(getSponsorshipProgress(animal))}% of annual goal reached
                      </Typography>
                    </Box>

                    {/* Personality Traits */}
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                      {animal.personality.slice(0, 3).map((trait) => (
                        <Chip
                          key={trait}
                          label={trait}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Box>

                    {/* Recent Update */}
                    {animal.recentUpdates.length > 0 && (
                      <Box sx={{ bgcolor: 'grey.50', p: 1, borderRadius: 1 }}>
                        <Typography variant="caption" fontWeight={600} color="primary">
                          Latest Update:
                        </Typography>
                        <Typography variant="caption" display="block">
                          {animal.recentUpdates[0].title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {animal.recentUpdates[0].date.toLocaleDateString()}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Box>
                      <IconButton size="small">
                        <Share />
                      </IconButton>
                      <IconButton size="small">
                        <Videocam />
                      </IconButton>
                    </Box>
                    
                    <Box>
                      <Button size="small" startIcon={<Visibility />}>
                        View Details
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<Favorite />}
                        onClick={() => handleSponsorAnimal(animal)}
                      >
                        Sponsor
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* My Sponsorships Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Grid container spacing={3}>
          {mockSponsorships.map((sponsorship, index) => (
            <Grid item xs={12} md={6} key={sponsorship.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Favorite />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          Sponsoring {sponsorship.animalName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {sponsorship.packageType} • ${sponsorship.monthlyAmount}/month
                        </Typography>
                      </Box>
                      <Box sx={{ ml: 'auto' }}>
                        <Chip
                          label={sponsorship.status}
                          color={getStatusColor(sponsorship.status) as any}
                          size="small"
                        />
                      </Box>
                    </Box>

                    <Typography variant="body2" paragraph>
                      <strong>Started:</strong> {sponsorship.startDate.toLocaleDateString()}
                    </Typography>
                    
                    <Typography variant="body2" paragraph>
                      <strong>Total Contributed:</strong> ${sponsorship.totalContributed}
                    </Typography>

                    <Typography variant="body2" paragraph>
                      <strong>Virtual Visits:</strong> {sponsorship.virtualVisitsUsed} / {sponsorship.virtualVisitsAllowed} used
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={(sponsorship.virtualVisitsUsed / sponsorship.virtualVisitsAllowed) * 100}
                      sx={{ mb: 2, height: 6, borderRadius: 3 }}
                    />

                    {sponsorship.personalMessage && (
                      <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, mb: 2 }}>
                        <Typography variant="body2" fontStyle="italic">
                          "{sponsorship.personalMessage}"
                        </Typography>
                      </Box>
                    )}
                  </CardContent>

                  <CardActions>
                    <Button size="small" startIcon={<Videocam />}>
                      Virtual Visit
                    </Button>
                    <Button size="small" startIcon={<TimelineIcon />}>
                      View Updates
                    </Button>
                    <Button size="small" startIcon={<Email />}>
                      Send Message
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Virtual Adoption Benefits Tab */}
      <TabPanel value={selectedTab} index={2}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Virtual Adoption Benefits
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Experience the joy of pet ownership while helping animals in need
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {virtualAdoptionBenefits.map((benefit, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card sx={{ textAlign: 'center', p: 2, height: '100%' }}>
                  <CardContent>
                    <Box sx={{ mb: 2, color: 'primary.main' }}>
                      {React.cloneElement(benefit.icon, { fontSize: 'large' })}
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Paper sx={{ p: 4, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Ready to Make a Difference?
            </Typography>
            <Typography variant="body1" paragraph>
              Join our virtual adoption program and create a lasting bond with an animal in need
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Favorite />}
              sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
            >
              Start Sponsoring Today
            </Button>
          </Paper>
        </Box>
      </TabPanel>

      {/* Impact Analytics Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Grid container spacing={3}>
          {/* Sponsorship Trends */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Sponsorship Impact Over Time
                </Typography>
                
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sponsorshipImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="sponsored"
                      stroke="#4CAF50"
                      strokeWidth={3}
                      name="Sponsored Animals"
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#2196F3"
                      strokeWidth={3}
                      name="Total Animals"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Grid>

          {/* Success Stories */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Success Metrics
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Adoption Rate
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={89}
                      sx={{ height: 8, borderRadius: 4 }}
                      color="success"
                    />
                    <Typography variant="caption" color="text.secondary">
                      89% of sponsored animals adopted
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Sponsor Retention
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={76}
                      sx={{ height: 8, borderRadius: 4 }}
                      color="primary"
                    />
                    <Typography variant="caption" color="text.secondary">
                      76% sponsor retention rate
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Virtual Engagement
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={92}
                      sx={{ height: 8, borderRadius: 4 }}
                      color="secondary"
                    />
                    <Typography variant="caption" color="text.secondary">
                      92% active virtual visit participation
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Floating Action Buttons */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Tooltip title="Schedule Virtual Visit">
          <Fab color="secondary" size="medium" onClick={() => setVirtualVisitOpen(true)}>
            <Videocam />
          </Fab>
        </Tooltip>
        
        <Tooltip title="Become a Sponsor">
          <Fab color="primary">
            <Favorite />
          </Fab>
        </Tooltip>
      </Box>

      {/* Sponsor Animal Dialog */}
      <Dialog open={sponsorDialogOpen} onClose={() => setSponsorDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Favorite />
            <Typography variant="h6" fontWeight={600}>
              Sponsor {selectedAnimal?.name}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedAnimal && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <img
                  src={selectedAnimal.photos[0]}
                  alt={selectedAnimal.name}
                  style={{ width: '100%', borderRadius: 8 }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Choose Your Sponsorship Package
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Sponsorship Package</InputLabel>
                  <Select
                    value={selectedPackage}
                    label="Sponsorship Package"
                    onChange={(e) => setSelectedPackage(e.target.value)}
                  >
                    {selectedAnimal.sponsorshipPackages.map((pkg: any) => (
                      <MenuItem key={pkg.name} value={pkg.name}>
                        {pkg.name} - ${pkg.cost}/month
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Duration (months)
                </Typography>
                <Box sx={{ px: 2, mb: 2 }}>
                  {/* Duration slider would go here */}
                </Box>
                
                <Alert severity="info" sx={{ mb: 2 }}>
                  Your sponsorship includes virtual visits, regular updates, and the joy of helping {selectedAnimal.name} find a forever home!
                </Alert>
                
                <Typography variant="body2" paragraph>
                  <strong>What your sponsorship covers:</strong>
                </Typography>
                <List dense>
                  {selectedAnimal.medicalNeeds.concat(selectedAnimal.dailyNeeds).slice(0, 4).map((need: string) => (
                    <ListItem key={need}>
                      <ListItemIcon>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={need} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSponsorDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleStartSponsorship}
            startIcon={<Favorite />}
            disabled={!selectedPackage}
          >
            Start Sponsorship
          </Button>
        </DialogActions>
      </Dialog>

      {/* Virtual Visit Dialog */}
      <Dialog open={virtualVisitOpen} onClose={() => setVirtualVisitOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Virtual Visit</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Select Animal"
            select
            fullWidth
            variant="outlined"
          >
            {mockSponsorships.map((sponsorship) => (
              <MenuItem key={sponsorship.id} value={sponsorship.animalId}>
                {sponsorship.animalName}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            margin="dense"
            label="Preferred Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            margin="dense"
            label="Preferred Time"
            type="time"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            margin="dense"
            label="Special Requests"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            placeholder="Any specific activities you'd like to see during the visit?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVirtualVisitOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setVirtualVisitOpen(false)}>
            Schedule Visit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SponsorshipPlatform;