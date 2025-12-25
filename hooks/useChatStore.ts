import React, { useState, useEffect } from 'react';
import { ChatSession, ChatMessage } from '../types';

const STORAGE_KEY = 'droit_public_sessions';

export const useChatStore = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Revive dates
        const revived = parsed.map((s: any) => ({
          ...s,
          messages: s.messages.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }))
        }));
        setSessions(revived);
        if (revived.length > 0) {
          setActiveSessionId(revived[0].id);
        } else {
          createNewSession();
        }
      } catch (e) {
        console.error("Failed to parse sessions", e);
        createNewSession();
      }
    } else {
      createNewSession();
    }
  }, []);

  // Clear all sessions
  const clearAllSessions = () => {
    localStorage.removeItem(STORAGE_KEY);
    const firstId = createNewSession();
    setSessions(prev => prev.filter(s => s.id === firstId));
  };

  // Save to local storage whenever sessions change with safety check
  useEffect(() => {
    if (sessions.length > 0) {
      try {
        const serialized = JSON.stringify(sessions);
        // If > 4MB, remove oldest session to prevent crash
        if (serialized.length > 4000000) {
          console.warn("Storage limit approaching, purging oldest session...");
          setSessions(prev => prev.slice(0, -1));
          return;
        }
        localStorage.setItem(STORAGE_KEY, serialized);
      } catch (e) {
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          console.error("Storage limit exceeded, clearing oldest sessions...");
          setSessions(prev => prev.slice(0, Math.max(1, Math.floor(prev.length / 2))));
        }
      }
    }
  }, [sessions]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: 'Nouvelle conversation',
      messages: [{
        role: 'model',
        text: "Bonjour ! Je suis **Ada**, votre assistante virtuelle, instruite par le **professeur Coulibaly**. Posez-moi une question sur le **cours de droit administratif général**, ou demandez-moi de générer un Quiz, un cas pratique, des schémas, etc.\n\n*Astuce : Vous pouvez aussi me transmettre vos propres documents PDF !*",
        timestamp: new Date()
      }],
      updatedAt: Date.now()
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    return newSession.id;
  };

  const deleteSession = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newSessions = sessions.filter(s => s.id !== id);
    setSessions(newSessions);

    if (activeSessionId === id) {
      if (newSessions.length > 0) {
        setActiveSessionId(newSessions[0].id);
      } else {
        createNewSession();
      }
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
    } catch (e) { }
  };

  const renameSession = (id: string, newTitle: string) => {
    setSessions(prev => prev.map(s =>
      s.id === id ? { ...s, title: newTitle } : s
    ));
  };

  const addMessageToSession = (sessionId: string, message: ChatMessage) => {
    setSessions(prev => {
      const updated = prev.map(s => {
        if (s.id === sessionId) {
          let newTitle = s.title;
          if (s.messages.length === 1 && message.role === 'user' && s.title === 'Nouvelle conversation') {
            newTitle = message.text.slice(0, 30) + (message.text.length > 30 ? '...' : '');
          }

          return {
            ...s,
            title: newTitle,
            messages: [...s.messages, message],
            updatedAt: Date.now()
          };
        }
        return s;
      });
      return [...updated].sort((a, b) => b.updatedAt - a.updatedAt);
    });
  };

  const getActiveSession = () => sessions.find(s => s.id === activeSessionId);

  return {
    sessions,
    activeSessionId,
    setActiveSessionId,
    createNewSession,
    deleteSession,
    renameSession,
    addMessageToSession,
    clearAllSessions,
    activeSession: getActiveSession()
  };
};
