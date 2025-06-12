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
  RadioGroup,
  Radio,
  Checkbox,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Report,
  Add,
  LocationOn,
  Schedule,
  TrendingUp,
  Pets,
  Warning,
  Emergency,
  CheckCircle,
  Visibility,
  Edit,
  Share,
  Phone,
  Email,
  CameraAlt,
  Videocam,
  Assignment,
  Security,
  LocalPolice,
  HealthAndSafety,
  Psychology,
  Group,
  Analytics,
  Map,
  Gavel,
  ContactSupport,
  PriorityHigh,
  Info,
  Error,
  PhotoCamera,
  ExpandMore,
  Flag,
  SOS,
  Investigation,
  PersonSearch,
  DocumentScanner,
  Backup,
  CloudUpload,
  Timeline as TimelineIcon,
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
} from 'recharts';

// Mock data for complaints and rescue reports
const mockComplaints = [
  {
    id: 'CMP-001',
    type: 'animal-abuse',
    status: 'under-investigation',
    priority: 'high',
    title: 'Suspected Dog Abuse in Downtown Area',
    description: 'Multiple reports of a dog being kept in poor conditions with inadequate food and shelter.',
    reportedDate: new Date('2024-03-18'),
    location: {
      address: '123 Main Street, Springfield, IL 62701',
      coordinates: { lat: 39.7817, lng: -89.6501 },
      landmark: 'Near the old warehouse district',
    },
    reporter: {
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      isAnonymous: false,
      relationship: 'neighbor',
    },
    animals: [
      {
        species: 'dog',
        breed: 'Mixed Breed',
        approximateAge: '2-3 years',
        description: 'Brown and white medium-sized dog, appears malnourished',
        immediateRisk: 'high',
      },
    ],
    evidence: {
      photos: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
      videos: ['/api/placeholder/video.mp4'],
      documents: [],
      witnessStatements: 2,
    },
    assignedTo: {
      officer: 'Officer Martinez',
      department: 'Animal Control',
      badgeNumber: 'AC-452',
      phone: '(555) 911-HELP',
    },
    timeline: [
      {
        date: new Date('2024-03-18T09:00:00'),
        action: 'Initial report received',
        actor: 'System',
        details: 'Complaint filed through online portal',
      },
      {
        date: new Date('2024-03-18T10:30:00'),
        action: 'Assigned to officer',
        actor: 'Supervisor Johnson',
        details: 'Case assigned to Officer Martinez for investigation',
      },
      {
        date: new Date('2024-03-18T14:00:00'),
        action: 'Initial site visit',
        actor: 'Officer Martinez',
        details: 'Property inspected, animal observed, photos taken',
      },
      {
        date: new Date('2024-03-19T09:00:00'),
        action: 'Follow-up investigation',
        actor: 'Officer Martinez',
        details: 'Interview with property owner scheduled',
      },
    ],
    legalActions: [
      {
        action: 'Notice of Violation',
        date: new Date('2024-03-19'),
        description: 'Formal notice issued for inadequate animal care',
        complianceDeadline: new Date('2024-03-26'),
      },
    ],
    urgencyLevel: 'high',
    followUpRequired: true,
    nextAction: 'Property owner interview scheduled for tomorrow',
    estimatedResolutionDate: new Date('2024-03-25'),
  },
  {
    id: 'RSC-001',
    type: 'animal-rescue',
    status: 'completed',
    priority: 'critical',
    title: 'Emergency Rescue - Abandoned Cats',
    description: 'Multiple cats found abandoned in foreclosed property without food or water.',
    reportedDate: new Date('2024-03-15'),
    location: {
      address: '456 Oak Avenue, Springfield, IL 62702',
      coordinates: { lat: 39.7900, lng: -89.6400 },
      landmark: 'Foreclosed blue house with overgrown yard',
    },
    reporter: {
      name: 'Anonymous',
      isAnonymous: true,
      relationship: 'concerned-citizen',
    },
    animals: [
      {
        species: 'cat',
        count: 7,
        description: 'Various ages, multiple appear to be kittens',
        immediateRisk: 'critical',
        rescueStatus: 'rescued',
      },
    ],
    rescueDetails: {
      rescueDate: new Date('2024-03-15T16:00:00'),
      rescueTeam: ['Officer Davis', 'Volunteer Smith', 'Vet Tech Johnson'],
      animalsRescued: 7,
      animalsRequiringMedicalCare: 5,
      timeOnScene: 180, // minutes
      challenges: ['Property access', 'Multiple scared animals', 'Kitten health concerns'],
    },
    outcome: {
      status: 'successful',
      animalsPlaced: 7,
      placementTypes: {
        'emergency-foster': 5,
        'veterinary-care': 2,
      },
      followUpScheduled: true,
    },
    costs: {
      estimated: 2500,
      actual: 2350,
      breakdown: {
        'veterinary-care': 1200,
        'supplies': 450,
        'transport': 200,
        'temporary-housing': 500,
      },
    },
  },
];

const complaintMetrics = [
  { month: 'Jan', abuse: 12, neglect: 18, abandonment: 8, other: 5 },
  { month: 'Feb', abuse: 15, neglect: 22, abandonment: 10, other: 7 },
  { month: 'Mar', abuse: 18, neglect: 25, abandonment: 12, other: 9 },
  { month: 'Apr', abuse: 14, neglect: 20, abandonment: 9, other: 6 },
  { month: 'May', abuse: 16, neglect: 24, abandonment: 11, other: 8 },
  { month: 'Jun', abuse: 19, neglect: 28, abandonment: 14, other: 10 },
];

const statusDistribution = [
  { name: 'Under Investigation', value: 35, color: '#ff9800' },
  { name: 'Resolved', value: 45, color: '#4caf50' },
  { name: 'Pending', value: 15, color: '#2196f3' },
  { name: 'Closed', value: 5, color: '#9e9e9e' },
];

const emergencyProtocols = [
  {
    id: 'EP-001',
    name: 'Animal Abuse Response',
    description: 'Immediate response protocol for reports of animal abuse',
    responseTime: '2 hours',
    requiredPersonnel: ['Animal Control Officer', 'Veterinarian (if needed)'],
    steps: [
      'Assess urgency and immediate danger',
      'Dispatch officer to scene',
      'Document evidence',
      'Secure animal safety',
      'Initiate legal proceedings if necessary',
    ],
  },
  {
    id: 'EP-002',
    name: 'Emergency Rescue',
    description: 'Protocol for emergency animal rescue situations',
    responseTime: '1 hour',
    requiredPersonnel: ['Rescue Team', 'Veterinary Support', 'Transport'],
    steps: [
      'Assess situation and safety',
      'Mobilize rescue team',
      'Execute rescue operation',
      'Provide immediate medical care',
      'Transport to emergency facilities',
    ],
  },
];

interface ComplaintReportingProps {
  userId?: string;
}

const ComplaintReporting: React.FC<ComplaintReportingProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [complaintDetailsOpen, setComplaintDetailsOpen] = useState(false);
  const [reportType, setReportType] = useState('');

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under-investigation': return 'warning';
      case 'resolved': return 'success';
      case 'pending': return 'info';
      case 'closed': return 'default';
      case 'completed': return 'success';
      case 'emergency': return 'error';
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

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'animal-abuse': return <Warning />;
      case 'animal-neglect': return <Pets />;
      case 'animal-rescue': return <Emergency />;
      case 'abandonment': return <PersonSearch />;
      default: return <Report />;
    }
  };

  const handleViewComplaint = (complaint: any) => {
    setSelectedComplaint(complaint);
    setComplaintDetailsOpen(true);
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
              Complaint & Rescue Reporting
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track animal welfare complaints, coordinate rescues, and manage legal actions
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Emergency />} color="error">
              Emergency Rescue
            </Button>
            <Button variant="outlined" startIcon={<Analytics />}>
              Reports Dashboard
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={() => setReportDialogOpen(true)}
            >
              File Report
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Emergency Alert */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small">
              Respond Now
            </Button>
          }
        >
          🚨 Critical rescue operation in progress - 7 animals rescued from abandonment case
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
                <Report color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="primary">
                  {mockComplaints.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Cases
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
                  156
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cases Resolved
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
                  4.2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg Response Time (hrs)
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="Active Cases" icon={<Report />} />
          <Tab label="Emergency Protocols" icon={<Emergency />} />
          <Tab label="Legal Actions" icon={<Gavel />} />
          <Tab label="Analytics" icon={<Analytics />} />
        </Tabs>
      </Box>

      {/* Active Cases Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {mockComplaints.map((complaint, index) => (
            <Grid item xs={12} lg={6} key={complaint.id}>
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
                        {getReportTypeIcon(complaint.type)}
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {complaint.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {complaint.type.replace('-', ' ').toUpperCase()}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label={complaint.status.replace('-', ' ')}
                          color={getStatusColor(complaint.status) as any}
                          size="small"
                        />
                        <Chip
                          label={complaint.priority}
                          color={getPriorityColor(complaint.priority) as any}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>

                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      {complaint.title}
                    </Typography>

                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      paragraph
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {complaint.description}
                    </Typography>

                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {complaint.location.address}
                      </Typography>
                    </Box>

                    {/* Timeline */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Reported: {complaint.reportedDate.toLocaleDateString()}
                      </Typography>
                    </Box>

                    {/* Animals Involved */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Animals Involved
                      </Typography>
                      {complaint.animals.map((animal, idx) => (
                        <Chip
                          key={idx}
                          label={`${animal.species} ${animal.count ? `(${animal.count})` : ''}`}
                          size="small"
                          icon={<Pets />}
                          color={animal.immediateRisk === 'critical' ? 'error' : animal.immediateRisk === 'high' ? 'warning' : 'default'}
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>

                    {/* Assigned Officer */}
                    {complaint.assignedTo && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                          <LocalPolice />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {complaint.assignedTo.officer}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {complaint.assignedTo.department}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {/* Evidence */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Evidence:
                      </Typography>
                      {complaint.evidence.photos.length > 0 && (
                        <Chip
                          label={`${complaint.evidence.photos.length} photos`}
                          size="small"
                          icon={<PhotoCamera />}
                          variant="outlined"
                        />
                      )}
                      {complaint.evidence.videos.length > 0 && (
                        <Chip
                          label={`${complaint.evidence.videos.length} videos`}
                          size="small"
                          icon={<Videocam />}
                          variant="outlined"
                        />
                      )}
                    </Box>

                    {/* Next Action */}
                    {complaint.nextAction && (
                      <Box sx={{ bgcolor: 'grey.50', p: 1, borderRadius: 1 }}>
                        <Typography variant="caption" fontWeight={600} color="primary">
                          Next Action:
                        </Typography>
                        <Typography variant="caption" display="block">
                          {complaint.nextAction}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Box>
                      <IconButton size="small">
                        <Phone />
                      </IconButton>
                      <IconButton size="small">
                        <Email />
                      </IconButton>
                      <IconButton size="small">
                        <Map />
                      </IconButton>
                    </Box>
                    
                    <Box>
                      <Button size="small" startIcon={<Edit />}>
                        Update
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<Visibility />}
                        onClick={() => handleViewComplaint(complaint)}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Emergency Protocols Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Grid container spacing={3}>
          {emergencyProtocols.map((protocol, index) => (
            <Grid item xs={12} md={6} key={protocol.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Emergency color="error" />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {protocol.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Response Time: {protocol.responseTime}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" paragraph>
                      {protocol.description}
                    </Typography>

                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Required Personnel
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                      {protocol.requiredPersonnel.map((person) => (
                        <Chip
                          key={person}
                          label={person}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Protocol Steps
                    </Typography>
                    <List dense>
                      {protocol.steps.map((step, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <Typography variant="body2" fontWeight={600} color="primary">
                              {idx + 1}
                            </Typography>
                          </ListItemIcon>
                          <ListItemText
                            primary={step}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>

                  <CardActions>
                    <Button size="small" startIcon={<Assignment />}>
                      View Full Protocol
                    </Button>
                    <Button size="small" variant="contained" startIcon={<Emergency />} color="error">
                      Activate Protocol
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Legal Actions Tab */}
      <TabPanel value={selectedTab} index={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Legal Actions and Compliance
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Gavel color="warning" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4" fontWeight={700} color="warning.main">
                    23
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Legal Cases
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Assignment color="info" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4" fontWeight={700} color="info.main">
                    156
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Violations Issued
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    89%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Compliance Rate
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Recent Legal Actions
            </Typography>
            <List>
              {mockComplaints
                .filter(complaint => complaint.legalActions && complaint.legalActions.length > 0)
                .map((complaint) => (
                  <ListItem key={complaint.id}>
                    <ListItemIcon>
                      <Gavel />
                    </ListItemIcon>
                    <ListItemText
                      primary={complaint.legalActions![0].action}
                      secondary={`${complaint.id} - ${complaint.legalActions![0].description}`}
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label={`Due: ${complaint.legalActions![0].complianceDeadline?.toLocaleDateString()}`}
                        size="small"
                        color="warning"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </Box>
        </Paper>
      </TabPanel>

      {/* Analytics Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Grid container spacing={3}>
          {/* Complaint Trends */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Complaint Trends by Type
                </Typography>
                
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={complaintMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="abuse" fill="#f44336" name="Abuse" />
                    <Bar dataKey="neglect" fill="#ff9800" name="Neglect" />
                    <Bar dataKey="abandonment" fill="#2196f3" name="Abandonment" />
                    <Bar dataKey="other" fill="#4caf50" name="Other" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Grid>

          {/* Status Distribution */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Case Status Distribution
                </Typography>
                
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <Box sx={{ mt: 2 }}>
                  {statusDistribution.map((item) => (
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
        <Tooltip title="Emergency Rescue">
          <Fab color="error" size="medium">
            <SOS />
          </Fab>
        </Tooltip>
        
        <Tooltip title="File Report">
          <Fab color="primary" onClick={() => setReportDialogOpen(true)}>
            <Add />
          </Fab>
        </Tooltip>
      </Box>

      {/* File Report Dialog */}
      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>File Animal Welfare Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={reportType}
                  label="Report Type"
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <MenuItem value="animal-abuse">Animal Abuse</MenuItem>
                  <MenuItem value="animal-neglect">Animal Neglect</MenuItem>
                  <MenuItem value="abandonment">Animal Abandonment</MenuItem>
                  <MenuItem value="animal-rescue">Emergency Rescue Request</MenuItem>
                  <MenuItem value="other">Other Concern</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Brief Description"
                fullWidth
                multiline
                rows={2}
                placeholder="Provide a brief description of the situation..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Detailed Description"
                fullWidth
                multiline
                rows={4}
                placeholder="Provide detailed information about what you observed, including animal conditions, environment, and any immediate concerns..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Location"
                fullWidth
                placeholder="Street address, landmark, or detailed location description"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Date of Incident"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Time of Incident"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Reporter Information
              </Typography>
              <FormControlLabel
                control={<Checkbox />}
                label="File this report anonymously"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField label="Your Name" fullWidth />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField label="Contact Phone" fullWidth />
            </Grid>
            
            <Grid item xs={12}>
              <TextField label="Email Address" type="email" fullWidth />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Evidence (Optional)
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  component="label"
                >
                  Upload Photos
                  <input type="file" hidden multiple accept="image/*" />
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Videocam />}
                  component="label"
                >
                  Upload Videos
                  <input type="file" hidden multiple accept="video/*" />
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="body2">
                  All reports are taken seriously and will be investigated by qualified animal control officers. 
                  If this is an emergency situation requiring immediate response, please call our emergency hotline.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setReportDialogOpen(false)}>
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* Complaint Details Dialog */}
      <Dialog open={complaintDetailsOpen} onClose={() => setComplaintDetailsOpen(false)} maxWidth="lg" fullWidth>
        {selectedComplaint && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {getReportTypeIcon(selectedComplaint.type)}
                <Typography variant="h6" fontWeight={600}>
                  {selectedComplaint.id} - {selectedComplaint.title}
                </Typography>
                <Chip
                  label={selectedComplaint.status.replace('-', ' ')}
                  color={getStatusColor(selectedComplaint.status) as any}
                  size="small"
                />
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Case Timeline
                  </Typography>
                  
                  <Timeline>
                    {selectedComplaint.timeline.map((event: any, index: number) => (
                      <TimelineItem key={index}>
                        <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                          {event.date.toLocaleString()}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color="primary" />
                          {index < selectedComplaint.timeline.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                          <Typography variant="h6" component="span">
                            {event.action}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            by {event.actor}
                          </Typography>
                          <Typography variant="body2">
                            {event.details}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Case Details
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Location:</strong> {selectedComplaint.location.address}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Reporter:</strong> {selectedComplaint.reporter.isAnonymous ? 'Anonymous' : selectedComplaint.reporter.name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Priority:</strong> {selectedComplaint.priority}
                    </Typography>
                  </Box>
                  
                  {selectedComplaint.assignedTo && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Assigned Officer:</strong> {selectedComplaint.assignedTo.officer}
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Evidence:</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
                      {selectedComplaint.evidence.photos.length > 0 && (
                        <Chip label={`${selectedComplaint.evidence.photos.length} photos`} size="small" />
                      )}
                      {selectedComplaint.evidence.videos.length > 0 && (
                        <Chip label={`${selectedComplaint.evidence.videos.length} videos`} size="small" />
                      )}
                      {selectedComplaint.evidence.witnessStatements > 0 && (
                        <Chip label={`${selectedComplaint.evidence.witnessStatements} witnesses`} size="small" />
                      )}
                    </Box>
                  </Box>
                  
                  {selectedComplaint.estimatedResolutionDate && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Est. Resolution:</strong> {selectedComplaint.estimatedResolutionDate.toLocaleDateString()}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setComplaintDetailsOpen(false)}>
                Close
              </Button>
              <Button variant="outlined" startIcon={<Edit />}>
                Update Case
              </Button>
              <Button variant="contained" startIcon={<Assignment />}>
                Generate Report
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ComplaintReporting;