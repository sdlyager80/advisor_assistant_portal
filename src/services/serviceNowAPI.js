import axios from 'axios';

const API_BASE = '/api';

// ServiceNow API client configuration
const serviceNowClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Add request interceptor for authentication
serviceNowClient.interceptors.request.use(
  (config) => {
    // ServiceNow session authentication is handled via cookies
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
serviceNowClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('ServiceNow API Error:', error);
    return Promise.reject(error);
  }
);

export const serviceNowAPI = {
  // Leads API
  getLeads: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.stage) params.append('sysparm_query', `stage=${filters.stage}`);
    params.append('sysparm_limit', '1000');

    const response = await serviceNowClient.get(`/now/table/x_dxc_advisor_lead?${params}`);
    return response.data.result;
  },

  updateLead: async (leadId, data) => {
    const response = await serviceNowClient.patch(`/now/table/x_dxc_advisor_lead/${leadId}`, data);
    return response.data.result;
  },

  createLead: async (data) => {
    const response = await serviceNowClient.post('/now/table/x_dxc_advisor_lead', data);
    return response.data.result;
  },

  // Opportunities API
  getOpportunities: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.stage) params.append('sysparm_query', `stage=${filters.stage}`);
    params.append('sysparm_limit', '1000');

    const response = await serviceNowClient.get(`/now/table/x_dxc_advisor_opportunity?${params}`);
    return response.data.result;
  },

  updateOpportunity: async (opportunityId, data) => {
    const response = await serviceNowClient.patch(`/now/table/x_dxc_advisor_opportunity/${opportunityId}`, data);
    return response.data.result;
  },

  createOpportunity: async (data) => {
    const response = await serviceNowClient.post('/now/table/x_dxc_advisor_opportunity', data);
    return response.data.result;
  },

  // Quotes API
  getQuotes: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('sysparm_query', `status=${filters.status}`);
    params.append('sysparm_limit', '1000');

    const response = await serviceNowClient.get(`/now/table/x_dxc_advisor_quote?${params}`);
    return response.data.result;
  },

  updateQuote: async (quoteId, data) => {
    const response = await serviceNowClient.patch(`/now/table/x_dxc_advisor_quote/${quoteId}`, data);
    return response.data.result;
  },

  // Recent Items API
  getRecentItems: async () => {
    const response = await serviceNowClient.get('/now/table/sys_ui_list_recent?sysparm_limit=50');
    return response.data.result;
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    const [leads, opportunities, quotes] = await Promise.all([
      serviceNowAPI.getLeads(),
      serviceNowAPI.getOpportunities(),
      serviceNowAPI.getQuotes()
    ]);

    return {
      leadsCount: leads.length,
      opportunitiesCount: opportunities.length,
      quotesCount: quotes.length
    };
  }
};

// Feature flag for mock data
const USE_MOCK_DATA = true;

// Customer Intelligence API
export const getCustomerIntelligence = async (customerId) => {
  if (USE_MOCK_DATA) {
    return {
      customerId,
      lifeStage: 'Family Growth',
      retentionRisk: 35,
      coverageAdequacy: 78,
      lastEngagement: '2026-02-10',
      nextMilestone: 'Child College (2031)'
    };
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_customer_intelligence/${customerId}`);
  return response.data.result;
};

export const getLifeStageMilestones = async (filters = {}) => {
  if (USE_MOCK_DATA) {
    return [
      { id: 1, customer: 'John Smith', milestone: 'Retirement', date: '2026-03-15', priority: 'High' },
      { id: 2, customer: 'Sarah Johnson', milestone: 'Child College', date: '2026-09-01', priority: 'Medium' },
      { id: 3, customer: 'Mike Davis', milestone: 'Home Purchase', date: '2026-06-20', priority: 'High' }
    ];
  }
  const response = await serviceNowClient.get('/now/table/x_dxc_life_stage_milestone', { params: filters });
  return response.data.result;
};

export const getRetentionRiskScores = async (customerId) => {
  if (USE_MOCK_DATA) {
    return {
      riskScore: 45,
      factors: ['Low engagement', 'Policy anniversary approaching'],
      recommendation: 'Schedule proactive check-in call'
    };
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_retention_risk/${customerId}`);
  return response.data.result;
};

export const getCoverageAdequacy = async (customerId) => {
  if (USE_MOCK_DATA) {
    return {
      adequacyScore: 72,
      gaps: [
        { type: 'Life Insurance', gap: '$250,000', priority: 'Medium' },
        { type: 'Disability', gap: 'Not Covered', priority: 'High' }
      ],
      recommendations: 'Consider increasing life coverage and adding disability insurance'
    };
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_coverage_adequacy/${customerId}`);
  return response.data.result;
};

// Income Illustration API
export const generateIncomeIllustration = async (params) => {
  if (USE_MOCK_DATA) {
    return {
      illustrationId: 'ILL-' + Date.now(),
      projectedIncome: params.targetIncome || 75000,
      gaps: [
        { year: 2031, gap: 15000, reason: 'College expenses' },
        { year: 2040, gap: 8000, reason: 'Healthcare costs' }
      ],
      sustainabilityScore: 82,
      complianceStatus: 'Approved',
      createdAt: new Date().toISOString()
    };
  }
  const response = await serviceNowClient.post('/now/table/x_dxc_income_illustration', params);
  return response.data.result;
};

export const getIncomeProjections = async (scenarioId) => {
  if (USE_MOCK_DATA) {
    return Array.from({ length: 30 }, (_, i) => ({
      year: 2026 + i,
      projectedIncome: 75000 - (i * 1000),
      expenses: 50000 + (i * 500),
      netIncome: 25000 - (i * 1500)
    }));
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_income_projection?scenario=${scenarioId}`);
  return response.data.result;
};

export const validateSuitability = async (illustrationId) => {
  if (USE_MOCK_DATA) {
    return {
      suitable: true,
      score: 88,
      considerations: ['Age appropriate', 'Risk tolerance aligned', 'Income goals realistic'],
      warnings: []
    };
  }
  const response = await serviceNowClient.post(`/now/table/x_dxc_suitability_check`, { illustrationId });
  return response.data.result;
};

export const generateRegulatoryReport = async (illustrationId) => {
  if (USE_MOCK_DATA) {
    return {
      reportId: 'REG-' + Date.now(),
      compliant: true,
      disclosures: ['Income not guaranteed', 'Market risk applies', 'Fees may reduce returns'],
      approvalStatus: 'Approved',
      generatedAt: new Date().toISOString()
    };
  }
  const response = await serviceNowClient.post(`/now/table/x_dxc_regulatory_report`, { illustrationId });
  return response.data.result;
};

// Meeting Preparation API
export const getMeetingPrepData = async (appointmentId) => {
  if (USE_MOCK_DATA) {
    return {
      appointmentId,
      clientSnapshot: {
        name: 'John Smith',
        age: 42,
        policies: 3,
        totalPremium: 4200,
        lastContact: '2025-11-15'
      },
      priorities: ['Discuss retirement planning', 'Review life insurance coverage', 'Address beneficiary updates'],
      documents: [
        { name: 'Policy Review Summary', status: 'Ready' },
        { name: 'Beneficiary Form', status: 'Needs Signature' }
      ],
      conversationGuide: 'Focus on upcoming retirement milestone in 2040. Client expressed interest in increasing coverage last meeting.'
    };
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_meeting_prep/${appointmentId}`);
  return response.data.result;
};

export const getClientSnapshot = async (customerId) => {
  if (USE_MOCK_DATA) {
    return {
      customerId,
      demographics: { age: 42, occupation: 'Software Engineer', maritalStatus: 'Married' },
      policies: [
        { type: 'Term Life', coverage: 500000, premium: 1200 },
        { type: 'Whole Life', coverage: 250000, premium: 2400 },
        { type: 'Critical Illness', coverage: 50000, premium: 600 }
      ],
      recentActivity: ['Policy review - Jan 15', 'Premium payment - Feb 1'],
      alerts: ['Policy anniversary approaching']
    };
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_client_snapshot/${customerId}`);
  return response.data.result;
};

export const getExposureView = async (customerId) => {
  if (USE_MOCK_DATA) {
    return {
      totalCoverage: 800000,
      totalPremium: 4200,
      byType: {
        life: 750000,
        health: 50000,
        disability: 0
      },
      gaps: ['No disability coverage', 'Life coverage below recommended']
    };
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_exposure_view/${customerId}`);
  return response.data.result;
};

export const getCompetitorQuotes = async (customerId) => {
  if (USE_MOCK_DATA) {
    return [
      { competitor: 'CompanyA', product: 'Term Life', premium: 1150, coverage: 500000 },
      { competitor: 'CompanyB', product: 'Term Life', premium: 1280, coverage: 500000 }
    ];
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_competitor_quote?customer=${customerId}`);
  return response.data.result;
};

export const getUpgradeEligibility = async (customerId) => {
  if (USE_MOCK_DATA) {
    return {
      eligible: true,
      upgrades: [
        { product: 'Whole Life Plus', benefit: 'Cash value accumulation', premium: 2800 },
        { product: 'Disability Income', benefit: 'Income protection', premium: 800 }
      ]
    };
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_upgrade_eligibility/${customerId}`);
  return response.data.result;
};

// Predictive Analytics API
export const getPredictiveInsights = async (customerId) => {
  if (USE_MOCK_DATA) {
    return {
      lapseRisk: 35,
      crossSellScore: 72,
      engagementTrend: 'declining',
      recommendations: ['Schedule proactive call', 'Send birthday message', 'Offer policy review']
    };
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_predictive_insight/${customerId}`);
  return response.data.result;
};

export const getLapseRiskIndicators = async (filters = {}) => {
  if (USE_MOCK_DATA) {
    return [
      { customer: 'Emily Chen', riskScore: 78, factors: ['No contact in 6+ months', 'Missed payment'], action: 'Urgent outreach' },
      { customer: 'David Wilson', riskScore: 65, factors: ['Policy anniversary', 'Competitor activity'], action: 'Retention call' },
      { customer: 'Lisa Brown', riskScore: 52, factors: ['Low engagement'], action: 'Check-in email' }
    ];
  }
  const response = await serviceNowClient.get('/now/table/x_dxc_lapse_risk', { params: filters });
  return response.data.result;
};

export const getCrossSellOpportunities = async (advisorId) => {
  if (USE_MOCK_DATA) {
    return [
      { customer: 'John Smith', product: 'Disability Insurance', score: 85, reason: 'High income, no coverage' },
      { customer: 'Sarah Johnson', product: 'Critical Illness', score: 78, reason: 'Family history, age appropriate' },
      { customer: 'Mike Davis', product: 'Long Term Care', score: 72, reason: 'Approaching retirement age' }
    ];
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_cross_sell_opportunity?advisor=${advisorId}`);
  return response.data.result;
};

export const getEngagementTrends = async (customerId) => {
  if (USE_MOCK_DATA) {
    return {
      trend: 'stable',
      contacts: Array.from({ length: 12 }, (_, i) => ({
        month: `2025-${String(i + 1).padStart(2, '0')}`,
        count: Math.floor(Math.random() * 5) + 1,
        channel: ['email', 'phone', 'meeting'][Math.floor(Math.random() * 3)]
      })),
      score: 68
    };
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_engagement_trend/${customerId}`);
  return response.data.result;
};

// Compliance & Automation API
export const getComplianceDocuments = async (customerId) => {
  if (USE_MOCK_DATA) {
    return [
      { name: 'Policy Application', status: 'Completed', date: '2025-01-15', type: 'Application' },
      { name: 'Beneficiary Designation', status: 'Pending Signature', date: '2026-02-10', type: 'Form' },
      { name: 'Disclosure Statement', status: 'Completed', date: '2025-01-15', type: 'Disclosure' }
    ];
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_compliance_doc?customer=${customerId}`);
  return response.data.result;
};

export const generateDisclosures = async (transactionType) => {
  if (USE_MOCK_DATA) {
    return {
      disclosures: [
        'This is not a guarantee of future performance',
        'Market risk may impact returns',
        'Fees and charges apply'
      ],
      requiresSignature: true,
      generatedAt: new Date().toISOString()
    };
  }
  const response = await serviceNowClient.post('/now/table/x_dxc_disclosure', { transactionType });
  return response.data.result;
};

export const assembleDocuments = async (appointmentId) => {
  if (USE_MOCK_DATA) {
    return {
      documents: [
        { name: 'Meeting Agenda', status: 'Ready', url: '#' },
        { name: 'Policy Summary', status: 'Ready', url: '#' },
        { name: 'Action Items Checklist', status: 'Ready', url: '#' }
      ],
      assembledAt: new Date().toISOString()
    };
  }
  const response = await serviceNowClient.post('/now/table/x_dxc_doc_assembly', { appointmentId });
  return response.data.result;
};

export const getAuditTrail = async (documentId) => {
  if (USE_MOCK_DATA) {
    return [
      { action: 'Created', user: 'Grace Wilson', timestamp: '2026-02-10 09:00' },
      { action: 'Reviewed', user: 'John Smith', timestamp: '2026-02-10 14:30' },
      { action: 'Signed', user: 'John Smith', timestamp: '2026-02-10 14:35' }
    ];
  }
  const response = await serviceNowClient.get(`/now/table/x_dxc_audit_trail?document=${documentId}`);
  return response.data.result;
};

export default serviceNowAPI;
