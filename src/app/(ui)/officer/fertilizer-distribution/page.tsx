'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
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
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import {
  Science,
  LocalShipping,
  CheckCircle,
  Schedule,
  Inventory,
  Assignment,
  Add,
  Edit,
  Visibility,
} from '@mui/icons-material';

interface FertilizerRequest {
  id: string;
  farmerName: string;
  farmerAvatar: string;
  fertilizerType: string;
  quantityRequested: number;
  quantityApproved: number;
  unit: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Distributed' | 'Rejected';
  priority: 'High' | 'Medium' | 'Low';
  cropType: string;
  farmSize: number;
  reason: string;
}

interface FertilizerStock {
  id: string;
  type: string;
  brand: string;
  currentStock: number;
  totalCapacity: number;
  unit: string;
  pricePerUnit: number;
  expiryDate: string;
  supplier: string;
}

const mockRequests: FertilizerRequest[] = [
  {
    id: 'FR001',
    farmerName: 'John Doe',
    farmerAvatar: '/api/placeholder/40/40',
    fertilizerType: 'NPK 10-26-26',
    quantityRequested: 50,
    quantityApproved: 45,
    unit: 'kg',
    requestDate: '2025-08-14',
    status: 'Approved',
    priority: 'High',
    cropType: 'Rice',
    farmSize: 2.5,
    reason: 'Early growth stage fertilization'
  },
  {
    id: 'FR002',
    farmerName: 'Sarah Wilson',
    farmerAvatar: '/api/placeholder/40/40',
    fertilizerType: 'Urea',
    quantityRequested: 30,
    quantityApproved: 30,
    unit: 'kg',
    requestDate: '2025-08-13',
    status: 'Distributed',
    priority: 'Medium',
    cropType: 'Wheat',
    farmSize: 1.8,
    reason: 'Nitrogen deficiency correction'
  },
  {
    id: 'FR003',
    farmerName: 'Mike Johnson',
    farmerAvatar: '/api/placeholder/40/40',
    fertilizerType: 'DAP',
    quantityRequested: 25,
    quantityApproved: 0,
    unit: 'kg',
    requestDate: '2025-08-12',
    status: 'Pending',
    priority: 'Low',
    cropType: 'Corn',
    farmSize: 1.2,
    reason: 'Pre-planting soil preparation'
  },
];

const mockStock: FertilizerStock[] = [
  {
    id: 'FS001',
    type: 'NPK 10-26-26',
    brand: 'Coromandel',
    currentStock: 450,
    totalCapacity: 1000,
    unit: 'kg',
    pricePerUnit: 850,
    expiryDate: '2026-12-31',
    supplier: 'Coromandel International'
  },
  {
    id: 'FS002',
    type: 'Urea',
    brand: 'IFFCO',
    currentStock: 800,
    totalCapacity: 1500,
    unit: 'kg',
    pricePerUnit: 350,
    expiryDate: '2026-06-30',
    supplier: 'IFFCO Ltd'
  },
  {
    id: 'FS003',
    type: 'DAP',
    brand: 'NFL',
    currentStock: 150,
    totalCapacity: 800,
    unit: 'kg',
    pricePerUnit: 1200,
    expiryDate: '2025-11-30',
    supplier: 'National Fertilizers Ltd'
  },
];

export default function FertilizerDistributionPage() {
  const [requests] = useState<FertilizerRequest[]>(mockRequests);
  const [stock] = useState<FertilizerStock[]>(mockStock);
  const [selectedRequest, setSelectedRequest] = useState<FertilizerRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Distributed': return 'success';
      case 'Approved': return 'info';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      default: return 'default';
    }
  };

  const getStockLevel = (current: number, total: number) => {
    const percentage = (current / total) * 100;
    if (percentage < 20) return 'error';
    if (percentage < 50) return 'warning';
    return 'success';
  };

  const handleViewDetails = (request: FertilizerRequest) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const distributedCount = requests.filter(r => r.status === 'Distributed').length;
  const totalValue = requests.reduce((sum, r) => sum + (r.quantityApproved * 500), 0);
  const lowStockCount = stock.filter(s => (s.currentStock / s.totalCapacity) < 0.2).length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600, color: '#2E7D32' }}>
          🧪 Fertilizer Distribution
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage fertilizer requests and inventory distribution
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
                    Pending Requests
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
                    Distributed Today
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#2E7D32' }}>
                    {distributedCount}
                  </Typography>
                </Box>
                <LocalShipping sx={{ fontSize: 40, color: '#2E7D32' }} />
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
                <Science sx={{ fontSize: 40, color: '#1976D2' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Low Stock Items
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#D32F2F' }}>
                    {lowStockCount}
                  </Typography>
                </Box>
                <Inventory sx={{ fontSize: 40, color: '#D32F2F' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>{lowStockCount}</strong> fertilizer types are running low on stock. Please reorder soon.
        </Alert>
      )}

      {/* Tabs */}
      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label="Distribution Requests" />
          <Tab label="Stock Management" />
        </Tabs>

        {/* Distribution Requests Tab */}
        {tabValue === 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Distribution Requests
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ 
                  bgcolor: '#4CAF50',
                  '&:hover': { bgcolor: '#45a049' }
                }}
              >
                New Request
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Farmer</TableCell>
                    <TableCell>Fertilizer Type</TableCell>
                    <TableCell>Requested</TableCell>
                    <TableCell>Approved</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar src={request.farmerAvatar} sx={{ width: 32, height: 32 }} />
                          <Typography variant="body2" fontWeight={500}>
                            {request.farmerName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{request.fertilizerType}</TableCell>
                      <TableCell>{request.quantityRequested} {request.unit}</TableCell>
                      <TableCell>{request.quantityApproved} {request.unit}</TableCell>
                      <TableCell>
                        <Chip 
                          label={request.priority}
                          size="small"
                          color={getPriorityColor(request.priority) as any}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={request.status}
                          size="small"
                          color={getStatusColor(request.status) as any}
                        />
                      </TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleViewDetails(request)}
                            sx={{ color: '#1976D2' }}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            sx={{ color: '#4CAF50' }}
                          >
                            <Edit />
                          </IconButton>
                          {request.status === 'Approved' && (
                            <IconButton 
                              size="small" 
                              sx={{ color: '#2E7D32' }}
                            >
                              <CheckCircle />
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Stock Management Tab */}
        {tabValue === 1 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Current Stock Levels
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ 
                  bgcolor: '#4CAF50',
                  '&:hover': { bgcolor: '#45a049' }
                }}
              >
                Add Stock
              </Button>
            </Box>

            <Grid container spacing={3}>
              {stock.map((item) => {
                const stockPercentage = (item.currentStock / item.totalCapacity) * 100;
                const stockLevel = getStockLevel(item.currentStock, item.totalCapacity);
                
                return (
                  <Grid item xs={12} md={6} lg={4} key={item.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {item.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.brand} - {item.supplier}
                        </Typography>
                        
                        <Box sx={{ mt: 2, mb: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">
                              Stock Level
                            </Typography>
                            <Typography variant="body2">
                              {item.currentStock}/{item.totalCapacity} {item.unit}
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={stockPercentage}
                            color={stockLevel}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>

                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Price: ₹{item.pricePerUnit}/{item.unit}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Expires: {item.expiryDate}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Paper>

      {/* Request Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedRequest && (
          <>
            <DialogTitle>
              Request Details - {selectedRequest.id}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Farmer Information</Typography>
                  <Typography><strong>Name:</strong> {selectedRequest.farmerName}</Typography>
                  <Typography><strong>Crop Type:</strong> {selectedRequest.cropType}</Typography>
                  <Typography><strong>Farm Size:</strong> {selectedRequest.farmSize} acres</Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Request Details</Typography>
                  <Typography><strong>Fertilizer:</strong> {selectedRequest.fertilizerType}</Typography>
                  <Typography><strong>Requested:</strong> {selectedRequest.quantityRequested} {selectedRequest.unit}</Typography>
                  <Typography><strong>Approved:</strong> {selectedRequest.quantityApproved} {selectedRequest.unit}</Typography>
                  <Typography><strong>Priority:</strong> {selectedRequest.priority}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Reason</Typography>
                  <Typography>{selectedRequest.reason}</Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Status</Typography>
                  <Chip 
                    label={selectedRequest.status}
                    color={getStatusColor(selectedRequest.status) as any}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
              {selectedRequest.status === 'Pending' && (
                <>
                  <Button 
                    variant="contained" 
                    color="success"
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error"
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
