import { type Navigation } from '@toolpad/core/AppProvider';

import DashboardIcon from '@mui/icons-material/Dashboard';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NotificationBadge from '../components/notifications/NotificationBadge';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Citizen Portal',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'services',
    title: 'Government Services',
    icon: <AccountTreeIcon />,
  },
  {
    segment: 'appointments',
    title: 'Book Appointment',
    icon: <BookOnlineIcon />,
  },
  {
    segment: 'documents',
    title: 'Document Upload',
    icon: <UploadFileIcon />,
  },
  {
    segment: 'notifications',
    title: 'Notifications',
    icon: <NotificationBadge />,
  },
  {
    kind: 'divider',
  },
  
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'System',
  },
  {
    segment: 'analytics',
    title: 'Analytics',
    icon: <AnalyticsIcon />,
  },
  {
    segment: 'feedback',
    title: 'Feedback',
    icon: <FeedbackIcon />,
  },
];

export default NAVIGATION;