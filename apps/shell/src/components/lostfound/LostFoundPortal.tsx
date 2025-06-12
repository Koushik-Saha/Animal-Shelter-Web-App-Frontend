import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Tooltip,
  Slider,
} from '@mui/material';
import {
  Search,
  Add,
  Pets,
  LocationOn,
  Schedule,
  Visibility,
  Share,
  Phone,
  Email,
  Star,
  TrendingUp,
  FilterList,
  Notifications,
  CameraAlt,
  Map,
  ContactSupport,
  CheckCircle,
  Warning,
  Info,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { LostPetReport, TipReport, PotentialMatch } from '@shelter/types/lostfound';

// Mock data
const mockLostFoundReports: LostPetReport[] = [
  {
    id: '1',
    reportType: 'lost',
    status: 'active',
    reporterName: 'Sarah Johnson',
    reporterEmail: 'sarah@email.com',
    reporterPhone: '(555) 123-4567',
    isOwner: true,
    animalName: 'Max',
    species: 'dog',
    breed: 'Golden Retriever',
    size: 'large',
    weight: 65,
    weightUnit: 'lbs',
    color: 'Golden',
    markings: 'White patch on chest',
    estimatedAge: 3,
    ageUnit: 'years',
    gender: 'male',
    location: {
      address: '123 Oak Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      coordinates: { latitude: 39.7817, longitude: -89.6501 },
      searchRadius: 5,
    },
    dateTimeLostFound: new Date('2024-03-15'),
    reportDate: new Date('2024-03-15'),
    photos: ['/api/placeholder/300/200'],
    description: 'Friendly golden retriever, very social with people and other dogs. Responds to name Max.',
    circumstances: 'Escaped from backyard during thunderstorm',
    rewardOffered: true,
    rewardAmount: 500,
    preferredContactMethod: 'phone',
    matches: [],
    followUps: [],
    views: 247,
    isVerified: true,
    shelterNotified: true,
    autoRenewalEnabled: true,
    collar: {
      hasCollar: true,
      collarColor: 'blue',
      hasTags: true,
      tagInfo: 'Name tag with Max and phone number',
    },
    microchip: {
      hasMicrochip: true,
      isRegistered: true,
    },
  },
  {
    id: '2',
    reportType: 'found',
    status: 'active',
    reporterName: 'Mike Chen',
    reporterEmail: 'mike@email.com',
    reporterPhone: '(555) 987-6543',
    isOwner: false,
    species: 'cat',
    breed: 'Domestic Shorthair',
    size: 'medium',
    color: 'Orange tabby',
    markings: 'White paws and bib',
    estimatedAge: 2,
    ageUnit: 'years',
    gender: 'female',
    location: {
      address: '456 Pine Avenue',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62702',
      coordinates: { latitude: 39.7900, longitude: -89.6400 },
    },
    dateTimeLostFound: new Date('2024-03-18'),
    reportDate: new Date('2024-03-18'),
    photos: ['/api/placeholder/300/200'],
    description: 'Very friendly orange tabby cat found in my backyard. Well-fed and socialized.',
    circumstances: 'Found sleeping on porch furniture',
    preferredContactMethod: 'email',
    matches: [],
    followUps: [],
    views: 156,
    isVerified: true,
    shelterNotified: false,
    autoRenewalEnabled: true,
    collar: {
      hasCollar: false,
      hasTags: false,
    },
    microchip: {
      hasMicrochip: false,
    },
  },
];

const mockRecentMatches: PotentialMatch[] = [
  {
    id: '1',
    matchedReportId: '2',
    matchScore: 85,
    matchedDate: new Date(),
    status: 'pending',
    matchingFactors: [
      { factor: 'species', weight: 100, confidence: 100 },
      { factor: 'location', weight: 80, confidence: 90 },
      { factor: 'color', weight: 70, confidence: 85 },
    ],
    contactAttempts: [],
  },
];

interface LostFoundPortalProps {
  userId?: string;
}

const LostFoundPortal: React.FC<LostFoundPortalProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<LostPetReport | null>(null);
  const [searchFilters, setSearchFilters] = useState({
    species: 'all',
    reportType: 'all',
    location: '',
    radius: 10,
  });

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'reunited': return 'primary';
      case 'closed': return 'default';
      case 'expired': return 'warning';
      default: return 'default';
    }
  };

  const getReportTypeColor = (type: string) => {
    return type === 'lost' ? 'error' : 'info';
  };

  const handleViewReport = (report: LostPetReport) => {
    setSelectedReport(report);
    setReportDialogOpen(true);
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
              Lost & Found Pets
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Help reunite lost pets with their families
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Search />}>
              Search Tips
            </Button>
            <Button variant="contained" startIcon={<Add />}>
              Report Lost/Found Pet
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Success Stories Alert */}
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
              View Stories
            </Button>
          }
        >
          🎉 Great news! 3 pets were reunited with their families this week through our portal!
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
                  247
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Reports
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
                  1,240
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Successful Reunions
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
                <TrendingUp color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="secondary.main">
                  87%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reunion Rate
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
                <Schedule color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  2.3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg Days to Reunion
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Search Lost & Found Pets
        </Typography>
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search by name, breed, or description"
              value={searchFilters.location}
              onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Species</InputLabel>
              <Select
                value={searchFilters.species}
                label="Species"
                onChange={(e) => setSearchFilters({ ...searchFilters, species: e.target.value })}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="dog">Dogs</MenuItem>
                <MenuItem value="cat">Cats</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={searchFilters.reportType}
                label="Type"
                onChange={(e) => setSearchFilters({ ...searchFilters, reportType: e.target.value })}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="lost">Lost</MenuItem>
                <MenuItem value="found">Found</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="body2" gutterBottom>
              Search Radius: {searchFilters.radius} miles
            </Typography>
            <Slider
              value={searchFilters.radius}
              onChange={(_, value) => setSearchFilters({ ...searchFilters, radius: value as number })}
              min={1}
              max={50}
              marks={[
                { value: 1, label: '1mi' },
                { value: 25, label: '25mi' },
                { value: 50, label: '50mi' },
              ]}
            />
          </Grid>
          
          <Grid item xs={12} md={1}>
            <Button variant="contained" fullWidth startIcon={<Search />}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="All Reports" icon={<Pets />} />
          <Tab 
            label={
              <Badge badgeContent={mockRecentMatches.length} color="secondary">
                Recent Matches
              </Badge>
            } 
            icon={<Star />} 
          />
          <Tab label="Success Stories" icon={<CheckCircle />} />
          <Tab label="Report Pet" icon={<Add />} />
        </Tabs>
      </Box>

      {/* All Reports Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {mockLostFoundReports.map((report, index) => (
            <Grid item xs={12} sm={6} md={4} key={report.id}>
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
                      height="200"
                      image={report.photos[0]}
                      alt={report.animalName || 'Found pet'}
                    />
                    
                    {/* Report Type Badge */}
                    <Chip
                      label={report.reportType.toUpperCase()}
                      color={getReportTypeColor(report.reportType) as any}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        fontWeight: 600,
                      }}
                    />
                    
                    {/* Status Badge */}
                    <Chip
                      label={report.status}
                      color={getStatusColor(report.status) as any}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                      }}
                    />
                    
                    {/* Reward Badge */}
                    {report.rewardOffered && (
                      <Chip
                        label={`$${report.rewardAmount} Reward`}
                        color="warning"
                        size="small"
                        sx={{
                          position: 'absolute',
                          bottom: 12,
                          right: 12,
                          bgcolor: 'rgba(255, 193, 7, 0.9)',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>

                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {report.animalName || `Found ${report.species}`}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {report.breed} • {report.size} • {report.color}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {report.location.city}, {report.location.state}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {report.dateTimeLostFound.toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {report.description}
                    </Typography>

                    {/* Special Features */}
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 2, flexWrap: 'wrap' }}>
                      {report.microchip?.hasMicrochip && (
                        <Chip label="Microchipped" size="small" color="info" />
                      )}
                      {report.collar?.hasCollar && (
                        <Chip label="Has Collar" size="small" color="success" />
                      )}
                    </Box>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Box>
                      <IconButton size="small">
                        <Share />
                      </IconButton>
                      <IconButton size="small">
                        <Phone />
                      </IconButton>
                    </Box>
                    
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<Visibility />}
                      onClick={() => handleViewReport(report)}
                    >
                      View Details
                    </Button>
                  </CardActions>

                  {/* Views Counter */}
                  <Box sx={{ px: 2, pb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      👁 {report.views} views
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Recent Matches Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Potential Matches Found
          </Typography>
          
          <List>
            {mockRecentMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ListItem sx={{ border: 1, borderColor: 'divider', borderRadius: 2, mb: 2 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <Star />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${match.matchScore}% Match Found`}
                    secondary={`Based on ${match.matchingFactors.length} matching factors`}
                  />
                  <ListItemSecondaryAction>
                    <Chip
                      label={match.status}
                      color={match.status === 'pending' ? 'warning' : 'success'}
                      size="small"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Paper>
      </TabPanel>

      {/* Success Stories Tab */}
      <TabPanel value={selectedTab} index={2}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <CheckCircle color="success" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Happy Reunions
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            See the heartwarming stories of pets reunited with their families through our portal.
          </Typography>
          <Button variant="contained" size="large">
            View Success Stories
          </Button>
        </Paper>
      </TabPanel>

      {/* Report Pet Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Report a Lost or Found Pet
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Warning color="error" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Report Lost Pet
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  My pet is missing and I need help finding them
                </Typography>
                <Button variant="contained" color="error" fullWidth>
                  Report Lost Pet
                </Button>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Info color="info" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Report Found Pet
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  I found a pet and want to help them get home
                </Typography>
                <Button variant="contained" color="info" fullWidth>
                  Report Found Pet
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      {/* Floating Action Buttons */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Tooltip title="Get Notifications">
          <Fab color="secondary" size="medium">
            <Notifications />
          </Fab>
        </Tooltip>
        
        <Tooltip title="Report Lost/Found Pet">
          <Fab color="primary">
            <Add />
          </Fab>
        </Tooltip>
      </Box>

      {/* Report Details Dialog */}
      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} maxWidth="md" fullWidth>
        {selectedReport && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  {selectedReport.animalName || `Found ${selectedReport.species}`}
                </Typography>
                <Chip
                  label={selectedReport.reportType.toUpperCase()}
                  color={getReportTypeColor(selectedReport.reportType) as any}
                  size="small"
                />
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img
                    src={selectedReport.photos[0]}
                    alt={selectedReport.animalName || 'Pet'}
                    style={{ width: '100%', borderRadius: 8 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Details
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Species:</strong> {selectedReport.species}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Breed:</strong> {selectedReport.breed}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Size:</strong> {selectedReport.size}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Color:</strong> {selectedReport.color}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Date:</strong> {selectedReport.dateTimeLostFound.toLocaleDateString()}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Location:</strong> {selectedReport.location.address}, {selectedReport.location.city}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Description:</strong> {selectedReport.description}
                  </Typography>
                  
                  {selectedReport.rewardOffered && (
                    <Typography variant="body2" paragraph color="warning.main">
                      <strong>Reward Offered:</strong> ${selectedReport.rewardAmount}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setReportDialogOpen(false)}>
                Close
              </Button>
              <Button variant="contained" startIcon={<ContactSupport />}>
                Contact Reporter
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default LostFoundPortal;