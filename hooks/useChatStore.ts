import { useState, useEffect } from 'react';
import { ChatSession, ChatMessage, StudentProfile, ScoreRecord } from '../types';

const STORAGE_KEY = 'droit_public_sessions';
const PROFILES_KEY = 'droit_public_profiles';

export const useChatStore = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [profiles, setProfiles] = useState<StudentProfile[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);

  // Chargement initial
  useEffect(() => {
    const storedSessions = localStorage.getItem(STORAGE_KEY);
    const storedProfiles = localStorage.getItem(PROFILES_KEY);

    if (storedSessions) {
      try {
        const revived = JSON.parse(storedSessions).map((s: any) => ({
          ...s,
          messages: s.messages.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
        }));
        setSessions(revived);
        if (revived.length > 0) setActiveSessionId(revived[0].id);
      } catch (e) { createNewSession(); }
    } else { createNewSession(); }

    if (storedProfiles) {
      try { setProfiles(JSON.parse(storedProfiles)); } catch (e) { setProfiles([]); }
    }
  }, []);

  // Persistance
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  }, [profiles]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: 'Nouvelle conversation',
      messages: [{
        role: 'model',
        text: "Bonjour ! Je suis **Ada**, votre assistante virtuelle. Comment puis-je vous accompagner aujourd'hui dans vos révisions de droit administratif ?",
        timestamp: new Date()
      }],
      updatedAt: Date.now()
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    return newSession.id;
  };

  const deleteSession = (id: string, e?: any) => {
    e?.stopPropagation();
    const newSessions = sessions.filter(s => s.id !== id);
    setSessions(newSessions);
    if (activeSessionId === id) {
      if (newSessions.length > 0) setActiveSessionId(newSessions[0].id);
      else createNewSession();
    }
  };

  const addMessageToSession = (sessionId: string, message: ChatMessage) => {
    setSessions(prev => {
      const updated = prev.map(s => {
        if (s.id === sessionId) {
          let newTitle = s.title;
          if (s.messages.length === 1 && message.role === 'user' && s.title === 'Nouvelle conversation') {
            newTitle = message.text.slice(0, 30) + (message.text.length > 30 ? '...' : '');
          }
          return { ...s, title: newTitle, messages: [...s.messages, message], updatedAt: Date.now() };
        }
        return s;
      });
      return [...updated].sort((a, b) => b.updatedAt - a.updatedAt);
    });
  };

  const selectOptionInMessage = (sessionId: string, msgIndex: number, option: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        const newMessages = [...s.messages];
        if (newMessages[msgIndex]) {
          newMessages[msgIndex] = { ...newMessages[msgIndex], selectedOption: option };
        }
        return { ...s, messages: newMessages };
      }
      return s;
    }));
  };

  const findProfilesByName = (name: string) => {
    return profiles.filter(p => p.name.toLowerCase() === name.trim().toLowerCase());
  };

  const createNewProfile = (name: string): StudentProfile => {
    const cleanName = name.trim();
    const suffix = Math.floor(100 + Math.random() * 900);
    const newProfile: StudentProfile = {
      id: `${cleanName}-${suffix}`,
      name: cleanName,
      scores: []
    };
    setProfiles(prev => [...prev, newProfile]);
    setCurrentProfileId(newProfile.id);
    return newProfile;
  };

  const loginToProfile = (id: string) => {
    const found = profiles.find(p => p.id === id);
    if (found) setCurrentProfileId(found.id);
  };

  const logoutProfile = () => setCurrentProfileId(null);

  const saveScore = (profileId: string, score: ScoreRecord) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === profileId) {
        return { ...p, scores: [...p.scores, score] };
      }
      return p;
    }));
  };

  const getActiveSession = () => sessions.find(s => s.id === activeSessionId);
  const getCurrentProfile = () => profiles.find(p => p.id === currentProfileId);

  return {
    sessions,
    activeSessionId,
    setActiveSessionId,
    createNewSession,
    deleteSession,
    addMessageToSession,
    selectOptionInMessage,
    findProfilesByName,
    createNewProfile,
    loginToProfile,
    logoutProfile,
    saveScore,
    currentProfile: getCurrentProfile(),
    activeSession: getActiveSession()
  };
};
