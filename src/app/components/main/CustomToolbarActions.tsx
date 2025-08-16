import { ThemeSwitcher } from '@toolpad/core';
import Box from '@mui/material/Box';
import UserMenu from './UserMenu';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CustomToolbarActions() {
  const pathname = usePathname();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {pathname === '/dashboard' && (
        <Button
          component={Link}
          href="/officer"
          variant="outlined"
          color="primary"
        >
          Officer Portal
        </Button>
      )}
      {pathname === '/officer' && (
        <Button
          component={Link}
          href="/dashboard"
          variant="outlined"
          color="secondary"
        >
          Farmer
        </Button>
      )}
      <ThemeSwitcher />
      <UserMenu />
    </Box>
  );
}
