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



export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications from backend
  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notifications');
        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data = await res.json();
        // Convert timestamp strings to Date objects
        const notificationsWithDate = data.notifications.map((n: Record<string, unknown>) => ({
          id: String(n._id ?? n.id ?? ''),
          type: (n.type as Notification['type']) ?? 'general',
          priority: (n.priority as Notification['priority']) ?? 'low',
          title: String(n.title ?? ''),
          message: String(n.message ?? ''),
          timestamp: new Date((n.timestamp as string) || (n.createdAt as string) || Date.now()),
          isRead: Boolean(n.isRead),
          isStarred: Boolean(n.isStarred),
          actionRequired: Boolean(n.actionRequired),
          actionText: n.actionText ? String(n.actionText) : undefined,
          actionLink: n.actionLink ? String(n.actionLink) : undefined,
        }));
        setNotifications(notificationsWithDate);
        setUnreadCount(data.unreadCount || 0);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchNotifications();
  }, []);

  // Add notification (local only)
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      isRead: false,
      isStarred: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  }, []);

  // Mark as read
  const markAsRead = useCallback(async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationIds: [id], markAsRead: true })
      });
    } catch {}
  }, []);

  // Mark as unread
  const markAsUnread = useCallback(async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: false } : n));
    setUnreadCount(prev => prev + 1);
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationIds: [id], markAsRead: false })
      });
    } catch {}
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    const unreadIds = notifications.filter(n => !n.isRead).map(n => n.id);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
    if (unreadIds.length === 0) return;
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationIds: unreadIds, markAsRead: true })
      });
    } catch {}
  }, [notifications]);

  // Delete notification (local only, unless you add DELETE API)
  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Toggle star (local only)
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
