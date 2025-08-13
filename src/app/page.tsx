
'use client';

import React from 'react';
import { Box, Button, Container, Typography, Card, CardContent, Paper, AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function Home() {
  return (
    <Box component="main">
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#F9F9F6', borderBottom: '2px solid #4CAF50' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AgricultureIcon sx={{ color: '#4CAF50', mr: 1, fontSize: 28 }} />
              <Typography variant="h6" sx={{ color: '#333333', fontWeight: 700 }}>
                AgriLink
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/">Home</Button>
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/services">Service</Button>
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/features">Feature</Button>
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/products">Product</Button>
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/testimonial">Testimonial</Button>
              <Button sx={{ color: '#333333', textTransform: 'none' }} component={Link} href="/faq">FAQ</Button>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button sx={{ color: '#333333', textTransform: 'none' }}>US ↓</Button>
                <Button 
                  sx={{ 
                    color: '#1976D2', 
                    textTransform: 'none',
                    border: '1px solid #1976D2',
                    px: 2,
                    '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
                  }} 
                  component={Link} 
                  href="/officer"
                >
                  🏛️ Officer Portal
                </Button>
                <Button sx={{ color: '#4CAF50', textTransform: 'none' }} component={Link} href="/login">Login</Button>
                <Button 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: '#4CAF50', 
                    color: 'white',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#388E3C' }
                  }}
                  component={Link} 
                  href="/signup"
                >
                  Sign up
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Hero Section */}
      <Box 
        sx={{ 
          backgroundColor: '#F9F9F6',
          py: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <Box sx={{ flex: '1 1 400px', minWidth: 400 }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' } }}>
                Connecting Farmers,
              </Typography>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' }, color: '#333333' }}>
                Government & Logistics
              </Typography>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' }, color: '#4CAF50' }}>
                One Harvest At A Time
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mt: 3, mb: 4, color: '#7E7E7E' }}>
                Real-time harvest tracking, fair pricing, and smarter logistics to prevent crop
                waste and empower every farmer.
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  component={Link}
                  href="/dashboard"
                  sx={{ 
                    backgroundColor: '#4CAF50',
                    color: '#F9F9F6',
                    '&:hover': { backgroundColor: '#388E3C' },
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}
                >
                  Register
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
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
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
              href="/dashboard"
              sx={{ 
                backgroundColor: '#6D4C41',
                color: '#F9F9F6',
                '&:hover': { backgroundColor: '#5D4037' },
                px: 6,
                py: 2,
                fontSize: '1.1rem'
              }}
            >
              Start Using Services
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
