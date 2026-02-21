import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import DataCard from '../../components/shared/DataCard';
import InsightCard from '../../components/shared/InsightCard';
import UseCaseCard from '../../components/shared/UseCaseCard';
import { Psychology, TrendingUp, Lightbulb } from '@mui/icons-material';
import { usePredictiveAnalytics } from '../../contexts/PredictiveAnalyticsContext';

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

const PredictiveScreen = () => {
  const { lapseRisks, opportunities, loading } = usePredictiveAnalytics();

  return (
    <Container maxWidth="lg" sx={{ pb: 4, pt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Roboto Slab, serif',
          fontWeight: 700,
          mb: 1,
          color: colors.green,
        }}
      >
        Predictive Risk & Retention Insights
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Proactive analytics for lapse prevention and opportunity identification
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Avg Retention Risk"
            value="38"
            trend="down"
            trendValue="-5 pts"
            icon={Psychology}
            color={colors.lightGreen}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Cross-Sell Score"
            value="76"
            trend="up"
            trendValue="+8 pts"
            icon={TrendingUp}
            color={colors.green}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Opportunities"
            value="18"
            subtitle="High probability"
            icon={Lightbulb}
            color={colors.yellow}
          />
        </Grid>
      </Grid>

      {/* Agent Use Cases */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 1 }}
        >
          How Your Agent Helps
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Stay ahead of risks and opportunities - your agent spots patterns you can't see
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Show me clients at risk of lapsing"
              agentAction="Analyzes 180 client engagement patterns across email opens, call pickups, portal logins, and payment history. Identifies 12 at-risk clients: Emily Chen (78% risk - 6 months no contact, missed payment), David Wilson (65% - policy anniversary + competitor activity), Lisa Brown (52% - declining engagement score). Ranks by urgency and suggests intervention timing."
              outcome="Proactive retention list before policies lapse"
              interactionType="voice"
              color={colors.lightGreen}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Find cross-sell opportunities for disability insurance"
              agentAction="Scans book of business for disability coverage gaps, filters by high income earners ($80K+) without protection, cross-references life stage (working age 25-60), recent life events (5 promotions, 2 new businesses), and calculates propensity scores. Surfaces top 5: John Smith (score 85 - recent promotion, no DI), Sarah Johnson (score 78 - self-employed, family history)."
              outcome="Targeted opportunity list with compelling 'why now' context"
              interactionType="chat"
              color={colors.lightGreen}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Which clients haven't engaged recently?"
              agentAction="Pulls last contact date for all clients, identifies 18 with 90+ days silence, correlates with policy types (12 term life - higher lapse risk), checks upcoming anniversaries (7 within 60 days - renewal risk), reviews last interaction sentiment (3 had concerns noted), and prioritizes by combined risk factors."
              outcome="Strategic outreach list prioritized by risk + opportunity"
              interactionType="voice"
              color={colors.lightGreen}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="What's trending with my clients this month?"
              agentAction="Aggregates engagement metrics vs. prior month: overall contacts down 15%, email response rate dropped from 42% to 34%, portal logins up 8% (positive), 3 clients mentioned 'switching providers' in notes. Flags declining engagement as early warning, highlights portal adoption success, suggests proactive value-add touchpoint campaign."
              outcome="Early warning system with actionable response strategies"
              interactionType="chat"
              color={colors.lightGreen}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Current Insights */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 2 }}
        >
          Active Alerts
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InsightCard
              type="priority"
              title="High Lapse Risk Alert"
              description="Emily Chen (Risk: 78%) - No contact in 6+ months, missed recent payment. Urgent retention action recommended."
              priority="Urgent"
              actionLabel="Create Outreach Plan"
              metadata={{ Client: 'Emily Chen', Risk: '78%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <InsightCard
              type="opportunity"
              title="Top Cross-Sell Opportunities"
              description="5 clients with high propensity scores for disability insurance. Combined potential AUM: $120K."
              actionLabel="View Opportunities"
              metadata={{ Clients: 5, 'Potential AUM': '$120K' }}
            />
          </Grid>
          <Grid item xs={12}>
            <InsightCard
              type="reminder"
              title="Engagement Declining"
              description="12 clients showing declining engagement trends. Proactive check-ins recommended to prevent lapse."
              actionLabel="Schedule Check-ins"
              metadata={{ Clients: 12, Trend: 'Declining' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PredictiveScreen;
