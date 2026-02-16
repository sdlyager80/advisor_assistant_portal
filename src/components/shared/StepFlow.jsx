import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  alpha,
  Fade,
  LinearProgress,
} from '@mui/material';
import {
  CheckCircle,
  ArrowForward,
  Replay,
  ArrowBack,
} from '@mui/icons-material';

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

const StepFlow = ({ steps, title, subtitle, color = colors.lightBlue }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
  };

  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Roboto Slab, serif',
            fontWeight: 700,
            mb: 1,
            background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ maxWidth: 700, mx: 'auto', mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: alpha(color, 0.1),
              '& .MuiLinearProgress-bar': {
                bgcolor: color,
                borderRadius: 4,
              },
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Step {currentStep + 1} of {steps.length}
          </Typography>
        </Box>
      </Box>

      {/* Step Indicators */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          mb: 4,
          position: 'relative',
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {index > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  left: '-50%',
                  width: '100%',
                  height: 4,
                  bgcolor: index <= currentStep ? colors.green : alpha(color, 0.2),
                  transition: 'all 0.3s ease',
                  borderRadius: 2,
                  zIndex: 0,
                }}
              />
            )}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background:
                  index <= currentStep
                    ? `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`
                    : alpha(color, 0.15),
                color: index <= currentStep ? 'white' : 'text.secondary',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1rem',
                mb: 1,
                position: 'relative',
                zIndex: 1,
                border: `3px solid ${index <= currentStep ? colors.green : alpha(color, 0.3)}`,
                boxShadow: index <= currentStep ? `0 4px 12px ${alpha(colors.green, 0.4)}` : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {index < currentStep ? <CheckCircle sx={{ fontSize: 24 }} /> : index + 1}
            </Box>
            <Typography
              variant="caption"
              color={index <= currentStep ? 'text.primary' : 'text.secondary'}
              fontWeight={index === currentStep ? 700 : 500}
              sx={{
                display: { xs: 'none', sm: 'block' },
                textAlign: 'center',
                fontSize: '0.7rem',
                maxWidth: 120,
              }}
            >
              {step.title}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Current Step Content */}
      <Fade in key={currentStep} timeout={500}>
        <Box sx={{ maxWidth: 900, mx: 'auto', mb: 4 }}>
          {steps[currentStep].content}
        </Box>
      </Fade>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          startIcon={<ArrowBack />}
          sx={{
            borderColor: color,
            color: color,
            '&:hover': {
              borderColor: color,
              bgcolor: alpha(color, 0.05),
            },
          }}
        >
          Previous
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={<ArrowForward />}
            sx={{
              bgcolor: color,
              '&:hover': {
                bgcolor: alpha(color, 0.9),
              },
            }}
          >
            Next Step
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleRestart}
            startIcon={<Replay />}
            sx={{
              bgcolor: colors.green,
              '&:hover': {
                bgcolor: alpha(colors.green, 0.9),
              },
            }}
          >
            Start Over
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default StepFlow;
