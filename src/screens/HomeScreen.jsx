import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
  Paper,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  Event,
  People,
  Phone,
  Stars,
  ArrowForward,
  Lightbulb,
  VolumeUp,
  VolumeOff,
  AttachMoney,
  CheckCircle,
  AccessTime,
  Cake,
  Close,
  Email,
  Business,
  AccountCircle,
  Policy,
  LocalHospital,
  Send,
  Mic,
} from '@mui/icons-material';
import useSpeech from '../hooks/useSpeech';

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

const HomeScreen = ({ userData, onNavigateToDemo, onNavigateToModule, addNotification }) => {
  const { speak, stop, isSpeaking, isEnabled, toggleEnabled, getRandomResponse } = useSpeech();
  const notificationsInitialized = useRef(false);

  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Modal states
  const [customerModalOpen, setCustomerModalOpen] = React.useState(false);
  const [opportunityModalOpen, setOpportunityModalOpen] = React.useState(false);
  const [messageModalOpen, setMessageModalOpen] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [tasksModalOpen, setTasksModalOpen] = React.useState(false);
  const [appointmentsModalOpen, setAppointmentsModalOpen] = React.useState(false);
  const [leadsModalOpen, setLeadsModalOpen] = React.useState(false);
  const [opportunitiesModalOpen, setOpportunitiesModalOpen] = React.useState(false);

  // Quick Action modals
  const [newTaskModalOpen, setNewTaskModalOpen] = React.useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = React.useState(false);
  const [callLogModalOpen, setCallLogModalOpen] = React.useState(false);
  const [addCustomerModalOpen, setAddCustomerModalOpen] = React.useState(false);

  // Search & Voice Command states
  const [searchInput, setSearchInput] = React.useState('');
  const [isSearchListening, setIsSearchListening] = React.useState(false);
  const searchRecognitionRef = useRef(null);

  // Form states
  const [opportunityData, setOpportunityData] = React.useState({
    customer: '',
    type: 'Life Insurance',
    amount: '',
    notes: ''
  });
  const [messageData, setMessageData] = React.useState({
    to: '',
    subject: '',
    message: ''
  });
  const [newTaskData, setNewTaskData] = React.useState({
    title: '',
    priority: 'medium',
    dueDate: '',
    notes: ''
  });
  const [scheduleData, setScheduleData] = React.useState({
    client: '',
    type: 'Policy Review',
    date: '',
    time: '',
    duration: '30 min'
  });
  const [callLogData, setCallLogData] = React.useState({
    client: '',
    direction: 'outbound',
    duration: '',
    notes: ''
  });
  const [newCustomerData, setNewCustomerData] = React.useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Life Insurance'
  });

  // Mock data for modals
  const mockTasks = [
    { id: 1, title: 'Follow up with John Smith', priority: 'high', dueDate: 'Today, 2:00 PM', status: 'pending' },
    { id: 2, title: 'Prepare quote for Sarah Johnson', priority: 'high', dueDate: 'Today, 3:30 PM', status: 'pending' },
    { id: 3, title: 'Review policy documents for Michael Chen', priority: 'medium', dueDate: 'Today, 4:00 PM', status: 'pending' },
    { id: 4, title: 'Send birthday wishes', priority: 'medium', dueDate: 'Today, 5:00 PM', status: 'pending' },
    { id: 5, title: 'Update CRM records', priority: 'low', dueDate: 'Today, End of day', status: 'in_progress' },
    { id: 6, title: 'Call Emma Wilson - policy renewal', priority: 'high', dueDate: 'Today, 6:00 PM', status: 'pending' },
    { id: 7, title: 'Process insurance claim for Robert Taylor', priority: 'high', dueDate: 'Today, 7:00 PM', status: 'pending' },
    { id: 8, title: 'Send policy renewal reminder to clients', priority: 'medium', dueDate: 'Today, 8:00 PM', status: 'pending' },
    { id: 9, title: 'Review new applications', priority: 'low', dueDate: 'Today, End of day', status: 'pending' },
    { id: 10, title: 'Update pipeline in CRM', priority: 'low', dueDate: 'Today, End of day', status: 'pending' },
    { id: 11, title: 'Prepare presentation for team meeting', priority: 'medium', dueDate: 'Today, End of day', status: 'pending' },
    { id: 12, title: 'Review compliance documents', priority: 'low', dueDate: 'Today, End of day', status: 'pending' },
  ];

  const mockAppointments = [
    { id: 1, client: 'Sarah Johnson', type: 'Policy Review', time: '2:00 PM', duration: '30 min', status: 'confirmed' },
    { id: 2, client: 'Sam Wright', type: 'Policy Review', time: '2:30 PM', duration: '45 min', status: 'confirmed' },
    { id: 3, client: 'David Lee', type: 'New Client Meeting', time: '3:30 PM', duration: '45 min', status: 'confirmed' },
    { id: 4, client: 'Robert Martinez', type: 'Claims Discussion', time: '4:30 PM', duration: '30 min', status: 'pending' },
  ];

  const mockLeads = [
    { id: 1, name: 'Jennifer Adams', source: 'Website', type: 'Life Insurance', rating: 'hot', phone: '(555) 234-5678' },
    { id: 2, name: 'Michael Brown', source: 'Referral', type: 'Auto Insurance', rating: 'warm', phone: '(555) 345-6789' },
    { id: 3, name: 'Lisa Garcia', source: 'Social Media', type: 'Home Insurance', rating: 'hot', phone: '(555) 456-7890' },
    { id: 4, name: 'James Wilson', source: 'Email Campaign', type: 'Business Insurance', rating: 'cold', phone: '(555) 567-8901' },
    { id: 5, name: 'Patricia Taylor', source: 'Walk-in', type: 'Health Insurance', rating: 'warm', phone: '(555) 678-9012' },
    { id: 6, name: 'Christopher Lee', source: 'Referral', type: 'Life Insurance', rating: 'hot', phone: '(555) 789-0123' },
    { id: 7, name: 'Amanda Martinez', source: 'Website', type: 'Auto Insurance', rating: 'warm', phone: '(555) 890-1234' },
    { id: 8, name: 'Daniel Anderson', source: 'Social Media', type: 'Home Insurance', rating: 'cold', phone: '(555) 901-2345' },
    { id: 9, name: 'Michelle White', source: 'Phone Inquiry', type: 'Business Insurance', rating: 'warm', phone: '(555) 012-3456' },
    { id: 10, name: 'Kevin Thomas', source: 'Website', type: 'Life Insurance', rating: 'hot', phone: '(555) 123-4567' },
    { id: 11, name: 'Laura Jackson', source: 'Referral', type: 'Health Insurance', rating: 'warm', phone: '(555) 234-5678' },
    { id: 12, name: 'Brian Harris', source: 'Email Campaign', type: 'Auto Insurance', rating: 'cold', phone: '(555) 345-6789' },
    { id: 13, name: 'Nicole Martin', source: 'Walk-in', type: 'Home Insurance', rating: 'warm', phone: '(555) 456-7890' },
    { id: 14, name: 'Steven Thompson', source: 'Social Media', type: 'Business Insurance', rating: 'hot', phone: '(555) 567-8901' },
    { id: 15, name: 'Jessica Garcia', source: 'Website', type: 'Life Insurance', rating: 'warm', phone: '(555) 678-9012' },
    { id: 16, name: 'Ryan Martinez', source: 'Referral', type: 'Health Insurance', rating: 'cold', phone: '(555) 789-0123' },
    { id: 17, name: 'Ashley Robinson', source: 'Phone Inquiry', type: 'Auto Insurance', rating: 'warm', phone: '(555) 890-1234' },
    { id: 18, name: 'Matthew Clark', source: 'Website', type: 'Home Insurance', rating: 'hot', phone: '(555) 901-2345' },
    { id: 19, name: 'Sarah Rodriguez', source: 'Email Campaign', type: 'Business Insurance', rating: 'warm', phone: '(555) 012-3456' },
    { id: 20, name: 'Joshua Lewis', source: 'Social Media', type: 'Life Insurance', rating: 'cold', phone: '(555) 123-4567' },
    { id: 21, name: 'Elizabeth Walker', source: 'Referral', type: 'Health Insurance', rating: 'hot', phone: '(555) 234-5678' },
    { id: 22, name: 'Andrew Hall', source: 'Website', type: 'Auto Insurance', rating: 'warm', phone: '(555) 345-6789' },
    { id: 23, name: 'Stephanie Allen', source: 'Walk-in', type: 'Home Insurance', rating: 'warm', phone: '(555) 456-7890' },
    { id: 24, name: 'Joseph Young', source: 'Phone Inquiry', type: 'Business Insurance', rating: 'hot', phone: '(555) 567-8901' },
  ];

  const mockOpportunities = [
    { id: 1, client: 'Sarah Johnson', type: 'Life Insurance Upgrade', value: '$120,000', stage: 'Proposal', probability: '75%' },
    { id: 2, client: 'Tech Solutions Inc', type: 'Business Insurance', value: '$250,000', stage: 'Negotiation', probability: '60%' },
    { id: 3, client: 'Mark Anderson', type: 'Auto Insurance', value: '$15,000', stage: 'Qualify', probability: '40%' },
    { id: 4, client: 'Emily Chen', type: 'Home Insurance', value: '$85,000', stage: 'Develop', probability: '55%' },
    { id: 5, client: 'Global Retail Corp', type: 'Commercial Property', value: '$500,000', stage: 'Proposal', probability: '80%' },
    { id: 6, client: 'David Mitchell', type: 'Life Insurance', value: '$95,000', stage: 'Develop', probability: '50%' },
    { id: 7, client: 'Creative Agency LLC', type: 'Business Insurance', value: '$180,000', stage: 'Proposal', probability: '70%' },
    { id: 8, client: 'Maria Santos', type: 'Health Insurance', value: '$45,000', stage: 'Qualify', probability: '35%' },
    { id: 9, client: 'Thompson Family', type: 'Home Insurance', value: '$120,000', stage: 'Negotiation', probability: '65%' },
    { id: 10, client: 'Retail Store Group', type: 'Commercial Property', value: '$350,000', stage: 'Develop', probability: '55%' },
    { id: 11, client: 'John Peterson', type: 'Auto Insurance', value: '$18,000', stage: 'Qualify', probability: '45%' },
    { id: 12, client: 'Medical Practice Inc', type: 'Business Insurance', value: '$200,000', stage: 'Proposal', probability: '75%' },
    { id: 13, client: 'Karen Williams', type: 'Life Insurance', value: '$110,000', stage: 'Negotiation', probability: '68%' },
    { id: 14, client: 'Manufacturing Corp', type: 'Commercial Property', value: '$650,000', stage: 'Develop', probability: '58%' },
    { id: 15, client: 'Robert Davis', type: 'Health Insurance', value: '$52,000', stage: 'Qualify', probability: '42%' },
  ];

  const stats = {
    tasksToday: mockTasks.length,
    tasksCompleted: mockTasks.filter(t => t.status === 'in_progress').length + 7, // 7 already completed
    appointmentsToday: mockAppointments.length,
    leadsActive: mockLeads.length,
    opportunitiesOpen: mockOpportunities.length
  };


  const completionRate = Math.round((stats.tasksCompleted / stats.tasksToday) * 100);

  const aiInsights = [
    {
      type: 'priority',
      icon: <Stars />,
      iconColor: colors.red,
      bgColor: alpha(colors.red, 0.08),
      title: 'High Priority',
      message: 'Follow up with John Smith - Policy renewal expires in 3 days',
      action: 'View Customer',
      priority: 'high',
      shouldNotify: true
    },
    {
      type: 'opportunity',
      icon: <TrendingUp />,
      iconColor: colors.green,
      bgColor: alpha(colors.green, 0.08),
      title: 'Personalized Recommendation',
      message: 'Sarah Johnson qualifies for life insurance upgrade based on recent life event',
      action: 'Create Opportunity',
      priority: 'medium',
      shouldNotify: true
    },
    {
      type: 'reminder',
      icon: <Cake />,
      iconColor: colors.orange,
      bgColor: alpha(colors.orange, 0.08),
      title: 'Special Occasion',
      message: 'Client birthday today: Michael Chen - Send wishes',
      action: 'Send Message',
      priority: 'medium',
      shouldNotify: false // This one we'll let the user trigger manually
    }
  ];

  // Push important insights to notifications on mount (only once ever)
  useEffect(() => {
    if (addNotification && !notificationsInitialized.current) {
      notificationsInitialized.current = true; // Mark as initialized

      aiInsights.forEach((insight) => {
        if (insight.shouldNotify) {
          // Add a small delay so they don't all appear at once
          const delay = aiInsights.indexOf(insight) * 500;
          setTimeout(() => {
            addNotification(
              insight.type === 'priority' ? 'warning' : insight.type,
              insight.title,
              insight.message,
              insight.priority,
              false // Don't show toast for these, only in notification panel
            );
          }, delay);
        }
      });
    }
  }, [addNotification]); // Run when addNotification is available

  const quickActions = [
    {
      icon: <Assignment />,
      label: 'New Task',
      color: colors.blue,
      bgColor: alpha(colors.blue, 0.1)
    },
    {
      icon: <Event />,
      label: 'Schedule',
      color: colors.green,
      bgColor: alpha(colors.green, 0.1)
    },
    {
      icon: <Phone />,
      label: 'Call Log',
      color: colors.orange,
      bgColor: alpha(colors.orange, 0.1)
    },
    {
      icon: <People />,
      label: 'Add Customer',
      color: colors.lightBlue,
      bgColor: alpha(colors.lightBlue, 0.1)
    }
  ];

  // Speak welcome message on load
  useEffect(() => {
    if (isEnabled && !window.__welcomeHasSpoken) {
      const firstName = userData.name.split(' ')[0];

      let motivation = '';
      if (completionRate >= 75) {
        motivation = "You're crushing it today! ";
      } else if (completionRate >= 50) {
        motivation = "You're making great progress! ";
      } else if (completionRate > 0) {
        motivation = "Keep up the good work! ";
      }

      const urgentTasks = 4;
      const urgentNote = urgentTasks > 0 ? ` Just a heads up, you have ${urgentTasks} urgent items that need your attention.` : '';
      const welcomeMessage = `${greeting} ${firstName}! ${motivation}You have ${stats.tasksToday} tasks on your plate today, and ${stats.appointmentsToday} appointments scheduled.${urgentNote} Let's make it a productive day!`;

      const timer = setTimeout(() => {
        speak(welcomeMessage);
        window.__welcomeHasSpoken = true;
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const speakInsight = (insight) => {
    const intros = [
      "Here's something important: ",
      "I wanted to let you know: ",
      "Quick heads up: ",
      "This needs your attention: ",
      "Don't forget: "
    ];
    const intro = getRandomResponse(intros);
    const message = `${intro}${insight.message}. ${insight.action}?`;
    speak(message);
  };

  const handleInsightAction = (insight) => {
    speakInsight(insight);

    // Handle different action types
    if (insight.action === 'Send Message' || (insight.type === 'reminder' && (insight.title.includes('Birthday') || insight.title.includes('Special Occasion')))) {
      // Open message composer for birthday wishes
      setMessageData({
        to: 'Michael Chen',
        subject: 'Happy Birthday!',
        message: 'Dear Michael,\n\nWishing you a wonderful birthday! It has been a pleasure working with you.\n\nBest regards,\n' + userData.name
      });
      setMessageModalOpen(true);

      if (addNotification) {
        addNotification('info', 'Message composer opened', 'Birthday message ready to send', 'low', true);
      }
    } else if (insight.type === 'priority') {
      // Open customer detail view
      setSelectedCustomer({
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        policyNumber: 'POL-2021-4567',
        policyType: 'Life Insurance',
        policyValue: '$85,000',
        renewalDate: '3 days',
        status: 'Active',
        yearsWithCompany: 12
      });
      setCustomerModalOpen(true);

      if (addNotification) {
        addNotification('task', 'Customer profile opened', 'Viewing John Smith details', 'low', true);
      }
    } else if (insight.type === 'opportunity') {
      // Open create opportunity form
      setOpportunityData({
        customer: 'Sarah Johnson',
        type: 'Life Insurance Upgrade',
        amount: '',
        notes: 'Customer recently had life event - now qualifies for upgrade'
      });
      setOpportunityModalOpen(true);

      if (addNotification) {
        addNotification('opportunity', 'Opportunity form opened', 'Creating opportunity for Sarah Johnson', 'low', true);
      }
    }
  };

  const handleCloseCustomerModal = () => {
    setCustomerModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleCloseOpportunityModal = () => {
    setOpportunityModalOpen(false);
    setOpportunityData({ customer: '', type: 'Life Insurance', amount: '', notes: '' });
  };

  const handleCloseMessageModal = () => {
    setMessageModalOpen(false);
    setMessageData({ to: '', subject: '', message: '' });
  };

  const handleCreateOpportunity = () => {
    if (addNotification) {
      addNotification(
        'success',
        'Opportunity created',
        `New ${opportunityData.type} opportunity created for ${opportunityData.customer}`,
        'medium',
        true
      );
    }
    speak('Opportunity has been created successfully');
    handleCloseOpportunityModal();
  };

  const handleSendMessage = () => {
    if (addNotification) {
      addNotification(
        'success',
        'Message sent',
        `Birthday wishes sent to ${messageData.to}`,
        'low',
        true
      );
    }
    speak('Your message has been sent successfully');
    handleCloseMessageModal();
  };

  // Quick Action handlers
  const handleQuickAction = (actionLabel) => {
    console.log('Quick action clicked:', actionLabel);
    switch (actionLabel) {
      case 'New Task':
        setNewTaskModalOpen(true);
        break;
      case 'Schedule':
        setScheduleModalOpen(true);
        break;
      case 'Call Log':
        setCallLogModalOpen(true);
        break;
      case 'Add Customer':
        setAddCustomerModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleCreateTask = () => {
    if (addNotification) {
      addNotification(
        'success',
        'Task created',
        `New task: ${newTaskData.title}`,
        'medium',
        true
      );
    }
    speak('Task has been created successfully');
    setNewTaskModalOpen(false);
    setNewTaskData({ title: '', priority: 'medium', dueDate: '', notes: '' });
  };

  const handleScheduleAppointment = () => {
    if (addNotification) {
      addNotification(
        'success',
        'Appointment scheduled',
        `${scheduleData.type} with ${scheduleData.client} on ${scheduleData.date}`,
        'medium',
        true
      );
    }
    speak('Appointment has been scheduled successfully');
    setScheduleModalOpen(false);
    setScheduleData({ client: '', type: 'Policy Review', date: '', time: '', duration: '30 min' });
  };

  const handleLogCall = () => {
    if (addNotification) {
      addNotification(
        'success',
        'Call logged',
        `${callLogData.direction} call with ${callLogData.client} logged`,
        'low',
        true
      );
    }
    speak('Call has been logged successfully');
    setCallLogModalOpen(false);
    setCallLogData({ client: '', direction: 'outbound', duration: '', notes: '' });
  };

  const handleAddCustomer = () => {
    if (addNotification) {
      addNotification(
        'success',
        'Customer added',
        `${newCustomerData.name} added to your customer list`,
        'medium',
        true
      );
    }
    speak('Customer has been added successfully');
    setAddCustomerModalOpen(false);
    setNewCustomerData({ name: '', email: '', phone: '', interest: 'Life Insurance' });
  };

  const speakDailySummary = () => {
    let performance = '';
    if (completionRate >= 80) {
      performance = "Wow! You're absolutely crushing it today. ";
    } else if (completionRate >= 60) {
      performance = "Great job! You're doing really well. ";
    } else if (completionRate >= 40) {
      performance = "You're making solid progress. ";
    } else {
      performance = "Let's focus on getting these tasks done. ";
    }

    const summary = `Alright, here's your daily overview. ${performance}You've completed ${stats.tasksCompleted} out of ${stats.tasksToday} tasks, that's ${completionRate} percent done. Looking at your calendar, you have ${stats.appointmentsToday} appointments scheduled for today. On the sales side, you're managing ${stats.leadsActive} active leads and ${stats.opportunitiesOpen} open opportunities, with a pipeline value of four hundred and fifty thousand dollars. You've got this!`;
    speak(summary);
  };

  // Initialize search voice recognition
  React.useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      searchRecognitionRef.current = new SpeechRecognition();
      searchRecognitionRef.current.continuous = false;
      searchRecognitionRef.current.interimResults = false;
      searchRecognitionRef.current.lang = 'en-US';

      searchRecognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchInput(transcript);
        setIsSearchListening(false);
        processSearchCommand(transcript);
      };

      searchRecognitionRef.current.onerror = (event) => {
        console.error('Search voice recognition error:', event.error);
        setIsSearchListening(false);
      };

      searchRecognitionRef.current.onend = () => {
        setIsSearchListening(false);
      };
    }

    return () => {
      if (searchRecognitionRef.current) {
        searchRecognitionRef.current.stop();
      }
    };
  }, []);

  // Handle search voice button click
  const handleSearchVoiceClick = () => {
    if (searchRecognitionRef.current && !isSearchListening) {
      setIsSearchListening(true);
      searchRecognitionRef.current.start();
    } else if (isSearchListening) {
      searchRecognitionRef.current.stop();
      setIsSearchListening(false);
    }
  };

  // Process search command
  const processSearchCommand = (command) => {
    const lowerCommand = command.toLowerCase().trim();
    const originalCommand = command.trim();

    console.log('🔍 Processing search command:', originalCommand);

    // Check for client review prep pattern
    if (lowerCommand.includes('prep me for') || lowerCommand.includes('prepare for') ||
        lowerCommand.includes('client review') || lowerCommand.includes('meeting prep') ||
        (lowerCommand.includes('prep') && (lowerCommand.includes('meeting') || lowerCommand.includes('client')))) {

      console.log('✅ Client review prep pattern matched!');

      // Extract meeting time (e.g., "2:30", "3pm", "10:00 AM")
      const timePatterns = [
        /(\d{1,2}:\d{2}(?:\s*[ap]m)?)/i,
        /(\d{1,2}\s*[ap]m)/i,
      ];

      let meetingTime = '2:30 PM'; // Default
      for (const pattern of timePatterns) {
        const match = originalCommand.match(pattern);
        if (match && match[1]) {
          meetingTime = match[1].trim();
          console.log('✅ Extracted meeting time:', meetingTime);
          break;
        }
      }

      // Extract customer name if mentioned - Enhanced patterns
      let customerName = 'Sam Wright'; // Default
      const namePatterns = [
        // "prep me for John Smith at 2:30"
        /(?:prep\s+(?:me\s+)?for|prepare\s+for)\s+(?:my\s+)?([a-z][a-z\s]+?)(?:\s+at\s+\d|\s+meeting|\s+review|\s*$)/i,
        // "client review for John Smith"
        /client\s+review\s+(?:for\s+)?([a-z][a-z\s]+?)(?:\s+at\s+\d|\s+meeting|\s*$)/i,
        // "meeting prep for John Smith"
        /meeting\s+(?:prep|preparation)\s+(?:for\s+)?([a-z][a-z\s]+?)(?:\s+at\s+\d|\s+meeting|\s*$)/i,
        // "prep for my 2:30 with John Smith"
        /prep.*?(?:with|meeting\s+with)\s+([a-z][a-z\s]+?)(?:\s+at|\s*$)/i,
        // "John Smith meeting at 2:30" or "John Smith at 2:30"
        /^([a-z][a-z\s]+?)\s+(?:meeting|review|client|at)\s+\d/i,
      ];

      for (const pattern of namePatterns) {
        const match = originalCommand.match(pattern);
        if (match && match[1]) {
          const extractedName = match[1].trim();
          // Filter out common words that aren't names
          const filterWords = ['my', 'the', 'client', 'meeting', 'review', 'prep', 'for', 'at', 'with'];
          const nameWords = extractedName.split(' ')
            .filter(word => word.length > 0 && !filterWords.includes(word.toLowerCase()));

          if (nameWords.length > 0) {
            // Capitalize first letter of each word
            customerName = nameWords
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ');
            console.log('✅ Extracted customer name:', customerName);
            break;
          }
        }
      }

      const params = {
        clientName: customerName,
        meetingTime: meetingTime,
      };

      console.log('📋 Client review prep params extracted:', params);

      speak(`Preparing comprehensive client review for ${customerName} at ${meetingTime}`);

      // Navigate to client review prep screen
      console.log('🚀 Calling onNavigateToModule with:', 'client-review-prep', params);
      if (onNavigateToModule) {
        onNavigateToModule('client-review-prep', params);
      } else {
        console.error('❌ onNavigateToModule is not defined!');
      }
      setSearchInput('');
      return;
    }

    // Check for illustration pattern
    if (lowerCommand.includes('illustration') || lowerCommand.includes('run illustration') ||
        lowerCommand.includes('policy projection') || lowerCommand.includes('show illustration') ||
        (lowerCommand.includes('withdrawal') && (lowerCommand.includes('age') || lowerCommand.includes('monthly')))) {

      console.log('✅ Illustration pattern matched!');

      // Extract customer name from command
      let customerName = 'John Smith'; // Default

      // Patterns to extract name: "run illustration for [name]" or "illustration for [name]"
      const namePatterns = [
        /(?:run\s+)?illustration\s+for\s+([a-z\s]+?)(?:\s+at\s+age|\s+with|\s*$)/i,
        /(?:show\s+)?illustration\s+for\s+([a-z\s]+?)(?:\s+at\s+age|\s+with|\s*$)/i,
        /(?:policy\s+)?projection\s+for\s+([a-z\s]+?)(?:\s+at\s+age|\s+with|\s*$)/i,
      ];

      for (const pattern of namePatterns) {
        const match = originalCommand.match(pattern);
        if (match && match[1]) {
          customerName = match[1].trim();
          // Capitalize first letter of each word
          customerName = customerName.split(' ')
            .filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          console.log('✅ Extracted customer name:', customerName);
          break;
        }
      }

      // Extract parameters from command
      const ageMatch = originalCommand.match(/age (\d+)/i);

      // Extract withdrawal amount - look for dollar amount after "with", "withdrawals", etc.
      const withdrawalPatterns = [
        /with\s+\$?(\d+(?:,\d{3})*)\s*(?:monthly|withdrawals?|per month)?/i,
        /\$(\d+(?:,\d{3})*)\s+(?:monthly|withdrawals?|per month)/i,
        /withdrawals?\s+(?:of\s+)?\$?(\d+(?:,\d{3})*)/i,
      ];

      let withdrawalAmount = 2000; // Default
      for (const pattern of withdrawalPatterns) {
        const match = originalCommand.match(pattern);
        if (match && match[1]) {
          withdrawalAmount = parseInt(match[1].replace(/,/g, ''));
          console.log('✅ Extracted withdrawal amount:', withdrawalAmount);
          break;
        }
      }

      const params = {
        customerName: customerName,
        age: ageMatch ? parseInt(ageMatch[1]) : 65,
        monthlyWithdrawal: withdrawalAmount,
      };

      console.log('📊 Illustration params extracted:', params);

      speak(`Generating policy illustration for ${customerName} at age ${params.age} with $${params.monthlyWithdrawal.toLocaleString()} monthly withdrawals`);

      // Navigate to illustration workflow
      console.log('🚀 Calling onNavigateToModule with:', 'illustration-workflow', params);
      if (onNavigateToModule) {
        onNavigateToModule('illustration-workflow', params);
      } else {
        console.error('❌ onNavigateToModule is not defined!');
      }
      setSearchInput('');
      return;
    }

    // Check for birthday wishes pattern
    if (lowerCommand.includes('birthday')) {
      // Extract customer name with more flexible patterns
      let customerName = 'Sam Wright'; // Default

      const patterns = [
        // "send birthday wishes to john smith"
        /(?:send\s+)?birthday\s+(?:wishes|message|card|greetings?)\s+(?:to\s+)?(.+)/i,
        // "birthday to john smith"
        /birthday\s+to\s+(.+)/i,
        // "send birthday to john smith"
        /send\s+(?:a\s+)?birthday\s+to\s+(.+)/i,
        // More flexible: any text after "birthday" with common keywords
        /birthday.*?(?:to|for)\s+([a-z\s]+?)(?:\s*$)/i,
      ];

      for (const pattern of patterns) {
        const match = originalCommand.match(pattern);
        if (match && match[1]) {
          customerName = match[1].trim();

          // Clean up any trailing words that aren't part of the name
          customerName = customerName.replace(/\s+(please|now|today|tomorrow)$/i, '');

          // Capitalize first letter of each word
          customerName = customerName.split(' ')
            .filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

          console.log('✅ Extracted customer name:', customerName);
          break;
        }
      }

      speak(`Preparing birthday outreach for ${customerName}`);
      onNavigateToDemo(customerName);
      setSearchInput('');
      return;
    }

    // If no pattern matched, show a helpful message
    speak("I didn't understand that command. Try saying 'run illustration' or 'send birthday wishes to' followed by a name.");
  };

  // Handle search input submit (Enter key)
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      processSearchCommand(searchInput);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', py: 3 }}>
      <Container maxWidth="lg">
        {/* Welcome Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Roboto Slab, serif',
              fontWeight: 700,
              color: colors.blue,
              mb: 0.5
            }}
          >
            {greeting}, {userData.name.split(' ')[0]}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your work today
          </Typography>
        </Box>

        {/* Productivity Overview Card */}
        <Card
          elevation={0}
          sx={{
            mb: 4,
            background: colors.paleAqua,
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            border: `1px solid ${alpha(colors.blue, 0.15)}`,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CheckCircle sx={{ fontSize: 32, mr: 1.5, color: colors.blue }} />
              <Typography variant="h5" sx={{ color: colors.blue, fontWeight: 600 }}>
                Today's Progress
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {stats.tasksCompleted} of {stats.tasksToday} tasks completed
                </Typography>
                <Typography variant="h6" sx={{ color: '#000000', fontWeight: 700 }}>
                  {completionRate}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={completionRate}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: alpha(colors.blue, 0.15),
                  '& .MuiLinearProgress-bar': {
                    bgcolor: colors.blue,
                    borderRadius: 5,
                  }
                }}
              />
            </Box>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Great progress! Keep up the momentum 🚀
            </Typography>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'space-evenly' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              onClick={() => setTasksModalOpen(true)}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(colors.blue, 0.1)}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${alpha(colors.blue, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha(colors.blue, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Assignment sx={{ color: colors.blue, fontSize: 24 }} />
                  </Box>
                  <Chip
                    label="4 urgent"
                    size="small"
                    sx={{
                      bgcolor: alpha(colors.red, 0.1),
                      color: '#000000',
                      border: `1px solid ${alpha(colors.red, 0.3)}`,
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: '#000000' }}>
                  {stats.tasksToday}
                </Typography>
                <Typography variant="body2" color="text.secondary">Tasks Due Today</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              onClick={() => setAppointmentsModalOpen(true)}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(colors.green, 0.1)}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${alpha(colors.green, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha(colors.green, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Event sx={{ color: colors.green, fontSize: 24 }} />
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: '#000000' }}>
                  {stats.appointmentsToday}
                </Typography>
                <Typography variant="body2" color="text.secondary">Appointments</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              onClick={() => setLeadsModalOpen(true)}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(colors.orange, 0.1)}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${alpha(colors.orange, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha(colors.orange, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <People sx={{ color: colors.orange, fontSize: 24 }} />
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: '#000000' }}>
                  {stats.leadsActive}
                </Typography>
                <Typography variant="body2" color="text.secondary">Active Leads</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              onClick={() => setOpportunitiesModalOpen(true)}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(colors.lightGreen, 0.1)}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${alpha(colors.lightGreen, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha(colors.lightGreen, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AttachMoney sx={{ color: colors.lightGreen, fontSize: 24 }} />
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: '#000000' }}>
                  {stats.opportunitiesOpen}
                </Typography>
                <Typography variant="body2" color="text.secondary">Opportunities</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search & Command Card */}
        <Card
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 4,
            border: `1px solid ${alpha(colors.blue, 0.15)}`,
            background: '#FFFFFF',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <Lightbulb sx={{ color: colors.lightBlue, fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: colors.blue }}>
                  Ask or Search
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type or use voice to search, create tasks, or get information
                </Typography>
              </Box>
            </Box>

            <TextField
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Type your request or click the mic to speak... (e.g., 'Prep me for John Smith meeting at 4' or 'Client review for David')"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  fontSize: '1rem',
                  pr: 1,
                  '&:hover fieldset': {
                    borderColor: alpha(colors.lightBlue, 0.4),
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: alpha(colors.blue, 0.6),
                    borderWidth: 1,
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleSearchVoiceClick}
                    sx={{
                      bgcolor: isSearchListening
                        ? alpha(colors.red, 0.2)
                        : alpha(colors.lightBlue, 0.1),
                      width: 40,
                      height: 40,
                      '&:hover': {
                        bgcolor: isSearchListening
                          ? alpha(colors.red, 0.3)
                          : alpha(colors.lightBlue, 0.2),
                      },
                    }}
                  >
                    {isSearchListening ? (
                      <Mic sx={{ color: colors.red, fontSize: 20 }} />
                    ) : (
                      <Mic sx={{ color: colors.lightBlue, fontSize: 20 }} />
                    )}
                  </IconButton>
                ),
              }}
            />

            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              <Chip
                label="Create task"
                size="small"
                sx={{
                  bgcolor: alpha(colors.green, 0.1),
                  color: '#000000',
                  border: `1px solid ${alpha(colors.green, 0.3)}`,
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: alpha(colors.green, 0.15),
                  },
                }}
              />
              <Chip
                label="Schedule appointment"
                size="small"
                sx={{
                  bgcolor: alpha(colors.orange, 0.1),
                  color: '#000000',
                  border: `1px solid ${alpha(colors.orange, 0.3)}`,
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: alpha(colors.orange, 0.15),
                  },
                }}
              />
              <Chip
                label="Find customer"
                size="small"
                sx={{
                  bgcolor: alpha(colors.blue, 0.1),
                  color: '#000000',
                  border: `1px solid ${alpha(colors.blue, 0.3)}`,
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: alpha(colors.blue, 0.15),
                  },
                }}
              />
              <Chip
                label="View analytics"
                size="small"
                sx={{
                  bgcolor: alpha(colors.lightGreen, 0.1),
                  color: '#000000',
                  border: `1px solid ${alpha(colors.lightGreen, 0.3)}`,
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: alpha(colors.lightGreen, 0.15),
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Proactive Insights */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Lightbulb sx={{ color: colors.orange, fontSize: 28, mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Proactive Insights
              </Typography>
              <Chip
                label="Data-Driven"
                size="small"
                sx={{
                  ml: 1.5,
                  bgcolor: alpha(colors.orange, 0.1),
                  color: colors.orange,
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Read daily summary">
                <IconButton
                  size="small"
                  onClick={speakDailySummary}
                  sx={{
                    bgcolor: alpha(colors.lightBlue, 0.1),
                    '&:hover': { bgcolor: alpha(colors.lightBlue, 0.2) },
                  }}
                >
                  <VolumeUp sx={{ color: colors.lightBlue, fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={isEnabled ? "Voice enabled" : "Voice disabled"}>
                <IconButton
                  size="small"
                  onClick={toggleEnabled}
                  sx={{
                    bgcolor: alpha(isEnabled ? colors.green : colors.red, 0.1),
                    '&:hover': { bgcolor: alpha(isEnabled ? colors.green : colors.red, 0.2) },
                  }}
                >
                  {isEnabled ? (
                    <VolumeUp sx={{ color: colors.green, fontSize: 18 }} />
                  ) : (
                    <VolumeOff sx={{ color: colors.red, fontSize: 18 }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {aiInsights.map((insight, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                mb: 2,
                borderRadius: 3,
                border: `1px solid ${alpha(insight.iconColor, 0.2)}`,
                background: '#FFFFFF',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(8px)',
                  boxShadow: `0 4px 16px ${alpha(insight.iconColor, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: alpha(insight.iconColor, 0.08),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {React.cloneElement(insight.icon, { sx: { color: insight.iconColor, fontSize: 28 } })}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      {insight.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {insight.message}
                    </Typography>
                    <Box
                      onClick={() => handleInsightAction(insight)}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: insight.iconColor,
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {insight.action}
                      <ArrowForward sx={{ fontSize: 16, ml: 0.5 }} />
                    </Box>
                  </Box>
                  <Tooltip title="Read aloud">
                    <IconButton
                      size="small"
                      onClick={() => speakInsight(insight)}
                      sx={{
                        bgcolor: alpha(insight.iconColor, 0.1),
                        '&:hover': { bgcolor: alpha(insight.iconColor, 0.2) },
                      }}
                    >
                      <VolumeUp sx={{ fontSize: 18, color: insight.iconColor }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Quick Actions */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${alpha(colors.lightBlue, 0.2)}`,
            mb: 8,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2} sx={{ justifyContent: 'space-evenly' }}>
              {quickActions.map((action, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Paper
                    elevation={0}
                    onClick={() => handleQuickAction(action.label)}
                    sx={{
                      p: 2.5,
                      textAlign: 'center',
                      cursor: 'pointer',
                      bgcolor: action.bgColor,
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      border: `1px solid transparent`,
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 24px ${alpha(action.color, 0.2)}`,
                        border: `1px solid ${alpha(action.color, 0.3)}`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: alpha(action.color, 0.15),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 1.5,
                      }}
                    >
                      {React.cloneElement(action.icon, { sx: { color: action.color, fontSize: 28 } })}
                    </Box>
                    <Typography variant="body2" fontWeight={600}>
                      {action.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Customer Detail Modal */}
        <Dialog
          open={customerModalOpen}
          onClose={handleCloseCustomerModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountCircle sx={{ color: colors.blue, fontSize: 28 }} />
                <Typography variant="h6">Customer Profile</Typography>
              </Box>
              <IconButton onClick={handleCloseCustomerModal} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedCustomer && (
              <Stack spacing={2} sx={{ mt: 1 }}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `2px solid ${alpha(colors.lightBlue, 0.3)}`, borderRadius: 2 }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {selectedCustomer.name}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Email sx={{ color: colors.blue }} /></ListItemIcon>
                      <ListItemText primary={selectedCustomer.email} secondary="Email" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Phone sx={{ color: colors.green }} /></ListItemIcon>
                      <ListItemText primary={selectedCustomer.phone} secondary="Phone" />
                    </ListItem>
                  </List>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: `2px solid ${alpha(colors.orange, 0.3)}`, borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Policy sx={{ color: colors.orange }} />
                    Policy Information
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">Policy Number</Typography>
                      <Typography variant="body2" fontWeight={600}>{selectedCustomer.policyNumber}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">Type</Typography>
                      <Typography variant="body2" fontWeight={600}>{selectedCustomer.policyType}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">Value</Typography>
                      <Typography variant="body2" fontWeight={600} color={colors.green}>{selectedCustomer.policyValue}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">Status</Typography>
                      <Chip label={selectedCustomer.status} size="small" color="success" />
                    </Grid>
                  </Grid>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `2px solid ${colors.red}`, borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight={700} color={colors.red} gutterBottom>
                    ⚠️ Renewal Alert
                  </Typography>
                  <Typography variant="body2">
                    Policy renewal expires in <strong>{selectedCustomer.renewalDate}</strong>
                  </Typography>
                </Paper>
              </Stack>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseCustomerModal}>Close</Button>
            <Button variant="contained" onClick={() => speak('Initiating follow-up with ' + selectedCustomer?.name)}>
              Schedule Follow-up
            </Button>
          </DialogActions>
        </Dialog>

        {/* Create Opportunity Modal */}
        <Dialog
          open={opportunityModalOpen}
          onClose={handleCloseOpportunityModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp sx={{ color: colors.green, fontSize: 28 }} />
                <Typography variant="h6">Create Opportunity</Typography>
              </Box>
              <IconButton onClick={handleCloseOpportunityModal} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Customer Name"
                fullWidth
                value={opportunityData.customer}
                onChange={(e) => setOpportunityData({ ...opportunityData, customer: e.target.value })}
                InputProps={{
                  startAdornment: <AccountCircle sx={{ mr: 1, color: colors.blue }} />
                }}
              />
              <FormControl fullWidth>
                <InputLabel>Opportunity Type</InputLabel>
                <Select
                  value={opportunityData.type}
                  label="Opportunity Type"
                  onChange={(e) => setOpportunityData({ ...opportunityData, type: e.target.value })}
                >
                  <MenuItem value="Life Insurance">Life Insurance</MenuItem>
                  <MenuItem value="Life Insurance Upgrade">Life Insurance Upgrade</MenuItem>
                  <MenuItem value="Health Insurance">Health Insurance</MenuItem>
                  <MenuItem value="Auto Insurance">Auto Insurance</MenuItem>
                  <MenuItem value="Home Insurance">Home Insurance</MenuItem>
                  <MenuItem value="Business Insurance">Business Insurance</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Estimated Amount"
                fullWidth
                value={opportunityData.amount}
                onChange={(e) => setOpportunityData({ ...opportunityData, amount: e.target.value })}
                placeholder="$50,000"
                InputProps={{
                  startAdornment: <AttachMoney sx={{ color: colors.green }} />
                }}
              />
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={4}
                value={opportunityData.notes}
                onChange={(e) => setOpportunityData({ ...opportunityData, notes: e.target.value })}
                placeholder="Additional details about this opportunity..."
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseOpportunityModal}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleCreateOpportunity}>
              Create Opportunity
            </Button>
          </DialogActions>
        </Dialog>

        {/* Send Message Modal */}
        <Dialog
          open={messageModalOpen}
          onClose={handleCloseMessageModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Send sx={{ color: colors.lightBlue, fontSize: 28 }} />
                <Typography variant="h6">Send Message</Typography>
              </Box>
              <IconButton onClick={handleCloseMessageModal} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="To"
                fullWidth
                value={messageData.to}
                onChange={(e) => setMessageData({ ...messageData, to: e.target.value })}
                InputProps={{
                  startAdornment: <AccountCircle sx={{ mr: 1, color: colors.blue }} />
                }}
              />
              <TextField
                label="Subject"
                fullWidth
                value={messageData.subject}
                onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
              />
              <TextField
                label="Message"
                fullWidth
                multiline
                rows={8}
                value={messageData.message}
                onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                placeholder="Type your message here..."
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseMessageModal}>Cancel</Button>
            <Button
              variant="contained"
              startIcon={<Send />}
              onClick={handleSendMessage}
              sx={{
                bgcolor: colors.blue,
              }}
            >
              Send Message
            </Button>
          </DialogActions>
        </Dialog>

        {/* Tasks Modal */}
        <Dialog open={tasksModalOpen} onClose={() => setTasksModalOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assignment sx={{ color: colors.blue, fontSize: 28 }} />
                <Typography variant="h6">Tasks Due Today ({mockTasks.length})</Typography>
              </Box>
              <IconButton onClick={() => setTasksModalOpen(false)} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <List>
              {mockTasks.map((task, index) => (
                <React.Fragment key={task.id}>
                  <ListItem
                    sx={{
                      borderLeft: `4px solid ${
                        task.priority === 'high' ? colors.red :
                        task.priority === 'medium' ? colors.orange : colors.lightGreen
                      }`,
                      mb: 1,
                      bgcolor: '#FFFFFF',
                      border: `1px solid ${alpha(colors.blue, 0.15)}`,
                      borderRadius: 2,
                    }}
                  >
                    <ListItemIcon>
                      <CheckCircle sx={{ color: task.status === 'in_progress' ? colors.orange : colors.blue }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={task.title}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip
                            label={task.priority.toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: task.priority === 'high' ? alpha(colors.red, 0.15) :
                                      task.priority === 'medium' ? alpha(colors.orange, 0.15) :
                                      alpha(colors.lightGreen, 0.15),
                              color: task.priority === 'high' ? colors.red :
                                     task.priority === 'medium' ? colors.orange : colors.green,
                            }}
                          />
                          <Chip label={task.dueDate} size="small" icon={<AccessTime />} />
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < mockTasks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        {/* Appointments Modal */}
        <Dialog open={appointmentsModalOpen} onClose={() => setAppointmentsModalOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Event sx={{ color: colors.green, fontSize: 28 }} />
                <Typography variant="h6">Today's Appointments ({mockAppointments.length})</Typography>
              </Box>
              <IconButton onClick={() => setAppointmentsModalOpen(false)} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <List>
              {mockAppointments.map((apt, index) => (
                <React.Fragment key={apt.id}>
                  <ListItem
                    sx={{
                      borderLeft: `4px solid ${colors.green}`,
                      mb: 1,
                      bgcolor: '#FFFFFF',
                      border: `1px solid ${alpha(colors.green, 0.15)}`,
                      borderRadius: 2,
                    }}
                  >
                    <ListItemIcon>
                      <Event sx={{ color: colors.green }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" fontWeight={600}>{apt.client}</Typography>
                          <Typography variant="h6" color="#000000" fontWeight={700}>{apt.time}</Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip
                            label={apt.type}
                            size="small"
                            sx={{
                              bgcolor: alpha(colors.blue, 0.1),
                              color: '#000000',
                              border: `1px solid ${alpha(colors.blue, 0.3)}`,
                              fontWeight: 600,
                            }}
                          />
                          <Chip
                            label={apt.duration}
                            size="small"
                            icon={<AccessTime sx={{ color: colors.lightBlue }} />}
                            sx={{
                              bgcolor: alpha(colors.lightBlue, 0.1),
                              color: '#000000',
                              border: `1px solid ${alpha(colors.lightBlue, 0.3)}`,
                              fontWeight: 600,
                              '& .MuiChip-icon': {
                                color: colors.lightBlue,
                              },
                            }}
                          />
                          <Chip
                            label={apt.status}
                            size="small"
                            sx={{
                              bgcolor: apt.status === 'confirmed' ? alpha(colors.green, 0.1) : alpha(colors.orange, 0.1),
                              color: '#000000',
                              border: `1px solid ${apt.status === 'confirmed' ? alpha(colors.green, 0.3) : alpha(colors.orange, 0.3)}`,
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < mockAppointments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        {/* Leads Modal */}
        <Dialog open={leadsModalOpen} onClose={() => setLeadsModalOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <People sx={{ color: colors.orange, fontSize: 28 }} />
                <Typography variant="h6">Active Leads ({mockLeads.length})</Typography>
              </Box>
              <IconButton onClick={() => setLeadsModalOpen(false)} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <List>
              {mockLeads.map((lead, index) => (
                <React.Fragment key={lead.id}>
                  <ListItem
                    sx={{
                      borderLeft: `4px solid ${
                        lead.rating === 'hot' ? colors.red :
                        lead.rating === 'warm' ? colors.orange : colors.lightBlue
                      }`,
                      mb: 1,
                      bgcolor: '#FFFFFF',
                      border: `1px solid ${alpha(colors.orange, 0.15)}`,
                      borderRadius: 2,
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircle sx={{ color: colors.orange, fontSize: 40 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight={600}>{lead.name}</Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                          <Chip
                            label={lead.rating.toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: lead.rating === 'hot' ? alpha(colors.red, 0.1) :
                                      lead.rating === 'warm' ? alpha(colors.orange, 0.1) :
                                      alpha(colors.lightBlue, 0.1),
                              color: '#000000',
                              border: `1px solid ${lead.rating === 'hot' ? alpha(colors.red, 0.3) :
                                     lead.rating === 'warm' ? alpha(colors.orange, 0.3) : alpha(colors.lightBlue, 0.3)}`,
                              fontWeight: 700,
                            }}
                          />
                          <Chip
                            label={lead.type}
                            size="small"
                            sx={{
                              bgcolor: alpha(colors.blue, 0.1),
                              color: '#000000',
                              border: `1px solid ${alpha(colors.blue, 0.3)}`,
                              fontWeight: 600,
                            }}
                          />
                          <Chip
                            label={lead.source}
                            size="small"
                            icon={<TrendingUp sx={{ color: colors.green }} />}
                            sx={{
                              bgcolor: alpha(colors.green, 0.1),
                              color: '#000000',
                              border: `1px solid ${alpha(colors.green, 0.3)}`,
                              fontWeight: 600,
                              '& .MuiChip-icon': {
                                color: colors.green,
                              },
                            }}
                          />
                          <Chip
                            label={lead.phone}
                            size="small"
                            icon={<Phone sx={{ color: colors.lightBlue }} />}
                            sx={{
                              bgcolor: alpha(colors.lightBlue, 0.1),
                              color: '#000000',
                              border: `1px solid ${alpha(colors.lightBlue, 0.3)}`,
                              fontWeight: 600,
                              '& .MuiChip-icon': {
                                color: colors.lightBlue,
                              },
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < mockLeads.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        {/* Opportunities Modal */}
        <Dialog open={opportunitiesModalOpen} onClose={() => setOpportunitiesModalOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachMoney sx={{ color: colors.lightGreen, fontSize: 28 }} />
                <Typography variant="h6">Open Opportunities ({mockOpportunities.length})</Typography>
              </Box>
              <IconButton onClick={() => setOpportunitiesModalOpen(false)} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <List>
              {mockOpportunities.map((opp, index) => (
                <React.Fragment key={opp.id}>
                  <ListItem
                    sx={{
                      borderLeft: `4px solid ${colors.lightGreen}`,
                      mb: 1,
                      bgcolor: '#FFFFFF',
                      border: `1px solid ${alpha(colors.lightGreen, 0.15)}`,
                      borderRadius: 2,
                    }}
                  >
                    <ListItemIcon>
                      <TrendingUp sx={{ color: colors.lightGreen, fontSize: 32 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" fontWeight={600}>{opp.client}</Typography>
                          <Typography variant="h6" color="#000000" fontWeight={700}>{opp.value}</Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                          <Chip
                            label={opp.type}
                            size="small"
                            sx={{
                              bgcolor: alpha(colors.orange, 0.1),
                              color: '#000000',
                              border: `1px solid ${alpha(colors.orange, 0.3)}`,
                              fontWeight: 600,
                            }}
                          />
                          <Chip
                            label={opp.stage}
                            size="small"
                            sx={{
                              bgcolor: alpha(colors.lightBlue, 0.1),
                              color: '#000000',
                              border: `1px solid ${alpha(colors.lightBlue, 0.3)}`,
                              fontWeight: 600,
                            }}
                          />
                          <Chip
                            label={`${opp.probability} probability`}
                            size="small"
                            sx={{
                              bgcolor: alpha(colors.green, 0.1),
                              color: '#000000',
                              border: `1px solid ${alpha(colors.green, 0.3)}`,
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < mockOpportunities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        {/* New Task Modal */}
        <Dialog open={newTaskModalOpen} onClose={() => setNewTaskModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assignment sx={{ color: colors.blue, fontSize: 28 }} />
                <Typography variant="h6">Create New Task</Typography>
              </Box>
              <IconButton onClick={() => setNewTaskModalOpen(false)} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Task Title"
                fullWidth
                value={newTaskData.title}
                onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
                placeholder="e.g., Follow up with client"
              />
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newTaskData.priority}
                  label="Priority"
                  onChange={(e) => setNewTaskData({ ...newTaskData, priority: e.target.value })}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Due Date"
                type="date"
                fullWidth
                value={newTaskData.dueDate}
                onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={3}
                value={newTaskData.notes}
                onChange={(e) => setNewTaskData({ ...newTaskData, notes: e.target.value })}
                placeholder="Additional details..."
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setNewTaskModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleCreateTask} disabled={!newTaskData.title}>
              Create Task
            </Button>
          </DialogActions>
        </Dialog>

        {/* Schedule Appointment Modal */}
        <Dialog open={scheduleModalOpen} onClose={() => setScheduleModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Event sx={{ color: colors.green, fontSize: 28 }} />
                <Typography variant="h6">Schedule Appointment</Typography>
              </Box>
              <IconButton onClick={() => setScheduleModalOpen(false)} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Client Name"
                fullWidth
                value={scheduleData.client}
                onChange={(e) => setScheduleData({ ...scheduleData, client: e.target.value })}
                placeholder="e.g., John Smith"
              />
              <FormControl fullWidth>
                <InputLabel>Appointment Type</InputLabel>
                <Select
                  value={scheduleData.type}
                  label="Appointment Type"
                  onChange={(e) => setScheduleData({ ...scheduleData, type: e.target.value })}
                >
                  <MenuItem value="Policy Review">Policy Review</MenuItem>
                  <MenuItem value="New Client Meeting">New Client Meeting</MenuItem>
                  <MenuItem value="Claims Discussion">Claims Discussion</MenuItem>
                  <MenuItem value="Quote Presentation">Quote Presentation</MenuItem>
                  <MenuItem value="Follow-up Call">Follow-up Call</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Date"
                type="date"
                fullWidth
                value={scheduleData.date}
                onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Time"
                type="time"
                fullWidth
                value={scheduleData.time}
                onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={scheduleData.duration}
                  label="Duration"
                  onChange={(e) => setScheduleData({ ...scheduleData, duration: e.target.value })}
                >
                  <MenuItem value="15 min">15 minutes</MenuItem>
                  <MenuItem value="30 min">30 minutes</MenuItem>
                  <MenuItem value="45 min">45 minutes</MenuItem>
                  <MenuItem value="1 hour">1 hour</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setScheduleModalOpen(false)}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleScheduleAppointment} disabled={!scheduleData.client || !scheduleData.date}>
              Schedule
            </Button>
          </DialogActions>
        </Dialog>

        {/* Call Log Modal */}
        <Dialog open={callLogModalOpen} onClose={() => setCallLogModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: colors.orange, fontSize: 28 }} />
                <Typography variant="h6">Log Call</Typography>
              </Box>
              <IconButton onClick={() => setCallLogModalOpen(false)} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Client Name"
                fullWidth
                value={callLogData.client}
                onChange={(e) => setCallLogData({ ...callLogData, client: e.target.value })}
                placeholder="e.g., Sarah Johnson"
              />
              <FormControl fullWidth>
                <InputLabel>Call Direction</InputLabel>
                <Select
                  value={callLogData.direction}
                  label="Call Direction"
                  onChange={(e) => setCallLogData({ ...callLogData, direction: e.target.value })}
                >
                  <MenuItem value="inbound">Inbound (Received)</MenuItem>
                  <MenuItem value="outbound">Outbound (Made)</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Duration (minutes)"
                type="number"
                fullWidth
                value={callLogData.duration}
                onChange={(e) => setCallLogData({ ...callLogData, duration: e.target.value })}
                placeholder="e.g., 15"
              />
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={4}
                value={callLogData.notes}
                onChange={(e) => setCallLogData({ ...callLogData, notes: e.target.value })}
                placeholder="What was discussed..."
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setCallLogModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleLogCall} disabled={!callLogData.client} sx={{ bgcolor: colors.orange }}>
              Log Call
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Customer Modal */}
        <Dialog open={addCustomerModalOpen} onClose={() => setAddCustomerModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <People sx={{ color: colors.lightBlue, fontSize: 28 }} />
                <Typography variant="h6">Add New Customer</Typography>
              </Box>
              <IconButton onClick={() => setAddCustomerModalOpen(false)} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Full Name"
                fullWidth
                value={newCustomerData.name}
                onChange={(e) => setNewCustomerData({ ...newCustomerData, name: e.target.value })}
                placeholder="e.g., Michael Johnson"
                InputProps={{
                  startAdornment: <AccountCircle sx={{ mr: 1, color: colors.lightBlue }} />
                }}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={newCustomerData.email}
                onChange={(e) => setNewCustomerData({ ...newCustomerData, email: e.target.value })}
                placeholder="e.g., michael@email.com"
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: colors.blue }} />
                }}
              />
              <TextField
                label="Phone"
                type="tel"
                fullWidth
                value={newCustomerData.phone}
                onChange={(e) => setNewCustomerData({ ...newCustomerData, phone: e.target.value })}
                placeholder="e.g., (555) 123-4567"
                InputProps={{
                  startAdornment: <Phone sx={{ mr: 1, color: colors.green }} />
                }}
              />
              <FormControl fullWidth>
                <InputLabel>Interest</InputLabel>
                <Select
                  value={newCustomerData.interest}
                  label="Interest"
                  onChange={(e) => setNewCustomerData({ ...newCustomerData, interest: e.target.value })}
                >
                  <MenuItem value="Life Insurance">Life Insurance</MenuItem>
                  <MenuItem value="Health Insurance">Health Insurance</MenuItem>
                  <MenuItem value="Auto Insurance">Auto Insurance</MenuItem>
                  <MenuItem value="Home Insurance">Home Insurance</MenuItem>
                  <MenuItem value="Business Insurance">Business Insurance</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setAddCustomerModalOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleAddCustomer}
              disabled={!newCustomerData.name || !newCustomerData.email}
              sx={{ bgcolor: colors.blue }}
            >
              Add Customer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default HomeScreen;
