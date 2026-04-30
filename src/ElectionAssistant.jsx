import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  UserPlus, 
  Search, 
  Vote, 
  Trophy, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Volume2,
  VolumeX,
  Globe,
  HeartHandshake,
  Info,
  MapPin,
  Mic,
  MicOff,
  Share2
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    name: "English",
    appTitle: "JanMitra Guide",
    appSubtitle: "Listen & Practice Voting",
    btnNext: "Next",
    btnPrev: "Back",
    btnFinish: "Finish",
    btnPlayAudio: "Listen",
    voiceCommandHint: "Say 'Next' or 'Back'",
    findBoothBtn: "📍 Find My Polling Booth",
    whatsappBtn: "Share on WhatsApp",
    evmPracticeText: "EVM Simulator: Press the BLUE button to practice voting safely.",
    evmVotedText: "BEEEEEEP! Vote Recorded Successfully!",
    langCode: 'en-IN',
    voiceKeywords: { next: 'next', prev: 'back' },
    steps: [
      {
        id: 'intro',
        title: "Why Vote?",
        desc: "Your vote brings roads, hospitals, and schools. It's your power for a better life.",
        actions: ["Never sell your vote for money.", "Your vote is completely secret."],
        color: "#E11D48",
        imagePath: "/intro.png"
      },
      {
        id: 'step1',
        title: "Voter ID",
        desc: "You need a Voter ID card. Check if your name is on the list.",
        actions: ["18 years or older.", "Check your name."],
        color: "#4F46E5",
        imagePath: "/voter_id.png"
      },
      {
        id: 'step2',
        title: "Know Candidates",
        desc: "Before voting, learn about the people running in your area.",
        actions: ["Find out who is running.", "Choose the best person."],
        color: "#0284C7",
        imagePath: "/candidate.png"
      },
      {
        id: 'step3',
        title: "Polling Day",
        desc: "Go to your assigned polling booth on election day to vote.",
        actions: ["Take your Voter ID.", "Wait for your turn."],
        color: "#059669",
        imagePath: "/polling_booth.png",
        showBoothFinder: true
      },
      {
        id: 'evm',
        title: "EVM Practice",
        desc: "Don't be afraid of the EVM. Practice using it right here!",
        actions: ["It's very easy to use.", "Your vote stays secret."],
        color: "#8B5CF6",
        imagePath: "/evm_machine.png",
        showEVM: true
      },
      {
        id: 'step4',
        title: "Results",
        desc: "After voting, votes are counted to declare the winner.",
        actions: ["Highest votes wins."],
        color: "#D97706",
        imagePath: "/results.png",
        showShare: true
      }
    ]
  },
  hi: {
    name: "हिंदी (Hindi)",
    appTitle: "जनमित्र गाइड",
    appSubtitle: "वोट का अभ्यास करें",
    btnNext: "आगे",
    btnPrev: "पीछे",
    btnFinish: "समाप्त",
    btnPlayAudio: "सुनें",
    voiceCommandHint: "'आगे' या 'पीछे' बोलें",
    findBoothBtn: "📍 अपना पोलिंग बूथ खोजें",
    whatsappBtn: "WhatsApp पर शेयर करें",
    evmPracticeText: "EVM अभ्यास: सुरक्षित रूप से वोट करने के लिए नीला बटन दबाएं।",
    evmVotedText: "बीप! वोट सफलतापूर्वक दर्ज हो गया!",
    langCode: 'hi-IN',
    voiceKeywords: { next: 'आगे', prev: 'पीछे' },
    steps: [
      {
        id: 'intro',
        title: "वोट क्यों दें?",
        desc: "आपका वोट सड़क, अस्पताल और स्कूल लाता है।",
        actions: ["पैसे के लिए अपना वोट कभी न बेचें।", "आपका वोट गुप्त रहता है।"],
        color: "#E11D48",
        imagePath: "/intro.png"
      },
      {
        id: 'step1',
        title: "वोटर आईडी",
        desc: "आपके पास वोटर आईडी कार्ड होना चाहिए।",
        actions: ["उम्र 18 साल या ज्यादा।", "अपना नाम चेक करें।"],
        color: "#4F46E5",
        imagePath: "/voter_id.png"
      },
      {
        id: 'step2',
        title: "उम्मीदवार को जानें",
        desc: "वोट देने से पहले जानें कि आपके इलाके में कौन चुनाव लड़ रहा है।",
        actions: ["पता करें कौन खड़ा है।", "सबसे अच्छे व्यक्ति को चुनें।"],
        color: "#0284C7",
        imagePath: "/candidate.png"
      },
      {
        id: 'step3',
        title: "वोटिंग का दिन",
        desc: "चुनाव के दिन पोलिंग बूथ पर जाकर अपना वोट दें।",
        actions: ["अपना वोटर आईडी साथ ले जाएं।", "अपनी बारी का इंतजार करें।"],
        color: "#059669",
        imagePath: "/polling_booth.png",
        showBoothFinder: true
      },
      {
        id: 'evm',
        title: "EVM अभ्यास",
        desc: "EVM से डरें नहीं। यहीं पर इसका उपयोग करने का अभ्यास करें!",
        actions: ["इसका उपयोग करना बहुत आसान है।", "आपका वोट गुप्त रहता है।"],
        color: "#8B5CF6",
        imagePath: "/evm_machine.png",
        showEVM: true
      },
      {
        id: 'step4',
        title: "नतीजे",
        desc: "वोटिंग खत्म होने के बाद विजेता की घोषणा होती है।",
        actions: ["ज्यादा वोट पाने वाला जीतता है।"],
        color: "#D97706",
        imagePath: "/results.png",
        showShare: true
      }
    ]
  },
  te: {
    name: "తెలుగు (Telugu)",
    appTitle: "జనమిత్ర మార్గదర్శి",
    appSubtitle: "ఓటు ఎలా వేయాలో ప్రాక్టీస్ చేయండి",
    btnNext: "తదుపరి",
    btnPrev: "వెనుకకు",
    btnFinish: "పూర్తి",
    btnPlayAudio: "వినండి",
    voiceCommandHint: "'తదుపరి' లేదా 'వెనుకకు' అని చెప్పండి",
    findBoothBtn: "📍 నా పోలింగ్ బూత్‌ను కనుగొనండి",
    whatsappBtn: "WhatsApp లో షేర్ చేయండి",
    evmPracticeText: "EVM ప్రాక్టీస్: ఓటు వేయడానికి నీలిరంగు బటన్ నొక్కండి.",
    evmVotedText: "బీప్! ఓటు విజయవంతంగా రికార్డ్ చేయబడింది!",
    langCode: 'te-IN',
    voiceKeywords: { next: 'తదుపరి', prev: 'వెనుకకు' },
    steps: [
      {
        id: 'intro',
        title: "ఓటు ఎందుకు?",
        desc: "మీ ఓటు రోడ్లు, ఆసుపత్రులను తెస్తుంది.",
        actions: ["డబ్బు కోసం ఓటు అమ్మకండి.", "మీ ఓటు రహస్యం."],
        color: "#E11D48",
        imagePath: "/intro.png"
      },
      {
        id: 'step1',
        title: "ఓటరు ఐడీ",
        desc: "మీకు ఓటరు ఐడీ కార్డు ఉండాలి.",
        actions: ["వయస్సు 18 లేదా ఎక్కువ.", "మీ పేరును సరిచూసుకోండి."],
        color: "#4F46E5",
        imagePath: "/voter_id.png"
      },
      {
        id: 'step2',
        title: "అభ్యర్థిని తెలుసుకోండి",
        desc: "ఓటు వేయడానికి ముందు మీ ప్రాంతంలో ఎవరు పోటీ చేస్తున్నారో తెలుసుకోండి.",
        actions: ["ఎవరు పోటీలో ఉన్నారో తెలుసుకోండి.", "ఉత్తమమైన వారిని ఎంచుకోండి."],
        color: "#0284C7",
        imagePath: "/candidate.png"
      },
      {
        id: 'step3',
        title: "పోలింగ్ రోజు",
        desc: "ఎన్నికల రోజున పోలింగ్ బూత్‌కు వెళ్లి మీ ఓటు వేయండి.",
        actions: ["మీ ఓటరు ఐడీని తీసుకెళ్లండి.", "మీ వంతు కోసం వేచి ఉండండి."],
        color: "#059669",
        imagePath: "/polling_booth.png",
        showBoothFinder: true
      },
      {
        id: 'evm',
        title: "EVM ప్రాక్టీస్",
        desc: "EVM కి భయపడకండి. ఇక్కడే ప్రాక్టీస్ చేయండి!",
        actions: ["ఇది వాడటం చాలా సులభం.", "మీ ఓటు రహస్యంగా ఉంటుంది."],
        color: "#8B5CF6",
        imagePath: "/evm_machine.png",
        showEVM: true
      },
      {
        id: 'step4',
        title: "ఫలితాలు",
        desc: "ఓటింగ్ తర్వాత ఓట్లను లెక్కిస్తారు.",
        actions: ["అత్యధిక ఓట్లు వచ్చిన వారు గెలుస్తారు."],
        color: "#D97706",
        imagePath: "/results.png",
        showShare: true
      }
    ]
  }
};

export default function ElectionAssistant() {
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState('hi');
  const [isPlaying, setIsPlaying] = useState(false);
  const [evmVoted, setEvmVoted] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isFindingBooth, setIsFindingBooth] = useState(false);
  
  const t = useMemo(() => TRANSLATIONS[language], [language]);
  const steps = t.steps;
  const stepInfo = steps[currentStep];
  
  const synthRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = t.langCode;
        
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
          if (transcript.includes(t.voiceKeywords.next) || transcript.includes('next')) {
            handleNext();
          } else if (transcript.includes(t.voiceKeywords.prev) || transcript.includes('back') || transcript.includes('piche')) {
            handlePrev();
          }
        };
      }
    }
    
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    }
  }, [language]);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
    }
    setEvmVoted(false);
  }, [currentStep, language]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const toggleAudio = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
    } else {
      let textToSpeak = `${stepInfo.title}. ${stepInfo.desc}. ${stepInfo.actions.join('. ')}`;
      if (stepInfo.showEVM) textToSpeak += `. ${t.evmPracticeText}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = t.langCode;
      utterance.rate = 0.85;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      setIsPlaying(true);
      synthRef.current.speak(utterance);
    }
  };

  const toggleVoiceCommands = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition not supported in this browser.");
      return;
    }
    
    if (voiceEnabled) {
      recognitionRef.current.stop();
      setVoiceEnabled(false);
    } else {
      recognitionRef.current.lang = t.langCode;
      recognitionRef.current.start();
      setVoiceEnabled(true);
    }
  };

  const handleEVMVote = () => {
    setEvmVoted(true);
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(t.evmVotedText);
      utterance.lang = t.langCode;
      synthRef.current.speak(utterance);
    }
  };

  const handleFindBooth = () => {
    setIsFindingBooth(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          window.open(`https://www.google.com/maps/search/polling+booth+near+me/@${latitude},${longitude},15z`, '_blank');
          setIsFindingBooth(false);
        },
        () => {
          window.open(`https://www.google.com/maps/search/polling+booth+near+me`, '_blank');
          setIsFindingBooth(false);
        }
      );
    } else {
      window.open(`https://www.google.com/maps/search/polling+booth+near+me`, '_blank');
      setIsFindingBooth(false);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${t.appTitle} - ${t.appSubtitle}. Learn here: ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const progressPercentage = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <div className="app-container" role="main" aria-label="Election Guide Assistant">
      <div className="top-toolbar">
        <div className="language-selector" role="region" aria-label="Language Selection">
          <Globe size={22} className="globe-icon" aria-hidden="true" />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="lang-select"
            aria-label="Select Language"
          >
            {Object.entries(TRANSLATIONS).map(([code, data]) => (
              <option key={code} value={code}>{data.name}</option>
            ))}
          </select>
        </div>
        
        <button 
          className={`voice-cmd-btn ${voiceEnabled ? 'active' : ''}`}
          onClick={toggleVoiceCommands}
          title={t.voiceCommandHint}
        >
          {voiceEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          <span className="voice-hint">{voiceEnabled ? t.voiceCommandHint : 'Mic'}</span>
        </button>
      </div>

      <div className="header glass-header" style={{ '--dynamic-color': stepInfo.color }}>
        <button 
          className={`audio-btn-large ${isPlaying ? 'playing' : 'pulsing'}`} 
          onClick={toggleAudio} 
          title={t.btnPlayAudio}
          aria-pressed={isPlaying}
          aria-label={`${t.btnPlayAudio} - ${stepInfo.title}`}
        >
          {isPlaying ? <VolumeX size={36} aria-hidden="true" /> : <Volume2 size={36} aria-hidden="true" />}
          <span className="audio-label">{isPlaying ? 'Stop' : t.btnPlayAudio}</span>
        </button>
        
        <div className="image-wrapper" aria-hidden="true">
          <img src={stepInfo.imagePath} alt={stepInfo.title} className="step-image" />
        </div>
        <h1 tabIndex="0">{t.appTitle}</h1>
        <p tabIndex="0">{t.appSubtitle}</p>
      </div>

      <div className="content">
        <div className="progress-container" aria-hidden="true">
          <div className="progress-line"></div>
          <div className="progress-line-fill" style={{ width: `${progressPercentage}%`, backgroundColor: stepInfo.color }}></div>
          
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`step-indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              style={{ 
                borderColor: index <= currentStep ? stepInfo.color : '#E2E8F0',
                backgroundColor: index < currentStep ? stepInfo.color : index === currentStep ? stepInfo.color : '#E2E8F0',
                color: index <= currentStep ? '#fff' : '#64748B'
              }}
            >
              {index === 0 ? <Info size={20} /> : index}
            </div>
          ))}
        </div>

        <div className="step-card" key={stepInfo.id} aria-live="polite">
          <h2 className="step-title" style={{ color: stepInfo.color }} tabIndex="0">{stepInfo.title}</h2>
          <p className="step-desc-large" tabIndex="0">{stepInfo.desc}</p>
          
          <div className="action-list" role="list">
            {stepInfo.actions.map((action, i) => (
              <div 
                className="action-item fade-in-action" 
                key={i} 
                role="listitem" 
                tabIndex="0"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <CheckCircle2 className="action-icon" style={{ color: stepInfo.color }} size={32} aria-hidden="true" />
                <span className="action-text-large">{action}</span>
              </div>
            ))}
            
            {stepInfo.showEVM && (
              <div className="evm-simulator fade-in-action" style={{ animationDelay: '0.45s' }}>
                <p className="evm-instructions">{t.evmPracticeText}</p>
                <div className={`evm-machine ${evmVoted ? 'voted' : ''}`}>
                  <div className="evm-candidate">👤 Candidate Name</div>
                  <div className="evm-symbol">🌻</div>
                  <button 
                    className="evm-button" 
                    onClick={handleEVMVote}
                    disabled={evmVoted}
                    aria-label="Vote for Candidate"
                  ></button>
                  <div className={`evm-light ${evmVoted ? 'on' : ''}`}></div>
                </div>
                {evmVoted && <p className="evm-success-text fade-in-action">{t.evmVotedText}</p>}
              </div>
            )}

            {stepInfo.showBoothFinder && (
              <button 
                className="btn-special fade-in-action" 
                onClick={handleFindBooth}
                style={{ animationDelay: '0.45s', backgroundColor: '#059669' }}
                disabled={isFindingBooth}
              >
                <MapPin size={24} /> {isFindingBooth ? "..." : t.findBoothBtn}
              </button>
            )}

            {stepInfo.showShare && (
              <button 
                className="btn-special fade-in-action" 
                onClick={handleWhatsAppShare}
                style={{ animationDelay: '0.45s', backgroundColor: '#25D366', color: 'white' }}
              >
                <Share2 size={24} /> {t.whatsappBtn}
              </button>
            )}
          </div>
        </div>

        <div className="controls">
          <button 
            className="btn btn-secondary" 
            onClick={handlePrev}
            disabled={currentStep === 0}
            aria-label={t.btnPrev}
          >
            <ChevronLeft size={28} aria-hidden="true" /> <span>{t.btnPrev}</span>
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            style={{ backgroundColor: stepInfo.color, boxShadow: `0 8px 16px -4px ${stepInfo.color}88` }}
            aria-label={currentStep === steps.length - 1 ? t.btnFinish : t.btnNext}
          >
            <span>{currentStep === steps.length - 1 ? t.btnFinish : t.btnNext}</span> <ChevronRight size={28} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
