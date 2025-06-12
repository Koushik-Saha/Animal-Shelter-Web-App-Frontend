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
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Fab,
  Tooltip,
  Rating,
  Slider,
  Switch,
  FormControlLabel,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Psychology,
  Add,
  Pets,
  Schedule,
  TrendingUp,
  Assignment,
  Star,
  PlayArrow,
  Pause,
  CheckCircle,
  Warning,
  Analytics,
  Edit,
  Visibility,
  Timer,
  EmojiEvents,
  Group,
  Assessment,
  Favorite,
  FitnessCenter,
  Sports,
  SportsHandball,
  SportsBasketball,
  Restaurant,
  Toys,
  PsychologyAlt,
  ExpandMore,
  FilterList,
  Event,
  Today,
  DateRange,
  AccessTime,
  InsertChart,
  Download,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Mock data
const mockAnimals = [
  {
    id: '1',
    name: 'Max',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    kennelNumber: 'K-12',
    image: '/api/placeholder/150/150',
    behaviorProfile: {
      energyLevel: 4,
      socialSkills: 5,
      trainability: 4,
      anxietyLevel: 2,
      aggressionLevel: 1,
      playfulness: 5,
    },
    currentEnrichment: ['puzzle-feeder', 'rope-toy', 'social-play'],
    behaviorGoals: [
      { id: '1', goal: 'Reduce separation anxiety', progress: 70, targetDate: new Date('2024-05-01') },
      { id: '2', goal: 'Improve leash walking', progress: 85, targetDate: new Date('2024-04-15') },
    ],
  },
  {
    id: '2',
    name: 'Luna',
    species: 'cat',
    breed: 'Domestic Shorthair',
    age: 2,
    kennelNumber: 'C-05',
    image: '/api/placeholder/150/150',
    behaviorProfile: {
      energyLevel: 3,
      socialSkills: 2,
      trainability: 3,
      anxietyLevel: 4,
      aggressionLevel: 2,
      playfulness: 4,
    },
    currentEnrichment: ['feather-wand', 'catnip-toy', 'hiding-spots'],
    behaviorGoals: [
      { id: '3', goal: 'Increase human interaction', progress: 45, targetDate: new Date('2024-04-30') },
    ],
  },
];

const behaviorMetrics = [
  { date: 'Mon', energy: 4, social: 3, anxiety: 2, aggression: 1 },
  { date: 'Tue', energy: 5, social: 4, anxiety: 2, aggression: 1 },
  { date: 'Wed', energy: 3, social: 4, anxiety: 3, aggression: 1 },
  { date: 'Thu', energy: 4, social: 5, anxiety: 2, aggression: 1 },
  { date: 'Fri', energy: 5, social: 5, anxiety: 1, aggression: 1 },
  { date: 'Sat', energy: 4, social: 4, anxiety: 2, aggression: 1 },
  { date: 'Sun', energy: 3, social: 3, anxiety: 3, aggression: 1 },
];

const enrichmentActivities = [
  {
    id: '1',
    name: 'Puzzle Feeder',
    type: 'cognitive',
    duration: 15,
    difficulty: 'medium',
    species: ['dog', 'cat'],
    benefits: ['mental-stimulation', 'slow-eating'],
    equipment: ['puzzle-feeder', 'treats'],
  },
  {
    id: '2',
    name: 'Agility Course',
    type: 'physical',
    duration: 20,
    difficulty: 'high',
    species: ['dog'],
    benefits: ['exercise', 'confidence-building'],
    equipment: ['cones', 'tunnels', 'jumps'],
  },
  {
    id: '3',
    name: 'Scent Work',
    type: 'cognitive',
    duration: 10,
    difficulty: 'easy',
    species: ['dog', 'cat'],
    benefits: ['natural-behavior', 'stress-relief'],
    equipment: ['treats', 'hiding-spots'],
  },
];

const todaySchedule = [
  {
    id: '1',
    animalId: '1',
    animalName: 'Max',
    activity: 'Morning Walk',
    time: '08:00',
    duration: 30,
    type: 'exercise',
    assignedTo: 'Staff Member 1',
    status: 'completed',
  },
  {
    id: '2',
    animalId: '1',
    animalName: 'Max',
    activity: 'Puzzle Feeder',
    time: '10:00',
    duration: 15,
    type: 'enrichment',
    assignedTo: 'Volunteer 2',
    status: 'in-progress',
  },
  {
    id: '3',
    animalId: '2',
    animalName: 'Luna',
    activity: 'Interactive Play',
    time: '14:00',
    duration: 20,
    type: 'socialization',
    assignedTo: 'Staff Member 2',
    status: 'scheduled',
  },
];

interface BehaviorModuleProps {
  userId?: string;
}

const BehaviorModule: React.FC<BehaviorModuleProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [logBehaviorOpen, setLogBehaviorOpen] = useState(false);
  const [scheduleActivityOpen, setScheduleActivityOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const getBehaviorColor = (level: number) => {
    if (level <= 2) return 'success';
    if (level <= 3) return 'warning';
    return 'error';
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'exercise': return <FitnessCenter />;
      case 'enrichment': return <Toys />;
      case 'socialization': return <Group />;
      case 'training': return <Psychology />;
      case 'cognitive': return <PsychologyAlt />;
      default: return <Pets />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'scheduled': return 'info';
      case 'overdue': return 'error';
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
              Animal Behavior & Enrichment
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track behavior patterns, schedule enrichment activities, and monitor progress
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Analytics />}>
              Behavior Reports
            </Button>
            <Button variant="outlined" startIcon={<Schedule />} onClick={() => setScheduleActivityOpen(true)}>
              Schedule Activity
            </Button>
            <Button variant="contained" startIcon={<Add />} onClick={() => setLogBehaviorOpen(true)}>
              Log Behavior
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Psychology color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="primary">
                  {mockAnimals.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Animals in Program
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
                <Schedule color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="secondary">
                  {todaySchedule.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activities Today
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
                <TrendingUp color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="success.main">
                  87%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Goals on Track
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
                <EmojiEvents color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  15
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Milestones This Week
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="Animal Profiles" icon={<Pets />} />
          <Tab label="Daily Schedule" icon={<Schedule />} />
          <Tab label="Enrichment Library" icon={<Toys />} />
          <Tab label="Progress Analytics" icon={<Analytics />} />
        </Tabs>
      </Box>

      {/* Animal Profiles Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {mockAnimals.map((animal, index) => (
            <Grid item xs={12} md={6} lg={4} key={animal.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar
                        src={animal.image}
                        sx={{ width: 60, height: 60 }}
                      />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {animal.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {animal.breed} • {animal.kennelNumber}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Behavior Profile */}
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Behavior Profile
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      {Object.entries(animal.behaviorProfile).map(([key, value]) => (
                        <Box key={key} sx={{ mb: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </Typography>
                            <Typography variant="caption">{value}/5</Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(value as number) * 20}
                            sx={{ height: 4, borderRadius: 2 }}
                            color={getBehaviorColor(value as number) as any}
                          />
                        </Box>
                      ))}
                    </Box>

                    {/* Current Enrichment */}
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Current Enrichment
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                      {animal.currentEnrichment.map((enrichment) => (
                        <Chip
                          key={enrichment}
                          label={enrichment.replace('-', ' ')}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    {/* Behavior Goals */}
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Active Goals
                    </Typography>
                    {animal.behaviorGoals.map((goal) => (
                      <Box key={goal.id} sx={{ mb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption">
                            {goal.goal}
                          </Typography>
                          <Typography variant="caption">{goal.progress}%</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={goal.progress}
                          sx={{ height: 4, borderRadius: 2 }}
                          color={goal.progress >= 80 ? 'success' : goal.progress >= 50 ? 'warning' : 'error'}
                        />
                      </Box>
                    ))}
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button size="small" startIcon={<Psychology />}>
                      Log Behavior
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<Visibility />}
                      onClick={() => setSelectedAnimal(animal)}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Daily Schedule Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Today's Schedule - {new Date().toLocaleDateString()}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" startIcon={<FilterList />}>
                Filter
              </Button>
              <Button variant="contained" startIcon={<Add />} onClick={() => setScheduleActivityOpen(true)}>
                Add Activity
              </Button>
            </Box>
          </Box>

          <Timeline>
            {todaySchedule.map((activity, index) => (
              <TimelineItem key={activity.id}>
                <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                  {activity.time}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <TimelineDot color={getStatusColor(activity.status) as any}>
                      {getActivityTypeIcon(activity.type)}
                    </TimelineDot>
                  </motion.div>
                  {index < todaySchedule.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h6" component="span">
                            {activity.activity}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ display: 'block' }}>
                            {activity.animalName} • {activity.duration} minutes
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Assigned to: {activity.assignedTo}
                          </Typography>
                        </Box>
                        <Box>
                          <Chip
                            label={activity.status}
                            color={getStatusColor(activity.status) as any}
                            size="small"
                          />
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Paper>
      </TabPanel>

      {/* Enrichment Library Tab */}
      <TabPanel value={selectedTab} index={2}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Enrichment Activity Library
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Browse and schedule enrichment activities for animals based on their needs and preferences.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {enrichmentActivities.map((activity, index) => (
            <Grid item xs={12} md={6} lg={4} key={activity.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      {getActivityTypeIcon(activity.type)}
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {activity.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {activity.type} • {activity.duration} minutes
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={activity.difficulty}
                        size="small"
                        color={activity.difficulty === 'easy' ? 'success' : activity.difficulty === 'medium' ? 'warning' : 'error'}
                        sx={{ mr: 1 }}
                      />
                      {activity.species.map((species) => (
                        <Chip
                          key={species}
                          label={species}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 0.5 }}
                        />
                      ))}
                    </Box>

                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Benefits
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                      {activity.benefits.map((benefit) => (
                        <Chip
                          key={benefit}
                          label={benefit.replace('-', ' ')}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Equipment Needed
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.equipment.join(', ')}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button size="small" startIcon={<Schedule />}>
                      Schedule
                    </Button>
                    <Button size="small" startIcon={<Visibility />}>
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Progress Analytics Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Grid container spacing={3}>
          {/* Behavior Trends */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Weekly Behavior Trends
                </Typography>
                
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={behaviorMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 5]} />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="energy"
                      stroke="#2196F3"
                      strokeWidth={2}
                      name="Energy Level"
                    />
                    <Line
                      type="monotone"
                      dataKey="social"
                      stroke="#4CAF50"
                      strokeWidth={2}
                      name="Social Skills"
                    />
                    <Line
                      type="monotone"
                      dataKey="anxiety"
                      stroke="#FF9800"
                      strokeWidth={2}
                      name="Anxiety Level"
                    />
                    <Line
                      type="monotone"
                      dataKey="aggression"
                      stroke="#F44336"
                      strokeWidth={2}
                      name="Aggression Level"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Grid>

          {/* Goal Progress */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Goal Progress Overview
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  {mockAnimals.flatMap(animal => animal.behaviorGoals).map((goal) => (
                    <Box key={goal.id} sx={{ mb: 3 }}>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        {goal.goal}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={goal.progress}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                          color={goal.progress >= 80 ? 'success' : goal.progress >= 50 ? 'warning' : 'error'}
                        />
                        <Typography variant="body2" fontWeight={600}>
                          {goal.progress}%
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Target: {goal.targetDate.toLocaleDateString()}
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
        <Tooltip title="Schedule Activity">
          <Fab color="secondary" size="medium" onClick={() => setScheduleActivityOpen(true)}>
            <Schedule />
          </Fab>
        </Tooltip>
        
        <Tooltip title="Log Behavior">
          <Fab color="primary" onClick={() => setLogBehaviorOpen(true)}>
            <Add />
          </Fab>
        </Tooltip>
      </Box>

      {/* Log Behavior Dialog */}
      <Dialog open={logBehaviorOpen} onClose={() => setLogBehaviorOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Log Behavior Observation</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Animal</InputLabel>
                <Select label="Select Animal">
                  {mockAnimals.map((animal) => (
                    <MenuItem key={animal.id} value={animal.id}>
                      {animal.name} - {animal.kennelNumber}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date & Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Behavior Category</InputLabel>
                <Select label="Behavior Category">
                  <MenuItem value="social">Social Interaction</MenuItem>
                  <MenuItem value="play">Play Behavior</MenuItem>
                  <MenuItem value="anxiety">Anxiety/Stress</MenuItem>
                  <MenuItem value="aggression">Aggressive Behavior</MenuItem>
                  <MenuItem value="training">Training Response</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Detailed Observation"
                fullWidth
                multiline
                rows={4}
                placeholder="Describe the observed behavior in detail..."
              />
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Intensity Level</Typography>
              <Rating size="large" />
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Duration (minutes)</Typography>
              <Slider
                defaultValue={10}
                min={1}
                max={60}
                valueLabelDisplay="auto"
                marks={[
                  { value: 1, label: '1min' },
                  { value: 30, label: '30min' },
                  { value: 60, label: '60min' },
                ]}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogBehaviorOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setLogBehaviorOpen(false)}>
            Save Observation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Schedule Activity Dialog */}
      <Dialog open={scheduleActivityOpen} onClose={() => setScheduleActivityOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Schedule Enrichment Activity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Animal</InputLabel>
                <Select label="Select Animal">
                  {mockAnimals.map((animal) => (
                    <MenuItem key={animal.id} value={animal.id}>
                      {animal.name} - {animal.kennelNumber}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Activity Type</InputLabel>
                <Select label="Activity Type">
                  {enrichmentActivities.map((activity) => (
                    <MenuItem key={activity.id} value={activity.id}>
                      {activity.name}
                    </MenuItem>
                  ))}
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
            <Grid item xs={12} md={6}>
              <TextField
                label="Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Duration (minutes)"
                type="number"
                fullWidth
                defaultValue={15}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Assigned To</InputLabel>
                <Select label="Assigned To">
                  <MenuItem value="staff1">Staff Member 1</MenuItem>
                  <MenuItem value="staff2">Staff Member 2</MenuItem>
                  <MenuItem value="volunteer1">Volunteer 1</MenuItem>
                  <MenuItem value="volunteer2">Volunteer 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Special Instructions"
                fullWidth
                multiline
                rows={2}
                placeholder="Any special instructions or notes for this activity..."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch />}
                label="Repeat weekly"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleActivityOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setScheduleActivityOpen(false)}>
            Schedule Activity
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BehaviorModule;