'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Checkbox,
  IconButton,
  Divider,
  Stack
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import ClearIcon from '@mui/icons-material/Clear';

export default function CropPickupPage() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCropType, setSelectedCropType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedFarmers, setSelectedFarmers] = useState<string[]>([]);
  const [pickupDate, setPickupDate] = useState('');

  // Mock data for provinces in Sri Lanka
  const provinces = [
    'Western Province',
    'Central Province', 
    'Southern Province',
    'Northern Province',
    'Eastern Province',
    'North Western Province',
    'North Central Province',
    'Uva Province',
    'Sabaragamuwa Province'
  ];

  const cropTypes = ['Rice', 'Wheat', 'Corn', 'Tea', 'Coconut', 'Rubber', 'Spices', 'Vegetables'];
  
  const farmerStatuses = ['Active', 'Pending Approval', 'Ready for Pickup', 'Recently Harvested'];

  // Mock farmers data
  const mockFarmers = [
    {
      id: 'F001',
      name: 'Kamal Perera',
      phone: '+94 77 123 4567',
      province: 'Western Province',
      district: 'Colombo',
      cropType: 'Rice',
      quantity: '2.5 tons',
      status: 'Ready for Pickup',
      harvestDate: '2025-08-10',
      qualityGrade: 'A',
      farmSize: '5 acres',
      avatar: '/farmers/kamal.jpg'
    },
    {
      id: 'F002', 
      name: 'Nimal Silva',
      phone: '+94 71 987 6543',
      province: 'Central Province',
      district: 'Kandy',
      cropType: 'Tea',
      quantity: '800 kg',
      status: 'Recently Harvested',
      harvestDate: '2025-08-12',
      qualityGrade: 'A+',
      farmSize: '3 acres',
      avatar: '/farmers/nimal.jpg'
    },
    {
      id: 'F003',
      name: 'Chamari Fernando',
      phone: '+94 76 555 1234',
      province: 'Southern Province', 
      district: 'Galle',
      cropType: 'Coconut',
      quantity: '1.2 tons',
      status: 'Active',
      harvestDate: '2025-08-14',
      qualityGrade: 'A',
      farmSize: '8 acres',
      avatar: '/farmers/chamari.jpg'
    },
    {
      id: 'F004',
      name: 'Sunil Rajapaksa',
      phone: '+94 75 444 9876',
      province: 'Western Province',
      district: 'Gampaha', 
      cropType: 'Rice',
      quantity: '3.8 tons',
      status: 'Ready for Pickup',
      harvestDate: '2025-08-11',
      qualityGrade: 'A',
      farmSize: '12 acres',
      avatar: '/farmers/sunil.jpg'
    },
    {
      id: 'F005',
      name: 'Malini Wickramasinghe',
      phone: '+94 78 222 3456',
      province: 'Central Province',
      district: 'Matale',
      cropType: 'Vegetables',
      quantity: '500 kg',
      status: 'Recently Harvested',
      harvestDate: '2025-08-13',
      qualityGrade: 'A+',
      farmSize: '2 acres', 
      avatar: '/farmers/malini.jpg'
    }
  ];

  // Helper functions
  function getStatusIcon(status: string) {
    switch (status) {
      case 'Ready for Pickup':
        return <CheckCircleIcon sx={{ fontSize: '1rem' }} />;
      case 'Recently Harvested':
        return <PendingIcon sx={{ fontSize: '1rem' }} />;
      case 'Active':
        return <CheckCircleIcon sx={{ fontSize: '1rem' }} />;
      default:
        return <ErrorIcon sx={{ fontSize: '1rem' }} />;
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'Ready for Pickup':
        return 'success';
      case 'Recently Harvested':
        return 'warning';
      case 'Active':
        return 'primary';
      default:
        return 'default';
    }
  }

  // Filter farmers based on selected criteria
  const filteredFarmers = mockFarmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.phone.includes(searchTerm) ||
                         farmer.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = !selectedProvince || farmer.province === selectedProvince;
    const matchesCropType = !selectedCropType || farmer.cropType === selectedCropType;
    const matchesStatus = !selectedStatus || farmer.status === selectedStatus;

    return matchesSearch && matchesProvince && matchesCropType && matchesStatus;
  });

  const schedulePickups = [
    {
      id: '1',
      farmerName: 'Kamal Perera',
      cropType: 'Rice',
      quantity: '2.5 tons',
      location: 'Kandy District',
      scheduledDate: '2025-08-16',
      status: 'scheduled'
    },
    {
      id: '2',
      farmerName: 'Nimal Silva',
      cropType: 'Wheat',
      quantity: '1.8 tons',
      location: 'Colombo District',
      scheduledDate: '2025-08-16',
      status: 'in-progress'
    }
  ];

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(245, 124, 0, 0.1))',
        p: 3,
        borderRadius: 3,
        border: '1px solid rgba(25, 118, 210, 0.2)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ 
            backgroundColor: '#1976d2',
            width: 56,
            height: 56
          }}>
            <LocalShippingIcon sx={{ fontSize: '2rem' }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              color: '#333333',
              background: 'linear-gradient(135deg, #1976d2, #f57c00)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Crop Pickup Scheduling
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666' }}>
              Manage and schedule crop pickups efficiently
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<ScheduleIcon />}
          onClick={() => setScheduleModalOpen(true)}
          sx={{
            background: 'linear-gradient(135deg, #1976d2, #f57c00)',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              background: 'linear-gradient(135deg, #1565c0, #ef6c00)',
            }
          }}
        >
          Schedule New Pickup
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4 
      }}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1))',
          border: '1px solid rgba(76, 175, 80, 0.2)'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ backgroundColor: '#4CAF50' }}>
                <AgricultureIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  12
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Pickups
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(100, 181, 246, 0.1))',
          border: '1px solid rgba(33, 150, 243, 0.2)'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ backgroundColor: '#2196F3' }}>
                <ScheduleIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  8
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Scheduled Today
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 193, 7, 0.1))',
          border: '1px solid rgba(255, 152, 0, 0.2)'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ backgroundColor: '#FF9800' }}>
                <LocalShippingIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In Progress
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(129, 199, 132, 0.1))',
          border: '1px solid rgba(76, 175, 80, 0.2)'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ backgroundColor: '#4CAF50' }}>
                <Badge badgeContent="✓" color="success">
                  <LocalShippingIcon />
                </Badge>
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  23
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed Today
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Scheduled Pickups Table */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
          Today&apos;s Scheduled Pickups
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Farmer</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Crop Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedulePickups.map((pickup) => (
                <TableRow key={pickup.id} sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.05)' } }}>
                  <TableCell>{pickup.farmerName}</TableCell>
                  <TableCell>
                    <Chip 
                      label={pickup.cropType} 
                      size="small"
                      sx={{ backgroundColor: '#4CAF50', color: 'white' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{pickup.quantity}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
                      {pickup.location}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={pickup.status}
                      color={pickup.status === 'scheduled' ? 'primary' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{ 
                        borderColor: '#1976d2',
                        color: '#1976d2',
                        textTransform: 'none'
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Beautiful Pickup Scheduling Modal */}
      <Dialog
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #1976d2, #f57c00)',
          color: 'white',
          textAlign: 'center',
          position: 'relative'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <LocalShippingIcon sx={{ fontSize: '2rem' }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Schedule New Pickup
            </Typography>
          </Box>
          <IconButton
            onClick={() => setScheduleModalOpen(false)}
            sx={{ 
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <ClearIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {/* Beautiful Filter Section */}
          <Box sx={{ 
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05), rgba(245, 124, 0, 0.05))',
            p: 3,
            borderBottom: '1px solid #e0e0e0'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <FilterListIcon sx={{ color: '#1976d2', fontSize: '1.5rem' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                Filter Farmers
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' }, gap: 3 }}>
              {/* Search Field */}
              <Box>
                <TextField
                  fullWidth
                  placeholder="Search farmers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#1976d2' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'white',
                      '&:hover fieldset': {
                        borderColor: '#1976d2',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                      }
                    }
                  }}
                />
              </Box>

              {/* Province Filter */}
              <Box>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#1976d2', '&.Mui-focused': { color: '#1976d2' } }}>
                    Province
                  </InputLabel>
                  <Select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    label="Province"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: 'white',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1976d2',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1976d2',
                      }
                    }}
                  >
                    <MenuItem value="">All Provinces</MenuItem>
                    {provinces.map((province) => (
                      <MenuItem key={province} value={province}>
                        {province}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Crop Type Filter */}
              <Box>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#1976d2', '&.Mui-focused': { color: '#1976d2' } }}>
                    Crop Type
                  </InputLabel>
                  <Select
                    value={selectedCropType}
                    onChange={(e) => setSelectedCropType(e.target.value)}
                    label="Crop Type"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: 'white',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1976d2',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1976d2',
                      }
                    }}
                  >
                    <MenuItem value="">All Crops</MenuItem>
                    {cropTypes.map((crop) => (
                      <MenuItem key={crop} value={crop}>
                        {crop}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Status Filter */}
              <Box>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#1976d2', '&.Mui-focused': { color: '#1976d2' } }}>
                    Status
                  </InputLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    label="Status"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: 'white',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1976d2',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1976d2',
                      }
                    }}
                  >
                    <MenuItem value="">All Status</MenuItem>
                    {farmerStatuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Clear Filters Button */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedProvince('');
                  setSelectedCropType('');
                  setSelectedStatus('');
                }}
                sx={{
                  textTransform: 'none',
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  '&:hover': {
                    borderColor: '#1565c0',
                    backgroundColor: 'rgba(25, 118, 210, 0.05)'
                  }
                }}
              >
                Clear Filters
              </Button>
            </Box>
          </Box>

          {/* Farmers List */}
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                Select Farmers ({filteredFarmers.length} found)
              </Typography>
              {selectedFarmers.length > 0 && (
                <Chip 
                  label={`${selectedFarmers.length} selected`}
                  color="primary"
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              {filteredFarmers.map((farmer) => (
                <Box key={farmer.id}>
                  <Card sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: selectedFarmers.includes(farmer.id) 
                      ? '2px solid #1976d2' 
                      : '1px solid #e0e0e0',
                    background: selectedFarmers.includes(farmer.id)
                      ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.05), rgba(245, 124, 0, 0.05))'
                      : 'white',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.15)',
                      transform: 'translateY(-2px)'
                    }
                  }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar 
                          src={farmer.avatar}
                          sx={{ 
                            width: 50, 
                            height: 50,
                            backgroundColor: '#1976d2'
                          }}
                        >
                          <PersonIcon />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                            {farmer.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PhoneIcon sx={{ fontSize: '0.9rem', color: '#666' }} />
                            <Typography variant="caption" color="text.secondary">
                              {farmer.phone}
                            </Typography>
                          </Box>
                        </Box>
                        <Checkbox
                          checked={selectedFarmers.includes(farmer.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFarmers([...selectedFarmers, farmer.id]);
                            } else {
                              setSelectedFarmers(selectedFarmers.filter(id => id !== farmer.id));
                            }
                          }}
                          sx={{
                            color: '#1976d2',
                            '&.Mui-checked': {
                              color: '#1976d2'
                            }
                          }}
                        />
                      </Box>

                      <Divider sx={{ my: 1 }} />

                      {/* Farmer Details */}
                      <Stack spacing={1}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOnIcon sx={{ fontSize: '1rem', color: '#1976d2' }} />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {farmer.district}, {farmer.province}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AgricultureIcon sx={{ fontSize: '1rem', color: '#4CAF50' }} />
                          <Typography variant="body2">
                            {farmer.cropType} - {farmer.quantity}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarTodayIcon sx={{ fontSize: '1rem', color: '#FF9800' }} />
                          <Typography variant="body2">
                            Harvested: {farmer.harvestDate}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justify: 'space-between', alignItems: 'center', mt: 1 }}>
                          <Chip 
                            icon={getStatusIcon(farmer.status)}
                            label={farmer.status}
                            size="small"
                            color={getStatusColor(farmer.status) as 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'default'}
                            sx={{ fontWeight: 500 }}
                          />
                          <Chip 
                            label={`Grade ${farmer.qualityGrade}`}
                            size="small"
                            sx={{ 
                              backgroundColor: '#4CAF50',
                              color: 'white',
                              fontWeight: 600
                            }}
                          />
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>

            {filteredFarmers.length === 0 && (
              <Box sx={{ 
                textAlign: 'center', 
                py: 4,
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05), rgba(245, 124, 0, 0.05))',
                borderRadius: 2
              }}>
                <SearchIcon sx={{ fontSize: '3rem', color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No farmers found matching your criteria
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your filters to see more results
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ 
          p: 3, 
          borderTop: '1px solid #e0e0e0',
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.02), rgba(245, 124, 0, 0.02))'
        }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 2, width: '100%', alignItems: 'center' }}>
            <Box>
              <TextField
                fullWidth
                type="date"
                label="Pickup Date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: new Date().toISOString().split('T')[0]
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': { borderColor: '#1976d2' },
                    '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' }
                }}
              />
            </Box>
            
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  onClick={() => setScheduleModalOpen(false)}
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                    borderColor: '#666',
                    color: '#666',
                    '&:hover': {
                      borderColor: '#333',
                      backgroundColor: 'rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={selectedFarmers.length === 0 || !pickupDate}
                  startIcon={<ScheduleIcon />}
                  onClick={() => {
                    // Handle scheduling logic here
                    console.log('Scheduling pickup for farmers:', selectedFarmers, 'on', pickupDate);
                    setScheduleModalOpen(false);
                    setSelectedFarmers([]);
                    setPickupDate('');
                  }}
                  sx={{
                    background: 'linear-gradient(135deg, #1976d2, #f57c00)',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0, #ef6c00)',
                    },
                    '&:disabled': {
                      background: '#ccc'
                    }
                  }}
                >
                  Schedule Pickup ({selectedFarmers.length})
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
