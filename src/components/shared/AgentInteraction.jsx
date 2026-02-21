import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Chip,
  CircularProgress,
  alpha,
  Fade,
  Collapse,
} from '@mui/material';
import { Mic, Send, AutoAwesome, CheckCircle } from '@mui/icons-material';

const colors = {
  lightBlue: '#00ADEE',
  blue: '#1B75BB',
  green: '#37A526',
};

const AgentInteraction = ({
  suggestedQueries = [],
  onQuery,
  placeholder = "Ask your agent anything..."
}) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentResponse, setCurrentResponse] = useState(null);

  const handleQuery = async (query) => {
    setInput(query);
    setIsProcessing(true);
    setShowResult(false);

    // Simulate agent processing
    setTimeout(() => {
      const response = onQuery(query);
      setCurrentResponse(response);
      setIsProcessing(false);
      setShowResult(true);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleQuery(input);
    }
  };

  return (
    <Box>
      {/* Input Section */}
      <Card
        sx={{
          bgcolor: '#FFFFFF',
          border: `1px solid ${alpha(colors.lightBlue, 0.15)}`,
          borderLeft: `4px solid ${colors.lightBlue}`,
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <AutoAwesome sx={{ color: colors.lightBlue, fontSize: 24 }} />
            <Typography variant="h6" fontWeight={600}>
              Ask Your Agent
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                disabled={isProcessing}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                  },
                }}
              />
              <IconButton
                type="submit"
                disabled={!input.trim() || isProcessing}
                sx={{
                  bgcolor: colors.lightBlue,
                  color: 'white',
                  '&:hover': { bgcolor: colors.blue },
                  '&.Mui-disabled': { bgcolor: alpha(colors.lightBlue, 0.3) },
                }}
              >
                <Send />
              </IconButton>
              <IconButton
                onClick={() => handleQuery(input)}
                disabled={!input.trim() || isProcessing}
                sx={{
                  bgcolor: colors.green,
                  color: 'white',
                  '&:hover': { bgcolor: colors.green },
                  '&.Mui-disabled': { bgcolor: alpha(colors.green, 0.3) },
                }}
              >
                <Mic />
              </IconButton>
            </Box>
          </form>

          {/* Suggested Queries */}
          {suggestedQueries.length > 0 && !isProcessing && !showResult && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Try asking:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {suggestedQueries.map((query, idx) => (
                  <Chip
                    key={idx}
                    label={query}
                    onClick={() => handleQuery(query)}
                    sx={{
                      bgcolor: alpha(colors.lightBlue, 0.1),
                      '&:hover': {
                        bgcolor: alpha(colors.lightBlue, 0.2),
                        cursor: 'pointer',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Processing State */}
      <Collapse in={isProcessing}>
        <Card
          sx={{
            bgcolor: alpha(colors.lightBlue, 0.05),
            border: `1px solid ${alpha(colors.lightBlue, 0.15)}`,
            borderLeft: `4px solid ${colors.lightBlue}`,
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={24} sx={{ color: colors.lightBlue }} />
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  Agent is analyzing...
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Surfacing relevant context and insights
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Collapse>

      {/* Response Section */}
      <Fade in={showResult}>
        <Box>
          {currentResponse && (
            <Card
              sx={{
                bgcolor: '#FFFFFF',
                border: `1px solid ${alpha(colors.green, 0.15)}`,
                borderLeft: `4px solid ${colors.green}`,
                mb: 3,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <CheckCircle sx={{ color: colors.green, fontSize: 28, mt: 0.5 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                      Agent Response
                    </Typography>
                    {currentResponse}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default AgentInteraction;
