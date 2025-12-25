
export interface AttachedFile {
  name: string;
  data: string;
  mimeType: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
  file?: AttachedFile;
  selectedOption?: string; // Persistance du choix de quiz
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number; // Timestamp for sorting
}

export enum AppMode {
  TEXT = 'text',
  VOICE = 'voice',
  SETTINGS = 'settings'
}

export interface CourseContext {
  content: string;
  title: string;
}

export type VoiceStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
