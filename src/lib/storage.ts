import { WorksheetData } from '../types';

const STORAGE_KEY = 'the-work-worksheets';

// Migration helper to convert old format to new format
const migrateWorksheet = (worksheet: any): WorksheetData => {
  return {
    ...worksheet,
    question1: Array.isArray(worksheet.question1) ? worksheet.question1 : [worksheet.question1 || ''],
    question2: Array.isArray(worksheet.question2) ? worksheet.question2 : [worksheet.question2 || ''],
    question3: Array.isArray(worksheet.question3) ? worksheet.question3 : [worksheet.question3 || ''],
    question4: Array.isArray(worksheet.question4) ? worksheet.question4 : [worksheet.question4 || ''],
    question5: Array.isArray(worksheet.question5) ? worksheet.question5 : [worksheet.question5 || ''],
    question6: Array.isArray(worksheet.question6) ? worksheet.question6 : [worksheet.question6 || ''],
  };
};

export const storage = {
  getAll(): WorksheetData[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    const worksheets = data ? JSON.parse(data) : [];
    return worksheets.map(migrateWorksheet);
  },

  getById(id: string): WorksheetData | null {
    const all = this.getAll();
    return all.find(w => w.id === id) || null;
  },

  save(worksheet: WorksheetData): void {
    const all = this.getAll();
    const index = all.findIndex(w => w.id === worksheet.id);
    
    worksheet.updatedAt = new Date().toISOString();
    
    if (index >= 0) {
      all[index] = worksheet;
    } else {
      all.push(worksheet);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  },

  delete(id: string): void {
    const all = this.getAll();
    const filtered = all.filter(w => w.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  create(): WorksheetData {
    return {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'in-progress',
      question1: [''],
      question2: [''],
      question3: [''],
      question4: [''],
      question5: [''],
      question6: [''],
      sentences: [],
    };
  }
};
