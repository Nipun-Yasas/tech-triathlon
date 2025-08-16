"use client";

import { ReactNode } from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import CustomToolbarActions from '../../components/main/CustomToolbarActions';
import CustomAppTitle from '../../components/main/CustomAppTitle';
import { NotificationProvider } from '../../contexts/NotificationContext';

import { NextAppProvider } from "@toolpad/core/nextjs";
import theme from '../../../theme';
import FARMERNAVIGATION from '../../utils/farmernavigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  
  return (
    <NotificationProvider>
      <NextAppProvider navigation={FARMERNAVIGATION} theme={theme}>
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: CustomToolbarActions,
        }}
      >
        <PageContainer>
          {children}
        </PageContainer>
      </DashboardLayout>
      </NextAppProvider>
    </NotificationProvider>
  );
}
