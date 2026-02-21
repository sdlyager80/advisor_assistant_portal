import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Collapse,
  IconButton,
  alpha,
  Divider
} from '@mui/material';
import { ExpandMore as ExpandIcon } from '@mui/icons-material';

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

const IntelligencePanel = ({
  title,
  subtitle,
  icon: Icon,
  color = colors.lightBlue,
  children,
  defaultExpanded = false,
  actions
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        bgcolor: '#FFFFFF',
        border: `1px solid ${alpha(color, 0.15)}`,
        borderLeft: `4px solid ${color}`,
        boxShadow: `0 2px 8px ${alpha(color, 0.08)}`,
        overflow: 'visible',
        transition: 'all 0.3s ease',
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: alpha(color, 0.05)
            }
          }}
          onClick={handleExpandClick}
        >
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
              variant="h6"
              sx={{
                fontFamily: 'Roboto Slab, serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                mb: subtitle ? 0.5 : 0
              }}
            >
              {title}
            </Typography>
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
          <IconButton
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              color: color
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider sx={{ borderColor: alpha(color, 0.2) }} />
          <Box sx={{ p: 2.5 }}>
            {children}
          </Box>

          {/* Actions */}
          {actions && (
            <>
              <Divider sx={{ borderColor: alpha(color, 0.2) }} />
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                  bgcolor: alpha(color, 0.03)
                }}
              >
                {actions}
              </Box>
            </>
          )}
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default IntelligencePanel;
