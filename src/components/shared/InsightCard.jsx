import React from 'react';
import { Card, CardContent, Typography, Box, Chip, alpha } from '@mui/material';
import {
  PriorityHigh as PriorityIcon,
  TrendingUp as OpportunityIcon,
  NotificationsActive as ReminderIcon,
  Info as InfoIcon
} from '@mui/icons-material';

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

const InsightCard = ({
  type = 'info',
  title,
  description,
  priority,
  actionLabel,
  onAction,
  metadata,
  icon: CustomIcon
}) => {
  // Determine card styling based on type
  const getTypeConfig = () => {
    switch (type) {
      case 'priority':
        return {
          color: colors.red,
          icon: PriorityIcon,
          label: 'Priority'
        };
      case 'opportunity':
        return {
          color: colors.green,
          icon: OpportunityIcon,
          label: 'Opportunity'
        };
      case 'reminder':
        return {
          color: colors.orange,
          icon: ReminderIcon,
          label: 'Reminder'
        };
      default:
        return {
          color: colors.lightBlue,
          icon: InfoIcon,
          label: 'Info'
        };
    }
  };

  const config = getTypeConfig();
  const IconComponent = CustomIcon || config.icon;

  return (
    <Card
      sx={{
        borderRadius: 3,
        bgcolor: '#FFFFFF',
        border: `1px solid ${alpha(config.color, 0.15)}`,
        borderLeft: `4px solid ${config.color}`,
        boxShadow: `0 2px 8px ${alpha(config.color, 0.08)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 6px 20px ${alpha(config.color, 0.18)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: alpha(config.color, 0.15),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <IconComponent sx={{ color: config.color, fontSize: 28 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Roboto Slab, serif',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  flex: 1
                }}
              >
                {title}
              </Typography>
              {priority && (
                <Chip
                  label={priority}
                  size="small"
                  sx={{
                    bgcolor: alpha(config.color, 0.1),
                    color: '#000000',
                    border: `1px solid ${alpha(config.color, 0.3)}`,
                    fontWeight: 700,
                    fontSize: '0.75rem',
                  }}
                />
              )}
            </Box>
            <Chip
              label={config.label}
              size="small"
              sx={{
                bgcolor: alpha(config.color, 0.1),
                color: '#000000',
                border: `1px solid ${alpha(config.color, 0.25)}`,
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 20,
              }}
            />
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: metadata || actionLabel ? 2 : 0, lineHeight: 1.6 }}
        >
          {description}
        </Typography>

        {metadata && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: actionLabel ? 2 : 0
            }}
          >
            {Object.entries(metadata).map(([key, value]) => (
              <Chip
                key={key}
                label={`${key}: ${value}`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: alpha(config.color, 0.3),
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        )}

        {actionLabel && onAction && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pt: 1,
              borderTop: `1px solid ${alpha(config.color, 0.2)}`
            }}
          >
            <Typography
              variant="button"
              sx={{
                color: config.color,
                fontWeight: 700,
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
              onClick={onAction}
            >
              {actionLabel}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightCard;
