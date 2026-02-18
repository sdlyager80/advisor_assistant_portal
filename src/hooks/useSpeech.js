import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for Text-to-Speech using Web Speech API
 * Provides voice output functionality similar to Siri/Alexa
 */
export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const synthRef = useRef(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      // Load available voices
      const loadVoices = () => {
        const availableVoices = synthRef.current.getVoices();
        setVoices(availableVoices);

        // Log available voices for debugging
        console.log('Available voices:', availableVoices.map(v => ({ name: v.name, lang: v.lang })));

        // Comprehensive English voice selection for all browsers and devices
        const preferredVoice =
          // === iOS (Safari/Chrome on iPhone/iPad) ===
          availableVoices.find(voice => voice.name === 'Samantha' && voice.lang.startsWith('en')) ||
          availableVoices.find(voice => voice.name === 'Karen' && voice.lang.startsWith('en')) ||
          availableVoices.find(voice => voice.name === 'Moira' && voice.lang.startsWith('en')) ||
          availableVoices.find(voice => voice.name === 'Tessa' && voice.lang.startsWith('en')) ||
          availableVoices.find(voice => voice.name === 'Fiona' && voice.lang.startsWith('en')) ||

          // === Android (Chrome/Samsung Internet) ===
          availableVoices.find(voice => voice.name === 'Google US English' && voice.lang.startsWith('en')) ||
          availableVoices.find(voice => voice.name === 'English United States' && voice.lang.startsWith('en')) ||
          availableVoices.find(voice => voice.name === 'en-US-language' && voice.lang.startsWith('en')) ||
          availableVoices.find(voice => voice.name === 'English (United States)' && voice.lang.startsWith('en')) ||

          // === macOS Safari ===
          availableVoices.find(voice => voice.name === 'Samantha' && voice.lang.startsWith('en')) ||
          availableVoices.find(voice => voice.name === 'Karen' && voice.lang.startsWith('en')) ||
          availableVoices.find(voice => voice.name === 'Moira' && voice.lang.startsWith('en')) ||
          availableVoices.find(voice => voice.name === 'Alex' && voice.lang.startsWith('en')) ||

          // === Windows Chrome/Edge ===
          availableVoices.find(voice => voice.name === 'Microsoft Zira Desktop - English (United States)') ||
          availableVoices.find(voice => voice.name === 'Microsoft Zira - English (United States)') ||
          availableVoices.find(voice => voice.name.includes('Zira') && voice.lang.startsWith('en')) ||
          availableVoices.find(voice => voice.name === 'Microsoft Susan Desktop - English (Great Britain)') ||
          availableVoices.find(voice => voice.name === 'Microsoft Hazel Desktop - English (Great Britain)') ||

          // === Google Chrome (all platforms) ===
          availableVoices.find(voice => voice.name === 'Google US English Female') ||
          availableVoices.find(voice => voice.name === 'Google UK English Female') ||
          availableVoices.find(voice => voice.name === 'Google US English') ||
          availableVoices.find(voice => voice.name === 'Google UK English') ||

          // === Generic patterns for any browser ===
          // Female English voices
          availableVoices.find(voice =>
            voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')
          ) ||
          availableVoices.find(voice =>
            voice.lang.startsWith('en-US') && !voice.name.toLowerCase().includes('male')
          ) ||
          availableVoices.find(voice =>
            voice.lang.startsWith('en-GB') && !voice.name.toLowerCase().includes('male')
          ) ||

          // Any English voice (US/UK/AU/CA)
          availableVoices.find(voice => voice.lang === 'en-US') ||
          availableVoices.find(voice => voice.lang === 'en-GB') ||
          availableVoices.find(voice => voice.lang === 'en-AU') ||
          availableVoices.find(voice => voice.lang === 'en-CA') ||
          availableVoices.find(voice => voice.lang.startsWith('en')) ||

          // Last resort: first available voice
          availableVoices[0];

        console.log('Selected voice:', preferredVoice?.name, preferredVoice?.lang);
        setSelectedVoice(preferredVoice);
      };

      loadVoices();

      // Chrome loads voices asynchronously
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  /**
   * Speak text with optional configuration
   * @param {string} text - The text to speak
   * @param {object} options - Optional speech parameters
   */
  const speak = (text, options = {}) => {
    if (!synthRef.current || !isEnabled) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Get fresh voices list and select English voice
    const currentVoices = synthRef.current.getVoices();

    // Comprehensive English voice selection for all platforms
    const englishVoice =
      // === iOS (Safari/Chrome on iPhone/iPad) ===
      currentVoices.find(v => v.name === 'Samantha' && v.lang.startsWith('en')) ||
      currentVoices.find(v => v.name === 'Karen' && v.lang.startsWith('en')) ||
      currentVoices.find(v => v.name === 'Moira' && v.lang.startsWith('en')) ||
      currentVoices.find(v => v.name === 'Tessa' && v.lang.startsWith('en')) ||

      // === Android ===
      currentVoices.find(v => v.name === 'Google US English' && v.lang.startsWith('en')) ||
      currentVoices.find(v => v.name === 'English United States' && v.lang.startsWith('en')) ||
      currentVoices.find(v => v.name === 'English (United States)' && v.lang.startsWith('en')) ||

      // === Windows ===
      currentVoices.find(v => v.name.includes('Zira') && v.lang.startsWith('en')) ||
      currentVoices.find(v => v.name.includes('Susan') && v.lang.startsWith('en')) ||
      currentVoices.find(v => v.name.includes('Hazel') && v.lang.startsWith('en')) ||

      // === Google Chrome ===
      currentVoices.find(v => v.name === 'Google US English Female') ||
      currentVoices.find(v => v.name === 'Google UK English Female') ||
      currentVoices.find(v => v.name === 'Google US English') ||

      // === Generic English voice ===
      currentVoices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
      currentVoices.find(v => v.lang === 'en-US') ||
      currentVoices.find(v => v.lang === 'en-GB') ||
      currentVoices.find(v => v.lang.startsWith('en')) ||

      // Fallback to selectedVoice
      selectedVoice;

    console.log('Speaking with voice:', englishVoice?.name, 'Language:', englishVoice?.lang);

    // Configure voice
    if (englishVoice) {
      utterance.voice = englishVoice;
      utterance.lang = englishVoice.lang || 'en-US'; // Use the voice's language or default to en-US
    } else {
      // If no English voice found, explicitly set language
      utterance.lang = 'en-US';
    }

    // Apply options
    utterance.rate = options.rate || 1.0; // Speed (0.1 to 10)
    utterance.pitch = options.pitch || 1.0; // Pitch (0 to 2)
    utterance.volume = options.volume || 1.0; // Volume (0 to 1)

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  /**
   * Stop current speech
   */
  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  /**
   * Pause current speech
   */
  const pause = () => {
    if (synthRef.current && isSpeaking) {
      synthRef.current.pause();
    }
  };

  /**
   * Resume paused speech
   */
  const resume = () => {
    if (synthRef.current) {
      synthRef.current.resume();
    }
  };

  /**
   * Toggle voice enabled/disabled
   */
  const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
    if (isSpeaking) {
      stop();
    }
  };

  /**
   * Check if speech synthesis is supported
   */
  const isSupported = 'speechSynthesis' in window;

  /**
   * Get random item from array for varied responses
   */
  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return {
    speak,
    stop,
    pause,
    resume,
    toggleEnabled,
    isSpeaking,
    isEnabled,
    isSupported,
    voices,
    selectedVoice,
    setSelectedVoice,
    getRandomResponse
  };
};

export default useSpeech;
