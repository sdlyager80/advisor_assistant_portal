import React, { useState, useEffect } from 'react';
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
  Divider,
  Tooltip,
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
    name: 'John Smith',
    age: 64,
    currentValue: 485000,
  },
  illustrationParams = {
    customerName: 'John Smith',
    age: 65,
    monthlyWithdrawal: 2000,
  }
}) => {
  // Use dynamic customer name from params, fallback to clientData
  const customerName = illustrationParams.customerName || clientData.name;
  const [currentStep, setCurrentStep] = useState(0);

  // Interactive parameters state
  const [params, setParams] = useState({
    monthlyPremium: 500,
    monthlyWithdrawal: illustrationParams.monthlyWithdrawal || 2000,
    growthRate: 6.0,
    inflationRate: 2.5,
    annualFees: 1.0,
    withdrawalStartAge: illustrationParams.age || 65,
    monthlyIncome: 8000,
    currentValue: clientData.currentValue || 485000,
  });

  const [showParameters, setShowParameters] = useState(true);

  // Toggle states for chart lines
  const [showAccountValue, setShowAccountValue] = useState(true);
  const [showCashSurrender, setShowCashSurrender] = useState(true);
  const [showDeathBenefit, setShowDeathBenefit] = useState(true);

  // Toggle for X-axis display (year vs age)
  const [showAge, setShowAge] = useState(false); // false = Policy Year, true = Age

  // Reset to default parameters
  const resetParameters = () => {
    setParams({
      monthlyPremium: 500,
      monthlyWithdrawal: illustrationParams.monthlyWithdrawal || 2000,
      growthRate: 6.0,
      inflationRate: 2.5,
      annualFees: 1.0,
      withdrawalStartAge: illustrationParams.age || 65,
      monthlyIncome: 8000,
      currentValue: clientData.currentValue || 485000,
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
    const initialDeathBenefit = params.currentValue * 2.5; // Initial death benefit multiplier

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

      // Calculate death benefit (guaranteed minimum plus account value growth)
      const deathBenefit = Math.max(initialDeathBenefit, accountValue * 1.1);

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
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', pb: 4 }}>
      {/* Simple Header */}
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
          color: '#fff',
          p: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Income Planning Illustration
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {customerName} • Age {illustrationParams.age} Withdrawals
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ color: '#fff' }}>
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
                  <Typography variant="caption" color="text.secondary">Current Value</Typography>
                  <Typography variant="h5" fontWeight={700} color={colors.blue}>
                    ${(params.currentValue / 1000).toFixed(0)}K
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary">Total Growth</Typography>
                  <Typography variant="h5" fontWeight={700} color={colors.lightGreen}>
                    ${(totalGrowth / 1000).toFixed(0)}K
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary">Growth Rate</Typography>
                  <Typography variant="h5" fontWeight={700} color={colors.lightGreen}>
                    +{growthPercentage}%
                  </Typography>
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
                      color: colors.blue,
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
                      color: colors.lightGreen,
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
                      color: colors.orange,
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
              <Box sx={{ bgcolor: alpha(colors.paleAqua, 0.5), borderRadius: 2, p: 2, mb: 2 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>
                  Projected Values at Age 85
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary">Account Value</Typography>
                    <Typography variant="h6" fontWeight={700} color={colors.blue}>
                      ${(chartData.find(d => d.age === 85)?.accountValue || 0).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary">Cash Surrender</Typography>
                    <Typography variant="h6" fontWeight={700} color={colors.lightGreen}>
                      ${(chartData.find(d => d.age === 85)?.cashSurrenderValue || 0).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary">Death Benefit</Typography>
                    <Typography variant="h6" fontWeight={700} color={colors.orange}>
                      ${(chartData.find(d => d.age === 85)?.deathBenefit || 0).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

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
                            onChange={(e) => setParams({ ...params, monthlyWithdrawal: Number(e.target.value) || 0 })}
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
                            onChange={(e, val) => setParams({ ...params, monthlyWithdrawal: val })}
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
                            onChange={(e) => setParams({ ...params, withdrawalStartAge: Number(e.target.value) || clientData.age })}
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
                            onChange={(e, val) => setParams({ ...params, withdrawalStartAge: val })}
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
                    <Box sx={{ mt: 2, p: 1.5, bgcolor: alpha(colors.lightBlue, 0.05), borderRadius: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Income Replacement</Typography>
                          <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.875rem' }}>
                            {((params.monthlyWithdrawal / params.monthlyIncome) * 100).toFixed(1)}%
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Net Growth</Typography>
                          <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.875rem' }}>
                            {(params.growthRate - params.annualFees).toFixed(1)}%
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Years to Withdrawal</Typography>
                          <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.875rem' }}>
                            {params.withdrawalStartAge - clientData.age} years
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
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
              border: `2px solid ${params.monthlyWithdrawal >= params.monthlyIncome ? colors.lightGreen : colors.orange}`
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
                  bgcolor: params.monthlyWithdrawal >= params.monthlyIncome ? colors.lightGreen : colors.orange,
                  mb: 2
                }}>
                  {params.monthlyWithdrawal >= params.monthlyIncome ? (
                    <CheckCircle sx={{ fontSize: 36, color: 'white' }} />
                  ) : (
                    <Warning sx={{ fontSize: 36, color: 'white' }} />
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
                  <Paper elevation={0} sx={{ p: 2.5, textAlign: 'center', bgcolor: alpha(colors.blue, 0.08), borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                      Monthly Income Need
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ mt: 1, color: colors.blue }}>
                      ${params.monthlyIncome.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Estimated requirement
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2.5, textAlign: 'center', bgcolor: alpha(colors.lightGreen, 0.08), borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                      Policy Provides
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ mt: 1, color: colors.green }}>
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
                    bgcolor: params.monthlyWithdrawal >= params.monthlyIncome
                      ? alpha(colors.lightGreen, 0.15)
                      : alpha(colors.orange, 0.15),
                    borderRadius: 2,
                    border: `2px solid ${params.monthlyWithdrawal >= params.monthlyIncome ? colors.lightGreen : colors.orange}`
                  }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                      {params.monthlyWithdrawal >= params.monthlyIncome ? 'Surplus' : 'Gap'}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{
                      mt: 1,
                      color: params.monthlyWithdrawal >= params.monthlyIncome ? colors.green : colors.orange
                    }}>
                      ${Math.abs(params.monthlyWithdrawal - params.monthlyIncome).toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {params.monthlyWithdrawal >= params.monthlyIncome ? 'Extra coverage' : 'Shortfall identified'}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {params.monthlyWithdrawal < params.monthlyIncome && (
                <Paper elevation={0} sx={{ p: 2.5, bgcolor: alpha(colors.orange, 0.08), borderRadius: 2, borderLeft: `4px solid ${colors.orange}` }}>
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Lightbulb sx={{ color: colors.orange }} />
                    Recommended Actions
                  </Typography>
                  <Stack spacing={1} sx={{ ml: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      • Gap of ${(params.monthlyIncome - params.monthlyWithdrawal).toLocaleString()}/month identified
                    </Typography>
                    {projectedAt85 > 200000 && (
                      <Typography variant="body2" color="text.secondary">
                        • Policy can support higher withdrawals - consider increasing to meet needs
                      </Typography>
                    )}
                    {projectedAt85 <= 200000 && (
                      <Typography variant="body2" color="text.secondary">
                        • Current policy may not sustain ${params.monthlyIncome.toLocaleString()}/month - delay start age or reduce income need
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      • Supplement with Social Security (typically ${Math.round(params.monthlyIncome * 0.4).toLocaleString()}-${Math.round(params.monthlyIncome * 0.5).toLocaleString()}/month)
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
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2.5, bgcolor: alpha(colors.lightGreen, 0.08), borderRadius: 2, height: '100%' }}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom color={colors.green}>
                      Conservative Strategy
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Monthly Withdrawal</Typography>
                        <Typography variant="body1" fontWeight={600}>${Math.round(params.monthlyWithdrawal * 0.8).toLocaleString()}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Start Age</Typography>
                        <Typography variant="body1" fontWeight={600}>{params.withdrawalStartAge + 2}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Sustainability</Typography>
                        <Typography variant="body1" fontWeight={600} color={colors.green}>Age 90+</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{
                    p: 2.5,
                    bgcolor: alpha(colors.blue, 0.12),
                    borderRadius: 2,
                    border: `2px solid ${colors.blue}`,
                    height: '100%'
                  }}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom color={colors.blue} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      Current Strategy
                      <Chip label="Selected" size="small" sx={{ bgcolor: colors.blue, color: 'white', height: 20 }} />
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Monthly Withdrawal</Typography>
                        <Typography variant="body1" fontWeight={600}>${params.monthlyWithdrawal.toLocaleString()}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Start Age</Typography>
                        <Typography variant="body1" fontWeight={600}>{params.withdrawalStartAge}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Sustainability</Typography>
                        <Typography variant="body1" fontWeight={600} color={colors.blue}>Age 85+</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={0} sx={{ p: 2.5, bgcolor: alpha(colors.orange, 0.08), borderRadius: 2, height: '100%' }}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom color={colors.orange}>
                      Aggressive Strategy
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Monthly Withdrawal</Typography>
                        <Typography variant="body1" fontWeight={600}>${Math.round(params.monthlyWithdrawal * 1.25).toLocaleString()}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Start Age</Typography>
                        <Typography variant="body1" fontWeight={600}>{params.withdrawalStartAge}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Sustainability</Typography>
                        <Typography variant="body1" fontWeight={600} color={colors.orange}>Age 80</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
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
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(projectedAt85 > 100000 ? colors.lightGreen : colors.orange, 0.1), borderLeft: `4px solid ${projectedAt85 > 100000 ? colors.lightGreen : colors.orange}` }}>
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
                      ? `Current policy supports $${(params.monthlyWithdrawal * 12).toLocaleString()}/year in withdrawals through age 85+ with healthy account balance of $${projectedAt85.toLocaleString()}.`
                      : `With current parameters, account balance at age 85 is only $${projectedAt85.toLocaleString()}. Consider increasing premiums or reducing withdrawal amounts.`
                    }
                  </Typography>
                </Paper>

                {/* Net Cash Flow */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.blue, 0.1), borderLeft: `4px solid ${colors.blue}` }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <TrendingUp sx={{ color: colors.blue, fontSize: 20 }} />
                    <Typography variant="subtitle2" fontWeight={700}>
                      Premium vs. Withdrawal Analysis
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    You're contributing ${params.monthlyPremium.toLocaleString()}/month until age {params.withdrawalStartAge}, then withdrawing ${params.monthlyWithdrawal.toLocaleString()}/month. Net growth rate after fees: {(params.growthRate - params.annualFees).toFixed(1)}%
                  </Typography>
                </Paper>

                {/* Alternative Strategy */}
                {params.withdrawalStartAge < 67 && (
                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.lightBlue, 0.1), borderLeft: `4px solid ${colors.lightBlue}` }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Lightbulb sx={{ color: colors.lightBlue, fontSize: 20 }} />
                      <Typography variant="subtitle2" fontWeight={700}>
                        Optimization Opportunity
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Delaying withdrawals to age {params.withdrawalStartAge + 2} could increase your monthly income by approximately ${Math.round(params.monthlyWithdrawal * 0.15).toLocaleString()} while maintaining sustainability.
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
                  icon={<CheckCircle />}
                  label="Approved"
                  size="small"
                  sx={{ bgcolor: colors.lightGreen, color: '#fff', fontWeight: 600 }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Withdrawal strategy of ${params.monthlyWithdrawal.toLocaleString()}/month ({((params.monthlyWithdrawal / params.monthlyIncome) * 100).toFixed(0)}% income replacement) starting at age {params.withdrawalStartAge} aligns with client's stated retirement objectives and risk tolerance. Regulator-ready documentation prepared.
              </Typography>

              <Paper elevation={0} sx={{ p: 2, bgcolor: '#fff', border: '1px solid #e0e0e0', borderRadius: 2 }}>
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
              border: `2px solid ${colors.orange}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 24px ${alpha(colors.orange, 0.2)}`,
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

                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.orange, 0.1), borderRadius: 2, mb: 2 }}>
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
