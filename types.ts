export interface InterviewQuestion {
  id: string;
  q: string;       // the question text
  hint: string;    // one-liner memory jog
  answer: string;  // full concise answer
  code?: string;   // optional code example
  language?: string; // "javascript" | "sql" | "bash" | "typescript"
  category?: string; // Category for grouping flashcards
  diagram?: string;  // optional ASCII/text diagram
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

export interface CodingQuestion {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  hint: string;
  solution?: string;
}

// ─── Leapfrog Prep Priority System ─────────────────────────────────────────
// Exactly four levels — no "maybe important" or "nice to know" in between.
// VERY_IMPORTANT sections get the strongest coverage and appear first in
// their stack (DSA, then JavaScript); LOW sections are conceptual-only and
// sit at the bottom so they never crowd out core material.
export type Priority = "VERY_IMPORTANT" | "IMPORTANT" | "MEDIUM" | "LOW";

export const PRIORITY_LABEL: Record<Priority, string> = {
  VERY_IMPORTANT: "Very Important",
  IMPORTANT: "Important",
  MEDIUM: "Medium",
  LOW: "Low",
};

// Fixed render order for priority badges / grouped views.
export const PRIORITY_ORDER: Priority[] = [
  "VERY_IMPORTANT",
  "IMPORTANT",
  "MEDIUM",
  "LOW",
];

export interface InterviewSection {
  id: number | string;        // 01–15, or strings for generated/special modules
  slug: string;      // e.g. "core-programming"
  title: string;     // e.g. "Core Programming"
  subtitle: string;  // e.g. "Loops, Conditionals, Basics"
  color: string;     // Tailwind-compatible hex accent
  priority?: Priority; // Leapfrog prep priority — see Priority above
  stack?: "DSA" | "JavaScript" | "React" | "Backend" | "FullStack" | "DevOps" | "HackerRank" | "Revision" | "Other";
  questions: InterviewQuestion[];
  mcqs?: MCQQuestion[]; // 20 MCQs for the test — injected after creation for some modules
  notes?: NoteSection[]; // Learning notes for the module
  codingQuestions?: CodingQuestion[]; // Practical coding questions
}

// ─── Interview Simulation ──────────────────────────────────────────────────

export type SimRound = "technical" | "hr" | "mixed" | "f1soft" | "leapfrog";
export type SimDifficulty = "easy" | "medium" | "hard";
export type SimRating = "got-it" | "partial" | "missed";

export interface SimulationQuestion extends InterviewQuestion {
  category: string;          // e.g. "JavaScript", "Behavioural"
  difficulty: SimDifficulty;
  timeLimit: number;         // seconds per question
  roundType: SimRound[];     // which rounds this question appears in
}