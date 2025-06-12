import React, { useState, useEffect } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Tooltip,
  Switch,
  FormControlLabel,
  Badge,
} from '@mui/material';
import {
  Dashboard,
  Pets,
  TrendingUp,
  TrendingDown,
  People,
  AttachMoney,
  Warning,
  CheckCircle,
  Schedule,
  Inventory,
  Analytics,
  Download,
  Refresh,
  Notifications,
  Settings,
  FilterList,
  CalendarToday,
  Assessment,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
  ComposedChart,
  RadialBarChart,
  RadialBar,
  ScatterChart,
  Scatter,
} from 'recharts';

// Mock real-time data
const mockDashboardData = {
  realTimeMetrics: {
    animalsInShelter: 127,
    dailyIntakes: 8,
    dailyAdoptions: 5,
    availableForAdoption: 89,
    inMedicalCare: 12,
    inFoster: 26,
    activeVolunteers: 34,
    criticalAlerts: 3,
  },
  
  trends: {
    intakeVsAdoption: [
      { month: 'Jan', intakes: 45, adoptions: 38, goal: 40 },
      { month: 'Feb', intakes: 52, adoptions: 41, goal: 40 },
      { month: 'Mar', intakes: 38, adoptions: 47, goal: 40 },
      { month: 'Apr', intakes: 41, adoptions: 39, goal: 40 },
      { month: 'May', intakes: 48, adoptions: 44, goal: 40 },
      { month: 'Jun', intakes: 35, adoptions: 52, goal: 40 },
    ],
    
    financialHealth: [
      { month: 'Jan', donations: 15420, expenses: 18200, revenue: 2100 },
      { month: 'Feb', donations: 18900, expenses: 16800, revenue: 2450 },
      { month: 'Mar', donations: 22100, expenses: 19200, revenue: 2800 },
      { month: 'Apr', donations: 19800, expenses: 17600, revenue: 2350 },
      { month: 'May', donations: 25200, expenses: 20100, revenue: 3200 },
      { month: 'Jun', donations: 28400, expenses: 21800, revenue: 3850 },
    ],
    
    volunteerActivity: [
      { day: 'Mon', volunteers: 28, hours: 156 },
      { day: 'Tue', volunteers: 22, hours: 134 },
      { day: 'Wed', volunteers: 31, hours: 189 },
      { day: 'Thu', volunteers: 26, hours: 142 },
      { day: 'Fri', volunteers: 34, hours: 201 },
      { day: 'Sat', volunteers: 45, hours: 267 },
      { day: 'Sun', volunteers: 38, hours: 224 },
    ],
  },
  
  animalBreakdown: [
    { name: 'Dogs', value: 67, color: '#4CAF50' },
    { name: 'Cats', value: 45, color: '#FF6B35' },
    { name: 'Rabbits', value: 8, color: '#2196F3' },
    { name: 'Birds', value: 5, color: '#FF9800' },
    { name: 'Other', value: 2, color: '#9C27B0' },
  ],
  
  alerts: [
    { type: 'critical', message: 'Low inventory: Dog food (2 days remaining)', time: '5 min ago' },
    { type: 'warning', message: 'Vet appointment overdue for 3 animals', time: '1 hour ago' },
    { type: 'info', message: 'New volunteer application pending review', time: '2 hours ago' },
  ],
  
  recentActivities: [
    { action: 'Animal Intake', details: 'Golden Retriever mix "Max" admitted', time: '15 min ago', type: 'intake' },
    { action: 'Adoption Completed', details: 'Cat "Luna" adopted by Johnson family', time: '1 hour ago', type: 'adoption' },
    { action: 'Medical Treatment', details: 'Vaccination completed for kennel block A', time: '2 hours ago', type: 'medical' },
    { action: 'Volunteer Check-in', details: '8 volunteers started morning shift', time: '3 hours ago', type: 'volunteer' },
  ],
};

const COLORS = ['#4CAF50', '#FF6B35', '#2196F3', '#FF9800', '#9C27B0'];

interface AdminDashboardProps {
  userId?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userId }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Simulate real-time updates
  useEffect(() => {
    if (!realTimeUpdates) return;
    
    const interval = setInterval(() => {
      // Simulate data updates
      console.log('Real-time data updated');
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting dashboard data as ${format}`);
    // Implementation would generate and download file
  };

  const MetricCard = ({ title, value, change, changeType, icon, color, subtitle }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
        <CardContent sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="textSecondary" gutterBottom variant="h6">
                {title}
              </Typography>
              <Typography variant="h3" component="div" fontWeight={700} color={color}>
                {value}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="textSecondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                p: 1,
                borderRadius: '50%',
                bgcolor: `${color}20`,
                color: color,
              }}
            >
              {icon}
            </Box>
          </Box>
          
          {change && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              {changeType === 'increase' ? (
                <TrendingUp color="success" fontSize="small" />
              ) : (
                <TrendingDown color="error" fontSize="small" />
              )}
              <Typography
                variant="body2"
                color={changeType === 'increase' ? 'success.main' : 'error.main'}
                sx={{ ml: 0.5 }}
              >
                {change}% from last week
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

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
              Operations Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Real-time insights and analytics for shelter management
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="1d">24 Hours</MenuItem>
                <MenuItem value="7d">7 Days</MenuItem>
                <MenuItem value="30d">30 Days</MenuItem>
                <MenuItem value="3m">3 Months</MenuItem>
              </Select>
            </FormControl>
            
            <FormControlLabel
              control={
                <Switch
                  checked={realTimeUpdates}
                  onChange={(e) => setRealTimeUpdates(e.target.checked)}
                />
              }
              label="Live Updates"
            />
            
            <Tooltip title="Refresh Data">
              <IconButton onClick={handleRefresh} disabled={refreshing}>
                <motion.div
                  animate={refreshing ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
                >
                  <Refresh />
                </motion.div>
              </IconButton>
            </Tooltip>
            
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => handleExport('pdf')}
            >
              Export
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Alert Bar */}
      <AnimatePresence>
        {mockDashboardData.realTimeMetrics.criticalAlerts > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              severity="warning"
              action={
                <Button color="inherit" size="small">
                  View All
                </Button>
              }
              sx={{ mb: 3 }}
            >
              {mockDashboardData.realTimeMetrics.criticalAlerts} critical alerts require immediate attention
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Animals in Shelter"
            value={mockDashboardData.realTimeMetrics.animalsInShelter}
            change={-2.5}
            changeType="decrease"
            icon={<Pets />}
            color="#4CAF50"
            subtitle="Available for adoption: 89"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Today's Intakes"
            value={mockDashboardData.realTimeMetrics.dailyIntakes}
            change={12.5}
            changeType="increase"
            icon={<TrendingUp />}
            color="#2196F3"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Today's Adoptions"
            value={mockDashboardData.realTimeMetrics.dailyAdoptions}
            change={8.3}
            changeType="increase"
            icon={<CheckCircle />}
            color="#FF6B35"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Volunteers"
            value={mockDashboardData.realTimeMetrics.activeVolunteers}
            change={5.2}
            changeType="increase"
            icon={<People />}
            color="#9C27B0"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Intake vs Adoption Trends */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Intake vs Adoption Trends
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label="Intakes" size="small" sx={{ bgcolor: '#4CAF50', color: 'white' }} />
                  <Chip label="Adoptions" size="small" sx={{ bgcolor: '#FF6B35', color: 'white' }} />
                  <Chip label="Goal" size="small" variant="outlined" />
                </Box>
              </Box>
              
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={mockDashboardData.trends.intakeVsAdoption}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Area
                    type="monotone"
                    dataKey="goal"
                    fill="#E0E0E0"
                    stroke="#BDBDBD"
                    strokeDasharray="5 5"
                  />
                  <Bar dataKey="intakes" fill="#4CAF50" />
                  <Line
                    type="monotone"
                    dataKey="adoptions"
                    stroke="#FF6B35"
                    strokeWidth={3}
                    dot={{ fill: '#FF6B35', strokeWidth: 2, r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>

        {/* Animal Breakdown */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Current Animal Population
              </Typography>
              
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={mockDashboardData.animalBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockDashboardData.animalBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <Box sx={{ mt: 2 }}>
                {mockDashboardData.animalBreakdown.map((item, index) => (
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
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Financial Health & Volunteer Activity */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Financial Health
              </Typography>
              
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={mockDashboardData.trends.financialHealth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip formatter={(value) => [`$${value}`, '']} />
                  <Area
                    type="monotone"
                    dataKey="donations"
                    stackId="1"
                    stroke="#4CAF50"
                    fill="#4CAF50"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stackId="2"
                    stroke="#F44336"
                    fill="#F44336"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Volunteer Activity (This Week)
              </Typography>
              
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={mockDashboardData.trends.volunteerActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="volunteers" fill="#2196F3" name="Volunteers" />
                  <Bar dataKey="hours" fill="#FF9800" name="Hours" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Alerts & Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  System Alerts
                </Typography>
                <Badge badgeContent={mockDashboardData.alerts.length} color="error">
                  <Notifications />
                </Badge>
              </Box>
              
              <List>
                {mockDashboardData.alerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  >
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        {alert.type === 'critical' && <Warning color="error" />}
                        {alert.type === 'warning' && <Warning color="warning" />}
                        {alert.type === 'info' && <Notifications color="info" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={alert.message}
                        secondary={alert.time}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Activities
              </Typography>
              
              <List>
                {mockDashboardData.recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        {activity.type === 'intake' && <Pets color="primary" />}
                        {activity.type === 'adoption' && <CheckCircle color="success" />}
                        {activity.type === 'medical' && <Analytics color="secondary" />}
                        {activity.type === 'volunteer' && <People color="info" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.action}
                        secondary={
                          <Box>
                            <Typography variant="body2">{activity.details}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;