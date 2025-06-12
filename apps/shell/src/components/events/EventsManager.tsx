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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Event,
  Add,
  People,
  Pets,
  LocationOn,
  Schedule,
  TrendingUp,
  CheckCircle,
  Cancel,
  Edit,
  Visibility,
  Share,
  QrCode,
  Assignment,
  AttachMoney,
  CampaignOutlined,
  VolunteerActivism,
  Analytics,
  Download,
  Phone,
  Email,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { AdoptionEvent, EventRegistration, EventMetrics } from '@shelter/types/events';

// Mock data
const mockEvents: AdoptionEvent[] = [
  {
    id: '1',
    title: 'Spring Adoption Fair',
    description: 'Join us for our biggest adoption event of the season! Meet dozens of wonderful animals looking for their forever homes.',
    type: 'adoption-fair',
    startDate: new Date('2024-04-20'),
    endDate: new Date('2024-04-20'),
    startTime: '10:00',
    endTime: '16:00',
    timezone: 'America/Chicago',
    location: {
      type: 'offsite',
      name: 'Springfield Community Center',
      address: '123 Main Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      hasParking: true,
      isAccessible: true,
      indoorSpace: true,
      outdoorSpace: true,
      hasElectricity: true,
      hasWater: true,
      hasRestrooms: true,
      hasWifi: true,
      permitsRequired: [],
      insuranceRequired: true,
      setupTime: '08:00',
      teardownTime: '17:00',
    },
    maxAttendees: 500,
    currentRegistrations: 247,
    allowWalkIns: true,
    requiresRegistration: false,
    participatingAnimals: ['1', '2', '3', '4', '5'],
    featuredAnimals: ['1', '2'],
    organizer: 'staff1',
    volunteers: [
      {
        volunteerId: 'vol1',
        role: 'registration',
        shift: { startTime: '09:00', endTime: '17:00' },
        status: 'confirmed',
      },
      {
        volunteerId: 'vol2',
        role: 'animal-handler',
        shift: { startTime: '10:00', endTime: '16:00' },
        status: 'confirmed',
      },
    ],
    requiredVolunteers: 15,
    staffAssigned: ['staff1', 'staff2', 'staff3'],
    status: 'registration-open',
    publishDate: new Date('2024-03-01'),
    promotionalImages: ['/api/placeholder/600/400'],
    socialMediaPosts: [],
    supplies: [],
    setup: {
      areas: [],
      timeline: [],
      specialRequirements: [],
    },
    equipment: [],
    registrations: [],
    walkInAttendees: [],
    adoptions: [],
    leads: [],
    feedback: [],
    budget: {
      totalBudget: 5000,
      categories: [],
      contingency: 10,
      approvedBy: 'admin1',
      approvedDate: new Date(),
    },
    expenses: [],
    revenue: [],
    metrics: {
      attendance: {
        registered: 247,
        walkIns: 0,
        total: 247,
        noShows: 0,
        noShowRate: 0,
      },
      engagement: {
        averageTimeSpent: 0,
        animalInteractions: 0,
        informationRequests: 0,
        businessCardsCollected: 0,
      },
      adoptions: {
        total: 0,
        bySpecies: {},
        averageProcessingTime: 0,
        totalFees: 0,
      },
      leads: {
        total: 0,
        byInterestLevel: {},
        expectedConversions: 0,
      },
      financial: {
        totalRevenue: 0,
        totalExpenses: 0,
        netProfit: 0,
        costPerAttendee: 0,
        revenuePerAdoption: 0,
      },
      marketing: {
        totalReach: 0,
        totalImpressions: 0,
        clickThroughRate: 0,
        costPerClick: 0,
        conversionRate: 0,
      },
      satisfaction: {
        averageRating: 0,
        recommendationRate: 0,
        returnAttendeeRate: 0,
      },
    },
    followUpRequired: true,
    followUpTasks: [],
    createdBy: 'staff1',
    createdDate: new Date('2024-03-01'),
    lastModified: new Date(),
    modifiedBy: 'staff1',
  },
];

const mockRegistrations: EventRegistration[] = [
  {
    id: '1',
    attendeeInfo: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      address: {
        street: '123 Oak Street',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701',
      },
      hasExperience: true,
      currentPets: '1 dog',
      housingType: 'house',
      hasYard: true,
    },
    registrationDate: new Date('2024-03-15'),
    status: 'confirmed',
    numberOfAttendees: 2,
    accompaniedBy: ['Mike Johnson'],
    interestedInAdoption: true,
    preferredAnimals: ['1'],
    communicationPreferences: {
      email: true,
      sms: false,
      phone: false,
    },
    followUpConsent: true,
    marketingConsent: true,
    feesPaid: false,
  },
];

interface EventsManagerProps {
  userId?: string;
}

const EventsManager: React.FC<EventsManagerProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AdoptionEvent | null>(null);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'default';
      case 'published': return 'info';
      case 'registration-open': return 'success';
      case 'registration-closed': return 'warning';
      case 'in-progress': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'adoption-fair': return <Pets />;
      case 'fundraiser': return <AttachMoney />;
      case 'education': return <Assignment />;
      case 'training': return <VolunteerActivism />;
      default: return <Event />;
    }
  };

  const handleViewEvent = (event: AdoptionEvent) => {
    setSelectedEvent(event);
    setEventDetailsOpen(true);
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
              Events Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Plan, manage, and track adoption events and community outreach
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Analytics />}>
              Event Analytics
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreateEventOpen(true)}
            >
              Create Event
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
                <Event color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="primary">
                  {mockEvents.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upcoming Events
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
                <People color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="secondary">
                  {mockEvents.reduce((sum, event) => sum + event.currentRegistrations, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Registrations
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
                  89
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Adoptions This Month
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
                <TrendingUp color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  4.8
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Event Rating
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="All Events" icon={<Event />} />
          <Tab 
            label={
              <Badge badgeContent={mockRegistrations.length} color="secondary">
                Registrations
              </Badge>
            } 
            icon={<People />} 
          />
          <Tab label="Analytics" icon={<Analytics />} />
          <Tab label="Templates" icon={<Assignment />} />
        </Tabs>
      </Box>

      {/* All Events Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {mockEvents.map((event, index) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
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
                      backgroundImage: `url(${event.promotionalImages[0]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    <Chip
                      label={event.status.replace('-', ' ')}
                      color={getStatusColor(event.status) as any}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    />
                    
                    <Chip
                      label={event.type.replace('-', ' ')}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        textTransform: 'capitalize',
                      }}
                    />
                  </Box>

                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {event.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {event.description.substring(0, 100)}...
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {event.startDate.toLocaleDateString()} at {event.startTime}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {event.location.name}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <People fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {event.currentRegistrations} registered
                        {event.maxAttendees && ` / ${event.maxAttendees} max`}
                      </Typography>
                    </Box>

                    {/* Registration Progress */}
                    {event.maxAttendees && (
                      <Box sx={{ mb: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(event.currentRegistrations / event.maxAttendees) * 100}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {Math.round((event.currentRegistrations / event.maxAttendees) * 100)}% capacity
                        </Typography>
                      </Box>
                    )}

                    {/* Animals and Volunteers */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={`${event.participatingAnimals.length} animals`}
                        size="small"
                        icon={<Pets />}
                        variant="outlined"
                      />
                      <Chip
                        label={`${event.volunteers.length}/${event.requiredVolunteers} volunteers`}
                        size="small"
                        icon={<VolunteerActivism />}
                        variant="outlined"
                        color={event.volunteers.length >= event.requiredVolunteers ? 'success' : 'warning'}
                      />
                    </Box>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Box>
                      <IconButton size="small">
                        <Share />
                      </IconButton>
                      <IconButton size="small">
                        <QrCode />
                      </IconButton>
                    </Box>
                    
                    <Box>
                      <Button size="small" startIcon={<Edit />}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<Visibility />}
                        onClick={() => handleViewEvent(event)}
                      >
                        View
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Registrations Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Event Registrations
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attendee</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Registration Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Party Size</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockRegistrations.map((registration, index) => (
                  <motion.tr
                    key={registration.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    component={TableRow}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {registration.attendeeInfo.firstName} {registration.attendeeInfo.lastName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {registration.attendeeInfo.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        Spring Adoption Fair
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {registration.registrationDate.toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={registration.status}
                        size="small"
                        color={registration.status === 'confirmed' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {registration.numberOfAttendees}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Phone />
                      </IconButton>
                      <IconButton size="small">
                        <Email />
                      </IconButton>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* Analytics Tab */}
      <TabPanel value={selectedTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Event Performance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Analytics dashboard showing event success metrics, attendance trends, and ROI analysis.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Adoption Outcomes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track adoptions completed at events, follow-up success rates, and animal placement efficiency.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Templates Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Event Templates
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Save time with pre-configured event templates for common adoption events.
          </Typography>
          
          <Grid container spacing={2}>
            {[
              { name: 'Adoption Fair', description: 'Large outdoor adoption event', uses: 12 },
              { name: 'Meet & Greet', description: 'Small indoor meet sessions', uses: 8 },
              { name: 'Fundraiser', description: 'Community fundraising event', uses: 5 },
            ].map((template, index) => (
              <Grid item xs={12} md={4} key={template.name}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {template.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {template.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Used {template.uses} times
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Use Template</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </TabPanel>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={() => setCreateEventOpen(true)}
      >
        <Add />
      </Fab>

      {/* Create Event Dialog */}
      <Dialog open={createEventOpen} onClose={() => setCreateEventOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField label="Event Title" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Event Type</InputLabel>
                <Select label="Event Type">
                  <MenuItem value="adoption-fair">Adoption Fair</MenuItem>
                  <MenuItem value="meet-and-greet">Meet & Greet</MenuItem>
                  <MenuItem value="fundraiser">Fundraiser</MenuItem>
                  <MenuItem value="education">Education</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Start Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Location" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Maximum Attendees"
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateEventOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setCreateEventOpen(false)}>
            Create Event
          </Button>
        </DialogActions>
      </Dialog>

      {/* Event Details Dialog */}
      <Dialog open={eventDetailsOpen} onClose={() => setEventDetailsOpen(false)} maxWidth="lg" fullWidth>
        {selectedEvent && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  {selectedEvent.title}
                </Typography>
                <Chip
                  label={selectedEvent.status.replace('-', ' ')}
                  color={getStatusColor(selectedEvent.status) as any}
                  size="small"
                />
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Event Details
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Type:</strong> {selectedEvent.type.replace('-', ' ')}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Date:</strong> {selectedEvent.startDate.toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Time:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Location:</strong> {selectedEvent.location.name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Registrations:</strong> {selectedEvent.currentRegistrations}
                      {selectedEvent.maxAttendees && ` / ${selectedEvent.maxAttendees}`}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Quick Actions
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="outlined" startIcon={<People />} fullWidth>
                      View Registrations ({selectedEvent.currentRegistrations})
                    </Button>
                    <Button variant="outlined" startIcon={<Pets />} fullWidth>
                      Manage Animals ({selectedEvent.participatingAnimals.length})
                    </Button>
                    <Button variant="outlined" startIcon={<VolunteerActivism />} fullWidth>
                      Manage Volunteers ({selectedEvent.volunteers.length})
                    </Button>
                    <Button variant="outlined" startIcon={<Analytics />} fullWidth>
                      View Analytics
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setEventDetailsOpen(false)}>
                Close
              </Button>
              <Button variant="contained" startIcon={<Edit />}>
                Edit Event
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default EventsManager;