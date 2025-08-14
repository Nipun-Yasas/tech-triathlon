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
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tabs,
  Tab,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Settings,
  Person,
  Notifications,
  Security,
  Language,
  Palette,
  Storage,
  Wifi,
  Email,
  Sms,
  VolumeUp,
  Edit,
  Save,
  RestartAlt,
  CloudSync,
} from '@mui/icons-material';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  department: string;
  avatar: string;
  joinDate: string;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  sound: boolean;
  cropSubmissions: boolean;
  pickupReminders: boolean;
  systemAlerts: boolean;
  weeklyReports: boolean;
}

interface SystemSettings {
  language: string;
  timezone: string;
  theme: string;
  autoBackup: boolean;
  dataRetention: number;
  maxFileSize: number;
}

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Agricultural Officer',
    email: 'officer@agrilink.com',
    phone: '+91 98765 43210',
    department: 'Crop Management',
    avatar: '/api/placeholder/100/100',
    joinDate: '2024-01-15'
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    sms: true,
    push: true,
    sound: false,
    cropSubmissions: true,
    pickupReminders: true,
    systemAlerts: true,
    weeklyReports: false
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    language: 'en',
    timezone: 'Asia/Kolkata',
    theme: 'light',
    autoBackup: true,
    dataRetention: 365,
    maxFileSize: 10
  });

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSystemSettingChange = (key: keyof SystemSettings, value: any) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    // Save profile logic here
    console.log('Profile saved:', userProfile);
  };

  const handleResetSettings = () => {
    // Reset to default settings
    setSystemSettings({
      language: 'en',
      timezone: 'Asia/Kolkata',
      theme: 'light',
      autoBackup: true,
      dataRetention: 365,
      maxFileSize: 10
    });
    setResetDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600, color: '#2E7D32' }}>
          ⚙️ Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account preferences and system configuration
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label="Profile" icon={<Person />} />
          <Tab label="Notifications" icon={<Notifications />} />
          <Tab label="System" icon={<Settings />} />
          <Tab label="Security" icon={<Security />} />
        </Tabs>

        {/* Profile Tab */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar 
                    src={userProfile.avatar} 
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {userProfile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {userProfile.department}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Joined: {userProfile.joinDate}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    sx={{ mt: 2 }}
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Profile Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={userProfile.name}
                        disabled={!editMode}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={userProfile.email}
                        disabled={!editMode}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={userProfile.phone}
                        disabled={!editMode}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth disabled={!editMode}>
                        <InputLabel>Department</InputLabel>
                        <Select
                          value={userProfile.department}
                          label="Department"
                          onChange={(e) => setUserProfile(prev => ({ ...prev, department: e.target.value }))}
                        >
                          <MenuItem value="Crop Management">Crop Management</MenuItem>
                          <MenuItem value="Fertilizer Distribution">Fertilizer Distribution</MenuItem>
                          <MenuItem value="Logistics">Logistics</MenuItem>
                          <MenuItem value="Administration">Administration</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  
                  {editMode && (
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSaveProfile}
                        sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
                      >
                        Save Changes
                      </Button>
                      <Button variant="outlined" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Notifications Tab */}
        {tabValue === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Notification Channels
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Email />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email Notifications" 
                        secondary="Receive updates via email"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.email}
                          onChange={() => handleNotificationChange('email')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <Sms />
                      </ListItemIcon>
                      <ListItemText 
                        primary="SMS Notifications" 
                        secondary="Receive urgent alerts via SMS"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.sms}
                          onChange={() => handleNotificationChange('sms')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <Notifications />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Push Notifications" 
                        secondary="Browser push notifications"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.push}
                          onChange={() => handleNotificationChange('push')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <VolumeUp />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Sound Alerts" 
                        secondary="Play sound for notifications"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.sound}
                          onChange={() => handleNotificationChange('sound')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Notification Types
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Crop Submissions" 
                        secondary="New farmer submissions"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.cropSubmissions}
                          onChange={() => handleNotificationChange('cropSubmissions')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemText 
                        primary="Pickup Reminders" 
                        secondary="Scheduled pickup alerts"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.pickupReminders}
                          onChange={() => handleNotificationChange('pickupReminders')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemText 
                        primary="System Alerts" 
                        secondary="Important system notifications"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.systemAlerts}
                          onChange={() => handleNotificationChange('systemAlerts')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemText 
                        primary="Weekly Reports" 
                        secondary="Performance summaries"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.weeklyReports}
                          onChange={() => handleNotificationChange('weeklyReports')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* System Tab */}
        {tabValue === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    General Settings
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Language</InputLabel>
                      <Select
                        value={systemSettings.language}
                        label="Language"
                        onChange={(e) => handleSystemSettingChange('language', e.target.value)}
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="hi">Hindi</MenuItem>
                        <MenuItem value="ta">Tamil</MenuItem>
                        <MenuItem value="te">Telugu</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Timezone</InputLabel>
                      <Select
                        value={systemSettings.timezone}
                        label="Timezone"
                        onChange={(e) => handleSystemSettingChange('timezone', e.target.value)}
                      >
                        <MenuItem value="Asia/Kolkata">India Standard Time</MenuItem>
                        <MenuItem value="UTC">UTC</MenuItem>
                        <MenuItem value="Asia/Dubai">Gulf Standard Time</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel>Theme</InputLabel>
                      <Select
                        value={systemSettings.theme}
                        label="Theme"
                        onChange={(e) => handleSystemSettingChange('theme', e.target.value)}
                      >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                        <MenuItem value="auto">Auto</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Data & Storage
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CloudSync />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Auto Backup" 
                        secondary="Automatic data backup"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={systemSettings.autoBackup}
                          onChange={() => handleSystemSettingChange('autoBackup', !systemSettings.autoBackup)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>

                  <Box sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="Data Retention (days)"
                      type="number"
                      value={systemSettings.dataRetention}
                      onChange={(e) => handleSystemSettingChange('dataRetention', parseInt(e.target.value))}
                      sx={{ mb: 2 }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Max File Size (MB)"
                      type="number"
                      value={systemSettings.maxFileSize}
                      onChange={(e) => handleSystemSettingChange('maxFileSize', parseInt(e.target.value))}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Changes to system settings will take effect after the next login.
              </Alert>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
                >
                  Save Settings
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RestartAlt />}
                  onClick={() => setResetDialogOpen(true)}
                >
                  Reset to Default
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}

        {/* Security Tab */}
        {tabValue === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Password & Authentication
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type="password"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      sx={{ mb: 2 }}
                    />
                    
                    <Button variant="contained" sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}>
                      Update Password
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Security Settings
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Two-Factor Authentication" 
                        secondary="Add extra security to your account"
                      />
                      <ListItemSecondaryAction>
                        <Button variant="outlined" size="small">
                          Enable
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemText 
                        primary="Login Alerts" 
                        secondary="Get notified of new logins"
                      />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemText 
                        primary="Session Timeout" 
                        secondary="Auto logout after inactivity"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="body2">30 min</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Paper>

      {/* Reset Confirmation Dialog */}
      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
        <DialogTitle>Reset Settings</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to reset all settings to their default values? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleResetSettings} color="error" variant="contained">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
