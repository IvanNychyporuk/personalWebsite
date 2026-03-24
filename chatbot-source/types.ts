
export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: number;
  isThinking?: boolean;
  isStreaming?: boolean;
}

export interface CandidateProfile {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  experience: string;
  availability: string;
  location?: string;
  dob?: string; // YYYY-MM-DD
  linkedIn?: string;
  contactEmail: string;
}

export enum AppMode {
  EMPLOYER = 'EMPLOYER',
  ADMIN = 'ADMIN'
}

export interface TaskEvaluation {
  fit: 'Yes' | 'Likely' | 'Needs clarification' | 'Not a match';
  tools: string[];
  approach: string[];
  deliverables: string[];
  risks: string[];
}

// Added missing SchedulingConfig interface
export interface SchedulingConfig {
  startTime: string;
  endTime: string;
  days: number[];
  contactEmail: string;
}
