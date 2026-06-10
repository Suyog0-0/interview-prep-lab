"use client";

import React, { useEffect, useState } from "react";
import { Printer, AlertTriangle } from "lucide-react";
import { interviewData } from "../data/index";
import type { InterviewQuestion, MCQQuestion } from "../../types";

export default function CheatSheetView() {
  const [hardQA, setHardQA] = useState<InterviewQuestion[]>([]);
  const [wrongMCQs, setWrongMCQs] = useState<MCQQuestion[]>([]);

  useEffect(() => {
    const savedQuiz = localStorage.getItem("quizStates");
    const savedMcq = localStorage.getItem("mcqStates");
    
    const hardIds = new Set<string>();
    const wrongIds = new Set<string>();

    if (savedQuiz) {
      const qStates = JSON.parse(savedQuiz);
      Object.keys(qStates).forEach(id => {
        if (qStates[id].srsStatus === "Hard") {
          hardIds.add(id);
        }
      });
    }

    if (savedMcq) {
      // For MCQs, we don't store whether it's right or wrong directly in mcqStates, 
      // just the selectedIndex. We need to check it against the actual data below.
      const mStates = JSON.parse(savedMcq);
      Object.keys(mStates).forEach(id => {
        if (mStates[id].selectedIndex !== null) {
          wrongIds.add(id); // Temporarily add all answered, we'll filter below
        }
      });
    }

    const qa: InterviewQuestion[] = [];
    const mcqs: MCQQuestion[] = [];

    // Search through all data
    interviewData.forEach(section => {
      section.questions.forEach(q => {
        if (hardIds.has(q.id)) qa.push(q);
      });
      if (section.mcqs) {
        section.mcqs.forEach(m => {
          if (wrongIds.has(m.id)) {
            // Check if they got it wrong
            const mStates = savedMcq ? JSON.parse(savedMcq) : {};
            if (mStates[m.id]?.selectedIndex !== m.correctAnswerIndex) {
              mcqs.push(m);
            }
          }
        });
      }
    });

    setTimeout(() => {
      setHardQA(qa);
      setWrongMCQs(mcqs);
    }, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen p-8 text-black font-serif print:p-0 print:bg-white animate-fade-up">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-8">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Day-Before Cheat Sheet</h1>
            <p className="text-gray-600 italic mt-1">Focusing strictly on your weakest points (Hard Flashcards & Incorrect MCQs)</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="print:hidden flex items-center gap-2 bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition-colors"
          >
            <Printer className="w-5 h-5" /> Print PDF
          </button>
        </div>

        {hardQA.length === 0 && wrongMCQs.length === 0 && (
          <div className="text-center py-20 text-gray-500 flex flex-col items-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold">Nothing to review!</h2>
            <p className="mt-2">Mark flashcards as &apos;Hard&apos; or answer MCQs incorrectly to populate this cheat sheet.</p>
          </div>
        )}

        {/* Hard Q/A Section */}
        {hardQA.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold bg-black text-white inline-block px-4 py-1 mb-6 uppercase tracking-wider">
              Priority Review: Q/A
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {hardQA.map((q, i) => (
                <div key={q.id} className="break-inside-avoid border-l-4 border-black pl-4">
                  <h3 className="font-bold text-lg leading-snug mb-2">{i + 1}. {q.q}</h3>
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{q.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Incorrect MCQs Section */}
        {wrongMCQs.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold bg-black text-white inline-block px-4 py-1 mb-6 uppercase tracking-wider">
              Priority Review: MCQs
            </h2>
            <div className="space-y-6">
              {wrongMCQs.map((q, i) => (
                <div key={q.id} className="break-inside-avoid border border-gray-300 p-4 rounded bg-gray-50">
                  <h3 className="font-bold text-md mb-2">{i + 1}. {q.question}</h3>
                  <div className="bg-green-100 border border-green-400 text-green-900 px-3 py-2 text-sm font-semibold mb-2">
                    ✅ Correct Answer: {q.options[q.correctAnswerIndex]}
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    <span className="font-bold text-black not-italic">Explanation:</span> {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
