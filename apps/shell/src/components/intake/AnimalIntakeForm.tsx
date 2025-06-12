import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  Chip,
  Card,
  CardContent,
  CardActions,
  Alert,
  LinearProgress,
  Tooltip,
  IconButton,
  Badge,
  Fab,
} from '@mui/material';
import {
  Pets,
  PhotoCamera,
  Videocam,
  QrCodeScanner,
  Save,
  Send,
  Add,
  Delete,
  Info,
  Warning,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AnimalIntake, HealthAssessment, BehaviorAssessment } from '@shelter/types/intake';

const steps = [
  {
    label: 'Basic Information',
    description: 'Species, breed, age, and physical characteristics',
    icon: <Pets />,
  },
  {
    label: 'Intake Details',
    description: 'Source, reason, and circumstances of intake',
    icon: <Info />,
  },
  {
    label: 'Health Assessment',
    description: 'Medical examination and health status',
    icon: <CheckCircle />,
  },
  {
    label: 'Behavior Assessment',
    description: 'Temperament and behavioral evaluation',
    icon: <Pets />,
  },
  {
    label: 'Documentation',
    description: 'Photos, videos, and additional documents',
    icon: <PhotoCamera />,
  },
  {
    label: 'Review & Submit',
    description: 'Review all information and submit for approval',
    icon: <Send />,
  },
];

const schema = yup.object({
  species: yup.string().required('Species is required'),
  breed: yup.string().required('Breed is required'),
  age: yup.number().positive().required('Age is required'),
  gender: yup.string().required('Gender is required'),
  weight: yup.number().positive().required('Weight is required'),
  intakeReason: yup.string().required('Intake reason is required'),
});

interface AnimalIntakeFormProps {
  onSubmit?: (data: Partial<AnimalIntake>) => void;
  initialData?: Partial<AnimalIntake>;
}

const AnimalIntakeForm: React.FC<AnimalIntakeFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [autoSaving, setAutoSaving] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const [scanningChip, setScanningChip] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      intakeDate: new Date(),
      intakeStaff: 'Current User', // This would come from auth context
      photos: [],
      videos: [],
      microchipScanned: false,
      status: 'pending-review',
    },
    mode: 'onChange',
  });

  const { fields: injuryFields, append: appendInjury, remove: removeInjury } = useFieldArray({
    control,
    name: 'healthStatus.injuries',
  });

  const { fields: behaviorIssueFields, append: appendBehaviorIssue, remove: removeBehaviorIssue } = useFieldArray({
    control,
    name: 'behaviorAssessment.behaviorIssues',
  });

  const watchedSpecies = watch('species');
  const watchedIntakeReason = watch('intakeReason');

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
      // Auto-save progress
      handleAutoSave();
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleAutoSave = async () => {
    setAutoSaving(true);
    // Simulate auto-save
    setTimeout(() => setAutoSaving(false), 1000);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    // Simulate upload and get URLs
    const newPhotos = files.map((_, index) => `/uploads/photo-${Date.now()}-${index}.jpg`);
    setUploadedPhotos(prev => [...prev, ...newPhotos]);
    setValue('photos', [...uploadedPhotos, ...newPhotos]);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newVideos = files.map((_, index) => `/uploads/video-${Date.now()}-${index}.mp4`);
    setUploadedVideos(prev => [...prev, ...newVideos]);
    setValue('videos', [...uploadedVideos, ...newVideos]);
  };

  const handleChipScan = () => {
    setScanningChip(true);
    // Simulate chip scanning
    setTimeout(() => {
      setScanningChip(false);
      setValue('microchipScanned', true);
      setValue('microchipNumber', '123456789012345'); // Mock chip number
    }, 2000);
  };

  const onFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    onSubmit?.(data);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0: // Basic Information
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Animal Name (if known)"
                      fullWidth
                      placeholder="Enter name or leave blank"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="species"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.species}>
                      <InputLabel>Species *</InputLabel>
                      <Select {...field} label="Species *">
                        <MenuItem value="dog">Dog</MenuItem>
                        <MenuItem value="cat">Cat</MenuItem>
                        <MenuItem value="rabbit">Rabbit</MenuItem>
                        <MenuItem value="bird">Bird</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="breed"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Breed *"
                      fullWidth
                      error={!!errors.breed}
                      helperText={errors.breed?.message}
                      placeholder={watchedSpecies === 'dog' ? 'e.g., Labrador Retriever' : 'e.g., Domestic Shorthair'}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Age *"
                      type="number"
                      fullWidth
                      error={!!errors.age}
                      helperText={errors.age?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <Controller
                  name="ageUnit"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Unit</InputLabel>
                      <Select {...field} label="Unit" defaultValue="years">
                        <MenuItem value="days">Days</MenuItem>
                        <MenuItem value="weeks">Weeks</MenuItem>
                        <MenuItem value="months">Months</MenuItem>
                        <MenuItem value="years">Years</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <FormControl error={!!errors.gender}>
                      <FormLabel>Gender *</FormLabel>
                      <RadioGroup {...field} row>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="unknown" control={<Radio />} label="Unknown" />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <Controller
                  name="weight"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Weight *"
                      type="number"
                      fullWidth
                      error={!!errors.weight}
                      helperText={errors.weight?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <Controller
                  name="weightUnit"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Unit</InputLabel>
                      <Select {...field} label="Unit" defaultValue="lbs">
                        <MenuItem value="lbs">Pounds</MenuItem>
                        <MenuItem value="kg">Kilograms</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Primary Color/Markings"
                      fullWidth
                      placeholder="e.g., Black, Brown with white chest"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="markings"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Distinctive Markings"
                      fullWidth
                      placeholder="e.g., Scar on left ear, white paws"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </motion.div>
        );

      case 1: // Intake Details
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="intakeReason"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.intakeReason}>
                      <InputLabel>Intake Reason *</InputLabel>
                      <Select {...field} label="Intake Reason *">
                        <MenuItem value="stray">Stray</MenuItem>
                        <MenuItem value="owner-surrender">Owner Surrender</MenuItem>
                        <MenuItem value="abuse-case">Abuse/Neglect Case</MenuItem>
                        <MenuItem value="transfer">Transfer from Another Shelter</MenuItem>
                        <MenuItem value="birth-in-shelter">Born in Shelter</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="locationFound"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Location Found/Received"
                      fullWidth
                      placeholder="Street address or general area"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="intakeReasonDetails"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Additional Details"
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Provide additional context about the intake circumstances"
                    />
                  )}
                />
              </Grid>

              {/* Intake Source Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Source Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="intakeSource.type"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Source Type</InputLabel>
                      <Select {...field} label="Source Type">
                        <MenuItem value="found-by-public">Found by Public</MenuItem>
                        <MenuItem value="animal-control">Animal Control</MenuItem>
                        <MenuItem value="other-shelter">Other Shelter</MenuItem>
                        <MenuItem value="veterinarian">Veterinarian</MenuItem>
                        <MenuItem value="good-samaritan">Good Samaritan</MenuItem>
                        <MenuItem value="staff">Staff Member</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="intakeSource.contactName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Contact Name"
                      fullWidth
                      placeholder="Name of person/organization"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="intakeSource.contactPhone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Contact Phone"
                      fullWidth
                      placeholder="(555) 123-4567"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="intakeSource.contactEmail"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Contact Email"
                      type="email"
                      fullWidth
                      placeholder="contact@example.com"
                    />
                  )}
                />
              </Grid>

              {/* Microchip Scanning */}
              <Grid item xs={12}>
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <QrCodeScanner color={scanningChip ? 'primary' : 'disabled'} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">Microchip Scan</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Scan for existing microchip identification
                        </Typography>
                      </Box>
                      <Button
                        variant={scanningChip ? 'outlined' : 'contained'}
                        onClick={handleChipScan}
                        disabled={scanningChip}
                        startIcon={scanningChip ? undefined : <QrCodeScanner />}
                      >
                        {scanningChip ? 'Scanning...' : 'Scan Chip'}
                      </Button>
                    </Box>
                    
                    {scanningChip && (
                      <Box sx={{ mt: 2 }}>
                        <LinearProgress />
                      </Box>
                    )}

                    <Controller
                      name="microchipNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Microchip Number"
                          fullWidth
                          sx={{ mt: 2 }}
                          placeholder="15-digit microchip number"
                          disabled={scanningChip}
                        />
                      )}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        );

      case 2: // Health Assessment
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h6" gutterBottom>
              Health Assessment
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="healthStatus.overallCondition"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Overall Condition</InputLabel>
                      <Select {...field} label="Overall Condition">
                        <MenuItem value="excellent">Excellent</MenuItem>
                        <MenuItem value="good">Good</MenuItem>
                        <MenuItem value="fair">Fair</MenuItem>
                        <MenuItem value="poor">Poor</MenuItem>
                        <MenuItem value="critical">Critical</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="healthStatus.bodyConditionScore"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Body Condition Score (1-9)</InputLabel>
                      <Select {...field} label="Body Condition Score (1-9)">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(score => (
                          <MenuItem key={score} value={score}>
                            {score} - {score <= 2 ? 'Underweight' : score <= 6 ? 'Ideal' : 'Overweight'}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="healthStatus.temperature"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Temperature (°F)"
                      type="number"
                      fullWidth
                      placeholder="102.5"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="healthStatus.heartRate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Heart Rate (BPM)"
                      type="number"
                      fullWidth
                      placeholder="120"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="healthStatus.respiratoryRate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Respiratory Rate"
                      type="number"
                      fullWidth
                      placeholder="30"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="healthStatus.vaccinationStatus"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Vaccination Status</InputLabel>
                      <Select {...field} label="Vaccination Status">
                        <MenuItem value="unknown">Unknown</MenuItem>
                        <MenuItem value="up-to-date">Up to Date</MenuItem>
                        <MenuItem value="partial">Partial</MenuItem>
                        <MenuItem value="none">None</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="healthStatus.isSpayedNeutered"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Spayed/Neutered</FormLabel>
                      <RadioGroup {...field} row>
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                        <FormControlLabel value={null} control={<Radio />} label="Unknown" />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="healthStatus.examiningVet"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Examining Veterinarian"
                      fullWidth
                      placeholder="Dr. Smith"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="healthStatus.vetNotes"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Veterinary Notes"
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Additional medical observations and recommendations"
                    />
                  )}
                />
              </Grid>

              {/* Quarantine Section */}
              <Grid item xs={12}>
                <Card sx={{ bgcolor: 'warning.light', color: 'warning.contrastText' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Warning />
                      <Typography variant="h6">Quarantine Assessment</Typography>
                    </Box>
                    
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={6}>
                        <Controller
                          name="healthStatus.quarantineRequired"
                          control={control}
                          render={({ field }) => (
                            <FormControlLabel
                              control={<Checkbox {...field} />}
                              label="Quarantine Required"
                            />
                          )}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Controller
                          name="healthStatus.quarantineDays"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Quarantine Days"
                              type="number"
                              fullWidth
                              placeholder="10"
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        );

      // Add cases 3-5 for behavior assessment, documentation, and review
      default:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6">Step content coming soon...</Typography>
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Pets color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Animal Intake Form
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Complete assessment for new animal intake
              </Typography>
            </Box>
            
            {autoSaving && (
              <Chip
                icon={<Save />}
                label="Auto-saving..."
                color="primary"
                variant="outlined"
                sx={{ ml: 'auto' }}
              />
            )}
          </Box>

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  icon={
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {step.icon}
                    </motion.div>
                  }
                >
                  <Typography variant="h6" fontWeight={600}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepLabel>
                
                <StepContent>
                  <Box sx={{ mt: 2, mb: 1 }}>
                    {getStepContent(index)}
                  </Box>
                  
                  <Box sx={{ mb: 2, mt: 4 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={index === steps.length - 1 ? handleSubmit(onFormSubmit) : handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={!isValid && index < steps.length - 1}
                      >
                        {index === steps.length - 1 ? 'Submit for Approval' : 'Continue'}
                      </Button>
                      
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Paper square elevation={0} sx={{ p: 3, bgcolor: 'success.light' }}>
                <Typography variant="h6" gutterBottom>
                  Intake Form Submitted Successfully! 🎉
                </Typography>
                <Typography variant="body1">
                  The animal intake has been submitted for staff review and approval.
                  You'll receive a notification once the review is complete.
                </Typography>
                <Button
                  onClick={() => setActiveStep(0)}
                  sx={{ mt: 2 }}
                  variant="contained"
                >
                  Start New Intake
                </Button>
              </Paper>
            </motion.div>
          )}
        </Paper>
      </motion.div>

      {/* Floating Action Button for Quick Actions */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={handleAutoSave}
      >
        <Save />
      </Fab>
    </Container>
  );
};

export default AnimalIntakeForm;