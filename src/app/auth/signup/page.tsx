'use client';

import { useState } from 'react';
import MuiToast from "@/app/components/main/MuiToast";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Link,
  Avatar,
  Stack,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  GitHub,
  ArrowBack,
  Agriculture,
  PersonAdd,
  SupervisorAccount
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    phone: '',
    agreeToTerms: false,
    // Farm-specific fields (shown only when userType is 'farmer')
    farmLocation: {
      province: '',
      district: '',
      address: ''
    },
    farmSize: '',
    farmingExperience: '',
    governmentId: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' as "info" | "success" | "error" | "warning" });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'agreeToTerms' ? event.target.checked : event.target.value;
    
    // Handle nested farm location fields
    if (field.startsWith('farmLocation.')) {
      const locationField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        farmLocation: {
          ...prev.farmLocation,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    if (toast.open) setToast({ ...toast, open: false });
  };

  const handleSelectChange = (field: string) => (event: { target: { value: unknown } }) => {
    const value = event.target.value;
    
    // Handle nested farm location fields
    if (field.startsWith('farmLocation.')) {
      const locationField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        farmLocation: {
          ...prev.farmLocation,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    if (toast.open) setToast({ ...toast, open: false });
  };

  const validateForm = () => {
    // Required fields validation
    if (!formData.firstName?.trim()) return 'First name is required';
    if (!formData.lastName?.trim()) return 'Last name is required';
    if (!formData.email?.trim()) return 'Email is required';
    if (!formData.password) return 'Password is required';
    if (!formData.confirmPassword) return 'Password confirmation is required';
    if (!formData.userType) return 'Please select account type';

    // Farm-specific validation for farmers
    if (formData.userType === 'farmer') {
      if (!formData.farmLocation.province) return 'Province is required for farmers';
      if (!formData.farmLocation.district?.trim()) return 'District is required for farmers';
      if (!formData.farmLocation.address?.trim()) return 'Farm address is required for farmers';
      if (!formData.farmSize || parseFloat(formData.farmSize) <= 0) return 'Valid farm size is required for farmers';
      if (!formData.farmingExperience || parseFloat(formData.farmingExperience) < 0) return 'Farming experience is required for farmers';
      if (!formData.governmentId?.trim()) return 'Government ID is required for farmers';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address';
    }

    // Password validation
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }

    // Strong password validation
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasNumbers = /\d/.test(formData.password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Phone validation (if provided)
    if (formData.phone && formData.phone.length > 0) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
        return 'Please enter a valid phone number';
      }
    }

    // Terms agreement
    if (!formData.agreeToTerms) {
      return 'Please agree to the Terms of Service and Privacy Policy';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast({ ...toast, open: false });

    const validationError = validateForm();
    if (validationError) {
      setToast({ open: true, message: validationError, severity: 'error' });
      setLoading(false);
      return;
    }

    try {
      const requestBody: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
        userType: string;
        phone?: string;
        farmData?: {
          farmLocation: {
            province: string;
            district: string;
            address: string;
          };
          farmSize: number;
          farmingExperience: number;
          governmentId: string;
        };
      } = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userType: formData.userType,
        phone: formData.phone?.trim() || undefined
      };

      // Add farm data for farmers
      if (formData.userType === 'farmer') {
        requestBody.farmData = {
          farmLocation: {
            province: formData.farmLocation.province,
            district: formData.farmLocation.district.trim(),
            address: formData.farmLocation.address.trim()
          },
          farmSize: parseFloat(formData.farmSize),
          farmingExperience: parseFloat(formData.farmingExperience),
          governmentId: formData.governmentId.trim()
        };
      }

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify(requestBody),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        // Handle specific error cases
        switch (res.status) {
          case 409:
            setToast({ open: true, message: 'An account with this email already exists. Please sign in instead.', severity: 'error' });
            break;
          case 400:
            setToast({ open: true, message: data.error || 'Invalid registration data', severity: 'error' });
            break;
          default:
            setToast({ open: true, message: data.error || 'Registration failed. Please try again.', severity: 'error' });
        }
      } else {
        setToast({ open: true, message: data.message || 'Registration successful! Redirecting to sign in...', severity: 'success' });
        
        // Store user data temporarily for the signin page
        sessionStorage.setItem('newUser', JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          userType: formData.userType,
          name: `${formData.firstName} ${formData.lastName}`
        }));
        
        setTimeout(() => {
          router.push('/auth/signin?registered=true');
        }, 1500);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setToast({ open: true, message: 'Network error. Please check your connection and try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <>
      <MuiToast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />

        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>

        <Card
          sx={{
            maxWidth: 500,
            width: '100%',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.95)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <IconButton
                onClick={() => router.back()}
                sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  left: 16,
                  color: '#666'
                }}
              >
                <ArrowBack />
              </IconButton>

              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                  boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)'
                }}
              >
                <Agriculture sx={{ fontSize: 40 }} />
              </Avatar>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                Join AgriLink
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create your account to get started
              </Typography>

              {/* User Type Selection Visual */}
              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                <Chip
                  icon={<PersonAdd />}
                  label="Farmer Registration"
                  size="small"
                  variant="outlined"
                  color="primary"
                />
                <Chip
                  icon={<SupervisorAccount />}
                  label="Officer Registration"
                  size="small"
                  variant="outlined"
                  color="secondary"
                />
              </Stack>
            </Box>

            {/* Registration Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
              {/* Name Fields */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                  placeholder="Enter your first name"
                  required
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                  placeholder="Enter your last name"
                  required
                />
              </Stack>

              {/* Email */}
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
                placeholder="Enter your email"
                required
              />

              {/* Phone */}
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
                placeholder="Enter your phone number"
              />

              {/* User Type */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Account Type</InputLabel>
                <Select
                  value={formData.userType}
                  label="Account Type"
                  onChange={handleSelectChange('userType')}
                  sx={{ borderRadius: 2 }}
                  required
                >
                  <MenuItem value="farmer">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PersonAdd fontSize="small" />
                      <Typography>Farmer</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem value="officer">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <SupervisorAccount fontSize="small" />
                      <Typography>Agricultural Officer</Typography>
                    </Stack>
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Farm-specific fields (only show for farmers) */}
              {formData.userType === 'farmer' && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    Farm Information
                  </Typography>
                  
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Province</InputLabel>
                    <Select
                      value={formData.farmLocation.province}
                      label="Province"
                      onChange={handleSelectChange('farmLocation.province')}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="Western">Western Province</MenuItem>
                      <MenuItem value="Central">Central Province</MenuItem>
                      <MenuItem value="Southern">Southern Province</MenuItem>
                      <MenuItem value="Northern">Northern Province</MenuItem>
                      <MenuItem value="Eastern">Eastern Province</MenuItem>
                      <MenuItem value="North Western">North Western Province</MenuItem>
                      <MenuItem value="North Central">North Central Province</MenuItem>
                      <MenuItem value="Uva">Uva Province</MenuItem>
                      <MenuItem value="Sabaragamuwa">Sabaragamuwa Province</MenuItem>
                    </Select>
                  </FormControl>

                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="District"
                      value={formData.farmLocation.district}
                      onChange={handleInputChange('farmLocation.district')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      placeholder="Enter your district"
                    />
                    <TextField
                      fullWidth
                      label="Farm Size (acres)"
                      type="number"
                      value={formData.farmSize}
                      onChange={handleInputChange('farmSize')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      placeholder="e.g., 5"
                    />
                  </Stack>

                  <TextField
                    fullWidth
                    label="Farm Address"
                    value={formData.farmLocation.address}
                    onChange={handleInputChange('farmLocation.address')}
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': { borderRadius: 2 }
                    }}
                    placeholder="Enter your farm address"
                    multiline
                    rows={2}
                  />

                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Farming Experience (years)"
                      type="number"
                      value={formData.farmingExperience}
                      onChange={handleInputChange('farmingExperience')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      placeholder="e.g., 10"
                    />
                    <TextField
                      fullWidth
                      label="Government ID Number"
                      value={formData.governmentId}
                      onChange={handleInputChange('governmentId')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      placeholder="NIC or other ID"
                    />
                  </Stack>
                </Box>
              )}

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
                placeholder="Create a strong password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password */}
              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
                placeholder="Confirm your password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Terms Agreement */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange('agreeToTerms')}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree to the{' '}
                    <Link href="#" sx={{ color: '#4CAF50', textDecoration: 'none' }}>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" sx={{ color: '#4CAF50', textDecoration: 'none' }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                  boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2E7D32, #1B5E20)',
                    boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or sign up with
            </Typography>
          </Divider>

          {/* Social Signup */}
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={() => handleSocialSignup('Google')}
              sx={{
                borderRadius: 2,
                py: 1.2,
                borderColor: '#ddd',
                color: '#666',
                '&:hover': {
                  borderColor: '#4285f4',
                  backgroundColor: 'rgba(66, 133, 244, 0.04)'
                }
              }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHub />}
              onClick={() => handleSocialSignup('GitHub')}
              sx={{
                borderRadius: 2,
                py: 1.2,
                borderColor: '#ddd',
                color: '#666',
                '&:hover': {
                  borderColor: '#333',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              GitHub
            </Button>
          </Stack>

          {/* Sign In Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link
                href="/auth/signin"
                sx={{
                  color: '#4CAF50',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign in here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </>
  );
}
