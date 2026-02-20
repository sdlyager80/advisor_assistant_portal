import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
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
  Fab,
  alpha,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Home as HomeIcon,
  Assignment as TasksIcon,
  People as CustomersIcon,
  CalendarMonth as CalendarIcon,
  MoreVert as MoreIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Mic as VoiceIcon,
  Close as CloseIcon,
  Circle as CircleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  TrendingUp
} from '@mui/icons-material';

// Import screens
import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';
import CustomersScreen from './screens/CustomersScreen';
import CalendarScreen from './screens/CalendarScreen';
import MoreScreen from './screens/MoreScreen';
import DemoScreen from './screens/DemoScreen';
import IllustrationWorkflowScreen from './screens/IllustrationWorkflowScreen';
import ClientReviewPrepScreen from './screens/ClientReviewPrepScreen';

// Import voice commands
import useVoiceCommands from './hooks/useVoiceCommands';

// Import Context Providers
import { CustomerIntelligenceProvider } from './contexts/CustomerIntelligenceContext';
import { IllustrationProvider } from './contexts/IllustrationContext';
import { MeetingPrepProvider } from './contexts/MeetingPrepContext';
import { ComplianceProvider } from './contexts/ComplianceContext';
import { PredictiveAnalyticsProvider } from './contexts/PredictiveAnalyticsContext';

// Lazy load module screens
const IllustrationScreen = lazy(() => import('./screens/modules/IllustrationScreen'));
const LifeStageScreen = lazy(() => import('./screens/modules/LifeStageScreen'));
const MeetingPrepScreen = lazy(() => import('./screens/modules/MeetingPrepScreen'));
const AutomationScreen = lazy(() => import('./screens/modules/AutomationScreen'));
const PredictiveScreen = lazy(() => import('./screens/modules/PredictiveScreen'));
const EnterpriseScreen = lazy(() => import('./screens/modules/EnterpriseScreen'));
const BusinessInsightsScreen = lazy(() => import('./screens/BusinessInsightsScreen'));

// Vibrant color palette
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

// Mobile-first theme with vibrant colors
const theme = createTheme({
  palette: {
    primary: {
      main: colors.lightBlue,
      dark: colors.blue,
    },
    secondary: {
      main: colors.green,
      light: colors.lightGreen,
    },
    success: {
      main: colors.green,
      light: colors.lightGreen,
    },
    warning: {
      main: colors.orange,
      light: colors.yellow,
    },
    error: {
      main: colors.red,
    },
    background: {
      default: colors.paleAqua,
      paper: '#FFFFFF',
    },
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 70,
          paddingBottom: 'env(safe-area-inset-bottom)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F2F7F6 100%)',
          borderTop: `2px solid ${colors.lightBlue}`,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: colors.lightBlue,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 16px rgba(0, 173, 238, 0.15)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 173, 238, 0.25)',
          },
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
        contained: {
          boxShadow: '0 4px 12px rgba(0, 173, 238, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0, 173, 238, 0.4)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontFamily: 'Roboto Slab, serif',
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h5: {
      fontFamily: 'Roboto Slab, serif',
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontFamily: 'Roboto Slab, serif',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
  },
});

function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showDemo, setShowDemo] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [demoCustomerName, setDemoCustomerName] = useState('Sam Wright');
  const [demoCustomerData, setDemoCustomerData] = useState({ name: 'Sam Wright', age: 59, milestone: 'birthday' }); // Sam is 59, turning 60
  const [showNotifications, setShowNotifications] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);
  const [showIllustration, setShowIllustration] = useState(false);
  const [illustrationParams, setIllustrationParams] = useState({ age: 65, monthlyWithdrawal: 2000 });
  const [showClientReviewPrep, setShowClientReviewPrep] = useState(false);
  const [clientReviewParams, setClientReviewParams] = useState({ clientName: 'Sam Wright', meetingTime: '2:30 PM' });
  const homeScreenRef = useRef(null);
  const tasksScreenRef = useRef(null);
  const calendarScreenRef = useRef(null);
  const notificationIdRef = useRef(5); // Start from 5 since we have 4 mock notifications

  // Mock data - will be replaced with ServiceNow API
  const [userData, setUserData] = useState({
    name: 'Grace Wilson',
    role: 'Senior Insurance Advisor',
    avatar: null
  });

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'task',
      title: 'Policy renewal due',
      message: 'John Smith\'s policy renews in 3 days',
      time: '10 min ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'opportunity',
      title: 'New lead assigned',
      message: 'Michael Chen - Life Insurance inquiry',
      time: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'Meeting reminder',
      message: 'Client review with Sarah Johnson at 2:00 PM',
      time: '2 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'success',
      title: 'Quote approved',
      message: 'Emma Wilson accepted your quote',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ]);

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
    // Update unread count
    const unreadCount = notifications.filter(n => !n.read && n.id !== notificationId).length;
    setNotificationCount(unreadCount);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    setNotificationCount(0);
  };

  const handleCloseToast = () => {
    setToastNotification(null);
  };

  // Function to add new notification
  const addNotification = (type, title, message, priority = 'medium', showToast = true) => {
    setNotifications(prev => {
      // Check for duplicates - don't add if same title and message already exists
      const isDuplicate = prev.some(
        notif => notif.title === title && notif.message === message
      );

      if (isDuplicate) {
        console.log('Duplicate notification prevented:', title);
        return prev; // Return unchanged
      }

      const newNotification = {
        id: notificationIdRef.current++,
        type,
        title,
        message,
        time: 'Just now',
        read: false,
        priority
      };

      // Update count
      setNotificationCount(count => count + 1);

      // Show toast notification
      if (showToast) {
        setToastNotification({
          type,
          title,
          message,
          priority
        });
      }

      return [newNotification, ...prev];
    });
  };

  const screens = [
    { label: 'Home', icon: HomeIcon, component: HomeScreen },
    { label: 'Tasks', icon: TasksIcon, component: TasksScreen },
    { label: 'Customers', icon: CustomersIcon, component: CustomersScreen },
    { label: 'Calendar', icon: CalendarIcon, component: CalendarScreen },
    { label: 'More', icon: MoreIcon, component: MoreScreen },
  ];

  const modules = {
    illustration: { component: IllustrationScreen, title: 'Income Planning' },
    lifestage: { component: LifeStageScreen, title: 'Life-Stage Intelligence' },
    meetingprep: { component: MeetingPrepScreen, title: 'Meeting Preparation' },
    automation: { component: AutomationScreen, title: 'Compliance & Automation' },
    predictive: { component: PredictiveScreen, title: 'Predictive Insights' },
    enterprise: { component: EnterpriseScreen, title: 'Enterprise Intelligence' },
    'business-insights': { component: BusinessInsightsScreen, title: 'Business Insights' },
  };

  const ActiveScreenComponent = screens[activeScreen].component;

  const handleNavigateToDemo = (customerName = 'Sam Wright', age = 59) => {
    // Handle both string and object parameters
    if (typeof customerName === 'object') {
      setDemoCustomerName(customerName.name);
      setDemoCustomerData({ name: customerName.name, age: customerName.age || 59, milestone: customerName.milestone || 'birthday' });
    } else {
      setDemoCustomerName(customerName);
      setDemoCustomerData({ name: customerName, age: age, milestone: 'birthday' });
    }
    setShowDemo(true);
    setActiveModule(null);
  };

  const handleBackFromDemo = () => {
    setShowDemo(false);
  };

  const handleNavigateToModule = (moduleId, params) => {
    if (moduleId === 'illustration-workflow') {
      setIllustrationParams(params || { age: 65, monthlyWithdrawal: 2000 });
      setShowIllustration(true);
      setShowDemo(false);
      setShowClientReviewPrep(false);
      setActiveModule(null);
    } else if (moduleId === 'client-review-prep') {
      setClientReviewParams(params || { clientName: 'Sam Wright', meetingTime: '2:30 PM' });
      setShowClientReviewPrep(true);
      setShowDemo(false);
      setShowIllustration(false);
      setActiveModule(null);
    } else {
      setActiveModule(moduleId);
      setShowDemo(false);
      setShowIllustration(false);
      setShowClientReviewPrep(false);
    }
  };

  const handleBackFromModule = () => {
    setActiveModule(null);
  };

  const handleBackFromIllustration = () => {
    setShowIllustration(false);
  };

  const handleBackFromClientReviewPrep = () => {
    setShowClientReviewPrep(false);
  };

  const handleIllustrationToEngagement = (customerData) => {
    setShowIllustration(false);
    // Handle both old format (string) and new format (object) for backward compatibility
    if (typeof customerData === 'string') {
      setDemoCustomerName(customerData);
      setDemoCustomerData({ name: customerData, age: 59, milestone: 'birthday' });
    } else {
      setDemoCustomerName(customerData.name);
      setDemoCustomerData(customerData);
    }
    setShowDemo(true);
  };

  // Handle voice commands
  const handleCommand = (command) => {
    console.log('📥 App received command:', command);

    switch (command.type) {
      case 'CREATE_TASK':
        setActiveScreen(1); // Navigate to Tasks screen
        // Add notification for task creation
        if (command.data) {
          addNotification(
            'task',
            'Task created',
            `New task: ${command.data}`,
            'medium'
          );
        }
        break;

      case 'SCHEDULE_APPOINTMENT':
        setActiveScreen(3); // Navigate to Calendar screen
        addNotification(
          'info',
          'Calendar opened',
          'Ready to schedule your appointment',
          'low',
          false
        );
        break;

      case 'VIEW_CUSTOMERS':
        setActiveScreen(2); // Navigate to Customers screen
        break;

      case 'READ_TASKS':
        setActiveScreen(1);
        // Could trigger reading tasks aloud
        break;

      case 'READ_APPOINTMENTS':
        setActiveScreen(3);
        // Could trigger reading appointments aloud
        break;

      case 'DAILY_SUMMARY':
        setActiveScreen(0);
        // Trigger daily summary on home screen
        if (homeScreenRef.current?.speakDailySummary) {
          setTimeout(() => homeScreenRef.current.speakDailySummary(), 500);
        }
        break;

      case 'SHOW_ILLUSTRATION':
        // Navigate to illustration workflow screen
        console.log('📊 SHOW_ILLUSTRATION command received with params:', command.params);
        setIllustrationParams(command.params || { age: 65, monthlyWithdrawal: 2000 });
        setShowIllustration(true);
        setShowDemo(false);
        setActiveModule(null);
        break;

      case 'SHOW_DEMO':
        // Navigate to demo screen
        const customerName = command.customerName || 'Sam Wright';
        const customerAge = command.customerAge || 59;
        console.log('🎬 SHOW_DEMO command received - navigating to demo screen for:', customerName, 'age:', customerAge);
        setDemoCustomerName(customerName);
        setDemoCustomerData({ name: customerName, age: customerAge, milestone: 'birthday' });
        setShowDemo(true);
        break;

      case 'NAVIGATE':
        setActiveScreen(command.screen);
        break;

      case 'OPEN_MODULE':
        handleNavigateToModule(command.module);
        break;

      default:
        console.log('Unknown command type:', command.type);
    }
  };

  const { isListening, startListening, speakAndListen } = useVoiceCommands(handleCommand);

  const handleVoiceAssist = () => {
    // Start conversational mode
    const greetings = [
      "Hi there! What can I help you with today?",
      "Hello! How can I assist you?",
      "Hey! What would you like to do?",
      "Hi! I'm here to help. What do you need?"
    ];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    speakAndListen(greeting, 100);
  };

  // Get current screen title
  const getCurrentTitle = () => {
    if (showIllustration) return 'Policy Illustration & Insights';
    if (showDemo) return 'Personalized Engagement';
    if (activeModule) return modules[activeModule]?.title || 'Module';
    return screens[activeScreen].label;
  };

  return (
    <CustomerIntelligenceProvider>
      <IllustrationProvider>
        <MeetingPrepProvider>
          <ComplianceProvider>
            <PredictiveAnalyticsProvider>
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
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F2F7F6 100%)',
                      color: 'text.primary',
                      borderBottom: `3px solid ${colors.lightBlue}`,
                    }}
                  >
                    <Toolbar>
                      {(showDemo || activeModule || showIllustration) && (
                        <IconButton onClick={showIllustration ? handleBackFromIllustration : showDemo ? handleBackFromDemo : handleBackFromModule} sx={{ mr: 1 }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </IconButton>
                      )}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {getCurrentTitle()}
                        </Typography>
                      </Box>
                      {!showDemo && !activeModule && !showIllustration && (
                        <>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                          <IconButton onClick={handleNotificationClick}>
                            <Badge badgeContent={notificationCount} color="error">
                              <NotificationsIcon />
                            </Badge>
                          </IconButton>
                        </>
                      )}
                    </Toolbar>
                  </AppBar>

                  {/* Main Content Area */}
                  <Box sx={{
                    flex: 1,
                    overflow: 'auto',
                    background: `linear-gradient(180deg, ${colors.paleAqua} 0%, ${alpha(colors.lightBlue, 0.1)} 100%)`,
                    position: 'relative'
                  }}>
                    {showIllustration ? (
                      <IllustrationWorkflowScreen
                        onClose={handleBackFromIllustration}
                        onNavigateToEngagement={handleIllustrationToEngagement}
                        illustrationParams={illustrationParams}
                      />
                    ) : showClientReviewPrep ? (
                      <ClientReviewPrepScreen
                        onClose={handleBackFromClientReviewPrep}
                        clientData={{
                          name: clientReviewParams.clientName,
                          meetingTime: clientReviewParams.meetingTime,
                          age: 59,
                          accountValue: 485000,
                        }}
                      />
                    ) : showDemo ? (
                      <DemoScreen
                        customerName={demoCustomerName}
                        customerAge={demoCustomerData.age}
                        customerMilestone={demoCustomerData.milestone}
                        onClose={handleBackFromDemo}
                      />
                    ) : activeModule ? (
                      <Suspense fallback={
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                          <CircularProgress />
                        </Box>
                      }>
                        {React.createElement(modules[activeModule].component)}
                      </Suspense>
                    ) : (
                      <ActiveScreenComponent
                        userData={userData}
                        onNavigateToDemo={handleNavigateToDemo}
                        onNavigateToModule={handleNavigateToModule}
                        addNotification={addNotification}
                      />
                    )}
                  </Box>

        {/* Voice Assistant FAB */}
        <Fab
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 16,
            zIndex: 1000,
            background: `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.blue} 100%)`,
            color: 'white',
            boxShadow: `0 4px 16px ${alpha(colors.lightBlue, 0.4)}`,
            '&:hover': {
              background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
              boxShadow: `0 6px 20px ${alpha(colors.lightBlue, 0.5)}`,
            },
            animation: isListening ? 'pulse 1.5s ease-in-out infinite' : 'none',
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(1)',
                boxShadow: '0 0 0 0 rgba(0, 137, 123, 0.7)'
              },
              '50%': {
                transform: 'scale(1.05)',
                boxShadow: '0 0 0 10px rgba(0, 137, 123, 0)'
              },
              '100%': {
                transform: 'scale(1)',
                boxShadow: '0 0 0 0 rgba(0, 137, 123, 0)'
              }
            }
          }}
          onClick={handleVoiceAssist}
        >
          <VoiceIcon />
        </Fab>

                  {/* Bottom Navigation */}
                  {!showDemo && !activeModule && !showIllustration && (
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
                  )}

        {/* Toast Notification */}
        <Snackbar
          open={!!toastNotification}
          autoHideDuration={4000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ mt: 8 }}
        >
          {toastNotification && (
            <Alert
              onClose={handleCloseToast}
              severity={
                toastNotification.priority === 'high' ? 'error' :
                toastNotification.priority === 'medium' ? 'warning' :
                toastNotification.type === 'success' ? 'success' : 'info'
              }
              variant="filled"
              sx={{ minWidth: 300 }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {toastNotification.title}
              </Typography>
              <Typography variant="body2">
                {toastNotification.message}
              </Typography>
            </Alert>
          )}
        </Snackbar>

        {/* Notifications Drawer */}
        <Drawer
          anchor="right"
          open={showNotifications}
          onClose={handleCloseNotifications}
          sx={{
            '& .MuiDrawer-paper': {
              width: { xs: '100%', sm: 400 },
              maxWidth: '100%',
            },
          }}
        >
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box
              sx={{
                p: 2,
                background: `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.blue} 100%)`,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Notifications
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  {notificationCount} unread
                </Typography>
              </Box>
              <Box>
                {notificationCount > 0 && (
                  <Chip
                    label="Mark all read"
                    size="small"
                    onClick={handleMarkAllAsRead}
                    sx={{
                      bgcolor: alpha('#FFFFFF', 0.2),
                      color: 'white',
                      fontWeight: 600,
                      mr: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: alpha('#FFFFFF', 0.3),
                      },
                    }}
                  />
                )}
                <IconButton onClick={handleCloseNotifications} sx={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Notifications List */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <List sx={{ p: 0 }}>
                {notifications.map((notification, index) => {
                  const getIcon = () => {
                    switch (notification.type) {
                      case 'task':
                        return <TasksIcon sx={{ color: notification.priority === 'high' ? colors.red : colors.blue }} />;
                      case 'opportunity':
                        return <TrendingUp sx={{ color: colors.green }} />;
                      case 'success':
                        return <CheckCircleIcon sx={{ color: colors.green }} />;
                      case 'warning':
                        return <WarningIcon sx={{ color: colors.orange }} />;
                      default:
                        return <InfoIcon sx={{ color: colors.lightBlue }} />;
                    }
                  };

                  const getPriorityColor = () => {
                    switch (notification.priority) {
                      case 'high':
                        return colors.red;
                      case 'medium':
                        return colors.orange;
                      default:
                        return colors.lightGreen;
                    }
                  };

                  return (
                    <React.Fragment key={notification.id}>
                      <ListItem
                        sx={{
                          bgcolor: notification.read ? 'transparent' : alpha(colors.lightBlue, 0.05),
                          borderLeft: notification.read ? 'none' : `4px solid ${getPriorityColor()}`,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: alpha(colors.lightBlue, 0.08),
                          },
                          position: 'relative',
                        }}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: alpha(getPriorityColor(), 0.1) }}>
                            {getIcon()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="subtitle2" fontWeight={notification.read ? 500 : 700}>
                                {notification.title}
                              </Typography>
                              {!notification.read && (
                                <CircleIcon sx={{ fontSize: 8, color: colors.lightBlue }} />
                              )}
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5, mb: 0.5 }}
                              >
                                {notification.message}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {notification.time}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < notifications.length - 1 && <Divider />}
                    </React.Fragment>
                  );
                })}
              </List>

              {/* Empty State */}
              {notifications.length === 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    p: 4,
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No notifications
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You're all caught up!
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Drawer>
                </Box>
              </ThemeProvider>
            </PredictiveAnalyticsProvider>
          </ComplianceProvider>
        </MeetingPrepProvider>
      </IllustrationProvider>
    </CustomerIntelligenceProvider>
  );
}

export default App;
