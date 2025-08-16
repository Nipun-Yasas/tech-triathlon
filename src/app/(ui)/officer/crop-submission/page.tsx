'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import {
  Visibility,
  CheckCircle,
  Cancel,
  Agriculture,
  TrendingUp,
  Schedule,
  Assignment,
  Add,
  Edit,
  Delete,
} from '@mui/icons-material';

interface CropSubmission {
  id: string;
  farmerName: string;
  farmerAvatar: string;
  cropType: string;
  quantity: number;
  unit: string;
  quality: 'Premium' | 'Good' | 'Fair';
  submissionDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  estimatedValue: number;
  photos: string[];
  location: string;
}

const mockSubmissions: CropSubmission[] = [
  {
    id: 'CS001',
    farmerName: 'John Doe',
    farmerAvatar: '/api/placeholder/40/40',
    cropType: 'Rice',
    quantity: 150,
    unit: 'kg',
    quality: 'Premium',
    submissionDate: '2025-08-14',
    status: 'Pending',
    estimatedValue: 22500,
    photos: ['/api/placeholder/200/150'],
    location: 'Field A1'
  },
  {
    id: 'CS002',
    farmerName: 'Sarah Wilson',
    farmerAvatar: '/api/placeholder/40/40',
    cropType: 'Wheat',
    quantity: 200,
    unit: 'kg',
    quality: 'Good',
    submissionDate: '2025-08-13',
    status: 'Approved',
    estimatedValue: 18000,
    photos: ['/api/placeholder/200/150'],
    location: 'Field B2'
  },
  {
    id: 'CS003',
    farmerName: 'Mike Johnson',
    farmerAvatar: '/api/placeholder/40/40',
    cropType: 'Corn',
    quantity: 75,
    unit: 'kg',
    quality: 'Fair',
    submissionDate: '2025-08-12',
    status: 'Under Review',
    estimatedValue: 7500,
    photos: ['/api/placeholder/200/150'],
    location: 'Field C3'
  },
];

export default function CropSubmissionPage() {
  const [submissions] = useState<CropSubmission[]>(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<CropSubmission | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      case 'Under Review': return 'warning';
      default: return 'default';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Premium': return 'success';
      case 'Good': return 'primary';
      default: return 'default';
    }
  };

  const handleViewDetails = (submission: CropSubmission) => {
    setSelectedSubmission(submission);
    setDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    console.log('Approving submission:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejecting submission:', id);
  };

  const pendingCount = submissions.filter(s => s.status === 'Pending').length;
  const approvedCount = submissions.filter(s => s.status === 'Approved').length;
  const totalValue = submissions.reduce((sum, s) => sum + s.estimatedValue, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600, color: '#2E7D32' }}>
          🌾 Crop Submissions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and manage farmer crop submissions
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Pending Review
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#F57C00' }}>
                    {pendingCount}
                  </Typography>
                </Box>
                <Schedule sx={{ fontSize: 40, color: '#F57C00' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Approved Today
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#2E7D32' }}>
                    {approvedCount}
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, color: '#2E7D32' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Value
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#1976D2' }}>
                    ₹{totalValue.toLocaleString()}
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, color: '#1976D2' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Submissions
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#7B1FA2' }}>
                    {submissions.length}
                  </Typography>
                </Box>
                <Agriculture sx={{ fontSize: 40, color: '#7B1FA2' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Submissions Table */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Submissions
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ 
              bgcolor: '#4CAF50',
              '&:hover': { bgcolor: '#45a049' }
            }}
          >
            Add Submission
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Farmer</TableCell>
                <TableCell>Crop Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Quality</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={submission.farmerAvatar} sx={{ width: 32, height: 32 }} />
                      <Typography variant="body2" fontWeight={500}>
                        {submission.farmerName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{submission.cropType}</TableCell>
                  <TableCell>{submission.quantity} {submission.unit}</TableCell>
                  <TableCell>
                    <Chip 
                      label={submission.quality}
                      size="small"
                      color={getQualityColor(submission.quality) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={submission.status}
                      size="small"
                      color={getStatusColor(submission.status) as any}
                    />
                  </TableCell>
                  <TableCell>₹{submission.estimatedValue.toLocaleString()}</TableCell>
                  <TableCell>{submission.submissionDate}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleViewDetails(submission)}
                        sx={{ color: '#1976D2' }}
                      >
                        <Visibility />
                      </IconButton>
                      {submission.status === 'Pending' && (
                        <>
                          <IconButton 
                            size="small" 
                            onClick={() => handleApprove(submission.id)}
                            sx={{ color: '#2E7D32' }}
                          >
                            <CheckCircle />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleReject(submission.id)}
                            sx={{ color: '#D32F2F' }}
                          >
                            <Cancel />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedSubmission && (
          <>
            <DialogTitle>
              Submission Details - {selectedSubmission.id}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Farmer Information</Typography>
                  <Typography><strong>Name:</strong> {selectedSubmission.farmerName}</Typography>
                  <Typography><strong>Location:</strong> {selectedSubmission.location}</Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Crop Details</Typography>
                  <Typography><strong>Type:</strong> {selectedSubmission.cropType}</Typography>
                  <Typography><strong>Quantity:</strong> {selectedSubmission.quantity} {selectedSubmission.unit}</Typography>
                  <Typography><strong>Quality:</strong> {selectedSubmission.quality}</Typography>
                  <Typography><strong>Estimated Value:</strong> ₹{selectedSubmission.estimatedValue.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Photos</Typography>
                  <Box sx={{ 
                    width: '100%', 
                    height: 200, 
                    bgcolor: '#f5f5f5', 
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography color="text.secondary">Crop Photo Placeholder</Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
              {selectedSubmission.status === 'Pending' && (
                <>
                  <Button 
                    variant="contained" 
                    color="success"
                    onClick={() => handleApprove(selectedSubmission.id)}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error"
                    onClick={() => handleReject(selectedSubmission.id)}
                  >
                    Reject
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
