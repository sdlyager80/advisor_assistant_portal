import { useRef, useEffect, useState } from 'react';
import useSpeech from './useSpeech';

/**
 * Voice command processor for conversational interface with enterprise modules
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

        // Handle different error types
        if (event.error === 'network') {
          console.warn('Network error - speech recognition service unavailable');
          // Don't speak error message for network errors to avoid confusion
        } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          console.warn('Microphone access denied');
          speak("Please enable microphone access to use voice commands");
        } else if (event.error === 'no-speech') {
          console.log('No speech detected');
          // Silent - user may have just stopped talking
        } else if (event.error === 'aborted') {
          console.log('Recognition aborted');
          // Silent - likely intentional
        } else {
          speak("Sorry, I didn't catch that. Could you try again?");
        }
      };

      recognitionRef.current.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
      };
    } else {
      console.warn('Speech Recognition API not available in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore if already stopped
        }
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
        // Add a small delay to prevent rapid restarts
        setTimeout(() => {
          if (recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (err) {
              // If already started, ignore
              if (err.message && !err.message.includes('already started')) {
                console.error('Error starting voice recognition:', err);
                setIsListening(false);
              }
            }
          }
        }, 100);
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

    // Visual feedback - log what was heard
    const commandText = document.createElement('div');
    commandText.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#00ADEE;color:white;padding:12px 24px;border-radius:8px;z-index:9999;font-weight:600;box-shadow:0 4px 12px rgba(0,173,238,0.4)';
    commandText.textContent = `🎤 "${command}"`;
    document.body.appendChild(commandText);
    setTimeout(() => commandText.remove(), 3000);

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

    // Illustration commands - detect policy illustration requests
    if (command.includes('illustration') || command.includes('run illustration') ||
        command.includes('policy projection') || command.includes('show illustration') ||
        (command.includes('withdrawal') && (command.includes('age') || command.includes('monthly')))) {
      console.log('📊 Illustration request detected:', command);

      // Extract customer name from command
      let customerName = 'Sam Wright'; // Default

      // Patterns to extract name: "run illustration for [name]"
      const namePatterns = [
        /(?:run\s+)?illustration\s+for\s+([a-z\s]+?)(?:\s+at\s+age|\s+with|\s*$)/i,
        /(?:show\s+)?illustration\s+for\s+([a-z\s]+?)(?:\s+at\s+age|\s+with|\s*$)/i,
        /(?:policy\s+)?projection\s+for\s+([a-z\s]+?)(?:\s+at\s+age|\s+with|\s*$)/i,
      ];

      for (const pattern of namePatterns) {
        const match = command.match(pattern);
        if (match && match[1]) {
          customerName = match[1].trim();
          // Capitalize first letter of each word
          customerName = customerName.split(' ')
            .filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          console.log('✅ Extracted customer name:', customerName);
          break;
        }
      }

      // Extract parameters from command
      const ageMatch = command.match(/age (\d+)/i);

      // Extract withdrawal amount - look for dollar amount after "with", "withdrawals", etc.
      const withdrawalPatterns = [
        /with\s+\$?(\d+(?:,\d{3})*)\s*(?:monthly|withdrawals?|per month)?/i,
        /\$(\d+(?:,\d{3})*)\s+(?:monthly|withdrawals?|per month)/i,
        /withdrawals?\s+(?:of\s+)?\$?(\d+(?:,\d{3})*)/i,
      ];

      let withdrawalAmount = 2000; // Default
      for (const pattern of withdrawalPatterns) {
        const match = command.match(pattern);
        if (match && match[1]) {
          withdrawalAmount = parseInt(match[1].replace(/,/g, ''));
          console.log('✅ Extracted withdrawal amount:', withdrawalAmount);
          break;
        }
      }

      const params = {
        customerName: customerName,
        age: ageMatch ? parseInt(ageMatch[1]) : 65,
        monthlyWithdrawal: withdrawalAmount,
      };

      console.log('✅ ILLUSTRATION TRIGGERED with params:', params);
      onCommand({ type: 'SHOW_ILLUSTRATION', params });
      speak(`Generating policy illustration for ${customerName} at age ${params.age} with $${params.monthlyWithdrawal.toLocaleString()} monthly withdrawals. Analyzing projections and insights.`);
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

    // Module navigation commands - more flexible matching
    if (command.includes('income') || command.includes('illustration') || command.includes('planning')) {
      onCommand({ type: 'OPEN_MODULE', module: 'illustration' });
      speak("Opening income planning module");
      return;
    }

    if (command.includes('life') || command.includes('stage') || command.includes('milestone') || command.includes('retention')) {
      onCommand({ type: 'OPEN_MODULE', module: 'lifestage' });
      speak("Opening life-stage intelligence");
      return;
    }

    if (command.includes('meeting') || command.includes('prep') || command.includes('preparation')) {
      onCommand({ type: 'OPEN_MODULE', module: 'meetingprep' });
      speak("Opening meeting preparation");
      return;
    }

    if (command.includes('compliance') || command.includes('automation') || command.includes('document')) {
      onCommand({ type: 'OPEN_MODULE', module: 'automation' });
      speak("Opening compliance and automation");
      return;
    }

    if (command.includes('predictive') || command.includes('analytic') || command.includes('insight') || command.includes('risk')) {
      onCommand({ type: 'OPEN_MODULE', module: 'predictive' });
      speak("Opening predictive insights");
      return;
    }

    if (command.includes('enterprise') || command.includes('business') || command.includes('portfolio')) {
      onCommand({ type: 'OPEN_MODULE', module: 'enterprise' });
      speak("Opening enterprise intelligence");
      return;
    }

    // Help command
    if (command.includes('help') || command.includes('what can you do')) {
      const helpMessage = "I can help you create tasks, schedule appointments, add customer notes, run policy illustrations, read your tasks and appointments, provide daily summaries, show you intelligent customer engagement demos, open enterprise modules like income planning, life-stage intelligence, meeting prep, and more. Try saying 'run an illustration for age 65 with two thousand dollar withdrawals' or 'send birthday wishes to Sam Wright' to see it in action!";
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
      "I'm not sure what you mean. You can ask me to create tasks, schedule appointments, view customers, open modules, or read your tasks",
      "Sorry, I didn't understand that. Try saying 'create task', 'open income planning', or 'prepare meeting'",
      "I'm still learning! You can ask me to create tasks, schedule meetings, open enterprise modules, or check your calendar"
    ];
    speak(getRandomResponse(clarifications));
    setTimeout(() => {
      speak("What would you like to do?");
      setTimeout(startListening, 1500);
    }, 6000);
  };

  // Expose processCommand to window for debugging (development only)
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      window.testVoiceCommand = (command) => {
        console.log('Testing voice command:', command);
        processCommand(command);
      };
      console.log('Voice command debug helper available: window.testVoiceCommand("your command")');
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete window.testVoiceCommand;
      }
    };
  }, []);

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
