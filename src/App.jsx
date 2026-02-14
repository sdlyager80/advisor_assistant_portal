import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Fab
} from '@mui/material';
import {
  Home as HomeIcon,
  Assignment as TasksIcon,
  People as CustomersIcon,
  CalendarMonth as CalendarIcon,
  MoreVert as MoreIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Mic as VoiceIcon
} from '@mui/icons-material';

// Import screens
import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';
import CustomersScreen from './screens/CustomersScreen';
import CalendarScreen from './screens/CalendarScreen';
import MoreScreen from './screens/MoreScreen';

// Mobile-first theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#00897b',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 70,
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
        },
      },
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
  },
});

function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);

  // Mock data - will be replaced with ServiceNow API
  const [userData, setUserData] = useState({
    name: 'Sarah Anderson',
    role: 'Senior Insurance Advisor',
    avatar: null
  });

  const screens = [
    { label: 'Home', icon: HomeIcon, component: HomeScreen },
    { label: 'Tasks', icon: TasksIcon, component: TasksScreen },
    { label: 'Customers', icon: CustomersIcon, component: CustomersScreen },
    { label: 'Calendar', icon: CalendarIcon, component: CalendarScreen },
    { label: 'More', icon: MoreIcon, component: MoreScreen },
  ];

  const ActiveScreenComponent = screens[activeScreen].component;

  const handleVoiceAssist = () => {
    // Voice assistant integration
    console.log('Voice assist activated');
    alert('Voice Assistant: "How can I help you today?"');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        {/* Top App Bar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: 'white',
            color: 'text.primary',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {screens[activeScreen].label}
              </Typography>
              {activeScreen === 0 && (
                <Typography variant="caption" color="text.secondary">
                  Good morning, {userData.name.split(' ')[0]}
                </Typography>
              )}
            </Box>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Box sx={{
          flex: 1,
          overflow: 'auto',
          bgcolor: 'background.default',
          position: 'relative'
        }}>
          <ActiveScreenComponent userData={userData} />
        </Box>

        {/* Voice Assistant FAB */}
        <Fab
          color="secondary"
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 16,
            zIndex: 1000,
          }}
          onClick={handleVoiceAssist}
        >
          <VoiceIcon />
        </Fab>

        {/* Bottom Navigation */}
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000
          }}
          elevation={3}
        >
          <BottomNavigation
            value={activeScreen}
            onChange={(event, newValue) => setActiveScreen(newValue)}
            showLabels
          >
            {screens.map((screen, index) => (
              <BottomNavigationAction
                key={index}
                label={screen.label}
                icon={<screen.icon />}
              />
            ))}
          </BottomNavigation>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
