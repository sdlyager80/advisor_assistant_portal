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
  alpha
} from '@mui/material';
import { Add, CheckBox, CheckBoxOutlineBlank, Schedule, Flag, Mic, MicOff, Close } from '@mui/icons-material';

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

const TasksScreen = () => {
  const { speak, getRandomResponse } = useSpeech();

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Follow up with John Smith', priority: 'high', dueDate: 'Today, 2:00 PM', status: 'pending' },
    { id: 2, title: 'Prepare quote for Sarah Johnson', priority: 'high', dueDate: 'Today, 3:30 PM', status: 'pending' },
    { id: 3, title: 'Review policy documents for Michael Chen', priority: 'medium', dueDate: 'Today, 4:00 PM', status: 'pending' },
    { id: 4, title: 'Send birthday wishes', priority: 'medium', dueDate: 'Today, 5:00 PM', status: 'pending' },
    { id: 5, title: 'Update CRM records', priority: 'low', dueDate: 'Today, End of day', status: 'in_progress' },
    { id: 6, title: 'Call Emma Wilson - policy renewal', priority: 'high', dueDate: 'Today, 6:00 PM', status: 'pending' },
    { id: 7, title: 'Process insurance claim for Robert Taylor', priority: 'high', dueDate: 'Today, 7:00 PM', status: 'pending' },
    { id: 8, title: 'Send policy renewal reminder to clients', priority: 'medium', dueDate: 'Today, 8:00 PM', status: 'pending' },
    { id: 9, title: 'Review new applications', priority: 'low', dueDate: 'Today, End of day', status: 'pending' },
    { id: 10, title: 'Update pipeline in CRM', priority: 'low', dueDate: 'Today, End of day', status: 'pending' },
    { id: 11, title: 'Prepare presentation for team meeting', priority: 'medium', dueDate: 'Today, End of day', status: 'pending' },
    { id: 12, title: 'Review compliance documents', priority: 'low', dueDate: 'Today, End of day', status: 'pending' },
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

    // Voice confirmation - conversational responses
    const responses = [
      `Got it! I've added "${newTask.title}" to your task list`,
      `Perfect! I've created that task for you. It's marked as ${newTask.priority} priority`,
      `All set! "${newTask.title}" has been added to your tasks`,
      `Done! I've added that to your list and set it for ${newTask.dueDate}`,
      `You got it! Task created and ready to go`
    ];
    speak(getRandomResponse(responses));
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
    const task = tasks.find(t => t.id === taskId);
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    setTasks(tasks.map(t =>
      t.id === taskId
        ? { ...t, status: newStatus }
        : t
    ));

    // Voice confirmation - conversational responses
    if (newStatus === 'completed') {
      const remainingTasks = tasks.filter(t => t.status !== 'completed').length - 1;
      const completionResponses = [
        `Excellent work! Task completed. ${remainingTasks > 0 ? `You have ${remainingTasks} more to go` : "That's everything on your list!"}`,
        `Great job! Checked that one off for you. Keep up the momentum!`,
        `Nice! One more task done. You're making great progress today!`,
        `Perfect! I've marked that as complete. You're on fire!`,
        `Well done! Task completed successfully. ${remainingTasks > 0 ? `Just ${remainingTasks} more to go` : "You've completed all your tasks!"}`
      ];
      speak(getRandomResponse(completionResponses));
    } else {
      const reopenResponses = [
        `Okay, I've reopened that task for you`,
        `No problem, marked that as incomplete`,
        `Got it, that task is back on your list`
      ];
      speak(getRandomResponse(reopenResponses));
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', py: 3 }}>
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
          My Tasks
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={handleVoiceClick}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: alpha(colors.green, 0.1),
              color: colors.green,
              border: `2px solid ${colors.green}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                bgcolor: alpha(colors.green, 0.15),
                boxShadow: `0 6px 16px ${alpha(colors.green, 0.25)}`
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
              bgcolor: alpha(colors.blue, 0.1),
              color: colors.blue,
              border: `2px solid ${colors.blue}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                bgcolor: alpha(colors.blue, 0.15),
                boxShadow: `0 6px 16px ${alpha(colors.blue, 0.25)}`
              }
            }}
          >
            <Add />
          </IconButton>
        </Box>
      </Box>

      {tasks.map(task => (
        <Card
          elevation={0}
          key={task.id}
          sx={{
            mb: 2,
            borderRadius: 3,
            border: `1px solid ${alpha(colors.blue, 0.1)}`,
            opacity: task.status === 'completed' ? 0.7 : 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 4px 12px ${alpha(colors.lightBlue, 0.15)}`
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'start' }}>
              <IconButton
                size="medium"
                sx={{
                  mt: -0.5,
                  mr: 1.5,
                  p: 0.5,
                  color: task.status === 'completed' ? colors.green : colors.lightBlue,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: task.status === 'completed'
                      ? alpha(colors.green, 0.1)
                      : alpha(colors.lightBlue, 0.1),
                    transform: 'scale(1.1)',
                  }
                }}
                onClick={() => toggleTaskComplete(task.id)}
              >
                {task.status === 'completed' ? (
                  <CheckBox sx={{ fontSize: 32 }} />
                ) : (
                  <CheckBoxOutlineBlank sx={{ fontSize: 32 }} />
                )}
              </IconButton>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  sx={{
                    fontSize: '1.125rem',
                    color: task.status === 'completed' ? 'text.secondary' : 'text.primary',
                    textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                    mb: 1.5
                  }}
                >
                  {task.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={task.priority.toUpperCase()}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      bgcolor: task.priority === 'high'
                        ? alpha(colors.red, 0.1)
                        : task.priority === 'medium'
                        ? alpha(colors.orange, 0.1)
                        : alpha(colors.lightGreen, 0.1),
                      color: '#000000',
                      border: `1px solid ${
                        task.priority === 'high'
                          ? alpha(colors.red, 0.3)
                          : task.priority === 'medium'
                          ? alpha(colors.orange, 0.3)
                          : alpha(colors.lightGreen, 0.3)
                      }`
                    }}
                  />
                  <Chip
                    label={task.dueDate}
                    size="small"
                    icon={<Schedule sx={{ color: `${colors.blue} !important` }} />}
                    sx={{
                      fontWeight: 600,
                      bgcolor: alpha(colors.lightBlue, 0.1),
                      color: '#000000',
                      border: `1px solid ${alpha(colors.lightBlue, 0.3)}`,
                      '& .MuiChip-icon': {
                        color: colors.blue,
                      },
                    }}
                  />
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
    </Box>
  );
};

export default TasksScreen;
