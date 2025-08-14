'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Fade,
  Grow,
  CardActions,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper
} from '@mui/material';
import {
  Assessment as AuditIcon,
  Nature as SeedIcon,
  ExpandMore as ExpandMoreIcon,
  Assignment as DocumentIcon,
  AccountBalance as RevenueIcon,
  DirectionsCar as VehicleIcon,
  Store as StoreIcon,
  Schedule as AppointmentIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  LocationOn as LocationIcon,
  Agriculture as AgricultureIcon,
  Science as ScienceIcon,
  CheckCircle as CheckIcon,
  Security as SecurityIcon,
  Grass as EcoIcon
} from '@mui/icons-material';

interface ServiceLocation {
  name: string;
  region: string;
  specialty?: string;
}

interface SubService {
  name: string;
  description: string;
  icon: React.ReactElement;
  services?: string[];
  locations?: ServiceLocation[];
}

const ministryServices = [
  {
    id: 1,
    name: "Internal Audit Division",
    description: "Proceeding exemplary and effective activities at the optimum level to guide every aspects of the field of agriculture stepping towards a sustainable future.",
    category: "Audit & Compliance",
    icon: <AuditIcon />,
    color: "#2E7D32",
    estimatedTime: "3-7 days",
    rating: 4.5,
    phone: "+94-11-269-4000",
    website: "doa.gov.lk",
    mission: "Proceeding exemplary and effective activities at the optimum level to guide every aspects of the field of agriculture stepping towards a sustainable future.",
    subServices: [
      {
        name: "Paid Document Section",
        description: "Submission of fully completed paid documents to the Government Auditor General",
        icon: <DocumentIcon />,
        services: [
          "Annual provision surveillance",
          "Payment unit document checking", 
          "Monthly account report verification",
          "Bank reconciliation inspection"
        ]
      },
      {
        name: "Revenue Report Section", 
        description: "Daily revenue collection and monthly reporting to Government Auditor General",
        icon: <RevenueIcon />,
        services: [
          "Daily revenue deposit management",
          "Department Revenue Collection Account",
          "Monthly revenue report preparation",
          "Bank deposit receipt verification"
        ]
      },
      {
        name: "Running Chart Section",
        description: "Vehicle management and fuel monitoring for all department institutions",
        icon: <VehicleIcon />,
        services: [
          "Vehicle running chart verification",
          "Fuel consumption monitoring",
          "Monthly chart submission",
          "Vehicle disposal coordination"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Seed and Planting Material Development Centre (SPMDC)",
    description: "Comprehensive seed and planting material services across the island with quality assurance and agricultural development support.",
    category: "Agricultural Development",
    icon: <SeedIcon />,
    color: "#388E3C",
    estimatedTime: "1-5 days",
    rating: 4.7,
    phone: "+94-11-269-4100",
    website: "spmdc.doa.gov.lk",
    subServices: [
      {
        name: "Government Seed and Planting Material Sales Centers",
        description: "Island-wide network of seed and planting material distribution centers",
        icon: <StoreIcon />,
        locations: [
          { name: "Seeds and Planting Material Sales Center, Colombo 05", region: "Western" },
          { name: "Seeds and Planting Material Sales Center, Matara", region: "Southern" },
          { name: "Seeds and Planting Material Sales Center, Kundasale", region: "Central" },
          { name: "Seeds and Planting Material Sales Center, Ulpathagama", region: "North Central" },
          { name: "Seed Potato Store, Seethaeliya", region: "Central", specialty: "Potato Seeds" },
          { name: "Vegetable Seeds Centre, Gannoruwa", region: "Central", specialty: "Vegetable Seeds" }
        ]
      },
      {
        name: "Appointment Booking Service",
        description: "Schedule appointments for seed consultation and agricultural advisory services",
        icon: <AppointmentIcon />,
        services: [
          "Seed consultation appointments",
          "Agricultural advisory sessions",
          "Quality testing appointments",
          "Bulk order consultations"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Crop Development Department",
    description: "Comprehensive crop submission services, production monitoring, and agricultural data management for farmers.",
    category: "Crop Management",
    icon: <AgricultureIcon />,
    color: "#8BC34A",
    estimatedTime: "1-3 days",
    rating: 4.8,
    phone: "+94-11-269-4200",
    website: "doa.gov.lk/crop-services",
    subServices: [
      {
        name: "Crop Registration Services",
        description: "New crop registration and seasonal updates for agricultural tracking",
        icon: <AgricultureIcon />,
        services: [
          "New Crop Registration",
          "Seasonal Crop Updates", 
          "Crop Variety Registration",
          "Land Use Documentation"
        ]
      },
      {
        name: "Harvest Documentation Services",
        description: "Harvest reporting and production data submission services",
        icon: <DocumentIcon />,
        services: [
          "Harvest Documentation",
          "Crop Production Data Submission",
          "Yield Reporting Services",
          "Agricultural Statistics Updates"
        ]
      },
      {
        name: "Insurance & Subsidy Services",
        description: "Crop insurance claims and subsidy verification services",
        icon: <SecurityIcon />,
        services: [
          "Crop Insurance Claims",
          "Subsidy Eligibility Verification",
          "Damage Assessment Reports",
          "Compensation Applications"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Fertilizer Management Department",
    description: "Government fertilizer distribution, subsidy programs, and soil management services for sustainable agriculture.",
    category: "Fertilizer & Soil",
    icon: <ScienceIcon />,
    color: "#4CAF50",
    estimatedTime: "2-5 days",
    rating: 4.6,
    phone: "+94-11-269-4300",
    website: "doa.gov.lk/fertilizer-services",
    subServices: [
      {
        name: "Subsidized Fertilizer Services",
        description: "Government fertilizer subsidy applications and distribution management",
        icon: <ScienceIcon />,
        services: [
          "Subsidized Fertilizer Request",
          "Government Fertilizer Allocation",
          "Subsidy Application Processing",
          "Distribution Schedule Inquiries"
        ]
      },
      {
        name: "Organic Fertilizer Services",
        description: "Organic fertilizer programs and sustainable farming support",
        icon: <EcoIcon />,
        services: [
          "Organic Fertilizer Application",
          "Compost Program Registration",
          "Bio-fertilizer Distribution",
          "Sustainable Farming Consultation"
        ]
      },
      {
        name: "Soil Testing Services",
        description: "Comprehensive soil analysis and fertilizer recommendation services",
        icon: <ScienceIcon />,
        services: [
          "Soil Testing for Fertilizer",
          "Soil pH Analysis",
          "Nutrient Deficiency Assessment",
          "Fertilizer Recommendation Reports"
        ]
      }
    ]
  }
];

export default function GovernmentServices() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(selectedService === serviceId ? null : serviceId);
  };

  const ServiceCard = ({ service, index }: { service: typeof ministryServices[0]; index: number }) => (
    <Grow in={true} timeout={500 + index * 200}>
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 255, 248, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(76, 175, 80, 0.1)',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(76, 175, 80, 0.15)',
          border: '1px solid rgba(76, 175, 80, 0.2)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${service.color} 0%, #4CAF50 100%)`,
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          {/* Header Section */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
            <Avatar sx={{ 
              backgroundColor: service.color,
              width: 60,
              height: 60,
              fontSize: '1.5rem'
            }}>
              {service.icon}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 700, 
                color: '#333333',
                mb: 1,
                lineHeight: 1.2
              }}>
                {service.name}
              </Typography>
              <Chip 
                label={service.category}
                sx={{
                  backgroundColor: `${service.color}20`,
                  color: service.color,
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              />
            </Box>
          </Box>

          {/* Mission/Description */}
          <Typography variant="body2" sx={{ 
            color: '#666666',
            mb: 3,
            lineHeight: 1.6,
            fontStyle: 'italic'
          }}>
            {service.description}
          </Typography>

          {/* Service Stats */}
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimeIcon sx={{ color: service.color, fontSize: '1.2rem' }} />
              <Typography variant="body2" sx={{ color: '#666666' }}>
                {service.estimatedTime}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StarIcon sx={{ color: '#FFC107', fontSize: '1.2rem' }} />
              <Typography variant="body2" sx={{ color: '#666666' }}>
                {service.rating}/5.0
              </Typography>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Tooltip title="Phone">
              <Chip
                icon={<PhoneIcon />}
                label={service.phone}
                variant="outlined"
                size="small"
                sx={{ borderColor: service.color, color: service.color }}
              />
            </Tooltip>
            <Tooltip title="Website">
              <Chip
                icon={<WebsiteIcon />}
                label={service.website}
                variant="outlined"
                size="small"
                sx={{ borderColor: service.color, color: service.color }}
              />
            </Tooltip>
          </Box>
        </CardContent>

        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleServiceSelect(service.id)}
            sx={{
              background: `linear-gradient(135deg, ${service.color} 0%, #4CAF50 100%)`,
              color: '#FFFFFF',
              fontWeight: 600,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                background: `linear-gradient(135deg, #2E7D32 0%, ${service.color} 100%)`,
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(76, 175, 80, 0.3)'
              }
            }}
          >
            {selectedService === service.id ? 'Hide Sub-Services' : 'View Sub-Services'}
          </Button>
        </CardActions>
      </Card>
    </Grow>
  );

  const SubServiceAccordion = ({ service }: { service: typeof ministryServices[0] }) => (
    <Fade in={selectedService === service.id} timeout={600}>
      <Box sx={{ mt: 3 }}>
        {service.subServices.map((subService: SubService, index: number) => (
          <Accordion 
            key={index}
            sx={{
              mb: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(76, 175, 80, 0.1)',
              borderRadius: '12px !important',
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                boxShadow: '0 8px 24px rgba(76, 175, 80, 0.1)'
              }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon sx={{ color: service.color }} />}
              sx={{
                borderRadius: '12px',
                '&.Mui-expanded': {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Avatar sx={{ 
                  backgroundColor: `${service.color}20`,
                  color: service.color,
                  width: 40,
                  height: 40
                }}>
                  {subService.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: '#333333' 
                  }}>
                    {subService.name}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#666666',
                    mt: 0.5
                  }}>
                    {subService.description}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <Divider sx={{ mb: 2, borderColor: `${service.color}30` }} />
              
              {/* Services List */}
              {subService.services && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ 
                    fontWeight: 600, 
                    color: service.color,
                    mb: 2
                  }}>
                    Available Services:
                  </Typography>
                  <List dense>
                    {subService.services.map((item: string, idx: number) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon sx={{ color: service.color, fontSize: '1.2rem' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: '#333333'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Locations List for SPMDC */}
              {subService.locations && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ 
                    fontWeight: 600, 
                    color: service.color,
                    mb: 2
                  }}>
                    Service Locations ({subService.locations.length} centers):
                  </Typography>
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 1 
                  }}>
                    {subService.locations.map((location: ServiceLocation, idx: number) => (
                      <Paper key={idx} sx={{
                          p: 2,
                          background: 'rgba(76, 175, 80, 0.05)',
                          border: '1px solid rgba(76, 175, 80, 0.1)',
                          borderRadius: 2
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <LocationIcon sx={{ 
                              color: service.color, 
                              fontSize: '1.1rem',
                              mt: 0.2
                            }} />
                            <Box>
                              <Typography variant="body2" sx={{ 
                                fontWeight: 500,
                                color: '#333333',
                                lineHeight: 1.3
                              }}>
                                {location.name}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Chip
                                  label={location.region}
                                  size="small"
                                  sx={{
                                    backgroundColor: `${service.color}20`,
                                    color: service.color,
                                    fontSize: '0.7rem',
                                    height: 20
                                  }}
                                />
                                {location.specialty && (
                                  <Chip
                                    label={location.specialty}
                                    size="small"
                                    sx={{
                                      backgroundColor: '#FF980020',
                                      color: '#FF9800',
                                      fontSize: '0.7rem',
                                      height: 20
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Paper>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<AppointmentIcon />}
                  sx={{
                    background: `linear-gradient(135deg, ${service.color} 0%, #4CAF50 100%)`,
                    color: '#FFFFFF',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Book Appointment
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PhoneIcon />}
                  sx={{
                    borderColor: service.color,
                    color: service.color,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: `${service.color}10`,
                      borderColor: service.color
                    }
                  }}
                >
                  Contact
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Fade>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Fade in={true} timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 50%, #66BB6A 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}>
            🌾 Ministry of Agriculture Services
          </Typography>
          <Typography variant="h6" sx={{ 
            color: '#666666',
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6
          }}>
            Comprehensive agricultural services and administrative support for sustainable farming development across Sri Lanka
          </Typography>
        </Box>
      </Fade>

      {/* Services Grid */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {ministryServices.map((service, index) => (
          <Box key={service.id}>
            <ServiceCard service={service} index={index} />
            {selectedService === service.id && (
              <SubServiceAccordion service={service} />
            )}
          </Box>
        ))}
      </Box>

      {/* Footer Note */}
      <Fade in={true} timeout={1200}>
        <Box sx={{ 
          textAlign: 'center', 
          mt: 6,
          p: 3,
          background: 'rgba(76, 175, 80, 0.05)',
          borderRadius: 3,
          border: '1px solid rgba(76, 175, 80, 0.1)'
        }}>
          <Typography variant="body2" sx={{ color: '#666666' }}>
            For technical support or additional information, please contact the Department of Agriculture at{' '}
            <Typography component="span" sx={{ color: '#2E7D32', fontWeight: 600 }}>
              +94-11-269-4000
            </Typography>
          </Typography>
        </Box>
      </Fade>
    </Container>
  );
}
