"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, CheckCircle, AlertCircle } from "lucide-react";

const BEHAVIORAL_PROMPTS = [
  "Tell me about a time you had a conflict with a teammate. How did you resolve it?",
  "Describe a situation where you had to meet a tight deadline. What steps did you take?",
  "Tell me about a time you failed at a task. What did you learn from it?",
  "Give an example of a time you showed initiative on a project.",
  "Describe a time when you received constructive criticism. How did you handle it?",
];

interface Message {
  role: "system" | "user" | "ai";
  content: string;
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { role: "system", content: "AI Interviewer connected. I will ask you behavioral questions. Please use the STAR method (Situation, Task, Action, Result) in your responses." },
        { role: "ai", content: BEHAVIORAL_PROMPTS[0] }
      ]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const analyzeSTAR = (text: string): string => {
    const t = text.toLowerCase();
    let hasSituation = t.includes("situation") || t.includes("when i") || t.includes("during my time") || t.includes("was working");
    let hasTask = t.includes("task") || t.includes("had to") || t.includes("was responsible for") || t.includes("needed to") || t.includes("goal");
    let hasAction = t.includes("action") || t.includes("i decided") || t.includes("i took") || t.includes("implemented") || t.includes("i initiated") || t.includes("first, i");
    let hasResult = t.includes("result") || t.includes("as a result") || t.includes("outcome") || t.includes("led to") || t.includes("achieved") || t.includes("successfully");

    // Very basic heuristic
    if (t.length < 50) return "Your answer is very short. Please provide a detailed response using the STAR method.";

    let feedback = "### STAR Analysis Feedback:\n\n";
    feedback += hasSituation ? "✅ **Situation:** Good context provided.\n" : "❌ **Situation:** Missing. Start by setting the scene.\n";
    feedback += hasTask ? "✅ **Task:** Clear objective identified.\n" : "❌ **Task:** Missing. What exactly was your responsibility?\n";
    feedback += hasAction ? "✅ **Action:** You explained the steps you took.\n" : "❌ **Action:** Missing. Focus on what *you* did (use 'I', not 'we').\n";
    feedback += hasResult ? "✅ **Result:** You shared the outcome.\n" : "❌ **Result:** Missing. Always end with the positive impact or what you learned.\n";

    let totalScore = [hasSituation, hasTask, hasAction, hasResult].filter(Boolean).length;
    
    if (totalScore === 4) {
      feedback += "\n**Overall:** Excellent response! You hit all points of the STAR method.";
    } else {
      feedback += "\n**Overall:** Good effort, but try to structure your answer more clearly to hit the missing STAR components.";
    }

    return feedback;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    // Simulate AI thinking
    setTimeout(() => {
      const feedback = analyzeSTAR(userMessage);
      setMessages(prev => [...prev, { role: "ai", content: feedback }]);

      // Move to next prompt
      setTimeout(() => {
        const nextIndex = promptIndex + 1;
        if (nextIndex < BEHAVIORAL_PROMPTS.length) {
          setPromptIndex(nextIndex);
          setMessages(prev => [...prev, { role: "ai", content: `**Next Question:**\n${BEHAVIORAL_PROMPTS[nextIndex]}` }]);
        } else {
          setMessages(prev => [...prev, { role: "system", content: "Interview complete. Review your feedback to improve your behavioral responses!" }]);
        }
      }, 1500);

    }, 1000);
  };

  return (
    <div className="flex flex-col h-[600px] bg-zinc-950 border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl animate-fade-up">
      <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center gap-3">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Bot className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-white font-bold">Simulated AI Interviewer</h2>
          <p className="text-xs text-zinc-400 font-mono">STAR Method Evaluator</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'system' ? (
              <div className="w-full text-center text-xs font-mono text-zinc-500 my-2">
                {msg.content}
              </div>
            ) : (
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-orange-500/20 text-orange-400' : 'bg-purple-500/20 text-purple-400'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed ${msg.role === 'user' ? 'bg-orange-600/10 border border-orange-500/20 text-zinc-200 rounded-tr-none' : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-none'}`}>
                  {/* Basic markdown rendering for feedback */}
                  {msg.content.split('\n').map((line, j) => (
                    <span key={j}>
                      {line.includes('**') ? (
                        <span dangerouslySetInnerHTML={{__html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />
                      ) : (
                        line
                      )}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 bg-zinc-900 border-t border-zinc-800">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your response using the STAR method..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-purple-500/50 resize-none h-[80px]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute bottom-3 right-3 p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-[10px] text-zinc-500 text-center mt-2 font-mono">
          Pro tip: Use keywords like "situation", "task", "action", and "result". Press Enter to send, Shift+Enter for new line.
        </div>
      </div>
    </div>
  );
}
