import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Pets,
  VolunteerActivism,
  AccountBalanceWallet,
  Email,
  CheckCircle,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Lottie from 'lottie-react';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  interest: yup.string().required('Please select your interest'),
});

const steps = [
  {
    label: 'Choose Your Interest',
    description: 'How would you like to help?',
  },
  {
    label: 'Personal Information',
    description: 'Tell us a bit about yourself',
  },
  {
    label: 'Confirmation',
    description: 'Review and submit',
  },
];

const interests = [
  {
    id: 'adopt',
    title: 'Adopt a Pet',
    description: 'Give a loving home to an animal in need',
    icon: <Pets />,
    color: '#4CAF50',
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    description: 'Help care for animals and support our mission',
    icon: <VolunteerActivism />,
    color: '#2196F3',
  },
  {
    id: 'donate',
    title: 'Donate',
    description: 'Support our work with a financial contribution',
    icon: <AccountBalanceWallet />,
    color: '#FF6B35',
  },
];

const CallToAction: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchedFields = watch();

  const handleNext = () => {
    if (activeStep === 0 && !selectedInterest) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data: any) => {
    console.log({ ...data, interest: selectedInterest });
    setIsSubmitted(true);
    setShowConfetti(true);
    
    // Hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {interests.map((interest, index) => (
              <Grid item xs={12} sm={4} key={interest.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Paper
                    onClick={() => setSelectedInterest(interest.id)}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: 2,
                      borderColor: selectedInterest === interest.id ? interest.color : 'transparent',
                      backgroundColor: selectedInterest === interest.id 
                        ? `${interest.color}10` 
                        : 'background.paper',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: interest.color,
                        backgroundColor: `${interest.color}05`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: `${interest.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        color: interest.color,
                      }}
                    >
                      {React.cloneElement(interest.icon, { sx: { fontSize: 30 } })}
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {interest.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {interest.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TextField
                  {...register('firstName')}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      transition: 'all 0.3s ease',
                      '&:focus-within': {
                        transform: 'scale(1.02)',
                      },
                    },
                  }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <TextField
                  {...register('lastName')}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      transition: 'all 0.3s ease',
                      '&:focus-within': {
                        transform: 'scale(1.02)',
                      },
                    },
                  }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TextField
                  {...register('email')}
                  label="Email Address"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      transition: 'all 0.3s ease',
                      '&:focus-within': {
                        transform: 'scale(1.02)',
                      },
                    },
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        );

      case 2:
        const selectedInterestData = interests.find(i => i.id === selectedInterest);
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ p: 3, bgcolor: 'grey.50', mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Review Your Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Interest
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedInterestData?.title}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {watchedFields.firstName} {watchedFields.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {watchedFields.email}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        );

      default:
        return 'Unknown step';
    }
  };

  if (isSubmitted) {
    return (
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #4CAF50, #FF6B35)',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {showConfetti && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {/* Confetti animation would go here */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <CheckCircle sx={{ fontSize: 100, color: 'white' }} />
            </motion.div>
          </Box>
        )}
        
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Thank You! 🎉
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              We've received your information and will be in touch soon.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                setIsSubmitted(false);
                setActiveStep(0);
                setSelectedInterest('');
              }}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Start Over
            </Button>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #4CAF50, #FF6B35)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            component="h2"
            textAlign="center"
            sx={{
              mb: 2,
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Ready to Make a Difference?
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mb: 6, opacity: 0.9 }}
          >
            Join our community of animal lovers and help save lives today.
          </Typography>
        </motion.div>

        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            color: 'text.primary',
          }}
        >
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="h6" fontWeight={600}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepLabel>
                <StepContent>
                  {getStepContent(index)}
                  <Box sx={{ mb: 2, mt: 3 }}>
                    <div>
                      {activeStep === steps.length - 1 ? (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                            sx={{ mt: 1, mr: 1 }}
                            size="large"
                          >
                            Submit
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                            disabled={activeStep === 0 && !selectedInterest}
                          >
                            Continue
                          </Button>
                        </motion.div>
                      )}
                      {activeStep > 0 && (
                        <Button
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      )}
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Container>
    </Box>
  );
};

export default CallToAction;