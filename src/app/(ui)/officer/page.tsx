'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Avatar,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Fade,
  Grow,
  Zoom,
  Badge,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MapIcon from '@mui/icons-material/Map';
import GrassIcon from '@mui/icons-material/Grass';
import ScheduleIcon from '@mui/icons-material/Schedule';

interface CitizenRequest {
  id: string;
  citizenName: string;
  citizenId: string;
  serviceType: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedDate: Date;
  department: string;
  description: string;
  documents: number;
}

interface AppointmentRequest {
  id: string;
  citizenName: string;
  service: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  department: string;
  location: string;
}

interface FarmerCrop {
  id: string;
  farmerName: string;
  farmerId: string;
  cropType: string;
  quantity: number;
  unit: string;
  location: string;
  district: string;
  coordinates: { lat: number; lng: number };
  status: 'ready' | 'not_ready' | 'scheduled' | 'collected';
  harvestDate: Date;
  submissionDate: Date;
  estimatedValue: number;
  priority: 'high' | 'medium' | 'low';
  contactNumber: string;
  farmSize: number;
}

interface AreaSummary {
  district: string;
  readyCrops: number;
  totalValue: number;
  mainCropTypes: string[];
  coordinates: { lat: number; lng: number };
}

// Officer Loading Animation
const OfficerLoader = () => (
  <Box sx={{ 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    gap: 3
  }}>
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Typography variant="h5" sx={{ color: '#1976D2', fontWeight: 600, mb: 1 }}>
        🏛️ Loading Officer Portal
      </Typography>
      <Typography variant="body1" sx={{ color: '#7E7E7E' }}>
        Initializing administrative dashboard...
      </Typography>
    </Box>
    
    {/* Animated office icons */}
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[
        { icon: '📋', delay: 0 },
        { icon: '📊', delay: 0.2 },
        { icon: '👥', delay: 0.4 },
        { icon: '🏛️', delay: 0.6 }
      ].map((item, i) => (
        <Box
          key={i}
          sx={{
            fontSize: '2rem',
            animation: `office-pulse 2s ease-in-out ${item.delay}s infinite both`,
            '@keyframes office-pulse': {
              '0%, 80%, 100%': { 
                transform: 'scale(0.8) rotate(0deg)',
                opacity: 0.6
              },
              '40%': { 
                transform: 'scale(1.2) rotate(-5deg)',
                opacity: 1
              }
            }
          }}
        >
          {item.icon}
        </Box>
      ))}
    </Box>
    
    {/* Progress dots */}
    <Box sx={{ display: 'flex', gap: 1 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#1976D2',
            animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
            '@keyframes bounce': {
              '0%, 80%, 100%': { 
                transform: 'scale(0.8)',
                opacity: 0.5
              },
              '40%': { 
                transform: 'scale(1.2)',
                opacity: 1
              }
            }
          }}
        />
      ))}
    </Box>
  </Box>
);

export default function OfficerDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState<CitizenRequest[]>([]);
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [farmerCrops, setFarmerCrops] = useState<FarmerCrop[]>([]);
  const [areaSummaries, setAreaSummaries] = useState<AreaSummary[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<CitizenRequest | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Mock data
  useEffect(() => {
    setRequests([
      {
        id: 'REQ-001',
        citizenName: 'Kasun Perera',
        citizenId: '199512345678',
        serviceType: 'Passport Renewal',
        status: 'pending',
        priority: 'medium',
        submittedDate: new Date('2025-08-12'),
        department: 'Immigration',
        description: 'Passport renewal application with updated address',
        documents: 3
      },
      {
        id: 'REQ-002',
        citizenName: 'Nimali Silva',
        citizenId: '198798765432',
        serviceType: 'Crop Submission',
        status: 'in-progress',
        priority: 'high',
        submittedDate: new Date('2025-08-10'),
        department: 'Agriculture',
        description: 'Rice harvest registration for government procurement',
        documents: 5
      },
      {
        id: 'REQ-003',
        citizenName: 'Rohan Fernando',
        citizenId: '199087654321',
        serviceType: 'Business License',
        status: 'completed',
        priority: 'low',
        submittedDate: new Date('2025-08-08'),
        department: 'Trade',
        description: 'New restaurant business license application',
        documents: 7
      },
      {
        id: 'REQ-004',
        citizenName: 'Priya Jayawardene',
        citizenId: '199234567890',
        serviceType: 'Land Certificate',
        status: 'pending',
        priority: 'urgent',
        submittedDate: new Date('2025-08-14'),
        department: 'Land Registry',
        description: 'Land ownership verification for property sale',
        documents: 4
      }
    ]);

    setAppointments([
      {
        id: 'APP-001',
        citizenName: 'Saman Kumara',
        service: 'Document Verification',
        date: '2025-08-15',
        time: '10:00 AM',
        status: 'scheduled',
        department: 'General Services',
        location: 'Room 201'
      },
      {
        id: 'APP-002',
        citizenName: 'Malini Rathnayake',
        service: 'Agriculture Advisory',
        date: '2025-08-15',
        time: '2:30 PM',
        status: 'scheduled',
        department: 'Agriculture',
        location: 'AgriLink Center'
      }
    ]);

    // Mock farmer crop data
    setFarmerCrops([
      {
        id: 'FC-001',
        farmerName: 'K.M. Silva',
        farmerId: 'NIC-123456789V',
        cropType: 'Rice',
        quantity: 500,
        unit: 'kg',
        location: 'Anuradhapura North',
        district: 'Anuradhapura',
        coordinates: { lat: 8.3114, lng: 80.4037 },
        status: 'ready',
        harvestDate: new Date('2025-08-10'),
        submissionDate: new Date('2025-08-12'),
        estimatedValue: 75000,
        priority: 'high',
        contactNumber: '077-1234567',
        farmSize: 2.5
      },
      {
        id: 'FC-002',
        farmerName: 'W.P. Fernando',
        farmerId: 'NIC-987654321V',
        cropType: 'Vegetables',
        quantity: 200,
        unit: 'kg',
        location: 'Kandy Central',
        district: 'Kandy',
        coordinates: { lat: 7.2906, lng: 80.6337 },
        status: 'ready',
        harvestDate: new Date('2025-08-14'),
        submissionDate: new Date('2025-08-14'),
        estimatedValue: 35000,
        priority: 'medium',
        contactNumber: '071-9876543',
        farmSize: 1.0
      },
      {
        id: 'FC-003',
        farmerName: 'R.D. Perera',
        farmerId: 'NIC-456789123V',
        cropType: 'Coconut',
        quantity: 1000,
        unit: 'units',
        location: 'Gampaha West',
        district: 'Gampaha',
        coordinates: { lat: 7.0873, lng: 80.2133 },
        status: 'scheduled',
        harvestDate: new Date('2025-08-08'),
        submissionDate: new Date('2025-08-10'),
        estimatedValue: 150000,
        priority: 'high',
        contactNumber: '078-2468135',
        farmSize: 3.0
      },
      {
        id: 'FC-004',
        farmerName: 'M.A. Jayawardena',
        farmerId: 'NIC-789123456V',
        cropType: 'Tea',
        quantity: 300,
        unit: 'kg',
        location: 'Nuwara Eliya East',
        district: 'Nuwara Eliya',
        coordinates: { lat: 6.9497, lng: 80.7891 },
        status: 'not_ready',
        harvestDate: new Date('2025-08-25'),
        submissionDate: new Date('2025-08-20'),
        estimatedValue: 45000,
        priority: 'low',
        contactNumber: '076-1357924',
        farmSize: 1.5
      },
      {
        id: 'FC-005',
        farmerName: 'S.L. Bandara',
        farmerId: 'NIC-321654987V',
        cropType: 'Spices',
        quantity: 50,
        unit: 'kg',
        location: 'Matara South',
        district: 'Matara',
        coordinates: { lat: 5.9549, lng: 80.5550 },
        status: 'ready',
        harvestDate: new Date('2025-08-12'),
        submissionDate: new Date('2025-08-13'),
        estimatedValue: 25000,
        priority: 'medium',
        contactNumber: '075-8642097',
        farmSize: 0.8
      }
    ]);

    // Mock area summaries
    setAreaSummaries([
      {
        district: 'Anuradhapura',
        readyCrops: 3,
        totalValue: 145000,
        mainCropTypes: ['Rice', 'Vegetables'],
        coordinates: { lat: 8.3114, lng: 80.4037 }
      },
      {
        district: 'Kandy',
        readyCrops: 2,
        totalValue: 80000,
        mainCropTypes: ['Vegetables', 'Spices'],
        coordinates: { lat: 7.2906, lng: 80.6337 }
      },
      {
        district: 'Gampaha',
        readyCrops: 1,
        totalValue: 150000,
        mainCropTypes: ['Coconut'],
        coordinates: { lat: 7.0873, lng: 80.2133 }
      },
      {
        district: 'Matara',
        readyCrops: 1,
        totalValue: 25000,
        mainCropTypes: ['Spices'],
        coordinates: { lat: 5.9549, lng: 80.5550 }
      }
    ]);
  }, []);

  // Calculate stats only when requests data changes, not on every render
  const stats = useMemo(() => {
    const pendingCount = requests.filter(r => r.status === 'pending').length;
    const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
    const completedCount = requests.filter(r => r.status === 'completed').length;
    const urgentCount = requests.filter(r => r.priority === 'urgent').length;
    
    return { pendingCount, inProgressCount, completedCount, urgentCount };
  }, [requests]);

  const { pendingCount, inProgressCount, completedCount, urgentCount } = stats;

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 2 }}>
        <OfficerLoader />
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'in-progress': return '#2196F3';
      case 'completed': return '#4CAF50';
      case 'rejected': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#F44336';
      case 'high': return '#FF9800';
      case 'medium': return '#2196F3';
      case 'low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <PendingIcon sx={{ fontSize: 20 }} />;
      case 'in-progress': return <AccessTimeIcon sx={{ fontSize: 20 }} />;
      case 'completed': return <CheckCircleIcon sx={{ fontSize: 20 }} />;
      case 'rejected': return <ErrorIcon sx={{ fontSize: 20 }} />;
      default: return <PendingIcon sx={{ fontSize: 20 }} />;
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleViewRequest = (request: CitizenRequest) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 2 }}>
      {/* Header Section */}
      <Fade in={true} timeout={1000}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          p: 3,
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(144, 202, 249, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          border: '2px solid rgba(25, 118, 210, 0.2)'
        }}>
          <Box>
            <Typography variant="h3" component="h1" sx={{ 
              color: '#333333', 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #333333 0%, #1976D2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}>
              🏛️ Officer Dashboard
            </Typography>
            <Typography variant="h6" sx={{ color: '#7E7E7E' }}>
              Government Services Administration Portal
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton
              sx={{ 
                background: 'rgba(25, 118, 210, 0.1)',
                border: '2px solid rgba(25, 118, 210, 0.2)',
                '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.2)' }
              }}
            >
              <Badge badgeContent={urgentCount} color="error">
                <NotificationsIcon sx={{ color: '#1976D2' }} />
              </Badge>
            </IconButton>
            
            <Button
              variant="contained"
              startIcon={<TrendingUpIcon />}
              sx={{
                background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
                px: 3,
                py: 1.5,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)'
              }}
            >
              Generate Report
            </Button>
          </Box>
        </Box>
      </Fade>

      {/* Stats Overview */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4
      }}>
        {[
          { 
            title: 'Pending Requests', 
            value: pendingCount, 
            icon: '⏳', 
            color: '#FF9800',
            bgColor: 'rgba(255, 152, 0, 0.1)'
          },
          { 
            title: 'In Progress', 
            value: inProgressCount, 
            icon: '🔄', 
            color: '#2196F3',
            bgColor: 'rgba(33, 150, 243, 0.1)'
          },
          { 
            title: 'Completed Today', 
            value: completedCount, 
            icon: '✅', 
            color: '#4CAF50',
            bgColor: 'rgba(76, 175, 80, 0.1)'
          },
          { 
            title: 'Urgent Priority', 
            value: urgentCount, 
            icon: '🚨', 
            color: '#F44336',
            bgColor: 'rgba(244, 67, 54, 0.1)'
          }
        ].map((stat, index) => (
          <Zoom key={index} in={true} timeout={1000 + index * 100}>
            <Paper sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: `2px solid ${stat.color}30`,
              borderRadius: 3,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 32px ${stat.color}40`
              }
            }}>
              <Box sx={{ 
                width: 60, 
                height: 60, 
                borderRadius: '50%', 
                background: stat.bgColor,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                fontSize: '1.5rem'
              }}>
                {stat.icon}
              </Box>
              <Typography variant="h4" sx={{ color: stat.color, fontWeight: 700, mb: 0.5 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7E7E7E', fontWeight: 600 }}>
                {stat.title}
              </Typography>
            </Paper>
          </Zoom>
        ))}
      </Box>

      {/* Main Content Tabs */}
      <Fade in={true} timeout={1500}>
        <Paper sx={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,249,246,0.8) 100%)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(25, 118, 210, 0.2)',
          borderRadius: 4,
          overflow: 'hidden'
        }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{ 
              borderBottom: '1px solid rgba(25, 118, 210, 0.2)',
              px: 2,
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '1rem',
                minHeight: 60
              }
            }}
          >
            <Tab 
              label="Citizen Requests" 
              icon={<AssignmentIcon />}
              sx={{ color: '#1976D2' }}
            />
            <Tab 
              label="Appointments" 
              icon={<PeopleIcon />}
              sx={{ color: '#4CAF50' }}
            />
            <Tab 
              label="Crop Pickup Scheduling" 
              icon={<LocalShippingIcon />}
              sx={{ color: '#FF9800' }}
            />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Tab Content Container with consistent height */}
            <Box sx={{ 
              minHeight: '600px', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'all 0.3s ease'
            }}>
              {/* Citizen Requests Tab */}
              {activeTab === 0 && (
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ color: '#333333', fontWeight: 700 }}>
                      📋 Citizen Service Requests
                    </Typography>
                    <Button 
                      variant="outlined"
                      startIcon={<DescriptionIcon />}
                      sx={{ borderColor: '#1976D2', color: '#1976D2' }}
                    >
                      Export List
                    </Button>
                  </Box>

                  <TableContainer sx={{ 
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(5px)',
                    borderRadius: 2,
                    border: '1px solid rgba(25, 118, 210, 0.1)',
                    maxHeight: '500px',
                    overflow: 'auto'
                  }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'rgba(25, 118, 210, 0.05)' }}>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(25, 118, 210, 0.05)' }}>Request ID</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(25, 118, 210, 0.05)' }}>Citizen</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(25, 118, 210, 0.05)' }}>Service</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(25, 118, 210, 0.05)' }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(25, 118, 210, 0.05)' }}>Priority</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(25, 118, 210, 0.05)' }}>Date</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(25, 118, 210, 0.05)' }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {requests.map((request, index) => (
                          <Grow key={request.id} in={true} timeout={500 + index * 100}>
                            <TableRow sx={{
                              '&:hover': { 
                                backgroundColor: 'rgba(25, 118, 210, 0.05)',
                                transform: 'scale(1.01)',
                                transition: 'all 0.2s ease'
                              }
                            }}>
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976D2' }}>
                                  {request.id}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Avatar sx={{ 
                                    backgroundColor: getStatusColor(request.status), 
                                    width: 32, 
                                    height: 32,
                                    fontSize: '0.8rem'
                                  }}>
                                    {request.citizenName.split(' ').map(n => n[0]).join('')}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                      {request.citizenName}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#7E7E7E' }}>
                                      ID: {request.citizenId}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {request.serviceType}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#7E7E7E' }}>
                                  {request.department}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  icon={getStatusIcon(request.status)}
                                  label={request.status.replace('-', ' ')}
                                  sx={{
                                    backgroundColor: `${getStatusColor(request.status)}20`,
                                    color: getStatusColor(request.status),
                                    fontWeight: 600,
                                    textTransform: 'capitalize'
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={request.priority}
                                  size="small"
                                  sx={{
                                    backgroundColor: `${getPriorityColor(request.priority)}20`,
                                    color: getPriorityColor(request.priority),
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    fontSize: '0.7rem'
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  {request.submittedDate.toLocaleDateString()}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                  <IconButton 
                                    size="small"
                                    onClick={() => handleViewRequest(request)}
                                    sx={{ 
                                      color: '#1976D2',
                                      '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
                                    }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton 
                                    size="small"
                                    onClick={handleMenuOpen}
                                    sx={{ 
                                      color: '#7E7E7E',
                                      '&:hover': { backgroundColor: 'rgba(126, 126, 126, 0.1)' }
                                    }}
                                  >
                                    <MoreVertIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              </TableCell>
                            </TableRow>
                          </Grow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Appointments Tab */}
              {activeTab === 1 && (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ color: '#333333', fontWeight: 700, mb: 3 }}>
                    📅 Today&apos;s Appointments
                  </Typography>
                  
                  <Box sx={{ maxHeight: '500px', overflow: 'auto', pr: 1 }}>
                    {appointments.map((appointment, index) => (
                      <Zoom key={appointment.id} in={true} timeout={500 + index * 100}>
                        <Paper sx={{
                          p: 3,
                          mb: 2,
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(5px)',
                          border: '1px solid rgba(76, 175, 80, 0.1)',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateX(8px)',
                            boxShadow: '0 8px 24px rgba(76, 175, 80, 0.15)'
                          }
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                              <Avatar sx={{ 
                                backgroundColor: '#4CAF50', 
                                color: '#FFFFFF',
                                width: 56,
                                height: 56
                              }}>
                                📅
                              </Avatar>
                              <Box>
                                <Typography variant="h6" sx={{ color: '#333333', fontWeight: 600 }}>
                                  {appointment.citizenName}
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#4CAF50', fontWeight: 500 }}>
                                  {appointment.service}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                  <Chip
                                    icon={<AccessTimeIcon />}
                                    label={`${appointment.date} at ${appointment.time}`}
                                    size="small"
                                    sx={{ 
                                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                      color: '#2196F3'
                                    }}
                                  />
                                  <Chip
                                    icon={<LocationOnIcon />}
                                    label={appointment.location}
                                    size="small"
                                    sx={{ 
                                      backgroundColor: 'rgba(156, 39, 176, 0.1)',
                                      color: '#9C27B0'
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', gap: 2 }}>
                              <Button
                                variant="contained"
                                size="small"
                                sx={{
                                  background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
                                  px: 3
                                }}
                              >
                                Mark Complete
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                sx={{ borderColor: '#FF9800', color: '#FF9800' }}
                              >
                                Reschedule
                              </Button>
                            </Box>
                          </Box>
                        </Paper>
                      </Zoom>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Crop Pickup Scheduling Tab */}
              {activeTab === 2 && (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ color: '#333333', fontWeight: 700, mb: 3 }}>
                    🚚 Crop Pickup Scheduling & Area Management
                  </Typography>
                  
                  {/* Area Overview Cards */}
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                    gap: 2,
                    mb: 4 
                  }}>
                    {areaSummaries.map((area, index) => (
                      <Grow key={area.district} in={true} timeout={500 + index * 100}>
                        <Paper sx={{
                          p: 2,
                          background: 'rgba(255, 152, 0, 0.1)',
                          border: '1px solid rgba(255, 152, 0, 0.2)',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 24px rgba(255, 152, 0, 0.15)'
                          }
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <MapIcon sx={{ color: '#FF9800', mr: 1 }} />
                            <Typography variant="h6" sx={{ color: '#333333', fontWeight: 600 }}>
                              {area.district}
                            </Typography>
                          </Box>
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                              Ready Crops: <span style={{ color: '#FF9800', fontWeight: 600 }}>{area.readyCrops}</span>
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                              Total Value: <span style={{ color: '#4CAF50', fontWeight: 600 }}>LKR {area.totalValue.toLocaleString()}</span>
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {area.mainCropTypes.map((crop) => (
                              <Chip 
                                key={crop}
                                label={crop} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: '#FFE0B2',
                                  color: '#E65100',
                                  fontSize: '0.7rem'
                                }}
                              />
                            ))}
                          </Box>
                        </Paper>
                      </Grow>
                    ))}
                  </Box>

                  {/* Farmers & Crops Table */}
                  <TableContainer sx={{ 
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(5px)',
                    borderRadius: 2,
                    border: '1px solid rgba(255, 152, 0, 0.1)',
                    maxHeight: '400px',
                    overflow: 'auto'
                  }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'rgba(255, 152, 0, 0.05)' }}>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(255, 152, 0, 0.05)' }}>Farmer</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(255, 152, 0, 0.05)' }}>Crop Details</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(255, 152, 0, 0.05)' }}>Location</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(255, 152, 0, 0.05)' }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(255, 152, 0, 0.05)' }}>Priority</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(255, 152, 0, 0.05)' }}>Value</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#333333', backgroundColor: 'rgba(255, 152, 0, 0.05)' }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {farmerCrops.map((crop, index) => (
                          <Grow key={crop.id} in={true} timeout={500 + index * 100}>
                            <TableRow sx={{
                              '&:hover': { 
                                backgroundColor: 'rgba(255, 152, 0, 0.05)',
                                transform: 'scale(1.01)',
                                transition: 'all 0.2s ease'
                              }
                            }}>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Avatar sx={{ 
                                    backgroundColor: crop.status === 'ready' ? '#4CAF50' : crop.status === 'scheduled' ? '#FF9800' : '#9E9E9E', 
                                    width: 32, 
                                    height: 32,
                                    fontSize: '0.8rem'
                                  }}>
                                    {crop.farmerName.split(' ').map(n => n[0]).join('')}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                      {crop.farmerName}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#7E7E7E' }}>
                                      📞 {crop.contactNumber}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <GrassIcon sx={{ color: '#4CAF50', fontSize: 16 }} />
                                  <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                      {crop.cropType}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#7E7E7E' }}>
                                      {crop.quantity} {crop.unit} | {crop.farmSize} acres
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {crop.location}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#7E7E7E' }}>
                                  {crop.district} District
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  icon={crop.status === 'ready' ? <CheckCircleIcon /> : 
                                        crop.status === 'scheduled' ? <ScheduleIcon /> : 
                                        <PendingIcon />}
                                  label={crop.status.replace('_', ' ')}
                                  sx={{
                                    backgroundColor: `${crop.status === 'ready' ? '#4CAF50' : 
                                                     crop.status === 'scheduled' ? '#FF9800' : 
                                                     crop.status === 'not_ready' ? '#9E9E9E' : '#F44336'}20`,
                                    color: crop.status === 'ready' ? '#4CAF50' : 
                                           crop.status === 'scheduled' ? '#FF9800' : 
                                           crop.status === 'not_ready' ? '#9E9E9E' : '#F44336',
                                    fontWeight: 600,
                                    textTransform: 'capitalize'
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={crop.priority}
                                  size="small"
                                  sx={{
                                    backgroundColor: `${crop.priority === 'high' ? '#F44336' : 
                                                     crop.priority === 'medium' ? '#FF9800' : '#4CAF50'}20`,
                                    color: crop.priority === 'high' ? '#F44336' : 
                                           crop.priority === 'medium' ? '#FF9800' : '#4CAF50',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    fontSize: '0.7rem'
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                                  LKR {crop.estimatedValue.toLocaleString()}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                  {crop.status === 'ready' && (
                                    <Button
                                      size="small"
                                      variant="contained"
                                      startIcon={<LocalShippingIcon />}
                                      sx={{
                                        backgroundColor: '#FF9800',
                                        color: '#FFFFFF',
                                        fontSize: '0.7rem',
                                        '&:hover': { backgroundColor: '#F57C00' }
                                      }}
                                    >
                                      Schedule Pickup
                                    </Button>
                                  )}
                                  {crop.status === 'scheduled' && (
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      sx={{
                                        borderColor: '#4CAF50',
                                        color: '#4CAF50',
                                        fontSize: '0.7rem'
                                      }}
                                    >
                                      View Schedule
                                    </Button>
                                  )}
                                  <IconButton 
                                    size="small"
                                    sx={{ 
                                      color: '#7E7E7E',
                                      '&:hover': { backgroundColor: 'rgba(126, 126, 126, 0.1)' }
                                    }}
                                  >
                                    <MoreVertIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              </TableCell>
                            </TableRow>
                          </Grow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Action Buttons */}
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    mt: 3, 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                  }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<MapIcon />}
                        sx={{
                          backgroundColor: '#2196F3',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#1976D2' }
                        }}
                      >
                        View Area Map
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<LocalShippingIcon />}
                        sx={{
                          backgroundColor: '#FF9800',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#F57C00' }
                        }}
                      >
                        Bulk Schedule Pickups
                      </Button>
                    </Box>
                    <Button
                      variant="outlined"
                      startIcon={<DescriptionIcon />}
                      sx={{
                        borderColor: '#4CAF50',
                        color: '#4CAF50',
                        '&:hover': { backgroundColor: '#F1F8E9' }
                      }}
                    >
                      Export Crop Report
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      </Fade>

      {/* Request Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(144, 202, 249, 0.05) 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <DashboardIcon sx={{ color: '#1976D2' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#333333' }}>
            Request Details - {selectedRequest?.id}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {selectedRequest && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#333333', mb: 2 }}>
                  👤 Citizen Information
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                  <Typography variant="body1">
                    <strong>Name:</strong> {selectedRequest.citizenName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>ID:</strong> {selectedRequest.citizenId}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#333333', mb: 2 }}>
                  📋 Service Details
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Service Type:</strong> {selectedRequest.serviceType}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Department:</strong> {selectedRequest.department}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Description:</strong> {selectedRequest.description}
                </Typography>
                <Typography variant="body1">
                  <strong>Documents Submitted:</strong> {selectedRequest.documents} files
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{ color: '#7E7E7E' }}
          >
            Close
          </Button>
          <Button 
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)'
            }}
          >
            Approve Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <CheckCircleIcon sx={{ mr: 1, color: '#4CAF50' }} />
          Approve
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ErrorIcon sx={{ mr: 1, color: '#F44336' }} />
          Reject
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <AccessTimeIcon sx={{ mr: 1, color: '#FF9800' }} />
          Request More Info
        </MenuItem>
      </Menu>
    </Box>
  );
}
