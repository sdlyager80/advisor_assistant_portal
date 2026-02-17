import { useRef, useEffect, useState } from 'react';
import useSpeech from './useSpeech';

/**
 * Voice command processor for conversational interface
 * Listens for commands after speaking and executes actions
 */
export const useVoiceCommands = (onCommand) => {
  const { speak, getRandomResponse } = useSpeech();
  const [isListening, setIsListening] = useState(false);
  const [conversationMode, setConversationMode] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition for commands
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log('🎯 Voice recognition result:', command);
        setIsListening(false);
        processCommand(command);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Voice command error:', event.error);
        setIsListening(false);
        if (event.error !== 'no-speech') {
          speak("Sorry, I didn't catch that. Could you try again?");
        }
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

  /**
   * Start listening for voice command
   */
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      console.log('🎤 Started listening for voice commands...');
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('❌ Error starting voice recognition:', error);
        setIsListening(false);
      }
    }
  };

  /**
   * Stop listening
   */
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  /**
   * Speak a message and then ask for a command
   */
  const speakAndListen = (message, delay = 1000) => {
    speak(message);
    console.log('💬 Speaking:', message);

    // After speaking, ask what the user needs
    setTimeout(() => {
      const followUps = [
        "What can I help you with?",
        "What would you like to do?",
        "How can I assist you?",
        "What do you need?",
        "What's next?"
      ];
      const followUp = getRandomResponse(followUps);
      speak(followUp);
      console.log('💬 Follow-up:', followUp);

      // Start listening after the follow-up question
      setTimeout(() => {
        console.log('⏰ Starting listening in 2 seconds...');
        startListening();
      }, 2000);
    }, delay);
  };

  /**
   * Process voice command and determine intent
   */
  const processCommand = (command) => {
    console.log('🎤 Processing voice command:', command);
    console.log('🔍 Checking for demo triggers...');

    // Task-related commands
    if (command.includes('create task') || command.includes('add task') || command.includes('new task')) {
      const taskDescription = command
        .replace('create task', '')
        .replace('add task', '')
        .replace('new task', '')
        .replace('to', '')
        .trim();

      if (taskDescription) {
        onCommand({ type: 'CREATE_TASK', data: taskDescription });
        speak(`Great! I'll create that task for you: ${taskDescription}`);
      } else {
        speak("Sure, what task would you like to create?");
        setTimeout(startListening, 1500);
      }
      return;
    }

    // Appointment-related commands
    if (command.includes('schedule') || command.includes('appointment') || command.includes('meeting')) {
      onCommand({ type: 'SCHEDULE_APPOINTMENT' });
      speak("Perfect! Let me open the appointment scheduler for you");
      return;
    }

    // Customer-related commands
    if (command.includes('customer') || command.includes('client') || command.includes('add note')) {
      onCommand({ type: 'VIEW_CUSTOMERS' });
      speak("Opening your customer list now");
      return;
    }

    // Read/view commands
    if (command.includes('read my tasks') || command.includes('what are my tasks') || command.includes('show tasks')) {
      onCommand({ type: 'READ_TASKS' });
      return;
    }

    if (command.includes('read appointments') || command.includes('what appointments') || command.includes('my calendar')) {
      onCommand({ type: 'READ_APPOINTMENTS' });
      return;
    }

    if (command.includes('daily summary') || command.includes('how am i doing') || command.includes('my progress')) {
      onCommand({ type: 'DAILY_SUMMARY' });
      return;
    }

    // Specific engagement command (triggers demo) - Check this FIRST for specific intent
    const hasBirthdayIntent = command.includes('send birthday') || command.includes('birthday wishes') || command.includes('birthday message');

    console.log('🎂 Birthday intent detected:', hasBirthdayIntent);

    if (hasBirthdayIntent) {
      // Extract customer name from the command
      let customerName = 'Sam Wright'; // Default fallback

      // Try to extract name after "to" keyword
      const patterns = [
        /(?:send birthday (?:wishes|message) to |birthday (?:wishes|message) to )(.+)/i,
        /(?:send (?:a )?birthday to )(.+)/i
      ];

      for (const pattern of patterns) {
        const match = command.match(pattern);
        if (match && match[1]) {
          customerName = match[1].trim();
          // Capitalize first letter of each word
          customerName = customerName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          break;
        }
      }

      console.log('👤 Extracted customer name:', customerName);
      console.log('✅ DEMO TRIGGERED: Birthday command for', customerName);

      onCommand({ type: 'SHOW_DEMO', customerName: customerName });
      speak(`Preparing birthday outreach for ${customerName}. Opening the customer engagement workflow.`);
      return;
    }

    // General demo commands
    if (command.includes('advanced engagement') || command.includes('intelligent engagement') ||
        command.includes('show demo') || command.includes('birthday demo') ||
        command.includes('customer engagement demo') || command.includes('show me how it works')) {
      console.log('✅ DEMO TRIGGERED: General demo command');
      onCommand({ type: 'SHOW_DEMO' });
      speak("Opening customer engagement workflow. Everything is prepared and ready for you.");
      return;
    }

    // Navigation commands
    if (command.includes('go home') || command.includes('home screen') || command.includes('dashboard')) {
      onCommand({ type: 'NAVIGATE', screen: 0 });
      speak("Taking you to the home screen");
      return;
    }

    if (command.includes('go to tasks') || command.includes('show tasks')) {
      onCommand({ type: 'NAVIGATE', screen: 1 });
      speak("Opening your tasks");
      return;
    }

    if (command.includes('go to calendar') || command.includes('show calendar')) {
      onCommand({ type: 'NAVIGATE', screen: 3 });
      speak("Opening your calendar");
      return;
    }

    // Help command
    if (command.includes('help') || command.includes('what can you do')) {
      const helpMessage = "I can help you create tasks, schedule appointments, add customer notes, read your tasks and appointments, provide daily summaries, show you intelligent customer engagement demos, and navigate the app. Try saying 'show demo' or 'send birthday wishes to Sam Wright' to see it in action!";
      speak(helpMessage);
      setTimeout(() => {
        speak("What would you like to do?");
        setTimeout(startListening, 1500);
      }, 10000);
      return;
    }

    // Simple test command for demo
    if (command.includes('test demo') || command.includes('demo test')) {
      console.log('✅ DEMO TRIGGERED: Test command');
      onCommand({ type: 'SHOW_DEMO' });
      speak("Opening customer outreach workflow.");
      return;
    }

    // Didn't understand
    const clarifications = [
      "I'm not sure what you mean. You can ask me to create tasks, schedule appointments, view customers, or read your tasks",
      "Sorry, I didn't understand that. Try saying 'create task', 'schedule appointment', or 'read my tasks'",
      "I'm still learning! You can ask me to create tasks, schedule meetings, add notes, or check your calendar"
    ];
    speak(getRandomResponse(clarifications));
    setTimeout(() => {
      speak("What would you like to do?");
      setTimeout(startListening, 1500);
    }, 5000);
  };

  return {
    isListening,
    conversationMode,
    setConversationMode,
    startListening,
    stopListening,
    speakAndListen,
    processCommand
  };
};

export default useVoiceCommands;
