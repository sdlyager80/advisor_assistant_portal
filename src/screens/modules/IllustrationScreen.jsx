import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Chip, alpha, Divider } from '@mui/material';
import StepFlow from '../../components/shared/StepFlow';
import { Mic, ShowChart, CheckCircle, Description, Gavel, Send, TrendingUp, Warning } from '@mui/icons-material';

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

const IllustrationScreen = () => {
  const steps = [
    {
      title: 'Voice Request',
      content: (
        <Card sx={{
          bgcolor: colors.paleAqua,
          color: colors.green,
          border: `2px solid ${alpha(colors.green, 0.3)}`,
          boxShadow: `0 4px 16px ${alpha(colors.green, 0.15)}`,
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: alpha(colors.green, 0.15), border: `2px solid ${colors.green}`, width: 64, height: 64 }}>
                <Mic sx={{ fontSize: 32, color: colors.green }} />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom color={colors.green}>
                  You Ask
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Initiate request via voice or chat
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 3, bgcolor: alpha(colors.green, 0.08), borderRadius: 2, mb: 2, border: `1px solid ${alpha(colors.green, 0.2)}` }}>
              <Typography variant="h6" fontWeight={600} fontStyle="italic" color="#000000">
                "Show me retirement income options for the Johnson family"
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<Mic sx={{ color: `${colors.green} !important` }} />}
                label="Voice Input"
                sx={{ bgcolor: alpha(colors.green, 0.1), color: colors.green, fontWeight: 600, border: `1px solid ${alpha(colors.green, 0.3)}` }}
              />
              <Chip label="Natural Language" sx={{ bgcolor: alpha(colors.green, 0.1), color: colors.green, fontWeight: 600, border: `1px solid ${alpha(colors.green, 0.3)}` }} />
              <Chip label="Hands-Free" sx={{ bgcolor: alpha(colors.green, 0.1), color: colors.green, fontWeight: 600, border: `1px solid ${alpha(colors.green, 0.3)}` }} />
            </Box>
          </CardContent>
        </Card>
      ),
    },
    {
      title: 'Context Gathering',
      content: (
        <Card sx={{ boxShadow: `0 4px 24px ${alpha(colors.blue, 0.15)}` }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: alpha(colors.lightBlue, 0.15), border: `2px solid ${colors.lightBlue}`, width: 64, height: 64 }}>
                <ShowChart sx={{ fontSize: 32, color: colors.lightBlue }} />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Analyzing Client Profile
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gathering comprehensive financial context
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, bgcolor: alpha(colors.blue, 0.05), borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary">Current Coverage</Typography>
                  <Typography variant="h6" fontWeight={700}>$500,000</Typography>
                  <Typography variant="caption">20-year term policy</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, bgcolor: alpha(colors.orange, 0.05), borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary">Age & Income</Typography>
                  <Typography variant="h6" fontWeight={700}>42 yrs / $120K</Typography>
                  <Typography variant="caption">Primary earner</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, bgcolor: alpha(colors.green, 0.05), borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary">Retirement Goal</Typography>
                  <Typography variant="h6" fontWeight={700}>Age 65</Typography>
                  <Typography variant="caption">23 years away</Typography>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, p: 2, bgcolor: alpha(colors.lightBlue, 0.05), borderRadius: 2, border: `2px dashed ${colors.lightBlue}` }}>
              <Typography variant="body2">
                ✓ Retrieved policy details from system<br />
                ✓ Analyzed household income and expenses<br />
                ✓ Identified life stage: Family Growth<br />
                ✓ Calculated retirement timeline
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ),
    },
    {
      title: 'Gap Analysis',
      content: (
        <Card sx={{ boxShadow: `0 4px 24px ${alpha(colors.orange, 0.15)}` }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: alpha(colors.orange, 0.15), border: `2px solid ${colors.orange}`, width: 64, height: 64 }}>
                <TrendingUp sx={{ fontSize: 32, color: colors.orange }} />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Coverage Gap Identified
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Projecting income needs through retirement
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ bgcolor: alpha(colors.red, 0.05), border: `2px solid ${colors.red}` }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Annual Income Shortfall
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="#000000">
                      $28,000/year
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Starting at retirement (2045)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ bgcolor: alpha(colors.yellow, 0.1), border: `2px solid ${colors.yellow}` }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Spouse Coverage Gap
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                      $150K
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Underfunded by 38%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, p: 2, bgcolor: alpha(colors.orange, 0.05), borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Warning sx={{ color: colors.orange }} />
                <Typography variant="subtitle2" fontWeight={600}>
                  Key Findings
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                • Current policy expires before retirement age
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                • Inflation-adjusted needs exceed coverage by 23%
              </Typography>
              <Typography variant="body2">
                • Spouse protection inadequate for childcare replacement
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ),
    },
    {
      title: 'Generate Options',
      content: (
        <Card sx={{ boxShadow: `0 4px 24px ${alpha(colors.blue, 0.15)}` }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: alpha(colors.blue, 0.15), border: `2px solid ${colors.blue}`, width: 64, height: 64 }}>
                <Description sx={{ fontSize: 32, color: colors.blue }} />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Illustration Created
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  30-year income projection with options
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Recommended Solutions
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ bgcolor: alpha(colors.green, 0.05), border: `2px solid ${colors.green}` }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        Option A: Permanent Coverage
                      </Typography>
                      <Chip label="Recommended" color="success" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Whole life policy with guaranteed income rider
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="text.secondary">Coverage</Typography>
                        <Typography variant="body1" fontWeight={600}>$750K</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="text.secondary">Premium</Typography>
                        <Typography variant="body1" fontWeight={600}>$425/mo</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="text.secondary">Income @65</Typography>
                        <Typography variant="body1" fontWeight={600}>$3,200/mo</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="text.secondary">Duration</Typography>
                        <Typography variant="body1" fontWeight={600}>Lifetime</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ bgcolor: alpha(colors.blue, 0.05) }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        Option B: Extended Term
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      30-year term with conversion option
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="text.secondary">Coverage</Typography>
                        <Typography variant="body1" fontWeight={600}>$700K</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="text.secondary">Premium</Typography>
                        <Typography variant="body1" fontWeight={600}>$215/mo</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="text.secondary">Expires</Typography>
                        <Typography variant="body1" fontWeight={600}>Age 72</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="text.secondary">Convertible</Typography>
                        <Typography variant="body1" fontWeight={600}>15 years</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ),
    },
    {
      title: 'Compliance Check',
      content: (
        <Card sx={{ boxShadow: `0 4px 24px ${alpha(colors.orange, 0.15)}` }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: alpha(colors.orange, 0.15), border: `2px solid ${colors.orange}`, width: 64, height: 64 }}>
                <Gavel sx={{ fontSize: 32, color: colors.orange }} />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Regulatory Validation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ensuring suitability and compliance
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2, bgcolor: alpha(colors.green, 0.05), borderRadius: 2, border: `2px solid ${colors.green}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CheckCircle sx={{ color: colors.green }} />
                    <Typography variant="subtitle2" fontWeight={600}>
                      Suitability Score: 88%
                    </Typography>
                  </Box>
                  <Typography variant="caption">
                    • Age-appropriate product selection<br />
                    • Risk tolerance aligned (conservative)<br />
                    • Income goals realistic and achievable
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2, bgcolor: alpha(colors.blue, 0.05), borderRadius: 2, border: `2px solid ${colors.blue}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CheckCircle sx={{ color: colors.blue }} />
                    <Typography variant="subtitle2" fontWeight={600}>
                      Disclosures Generated
                    </Typography>
                  </Box>
                  <Typography variant="caption">
                    • State-specific requirements (California)<br />
                    • Income not guaranteed disclaimer<br />
                    • Market risk and fee disclosures
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
              Compliance Checklist
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                'Income projections include required disclaimers',
                'Product suitability documented',
                'Risk disclosures prepared',
                'Fee schedules attached',
                'Regulatory approval ready'
              ].map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ color: colors.green, fontSize: 20 }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      ),
    },
    {
      title: 'Delivery',
      content: (
        <Card sx={{
          bgcolor: colors.paleAqua,
          color: colors.green,
          border: `2px solid ${alpha(colors.green, 0.3)}`,
          boxShadow: `0 4px 16px ${alpha(colors.green, 0.15)}`,
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: alpha('#fff', 0.25), width: 64, height: 64 }}>
                <Send sx={{ fontSize: 32 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Results Ready
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  Complete illustration package delivered
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 3, bgcolor: alpha('#fff', 0.15), borderRadius: 2, mb: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                📊 Delivered to You:
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                ✓ 30-year income projection with gap analysis
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                ✓ Two product options with detailed comparisons
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                ✓ Compliance-approved disclosures and documentation
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                ✓ Suitability validation (88% score)
              </Typography>
              <Typography variant="body2">
                ✓ Client-ready presentation materials
              </Typography>
            </Box>

            <Box sx={{ p: 2, bgcolor: alpha('#fff', 0.1), borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                ⏱️ Total Time: 8 seconds
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                From voice request to complete illustration package
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ pb: 4, pt: 3 }}>
      <StepFlow
        steps={steps}
        title="Income Planning & Illustrations"
        subtitle="Watch how a simple voice request becomes a complete, compliant retirement illustration"
        color={colors.green}
      />
    </Container>
  );
};

export default IllustrationScreen;
