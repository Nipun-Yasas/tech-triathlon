'use client';

import { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Alert, 
  Box, 
  SxProps, 
  Theme,
  CircularProgress,
  Fade,
  Slide,
  IconButton,
  Typography,
  Zoom
} from '@mui/material';
import { keyframes } from '@mui/system';
import { 
  Security as SecurityIcon, 
  Login as LoginIcon, 
  Close as CloseIcon,
  AdminPanelSettings as AdminIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '@/lib/authClient';

// Add keyframe animations
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideInAnimation = keyframes`
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

interface OfficerPortalButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
}

export default function OfficerPortalButton({ 
  variant = 'outlined', 
  size = 'medium', 
  sx = {}, 
  children = '🏛️ Officer Portal' 
}: OfficerPortalButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate some processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user is authenticated and is an officer
    if (!isAuthenticated) {
      setIsLoading(false);
      setShowDialog(true);
      return;
    }
    
    if (user?.userType !== 'officer') {
      setIsLoading(false);
      setShowDialog(true);
      return;
    }
    
    // If authenticated as officer, redirect to officer portal
    setIsRedirecting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    window.location.href = '/officer';
  };

  const getDialogContent = () => {
    if (!isAuthenticated) {
      return {
        title: '🔐 Officer Authentication Required',
        message: 'Please sign in with your officer credentials to access the Officer Portal.',
        severity: 'info' as const,
        actionText: 'Sign In',
        actionHref: '/auth/signin'
      };
    }
    
    if (user?.userType !== 'officer') {
      return {
        title: '⚠️ Access Restricted',
        message: 'The Officer Portal is only accessible to authenticated officers. You are currently signed in as a citizen/farmer.',
        severity: 'warning' as const,
        actionText: 'Sign In as Officer',
        actionHref: '/auth/signin'
      };
    }
    
    return null;
  };

  const dialogContent = getDialogContent();

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        disabled={isLoading || isRedirecting}
        sx={{
          color: '#1976D2',
          textTransform: 'none',
          border: variant === 'outlined' ? '1px solid #1976D2' : 'none',
          fontWeight: 500,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: isRedirecting 
            ? 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 50%, #e3f2fd 100%)'
            : 'transparent',
          backgroundSize: isRedirecting ? '200px 100%' : '100% 100%',
          animation: isRedirecting ? `${shimmerAnimation} 1.5s infinite` : 'none',
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            borderColor: variant === 'outlined' ? '#1976D2' : undefined,
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            animation: `${pulseAnimation} 2s infinite`
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:disabled': {
            opacity: 0.7,
            cursor: 'not-allowed'
          },
          ...sx
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          position: 'relative'
        }}>
          {isLoading && (
            <CircularProgress 
              size={16} 
              sx={{ 
                color: '#1976D2',
                animation: `${pulseAnimation} 2s infinite`
              }} 
            />
          )}
          {isRedirecting && (
            <Zoom in={isRedirecting}>
              <CheckIcon sx={{ color: '#4caf50', fontSize: '1.2rem' }} />
            </Zoom>
          )}
          {!isLoading && !isRedirecting && (
            <AdminIcon sx={{ fontSize: '1.2rem' }} />
          )}
          <span>
            {isRedirecting 
              ? 'Redirecting...' 
              : isLoading 
                ? 'Checking...' 
                : children
            }
          </span>
        </Box>
      </Button>

      <Dialog 
        open={showDialog} 
        onClose={() => setShowDialog(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,249,246,0.9) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            animation: `${slideInAnimation} 0.3s ease-out`
          }
        }}
        BackdropProps={{
          sx: {
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(5px)'
          }
        }}
      >
        {dialogContent && (
          <Fade in={showDialog} timeout={500}>
            <Box>
              <DialogTitle sx={{ 
                textAlign: 'center', 
                fontWeight: 600,
                fontSize: '1.25rem',
                pb: 1,
                position: 'relative'
              }}>
                <IconButton
                  onClick={() => setShowDialog(false)}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: '#666',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      transform: 'rotate(90deg)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <SecurityIcon sx={{ color: '#1976D2', fontSize: '1.5rem' }} />
                  <Typography variant="h6" component="span">
                    {dialogContent.title}
                  </Typography>
                </Box>
              </DialogTitle>
              <DialogContent sx={{ textAlign: 'center', pt: 2 }}>
                <Box sx={{ mb: 3 }}>
                  <Zoom in={showDialog} timeout={700}>
                    <Alert 
                      severity={dialogContent.severity} 
                      sx={{ 
                        borderRadius: 2,
                        fontSize: '1rem',
                        background: dialogContent.severity === 'info' 
                          ? 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
                          : 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                        border: `1px solid ${dialogContent.severity === 'info' ? '#2196f3' : '#ff9800'}`,
                        '& .MuiAlert-message': {
                          width: '100%',
                          textAlign: 'center'
                        },
                        '& .MuiAlert-icon': {
                          fontSize: '1.5rem'
                        }
                      }}
                    >
                      <Typography variant="body1">
                        {dialogContent.message}
                      </Typography>
                    </Alert>
                  </Zoom>
                </Box>
                
                {!isAuthenticated && (
                  <Fade in={showDialog} timeout={1000}>
                    <Box sx={{ 
                      p: 3, 
                      bgcolor: 'rgba(25, 118, 210, 0.05)', 
                      borderRadius: 2,
                      border: '1px solid rgba(25, 118, 210, 0.2)',
                      background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)'
                    }}>
                      <Box sx={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 600, 
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                      }}>
                        <AdminIcon sx={{ color: '#1976D2' }} />
                        Officer Portal Features:
                      </Box>
                      <Box sx={{ 
                        fontSize: '0.95rem', 
                        color: '#555', 
                        textAlign: 'left',
                        lineHeight: 1.6,
                        '& > div': {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1
                        }
                      }}>
                        <Box>
                          <CheckIcon sx={{ color: '#4caf50', fontSize: '1rem' }} />
                          Manage farmer registrations and crop submissions
                        </Box>
                        <Box>
                          <CheckIcon sx={{ color: '#4caf50', fontSize: '1rem' }} />
                          Schedule crop pickups and logistics
                        </Box>
                        <Box>
                          <CheckIcon sx={{ color: '#4caf50', fontSize: '1rem' }} />
                          Review and approve fertilizer distributions
                        </Box>
                        <Box>
                          <CheckIcon sx={{ color: '#4caf50', fontSize: '1rem' }} />
                          Generate reports and analytics
                        </Box>
                        <Box>
                          <CheckIcon sx={{ color: '#4caf50', fontSize: '1rem' }} />
                          Oversee regional agricultural activities
                        </Box>
                      </Box>
                    </Box>
                  </Fade>
                )}
              </DialogContent>
              <DialogActions sx={{ 
                justifyContent: 'center', 
                gap: 2, 
                pb: 3, 
                px: 3 
              }}>
                <Button
                  onClick={() => setShowDialog(false)}
                  variant="outlined"
                  sx={{ 
                    borderColor: '#ccc',
                    color: '#666',
                    minWidth: 100,
                    borderRadius: 2,
                    '&:hover': {
                      borderColor: '#999',
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Cancel
                </Button>
                <Button
                  component={Link}
                  href={dialogContent.actionHref}
                  variant="contained"
                  startIcon={<LoginIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
                    color: 'white',
                    fontWeight: 600,
                    minWidth: 140,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onClick={() => setShowDialog(false)}
                >
                  {dialogContent.actionText}
                </Button>
              </DialogActions>
            </Box>
          </Fade>
        )}
      </Dialog>
    </>
  );
}
