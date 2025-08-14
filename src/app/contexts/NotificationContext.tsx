'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Notification {
  id: string;
  type: 'crop' | 'appointment' | 'document' | 'payment' | 'weather' | 'fertilizer' | 'general';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  actionRequired?: boolean;
  actionText?: string;
  actionLink?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  toggleStar: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock initial notifications
const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'crop',
    priority: 'high',
    title: 'Crop Pickup Scheduled',
    message: 'Your wheat crop pickup has been scheduled for August 16, 2025 at 10:00 AM. Driver: Kamal Perera (077-123-4567)',
    timestamp: new Date('2025-08-14T08:30:00'),
    isRead: false,
    isStarred: true,
    actionRequired: true,
    actionText: 'View Details',
    actionLink: '/dashboard'
  },
  {
    id: '2',
    type: 'fertilizer',
    priority: 'medium',
    title: 'Subsidized Fertilizer Available',
    message: 'Subsidized fertilizer is now available at Colombo 05 distribution center. Your allocated quota: 25kg Urea, 15kg TSP.',
    timestamp: new Date('2025-08-14T07:15:00'),
    isRead: false,
    isStarred: false,
    actionRequired: true,
    actionText: 'Reserve Now',
    actionLink: '/services'
  },
  {
    id: '3',
    type: 'appointment',
    priority: 'high',
    title: 'Appointment Reminder',
    message: 'Reminder: Your fertilizer consultation appointment is tomorrow (Aug 15) at 2:00 PM with Dr. Nimal Silva.',
    timestamp: new Date('2025-08-14T06:00:00'),
    isRead: false,
    isStarred: false,
    actionRequired: true,
    actionText: 'Reschedule',
    actionLink: '/appointments'
  },
  {
    id: '4',
    type: 'weather',
    priority: 'high',
    title: 'Weather Alert',
    message: 'Heavy rain expected in your area from Aug 15-17. Protect your crops and postpone harvesting activities.',
    timestamp: new Date('2025-08-13T12:00:00'),
    isRead: false,
    isStarred: false,
    actionRequired: false
  },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  }, []);

  const markAsUnread = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: false } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const toggleStar = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isStarred: !n.isStarred } : n)
    );
  }, []);

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteNotification,
    toggleStar,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

export type { Notification };
