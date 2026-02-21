import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  alpha,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  Shield,
  Bolt,
  AttachMoney,
  CheckCircle,
  Warning,
  Info as InfoIcon,
  Download,
  ShowChart,
  Close as CloseIcon,
  ZoomIn,
  FilterList,
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
  gray: '#808285',
  lightGray: '#a8aaad',
};

const BusinessInsightsScreen = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [chartDetailOpen, setChartDetailOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // PDF Download Handlers
  const handleDownloadExecutiveSummary = () => {
    // Generate Executive Summary PDF content
    const summaryData = {
      title: 'Business Insights Executive Summary',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      advisor: 'Grace Wilson - Senior Insurance Advisor',
      kpis: [
        { metric: 'Renewal Lift', value: '+3.2 pts', impact: 'Proactive outreach via platform intelligence' },
        { metric: 'Missed Benefit Leakage', value: '–18%', impact: 'Coverage gaps detected before lapse' },
        { metric: 'Manual Rework', value: '–22%', impact: 'Automated intake & routing via platform' },
        { metric: 'Projected Annual Impact', value: '+$2.4M', impact: 'Combined savings + retained revenue' },
      ],
      insights: [
        'Renewal rates improved +3.2 points since activating proactive milestone outreach',
        'Missed benefit leakage dropped 18% with automated coverage gap notifications',
        'Manual rework reduced by 22% through voice-enabled task management',
        '184 hours saved per month across all platform features',
        '$57,300 monthly cost savings based on efficiency gains',
      ],
      recommendations: [
        'Expand birthday outreach to all customers (currently 67% coverage)',
        'Implement automated policy review reminders for accounts over $300k',
        'Train additional advisors on voice-command features',
      ],
    };

    // Create formatted content
    const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Executive Summary - Business Insights</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 40px; color: #333; }
    .header { border-bottom: 3px solid #00ADEE; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { color: #1B75BB; margin: 0 0 10px 0; font-size: 28px; }
    .header .date { color: #808285; font-size: 14px; }
    .header .advisor { color: #808285; font-size: 14px; margin-top: 5px; }
    .kpi-section { margin: 30px 0; }
    .kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 15px; }
    .kpi-card { border: 2px solid #e0e5e4; border-radius: 8px; padding: 20px; background: #F2F7F6; }
    .kpi-card .value { font-size: 32px; font-weight: bold; color: #1B75BB; margin-bottom: 5px; }
    .kpi-card .label { font-size: 12px; font-weight: 600; color: #808285; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .kpi-card .impact { font-size: 13px; color: #666; line-height: 1.4; }
    .section { margin: 30px 0; }
    .section h2 { color: #1B75BB; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #00ADEE; padding-bottom: 5px; }
    .insights-list, .recommendations-list { list-style: none; padding: 0; }
    .insights-list li, .recommendations-list li { padding: 10px 0 10px 25px; position: relative; line-height: 1.6; }
    .insights-list li:before { content: "✓"; position: absolute; left: 0; color: #37A526; font-weight: bold; font-size: 18px; }
    .recommendations-list li:before { content: "→"; position: absolute; left: 0; color: #F6921E; font-weight: bold; font-size: 18px; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e0e5e4; text-align: center; color: #a8aaad; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${summaryData.title}</h1>
    <div class="date">Generated: ${summaryData.date}</div>
    <div class="advisor">${summaryData.advisor}</div>
  </div>

  <div class="kpi-section">
    <h2>Key Performance Indicators</h2>
    <div class="kpi-grid">
      ${summaryData.kpis.map(kpi => `
        <div class="kpi-card">
          <div class="value">${kpi.value}</div>
          <div class="label">${kpi.metric}</div>
          <div class="impact">${kpi.impact}</div>
        </div>
      `).join('')}
    </div>
  </div>

  <div class="section">
    <h2>Key Insights</h2>
    <ul class="insights-list">
      ${summaryData.insights.map(insight => `<li>${insight}</li>`).join('')}
    </ul>
  </div>

  <div class="section">
    <h2>Recommendations</h2>
    <ul class="recommendations-list">
      ${summaryData.recommendations.map(rec => `<li>${rec}</li>`).join('')}
    </ul>
  </div>

  <div class="footer">
    <strong>Advisor Assistant Platform</strong> | Business Insights Dashboard<br>
    © DXC Technology ${new Date().getFullYear()}
  </div>
</body>
</html>
    `;

    // Create blob and download
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Executive-Summary-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTrendReport = () => {
    // Generate Trend Report with charts
    const reportData = {
      title: 'Platform Performance Trend Report',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      period: 'Last 12 Months',
      metrics: [
        { category: 'Retention & Revenue', current: '87.4%', baseline: '84.2%', change: '+3.2 pts', trend: 'Improving' },
        { category: 'Risk Mitigation', current: '189', baseline: '312', change: '-39%', trend: 'Improving' },
        { category: 'Operational Efficiency', current: '184 hrs/mo', baseline: '296 hrs/mo', change: '-38%', trend: 'Improving' },
        { category: 'Cost Savings', current: '$57,300/mo', baseline: '$0', change: '+$57,300', trend: 'New Value' },
      ],
      activities: [
        { count: 4218, type: 'Proactive Outreach', impact: 'High' },
        { count: 1847, type: 'Tasks Completed', impact: 'High' },
        { count: 312, type: 'Anomalies Detected', impact: 'Medium' },
      ],
    };

    const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Trend Report - Business Insights</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 40px; color: #333; }
    .header { border-bottom: 3px solid #00ADEE; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { color: #1B75BB; margin: 0 0 10px 0; font-size: 28px; }
    .header .meta { color: #808285; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e0e5e4; }
    th { background: #F2F7F6; color: #1B75BB; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
    td { font-size: 14px; }
    .value { font-weight: 700; color: #1B75BB; font-size: 16px; }
    .change-positive { color: #37A526; font-weight: 600; }
    .trend-badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 600; }
    .trend-improving { background: #e6f5e0; color: #37A526; }
    .impact-high { color: #37A526; font-weight: 600; }
    .impact-medium { color: #F6921E; font-weight: 600; }
    .section { margin: 40px 0; }
    .section h2 { color: #1B75BB; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #00ADEE; padding-bottom: 5px; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e0e5e4; text-align: center; color: #a8aaad; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${reportData.title}</h1>
    <div class="meta">Generated: ${reportData.date} | Period: ${reportData.period}</div>
  </div>

  <div class="section">
    <h2>Performance Metrics Comparison</h2>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Current Performance</th>
          <th>Baseline</th>
          <th>Change</th>
          <th>Trend</th>
        </tr>
      </thead>
      <tbody>
        ${reportData.metrics.map(metric => `
          <tr>
            <td><strong>${metric.category}</strong></td>
            <td class="value">${metric.current}</td>
            <td>${metric.baseline}</td>
            <td class="change-positive">${metric.change}</td>
            <td><span class="trend-badge trend-improving">${metric.trend}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Platform Activity Summary</h2>
    <table>
      <thead>
        <tr>
          <th>Activity Type</th>
          <th>Count (This Period)</th>
          <th>Business Impact</th>
        </tr>
      </thead>
      <tbody>
        ${reportData.activities.map(activity => `
          <tr>
            <td><strong>${activity.type}</strong></td>
            <td class="value">${activity.count.toLocaleString()}</td>
            <td class="impact-${activity.impact.toLowerCase()}">${activity.impact}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <div class="footer">
    <strong>Advisor Assistant Platform</strong> | Trend Report<br>
    © DXC Technology ${new Date().getFullYear()}
  </div>
</body>
</html>
    `;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Trend-Report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleKPIClick = (kpi) => {
    setSelectedKPI(kpi);
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  const handleChartClick = () => {
    setChartDetailOpen(true);
  };

  // KPI Data
  const kpis = [
    {
      number: '+3.2 pts',
      label: 'Renewal Lift',
      context: 'Proactive outreach via platform intelligence',
      icon: TrendingUp,
      color: colors.green,
      type: 'positive',
    },
    {
      number: '–18%',
      label: 'Missed Benefit Leakage',
      context: 'Coverage gaps detected before lapse',
      icon: Shield,
      color: colors.blue,
      type: 'accent',
    },
    {
      number: '–22%',
      label: 'Manual Rework',
      context: 'Automated intake & routing via platform',
      icon: Bolt,
      color: colors.orange,
      type: 'warning',
    },
    {
      number: '+$2.4M',
      label: 'Projected Annual Impact',
      context: 'Combined savings + retained revenue',
      icon: AttachMoney,
      color: colors.lightBlue,
      type: 'accent',
    },
  ];

  // Efficiency Metrics - Aligned with app features
  const efficiencyMetrics = [
    { label: 'Client Meeting Prep (Policy Reviews)', value: 41, color: colors.green },
    { label: 'Birthday & Milestone Outreach', value: 35, color: colors.lightBlue },
    { label: 'IUL Illustration Generation', value: 28, color: colors.lightBlue },
    { label: 'Income Gap Analysis', value: 32, color: colors.green },
    { label: 'Coverage Gap Detection', value: 38, color: colors.lightBlue },
    { label: 'Follow-up Task Automation', value: 25, color: colors.lightBlue },
  ];

  // Activity Feed - Using actual customer data from the app
  const activities = [
    {
      title: 'Coverage gap detected — Michael Chen',
      desc: 'Life insurance coverage below recommended level for income ($165k). Disability income gap identified. Proactive outreach scheduled.',
      time: '12 min ago',
      icon: CheckCircle,
      color: colors.green,
    },
    {
      title: 'Meeting prep assembled — 2:00 PM with Sarah Johnson',
      desc: 'Pulled IUL policy ($325k account value), 65th birthday milestone, recent $450 payment, and engagement history automatically.',
      time: '38 min ago',
      icon: InfoIcon,
      color: colors.blue,
    },
    {
      title: 'Payment issue flagged — Sam Wright',
      desc: '$425 premium overdue (12 days). Expired card on file detected. Auto-pay at risk. Advisor notified with customer contact preferences.',
      time: '1 hr ago',
      icon: Warning,
      color: colors.orange,
    },
    {
      title: 'Birthday outreach — Sam Wright (turning 60)',
      desc: 'March 6 birthday detected (2 weeks away). Age-based engagement triggered. Multi-channel outreach (email + phone + card) generated.',
      time: '2 hr ago',
      icon: CheckCircle,
      color: colors.green,
    },
  ];

  // Chart data
  const chartData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    before: [84.5, 84.2, 84.8, 84.4, 84.6, 84.2, 84.5, 84.4, 84.6, 84.4, 84.5, 84.2],
    after: [84.4, 84.8, 85.2, 85.8, 86.6, 87.2, 87.6, 88.0, 88.4, 88.8, 89.0, 89.4],
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.paleAqua, pb: 10 }}>
      <Container maxWidth="lg" sx={{ pt: 3, pb: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Roboto Slab, serif',
                fontWeight: 700,
                mb: 0.5,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                color: colors.blue,
              }}
            >
              Business Insights
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              Revenue moves faster. Retention becomes intentional. Risk is managed before it surfaces.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Download />}
              onClick={handleDownloadExecutiveSummary}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                px: { xs: 1.5, sm: 2 },
                '&:hover': {
                  bgcolor: alpha(colors.lightBlue, 0.08),
                },
              }}
            >
              Executive Summary
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<ShowChart />}
              onClick={handleDownloadTrendReport}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                px: { xs: 1.5, sm: 2 },
                bgcolor: colors.blue,
                '&:hover': {
                  bgcolor: alpha(colors.blue, 0.9),
                },
              }}
            >
              Trend Report
            </Button>
          </Box>
        </Box>

        {/* KPI Cards */}
        <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ mb: 4 }}>
          {kpis.map((kpi, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                onClick={() => handleKPIClick(kpi)}
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${alpha(kpi.color, 0.15)}`,
                  borderLeft: `4px solid ${kpi.color}`,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${alpha(kpi.color, 0.15)}`,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                        color: '#000000',
                      }}
                    >
                      {kpi.number}
                    </Typography>
                    <Box
                      sx={{
                        width: { xs: 32, sm: 36 },
                        height: { xs: 32, sm: 36 },
                        borderRadius: 1.5,
                        bgcolor: alpha(kpi.color, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <kpi.icon sx={{ fontSize: { xs: 16, sm: 18 }, color: kpi.color }} />
                    </Box>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      color: colors.gray,
                      display: 'block',
                      mb: 0.5,
                      fontSize: { xs: '0.65rem', sm: '0.7rem' },
                    }}
                  >
                    {kpi.label}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.lightGray,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      lineHeight: 1.4,
                    }}
                  >
                    {kpi.context}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                minHeight: 48,
                px: { xs: 1.5, sm: 2 },
              },
              '& .Mui-selected': {
                fontWeight: 600,
                color: colors.lightBlue,
              },
            }}
          >
            <Tab label="Retention & Revenue" />
            <Tab label="Risk Mitigation" />
            <Tab label="Operational Impact" />
            <Tab label="Platform Activity" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {activeTab === 0 && <RetentionTab chartData={chartData} onChartClick={handleChartClick} />}
        {activeTab === 1 && <RiskTab />}
        {activeTab === 2 && <OperationsTab efficiencyMetrics={efficiencyMetrics} />}
        {activeTab === 3 && <ActivityTab activities={activities} onActivityClick={handleActivityClick} />}

        {/* KPI Detail Dialog */}
        <Dialog
          open={!!selectedKPI}
          onClose={() => setSelectedKPI(null)}
          maxWidth="sm"
          fullWidth
        >
          {selectedKPI && (
            <>
              <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `3px solid ${selectedKPI.color}` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(selectedKPI.color, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <selectedKPI.icon sx={{ fontSize: 24, color: selectedKPI.color }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {selectedKPI.label}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#000000' }}>
                      {selectedKPI.number}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={() => setSelectedKPI(null)}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {selectedKPI.context}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Detailed Breakdown
                </Typography>
                {selectedKPI.label === 'Renewal Lift' && (
                  <Box>
                    <Typography variant="body2" paragraph>• Current renewal rate: 87.4% (up from 84.2%)</Typography>
                    <Typography variant="body2" paragraph>• 4,218 proactive outreach touchpoints generated</Typography>
                    <Typography variant="body2" paragraph>• $1.8M in retained revenue from saved policies</Typography>
                    <Typography variant="body2" paragraph>• Key drivers: Birthday outreach (35%), policy anniversaries (28%), payment reminders (20%)</Typography>
                  </Box>
                )}
                {selectedKPI.label === 'Missed Benefit Leakage' && (
                  <Box>
                    <Typography variant="body2" paragraph>• 312 coverage gaps detected before lapse</Typography>
                    <Typography variant="body2" paragraph>• Average gap value: $47,500 per policy</Typography>
                    <Typography variant="body2" paragraph>• Detection methods: Policy analysis (52%), customer milestone triggers (31%), payment pattern analysis (17%)</Typography>
                    <Typography variant="body2" paragraph>• Advisor notification within 4 seconds of detection</Typography>
                  </Box>
                )}
                {selectedKPI.label === 'Manual Rework' && (
                  <Box>
                    <Typography variant="body2" paragraph>• 184 hours saved per month across all features</Typography>
                    <Typography variant="body2" paragraph>• Meeting prep time reduced from 45 min to 12 min (73% faster)</Typography>
                    <Typography variant="body2" paragraph>• IUL illustration generation: 15 min → 3 min (80% faster)</Typography>
                    <Typography variant="body2" paragraph>• Voice commands eliminate 67% of manual navigation</Typography>
                  </Box>
                )}
                {selectedKPI.label === 'Projected Annual Impact' && (
                  <Box>
                    <Typography variant="body2" paragraph>• Retained revenue: $1.8M annually</Typography>
                    <Typography variant="body2" paragraph>• Cost savings: $687,600 annually (184 hrs/mo × $45/hr × 12)</Typography>
                    <Typography variant="body2" paragraph>• New business from referrals: +$250k (estimated)</Typography>
                    <Typography variant="body2" paragraph>• ROI: 420% based on platform investment</Typography>
                  </Box>
                )}
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={() => setSelectedKPI(null)} variant="contained">
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Activity Detail Dialog */}
        <Dialog
          open={!!selectedActivity}
          onClose={() => setSelectedActivity(null)}
          maxWidth="md"
          fullWidth
        >
          {selectedActivity && (
            <>
              <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: alpha(selectedActivity.color, 0.1), color: selectedActivity.color }}>
                    <selectedActivity.icon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Activity Details
                  </Typography>
                </Box>
                <IconButton onClick={() => setSelectedActivity(null)}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, mt: 1 }}>
                  {selectedActivity.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {selectedActivity.desc}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                  {selectedActivity.time}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                  Platform Actions Taken
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Step</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Data analysis completed</TableCell>
                        <TableCell><Chip label="Complete" size="small" color="success" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Customer preferences checked</TableCell>
                        <TableCell><Chip label="Complete" size="small" color="success" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>Compliant message generated</TableCell>
                        <TableCell><Chip label="Complete" size="small" color="success" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>4</TableCell>
                        <TableCell>Advisor notification sent</TableCell>
                        <TableCell><Chip label="Complete" size="small" color="success" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>5</TableCell>
                        <TableCell>Follow-up task created</TableCell>
                        <TableCell><Chip label="Pending" size="small" color="warning" /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 2, p: 2, bgcolor: alpha(colors.lightBlue, 0.05), borderRadius: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', color: colors.gray }}>
                    Next Steps
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    • Review generated message for personalization<br />
                    • Schedule outreach within 48 hours<br />
                    • Update customer engagement log
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={() => setSelectedActivity(null)}>
                  Close
                </Button>
                <Button variant="contained">
                  View in Tasks
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Chart Detail Dialog */}
        <Dialog
          open={chartDetailOpen}
          onClose={() => setChartDetailOpen(false)}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Renewal Rate Trend - Detailed View
            </Typography>
            <IconButton onClick={() => setChartDetailOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" paragraph>
              Interactive chart showing month-over-month renewal rate improvements since platform activation.
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Month</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Before Platform</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>After Platform</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Improvement</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Key Driver</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chartData.months.map((month, index) => (
                    <TableRow key={month}>
                      <TableCell>{month}</TableCell>
                      <TableCell>{chartData.before[index]}%</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#000000' }}>{chartData.after[index]}%</TableCell>
                      <TableCell sx={{ color: '#000000', fontWeight: 600 }}>
                        +{(chartData.after[index] - chartData.before[index]).toFixed(1)} pts
                      </TableCell>
                      <TableCell>
                        {index < 3 ? 'Birthday outreach' : index < 6 ? 'Policy anniversary reminders' : index < 9 ? 'Payment alerts' : 'Coverage gap notifications'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button startIcon={<Download />} onClick={handleDownloadTrendReport}>
              Export Data
            </Button>
            <Button onClick={() => setChartDetailOpen(false)} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

// Retention Tab Component
const RetentionTab = ({ chartData, onChartClick }) => {
  return (
    <Box>
      {/* Insight Banner */}
      <Card
        sx={{
          mb: 3,
          bgcolor: alpha(colors.lightBlue, 0.08),
          border: `1px solid ${alpha(colors.lightBlue, 0.2)}`,
        }}
      >
        <CardContent sx={{ display: 'flex', gap: 2, p: { xs: 2, sm: 2.5, md: 3 } }}>
          <Box
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              borderRadius: '50%',
              bgcolor: colors.lightBlue,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              fontWeight: 700,
            }}
          >
            i
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                color: colors.blue,
                display: 'block',
                mb: 0.5,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              Retention Insight
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' }, lineHeight: 1.55 }}>
              Renewal rates improved +3.2 points since activating proactive milestone outreach (birthdays, policy anniversaries).
              Missed benefit leakage dropped 18% as policyholders received timely coverage gap notifications via automated engagement.
              Platform intelligence enabled anticipatory service — without replacing core systems.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Chart and Metrics */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={8}>
          <Card
            onClick={onChartClick}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 20px ${alpha(colors.lightBlue, 0.15)}`,
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  color: colors.gray,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                }}
              >
                <Box component="span" sx={{ color: colors.lightBlue }}>
                  Renewal Rate Trend
                </Box>{' '}
                — Over 6–12 Months
              </Typography>
              <IconButton size="small" sx={{ color: colors.lightBlue }}>
                <ZoomIn />
              </IconButton>
              </Box>

              {/* Simple Line Chart Visualization */}
              <Box sx={{ height: { xs: 180, sm: 220, md: 260 }, position: 'relative', mb: 2 }}>
                <svg width="100%" height="100%" viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  <line x1="40" y1="20" x2="580" y2="20" stroke="#eef1f0" strokeWidth="1" />
                  <line x1="40" y1="70" x2="580" y2="70" stroke="#eef1f0" strokeWidth="1" />
                  <line x1="40" y1="120" x2="580" y2="120" stroke="#eef1f0" strokeWidth="1" />
                  <line x1="40" y1="170" x2="580" y2="170" stroke="#eef1f0" strokeWidth="1" />
                  <line x1="40" y1="220" x2="580" y2="220" stroke="#d0d5d4" strokeWidth="1" />

                  {/* Y-axis labels */}
                  <text x="35" y="24" textAnchor="end" fill="#a8aaad" fontSize="10" fontWeight="500">92%</text>
                  <text x="35" y="74" textAnchor="end" fill="#a8aaad" fontSize="10" fontWeight="500">88%</text>
                  <text x="35" y="124" textAnchor="end" fill="#a8aaad" fontSize="10" fontWeight="500">86%</text>
                  <text x="35" y="174" textAnchor="end" fill="#a8aaad" fontSize="10" fontWeight="500">84%</text>
                  <text x="35" y="224" textAnchor="end" fill="#a8aaad" fontSize="10" fontWeight="500">82%</text>

                  {/* Before line (flat) */}
                  <polyline
                    points="60,140 110,138 160,142 210,140 260,141 310,139 360,140 410,139 460,141 510,140 560,139"
                    fill="none"
                    stroke="#c8cfd0"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* After line (improving) */}
                  <polyline
                    points="60,138 110,132 160,126 210,116 260,106 310,96 360,88 410,80 460,74 510,68 560,62"
                    fill="none"
                    stroke={colors.lightBlue}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Improvement indicator */}
                  <line x1="560" y1="64" x2="560" y2="137" stroke={colors.lightBlue} strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
                  <text x="565" y="105" fill={colors.lightBlue} fontSize="12" fontWeight="700">+3.2 pts</text>
                </svg>
              </Box>

              {/* Legend */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, sm: 4 }, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#c8cfd0' }} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Before (Heritage Baseline)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: colors.lightBlue }} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    After (Platform Activated)
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                  87.4%
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: colors.gray,
                    display: 'block',
                    mt: 1,
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  }}
                >
                  Current Renewal Rate
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Up from 84.2% baseline
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                  $1.8M
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: colors.gray,
                    display: 'block',
                    mt: 1,
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  }}
                >
                  Retained Revenue
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Policies saved from lapse
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                  4,218
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: colors.gray,
                    display: 'block',
                    mt: 1,
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  }}
                >
                  Proactive Outreach
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Platform-initiated touchpoints
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// Risk Tab Component
const RiskTab = () => {
  const riskData = [
    { label: 'Escalated Claims', before: 312, after: 189, height1: 140, height2: 84 },
    { label: 'Escalation Cost', before: '$4.2M', after: '$1.8M', height1: 120, height2: 56 },
    { label: 'Avg Resolution', before: '14 days', after: '6 days', height1: 100, height2: 42 },
  ];

  return (
    <Box>
      {/* Insight Banner */}
      <Card
        sx={{
          mb: 3,
          bgcolor: alpha(colors.lightBlue, 0.08),
          border: `1px solid ${alpha(colors.lightBlue, 0.2)}`,
        }}
      >
        <CardContent sx={{ display: 'flex', gap: 2, p: { xs: 2, sm: 2.5, md: 3 } }}>
          <Box
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              borderRadius: '50%',
              bgcolor: colors.lightBlue,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              fontWeight: 700,
            }}
          >
            i
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                color: colors.blue,
                display: 'block',
                mb: 0.5,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              Risk Insight
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' }, lineHeight: 1.55 }}>
              Anomaly detection flagged 312 high-risk claims before manual review. Early intervention reduced escalation costs
              by 57%. The platform identifies patterns across customer data that surface risk before it materializes —
              anticipation, not reaction.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  color: colors.gray,
                  display: 'block',
                  mb: 3,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                }}
              >
                <Box component="span" sx={{ color: colors.lightBlue }}>
                  Risk Events
                </Box>{' '}
                — Before vs After Platform
              </Typography>

              {/* Bar Chart */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-around',
                  height: { xs: 180, sm: 200, md: 220 },
                  mb: 3,
                  px: { xs: 1, sm: 2 },
                }}
              >
                {riskData.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: { xs: 0.5, sm: 1 }, height: 180 }}>
                      <Box
                        sx={{
                          width: { xs: 32, sm: 42, md: 52 },
                          height: `${item.height1}px`,
                          bgcolor: '#c8cfd0',
                          borderRadius: '4px 4px 0 0',
                          position: 'relative',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            position: 'absolute',
                            top: -24,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontWeight: 700,
                            color: colors.gray,
                            fontSize: { xs: '0.65rem', sm: '0.75rem' },
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.before}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: { xs: 32, sm: 42, md: 52 },
                          height: `${item.height2}px`,
                          bgcolor: colors.lightBlue,
                          borderRadius: '4px 4px 0 0',
                          position: 'relative',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            position: 'absolute',
                            top: -24,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontWeight: 700,
                            color: colors.lightBlue,
                            fontSize: { xs: '0.65rem', sm: '0.75rem' },
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.after}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.3,
                        color: colors.gray,
                        textAlign: 'center',
                        fontSize: { xs: '0.6rem', sm: '0.65rem' },
                        lineHeight: 1.2,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Legend */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, sm: 4 }, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#c8cfd0' }} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Before (Heritage Only)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: colors.lightBlue }} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    After (Platform Activated)
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                  –39%
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: colors.gray,
                    display: 'block',
                    mt: 1,
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  }}
                >
                  Escalation Rate
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Early detection via platform
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                  312
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: colors.gray,
                    display: 'block',
                    mt: 1,
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  }}
                >
                  Anomalies Detected
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Before manual review
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                  –57%
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: colors.gray,
                    display: 'block',
                    mt: 1,
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  }}
                >
                  Resolution Cost
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  $4.2M → $1.8M
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// Operations Tab Component
const OperationsTab = ({ efficiencyMetrics }) => {
  return (
    <Box>
      {/* Insight Banner */}
      <Card
        sx={{
          mb: 3,
          bgcolor: alpha(colors.lightBlue, 0.08),
          border: `1px solid ${alpha(colors.lightBlue, 0.2)}`,
        }}
      >
        <CardContent sx={{ display: 'flex', gap: 2, p: { xs: 2, sm: 2.5, md: 3 } }}>
          <Box
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              borderRadius: '50%',
              bgcolor: colors.lightBlue,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              fontWeight: 700,
            }}
          >
            i
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                color: colors.blue,
                display: 'block',
                mb: 0.5,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              Operational Insight
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' }, lineHeight: 1.55 }}>
              Manual rework dropped 22% across advisor workflows. Automated birthday outreach, meeting prep assembly, and IUL
              illustration generation reduced processing time by 35%. Voice-enabled task management and customer engagement
              streamlined daily operations — advisors focus on relationships, not paperwork.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  color: colors.gray,
                  display: 'block',
                  mb: 3,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                }}
              >
                <Box component="span" sx={{ color: colors.lightBlue }}>
                  Efficiency Gains
                </Box>{' '}
                — By Process Area
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {efficiencyMetrics.map((metric, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' }, fontWeight: 500 }}>
                        {metric.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' }, fontWeight: 700, color: '#000000' }}>
                        –{metric.value}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={metric.value}
                      sx={{
                        height: 8,
                        borderRadius: 10,
                        bgcolor: colors.paleAqua,
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 10,
                          background: metric.color,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                  184 hrs
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: colors.gray,
                    display: 'block',
                    mt: 1,
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  }}
                >
                  Hours Saved / Month
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Across all platform features
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                  $57,300
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: colors.gray,
                    display: 'block',
                    mt: 1,
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  }}
                >
                  Monthly Cost Savings
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Based on 184h at $45/hr
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                  48%
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: colors.gray,
                    display: 'block',
                    mt: 1,
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  }}
                >
                  Automation Rate
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Up from 12% manual baseline
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// Activity Tab Component
const ActivityTab = ({ activities }) => {
  return (
    <Box>
      {/* Insight Banner */}
      <Card
        sx={{
          mb: 3,
          bgcolor: alpha(colors.lightBlue, 0.08),
          border: `1px solid ${alpha(colors.lightBlue, 0.2)}`,
        }}
      >
        <CardContent sx={{ display: 'flex', gap: 2, p: { xs: 2, sm: 2.5, md: 3 } }}>
          <Box
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              borderRadius: '50%',
              bgcolor: colors.lightBlue,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              fontWeight: 700,
            }}
          >
            i
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                color: colors.blue,
                display: 'block',
                mb: 0.5,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              Platform Intelligence
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' }, lineHeight: 1.55 }}>
              Voice-activated platform coordinates customer data analysis in real time. Pulls policy details ($485k IUL accounts),
              engagement history (email/phone preferences), milestone tracking (birthdays, anniversaries), and generates compliant
              outreach messaging automatically. Grace Wilson and advisors use voice commands to trigger meeting prep, send birthday
              wishes, and run policy illustrations hands-free.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  color: colors.gray,
                  display: 'block',
                  mb: 2,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                }}
              >
                <Box component="span" sx={{ color: colors.lightBlue }}>
                  Live Platform Activity
                </Box>{' '}
                — Last 24 Hours
              </Typography>

              <List sx={{ p: 0 }}>
                {activities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        px: 0,
                        py: { xs: 1.5, sm: 2 },
                        borderBottom: index < activities.length - 1 ? `1px solid ${alpha(colors.gray, 0.1)}` : 'none',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: alpha(activity.color, 0.1),
                            color: activity.color,
                            width: { xs: 36, sm: 40 },
                            height: { xs: 36, sm: 40 },
                          }}
                        >
                          <activity.icon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.8125rem', sm: '0.875rem' }, mb: 0.5 }}>
                            {activity.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.8125rem' }, lineHeight: 1.5, mb: 0.5 }}>
                              {activity.desc}
                            </Typography>
                            <Typography variant="caption" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, fontWeight: 500, color: colors.lightGray }}>
                              {activity.time}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  color: colors.gray,
                  display: 'block',
                  mb: 2,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                }}
              >
                <Box component="span" sx={{ color: colors.lightBlue }}>
                  Platform Performance
                </Box>{' '}
                — This Period
              </Typography>

              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: colors.paleAqua, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                      1,847
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.4,
                        color: colors.gray,
                        fontSize: { xs: '0.6rem', sm: '0.65rem' },
                      }}
                    >
                      Tasks Completed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: colors.paleAqua, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                      99.2%
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.4,
                        color: colors.gray,
                        fontSize: { xs: '0.6rem', sm: '0.65rem' },
                      }}
                    >
                      Compliance Rate
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: colors.paleAqua, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                      &lt; 4s
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.4,
                        color: colors.gray,
                        fontSize: { xs: '0.6rem', sm: '0.65rem' },
                      }}
                    >
                      Avg Response
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: colors.paleAqua, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#000000', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                      6
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.4,
                        color: colors.gray,
                        fontSize: { xs: '0.6rem', sm: '0.65rem' },
                      }}
                    >
                      Active Features
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  color: colors.gray,
                  display: 'block',
                  mb: 2,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                }}
              >
                <Box component="span" sx={{ color: colors.lightBlue }}>
                  Active Features
                </Box>
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { name: 'Personalized Engagement', status: 'Active' },
                  { name: 'Income Planning (IUL)', status: 'Active' },
                  { name: 'Meeting Preparation', status: 'Active' },
                  { name: 'Birthday & Milestone Alerts', status: 'Active' },
                  { name: 'Payment Issue Detection', status: 'Active' },
                  { name: 'Income Gap Analysis', status: 'Active' },
                ].map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1,
                      bgcolor: colors.paleAqua,
                      borderRadius: 1.5,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8125rem' } }}>
                      {feature.name}
                    </Typography>
                    <Chip
                      label={feature.status}
                      size="small"
                      sx={{
                        bgcolor: feature.status === 'Active' ? alpha(colors.green, 0.1) : alpha(colors.lightBlue, 0.1),
                        color: '#000000',
                        border: `1px solid ${feature.status === 'Active' ? alpha(colors.green, 0.3) : alpha(colors.lightBlue, 0.3)}`,
                        fontWeight: 600,
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        height: { xs: 20, sm: 24 },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessInsightsScreen;
