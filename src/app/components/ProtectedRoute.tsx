'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient, User } from '@/lib/authClient';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'farmer' | 'officer';
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/auth/signin' 
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = authClient.getCurrentUser();
      const isAuth = authClient.isAuthenticated();

      if (!isAuth) {
        router.push(redirectTo);
        return;
      }

      if (requiredRole && currentUser?.userType !== requiredRole) {
        // Redirect to appropriate dashboard based on user type
        const dashboardRoute = currentUser?.userType === 'officer' ? '/officer' : '/dashboard';
        router.push(dashboardRoute);
        return;
      }

      setUser(currentUser);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, requiredRole, redirectTo]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body2" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
