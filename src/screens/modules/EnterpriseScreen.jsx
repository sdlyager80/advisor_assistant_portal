import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import DataCard from '../../components/shared/DataCard';
import InsightCard from '../../components/shared/InsightCard';
import { BusinessCenter, Assessment, AccountBalance } from '@mui/icons-material';

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

const EnterpriseScreen = () => {
  return (
    <Container maxWidth="lg" sx={{ pb: 4, pt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Roboto Slab, serif',
          fontWeight: 700,
          mb: 1,
          color: colors.orange,
        }}
      >
        Enterprise Intelligence Extension
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Cross-functional analytics and portfolio performance insights
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Portfolio Value"
            value="$4.2M"
            trend="up"
            trendValue="+$320K"
            icon={BusinessCenter}
            color={colors.yellow}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Advisor Performance"
            value="92"
            subtitle="Percentile rank"
            icon={Assessment}
            color={colors.green}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Book Growth"
            value="+8.5%"
            subtitle="YoY"
            icon={AccountBalance}
            color={colors.lightGreen}
          />
        </Grid>
      </Grid>

      {/* Insights */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 2 }}
        >
          Enterprise Insights
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InsightCard
              type="opportunity"
              title="Portfolio Optimization Opportunity"
              description="15 clients with concentrated risk in single product types. Diversification recommendations could improve risk-adjusted returns."
              actionLabel="Generate Reports"
              metadata={{ Clients: 15, 'Avg Concentration': '72%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <InsightCard
              type="priority"
              title="Underwriting Risk Detection"
              description="2 applications flagged for additional review based on health indicators and policy amounts."
              priority="Medium"
              actionLabel="Review Cases"
              metadata={{ Applications: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <InsightCard
              type="info"
              title="Cross-Functional Intelligence"
              description="This module integrates data from underwriting, claims, operations, and compliance to provide comprehensive portfolio insights and risk detection."
            />
          </Grid>
          <Grid item xs={12}>
            <InsightCard
              type="info"
              title="Module Coming Soon"
              description="Full enterprise intelligence capabilities with underwriting risk detection, claims benefit identification, operations lapse prevention, and portfolio analytics will be available in Phase 5 implementation."
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EnterpriseScreen;
