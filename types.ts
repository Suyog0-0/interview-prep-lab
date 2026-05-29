export interface InterviewQuestion {
  id: string;
  q: string;       // the question text
  hint: string;    // one-liner memory jog
  answer: string;  // full concise answer
  code?: string;   // optional code example
  language?: string; // "javascript" | "sql" | "bash" | "typescript"
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[]; // exactly 4 options
  correctAnswerIndex: number; // 0 to 3
  explanation: string;
}

export interface NoteSection {
  title: string;
  content: string;
  code?: string;
  language?: string;
  tip?: string;
}

export interface InterviewSection {
  id: number;        // 01–15
  slug: string;      // e.g. "core-programming"
  title: string;     // e.g. "Core Programming"
  subtitle: string;  // e.g. "Loops, Conditionals, Basics"
  color: string;     // Tailwind-compatible hex accent
  questions: InterviewQuestion[];
  mcqs: MCQQuestion[]; // 20 MCQs for the test
  notes?: NoteSection[]; // Learning notes for the module
}
