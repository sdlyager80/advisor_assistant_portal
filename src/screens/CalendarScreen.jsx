import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import {
  Event,
  VideoCall,
  Person,
  Add,
  Mic,
  MicOff,
  Close
} from '@mui/icons-material';

const CalendarScreen = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, time: '2:30 PM', title: 'Client Meeting - John Smith', type: 'in-person', duration: '30 min' },
    { id: 2, time: '4:00 PM', title: 'Policy Review - Sarah Johnson', type: 'video', duration: '45 min' },
  ]);

  const [openVoiceDialog, setOpenVoiceDialog] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [appointmentTitle, setAppointmentTitle] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('in-person');
  const [appointmentDuration, setAppointmentDuration] = useState('30');
  const [error, setError] = useState('');

  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceText(transcript);
        setAppointmentTitle(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Voice recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleVoiceClick = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    setOpenVoiceDialog(true);
    setVoiceText('');
    setAppointmentTitle('');
    setAppointmentTime('');
    setAppointmentType('in-person');
    setAppointmentDuration('30');
    setError('');
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setError('');
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setError('Could not start voice recognition. Please try again.');
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSaveAppointment = () => {
    if (!appointmentTitle.trim() || !appointmentTime.trim()) {
      setError('Please provide appointment details and time');
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      time: appointmentTime,
      title: appointmentTitle.trim(),
      type: appointmentType,
      duration: `${appointmentDuration} min`
    };

    setAppointments([newAppointment, ...appointments]);
    setOpenVoiceDialog(false);
    setAppointmentTitle('');
    setAppointmentTime('');
    setVoiceText('');
  };

  const handleCloseDialog = () => {
    if (isListening) {
      stopListening();
    }
    setOpenVoiceDialog(false);
    setAppointmentTitle('');
    setAppointmentTime('');
    setVoiceText('');
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ pb: 10, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">Today's Appointments</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            color="secondary"
            onClick={handleVoiceClick}
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              '&:hover': { bgcolor: 'secondary.dark' }
            }}
          >
            <Mic />
          </IconButton>
          <IconButton
            color="primary"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            <Add />
          </IconButton>
        </Box>
      </Box>

      {appointments.map(apt => (
        <Card key={apt.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'start' }}>
              {apt.type === 'video' ? <VideoCall color="primary" sx={{ mr: 2 }} /> : <Person color="primary" sx={{ mr: 2 }} />}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="600">{apt.time}</Typography>
                <Typography variant="body2">{apt.title}</Typography>
                <Chip label={apt.duration} size="small" sx={{ mt: 1 }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Voice Input Dialog */}
      <Dialog
        open={openVoiceDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Schedule Appointment with Voice</Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Voice Recording Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 3,
              mb: 3,
              bgcolor: isListening ? '#e0f2f1' : '#f5f5f5',
              borderRadius: 2,
              transition: 'background-color 0.3s'
            }}
          >
            <IconButton
              onClick={isListening ? stopListening : startListening}
              sx={{
                width: 80,
                height: 80,
                bgcolor: isListening ? 'secondary.main' : 'primary.main',
                color: 'white',
                mb: 2,
                '&:hover': {
                  bgcolor: isListening ? 'secondary.dark' : 'primary.dark',
                },
                animation: isListening ? 'pulse 1.5s ease-in-out infinite' : 'none',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                    boxShadow: '0 0 0 0 rgba(0, 137, 123, 0.7)'
                  },
                  '50%': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 0 10px rgba(0, 137, 123, 0)'
                  },
                  '100%': {
                    transform: 'scale(1)',
                    boxShadow: '0 0 0 0 rgba(0, 137, 123, 0)'
                  }
                }
              }}
            >
              {isListening ? <MicOff sx={{ fontSize: 40 }} /> : <Mic sx={{ fontSize: 40 }} />}
            </IconButton>

            <Typography variant="body1" fontWeight="600" gutterBottom>
              {isListening ? 'Listening...' : 'Tap microphone to speak'}
            </Typography>

            {isListening && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="secondary" />
                <Typography variant="caption" color="text.secondary">
                  Say: "Meeting with [Customer Name] about [Topic]"
                </Typography>
              </Box>
            )}

            {voiceText && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'white', borderRadius: 1, width: '100%' }}>
                <Typography variant="caption" color="text.secondary">
                  Captured:
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  "{voiceText}"
                </Typography>
              </Box>
            )}
          </Box>

          {/* Appointment Details Form */}
          <TextField
            label="Appointment Description"
            fullWidth
            multiline
            rows={2}
            value={appointmentTitle}
            onChange={(e) => setAppointmentTitle(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="E.g., Policy Review - John Smith"
          />

          <TextField
            label="Time"
            fullWidth
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Meeting Type
            </Typography>
            <ToggleButtonGroup
              value={appointmentType}
              exclusive
              onChange={(e, newType) => newType && setAppointmentType(newType)}
              fullWidth
            >
              <ToggleButton value="in-person">
                <Person sx={{ mr: 1 }} />
                In Person
              </ToggleButton>
              <ToggleButton value="video">
                <VideoCall sx={{ mr: 1 }} />
                Video Call
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <FormControl fullWidth>
            <InputLabel>Duration</InputLabel>
            <Select
              value={appointmentDuration}
              label="Duration"
              onChange={(e) => setAppointmentDuration(e.target.value)}
            >
              <MenuItem value="15">15 minutes</MenuItem>
              <MenuItem value="30">30 minutes</MenuItem>
              <MenuItem value="45">45 minutes</MenuItem>
              <MenuItem value="60">1 hour</MenuItem>
              <MenuItem value="90">1.5 hours</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSaveAppointment}
            variant="contained"
            disabled={!appointmentTitle.trim() || !appointmentTime.trim()}
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CalendarScreen;
