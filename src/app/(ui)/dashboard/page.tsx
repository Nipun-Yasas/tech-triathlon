'use client';

import React from 'react';
import { Box, Typography, Paper, Card, CardContent, CardActions, Button, Chip, Avatar, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import Link from 'next/link';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Dashboard() {
  // Mock data - in a real app, fetch this from your API
  const upcomingAppointments = [
    { id: 1, service: 'Passport Renewal', date: '2025-08-15', time: '10:00 AM', department: 'Immigration' },
    { id: 2, service: 'Crop Pickup', date: '2025-08-20', time: '2:30 PM', department: 'Agriculture' },
  ];
  
  const pendingDocuments = [
    { id: 1, name: 'ID Card Scan', status: 'Awaiting Review', service: 'Passport Renewal' },
    { id: 2, name: 'Crop Photos', status: 'Rejected', service: 'Crop Submission' },
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
          Book New Appointment
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
    </>
  );
}
