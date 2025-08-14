"use client";

import { ReactNode } from 'react';
import OfficerLayout from '../components/officer/OfficerLayout';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <OfficerLayout>
      {children}
    </OfficerLayout>
  );
}
