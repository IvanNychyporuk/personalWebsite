import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CandidateProfile, Message } from '../types';
import { sendMessageToGemini, generateSpeech } from '../services/geminiService';

interface EmployerChatProps {
  profile: CandidateProfile;
  greetingText: string;
  onStopGreeting: () => void;
}


const sanitizeResponse = (text: string): string =>
  text.replace(/\*\*/g, '').replace(/^\s*\*\s+/gm, '• ').replace(/\s*\*\s*/g, ' ').trim();

const LinkifiedText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return (
    <div className="whitespace-pre-wrap text-sm leading-relaxed">
      {parts.map((part, i) => {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer"
              className="text-primary font-bold underline hover:text-secondary transition-colors">
              {match[1]}
            </a>
          );
        }
        return part;
      })}
    </div>
  );
};

const TypewriterText: React.FC<{ text: string; onComplete: () => void }> = ({ text, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = useRef<number[]>([]);

  useEffect(() => {
    const boundaries: number[] = [0];
    const regex = /\s+/g;
    let match;
    while ((match = regex.exec(text)) !== null) boundaries.push(match.index + match[0].length);
    boundaries.push(text.length);
    words.current = boundaries;
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (words.current.length === 0) return;
    const boundaryIdx = words.current.findIndex(b => b > currentIndex);
    if (boundaryIdx !== -1) {
      const timer = setTimeout(() => setCurrentIndex(words.current[boundaryIdx]), 30);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <LinkifiedText text={text.substring(0, currentIndex)} />;
};

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: { length: number; [key: number]: { isFinal: boolean; [key: number]: { transcript: string } } };
}
interface SpeechRecognition extends EventTarget {
  continuous: boolean; interimResults: boolean; lang: string;
  start(): void; stop(): void; abort(): void;
  onstart: () => void; onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void; onend: () => void;
}
declare global {
  interface Window {
    SpeechRecognition: { new(): SpeechRecognition };
    webkitSpeechRecognition: { new(): SpeechRecognition };
  }
}

// ── Day separator helpers ─────────────────────────────────────────────────────

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function getDayLabel(timestamp: number): string {
  const msgDate = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (sameDay(msgDate, today)) return 'Today';
  if (sameDay(msgDate, yesterday)) return 'Yesterday';
  const d = String(msgDate.getDate()).padStart(2, '0');
  const m = String(msgDate.getMonth() + 1).padStart(2, '0');
  const y = String(msgDate.getFullYear()).slice(-2);
  return `${d}.${m}.${y}`;
}

// ─────────────────────────────────────────────────────────────────────────────

function decode(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
  const int16 = new Int16Array(data.buffer, data.byteOffset, data.byteLength / 2);
  const buffer = ctx.createBuffer(1, int16.length, 24000);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < int16.length; i++) channel[i] = int16[i] / 32768.0;
  return buffer;
}

const EmployerChat: React.FC<EmployerChatProps> = ({ profile, greetingText, onStopGreeting }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('ivan_chat_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showContactConfirm, setShowContactConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pendingContactConfirmRef = useRef(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const currentAudioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number>(null);

  const stopPlayback = useCallback(() => {
    if (currentAudioSourceRef.current) {
      try { currentAudioSourceRef.current.stop(); } catch (e) {}
      currentAudioSourceRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const initAudioContext = async () => {
    if (!outputAudioContextRef.current) {
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = outputAudioContextRef.current;
    if (ctx.state === 'suspended') await ctx.resume();
    return ctx;
  };

  const playOutputAudio = async (base64Audio: string) => {
    const ctx = await initAudioContext();
    stopPlayback();
    try {
      const audioBuffer = await decodeAudioData(decode(base64Audio), ctx);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setIsSpeaking(false);
      source.start();
      currentAudioSourceRef.current = source;
      setIsSpeaking(true);
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: 'init', role: 'model', content: greetingText, timestamp: Date.now(), isStreaming: true }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    localStorage.setItem('ivan_chat_history', JSON.stringify(messages));
  }, [messages, isTyping]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; ++i) fullTranscript += event.results[i][0].transcript;
        setInput(fullTranscript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => { if (isListening) recognition.start(); };
      recognitionRef.current = recognition;
    }
  }, [isListening]);

  const handleSend = async () => {
    const text = input.trim();
    if (isListening) toggleListening();
    if (!text || isTyping) return;
    onStopGreeting();
    stopPlayback();
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    try {
      const response = await sendMessageToGemini([...messages, userMsg], text, profile);
      let clean = response;
      if (response.includes('[DIRECT_MESSAGE]')) {
        clean = response.replace('[DIRECT_MESSAGE]', '').trim();
        pendingContactConfirmRef.current = true;
      }
      const sanitized = sanitizeResponse(clean);
      // Fetch audio BEFORE showing text so both appear simultaneously
      let audioData: string | undefined;
      if (isVoiceEnabled) {
        const ttsText = sanitized.replace(/\[(.*?)\]\(.*?\)/g, '$1');
        audioData = (await generateSpeech(ttsText)) ?? undefined;
      }
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'model', content: sanitized, timestamp: Date.now(), isStreaming: true }]);
      if (audioData) await playOutputAudio(audioData);
    } catch (err) {
      setMessages(prev => [...prev, { id: 'err', role: 'model', content: "I apologize, but I'm having trouble connecting to Ivan's data right now.", timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem('ivan_chat_history');
    stopPlayback();
    setMessages([]);
    setShowClearConfirm(false);
  };

  const stopAudioTracks = () => {
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (audioContextRef.current) { audioContextRef.current.close().catch(() => {}); audioContextRef.current = null; }
  };

  const toggleListening = async () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
      stopAudioTracks();
      setAudioLevel(0);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        await audioCtx.resume();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const update = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
          setAudioLevel(sum / dataArray.length);
          animationRef.current = requestAnimationFrame(update);
        };
        update();
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        alert("Microphone connection failed.");
      }
    }
  };

  const finalizeStreaming = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isStreaming: false } : m));
    if (pendingContactConfirmRef.current) {
      pendingContactConfirmRef.current = false;
      setTimeout(() => setShowContactConfirm(true), 600);
    }
  };

  // ── Day separator logic ──────────────────────────────────────────────────────
  const today = new Date();
  const allMessagesToday = messages.length > 0 && messages.every(m => sameDay(new Date(m.timestamp), today));

  return (
    <div className="flex flex-col h-full bg-burning-orange-50 relative">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-burning-orange-100 bg-burning-orange-50 z-20 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black shadow-lg">I</div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">Ivan's AI Assistant</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-wider flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1 animate-pulse"></span>
              Secure GDPR Channel
            </p>
          </div>
        </div>

        <div className="flex space-x-2 items-center">
          {/* Clear history — GDPR */}
          <button
            onClick={() => setShowClearConfirm(true)}
            title="Delete chat history (GDPR)"
            className="p-2.5 rounded-lg border border-burning-orange-100 bg-white/70 text-slate-400 hover:text-red-500 hover:border-red-300 hover:shadow-[0_0_10px_3px_rgba(200,50,50,0.18)] transition-all flex items-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          {/* LinkedIn */}
          {profile.linkedIn && (
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              title="View LinkedIn Profile"
              className="p-2.5 rounded-lg border border-[#0077b5]/25 bg-white/70 text-[#0077b5] hover:shadow-[0_0_10px_3px_rgba(0,119,181,0.25)] transition-all flex items-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          )}

          {/* Voice toggle */}
          <button
            onClick={async () => {
              const newState = !isVoiceEnabled;
              setIsVoiceEnabled(newState);
              if (!newState) { onStopGreeting(); stopPlayback(); }
              else await initAudioContext();
            }}
            title={isVoiceEnabled ? "Disable voice" : "Enable voice"}
            className={`p-2.5 rounded-lg border border-burning-orange-100 bg-white/70 transition-all flex items-center hover:shadow-[0_0_10px_3px_rgba(212,144,58,0.3)] ${
              isVoiceEnabled ? 'text-primary' : 'text-slate-400'
            }`}
          >
            {isVoiceEnabled ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 1 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
              </svg>
            )}
          </button>

          {/* Message Ivan */}
          <button
            onClick={() => setShowContactConfirm(true)}
            className="px-4 py-2.5 rounded-lg bg-white/70 text-primary border border-burning-orange-100 text-sm font-semibold hover:shadow-[0_0_10px_3px_rgba(212,144,58,0.3)] transition-all"
          >
            Message Ivan
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth scrollbar-hide" style={{ backgroundColor: '#FAF4EC' }}>
        {messages.map((msg, i) => {
          const showDaySep = !allMessagesToday && (
            i === 0 || getDayLabel(messages[i - 1].timestamp) !== getDayLabel(msg.timestamp)
          );
          return (
            <React.Fragment key={msg.id}>
              {showDaySep && (
                <div className="flex items-center justify-center py-2">
                  <span className="text-xs text-slate-400 px-3 py-1 rounded-full border border-burning-orange-100 bg-burning-orange-50">
                    {getDayLabel(msg.timestamp)}
                  </span>
                </div>
              )}
              <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-5 py-3.5 shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-burning-orange-100 text-slate-900 rounded-br-none'
                    : 'bg-white text-slate-800 border border-burning-orange-100 rounded-bl-none'
                }`}>
                  {msg.role === 'model' && msg.isStreaming ? (
                    <TypewriterText text={msg.content} onComplete={() => finalizeStreaming(msg.id)} />
                  ) : (
                    <LinkifiedText text={msg.content} />
                  )}
                  <div className={`text-[9px] mt-2 font-medium opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-burning-orange-100 rounded-2xl rounded-bl-none px-5 py-4 flex flex-col space-y-2 shadow-sm min-w-[120px]">
              <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest animate-pulse">Assistant is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 bg-burning-orange-50 border-t border-burning-orange-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              <button
                onClick={toggleListening}
                className={`w-11 h-11 rounded-full transition-all duration-300 flex items-center justify-center z-10 relative shadow-md ${
                  isListening ? 'bg-primary text-white scale-110' : 'bg-white/80 text-slate-400 hover:bg-burning-orange-100 hover:text-primary'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </button>
              {isListening && <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />}
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder={isListening ? "Listening to your request..." : "Ask me about Ivan's projects..."}
              rows={1}
              className={`flex-1 text-sm border border-burning-orange-100 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-primary/20 resize-none transition-all ${
                isListening ? 'bg-white border-primary text-primary font-medium' : 'bg-white/80'
              }`}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />

            <button
              onClick={handleSend}
              disabled={(!input.trim() && !isListening) || isTyping}
              className="w-11 h-11 flex-shrink-0 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary disabled:opacity-40 transition-all shadow-lg active:scale-90"
            >
              <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Clear history confirmation */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-accent/80 backdrop-blur-sm p-4">
          <div className="bg-burning-orange-50 rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-burning-orange-100">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Delete chat history?</h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              This will permanently remove all messages from this session. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-burning-orange-100 bg-white/70 text-slate-600 text-sm font-semibold hover:bg-white transition-all"
              >
                No, keep it
              </button>
              <button
                onClick={handleClearHistory}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact page confirmation */}
      {showContactConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-accent/80 backdrop-blur-sm p-4">
          <div className="bg-burning-orange-50 rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-burning-orange-100">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Go to Contact page?</h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              You will leave this chat and be redirected to the Contact page where you can send a direct message to Ivan.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowContactConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-burning-orange-100 bg-white/70 text-slate-600 text-sm font-semibold hover:bg-white transition-all"
              >
                No, stay in chat
              </button>
              <button
                onClick={() => { window.top!.location.href = '/en/contact'; }}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-secondary transition-all"
              >
                Yes, go to Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerChat;
