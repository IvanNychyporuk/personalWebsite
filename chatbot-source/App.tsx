import React, { useState, useEffect, useRef } from 'react';
import ConsentGate from './components/ConsentGate';
import EmployerChat from './components/EmployerChat';
import AdminPanel from './components/AdminPanel';
import { CandidateProfile, AppMode } from './types';
import { generateSpeech } from './services/geminiService';

const GREETING_TEXT = `Hello! I am Ivan's AI Assistant. I'm here to help you explore Ivan's expertise as an AI Media & Content Designer, AI Workflow Specialist, and VFX Compositor.\n\nFeel free to write in your preferred language — I speak many languages.\n\nI operate under strict GDPR guidelines—you can delete your chat history at any time using the trash icon in the top right. How can I help you today?`;

const DEFAULT_PROFILE: CandidateProfile = {
  name: 'Ivan',
  role: 'AI Media & Content Designer, AI Workflow Specialist & VFX Compositor',
  bio: 'I am a creative professional combining technical engineering background with visual storytelling. I specialize in AI Media Production, AI Workflow Automation, and VFX Compositing.',
  skills: [
    'AI Workflow Automation',
    'AI Agent System Design',
    'Prompt Engineering',
    'AI Content Creation',
    'AI Audio & Music Pipeline',
    'Social Media Strategy with AI',
    'Serverless Architecture',
    'VFX Digital Compositing',
    'Nuke',
    'Fusion',
    'DaVinci Resolve',
    'Photoshop',
    'ChatGPT',
    'Claude / Claude Code',
    'Google AI Studio',
    'DALL-E',
    'Adobe Firefly',
    'Suno',
    'ElevenLabs',
  ],
  experience: `EDUCATION & TRAINING:
- Technical University in Ukraine (Engineering/Technical background).
- Successfully completed "KI-Medien und Content Gestalter" (AI Media & Content Designer) at WBS Training — a 120-day intensive program covering AI in media, audio production, social media marketing, web development, animation, project management, and AI ethics.

PROFESSIONAL BACKGROUND:
- Worked in film and TV production and postproduction environments.
- Strong focus on visual storytelling, polish, and technical precision.
- Integrating generative AI tools (text, image, video, audio) into complete creative and automation pipelines.`,
  availability: 'Open to any type of cooperation — freelance, contract, or full-time. Remote-first. Local collaborations in Trier / Luxembourg are also possible.',
  location: 'Trier, Germany',
  dob: '1984-11-16',
  linkedIn: 'https://www.linkedin.com/in/ivan-nychyporuk-41233488',
  contactEmail: 'nychyporuk.ivan.vfx@gmail.com'
};


const App: React.FC = () => {
  const alreadyConsented = localStorage.getItem('ivan_consent') === 'true';
  const [hasConsented, setHasConsented] = useState(alreadyConsented);
  const [chatReady, setChatReady] = useState(alreadyConsented);
  // greetingReady: true means audio is loaded and greeting text+voice can start simultaneously.
  // For returning visitors it starts true (no greeting needed — chat history is shown).
  const [greetingReady, setGreetingReady] = useState(alreadyConsented);
  const [mode, setMode] = useState<AppMode>(AppMode.EMPLOYER);
  const [profile, setProfile] = useState<CandidateProfile>(DEFAULT_PROFILE);
  const greetingSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const consentCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('ivan_profile');
    if (savedProfile) {
      try { setProfile(JSON.parse(savedProfile)); } catch (e) {}
    }
    // NOTE: generateSpeech is intentionally NOT called here.
    // Google Gemini API is only contacted after the user gives explicit consent — see handleConsent().
  }, []);

  const playGreeting = (ctx: AudioContext, audioData: string) => {
    try {
      const binary = atob(audioData);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const int16 = new Int16Array(bytes.buffer);
      const buffer = ctx.createBuffer(1, int16.length, 24000);
      const channel = buffer.getChannelData(0);
      for (let i = 0; i < int16.length; i++) channel[i] = int16[i] / 32768.0;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      ctx.resume();
      greetingSourceRef.current = source;
    } catch (e) {
      console.error('Greeting audio error:', e);
    }
  };

  const handleConsent = () => {
    localStorage.setItem('ivan_consent', 'true');
    // Create + unlock AudioContext synchronously during the user gesture (required for autoplay)
    const ctx = new AudioContext();
    ctx.resume();
    consentCtxRef.current = ctx;
    setHasConsented(true);
    setChatReady(true); // Show chat UI immediately (user sees the interface, not a blank spinner)
    // Fetch greeting audio — only contacted after explicit consent (GDPR compliant)
    // When audio arrives: play it and start the greeting text at the same time (synchronized)
    generateSpeech(GREETING_TEXT)
      .then(audio => {
        if (audio && consentCtxRef.current) playGreeting(consentCtxRef.current, audio);
        setGreetingReady(true); // triggers typewriter text to start simultaneously with audio
      })
      .catch(() => {
        setGreetingReady(true); // audio failed — show greeting text anyway
      });
  };

  const stopGreeting = () => {
    if (greetingSourceRef.current) {
      try { greetingSourceRef.current.stop(); } catch (e) {}
      greetingSourceRef.current = null;
    }
  };

  const handleProfileUpdate = (newProfile: CandidateProfile) => {
    setProfile(newProfile);
    localStorage.setItem('ivan_profile', JSON.stringify(newProfile));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setMode(prev => prev === AppMode.EMPLOYER ? AppMode.ADMIN : AppMode.EMPLOYER);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-full w-full relative bg-burning-orange-50">
      {!hasConsented && (
        <div className="flex flex-col h-full w-full items-center justify-center">
          <ConsentGate onConsent={handleConsent} />
        </div>
      )}

      {hasConsented && !chatReady && (
        <div className="flex flex-col h-full w-full items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-primary font-bold uppercase tracking-widest text-sm animate-pulse">Preparing Chat...</p>
        </div>
      )}

      {hasConsented && mode === AppMode.ADMIN && (
        <AdminPanel
          profile={profile}
          onUpdateProfile={handleProfileUpdate}
          onClose={() => setMode(AppMode.EMPLOYER)}
        />
      )}

      {hasConsented && chatReady && mode === AppMode.EMPLOYER && (
        <EmployerChat
          profile={profile}
          greetingText={GREETING_TEXT}
          greetingReady={greetingReady}
          onStopGreeting={stopGreeting}
        />
      )}

      <div className="fixed bottom-1 right-1 opacity-0 hover:opacity-50 transition-opacity z-50">
        <button
          onClick={() => setMode(AppMode.ADMIN)}
          className="text-[10px] text-slate-400 cursor-default"
          title="Admin Mode (Or Press Ctrl+Shift+A)"
        >
          π
        </button>
      </div>
    </div>
  );
};

export default App;
