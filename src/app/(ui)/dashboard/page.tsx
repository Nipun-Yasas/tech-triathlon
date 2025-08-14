'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Chip, 
  Avatar, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Slide,
  Zoom,
  Fade,
  CircularProgress,
  Snackbar,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  Backdrop
} from '@mui/material';
import Link from 'next/link';
import { useNotifications } from '../../contexts/NotificationContext';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ScienceIcon from '@mui/icons-material/Science';
import GrassIcon from '@mui/icons-material/Grass';
import PendingIcon from '@mui/icons-material/Pending';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function DashboardPage() {
  const { notifications, unreadCount } = useNotifications();
  
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const [cropForm, setCropForm] = useState({
    province: '',
    cropType: '',
    weight: '',
    plantingDate: '',
    farmerName: '',
    phoneNumber: '',
    location: '',
    notes: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const steps = ['Basic Info', 'Crop Details', 'Location & Notes'];

  const provinces = [
    'Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 
    'Gilgit-Baltistan', 'Azad Kashmir', 'Islamabad Capital Territory'
  ];

  const cropTypes = [
    'Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Barley',
    'Potatoes', 'Onions', 'Tomatoes', 'Mangoes', 'Citrus', 'Other'
  ];

  const validateField = (field: string, value: string) => {
    const errors: {[key: string]: string} = {};
    
    switch (field) {
      case 'farmerName':
        if (!value.trim()) errors.farmerName = 'Farmer name is required';
        else if (value.length < 2) errors.farmerName = 'Name must be at least 2 characters';
        break;
      case 'phoneNumber':
        if (value && !/^\+?[\d\s-()]+$/.test(value)) errors.phoneNumber = 'Please enter a valid phone number';
        break;
      case 'weight':
        if (!value) errors.weight = 'Weight is required';
        else if (isNaN(Number(value)) || Number(value) <= 0) errors.weight = 'Please enter a valid weight';
        break;
      case 'province':
        if (!value) errors.province = 'Please select a province';
        break;
      case 'cropType':
        if (!value) errors.cropType = 'Please select a crop type';
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleCropFormChange = (field: string, value: string) => {
    setCropForm(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
    
    // Clear error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getStepFields = (step: number) => {
    switch (step) {
      case 0: return ['farmerName', 'phoneNumber'];
      case 1: return ['province', 'cropType', 'weight', 'plantingDate'];
      case 2: return ['location', 'notes'];
      default: return [];
    }
  };

  const isStepValid = (step: number) => {
    const fields = getStepFields(step);
    return fields.every(field => {
      if (['farmerName', 'province', 'cropType', 'weight'].includes(field)) {
        return cropForm[field as keyof typeof cropForm] && !fieldErrors[field];
      }
      return true; // Optional fields
    });
  };

  const handleNext = () => {
    const currentFields = getStepFields(currentStep);
    let isValid = true;
    
    currentFields.forEach(field => {
      if (!validateField(field, cropForm[field as keyof typeof cropForm])) {
        isValid = false;
      }
    });
    
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSnackbarMessage('Great! Moving to next step 🎉');
      setSnackbarOpen(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const simulateProgress = () => {
    setSubmitProgress(0);
    const interval = setInterval(() => {
      setSubmitProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleSubmitCrop = async () => {
    // Final validation
    const allFields = ['farmerName', 'province', 'cropType', 'weight'];
    let isValid = true;
    
    allFields.forEach(field => {
      if (!validateField(field, cropForm[field as keyof typeof cropForm])) {
        isValid = false;
      }
    });

    if (!isValid) {
      setSnackbarMessage('Please fix the errors before submitting');
      setSnackbarOpen(true);
      return;
    }

    setIsSubmitting(true);
    simulateProgress();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('Submitting crop data:', cropForm);
    
    setIsSubmitting(false);
    setSubmitProgress(100);
    setShowSuccessAnimation(true);
    setSubmitSuccess(true);
    
    setTimeout(() => {
      setCropDialogOpen(false);
      setShowSuccessAnimation(false);
      setSubmitSuccess(false);
      setCurrentStep(0);
      setSubmitProgress(0);
      setCropForm({
        province: '',
        cropType: '',
        weight: '',
        plantingDate: '',
        farmerName: '',
        phoneNumber: '',
        location: '',
        notes: ''
      });
      setFieldErrors({});
      setSnackbarMessage('Crop pickup request submitted successfully! 🌾✨');
      setSnackbarOpen(true);
    }, 2500);
  };
  // Mock data - in a real app, fetch this from your API
  const upcomingAppointments = [
    { id: 1, service: 'Passport Renewal', date: '2025-08-15', time: '10:00 AM', department: 'Immigration' },
    { id: 2, service: 'Crop Inspection', date: '2025-08-20', time: '2:30 PM', department: 'Agriculture' },
  ];
  
  const pendingDocuments = [
    { id: 1, name: 'ID Card Scan', status: 'Awaiting Review', service: 'Passport Renewal' },
    { id: 2, name: 'Crop Photos', status: 'Rejected', service: 'Crop Submission' },
  ];

  // Agricultural data
  const scheduledPickups = [
    { 
      id: 1, 
      cropType: 'Rice', 
      quantity: '500 kg', 
      pickupDate: '2025-08-18', 
      time: '9:00 AM',
      location: 'Farm Plot A-15',
      status: 'confirmed',
      estimatedValue: 75000
    },
    { 
      id: 2, 
      cropType: 'Vegetables', 
      quantity: '200 kg', 
      pickupDate: '2025-08-22', 
      time: '1:30 PM',
      location: 'Farm Plot B-08',
      status: 'pending',
      estimatedValue: 35000
    },
  ];

  const fertilizerRequests = [
    {
      id: 1,
      cropType: 'Rice',
      fertilizerType: 'NPK Fertilizer',
      quantity: '50 kg',
      status: 'approved',
      deliveryDate: '2025-08-16',
      requestDate: '2025-08-10'
    },
    {
      id: 2,
      cropType: 'Vegetables',
      fertilizerType: 'Organic Fertilizer',
      quantity: '25 kg',
      status: 'pending',
      requestDate: '2025-08-12'
    }
  ];

  const cropSubmissions = [
    {
      id: 1,
      cropType: 'Coconut',
      quantity: '300 units',
      submissionDate: '2025-08-05',
      status: 'approved',
      value: 45000
    },
    {
      id: 2,
      cropType: 'Tea',
      quantity: '150 kg',
      submissionDate: '2025-08-08',
      status: 'under_review',
      value: 28000
    }
  ];

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ color: '#333333' }}>
          Citizen Dashboard
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          href="/appointments"
          sx={{
            backgroundColor: '#6D4C41',
            '&:hover': { backgroundColor: '#5D4037' }
          }}
        >
          Book in Appointment
        </Button>
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 4,
        mb: 4 
      }}>
        {/* Quick Stats */}
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', backgroundColor: '#F9F9F6' }}>
          <CalendarMonthIcon sx={{ fontSize: 40, mr: 2, color: '#4CAF50' }} />
          <Box>
            <Typography variant="h6" sx={{ color: '#333333' }}>Upcoming Appointments</Typography>
            <Typography variant="h4" sx={{ color: '#4CAF50' }}>{upcomingAppointments.length}</Typography>
          </Box>
        </Paper>
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', backgroundColor: '#F9F9F6' }}>
          <AssignmentIcon sx={{ fontSize: 40, mr: 2, color: '#FBC02D' }} />
          <Box>
            <Typography variant="h6" sx={{ color: '#333333' }}>Pending Documents</Typography>
            <Typography variant="h4" sx={{ color: '#FBC02D' }}>{pendingDocuments.length}</Typography>
          </Box>
        </Paper>
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', backgroundColor: '#F9F9F6' }}>
          <CheckCircleIcon sx={{ fontSize: 40, mr: 2, color: '#388E3C' }} />
          <Box>
            <Typography variant="h6" sx={{ color: '#333333' }}>Completed Services</Typography>
            <Typography variant="h4" sx={{ color: '#388E3C' }}>3</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Notification Preview Widget */}
      {unreadCount > 0 && (
        <Fade in={true} timeout={800}>
          <Paper sx={{ 
            p: 3, 
            mb: 4,
            background: 'linear-gradient(135deg, rgba(229, 62, 62, 0.1), rgba(255, 152, 0, 0.1))',
            border: '2px solid rgba(229, 62, 62, 0.2)',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #E53E3E 0%, #FF9800 100%)',
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ 
                  backgroundColor: '#E53E3E',
                  width: 50,
                  height: 50,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)', opacity: 1 },
                    '50%': { transform: 'scale(1.05)', opacity: 0.8 },
                    '100%': { transform: 'scale(1)', opacity: 1 },
                  },
                }}>
                  <NotificationsActiveIcon sx={{ fontSize: '1.5rem' }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: '#333333', fontWeight: 700 }}>
                    {unreadCount} New Notification{unreadCount > 1 ? 's' : ''}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666' }}>
                    {notifications.filter(n => !n.isRead).slice(0, 1).map(n => n.title).join(', ')}
                    {unreadCount > 1 && ` and ${unreadCount - 1} more...`}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                component={Link}
                href="/notifications"
                sx={{
                  background: 'linear-gradient(135deg, #E53E3E, #FF9800)',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #C53030, #F56500)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(229, 62, 62, 0.3)'
                  }
                }}
              >
                View All
              </Button>
            </Box>
          </Paper>
        </Fade>
      )}

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 4,
        mb: 4 
      }}>
        {/* Upcoming Appointments */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#333333' }}>
            Upcoming Appointments
          </Typography>
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} sx={{ mb: 2, backgroundColor: '#F9F9F6' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" sx={{ color: '#333333' }}>{appointment.service}</Typography>
                    <Chip 
                      label={appointment.department} 
                      color={appointment.department === 'Agriculture' ? 'success' : 'primary'} 
                      size="small" 
                    />
                  </Box>
                  <Typography variant="body1" sx={{ color: '#7E7E7E' }}>
                    {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" sx={{ color: '#4CAF50' }}>View Details</Button>
                  <Button size="small" sx={{ color: '#E64A19' }}>Cancel</Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: '#7E7E7E' }}>No upcoming appointments</Typography>
          )}
          <Button 
            variant="outlined" 
            fullWidth 
            sx={{ mt: 2, borderColor: '#4CAF50', color: '#4CAF50' }} 
            component={Link} 
            href="/dashboard/appointments"
          >
            View All Appointments
          </Button>
        </Paper>

        {/* Document Status */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#333333' }}>
            Document Status
          </Typography>
          <List>
            {pendingDocuments.map((doc) => (
              <ListItem key={doc.id} divider>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: '#A5D6A7' }}>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={doc.name} 
                  secondary={`For: ${doc.service}`}
                  sx={{
                    '& .MuiListItemText-primary': { color: '#333333' },
                    '& .MuiListItemText-secondary': { color: '#7E7E7E' }
                  }}
                />
                <Chip 
                  label={doc.status}
                  color={doc.status === 'Rejected' ? 'error' : 'warning'}
                />
              </ListItem>
            ))}
          </List>
          <Button 
            variant="outlined" 
            fullWidth 
            sx={{ mt: 2, borderColor: '#4CAF50', color: '#4CAF50' }} 
            component={Link} 
            href="/documents"
          >
            Upload Documents
          </Button>
        </Paper>
      </Box>

      {/* Agricultural Services Dashboard */}
      <Paper sx={{ p: 3, mb: 4, backgroundColor: '#F1F8E9', border: '2px solid #A5D6A7' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AgricultureIcon sx={{ fontSize: 32, color: '#4CAF50', mr: 2 }} />
          <Typography variant="h5" sx={{ color: '#333333', fontWeight: 600 }}>
            🌾 Agricultural Services Dashboard
          </Typography>
        </Box>

        {/* Agricultural Stats */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 4 
        }}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
            <LocalShippingIcon sx={{ fontSize: 30, mr: 1, color: '#FF9800' }} />
            <Box>
              <Typography variant="body2" sx={{ color: '#7E7E7E' }}>Scheduled Pickups</Typography>
              <Typography variant="h6" sx={{ color: '#FF9800', fontWeight: 600 }}>{scheduledPickups.length}</Typography>
            </Box>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
            <ScienceIcon sx={{ fontSize: 30, mr: 1, color: '#2196F3' }} />
            <Box>
              <Typography variant="body2" sx={{ color: '#7E7E7E' }}>Fertilizer Requests</Typography>
              <Typography variant="h6" sx={{ color: '#2196F3', fontWeight: 600 }}>{fertilizerRequests.length}</Typography>
            </Box>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
            <GrassIcon sx={{ fontSize: 30, mr: 1, color: '#4CAF50' }} />
            <Box>
              <Typography variant="body2" sx={{ color: '#7E7E7E' }}>Crop Submissions</Typography>
              <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600 }}>{cropSubmissions.length}</Typography>
            </Box>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
            <CheckCircleIcon sx={{ fontSize: 30, mr: 1, color: '#388E3C' }} />
            <Box>
              <Typography variant="body2" sx={{ color: '#7E7E7E' }}>Total Earnings</Typography>
              <Typography variant="h6" sx={{ color: '#388E3C', fontWeight: 600 }}>
                LKR {(scheduledPickups.reduce((sum, pickup) => sum + pickup.estimatedValue, 0) + 
                      cropSubmissions.reduce((sum, crop) => sum + crop.value, 0)).toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Agricultural Content Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
          gap: 4
        }}>
          {/* Scheduled Pickups */}
          <Paper sx={{ p: 3, backgroundColor: '#FFFFFF' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#333333', display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalShippingIcon sx={{ color: '#FF9800' }} />
              Scheduled Crop Pickups
            </Typography>
            {scheduledPickups.length > 0 ? (
              scheduledPickups.map((pickup) => (
                <Card key={pickup.id} sx={{ mb: 2, backgroundColor: '#FFF3E0', border: '1px solid #FFB74D' }}>
                  <CardContent sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" sx={{ color: '#333333', fontSize: '1rem' }}>
                        {pickup.cropType} - {pickup.quantity}
                      </Typography>
                      <Chip 
                        label={pickup.status} 
                        color={pickup.status === 'confirmed' ? 'success' : 'warning'} 
                        size="small" 
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#7E7E7E', mb: 1 }}>
                      📍 {pickup.location}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7E7E7E', mb: 1 }}>
                      📅 {new Date(pickup.pickupDate).toLocaleDateString()} at {pickup.time}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                      💰 Estimated Value: LKR {pickup.estimatedValue.toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ pt: 0 }}>
                    <Button size="small" sx={{ color: '#FF9800' }}>View Details</Button>
                    <Button size="small" sx={{ color: '#E64A19' }}>Reschedule</Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <Typography variant="body1" sx={{ color: '#7E7E7E' }}>No scheduled pickups</Typography>
            )}
            <Button 
              variant="outlined" 
              fullWidth 
              sx={{ mt: 2, borderColor: '#FF9800', color: '#FF9800' }} 
              onClick={() => setCropDialogOpen(true)}
            >
              Mark Crops Ready for Pickup
            </Button>
          </Paper>

          {/* Fertilizer & Crop Status */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Fertilizer Requests */}
            <Paper sx={{ p: 3, backgroundColor: '#FFFFFF', flex: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#333333', display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScienceIcon sx={{ color: '#2196F3' }} />
                Fertilizer Requests
              </Typography>
              <List sx={{ p: 0 }}>
                {fertilizerRequests.map((request) => (
                  <ListItem key={request.id} sx={{ px: 0, py: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: request.status === 'approved' ? '#E8F5E8' : '#FFF3E0' }}>
                        {request.status === 'approved' ? <CheckCircleIcon sx={{ color: '#4CAF50' }} /> : <PendingIcon sx={{ color: '#FF9800' }} />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={`${request.fertilizerType} (${request.quantity})`}
                      secondary={`For: ${request.cropType} | ${request.status === 'approved' ? `Delivery: ${new Date(request.deliveryDate!).toLocaleDateString()}` : 'Pending approval'}`}
                      sx={{
                        '& .MuiListItemText-primary': { color: '#333333', fontSize: '0.9rem' },
                        '& .MuiListItemText-secondary': { color: '#7E7E7E', fontSize: '0.8rem' }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Recent Crop Submissions */}
            <Paper sx={{ p: 3, backgroundColor: '#FFFFFF', flex: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#333333', display: 'flex', alignItems: 'center', gap: 1 }}>
                <GrassIcon sx={{ color: '#4CAF50' }} />
                Recent Submissions
              </Typography>
              <List sx={{ p: 0 }}>
                {cropSubmissions.map((submission) => (
                  <ListItem key={submission.id} sx={{ px: 0, py: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: submission.status === 'approved' ? '#E8F5E8' : '#FFF3E0' }}>
                        {submission.status === 'approved' ? <CheckCircleIcon sx={{ color: '#4CAF50' }} /> : <PendingIcon sx={{ color: '#FF9800' }} />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={`${submission.cropType} - ${submission.quantity}`}
                      secondary={`Value: LKR ${submission.value.toLocaleString()} | ${submission.status === 'approved' ? 'Approved' : 'Under Review'}`}
                      sx={{
                        '& .MuiListItemText-primary': { color: '#333333', fontSize: '0.9rem' },
                        '& .MuiListItemText-secondary': { color: '#7E7E7E', fontSize: '0.8rem' }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Box>

        {/* Quick Agricultural Actions */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
          mt: 4 
        }}>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<GrassIcon />} 
            component={Link} 
            href="/agrilink"
            sx={{ 
              backgroundColor: '#4CAF50', 
              color: '#FFFFFF',
              '&:hover': { backgroundColor: '#388E3C' }
            }}
          >
            Submit New Crop
          </Button>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<ScienceIcon />} 
            component={Link} 
            href="/agrilink"
            sx={{ 
              backgroundColor: '#2196F3', 
              color: '#FFFFFF',
              '&:hover': { backgroundColor: '#1976D2' }
            }}
          >
            Request Fertilizer
          </Button>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<LocalShippingIcon />} 
            component={Link} 
            href="/agrilink"
            sx={{ 
              backgroundColor: '#FF9800', 
              color: '#FFFFFF',
              '&:hover': { backgroundColor: '#F57C00' }
            }}
          >
            Mark Crops Ready
          </Button>
        </Box>
      </Paper>

      {/* Services Shortcuts */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#333333' }}>
          Quick Access to Services
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 2,
          mt: 2 
        }}>
          <Button 
            variant="outlined" 
            fullWidth 
            startIcon={<CalendarMonthIcon />} 
            component={Link} 
            href="/appointments"
            sx={{ borderColor: '#4CAF50', color: '#4CAF50', '&:hover': { backgroundColor: '#F1F8E9' } }}
          >
            Book Appointment
          </Button>
          <Button 
            variant="outlined" 
            fullWidth 
            startIcon={<FolderIcon />} 
            component={Link} 
            href="/documents"
            sx={{ borderColor: '#4CAF50', color: '#4CAF50', '&:hover': { backgroundColor: '#F1F8E9' } }}
          >
            Upload Documents
          </Button>
          <Button 
            variant="outlined" 
            fullWidth 
            startIcon={<AgricultureIcon />} 
            component={Link} 
            href="/agrilink"
            sx={{ borderColor: '#4CAF50', color: '#4CAF50', '&:hover': { backgroundColor: '#F1F8E9' } }}
          >
            AgriLink Services
          </Button>
          <Button 
            variant="outlined" 
            fullWidth 
            startIcon={<FeedbackIcon />} 
            component={Link} 
            href="/dashboard/feedback"
            sx={{ borderColor: '#4CAF50', color: '#4CAF50', '&:hover': { backgroundColor: '#F1F8E9' } }}
          >
            Submit Feedback
          </Button>
        </Box>
      </Paper>

      {/* Crop Ready Dialog - Enhanced Interactive Version */}
      <Dialog 
        open={cropDialogOpen} 
        onClose={() => {
          setCropDialogOpen(false);
          setCurrentStep(0);
          setFieldErrors({});
        }}
        maxWidth="md"
        fullWidth
        TransitionComponent={Slide}
        PaperProps={{
          sx: {
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(249, 249, 246, 0.95))',
            backdropFilter: 'blur(25px)',
            borderRadius: '24px',
            border: '2px solid rgba(76, 175, 80, 0.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)',
            overflow: 'hidden'
          }
        }}
      >
        {/* Animated Header */}
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(139, 195, 74, 0.15))',
          color: '#2E7D32',
          fontWeight: 'bold',
          fontSize: '1.8rem',
          textAlign: 'center',
          py: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
            animation: showSuccessAnimation ? 'shimmer 1.5s infinite' : 'none',
            '@keyframes shimmer': {
              '0%': { left: '-100%' },
              '100%': { left: '100%' }
            }
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Zoom in={cropDialogOpen} timeout={800}>
              <AutoAwesomeIcon sx={{ fontSize: '2rem', color: '#4CAF50' }} />
            </Zoom>
            Mark Crops Ready for Pickup
            <Zoom in={cropDialogOpen} timeout={1000}>
              <TrendingUpIcon sx={{ fontSize: '2rem', color: '#FF9800' }} />
            </Zoom>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 4, position: 'relative' }}>
          {/* Loading Backdrop */}
          <Backdrop
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              color: '#4CAF50',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(5px)',
              zIndex: 1000,
              borderRadius: '24px'
            }}
            open={isSubmitting}
          >
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress 
                size={60} 
                sx={{ 
                  color: '#4CAF50',
                  mb: 2,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 }
                  }
                }} 
              />
              <Typography variant="h6" sx={{ color: '#2E7D32', mb: 1 }}>
                Processing Your Request...
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={submitProgress} 
                sx={{ 
                  width: 200, 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
                    borderRadius: 4
                  }
                }} 
              />
              <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                {submitProgress.toFixed(0)}% Complete
              </Typography>
            </Box>
          </Backdrop>

          {/* Success Animation */}
          <Fade in={showSuccessAnimation} timeout={1000}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1))',
              zIndex: 999,
              borderRadius: '24px'
            }}>
              <Zoom in={showSuccessAnimation} timeout={1200}>
                <Box sx={{ textAlign: 'center' }}>
                  <CheckCircleOutlineIcon 
                    sx={{ 
                      fontSize: '5rem', 
                      color: '#4CAF50',
                      animation: 'bounce 1s infinite',
                      '@keyframes bounce': {
                        '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                        '40%': { transform: 'translateY(-20px)' },
                        '60%': { transform: 'translateY(-10px)' }
                      }
                    }} 
                  />
                  <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 'bold', mt: 2 }}>
                    Success! 🎉
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    Your crop pickup request has been submitted!
                  </Typography>
                </Box>
              </Zoom>
            </Box>
          </Fade>

          {/* Progress Stepper */}
          <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel 
                  sx={{
                    '& .MuiStepLabel-label': {
                      color: index <= currentStep ? '#4CAF50' : '#999',
                      fontWeight: index === currentStep ? 'bold' : 'normal'
                    },
                    '& .MuiStepIcon-root': {
                      color: index <= currentStep ? '#4CAF50' : '#ddd',
                      fontSize: '1.5rem'
                    }
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {submitSuccess && !showSuccessAnimation && (
            <Slide in={submitSuccess} direction="down">
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3,
                  borderRadius: '12px',
                  background: 'linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1))',
                  border: '1px solid rgba(76, 175, 80, 0.3)'
                }}
              >
                <Typography variant="h6">🌾 Request Submitted Successfully!</Typography>
                Our agricultural team will contact you within 24 hours to schedule the pickup.
              </Alert>
            </Slide>
          )}

          {/* Step Content */}
          <Box sx={{ minHeight: 300 }}>
            <Fade in={true} timeout={500} key={currentStep}>
              <Box>
                {currentStep === 0 && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 3 }}>
                    <Typography variant="h6" sx={{ color: '#2E7D32', mb: 2, textAlign: 'center' }}>
                      👤 Basic Information
                    </Typography>
                    
                    <TextField
                      label="Farmer Name"
                      value={cropForm.farmerName}
                      onChange={(e) => handleCropFormChange('farmerName', e.target.value)}
                      fullWidth
                      required
                      error={!!fieldErrors.farmerName}
                      helperText={fieldErrors.farmerName}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                          },
                          '&.Mui-focused': {
                            background: 'rgba(255, 255, 255, 1)',
                            transform: 'scale(1.02)'
                          }
                        }
                      }}
                    />

                    <TextField
                      label="Phone Number (Optional)"
                      value={cropForm.phoneNumber}
                      onChange={(e) => handleCropFormChange('phoneNumber', e.target.value)}
                      fullWidth
                      error={!!fieldErrors.phoneNumber}
                      helperText={fieldErrors.phoneNumber || 'We\'ll use this to coordinate pickup times'}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                          }
                        }
                      }}
                    />
                  </Box>
                )}

                {currentStep === 1 && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Typography variant="h6" sx={{ color: '#2E7D32', mb: 2, textAlign: 'center', gridColumn: '1 / -1' }}>
                      🌾 Crop Details
                    </Typography>

                    <FormControl fullWidth required error={!!fieldErrors.province}>
                      <InputLabel>Province</InputLabel>
                      <Select
                        value={cropForm.province}
                        onChange={(e) => handleCropFormChange('province', e.target.value)}
                        label="Province"
                        sx={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                          }
                        }}
                      >
                        {provinces.map((province) => (
                          <MenuItem key={province} value={province}>
                            {province}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldErrors.province && (
                        <Typography variant="caption" color="error" sx={{ mt: 1, ml: 1 }}>
                          {fieldErrors.province}
                        </Typography>
                      )}
                    </FormControl>

                    <FormControl fullWidth required error={!!fieldErrors.cropType}>
                      <InputLabel>Crop Type</InputLabel>
                      <Select
                        value={cropForm.cropType}
                        onChange={(e) => handleCropFormChange('cropType', e.target.value)}
                        label="Crop Type"
                        sx={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                          }
                        }}
                      >
                        {cropTypes.map((crop) => (
                          <MenuItem key={crop} value={crop}>
                            {crop}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldErrors.cropType && (
                        <Typography variant="caption" color="error" sx={{ mt: 1, ml: 1 }}>
                          {fieldErrors.cropType}
                        </Typography>
                      )}
                    </FormControl>

                    <TextField
                      label="Estimated Weight (kg)"
                      value={cropForm.weight}
                      onChange={(e) => handleCropFormChange('weight', e.target.value)}
                      fullWidth
                      required
                      type="number"
                      error={!!fieldErrors.weight}
                      helperText={fieldErrors.weight}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                          }
                        }
                      }}
                    />

                    <TextField
                      label="Planting Date (Optional)"
                      value={cropForm.plantingDate}
                      onChange={(e) => handleCropFormChange('plantingDate', e.target.value)}
                      fullWidth
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                          }
                        }
                      }}
                    />
                  </Box>
                )}

                {currentStep === 2 && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 3 }}>
                    <Typography variant="h6" sx={{ color: '#2E7D32', mb: 2, textAlign: 'center' }}>
                      📍 Location & Additional Information
                    </Typography>

                    <TextField
                      label="Farm Location/Address"
                      value={cropForm.location}
                      onChange={(e) => handleCropFormChange('location', e.target.value)}
                      fullWidth
                      helperText="Detailed address helps our team locate your farm easily"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                          }
                        }
                      }}
                    />

                    <TextField
                      label="Additional Notes"
                      value={cropForm.notes}
                      onChange={(e) => handleCropFormChange('notes', e.target.value)}
                      fullWidth
                      multiline
                      rows={4}
                      helperText="Any special instructions, crop conditions, or access information"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                          }
                        }
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Fade>
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                onClick={() => {
                  setCropDialogOpen(false);
                  setCurrentStep(0);
                  setFieldErrors({});
                }}
                variant="outlined"
                sx={{
                  borderColor: '#999',
                  color: '#666',
                  borderRadius: '12px',
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                Cancel
              </Button>
              
              {currentStep > 0 && (
                <Button 
                  onClick={handleBack}
                  variant="outlined"
                  sx={{
                    borderColor: '#4CAF50',
                    color: '#4CAF50',
                    borderRadius: '12px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                    }
                  }}
                >
                  Back
                </Button>
              )}
            </Box>

            <Box>
              {currentStep < steps.length - 1 ? (
                <Button 
                  onClick={handleNext}
                  variant="contained"
                  disabled={!isStepValid(currentStep)}
                  sx={{
                    background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
                    borderRadius: '12px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #45a049, #7CB342)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)'
                    },
                    '&:disabled': {
                      background: 'rgba(0, 0, 0, 0.12)',
                      transform: 'none',
                      boxShadow: 'none'
                    }
                  }}
                >
                  Next Step →
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmitCrop}
                  variant="contained"
                  disabled={!isStepValid(currentStep) || isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
                    borderRadius: '12px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #F57C00, #FFA726)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255, 152, 0, 0.4)'
                    },
                    '&:disabled': {
                      background: 'rgba(0, 0, 0, 0.12)',
                      transform: 'none',
                      boxShadow: 'none'
                    }
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request 🚀'}
                </Button>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            borderRadius: '12px',
            background: 'linear-gradient(45deg, rgba(76, 175, 80, 0.9), rgba(139, 195, 74, 0.9))',
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
