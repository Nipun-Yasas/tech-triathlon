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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Tabs,
  Tab,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Analytics,
  TrendingUp,
  TrendingDown,
  Agriculture,
  People,
  LocalShipping,
  Assessment,
  FileDownload,
  DateRange,
  BarChart,
} from '@mui/icons-material';

interface MonthlyData {
  month: string;
  cropSubmissions: number;
  fertilizerDistributed: number;
  pickupsCompleted: number;
  activeFarmers: number;
  revenue: number;
}

interface TopPerformer {
  name: string;
  avatar: string;
  metric: string;
  value: number;
  change: number;
  rank: number;
}

const monthlyData: MonthlyData[] = [
  { month: 'Jan', cropSubmissions: 145, fertilizerDistributed: 2500, pickupsCompleted: 120, activeFarmers: 89, revenue: 450000 },
  { month: 'Feb', cropSubmissions: 167, fertilizerDistributed: 2800, pickupsCompleted: 135, activeFarmers: 95, revenue: 520000 },
  { month: 'Mar', cropSubmissions: 189, fertilizerDistributed: 3200, pickupsCompleted: 156, activeFarmers: 102, revenue: 580000 },
  { month: 'Apr', cropSubmissions: 203, fertilizerDistributed: 3500, pickupsCompleted: 178, activeFarmers: 108, revenue: 620000 },
  { month: 'May', cropSubmissions: 234, fertilizerDistributed: 3800, pickupsCompleted: 195, activeFarmers: 115, revenue: 680000 },
  { month: 'Jun', cropSubmissions: 256, fertilizerDistributed: 4100, pickupsCompleted: 212, activeFarmers: 121, revenue: 750000 },
  { month: 'Jul', cropSubmissions: 278, fertilizerDistributed: 4400, pickupsCompleted: 234, activeFarmers: 128, revenue: 820000 },
  { month: 'Aug', cropSubmissions: 295, fertilizerDistributed: 4600, pickupsCompleted: 245, activeFarmers: 132, revenue: 890000 },
];

const topPerformers: TopPerformer[] = [
  { name: 'John Doe', avatar: '/api/placeholder/40/40', metric: 'Crop Yield', value: 85.5, change: 12.3, rank: 1 },
  { name: 'Sarah Wilson', avatar: '/api/placeholder/40/40', metric: 'Efficiency', value: 92.1, change: 8.7, rank: 2 },
  { name: 'Mike Johnson', avatar: '/api/placeholder/40/40', metric: 'Quality Score', value: 88.9, change: 15.2, rank: 3 },
  { name: 'Emily Davis', avatar: '/api/placeholder/40/40', metric: 'Sustainability', value: 94.3, change: 6.8, rank: 4 },
];

export default function ReportsAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [tabValue, setTabValue] = useState(0);

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report...`);
    // This would typically trigger a report generation API call
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600, color: '#2E7D32' }}>
          📊 Reports & Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive insights and performance analytics
        </Typography>
      </Box>

      {/* Period Selection */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Time Period</InputLabel>
          <Select
            value={selectedPeriod}
            label="Time Period"
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
        
        <Button
          variant="outlined"
          startIcon={<FileDownload />}
          onClick={() => generateReport('comprehensive')}
        >
          Export Report
        </Button>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Crop Submissions
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#2E7D32' }}>
                    {currentMonth.cropSubmissions}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUp sx={{ color: '#4CAF50', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                      +{calculateGrowth(currentMonth.cropSubmissions, previousMonth.cropSubmissions)}%
                    </Typography>
                  </Box>
                </Box>
                <Agriculture sx={{ fontSize: 40, color: '#2E7D32' }} />
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
                    Active Farmers
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#1976D2' }}>
                    {currentMonth.activeFarmers}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUp sx={{ color: '#4CAF50', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                      +{calculateGrowth(currentMonth.activeFarmers, previousMonth.activeFarmers)}%
                    </Typography>
                  </Box>
                </Box>
                <People sx={{ fontSize: 40, color: '#1976D2' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Pickups Completed
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#F57C00' }}>
                    {currentMonth.pickupsCompleted}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUp sx={{ color: '#4CAF50', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                      +{calculateGrowth(currentMonth.pickupsCompleted, previousMonth.pickupsCompleted)}%
                    </Typography>
                  </Box>
                </Box>
                <LocalShipping sx={{ fontSize: 40, color: '#F57C00' }} />
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
                    Monthly Revenue
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#7B1FA2' }}>
                    ₹{(currentMonth.revenue / 100000).toFixed(1)}L
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUp sx={{ color: '#4CAF50', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                      +{calculateGrowth(currentMonth.revenue, previousMonth.revenue)}%
                    </Typography>
                  </Box>
                </Box>
                <Assessment sx={{ fontSize: 40, color: '#7B1FA2' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different report sections */}
      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label="Performance Overview" />
          <Tab label="Top Performers" />
          <Tab label="Detailed Reports" />
        </Tabs>

        {/* Performance Overview Tab */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Trends
                  </Typography>
                  <Box sx={{ 
                    height: 300, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: '#f5f5f5',
                    borderRadius: 1
                  }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <BarChart sx={{ fontSize: 48, color: '#666', mb: 2 }} />
                      <Typography color="text.secondary">
                        Interactive Chart Placeholder
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Showing trends for {selectedPeriod} data
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Key Insights
                  </Typography>
                  <Box sx={{ space: 2 }}>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      📈 <strong>Best Month:</strong> August with {currentMonth.cropSubmissions} submissions
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      🚀 <strong>Growth Rate:</strong> {calculateGrowth(currentMonth.revenue, monthlyData[0].revenue)}% YTD
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      👥 <strong>Farmer Retention:</strong> 94.5% active users
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      ⚡ <strong>Efficiency:</strong> 87% on-time pickups
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Top Performers Tab */}
        {tabValue === 1 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Farmer</TableCell>
                  <TableCell>Metric</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Change</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topPerformers.map((performer) => (
                  <TableRow key={performer.rank} hover>
                    <TableCell>
                      <Chip 
                        label={`#${performer.rank}`} 
                        size="small" 
                        color={performer.rank === 1 ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src={performer.avatar} sx={{ width: 32, height: 32 }} />
                        <Typography variant="body2" fontWeight={500}>
                          {performer.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{performer.metric}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {performer.value}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {performer.change > 0 ? (
                          <TrendingUp sx={{ color: '#4CAF50', fontSize: 16, mr: 0.5 }} />
                        ) : (
                          <TrendingDown sx={{ color: '#f44336', fontSize: 16, mr: 0.5 }} />
                        )}
                        <Typography 
                          variant="body2" 
                          sx={{ color: performer.change > 0 ? '#4CAF50' : '#f44336' }}
                        >
                          {performer.change > 0 ? '+' : ''}{performer.change}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={performer.value > 90 ? 'Excellent' : performer.value > 80 ? 'Good' : 'Average'}
                        size="small"
                        color={performer.value > 90 ? 'success' : performer.value > 80 ? 'primary' : 'default'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Detailed Reports Tab */}
        {tabValue === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Available Reports
                  </Typography>
                  <Box sx={{ space: 2 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      sx={{ mb: 2, justifyContent: 'flex-start' }}
                      startIcon={<FileDownload />}
                      onClick={() => generateReport('crop-analysis')}
                    >
                      Crop Analysis Report
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      sx={{ mb: 2, justifyContent: 'flex-start' }}
                      startIcon={<FileDownload />}
                      onClick={() => generateReport('farmer-performance')}
                    >
                      Farmer Performance Report
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      sx={{ mb: 2, justifyContent: 'flex-start' }}
                      startIcon={<FileDownload />}
                      onClick={() => generateReport('fertilizer-usage')}
                    >
                      Fertilizer Usage Report
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      sx={{ mb: 2, justifyContent: 'flex-start' }}
                      startIcon={<FileDownload />}
                      onClick={() => generateReport('financial-summary')}
                    >
                      Financial Summary
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Report Schedule
                  </Typography>
                  <Box sx={{ space: 2 }}>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      📅 <strong>Daily:</strong> Automated at 6:00 AM
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      📊 <strong>Weekly:</strong> Every Monday at 8:00 AM
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      📈 <strong>Monthly:</strong> 1st of each month
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      📋 <strong>Quarterly:</strong> End of quarter review
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
