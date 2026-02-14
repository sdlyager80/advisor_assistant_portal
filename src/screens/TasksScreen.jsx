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
  CircularProgress
} from '@mui/material';
import { Add, CheckCircle, Schedule, Flag, Mic, MicOff, Close } from '@mui/icons-material';

const TasksScreen = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Follow up with John Smith', priority: 'high', status: 'pending', dueDate: 'Today' },
    { id: 2, title: 'Prepare quote for Sarah Johnson', priority: 'medium', status: 'in_progress', dueDate: 'Tomorrow' },
    { id: 3, title: 'Review policy documents', priority: 'low', status: 'pending', dueDate: 'This week' },
  ]);

  const [openVoiceDialog, setOpenVoiceDialog] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskDueDate, setTaskDueDate] = useState('Today');
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
        setTaskTitle(transcript);
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
    setTaskTitle('');
    setTaskPriority('medium');
    setTaskDueDate('Today');
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

  const handleSaveTask = () => {
    if (!taskTitle.trim()) {
      setError('Please provide a task description');
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      title: taskTitle.trim(),
      priority: taskPriority,
      status: 'pending',
      dueDate: taskDueDate
    };

    setTasks([newTask, ...tasks]);
    setOpenVoiceDialog(false);
    setTaskTitle('');
    setVoiceText('');
  };

  const handleCloseDialog = () => {
    if (isListening) {
      stopListening();
    }
    setOpenVoiceDialog(false);
    setTaskTitle('');
    setVoiceText('');
    setError('');
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  return (
    <Container maxWidth="md" sx={{ pb: 10, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">My Tasks</Typography>
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

      {tasks.map(task => (
        <Card
          key={task.id}
          sx={{
            mb: 2,
            opacity: task.status === 'completed' ? 0.6 : 1
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'start' }}>
              <IconButton
                size="small"
                sx={{ mt: -0.5 }}
                onClick={() => toggleTaskComplete(task.id)}
              >
                <CheckCircle
                  color={task.status === 'completed' ? 'success' : 'disabled'}
                />
              </IconButton>
              <Box sx={{ flex: 1, ml: 1 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  sx={{
                    textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                  }}
                >
                  {task.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Chip
                    label={task.priority}
                    size="small"
                    color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default'}
                  />
                  <Chip label={task.dueDate} size="small" icon={<Schedule />} />
                </Box>
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
            <Typography variant="h6">Create Task with Voice</Typography>
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
                  Speak clearly
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

          {/* Task Details Form */}
          <TextField
            label="Task Description"
            fullWidth
            multiline
            rows={3}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="E.g., Follow up with John Smith about policy renewal"
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={taskPriority}
                label="Priority"
                onChange={(e) => setTaskPriority(e.target.value)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Due Date</InputLabel>
              <Select
                value={taskDueDate}
                label="Due Date"
                onChange={(e) => setTaskDueDate(e.target.value)}
              >
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="Tomorrow">Tomorrow</MenuItem>
                <MenuItem value="This week">This week</MenuItem>
                <MenuItem value="Next week">Next week</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSaveTask}
            variant="contained"
            disabled={!taskTitle.trim()}
          >
            Create Task
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TasksScreen;
