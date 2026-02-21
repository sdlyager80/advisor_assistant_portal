import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  Box,
  Chip,
  alpha,
  Grid,
} from '@mui/material';
import {
  Person,
  Notifications,
  Settings,
  Help,
  Logout,
  Assessment,
  Stars,
  ShowChart,
  Timeline,
  Campaign,
  Event,
  Gavel,
  Psychology,
  BusinessCenter,
  Insights,
} from '@mui/icons-material';

// Color Palette
const colors = {
  orange: '#F6921E',
  yellow: '#E8DE23',
  lightGreen: '#8BC53F',
  green: '#37A526',
  lightBlue: '#00ADEE',
  blue: '#1B75BB',
  red: '#D02E2E',
  paleAqua: '#F2F7F6',
};

const MoreScreen = ({ userData, onNavigateToDemo, onNavigateToModule }) => {
  // Enterprise modules
  const enterpriseModules = [
    {
      id: 'engagement',
      icon: Stars,
      title: 'Personalized Engagement',
      description: 'Agent-driven customer outreach',
      color: colors.lightBlue,
      badge: 'Featured'
    },
    {
      id: 'illustration',
      icon: ShowChart,
      title: 'Income Planning',
      description: 'Guided illustration & projections',
      color: colors.green,
      badge: null
    },
    {
      id: 'lifestage',
      icon: Timeline,
      title: 'Life-Stage Intelligence',
      description: 'Milestone tracking & retention',
      color: colors.blue,
      badge: null
    },
    {
      id: 'meetingprep',
      icon: Event,
      title: 'Meeting Preparation',
      description: 'Pre-meeting intelligence hub',
      color: colors.orange,
      badge: null
    },
    {
      id: 'automation',
      icon: Gavel,
      title: 'Compliance & Automation',
      description: 'Document assembly & audit',
      color: colors.red,
      badge: null
    },
    {
      id: 'predictive',
      icon: Psychology,
      title: 'Predictive Insights',
      description: 'Risk & retention analytics',
      color: colors.lightGreen,
      badge: null
    },
    {
      id: 'enterprise',
      icon: BusinessCenter,
      title: 'Enterprise Intelligence',
      description: 'Cross-functional analytics',
      color: colors.yellow,
      badge: 'Advanced'
    },
    {
      id: 'business-insights',
      icon: Insights,
      title: 'Business Insights',
      description: 'Platform ROI & performance metrics',
      color: colors.blue,
      badge: 'Featured'
    },
  ];

  const menuItems = [
    { icon: <Person />, text: 'Profile', subtitle: userData.role, color: colors.blue },
    { icon: <Assessment />, text: 'Reports & Analytics', color: colors.green },
    { icon: <Notifications />, text: 'Notifications', color: colors.orange },
    { icon: <Settings />, text: 'Settings', color: colors.lightBlue },
    { icon: <Help />, text: 'Help & Support', color: colors.lightGreen },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', py: 3 }}>
      <Container maxWidth="lg" sx={{ pb: 10, pt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Roboto Slab, serif',
          fontWeight: 700,
          mb: 1,
          color: colors.blue,
        }}
      >
        Enterprise Modules
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Comprehensive intelligence platform for insurance professionals
      </Typography>

      {/* Enterprise Module Cards Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          mb: 4,
        }}
      >
        {enterpriseModules.map((module) => (
          <Box key={module.id}>
            <Card
              sx={{
                width: '100%',
                minWidth: 0,
                height: 220,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                background: alpha(module.color, 0.08),
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                border: `3px solid ${module.color}`,
                boxShadow: `0 4px 16px ${alpha(module.color, 0.15)}`,
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 8px 28px ${alpha(module.color, 0.25)}`,
                  background: alpha(module.color, 0.12),
                },
              }}
              onClick={() => {
                if (module.id === 'engagement') {
                  onNavigateToDemo();
                } else if (onNavigateToModule) {
                  onNavigateToModule(module.id);
                }
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -30,
                  right: -30,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: alpha(module.color, 0.1),
                }}
              />
              <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 }, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Icon and Badge Row */}
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                  minHeight: 48
                }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(module.color, 0.15),
                      border: `2px solid ${module.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <module.icon sx={{ fontSize: 28, color: module.color }} />
                  </Box>
                  {module.badge && (
                    <Chip
                      label={module.badge}
                      size="small"
                      sx={{
                        bgcolor: colors.yellow,
                        color: '#333',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        height: 24,
                        ml: 1,
                      }}
                    />
                  )}
                </Box>

                {/* Title and Description */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto Slab, serif',
                      fontWeight: 700,
                      mb: 1,
                      fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                      lineHeight: 1.3,
                      color: '#000000',
                    }}
                  >
                    {module.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' },
                      lineHeight: 1.4,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {module.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Menu Items */}
      <Card sx={{ background: colors.paleAqua, border: `2px solid ${alpha(colors.lightBlue, 0.3)}` }}>
        <List sx={{ p: 1 }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: alpha(item.color, 0.1),
                    transform: 'translateX(8px)',
                  },
                }}
              >
                <ListItemIcon>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: alpha(item.color, 0.15),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {React.cloneElement(item.icon, { sx: { color: item.color } })}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight={600}>
                      {item.text}
                    </Typography>
                  }
                  secondary={item.subtitle}
                />
              </ListItemButton>
              {index < menuItems.length - 1 && <Divider sx={{ my: 0.5 }} />}
            </React.Fragment>
          ))}
        </List>
      </Card>

      {/* Logout Button */}
      <Card
        sx={{
          mt: 3,
          background: alpha(colors.red, 0.08),
          border: `2px solid ${alpha(colors.red, 0.3)}`,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: alpha(colors.red, 0.12),
            transform: 'translateY(-2px)',
            boxShadow: `0 4px 12px ${alpha(colors.red, 0.2)}`,
          },
        }}
      >
        <ListItemButton sx={{ p: 2 }}>
          <ListItemIcon>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: alpha(colors.red, 0.15),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Logout sx={{ color: colors.red }} />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" fontWeight={700} color={colors.red}>
                Logout
              </Typography>
            }
          />
        </ListItemButton>
      </Card>
    </Container>
    </Box>
  );
};

export default MoreScreen;
