"use client";

import { ReactNode } from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { AppProvider } from '@toolpad/core/AppProvider';
import { createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import OFFICER_NAVIGATION from '../../utils/officerNavigation';
import UserMenu from '../main/UserMenu';

// Officer-specific theme
const officerTheme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green theme to match AgriLink
    },
    secondary: {
      main: '#8BC34A', // Light green accent
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          color: '#333333',
          width: 280,
          border: 'none',
          borderRight: '1px solid #e0e0e0',
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: '#4CAF50',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '1.1rem',
          lineHeight: '48px',
          paddingLeft: '24px',
          paddingRight: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: 0,
          '&::before': {
            content: '"🌱"',
            fontSize: '1.2rem',
          }
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          margin: '4px 12px',
          borderRadius: '8px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingTop: '12px',
          paddingBottom: '12px',
          minHeight: '48px',
          '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: '#4CAF50',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#45a049',
            },
            '& .MuiListItemIcon-root': {
              color: '#ffffff',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#666666',
          minWidth: '40px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#333333',
          fontWeight: 500,
          fontSize: '0.95rem',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '8px 16px',
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

interface OfficerLayoutProps {
  children: ReactNode;
}

export default function OfficerLayout({ children }: OfficerLayoutProps) {
  return (
    <AppProvider
      navigation={OFFICER_NAVIGATION}
      theme={officerTheme}
      branding={{
        logo: (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#ffffff',
            padding: '8px 0'
          }}>
            <span style={{ 
              fontSize: '1.5rem',
              background: 'linear-gradient(135deg, #66BB6A, #4CAF50)',
              borderRadius: '8px',
              padding: '4px 8px',
              lineHeight: 1
            }}>🌱</span>
            <div>
              <div style={{ 
                fontWeight: 'bold', 
                fontSize: '1.1rem',
                lineHeight: 1.2
              }}>
                AgriLink
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                opacity: 0.9,
                fontWeight: 500
              }}>
                Officer Portal
              </div>
            </div>
          </div>
        ),
        title: 'AgriLink Officer Portal',
      }}
    >
      <DashboardLayout
        slots={{
          toolbarActions: () => (
            <Box style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              color: '#1976d2'
            }}>
              <UserMenu />
            </Box>
          ),
        }}
      >
        <PageContainer>
          {children}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
