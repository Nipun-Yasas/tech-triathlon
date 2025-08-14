import { ThemeSwitcher } from '@toolpad/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SecurityIcon from '@mui/icons-material/Security';
import Link from 'next/link';
import UserMenu from './UserMenu';

export default function CustomToolbarActions() {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          component={Link}
          href="/officer"
          variant="outlined"
          size="small"
          startIcon={<SecurityIcon />}
          sx={{
            borderColor: '#1976d2',
            color: '#1976d2',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              borderColor: '#1976d2'
            }
          }}
        >
          Officer Portal
        </Button>
        <ThemeSwitcher />
        <UserMenu/>
      </Box>
    );
  }
  