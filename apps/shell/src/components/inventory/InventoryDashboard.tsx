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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Alert,
  Badge,
  Tooltip,
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
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Fab,
} from '@mui/material';
import {
  Inventory,
  Warning,
  TrendingDown,
  TrendingUp,
  ShoppingCart,
  LocalShipping,
  Add,
  Edit,
  Delete,
  QrCodeScanner,
  Visibility,
  GetApp,
  Print,
  Notifications,
  AttachMoney,
  Schedule,
  CheckCircle,
  Error,
  Info,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { InventoryItem, InventoryAlert, PurchaseOrder } from '@shelter/types/inventory';

// Mock data
const mockInventoryData = {
  overview: {
    totalItems: 247,
    totalValue: 18540,
    lowStockItems: 12,
    expiringSoon: 8,
    criticalAlerts: 3,
    monthlyBudget: 5000,
    monthlySpent: 3240,
  },
  
  categoryBreakdown: [
    { name: 'Food', value: 35, color: '#4CAF50' },
    { name: 'Medicine', value: 25, color: '#F44336' },
    { name: 'Supplies', value: 20, color: '#2196F3' },
    { name: 'Bedding', value: 12, color: '#FF9800' },
    { name: 'Toys', value: 8, color: '#9C27B0' },
  ],
  
  alerts: [
    {
      id: '1',
      type: 'low-stock',
      severity: 'high',
      message: 'Dog food (Purina Pro Plan) - Only 2 days remaining',
      createdDate: new Date(),
    },
    {
      id: '2',
      type: 'expiring',
      severity: 'medium',
      message: '5 items expiring within 7 days',
      createdDate: new Date(),
    },
    {
      id: '3',
      type: 'out-of-stock',
      severity: 'critical',
      message: 'Cat litter completely out of stock',
      createdDate: new Date(),
    },
  ],
  
  lowStockItems: [
    { id: '1', name: 'Purina Pro Plan Dog Food', currentStock: 3, minimumStock: 10, unit: 'bags' },
    { id: '2', name: 'Advantage II Flea Treatment', currentStock: 2, minimumStock: 8, unit: 'boxes' },
    { id: '3', name: 'Disinfectant Spray', currentStock: 1, minimumStock: 5, unit: 'bottles' },
    { id: '4', name: 'Surgical Gloves', currentStock: 15, minimumStock: 50, unit: 'boxes' },
  ],
  
  recentOrders: [
    { id: 'PO-001', supplier: 'Pet Supply Plus', total: 847.50, status: 'delivered', date: '2024-03-15' },
    { id: 'PO-002', supplier: 'Vet Medical Supply', total: 1240.00, status: 'pending', date: '2024-03-18' },
    { id: 'PO-003', supplier: 'Clean Solutions', total: 320.75, status: 'ordered', date: '2024-03-20' },
  ],
  
  monthlyUsage: [
    { month: 'Jan', food: 1200, medicine: 800, supplies: 400 },
    { month: 'Feb', food: 1350, medicine: 920, supplies: 380 },
    { month: 'Mar', food: 1180, medicine: 750, supplies: 420 },
    { month: 'Apr', food: 1420, medicine: 890, supplies: 350 },
    { month: 'May', food: 1290, medicine: 950, supplies: 410 },
    { month: 'Jun', food: 1380, medicine: 870, supplies: 390 },
  ],
};

interface InventoryDashboardProps {
  userId?: string;
}

const InventoryDashboard: React.FC<InventoryDashboardProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'pending': return 'warning';
      case 'ordered': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const OverviewCard = ({ title, value, subtitle, icon, color, trend }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card sx={{ height: '100%' }}>
        <CardContent>
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
          
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              {trend.type === 'up' ? (
                <TrendingUp color="success" fontSize="small" />
              ) : (
                <TrendingDown color="error" fontSize="small" />
              )}
              <Typography
                variant="body2"
                color={trend.type === 'up' ? 'success.main' : 'error.main'}
                sx={{ ml: 0.5 }}
              >
                {trend.value}% from last month
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
              Inventory Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track supplies, manage stock levels, and automate reordering
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<QrCodeScanner />}
              onClick={() => setScannerOpen(true)}
            >
              Scan Item
            </Button>
            <Button
              variant="outlined"
              startIcon={<GetApp />}
            >
              Generate Report
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddItemOpen(true)}
            >
              Add Item
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Critical Alerts */}
      <AnimatePresence>
        {mockInventoryData.alerts.filter(alert => alert.severity === 'critical').length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small">
                  View All Alerts
                </Button>
              }
              sx={{ mb: 3 }}
            >
              {mockInventoryData.alerts.filter(alert => alert.severity === 'critical').length} critical inventory alerts require immediate attention
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Total Items"
            value={mockInventoryData.overview.totalItems}
            icon={<Inventory />}
            color="#4CAF50"
            trend={{ type: 'up', value: 5.2 }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Total Value"
            value={`$${mockInventoryData.overview.totalValue.toLocaleString()}`}
            icon={<AttachMoney />}
            color="#2196F3"
            trend={{ type: 'up', value: 2.8 }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Low Stock Items"
            value={mockInventoryData.overview.lowStockItems}
            subtitle="Require attention"
            icon={<Warning />}
            color="#FF9800"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Expiring Soon"
            value={mockInventoryData.overview.expiringSoon}
            subtitle="Within 30 days"
            icon={<Schedule />}
            color="#F44336"
          />
        </Grid>
      </Grid>

      {/* Budget Progress */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Monthly Budget
          </Typography>
          <Typography variant="h6" color="primary">
            ${mockInventoryData.overview.monthlySpent.toLocaleString()} / ${mockInventoryData.overview.monthlyBudget.toLocaleString()}
          </Typography>
        </Box>
        
        <LinearProgress
          variant="determinate"
          value={(mockInventoryData.overview.monthlySpent / mockInventoryData.overview.monthlyBudget) * 100}
          sx={{ height: 10, borderRadius: 5 }}
        />
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {Math.round(((mockInventoryData.overview.monthlyBudget - mockInventoryData.overview.monthlySpent) / mockInventoryData.overview.monthlyBudget) * 100)}% remaining for this month
        </Typography>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="Overview" icon={<Inventory />} />
          <Tab label="Low Stock" icon={<Warning />} />
          <Tab label="Orders" icon={<ShoppingCart />} />
          <Tab label="Analytics" icon={<TrendingUp />} />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {/* Category Breakdown */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Inventory by Category
                </Typography>
                
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={mockInventoryData.categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockInventoryData.categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <Box sx={{ mt: 2 }}>
                  {mockInventoryData.categoryBreakdown.map((item, index) => (
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

          {/* Recent Alerts */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Recent Alerts
                  </Typography>
                  <Badge badgeContent={mockInventoryData.alerts.length} color="error">
                    <Notifications />
                  </Badge>
                </Box>
                
                <List>
                  {mockInventoryData.alerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          {alert.severity === 'critical' && <Error color="error" />}
                          {alert.severity === 'high' && <Warning color="warning" />}
                          {alert.severity === 'medium' && <Info color="info" />}
                          {alert.severity === 'low' && <CheckCircle color="success" />}
                        </ListItemIcon>
                        <ListItemText
                          primary={alert.message}
                          secondary={alert.createdDate.toLocaleDateString()}
                        />
                        <ListItemSecondaryAction>
                          <Chip
                            label={alert.severity}
                            size="small"
                            color={getSeverityColor(alert.severity) as any}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Low Stock Tab */}
      <TabPanel value={selectedTab} index={1}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Items Requiring Attention
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell align="center">Current Stock</TableCell>
                      <TableCell align="center">Minimum Stock</TableCell>
                      <TableCell align="center">Stock Level</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockInventoryData.lowStockItems.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        component={TableRow}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {item.currentStock} {item.unit}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {item.minimumStock} {item.unit}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ width: 100, mx: 'auto' }}>
                            <LinearProgress
                              variant="determinate"
                              value={(item.currentStock / item.minimumStock) * 100}
                              color={item.currentStock <= item.minimumStock * 0.5 ? 'error' : 'warning'}
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Button size="small" variant="contained" startIcon={<ShoppingCart />}>
                            Reorder
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </motion.div>
      </TabPanel>

      {/* Orders Tab */}
      <TabPanel value={selectedTab} index={2}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Recent Purchase Orders
                </Typography>
                <Button variant="contained" startIcon={<Add />}>
                  New Order
                </Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order #</TableCell>
                      <TableCell>Supplier</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockInventoryData.recentOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        component={TableRow}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {order.id}
                          </Typography>
                        </TableCell>
                        <TableCell>{order.supplier}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            ${order.total}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={order.status}
                            size="small"
                            color={getStatusColor(order.status) as any}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                          <IconButton size="small">
                            <Print />
                          </IconButton>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </motion.div>
      </TabPanel>

      {/* Analytics Tab */}
      <TabPanel value={selectedTab} index={3}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Monthly Usage Trends
            </Typography>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={mockInventoryData.monthlyUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip formatter={(value) => [`$${value}`, '']} />
                <Bar dataKey="food" fill="#4CAF50" name="Food" />
                <Bar dataKey="medicine" fill="#F44336" name="Medicine" />
                <Bar dataKey="supplies" fill="#2196F3" name="Supplies" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </TabPanel>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={() => setAddItemOpen(true)}
      >
        <Add />
      </Fab>

      {/* Add Item Dialog */}
      <Dialog open={addItemOpen} onClose={() => setAddItemOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Inventory Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField label="Item Name" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="food">Food</MenuItem>
                  <MenuItem value="medicine">Medicine</MenuItem>
                  <MenuItem value="supplies">Supplies</MenuItem>
                  <MenuItem value="bedding">Bedding</MenuItem>
                  <MenuItem value="toys">Toys</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Current Stock" type="number" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Minimum Stock" type="number" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Unit Cost" type="number" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Unit</InputLabel>
                <Select label="Unit">
                  <MenuItem value="pieces">Pieces</MenuItem>
                  <MenuItem value="bags">Bags</MenuItem>
                  <MenuItem value="bottles">Bottles</MenuItem>
                  <MenuItem value="boxes">Boxes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddItemOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setAddItemOpen(false)}>
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InventoryDashboard;