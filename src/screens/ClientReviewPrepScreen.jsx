import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Paper,
  Chip,
  Button,
  Stack,
  Fade,
  IconButton,
  alpha,
  Grid,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Close,
  CheckCircle,
  Warning,
  AttachMoney,
  Description,
  TrendingUp,
  Security,
  Lightbulb,
  ArrowForward,
  Schedule,
  Person,
  Assessment,
  Gavel,
  Edit,
  Send,
  CloudDownload,
} from '@mui/icons-material';

const colors = {
  orange: '#F6921E',
  lightGreen: '#8BC53F',
  lightBlue: '#00ADEE',
  blue: '#1B75BB',
  red: '#D02E2E',
  paleAqua: '#F2F7F6',
};

const ClientReviewPrepScreen = ({
  onClose,
  clientData = {
    name: 'Sam Wright',
    age: 42,
    meetingTime: '2:30 PM',
    accountValue: 485000,
  }
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [sendSignatureOpen, setSendSignatureOpen] = useState(false);
  const [sendingSignature, setSendingSignature] = useState(false);
  const [signatureSent, setSignatureSent] = useState(false);
  const [downloadingBrief, setDownloadingBrief] = useState(false);
  const [joiningMeeting, setJoiningMeeting] = useState(false);

  // Progressive step reveal
  useEffect(() => {
    if (currentStep === 0) {
      const timer = setTimeout(() => setCurrentStep(1), 800);
      return () => clearTimeout(timer);
    }
    if (currentStep > 0 && currentStep < 6) {
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Document preview data
  const documentContent = {
    'Rider Application': {
      title: 'Long-Term Care & Accelerated Death Benefit Rider Application',
      content: `
APPLICANT INFORMATION:
Name: ${clientData.name}
Date of Birth: March 15, 1982
Age: ${clientData.age}
Policy Number: IUL-${Math.random().toString(36).substr(2, 9).toUpperCase()}

EXISTING COVERAGE:
Current Policy Value: $${clientData.accountValue.toLocaleString()}
Death Benefit: $300,000
Current Monthly Premium: $425

REQUESTED RIDERS:
☑ Long-Term Care Benefit Rider
  - Coverage Amount: $150,000
  - Daily Benefit: $200/day
  - Benefit Period: 750 days

☑ Accelerated Death Benefit Rider
  - Maximum Acceleration: 50% of death benefit
  - Qualifying conditions: Terminal illness with 12 months or less life expectancy

ADDITIONAL PREMIUM: $45/month
TOTAL NEW PREMIUM: $470/month

HEALTH DECLARATIONS:
[Pre-filled from existing policy data]
No significant health changes since original underwriting.

SIGNATURES:
☐ Applicant Signature (e-signature pending)
☐ Agent Signature: [Your Name]
☐ Date: ${new Date().toLocaleDateString()}
      `.trim(),
    },
    'Disclosures Package': {
      title: 'Required Disclosures & Notices',
      content: `
STATE-SPECIFIC DISCLOSURES - CALIFORNIA

NOTICE TO APPLICANT REGARDING REPLACEMENT:
This application for insurance may result in the replacement of existing insurance. A replacement occurs when a new policy is purchased and an existing policy is lapsed, forfeited, surrendered, or otherwise terminated.

IMPORTANT TAX INFORMATION:
The Long-Term Care rider may provide tax-qualified benefits under IRC Section 7702B. Consult with your tax advisor regarding the tax treatment of benefits.

ACCELERATED DEATH BENEFIT DISCLOSURE:
- Receipt of accelerated benefits may affect eligibility for Medicaid
- Benefits received may be taxable
- Receipt of benefits will reduce death benefit payable to beneficiaries
- May affect eligibility for other government programs

COST DISCLOSURE:
Monthly Premium Breakdown:
- Base IUL Premium: $425
- LTC Rider: $35/month
- ADB Rider: $10/month
- Total: $470/month

POLICY FEES:
- Policy Administration Fee: $120/year
- Surrender Charges: Years 1-10 (decreasing schedule)

SUITABILITY STATEMENT:
This recommendation is based on:
✓ Current age and health status
✓ Income level ($120,000/year)
✓ Existing coverage analysis
✓ Risk tolerance (conservative)
✓ Long-term care planning needs

RIGHT TO EXAMINE:
You have the right to examine this policy for 30 days. If you are not satisfied, return it for a full refund.

ACKNOWLEDGMENTS:
☐ I have received and read this disclosure
☐ I understand the terms and conditions
☐ I understand this is a legally binding contract

California Department of Insurance License #: 0123456
      `.trim(),
    },
    'Policy Illustration': {
      title: '30-Year Income Projection Analysis',
      content: `
INDEXED UNIVERSAL LIFE POLICY ILLUSTRATION
Prepared for: ${clientData.name}

CURRENT POLICY DETAILS:
Policy Value: $${clientData.accountValue.toLocaleString()}
Death Benefit: $300,000
Monthly Premium: $425 (increasing to $470 with riders)

PROJECTED VALUES (Assuming 6.5% annual return):

Age 50: $625,000 policy value
Age 55: $785,000 policy value
Age 60: $965,000 policy value
Age 65: $1,175,000 policy value (Retirement)
Age 70: $980,000 (after 5 years of $2,400/mo withdrawals)
Age 75: $765,000 (continuing withdrawals)
Age 80: $532,000 (continuing withdrawals)
Age 85: $278,000 (continuing withdrawals)
Age 90: $0 (depleted)

INCOME PHASE (Age 65-90):
Monthly Withdrawal: $2,400
Annual Income: $28,800
Total Income Over 25 Years: $720,000

DEATH BENEFIT:
- Before Age 65: $300,000 + Policy Value
- During Income Phase: $300,000 base + remaining value

LONG-TERM CARE BENEFIT:
If needed before age 80:
- Daily Benefit: $200/day ($73,000/year)
- Maximum Benefit: $150,000
- Benefit Period: 750 days

KEY ASSUMPTIONS:
- Index crediting rate: 6.5% (not guaranteed)
- Policy fees: 1.2% annually
- No policy loans taken
- No additional deposits beyond scheduled premiums

GUARANTEES:
- Minimum death benefit: $300,000
- Maximum out-of-pocket: Premium amounts paid
- Cash surrender value access available

This is a hypothetical illustration based on current assumptions.
Actual results may vary based on market performance and policy management.
      `.trim(),
    },
  };

  // Handler functions
  const handleOpenDocument = (docName) => {
    setSelectedDocument(documentContent[docName]);
    setDocumentModalOpen(true);
  };

  const handleCloseDocument = () => {
    setDocumentModalOpen(false);
    setSelectedDocument(null);
  };

  const handleSendForSignature = () => {
    setSendSignatureOpen(true);
  };

  const handleConfirmSendSignature = () => {
    setSendingSignature(true);
    // Simulate sending
    setTimeout(() => {
      setSendingSignature(false);
      setSignatureSent(true);
      setSendSignatureOpen(false);
      setTimeout(() => setSignatureSent(false), 5000);
    }, 2000);
  };

  const handleDownloadBrief = () => {
    setDownloadingBrief(true);
    // Simulate download
    setTimeout(() => {
      // Create a text summary
      const briefContent = `
CLIENT REVIEW BRIEF
Generated: ${new Date().toLocaleString()}
Meeting Time: ${clientData.meetingTime}

CLIENT: ${clientData.name}
Age: ${clientData.age}
Account Value: $${clientData.accountValue.toLocaleString()}

PRIORITY ISSUES:
1. URGENT: Billing friction - Payment $425 overdue (12 days)
2. Pending medical exam for term conversion
3. Upgrade opportunity: LTC + ADB riders ($45/mo)

MEETING AGENDA:
1. Address billing concerns first
2. Reinforce protection improvements
3. Discuss income sustainability
4. Introduce upgrade opportunity

DOCUMENTS READY:
- Rider Application (pre-filled)
- Disclosures Package (7 pages)
- Policy Illustration (30-year projection)
- E-Signature ready via DocuSign

COMPLIANCE:
- Suitability Score: 92%
- Affordability: PASS (3.8% of income)
- Disclosures: Ready
      `.trim();

      // Create and download file
      const blob = new Blob([briefContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ClientBrief_${clientData.name.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setDownloadingBrief(false);
    }, 1500);
  };

  const handleJoinMeeting = () => {
    setJoiningMeeting(true);
    // Simulate joining meeting - in real app would open Zoom/Teams/etc
    setTimeout(() => {
      alert(`Opening meeting for ${clientData.name} at ${clientData.meetingTime}\n\nIn production, this would:\n- Open your video conferencing app\n- Load client context on second screen\n- Start call recording\n- Enable automated assistant for real-time notes`);
      setJoiningMeeting(false);
    }, 1500);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', pb: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
          color: '#fff',
          p: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Client Review Prep
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {clientData.name} • {clientData.meetingTime} Meeting
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ color: '#fff' }}>
              <Close />
            </IconButton>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {/* Step 1: Gathering Data */}
        <Fade in={currentStep >= 1} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ fontSize: 28, color: colors.lightBlue, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  Gathering Client Intelligence
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Scanning multiple systems for comprehensive client view
              </Typography>

              {currentStep >= 1 && (
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.lightBlue, 0.1), borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CheckCircle sx={{ color: colors.lightGreen, fontSize: 18 }} />
                          <Typography variant="caption" fontWeight={600}>Service Activity</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          3 interactions last 30 days
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.orange, 0.1), borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Warning sx={{ color: colors.orange, fontSize: 18 }} />
                          <Typography variant="caption" fontWeight={600}>Billing Status</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          Payment 12 days overdue
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.lightGreen, 0.1), borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CheckCircle sx={{ color: colors.lightGreen, fontSize: 18 }} />
                          <Typography variant="caption" fontWeight={600}>Applications</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          1 pending medical exam
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.blue, 0.1), borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <TrendingUp sx={{ color: colors.blue, fontSize: 18 }} />
                          <Typography variant="caption" fontWeight={600}>Opportunities</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          Upgrade eligible
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 2, p: 2, bgcolor: alpha(colors.lightBlue, 0.05), borderRadius: 2 }}>
                    <Typography variant="caption" fontWeight={600} sx={{ display: 'block', mb: 1 }}>
                      Systems Scanned
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip label="Policy Admin" size="small" sx={{ bgcolor: 'white' }} />
                      <Chip label="Billing" size="small" sx={{ bgcolor: 'white' }} />
                      <Chip label="Underwriting" size="small" sx={{ bgcolor: 'white' }} />
                      <Chip label="CRM" size="small" sx={{ bgcolor: 'white' }} />
                      <Chip label="Claims History" size="small" sx={{ bgcolor: 'white' }} />
                      <Chip label="Competitor Data" size="small" sx={{ bgcolor: 'white' }} />
                    </Stack>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Fade>

        {/* Step 2: Key Issues Identified */}
        <Fade in={currentStep >= 2} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Warning sx={{ fontSize: 28, color: colors.orange, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  Priority Issues Detected
                </Typography>
              </Box>

              <Stack spacing={2}>
                {/* Billing Friction */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.red, 0.05), borderLeft: `4px solid ${colors.red}` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700} color="error">
                        Billing Friction - URGENT
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Premium payment of $425 is 12 days overdue. Auto-pay failed due to expired card on file.
                      </Typography>
                    </Box>
                    <Chip label="Address First" size="small" color="error" />
                  </Box>
                </Paper>

                {/* Application Status */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.orange, 0.05), borderLeft: `4px solid ${colors.orange}` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700} sx={{ color: colors.orange }}>
                        Pending Medical Exam
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Term conversion application submitted 3 weeks ago. Medical exam scheduled for next Tuesday but lab work still outstanding.
                      </Typography>
                    </Box>
                    <Chip label="Follow Up" size="small" sx={{ bgcolor: colors.orange, color: 'white' }} />
                  </Box>
                </Paper>

                {/* Cross-Policy Exposure */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.blue, 0.05), borderLeft: `4px solid ${colors.blue}` }}>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ color: colors.blue }}>
                    Cross-Policy Analysis
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Client holds 3 policies: Term ($500K), Whole Life ($250K), and Indexed Universal Life ($300K). Combined coverage: $1.05M across products.
                  </Typography>
                </Paper>

                {/* Competitor Quote */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.orange, 0.05), borderLeft: `4px solid ${colors.orange}` }}>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ color: colors.orange }}>
                    Prior Competitor Quote Found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    6 months ago, client received quote from MutualCo for $750K term at $380/mo. Current rate is competitive.
                  </Typography>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 3: Structured Meeting Brief */}
        <Fade in={currentStep >= 3} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3, border: `2px solid ${colors.lightGreen}` }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Lightbulb sx={{ fontSize: 28, color: colors.lightGreen, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  Recommended Meeting Structure
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Personalized agenda optimized for this client's situation
              </Typography>

              <List sx={{ bgcolor: alpha(colors.lightGreen, 0.05), borderRadius: 2, p: 2 }}>
                <ListItem sx={{ alignItems: 'flex-start', py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Box
                      sx={{
                        bgcolor: colors.red,
                        color: 'white',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    >
                      1
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="subtitle2" fontWeight={700}>Address Billing Concerns First</Typography>}
                    secondary="Acknowledge the overdue payment, update card on file, offer to waive late fee as goodwill gesture. Emphasize value of maintaining coverage continuity."
                  />
                </ListItem>

                <Divider sx={{ my: 1 }} />

                <ListItem sx={{ alignItems: 'flex-start', py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Box
                      sx={{
                        bgcolor: colors.lightBlue,
                        color: 'white',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    >
                      2
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="subtitle2" fontWeight={700}>Reinforce Protection Improvements</Typography>}
                    secondary="Review current coverage ($1.05M total). Highlight how the term conversion application strengthens long-term protection and aligns with retirement planning goals."
                  />
                </ListItem>

                <Divider sx={{ my: 1 }} />

                <ListItem sx={{ alignItems: 'flex-start', py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Box
                      sx={{
                        bgcolor: colors.lightGreen,
                        color: 'white',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    >
                      3
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="subtitle2" fontWeight={700}>Discuss Income Sustainability</Typography>}
                    secondary="Show illustration projecting IUL account value through retirement. Current trajectory supports $2,400/month withdrawals starting at age 65 with balance lasting to age 90+."
                  />
                </ListItem>

                <Divider sx={{ my: 1 }} />

                <ListItem sx={{ alignItems: 'flex-start', py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Box
                      sx={{
                        bgcolor: colors.blue,
                        color: 'white',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    >
                      4
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="subtitle2" fontWeight={700}>Introduce Upgrade Opportunity</Typography>}
                    secondary="Client is eligible for enhanced riders on IUL: Long-Term Care and Accelerated Death Benefit. Adds $45/month but provides $150K in LTC benefits. Suitability score: 92%."
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 4: Compliance Validation */}
        <Fade in={currentStep >= 4} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Security sx={{ fontSize: 28, color: colors.lightGreen, mr: 1.5 }} />
                  <Typography variant="h6" fontWeight={700}>
                    Compliance & Suitability Validated
                  </Typography>
                </Box>
                <Chip
                  icon={<CheckCircle />}
                  label="Approved"
                  size="small"
                  sx={{ bgcolor: colors.lightGreen, color: '#fff', fontWeight: 600 }}
                />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.lightGreen, 0.05), borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Suitability Score</Typography>
                    <Typography variant="h5" fontWeight={700} color={colors.lightGreen} sx={{ my: 0.5 }}>
                      92%
                    </Typography>
                    <Typography variant="caption">
                      Excellent fit for risk profile
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.blue, 0.05), borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Affordability Check</Typography>
                    <Typography variant="h5" fontWeight={700} color={colors.blue} sx={{ my: 0.5 }}>
                      ✓ Pass
                    </Typography>
                    <Typography variant="caption">
                      3.8% of monthly income
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.lightBlue, 0.05), borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Disclosures</Typography>
                    <Typography variant="h5" fontWeight={700} color={colors.lightBlue} sx={{ my: 0.5 }}>
                      Ready
                    </Typography>
                    <Typography variant="caption">
                      State-compliant docs prepared
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 5: Documents Ready */}
        <Fade in={currentStep >= 5} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Description sx={{ fontSize: 28, color: colors.blue, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  Documents Pre-Filled & Ready
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                All paperwork prepared for immediate execution
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: colors.lightGreen,
                        boxShadow: `0 4px 12px ${alpha(colors.lightGreen, 0.2)}`,
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Edit sx={{ color: colors.lightGreen, fontSize: 32 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" fontWeight={700}>
                          Rider Application
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Pre-filled with client data
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        startIcon={<CloudDownload />}
                        sx={{ textTransform: 'none' }}
                        onClick={() => handleOpenDocument('Rider Application')}
                      >
                        Open
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: colors.orange,
                        boxShadow: `0 4px 12px ${alpha(colors.orange, 0.2)}`,
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Gavel sx={{ color: colors.orange, fontSize: 32 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" fontWeight={700}>
                          Disclosures Package
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          7 pages, compliance-approved
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        startIcon={<CloudDownload />}
                        sx={{ textTransform: 'none' }}
                        onClick={() => handleOpenDocument('Disclosures Package')}
                      >
                        Open
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: colors.blue,
                        boxShadow: `0 4px 12px ${alpha(colors.blue, 0.2)}`,
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Assessment sx={{ color: colors.blue, fontSize: 32 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" fontWeight={700}>
                          Policy Illustration
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          30-year income projection
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        startIcon={<CloudDownload />}
                        sx={{ textTransform: 'none' }}
                        onClick={() => handleOpenDocument('Policy Illustration')}
                      >
                        Open
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: colors.lightGreen,
                        boxShadow: `0 4px 12px ${alpha(colors.lightGreen, 0.2)}`,
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Send sx={{ color: colors.lightGreen, fontSize: 32 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" fontWeight={700}>
                          E-Signature Ready
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          DocuSign integration active
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        startIcon={<ArrowForward />}
                        sx={{ textTransform: 'none' }}
                        onClick={handleSendForSignature}
                      >
                        Send
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 6: Ready Summary */}
        <Fade in={currentStep >= 6} timeout={800}>
          <Card
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${colors.lightGreen} 0%, ${colors.lightBlue} 100%)`,
              color: 'white',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ fontSize: 32, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  You're Ready for {clientData.meetingTime}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ mb: 3, opacity: 0.95 }}>
                Complete client intelligence gathered in 8 seconds. No system-hopping required.
              </Typography>

              <Paper elevation={0} sx={{ p: 2, bgcolor: alpha('#fff', 0.15), borderRadius: 2, mb: 2 }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                  ✓ What You Have:
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  • Comprehensive view across 6 systems
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  • Priority issues ranked and contextualized
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  • Structured meeting agenda with talking points
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  • Compliance-validated upgrade opportunity
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                  • Pre-filled documents ready for e-signature
                </Typography>
              </Paper>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={joiningMeeting ? <CircularProgress size={20} color="inherit" /> : <Schedule />}
                  onClick={handleJoinMeeting}
                  disabled={joiningMeeting}
                  sx={{
                    bgcolor: 'white',
                    color: colors.lightGreen,
                    fontWeight: 700,
                    '&:hover': { bgcolor: alpha('#fff', 0.9) }
                  }}
                >
                  {joiningMeeting ? 'Launching...' : 'Join Meeting'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={downloadingBrief ? <CircularProgress size={20} color="inherit" /> : <CloudDownload />}
                  onClick={handleDownloadBrief}
                  disabled={downloadingBrief}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 700,
                    '&:hover': { borderColor: 'white', bgcolor: alpha('#fff', 0.1) }
                  }}
                >
                  {downloadingBrief ? 'Preparing...' : 'Download Brief'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Fade>
      </Container>

      {/* Document Preview Modal */}
      <Dialog
        open={documentModalOpen}
        onClose={handleCloseDocument}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: colors.lightBlue, color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={700}>
              {selectedDocument?.title}
            </Typography>
            <IconButton onClick={handleCloseDocument} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: alpha(colors.paleAqua, 0.5),
              borderRadius: 2,
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              fontSize: '0.875rem',
              lineHeight: 1.6,
            }}
          >
            {selectedDocument?.content}
          </Paper>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDocument}>Close</Button>
          <Button
            variant="contained"
            startIcon={<CloudDownload />}
            onClick={() => {
              // Download document
              const blob = new Blob([selectedDocument?.content || ''], { type: 'text/plain' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${selectedDocument?.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>

      {/* Send for E-Signature Modal */}
      <Dialog open={sendSignatureOpen} onClose={() => !sendingSignature && setSendSignatureOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Send sx={{ color: colors.lightGreen }} />
            <Typography variant="h6" fontWeight={700}>
              Send Documents for E-Signature
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Send the following documents to {clientData.name} via DocuSign for electronic signature:
          </Typography>

          <Stack spacing={1.5}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.lightBlue, 0.05), borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ color: colors.lightGreen }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>Rider Application</Typography>
                  <Typography variant="caption" color="text.secondary">3 signature fields</Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.lightBlue, 0.05), borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ color: colors.lightGreen }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>Disclosures Package</Typography>
                  <Typography variant="caption" color="text.secondary">7 pages, 12 initials required</Typography>
                </Box>
              </Box>
            </Paper>
          </Stack>

          <TextField
            fullWidth
            label="Client Email"
            defaultValue="sam.wright@email.com"
            margin="normal"
            sx={{ mt: 3 }}
          />

          <TextField
            fullWidth
            label="Personal Message (Optional)"
            multiline
            rows={2}
            defaultValue={`Hi ${clientData.name},\n\nAs discussed, I'm sending the rider application documents for your review and signature. Please let me know if you have any questions.`}
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setSendSignatureOpen(false)} disabled={sendingSignature}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmSendSignature}
            disabled={sendingSignature}
            startIcon={sendingSignature ? <CircularProgress size={20} color="inherit" /> : <Send />}
            sx={{ bgcolor: colors.lightGreen }}
          >
            {sendingSignature ? 'Sending...' : 'Send via DocuSign'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={signatureSent}
        autoHideDuration={5000}
        onClose={() => setSignatureSent(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSignatureSent(false)}
          severity="success"
          sx={{ width: '100%', fontWeight: 600 }}
          icon={<CheckCircle />}
        >
          Documents sent successfully to {clientData.name}! They'll receive an email from DocuSign shortly.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientReviewPrepScreen;
