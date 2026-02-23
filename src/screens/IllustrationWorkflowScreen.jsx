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
  Slider,
  Grid,
  TextField,
  InputAdornment,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  CheckCircle,
  Warning,
  Lightbulb,
  Cake,
  ArrowForward,
  Close,
  ShowChart,
  Security,
  TuneOutlined,
  AttachMoneyOutlined,
  PercentOutlined,
  AccountBalanceOutlined,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from 'recharts';

const colors = {
  orange: '#F6921E',
  lightGreen: '#8BC53F',
  green: '#37A526',
  lightBlue: '#00ADEE',
  blue: '#1B75BB',
  red: '#D02E2E',
  paleAqua: '#F2F7F6',
};

const IllustrationWorkflowScreen = ({
  onClose,
  onNavigateToEngagement,
  clientData = {
    name: 'Sam Wright',
    age: 59,            // Sam Wright's current age per customer record
    currentValue: 485000,
  },
  illustrationParams = {
    customerName: 'Sam Wright',
    age: 65,
    monthlyWithdrawal: 2000,
  }
}) => {
  // Use dynamic customer name from params, fallback to clientData
  const customerName = illustrationParams.customerName || clientData.name;
  const [currentStep, setCurrentStep] = useState(0);
  const topRef = useRef(null);

  // Scroll to top when screen opens
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);

  // Interactive parameters state — defaults synced to Policy Z6010310 (Sam Wright)
  const [params, setParams] = useState({
    monthlyPremium: 1000,                                          // PDF: $1,000/month
    monthlyWithdrawal: illustrationParams.monthlyWithdrawal || 2000,
    growthRate: 6.0,                                               // PDF illustrated rate: 6.0%
    inflationRate: 2.5,
    annualFees: 1.0,
    withdrawalStartAge: illustrationParams.age || 65,
    monthlyIncome: 8000,
    currentValue: clientData.currentValue || 485000,
    specifiedAmount: 200000,                                       // PDF: Specified Amount $200K
  });

  const [showParameters, setShowParameters] = useState(true);

  // Distribution strategy selection
  const [selectedStrategy, setSelectedStrategy] = useState('current');
  const [baseWithdrawal, setBaseWithdrawal] = useState(illustrationParams.monthlyWithdrawal || 2000);
  const [baseStartAge, setBaseStartAge] = useState(illustrationParams.age || 65);

  const handleStrategySelect = (strategyKey) => {
    const presets = {
      conservative: { withdrawal: Math.round(baseWithdrawal * 0.8), startAge: baseStartAge + 2 },
      current:      { withdrawal: baseWithdrawal,                   startAge: baseStartAge },
      aggressive:   { withdrawal: Math.round(baseWithdrawal * 1.25), startAge: baseStartAge },
    };
    const preset = presets[strategyKey];
    setParams(prev => ({ ...prev, monthlyWithdrawal: preset.withdrawal, withdrawalStartAge: preset.startAge }));
    setSelectedStrategy(strategyKey);
  };

  // Toggle states for chart lines
  const [showAccountValue, setShowAccountValue] = useState(true);
  const [showCashSurrender, setShowCashSurrender] = useState(true);
  const [showDeathBenefit, setShowDeathBenefit] = useState(true);

  // Toggle for X-axis display (year vs age)
  const [showAge, setShowAge] = useState(false); // false = Policy Year, true = Age

  // Reset to default parameters
  const resetParameters = () => {
    setParams({
      monthlyPremium: 1000,
      monthlyWithdrawal: illustrationParams.monthlyWithdrawal || 2000,
      growthRate: 6.0,
      inflationRate: 2.5,
      annualFees: 1.0,
      withdrawalStartAge: illustrationParams.age || 65,
      monthlyIncome: 8000,
      currentValue: clientData.currentValue || 485000,
      specifiedAmount: 200000,
    });
  };

  // Progressive step reveal
  useEffect(() => {
    if (currentStep === 0) {
      const timer = setTimeout(() => setCurrentStep(1), 1000);
      return () => clearTimeout(timer);
    }
    if (currentStep > 0 && currentStep < 6) {
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Generate chart data with adjustable parameters
  const generateChartData = () => {
    const data = [];
    let accountValue = params.currentValue;
    const annualWithdrawal = params.monthlyWithdrawal * 12;
    const annualPremium = params.monthlyPremium * 12;
    const netGrowthRate = (params.growthRate - params.annualFees) / 100;
    const specifiedAmount = params.specifiedAmount || 200000; // PDF: $200K Specified Amount

    // Start chart from client's current age to show full accumulation and withdrawal phases
    for (let age = clientData.age; age <= 95; age++) {
      const isWithdrawing = age >= params.withdrawalStartAge;
      const yearsSinceStart = age - clientData.age;

      // Calculate surrender charge (decreases over time, typically 10 years)
      let surrenderChargeRate = 0;
      if (yearsSinceStart < 10) {
        surrenderChargeRate = Math.max(0, (10 - yearsSinceStart) * 0.01); // 10% decreasing to 0%
      }
      const surrenderCharge = accountValue * surrenderChargeRate;
      const cashSurrenderValue = Math.max(0, accountValue - surrenderCharge);

      // Option B Universal Life: Death Benefit = Specified Amount + Account Value (per PDF Z6010310)
      const deathBenefit = specifiedAmount + accountValue;

      data.push({
        age,
        year: yearsSinceStart,
        accountValue: Math.round(accountValue),
        cashSurrenderValue: Math.round(cashSurrenderValue),
        deathBenefit: Math.round(deathBenefit),
        withdrawal: isWithdrawing ? annualWithdrawal : 0,
        premium: !isWithdrawing ? annualPremium : 0,
      });

      // Apply growth
      accountValue = accountValue * (1 + netGrowthRate);

      // Add premiums before withdrawal age
      if (!isWithdrawing) {
        accountValue += annualPremium;
      }

      // Subtract withdrawals after withdrawal age
      if (isWithdrawing) {
        accountValue -= annualWithdrawal;
      }

      if (accountValue < 0) accountValue = 0;
    }
    return data;
  };

  const chartData = generateChartData();
  const projectedAt85 = chartData.find(d => d.age === 85)?.accountValue || 0;
  const finalValue = chartData[chartData.length - 1]?.accountValue || 0;
  const totalGrowth = finalValue - params.currentValue;
  const growthPercentage = ((totalGrowth / params.currentValue) * 100).toFixed(1);

  return (
    <Box ref={topRef} sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', pb: 4 }}>
      {/* Simple Header */}
      <Paper
        elevation={0}
        sx={{
          background: alpha(colors.blue, 0.1),
          borderBottom: `3px solid ${colors.blue}`,
          p: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" fontWeight={700} color={colors.blue}>
                Income Planning Illustration
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {customerName} • Age {illustrationParams.age} Withdrawals
              </Typography>
            </Box>
            {customerName === 'Sam Wright' && (
              <Chip
                label="Download PDF"
                size="small"
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = '/sam-wright-policy-Z6010310.pdf';
                  a.download = 'sam-wright-policy-Z6010310.pdf';
                  a.click();
                }}
                sx={{
                  bgcolor: alpha(colors.blue, 0.1),
                  color: '#000000',
                  border: `1px solid ${alpha(colors.blue, 0.25)}`,
                  fontWeight: 600,
                  cursor: 'pointer',
                  mr: 1,
                  '&:hover': { bgcolor: alpha(colors.blue, 0.18) },
                }}
              />
            )}
            <IconButton onClick={onClose} sx={{ color: colors.blue }}>
              <Close />
            </IconButton>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {/* Step 1: Illustration Chart */}
        <Fade in={currentStep >= 1} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              {/* Header with Title and Toggle Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                    Policy Value Projection
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Universal Life Insurance • {chartData.length - 1} Year Projection
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => setShowAccountValue(!showAccountValue)}
                    sx={{
                      bgcolor: showAccountValue ? alpha(colors.blue, 0.1) : 'transparent',
                      border: `2px solid ${colors.blue}`,
                      '&:hover': { bgcolor: alpha(colors.blue, 0.2) }
                    }}
                  >
                    <ShowChart sx={{ fontSize: 20, color: colors.blue }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setShowCashSurrender(!showCashSurrender)}
                    sx={{
                      bgcolor: showCashSurrender ? alpha(colors.lightGreen, 0.1) : 'transparent',
                      border: `2px solid ${colors.lightGreen}`,
                      '&:hover': { bgcolor: alpha(colors.lightGreen, 0.2) }
                    }}
                  >
                    <AttachMoneyOutlined sx={{ fontSize: 20, color: colors.lightGreen }} />
                  </IconButton>
                </Box>
              </Box>

              {/* Key Metrics Header */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={4}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.blue, 0.06), border: `1px solid ${alpha(colors.blue, 0.15)}`, borderLeft: `4px solid ${colors.blue}`, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 0.5 }}>Current Value</Typography>
                    <Typography variant="h4" fontWeight={800} color="#000000">
                      ${(params.currentValue / 1000).toFixed(0)}K
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.green, 0.06), border: `1px solid ${alpha(colors.green, 0.15)}`, borderLeft: `4px solid ${colors.green}`, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 0.5 }}>Total Growth</Typography>
                    <Typography variant="h4" fontWeight={800} color="#000000">
                      ${(totalGrowth / 1000).toFixed(0)}K
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.orange, 0.06), border: `1px solid ${alpha(colors.orange, 0.15)}`, borderLeft: `4px solid ${colors.orange}`, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 0.5 }}>Growth Rate</Typography>
                    <Typography variant="h4" fontWeight={800} color="#000000">
                      +{growthPercentage}%
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Toggle Pills */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label="Account Value"
                    onClick={() => setShowAccountValue(!showAccountValue)}
                    sx={{
                      bgcolor: showAccountValue ? alpha(colors.blue, 0.15) : alpha('#000', 0.05),
                      color: '#000000',
                      fontWeight: 600,
                      border: `2px solid ${showAccountValue ? colors.blue : 'transparent'}`,
                      cursor: 'pointer'
                    }}
                  />
                  <Chip
                    label="Cash Surrender Value"
                    onClick={() => setShowCashSurrender(!showCashSurrender)}
                    sx={{
                      bgcolor: showCashSurrender ? alpha(colors.lightGreen, 0.15) : alpha('#000', 0.05),
                      color: '#000000',
                      fontWeight: 600,
                      border: `2px solid ${showCashSurrender ? colors.lightGreen : 'transparent'}`,
                      cursor: 'pointer'
                    }}
                  />
                  <Chip
                    label="Death Benefit"
                    onClick={() => setShowDeathBenefit(!showDeathBenefit)}
                    sx={{
                      bgcolor: showDeathBenefit ? alpha(colors.orange, 0.15) : alpha('#000', 0.05),
                      color: '#000000',
                      fontWeight: 600,
                      border: `2px solid ${showDeathBenefit ? colors.orange : 'transparent'}`,
                      cursor: 'pointer'
                    }}
                  />
                </Box>

                {/* X-axis Toggle */}
                <Box sx={{ display: 'flex', gap: 0.5, bgcolor: alpha('#000', 0.05), borderRadius: 1, p: 0.5 }}>
                  <Button
                    size="small"
                    onClick={() => setShowAge(false)}
                    sx={{
                      minWidth: 'auto',
                      px: 1.5,
                      py: 0.5,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      bgcolor: !showAge ? '#fff' : 'transparent',
                      color: !showAge ? colors.blue : 'text.secondary',
                      boxShadow: !showAge ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      '&:hover': {
                        bgcolor: !showAge ? '#fff' : alpha('#000', 0.05),
                      }
                    }}
                  >
                    Year
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setShowAge(true)}
                    sx={{
                      minWidth: 'auto',
                      px: 1.5,
                      py: 0.5,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      bgcolor: showAge ? '#fff' : 'transparent',
                      color: showAge ? colors.blue : 'text.secondary',
                      boxShadow: showAge ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      '&:hover': {
                        bgcolor: showAge ? '#fff' : alpha('#000', 0.05),
                      }
                    }}
                  >
                    Age
                  </Button>
                </Box>
              </Box>

              {/* Chart */}
              <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 2, mb: 2 }}>
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                      dataKey={showAge ? "age" : "year"}
                      stroke="#666"
                      style={{ fontSize: '12px' }}
                      label={{ value: showAge ? 'Age' : 'Policy Year', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: '#666' } }}
                    />
                    <YAxis
                      stroke="#666"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <ChartTooltip
                      formatter={(value, name) => {
                        const displayName = name === 'accountValue' ? 'Account Value'
                          : name === 'cashSurrenderValue' ? 'Cash Surrender Value'
                          : 'Death Benefit';
                        return [`$${value.toLocaleString()}`, displayName];
                      }}
                      contentStyle={{ borderRadius: '8px', border: `1px solid ${colors.lightBlue}` }}
                    />
                    {showAccountValue && (
                      <Area
                        type="monotone"
                        dataKey="accountValue"
                        stroke={colors.blue}
                        fill={colors.blue}
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    )}
                    {showCashSurrender && (
                      <Area
                        type="monotone"
                        dataKey="cashSurrenderValue"
                        stroke={colors.lightGreen}
                        fill={colors.lightGreen}
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    )}
                    {showDeathBenefit && (
                      <Area
                        type="monotone"
                        dataKey="deathBenefit"
                        stroke={colors.orange}
                        fill={colors.orange}
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </Box>

              {/* Professional Disclaimer */}
              <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', mb: 2 }}>
                * Projected values are based on current assumptions and are not guaranteed. Actual results may vary.
              </Typography>

              {/* Projected Values at Age 85 */}
              <Paper elevation={0} sx={{ border: `1px solid ${alpha(colors.lightBlue, 0.15)}`, borderLeft: `4px solid ${colors.blue}`, borderRadius: 2, p: 2, mb: 2, bgcolor: '#FFFFFF' }}>
                <Typography variant="subtitle2" fontWeight={700} color={colors.blue} sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 0.8, fontSize: '0.75rem' }}>
                  Projected Values at Age 85
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 0.5 }}>Account Value</Typography>
                    <Typography variant="h6" fontWeight={800} color="#000000">
                      ${(chartData.find(d => d.age === 85)?.accountValue || 0).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 0.5 }}>Cash Surrender</Typography>
                    <Typography variant="h6" fontWeight={800} color="#000000">
                      ${(chartData.find(d => d.age === 85)?.cashSurrenderValue || 0).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 0.5 }}>Death Benefit</Typography>
                    <Typography variant="h6" fontWeight={800} color="#000000">
                      ${(chartData.find(d => d.age === 85)?.deathBenefit || 0).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Compact Parameter Adjusters - Directly Below Metrics */}
              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${alpha(colors.lightBlue, 0.2)}` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TuneOutlined sx={{ fontSize: 20, color: colors.lightBlue }} />
                    <Typography variant="subtitle2" fontWeight={700}>
                      Adjust Parameters
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      onClick={resetParameters}
                      sx={{ textTransform: 'none', minWidth: 'auto', px: 1, fontSize: '0.75rem' }}
                    >
                      Reset
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setShowParameters(!showParameters)}
                      sx={{ textTransform: 'none', minWidth: 'auto', px: 1, fontSize: '0.75rem' }}
                    >
                      {showParameters ? 'Hide' : 'Show'}
                    </Button>
                  </Stack>
                </Box>

                {showParameters && (
                  <Box>
                    <Grid container spacing={2}>
                      {/* Row 1 */}
                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.lightGreen, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Premium
                          </Typography>
                          <TextField
                            value={params.monthlyPremium}
                            onChange={(e) => setParams({ ...params, monthlyPremium: Number(e.target.value) || 0 })}
                            size="small"
                            type="number"
                            fullWidth
                            InputProps={{
                              startAdornment: <InputAdornment position="start" sx={{ fontSize: '0.75rem' }}>$</InputAdornment>,
                            }}
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.monthlyPremium}
                            onChange={(e, val) => setParams({ ...params, monthlyPremium: val })}
                            min={0}
                            max={2000}
                            step={50}
                            sx={{ color: colors.lightGreen, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.orange, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Withdrawal
                          </Typography>
                          <TextField
                            value={params.monthlyWithdrawal}
                            onChange={(e) => { const v = Number(e.target.value) || 0; setParams({ ...params, monthlyWithdrawal: v }); setBaseWithdrawal(v); setSelectedStrategy('current'); }}
                            size="small"
                            type="number"
                            fullWidth
                            InputProps={{
                              startAdornment: <InputAdornment position="start" sx={{ fontSize: '0.75rem' }}>$</InputAdornment>,
                            }}
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.monthlyWithdrawal}
                            onChange={(e, val) => { setParams({ ...params, monthlyWithdrawal: val }); setBaseWithdrawal(val); setSelectedStrategy('current'); }}
                            min={0}
                            max={5000}
                            step={100}
                            sx={{ color: colors.orange, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.blue, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Growth Rate
                          </Typography>
                          <TextField
                            value={params.growthRate}
                            onChange={(e) => setParams({ ...params, growthRate: Number(e.target.value) || 0 })}
                            size="small"
                            type="number"
                            fullWidth
                            InputProps={{
                              endAdornment: <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>%</InputAdornment>,
                            }}
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.growthRate}
                            onChange={(e, val) => setParams({ ...params, growthRate: val })}
                            min={0}
                            max={12}
                            step={0.5}
                            sx={{ color: colors.blue, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.orange, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Policy Fees
                          </Typography>
                          <TextField
                            value={params.annualFees}
                            onChange={(e) => setParams({ ...params, annualFees: Number(e.target.value) || 0 })}
                            size="small"
                            type="number"
                            fullWidth
                            InputProps={{
                              endAdornment: <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>%</InputAdornment>,
                            }}
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.annualFees}
                            onChange={(e, val) => setParams({ ...params, annualFees: val })}
                            min={0}
                            max={3}
                            step={0.1}
                            sx={{ color: colors.orange, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.lightBlue, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Start Age
                          </Typography>
                          <TextField
                            value={params.withdrawalStartAge}
                            onChange={(e) => { const v = Number(e.target.value) || clientData.age; setParams({ ...params, withdrawalStartAge: v }); setBaseStartAge(v); setSelectedStrategy('current'); }}
                            size="small"
                            type="number"
                            fullWidth
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.withdrawalStartAge}
                            onChange={(e, val) => { setParams({ ...params, withdrawalStartAge: val }); setBaseStartAge(val); setSelectedStrategy('current'); }}
                            min={clientData.age}
                            max={75}
                            step={1}
                            sx={{ color: colors.lightBlue, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.lightGreen, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Monthly Income
                          </Typography>
                          <TextField
                            value={params.monthlyIncome}
                            onChange={(e) => setParams({ ...params, monthlyIncome: Number(e.target.value) || 2000 })}
                            size="small"
                            type="number"
                            fullWidth
                            InputProps={{
                              startAdornment: <InputAdornment position="start" sx={{ fontSize: '0.75rem' }}>$</InputAdornment>,
                            }}
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.monthlyIncome}
                            onChange={(e, val) => setParams({ ...params, monthlyIncome: val })}
                            min={2000}
                            max={20000}
                            step={500}
                            sx={{ color: colors.lightGreen, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Compact Impact Summary */}
                    <Paper elevation={0} sx={{ mt: 2, p: 1.5, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.lightBlue, 0.15)}`, borderLeft: `4px solid ${colors.lightBlue}`, borderRadius: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: '0.7rem', display: 'block', mb: 0.25 }}>Income Replacement</Typography>
                          <Typography variant="body2" fontWeight={800} color="#000000" sx={{ fontSize: '0.9rem' }}>
                            {((params.monthlyWithdrawal / params.monthlyIncome) * 100).toFixed(1)}%
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: '0.7rem', display: 'block', mb: 0.25 }}>Net Growth</Typography>
                          <Typography variant="body2" fontWeight={800} color="#000000" sx={{ fontSize: '0.9rem' }}>
                            {(params.growthRate - params.annualFees).toFixed(1)}%
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: '0.7rem', display: 'block', mb: 0.25 }}>Years to Withdrawal</Typography>
                          <Typography variant="body2" fontWeight={800} color="#000000" sx={{ fontSize: '0.9rem' }}>
                            {params.withdrawalStartAge - clientData.age} yrs
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 2: Income Gap Identification */}
        <Fade in={currentStep >= 2} timeout={800}>
          <Card
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: 3,
              bgcolor: '#FFFFFF',
              border: `1px solid ${alpha(params.monthlyWithdrawal >= params.monthlyIncome ? colors.lightGreen : colors.orange, 0.2)}`,
              borderLeft: `4px solid ${params.monthlyWithdrawal >= params.monthlyIncome ? colors.green : colors.orange}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: alpha(params.monthlyWithdrawal >= params.monthlyIncome ? colors.lightGreen : colors.orange, 0.15),
                  border: `3px solid ${params.monthlyWithdrawal >= params.monthlyIncome ? colors.lightGreen : colors.orange}`,
                  mb: 2
                }}>
                  {params.monthlyWithdrawal >= params.monthlyIncome ? (
                    <CheckCircle sx={{ fontSize: 36, color: colors.lightGreen }} />
                  ) : (
                    <Warning sx={{ fontSize: 36, color: colors.orange }} />
                  )}
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {params.monthlyWithdrawal >= params.monthlyIncome
                    ? 'Income Needs Met ✓'
                    : 'Potential Income Gap Identified'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Intelligent income analysis for {customerName}
                </Typography>
              </Box>

              <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2.5, textAlign: 'center', bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.blue, 0.15)}`, borderLeft: `4px solid ${colors.blue}`, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}>
                      Monthly Income Need
                    </Typography>
                    <Typography variant="h4" fontWeight={800} sx={{ color: '#000000' }}>
                      ${params.monthlyIncome.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Estimated requirement
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2.5, textAlign: 'center', bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.lightGreen, 0.15)}`, borderLeft: `4px solid ${colors.green}`, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}>
                      Policy Provides
                    </Typography>
                    <Typography variant="h4" fontWeight={800} sx={{ color: '#000000' }}>
                      ${params.monthlyWithdrawal.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Monthly withdrawal
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{
                    p: 2.5,
                    textAlign: 'center',
                    bgcolor: '#FFFFFF',
                    border: `1px solid ${alpha(params.monthlyWithdrawal >= params.monthlyIncome ? colors.lightGreen : colors.orange, 0.15)}`,
                    borderLeft: `4px solid ${params.monthlyWithdrawal >= params.monthlyIncome ? colors.green : colors.orange}`,
                    borderRadius: 2,
                  }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}>
                      {params.monthlyWithdrawal >= params.monthlyIncome ? 'Surplus' : 'Gap'}
                    </Typography>
                    <Typography variant="h4" fontWeight={800} sx={{ color: '#000000' }}>
                      ${Math.abs(params.monthlyWithdrawal - params.monthlyIncome).toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {params.monthlyWithdrawal >= params.monthlyIncome ? 'Extra coverage' : 'Shortfall identified'}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {params.monthlyWithdrawal < params.monthlyIncome && (
                <Paper elevation={0} sx={{ p: 2.5, bgcolor: alpha(colors.orange, 0.06), border: `1px solid ${alpha(colors.orange, 0.15)}`, borderLeft: `4px solid ${colors.orange}`, borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Lightbulb sx={{ color: colors.orange }} />
                    Recommended Actions
                  </Typography>
                  <Stack spacing={1} sx={{ ml: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      • Gap of <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>${(params.monthlyIncome - params.monthlyWithdrawal).toLocaleString()}/month</Box> identified
                    </Typography>
                    {projectedAt85 > 200000 && (
                      <Typography variant="body2" color="text.secondary">
                        • Policy can support higher withdrawals - consider increasing to meet needs
                      </Typography>
                    )}
                    {projectedAt85 <= 200000 && (
                      <Typography variant="body2" color="text.secondary">
                        • Current policy may not sustain <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>${params.monthlyIncome.toLocaleString()}/month</Box> - delay start age or reduce income need
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      • Supplement with Social Security (typically <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>${Math.round(params.monthlyIncome * 0.4).toLocaleString()}-${Math.round(params.monthlyIncome * 0.5).toLocaleString()}/month</Box>)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Consider part-time work or other retirement income sources for remaining gap
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Review alternative distribution strategies below for optimized scenarios
                    </Typography>
                  </Stack>
                </Paper>
              )}
            </CardContent>
          </Card>
        </Fade>

        {/* Step 3: Alternative Distribution Strategies */}
        <Fade in={currentStep >= 3} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ShowChart sx={{ fontSize: 28, color: colors.blue, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  Alternative Distribution Strategies
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Modeled scenarios to optimize income and sustainability:
              </Typography>

              <Grid container spacing={2}>
                {[
                  { key: 'conservative', label: 'Conservative Strategy', color: colors.green,  withdrawal: Math.round(baseWithdrawal * 0.8),  startAge: baseStartAge + 2, sustainability: 'Age 90+' },
                  { key: 'current',      label: 'Current Strategy',      color: colors.blue,   withdrawal: baseWithdrawal,                   startAge: baseStartAge,     sustainability: 'Age 85+' },
                  { key: 'aggressive',   label: 'Aggressive Strategy',   color: colors.orange, withdrawal: Math.round(baseWithdrawal * 1.25), startAge: baseStartAge,     sustainability: 'Age 80'  },
                ].map((strategy) => {
                  const isSelected = selectedStrategy === strategy.key;
                  return (
                    <Grid item xs={12} md={4} key={strategy.key}>
                      <Paper
                        elevation={0}
                        onClick={() => handleStrategySelect(strategy.key)}
                        sx={{
                          p: 2.5,
                          bgcolor: isSelected ? alpha(strategy.color, 0.06) : '#FFFFFF',
                          border: `1px solid ${alpha(strategy.color, isSelected ? 0.4 : 0.15)}`,
                          borderLeft: `4px solid ${strategy.color}`,
                          borderRadius: 2,
                          height: '100%',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: alpha(strategy.color, 0.08),
                            boxShadow: `0 4px 12px ${alpha(strategy.color, 0.15)}`,
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight={700} gutterBottom color={strategy.color} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {strategy.label}
                          {isSelected && (
                            <Chip label="Selected" size="small" sx={{ bgcolor: alpha(strategy.color, 0.1), color: '#000000', height: 20, border: `1px solid ${alpha(strategy.color, 0.3)}`, fontWeight: 600 }} />
                          )}
                        </Typography>
                        <Divider sx={{ my: 1.5, borderColor: alpha(strategy.color, 0.15) }} />
                        <Stack spacing={1.5}>
                          <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 0.25 }}>Monthly Withdrawal</Typography>
                            <Typography variant="body1" fontWeight={800} color="#000000">${strategy.withdrawal.toLocaleString()}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 0.25 }}>Start Age</Typography>
                            <Typography variant="body1" fontWeight={800} color="#000000">{strategy.startAge}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 0.25 }}>Sustainability</Typography>
                            <Typography variant="body1" fontWeight={800} color="#000000">{strategy.sustainability}</Typography>
                          </Box>
                        </Stack>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 4: Intelligent Insights */}
        <Fade in={currentStep >= 4} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Lightbulb sx={{ fontSize: 28, color: colors.orange, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  Intelligent Analysis
                </Typography>
              </Box>

              <Stack spacing={2}>
                {/* Income Sustainability */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(projectedAt85 > 100000 ? colors.lightGreen : colors.orange, 0.15)}`, borderLeft: `4px solid ${projectedAt85 > 100000 ? colors.lightGreen : colors.orange}`, borderRadius: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    {projectedAt85 > 100000 ? (
                      <CheckCircle sx={{ color: colors.lightGreen, fontSize: 20 }} />
                    ) : (
                      <Warning sx={{ color: colors.orange, fontSize: 20 }} />
                    )}
                    <Typography variant="subtitle2" fontWeight={700}>
                      {projectedAt85 > 100000 ? 'Income Sustainable' : 'Low Balance Warning'}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {projectedAt85 > 100000
                      ? <>Current policy supports <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>${(params.monthlyWithdrawal * 12).toLocaleString()}/year</Box> in withdrawals through age 85+ with healthy account balance of <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>${projectedAt85.toLocaleString()}</Box>.</>
                      : <>With current parameters, account balance at age 85 is only <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>${projectedAt85.toLocaleString()}</Box>. Consider increasing premiums or reducing withdrawal amounts.</>
                    }
                  </Typography>
                </Paper>

                {/* Net Cash Flow */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.blue, 0.15)}`, borderLeft: `4px solid ${colors.blue}`, borderRadius: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <TrendingUp sx={{ color: colors.blue, fontSize: 20 }} />
                    <Typography variant="subtitle2" fontWeight={700}>
                      Premium vs. Withdrawal Analysis
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    You're contributing <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>${params.monthlyPremium.toLocaleString()}/month</Box> until age <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>{params.withdrawalStartAge}</Box>, then withdrawing <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>${params.monthlyWithdrawal.toLocaleString()}/month</Box>. Net growth rate after fees: <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>{(params.growthRate - params.annualFees).toFixed(1)}%</Box>
                  </Typography>
                </Paper>

                {/* Alternative Strategy */}
                {params.withdrawalStartAge < 67 && (
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.lightBlue, 0.15)}`, borderLeft: `4px solid ${colors.lightBlue}`, borderRadius: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Lightbulb sx={{ color: colors.lightBlue, fontSize: 20 }} />
                      <Typography variant="subtitle2" fontWeight={700}>
                        Optimization Opportunity
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Delaying withdrawals to age <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>{params.withdrawalStartAge + 2}</Box> could increase your monthly income by approximately <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>${Math.round(params.monthlyWithdrawal * 0.15).toLocaleString()}</Box> while maintaining sustainability.
                    </Typography>
                  </Paper>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 5: Compliance Check */}
        <Fade in={currentStep >= 5} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Security sx={{ fontSize: 28, color: colors.lightGreen, mr: 1.5 }} />
                  <Typography variant="h6" fontWeight={700}>
                    Suitability Check
                  </Typography>
                </Box>
                <Chip
                  icon={<CheckCircle sx={{ color: `${colors.green} !important` }} />}
                  label="Approved"
                  size="small"
                  sx={{ bgcolor: alpha(colors.lightGreen, 0.1), color: '#000000', fontWeight: 600, border: `1px solid ${alpha(colors.green, 0.3)}` }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Withdrawal strategy of <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>${params.monthlyWithdrawal.toLocaleString()}/month</Box> (<Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>{((params.monthlyWithdrawal / params.monthlyIncome) * 100).toFixed(0)}% income replacement</Box>) starting at age <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>{params.withdrawalStartAge}</Box> aligns with client's stated retirement objectives and risk tolerance. Regulator-ready documentation prepared.
              </Typography>

              <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.lightGreen, 0.15)}`, borderLeft: `4px solid ${colors.lightGreen}`, borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 0.5 }}>
                  COMPLIANCE SUMMARY
                </Typography>
                <Typography variant="body2">
                  ✓ Income needs verified • ✓ Risk profile matched • ✓ Alternative strategies documented
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 6: Life-Stage Milestone - Birthday Approaching */}
        <Fade in={currentStep >= 6} timeout={800}>
          <Card
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: 3,
              border: `1px solid ${alpha(colors.orange, 0.15)}`,
              borderLeft: `4px solid ${colors.orange}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 24px ${alpha(colors.orange, 0.15)}`,
              }
            }}
            onClick={() => {
              if (onNavigateToEngagement) {
                onNavigateToEngagement({
                  name: customerName,
                  age: 60, // Fixed milestone birthday
                  milestone: 'birthday'
                });
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Cake sx={{ fontSize: 28, color: colors.orange, mr: 1.5 }} />
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        Upcoming Milestone Detected
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {customerName} turns 60 in 2 weeks
                      </Typography>
                    </Box>
                  </Box>

                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFFFFF', border: `1px solid ${alpha(colors.orange, 0.15)}`, borderLeft: `4px solid ${colors.orange}`, borderRadius: 2, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Recommended Action:</strong> Send personalized birthday outreach with coverage adequacy review. This milestone is an ideal opportunity for proactive engagement and retention.
                    </Typography>
                  </Paper>

                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: colors.orange,
                      color: '#fff',
                      fontWeight: 700,
                      '&:hover': { bgcolor: alpha(colors.orange, 0.9) }
                    }}
                  >
                    Create Personalized Outreach
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>

    </Box>
  );
};

export default IllustrationWorkflowScreen;
