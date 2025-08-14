'use client';

import React from 'react';
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
  Badge
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AgricultureIcon from '@mui/icons-material/Agriculture';

export default function CropPickupPage() {
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
    </Box>
  );
}
