import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Paper,
  LinearProgress,
  Chip,
  Avatar,
  Grid,
  Tabs,
  Tab,
  alpha,
  Divider,
} from '@mui/material';
import { EmojiEvents, CheckCircle } from '@mui/icons-material';

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

const mtdMetrics = [
  { key: 'policies', label: 'Policies Written', value: 8, goal: 12, color: colors.blue, format: v => String(v) },
  { key: 'premium', label: 'Premium Volume', value: 42800, goal: 75000, color: colors.green, format: v => `$${v.toLocaleString()}` },
  { key: 'clients', label: 'New Clients', value: 3, goal: 5, color: colors.lightBlue, format: v => String(v) },
  { key: 'close', label: 'Close Rate', value: 67, goal: 75, color: colors.orange, format: v => `${v}%` },
];

const ytdMetrics = [
  { key: 'policies', label: 'Policies Written', value: 23, goal: 120, color: colors.blue, format: v => String(v) },
  { key: 'premium', label: 'Premium Volume', value: 127500, goal: 750000, color: colors.green, format: v => `$${v.toLocaleString()}` },
  { key: 'clients', label: 'New Clients', value: 9, goal: 50, color: colors.lightBlue, format: v => String(v) },
  { key: 'close', label: 'Close Rate', value: 71, goal: 75, color: colors.orange, format: v => `${v}%` },
];

const recentWins = [
  { client: 'Lisa Taylor', product: 'Auto Insurance', premium: '$110/mo', date: 'Feb 18' },
  { client: 'Michael Chen', product: 'Whole Life Insurance', premium: '$220/mo', date: 'Feb 10' },
  { client: 'Patricia Brown', product: 'Term Life — $500K', premium: '$75/mo', date: 'Feb 7' },
  { client: 'David Thompson', product: 'Umbrella Policy', premium: '$55/mo', date: 'Jan 30' },
  { client: 'John Smith', product: 'Auto Insurance', premium: '$145/mo', date: 'Jan 28' },
];

const ProducerAnalyticsScreen = () => {
  const [period, setPeriod] = useState(0); // 0 = MTD, 1 = YTD

  const metrics = period === 0 ? mtdMetrics : ytdMetrics;
  const periodLabel = period === 0 ? 'February 2026' : 'Year-to-Date 2026';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', py: 3 }}>
      <Container maxWidth="lg" sx={{ pb: 10, pt: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700, color: colors.blue, mb: 0.5 }}
          >
            My Performance
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Grace Wilson · Senior Insurance Advisor
          </Typography>
        </Box>

        {/* Period Toggle */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 3,
            border: `1px solid ${alpha(colors.blue, 0.15)}`,
            borderLeft: `4px solid ${colors.blue}`,
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Tabs
              value={period}
              onChange={(_, v) => setPeriod(v)}
              sx={{ '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', fontSize: '0.95rem' } }}
            >
              <Tab label="Month-to-Date (MTD)" />
              <Tab label="Year-to-Date (YTD)" />
            </Tabs>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, pl: 0.5 }}>
              Reporting period: {periodLabel}
            </Typography>
          </CardContent>
        </Card>

        {/* Quota Progress Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {metrics.map((metric) => {
            const pct = Math.min(100, Math.round((metric.value / metric.goal) * 100));
            const isOnTrack = pct >= 60;
            return (
              <Grid item xs={12} sm={6} key={metric.key}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: '#FFFFFF',
                    border: `1px solid ${alpha(metric.color, 0.15)}`,
                    borderLeft: `4px solid ${metric.color}`,
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                        sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 0.5 }}
                      >
                        {metric.label}
                      </Typography>
                      <Typography variant="h4" fontWeight={800} color="#000000">
                        {metric.format(metric.value)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Goal:{' '}
                        <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>
                          {metric.format(metric.goal)}
                        </Box>
                      </Typography>
                    </Box>
                    <Chip
                      label={`${pct}% of goal`}
                      size="small"
                      sx={{
                        bgcolor: isOnTrack ? alpha(colors.green, 0.1) : alpha(colors.orange, 0.1),
                        color: '#000000',
                        border: `1px solid ${isOnTrack ? alpha(colors.green, 0.3) : alpha(colors.orange, 0.3)}`,
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={pct}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: alpha(metric.color, 0.1),
                      '& .MuiLinearProgress-bar': {
                        background: metric.color,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Rankings */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 3,
            bgcolor: alpha(colors.yellow, 0.06),
            border: `1px solid ${alpha(colors.orange, 0.2)}`,
            borderLeft: `4px solid ${colors.orange}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <EmojiEvents sx={{ color: colors.orange, mr: 1.5, fontSize: 28 }} />
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ fontFamily: 'Roboto Slab, serif', color: colors.blue }}
              >
                Rankings & Standing
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    bgcolor: '#FFFFFF',
                    border: `1px solid ${alpha(colors.orange, 0.15)}`,
                    borderLeft: `4px solid ${colors.orange}`,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 0.5 }}
                  >
                    Team Rank
                  </Typography>
                  <Typography variant="h4" fontWeight={800} color="#000000">#3</Typography>
                  <Typography variant="caption" color="text.secondary">of 12 advisors</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    bgcolor: '#FFFFFF',
                    border: `1px solid ${alpha(colors.lightBlue, 0.15)}`,
                    borderLeft: `4px solid ${colors.lightBlue}`,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 0.5 }}
                  >
                    Regional Rank
                  </Typography>
                  <Typography variant="h4" fontWeight={800} color="#000000">#18</Typography>
                  <Typography variant="caption" color="text.secondary">of 95 advisors</Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Recent Wins */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${alpha(colors.green, 0.15)}`,
            borderLeft: `4px solid ${colors.green}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <CheckCircle sx={{ color: colors.green, mr: 1.5, fontSize: 28 }} />
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ fontFamily: 'Roboto Slab, serif', color: colors.blue }}
              >
                Recent Wins
              </Typography>
            </Box>
            {recentWins.map((win, idx) => (
              <React.Fragment key={idx}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: alpha(colors.green, 0.1),
                        color: colors.green,
                        fontSize: '0.9rem',
                        fontWeight: 700,
                      }}
                    >
                      {win.client.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{win.client}</Typography>
                      <Typography variant="caption" color="text.secondary">{win.product}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight={700} color="#000000">{win.premium}</Typography>
                    <Typography variant="caption" color="text.secondary">{win.date}</Typography>
                  </Box>
                </Box>
                {idx < recentWins.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ProducerAnalyticsScreen;
