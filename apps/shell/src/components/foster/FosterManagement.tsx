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
  Avatar,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
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
  Checkbox,
  FormControlLabel,
  Rating,
  Badge,
  Tooltip,
  Tabs,
  Tab,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  Home,
  Pets,
  Star,
  Phone,
  Email,
  LocationOn,
  Check,
  Close,
  Edit,
  Visibility,
  Assignment,
  Schedule,
  TrendingUp,
  Warning,
  CheckCircle,
  PersonAdd,
  Search,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Animal } from '@shelter/types';

// Mock data for foster management
const mockFosterFamilies = [
  {
    id: '1',
    name: 'Sarah & Mike Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    address: '123 Oak Street, Springfield',
    capacity: 2,
    currentAnimals: ['dog1'],
    experience: ['dogs', 'cats'],
    rating: 4.8,
    totalAnimals: 12,
    status: 'active',
    joinDate: '2023-01-15',
    homeApproved: true,
    specialties: ['puppies', 'senior dogs'],
    availability: 'available',
  },
  {
    id: '2',
    name: 'Jennifer Davis',
    email: 'jen.davis@email.com',
    phone: '(555) 987-6543',
    address: '456 Pine Avenue, Springfield',
    capacity: 3,
    currentAnimals: ['cat1', 'cat2'],
    experience: ['cats', 'kittens'],
    rating: 4.9,
    totalAnimals: 18,
    status: 'active',
    joinDate: '2022-08-20',
    homeApproved: true,
    specialties: ['bottle babies', 'special needs'],
    availability: 'limited',
  },
];

const mockAnimalsNeedingFoster = [
  {
    id: 'dog1',
    name: 'Buddy',
    species: 'dog',
    breed: 'Golden Retriever Mix',
    age: 8,
    gender: 'male',
    weight: 45,
    description: 'Senior dog needing quiet foster home for recovery',
    photos: ['/api/placeholder/200/200'],
    status: 'needs-foster',
    urgency: 'high',
    fosterReason: 'Medical recovery - heartworm treatment',
    estimatedFosterDuration: '3 months',
    specialRequirements: ['Medication twice daily', 'Limited exercise'],
  },
  {
    id: 'cat1',
    name: 'Luna',
    species: 'cat',
    breed: 'Domestic Shorthair',
    age: 0.5,
    gender: 'female',
    weight: 2,
    description: 'Orphaned kitten needing bottle feeding',
    photos: ['/api/placeholder/200/200'],
    status: 'needs-foster',
    urgency: 'critical',
    fosterReason: 'Too young for adoption - needs socialization',
    estimatedFosterDuration: '6 weeks',
    specialRequirements: ['Bottle feeding every 2 hours', 'Temperature monitoring'],
  },
];

const fosterApplicationSteps = [
  'Application Submitted',
  'Initial Review',
  'Phone Interview',
  'Home Visit Scheduled',
  'Home Visit Completed',
  'Background Check',
  'Approved'
];

interface FosterManagementProps {
  userId?: string;
}

const FosterManagement: React.FC<FosterManagementProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [matchDialogOpen, setMatchDialogOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [selectedFoster, setSelectedFoster] = useState<any>(null);

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const handleMatch = (animal: any, foster: any) => {
    setSelectedAnimal(animal);
    setSelectedFoster(foster);
    setMatchDialogOpen(true);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'success';
      case 'limited': return 'warning';
      case 'full': return 'error';
      default: return 'default';
    }
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
              Foster Care Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Connect animals in need with loving foster families
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Search />}>
              Find Foster
            </Button>
            <Button variant="contained" startIcon={<PersonAdd />}>
              Add Foster Family
            </Button>
          </Box>
        </Box>
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
                <Home color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="primary">
                  {mockFosterFamilies.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Foster Families
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
                <Pets color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="secondary">
                  {mockAnimalsNeedingFoster.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Animals Needing Foster
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
                  15
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Successful Placements This Month
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
                <Star color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  4.7
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Foster Rating
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="Foster Families" icon={<Home />} />
          <Tab label="Animals Needing Foster" icon={<Pets />} />
          <Tab label="Matching" icon={<Assignment />} />
          <Tab label="Applications" icon={<Check />} />
        </Tabs>
      </Box>

      {/* Foster Families Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {mockFosterFamilies.map((foster, index) => (
            <Grid item xs={12} md={6} lg={4} key={foster.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Home />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {foster.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating value={foster.rating} precision={0.1} size="small" readOnly />
                          <Typography variant="body2" color="text.secondary">
                            ({foster.rating})
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={foster.availability}
                        size="small"
                        color={getAvailabilityColor(foster.availability) as any}
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <LocationOn fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {foster.address}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Phone fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {foster.phone}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Email fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {foster.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Capacity:</strong> {foster.currentAnimals.length}/{foster.capacity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Total Fostered:</strong> {foster.totalAnimals} animals
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Specialties:</strong> {foster.specialties.join(', ')}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {foster.experience.map((exp) => (
                        <Chip key={exp} label={exp} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>

                  <CardActions>
                    <Button size="small" startIcon={<Visibility />}>
                      View Details
                    </Button>
                    <Button size="small" startIcon={<Edit />}>
                      Edit
                    </Button>
                    {foster.availability === 'available' && (
                      <Button size="small" variant="contained" startIcon={<Assignment />}>
                        Assign Animal
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Animals Needing Foster Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Grid container spacing={3}>
          {mockAnimalsNeedingFoster.map((animal, index) => (
            <Grid item xs={12} md={6} lg={4} key={animal.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card sx={{ height: '100%' }}>
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: `url(${animal.photos[0]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    <Chip
                      label={animal.urgency}
                      color={getUrgencyColor(animal.urgency) as any}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {animal.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {animal.breed} • {animal.age} {animal.age === 1 ? 'year' : animal.age < 1 ? 'months' : 'years'} • {animal.weight} lbs
                    </Typography>

                    <Typography variant="body2" paragraph>
                      {animal.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="primary" fontWeight={600} gutterBottom>
                        Foster Reason:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {animal.fosterReason}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="primary" fontWeight={600} gutterBottom>
                        Estimated Duration:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {animal.estimatedFosterDuration}
                      </Typography>
                    </Box>

                    {animal.specialRequirements && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="primary" fontWeight={600} gutterBottom>
                          Special Requirements:
                        </Typography>
                        <List dense>
                          {animal.specialRequirements.map((req, idx) => (
                            <ListItem key={idx} sx={{ py: 0 }}>
                              <Typography variant="body2" color="text.secondary">
                                • {req}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </CardContent>

                  <CardActions>
                    <Button size="small" startIcon={<Visibility />}>
                      View Details
                    </Button>
                    <Button 
                      size="small" 
                      variant="contained" 
                      startIcon={<Assignment />}
                      onClick={() => setSelectedTab(2)}
                    >
                      Find Foster
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Matching Tab */}
      <TabPanel value={selectedTab} index={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Foster Matching System
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Our AI-powered matching system considers animal needs, foster family experience, 
            capacity, and location to find the perfect foster placements.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                High Priority Matches
              </Typography>
              {mockAnimalsNeedingFoster.map((animal, index) => (
                <Card key={animal.id} sx={{ mb: 2, p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={animal.photos[0]} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" fontWeight={600}>
                        {animal.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {animal.fosterReason}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${90 - index * 5}% match`}
                      color="success"
                      size="small"
                    />
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleMatch(animal, mockFosterFamilies[0])}
                    >
                      Match
                    </Button>
                  </Box>
                </Card>
              ))}
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Available Foster Families
              </Typography>
              {mockFosterFamilies.filter(f => f.availability === 'available').map((foster) => (
                <Card key={foster.id} sx={{ mb: 2, p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar>
                      <Home />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" fontWeight={600}>
                        {foster.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Capacity: {foster.currentAnimals.length}/{foster.capacity}
                      </Typography>
                    </Box>
                    <Rating value={foster.rating} size="small" readOnly />
                  </Box>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      {/* Applications Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Foster Applications
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Track and manage new foster family applications through our approval process.
          </Typography>

          <Stepper orientation="vertical">
            {fosterApplicationSteps.map((step, index) => (
              <Step key={step} active={index <= 4} completed={index < 4}>
                <StepLabel>{step}</StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary">
                    Step {index + 1} of the foster approval process
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </TabPanel>

      {/* Match Confirmation Dialog */}
      <Dialog open={matchDialogOpen} onClose={() => setMatchDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Confirm Foster Placement</DialogTitle>
        <DialogContent>
          {selectedAnimal && selectedFoster && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Animal</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar src={selectedAnimal.photos[0]} />
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {selectedAnimal.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedAnimal.breed}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" paragraph>
                  {selectedAnimal.description}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Foster Family</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar>
                    <Home />
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {selectedFoster.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedFoster.address}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2">
                  Experience: {selectedFoster.experience.join(', ')}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMatchDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setMatchDialogOpen(false)}>
            Confirm Placement
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FosterManagement;