import React from 'react';
import { Card, CardContent, Box, Typography, Chip, alpha } from '@mui/material';
import { Mic, Chat, AutoAwesome } from '@mui/icons-material';

const colors = {
  orange: '#F6921E',
  lightBlue: '#00ADEE',
  blue: '#1B75BB',
  green: '#37A526',
  lightGreen: '#8BC53F',
};

const UseCaseCard = ({
  userQuery,
  agentAction,
  outcome,
  interactionType = 'voice', // 'voice' or 'chat'
  color = colors.lightBlue
}) => {
  return (
    <Card
      sx={{
        bgcolor: '#FFFFFF',
        border: `1px solid ${alpha(color, 0.15)}`,
        borderLeft: `4px solid ${color}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 6px 20px ${alpha(color, 0.15)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Interaction Type Indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Chip
            icon={interactionType === 'voice' ? <Mic sx={{ fontSize: 16 }} /> : <Chat sx={{ fontSize: 16 }} />}
            label={interactionType === 'voice' ? 'Voice' : 'Chat'}
            size="small"
            sx={{
              bgcolor: alpha(color, 0.1),
              color: '#000000',
              border: `1px solid ${alpha(color, 0.25)}`,
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        {/* User Query */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            You Ask
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: '1rem',
              fontStyle: 'italic',
              mt: 0.5,
            }}
          >
            "{userQuery}"
          </Typography>
        </Box>

        {/* Agent Action */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.5,
            mb: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(color, 0.08),
          }}
        >
          <AutoAwesome sx={{ color: color, fontSize: 20, mt: 0.5, flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: color,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Agent Response
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                lineHeight: 1.6,
                mt: 0.5,
              }}
            >
              {agentAction}
            </Typography>
          </Box>
        </Box>

        {/* Outcome */}
        {outcome && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                bgcolor: colors.green,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              {outcome}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UseCaseCard;
