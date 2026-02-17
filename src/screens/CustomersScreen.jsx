import React, { useState, useEffect, useRef } from 'react';
import useSpeech from '../hooks/useSpeech';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Chip,
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
  Divider,
  List,
  ListItem,
  ListItemText,
  alpha
} from '@mui/material';
import {
  Phone,
  Message,
  Event,
  Mic,
  MicOff,
  Close,
  NoteAdd,
  StickyNote2
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

const CustomersScreen = () => {
  const { speak, getRandomResponse } = useSpeech();

  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Smith', status: 'Active', policies: 3, lastContact: '2 days ago', notes: [] },
    { id: 3, name: 'Michael Chen', status: 'Active', policies: 2, lastContact: 'Today', notes: [] },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openVoiceDialog, setOpenVoiceDialog] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [noteCategory, setNoteCategory] = useState('general');
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
        setNoteText(transcript);
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

  const handleAddNote = (customer) => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    setSelectedCustomer(customer);
    setOpenVoiceDialog(true);
    setVoiceText('');
    setNoteText('');
    setNoteCategory('general');
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

  const handleSaveNote = () => {
    if (!noteText.trim()) {
      setError('Please provide a note');
      return;
    }

    const newNote = {
      id: Date.now(),
      text: noteText.trim(),
      category: noteCategory,
      timestamp: new Date().toLocaleString()
    };

    setCustomers(customers.map(customer =>
      customer.id === selectedCustomer.id
        ? { ...customer, notes: [newNote, ...(customer.notes || [])], lastContact: 'Today' }
        : customer
    ));

    setOpenVoiceDialog(false);
    setNoteText('');
    setVoiceText('');

    // Voice confirmation - conversational responses
    const categoryText = noteCategory === 'follow-up' ? 'and marked for follow-up' : '';
    const totalNotes = (selectedCustomer.notes || []).length + 1;

    const responses = [
      `Perfect! I've saved that note for ${selectedCustomer.name} ${categoryText}`,
      `Got it! Note added to ${selectedCustomer.name}'s profile. That's ${totalNotes} notes total`,
      `All set! I've logged that interaction with ${selectedCustomer.name}`,
      `Done! Your note for ${selectedCustomer.name} has been saved ${categoryText}`,
      `Excellent! I've updated ${selectedCustomer.name}'s record with that information`
    ];
    speak(getRandomResponse(responses));

    setSelectedCustomer(null);
  };

  const handleCloseDialog = () => {
    if (isListening) {
      stopListening();
    }
    setOpenVoiceDialog(false);
    setNoteText('');
    setVoiceText('');
    setError('');
    setSelectedCustomer(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', py: 3 }}>
      <Container maxWidth="lg" sx={{ pb: 10, pt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Roboto Slab, serif',
          fontWeight: 700,
          color: colors.blue,
          mb: 3
        }}
      >
        Customers
      </Typography>

      {customers.map(customer => (
        <Card
          elevation={0}
          key={customer.id}
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <Avatar
                sx={{
                  mr: 2.5,
                  width: 56,
                  height: 56,
                  bgcolor: colors.lightBlue,
                  fontSize: '1.5rem',
                  fontWeight: 600
                }}
              >
                {customer.name.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 0.5 }}>
                  {customer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {customer.policies} {customer.policies === 1 ? 'policy' : 'policies'} • Last contact: {customer.lastContact}
                </Typography>
              </Box>
              <Chip
                label={customer.status}
                size="medium"
                sx={{
                  fontWeight: 600,
                  bgcolor: customer.status === 'Active'
                    ? alpha(colors.green, 0.15)
                    : alpha(colors.orange, 0.15),
                  color: customer.status === 'Active' ? colors.green : colors.orange,
                  border: 'none'
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, mt: 2.5 }}>
              <IconButton
                size="medium"
                sx={{
                  bgcolor: alpha(colors.lightBlue, 0.1),
                  color: colors.lightBlue,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(colors.lightBlue, 0.2)
                  }
                }}
              >
                <Phone />
              </IconButton>
              <IconButton
                size="medium"
                sx={{
                  bgcolor: alpha(colors.green, 0.1),
                  color: colors.green,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(colors.green, 0.2)
                  }
                }}
              >
                <Message />
              </IconButton>
              <IconButton
                size="medium"
                sx={{
                  bgcolor: alpha(colors.orange, 0.1),
                  color: colors.orange,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(colors.orange, 0.2)
                  }
                }}
              >
                <Event />
              </IconButton>
              <IconButton
                size="medium"
                onClick={() => handleAddNote(customer)}
                sx={{
                  ml: 'auto',
                  bgcolor: alpha(colors.blue, 0.1),
                  color: colors.blue,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(colors.blue, 0.2)
                  }
                }}
              >
                <NoteAdd />
              </IconButton>
            </Box>

            {/* Show recent notes if any */}
            {customer.notes && customer.notes.length > 0 && (
              <Box
                sx={{
                  mt: 2.5,
                  pt: 2.5,
                  borderTop: `1px solid ${alpha(colors.blue, 0.1)}`
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
                >
                  <StickyNote2 sx={{ fontSize: 16, mr: 0.5, color: colors.orange }} />
                  Recent Notes ({customer.notes.length})
                </Typography>
                <Box
                  sx={{
                    bgcolor: alpha(colors.paleAqua, 0.5),
                    borderRadius: 2,
                    p: 2,
                    border: `1px solid ${alpha(colors.blue, 0.08)}`
                  }}
                >
                  <Typography variant="body2" sx={{ display: 'block', mb: 1 }}>
                    {customer.notes[0].text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {customer.notes[0].timestamp}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Voice Note Dialog */}
      <Dialog
        open={openVoiceDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">Add Note with Voice</Typography>
              {selectedCustomer && (
                <Typography variant="caption" color="text.secondary">
                  For: {selectedCustomer.name}
                </Typography>
              )}
            </Box>
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
                  Describe the interaction or note
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

          {/* Note Details Form */}
          <TextField
            label="Note"
            fullWidth
            multiline
            rows={4}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="E.g., Discussed life insurance options, interested in $500K term policy"
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={noteCategory}
              label="Category"
              onChange={(e) => setNoteCategory(e.target.value)}
            >
              <MenuItem value="general">General Note</MenuItem>
              <MenuItem value="call">Phone Call</MenuItem>
              <MenuItem value="meeting">Meeting</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="follow-up">Follow-up Required</MenuItem>
              <MenuItem value="quote">Quote Provided</MenuItem>
              <MenuItem value="policy">Policy Discussion</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSaveNote}
            variant="contained"
            disabled={!noteText.trim()}
          >
            Save Note
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </Box>
  );
};

export default CustomersScreen;
