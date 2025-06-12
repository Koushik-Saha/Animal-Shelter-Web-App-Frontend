import React, { useState, useEffect } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  LinearProgress,
  Fab,
  Tooltip,
  Alert,
  Divider,
  Switch,
  FormControlLabel,
  Slider,
} from '@mui/material';
import {
  AccountBalanceWallet,
  Add,
  Star,
  TrendingUp,
  Diamond,
  Verified,
  ContentCopy,
  Share,
  Download,
  Launch,
  AttachMoney,
  Timeline,
  EmojiEvents,
  Group,
  Analytics,
  Security,
  Token,
  QrCode,
  Refresh,
  CheckCircle,
  Warning,
  Info,
  Error,
  Pets,
  Favorite,
  CardGiftcard,
  Collection,
  AutoGraph,
  TrendingDown,
  CurrencyBitcoin,
  Polygon,
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
  Legend,
  Area,
  AreaChart,
} from 'recharts';

// Mock data for Web3 donations and NFTs
const mockWalletStats = {
  connected: true,
  address: '0x742d35Cc6436C0532925a3b8D0C4E0d96c8b7a2b',
  balance: 2.45,
  currency: 'ETH',
  usdValue: 5420.30,
  totalDonated: 12.8,
  nftCount: 7,
  currentTier: 'gold',
};

const mockNFTRewards = [
  {
    id: '1',
    name: 'Guardian Angel',
    description: 'For donating over $1000 to help animals in need',
    tier: 'platinum',
    image: '/api/placeholder/300/300',
    rarity: 'legendary',
    donationThreshold: 1000,
    totalSupply: 100,
    currentSupply: 23,
    attributes: [
      { trait_type: 'Tier', value: 'Platinum' },
      { trait_type: 'Donation Amount', value: '$1000+' },
      { trait_type: 'Rarity', value: 'Legendary' },
    ],
    utilities: ['VIP Event Access', 'Monthly Updates', 'Meet & Greet'],
    contractAddress: '0x123...abc',
    tokenId: 23,
    mintDate: new Date('2024-03-15'),
    owned: true,
  },
  {
    id: '2',
    name: 'Animal Advocate',
    description: 'For supporting our monthly campaigns',
    tier: 'gold',
    image: '/api/placeholder/300/300',
    rarity: 'rare',
    donationThreshold: 500,
    totalSupply: 500,
    currentSupply: 156,
    attributes: [
      { trait_type: 'Tier', value: 'Gold' },
      { trait_type: 'Donation Amount', value: '$500+' },
      { trait_type: 'Rarity', value: 'Rare' },
    ],
    utilities: ['Newsletter Access', 'Donor Recognition'],
    contractAddress: '0x456...def',
    tokenId: 156,
    mintDate: new Date('2024-02-20'),
    owned: true,
  },
  {
    id: '3',
    name: 'Paw Protector',
    description: 'For first-time crypto donors',
    tier: 'silver',
    image: '/api/placeholder/300/300',
    rarity: 'common',
    donationThreshold: 100,
    totalSupply: 2000,
    currentSupply: 1244,
    attributes: [
      { trait_type: 'Tier', value: 'Silver' },
      { trait_type: 'Donation Amount', value: '$100+' },
      { trait_type: 'Rarity', value: 'Common' },
    ],
    utilities: ['Digital Certificate', 'Progress Updates'],
    contractAddress: '0x789...ghi',
    tokenId: 1244,
    mintDate: null,
    owned: false,
  },
];

const donationHistory = [
  { date: '2024-03-15', amount: 2.5, currency: 'ETH', usd: 5500, nft: 'Guardian Angel', txHash: '0xabc123...' },
  { date: '2024-02-20', amount: 1.2, currency: 'ETH', usd: 2400, nft: 'Animal Advocate', txHash: '0xdef456...' },
  { date: '2024-01-10', amount: 0.8, currency: 'ETH', usd: 1600, nft: null, txHash: '0xghi789...' },
];

const donationTrends = [
  { month: 'Jan', eth: 45.2, matic: 12000, usd: 89400 },
  { month: 'Feb', eth: 52.1, matic: 15600, usd: 103200 },
  { month: 'Mar', eth: 48.8, matic: 14200, usd: 97800 },
  { month: 'Apr', eth: 61.3, matic: 18900, usd: 122100 },
  { month: 'May', eth: 68.7, matic: 21500, usd: 138500 },
  { month: 'Jun', eth: 75.2, matic: 24800, usd: 155600 },
];

const nftUtilityPrograms = [
  {
    id: '1',
    name: 'VIP Shelter Tours',
    description: 'Exclusive behind-the-scenes access',
    requirements: ['platinum', 'gold'],
    participants: 24,
    nextEvent: new Date('2024-04-15'),
  },
  {
    id: '2',
    name: 'Digital Pet Adoption',
    description: 'Virtual adoption certificates as NFTs',
    requirements: ['all'],
    participants: 156,
    nextEvent: new Date('2024-04-10'),
  },
  {
    id: '3',
    name: 'Governance Voting',
    description: 'Vote on shelter initiatives',
    requirements: ['platinum'],
    participants: 12,
    nextEvent: new Date('2024-04-20'),
  },
];

interface Web3DonationPlatformProps {
  userId?: string;
}

const Web3DonationPlatform: React.FC<Web3DonationPlatformProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const [nftDetailsOpen, setNftDetailsOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [donationAmount, setDonationAmount] = useState(0.1);
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  const [isConnecting, setIsConnecting] = useState(false);

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return '#E5E4E2';
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      case 'bronze': return '#CD7F32';
      default: return '#gray';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'error';
      case 'rare': return 'warning';
      case 'uncommon': return 'info';
      case 'common': return 'success';
      default: return 'default';
    }
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
  };

  const handleDonate = () => {
    setDonateDialogOpen(false);
    // Simulate donation transaction
  };

  const handleNFTView = (nft: any) => {
    setSelectedNFT(nft);
    setNftDetailsOpen(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
              Web3 Donation Platform
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Support animals with cryptocurrency and earn exclusive NFT rewards
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Analytics />}>
              View Analytics
            </Button>
            <Button variant="outlined" startIcon={<Collection />}>
              Browse NFTs
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AccountBalanceWallet />}
              onClick={() => setDonateDialogOpen(true)}
            >
              Donate Crypto
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Wallet Connection Status */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {mockWalletStats.connected ? (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            action={
              <IconButton size="small" onClick={() => copyToClipboard(mockWalletStats.address)}>
                <ContentCopy />
              </IconButton>
            }
          >
            Wallet Connected: {mockWalletStats.address.slice(0, 6)}...{mockWalletStats.address.slice(-4)}
          </Alert>
        ) : (
          <Alert
            severity="info"
            sx={{ mb: 3 }}
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={handleConnectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            }
          >
            Connect your Web3 wallet to start donating and earning NFT rewards
          </Alert>
        )}
      </motion.div>

      {/* Wallet Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <AccountBalanceWallet sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {mockWalletStats.balance} ETH
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Current Balance
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                  ${mockWalletStats.usdValue.toLocaleString()}
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
            <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <AttachMoney sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {mockWalletStats.totalDonated} ETH
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Total Donated
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                  Lifetime Contributions
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
            <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Collection sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {mockWalletStats.nftCount}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  NFTs Owned
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                  Reward Collection
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
            <Card sx={{ background: `linear-gradient(135deg, ${getTierColor(mockWalletStats.currentTier)} 0%, #ffd89b 100%)`, color: 'black' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <EmojiEvents sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} sx={{ textTransform: 'capitalize' }}>
                  {mockWalletStats.currentTier}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Current Tier
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                  Donor Status
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="NFT Collection" icon={<Collection />} />
          <Tab label="Donation History" icon={<Timeline />} />
          <Tab label="Analytics" icon={<Analytics />} />
          <Tab label="Utility Programs" icon={<Star />} />
        </Tabs>
      </Box>

      {/* NFT Collection Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {mockNFTRewards.map((nft, index) => (
            <Grid item xs={12} sm={6} md={4} key={nft.id}>
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
                      image={nft.image}
                      alt={nft.name}
                      sx={{ filter: nft.owned ? 'none' : 'grayscale(100%)' }}
                    />
                    
                    {/* Rarity Badge */}
                    <Chip
                      label={nft.rarity}
                      color={getRarityColor(nft.rarity) as any}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    />
                    
                    {/* Owned Badge */}
                    {nft.owned && (
                      <Chip
                        label="OWNED"
                        color="success"
                        icon={<CheckCircle />}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          fontWeight: 600,
                        }}
                      />
                    )}
                    
                    {/* Tier Badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        background: getTierColor(nft.tier),
                        color: 'black',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      {nft.tier}
                    </Box>
                  </Box>

                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {nft.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {nft.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Required Donation: ${nft.donationThreshold}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(nft.currentSupply / nft.totalSupply) * 100}
                        sx={{ mt: 0.5, height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {nft.currentSupply} / {nft.totalSupply} minted
                      </Typography>
                    </Box>

                    {/* Utilities */}
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {nft.utilities.slice(0, 2).map((utility) => (
                        <Chip
                          key={utility}
                          label={utility}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => handleNFTView(nft)}
                    >
                      View Details
                    </Button>
                    {!nft.owned && (
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<AttachMoney />}
                        onClick={() => setDonateDialogOpen(true)}
                      >
                        Donate to Earn
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Donation History Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Your Donation History
          </Typography>
          
          <List>
            {donationHistory.map((donation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ListItem sx={{ border: 1, borderColor: 'divider', borderRadius: 2, mb: 2 }}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <AttachMoney />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={`${donation.amount} ${donation.currency}`}
                    secondary={`${new Date(donation.date).toLocaleDateString()} • $${donation.usd.toLocaleString()}`}
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {donation.nft && (
                        <Chip
                          label={donation.nft}
                          color="success"
                          size="small"
                          icon={<Collection />}
                        />
                      )}
                      <IconButton
                        size="small"
                        onClick={() => copyToClipboard(donation.txHash)}
                      >
                        <ContentCopy />
                      </IconButton>
                      <IconButton size="small">
                        <Launch />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Paper>
      </TabPanel>

      {/* Analytics Tab */}
      <TabPanel value={selectedTab} index={2}>
        <Grid container spacing={3}>
          {/* Donation Trends */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Donation Trends by Currency
                </Typography>
                
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={donationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="eth"
                      stackId="1"
                      stroke="#627EEA"
                      fill="#627EEA"
                      name="ETH"
                    />
                    <Area
                      type="monotone"
                      dataKey="matic"
                      stackId="2"
                      stroke="#8247E5"
                      fill="#8247E5"
                      name="MATIC"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Grid>

          {/* NFT Distribution */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  NFT Tier Distribution
                </Typography>
                
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Platinum', value: 23, color: '#E5E4E2' },
                        { name: 'Gold', value: 156, color: '#FFD700' },
                        { name: 'Silver', value: 1244, color: '#C0C0C0' },
                        { name: 'Bronze', value: 567, color: '#CD7F32' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {[
                        { name: 'Platinum', value: 23, color: '#E5E4E2' },
                        { name: 'Gold', value: 156, color: '#FFD700' },
                        { name: 'Silver', value: 1244, color: '#C0C0C0' },
                        { name: 'Bronze', value: 567, color: '#CD7F32' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Utility Programs Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Grid container spacing={3}>
          {nftUtilityPrograms.map((program, index) => (
            <Grid item xs={12} md={4} key={program.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {program.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {program.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Requirements
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {program.requirements.map((req) => (
                          <Chip
                            key={req}
                            label={req}
                            size="small"
                            sx={{ 
                              bgcolor: req === 'all' ? 'success.light' : getTierColor(req),
                              color: 'black',
                              textTransform: 'capitalize'
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Group fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        {program.participants} participants
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Event fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        Next: {program.nextEvent.toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions>
                    <Button size="small" startIcon={<Info />}>
                      Learn More
                    </Button>
                    <Button size="small" variant="contained" startIcon={<Star />}>
                      Join Program
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Floating Action Buttons */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Tooltip title="View NFT Collection">
          <Fab color="secondary" size="medium">
            <Collection />
          </Fab>
        </Tooltip>
        
        <Tooltip title="Donate Crypto">
          <Fab color="primary" onClick={() => setDonateDialogOpen(true)}>
            <AttachMoney />
          </Fab>
        </Tooltip>
      </Box>

      {/* Donate Dialog */}
      <Dialog open={donateDialogOpen} onClose={() => setDonateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AccountBalanceWallet />
            <Typography variant="h6" fontWeight={600}>
              Make a Crypto Donation
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Your donation helps animals in need and earns you exclusive NFT rewards!
              </Alert>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={selectedCurrency}
                  label="Currency"
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                  <MenuItem value="ETH">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CurrencyBitcoin />
                      Ethereum (ETH)
                    </Box>
                  </MenuItem>
                  <MenuItem value="MATIC">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Polygon />
                      Polygon (MATIC)
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={donationAmount}
                onChange={(e) => setDonationAmount(parseFloat(e.target.value))}
                InputProps={{
                  endAdornment: selectedCurrency,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Donation Amount: {donationAmount} {selectedCurrency}
              </Typography>
              <Slider
                value={donationAmount}
                onChange={(_, value) => setDonationAmount(value as number)}
                min={0.01}
                max={10}
                step={0.01}
                marks={[
                  { value: 0.1, label: '0.1' },
                  { value: 1, label: '1.0' },
                  { value: 5, label: '5.0' },
                  { value: 10, label: '10.0' },
                ]}
                valueLabelDisplay="auto"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  NFT Rewards You'll Earn:
                </Typography>
                {mockNFTRewards
                  .filter(nft => (donationAmount * 2000) >= nft.donationThreshold) // Assuming 1 ETH = $2000
                  .map(nft => (
                    <Chip
                      key={nft.id}
                      label={nft.name}
                      color="success"
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Message (Optional)"
                fullWidth
                multiline
                rows={2}
                placeholder="Leave a message with your donation..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDonateDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDonate} startIcon={<AttachMoney />}>
            Donate {donationAmount} {selectedCurrency}
          </Button>
        </DialogActions>
      </Dialog>

      {/* NFT Details Dialog */}
      <Dialog open={nftDetailsOpen} onClose={() => setNftDetailsOpen(false)} maxWidth="md" fullWidth>
        {selectedNFT && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Collection />
                <Typography variant="h6" fontWeight={600}>
                  {selectedNFT.name}
                </Typography>
                <Chip
                  label={selectedNFT.rarity}
                  color={getRarityColor(selectedNFT.rarity) as any}
                  size="small"
                />
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img
                    src={selectedNFT.image}
                    alt={selectedNFT.name}
                    style={{ width: '100%', borderRadius: 8 }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Details
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    {selectedNFT.description}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Tier:</strong> {selectedNFT.tier}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Required Donation:</strong> ${selectedNFT.donationThreshold}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    <strong>Supply:</strong> {selectedNFT.currentSupply} / {selectedNFT.totalSupply}
                  </Typography>
                  
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Attributes
                  </Typography>
                  {selectedNFT.attributes.map((attr: any, index: number) => (
                    <Typography key={index} variant="body2">
                      <strong>{attr.trait_type}:</strong> {attr.value}
                    </Typography>
                  ))}
                  
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                    Utilities
                  </Typography>
                  {selectedNFT.utilities.map((utility: string, index: number) => (
                    <Chip
                      key={index}
                      label={utility}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setNftDetailsOpen(false)}>
                Close
              </Button>
              {selectedNFT.owned ? (
                <Button variant="contained" startIcon={<Launch />}>
                  View on OpenSea
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<AttachMoney />}
                  onClick={() => {
                    setNftDetailsOpen(false);
                    setDonateDialogOpen(true);
                  }}
                >
                  Donate to Earn
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Web3DonationPlatform;