export interface WorksheetData {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'in-progress' | 'completed';
  
  // The 6 Judge-Your-Neighbor questions (all multiple entries)
  question1: string[]; // Wer ärgert dich und warum?
  question2: string[]; // Wie willst du, dass er/sie sich ändert?
  question3: string[]; // Welchen Rat würdest du ihm/ihr anbieten?
  question4: string[]; // Was brauchst du, dass er/sie denkt, sagt, fühlt oder tut?
  question5: string[]; // Was denkst du über ihn/sie?
  question6: string[]; // Was willst du nie wieder erleben?
  
  // Sentences extracted from the worksheet for inquiry
  sentences: SentenceInquiry[];
}

export interface SentenceInquiry {
  id: string;
  text: string;
  sourceQuestion: number; // Which question (1-6) this came from
  
  // The 4 Questions
  answer1?: string; // Ist das wahr?
  answer2?: string; // Kannst du mit absoluter Sicherheit wissen, dass das wahr ist?
  answer3?: string; // Wie reagierst du, wenn du diesen Gedanken glaubst?
  answer3SubQuestions?: Answer3SubQuestions; // Optional deep-dive questions for answer 3
  answer4?: string; // Wer wärst du ohne den Gedanken?
  answer4SubQuestions?: Answer4SubQuestions; // Optional deep-dive questions for answer 4
  
  // Turnarounds
  turnarounds: Turnaround[];
  
  completedQuestions: number; // 0-4
  completedTurnarounds: number;
}

export interface Answer3SubQuestions {
  // Emotionen & Körper (2)
  emotions?: string;
  bodyLocation?: string;
  
  // Verhalten & Beziehungen (4)
  treatOthers?: string;
  treatSelf?: string;
  whoseBusiness?: string;
  role?: string;
  
  // Muster & Gewohnheiten (3)
  habits?: string;
  images?: string;
  thoughtAge?: string;
  
  // Kosten & Konsequenzen (5)
  cost?: string;
  inability?: string;
  benefitOfHolding?: string;
  wholeLife?: string;
  missing?: string;
  
  // Tiefere Einsicht (4)
  stressOrPeace?: string;
  otherStressfulThoughts?: string;
  pretendNotToKnow?: string;
  heartOpenClose?: string;
  
  // Loslassen & Frieden (2)
  reasonToLetGo?: string;
  peacefulReasonToHold?: string;
}

export interface Answer4SubQuestions {
  breathFeeling?: string;      // Spüre, wie es sich anfühlt, da wo der Atem deinen Körper bewegt
  whoNowMoment?: string;        // Wer oder was bist du jetzt hier in diesem Moment ohne den Gedanken?
  whoInSituation?: string;      // Wer oder was bist du in der gleichen Situation ohne den Gedanken?
  liveDifferently?: string;     // Wie würdest du dein Leben möglicherweise anders leben ohne den Gedanken?
  wholeLife?: string;           // Wie wäre dein ganzes Leben, wenn du diesen Gedanken nicht mehr glauben würdest?
  bodyFeeling?: string;         // Und wie fühlt sich das jetzt in deinem Körper möglicherweise anders an ohne den Gedanken?
}

export interface Turnaround {
  id: string;
  type: 'to-self' | 'to-opposite' | 'to-other';
  text: string;
  examples: string[];
}

export type ViewMode = 
  | 'dashboard' 
  | 'worksheet' 
  | 'select-sentences' 
  | 'inquiry' 
  | 'turnarounds';
