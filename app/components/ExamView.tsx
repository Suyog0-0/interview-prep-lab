"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, XCircle, Award } from "lucide-react";
import type { GeneratedExam } from "../data/exams";

export default function ExamView({ exam }: { exam: GeneratedExam }) {
  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [qaScores, setQaScores] = useState<Record<string, number>>({});
  const [codingScores, setCodingScores] = useState<Record<string, number>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) {
      if (!isSubmitted) setIsSubmitted(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleMcqSelect = (id: string, index: number) => {
    if (isSubmitted) return;
    setMcqAnswers((prev) => ({ ...prev, [id]: index }));
  };

  const handleSelfGrade = (id: string, score: number, type: "qa" | "coding") => {
    if (type === "qa") {
      setQaScores((prev) => ({ ...prev, [id]: score }));
    } else {
      setCodingScores((prev) => ({ ...prev, [id]: score }));
    }
  };

  // Calculate final score
  const totalMcqScore = exam.mcqs.reduce((acc, q) => acc + (mcqAnswers[q.id] === q.correctAnswerIndex ? 1 : 0), 0);
  const totalQaScore = Object.values(qaScores).reduce((acc, s) => acc + s, 0);
  const totalCodingScore = Object.values(codingScores).reduce((acc, s) => acc + s, 0);
  const grandTotal = totalMcqScore + totalQaScore + totalCodingScore;
  const maxScore = (exam.mcqs.length * 1) + (exam.questions.length * 2) + (exam.coding.length * 4);
  const percentage = Math.round((grandTotal / maxScore) * 100) || 0;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-zinc-950/80 border border-yellow-500/30 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{exam.title}</h1>
          <p className="text-sm text-zinc-400 mt-1">
            10 QA (2 marks each), 10 MCQs (1 mark each), 5 Coding (4 marks each). Total 50 Marks.
          </p>
        </div>
        <div className={`px-6 py-3 rounded-xl border flex items-center gap-3 font-mono text-2xl font-bold ${isSubmitted ? 'bg-zinc-900 border-zinc-700 text-zinc-400' : timeLeft < 300 ? 'bg-red-500/20 border-red-500/50 text-red-500 animate-pulse' : 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500'}`}>
          <Clock className="w-6 h-6" />
          {formatTime(Math.max(0, timeLeft))}
        </div>
      </div>

      {isSubmitted && (
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-700 text-center">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-2">Exam Completed!</h2>
          <p className="text-zinc-400 mb-6">Here is your final score breakdown:</p>
          <div className="flex justify-center gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold text-emerald-400">{totalMcqScore} / {exam.mcqs.length}</div>
              <div className="text-xs font-mono text-zinc-500 uppercase">MCQ Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">{totalQaScore} / {exam.questions.length * 2}</div>
              <div className="text-xs font-mono text-zinc-500 uppercase">Q/A Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">{totalCodingScore} / {exam.coding.length * 4}</div>
              <div className="text-xs font-mono text-zinc-500 uppercase">Coding Score</div>
            </div>
          </div>
          <div className="inline-block p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-5xl font-black text-white">{percentage}%</div>
            <div className="text-sm text-zinc-400 mt-1">Total: {grandTotal} / {maxScore}</div>
          </div>
        </div>
      )}

      {/* MCQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">Part 1: Multiple Choice (10 Marks)</h2>
        {exam.mcqs.map((q, idx) => (
          <div key={q.id} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <h3 className="text-sm font-semibold text-white mb-4">
              <span className="text-yellow-500 mr-2">{idx + 1}.</span>{q.question}
            </h3>
            <div className="space-y-2">
              {q.options.map((opt, oIdx) => {
                const isSelected = mcqAnswers[q.id] === oIdx;
                const isCorrect = q.correctAnswerIndex === oIdx;
                let bg = "bg-zinc-950 border-zinc-800 text-zinc-300";
                
                if (isSubmitted) {
                  if (isCorrect) bg = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
                  else if (isSelected) bg = "bg-red-500/20 border-red-500/50 text-red-300";
                } else if (isSelected) {
                  bg = "bg-yellow-500/20 border-yellow-500/50 text-yellow-300";
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleMcqSelect(q.id, oIdx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${bg} ${!isSubmitted && 'hover:border-zinc-600'}`}
                  >
                    {String.fromCharCode(65 + oIdx)}. {opt}
                  </button>
                );
              })}
            </div>
            {isSubmitted && (
              <div className="mt-4 p-3 bg-black/30 rounded text-xs text-zinc-400 font-mono">
                <span className="text-zinc-500 font-bold">Explanation: </span>{q.explanation}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Q/A */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">Part 2: Short Answer Q/A (20 Marks)</h2>
        <p className="text-xs text-zinc-500 mb-4 font-mono">Write your answer mentally or on paper. Once submitted, reveal the answer and self-grade.</p>
        {exam.questions.map((q, idx) => (
          <div key={q.id} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <h3 className="text-sm font-semibold text-white mb-4">
              <span className="text-blue-500 mr-2">{idx + 1}.</span>{q.q}
            </h3>
            
            {!isSubmitted ? (
              <textarea 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 outline-none focus:border-yellow-500/50 h-24"
                placeholder="Type your answer here..."
              />
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 font-mono mb-1">CORRECT ANSWER</div>
                  <div className="text-sm text-zinc-300">{q.answer}</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-950/50 rounded-lg">
                  <span className="text-xs text-zinc-400 font-mono">Self-Grade (2 marks):</span>
                  <div className="flex gap-2">
                    {[0, 1, 2].map(score => (
                      <button
                        key={score}
                        onClick={() => handleSelfGrade(q.id, score, "qa")}
                        className={`px-3 py-1 text-xs font-bold rounded transition-all ${qaScores[q.id] === score ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                      >
                        +{score}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Coding */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">Part 3: Coding (20 Marks)</h2>
        <p className="text-xs text-zinc-500 mb-4 font-mono">Write your solution. Once submitted, review and self-grade.</p>
        {exam.coding.map((q, idx) => (
          <div key={q.id} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-purple-500 font-semibold text-sm">{idx + 1}.</span>
              <h3 className="text-lg font-bold text-white">{q.title}</h3>
            </div>
            <div className="text-sm text-zinc-400 mb-4 whitespace-pre-wrap">{q.description}</div>
            
            {!isSubmitted ? (
              <textarea 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 outline-none focus:border-yellow-500/50 font-mono h-48"
                placeholder="// Write your code here..."
              />
            ) : (
              <div className="space-y-4 mt-4 border-t border-zinc-800 pt-4">
                <div className="flex items-center justify-between p-3 bg-zinc-950/50 rounded-lg">
                  <span className="text-xs text-zinc-400 font-mono">Self-Grade (4 marks):</span>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map(score => (
                      <button
                        key={score}
                        onClick={() => handleSelfGrade(q.id, score, "coding")}
                        className={`px-3 py-1 text-xs font-bold rounded transition-all ${codingScores[q.id] === score ? 'bg-purple-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                      >
                        +{score}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {!isSubmitted && (
        <div className="sticky bottom-4 left-0 right-0 p-4 bg-zinc-900/90 backdrop-blur border border-yellow-500/30 rounded-xl flex justify-between items-center shadow-2xl z-50">
          <div className="text-sm text-zinc-400">
            Answered MCQs: <span className="text-white font-bold">{Object.keys(mcqAnswers).length} / {exam.mcqs.length}</span>
          </div>
          <button
            onClick={() => {
              if(confirm("Are you sure you want to submit your exam? You cannot undo this.")) {
                setIsSubmitted(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors"
          >
            Submit Exam
          </button>
        </div>
      )}
    </div>
  );
}
