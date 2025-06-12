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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import {
  Gavel,
  Add,
  LocationOn,
  Schedule,
  TrendingUp,
  Assignment,
  Security,
  CheckCircle,
  Warning,
  Error,
  Info,
  Visibility,
  Edit,
  Share,
  Phone,
  Email,
  Download,
  Upload,
  Analytics,
  Group,
  Report,
  ContactSupport,
  Policy,
  AccountBalance,
  VerifiedUser,
  NotificationsActive,
  Assessment,
  ExpandMore,
  Flag,
  PhotoCamera,
  Videocam,
  AttachFile,
  Description,
  ReceiptLong,
  BookmarkBorder,
  Bookmark,
  EventNote,
  CalendarToday,
  Timeline as TimelineIcon,
  MonetizationOn,
  Balance,
  Scale,
  LocalPolice,
  AdminPanelSettings,
  Shield,
  HealthAndSafety,
  CorporateFare,
  School,
  Psychology,
  RecordVoiceOver,
  HowToReg,
  FactCheck,
  Approval,
  RuleFolder,
  MenuBook,
  DocumentScanner,
  CloudUpload,
  CloudDownload,
  SyncAlt,
  Update,
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
  AreaChart,
  Area,
} from 'recharts';

// Mock data for legal and compliance
const mockLegalCases = [
  {
    id: 'LEG-001',
    type: 'licensing-compliance',
    status: 'active',
    priority: 'high',
    title: 'Annual Facility License Renewal',
    description: 'Renewal of state animal shelter operating license due for submission.',
    dueDate: new Date('2024-04-15'),
    assignedTo: 'Legal Team',
    requirements: [
      'Facility inspection report',
      'Staff training certificates',
      'Financial audit',
      'Insurance documentation',
      'Health department clearance'
    ],
    completionStatus: 75,
    documentsRequired: 8,
    documentsSubmitted: 6,
    estimatedCost: 2500,
    jurisdiction: 'State',
    regulatoryBody: 'Department of Agriculture',
    lastUpdated: new Date('2024-03-10'),
  },
  {
    id: 'LEG-002',
    type: 'policy-development',
    status: 'pending-review',
    priority: 'medium',
    title: 'Animal Welfare Policy Update',
    description: 'Updating internal animal welfare policies to comply with new state regulations.',
    dueDate: new Date('2024-05-01'),
    assignedTo: 'Policy Committee',
    requirements: [
      'Stakeholder consultation',
      'Legal review',
      'Board approval',
      'Staff training plan'
    ],
    completionStatus: 45,
    documentsRequired: 5,
    documentsSubmitted: 2,
    estimatedCost: 1200,
    jurisdiction: 'Internal',
    regulatoryBody: 'Board of Directors',
    lastUpdated: new Date('2024-03-08'),
  },
  {
    id: 'LEG-003',
    type: 'audit-response',
    status: 'completed',
    priority: 'critical',
    title: 'Federal Grant Compliance Audit',
    description: 'Response to findings from federal grant compliance audit.',
    dueDate: new Date('2024-02-28'),
    assignedTo: 'Finance & Legal',
    requirements: [
      'Corrective action plan',
      'Financial reconciliation',
      'Process improvements',
      'Staff retraining'
    ],
    completionStatus: 100,
    documentsRequired: 12,
    documentsSubmitted: 12,
    estimatedCost: 5000,
    jurisdiction: 'Federal',
    regulatoryBody: 'Department of Health and Human Services',
    lastUpdated: new Date('2024-02-25'),
  },
];

const complianceMetrics = [
  { month: 'Jan', compliance: 92, violations: 3, resolved: 8 },
  { month: 'Feb', compliance: 94, violations: 2, resolved: 5 },
  { month: 'Mar', compliance: 89, violations: 4, resolved: 7 },
  { month: 'Apr', compliance: 96, violations: 1, resolved: 3 },
  { month: 'May', compliance: 93, violations: 2, resolved: 6 },
  { month: 'Jun', compliance: 97, violations: 1, resolved: 4 },
];

const legalStatusData = [
  { name: 'Compliant', value: 75, color: '#4caf50' },
  { name: 'Pending Review', value: 15, color: '#ff9800' },
  { name: 'Action Required', value: 8, color: '#f44336' },
  { name: 'Under Investigation', value: 2, color: '#9e9e9e' },
];

const mockRegulations = [
  {
    id: 'REG-001',
    title: 'Animal Welfare Act',
    type: 'Federal',
    status: 'compliant',
    lastReview: new Date('2024-01-15'),
    nextReview: new Date('2024-07-15'),
    complianceScore: 98,
    requirements: 15,
    violations: 0,
    actionItems: [],
  },
  {
    id: 'REG-002',
    title: 'State Shelter Licensing',
    type: 'State',
    status: 'action-required',
    lastReview: new Date('2024-02-20'),
    nextReview: new Date('2024-05-20'),
    complianceScore: 85,
    requirements: 22,
    violations: 2,
    actionItems: ['Update emergency procedures', 'Staff training certification'],
  },
  {
    id: 'REG-003',
    title: 'Local Animal Control Ordinance',
    type: 'Local',
    status: 'pending-review',
    lastReview: new Date('2024-01-10'),
    nextReview: new Date('2024-04-10'),
    complianceScore: 92,
    requirements: 8,
    violations: 1,
    actionItems: ['Submit quarterly report'],
  },
];

const mockPolicies = [
  {
    id: 'POL-001',
    title: 'Animal Intake and Assessment',
    category: 'Operations',
    status: 'current',
    version: '3.2',
    effectiveDate: new Date('2024-01-01'),
    reviewDate: new Date('2024-12-31'),
    lastModified: new Date('2023-12-15'),
    modifiedBy: 'Sarah Johnson',
    approvedBy: 'Dr. Michael Chen',
    stakeholders: ['Veterinary Team', 'Intake Staff', 'Management'],
    scope: 'All animal intake procedures and initial health assessments',
    relatedRegulations: ['REG-001', 'REG-002'],
  },
  {
    id: 'POL-002',
    title: 'Volunteer Background Check Policy',
    category: 'Human Resources',
    status: 'under-review',
    version: '2.1',
    effectiveDate: new Date('2023-06-01'),
    reviewDate: new Date('2024-06-01'),
    lastModified: new Date('2024-03-01'),
    modifiedBy: 'Lisa Chen',
    approvedBy: 'Pending',
    stakeholders: ['HR Department', 'Volunteer Coordinator', 'Legal Team'],
    scope: 'Background check requirements for all volunteer positions',
    relatedRegulations: ['REG-003'],
  },
];

const mockAudits = [
  {
    id: 'AUD-001',
    title: 'Annual Financial Audit',
    type: 'Financial',
    status: 'scheduled',
    auditor: 'Smith & Associates CPA',
    scheduledDate: new Date('2024-04-15'),
    estimatedDuration: 10, // days
    scope: ['Financial statements', 'Grant compliance', 'Internal controls'],
    lastAudit: new Date('2023-04-20'),
    lastAuditScore: 94,
    preparationStatus: 65,
    documentsRequired: 25,
    documentsReady: 16,
  },
  {
    id: 'AUD-002',
    title: 'Animal Care Standards Review',
    type: 'Operational',
    status: 'in-progress',
    auditor: 'State Department of Agriculture',
    scheduledDate: new Date('2024-03-20'),
    estimatedDuration: 3,
    scope: ['Animal housing', 'Medical protocols', 'Staff training'],
    lastAudit: new Date('2023-09-15'),
    lastAuditScore: 97,
    preparationStatus: 90,
    documentsRequired: 12,
    documentsReady: 11,
  },
];

interface LegalComplianceProps {
  userId?: string;
}

const LegalCompliance: React.FC<LegalComplianceProps> = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [caseDetailsOpen, setCaseDetailsOpen] = useState(false);
  const [taskType, setTaskType] = useState('');

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'success';
      case 'active': return 'primary';
      case 'completed': return 'success';
      case 'pending-review': return 'warning';
      case 'action-required': return 'error';
      case 'under-review': return 'info';
      case 'scheduled': return 'info';
      case 'in-progress': return 'primary';
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'licensing-compliance': return <VerifiedUser />;
      case 'policy-development': return <Policy />;
      case 'audit-response': return <Assessment />;
      case 'regulatory-filing': return <Description />;
      case 'legal-review': return <Gavel />;
      default: return <Assignment />;
    }
  };

  const handleViewCase = (legalCase: any) => {
    setSelectedCase(legalCase);
    setCaseDetailsOpen(true);
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
              Legal & Compliance Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage regulatory compliance, policies, and legal requirements
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Analytics />}>
              Compliance Report
            </Button>
            <Button variant="outlined" startIcon={<CloudDownload />}>
              Export Data
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={() => setNewTaskDialogOpen(true)}
            >
              New Task
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Compliance Alert */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Alert
          severity="warning"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small">
              View Details
            </Button>
          }
        >
          ⚠️ 2 compliance items require immediate attention - State license renewal due in 15 days
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
                <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="success.main">
                  94%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Compliance Rate
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
                <Assignment color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="primary">
                  {mockLegalCases.length}
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
                <Warning color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Action Items
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
                <Schedule color="info" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="info.main">
                  12
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upcoming Deadlines
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="Active Cases" icon={<Assignment />} />
          <Tab label="Regulations" icon={<MenuBook />} />
          <Tab label="Policies" icon={<Policy />} />
          <Tab label="Audits" icon={<Assessment />} />
          <Tab label="Analytics" icon={<Analytics />} />
        </Tabs>
      </Box>

      {/* Active Cases Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {mockLegalCases.map((legalCase, index) => (
            <Grid item xs={12} lg={6} key={legalCase.id}>
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
                        {getTypeIcon(legalCase.type)}
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {legalCase.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {legalCase.type.replace('-', ' ').toUpperCase()}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label={legalCase.status.replace('-', ' ')}
                          color={getStatusColor(legalCase.status) as any}
                          size="small"
                        />
                        <Chip
                          label={legalCase.priority}
                          color={getPriorityColor(legalCase.priority) as any}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>

                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      {legalCase.title}
                    </Typography>

                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      paragraph
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {legalCase.description}
                    </Typography>

                    {/* Progress */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {legalCase.completionStatus}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={legalCase.completionStatus}
                        sx={{ height: 8, borderRadius: 4 }}
                        color={legalCase.completionStatus > 75 ? 'success' : legalCase.completionStatus > 50 ? 'warning' : 'error'}
                      />
                    </Box>

                    {/* Due Date */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Due: {legalCase.dueDate.toLocaleDateString()}
                      </Typography>
                    </Box>

                    {/* Documents Status */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Description fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Documents: {legalCase.documentsSubmitted}/{legalCase.documentsRequired}
                      </Typography>
                    </Box>

                    {/* Assigned To */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        <Group />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {legalCase.assignedTo}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {legalCase.jurisdiction} - {legalCase.regulatoryBody}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Estimated Cost */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MonetizationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Est. Cost: ${legalCase.estimatedCost.toLocaleString()}
                      </Typography>
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
                      <IconButton size="small">
                        <AttachFile />
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
                        onClick={() => handleViewCase(legalCase)}
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

      {/* Regulations Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Regulatory Compliance Overview
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Regulation</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Compliance Score</TableCell>
                  <TableCell>Next Review</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockRegulations.map((regulation) => (
                  <TableRow key={regulation.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {regulation.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {regulation.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={regulation.type} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={regulation.status.replace('-', ' ')}
                        color={getStatusColor(regulation.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={regulation.complianceScore}
                          sx={{ width: 60, height: 6, borderRadius: 3 }}
                          color={regulation.complianceScore > 90 ? 'success' : regulation.complianceScore > 75 ? 'warning' : 'error'}
                        />
                        <Typography variant="body2">
                          {regulation.complianceScore}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {regulation.nextReview.toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* Policies Tab */}
      <TabPanel value={selectedTab} index={2}>
        <Grid container spacing={3}>
          {mockPolicies.map((policy, index) => (
            <Grid item xs={12} md={6} key={policy.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Policy color="primary" />
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {policy.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Version {policy.version} • {policy.category}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Chip
                        label={policy.status.replace('-', ' ')}
                        color={getStatusColor(policy.status) as any}
                        size="small"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" paragraph>
                      {policy.scope}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Effective: {policy.effectiveDate.toLocaleDateString()}
                      </Typography>
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        Review Due: {policy.reviewDate.toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Stakeholders
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {policy.stakeholders.map((stakeholder) => (
                          <Chip
                            key={stakeholder}
                            label={stakeholder}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Last modified by {policy.modifiedBy} on {policy.lastModified.toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions>
                    <Button size="small" startIcon={<Visibility />}>
                      View
                    </Button>
                    <Button size="small" startIcon={<Edit />}>
                      Edit
                    </Button>
                    <Button size="small" startIcon={<CloudDownload />}>
                      Download
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Audits Tab */}
      <TabPanel value={selectedTab} index={3}>
        <Grid container spacing={3}>
          {mockAudits.map((audit, index) => (
            <Grid item xs={12} md={6} key={audit.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Assessment color="primary" />
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {audit.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {audit.type} Audit
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Chip
                        label={audit.status.replace('-', ' ')}
                        color={getStatusColor(audit.status) as any}
                        size="small"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Auditor: {audit.auditor}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Scheduled: {audit.scheduledDate.toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Duration: {audit.estimatedDuration} days
                      </Typography>
                    </Box>

                    {/* Preparation Progress */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Preparation
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {audit.preparationStatus}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={audit.preparationStatus}
                        sx={{ height: 8, borderRadius: 4 }}
                        color={audit.preparationStatus > 75 ? 'success' : audit.preparationStatus > 50 ? 'warning' : 'error'}
                      />
                    </Box>

                    {/* Documents Status */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Documents: {audit.documentsReady}/{audit.documentsRequired} ready
                      </Typography>
                    </Box>

                    {/* Scope */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Audit Scope
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {audit.scope.map((item) => (
                          <Chip
                            key={item}
                            label={item}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Last Audit Score */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Last Audit Score: {audit.lastAuditScore}/100
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions>
                    <Button size="small" startIcon={<CalendarToday />}>
                      Schedule
                    </Button>
                    <Button size="small" startIcon={<Description />}>
                      Documents
                    </Button>
                    <Button size="small" startIcon={<Visibility />}>
                      Details
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Analytics Tab */}
      <TabPanel value={selectedTab} index={4}>
        <Grid container spacing={3}>
          {/* Compliance Trends */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Compliance Trends
                </Typography>
                
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={complianceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area dataKey="compliance" fill="#4caf50" stroke="#4caf50" name="Compliance %" />
                    <Line dataKey="violations" stroke="#f44336" name="Violations" />
                    <Line dataKey="resolved" stroke="#2196f3" name="Resolved" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Grid>

          {/* Legal Status Distribution */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Legal Status Distribution
                </Typography>
                
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={legalStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {legalStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <Box sx={{ mt: 2 }}>
                  {legalStatusData.map((item) => (
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
        <Tooltip title="Quick Compliance Check">
          <Fab color="secondary" size="medium">
            <FactCheck />
          </Fab>
        </Tooltip>
        
        <Tooltip title="New Legal Task">
          <Fab color="primary" onClick={() => setNewTaskDialogOpen(true)}>
            <Add />
          </Fab>
        </Tooltip>
      </Box>

      {/* New Task Dialog */}
      <Dialog open={newTaskDialogOpen} onClose={() => setNewTaskDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Legal/Compliance Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Task Type</InputLabel>
                <Select
                  value={taskType}
                  label="Task Type"
                  onChange={(e) => setTaskType(e.target.value)}
                >
                  <MenuItem value="licensing-compliance">Licensing Compliance</MenuItem>
                  <MenuItem value="policy-development">Policy Development</MenuItem>
                  <MenuItem value="audit-response">Audit Response</MenuItem>
                  <MenuItem value="regulatory-filing">Regulatory Filing</MenuItem>
                  <MenuItem value="legal-review">Legal Review</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select label="Priority">
                  <MenuItem value="critical">Critical</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField label="Title" fullWidth required />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                placeholder="Provide detailed description of the legal or compliance task..."
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Due Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Assigned To</InputLabel>
                <Select label="Assigned To">
                  <MenuItem value="legal-team">Legal Team</MenuItem>
                  <MenuItem value="compliance-officer">Compliance Officer</MenuItem>
                  <MenuItem value="policy-committee">Policy Committee</MenuItem>
                  <MenuItem value="external-counsel">External Counsel</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Regulatory Body"
                fullWidth
                placeholder="Which agency or authority is involved?"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Estimated Cost"
                type="number"
                fullWidth
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Requirements Checklist"
                fullWidth
                multiline
                rows={4}
                placeholder="List all requirements, documents, or actions needed (one per line)..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewTaskDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setNewTaskDialogOpen(false)}>
            Create Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Case Details Dialog */}
      <Dialog open={caseDetailsOpen} onClose={() => setCaseDetailsOpen(false)} maxWidth="lg" fullWidth>
        {selectedCase && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {getTypeIcon(selectedCase.type)}
                <Typography variant="h6" fontWeight={600}>
                  {selectedCase.id} - {selectedCase.title}
                </Typography>
                <Chip
                  label={selectedCase.status.replace('-', ' ')}
                  color={getStatusColor(selectedCase.status) as any}
                  size="small"
                />
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Requirements Checklist
                  </Typography>
                  
                  <List>
                    {selectedCase.requirements.map((requirement: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Checkbox checked={index < 3} />
                        </ListItemIcon>
                        <ListItemText primary={requirement} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Case Details
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Type:</strong> {selectedCase.type.replace('-', ' ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Priority:</strong> {selectedCase.priority}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Due Date:</strong> {selectedCase.dueDate.toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Assigned To:</strong> {selectedCase.assignedTo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Jurisdiction:</strong> {selectedCase.jurisdiction}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Regulatory Body:</strong> {selectedCase.regulatoryBody}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Estimated Cost:</strong> ${selectedCase.estimatedCost.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Last Updated:</strong> {selectedCase.lastUpdated.toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Progress: {selectedCase.completionStatus}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={selectedCase.completionStatus}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setCaseDetailsOpen(false)}>
                Close
              </Button>
              <Button variant="outlined" startIcon={<Edit />}>
                Edit Case
              </Button>
              <Button variant="contained" startIcon={<CloudDownload />}>
                Export Details
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default LegalCompliance;