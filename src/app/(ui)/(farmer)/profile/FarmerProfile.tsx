'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  Stack,
  IconButton,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  CircularProgress,
  Badge
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Verified,
  Phone,
  Email,
  CalendarToday,
  Agriculture,
  AccountBalance,
  Logout
} from '@mui/icons-material';
import { useAuth } from '@/lib/authClient';
import { 
  ProfileData, 
  FarmerProfile, 
  ProfileUpdateRequest,
  PROVINCES,
  DISTRICTS,
  CROP_TYPES
} from '@/types/profile';
import MuiToast from '@/app/components/main/MuiToast';

export default function FarmerProfilePage() {
  const { isAuthenticated, fetchWithAuth, logout } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'info' as 'success' | 'error' | 'warning' | 'info'
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    farmLocation: {
      address: '',
      district: '',
      province: ''
    },
    farmSize: 0,
    cropTypes: [] as string[],
    farmingExperience: 0,
    governmentId: '',
    bankDetails: {
      accountNumber: '',
      bankName: '',
      branch: ''
    }
  });

  // Fetch profile data
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth('/api/profile');
      
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        
        // Initialize form data
        const profile = data.profile as FarmerProfile;
        setFormData({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          phone: data.user.phone || '',
          farmLocation: {
            address: profile?.farmLocation?.address || '',
            district: profile?.farmLocation?.district || '',
            province: profile?.farmLocation?.province || ''
          },
          farmSize: profile?.farmSize || 0,
          cropTypes: profile?.cropTypes || [],
          farmingExperience: profile?.farmingExperience || 0,
          governmentId: profile?.governmentId || '',
          bankDetails: {
            accountNumber: profile?.bankDetails?.accountNumber || '',
            bankName: profile?.bankDetails?.bankName || '',
            branch: profile?.bankDetails?.branch || ''
          }
        });
      } else {
        setToast({
          open: true,
          message: 'Failed to load profile data',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      setToast({
        open: true,
        message: 'Error loading profile',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, fetchProfile]);

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const updateData: ProfileUpdateRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        profileData: {
          farmLocation: formData.farmLocation,
          farmSize: formData.farmSize,
          cropTypes: formData.cropTypes,
          farmingExperience: formData.farmingExperience,
          governmentId: formData.governmentId,
          bankDetails: formData.bankDetails
        }
      };

      const response = await fetchWithAuth('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        setToast({
          open: true,
          message: 'Profile updated successfully!',
          severity: 'success'
        });
        setEditing(false);
        await fetchProfile(); // Refresh data
      } else {
        const errorData = await response.json();
        setToast({
          open: true,
          message: errorData.error || 'Failed to update profile',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setToast({
        open: true,
        message: 'Error updating profile',
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (profileData) {
      const profile = profileData.profile as FarmerProfile;
      setFormData({
        firstName: profileData.user.firstName || '',
        lastName: profileData.user.lastName || '',
        phone: profileData.user.phone || '',
        farmLocation: {
          address: profile?.farmLocation?.address || '',
          district: profile?.farmLocation?.district || '',
          province: profile?.farmLocation?.province || ''
        },
        farmSize: profile?.farmSize || 0,
        cropTypes: profile?.cropTypes || [],
        farmingExperience: profile?.farmingExperience || 0,
        governmentId: profile?.governmentId || '',
        bankDetails: {
          accountNumber: profile?.bankDetails?.accountNumber || '',
          bankName: profile?.bankDetails?.bankName || '',
          branch: profile?.bankDetails?.branch || ''
        }
      });
    }
    setEditing(false);
  };

  const getAvailableDistricts = () => {
    return formData.farmLocation.province ? DISTRICTS[formData.farmLocation.province as keyof typeof DISTRICTS] || [] : [];
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (!profileData) {
    return (
      <Box p={3}>
        <Alert severity="error">Failed to load profile data</Alert>
      </Box>
    );
  }

  const profile = profileData.profile as FarmerProfile;

  return (
    <Box p={3}>
      <MuiToast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Farmer Profile
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={logout}
            sx={{ borderRadius: 2 }}
            color="error"
          >
            Logout
          </Button>
          {!editing ? (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => setEditing(true)}
              sx={{ borderRadius: 2 }}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
                sx={{ borderRadius: 2 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={saving ? <CircularProgress size={16} /> : <Save />}
                onClick={handleSave}
                disabled={saving}
                sx={{ borderRadius: 2 }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          )}
        </Stack>
      </Box>

      <Box display="flex" gap={3} flexDirection={{ xs: 'column', md: 'row' }}>
        {/* Profile Card */}
        <Box flex="0 0 350px">
          <Card sx={{ borderRadius: 3, height: 'fit-content' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  profile?.isVerified ? (
                    <Verified sx={{ color: 'success.main', fontSize: 20 }} />
                  ) : null
                }
              >
                <Avatar
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: 'auto', 
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem'
                  }}
                  src={profile?.profileImage}
                >
                  {profileData.user.firstName.charAt(0)}{profileData.user.lastName.charAt(0)}
                </Avatar>
              </Badge>
              
              {editing && (
                <IconButton
                  component="label"
                  sx={{ 
                    position: 'absolute',
                    bottom: 40,
                    right: 40,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  <PhotoCamera />
                  <input type="file" hidden accept="image/*" />
                </IconButton>
              )}

              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {profileData.user.firstName} {profileData.user.lastName}
              </Typography>
              
              <Chip 
                label={profile?.isVerified ? "Verified Farmer" : "Pending Verification"}
                color={profile?.isVerified ? "success" : "warning"}
                sx={{ mb: 2 }}
              />

              <Stack spacing={1} alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                  <Email sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    {profileData.user.email}
                  </Typography>
                </Box>
                
                {profileData.user.phone && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <Phone sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      {profileData.user.phone}
                    </Typography>
                  </Box>
                )}
                
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarToday sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    Joined {new Date(profileData.user.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Main Content */}
        <Box flex={1}>
          <Stack spacing={3}>
            {/* Personal Information */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Personal Information
                </Typography>
                
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Box flex="1" minWidth="200px">
                    <TextField
                      fullWidth
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!editing}
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                  
                  <Box flex="1" minWidth="200px">
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!editing}
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                </Box>
                
                <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
                  <Box flex="1" minWidth="200px">
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!editing}
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                  
                  <Box flex="1" minWidth="200px">
                    <TextField
                      fullWidth
                      label="Government ID"
                      value={formData.governmentId}
                      onChange={(e) => setFormData({ ...formData, governmentId: e.target.value })}
                      disabled={!editing}
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Farm Information */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Agriculture sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Farm Information
                  </Typography>
                </Box>
                
                <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
                  <Box flex="1" minWidth="200px">
                    <FormControl fullWidth disabled={!editing}>
                      <InputLabel>Province</InputLabel>
                      <Select
                        value={formData.farmLocation.province}
                        label="Province"
                        onChange={(e) => setFormData({
                          ...formData,
                          farmLocation: {
                            ...formData.farmLocation,
                            province: e.target.value,
                            district: ''
                          }
                        })}
                        sx={{ borderRadius: 2 }}
                      >
                        {PROVINCES.map((province) => (
                          <MenuItem key={province} value={province}>
                            {province}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Box flex="1" minWidth="200px">
                    <FormControl fullWidth disabled={!editing || !formData.farmLocation.province}>
                      <InputLabel>District</InputLabel>
                      <Select
                        value={formData.farmLocation.district}
                        label="District"
                        onChange={(e) => setFormData({
                          ...formData,
                          farmLocation: {
                            ...formData.farmLocation,
                            district: e.target.value
                          }
                        })}
                        sx={{ borderRadius: 2 }}
                      >
                        {getAvailableDistricts().map((district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Farm Address"
                    value={formData.farmLocation.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      farmLocation: {
                        ...formData.farmLocation,
                        address: e.target.value
                      }
                    })}
                    disabled={!editing}
                    multiline
                    rows={2}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Box>
                
                <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
                  <Box flex="1" minWidth="200px">
                    <TextField
                      fullWidth
                      label="Farm Size (acres)"
                      type="number"
                      value={formData.farmSize}
                      onChange={(e) => setFormData({ ...formData, farmSize: parseFloat(e.target.value) || 0 })}
                      disabled={!editing}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                  
                  <Box flex="1" minWidth="200px">
                    <TextField
                      fullWidth
                      label="Farming Experience (years)"
                      type="number"
                      value={formData.farmingExperience}
                      onChange={(e) => setFormData({ ...formData, farmingExperience: parseFloat(e.target.value) || 0 })}
                      disabled={!editing}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                </Box>
                
                <Box>
                  <Autocomplete
                    multiple
                    options={CROP_TYPES}
                    value={formData.cropTypes}
                    onChange={(_, newValue) => setFormData({ ...formData, cropTypes: newValue })}
                    disabled={!editing}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Crop Types"
                        placeholder="Select crop types"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                          <Chip
                            key={key}
                            variant="outlined"
                            label={option}
                            {...tagProps}
                            sx={{ borderRadius: 2 }}
                          />
                        );
                      })
                    }
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Bank Details */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <AccountBalance sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Bank Details
                  </Typography>
                </Box>
                
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Box flex="1" minWidth="150px">
                    <TextField
                      fullWidth
                      label="Account Number"
                      value={formData.bankDetails.accountNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        bankDetails: {
                          ...formData.bankDetails,
                          accountNumber: e.target.value
                        }
                      })}
                      disabled={!editing}
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                  
                  <Box flex="1" minWidth="150px">
                    <TextField
                      fullWidth
                      label="Bank Name"
                      value={formData.bankDetails.bankName}
                      onChange={(e) => setFormData({
                        ...formData,
                        bankDetails: {
                          ...formData.bankDetails,
                          bankName: e.target.value
                        }
                      })}
                      disabled={!editing}
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                  
                  <Box flex="1" minWidth="150px">
                    <TextField
                      fullWidth
                      label="Branch"
                      value={formData.bankDetails.branch}
                      onChange={(e) => setFormData({
                        ...formData,
                        bankDetails: {
                          ...formData.bankDetails,
                          branch: e.target.value
                        }
                      })}
                      disabled={!editing}
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
