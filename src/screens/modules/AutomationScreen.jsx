import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import DataCard from '../../components/shared/DataCard';
import InsightCard from '../../components/shared/InsightCard';
import UseCaseCard from '../../components/shared/UseCaseCard';
import { Gavel, Description, VerifiedUser } from '@mui/icons-material';
import { useCompliance } from '../../contexts/ComplianceContext';

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

const AutomationScreen = () => {
  const { documents, loading } = useCompliance();

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
        Automation & Compliance Support
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Document assembly, compliance tracking, and audit trail management
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Compliance Score"
            value="98%"
            trend="up"
            trendValue="+2%"
            icon={Gavel}
            color={colors.green}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Pending Signatures"
            value="4"
            icon={Description}
            color={colors.orange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Audits Passed"
            value="100%"
            subtitle="Last 12 months"
            icon={VerifiedUser}
            color={colors.lightGreen}
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
          Stay compliant effortlessly - your agent handles documentation and tracking
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Generate disclosures for a term life sale"
              agentAction="Identifies transaction type (term life insurance), retrieves state regulations (California - requires 3 specific disclosures), pulls product details (20-year term, $500K coverage), auto-generates compliant disclosure statements with required language, includes premium illustration disclaimer, adds non-guaranteed rate notice, formats for e-signature, and creates audit log entry with timestamp."
              outcome="Compliant documents ready in seconds, zero manual drafting"
              interactionType="voice"
              color={colors.red}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Prepare documents for tomorrow's policy review"
              agentAction="Checks meeting type (annual review), identifies client (John Smith - 3 policies), assembles meeting packet: policy summary sheet, beneficiary verification form (2 years since last update - flag for review), premium payment history, coverage comparison vs. current needs, pre-filled beneficiary update form, and regulatory disclosures. Organizes by discussion sequence."
              outcome="Complete meeting packet assembled and ready for e-signature"
              interactionType="chat"
              color={colors.red}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Show me audit trail for the Martinez policy"
              agentAction="Pulls complete policy history: application submitted March 15 by advisor Grace Wilson, medical underwriting review March 18, approval March 22, beneficiary form signed March 25 (e-signature verified), policy issued March 28, first premium paid April 1, beneficiary change request July 10, change approved July 12 (compliance verified). All actions logged with timestamps, user IDs, and IP addresses."
              outcome="Complete defensible audit trail for regulatory review"
              interactionType="voice"
              color={colors.red}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Which documents are missing signatures?"
              agentAction="Scans all pending transactions, identifies 4 beneficiary forms sent but not signed (2 sent >7 days ago - send reminder), 2 disclosure statements viewed but not acknowledged, 1 policy amendment awaiting countersignature. Retrieves last contact dates, suggests follow-up timing based on urgency, and drafts reminder messages referencing specific documents."
              outcome="Complete compliance status with automated follow-up suggestions"
              interactionType="chat"
              color={colors.red}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Compliance Status */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 2 }}
        >
          Current Status
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InsightCard
              type="reminder"
              title="Documents Awaiting Signature"
              description="4 beneficiary forms and 2 disclosure statements need client signatures to complete compliance requirements."
              actionLabel="Send Reminders"
              metadata={{ Forms: 4, Disclosures: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <InsightCard
              type="opportunity"
              title="Automated Document Assembly"
              description="Pre-meeting document packages can be automatically assembled based on appointment type and client profile."
              actionLabel="Enable Automation"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AutomationScreen;
