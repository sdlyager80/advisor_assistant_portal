import React, { useState, useEffect, useRef } from 'react';
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
  Description,
  TrendingUp,
  Security,
  Lightbulb,
  ArrowForward,
  Schedule,
  Assessment,
  Gavel,
  Edit,
  Send,
  CloudDownload,
} from '@mui/icons-material';

const colors = {
  orange: '#F6921E',
  green: '#37A526',
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
    age: 59,
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
  const topRef = useRef(null);

  // Scroll to top when screen opens
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);

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
Date of Birth: March 6, 1966
Age: ${clientData.age} (turning 60 in 2 weeks)
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
    setTimeout(() => {
      setSendingSignature(false);
      setSignatureSent(true);
      setSendSignatureOpen(false);
      setTimeout(() => setSignatureSent(false), 5000);
    }, 2000);
  };

  const handleDownloadBrief = () => {
    setDownloadingBrief(true);
    setTimeout(() => {
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
    setTimeout(() => {
      alert(`Opening meeting for ${clientData.name} at ${clientData.meetingTime}\n\nIn production, this would:\n- Open your video conferencing app\n- Load client context on second screen\n- Start call recording\n- Enable automated assistant for real-time notes`);
      setJoiningMeeting(false);
    }, 1500);
  };

  return (
    <Box ref={topRef} sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', pb: 4 }}>

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: alpha(colors.blue, 0.08),
          borderBottom: `3px solid ${colors.blue}`,
          p: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" fontWeight={700} color={colors.blue}>
                Client Review Prep
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {clientData.name} • {clientData.meetingTime} Meeting
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ color: colors.blue }}>
              <Close />
            </IconButton>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg" sx={{ mt: 3 }}>

        {/* Step 1: Gathering Client Intelligence */}
        <Fade in={currentStep >= 1} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3, bgcolor: '#FFFFFF' }}>
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
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.lightBlue, 0.15)}`, borderLeft: `4px solid ${colors.lightBlue}`, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CheckCircle sx={{ color: colors.green, fontSize: 18 }} />
                          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.6 }}>Service Activity</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>3</Box> interactions last{' '}
                          <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>30 days</Box>
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.orange, 0.15)}`, borderLeft: `4px solid ${colors.orange}`, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Warning sx={{ color: colors.orange, fontSize: 18 }} />
                          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.6 }}>Billing Status</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Payment{' '}
                          <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>12 days</Box> overdue
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.lightGreen, 0.15)}`, borderLeft: `4px solid ${colors.green}`, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CheckCircle sx={{ color: colors.green, fontSize: 18 }} />
                          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.6 }}>Applications</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>1</Box> pending medical exam
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.blue, 0.15)}`, borderLeft: `4px solid ${colors.blue}`, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <TrendingUp sx={{ color: colors.blue, fontSize: 18 }} />
                          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.6 }}>Opportunities</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Upgrade eligible
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Paper elevation={0} sx={{ mt: 2, p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.lightBlue, 0.15)}`, borderLeft: `4px solid ${colors.lightBlue}`, borderRadius: 2 }}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                      Systems Scanned
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {['Policy Admin', 'Billing', 'Underwriting', 'CRM', 'Claims History', 'Competitor Data'].map((system) => (
                        <Chip key={system} label={system} size="small" sx={{ bgcolor: alpha(colors.lightBlue, 0.08), color: '#000000', border: `1px solid ${alpha(colors.lightBlue, 0.25)}`, fontWeight: 600 }} />
                      ))}
                    </Stack>
                  </Paper>
                </Box>
              )}
            </CardContent>
          </Card>
        </Fade>

        {/* Step 2: Priority Issues Detected */}
        <Fade in={currentStep >= 2} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3, bgcolor: '#FFFFFF' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Warning sx={{ fontSize: 28, color: colors.orange, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  Priority Issues Detected
                </Typography>
              </Box>

              <Stack spacing={2}>
                {/* Billing Friction */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.red, 0.15)}`, borderLeft: `4px solid ${colors.red}`, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700} color={colors.red}>
                        Billing Friction — URGENT
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Premium payment of{' '}
                        <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>$425</Box> is{' '}
                        <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>12 days</Box> overdue. Auto-pay failed due to expired card on file.
                      </Typography>
                    </Box>
                    <Chip label="Address First" size="small" sx={{ ml: 1, bgcolor: alpha(colors.red, 0.08), color: '#000000', border: `1px solid ${alpha(colors.red, 0.25)}`, fontWeight: 600 }} />
                  </Box>
                </Paper>

                {/* Application Status */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.orange, 0.15)}`, borderLeft: `4px solid ${colors.orange}`, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700} color={colors.orange}>
                        Pending Medical Exam
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Term conversion application submitted{' '}
                        <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>3 weeks ago</Box>. Medical exam scheduled for next Tuesday but lab work still outstanding.
                      </Typography>
                    </Box>
                    <Chip label="Follow Up" size="small" sx={{ ml: 1, bgcolor: alpha(colors.orange, 0.08), color: '#000000', border: `1px solid ${alpha(colors.orange, 0.25)}`, fontWeight: 600 }} />
                  </Box>
                </Paper>

                {/* Cross-Policy Exposure */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.blue, 0.15)}`, borderLeft: `4px solid ${colors.blue}`, borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight={700} color={colors.blue}>
                    Cross-Policy Analysis
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Client holds <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>3 policies</Box>: Term (
                    <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>$500K</Box>), Whole Life (
                    <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>$250K</Box>), and Indexed Universal Life (
                    <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>$300K</Box>). Combined coverage:{' '}
                    <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>$1.05M</Box> across products.
                  </Typography>
                </Paper>

                {/* Competitor Quote */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.orange, 0.15)}`, borderLeft: `4px solid ${colors.orange}`, borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight={700} color={colors.orange}>
                    Prior Competitor Quote Found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>6 months ago</Box>, client received quote from MutualCo for{' '}
                    <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>$750K</Box> term at{' '}
                    <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>$380/mo</Box>. Current rate is competitive.
                  </Typography>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 3: Recommended Meeting Structure */}
        <Fade in={currentStep >= 3} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3, bgcolor: '#FFFFFF' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Lightbulb sx={{ fontSize: 28, color: colors.green, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  Recommended Meeting Structure
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Personalized agenda optimized for this client's situation
              </Typography>

              <Stack spacing={0}>
                {/* Agenda Item 1 */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.red, 0.04), border: `1px solid ${alpha(colors.red, 0.12)}`, borderLeft: `4px solid ${colors.red}`, borderRadius: 2, mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box sx={{ bgcolor: colors.red, color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0, mt: 0.25 }}>
                      1
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>Address Billing Concerns First</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Acknowledge the overdue payment, update card on file, offer to waive late fee as goodwill gesture. Emphasize value of maintaining coverage continuity.
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Agenda Item 2 */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.lightBlue, 0.04), border: `1px solid ${alpha(colors.lightBlue, 0.12)}`, borderLeft: `4px solid ${colors.lightBlue}`, borderRadius: 2, mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box sx={{ bgcolor: colors.lightBlue, color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0, mt: 0.25 }}>
                      2
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>Reinforce Protection Improvements</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Review current coverage (<Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>$1.05M</Box> total). Highlight how the term conversion application strengthens long-term protection and aligns with retirement planning goals.
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Agenda Item 3 */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.lightGreen, 0.04), border: `1px solid ${alpha(colors.lightGreen, 0.12)}`, borderLeft: `4px solid ${colors.green}`, borderRadius: 2, mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box sx={{ bgcolor: colors.green, color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0, mt: 0.25 }}>
                      3
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>Discuss Income Sustainability</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Show illustration projecting IUL account value through retirement. Current trajectory supports{' '}
                        <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>$2,400/month</Box> withdrawals starting at age{' '}
                        <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>65</Box> with balance lasting to age{' '}
                        <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>90+</Box>.
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Agenda Item 4 */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.blue, 0.04), border: `1px solid ${alpha(colors.blue, 0.12)}`, borderLeft: `4px solid ${colors.blue}`, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box sx={{ bgcolor: colors.blue, color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0, mt: 0.25 }}>
                      4
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>Introduce Upgrade Opportunity</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Client is eligible for enhanced riders on IUL: Long-Term Care and Accelerated Death Benefit. Adds{' '}
                        <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>$45/month</Box> but provides{' '}
                        <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>$150K</Box> in LTC benefits. Suitability score:{' '}
                        <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>92%</Box>.
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 4: Compliance Validation */}
        <Fade in={currentStep >= 4} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3, bgcolor: '#FFFFFF' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Security sx={{ fontSize: 28, color: colors.green, mr: 1.5 }} />
                  <Typography variant="h6" fontWeight={700}>
                    Compliance & Suitability Validated
                  </Typography>
                </Box>
                <Chip
                  icon={<CheckCircle sx={{ color: `${colors.green} !important` }} />}
                  label="Approved"
                  size="small"
                  sx={{ bgcolor: alpha(colors.lightGreen, 0.1), color: '#000000', border: `1px solid ${alpha(colors.green, 0.3)}`, fontWeight: 600 }}
                />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.lightGreen, 0.15)}`, borderLeft: `4px solid ${colors.green}`, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 0.5 }}>Suitability Score</Typography>
                    <Typography variant="h4" fontWeight={800} color="#000000" sx={{ my: 0.5 }}>
                      92%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Excellent fit for risk profile
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.blue, 0.15)}`, borderLeft: `4px solid ${colors.blue}`, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 0.5 }}>Affordability Check</Typography>
                    <Typography variant="h4" fontWeight={800} color="#000000" sx={{ my: 0.5 }}>
                      ✓ Pass
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>3.8%</Box> of monthly income
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.lightBlue, 0.15)}`, borderLeft: `4px solid ${colors.lightBlue}`, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 0.5 }}>Disclosures</Typography>
                    <Typography variant="h4" fontWeight={800} color="#000000" sx={{ my: 0.5 }}>
                      Ready
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
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
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3, bgcolor: '#FFFFFF' }}>
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

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>

                {/* Rider Application */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.green, 0.15)}`, borderLeft: `4px solid ${colors.green}`, borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { boxShadow: `0 4px 12px ${alpha(colors.green, 0.15)}` } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Edit sx={{ color: colors.green, fontSize: 28 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700}>Rider Application</Typography>
                      <Typography variant="caption" color="text.secondary">Pre-filled with client data</Typography>
                    </Box>
                    <Button size="small" startIcon={<CloudDownload />} sx={{ textTransform: 'none', color: colors.green }} onClick={() => handleOpenDocument('Rider Application')}>
                      Open
                    </Button>
                  </Box>
                </Paper>

                {/* Disclosures Package */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.orange, 0.15)}`, borderLeft: `4px solid ${colors.orange}`, borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { boxShadow: `0 4px 12px ${alpha(colors.orange, 0.15)}` } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Gavel sx={{ color: colors.orange, fontSize: 28 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700}>Disclosures Package</Typography>
                      <Typography variant="caption" color="text.secondary">7 pages, compliance-approved</Typography>
                    </Box>
                    <Button size="small" startIcon={<CloudDownload />} sx={{ textTransform: 'none', color: colors.orange }} onClick={() => handleOpenDocument('Disclosures Package')}>
                      Open
                    </Button>
                  </Box>
                </Paper>

                {/* Policy Illustration */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.blue, 0.15)}`, borderLeft: `4px solid ${colors.blue}`, borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { boxShadow: `0 4px 12px ${alpha(colors.blue, 0.15)}` } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Assessment sx={{ color: colors.blue, fontSize: 28 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700}>Policy Illustration</Typography>
                      <Typography variant="caption" color="text.secondary">30-year income projection</Typography>
                    </Box>
                    <Button size="small" startIcon={<CloudDownload />} sx={{ textTransform: 'none', color: colors.blue }} onClick={() => handleOpenDocument('Policy Illustration')}>
                      Open
                    </Button>
                  </Box>
                </Paper>

                {/* E-Signature */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.lightBlue, 0.15)}`, borderLeft: `4px solid ${colors.lightBlue}`, borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { boxShadow: `0 4px 12px ${alpha(colors.lightBlue, 0.15)}` } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Send sx={{ color: colors.lightBlue, fontSize: 28 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700}>E-Signature Ready</Typography>
                      <Typography variant="caption" color="text.secondary">DocuSign integration active</Typography>
                    </Box>
                    <Button size="small" startIcon={<ArrowForward />} sx={{ textTransform: 'none', color: colors.lightBlue }} onClick={handleSendForSignature}>
                      Send
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 6: Ready Summary */}
        <Fade in={currentStep >= 6} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3, bgcolor: '#FFFFFF' }}>

            {/* Card Header */}
            <Box sx={{ bgcolor: alpha(colors.green, 0.08), px: 3, py: 2.5, borderBottom: `1px solid ${alpha(colors.green, 0.12)}`, borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CheckCircle sx={{ fontSize: 28, color: colors.green }} />
              <Typography variant="h6" fontWeight={700}>
                You're Ready for{' '}
                <Box component="span" sx={{ fontWeight: 800, color: '#000000' }}>{clientData.meetingTime}</Box>
              </Typography>
            </Box>

            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Complete client intelligence gathered in{' '}
                <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>8 seconds</Box>. No system-hopping required.
              </Typography>

              <Paper elevation={0} sx={{ p: 2.5, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.blue, 0.15)}`, borderLeft: `4px solid ${colors.blue}`, borderRadius: 2, mb: 3 }}>
                <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 1.5, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  What You Have
                </Typography>
                <Stack spacing={0.75}>
                  {[
                    'Comprehensive view across 6 systems',
                    'Priority issues ranked and contextualized',
                    'Structured meeting agenda with talking points',
                    'Compliance-validated upgrade opportunity',
                    'Pre-filled documents ready for e-signature',
                  ].map((item) => (
                    <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ fontSize: 16, color: colors.green }} />
                      <Typography variant="body2" color="text.secondary">{item}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={joiningMeeting ? <CircularProgress size={20} color="inherit" /> : <Schedule />}
                  onClick={handleJoinMeeting}
                  disabled={joiningMeeting}
                  sx={{ bgcolor: colors.green, color: '#fff', fontWeight: 700, '&:hover': { bgcolor: alpha(colors.green, 0.88) } }}
                >
                  {joiningMeeting ? 'Launching...' : 'Join Meeting'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={downloadingBrief ? <CircularProgress size={20} sx={{ color: colors.blue }} /> : <CloudDownload />}
                  onClick={handleDownloadBrief}
                  disabled={downloadingBrief}
                  sx={{ borderColor: colors.blue, color: colors.blue, fontWeight: 700, '&:hover': { borderColor: colors.blue, bgcolor: alpha(colors.blue, 0.06) } }}
                >
                  {downloadingBrief ? 'Preparing...' : 'Download Brief'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Fade>
      </Container>

      {/* Document Preview Modal */}
      <Dialog open={documentModalOpen} onClose={handleCloseDocument} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: alpha(colors.blue, 0.06), borderBottom: `2px solid ${alpha(colors.blue, 0.2)}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={700} color={colors.blue}>
              {selectedDocument?.title}
            </Typography>
            <IconButton onClick={handleCloseDocument} sx={{ color: colors.blue }}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: colors.paleAqua, border: `1px solid ${alpha(colors.blue, 0.1)}`, borderRadius: 2, fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '0.875rem', lineHeight: 1.6 }}>
            {selectedDocument?.content}
          </Paper>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDocument} sx={{ color: 'text.secondary' }}>Close</Button>
          <Button
            variant="contained"
            startIcon={<CloudDownload />}
            sx={{ bgcolor: colors.blue, '&:hover': { bgcolor: alpha(colors.blue, 0.88) } }}
            onClick={() => {
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
        <DialogTitle sx={{ bgcolor: alpha(colors.green, 0.06), borderBottom: `2px solid ${alpha(colors.green, 0.2)}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Send sx={{ color: colors.green }} />
            <Typography variant="h6" fontWeight={700} color={colors.green}>
              Send Documents for E-Signature
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, mt: 2 }}>
            Send the following documents to{' '}
            <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>{clientData.name}</Box> via DocuSign for electronic signature:
          </Typography>

          <Stack spacing={1.5}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.green, 0.15)}`, borderLeft: `4px solid ${colors.green}`, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ color: colors.green }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>Rider Application</Typography>
                  <Typography variant="caption" color="text.secondary"><Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>3</Box> signature fields</Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.green, 0.15)}`, borderLeft: `4px solid ${colors.green}`, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ color: colors.green }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>Disclosures Package</Typography>
                  <Typography variant="caption" color="text.secondary"><Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>7 pages</Box>, <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>12</Box> initials required</Typography>
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
            rows={4}
            defaultValue={`Hi ${clientData.name},

I hope this message finds you well! Following up on our conversation at ${clientData.meetingTime}, I've prepared the rider application documents we discussed for your review.

These riders will provide valuable additional protection for you and your family, including long-term care coverage and accelerated death benefit options. The documents are pre-filled with your policy information to make the process as smooth as possible.

Please review and sign at your convenience. I'm here if you have any questions or would like to discuss any details further. Looking forward to enhancing your coverage!

Warm regards,
Grace Wilson`}
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setSendSignatureOpen(false)} disabled={sendingSignature} sx={{ color: 'text.secondary' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmSendSignature}
            disabled={sendingSignature}
            startIcon={sendingSignature ? <CircularProgress size={20} color="inherit" /> : <Send />}
            sx={{ bgcolor: colors.green, '&:hover': { bgcolor: alpha(colors.green, 0.88) } }}
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
