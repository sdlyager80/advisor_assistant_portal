import React, { useState, useEffect, useRef } from 'react';
import useSpeech from '../hooks/useSpeech';
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
  ToggleButton,
  alpha
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

const CalendarScreen = () => {
  const { speak, getRandomResponse } = useSpeech();

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Appointments with dates
  const [appointments, setAppointments] = useState([
    { id: 1, date: new Date().toDateString(), time: '2:00 PM', title: 'Policy Review - Sarah Johnson', type: 'in-person', duration: '30 min', client: 'Sarah Johnson', status: 'confirmed' },
    { id: 2, date: new Date().toDateString(), time: '2:30 PM', title: 'Policy Review - Sam Wright', type: 'in-person', duration: '45 min', client: 'Sam Wright', status: 'confirmed' },
    { id: 3, date: new Date().toDateString(), time: '3:30 PM', title: 'New Client Meeting - David Lee', type: 'video', duration: '45 min', client: 'David Lee', status: 'confirmed' },
    { id: 4, date: new Date().toDateString(), time: '4:30 PM', title: 'Claims Discussion - Robert Martinez', type: 'in-person', duration: '30 min', client: 'Robert Martinez', status: 'pending' },
    { id: 5, date: new Date(Date.now() + 86400000).toDateString(), time: '10:00 AM', title: 'Insurance Review - Emma Wilson', type: 'video', duration: '30 min', client: 'Emma Wilson', status: 'confirmed' },
    { id: 6, date: new Date(Date.now() + 86400000).toDateString(), time: '2:30 PM', title: 'Claim Processing - Tom Anderson', type: 'in-person', duration: '45 min', client: 'Tom Anderson', status: 'pending' },
    { id: 7, date: new Date(Date.now() + 172800000).toDateString(), time: '11:00 AM', title: 'New Policy Discussion - Lisa Chen', type: 'video', duration: '60 min', client: 'Lisa Chen', status: 'confirmed' },
  ]);

  // Filter appointments by selected date
  const filteredAppointments = appointments.filter(
    apt => apt.date === selectedDate.toDateString()
  );

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

    // Voice confirmation - conversational responses
    const meetingType = appointmentType === 'video' ? 'video call' : 'in-person meeting';
    const formattedTime = new Date(`2000-01-01T${appointmentTime}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const responses = [
      `Perfect! I've scheduled your ${meetingType} for ${formattedTime}. I'll send you a reminder 15 minutes before`,
      `All set! Your ${appointmentDuration} minute ${meetingType} is booked for ${formattedTime}`,
      `Great! I've added that to your calendar at ${formattedTime}. It's a ${meetingType}`,
      `Done! Your appointment is confirmed for ${formattedTime}. Looking forward to it!`
    ];
    speak(getRandomResponse(responses));
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
    <Container maxWidth="lg" sx={{ pb: 10, pt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Roboto Slab, serif',
            fontWeight: 700,
            color: colors.blue
          }}
        >
          Appointments
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={handleVoiceClick}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 16px ${alpha(colors.green, 0.4)}`
              }
            }}
          >
            <Mic />
          </IconButton>
          <IconButton
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.blue} 100%)`,
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 16px ${alpha(colors.lightBlue, 0.4)}`
              }
            }}
          >
            <Add />
          </IconButton>
        </Box>
      </Box>

      {/* Date Picker Card */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          border: `2px solid ${alpha(colors.lightBlue, 0.3)}`,
          background: '#FFFFFF',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Event sx={{ color: colors.lightBlue, fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700}>
              Select Date
            </Typography>
          </Box>
          <TextField
            type="date"
            fullWidth
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value + 'T00:00:00'))}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: colors.blue,
                '&:hover fieldset': {
                  borderColor: colors.lightBlue,
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.blue,
                  borderWidth: 2,
                },
              },
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`${filteredAppointments.length} appointment${filteredAppointments.length !== 1 ? 's' : ''}`}
              sx={{
                bgcolor: alpha(colors.green, 0.15),
                color: colors.green,
                fontWeight: 600,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Appointments List */}
      {filteredAppointments.length > 0 ? (
        filteredAppointments.map(apt => (
        <Card
          elevation={0}
          key={apt.id}
          sx={{
            mb: 2.5,
            borderRadius: 3,
            border: `1px solid ${alpha(colors.blue, 0.1)}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 4px 12px ${alpha(colors.lightBlue, 0.15)}`
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'start' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2.5,
                  bgcolor: apt.type === 'video'
                    ? alpha(colors.lightBlue, 0.15)
                    : alpha(colors.green, 0.15)
                }}
              >
                {apt.type === 'video' ? (
                  <VideoCall sx={{ fontSize: 32, color: colors.lightBlue }} />
                ) : (
                  <Person sx={{ fontSize: 32, color: colors.green }} />
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{
                    color: colors.blue,
                    mb: 1,
                    fontFamily: 'Roboto Slab, serif'
                  }}
                >
                  {apt.time}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500 }}>
                  {apt.title}
                </Typography>
                <Chip
                  label={apt.duration}
                  size="medium"
                  icon={<Event sx={{ color: `${colors.orange} !important` }} />}
                  sx={{
                    fontWeight: 600,
                    bgcolor: alpha(colors.orange, 0.15),
                    color: colors.orange,
                    border: 'none'
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))
      ) : (
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `2px dashed ${alpha(colors.lightBlue, 0.3)}`,
            background: alpha(colors.paleAqua, 0.3),
          }}
        >
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Event sx={{ fontSize: 64, color: alpha(colors.lightBlue, 0.4), mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No appointments scheduled
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You don't have any appointments on this date.
            </Typography>
          </CardContent>
        </Card>
      )}

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
