import { type Navigation } from '@toolpad/core/AppProvider';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import ScienceIcon from '@mui/icons-material/Science';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const OFFICER_NAVIGATION: Navigation = [
  
  {
    segment: 'officer',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'officer/crop-submission',
    title: 'Crop Submission',
    icon: <AgricultureIcon />,
  },
  {
    segment: 'officer/fertilizer-distribution',
    title: 'Fertilizer Distribution',
    icon: <ScienceIcon />,
  },
  {
    segment: 'officer/crop-pickup',
    title: 'Pickup Scheduling',
    icon: <ScheduleIcon />,
  },
  {
    segment: 'officer/reports',
    title: 'Reports & Analytics',
    icon: <AnalyticsIcon />,
  },
  {
    segment: 'officer/farmers',
    title: 'Manage Farmers',
    icon: <PeopleIcon />,
  },
  {
    segment: 'officer/documents',
    title: 'Documents Review',
    icon: <AssignmentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'officer/profile',
    title: 'Profile',
    icon: <AccountCircleIcon />,
  },
  {
    segment: 'officer/settings',
    title: 'Settings',
    icon: <SettingsIcon />,
  },
];

export default OFFICER_NAVIGATION;
