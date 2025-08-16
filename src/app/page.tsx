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
              <AgricultureIcon width={50} height={28} alt="GovConnect Logo" />
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
                sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' }, color: '#333333' }}
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
                component="p"
                sx={{ fontSize: '1.1rem', lineHeight: 1.7, mt: 3, mb: 4, color: '#7E7E7E' }}
              >
                Real-time harvest tracking, fair pricing, and smarter logistics to prevent crop
                waste and empower every farmer.
              </Typography>

                <Box
                sx={{
                  mt: 4,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  alignItems: { xs: 'stretch', sm: 'center' },
                }}
                >
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
              <Image
                src="/hero img.svg"
                alt="Farmers connecting with government and logistics"
                width={500}
                height={400}
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                priority
              />
            </Box>
          </Box>
        </Container>
      </Box>
      {/* Features Section */}
      <Container
        maxWidth={false}
        sx={{
          py: { xs: 6, md: 10 },
           background: 'linear-gradient(90deg, #fff 0%, #A5D6A7 100%)',
          boxShadow: '0 4px 32px 0 rgba(76,175,80,0.08)',
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            color: '#222',
            fontWeight: 800,
            letterSpacing: 1,
            textShadow: '0 2px 8px rgba(76,175,80,0.08)',
          }}
        >
          Check Out Our Features
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 3, md: 5 },
          }}
        >
          {/* Government Services Card */}
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              borderRadius: 4,
              boxShadow: '0 6px 32px 0 rgba(76,175,80,0.10)',
              transition: 'transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1)',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.03)',
                boxShadow: '0 12px 40px 0 rgba(76,175,80,0.18)',
              },
              p: 1,
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  mx: 'auto',
                  mb: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #A5D6A7 0%, #4CAF50 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px 0 rgba(76,175,80,0.10)',
                }}
              >
                <CalendarMonthIcon sx={{ fontSize: 40, color: '#fff' }} />
              </Box>
              <Typography gutterBottom variant="h6" component="h2" sx={{ color: '#222', fontWeight: 700, mb: 2 }}>
                Book Appointments
              </Typography>
              <Typography sx={{ color: '#7E7E7E', fontSize: 15 }}>
                Schedule appointments with any government department without waiting in lines.
              </Typography>
            </CardContent>
          </Card>

          {/* Document Upload Card */}
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              borderRadius: 4,
              boxShadow: '0 6px 32px 0 rgba(76,175,80,0.10)',
              transition: 'transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1)',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.03)',
                boxShadow: '0 12px 40px 0 rgba(76,175,80,0.18)',
              },
              p: 1,
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  mx: 'auto',
                  mb: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #A5D6A7 0%, #4CAF50 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px 0 rgba(76,175,80,0.10)',
                }}
              >
                <UploadFileIcon sx={{ fontSize: 40, color: '#fff' }} />
              </Box>
              <Typography gutterBottom variant="h6" component="h2" sx={{ color: '#222', fontWeight: 700, mb: 2 }}>
                Pre-submit Documents
              </Typography>
              <Typography sx={{ color: '#7E7E7E', fontSize: 15 }}>
                Upload documents ahead of time to speed up your appointment process.
              </Typography>
            </CardContent>
          </Card>

          {/* Agricultural Services Card */}
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              borderRadius: 4,
              boxShadow: '0 6px 32px 0 rgba(76,175,80,0.10)',
              transition: 'transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1)',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.03)',
                boxShadow: '0 12px 40px 0 rgba(76,175,80,0.18)',
              },
              p: 1,
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  mx: 'auto',
                  mb: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #A5D6A7 0%, #4CAF50 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px 0 rgba(76,175,80,0.10)',
                }}
              >
                <AgricultureIcon width={40} height={40} alt="Agriculture Icon" />
              </Box>
              <Typography gutterBottom variant="h6" component="h2" sx={{ color: '#222', fontWeight: 700, mb: 2 }}>
                AgriLink Portal
              </Typography>
              <Typography sx={{ color: '#7E7E7E', fontSize: 15 }}>
                Connect with agricultural officers, submit crop information, and request fertilizer.
              </Typography>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              borderRadius: 4,
              boxShadow: '0 6px 32px 0 rgba(76,175,80,0.10)',
              transition: 'transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1)',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.03)',
                boxShadow: '0 12px 40px 0 rgba(76,175,80,0.18)',
              },
              p: 1,
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  mx: 'auto',
                  mb: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #A5D6A7 0%, #4CAF50 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px 0 rgba(76,175,80,0.10)',
                }}
              >
                <NotificationsActiveIcon sx={{ fontSize: 40, color: '#fff' }} />
              </Box>
              <Typography gutterBottom variant="h6" component="h2" sx={{ color: '#222', fontWeight: 700, mb: 2 }}>
                Get Notified
              </Typography>
              <Typography sx={{ color: '#7E7E7E', fontSize: 15 }}>
                Receive timely reminders and updates about your appointments.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
      {/* Testimonial Section */}
      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: '#fff', py: { xs: 8, md: 14 }, position: 'relative', overflow: 'hidden' }}>
        {/* Decorative SVG background */}
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            left: -60,
            zIndex: 0,
            opacity: 0.07,
            pointerEvents: 'none',
          }}
        >
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
            <circle cx="110" cy="110" r="110" fill="#4CAF50" />
          </svg>
        </Box>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: '#4CAF50',
              letterSpacing: 2,
              textTransform: 'uppercase',
              textShadow: '0 2px 8px rgba(76,175,80,0.08)',
            }}
          >
            Testimonials
          </Typography>
            <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: 800,
              mb: 8,
              color: '#222',
              lineHeight: 1.3,
              letterSpacing: 1,
            }}
            >
            Empowering Farmers, Bridging Communities.<br />
            Your Trusted Partner for Smarter Agriculture.
            </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 5,
              justifyContent: 'center',
              mb: 8,
            }}
          >
            {/* Testimonial Card 1 */}
            <Paper
          elevation={8}
          sx={{
            flex: 1,
            p: 4,
            background: 'linear-gradient(135deg, #E8F5E9 60%, #A5D6A7 100%)',
            borderRadius: 5,
            minWidth: 260,
            boxShadow: '0 12px 40px 0 rgba(76,175,80,0.13)',
            position: 'relative',
            overflow: 'visible',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
          transform: 'translateY(-10px) scale(1.04)',
          boxShadow: '0 20px 60px 0 rgba(76,175,80,0.22)',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -32,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: '#fff',
              borderRadius: '50%',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px 0 rgba(76,175,80,0.10)',
              border: '3px solid #A5D6A7',
              overflow: 'hidden', // Ensures image is fully clipped to the circle
              p: 0,
            }}
          >
            <Image
              src="/avatar1.jpg"
              alt="Kathy Sullivan"
              width={64}
              height={64}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </Box>
          <Box sx={{ fontSize: 40, color: '#B0BEC5', mb: 2, mt: 4, textAlign: 'center' }}>“</Box>
          <Typography sx={{ color: '#333', mb: 3, fontStyle: 'italic', textAlign: 'center', fontSize: '1.1rem' }}>
            "GovConnect made it so easy to book appointments and get my farming documents approved. The reminders are a lifesaver!"
          </Typography>
          <Typography sx={{ fontWeight: 700, color: '#388E3C', textAlign: 'center', fontSize: '1.05rem' }}>Kathy Sullivan</Typography>
          <Typography variant="body2" sx={{ color: '#7E7E7E', textAlign: 'center', mb: 1 }}>Farmer, Kurunegala</Typography>
          <Box
            sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          gap: 0.5,
            }}
          >
            {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            component="span"
            sx={{
              width: 18,
              height: 18,
              display: 'inline-block',
              color: '#FFD600',
            }}
          >
            ★
          </Box>
            ))}
          </Box>
        </Paper>
        {/* Testimonial Card 2 */}
        <Paper
          elevation={8}
          sx={{
            flex: 1,
            p: 4,
            background: 'linear-gradient(135deg, #E8F5E9 60%, #A5D6A7 100%)',
            borderRadius: 5,
            minWidth: 260,
            boxShadow: '0 12px 40px 0 rgba(76,175,80,0.13)',
            position: 'relative',
            overflow: 'visible',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
          transform: 'translateY(-10px) scale(1.04)',
          boxShadow: '0 20px 60px 0 rgba(76,175,80,0.22)',
            },
          }}
        >
            <Box
            sx={{
              position: 'absolute',
              top: -32,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: '#fff',
              borderRadius: '50%',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px 0 rgba(76,175,80,0.10)',
              border: '3px solid #A5D6A7',
              overflow: 'hidden', // Ensures image is clipped to the circle
              p: 0,
            }}
            >
            <Image
              src="/avatar2.jpg"
              alt="Elsie Stroud"
              width={64}
              height={64}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
            </Box>
          <Box sx={{ fontSize: 40, color: '#B0BEC5', mb: 2, mt: 4, textAlign: 'center' }}>“</Box>
          <Typography sx={{ color: '#333', mb: 3, fontStyle: 'italic', textAlign: 'center', fontSize: '1.1rem' }}>
            "Uploading my documents before visiting the office saved me hours. The platform is user-friendly and efficient."
          </Typography>
          <Typography sx={{ fontWeight: 700, color: '#388E3C', textAlign: 'center', fontSize: '1.05rem' }}>Elsie Stroud</Typography>
          <Typography variant="body2" sx={{ color: '#7E7E7E', textAlign: 'center', mb: 1 }}>Entrepreneur, Galle</Typography>
          <Box
            sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          gap: 0.5,
            }}
          >
            {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            component="span"
            sx={{
              width: 18,
              height: 18,
              display: 'inline-block',
              color: '#FFD600',
            }}
          >
            ★
          </Box>
            ))}
          </Box>
        </Paper>
        {/* Testimonial Card 3 */}
        <Paper
          elevation={8}
          sx={{
            flex: 1,
            p: 4,
            background: 'linear-gradient(135deg, #E8F5E9 60%, #A5D6A7 100%)',
            borderRadius: 5,
            minWidth: 260,
            boxShadow: '0 12px 40px 0 rgba(76,175,80,0.13)',
            position: 'relative',
            overflow: 'visible',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
          transform: 'translateY(-10px) scale(1.04)',
          boxShadow: '0 20px 60px 0 rgba(76,175,80,0.22)',
            },
          }}
        >
          <Box
            sx={{
          position: 'absolute',
          top: -32,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: '#fff',
          borderRadius: '50%',
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px 0 rgba(76,175,80,0.10)',
          border: '3px solid #A5D6A7',
          overflow: 'hidden',
            }}
          >
            <Image
          src="/avatar3.jpg"
          alt="Nuwan Perera"
          width={64}
          height={64}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ fontSize: 40, color: '#B0BEC5', mb: 2, mt: 4, textAlign: 'center' }}>“</Box>
          <Typography sx={{ color: '#333', mb: 3, fontStyle: 'italic', textAlign: 'center', fontSize: '1.1rem' }}>
            "The AgriLink portal helped me connect with officers and get fertilizer on time. Highly recommended!"
          </Typography>
          <Typography sx={{ fontWeight: 700, color: '#388E3C', textAlign: 'center', fontSize: '1.05rem' }}>Nuwan Perera</Typography>
          <Typography variant="body2" sx={{ color: '#7E7E7E', textAlign: 'center', mb: 1 }}>Farmer, Anuradhapura</Typography>
          <Box
            sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          gap: 0.5,
            }}
          >
            {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            component="span"
            sx={{
              width: 18,
              height: 18,
              display: 'inline-block',
              color: '#FFD600',
            }}
          >
            ★
          </Box>
            ))}
          </Box>
        </Paper>
          </Box>
        </Container>
      </Box>

      {/* Advanced Stats Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)',
          py: { xs: 6, md: 10 },
          px: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative SVG */}
        <Box
          sx={{
        position: 'absolute',
        top: -40,
        right: -40,
        opacity: 0.08,
        zIndex: 0,
        pointerEvents: 'none',
          }}
        >
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#BDBDBD" />
          </svg>
        </Box>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          gap: { xs: 6, md: 10 },
          justifyContent: 'space-between',
        }}
          >
        {/* Left Content */}
        <Box sx={{ flex: 2, minWidth: 260 }}>
          <Typography variant="h6" sx={{ color: '#388E3C', fontWeight: 700, letterSpacing: 1, mb: 1 }}>
            Empowering Local Farming
          </Typography>
          <Typography
            variant="h4"
            sx={{
          color: '#222',
          fontWeight: 900,
          mb: 1,
          textShadow: '0 2px 8px rgba(158,158,158,0.10)',
          letterSpacing: 1,
            }}
          >
            Thrive in the Digital Age
          </Typography>
          <Typography variant="body1" sx={{ color: '#757575', fontWeight: 500, mb: 2 }}>
            Built on Hard Work, Grown with Dedication
          </Typography>
          <Box sx={{ mt: 3 }}>
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
              Join the Movement
            </Button>
          </Box>
        </Box>
        {/* Stats Cards */}
        <Box
          sx={{
            flex: 3,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
            gap: 4,
            alignItems: 'center',
            zIndex: 1,
            mt: { xs: 6, md: 0 },
          }}
        >
          {/* Stat Card 1 */}
          <Paper
            elevation={6}
            sx={{
          textAlign: 'center',
          background: '#fff',
          borderRadius: 4,
          boxShadow: '0 4px 24px 0 rgba(76,175,80,0.10)',
          p: 3,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-6px) scale(1.05)',
            boxShadow: '0 12px 32px 0 rgba(76,175,80,0.18)',
          },
            }}
          >
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#A5D6A7" />
            <path d="M13 25c0-4 3-7 7-7s7 3 7 7" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="20" cy="17" rx="3" ry="3.5" fill="#388E3C" />
          </svg>
            </Box>
            <Typography variant="h4" sx={{ color: '#388E3C', fontWeight: 800 }}>
          2,245
            </Typography>
            <Typography variant="body2" sx={{ color: '#7E7E7E', fontWeight: 500 }}>
          Farmers Connected
            </Typography>
          </Paper>
          {/* Stat Card 2 */}
          <Paper
            elevation={6}
            sx={{
          textAlign: 'center',
          background: '#fff',
          borderRadius: 4,
          boxShadow: '0 4px 24px 0 rgba(76,175,80,0.10)',
          p: 3,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-6px) scale(1.05)',
            boxShadow: '0 12px 32px 0 rgba(76,175,80,0.18)',
          },
            }}
          >
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#A5D6A7" />
            <rect x="13" y="17" width="14" height="8" rx="2" fill="#388E3C" />
            <rect x="16" y="21" width="8" height="2" rx="1" fill="#fff" />
            <rect x="17" y="19" width="6" height="1.5" rx="0.75" fill="#fff" />
          </svg>
            </Box>
            <Typography variant="h4" sx={{ color: '#388E3C', fontWeight: 800 }}>
          1,098
            </Typography>
            <Typography variant="body2" sx={{ color: '#7E7E7E', fontWeight: 500 }}>
          Pickups Scheduled
            </Typography>
          </Paper>
          {/* Stat Card 3 */}
          <Paper
            elevation={6}
            sx={{
          textAlign: 'center',
          background: '#fff',
          borderRadius: 4,
          boxShadow: '0 4px 24px 0 rgba(76,175,80,0.10)',
          p: 3,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-6px) scale(1.05)',
            boxShadow: '0 12px 32px 0 rgba(76,175,80,0.18)',
          },
            }}
          >
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#A5D6A7" />
            <path d="M13 27v-2a5 5 0 015-5h4a5 5 0 015 5v2" stroke="#388E3C" strokeWidth="2" />
            <circle cx="20" cy="16" r="3" fill="#388E3C" />
          </svg>
            </Box>
            <Typography variant="h4" sx={{ color: '#388E3C', fontWeight: 800 }}>
          28,867
            </Typography>
            <Typography variant="body2" sx={{ color: '#7E7E7E', fontWeight: 500 }}>
          Price Alerts Sent
            </Typography>
          </Paper>
            {/* Stat Card 4 */}
            <Paper
            elevation={6}
            sx={{
              textAlign: 'center',
              background: '#fff',
              borderRadius: 4,
              boxShadow: '0 4px 24px 0 rgba(76,175,80,0.10)',
              p: 3,
              height: '100%', // Ensure same height as others
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
              transform: 'translateY(-6px) scale(1.05)',
              boxShadow: '0 12px 32px 0 rgba(76,175,80,0.18)',
              },
            }}
            >
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#A5D6A7" />
            <path d="M20 13v8M20 27h.01" stroke="#388E3C" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="20" cy="13" r="2" fill="#388E3C" />
          </svg>
            </Box>
            <Typography variant="h4" sx={{ color: '#388E3C', fontWeight: 800 }}>
          10,342
            </Typography>
            <Typography variant="body2" sx={{ color: '#7E7E7E', fontWeight: 500 }}>
          Notifications
            </Typography>
          </Paper>
        </Box>
          </Box>
        </Container>
      </Box>
      {/* Call to Action Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #A5D6A7 0%, #E8F5E9 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative SVG shapes */}
        <Box
          sx={{
        position: 'absolute',
        top: -60,
        left: -60,
        zIndex: 0,
        opacity: 0.12,
        pointerEvents: 'none',
          }}
        >
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#4CAF50" />
          </svg>
        </Box>
        <Box
          sx={{
        position: 'absolute',
        bottom: -40,
        right: -40,
        zIndex: 0,
        opacity: 0.10,
        pointerEvents: 'none',
          }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="60" fill="#388E3C" />
          </svg>
        </Box>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Paper
        elevation={8}
        sx={{
          p: { xs: 4, md: 8 },
          textAlign: 'center',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 5,
          boxShadow: '0 8px 40px 0 rgba(76,175,80,0.18)',
          position: 'relative',
          overflow: 'hidden',
        }}
          >
        {/* Animated Icon */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
            animation: 'pulse 2.5s infinite',
            '@keyframes pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
            },
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#A5D6A7" />
            <path d="M20 36l8-8 8 8 8-8" stroke="#388E3C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Box>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            color: '#333333',
            mb: 2,
            fontWeight: 800,
            letterSpacing: 1,
            textShadow: '0 2px 8px rgba(76,175,80,0.08)',
          }}
        >
          Ready to Get Started?
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            color: '#333333',
            mb: 4,
            fontWeight: 500,
            lineHeight: 1.7,
          }}
        >
          Join <Box component="span" sx={{ color: '#4CAF50', fontWeight: 700, display: 'inline' }}>thousands of citizens</Box> already using our platform to access government services efficiently.<br />
          <Box component="span" sx={{ color: '#388E3C', fontWeight: 700, display: 'inline' }}>Experience seamless appointments, instant notifications, and more!</Box>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
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
          px: 5,
          py: 2,
          fontSize: '1.1rem',
          fontWeight: 600,
          borderRadius: 3,
          backgroundColor: 'rgba(76,175,80,0.04)',
          '&:hover': {
            borderColor: '#388E3C',
            backgroundColor: 'rgba(56,142,60,0.08)',
          },
            }}
          >
            Sign In
          </Button>
        </Box>
        {/* Mini stats */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
            mt: 5,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 800 }}>
          2,000+
            </Typography>
            <Typography variant="body2" sx={{ color: '#7E7E7E', fontWeight: 500 }}>
          Happy Users
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 800 }}>
          99%
            </Typography>
            <Typography variant="body2" sx={{ color: '#7E7E7E', fontWeight: 500 }}>
          Satisfaction
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 800 }}>
          24/7
            </Typography>
            <Typography variant="body2" sx={{ color: '#7E7E7E', fontWeight: 500 }}>
          Support
            </Typography>
          </Box>
        </Box>
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
          <AgricultureIcon width={28} height={28} alt="GovConnect Logo" style={{ marginRight: 8 }} />
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
