import React, { useState, useEffect, useRef, useMemo } from 'react';
import useSpeech from '../hooks/useSpeech';
import { useTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Chip,
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
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  alpha,
  Grid,
  InputAdornment,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Phone,
  Message,
  Event,
  Mic,
  MicOff,
  Close,
  NoteAdd,
  StickyNote2,
  FilterList,
  Search,
  Work,
  AttachMoney,
  Favorite,
  Cake,
  Email,
  Home as HomeIcon,
  Person,
  ExpandMore,
  Edit as EditIcon,
  Save as SaveIcon,
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

const CustomersScreen = () => {
  const theme = useTheme();
  const { speak, getRandomResponse } = useSpeech();

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      status: 'Active',
      policies: 3,
      products: ['Life Insurance', 'Auto'],
      lastContact: '2 days ago',
      notes: [],
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Springfield, IL 62701',
      occupation: 'Software Engineer',
      employer: 'Tech Corp',
      annualIncome: '$120,000',
      maritalStatus: 'Married',
      spouse: 'Jennifer Smith',
      children: 2,
      hobbies: ['Golf', 'Photography'],
      birthday: 'March 15',
      policyDetails: [
        { type: 'Term Life Insurance', policyNumber: 'TL-789456', premium: '$85/month', coverage: '$500,000', status: 'Active' },
        { type: 'Auto Insurance', policyNumber: 'AU-456123', premium: '$145/month', coverage: '$300,000', status: 'Active' }
      ]
    },
    {
      id: 2,
      name: 'Sam Wright',
      age: 59,
      status: 'Active',
      paymentIssue: true,
      overdueAmount: '$425',
      overdueDays: 12,
      policies: 4,
      products: ['Life Insurance', 'Health Insurance', 'Auto'],
      lastContact: '1 week ago',
      notes: [],
      email: 'sam.wright@email.com',
      phone: '(555) 987-6543',
      address: '456 Oak Avenue, Chicago, IL 60614',
      occupation: 'Senior Marketing Executive',
      employer: 'Global Brands Inc',
      annualIncome: '$120,000',
      maritalStatus: 'Married',
      spouse: 'Emma Wright',
      spouseAge: 57,
      spouseOccupation: 'Graphic Designer',
      children: 2,
      childrenDetails: [
        { name: 'Olivia', age: 31, school: 'Adult - Marketing Manager in Denver' },
        { name: 'Noah', age: 28, school: 'Adult - Software Engineer in Seattle' }
      ],
      hobbies: ['Golf', 'Cooking', 'Travel'],
      favoriteTeam: 'Chicago Bulls',
      birthday: 'March 6 (in 2 weeks)',
      anniversary: 'September 8',
      homeowner: true,
      homeValue: '$625,000',
      mortgage: '$1,800/month',
      vehicles: ['2023 BMW X5', '2022 Tesla Model Y'],
      healthNotes: 'Non-smoker, plays golf regularly, good health',
      retirementGoal: 'Age 65-67',
      riskTolerance: 'Moderate',
      financialGoals: ['Maximize retirement savings', 'Travel extensively', 'Estate planning for grandchildren'],
      policyDetails: [
        {
          type: 'Indexed Universal Life (IUL)',
          policyNumber: 'IUL-554321',
          premium: '$425/month',
          coverage: '$300,000',
          deathBenefit: '$300,000',
          status: 'Payment Overdue',
          statusDetails: '12 days overdue - Auto-pay failed (expired card)',
          beneficiaries: 'Emma Wright (spouse), Olivia & Noah Wright (children)',
          issueDate: 'January 15, 2010',
          startDate: 'January 15, 2010',
          accountValue: '$485,000',
          paymentDue: '$425',
          lastPayment: 'May 3, 2026',
          nextPayment: 'June 3, 2026 (OVERDUE)'
        },
        {
          type: 'Health Insurance',
          policyNumber: 'HI-998877',
          premium: '$620/month',
          coverage: 'Couple Plan - $3,000 deductible',
          status: 'Active',
          provider: 'Blue Cross Blue Shield',
          includesFamily: true
        },
        {
          type: 'Auto Insurance',
          policyNumber: 'AU-776655',
          premium: '$215/month',
          coverage: '$500,000',
          status: 'Active',
          vehicles: '2 vehicles covered'
        },
        {
          type: 'Umbrella Policy',
          policyNumber: 'UM-334455',
          premium: '$55/month',
          coverage: '$3,000,000',
          status: 'Active'
        }
      ],
      recentInteractions: [
        { date: '1 week ago', type: 'Phone Call', summary: 'Discussed upcoming 60th birthday milestone and retirement planning options' },
        { date: '3 weeks ago', type: 'Email', summary: 'Sent information about birthday milestone planning' },
        { date: '3 months ago', type: 'Meeting', summary: 'Annual policy review and estate planning discussion' },
        { date: '12 days ago', type: 'System Alert', summary: 'Auto-pay failed - expired card on file for IUL policy' }
      ],
      urgentActions: [
        { priority: 'CRITICAL', action: 'Resolve billing issue', details: '$425 payment 12 days overdue - expired card needs updating' }
      ],
      upcomingOpportunities: [
        '🚨 URGENT: Update expired payment card and collect overdue premium ($425)',
        'Birthday outreach and milestone celebration (turning 60 in 2 weeks!)',
        'Offer to waive late fee as goodwill gesture',
        'Long-term care insurance evaluation',
        'Review and discuss policy riders (LTC + Accidental Death Benefit)',
        'Retirement income planning (approaching retirement age)',
        'Medicare planning (turning 65 in 5 years)',
        'Estate planning and wealth transfer strategies'
      ],
      lifeMilestones: [
        { event: '60th Birthday Coming Up', date: 'In 2 weeks', relevance: 'Major milestone - perfect time to review retirement planning, Medicare prep, estate focus' },
        { event: 'Both children settled in careers', date: 'Recent years', relevance: 'Focus shift from education to retirement and legacy' }
      ]
    },
    {
      id: 3,
      name: 'Michael Chen',
      age: 52,
      status: 'Active',
      policies: 2,
      products: ['Retirement', 'Life Insurance'],
      lastContact: 'Today',
      notes: [],
      email: 'michael.chen@email.com',
      phone: '(555) 234-5678',
      address: '789 Maple Drive, Naperville, IL 60540',
      occupation: 'Financial Analyst',
      employer: 'Investment Partners LLC',
      annualIncome: '$135,000',
      maritalStatus: 'Married',
      spouse: 'Linda Chen',
      children: 1,
      hobbies: ['Tennis', 'Reading', 'Investing'],
      birthday: 'November 8',
      policyDetails: [
        { type: '401(k) Rollover', policyNumber: 'RT-445566', premium: 'N/A', coverage: '$850,000 balance', status: 'Active' },
        { type: 'Whole Life Insurance', policyNumber: 'WL-223344', premium: '$220/month', coverage: '$400,000', status: 'Active' }
      ]
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      age: 65,
      status: 'Active',
      policies: 5,
      products: ['Life Insurance', 'Health Insurance', 'Retirement', 'Long-term Care'],
      lastContact: '3 days ago',
      notes: [],
      email: 'sarah.johnson@email.com',
      phone: '(555) 345-6789',
      address: '321 Pine Street, Evanston, IL 60201',
      occupation: 'Retired Teacher',
      employer: 'Retired',
      annualIncome: '$85,000 (pension + SS)',
      maritalStatus: 'Widowed',
      children: 3,
      childrenDetails: [
        { name: 'David Johnson', age: 42, school: 'Adult - Lives in Seattle' },
        { name: 'Rebecca Martinez', age: 39, school: 'Adult - Lives in Austin' },
        { name: 'Thomas Johnson', age: 35, school: 'Adult - Lives locally' }
      ],
      hobbies: ['Gardening', 'Bridge Club', 'Volunteering'],
      birthday: 'February 14',
      homeowner: true,
      homeValue: '$425,000',
      healthNotes: 'Good health, active lifestyle',
      retirementGoal: 'Currently retired',
      financialGoals: ['Estate planning', 'Maximize grandchildren college funds', 'Legacy planning'],
      policyDetails: [
        { type: 'Medicare Supplement', policyNumber: 'MS-667788', premium: '$185/month', coverage: 'Plan G', status: 'Active', provider: 'AARP/UnitedHealthcare' },
        { type: 'Whole Life Insurance', policyNumber: 'WL-889900', premium: '$95/month', coverage: '$150,000', status: 'Active' },
        { type: 'Long-term Care Insurance', policyNumber: 'LTC-112233', premium: '$280/month', coverage: '$250,000 benefit', status: 'Active' },
        { type: 'Annuity', policyNumber: 'AN-445566', premium: 'Paid up', coverage: '$3,200/month income', status: 'Active' }
      ],
      recentInteractions: [
        { date: '3 days ago', type: 'Phone Call', summary: 'Discussed birthday milestone and estate planning options' },
        { date: '2 months ago', type: 'Meeting', summary: 'Annual review of all policies and beneficiaries' }
      ],
      lifeMilestones: [
        { event: '65th Birthday', date: 'Last week', relevance: 'Medicare transition, estate planning focus' }
      ]
    },
    { id: 5, name: 'Emily Rodriguez', age: 29, status: 'Active', policies: 2, products: ['Auto', 'Renters'], lastContact: '1 day ago', notes: [] },
    {
      id: 6, name: 'David Thompson', age: 48, status: 'Active', policies: 4,
      products: ['Life Insurance', 'Home', 'Auto', 'Umbrella'], lastContact: '5 days ago', notes: [],
      email: 'david.thompson@email.com', phone: '(555) 456-7890', address: '532 Lakewood Drive, Wheaton, IL 60187',
      occupation: 'Civil Engineer', employer: 'DuPage County Public Works',
      annualIncome: '$108,000', maritalStatus: 'Married', spouse: 'Rachel Thompson', children: 3,
      birthday: 'May 19',
      policyDetails: [
        { type: 'Whole Life Insurance', policyNumber: 'WL-776655', premium: '$185/month', coverage: '$400,000', status: 'Active' },
        { type: 'Home Insurance', policyNumber: 'HO-554433', premium: '$120/month', coverage: '$550,000', status: 'Active' },
        { type: 'Auto Insurance', policyNumber: 'AU-332211', premium: '$165/month', coverage: '$500,000', status: 'Active' },
        { type: 'Umbrella Policy', policyNumber: 'UM-119922', premium: '$55/month', coverage: '$1,000,000', status: 'Active' },
      ]
    },
    { id: 7, name: 'Jennifer Martinez', age: 41, status: 'Active', policies: 3, products: ['Health Insurance', 'Life Insurance', 'Disability'], lastContact: '2 weeks ago', notes: [] },
    { id: 8, name: 'Robert Anderson', age: 58, status: 'Active', policies: 6, products: ['Life Insurance', 'Retirement', 'Health Insurance', 'Home', 'Auto'], lastContact: '4 days ago', notes: [] },
    {
      id: 9, name: 'Lisa Taylor', age: 33, status: 'Active', policies: 2,
      products: ['Life Insurance', 'Auto'], lastContact: '1 week ago', notes: [],
      email: 'lisa.taylor@email.com', phone: '(555) 567-8901', address: '88 River Road, Naperville, IL 60540',
      occupation: 'Nurse Practitioner', employer: 'Northwestern Medicine',
      annualIncome: '$92,000', maritalStatus: 'Single', children: 0,
      birthday: 'July 22',
      policyDetails: [
        { type: 'Term Life Insurance', policyNumber: 'TL-334455', premium: '$48/month', coverage: '$250,000', status: 'Active' },
        { type: 'Auto Insurance', policyNumber: 'AU-112233', premium: '$110/month', coverage: '$300,000', status: 'Active' },
      ]
    },
    { id: 10, name: 'James Wilson', age: 62, status: 'Active', policies: 5, products: ['Retirement', 'Life Insurance', 'Health Insurance', 'Long-term Care'], lastContact: 'Today', notes: [] },
    {
      id: 11, name: 'Patricia Brown', age: 36, status: 'Active', policies: 3,
      products: ['Life Insurance', 'Home', 'Auto'], lastContact: '6 days ago', notes: [],
      email: 'patricia.brown@email.com', phone: '(555) 678-9012', address: '210 Elmwood Ave, Aurora, IL 60505',
      occupation: 'Elementary School Teacher', employer: 'Aurora Community School District',
      annualIncome: '$58,000', maritalStatus: 'Married', spouse: 'Gregory Brown', children: 2,
      birthday: 'October 3',
      policyDetails: [
        { type: 'Term Life Insurance', policyNumber: 'TL-556677', premium: '$75/month', coverage: '$500,000', status: 'Active' },
        { type: 'Home Insurance', policyNumber: 'HO-334455', premium: '$95/month', coverage: '$380,000', status: 'Active' },
        { type: 'Auto Insurance', policyNumber: 'AU-998877', premium: '$130/month', coverage: '$300,000', status: 'Active' },
      ]
    },
    { id: 12, name: 'Christopher Lee', age: 44, status: 'Active', policies: 4, products: ['Life Insurance', 'Retirement', 'Disability', 'Auto'], lastContact: '3 days ago', notes: [] },
    { id: 13, name: 'Amanda Garcia', age: 27, status: 'Active', policies: 1, products: ['Auto'], lastContact: '2 days ago', notes: [] },
    { id: 14, name: 'Daniel Miller', age: 55, status: 'Active', policies: 5, products: ['Life Insurance', 'Retirement', 'Health Insurance', 'Home', 'Auto'], lastContact: '1 week ago', notes: [] },
    { id: 15, name: 'Michelle Davis', age: 39, status: 'Active', policies: 3, products: ['Health Insurance', 'Life Insurance', 'Auto'], lastContact: '5 days ago', notes: [] },
    { id: 16, name: 'Thomas Moore', age: 67, status: 'Active', policies: 4, products: ['Retirement', 'Life Insurance', 'Long-term Care', 'Health Insurance'], lastContact: '2 weeks ago', notes: [] },
    { id: 17, name: 'Karen White', age: 42, status: 'Active', policies: 3, products: ['Life Insurance', 'Home', 'Umbrella'], lastContact: '4 days ago', notes: [] },
    { id: 18, name: 'Steven Harris', age: 31, status: 'Active', policies: 2, products: ['Life Insurance', 'Auto'], lastContact: '1 day ago', notes: [] },
    { id: 19, name: 'Nancy Clark', age: 53, status: 'Active', policies: 5, products: ['Life Insurance', 'Retirement', 'Health Insurance', 'Home', 'Auto'], lastContact: '1 week ago', notes: [] },
    { id: 20, name: 'Kevin Lewis', age: 46, status: 'Active', policies: 4, products: ['Life Insurance', 'Disability', 'Home', 'Auto'], lastContact: '3 days ago', notes: [] },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openVoiceDialog, setOpenVoiceDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [detailTabValue, setDetailTabValue] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [noteCategory, setNoteCategory] = useState('general');
  const [error, setError] = useState('');

  // Edit contact states
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editContactData, setEditContactData] = useState({});

  // Filter states
  const [productFilter, setProductFilter] = useState('All Products');
  const [ageFilter, setAgeFilter] = useState('All Ages');
  const [searchTerm, setSearchTerm] = useState('');

  const recognitionRef = useRef(null);

  // All product types
  const productTypes = ['All Products', 'Life Insurance', 'Health Insurance', 'Auto', 'Home', 'Retirement', 'Disability', 'Long-term Care', 'Umbrella', 'Renters'];

  // Age ranges
  const ageRanges = ['All Ages', 'Under 30', '30-40', '41-50', '51-60', 'Over 60'];

  // Filtered customers based on filters
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      // Product filter
      const matchesProduct = productFilter === 'All Products' || customer.products.includes(productFilter);

      // Age filter
      let matchesAge = true;
      if (ageFilter === 'Under 30') matchesAge = customer.age < 30;
      else if (ageFilter === '30-40') matchesAge = customer.age >= 30 && customer.age <= 40;
      else if (ageFilter === '41-50') matchesAge = customer.age >= 41 && customer.age <= 50;
      else if (ageFilter === '51-60') matchesAge = customer.age >= 51 && customer.age <= 60;
      else if (ageFilter === 'Over 60') matchesAge = customer.age > 60;

      // Search filter
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesProduct && matchesAge && matchesSearch;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [customers, productFilter, ageFilter, searchTerm]);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceText(transcript);
        setNoteText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Voice recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleAddNote = (customer) => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    setSelectedCustomer(customer);
    setOpenVoiceDialog(true);
    setVoiceText('');
    setNoteText('');
    setNoteCategory('general');
    setError('');
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setError('');
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setError('Could not start voice recognition. Please try again.');
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) {
      setError('Please provide a note');
      return;
    }

    const newNote = {
      id: Date.now(),
      text: noteText.trim(),
      category: noteCategory,
      timestamp: new Date().toLocaleString()
    };

    setCustomers(customers.map(customer =>
      customer.id === selectedCustomer.id
        ? { ...customer, notes: [newNote, ...(customer.notes || [])], lastContact: 'Today' }
        : customer
    ));

    setOpenVoiceDialog(false);
    setNoteText('');
    setVoiceText('');

    // Voice confirmation - conversational responses
    const categoryText = noteCategory === 'follow-up' ? 'and marked for follow-up' : '';
    const totalNotes = (selectedCustomer.notes || []).length + 1;

    const responses = [
      `Perfect! I've saved that note for ${selectedCustomer.name} ${categoryText}`,
      `Got it! Note added to ${selectedCustomer.name}'s profile. That's ${totalNotes} notes total`,
      `All set! I've logged that interaction with ${selectedCustomer.name}`,
      `Done! Your note for ${selectedCustomer.name} has been saved ${categoryText}`,
      `Excellent! I've updated ${selectedCustomer.name}'s record with that information`
    ];
    speak(getRandomResponse(responses));

    setSelectedCustomer(null);
  };

  const handleCloseDialog = () => {
    if (isListening) {
      stopListening();
    }
    setOpenVoiceDialog(false);
    setNoteText('');
    setVoiceText('');
    setError('');
    setSelectedCustomer(null);
  };

  const handleOpenCustomerDetail = (customer) => {
    setSelectedCustomer(customer);
    setOpenDetailDialog(true);
    setDetailTabValue(0);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedCustomer(null);
    setDetailTabValue(0);
    setIsEditingContact(false);
    setEditContactData({});
  };

  const handleTabChange = (event, newValue) => {
    setDetailTabValue(newValue);
  };

  const handleStartEditContact = () => {
    setEditContactData({
      name: selectedCustomer.name || '',
      email: selectedCustomer.email || '',
      phone: selectedCustomer.phone || '',
      address: selectedCustomer.address || '',
    });
    setIsEditingContact(true);
  };

  const handleSaveContactEdit = () => {
    const updatedCustomer = { ...selectedCustomer, ...editContactData };
    setCustomers(prev => prev.map(c => c.id === selectedCustomer.id ? updatedCustomer : c));
    setSelectedCustomer(updatedCustomer);
    setIsEditingContact(false);
    speak(`Contact information for ${editContactData.name} has been updated`);
  };

  const handleCancelContactEdit = () => {
    setIsEditingContact(false);
    setEditContactData({});
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', py: 3 }}>
      <Container maxWidth="lg" sx={{ pb: 10, pt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Roboto Slab, serif',
          fontWeight: 700,
          color: colors.blue,
          mb: 3
        }}
      >
        Customers
      </Typography>

      {/* Filter Section */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 3,
          border: `1px solid ${alpha(colors.blue, 0.1)}`,
          bgcolor: alpha(colors.paleAqua, 0.3)
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FilterList sx={{ mr: 1, color: colors.blue }} />
            <Typography variant="h6" fontWeight={600} color={colors.blue}>
              Filter Customers
            </Typography>
            <Chip
              label={`${filteredCustomers.length} of ${customers.length}`}
              size="small"
              sx={{
                ml: 2,
                bgcolor: alpha(colors.lightBlue, 0.08),
                color: '#000000',
                fontWeight: 600
              }}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: colors.blue }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Product Type</InputLabel>
                <Select
                  value={productFilter}
                  label="Product Type"
                  onChange={(e) => setProductFilter(e.target.value)}
                >
                  {productTypes.map(product => (
                    <MenuItem key={product} value={product}>{product}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Age Range</InputLabel>
                <Select
                  value={ageFilter}
                  label="Age Range"
                  onChange={(e) => setAgeFilter(e.target.value)}
                >
                  {ageRanges.map(range => (
                    <MenuItem key={range} value={range}>{range}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {(productFilter !== 'All Products' || ageFilter !== 'All Ages' || searchTerm) && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {searchTerm && (
                <Chip
                  label={`Search: "${searchTerm}"`}
                  size="small"
                  onDelete={() => setSearchTerm('')}
                  sx={{ bgcolor: 'white' }}
                />
              )}
              {productFilter !== 'All Products' && (
                <Chip
                  label={`Product: ${productFilter}`}
                  size="small"
                  onDelete={() => setProductFilter('All Products')}
                  sx={{ bgcolor: 'white' }}
                />
              )}
              {ageFilter !== 'All Ages' && (
                <Chip
                  label={`Age: ${ageFilter}`}
                  size="small"
                  onDelete={() => setAgeFilter('All Ages')}
                  sx={{ bgcolor: 'white' }}
                />
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Customer List */}
      {filteredCustomers.length === 0 ? (
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${alpha(colors.blue, 0.1)}`,
            p: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No customers match your filters
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your search criteria
          </Typography>
        </Card>
      ) : (
        <>
        {filteredCustomers.map(customer => (
        <Card
          elevation={0}
          key={customer.id}
          onClick={() => handleOpenCustomerDetail(customer)}
          sx={{
            mb: 2.5,
            borderRadius: 3,
            border: `1px solid ${alpha(colors.blue, 0.1)}`,
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 4px 12px ${alpha(colors.lightBlue, 0.15)}`,
              borderColor: colors.lightBlue
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <Avatar
                sx={{
                  mr: 2.5,
                  width: 56,
                  height: 56,
                  bgcolor: colors.lightBlue,
                  fontSize: '1.5rem',
                  fontWeight: 600
                }}
              >
                {customer.name.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 0.5 }}>
                  {customer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Age {customer.age} • {customer.policies} {customer.policies === 1 ? 'policy' : 'policies'} • Last contact: {customer.lastContact}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {customer.products.slice(0, 3).map((product, idx) => (
                    <Chip
                      key={idx}
                      label={product}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        bgcolor: alpha(colors.lightBlue, 0.1),
                        color: '#000000',
                        border: `1px solid ${alpha(colors.lightBlue, 0.3)}`,
                        fontWeight: 600
                      }}
                    />
                  ))}
                  {customer.products.length > 3 && (
                    <Chip
                      label={`+${customer.products.length - 3}`}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        bgcolor: alpha(colors.orange, 0.1),
                        color: '#000000',
                        border: `1px solid ${alpha(colors.orange, 0.3)}`,
                        fontWeight: 600
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Chip
                label={customer.status}
                size="medium"
                sx={{
                  fontWeight: 600,
                  bgcolor: customer.status === 'Active'
                    ? alpha(colors.green, 0.1)
                    : alpha(colors.orange, 0.1),
                  color: '#000000',
                  border: `1px solid ${customer.status === 'Active' ? alpha(colors.green, 0.3) : alpha(colors.orange, 0.3)}`
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, mt: 2.5 }}>
              <IconButton
                size="medium"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  bgcolor: alpha(colors.lightBlue, 0.1),
                  color: colors.lightBlue,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(colors.lightBlue, 0.2)
                  }
                }}
              >
                <Phone />
              </IconButton>
              <IconButton
                size="medium"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  bgcolor: alpha(colors.green, 0.1),
                  color: colors.green,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(colors.green, 0.2)
                  }
                }}
              >
                <Message />
              </IconButton>
              <IconButton
                size="medium"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  bgcolor: alpha(colors.orange, 0.1),
                  color: colors.orange,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(colors.orange, 0.2)
                  }
                }}
              >
                <Event />
              </IconButton>
              <IconButton
                size="medium"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddNote(customer);
                }}
                sx={{
                  ml: 'auto',
                  bgcolor: alpha(colors.blue, 0.1),
                  color: colors.blue,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(colors.blue, 0.2)
                  }
                }}
              >
                <NoteAdd />
              </IconButton>
            </Box>

            {/* Show recent notes if any */}
            {customer.notes && customer.notes.length > 0 && (
              <Box
                sx={{
                  mt: 2.5,
                  pt: 2.5,
                  borderTop: `1px solid ${alpha(colors.blue, 0.1)}`
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
                >
                  <StickyNote2 sx={{ fontSize: 16, mr: 0.5, color: colors.orange }} />
                  Recent Notes ({customer.notes.length})
                </Typography>
                <Box
                  sx={{
                    bgcolor: alpha(colors.paleAqua, 0.5),
                    borderRadius: 2,
                    p: 2,
                    border: `1px solid ${alpha(colors.blue, 0.08)}`
                  }}
                >
                  <Typography variant="body2" sx={{ display: 'block', mb: 1 }}>
                    {customer.notes[0].text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {customer.notes[0].timestamp}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
        </>
      )}

      {/* Customer Detail Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        fullWidth
        maxWidth="sm"
        fullScreen={theme.breakpoints.down('sm')}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 3 },
            maxHeight: { xs: '100vh', sm: '90vh' },
            maxWidth: { xs: '100%', sm: 600, md: 700 },
            m: { xs: 0, sm: 2 },
            width: '100%'
          }
        }}
      >
        {selectedCustomer && (
          <>
            <DialogTitle sx={{ pb: 0, px: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, flex: 1 }}>
                  <Avatar
                    sx={{
                      width: { xs: 48, sm: 64 },
                      height: { xs: 48, sm: 64 },
                      bgcolor: colors.lightBlue,
                      fontSize: { xs: '1.3rem', sm: '1.8rem' },
                      fontWeight: 600
                    }}
                  >
                    {selectedCustomer.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h5" fontWeight={600} sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                      {selectedCustomer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {selectedCustomer.occupation || 'Professional'} • Age {selectedCustomer.age}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={selectedCustomer.status}
                        size="small"
                        sx={{
                          bgcolor: alpha(colors.green, 0.1),
                          color: '#000000',
                          border: `1px solid ${alpha(colors.green, 0.3)}`,
                          fontWeight: 600,
                          height: { xs: 22, sm: 24 },
                          fontSize: { xs: '0.7rem', sm: '0.75rem' }
                        }}
                      />
                      <Chip
                        label={`${selectedCustomer.policies} ${selectedCustomer.policies === 1 ? 'Policy' : 'Policies'}`}
                        size="small"
                        sx={{
                          bgcolor: alpha(colors.lightBlue, 0.1),
                          color: '#000000',
                          border: `1px solid ${alpha(colors.lightBlue, 0.3)}`,
                          fontWeight: 600,
                          height: { xs: 22, sm: 24 },
                          fontSize: { xs: '0.7rem', sm: '0.75rem' }
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <IconButton onClick={handleCloseDetailDialog} size="small" sx={{ flexShrink: 0 }}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>

            <Tabs
              value={detailTabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                px: { xs: 2, sm: 3 },
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  fontSize: { xs: '0.813rem', sm: '0.875rem' },
                  minWidth: { xs: 80, sm: 120 },
                  px: { xs: 1, sm: 2 }
                }
              }}
            >
              <Tab label="Overview" />
              <Tab label="Policies" />
              <Tab label="Personal" />
              <Tab label="Interactions" />
            </Tabs>

            <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}>
              {/* Overview Tab */}
              {detailTabValue === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
                    {/* Contact Information */}
                      <Card elevation={0} sx={{ bgcolor: alpha(colors.paleAqua, 0.3), borderRadius: 2 }}>
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" fontWeight={600} sx={{ color: colors.blue, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                              Contact Information
                            </Typography>
                            {!isEditingContact ? (
                              <IconButton
                                size="small"
                                onClick={handleStartEditContact}
                                sx={{ color: colors.blue, '&:hover': { bgcolor: alpha(colors.blue, 0.1) } }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            ) : (
                              <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <IconButton
                                  size="small"
                                  onClick={handleSaveContactEdit}
                                  sx={{ color: colors.green, '&:hover': { bgcolor: alpha(colors.green, 0.1) } }}
                                >
                                  <SaveIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={handleCancelContactEdit}
                                  sx={{ color: colors.red, '&:hover': { bgcolor: alpha(colors.red, 0.1) } }}
                                >
                                  <Close fontSize="small" />
                                </IconButton>
                              </Box>
                            )}
                          </Box>
                          {isEditingContact ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              <TextField
                                label="Full Name"
                                size="small"
                                fullWidth
                                value={editContactData.name || ''}
                                onChange={(e) => setEditContactData(prev => ({ ...prev, name: e.target.value }))}
                              />
                              <TextField
                                label="Email"
                                size="small"
                                fullWidth
                                value={editContactData.email || ''}
                                onChange={(e) => setEditContactData(prev => ({ ...prev, email: e.target.value }))}
                              />
                              <TextField
                                label="Phone"
                                size="small"
                                fullWidth
                                value={editContactData.phone || ''}
                                onChange={(e) => setEditContactData(prev => ({ ...prev, phone: e.target.value }))}
                              />
                              <TextField
                                label="Address"
                                size="small"
                                fullWidth
                                multiline
                                rows={2}
                                value={editContactData.address || ''}
                                onChange={(e) => setEditContactData(prev => ({ ...prev, address: e.target.value }))}
                              />
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Person sx={{ color: colors.lightBlue, fontSize: { xs: 18, sm: 20 }, flexShrink: 0 }} />
                                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                                  {selectedCustomer.name}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Email sx={{ color: colors.lightBlue, fontSize: { xs: 18, sm: 20 }, flexShrink: 0 }} />
                                <Typography variant="body2" sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, wordBreak: 'break-word' }}>
                                  {selectedCustomer.email || 'No email on file'}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Phone sx={{ color: colors.lightBlue, fontSize: { xs: 18, sm: 20 }, flexShrink: 0 }} />
                                <Typography variant="body2" sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                                  {selectedCustomer.phone || 'No phone on file'}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <HomeIcon sx={{ color: colors.lightBlue, fontSize: { xs: 18, sm: 20 }, flexShrink: 0, mt: 0.3 }} />
                                <Typography variant="body2" sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                                  {selectedCustomer.address || 'No address on file'}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </CardContent>
                      </Card>

                    {/* Professional Information */}
                      <Card elevation={0} sx={{ bgcolor: alpha(colors.paleAqua, 0.3), borderRadius: 2 }}>
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                          <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: colors.blue, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                            Professional
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Work sx={{ color: colors.orange, fontSize: { xs: 18, sm: 20 }, flexShrink: 0 }} />
                              <Box>
                                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                                  {selectedCustomer.occupation || 'Occupation not specified'}
                                </Typography>
                                {selectedCustomer.employer && (
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.813rem' } }}>
                                    {selectedCustomer.employer}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                            {selectedCustomer.annualIncome && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AttachMoney sx={{ color: colors.green, fontSize: { xs: 18, sm: 20 }, flexShrink: 0 }} />
                                <Typography variant="body2" sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                                  Annual Income: {selectedCustomer.annualIncome}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </CardContent>
                      </Card>

                    {/* Key Dates */}
                    {(selectedCustomer.birthday || selectedCustomer.anniversary) && (
                        <Card elevation={0} sx={{ bgcolor: alpha(colors.yellow, 0.1), borderRadius: 2 }}>
                          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: colors.blue, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                              Important Dates
                            </Typography>
                            <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap' }}>
                              {selectedCustomer.birthday && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Cake sx={{ color: colors.orange, fontSize: { xs: 18, sm: 20 }, flexShrink: 0 }} />
                                  <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.813rem' } }}>
                                      Birthday
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                                      {selectedCustomer.birthday}
                                    </Typography>
                                  </Box>
                                </Box>
                              )}
                              {selectedCustomer.anniversary && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Favorite sx={{ color: colors.red, fontSize: { xs: 18, sm: 20 }, flexShrink: 0 }} />
                                  <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.813rem' } }}>
                                      Anniversary
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                                      {selectedCustomer.anniversary}
                                    </Typography>
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          </CardContent>
                        </Card>
                    )}

                    {/* Upcoming Opportunities */}
                    {selectedCustomer.upcomingOpportunities && selectedCustomer.upcomingOpportunities.length > 0 && (
                        <Card elevation={0} sx={{ bgcolor: alpha(colors.green, 0.08), borderRadius: 2 }}>
                          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: colors.green, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                              Opportunities
                            </Typography>
                            <List dense>
                              {selectedCustomer.upcomingOpportunities
                                .filter(opp => !opp.includes('🚨') && !opp.toLowerCase().includes('payment') && !opp.toLowerCase().includes('overdue') && !opp.toLowerCase().includes('expired card'))
                                .map((opp, idx) => (
                                  <ListItem key={idx} sx={{ pl: 0, py: 0.5 }}>
                                    <ListItemText
                                      primary={opp}
                                      primaryTypographyProps={{
                                        variant: 'body2',
                                        fontSize: { xs: '0.813rem', sm: '0.875rem' }
                                      }}
                                    />
                                  </ListItem>
                                ))}
                            </List>
                          </CardContent>
                        </Card>
                    )}
                </Box>
              )}

              {/* Policies Tab */}
              {detailTabValue === 1 && (
                <Box>
                  {selectedCustomer.policyDetails && selectedCustomer.policyDetails.length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {selectedCustomer.policyDetails.map((policy, idx) => (
                        <Accordion key={idx} defaultExpanded={idx === 0} elevation={0} sx={{ border: `1px solid ${alpha(colors.blue, 0.1)}`, borderRadius: 2 }}>
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: 2 }}>
                              <Box>
                                <Typography variant="h6" fontWeight={600}>{policy.type}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Policy # {policy.policyNumber}
                                </Typography>
                              </Box>
                              <Chip
                                label={policy.status === 'Payment Overdue' ? 'Active' : policy.status}
                                size="small"
                                sx={{
                                  bgcolor: alpha(colors.green, 0.1),
                                  color: '#000000',
                                  border: `1px solid ${alpha(colors.green, 0.3)}`,
                                  fontWeight: 600
                                }}
                              />
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Table size="small">
                              <TableBody>
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, width: '40%' }}>Premium</TableCell>
                                  <TableCell>{policy.premium}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600 }}>Coverage</TableCell>
                                  <TableCell>{policy.coverage}</TableCell>
                                </TableRow>
                                {policy.accountValue && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Account Value</TableCell>
                                    <TableCell>{policy.accountValue}</TableCell>
                                  </TableRow>
                                )}
                                {policy.beneficiaries && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Beneficiaries</TableCell>
                                    <TableCell>{policy.beneficiaries}</TableCell>
                                  </TableRow>
                                )}
                                {policy.issueDate && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>Issue Date</TableCell>
                                    <TableCell sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>{policy.issueDate}</TableCell>
                                  </TableRow>
                                )}
                                {policy.renewalDate && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Renewal Date</TableCell>
                                    <TableCell>{policy.renewalDate}</TableCell>
                                  </TableRow>
                                )}
                                {policy.provider && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Provider</TableCell>
                                    <TableCell>{policy.provider}</TableCell>
                                  </TableRow>
                                )}
                                {policy.vehicles && (
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Vehicles</TableCell>
                                    <TableCell>{policy.vehicles}</TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </Box>
                  ) : (
                    <Alert severity="info">No detailed policy information available</Alert>
                  )}
                </Box>
              )}

              {/* Personal & Family Tab */}
              {detailTabValue === 2 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
                    {/* Family Information */}
                      <Card elevation={0} sx={{ bgcolor: alpha(colors.paleAqua, 0.3), borderRadius: 2 }}>
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                          <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: colors.blue, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                            Family
                          </Typography>
                          <Table size="small">
                            <TableBody>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 600, width: '30%', fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>Marital Status</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>{selectedCustomer.maritalStatus || 'Not specified'}</TableCell>
                              </TableRow>
                              {selectedCustomer.spouse && (
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>Spouse</TableCell>
                                  <TableCell sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>
                                    {selectedCustomer.spouse}
                                    {selectedCustomer.spouseAge && ` (Age ${selectedCustomer.spouseAge})`}
                                    {selectedCustomer.spouseOccupation && ` - ${selectedCustomer.spouseOccupation}`}
                                  </TableCell>
                                </TableRow>
                              )}
                              <TableRow>
                                <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>Children</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>{selectedCustomer.children || 0}</TableCell>
                              </TableRow>
                              {selectedCustomer.childrenDetails && selectedCustomer.childrenDetails.length > 0 && (
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5, verticalAlign: 'top' }}>Children Details</TableCell>
                                  <TableCell sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>
                                    {selectedCustomer.childrenDetails.map((child, idx) => (
                                      <Typography key={idx} variant="body2" sx={{ mb: 0.5, fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                                        • {child.name}, Age {child.age} - {child.school}
                                      </Typography>
                                    ))}
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                    {/* Personal Details */}
                      <Card elevation={0} sx={{ bgcolor: alpha(colors.paleAqua, 0.3), borderRadius: 2 }}>
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                          <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: colors.blue, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                            Personal Details
                          </Typography>
                          <Table size="small">
                            <TableBody>
                              {selectedCustomer.hobbies && selectedCustomer.hobbies.length > 0 && (
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, width: '30%', fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>Hobbies & Interests</TableCell>
                                  <TableCell sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>{selectedCustomer.hobbies.join(', ')}</TableCell>
                                </TableRow>
                              )}
                              {selectedCustomer.favoriteTeam && (
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>Favorite Team</TableCell>
                                  <TableCell sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>{selectedCustomer.favoriteTeam}</TableCell>
                                </TableRow>
                              )}
                              {selectedCustomer.homeowner !== undefined && (
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>Homeowner</TableCell>
                                  <TableCell sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>{selectedCustomer.homeowner ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                              )}
                              {selectedCustomer.homeValue && (
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>Home Value</TableCell>
                                  <TableCell sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>{selectedCustomer.homeValue}</TableCell>
                                </TableRow>
                              )}
                              {selectedCustomer.vehicles && selectedCustomer.vehicles.length > 0 && (
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>Vehicles</TableCell>
                                  <TableCell sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>{selectedCustomer.vehicles.join(', ')}</TableCell>
                                </TableRow>
                              )}
                              {selectedCustomer.healthNotes && (
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>Health Notes</TableCell>
                                  <TableCell sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, border: 0, py: 1.5 }}>{selectedCustomer.healthNotes}</TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                    {/* Financial Goals */}
                    {selectedCustomer.financialGoals && selectedCustomer.financialGoals.length > 0 && (
                        <Card elevation={0} sx={{ bgcolor: alpha(colors.green, 0.08), borderRadius: 2 }}>
                          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: colors.green, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                              Financial Goals
                            </Typography>
                            <List dense>
                              {selectedCustomer.financialGoals.map((goal, idx) => (
                                <ListItem key={idx} sx={{ pl: 0, py: 0.5 }}>
                                  <ListItemText
                                    primary={`• ${goal}`}
                                    primaryTypographyProps={{
                                      variant: 'body2',
                                      fontSize: { xs: '0.813rem', sm: '0.875rem' }
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                            {selectedCustomer.retirementGoal && (
                              <Typography variant="body2" sx={{ mt: 1, fontWeight: 600, fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                                Retirement Goal: {selectedCustomer.retirementGoal}
                              </Typography>
                            )}
                            {selectedCustomer.riskTolerance && (
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                                Risk Tolerance: {selectedCustomer.riskTolerance}
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                    )}
                </Box>
              )}

              {/* Interactions Tab */}
              {detailTabValue === 3 && (
                <Box>
                  {selectedCustomer.recentInteractions && selectedCustomer.recentInteractions.length > 0 ? (
                    <Box>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: colors.blue, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        Recent Interactions
                      </Typography>
                      {selectedCustomer.recentInteractions
                        .filter(interaction => interaction.type !== 'System Alert' && !interaction.summary.toLowerCase().includes('auto-pay') && !interaction.summary.toLowerCase().includes('expired card'))
                        .map((interaction, idx) => (
                        <Card key={idx} elevation={0} sx={{ mb: 2, border: `1px solid ${alpha(colors.blue, 0.1)}`, borderRadius: 2 }}>
                          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, gap: 1, flexWrap: 'wrap' }}>
                              <Chip
                                label={interaction.type}
                                size="small"
                                sx={{
                                  bgcolor: alpha(colors.lightBlue, 0.1),
                                  color: '#000000',
                                  border: `1px solid ${alpha(colors.lightBlue, 0.3)}`,
                                  fontWeight: 600,
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' }
                                }}
                              />
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.813rem' } }}>
                                {interaction.date}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                              {interaction.summary}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}

                      {selectedCustomer.lifeMilestones && selectedCustomer.lifeMilestones.length > 0 && (
                        <>
                          <Divider sx={{ my: 3 }} />
                          <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: colors.orange, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                            Life Milestones
                          </Typography>
                          {selectedCustomer.lifeMilestones.map((milestone, idx) => (
                            <Card key={idx} elevation={0} sx={{ mb: 2, bgcolor: alpha(colors.yellow, 0.1), borderRadius: 2 }}>
                              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                                  {milestone.event}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '0.813rem' } }}>
                                  {milestone.date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                                  Relevance: {milestone.relevance}
                                </Typography>
                              </CardContent>
                            </Card>
                          ))}
                        </>
                      )}
                    </Box>
                  ) : (
                    <Alert severity="info">No interaction history available</Alert>
                  )}

                  {/* Notes from customer card */}
                  {selectedCustomer.notes && selectedCustomer.notes.length > 0 && (
                    <>
                      <Divider sx={{ my: 3 }} />
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: colors.blue, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        Notes
                      </Typography>
                      {selectedCustomer.notes.map((note, idx) => (
                        <Card key={idx} elevation={0} sx={{ mb: 2, bgcolor: alpha(colors.paleAqua, 0.3), borderRadius: 2 }}>
                          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                              {note.text}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                              <Chip
                                label={note.category}
                                size="small"
                                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                              />
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.813rem' } }}>
                                {note.timestamp}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </>
                  )}
                </Box>
              )}
            </DialogContent>

            <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 2 }, pt: 0, gap: 1, flexWrap: 'wrap' }}>
              <Button
                onClick={handleCloseDetailDialog}
                color="inherit"
                sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleCloseDetailDialog();
                  handleAddNote(selectedCustomer);
                }}
                startIcon={<NoteAdd sx={{ fontSize: { xs: 18, sm: 20 } }} />}
                sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
              >
                Add Note
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Voice Note Dialog */}
      <Dialog
        open={openVoiceDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">Add Note with Voice</Typography>
              {selectedCustomer && (
                <Typography variant="caption" color="text.secondary">
                  For: {selectedCustomer.name}
                </Typography>
              )}
            </Box>
            <IconButton onClick={handleCloseDialog} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Voice Recording Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 3,
              mb: 3,
              bgcolor: isListening ? '#e0f2f1' : '#f5f5f5',
              borderRadius: 2,
              transition: 'background-color 0.3s'
            }}
          >
            <IconButton
              onClick={isListening ? stopListening : startListening}
              sx={{
                width: 80,
                height: 80,
                bgcolor: isListening ? 'secondary.main' : 'primary.main',
                color: 'white',
                mb: 2,
                '&:hover': {
                  bgcolor: isListening ? 'secondary.dark' : 'primary.dark',
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
            >
              {isListening ? <MicOff sx={{ fontSize: 40 }} /> : <Mic sx={{ fontSize: 40 }} />}
            </IconButton>

            <Typography variant="body1" fontWeight="600" gutterBottom>
              {isListening ? 'Listening...' : 'Tap microphone to speak'}
            </Typography>

            {isListening && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="secondary" />
                <Typography variant="caption" color="text.secondary">
                  Describe the interaction or note
                </Typography>
              </Box>
            )}

            {voiceText && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'white', borderRadius: 1, width: '100%' }}>
                <Typography variant="caption" color="text.secondary">
                  Captured:
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  "{voiceText}"
                </Typography>
              </Box>
            )}
          </Box>

          {/* Note Details Form */}
          <TextField
            label="Note"
            fullWidth
            multiline
            rows={4}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="E.g., Discussed life insurance options, interested in $500K term policy"
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={noteCategory}
              label="Category"
              onChange={(e) => setNoteCategory(e.target.value)}
            >
              <MenuItem value="general">General Note</MenuItem>
              <MenuItem value="call">Phone Call</MenuItem>
              <MenuItem value="meeting">Meeting</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="follow-up">Follow-up Required</MenuItem>
              <MenuItem value="quote">Quote Provided</MenuItem>
              <MenuItem value="policy">Policy Discussion</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSaveNote}
            variant="contained"
            disabled={!noteText.trim()}
          >
            Save Note
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </Box>
  );
};

export default CustomersScreen;
