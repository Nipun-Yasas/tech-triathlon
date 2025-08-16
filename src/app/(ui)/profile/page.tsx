'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/authClient';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import FarmerProfilePage from './FarmerProfile';
import OfficerProfilePage from './OfficerProfile';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  // Route to appropriate profile based on user type
  if (user.userType === 'farmer') {
    return <FarmerProfilePage />;
  } else if (user.userType === 'officer') {
    return <OfficerProfilePage />;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
      <CircularProgress />
    </Box>
  );
}
