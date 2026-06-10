import type { InterviewSection, InterviewQuestion, MCQQuestion, CodingQuestion } from "../../types";

export interface GeneratedExam {
  id: string;
  title: string;
  durationMinutes: number;
  questions: InterviewQuestion[];
  mcqs: MCQQuestion[];
  coding: CodingQuestion[];
}

export function generateExams(data: InterviewSection[]): GeneratedExam[] {
  // Aggregate all questions
  const allQ: InterviewQuestion[] = [];
  const allMCQ: MCQQuestion[] = [];
  const allCoding: CodingQuestion[] = [];

  data.forEach((section) => {
    if (section.questions) allQ.push(...section.questions);
    if (section.mcqs) allMCQ.push(...section.mcqs);
    if (section.codingQuestions) allCoding.push(...section.codingQuestions);
  });



  const exams: GeneratedExam[] = [];
  const numExams = 5;

  // We want 10 QA, 10 MCQ, 5 Coding per exam
  // We'll deterministically select them so they don't change every render
  // by using a pseudo-random seed based on index, or just taking slices since it's generated once per load.
  // Actually, to keep it consistent across re-renders, we should not use random shuffle on every render.
  // Let's just use slices of the arrays.

  for (let i = 0; i < numExams; i++) {
    const qaStart = (i * 10) % allQ.length;
    const mcqStart = (i * 10) % allMCQ.length;
    const codeStart = (i * 5) % allCoding.length;

    const examQ = [];
    for (let j = 0; j < 10; j++) {
      examQ.push(allQ[(qaStart + j) % allQ.length]);
    }

    const examMCQ = [];
    for (let j = 0; j < 10; j++) {
      examMCQ.push(allMCQ[(mcqStart + j) % allMCQ.length]);
    }

    const examCoding = [];
    for (let j = 0; j < 5; j++) {
      if (allCoding.length > 0) {
        examCoding.push(allCoding[(codeStart + j) % allCoding.length]);
      }
    }

    exams.push({
      id: `exam-${i + 1}`,
      title: `Full-Stack Mock Exam ${i + 1}`,
      durationMinutes: 60,
      questions: examQ,
      mcqs: examMCQ,
      coding: examCoding,
    });
  }

  return exams;
}
