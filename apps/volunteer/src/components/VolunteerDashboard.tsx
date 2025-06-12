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
  LinearProgress,
  IconButton,
  Badge,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Tooltip,
  Fab,
} from '@mui/material';
import {
  EmojiEvents,
  Schedule,
  Assignment,
  TrendingUp,
  Star,
  Pets,
  LocalHospital,
  School,
  People,
  Add,
  CheckCircle,
  Timer,
  LocationOn,
  Notifications,
  Share,
  QrCodeScanner,
  Celebration,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Confetti from 'react-confetti';
import Lottie from 'lottie-react';
import { Volunteer, VolunteerTask, Badge as VolunteerBadge } from '@shelter/types/volunteer';

// Mock data
const mockVolunteer: Volunteer = {
  id: '1',
  userId: 'user1',
  personalInfo: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    address: '123 Main St, City, State',
    emergencyContact: {
      name: 'John Johnson',
      phone: '(555) 987-6543',
      relationship: 'Spouse',
    },
  },
  status: 'active',
  joinDate: new Date('2023-01-15'),
  lastActiveDate: new Date(),
  skills: [],
  interests: ['dog-walking', 'cat-socializing'],
  certifications: [],
  availability: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [{ startTime: '09:00', endTime: '17:00', isRecurring: true }],
    sunday: [{ startTime: '09:00', endTime: '17:00', isRecurring: true }],
    blackoutDates: [],
  },
  preferredTasks: ['dog-walking', 'cleaning-kennels'],
  level: 8,
  totalHours: 245,
  totalPoints: 12580,
  badges: [
    {
      id: '1',
      name: 'Dog Walker Pro',
      description: 'Completed 100 dog walking sessions',
      icon: '🐕',
      rarity: 'epic',
      category: 'tasks',
      requirement: '100 dog walks',
      earnedDate: new Date('2023-06-15'),
    },
    {
      id: '2',
      name: 'Early Bird',
      description: 'Checked in before 7 AM for 10 shifts',
      icon: '🌅',
      rarity: 'rare',
      category: 'hours',
      requirement: '10 early shifts',
      earnedDate: new Date('2023-08-20'),
    },
  ],
  achievements: [],
  currentStreak: 12,
  longestStreak: 18,
  rating: 4.8,
  reviewCount: 34,
  reliability: 95,
  feedback: [],
  trainingCompleted: [],
  trainingInProgress: [],
  restrictions: [],
};

const mockTasks: VolunteerTask[] = [
  {
    id: '1',
    title: 'Morning Dog Walk - Group A',
    description: 'Walk 4 dogs from kennels 1-4 for 30 minutes in the main yard',
    type: 'dog-walking',
    priority: 'medium',
    assignedTo: '1',
    assignedBy: 'staff1',
    assignedDate: new Date(),
    scheduledDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    estimatedDuration: 45,
    status: 'assigned',
    location: 'Main Yard',
    requiredSkills: ['dog-handling'],
    animalIds: ['dog1', 'dog2', 'dog3', 'dog4'],
    pointsReward: 25,
    difficultyLevel: 2,
    isRecurring: false,
    instructions: 'Take extra care with Max (kennel 2) as he pulls on the leash',
  },
  {
    id: '2',
    title: 'Cat Socialization - Room 3',
    description: 'Spend time socializing shy cats to help them become more adoptable',
    type: 'cat-socializing',
    priority: 'high',
    assignedTo: '1',
    assignedBy: 'staff1',
    assignedDate: new Date(),
    scheduledDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    estimatedDuration: 60,
    status: 'assigned',
    location: 'Cat Room 3',
    requiredSkills: ['cat-handling'],
    animalIds: ['cat1', 'cat2', 'cat3'],
    pointsReward: 35,
    difficultyLevel: 3,
    isRecurring: false,
    instructions: 'Work slowly with Luna - she is very shy but responds well to treats',
  },
];

const recentBadges = [
  { name: 'Compassionate Care', icon: '❤️', level: 'rare', earnedToday: true },
  { name: '50 Hours Milestone', icon: '⏰', level: 'epic', earnedToday: false },
];

interface VolunteerDashboardProps {
  volunteerId?: string;
}

const VolunteerDashboard: React.FC<VolunteerDashboardProps> = ({ volunteerId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scanningQR, setScanningQR] = useState(false);

  const levelProgress = (mockVolunteer.totalPoints % 1000) / 1000 * 100;
  const nextLevelPoints = (mockVolunteer.level + 1) * 1000;
  const pointsToNextLevel = nextLevelPoints - mockVolunteer.totalPoints;

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const handleCheckIn = () => {
    setScanningQR(true);
    // Simulate QR scan
    setTimeout(() => {
      setScanningQR(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 2000);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {mockVolunteer.personalInfo.firstName[0]}{mockVolunteer.personalInfo.lastName[0]}
            </Avatar>
          </motion.div>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" fontWeight={700}>
              Welcome back, {mockVolunteer.personalInfo.firstName}! 👋
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Chip
                label={`Level ${mockVolunteer.level}`}
                color="primary"
                variant="filled"
                icon={<EmojiEvents />}
              />
              <Chip
                label={`${mockVolunteer.totalHours} hours`}
                color="secondary"
                variant="outlined"
                icon={<Timer />}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Star color="warning" />
                <Typography variant="body2" fontWeight={600}>
                  {mockVolunteer.rating}/5.0
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={scanningQR ? <Timer /> : <QrCodeScanner />}
            onClick={handleCheckIn}
            disabled={scanningQR}
            sx={{
              background: 'linear-gradient(45deg, #4CAF50, #81C784)',
              px: 3,
            }}
          >
            {scanningQR ? 'Scanning...' : 'Check In'}
          </Button>
        </Box>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Level Progress */}
        <Grid item xs={12} md={3}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card sx={{ textAlign: 'center', p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Level Progress
              </Typography>
              <Box sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}>
                <CircularProgressbar
                  value={levelProgress}
                  text={`Lvl ${mockVolunteer.level}`}
                  styles={buildStyles({
                    pathColor: '#4CAF50',
                    textColor: '#4CAF50',
                    trailColor: '#E0E0E0',
                    textSize: '20px',
                  })}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {pointsToNextLevel} points to Level {mockVolunteer.level + 1}
              </Typography>
            </Card>
          </motion.div>
        </Grid>

        {/* Current Streak */}
        <Grid item xs={12} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'warning.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4">🔥</Typography>
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={700} color="warning.main">
                    {mockVolunteer.currentStreak}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Day Streak
                  </Typography>
                </Box>
              </Box>
            </Card>
          </motion.div>
        </Grid>

        {/* This Week's Tasks */}
        <Grid item xs={12} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Assignment color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    12
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tasks Completed
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                3 more to reach weekly goal
              </Typography>
            </Card>
          </motion.div>
        </Grid>

        {/* Total Impact */}
        <Grid item xs={12} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Pets color="secondary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    89
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Animals Helped
                  </Typography>
                </Box>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Recent Badges */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card sx={{ mb: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiEvents color="warning" />
            Recent Achievements
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {recentBadges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <Badge
                  badgeContent={badge.earnedToday ? '🆕' : ''}
                  color="secondary"
                >
                  <Card
                    sx={{
                      minWidth: 120,
                      textAlign: 'center',
                      p: 2,
                      background: badge.level === 'epic' 
                        ? 'linear-gradient(45deg, #9C27B0, #E1BEE7)' 
                        : 'linear-gradient(45deg, #FF9800, #FFE0B2)',
                      color: 'white',
                      border: badge.earnedToday ? '3px solid #FFD700' : 'none',
                    }}
                  >
                    <Typography variant="h3" sx={{ mb: 1 }}>
                      {badge.icon}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {badge.name}
                    </Typography>
                  </Card>
                </Badge>
              </motion.div>
            ))}
          </Box>
        </Card>
      </motion.div>

      {/* Tabs for different views */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="My Tasks" icon={<Assignment />} />
          <Tab label="Schedule" icon={<Schedule />} />
          <Tab label="Training" icon={<School />} />
          <Tab label="Community" icon={<People />} />
        </Tabs>
      </Box>

      {/* Tasks Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {mockTasks.map((task, index) => (
            <Grid item xs={12} md={6} lg={4} key={task.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {task.title}
                      </Typography>
                      <Chip
                        label={task.priority}
                        size="small"
                        color={
                          task.priority === 'high' ? 'error' :
                          task.priority === 'medium' ? 'warning' : 'success'
                        }
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" paragraph>
                      {task.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Schedule color="action" fontSize="small" />
                      <Typography variant="body2">
                        {task.scheduledDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOn color="action" fontSize="small" />
                      <Typography variant="body2">
                        {task.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Timer color="action" fontSize="small" />
                      <Typography variant="body2">
                        {task.estimatedDuration} minutes
                      </Typography>
                      <Typography variant="body2" color="primary.main" fontWeight={600} sx={{ ml: 'auto' }}>
                        +{task.pointsReward} pts
                      </Typography>
                    </Box>

                    {task.instructions && (
                      <Typography variant="caption" color="info.main" sx={{ fontStyle: 'italic' }}>
                        💡 {task.instructions}
                      </Typography>
                    )}
                  </CardContent>

                  <CardActions>
                    <Button size="small" startIcon={<CheckCircle />}>
                      Start Task
                    </Button>
                    <Button size="small">Details</Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Schedule Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Weekly Schedule
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Calendar integration coming soon! For now, check your tasks above.
          </Typography>
        </Card>
      </TabPanel>

      {/* Training Tab */}
      <TabPanel value={selectedTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <School color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Training Progress
              </Typography>
              <Typography variant="h4" color="primary" fontWeight={700}>
                85%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Complete
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Available Courses
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Pets color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Advanced Dog Handling"
                    secondary="Learn advanced techniques for handling reactive dogs"
                  />
                  <ListItemSecondaryAction>
                    <Button variant="outlined" size="small">
                      Start
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <LocalHospital color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Basic Pet First Aid"
                    secondary="Essential emergency care for animals"
                  />
                  <ListItemSecondaryAction>
                    <Button variant="outlined" size="small">
                      Resume
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Community Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Leaderboard
              </Typography>
              <List>
                {[
                  { name: 'Sarah Johnson', hours: 245, position: 1 },
                  { name: 'Mike Chen', hours: 232, position: 2 },
                  { name: 'Emma Davis', hours: 218, position: 3 },
                ].map((volunteer, index) => (
                  <ListItem key={volunteer.name}>
                    <ListItemIcon>
                      <Typography variant="h6" color="primary">
                        #{volunteer.position}
                      </Typography>
                    </ListItemIcon>
                    <ListItemText
                      primary={volunteer.name}
                      secondary={`${volunteer.hours} hours`}
                    />
                    {index === 0 && <EmojiEvents color="warning" />}
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <Typography variant="body2" color="text.secondary">
                See what other volunteers are up to and share your experiences!
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={() => console.log('Quick action menu')}
      >
        <Add />
      </Fab>
    </Container>
  );
};

export default VolunteerDashboard;