'use client';

import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import {
  DirectionsCar,
  Flight,
  LocalHospital,
  School,
  Agriculture,
  Business,
} from '@mui/icons-material';

const governmentServices = [
  {
    id: 1,
    name: 'Department of Motor Traffic',
    nameInSinhala: 'මෝටර් රථ ගමනාගමන දෙපාර්තමේන්තුව',
    icon: <DirectionsCar />,
    services: ['Driving License', 'Vehicle Registration', 'License Renewal'],
    availability: 'Available',
    estimatedTime: '30-45 mins',
  },
  {
    id: 2,
    name: 'Department of Immigration & Emigration',
    nameInSinhala: 'ගිම්හාන හා විගමන දෙපාර්තමේන්තුව',
    icon: <Flight />,
    services: ['Passport Application', 'Visa Services', 'Passport Renewal'],
    availability: 'Available',
    estimatedTime: '45-60 mins',
  },
  {
    id: 3,
    name: 'Ministry of Health',
    nameInSinhala: 'සෞඛ්‍ය අමාත්‍යාංශය',
    icon: <LocalHospital />,
    services: ['Medical Certificates', 'Health Clearance', 'Vaccination Records'],
    availability: 'Limited',
    estimatedTime: '20-30 mins',
  },
  {
    id: 4,
    name: 'Ministry of Education',
    nameInSinhala: 'අධ්‍යාපන අමාත්‍යාංශය',
    icon: <School />,
    services: ['Certificate Verification', 'School Transfers', 'Scholarship Applications'],
    availability: 'Available',
    estimatedTime: '25-40 mins',
  },
  {
    id: 5,
    name: 'Ministry of Agriculture',
    nameInSinhala: 'කෘෂිකර්ම අමාත්‍යාංශය',
    icon: <Agriculture />,
    services: ['Farmer Registration', 'Crop Certification', 'Fertilizer Distribution'],
    availability: 'Available',
    estimatedTime: '15-30 mins',
  },
  {
    id: 6,
    name: 'Department of Business Registration',
    nameInSinhala: 'ව්‍යාපාර ලියාපදිංචි දෙපාර්තමේන්තුව',
    icon: <Business />,
    services: ['Business Registration', 'Company Formation', 'Trade Licenses'],
    availability: 'Available',
    estimatedTime: '40-60 mins',
  },
];

export default function GovernmentServices() {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'success';
      case 'Limited':
        return 'warning';
      case 'Unavailable':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#333333' }}>
        Government Services Directory
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, color: '#7E7E7E' }}>
        Browse and book appointments for various government services from a single platform
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 3 
      }}>
        {governmentServices.map((service) => (
          <Card 
            key={service.id}
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              backgroundColor: '#F9F9F6',
              '&:hover': {
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.2)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ mr: 2, color: '#4CAF50', fontSize: 30 }}>
                  {service.icon}
                </Box>
                <Chip 
                  label={service.availability} 
                  color={getAvailabilityColor(service.availability)}
                  size="small"
                />
              </Box>
              
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#333333' }}>
                {service.name}
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic', color: '#7E7E7E' }}>
                {service.nameInSinhala}
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 2, color: '#333333', fontWeight: 600 }}>
                Available Services:
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                {service.services.map((subService, index) => (
                  <Chip 
                    key={index}
                    label={subService}
                    variant="outlined"
                    size="small"
                    sx={{ 
                      mr: 1, 
                      mb: 1,
                      borderColor: '#A5D6A7',
                      color: '#333333',
                      '&:hover': { backgroundColor: '#F1F8E9' }
                    }}
                  />
                ))}
              </Box>
              
              <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                <strong style={{ color: '#333333' }}>Est. Time:</strong> {service.estimatedTime}
              </Typography>
            </CardContent>
            
            <CardActions>
              <Button 
                size="small" 
                variant="contained" 
                fullWidth
                disabled={service.availability === 'Unavailable'}
                sx={{
                  backgroundColor: service.availability === 'Unavailable' ? '#ccc' : '#6D4C41',
                  color: '#F9F9F6',
                  '&:hover': { 
                    backgroundColor: service.availability === 'Unavailable' ? '#ccc' : '#5D4037' 
                  }
                }}
              >
                {service.availability === 'Unavailable' ? 'Currently Unavailable' : 'Book Appointment'}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
