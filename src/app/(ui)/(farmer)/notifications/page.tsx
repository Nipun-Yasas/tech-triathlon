'use client';

import React, { useState } from 'react';
import { useNotifications } from '../../../contexts/NotificationContext';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  IconButton,
  Badge,
  Tabs,
  Tab,
  Divider,
  Fade,
  Grow,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Switch,
  FormControlLabel,
  Menu,
  MenuItem,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Agriculture as AgricultureIcon,
  Schedule as ScheduleIcon,
  Description as DocumentIcon,
  Payment as PaymentIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Science as ScienceIcon,
  WbSunny as WeatherIcon,
  Delete as DeleteIcon,
  MarkEmailRead as MarkReadIcon,
  Settings as SettingsIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';

// Mock notification data - moved to context
const getNotificationIcon = (type: string, priority: string) => {
  const iconProps = {
    sx: { 
      fontSize: '1.5rem',
      color: priority === 'high' ? '#E53E3E' : priority === 'medium' ? '#FF9800' : '#4CAF50'
    }
  };

  switch (type) {
    case 'crop': return <AgricultureIcon {...iconProps} />;
    case 'appointment': return <ScheduleIcon {...iconProps} />;
    case 'document': return <DocumentIcon {...iconProps} />;
    case 'payment': return <PaymentIcon {...iconProps} />;
    case 'weather': return <WeatherIcon {...iconProps} />;
    case 'fertilizer': return <ScienceIcon {...iconProps} />;
    case 'general': return <InfoIcon {...iconProps} />;
    default: return <NotificationsIcon {...iconProps} />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return '#E53E3E';
    case 'medium': return '#FF9800';
    case 'low': return '#4CAF50';
    default: return '#666666';
  }
};

const getNotificationBackground = (type: string, isRead: boolean) => {
  const opacity = isRead ? '0.05' : '0.1';
  switch (type) {
    case 'crop': return `rgba(76, 175, 80, ${opacity})`;
    case 'appointment': return `rgba(33, 150, 243, ${opacity})`;
    case 'document': return `rgba(156, 39, 176, ${opacity})`;
    case 'payment': return `rgba(255, 152, 0, ${opacity})`;
    case 'weather': return `rgba(255, 193, 7, ${opacity})`;
    case 'fertilizer': return `rgba(76, 175, 80, ${opacity})`;
    default: return `rgba(158, 158, 158, ${opacity})`;
  }
};

export default function NotificationsPage() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead: contextMarkAsRead, 
    markAsUnread: contextMarkAsUnread,
    markAllAsRead: contextMarkAllAsRead,
    deleteNotification: contextDeleteNotification,
    toggleStar: contextToggleStar
  } = useNotifications();
  
  const [currentTab, setCurrentTab] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    weatherAlerts: true,
    cropUpdates: true,
    appointmentReminders: true
  });

  // Tab filtering
  const getFilteredNotifications = () => {
    switch (currentTab) {
      case 0: return notifications; // All
      case 1: return notifications.filter(n => !n.isRead); // Unread
      case 2: return notifications.filter(n => n.isStarred); // Starred
      case 3: return notifications.filter(n => n.actionRequired); // Action Required
      case 4: return notifications.filter(n => n.priority === 'high'); // Priority
      default: return notifications;
    }
  };

  const markAsRead = (notificationId: string) => {
    contextMarkAsRead(notificationId);
    setSnackbarMessage('Notification marked as read');
    setSnackbarOpen(true);
  };

  const markAsUnread = (notificationId: string) => {
    contextMarkAsUnread(notificationId);
    setSnackbarMessage('Notification marked as unread');
    setSnackbarOpen(true);
  };

  const toggleStar = (notificationId: string) => {
    contextToggleStar(notificationId);
    const notification = notifications.find(n => n.id === notificationId);
    setSnackbarMessage(notification?.isStarred ? 'Removed from starred' : 'Added to starred');
    setSnackbarOpen(true);
  };

  const deleteNotification = (notificationId: string) => {
    contextDeleteNotification(notificationId);
    setSnackbarMessage('Notification deleted');
    setSnackbarOpen(true);
  };

  const markAllAsRead = () => {
    contextMarkAllAsRead();
    setSnackbarMessage('All notifications marked as read');
    setSnackbarOpen(true);
  };
  const filteredNotifications = getFilteredNotifications();

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Fade in={true} timeout={800}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1))',
          p: 3,
          borderRadius: 3,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(76, 175, 80, 0.2)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ 
              backgroundColor: '#4CAF50',
              width: 56,
              height: 56
            }}>
              <NotificationsIcon sx={{ fontSize: '2rem' }} />
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                color: '#333333',
                background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Notifications Center
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up! 🎉'}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Refresh">
              <IconButton
                onClick={() => window.location.reload()}
                sx={{
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.2)' }
                }}
              >
                <RefreshIcon sx={{ color: '#4CAF50' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Mark All as Read">
              <IconButton
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                sx={{
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.2)' }
                }}
              >
                <MarkReadIcon sx={{ color: '#4CAF50' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Filter">
              <IconButton
                onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
                sx={{
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.2)' }
                }}
              >
                <FilterIcon sx={{ color: '#4CAF50' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Settings">
              <IconButton
                onClick={() => setSettingsOpen(true)}
                sx={{
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.2)' }
                }}
              >
                <SettingsIcon sx={{ color: '#4CAF50' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Fade>

      {/* Tabs */}
      <Paper sx={{ 
        mb: 3, 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        border: '1px solid rgba(76, 175, 80, 0.1)'
      }}>
        <Tabs
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 60
            },
            '& .Mui-selected': {
              color: '#4CAF50 !important'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#4CAF50',
              height: 3
            }
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                All
                <Chip 
                  label={notifications.length} 
                  size="small" 
                  sx={{ 
                    backgroundColor: '#4CAF50', 
                    color: 'white',
                    minWidth: 24,
                    height: 20
                  }} 
                />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Unread
                {unreadCount > 0 && (
                  <Chip 
                    label={unreadCount} 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#E53E3E', 
                      color: 'white',
                      minWidth: 24,
                      height: 20
                    }} 
                  />
                )}
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Starred
                <StarIcon sx={{ fontSize: '1rem', color: '#FFC107' }} />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Action Required
                <WarningIcon sx={{ fontSize: '1rem', color: '#FF9800' }} />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Priority
                <Badge color="error" variant="dot" />
              </Box>
            } 
          />
        </Tabs>
      </Paper>

      {/* Notifications List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredNotifications.length === 0 ? (
          <Paper sx={{ 
            p: 6, 
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3
          }}>
            <NotificationsIcon sx={{ fontSize: '4rem', color: '#cccccc', mb: 2 }} />
            <Typography variant="h6" sx={{ color: '#666666', mb: 1 }}>
              No notifications found
            </Typography>
            <Typography variant="body2" sx={{ color: '#999999' }}>
              You&apos;re all caught up! Check back later for updates.
            </Typography>
          </Paper>
        ) : (
          filteredNotifications.map((notification, index) => (
            <Grow key={notification.id} in={true} timeout={300 + index * 100}>
              <Card sx={{
                background: getNotificationBackground(notification.type, notification.isRead),
                backdropFilter: 'blur(10px)',
                border: notification.isRead 
                  ? '1px solid rgba(76, 175, 80, 0.1)' 
                  : `2px solid ${getPriorityColor(notification.priority)}40`,
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px ${getPriorityColor(notification.priority)}20`,
                },
                '&::before': notification.priority === 'high' && !notification.isRead ? {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  background: getPriorityColor(notification.priority),
                } : {}
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    {/* Notification Icon */}
                    <Avatar sx={{
                      backgroundColor: `${getPriorityColor(notification.priority)}20`,
                      width: 50,
                      height: 50
                    }}>
                      {getNotificationIcon(notification.type, notification.priority)}
                    </Avatar>

                    {/* Notification Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" sx={{
                          fontWeight: notification.isRead ? 500 : 700,
                          color: '#333333',
                          fontSize: '1.1rem'
                        }}>
                          {notification.title}
                        </Typography>

                        {/* Actions */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {/* Priority Badge */}
                          {notification.priority === 'high' && (
                            <Chip
                              label="High"
                              size="small"
                              sx={{
                                backgroundColor: '#E53E3E',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.7rem'
                              }}
                            />
                          )}

                          {/* Star Button */}
                          <IconButton 
                            size="small"
                            onClick={() => toggleStar(notification.id)}
                            sx={{ color: notification.isStarred ? '#FFC107' : '#cccccc' }}
                          >
                            {notification.isStarred ? <StarIcon /> : <StarBorderIcon />}
                          </IconButton>

                          {/* More Actions */}
                          <IconButton 
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle more actions menu
                            }}
                            sx={{ color: '#666666' }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Message */}
                      <Typography variant="body2" sx={{
                        color: '#666666',
                        lineHeight: 1.5,
                        mb: 2
                      }}>
                        {notification.message}
                      </Typography>

                      {/* Footer */}
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                        {/* Timestamp */}
                        <Typography variant="caption" sx={{ color: '#999999' }}>
                          {notification.timestamp.toLocaleDateString()} at {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          {notification.actionRequired && notification.actionText && (
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                background: `linear-gradient(135deg, ${getPriorityColor(notification.priority)}, #4CAF50)`,
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                  background: `linear-gradient(135deg, #2E7D32, ${getPriorityColor(notification.priority)})`
                                }
                              }}
                            >
                              {notification.actionText}
                            </Button>
                          )}

                          {!notification.isRead ? (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => markAsRead(notification.id)}
                              sx={{
                                borderColor: '#4CAF50',
                                color: '#4CAF50',
                                textTransform: 'none',
                                '&:hover': {
                                  backgroundColor: 'rgba(76, 175, 80, 0.1)'
                                }
                              }}
                            >
                              Mark as Read
                            </Button>
                          ) : (
                            <Button
                              variant="text"
                              size="small"
                              onClick={() => markAsUnread(notification.id)}
                              sx={{
                                color: '#666666',
                                textTransform: 'none'
                              }}
                            >
                              Mark as Unread
                            </Button>
                          )}

                          <IconButton
                            size="small"
                            onClick={() => deleteNotification(notification.id)}
                            sx={{ color: '#E53E3E' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          ))
        )}
      </Box>

      {/* Settings Dialog */}
      <Dialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 3
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1))',
          color: '#2E7D32'
        }}>
          Notification Settings
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    emailNotifications: e.target.checked
                  }))}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#4CAF50',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#4CAF50',
                    },
                  }}
                />
              }
              label="Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.smsNotifications}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    smsNotifications: e.target.checked
                  }))}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#4CAF50',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#4CAF50',
                    },
                  }}
                />
              }
              label="SMS Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    pushNotifications: e.target.checked
                  }))}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#4CAF50',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#4CAF50',
                    },
                  }}
                />
              }
              label="Push Notifications"
            />
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" sx={{ color: '#666666', mb: 1 }}>
              Notification Categories:
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.weatherAlerts}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    weatherAlerts: e.target.checked
                  }))}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#4CAF50',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#4CAF50',
                    },
                  }}
                />
              }
              label="Weather Alerts"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.cropUpdates}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    cropUpdates: e.target.checked
                  }))}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#4CAF50',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#4CAF50',
                    },
                  }}
                />
              }
              label="Crop Updates"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.appointmentReminders}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    appointmentReminders: e.target.checked
                  }))}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#4CAF50',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#4CAF50',
                    },
                  }}
                />
              }
              label="Appointment Reminders"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setSettingsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setSettingsOpen(false);
              setSnackbarMessage('Settings saved successfully');
              setSnackbarOpen(true);
            }}
            sx={{
              background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
              '&:hover': {
                background: 'linear-gradient(135deg, #45a049, #7CB342)'
              }
            }}
          >
            Save Settings
          </Button>
        </DialogActions>
      </Dialog>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={() => setFilterMenuAnchor(null)}
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2
          }
        }}
      >
        <MenuItem onClick={() => { setCurrentTab(0); setFilterMenuAnchor(null); }}>
          All Notifications
        </MenuItem>
        <MenuItem onClick={() => { setCurrentTab(1); setFilterMenuAnchor(null); }}>
          Unread Only
        </MenuItem>
        <MenuItem onClick={() => { setCurrentTab(4); setFilterMenuAnchor(null); }}>
          High Priority
        </MenuItem>
        <MenuItem onClick={() => { setCurrentTab(3); setFilterMenuAnchor(null); }}>
          Action Required
        </MenuItem>
      </Menu>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            background: 'rgba(76, 175, 80, 0.9)',
            backdropFilter: 'blur(10px)',
            color: 'white'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
