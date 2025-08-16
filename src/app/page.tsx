
'use client';

import React from 'react';
import { Box, Button, Container, Typography, Card, CardContent, Paper, AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Image from 'next/image';
// Use MUI SvgIcon for custom SVG, or use next/image for static images in /public
function AgricultureIcon(props: Omit<React.ComponentProps<typeof Image>, 'src'>) {
  return (
    <Image
      src="/logo.svg"
      width={props.width ?? 50}
      height={props.height ?? 50}
      {...props}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...props.style }}
    />
  );
}
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function Home() {
  return (
    <Box component="main">
      {/* Responsive Navigation Bar */}
      <AppBar
        position="static"
        elevation={0}
        color='transparent'
        sx={{
          backgroundColor: '#fff',
          borderBottom: '2px solid black',
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: 56, sm: 64 },
              px: { xs: 1, sm: 2 },
            }}
          >
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <AgricultureIcon sx={{ color: '#4CAF50', mr: 1, fontSize: 28 }} />
             
            </Box>
            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 2,
                flexGrow: 1,
                justifyContent: 'center',
              }}
            >
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/">
                Home
              </Button>
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/services">
                Service
              </Button>
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/features">
                Feature
              </Button>
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/products">
                Product
              </Button>
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/testimonial">
                Testimonial
              </Button>
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/faq">
                FAQ
              </Button>
            </Box>
            {/* Actions */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1.5,
                ml: 2,
              }}
            >
              <Button sx={{ color: '#333333', textTransform: 'none' }}>US ↓</Button>
              <Button
                sx={{
                  color: '#1976D2',
                  textTransform: 'none',
                  border: '1px solid #1976D2',
                  px: 2,
                  fontWeight: 500,
                  borderRadius: 2,
                  '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' },
                }}
                component={Link}
                href="/officer"
              >
                🏛️ Officer Portal
              </Button>
              <Button sx={{ color: '#4CAF50', textTransform: 'none' }} component={Link} href="/auth/signin">
                Login
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  '&:hover': { backgroundColor: '#388E3C' },
                }}
                component={Link}
                href="/auth/signup"
              >
                Sign up
              </Button>
            </Box>
            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <MobileNav />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#fff',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <Box sx={{ flex: '1 1 400px', minWidth: 300 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' } }}
              >
                Connecting Farmers,
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' }, color: '#333333' }}
              >
                Government & Logistics
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' }, color: '#4CAF50' }}
              >
                One Harvest At A Time
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: '1.1rem', lineHeight: 1.7, mt: 3, mb: 4, color: '#7E7E7E' }}
              >
                Real-time harvest tracking, fair pricing, and smarter logistics to prevent crop
                waste and empower every farmer.
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/auth/signup"
                  sx={{
                    backgroundColor: '#4CAF50',
                    color: '#F9F9F6',
                    '&:hover': { backgroundColor: '#388E3C' },
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    mr: 2,
                    borderRadius: 2,
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/auth/signin"
                  sx={{
                    borderColor: '#4CAF50',
                    color: '#4CAF50',
                    '&:hover': {
                      borderColor: '#388E3C',
                      backgroundColor: 'rgba(76, 175, 80, 0.04)',
                    },
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
              <Box
                component="img"
                src="/hero img.svg"
                alt="Farmers connecting with government and logistics"
                sx={{
                  width: '100%',
                  maxWidth: '500px',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="" sx={{ py: 8 ,backgroundColor: '#A5D6A7'}} >
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, color: '#333333' }}>
          Check Out Our Features
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 4 
        }}>
          {/* Government Services Card */}
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(76, 175, 80, 0.2)'
            }
          }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
              <CalendarMonthIcon sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
              <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#333333', mb: 2 }}>
                Book Appointments
              </Typography>
              <Typography sx={{ color: '#7E7E7E' }}>
                Schedule appointments with any government department without waiting in lines.
              </Typography>
            </CardContent>
          </Card>
          
          {/* Document Upload Card */}
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(76, 175, 80, 0.2)'
            }
          }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
              <UploadFileIcon sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
              <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#333333', mb: 2 }}>
                Pre-submit Documents
              </Typography>
              <Typography sx={{ color: '#7E7E7E' }}>
                Upload documents ahead of time to speed up your appointment process.
              </Typography>
            </CardContent>
          </Card>
          
          {/* Agricultural Services Card */}
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(76, 175, 80, 0.2)'
            }
          }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
              <AgricultureIcon sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
              <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#333333', mb: 2 }}>
                AgriLink Portal
              </Typography>
              <Typography sx={{ color: '#7E7E7E' }}>
                Connect with agricultural officers, submit crop information, and request fertilizer.
              </Typography>
            </CardContent>
          </Card>
          
          {/* Notifications Card */}
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(76, 175, 80, 0.2)'
            }
          }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
              <NotificationsActiveIcon sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
              <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#333333', mb: 2 }}>
                Get Notified
              </Typography>
              <Typography sx={{ color: '#7E7E7E' }}>
                Receive timely reminders and updates about your appointments.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
      {/* Testimonial Section */}
      <Box sx={{ backgroundColor: '#fff', py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 600, mb: 1, color: '#333333', letterSpacing: 1 }}
          >
            TESTIMONIAL
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 700, mb: 6, color: '#222', lineHeight: 1.3 }}
          >
            Creating A Community Of<br />Life Long Learners.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              justifyContent: 'center',
              mb: 8,
            }}
          >
            {/* Testimonial Card 1 */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: '#E8F5E9',
                borderRadius: 3,
                minWidth: 250,
              }}
            >
              <Box sx={{ fontSize: 32, color: '#B0BEC5', mb: 1 }}>“</Box>
              <Typography sx={{ color: '#333', mb: 2 }}>
                "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cred nulla pariatur excepteur sint."
              </Typography>
              <Typography sx={{ fontWeight: 700, color: '#388E3C' }}>Kathy Sullivan</Typography>
              <Typography variant="body2" sx={{ color: '#7E7E7E' }}>CEO at oxdent.in</Typography>
            </Paper>
            {/* Testimonial Card 2 */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: '#E8F5E9',
                borderRadius: 3,
                minWidth: 250,
              }}
            >
              <Box sx={{ fontSize: 32, color: '#B0BEC5', mb: 1 }}>“</Box>
              <Typography sx={{ color: '#333', mb: 2 }}>
                "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cred nulla pariatur excepteur sint."
              </Typography>
              <Typography sx={{ fontWeight: 700, color: '#388E3C' }}>Elsie Stroud</Typography>
              <Typography variant="body2" sx={{ color: '#7E7E7E' }}>CEO at oxdent.in</Typography>
            </Paper>
            {/* Testimonial Card 3 */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: '#E8F5E9',
                borderRadius: 3,
                minWidth: 250,
              }}
            >
              <Box sx={{ fontSize: 32, color: '#B0BEC5', mb: 1 }}>“</Box>
              <Typography sx={{ color: '#333', mb: 2 }}>
                "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cred nulla pariatur excepteur sint."
              </Typography>
              <Typography sx={{ fontWeight: 700, color: '#388E3C' }}>Kathy Sullivan</Typography>
              <Typography variant="body2" sx={{ color: '#7E7E7E' }}>CEO at oxdent.in</Typography>
            </Paper>
          </Box>
          {/* Stats Section */}
          <Box
            sx={{
              backgroundColor: '#F9F9F6',
              borderRadius: 3,
              p: { xs: 3, md: 5 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'center' },
              gap: 4,
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ flex: 2 }}>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 500 }}>
                Helping Local Farming
              </Typography>
              <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 700, mb: 1 }}>
                Thrive in the Digital Age
              </Typography>
              <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                Built on Hard Work, Grown with Dedication
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 3,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
                gap: 3,
                alignItems: 'center',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 700 }}>
                  2,245
                </Typography>
                <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                  Farmers Connected
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 700 }}>
                  1,098
                </Typography>
                <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                  Pickup Scheduled
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 700 }}>
                  28,867
                </Typography>
                <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                  Price Alerts Sent
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 700 }}>
                  10,342
                </Typography>
                <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                  Notifications
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* Call to Action Section */}
      <Box sx={{ backgroundColor: '#A5D6A7', py: 8 }}>
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', backgroundColor: 'transparent' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#333333', mb: 3 }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: '#333333', mb: 4 }}>
              Join thousands of citizens who are already using our platform to access government services efficiently.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              component={Link}
              href="/auth/signup"
              sx={{ 
                backgroundColor: '#6D4C41',
                color: '#F9F9F6',
                '&:hover': { backgroundColor: '#5D4037' },
                px: 6,
                py: 2,
                fontSize: '1.1rem'
              }}
            >
              Join Now
            </Button>
          </Paper>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: '#333333', color: '#F9F9F6', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 4 
          }}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: '#4CAF50' }}>
                About GovConnect
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                GovConnect Sri Lanka is a unified platform for citizens to access government services efficiently.
                Building bridges between citizens and government services.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: '#4CAF50' }}>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                Email: support@govconnect.lk<br />
                Phone: +94 11 123 4567<br />
                Address: Colombo 01, Sri Lanka
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: '#4CAF50' }}>
                Quick Links
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                Privacy Policy<br />
                Terms of Service<br />
                Help & Support<br />
                AgriLink Services
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 4, color: '#7E7E7E' }}>
            © 2025 GovConnect Sri Lanka. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

// MobileNav component
function MobileNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        aria-label="menu"
        onClick={() => setOpen(true)}
        sx={{
          minWidth: 0,
          p: 1,
          color: '#4CAF50',
        }}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect y="4" width="24" height="2" rx="1" fill="#4CAF50" />
          <rect y="11" width="24" height="2" rx="1" fill="#4CAF50" />
          <rect y="18" width="24" height="2" rx="1" fill="#4CAF50" />
        </svg>
      </Button>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 260,
          height: '100vh',
          bgcolor: '#F9F9F6',
          boxShadow: 6,
          zIndex: 1300,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)',
          display: 'flex',
          flexDirection: 'column',
          p: 3,
        }}
        role="presentation"
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AgricultureIcon sx={{ color: '#4CAF50', mr: 1, fontSize: 28 }} />
          <Typography variant="h6" sx={{ color: '#333333', fontWeight: 700 }}>
            AgriLink
          </Typography>
        </Box>
        <Button component={Link} href="/" sx={{ color: '#333', justifyContent: 'flex-start', mb: 1 }}>
          Home
        </Button>
        <Button component={Link} href="/services" sx={{ color: '#333', justifyContent: 'flex-start', mb: 1 }}>
          Service
        </Button>
        <Button component={Link} href="/features" sx={{ color: '#333', justifyContent: 'flex-start', mb: 1 }}>
          Feature
        </Button>
        <Button component={Link} href="/products" sx={{ color: '#333', justifyContent: 'flex-start', mb: 1 }}>
          Product
        </Button>
        <Button component={Link} href="/testimonial" sx={{ color: '#333', justifyContent: 'flex-start', mb: 1 }}>
          Testimonial
        </Button>
        <Button component={Link} href="/faq" sx={{ color: '#333', justifyContent: 'flex-start', mb: 2 }}>
          FAQ
        </Button>
        <Button sx={{ color: '#333333', textTransform: 'none', mb: 1 }}>US ↓</Button>
        <Button
          sx={{
            color: '#1976D2',
            textTransform: 'none',
            border: '1px solid #1976D2',
            px: 2,
            fontWeight: 500,
            borderRadius: 2,
            mb: 1,
          }}
          component={Link}
          href="/officer"
        >
          🏛️ Officer Portal
        </Button>
        <Button
          sx={{ color: '#4CAF50', textTransform: 'none', mb: 1 }}
          component={Link}
          href="/auth/signin"
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#4CAF50',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            mb: 1,
          }}
          component={Link}
          href="/auth/signup"
        >
          Sign up
        </Button>
      </Box>
      {/* Overlay */}
      {open && (
        <Box
          onClick={() => setOpen(false)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.15)',
            zIndex: 1200,
          }}
        />
      )}
    </>
  );
}
