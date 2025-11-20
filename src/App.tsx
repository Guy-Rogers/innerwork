import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { WorksheetForm } from './components/WorksheetForm';
import { SentenceSelector } from './components/SentenceSelector';
import { InquiryProcess } from './components/InquiryProcess';
import { TurnaroundProcess } from './components/TurnaroundProcess';
import { storage } from './lib/storage';
import { WorksheetData, ViewMode } from './types';
import { LanguageProvider } from './lib/language-context';

function AppContent() {
  const [worksheets, setWorksheets] = useState<WorksheetData[]>([]);
  const [currentWorksheet, setCurrentWorksheet] = useState<WorksheetData | null>(null);
  const [currentSentenceId, setCurrentSentenceId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');

  // Load worksheets from storage on mount
  useEffect(() => {
    setWorksheets(storage.getAll());
  }, []);

  const handleCreateWorksheet = () => {
    const newWorksheet = storage.create();
    setCurrentWorksheet(newWorksheet);
    setViewMode('worksheet');
  };

  const handleSelectWorksheet = (id: string) => {
    const worksheet = storage.getById(id);
    if (worksheet) {
      setCurrentWorksheet(worksheet);
      
      // Determine which view to show based on completion status
      if (worksheet.sentences.length === 0) {
        setViewMode('worksheet');
      } else {
        // Find first incomplete sentence
        const incompleteSentence = worksheet.sentences.find(
          s => s.completedQuestions < 4 || s.completedTurnarounds < 3
        );
        
        if (incompleteSentence) {
          setCurrentSentenceId(incompleteSentence.id);
          if (incompleteSentence.completedQuestions < 4) {
            setViewMode('inquiry');
          } else {
            setViewMode('turnarounds');
          }
        } else {
          setCurrentSentenceId(worksheet.sentences[0]?.id || null);
          setViewMode('turnarounds');
        }
      }
    }
  };

  const handleUpdateWorksheet = (worksheet: WorksheetData) => {
    storage.save(worksheet);
    setCurrentWorksheet(worksheet);
    setWorksheets(storage.getAll());
  };

  const handleWorksheetComplete = () => {
    if (currentWorksheet) {
      setViewMode('select-sentences');
    }
  };

  const handleSentenceSelectionComplete = () => {
    if (currentWorksheet && currentWorksheet.sentences.length > 0) {
      setCurrentSentenceId(currentWorksheet.sentences[0].id);
      setViewMode('inquiry');
    }
  };

  const handleInquiryComplete = () => {
    if (currentWorksheet && currentSentenceId) {
      setViewMode('turnarounds');
    }
  };

  const handleTurnaroundComplete = () => {
    if (!currentWorksheet) return;
    
    // Find next incomplete sentence
    const currentIndex = currentWorksheet.sentences.findIndex(s => s.id === currentSentenceId);
    const nextSentence = currentWorksheet.sentences
      .slice(currentIndex + 1)
      .find(s => s.completedQuestions < 4 || s.completedTurnarounds < 3);
    
    if (nextSentence) {
      setCurrentSentenceId(nextSentence.id);
      if (nextSentence.completedQuestions < 4) {
        setViewMode('inquiry');
      } else {
        setViewMode('turnarounds');
      }
    } else {
      // Mark worksheet as completed
      const updatedWorksheet = { ...currentWorksheet, status: 'completed' as const };
      handleUpdateWorksheet(updatedWorksheet);
      setViewMode('dashboard');
      setCurrentWorksheet(null);
    }
  };

  const handleSelectSentence = (id: string) => {
    setCurrentSentenceId(id);
    const sentence = currentWorksheet?.sentences.find(s => s.id === id);
    if (sentence) {
      if (sentence.completedQuestions < 4) {
        setViewMode('inquiry');
      } else {
        setViewMode('turnarounds');
      }
    }
  };

  const handleBackToDashboard = () => {
    setViewMode('dashboard');
    setCurrentWorksheet(null);
    setCurrentSentenceId(null);
  };

  if (viewMode === 'dashboard') {
    return (
      <Dashboard
        worksheets={worksheets}
        onSelectWorksheet={handleSelectWorksheet}
        onCreateWorksheet={handleCreateWorksheet}
      />
    );
  }

  if (viewMode === 'worksheet' && currentWorksheet) {
    return (
      <WorksheetForm
        worksheet={currentWorksheet}
        onChange={handleUpdateWorksheet}
        onComplete={handleWorksheetComplete}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (viewMode === 'select-sentences' && currentWorksheet) {
    return (
      <SentenceSelector
        worksheet={currentWorksheet}
        onChange={handleUpdateWorksheet}
        onComplete={handleSentenceSelectionComplete}
        onBack={() => setViewMode('worksheet')}
      />
    );
  }

  if (viewMode === 'inquiry' && currentWorksheet && currentSentenceId) {
    return (
      <InquiryProcess
        worksheet={currentWorksheet}
        currentSentenceId={currentSentenceId}
        onChange={handleUpdateWorksheet}
        onComplete={handleInquiryComplete}
        onSelectSentence={handleSelectSentence}
      />
    );
  }

  if (viewMode === 'turnarounds' && currentWorksheet && currentSentenceId) {
    return (
      <TurnaroundProcess
        worksheet={currentWorksheet}
        currentSentenceId={currentSentenceId}
        onChange={handleUpdateWorksheet}
        onBack={() => setViewMode('inquiry')}
        onComplete={handleTurnaroundComplete}
        onSelectSentence={handleSelectSentence}
      />
    );
  }

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
