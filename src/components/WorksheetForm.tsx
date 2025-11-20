import { useState } from 'react';
import { WorksheetData } from '../types';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { ChevronLeft, ChevronRight, Info, Plus, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useLanguage } from '../lib/language-context';
import { useTranslations } from '../lib/i18n';

interface WorksheetFormProps {
  worksheet: WorksheetData;
  onChange: (worksheet: WorksheetData) => void;
  onComplete: () => void;
  onBack: () => void;
}

const questionLabels = ['', 'wollen', 'ratschlaege', 'bedürfnisse', 'klagen', ''] as const;
const multiInputQuestions = [1, 2, 3, 4, 5, 6]; // All questions support multiple inputs

export function WorksheetForm({ worksheet, onChange, onComplete, onBack }: WorksheetFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  const currentQuestionConfig = t.worksheet.questions[currentStep];
  const questionKey = `question${currentStep + 1}` as keyof WorksheetData;
  const isMultiInput = multiInputQuestions.includes(currentStep + 1);
  const labelKey = questionLabels[currentStep];
  const progress = ((currentStep + 1) / t.worksheet.questions.length) * 100;

  const handleMultiChange = (index: number, value: string) => {
    const currentArray = worksheet[questionKey] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    onChange({
      ...worksheet,
      [questionKey]: newArray,
    });
  };

  const handleAddMultiInput = () => {
    const currentArray = worksheet[questionKey] as string[];
    onChange({
      ...worksheet,
      [questionKey]: [...currentArray, ''],
    });
  };

  const handleRemoveMultiInput = (index: number) => {
    const currentArray = worksheet[questionKey] as string[];
    if (currentArray.length > 1) {
      onChange({
        ...worksheet,
        [questionKey]: currentArray.filter((_, i) => i !== index),
      });
    }
  };

  const handleNext = () => {
    if (currentStep < t.worksheet.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const isCurrentStepFilled = () => {
    const array = worksheet[questionKey] as string[];
    return array.length > 0 && array.some(item => item.trim().length > 0);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl">{t.worksheet.title}</h1>
            <span className="text-sm text-gray-500">
              {t.worksheet.step} {currentStep + 1} {t.worksheet.of} {t.worksheet.questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  {labelKey && (
                    <span className="text-xs uppercase tracking-wide text-[#0F766E] mb-2 block">
                      {t.worksheet.labels[labelKey]}
                    </span>
                  )}
                  <h2 className="text-lg">
                    {currentStep + 1}. {currentQuestionConfig.text}
                  </h2>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                        <Info className="w-5 h-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{currentQuestionConfig.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <p className="text-sm text-gray-500 italic mb-4">
                {t.worksheet.example}: {currentQuestionConfig.placeholder}
              </p>
            </div>

            <div className="space-y-3">
              {(worksheet[questionKey] as string[]).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleMultiChange(index, e.target.value)}
                    placeholder={currentQuestionConfig.placeholder}
                    className="flex-1"
                    autoFocus={index === (worksheet[questionKey] as string[]).length - 1}
                  />
                  {(worksheet[questionKey] as string[]).length > 1 && (
                    <Button
                      onClick={() => handleRemoveMultiInput(index)}
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button
                onClick={handleAddMultiInput}
                variant="outline"
                className="w-full gap-2"
              >
                <Plus className="w-4 h-4" />
                {t.worksheet.addAnother}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {currentStep === 0 ? t.worksheet.backToDashboard : t.worksheet.back}
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isCurrentStepFilled()}
              className="bg-[#0F766E] hover:bg-[#0D6760] text-white gap-2"
            >
              {currentStep === t.worksheet.questions.length - 1 ? t.worksheet.continue : t.worksheet.next}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
