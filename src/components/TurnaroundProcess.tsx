import { useState } from 'react';
import { WorksheetData, Turnaround } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ChevronLeft, Plus, X, Check } from 'lucide-react';
import { Badge } from './ui/badge';
import { useLanguage } from '../lib/language-context';
import { useTranslations } from '../lib/i18n';

interface TurnaroundProcessProps {
  worksheet: WorksheetData;
  currentSentenceId: string;
  onChange: (worksheet: WorksheetData) => void;
  onBack: () => void;
  onComplete: () => void;
  onSelectSentence: (id: string) => void;
}

export function TurnaroundProcess({
  worksheet,
  currentSentenceId,
  onChange,
  onBack,
  onComplete,
  onSelectSentence,
}: TurnaroundProcessProps) {
  const currentSentence = worksheet.sentences.find(s => s.id === currentSentenceId);
  const [newExample, setNewExample] = useState<{ [key: string]: string }>({});
  const [editingTurnaround, setEditingTurnaround] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const { language } = useLanguage();
  const t = useTranslations(language);

  if (!currentSentence) return null;

  const turnaroundTypes = [
    { type: 'to-opposite' as const, ...t.turnarounds.types['to-opposite'] },
    { type: 'to-other' as const, ...t.turnarounds.types['to-other'] },
    { type: 'to-self' as const, ...t.turnarounds.types['to-self'] },
  ];

  const addTurnaround = (type: Turnaround['type']) => {
    const newTurnaround: Turnaround = {
      id: crypto.randomUUID(),
      type,
      text: '',
      examples: [],
    };

    const updatedSentences = worksheet.sentences.map(s => {
      if (s.id === currentSentenceId) {
        return {
          ...s,
          turnarounds: [...s.turnarounds, newTurnaround],
        };
      }
      return s;
    });

    onChange({
      ...worksheet,
      sentences: updatedSentences,
    });

    setEditingTurnaround(newTurnaround.id);
    setEditText('');
  };

  const updateTurnaroundText = (turnaroundId: string, text: string) => {
    const updatedSentences = worksheet.sentences.map(s => {
      if (s.id === currentSentenceId) {
        return {
          ...s,
          turnarounds: s.turnarounds.map(t =>
            t.id === turnaroundId ? { ...t, text } : t
          ),
        };
      }
      return s;
    });

    onChange({
      ...worksheet,
      sentences: updatedSentences,
    });
  };

  const addExample = (turnaroundId: string) => {
    const example = newExample[turnaroundId]?.trim();
    if (!example) return;

    const updatedSentences = worksheet.sentences.map(s => {
      if (s.id === currentSentenceId) {
        const updatedTurnarounds = s.turnarounds.map(t => {
          if (t.id === turnaroundId) {
            return {
              ...t,
              examples: [...t.examples, example],
            };
          }
          return t;
        });
        
        // Update completed count
        const completed = updatedTurnarounds.filter(t => 
          t.text && t.examples.length >= 1
        ).length;
        
        return {
          ...s,
          turnarounds: updatedTurnarounds,
          completedTurnarounds: completed,
        };
      }
      return s;
    });

    onChange({
      ...worksheet,
      sentences: updatedSentences,
    });

    setNewExample({ ...newExample, [turnaroundId]: '' });
  };

  const removeExample = (turnaroundId: string, exampleIndex: number) => {
    const updatedSentences = worksheet.sentences.map(s => {
      if (s.id === currentSentenceId) {
        const updatedTurnarounds = s.turnarounds.map(t => {
          if (t.id === turnaroundId) {
            return {
              ...t,
              examples: t.examples.filter((_, i) => i !== exampleIndex),
            };
          }
          return t;
        });
        
        const completed = updatedTurnarounds.filter(t => 
          t.text && t.examples.length >= 1
        ).length;
        
        return {
          ...s,
          turnarounds: updatedTurnarounds,
          completedTurnarounds: completed,
        };
      }
      return s;
    });

    onChange({
      ...worksheet,
      sentences: updatedSentences,
    });
  };

  const removeTurnaround = (turnaroundId: string) => {
    const updatedSentences = worksheet.sentences.map(s => {
      if (s.id === currentSentenceId) {
        const filtered = s.turnarounds.filter(t => t.id !== turnaroundId);
        const completed = filtered.filter(t => t.text && t.examples.length >= 1).length;
        return {
          ...s,
          turnarounds: filtered,
          completedTurnarounds: completed,
        };
      }
      return s;
    });

    onChange({
      ...worksheet,
      sentences: updatedSentences,
    });
  };

  const getTurnaroundsByType = (type: Turnaround['type']) => {
    return currentSentence.turnarounds.filter(t => t.type === type);
  };

  const allTurnaroundsComplete = currentSentence.turnarounds.length >= 3 &&
    currentSentence.turnarounds.every(t => t.text && t.examples.length >= 1);

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="mb-4">{t.inquiry.yourSentences}</h2>
          <div className="space-y-2">
            {worksheet.sentences.map((sentence, index) => (
              <button
                key={sentence.id}
                onClick={() => onSelectSentence(sentence.id)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  sentence.id === currentSentenceId
                    ? 'border-[#0F766E] bg-[#F0FDFA]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs text-gray-500">
                    {t.inquiry.yourSentence.replace(':', '')} {index + 1}
                  </span>
                  <div className="flex gap-1">
                    <Badge variant="outline" className={sentence.completedQuestions === 4 ? 'bg-[#0F766E] text-white' : ''}>
                      {sentence.completedQuestions}/4
                    </Badge>
                    <Badge variant="outline" className={sentence.completedTurnarounds >= 3 ? 'bg-[#FB7185] text-white' : ''}>
                      {sentence.completedTurnarounds}/3
                    </Badge>
                  </div>
                </div>
                <p className="text-sm line-clamp-2">{sentence.text}</p>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl mb-4">{t.turnarounds.title}</h1>
            <div className="bg-[#F0FDFA] border border-[#0F766E]/20 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">{t.inquiry.yourSentence}</p>
              <p className="italic">"{currentSentence.text}"</p>
            </div>
          </div>
        </header>

        <div className="px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {turnaroundTypes.map((typeInfo) => {
              const turnarounds = getTurnaroundsByType(typeInfo.type);
              
              return (
                <div key={typeInfo.type} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-1">{typeInfo.label}</h3>
                      <p className="text-sm text-gray-600">{typeInfo.description}</p>
                      <p className="text-xs text-gray-500 italic mt-1">{typeInfo.example}</p>
                    </div>
                    {turnarounds.length === 0 && (
                      <Button
                        onClick={() => addTurnaround(typeInfo.type)}
                        size="sm"
                        variant="outline"
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        {t.turnarounds.add}
                      </Button>
                    )}
                  </div>

                  {turnarounds.map((turnaround) => (
                    <div key={turnaround.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-4">
                        {editingTurnaround === turnaround.id ? (
                          <>
                            <Textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              placeholder={t.turnarounds.writeTurnaround}
                              className="flex-1 min-h-[60px]"
                              autoFocus
                            />
                            <Button
                              onClick={() => {
                                updateTurnaroundText(turnaround.id, editText);
                                setEditingTurnaround(null);
                              }}
                              size="icon"
                              className="bg-[#0F766E] hover:bg-[#0D6760] flex-shrink-0"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <p className="flex-1 italic">
                              {turnaround.text || (
                                <span className="text-gray-400">{t.turnarounds.noTurnaround}</span>
                              )}
                            </p>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                onClick={() => {
                                  setEditingTurnaround(turnaround.id);
                                  setEditText(turnaround.text);
                                }}
                                size="sm"
                                variant="ghost"
                              >
                                {t.turnarounds.edit}
                              </Button>
                              <Button
                                onClick={() => removeTurnaround(turnaround.id)}
                                size="icon"
                                variant="ghost"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>

                      {turnaround.text && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm mb-3">
                            {t.turnarounds.examples} ({turnaround.examples.length}/3 {t.turnarounds.recommended})
                          </p>
                          
                          <div className="space-y-2 mb-3">
                            {turnaround.examples.map((example, i) => (
                              <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                                <span className="text-xs text-gray-500 mt-1">{i + 1}.</span>
                                <p className="flex-1 text-sm">{example}</p>
                                <button
                                  onClick={() => removeExample(turnaround.id, i)}
                                  className="text-gray-400 hover:text-red-500 flex-shrink-0"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Input
                              value={newExample[turnaround.id] || ''}
                              onChange={(e) => setNewExample({ ...newExample, [turnaround.id]: e.target.value })}
                              placeholder={t.turnarounds.addExample}
                              onKeyDown={(e) => e.key === 'Enter' && addExample(turnaround.id)}
                            />
                            <Button
                              onClick={() => addExample(turnaround.id)}
                              disabled={!newExample[turnaround.id]?.trim()}
                              size="icon"
                              className="bg-[#0F766E] hover:bg-[#0D6760]"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}

            <div className="flex items-center justify-between pt-6">
              <Button
                variant="outline"
                onClick={onBack}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                {t.turnarounds.backToQuestions}
              </Button>

              <Button
                onClick={onComplete}
                className="bg-[#0F766E] hover:bg-[#0D6760] text-white"
              >
                {allTurnaroundsComplete ? t.turnarounds.complete : t.turnarounds.continueLater}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
