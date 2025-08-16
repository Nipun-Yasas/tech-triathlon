'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
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
  TextField,
  Avatar,
  InputAdornment,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import {
  People,
  PersonAdd,
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  Phone,
  Email,
  LocationOn,
  Agriculture,
  TrendingUp,
  CheckCircle,
  Cancel,
  MoreVert,
} from '@mui/icons-material';

interface Farmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  farmSize: number;
  crops: string[];
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Pending';
  totalSubmissions: number;
  averageQuality: number;
  totalEarnings: number;
  lastActivity: string;
}

const mockFarmers: Farmer[] = [
  {
    id: 'F001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    avatar: '/api/placeholder/40/40',
    location: 'Village A, District 1',
    farmSize: 2.5,
    crops: ['Rice', 'Wheat'],
    joinDate: '2024-01-15',
    status: 'Active',
    totalSubmissions: 45,
    averageQuality: 8.5,
    totalEarnings: 125000,
    lastActivity: '2025-08-14'
  },
  {
    id: 'F002',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+91 98765 43211',
    avatar: '/api/placeholder/40/40',
    location: 'Village B, District 1',
    farmSize: 1.8,
    crops: ['Corn', 'Tomatoes'],
    joinDate: '2024-02-20',
    status: 'Active',
    totalSubmissions: 32,
    averageQuality: 9.2,
    totalEarnings: 89000,
    lastActivity: '2025-08-13'
  },
  {
    id: 'F003',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '+91 98765 43212',
    avatar: '/api/placeholder/40/40',
    location: 'Village C, District 2',
    farmSize: 3.2,
    crops: ['Rice', 'Sugarcane'],
    joinDate: '2024-03-10',
    status: 'Pending',
    totalSubmissions: 15,
    averageQuality: 7.8,
    totalEarnings: 45000,
    lastActivity: '2025-08-10'
  },
  {
    id: 'F004',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+91 98765 43213',
    avatar: '/api/placeholder/40/40',
    location: 'Village A, District 3',
    farmSize: 4.1,
    crops: ['Wheat', 'Cotton'],
    joinDate: '2024-01-25',
    status: 'Active',
    totalSubmissions: 67,
    averageQuality: 8.9,
    totalEarnings: 189000,
    lastActivity: '2025-08-14'
  },
];

export default function ManageFarmersPage() {
  const [farmers] = useState<Farmer[]>(mockFarmers);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'error';
      default: return 'warning';
    }
  };

  const handleViewDetails = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setDialogOpen(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activeFarmers = farmers.filter(f => f.status === 'Active').length;
  const pendingFarmers = farmers.filter(f => f.status === 'Pending').length;
  const totalEarnings = farmers.reduce((sum, f) => sum + f.totalEarnings, 0);
  const avgQuality = farmers.reduce((sum, f) => sum + f.averageQuality, 0) / farmers.length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600, color: '#2E7D32' }}>
          👥 Manage Farmers
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Oversee farmer registrations and monitor performance
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <Card sx={{ background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Active Farmers
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: '#2E7D32' }}>
                  {activeFarmers}
                </Typography>
              </Box>
              <People sx={{ fontSize: 40, color: '#2E7D32' }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Pending Review
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: '#F57C00' }}>
                  {pendingFarmers}
                </Typography>
              </Box>
              <PersonAdd sx={{ fontSize: 40, color: '#F57C00' }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Total Earnings
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: '#1976D2' }}>
                  ₹{(totalEarnings / 100000).toFixed(1)}L
                </Typography>
              </Box>
              <TrendingUp sx={{ fontSize: 40, color: '#1976D2' }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Avg Quality Score
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: '#7B1FA2' }}>
                  {avgQuality.toFixed(1)}
                </Typography>
              </Box>
              <Agriculture sx={{ fontSize: 40, color: '#7B1FA2' }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Pending Approvals Alert */}
      {pendingFarmers > 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>{pendingFarmers}</strong> farmer registrations are pending your review and approval.
        </Alert>
      )}

      {/* Main Content */}
      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label="All Farmers" />
          <Tab label="Pending Approval" />
          <Tab label="Performance Analytics" />
        </Tabs>

        {/* All Farmers Tab */}
        {tabValue === 0 && (
          <>
            {/* Search and Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <TextField
                placeholder="Search farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 300 }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                >
                  Filter
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  sx={{ 
                    bgcolor: '#4CAF50',
                    '&:hover': { bgcolor: '#45a049' }
                  }}
                >
                  Add Farmer
                </Button>
              </Box>
            </Box>

            {/* Farmers Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Farmer</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Farm Size</TableCell>
                    <TableCell>Crops</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Submissions</TableCell>
                    <TableCell>Quality Score</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredFarmers.map((farmer) => (
                    <TableRow key={farmer.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={farmer.avatar} sx={{ width: 40, height: 40 }} />
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {farmer.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {farmer.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{farmer.location}</Typography>
                      </TableCell>
                      <TableCell>{farmer.farmSize} acres</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {farmer.crops.map((crop, index) => (
                            <Chip 
                              key={index}
                              label={crop} 
                              size="small" 
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={farmer.status}
                          size="small"
                          color={getStatusColor(farmer.status) as 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'}
                        />
                      </TableCell>
                      <TableCell>{farmer.totalSubmissions}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {farmer.averageQuality}/10
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleViewDetails(farmer)}
                            sx={{ color: '#1976D2' }}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={(e) => handleMenuOpen(e)}
                            sx={{ color: '#666' }}
                          >
                            <MoreVert />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Pending Approval Tab */}
        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Farmers Awaiting Approval
            </Typography>
            {farmers.filter(f => f.status === 'Pending').map((farmer) => (
              <Card key={farmer.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={farmer.avatar} sx={{ width: 50, height: 50 }} />
                        <Box>
                          <Typography variant="h6">{farmer.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {farmer.location} • {farmer.farmSize} acres
                          </Typography>
                          <Typography variant="body2">
                            Crops: {farmer.crops.join(', ')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-end' } }}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircle />}
                        size="small"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Cancel />}
                        size="small"
                      >
                        Reject
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Visibility />}
                        size="small"
                        onClick={() => handleViewDetails(farmer)}
                      >
                        Review
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* Performance Analytics Tab */}
        {tabValue === 2 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Performing Farmers
                </Typography>
                {farmers
                  .sort((a, b) => b.averageQuality - a.averageQuality)
                  .slice(0, 5)
                  .map((farmer, index) => (
                    <Box key={farmer.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Typography variant="h6" sx={{ color: '#4CAF50', minWidth: 30 }}>
                        #{index + 1}
                      </Typography>
                      <Avatar src={farmer.avatar} sx={{ width: 32, height: 32 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {farmer.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Quality Score: {farmer.averageQuality}/10
                        </Typography>
                      </Box>
                    </Box>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                {farmers
                  .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
                  .slice(0, 5)
                  .map((farmer) => (
                    <Box key={farmer.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar src={farmer.avatar} sx={{ width: 32, height: 32 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {farmer.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Last active: {farmer.lastActivity}
                        </Typography>
                      </Box>
                      <Chip 
                        label={farmer.status}
                        size="small"
                        color={getStatusColor(farmer.status) as 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'}
                      />
                    </Box>
                  ))}
              </CardContent>
            </Card>
          </Box>
        )}
      </Paper>

      {/* Farmer Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedFarmer && (
          <>
            <DialogTitle>
              Farmer Profile - {selectedFarmer.name}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar 
                    src={selectedFarmer.avatar} 
                    sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {selectedFarmer.name}
                  </Typography>
                  <Chip 
                    label={selectedFarmer.status}
                    color={getStatusColor(selectedFarmer.status) as 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>Contact Information</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Email sx={{ color: '#666', fontSize: 18 }} />
                    <Typography>{selectedFarmer.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Phone sx={{ color: '#666', fontSize: 18 }} />
                    <Typography>{selectedFarmer.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocationOn sx={{ color: '#666', fontSize: 18 }} />
                    <Typography>{selectedFarmer.location}</Typography>
                  </Box>

                  <Typography variant="h6" gutterBottom>Farm Details</Typography>
                  <Typography><strong>Farm Size:</strong> {selectedFarmer.farmSize} acres</Typography>
                  <Typography><strong>Crops:</strong> {selectedFarmer.crops.join(', ')}</Typography>
                  <Typography><strong>Total Submissions:</strong> {selectedFarmer.totalSubmissions}</Typography>
                  <Typography><strong>Average Quality:</strong> {selectedFarmer.averageQuality}/10</Typography>
                  <Typography><strong>Total Earnings:</strong> ₹{selectedFarmer.totalEarnings.toLocaleString()}</Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
              <Button variant="outlined" startIcon={<Edit />}>
                Edit Profile
              </Button>
              {selectedFarmer.status === 'Pending' && (
                <>
                  <Button 
                    variant="contained" 
                    color="success"
                    startIcon={<CheckCircle />}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error"
                    startIcon={<Cancel />}
                  >
                    Reject
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Phone sx={{ mr: 1 }} /> Call
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Email sx={{ mr: 1 }} /> Email
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
