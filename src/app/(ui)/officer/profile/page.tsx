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
  Work,
  AccountBalance,
  Logout
} from '@mui/icons-material';
import { useAuth } from '@/lib/authClient';
import { 
  ProfileData, 
  OfficerProfile, 
  ProfileUpdateRequest,
  PROVINCES,
  DISTRICTS,
  DEPARTMENTS,
  QUALIFICATIONS,
  SPECIALIZATIONS
} from '@/types/profile';
import MuiToast from '@/app/components/main/MuiToast';

export default function OfficerProfilePage() {
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
    employeeId: '',
    department: '',
    designation: '',
    assignedDistricts: [] as string[],
    assignedProvinces: [] as string[],
    workLocation: {
      office: '',
      address: '',
      district: '',
      province: ''
    },
    specializations: [] as string[],
    qualifications: [] as string[],
    experience: 0,
    contactInfo: {
      officePhone: '',
      mobilePhone: '',
      email: ''
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
        const profile = data.profile as OfficerProfile;
        setFormData({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          phone: data.user.phone || '',
          employeeId: profile?.employeeId || '',
          department: profile?.department || '',
          designation: profile?.designation || '',
          assignedDistricts: profile?.assignedDistricts || [],
          assignedProvinces: profile?.assignedProvinces || [],
          workLocation: {
            office: profile?.workLocation?.office || '',
            address: profile?.workLocation?.address || '',
            district: profile?.workLocation?.district || '',
            province: profile?.workLocation?.province || ''
          },
          specializations: profile?.specializations || [],
          qualifications: profile?.qualifications || [],
          experience: profile?.experience || 0,
          contactInfo: {
            officePhone: profile?.contactInfo?.officePhone || '',
            mobilePhone: profile?.contactInfo?.mobilePhone || '',
            email: profile?.contactInfo?.email || data.user.email
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
          employeeId: formData.employeeId,
          department: formData.department,
          designation: formData.designation,
          assignedDistricts: formData.assignedDistricts,
          assignedProvinces: formData.assignedProvinces,
          workLocation: formData.workLocation,
          specializations: formData.specializations,
          qualifications: formData.qualifications,
          experience: formData.experience,
          contactInfo: formData.contactInfo
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
      const profile = profileData.profile as OfficerProfile;
      setFormData({
        firstName: profileData.user.firstName || '',
        lastName: profileData.user.lastName || '',
        phone: profileData.user.phone || '',
        employeeId: profile?.employeeId || '',
        department: profile?.department || '',
        designation: profile?.designation || '',
        assignedDistricts: profile?.assignedDistricts || [],
        assignedProvinces: profile?.assignedProvinces || [],
        workLocation: {
          office: profile?.workLocation?.office || '',
          address: profile?.workLocation?.address || '',
          district: profile?.workLocation?.district || '',
          province: profile?.workLocation?.province || ''
        },
        specializations: profile?.specializations || [],
        qualifications: profile?.qualifications || [],
        experience: profile?.experience || 0,
        contactInfo: {
          officePhone: profile?.contactInfo?.officePhone || '',
          mobilePhone: profile?.contactInfo?.mobilePhone || '',
          email: profile?.contactInfo?.email || profileData.user.email
        }
      });
    }
    setEditing(false);
  };

  const getAvailableDistricts = () => {
    return formData.workLocation.province ? DISTRICTS[formData.workLocation.province as keyof typeof DISTRICTS] || [] : [];
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

  const profile = profileData.profile as OfficerProfile;

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
          Officer Profile
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
                  profile?.isActive ? (
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
                label={profile?.isActive ? "Active Officer" : "Inactive Officer"}
                color={profile?.isActive ? "success" : "warning"}
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
                
                <Box display="flex" gap={2} flexWrap="wrap">
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
                      label="Employee ID"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      disabled={!editing}
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Work Information */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Work sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Work Information
                  </Typography>
                </Box>
                
                <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
                  <Box flex="1" minWidth="200px">
                    <FormControl fullWidth disabled={!editing}>
                      <InputLabel>Department</InputLabel>
                      <Select
                        value={formData.department}
                        label="Department"
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        sx={{ borderRadius: 2 }}
                      >
                        {DEPARTMENTS.map((dept) => (
                          <MenuItem key={dept} value={dept}>
                            {dept}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Box flex="1" minWidth="200px">
                    <TextField
                      fullWidth
                      label="Designation"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      disabled={!editing}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                </Box>
                
                <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
                  <Box flex="1" minWidth="200px">
                    <Autocomplete
                      multiple
                      options={PROVINCES}
                      value={formData.assignedProvinces}
                      onChange={(_, newValue) => setFormData({ ...formData, assignedProvinces: newValue })}
                      disabled={!editing}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Assigned Provinces"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      )}
                    />
                  </Box>
                  
                  <Box flex="1" minWidth="200px">
                    <TextField
                      fullWidth
                      label="Experience (years)"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: parseFloat(e.target.value) || 0 })}
                      disabled={!editing}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                </Box>
                
                <Box mb={2}>
                  <Autocomplete
                    multiple
                    options={SPECIALIZATIONS}
                    value={formData.specializations}
                    onChange={(_, newValue) => setFormData({ ...formData, specializations: newValue })}
                    disabled={!editing}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Specializations"
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
                
                <Autocomplete
                  multiple
                  options={QUALIFICATIONS}
                  value={formData.qualifications}
                  onChange={(_, newValue) => setFormData({ ...formData, qualifications: newValue })}
                  disabled={!editing}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Qualifications"
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
              </CardContent>
            </Card>

            {/* Work Location */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <AccountBalance sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Work Location
                  </Typography>
                </Box>
                
                <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
                  <Box flex="1" minWidth="200px">
                    <TextField
                      fullWidth
                      label="Office Name"
                      value={formData.workLocation.office}
                      onChange={(e) => setFormData({
                        ...formData,
                        workLocation: { ...formData.workLocation, office: e.target.value }
                      })}
                      disabled={!editing}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                  
                  <Box flex="1" minWidth="200px">
                    <FormControl fullWidth disabled={!editing}>
                      <InputLabel>Province</InputLabel>
                      <Select
                        value={formData.workLocation.province}
                        label="Province"
                        onChange={(e) => setFormData({
                          ...formData,
                          workLocation: {
                            ...formData.workLocation,
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
                </Box>
                
                <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
                  <Box flex="1" minWidth="200px">
                    <FormControl fullWidth disabled={!editing || !formData.workLocation.province}>
                      <InputLabel>District</InputLabel>
                      <Select
                        value={formData.workLocation.district}
                        label="District"
                        onChange={(e) => setFormData({
                          ...formData,
                          workLocation: { ...formData.workLocation, district: e.target.value }
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
                  
                  <Box flex="1" minWidth="200px">
                    <TextField
                      fullWidth
                      label="Office Phone"
                      value={formData.contactInfo.officePhone}
                      onChange={(e) => setFormData({
                        ...formData,
                        contactInfo: { ...formData.contactInfo, officePhone: e.target.value }
                      })}
                      disabled={!editing}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                </Box>
                
                <TextField
                  fullWidth
                  label="Office Address"
                  value={formData.workLocation.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    workLocation: { ...formData.workLocation, address: e.target.value }
                  })}
                  disabled={!editing}
                  multiline
                  rows={2}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
