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
} from '@mui/material';
import {
  Person,
  Notifications,
  Settings,
  Help,
  Logout,
  Assessment,
  Stars,
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

const MoreScreen = ({ userData, onNavigateToDemo }) => {
  const menuItems = [
    { icon: <Person />, text: 'Profile', subtitle: userData.role, color: colors.blue },
    { icon: <Assessment />, text: 'Reports & Analytics', color: colors.green },
    { icon: <Notifications />, text: 'Notifications', color: colors.orange },
    { icon: <Settings />, text: 'Settings', color: colors.lightBlue },
    { icon: <Help />, text: 'Help & Support', color: colors.lightGreen },
  ];

  return (
    <Container maxWidth="md" sx={{ pb: 10, pt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Roboto Slab, serif',
          fontWeight: 700,
          mb: 3,
          background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        More Options
      </Typography>

      {/* Advanced Engagement Feature Card */}
      <Card
        sx={{
          mb: 3,
          background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          border: `3px solid ${colors.lightBlue}`,
          boxShadow: `0 6px 20px ${alpha(colors.lightBlue, 0.4)}`,
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: `0 10px 32px ${alpha(colors.lightBlue, 0.5)}`,
          },
        }}
        onClick={() => onNavigateToDemo('Sam Wright')}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: alpha('#FFFFFF', 0.1),
          }}
        />
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                bgcolor: alpha('#FFFFFF', 0.25),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <Stars sx={{ fontSize: 32 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700, mb: 0.5 }}>
                Advanced Engagement
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.95, fontSize: '0.9375rem' }}>
                Data-driven customer outreach assistant
              </Typography>
            </Box>
            <Chip
              label="Featured"
              sx={{
                bgcolor: colors.yellow,
                color: '#333',
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            />
          </Box>
        </CardContent>
      </Card>

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
  );
};

export default MoreScreen;
