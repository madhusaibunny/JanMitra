import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import './Chatbot.css';

const initialMessages = [
  { id: 1, text: "Namaste! I am JanMitra AI. How can I help you with the election process today?", sender: 'bot' }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Setup Web Speech APIs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-IN'; // Default to Indian English

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          setInputValue(transcript);
          // Auto-send after speaking
          handleSendVoice(transcript);
        };

        recognitionRef.current.onerror = (event) => {
          console.error("Speech Recognition Error:", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const speakText = (text) => {
    if (!synthRef.current) return;
    
    // Stop any current speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendVoice = async (voiceText) => {
    if (!voiceText.trim() || isLoading) return;
    await processMessage(voiceText);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    await processMessage(inputValue);
  };

  const processMessage = async (textToSend) => {
    const userMsg = { id: Date.now(), text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    stopSpeaking(); // stop any current audio when user asks new question

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyCj8qODYWc0-1K10lTS2YVlOrPbnTfr0no";
      
      if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
        throw new Error("Gemini API key is missing. Please add it to your .env file.");
      }

      // Call Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are JanMitra AI, a helpful voice assistant for the Indian Election process. Answer very concisely in 1 or 2 short sentences, as your answer will be read out loud to the user. User says: ${textToSend}`
            }]
          }]
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch AI response');
      }

      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
      
      // Auto-read the response out loud!
      speakText(botText);
      
    } catch (err) {
      console.error("Gemini AI Error:", err);
      const errorMsg = "Sorry, I encountered a network error. Please try again later.";
      setMessages(prev => [...prev, { id: Date.now() + 1, text: errorMsg, sender: 'bot' }]);
      speakText(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        className={`chatbot-toggle shadow-lg ${isSpeaking ? 'speaking-glow' : ''}`} 
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={28} />
      </button>

      {isOpen && (
        <div className="chatbot-window shadow-xl fade-in">
          <div className="chatbot-header">
            <h3>JanMitra Voice AI</h3>
            <div style={{display: 'flex', gap: '10px'}}>
              {isSpeaking && (
                <button onClick={stopSpeaking} aria-label="Stop Speaking" title="Stop Audio" style={{color: '#E11D48'}}>
                  <VolumeX size={20} />
                </button>
              )}
              <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
                <X size={24} />
              </button>
            </div>
          </div>
          
          <div className="chatbot-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot">
                <div className="message-bubble loading-dots">Thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSend}>
            <button 
              type="button" 
              onClick={toggleListening} 
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              aria-label="Voice Input"
              title="Click to Speak"
            >
              {isListening ? <Mic size={20} color="#E11D48" /> : <MicOff size={20} />}
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isListening ? "Listening..." : "Type or click mic..."}
            />
            <button type="submit" aria-label="Send Message" disabled={!inputValue.trim() || isLoading}>
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
