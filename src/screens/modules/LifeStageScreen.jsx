import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import DataCard from '../../components/shared/DataCard';
import InsightCard from '../../components/shared/InsightCard';
import UseCaseCard from '../../components/shared/UseCaseCard';
import { Timeline, Warning, TrendingUp } from '@mui/icons-material';
import { useCustomerIntelligence } from '../../contexts/CustomerIntelligenceContext';

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

const LifeStageScreen = () => {
  const { milestones, loading } = useCustomerIntelligence();

  return (
    <Container maxWidth="lg" sx={{ pb: 4, pt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Roboto Slab, serif',
          fontWeight: 700,
          mb: 1,
          color: colors.blue,
        }}
      >
        Life-Stage & Retention Intelligence
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Milestone monitoring, retention risk detection, and proactive engagement
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Upcoming Milestones"
            value="23"
            subtitle="Next 6 months"
            icon={Timeline}
            color={colors.blue}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="High Retention Risk"
            value="8"
            trend="down"
            trendValue="-2 from last month"
            icon={Warning}
            color={colors.red}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Engagement Score"
            value="72"
            trend="up"
            trendValue="+5 pts"
            icon={TrendingUp}
            color={colors.green}
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
          Never miss a milestone - your agent tracks life stages and retention signals
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Who has major life events coming up?"
              agentAction="Scans all client records for milestone markers: identifies 8 upcoming events (3 retirements in 12-18 months, 2 college starts September 2026, 3 home purchases based on mortgage applications). Cross-references with current coverage adequacy: flags 5 with protection gaps, calculates average shortfall $85K per family."
              outcome="Proactive outreach calendar with context for meaningful conversations"
              interactionType="voice"
              color={colors.blue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Show me retention risks this quarter"
              agentAction="Analyzes engagement patterns: detects 8 clients with declining interaction (email opens down 60%+, no calls in 90+ days), correlates with policy anniversaries (3 within 45 days), checks payment patterns (2 late payments), calculates retention risk scores, and prioritizes by policy value + likelihood to lapse."
              outcome="Early intervention list before clients walk away"
              interactionType="chat"
              color={colors.blue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="What coverage changes should I recommend for the Johnsons?"
              agentAction="Reviews life stage transition: family growth phase (child age 3, second child due April), evaluates current coverage ($500K term life, spouse $250K), projects income needs through college years (18-22 years future), identifies income gap $35K/year starting 2044, flags inadequate spouse coverage (homemaker - should be $400K+ for childcare replacement)."
              outcome="Life stage-aligned coverage recommendations with clear rationale"
              interactionType="voice"
              color={colors.blue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Which clients need policy reviews this month?"
              agentAction="Filters by last review date (18+ months ago), cross-references with life changes (CRM notes: 4 job changes, 2 marriages, 3 new children, 1 divorce), checks policy anniversaries (12 this quarter), assesses coverage adequacy shifts, and ranks by urgency score combining staleness + life event significance + policy expiration proximity."
              outcome="Prioritized review schedule based on need, not just calendar"
              interactionType="chat"
              color={colors.blue}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Priority Actions */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 2 }}
        >
          This Week's Priorities
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InsightCard
              type="priority"
              title="High Retention Risk Clients"
              description="3 clients showing elevated lapse risk due to low engagement and upcoming policy anniversaries. Recommend immediate outreach."
              priority="High"
              actionLabel="View Clients"
              metadata={{ Clients: 3, 'Avg Risk': '78%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <InsightCard
              type="reminder"
              title="Q1 Milestone Check-ins"
              description="5 clients approaching major life milestones (retirement, college, home purchase) in next 90 days."
              actionLabel="Schedule Reviews"
              metadata={{ Milestones: 5, Timeframe: '90 days' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LifeStageScreen;
