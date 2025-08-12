import { type Navigation } from '@toolpad/core/AppProvider';

import DashboardIcon from '@mui/icons-material/Dashboard';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'main',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
];

export default NAVIGATION;