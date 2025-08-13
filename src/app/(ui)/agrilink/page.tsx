'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Grow,
  Zoom,
  Avatar,
  Tab,
  Tabs
} from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import ScienceIcon from '@mui/icons-material/Science';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GrassIcon from '@mui/icons-material/Grass';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

interface CropSubmission {
  id: string;
  cropType: string;
  quantity: number;
  location: string;
  harvestDate: Date;
  status: 'pending' | 'approved' | 'collected';
  estimatedValue: number;
}

interface FertilizerRequest {
  id: string;
  cropType: string;
  landSize: number;
  soilType: string;
  status: 'pending' | 'approved' | 'delivered';
  requestDate: Date;
  deliveryDate?: Date;
}

// Beautiful Agricultural Loader Component
const AgriLoader = () => (
  <Box sx={{ 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    gap: 3
  }}>
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 600, mb: 1 }}>
        🌾 Loading AgriLink Portal
      </Typography>
      <Typography variant="body1" sx={{ color: '#7E7E7E' }}>
        Connecting to agricultural services...
      </Typography>
    </Box>
    
    {/* Animated farming icons */}
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[
        { icon: '🌱', delay: 0 },
        { icon: '🌿', delay: 0.2 },
        { icon: '🌾', delay: 0.4 },
        { icon: '🚜', delay: 0.6 }
      ].map((item, i) => (
        <Box
          key={i}
          sx={{
            fontSize: '2rem',
            animation: `grow 2s ease-in-out ${item.delay}s infinite both`,
            '@keyframes grow': {
              '0%, 80%, 100%': { 
                transform: 'scale(0.8) rotate(0deg)',
                opacity: 0.6
              },
              '40%': { 
                transform: 'scale(1.2) rotate(5deg)',
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
            backgroundColor: '#4CAF50',
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

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  bgColor: string;
  count: number;
}

export default function AgriLinkPortal() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cropSubmissions, setCropSubmissions] = useState<CropSubmission[]>([]);
  const [fertilizerRequests, setFertilizerRequests] = useState<FertilizerRequest[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Mock data
  useEffect(() => {
    setCropSubmissions([
      {
        id: '1',
        cropType: 'Rice',
        quantity: 500,
        location: 'Colombo District',
        harvestDate: new Date('2025-08-20'),
        status: 'approved',
        estimatedValue: 75000
      },
      {
        id: '2',
        cropType: 'Coconut',
        quantity: 200,
        location: 'Gampaha District',
        harvestDate: new Date('2025-08-25'),
        status: 'pending',
        estimatedValue: 60000
      }
    ]);

    setFertilizerRequests([
      {
        id: '1',
        cropType: 'Vegetables',
        landSize: 2.5,
        soilType: 'Clay',
        status: 'delivered',
        requestDate: new Date('2025-08-10'),
        deliveryDate: new Date('2025-08-15')
      }
    ]);
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 2 }}>
        <AgriLoader />
      </Box>
    );
  }

  const services = [
    {
      id: 'crop-submission',
      title: 'Crop Submission',
      description: 'Register your harvest for government procurement programs',
      icon: <AgricultureIcon sx={{ fontSize: 48, color: '#4CAF50' }} />,
      color: '#4CAF50',
      bgColor: 'rgba(76, 175, 80, 0.1)',
      count: cropSubmissions.length
    },
    {
      id: 'fertilizer-request',
      title: 'Fertilizer Request',
      description: 'Apply for subsidized fertilizers and agricultural inputs',
      icon: <ScienceIcon sx={{ fontSize: 48, color: '#FF9800' }} />,
      color: '#FF9800',
      bgColor: 'rgba(255, 152, 0, 0.1)',
      count: fertilizerRequests.length
    },
    {
      id: 'pickup-schedule',
      title: 'Pickup Scheduling',
      description: 'Schedule collection of your agricultural products',
      icon: <LocalShippingIcon sx={{ fontSize: 48, color: '#2196F3' }} />,
      color: '#2196F3',
      bgColor: 'rgba(33, 150, 243, 0.1)',
      count: 3
    },
    {
      id: 'crop-advisory',
      title: 'Crop Advisory',
      description: 'Get expert advice on cultivation and pest management',
      icon: <GrassIcon sx={{ fontSize: 48, color: '#9C27B0' }} />,
      color: '#9C27B0',
      bgColor: 'rgba(156, 39, 176, 0.1)',
      count: 5
    }
  ];

  const ServiceCard = ({ service }: { service: Service }) => (
    <Grow in={true} timeout={800}>
      <Card sx={{
        height: '100%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,249,246,0.8) 100%)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(76, 175, 80, 0.2)',
        borderRadius: 4,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(76, 175, 80, 0.2)',
          borderColor: service.color,
          '& .service-icon': {
            transform: 'scale(1.1) rotate(5deg)',
          }
        }
      }}>
        <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Service Icon */}
          <Box sx={{ 
            mb: 3,
            p: 2,
            borderRadius: '50%',
            background: service.bgColor,
            display: 'inline-flex',
            alignSelf: 'center',
            transition: 'all 0.3s ease',
            className: 'service-icon'
          }}>
            {service.icon}
          </Box>

          {/* Service Info */}
          <Typography variant="h5" sx={{ 
            color: '#333333', 
            fontWeight: 700, 
            mb: 2,
            background: `linear-gradient(135deg, #333333 0%, ${service.color} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {service.title}
          </Typography>
          
          <Typography variant="body1" sx={{ 
            color: '#7E7E7E', 
            mb: 3, 
            flex: 1,
            lineHeight: 1.6
          }}>
            {service.description}
          </Typography>

          {/* Count Badge */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Chip
              label={`${service.count} Active`}
              sx={{
                backgroundColor: service.bgColor,
                color: service.color,
                fontWeight: 600,
                border: `1px solid ${service.color}30`
              }}
            />
          </Box>

          {/* Action Button */}
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialog(true);
            }}
            sx={{
              background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}CC 100%)`,
              color: '#FFFFFF',
              fontWeight: 600,
              py: 1.5,
              borderRadius: 3,
              boxShadow: `0 8px 24px ${service.color}40`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 12px 32px ${service.color}60`
              }
            }}
          >
            Access Service
          </Button>
        </CardContent>
      </Card>
    </Grow>
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 2 }}>
      {/* Header Section */}
      <Fade in={true} timeout={1000}>
        <Box sx={{ 
          textAlign: 'center', 
          mb: 6,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(165, 214, 167, 0.05) 100%)',
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            zIndex: -1
          }
        }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ 
            color: '#333333', 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #333333 0%, #4CAF50 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}>
            🌾 AgriLink Portal
          </Typography>
          <Typography variant="h5" sx={{ color: '#7E7E7E', maxWidth: '800px', mx: 'auto', mb: 4 }}>
            Your comprehensive agricultural services platform - connecting farmers with government support
          </Typography>
          
          {/* Stats Cards */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
            mt: 4
          }}>
            {[
              { icon: '🌾', label: 'Crop Submissions', value: '2,450', color: '#4CAF50' },
              { icon: '🧪', label: 'Fertilizer Requests', value: '1,280', color: '#FF9800' },
              { icon: '🚛', label: 'Scheduled Pickups', value: '890', color: '#2196F3' }
            ].map((stat, index) => (
              <Zoom key={index} in={true} timeout={1000 + index * 200}>
                <Paper sx={{
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${stat.color}30`,
                  borderRadius: 3,
                  textAlign: 'center'
                }}>
                  <Typography variant="h4" sx={{ mb: 1 }}>{stat.icon}</Typography>
                  <Typography variant="h4" sx={{ color: stat.color, fontWeight: 700, mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Zoom>
            ))}
          </Box>
        </Box>
      </Fade>

      {/* Services Grid */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ 
          color: '#333333', 
          fontWeight: 700, 
          mb: 4, 
          textAlign: 'center'
        }}>
          🚀 Agricultural Services
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 4 
        }}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Box>
      </Box>

      {/* Recent Activity Section */}
      <Fade in={true} timeout={1500}>
        <Paper sx={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,249,246,0.8) 100%)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(76, 175, 80, 0.2)',
          borderRadius: 4,
          p: 4
        }}>
          <Typography variant="h5" sx={{ 
            color: '#333333', 
            fontWeight: 700, 
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            📊 Recent Activity Dashboard
          </Typography>

          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{ mb: 3, borderBottom: '1px solid rgba(76, 175, 80, 0.2)' }}
          >
            <Tab 
              label="Crop Submissions" 
              icon={<AgricultureIcon />}
              sx={{ color: '#4CAF50' }}
            />
            <Tab 
              label="Fertilizer Requests" 
              icon={<ScienceIcon />}
              sx={{ color: '#FF9800' }}
            />
          </Tabs>

          {/* Crop Submissions Tab */}
          {activeTab === 0 && (
            <Box>
              {cropSubmissions.map((crop, index) => (
                <Zoom key={crop.id} in={true} timeout={500 + index * 100}>
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          backgroundColor: '#4CAF50', 
                          color: '#FFFFFF',
                          width: 56,
                          height: 56
                        }}>
                          🌾
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ color: '#333333', fontWeight: 600 }}>
                            {crop.cropType} - {crop.quantity} kg
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                            📍 {crop.location} • 📅 {crop.harvestDate.toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                            💰 LKR {crop.estimatedValue.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Chip
                        label={crop.status}
                        icon={crop.status === 'approved' ? <CheckCircleIcon /> : <PendingIcon />}
                        sx={{
                          backgroundColor: crop.status === 'approved' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                          color: crop.status === 'approved' ? '#4CAF50' : '#FF9800',
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}
                      />
                    </Box>
                  </Paper>
                </Zoom>
              ))}
            </Box>
          )}

          {/* Fertilizer Requests Tab */}
          {activeTab === 1 && (
            <Box>
              {fertilizerRequests.map((request, index) => (
                <Zoom key={request.id} in={true} timeout={500 + index * 100}>
                  <Paper sx={{
                    p: 3,
                    mb: 2,
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 152, 0, 0.1)',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      boxShadow: '0 8px 24px rgba(255, 152, 0, 0.15)'
                    }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          backgroundColor: '#FF9800', 
                          color: '#FFFFFF',
                          width: 56,
                          height: 56
                        }}>
                          🧪
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ color: '#333333', fontWeight: 600 }}>
                            {request.cropType} - {request.landSize} acres
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                            🌱 Soil: {request.soilType} • 📅 {request.requestDate.toLocaleDateString()}
                          </Typography>
                          {request.deliveryDate && (
                            <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                              🚛 Delivered: {request.deliveryDate.toLocaleDateString()}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                      
                      <Chip
                        label={request.status}
                        icon={request.status === 'delivered' ? <CheckCircleIcon /> : <PendingIcon />}
                        sx={{
                          backgroundColor: request.status === 'delivered' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                          color: request.status === 'delivered' ? '#4CAF50' : '#FF9800',
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}
                      />
                    </Box>
                  </Paper>
                </Zoom>
              ))}
            </Box>
          )}
        </Paper>
      </Fade>

      {/* Service Detail Dialog */}
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
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(165, 214, 167, 0.05) 100%)',
          textAlign: 'center'
        }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#333333' }}>
            🌾 Service Details
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#7E7E7E', mb: 3 }}>
            This service will be available in the next development phase.
            Stay tuned for exciting agricultural features!
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => setOpenDialog(false)}
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
              px: 4,
              py: 1.5
            }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
