import React, { useState, useEffect, useRef } from 'react';
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
  ListItemText
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

const CustomersScreen = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Smith', status: 'Active', policies: 3, lastContact: '2 days ago', notes: [] },
    { id: 2, name: 'Sarah Johnson', status: 'Prospect', policies: 0, lastContact: '1 week ago', notes: [] },
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
    <Container maxWidth="md" sx={{ pb: 10, pt: 2 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Customers</Typography>

      {customers.map(customer => (
        <Card key={customer.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                {customer.name.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="600">{customer.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {customer.policies} policies • Last contact: {customer.lastContact}
                </Typography>
              </Box>
              <Chip label={customer.status} size="small" color={customer.status === 'Active' ? 'success' : 'warning'} />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <IconButton size="small" color="primary"><Phone /></IconButton>
              <IconButton size="small" color="primary"><Message /></IconButton>
              <IconButton size="small" color="primary"><Event /></IconButton>
              <IconButton
                size="small"
                color="secondary"
                onClick={() => handleAddNote(customer)}
                sx={{ ml: 'auto' }}
              >
                <NoteAdd />
              </IconButton>
            </Box>

            {/* Show recent notes if any */}
            {customer.notes && customer.notes.length > 0 && (
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StickyNote2 sx={{ fontSize: 14, mr: 0.5 }} />
                  Recent Notes ({customer.notes.length})
                </Typography>
                <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 1, p: 1 }}>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    {customer.notes[0].text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
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
  );
};

export default CustomersScreen;
