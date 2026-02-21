import React from 'react';
import { Card, CardContent, Typography, Box, alpha } from '@mui/material';
import { TrendingUp, TrendingDown, Remove } from '@mui/icons-material';

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

const DataCard = ({
  title,
  value,
  trend,
  trendValue,
  subtitle,
  icon: Icon,
  color = colors.lightBlue,
  onClick
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend === 'up') return <TrendingUp sx={{ fontSize: 18 }} />;
    if (trend === 'down') return <TrendingDown sx={{ fontSize: 18 }} />;
    return <Remove sx={{ fontSize: 18 }} />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return colors.green;
    if (trend === 'down') return colors.red;
    return 'text.secondary';
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        bgcolor: '#FFFFFF',
        border: `1px solid ${alpha(color, 0.15)}`,
        borderLeft: `4px solid ${color}`,
        boxShadow: `0 2px 8px ${alpha(color, 0.08)}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: `0 6px 20px ${alpha(color, 0.18)}`,
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          {Icon && (
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: alpha(color, 0.15),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <Icon sx={{ color: color, fontSize: 28 }} />
            </Box>
          )}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 0.5, fontSize: '0.875rem', fontWeight: 500 }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Roboto Slab, serif',
                fontWeight: 800,
                color: '#000000',
                fontSize: '2rem'
              }}
            >
              {value}
            </Typography>
          </Box>
        </Box>

        {(trend || subtitle) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {trend && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: getTrendColor(),
                }}
              >
                {getTrendIcon()}
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                >
                  {trendValue}
                </Typography>
              </Box>
            )}
            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.875rem' }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DataCard;
