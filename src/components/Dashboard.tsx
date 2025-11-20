import { WorksheetData } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Plus, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../lib/language-context';
import { useTranslations } from '../lib/i18n';

interface DashboardProps {
  worksheets: WorksheetData[];
  onSelectWorksheet: (id: string) => void;
  onCreateWorksheet: () => void;
}

export function Dashboard({ worksheets, onSelectWorksheet, onCreateWorksheet }: DashboardProps) {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { language, setLanguage } = useLanguage();
  const t = useTranslations(language);

  const filteredWorksheets = worksheets.filter(w => {
    const matchesFilter = filter === 'all' || w.status === filter;
    const q1Text = Array.isArray(w.question1) ? w.question1.join(' ') : String(w.question1 || '');
    const q5Text = Array.isArray(w.question5) ? w.question5.join(' ') : String(w.question5 || '');
    const matchesSearch = searchQuery === '' || 
      q1Text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q5Text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'de' ? 'de-DE' : 'en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const getFirstSentence = (question1: string | string[]) => {
    const arr = Array.isArray(question1) ? question1 : [question1];
    const text = arr.filter(s => s && s.trim()).join('. ');
    if (!text) return '';
    const firstPart = text.split('.')[0];
    return firstPart.length > 50 ? firstPart.substring(0, 50) + '...' : firstPart;
  };

  const getTurnaroundCount = (worksheet: WorksheetData) => {
    return worksheet.sentences.reduce((sum, s) => sum + s.turnarounds.length, 0);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Modern Header */}
      <header className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                <span className="text-xl">◎</span>
              </div>
              <div>
                <h1 className="text-2xl tracking-tight">The Work</h1>
                <p className="text-sm text-white/80">Byron Katie Inquiry</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 border border-white/20"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm uppercase tracking-wide">{language}</span>
              </button>
              <Button 
                onClick={onCreateWorksheet}
                className="bg-white text-[#0F766E] hover:bg-white/90 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t.dashboard.startNew}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">{t.dashboard.title}</h1>
          <p className="text-gray-600">{t.dashboard.subtitle}</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t.dashboard.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                filter === 'all' 
                  ? 'bg-[#0F766E] text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {t.dashboard.all}
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                filter === 'in-progress' 
                  ? 'bg-[#0F766E] text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {t.dashboard.inProgress}
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                filter === 'completed' 
                  ? 'bg-[#0F766E] text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {t.dashboard.completed}
            </button>
          </div>
        </div>

        {filteredWorksheets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredWorksheets.map((worksheet) => (
              <button
                key={worksheet.id}
                onClick={() => onSelectWorksheet(worksheet.id)}
                className="bg-white text-left p-6 rounded-lg hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#0F766E]/30"
              >
                <h3 className="text-gray-900 mb-3">
                  {getFirstSentence(worksheet.question1) || t.dashboard.untitled}
                </h3>
                
                <Badge 
                  className={`mb-3 ${
                    worksheet.status === 'completed' 
                      ? 'bg-[#0F766E] hover:bg-[#0F766E]' 
                      : 'bg-[#FB7185] hover:bg-[#FB7185]'
                  }`}
                >
                  {worksheet.status === 'completed' ? t.dashboard.completed : t.dashboard.inProgress}
                </Badge>
                
                <div className="text-sm text-gray-500 space-y-1">
                  <p>{t.dashboard.lastUpdated} {formatDate(worksheet.updatedAt)}</p>
                  <p>
                    {worksheet.sentences.reduce((sum, s) => sum + s.completedQuestions, 0)}/
                    {worksheet.sentences.length * 4} {t.dashboard.questionsAnswered}, {getTurnaroundCount(worksheet)}/{worksheet.sentences.length * 3} {t.dashboard.turnarounds}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-white">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0F766E] to-[#14B8A6] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl mb-2">{t.dashboard.emptyTitle}</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {t.dashboard.emptyDescription}
            </p>
            <Button 
              onClick={onCreateWorksheet}
              className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] hover:from-[#0D6760] hover:to-[#12A594] text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t.dashboard.startFirst}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
