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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  LinearProgress,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  AttachMoney,
  TrendingUp,
  People,
  Star,
  Add,
  Edit,
  Visibility,
  Email,
  Phone,
  CampaignOutlined,
  Analytics,
  Download,
  Send,
  Schedule,
  Favorite,
  EmojiEvents,
  Group,
  Timeline,
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

// Mock data for donors
const mockDonors = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    address: '123 Oak Street, Springfield, IL 62701',
    tier: 'gold',
    totalDonated: 2500,
    donationCount: 12,
    firstDonation: new Date('2023-01-15'),
    lastDonation: new Date('2024-03-01'),
    isRecurring: true,
    communicationPrefs: {
      email: true,
      mail: false,
      phone: false,
    },
    interests: ['Medical Care', 'Food & Supplies'],
    campaigns: ['Spring Campaign 2024', 'Emergency Medical Fund'],
    notes: 'Long-time supporter, prefers email communication',
    engagementScore: 85,
    lifetimeValue: 3200,
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@business.com',
    phone: '(555) 987-6543',
    address: '456 Business Plaza, Springfield, IL 62702',
    tier: 'platinum',
    totalDonated: 15000,
    donationCount: 8,
    firstDonation: new Date('2022-06-20'),
    lastDonation: new Date('2024-02-15'),
    isRecurring: false,
    communicationPrefs: {
      email: true,
      mail: true,
      phone: false,
    },
    interests: ['Capital Projects', 'Events'],
    campaigns: ['Building Renovation', 'Annual Gala'],
    notes: 'Corporate donor, interested in naming opportunities',
    engagementScore: 92,
    lifetimeValue: 25000,
  },
];

const donationTrends = [
  { month: 'Jan', donations: 15420 },
  { month: 'Feb', donations: 18900 },
  { month: 'Mar', donations: 22100 },
  { month: 'Apr', donations: 19800 },
  { month: 'May', donations: 25200 },
  { month: 'Jun', donations: 28400 },
];

const tierDistribution = [
  { name: 'Bronze', value: 45, color: '#CD7F32' },
  { name: 'Silver', value: 30, color: '#C0C0C0' },
  { name: 'Gold', value: 20, color: '#FFD700' },
  { name: 'Platinum', value: 5, color: '#E5E4E2' },
];

const campaignPerformance = [
  { name: 'Spring Campaign', raised: 45000, goal: 50000, donors: 234 },
  { name: 'Emergency Fund', raised: 28000, goal: 25000, donors: 156 },
  { name: 'Building Fund', raised: 85000, goal: 100000, donors: 89 },
];

interface DonorCRMProps {
  userId?: string;
}

const DonorCRM: React.FC<DonorCRMProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [addDonorOpen, setAddDonorOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<any>(null);
  const [donorDetailsOpen, setDonorDetailsOpen] = useState(false);
  const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return '#CD7F32';
      case 'silver': return '#C0C0C0';
      case 'gold': return '#FFD700';
      case 'platinum': return '#E5E4E2';
      default: return '#gray';
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'bronze': return '🥉';
      case 'silver': return '🥈';
      case 'gold': return '🥇';
      case 'platinum': return '💎';
      default: return '⭐';
    }
  };

  const handleViewDonor = (donor: any) => {
    setSelectedDonor(donor);
    setDonorDetailsOpen(true);
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
              Donor Relationship Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage donors, track contributions, and build lasting relationships
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<CampaignOutlined />} onClick={() => setCampaignDialogOpen(true)}>
              New Campaign
            </Button>
            <Button variant="outlined" startIcon={<Download />}>
              Export Data
            </Button>
            <Button variant="contained" startIcon={<Add />} onClick={() => setAddDonorOpen(true)}>
              Add Donor
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
                <AttachMoney color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="primary">
                  $142K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Raised This Year
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
                  {mockDonors.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Donors
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
                  +23%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Growth This Quarter
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
                  4.8
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg Satisfaction Score
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="All Donors" icon={<People />} />
          <Tab label="Campaigns" icon={<CampaignOutlined />} />
          <Tab label="Analytics" icon={<Analytics />} />
          <Tab label="Segments" icon={<Group />} />
        </Tabs>
      </Box>

      {/* All Donors Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {mockDonors.map((donor, index) => (
            <Grid item xs={12} md={6} lg={4} key={donor.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card sx={{ height: '100%', position: 'relative' }}>
                  {/* Tier Badge */}
                  <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                    <Tooltip title={`${donor.tier.charAt(0).toUpperCase() + donor.tier.slice(1)} Tier`}>
                      <Typography variant="h5">
                        {getTierBadge(donor.tier)}
                      </Typography>
                    </Tooltip>
                  </Box>

                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: getTierColor(donor.tier), color: 'white' }}>
                        {donor.firstName[0]}{donor.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {donor.firstName} {donor.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {donor.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h5" fontWeight={700} color="primary">
                        ${donor.totalDonated.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Contributed ({donor.donationCount} donations)
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Engagement Score
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={donor.engagementScore}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" fontWeight={600}>
                          {donor.engagementScore}%
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Last Donation: {donor.lastDonation.toLocaleDateString()}
                      </Typography>
                      {donor.isRecurring && (
                        <Chip label="Recurring Donor" size="small" color="success" />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {donor.interests.slice(0, 2).map((interest) => (
                        <Chip
                          key={interest}
                          label={interest}
                          size="small"
                          variant="outlined"
                        />
                      ))}
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
                        startIcon={<Visibility />}
                        onClick={() => handleViewDonor(donor)}
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

      {/* Campaigns Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Grid container spacing={3}>
          {campaignPerformance.map((campaign, index) => (
            <Grid item xs={12} md={4} key={campaign.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {campaign.name}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          ${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(campaign.raised / campaign.goal) * 100}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {Math.round((campaign.raised / campaign.goal) * 100)}% of goal reached
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <People fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        {campaign.donors} donors
                      </Typography>
                    </Box>
                  </CardContent>
                  
                  <CardActions>
                    <Button size="small" startIcon={<Analytics />}>
                      View Details
                    </Button>
                    <Button size="small" startIcon={<Send />}>
                      Send Update
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Analytics Tab */}
      <TabPanel value={selectedTab} index={2}>
        <Grid container spacing={3}>
          {/* Donation Trends */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Donation Trends
                </Typography>
                
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={donationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [`$${value}`, 'Donations']} />
                    <Line
                      type="monotone"
                      dataKey="donations"
                      stroke="#4CAF50"
                      strokeWidth={3}
                      dot={{ fill: '#4CAF50', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Grid>

          {/* Donor Tiers */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Donor Tiers
                </Typography>
                
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={tierDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {tierDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <Box sx={{ mt: 2 }}>
                  {tierDistribution.map((item) => (
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

      {/* Segments Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Donor Segments
          </Typography>
          
          <Grid container spacing={3}>
            {[
              { name: 'Major Donors', count: 23, criteria: '$1,000+ lifetime giving' },
              { name: 'Recurring Donors', count: 156, criteria: 'Monthly or annual giving' },
              { name: 'Event Attendees', count: 89, criteria: 'Attended fundraising events' },
              { name: 'Lapsed Donors', count: 34, criteria: 'No donation in 12+ months' },
            ].map((segment, index) => (
              <Grid item xs={12} md={3} key={segment.name}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {segment.name}
                    </Typography>
                    <Typography variant="h4" color="primary" fontWeight={700}>
                      {segment.count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {segment.criteria}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View Segment</Button>
                    <Button size="small">Send Campaign</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </TabPanel>

      {/* Floating Action Buttons */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Tooltip title="Create Campaign">
          <Fab color="secondary" size="medium" onClick={() => setCampaignDialogOpen(true)}>
            <CampaignOutlined />
          </Fab>
        </Tooltip>
        
        <Tooltip title="Add Donor">
          <Fab color="primary" onClick={() => setAddDonorOpen(true)}>
            <Add />
          </Fab>
        </Tooltip>
      </Box>

      {/* Add Donor Dialog */}
      <Dialog open={addDonorOpen} onClose={() => setAddDonorOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Donor</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField label="First Name" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Last Name" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Email" type="email" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Phone" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Address" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Donor Tier</InputLabel>
                <Select label="Donor Tier">
                  <MenuItem value="bronze">Bronze</MenuItem>
                  <MenuItem value="silver">Silver</MenuItem>
                  <MenuItem value="gold">Gold</MenuItem>
                  <MenuItem value="platinum">Platinum</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Initial Donation" type="number" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDonorOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setAddDonorOpen(false)}>
            Add Donor
          </Button>
        </DialogActions>
      </Dialog>

      {/* Campaign Dialog */}
      <Dialog open={campaignDialogOpen} onClose={() => setCampaignDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Campaign</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField label="Campaign Name" fullWidth />
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
              <TextField label="Goal Amount" type="number" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCampaignDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setCampaignDialogOpen(false)}>
            Create Campaign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Donor Details Dialog */}
      <Dialog open={donorDetailsOpen} onClose={() => setDonorDetailsOpen(false)} maxWidth="lg" fullWidth>
        {selectedDonor && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: getTierColor(selectedDonor.tier) }}>
                  {selectedDonor.firstName[0]}{selectedDonor.lastName[0]}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedDonor.firstName} {selectedDonor.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getTierBadge(selectedDonor.tier)} {selectedDonor.tier.charAt(0).toUpperCase() + selectedDonor.tier.slice(1)} Tier Donor
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Email:</strong> {selectedDonor.email}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Phone:</strong> {selectedDonor.phone}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Address:</strong> {selectedDonor.address}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Total Contributed:</strong> ${selectedDonor.totalDonated.toLocaleString()}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Number of Donations:</strong> {selectedDonor.donationCount}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>First Donation:</strong> {selectedDonor.firstDonation.toLocaleDateString()}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Engagement & Preferences
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Engagement Score:</strong> {selectedDonor.engagementScore}%
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Lifetime Value:</strong> ${selectedDonor.lifetimeValue.toLocaleString()}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Interests:</strong> {selectedDonor.interests.join(', ')}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Recent Campaigns:</strong> {selectedDonor.campaigns.join(', ')}
                  </Typography>
                  
                  {selectedDonor.notes && (
                    <Typography variant="body2" paragraph>
                      <strong>Notes:</strong> {selectedDonor.notes}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setDonorDetailsOpen(false)}>
                Close
              </Button>
              <Button variant="outlined" startIcon={<Email />}>
                Send Email
              </Button>
              <Button variant="contained" startIcon={<Edit />}>
                Edit Donor
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default DonorCRM;