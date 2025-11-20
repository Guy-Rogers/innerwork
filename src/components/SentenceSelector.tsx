import { useState } from 'react';
import { WorksheetData, SentenceInquiry } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useLanguage } from '../lib/language-context';
import { useTranslations } from '../lib/i18n';

interface SentenceSelectorProps {
  worksheet: WorksheetData;
  onChange: (worksheet: WorksheetData) => void;
  onComplete: () => void;
  onBack: () => void;
}

export function SentenceSelector({ worksheet, onChange, onComplete, onBack }: SentenceSelectorProps) {
  const [customSentence, setCustomSentence] = useState('');
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  // Extract suggested sentences from the worksheet
  const getSuggestedSentences = () => {
    const sentences: Array<{ text: string; source: number }> = [];
    
    // All questions are now arrays
    [
      worksheet.question1,
      worksheet.question2,
      worksheet.question3,
      worksheet.question4,
      worksheet.question5,
      worksheet.question6,
    ].forEach((questionArray, questionIndex) => {
      questionArray.forEach(item => {
        if (item.trim().length > 0) {
          sentences.push({ text: item.trim(), source: questionIndex + 1 });
        }
      });
    });
    
    return sentences;
  };

  const suggestedSentences = getSuggestedSentences();
  const existingSentenceTexts = new Set(worksheet.sentences.map(s => s.text));

  const addSentence = (text: string, source: number) => {
    if (existingSentenceTexts.has(text)) return;
    
    const newSentence: SentenceInquiry = {
      id: crypto.randomUUID(),
      text,
      sourceQuestion: source,
      turnarounds: [],
      completedQuestions: 0,
      completedTurnarounds: 0,
    };

    onChange({
      ...worksheet,
      sentences: [...worksheet.sentences, newSentence],
    });
  };

  const removeSentence = (id: string) => {
    onChange({
      ...worksheet,
      sentences: worksheet.sentences.filter(s => s.id !== id),
    });
  };

  const addCustomSentence = () => {
    if (customSentence.trim()) {
      addSentence(customSentence.trim(), 0);
      setCustomSentence('');
    }
  };

  const toggleSentence = (text: string, source: number) => {
    if (existingSentenceTexts.has(text)) {
      const sentence = worksheet.sentences.find(s => s.text === text);
      if (sentence) removeSentence(sentence.id);
    } else {
      addSentence(text, source);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl">{t.sentences.title}</h1>
          <p className="text-sm text-gray-600 mt-1">
            {t.sentences.subtitle}
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Suggested Sentences */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="mb-4">{t.sentences.suggested}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {t.sentences.suggestedDesc}
              </p>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {suggestedSentences.map((sentence, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                  >
                    <Checkbox
                      checked={existingSentenceTexts.has(sentence.text)}
                      onCheckedChange={() => toggleSentence(sentence.text, sentence.source)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="text-sm">{sentence.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {t.sentences.fromQuestion} {sentence.source}
                      </p>
                    </div>
                  </label>
                ))}
                
                {suggestedSentences.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">
                    {t.sentences.noSuggested}
                  </p>
                )}
              </div>
            </div>

            {/* Selected Sentences */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="mb-4">
                {t.sentences.selected} ({worksheet.sentences.length})
              </h2>
              
              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  {t.sentences.addCustom}
                </label>
                <div className="flex gap-2">
                  <Input
                    value={customSentence}
                    onChange={(e) => setCustomSentence(e.target.value)}
                    placeholder={t.sentences.customPlaceholder}
                    onKeyDown={(e) => e.key === 'Enter' && addCustomSentence()}
                  />
                  <Button
                    onClick={addCustomSentence}
                    disabled={!customSentence.trim()}
                    size="icon"
                    className="bg-[#0F766E] hover:bg-[#0D6760]"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {worksheet.sentences.map((sentence) => (
                  <div
                    key={sentence.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-[#F0FDFA] border border-[#0F766E]/20"
                  >
                    <p className="flex-1 text-sm">{sentence.text}</p>
                    <button
                      onClick={() => removeSentence(sentence.id)}
                      className="text-gray-400 hover:text-red-500 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {worksheet.sentences.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">
                    {t.sentences.noneSelected}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={onBack}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {t.sentences.backToWorksheet}
            </Button>

            <Button
              onClick={onComplete}
              disabled={worksheet.sentences.length === 0}
              className="bg-[#0F766E] hover:bg-[#0D6760] text-white gap-2"
            >
              {t.sentences.startInquiry} ({worksheet.sentences.length}{' '}
              {worksheet.sentences.length === 1 ? t.sentences.sentence : t.sentences.sentences})
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
