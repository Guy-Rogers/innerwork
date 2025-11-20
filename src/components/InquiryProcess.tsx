import { useState } from 'react';
import { WorksheetData, SentenceInquiry } from '../types';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { ChevronLeft, ChevronRight, Info, ChevronDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useLanguage } from '../lib/language-context';
import { useTranslations } from '../lib/i18n';

interface InquiryProcessProps {
  worksheet: WorksheetData;
  currentSentenceId: string;
  onChange: (worksheet: WorksheetData) => void;
  onComplete: () => void;
  onSelectSentence: (id: string) => void;
}

export function InquiryProcess({ 
  worksheet, 
  currentSentenceId, 
  onChange, 
  onComplete,
  onSelectSentence 
}: InquiryProcessProps) {
  const currentSentence = worksheet.sentences.find(s => s.id === currentSentenceId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [subQuestionsOpen, setSubQuestionsOpen] = useState(false);
  const [subQuestions4Open, setSubQuestions4Open] = useState(false);
  const { language } = useLanguage();
  const t = useTranslations(language);

  if (!currentSentence) return null;

  // Mapping of category index + question index to field keys
  const subQuestionKeys = [
    ['emotions', 'bodyLocation'],
    ['treatOthers', 'treatSelf', 'whoseBusiness', 'role'],
    ['habits', 'images', 'thoughtAge'],
    ['cost', 'inability', 'benefitOfHolding', 'wholeLife', 'missing'],
    ['stressOrPeace', 'otherStressfulThoughts', 'pretendNotToKnow', 'heartOpenClose'],
    ['reasonToLetGo', 'peacefulReasonToHold'],
  ];

  const questions = [
    { key: 'answer1' as const, number: 1, ...t.inquiry.questions[0] },
    { key: 'answer2' as const, number: 2, ...t.inquiry.questions[1] },
    { key: 'answer3' as const, number: 3, ...t.inquiry.questions[2] },
    { key: 'answer4' as const, number: 4, ...t.inquiry.questions[3] },
  ];

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleChange = (value: string) => {
    const updatedSentences = worksheet.sentences.map(s => {
      if (s.id === currentSentenceId) {
        const updated = { ...s, [question.key]: value };
        // Update completed count
        const completed = [updated.answer1, updated.answer2, updated.answer3, updated.answer4]
          .filter(a => a && a.trim().length > 0).length;
        updated.completedQuestions = completed;
        return updated;
      }
      return s;
    });

    onChange({
      ...worksheet,
      sentences: updatedSentences,
    });
  };

  const handleYesNo = (answer: 'yes' | 'no') => {
    handleChange(answer === 'yes' ? t.inquiry.yes : t.inquiry.no);
    
    // Auto-advance logic
    setTimeout(() => {
      if (answer === 'no' && currentQuestion === 0) {
        // Skip question 2, go to question 3
        setCurrentQuestion(2);
      } else if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete();
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubQuestionChange = (key: string, value: string) => {
    const updatedSentences = worksheet.sentences.map(s => {
      if (s.id === currentSentenceId) {
        return {
          ...s,
          answer3SubQuestions: {
            ...s.answer3SubQuestions,
            [key]: value,
          },
        };
      }
      return s;
    });

    onChange({
      ...worksheet,
      sentences: updatedSentences,
    });
  };

  const handleSubQuestion4Change = (key: string, value: string) => {
    const updatedSentences = worksheet.sentences.map(s => {
      if (s.id === currentSentenceId) {
        return {
          ...s,
          answer4SubQuestions: {
            ...s.answer4SubQuestions,
            [key]: value,
          },
        };
      }
      return s;
    });

    onChange({
      ...worksheet,
      sentences: updatedSentences,
    });
  };

  const countAnsweredSubQuestions = () => {
    if (!currentSentence.answer3SubQuestions) return 0;
    const values = Object.values(currentSentence.answer3SubQuestions);
    return values.filter(v => v && v.trim().length > 0).length;
  };

  const countAnsweredSubQuestions4 = () => {
    if (!currentSentence.answer4SubQuestions) return 0;
    const values = Object.values(currentSentence.answer4SubQuestions);
    return values.filter(v => v && v.trim().length > 0).length;
  };

  const countSubQuestionsInCategory = (categoryIndex: number) => {
    if (!currentSentence.answer3SubQuestions) return 0;
    const keys = subQuestionKeys[categoryIndex];
    const answered = keys.filter(key => {
      const value = currentSentence.answer3SubQuestions?.[key as keyof typeof currentSentence.answer3SubQuestions];
      return value && value.trim().length > 0;
    }).length;
    return answered;
  };

  const currentAnswer = currentSentence[question.key] || '';
  const isQuestion1 = currentQuestion === 0;
  const isQuestion2 = currentQuestion === 1;
  const isQuestion3 = currentQuestion === 2;
  const isQuestion4 = currentQuestion === 3;
  const isYesNoQuestion = isQuestion1 || isQuestion2;
  const isCurrentStepFilled = currentAnswer.trim().length > 0;
  const totalSubQuestions = 20;
  const answeredSubQuestions = countAnsweredSubQuestions();
  const totalSubQuestions4 = 6;
  const answeredSubQuestions4 = countAnsweredSubQuestions4();
  
  // Keys for answer4 sub-questions
  const subQuestion4Keys = ['breathFeeling', 'whoNowMoment', 'whoInSituation', 'liveDifferently', 'wholeLife', 'bodyFeeling'];

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
                  <Badge 
                    variant="outline" 
                    className={sentence.completedQuestions === 4 ? 'bg-[#0F766E] text-white' : ''}
                  >
                    {sentence.completedQuestions}/4
                  </Badge>
                </div>
                <p className="text-sm line-clamp-2">{sentence.text}</p>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl">{t.inquiry.title}</h1>
              <span className="text-sm text-gray-500">
                {t.inquiry.question} {currentQuestion + 1} {t.worksheet.of} {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <div className="bg-[#F0FDFA] border border-[#0F766E]/20 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">{t.inquiry.yourSentence}</p>
              <p className="italic">"{currentSentence.text}"</p>
            </div>
          </div>
        </header>

        <div className="flex-1 px-8 py-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-2xl">
                    {question.number}. {question.text}
                  </h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                          <Info className="w-5 h-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{question.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {isYesNoQuestion ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleYesNo('yes')}
                      className="h-24 text-xl bg-[#0F766E] hover:bg-[#0D6760] text-white"
                    >
                      {t.inquiry.yes}
                    </Button>
                    <Button
                      onClick={() => handleYesNo('no')}
                      className="h-24 text-xl bg-[#FB7185] hover:bg-[#F43F5E] text-white"
                    >
                      {t.inquiry.no}
                    </Button>
                  </div>
                  {currentAnswer && (
                    <div className="text-center text-sm text-gray-600 mt-4">
                      {language === 'de' ? 'Deine Antwort:' : 'Your answer:'} <span className="italic">{currentAnswer}</span>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Textarea
                    value={currentAnswer}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={question.placeholder}
                    className="min-h-[300px] text-base resize-none"
                    autoFocus
                  />
                  
                  {isQuestion3 && (
                    <Collapsible 
                      open={subQuestionsOpen} 
                      onOpenChange={setSubQuestionsOpen}
                      className="mt-6"
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${subQuestionsOpen ? 'rotate-180' : ''}`} />
                              <span className="text-gray-700">
                                {t.inquiry.subQuestions.title} ({t.inquiry.subQuestions.optional})
                              </span>
                            </div>
                            <Badge variant="outline" className="bg-white">
                              {answeredSubQuestions}/{totalSubQuestions} {t.inquiry.subQuestions.answered}
                            </Badge>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="mt-4">
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                          <Accordion type="multiple" className="space-y-2">
                            {t.inquiry.subQuestions.categories.map((category, catIndex) => {
                              const keys = subQuestionKeys[catIndex];
                              const answeredCount = countSubQuestionsInCategory(catIndex);
                              
                              return (
                                <AccordionItem 
                                  key={catIndex} 
                                  value={`category-${catIndex}`}
                                  className="bg-white border border-gray-200 rounded-lg px-4"
                                >
                                  <AccordionTrigger className="hover:no-underline py-4">
                                    <div className="flex items-center justify-between w-full pr-4">
                                      <span className="font-medium text-gray-900">{category.name}</span>
                                      <Badge variant="outline" className={answeredCount === keys.length ? 'bg-[#0F766E] text-white border-[#0F766E]' : ''}>
                                        {answeredCount}/{keys.length}
                                      </Badge>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-4">
                                    <div className="space-y-4 pt-2">
                                      {category.questions.map((questionText, qIndex) => {
                                        const key = keys[qIndex];
                                        const value = currentSentence.answer3SubQuestions?.[key as keyof typeof currentSentence.answer3SubQuestions] || '';
                                        
                                        return (
                                          <div key={qIndex} className="space-y-2">
                                            <label className="text-sm text-gray-700 block">
                                              {questionText}
                                            </label>
                                            <Textarea
                                              value={value}
                                              onChange={(e) => handleSubQuestionChange(key, e.target.value)}
                                              placeholder=""
                                              className="min-h-[80px] text-sm resize-none"
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              );
                            })}
                          </Accordion>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                  
                  {isQuestion4 && question.helperText && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900 italic">
                        {question.helperText}
                      </p>
                    </div>
                  )}
                  
                  {isQuestion4 && (
                    <Collapsible 
                      open={subQuestions4Open} 
                      onOpenChange={setSubQuestions4Open}
                      className="mt-6"
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${subQuestions4Open ? 'rotate-180' : ''}`} />
                              <span className="text-gray-700">
                                {t.inquiry.subQuestions4.title} ({t.inquiry.subQuestions4.optional})
                              </span>
                            </div>
                            <Badge variant="outline" className="bg-white">
                              {answeredSubQuestions4}/{totalSubQuestions4} {t.inquiry.subQuestions4.answered}
                            </Badge>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="mt-4">
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-900 italic">
                              {t.inquiry.subQuestions4.prompt}
                            </p>
                          </div>
                          
                          <div className="space-y-6">
                            {t.inquiry.subQuestions4.questions.map((questionText, qIndex) => {
                              const key = subQuestion4Keys[qIndex];
                              const value = currentSentence.answer4SubQuestions?.[key as keyof typeof currentSentence.answer4SubQuestions] || '';
                              
                              return (
                                <div key={qIndex} className="space-y-2">
                                  <label className="text-sm text-gray-700 block">
                                    <span className="font-medium">{qIndex + 1}.</span> {questionText}
                                  </label>
                                  <Textarea
                                    value={value}
                                    onChange={(e) => handleSubQuestion4Change(key, e.target.value)}
                                    placeholder=""
                                    className="min-h-[80px] text-sm resize-none"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                {t.worksheet.back}
              </Button>

              {!isYesNoQuestion && (
                <Button
                  onClick={handleNext}
                  disabled={!isCurrentStepFilled}
                  className="bg-[#0F766E] hover:bg-[#0D6760] text-white gap-2"
                >
                  {currentQuestion === questions.length - 1 ? t.inquiry.toTurnarounds : t.worksheet.next}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
