'use client';

import React from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNotifications } from '../../contexts/NotificationContext';

interface NotificationBadgeProps {
  onClick?: () => void;
}

export default function NotificationBadge({ onClick }: NotificationBadgeProps) {
  const { unreadCount } = useNotifications();

  return (
    <Tooltip title={`${unreadCount} unread notifications`}>
      <IconButton
        onClick={onClick}
        sx={{
          color: '#4CAF50',
          '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.1)'
          }
        }}
      >
        <Badge 
          badgeContent={unreadCount} 
          color="error"
          max={99}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: unreadCount > 0 ? '#E53E3E' : 'transparent',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              minWidth: unreadCount > 9 ? '20px' : '16px',
              height: unreadCount > 9 ? '20px' : '16px',
              animation: unreadCount > 0 ? 'pulse 2s infinite' : 'none',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  opacity: 1,
                },
                '50%': {
                  transform: 'scale(1.1)',
                  opacity: 0.8,
                },
                '100%': {
                  transform: 'scale(1)',
                  opacity: 1,
                },
              },
            }
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}
