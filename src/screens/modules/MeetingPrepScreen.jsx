import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Divider, alpha } from '@mui/material';
import DataCard from '../../components/shared/DataCard';
import InsightCard from '../../components/shared/InsightCard';
import UseCaseCard from '../../components/shared/UseCaseCard';
import AgentInteraction from '../../components/shared/AgentInteraction';
import { Event, CheckCircle, Description, Person, Gavel, TrendingUp, Policy } from '@mui/icons-material';
import { useMeetingPrep } from '../../contexts/MeetingPrepContext';

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

const MeetingPrepScreen = () => {
  const { loading } = useMeetingPrep();

  const handleAgentQuery = (query) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('prepare') || lowerQuery.includes('sarah') || lowerQuery.includes('2pm')) {
      return (
        <Box>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
            Meeting Brief: Sarah Johnson (Tomorrow 2:00 PM)
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: alpha(colors.orange, 0.05) }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary">Active Policies</Typography>
                  <Typography variant="h6" fontWeight={700}>3 Policies</Typography>
                  <Typography variant="caption">$800K total coverage</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: alpha(colors.blue, 0.05) }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary">Last Contact</Typography>
                  <Typography variant="h6" fontWeight={700}>45 days ago</Typography>
                  <Typography variant="caption">Phone call</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.yellow, 0.3)}`, borderLeft: `4px solid ${colors.orange}` }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary">Milestone Alert</Typography>
                  <Typography variant="h6" fontWeight={700}>Birthday</Typography>
                  <Typography variant="caption">Next month • Age 35</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ p: 2, bgcolor: alpha(colors.lightBlue, 0.05), borderRadius: 2, mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Recent Life Event Detected
            </Typography>
            <Typography variant="body2">
              • Home purchase identified (address change in system)<br />
              • Property value: $650,000<br />
              • Current mortgage protection: Adequate
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: alpha(colors.green, 0.05), borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Conversation Priorities
            </Typography>
            <Typography variant="body2">
              1. Congratulate on new home purchase<br />
              2. Discuss increased asset protection needs<br />
              3. Review beneficiary designations (last update 2 years ago)<br />
              4. Mention upcoming birthday milestone
            </Typography>
          </Box>
        </Box>
      );
    }

    if (lowerQuery.includes('john') || lowerQuery.includes('discuss')) {
      return (
        <Box>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
            Strategic Conversation Guide: John Smith
          </Typography>

          <Box sx={{ p: 2, bgcolor: alpha(colors.orange, 0.1), borderRadius: 2, mb: 2, border: `2px solid ${colors.orange}` }}>
            <Typography variant="subtitle2" fontWeight={600} color="error" sx={{ mb: 1 }}>
              ⚠️ Urgent: Policy Anniversary Approaching
            </Typography>
            <Typography variant="body2">
              • Term life policy expires in 6 months<br />
              • Conversion deadline: 120 days<br />
              • No conversion = lose coverage
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: alpha(colors.red, 0.05) }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>Coverage Gap Identified</Typography>
                  <Typography variant="body2">
                    Current Policy: $350,000<br />
                    Current Mortgage: $425,000<br />
                    <strong>Gap: $75,000</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: alpha(colors.yellow, 0.05) }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>Competitor Activity</Typography>
                  <Typography variant="body2">
                    CRM notes indicate client received quote from competitor last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ p: 2, bgcolor: alpha(colors.green, 0.05), borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Recommended Opening
            </Typography>
            <Typography variant="body2" fontStyle="italic">
              "John, I wanted to reach out because your policy anniversary is coming up, and I've been thinking about your family's protection. I noticed your mortgage has grown since we last talked, and I want to make sure your family's home is fully secured..."
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <Typography>
        I can help you prepare for meetings, create conversation guides, and surface relevant client context. Try asking about specific clients or upcoming meetings.
      </Typography>
    );
  };

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
        Meeting Preparation Intelligence
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Pre-meeting data assembly, conversation guidance, and document preparation
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Upcoming Meetings"
            value="7"
            subtitle="Next 7 days"
            icon={Event}
            color={colors.orange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Prep Completed"
            value="5/7"
            trend="up"
            trendValue="71%"
            icon={CheckCircle}
            color={colors.green}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Documents Ready"
            value="12"
            icon={Description}
            color={colors.blue}
          />
        </Grid>
      </Grid>

      {/* Interactive Agent Demo */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 1 }}
        >
          Try It: Ask Your Agent
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Get instant meeting preparation and conversation guides
        </Typography>
        <AgentInteraction
          suggestedQueries={[
            "Prepare for my 2pm meeting with Sarah",
            "What should I discuss with John Smith?",
          ]}
          onQuery={handleAgentQuery}
          placeholder="Ask about meeting preparation or specific clients..."
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Agent Use Cases */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 1 }}
        >
          How Your Agent Helps
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Walk into every meeting fully prepared - your agent gathers what matters
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Prepare for my 2pm meeting with Sarah"
              agentAction="Compiles client snapshot: 3 active policies ($800K total coverage), last contact 45 days ago, birthday next month (milestone alert), recent home purchase detected from address change. Surfaces conversation priorities: congratulate on new home, discuss increased asset protection, review beneficiary designations."
              outcome="Personalized meeting brief with context you'd otherwise miss"
              interactionType="voice"
              color={colors.orange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="What should I discuss with John Smith?"
              agentAction="Analyzes upcoming policy anniversary (term life expires in 6 months), flags conversion deadline approaching, identifies coverage gap vs. current mortgage ($350K policy, $425K mortgage), notes competitor quote activity in CRM, recommends leading with 'securing your family's home.'"
              outcome="Strategic conversation guide based on life stage and urgency"
              interactionType="chat"
              color={colors.orange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Compare our rates to competitors for tomorrow's meeting"
              agentAction="Pulls client profile (age 35, non-smoker, excellent health), retrieves current CompanyA quote ($42/month for $500K), fetches competitor rates: CompanyB ($45/month), CompanyC ($39/month), calculates lifetime savings positioning, and generates comparison talking points with value differentiators beyond price."
              outcome="Competitive intelligence ready for objection handling"
              interactionType="voice"
              color={colors.orange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Show me upgrade options for the Martinez family"
              agentAction="Reviews current whole life policy ($250K, $180/month premium), assesses family income growth (+$40K since purchase), checks eligibility for Whole Life Plus (qualified - health exam 2 years ago), calculates enhanced cash value benefits ($15K additional at age 65), identifies disability income gap (no coverage for $95K earner)."
              outcome="Tailored upgrade path with specific product recommendations"
              interactionType="chat"
              color={colors.orange}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Meeting Priorities */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 2 }}
        >
          Upcoming Priorities
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InsightCard
              type="priority"
              title="Tomorrow: John Smith Review"
              description="Policy anniversary approaching. Client expressed interest in increasing coverage. Key topics: retirement planning, beneficiary updates."
              priority="High"
              actionLabel="View Brief"
              metadata={{ Meeting: 'Tomorrow 2:00 PM', Duration: '60 min' }}
            />
          </Grid>
          <Grid item xs={12}>
            <InsightCard
              type="reminder"
              title="Documents Need Signatures"
              description="3 meetings this week require pre-signed beneficiary forms and disclosure statements."
              actionLabel="Prepare Documents"
              metadata={{ Meetings: 3, Forms: 7 }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MeetingPrepScreen;
