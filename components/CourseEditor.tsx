
import React, { useState, useEffect } from 'react';
import { Bot, Book, Palette, Download, UploadCloud, RefreshCw, Check, Zap, MessageSquare, Mic } from 'lucide-react';

interface CourseEditorProps {
  initialContent: string;
  onSaveContent: (newContent: string) => void;
  initialVoiceSummary: string;
  onSaveVoiceSummary: (newSummary: string) => void;
  initialInstruction: string;
  onSaveInstruction: (newInstruction: string) => void;
  initialVoiceInstruction: string;
  onSaveVoiceInstruction: (newInstruction: string) => void;
  initialThemeColor: string;
  onSaveThemeColor: (newColor: string) => void;
  onResetAll?: () => void;
}

type Tab = 'content' | 'instruction' | 'appearance';
type SubTab = 'master' | 'voice';

const themes = [
  { id: 'blue', name: 'Droit Administratif (Bleu)', class: 'bg-blue-600' },
  { id: 'emerald', name: 'Libertés Fondamentales (Vert)', class: 'bg-emerald-600' },
  { id: 'indigo', name: 'Droit International (Indigo)', class: 'bg-indigo-600' },
  { id: 'rose', name: 'Droit Public Toulousain (Rose Brique)', class: 'bg-[#ad5c51]' },
  { id: 'amber', name: 'Droit Fiscal (Ambre)', class: 'bg-amber-600' },
];

export const CourseEditor: React.FC<CourseEditorProps> = ({
  initialContent,
  onSaveContent,
  initialVoiceSummary,
  onSaveVoiceSummary,
  initialInstruction,
  onSaveInstruction,
  initialVoiceInstruction,
  onSaveVoiceInstruction,
  initialThemeColor,
  onSaveThemeColor,
  onResetAll
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('content');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('master');

  const [content, setContent] = useState(initialContent);
  const [voiceSummary, setVoiceSummary] = useState(initialVoiceSummary);
  const [instruction, setInstruction] = useState(initialInstruction);
  const [voiceInstruction, setVoiceInstruction] = useState(initialVoiceInstruction);
  const [themeColor, setThemeColor] = useState(initialThemeColor);

  useEffect(() => {
    if (content === initialContent) return;
    const timer = setTimeout(() => onSaveContent(content), 1000);
    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    if (voiceSummary === initialVoiceSummary) return;
    const timer = setTimeout(() => onSaveVoiceSummary(voiceSummary), 1000);
    return () => clearTimeout(timer);
  }, [voiceSummary]);

  useEffect(() => {
    if (instruction === initialInstruction) return;
    const timer = setTimeout(() => onSaveInstruction(instruction), 1000);
    return () => clearTimeout(timer);
  }, [instruction]);

  useEffect(() => {
    if (voiceInstruction === initialVoiceInstruction) return;
    const timer = setTimeout(() => onSaveVoiceInstruction(voiceInstruction), 1000);
    return () => clearTimeout(timer);
  }, [voiceInstruction]);

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full transition-colors pb-10">

      {/* Tabs Header */}
      <div className="flex items-center gap-1 mb-0 border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => setActiveTab('content')} className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium text-sm transition-colors relative top-[1px] ${activeTab === 'content' ? 'bg-white dark:bg-slate-900 text-blue-600 border border-slate-200 border-b-white z-10' : 'text-slate-500'}`}>
          <Book size={18} /><span>Savoir (Cours)</span>
        </button>
        <button onClick={() => setActiveTab('instruction')} className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium text-sm transition-colors relative top-[1px] ${activeTab === 'instruction' ? 'bg-white dark:bg-slate-900 text-purple-600 border border-slate-200 border-b-white z-10' : 'text-slate-500'}`}>
          <Bot size={18} /><span>IA (Instructions)</span>
        </button>
        <button onClick={() => setActiveTab('appearance')} className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium text-sm transition-colors relative top-[1px] ${activeTab === 'appearance' ? 'bg-white dark:bg-slate-900 text-emerald-600 border border-slate-200 border-b-white z-10' : 'text-slate-500'}`}>
          <Palette size={18} /><span>Apparence</span>
        </button>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 rounded-b-xl rounded-tr-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col p-6 overflow-hidden">

        {/* Sub-Tabs Selector (Shared for Content and Instruction) */}
        {(activeTab === 'content' || activeTab === 'instruction') && (
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg self-start mb-4">
            <button onClick={() => setActiveSubTab('master')} className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${activeSubTab === 'master' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}><MessageSquare size={14} /> TEXTE</button>
            <button onClick={() => setActiveSubTab('voice')} className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${activeSubTab === 'voice' ? 'bg-white dark:bg-slate-700 shadow-sm text-[#ad5c51]' : 'text-slate-500'}`}><Mic size={14} /> ORAL</button>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="flex-1 flex flex-col space-y-2">
            {activeSubTab === 'master' ? (
              <div className="flex-1 flex flex-col animate-in fade-in duration-200">
                <p className="text-xs text-slate-500 mb-2 italic">Ce texte sera utilisé pour le chat textuel. Pas de limite de taille stricte.</p>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  spellCheck={false}
                  className="flex-1 w-full p-4 resize-none border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-700 dark:text-slate-200 font-mono text-sm bg-slate-50 dark:bg-slate-950"
                  placeholder="Collez ici l'intégralité de vos cours..."
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-in fade-in duration-200">
                <p className="text-xs text-slate-500 mb-2 italic">Indispensable pour le Mode Oral. Résumez les points clés (max 150ko).</p>
                <textarea
                  value={voiceSummary}
                  onChange={(e) => setVoiceSummary(e.target.value)}
                  spellCheck={false}
                  className="flex-1 w-full p-4 resize-none border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ad5c51]/50 text-slate-700 dark:text-slate-200 font-mono text-sm bg-[#fff5f4] dark:bg-slate-950"
                  placeholder="Résumez l'essentiel pour la conversation orale..."
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'instruction' && (
          <div className="flex-1 flex flex-col space-y-2">
            {activeSubTab === 'master' ? (
              <div className="flex-1 flex flex-col animate-in fade-in duration-200">
                <p className="text-xs text-slate-500 mb-2 italic">Consignes de comportement pour l'assistant textuel.</p>
                <textarea
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  className="flex-1 w-full p-4 resize-none border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-slate-700 dark:text-slate-200 font-mono text-sm bg-slate-50 dark:bg-slate-950"
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-in fade-in duration-200">
                <p className="text-xs text-slate-500 mb-2 italic">Consignes pour l'oral (ex: renvoi vers le texte en cas de question complexe).</p>
                <textarea
                  value={voiceInstruction}
                  onChange={(e) => setVoiceInstruction(e.target.value)}
                  className="flex-1 w-full p-4 resize-none border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ad5c51]/50 text-slate-700 dark:text-slate-200 font-mono text-sm bg-[#fff5f4] dark:bg-slate-950"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="flex flex-col h-full animate-in fade-in duration-200 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setThemeColor(t.id); onSaveThemeColor(t.id); }}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${themeColor === t.id ? 'border-slate-900 dark:border-white ring-2 ring-slate-400/20 shadow-md' : 'border-transparent bg-slate-50 dark:bg-slate-800 hover:bg-slate-100'}`}
                >
                  <div className={`w-8 h-8 rounded-lg ${t.class} shadow-inner`}></div>
                  <span className={`text-sm font-medium ${themeColor === t.id ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{t.name}</span>
                  {themeColor === t.id && <Check size={16} className="ml-auto text-slate-900 dark:text-white" />}
                </button>
              ))}
            </div>
            <div className="pt-8 mt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Zone de danger</h4>
              <p className="text-xs text-slate-500 mb-4">Si vous avez fait trop de modifications et souhaitez revenir au cours d'origine du Professeur Coulibaly.</p>
              <button
                onClick={onResetAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-bold hover:bg-red-100 transition-all active:scale-95"
              >
                <RefreshCw size={16} />
                Réinitialiser Ada (Paramètres d'usine)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
