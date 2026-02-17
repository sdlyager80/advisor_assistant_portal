import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  Divider,
  Paper,
  alpha,
  useTheme,
  Fade,
  Stack,
  Grid,
} from '@mui/material';
import {
  Cake,
  Email,
  Phone,
  CheckCircle,
  Verified,
  TrendingUp,
  Psychology,
  Schedule,
  SendOutlined,
  TaskAlt,
  AttachMoney,
  AccessTime,
  Language,
  Security,
  Lightbulb,
  AutoAwesome,
  MailOutline,
  LocalPhone,
  CardGiftcard,
  ArrowForward,
  Stars,
  AccountCircle,
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

const DemoScreen = ({
  customerName = 'Sam Wright',
  customerAge = null,
  customerMilestone = 'birthday'
}) => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [emailSent, setEmailSent] = useState(false);

  // Extract first name and generate initials
  const firstName = customerName.split(' ')[0];
  const initials = customerName.split(' ').map(n => n.charAt(0).toUpperCase()).join('');

  // Generate random but realistic customer data
  const [customerData] = useState(() => {
    // Use passed age or generate random age between 55-75 (milestone birthdays)
    const age = customerAge !== null ? customerAge : Math.floor(Math.random() * 21) + 55;

    // Random policy value between $85K - $450K
    const policyValue = Math.floor(Math.random() * 366) + 85;

    // Random years as customer between 3-15
    const yearsAsCustomer = Math.floor(Math.random() * 13) + 3;

    // Random engagement level
    const engagementLevels = ['High Engagement', 'Very High Engagement', 'Excellent Engagement', 'Strong Engagement'];
    const engagement = engagementLevels[Math.floor(Math.random() * engagementLevels.length)];

    // Random contact time
    const contactTimes = [
      'Morning (8-11 AM)',
      'Afternoon (1-4 PM)',
      'Late Morning (10 AM-12 PM)',
      'Early Afternoon (12-3 PM)'
    ];
    const bestContactTime = contactTimes[Math.floor(Math.random() * contactTimes.length)];

    // Random follow-up date (2-5 days from now)
    const daysOffset = Math.floor(Math.random() * 4) + 2;
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + daysOffset);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const followUpDateString = `${monthNames[followUpDate.getMonth()]} ${followUpDate.getDate()}, 2026`;

    // Random time for follow-up
    const hours = Math.floor(Math.random() * 5) + 8; // 8 AM - 12 PM
    const minutes = Math.random() < 0.5 ? '00' : '30';
    const followUpTime = `${hours}:${minutes} AM`;

    // Random card delivery time
    const cardDays = Math.floor(Math.random() * 3) + 3; // 3-5 days

    // Random language
    const languages = ['English', 'Spanish', 'English', 'English']; // Weight English more
    const language = languages[Math.floor(Math.random() * languages.length)];

    // Advisor name - Grace Wilson
    const advisorName = 'Grace Wilson';

    return {
      age,
      policyValue: `$${policyValue}K`,
      policyValueFull: `$${policyValue},000`,
      yearsAsCustomer,
      engagement,
      bestContactTime,
      followUpDate: followUpDateString,
      followUpTime,
      followUpDateTime: `${followUpDateString} @ ${followUpTime}`,
      cardDelivery: `${cardDays}-${cardDays + 2} days`,
      language,
      advisorName
    };
  });

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setEmailSent(false);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setEmailSent(false);
    }, 3000);
  };

  // Step 0: Voice Command Trigger
  const Step0 = () => (
    <Fade in timeout={600}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {/* Voice Command Visualization */}
        <Card
          sx={{
            mb: 3,
            background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
            color: 'white',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(55, 165, 38, 0.3)',
          }}
        >
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  bgcolor: alpha('#FFFFFF', 0.25),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                    '50%': { transform: 'scale(1.05)', opacity: 0.9 },
                  },
                }}
              >
                <AutoAwesome sx={{ fontSize: 50 }} />
              </Box>
            </Box>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700, fontStyle: 'italic' }}>
              "Send birthday wishes to {customerName}"
            </Typography>
            <Divider sx={{ my: 3, borderColor: alpha('#FFFFFF', 0.3) }} />
            <Typography variant="body1" sx={{ opacity: 0.95, fontSize: '1.1rem' }}>
              Your digital assistant analyzes customer data, determines the best engagement strategy, and prepares a personalized outreach campaign - all automatically.
            </Typography>
          </CardContent>
        </Card>

        {/* What Gets Prepared */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: `2px solid ${alpha(colors.lightBlue, 0.3)}`,
            background: '#FFFFFF',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Psychology sx={{ fontSize: 32, color: colors.blue, mr: 2 }} />
            <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
              What Gets Prepared Automatically:
            </Typography>
          </Box>
          <Stack spacing={2}>
            {[
              'Analyze customer communication preferences and consent history',
              'Study age-based engagement patterns from similar customers',
              'Determine optimal outreach channels (digital vs. physical)',
              'Generate personalized, compliant messaging',
              'Schedule appropriate follow-up tasks and touchpoints',
            ].map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'start' }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, mt: 0.5, fontSize: 20 }} />
                <Typography variant="body1">{item}</Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Fade>
  );

  // Step 1: Customer Insight Trigger
  const Step1 = () => (
    <Fade in timeout={600}>
      <Card
        sx={{
          maxWidth: 800,
          mx: 'auto',
          background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(27, 117, 187, 0.3)',
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: alpha('#FFFFFF', 0.1),
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: alpha('#FFFFFF', 0.08),
          }}
        />

        <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                background: alpha('#FFFFFF', 0.2),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <Cake sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.5, fontSize: '0.875rem' }}>
                Customer Milestone Alert
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9, display: 'block' }}>
                Proactive Engagement Opportunity
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: alpha('#FFFFFF', 0.2) }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: '2.5rem',
                fontFamily: 'Roboto Slab, serif',
                fontWeight: 700,
                background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.yellow} 100%)`,
                border: '4px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              {initials}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: 'Roboto Slab, serif',
                  fontWeight: 800,
                  mb: 0.5,
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                Upcoming Birthday
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 500, opacity: 0.95 }}>
                {customerName} turns <Box component="span" sx={{ fontWeight: 700, fontSize: '1.5em' }}>{customerData.age}</Box> in 2 weeks
              </Typography>

              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Chip
                  icon={<AttachMoney sx={{ color: 'white !important' }} />}
                  label={`${customerData.policyValue} Policy Value`}
                  sx={{
                    bgcolor: colors.green,
                    color: 'white',
                    fontWeight: 600,
                    px: 1,
                    '& .MuiChip-icon': { color: 'white' },
                  }}
                />
                <Chip
                  icon={<Schedule sx={{ color: 'white !important' }} />}
                  label={`${customerData.yearsAsCustomer} Years Customer`}
                  sx={{
                    bgcolor: colors.lightGreen,
                    color: 'white',
                    fontWeight: 600,
                    px: 1,
                  }}
                />
                <Chip
                  icon={<Stars sx={{ color: 'white !important' }} />}
                  label={customerData.engagement}
                  sx={{
                    bgcolor: colors.orange,
                    color: 'white',
                    fontWeight: 600,
                    px: 1,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );

  // Step 2: Communication Preferences
  const Step2 = () => (
    <Fade in timeout={600}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {/* Analysis Badge */}
        <Paper
          elevation={0}
          sx={{
            mb: 2,
            p: 2,
            background: `linear-gradient(135deg, ${alpha(colors.blue, 0.1)} 0%, ${alpha(colors.lightBlue, 0.05)} 100%)`,
            border: `2px solid ${colors.lightBlue}`,
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Psychology sx={{ color: colors.blue, fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700} color={colors.blue}>
              Retrieving: Customer Communication Preferences
            </Typography>
          </Box>
        </Paper>

        <Card
          sx={{
            background: colors.paleAqua,
            boxShadow: '0 8px 32px rgba(0, 173, 238, 0.15)',
          }}
        >
          <Box
            sx={{
              background: `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.blue} 100%)`,
              p: 3,
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    bgcolor: alpha('#FFFFFF', 0.2),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <Email sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700 }}>
                    Communication Preferences
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Retrieved from customer profile & consent management
                  </Typography>
                </Box>
              </Box>
              <Chip
                icon={<AutoAwesome sx={{ color: 'white !important' }} />}
                label="Auto-Retrieved"
                sx={{
                  bgcolor: alpha('#FFFFFF', 0.25),
                  color: 'white',
                  fontWeight: 700,
                }}
              />
            </Box>
          </Box>

        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            {/* Preferred Channels */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `2px solid ${colors.lightGreen}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ color: colors.green, mr: 1.5, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Preferred Channels
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, ml: 5 }}>
                <Chip
                  icon={<Email />}
                  label="Email"
                  sx={{
                    bgcolor: colors.green,
                    color: 'white',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: 'white' },
                  }}
                />
                <Chip
                  icon={<Phone />}
                  label="Phone"
                  sx={{
                    bgcolor: colors.lightGreen,
                    color: 'white',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: 'white' },
                  }}
                />
              </Box>
            </Paper>

            {/* Avoid */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `2px solid ${alpha(colors.red, 0.3)}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: colors.red,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5,
                  }}
                >
                  <Box sx={{ width: 12, height: 2, bgcolor: 'white' }} />
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Do Not Contact Via
                </Typography>
              </Box>
              <Box sx={{ ml: 5 }}>
                <Chip
                  label="SMS Marketing"
                  sx={{
                    bgcolor: alpha(colors.red, 0.2),
                    color: colors.red,
                    fontWeight: 600,
                    border: `1px solid ${colors.red}`,
                  }}
                />
              </Box>
            </Paper>

            {/* Details */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 3,
                  background: '#FFFFFF',
                  border: `2px solid ${alpha(colors.orange, 0.3)}`,
                  borderRadius: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <AccessTime sx={{ color: colors.orange, mr: 1.5, fontSize: 24 }} />
                  <Typography variant="subtitle2" fontWeight={700} color={colors.orange}>
                    Best Contact Time
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ ml: 5 }}>
                  {customerData.bestContactTime}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 3,
                  background: '#FFFFFF',
                  border: `2px solid ${alpha(colors.blue, 0.3)}`,
                  borderRadius: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <Language sx={{ color: colors.blue, mr: 1.5, fontSize: 24 }} />
                  <Typography variant="subtitle2" fontWeight={700} color={colors.blue}>
                    Language
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ ml: 5 }}>
                  {customerData.language}
                </Typography>
              </Paper>
            </Box>

            {/* Compliance */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `2px solid ${colors.green}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Security sx={{ color: colors.green, mr: 2, fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700} color={colors.green}>
                    ✓ Compliance Verified
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    All consents active • TCPA compliant • Privacy preferences honored
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Stack>
        </CardContent>
        </Card>
      </Box>
    </Fade>
  );

  // Step 3: Age-Based Engagement Patterns
  const Step3 = () => (
    <Fade in timeout={600}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {/* Analysis Badge */}
        <Paper
          elevation={0}
          sx={{
            mb: 2,
            p: 2,
            background: '#FFFFFF',
            border: `2px solid ${colors.orange}`,
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                <Psychology sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700 }}>
                  Age-Based Engagement Insights
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  Agent-driven behavioral analysis
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={<AutoAwesome sx={{ color: 'white !important' }} />}
              label="Proactive Insight"
              sx={{
                bgcolor: alpha('#FFFFFF', 0.25),
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            />
          </Box>
        </Paper>

        <Card
          sx={{
            background: colors.paleAqua,
            boxShadow: '0 8px 32px rgba(246, 146, 30, 0.2)',
          }}
        >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `3px solid ${colors.lightBlue}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.blue}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                <Lightbulb sx={{ color: colors.blue, mr: 2, fontSize: 28, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700} color={colors.blue} gutterBottom>
                    Customers {customerData.age >= 60 ? '60+' : '50+'} prefer personalized & human tone
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Avoid generic automated messaging. Personal touch increases response by{' '}
                    <Box component="span" sx={{ fontWeight: 700, color: colors.green }}>47%</Box>.
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `3px solid ${colors.lightGreen}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.green}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                <TrendingUp sx={{ color: colors.green, mr: 2, fontSize: 28, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700} color={colors.green} gutterBottom>
                    Higher engagement with advisor-led communication
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    This demographic responds{' '}
                    <Box component="span" sx={{ fontWeight: 700, color: colors.orange }}>3x better</Box>{' '}
                    to direct advisor contact vs. automated emails.
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `3px solid ${colors.orange}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.orange}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                <CardGiftcard sx={{ color: colors.orange, mr: 2, fontSize: 28, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700} color={colors.orange} gutterBottom>
                    Physical mail increases trust for milestone events
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Printed cards for birthdays show{' '}
                    <Box component="span" sx={{ fontWeight: 700, color: colors.blue }}>62% higher</Box>{' '}
                    brand sentiment among seniors.
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Confidence Score */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
                color: 'white',
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Verified sx={{ mr: 1.5, fontSize: 32 }} />
                  <Typography variant="h6" fontWeight={700}>
                    Confidence Score
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 150 }}>
                    <LinearProgress
                      variant="determinate"
                      value={92}
                      sx={{
                        height: 12,
                        borderRadius: 6,
                        bgcolor: alpha('#FFFFFF', 0.3),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'white',
                          borderRadius: 6,
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="h4" fontWeight={800}>
                    92%
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Stack>
        </CardContent>
        </Card>
      </Box>
    </Fade>
  );

  // Step 4: Outreach Strategy Decision
  const Step4 = () => (
    <Fade in timeout={600}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {/* Recommendation Badge */}
        <Paper
          elevation={0}
          sx={{
            mb: 2,
            p: 2,
            background: `linear-gradient(135deg, ${alpha(colors.green, 0.15)} 0%, ${alpha(colors.lightGreen, 0.1)} 100%)`,
            border: `2px solid ${colors.green}`,
            borderRadius: 3,
          }}
        >
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
              <AutoAwesome sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700 }}>
                Personalized Outreach Strategy
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.95 }}>
                Agent-recommended multi-channel approach
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Card
          sx={{
            background: colors.paleAqua,
            boxShadow: '0 8px 32px rgba(27, 117, 187, 0.2)',
          }}
        >
        <CardContent sx={{ p: 4 }}>
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 3,
              background: '#FFFFFF',
              border: `3px solid ${colors.lightGreen}`,
            }}
          >
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
              Based on preferences and engagement data:
            </Typography>
            <Typography variant="h5" color={colors.green} fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
              Multi-Touch Personalized Engagement Strategy
            </Typography>
          </Paper>

          <Stack spacing={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `3px solid ${colors.blue}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.blue}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, fontSize: 32 }} />
                <MailOutline sx={{ color: colors.blue, mr: 1.5, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Email with personalized message
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ ml: 8, fontWeight: 500 }}>
                Send warm, advisor-signed birthday message via preferred email channel
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `3px solid ${colors.lightGreen}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.green}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, fontSize: 32 }} />
                <LocalPhone sx={{ color: colors.lightGreen, mr: 1.5, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Advisor phone follow-up recommended
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ ml: 8, fontWeight: 500 }}>
                Schedule personal call 2 days after birthday during preferred morning hours
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `3px solid ${colors.orange}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.orange}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, fontSize: 32 }} />
                <CardGiftcard sx={{ color: colors.orange, mr: 1.5, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Send printed milestone card
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ ml: 8, fontWeight: 500 }}>
                Premium {customerData.age}th birthday card to arrive within {customerData.cardDelivery}
              </Typography>
            </Paper>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Security sx={{ fontSize: 32, mr: 2 }} />
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  ✓ Compliance Approved
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  All channels verified against consent preferences and regulatory requirements
                </Typography>
              </Box>
            </Box>
          </Paper>
        </CardContent>
      </Card>
      </Box>
    </Fade>
  );

  // Step 5: Advisor Action Items
  const Step5 = () => (
    <Fade in timeout={600}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            p: 3,
            background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
            color: 'white',
            borderRadius: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                <TaskAlt sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700 }}>
                  Ready to Send
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  Agent-generated, compliance-approved
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={<Verified sx={{ color: 'white !important' }} />}
              label="Approved & Ready"
              sx={{
                bgcolor: alpha('#FFFFFF', 0.25),
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            />
          </Box>
        </Paper>

        {/* Customer Quick Summary */}
        <Card sx={{ mb: 3, background: colors.paleAqua }}>
          <Box sx={{ p: 3, background: alpha(colors.blue, 0.1), borderBottom: `3px solid ${colors.blue}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccountCircle sx={{ color: colors.blue, mr: 1.5, fontSize: 28 }} />
              <Typography variant="h6" fontWeight={700}>
                Customer Summary
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Quick context before you send
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Customer
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {customerName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Milestone
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {customerData.age}th Birthday (in 2 weeks)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Relationship
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {customerData.yearsAsCustomer} Years
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Policy Value
                </Typography>
                <Typography variant="body1" fontWeight={700} color={colors.green}>
                  {customerData.policyValueFull}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Email Preview */}
        <Card sx={{
          mb: 3,
          background: colors.paleAqua,
          border: emailSent ? `3px solid ${colors.green}` : 'none',
          transition: 'all 0.3s ease'
        }}>
          <Box sx={{
            p: 3,
            background: emailSent
              ? alpha(colors.green, 0.15)
              : alpha(colors.lightBlue, 0.1),
            borderBottom: `3px solid ${emailSent ? colors.green : colors.lightBlue}`,
            transition: 'all 0.3s ease'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ color: colors.lightBlue, mr: 1.5, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700}>
                  Email Ready to Send
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                startIcon={emailSent ? <CheckCircle /> : <SendOutlined />}
                onClick={handleSendEmail}
                disabled={emailSent}
                sx={{
                  background: emailSent
                    ? `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`
                    : `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.blue} 100%)`,
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
              >
                {emailSent ? 'Sent!' : 'Send Now'}
              </Button>
            </Box>
          </Box>
          <CardContent sx={{ p: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: 'white',
                border: `2px solid ${alpha(colors.lightBlue, 0.3)}`,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  whiteSpace: 'pre-line',
                  color: 'text.primary',
                }}
              >
                {`Dear ${firstName},

Wishing you a wonderful ${customerData.age}th birthday! It has been our privilege to support you over the past ${customerData.yearsAsCustomer} years. If there is anything you need as you celebrate this milestone, I'm here to help.

Warm regards,
${customerData.advisorName}
Senior Advisor`}
              </Typography>
            </Paper>
          </CardContent>
        </Card>

        {/* Next Steps for Advisor */}
        <Card sx={{ background: colors.paleAqua }}>
          <Box sx={{ p: 3, background: alpha(colors.orange, 0.1), borderBottom: `3px solid ${colors.orange}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Lightbulb sx={{ color: colors.orange, mr: 1.5, fontSize: 28 }} />
              <Typography variant="h6" fontWeight={700}>
                Your Next Actions
              </Typography>
            </Box>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  background: '#FFFFFF',
                  border: `2px solid ${colors.green}`,
                  borderRadius: 2,
                  borderLeft: `6px solid ${colors.green}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <CheckCircle sx={{ color: colors.green, mr: 2, mt: 0.3 }} />
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                      Follow-up call scheduled
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {customerData.followUpDateTime} - Call prepared in your calendar
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  background: '#FFFFFF',
                  border: `2px solid ${colors.lightBlue}`,
                  borderRadius: 2,
                  borderLeft: `6px solid ${colors.lightBlue}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Phone sx={{ color: colors.lightBlue, mr: 2, mt: 0.3 }} />
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                      Call talking points ready
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Birthday wishes • Policy review opportunity {customerData.age === 65 ? '• Medicare transition at 65' : customerData.age > 65 ? '• Medicare supplement review' : '• Coverage optimization'}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  background: '#FFFFFF',
                  border: `2px solid ${colors.orange}`,
                  borderRadius: 2,
                  borderLeft: `6px solid ${colors.orange}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <CardGiftcard sx={{ color: colors.orange, mr: 2, mt: 0.3 }} />
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                      Physical card being sent
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Premium {customerData.age}th milestone card - arrives in {customerData.cardDelivery}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );

  // Step 6: Follow-up Automation
  const Step6 = () => (
    <Fade in timeout={600}>
      <Card
        sx={{
          maxWidth: 800,
          mx: 'auto',
          background: colors.paleAqua,
          boxShadow: '0 8px 32px rgba(55, 165, 38, 0.2)',
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
            p: 3,
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                <TaskAlt sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700 }}>
                  Automated Follow-Up
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  Automated task scheduling complete
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={<AutoAwesome sx={{ color: 'white !important' }} />}
              label="Automated"
              sx={{
                bgcolor: alpha('#FFFFFF', 0.25),
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            />
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3} sx={{ mb: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `3px solid ${colors.blue}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, mt: 0.5, fontSize: 32 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: 'Roboto Slab, serif' }}>
                    Advisor Call Scheduled
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom fontWeight={500}>
                    Personal follow-up call with {customerName}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                    <Chip
                      icon={<Schedule sx={{ color: 'white !important' }} />}
                      label={customerData.followUpDateTime}
                      sx={{ bgcolor: colors.lightBlue, color: 'white', fontWeight: 600 }}
                    />
                    <Chip
                      label={`${customerData.advisorName} (Advisor)`}
                      sx={{ bgcolor: colors.blue, color: 'white', fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `3px solid ${colors.orange}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, mt: 0.5, fontSize: 32 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: 'Roboto Slab, serif' }}>
                    Printed Card Request Sent
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom fontWeight={500}>
                    Premium {customerData.age}th birthday milestone card
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                    <Chip
                      icon={<CardGiftcard sx={{ color: 'white !important' }} />}
                      label={`Delivery: ${customerData.cardDelivery}`}
                      sx={{ bgcolor: colors.orange, color: 'white', fontWeight: 600 }}
                    />
                    <Chip
                      label="Address verified"
                      sx={{ bgcolor: colors.yellow, color: '#333', fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#FFFFFF',
                border: `3px solid ${colors.lightGreen}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, mt: 0.5, fontSize: 32 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: 'Roboto Slab, serif' }}>
                    Policy Review Reminder Set
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom fontWeight={500}>
                    Opportune time to discuss coverage options
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                    <Chip
                      icon={<Schedule sx={{ color: 'white !important' }} />}
                      label="During follow-up call"
                      sx={{ bgcolor: colors.lightGreen, color: 'white', fontWeight: 600 }}
                    />
                    <Chip
                      label="Milestone opportunity"
                      sx={{ bgcolor: colors.green, color: 'white', fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUp sx={{ mr: 2, fontSize: 36 }} />
              <Typography variant="h5" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                Expected Impact
              </Typography>
            </Box>
            <Stack spacing={2}>
              {[
                '47% higher engagement through personalized touch',
                '3x better response with advisor-led follow-up',
                '62% improvement in brand sentiment with physical card',
              ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: colors.yellow,
                      mr: 2,
                    }}
                  />
                  <Typography variant="body1" fontWeight={500}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </CardContent>
      </Card>
    </Fade>
  );

  const steps = [
    { component: <Step0 />, title: 'Voice Command' },
    { component: <Step1 />, title: 'Customer Milestone' },
    { component: <Step2 />, title: 'Comm Preferences' },
    { component: <Step3 />, title: 'Engagement Insights' },
    { component: <Step4 />, title: 'Strategy Decision' },
    { component: <Step5 />, title: 'Message' },
    { component: <Step6 />, title: 'Follow-Up' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#FFFFFF',
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        {/* Feature Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: 'Roboto Slab, serif',
              fontWeight: 700,
              color: colors.blue,
              mb: 3,
            }}
          >
            Personalized Customer Engagement
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom fontWeight={600}>
            Proactive Birthday Outreach
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontSize: '1.1rem' }}>
            Your personal agent surfaces relevant context and creates personalized engagement
            strategies based on what matters most to each customer
          </Typography>
        </Box>

        {/* Progress Indicator */}
        <Box sx={{ mb: 5, maxWidth: 900, mx: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            {steps.map((step, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative',
                }}
              >
                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      left: 'calc(50% + 20px)',
                      width: 'calc(100% - 40px)',
                      height: 4,
                      bgcolor: index < currentStep ? colors.green : alpha(colors.lightBlue, 0.3),
                      transition: 'all 0.3s ease',
                      borderRadius: 2,
                      zIndex: 0,
                    }}
                  />
                )}
                <Box
                  onClick={() => setCurrentStep(index)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background:
                      index <= currentStep
                        ? `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`
                        : alpha(colors.lightBlue, 0.2),
                    color: index <= currentStep ? 'white' : 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                    mb: 1,
                    position: 'relative',
                    zIndex: 1,
                    border: `3px solid ${index <= currentStep ? colors.green : alpha(colors.lightBlue, 0.3)}`,
                    boxShadow: index <= currentStep ? `0 4px 12px ${alpha(colors.green, 0.4)}` : 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 6px 16px ${alpha(index <= currentStep ? colors.green : colors.lightBlue, 0.5)}`,
                      border: `3px solid ${index <= currentStep ? colors.lightGreen : colors.lightBlue}`,
                    },
                  }}
                >
                  {index < currentStep ? <CheckCircle sx={{ fontSize: 24 }} /> : index + 1}
                </Box>
                <Typography
                  variant="caption"
                  color={index <= currentStep ? 'text.primary' : 'text.secondary'}
                  fontWeight={index === currentStep ? 700 : 500}
                  onClick={() => setCurrentStep(index)}
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: index <= currentStep ? colors.green : colors.lightBlue,
                      fontWeight: 700,
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {step.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Current Step Content */}
        <Box sx={{ minHeight: 500, mb: 4 }}>{steps[currentStep].component}</Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            maxWidth: 800,
            mx: 'auto',
          }}
        >
          {currentStep > 0 && (
            <Button
              variant="outlined"
              size="large"
              onClick={handlePrevious}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderColor: colors.lightBlue,
                color: colors.blue,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  borderColor: colors.blue,
                  bgcolor: alpha(colors.lightBlue, 0.1),
                },
              }}
            >
              Previous
            </Button>
          )}

          {currentStep < steps.length - 1 ? (
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={handleNext}
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1rem',
                background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
                boxShadow: `0 4px 16px ${alpha(colors.lightBlue, 0.4)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${colors.blue} 20%, ${colors.lightBlue} 100%)`,
                  boxShadow: `0 6px 20px ${alpha(colors.lightBlue, 0.5)}`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={handleRestart}
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1rem',
                background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
                boxShadow: `0 4px 16px ${alpha(colors.green, 0.4)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${colors.green} 20%, ${colors.lightGreen} 100%)`,
                  boxShadow: `0 6px 20px ${alpha(colors.green, 0.5)}`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Start Over
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DemoScreen;
 
