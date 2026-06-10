"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  BookOpen,
  CheckCircle,
  LayoutDashboard,
  Search,
  X,
  ChevronDown,
  Eye,
  EyeOff,
  Lightbulb,
  Trophy,
  Target,
  Zap,
  Code2,
  Brain,
  Mic,
  ChevronRight,
  Timer,
  Star,
  RotateCcw,
  ArrowRight,
  Flame,
  Users,
  Shuffle,
  Building,
  Calendar,
  Link as LinkIcon,
  MessageSquare,
  ExternalLink,
  Minus,
} from "lucide-react";
import { interviewData } from "./data";
import { buildQuestionPool } from "./data/simulation";
import {
  rhythmTips, prepWeeks, priorityProblems, jsTheoryQuestions,
  prepStages, smartQuestions, prepResources,
} from "./data/leapfrog_prep_data";
import type { InterviewSection, InterviewQuestion, MCQQuestion, SimRound, SimRating, SimulationQuestion } from "../types";

type ViewMode = "flashcards" | "mcqs" | "notes" | "simulation";
type SimPhase = "setup" | "interview" | "result";

// ─── Option letter badge ───────────────────────────────────────
const LETTERS = ["A", "B", "C", "D"];

type SidebarSlug = string | { label: string; slugs: string[] };

// ─── Sidebar groups ────────────────────────────────────────────
const SIDEBAR_GROUPS: {
  key: string;
  label: string;
  dot?: string;
  icon?: React.ReactNode;
  slugs: SidebarSlug[];
}[] = [
  {
    key: "fundamentals",
    label: "Fundamentals",
    dot: "#c084fc",
    slugs: ["core-programming", "data-structures", "big-o", "oop", "solid"],
  },
  {
    key: "frontend",
    label: "Frontend",
    dot: "#60a5fa",
    slugs: ["frontend-basics", "javascript", "react", "nextjs"],
  },
  {
    key: "backend",
    label: "Backend & APIs",
    dot: "#34d399",
    slugs: ["rest-soap", "cors", "jwt", "sql", "node"],
  },
  {
    key: "softskills",
    label: "Soft Skills",
    dot: "#fb923c",
    slugs: ["problem-solving"],
  },
  {
    key: "f1soft",
    label: "F1Soft Prep",
    dot: "#ef4444",
    icon: <Building className="w-4 h-4 text-red-500" />,
    slugs: ["f1soft-interview"],
  },
  {
    key: "leapfrog",
    label: "Leapfrog Prep",
    dot: "#3b82f6",
    icon: <Building className="w-4 h-4 text-blue-500" />,
    slugs: [
  {
    label: "Overall Prep Schedule",
    slugs: [
      "leapfrog-overall",
      ...Array.from({ length: 21 }, (_, i) => `leapfrog-overall-day-${i + 1}`)
    ]
  },
  "leapfrog-coding",
  "leapfrog-virtual",
  "leapfrog-onsite",
  "leapfrog-hr",
  "leapfrog-remote",
  "leapfrog-simulation"
],
  }
];

// ─── Copy button ───────────────────────────────────────────────
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        });
      }}
      className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all"
    >
      {copied ? (
        <span className="text-emerald-400 font-mono">Copied!</span>
      ) : (
        <span className="font-mono">Copy</span>
      )}
    </button>
  );
};

// ─── VS-Code style code block ──────────────────────────────────
const syntaxHighlight = (code: string) => {
  if (!code) return "";
  let html = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const regex = /(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(?<string>"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(?<keyword>\b(?:const|let|var|function|return|if|else|switch|case|default|break|continue|while|for|class|extends|new|typeof|null|undefined|true|false|abstract|interface|implements|async|await|try|catch|throw|console|this)\b)|(?<func>\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())|(?<className>\b[A-Z][a-zA-Z0-9_$]*\b)|(?<number>\b\d+\b)/g;

  html = html.replace(regex, (match, ...args) => {
    const groups = args[args.length - 1] as Record<string, string>;
    if (groups.comment) return `<span class="text-[#637777] italic">${groups.comment}</span>`;
    if (groups.string) return `<span class="text-[#addb67]">${groups.string}</span>`;
    if (groups.keyword) return `<span class="text-[#c792ea] italic">${groups.keyword}</span>`;
    if (groups.func) return `<span class="text-[#82aaff]">${groups.func}</span>`;
    if (groups.className) return `<span class="text-[#ffcb6b]">${groups.className}</span>`;
    if (groups.number) return `<span class="text-[#f78c6c]">${groups.number}</span>`;
    return match;
  });

  return html;
};

const CodeBlock = ({ code, language = "javascript" }: { code: string; language?: string }) => {
  const lines = code.trim().split("\n");
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-[#011627] overflow-hidden my-4 font-mono text-[13px] text-[#d6deeb]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#01121f] border-b border-[#0b253a]/80 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#011627]/60 text-[#82aaff] text-[11px]">
          <Code2 className="w-3 h-3" />
          <span>{language}</span>
        </div>
        <CopyButton text={code} />
      </div>
      <div className="flex overflow-x-auto pt-4 pb-4 px-1 leading-relaxed max-h-[420px]">
        <div className="flex flex-col text-right select-none pr-4 pl-3 border-r border-[#0b253a]/50 text-[#3c526d] flex-shrink-0">
          {lines.map((_, idx) => (
            <div key={idx} className="h-5 text-[11px] leading-5">{idx + 1}</div>
          ))}
        </div>
        <pre className="pl-4 pr-6 overflow-visible select-text w-full m-0 bg-transparent border-0 font-mono text-[13px] leading-5 whitespace-pre text-[#d6deeb]">
          <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(code.trim()) }} />
        </pre>
      </div>
    </div>
  );
};

// ─── Diagram Renderer ────────────────────────────────────────
function DiagramRenderer({ diagram }: { diagram: string }) {
  const renderLine = (line: string, lineIdx: number) => {
    const tokens: { text: string; cls: string }[] = [];
    let i = 0;

    while (i < line.length) {
      // [Box label]
      if (line[i] === "[") {
        const end = line.indexOf("]", i);
        if (end !== -1) {
          tokens.push({ text: line.slice(i, end + 1), cls: "text-cyan-300 font-bold" });
          i = end + 1;
          continue;
        }
      }
      // (parenthetical note)
      if (line[i] === "(") {
        const end = line.indexOf(")", i);
        if (end !== -1) {
          tokens.push({ text: line.slice(i, end + 1), cls: "text-amber-300/90 italic" });
          i = end + 1;
          continue;
        }
      }
      // Arrows: <---, --->, <-->, <=, =>
      const arrowRight = line.slice(i).match(/^(=+>|-+>)/);
      const arrowLeft  = line.slice(i).match(/^(<-+|<=+)/);
      const arrowBoth  = line.slice(i).match(/^(<-+>|<=-*>)/);
      const arrowMatch = arrowBoth || arrowRight || arrowLeft;
      if (arrowMatch) {
        tokens.push({ text: arrowMatch[0], cls: "text-orange-400 font-bold" });
        i += arrowMatch[0].length;
        continue;
      }
      // Dashes standalone (connection lines)
      const dashMatch = line.slice(i).match(/^(-{2,})/);
      if (dashMatch) {
        tokens.push({ text: dashMatch[0], cls: "text-zinc-500" });
        i += dashMatch[0].length;
        continue;
      }
      // Equals standalone
      const eqMatch = line.slice(i).match(/^(={2,})/);
      if (eqMatch) {
        tokens.push({ text: eqMatch[0], cls: "text-zinc-600" });
        i += eqMatch[0].length;
        continue;
      }
      // Pipe / caret / v connector
      if (line[i] === "|" || line[i] === "^" || line[i] === "v") {
        tokens.push({ text: line[i], cls: "text-violet-400 font-bold" });
        i++;
        continue;
      }
      // Collect plain text until next special char
      let text = "";
      while (
        i < line.length &&
        line[i] !== "[" &&
        line[i] !== "(" &&
        line[i] !== "|" &&
        line[i] !== "^" &&
        !(line[i] === "-" && line[i + 1] === "-") &&
        !(line[i] === "=" && line[i + 1] === "=") &&
        !(line[i] === "<" && (line[i + 1] === "-" || line[i + 1] === "="))
      ) {
        // stop at `v` only if isolated (surrounded by spaces or start/end)
        if (line[i] === "v" && (i === 0 || line[i - 1] === " ") && (i === line.length - 1 || line[i + 1] === " " || line[i + 1] === "\n")) break;
        text += line[i];
        i++;
      }
      if (text) {
        // Highlight ALL-CAPS labels differently
        if (/^[A-Z][A-Z\s/\\&]+$/.test(text.trim()) && text.trim().length > 1) {
          tokens.push({ text, cls: "text-emerald-400/80 font-semibold" });
        } else {
          tokens.push({ text, cls: "text-zinc-300" });
        }
      }
    }

    return (
      <div key={lineIdx} className="leading-7 whitespace-pre">
        {tokens.map((tok, ti) => (
          <span key={ti} className={tok.cls}>{tok.text}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-violet-500/20 bg-[#06060f] shadow-[0_0_40px_rgba(139,92,246,0.07)]">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-violet-500/5 border-b border-violet-500/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-violet-400/60">Flow Diagram</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" /><span className="text-[9px] font-mono text-zinc-600">[  ] = Node</span>
          <span className="ml-2 text-orange-400/60 text-[10px] font-mono">→</span><span className="text-[9px] font-mono text-zinc-600">Flow</span>
          <span className="ml-2 text-violet-400/60 font-bold text-[10px] font-mono">|</span><span className="text-[9px] font-mono text-zinc-600">Link</span>
        </div>
      </div>
      {/* Grid background + content */}
      <div
        className="relative p-5 overflow-x-auto"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(139,92,246,0.06) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="font-mono text-[13px] min-w-max">
          {diagram.split("\n").map(renderLine)}
        </div>
      </div>
      {/* Legend row */}
      <div className="px-4 py-2 border-t border-violet-500/10 bg-zinc-950/60 flex items-center gap-4 flex-wrap">
        {[
          { dot: "bg-cyan-400",   label: "Nodes / Boxes" },
          { dot: "bg-orange-400", label: "Arrows / Flow" },
          { dot: "bg-violet-400", label: "Connectors" },
          { dot: "bg-amber-400",  label: "Notes" },
        ].map(({ dot, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${dot}/70`} />
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section stats helper ──────────────────────────────────────
function getSectionStats(
  sec: InterviewSection,
  quizStates: Record<string, { showAnswer: boolean }>,
  mcqStates: Record<string, { selectedIndex: number | null }>
) {
  const fcDone = sec.questions.filter((q) => quizStates[q.id]?.showAnswer).length;
  const mcqDone = (sec.mcqs ?? []).filter(
    (m) => mcqStates[m.id]?.selectedIndex !== null && mcqStates[m.id]?.selectedIndex !== undefined
  ).length;
  const mcqCorrect = (sec.mcqs ?? []).filter(
    (m) => mcqStates[m.id]?.selectedIndex === m.correctAnswerIndex
  ).length;
  return {
    fcDone,
    fcTotal: sec.questions.length,
    mcqDone,
    mcqCorrect,
    mcqTotal: sec.mcqs?.length ?? 0,
  };
}

const renderMarkdown = (text: string) => {
  if (!text) return "";
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white tracking-wide">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      const codeText = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-[#01121f] border border-[#0b253a]/80 text-[#addb67] font-mono text-[13px] tracking-tight shadow-sm inline-block"
        >
          {codeText}
        </code>
      );
    }
    return part;
  });
};

// ── Timer Ring SVG ──────────────────────────────────────────────
function TimerRing({ timeLeft, totalTime }: { timeLeft: number; totalTime: number }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.max(0, timeLeft / totalTime);
  const offset = circumference * (1 - fraction);
  const color = fraction > 0.5 ? "#4ade80" : fraction > 0.25 ? "#fbbf24" : "#f87171";

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 100 100">
        <circle className="sim-timer-ring-track" cx="50" cy="50" r={radius} />
        <circle
          className="sim-timer-ring-fill"
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold font-mono" style={{ color }}>
          {timeLeft}
        </span>
        <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-wider">sec</span>
      </div>
    </div>
  );
}

// ── Interview Simulation View ───────────────────────────────────
function SimulationView({ onExit, initialRound }: { onExit: () => void; initialRound?: SimRound }) {
  const [phase, setPhase] = useState<SimPhase>("setup");
  const [round, setRound] = useState<SimRound>(initialRound || "mixed");
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState<SimulationQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showIdeal, setShowIdeal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [ratings, setRatings] = useState<Record<string, SimRating>>({});
  const [slideKey, setSlideKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQ = questions[currentIndex];

  const startInterview = useCallback((selectedRound: SimRound) => {
    const pool = buildQuestionPool(selectedRound, questionCount);
    setQuestions(pool);
    setRound(selectedRound);
    setCurrentIndex(0);
    setRatings({});
    setUserAnswer("");
    setShowIdeal(false);
    setTimeLeft(pool[0]?.timeLimit ?? 120);
    setPhase("interview");
    setSlideKey(0);
  }, [questionCount]);

  // Auto-start if initialRound is provided
  useEffect(() => {
    if (initialRound && phase === "setup" && questions.length === 0) {
      startInterview(initialRound);
    }
  }, [initialRound, phase, questions.length, startInterview]);

  // Timer tick
  useEffect(() => {
    if (phase !== "interview" || showIdeal) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setShowIdeal(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentIndex, showIdeal]);

  const handleSubmitAnswer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setShowIdeal(true);
  };

  const handleRate = (rating: SimRating) => {
    setRatings((prev) => ({ ...prev, [currentQ.id]: rating }));
    const next = currentIndex + 1;
    if (next >= questions.length) {
      setPhase("result");
    } else {
      setCurrentIndex(next);
      setUserAnswer("");
      setShowIdeal(false);
      setTimeLeft(questions[next].timeLimit);
      setSlideKey((k) => k + 1);
    }
  };

  const gotItCount  = Object.values(ratings).filter((r) => r === "got-it").length;
  const partialCount = Object.values(ratings).filter((r) => r === "partial").length;
  const missedCount  = Object.values(ratings).filter((r) => r === "missed").length;
  const totalRated   = gotItCount + partialCount + missedCount;
  const score = totalRated > 0 ? Math.round(((gotItCount + partialCount * 0.5) / totalRated) * 100) : 0;

  const ROUNDS = [
    {
      id: "technical" as SimRound,
      icon: <Code2 className="w-6 h-6" />,
      label: "Technical Round",
      sub: "JS, React, SQL, APIs, Algorithms",
      color: "#60a5fa",
      glow: "rgba(96,165,250,0.12)",
    },
    {
      id: "hr" as SimRound,
      icon: <Users className="w-6 h-6" />,
      label: "HR / Behavioural",
      sub: "Tell me about yourself, STAR stories",
      color: "#fb923c",
      glow: "rgba(251,146,60,0.12)",
    },
    {
      id: "mixed" as SimRound,
      icon: <Shuffle className="w-6 h-6" />,
      label: "Mixed Blitz",
      sub: "Random questions from all categories",
      color: "#c084fc",
      glow: "rgba(192,132,252,0.12)",
    },
    {
      id: "f1soft" as SimRound,
      icon: <Brain className="w-6 h-6" />,
      label: "F1Soft Mock Interview",
      sub: "Questions directly from F1Soft prep",
      color: "#ef4444",
      glow: "rgba(239,68,68,0.12)",
    },
  ];

  // ── SETUP PHASE ────────────────────────────────────────────────
  if (phase === "setup") {
    return (
      <section className="animate-fade-up max-w-4xl pb-24">
        <div className="breadcrumb mb-2">Interview Prep Lab / Simulation</div>
        <div className="mb-8 p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-[220px] h-[220px] bg-violet-500/5 blur-[80px] pointer-events-none" />
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Mic className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-mono text-violet-400 uppercase tracking-widest">Interview Simulation</div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Mock Interview Round
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed mt-2 max-w-lg">
            Questions appear one-by-one with a countdown timer. Type your answer, submit it, then see
            the ideal response and rate yourself honestly.
          </p>
        </div>

        {/* Round selector */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-zinc-300 mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-orange-400" /> Choose a Round
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ROUNDS.map((r) => (
              <button
                key={r.id}
                onClick={() => startInterview(r.id)}
                className="sim-round-card text-left group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border transition-all"
                  style={{
                    background: r.glow,
                    borderColor: r.color + "33",
                    color: r.color,
                  }}
                >
                  {r.icon}
                </div>
                <div className="text-[15px] font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                  {r.label}
                </div>
                <div className="text-[11px] text-zinc-500 font-mono leading-relaxed">{r.sub}</div>
                <div className="mt-4 flex items-center gap-1 text-[11px] font-mono" style={{ color: r.color }}>
                  Start <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Question count */}
        <div className="p-5 rounded-xl bg-zinc-950/60 border border-zinc-900">
          <div className="text-sm font-bold text-zinc-300 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-400" /> Questions per session
          </div>
          <div className="flex flex-wrap gap-3">
            {[5, 10, 15, 20].map((n) => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className={`px-5 py-2.5 rounded-lg border text-sm font-mono font-bold transition-all ${
                  questionCount === n
                    ? "bg-orange-500/15 border-orange-500/40 text-orange-400"
                    : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                {n} Qs
              </button>
            ))}
          </div>
          <p className="text-[11px] text-zinc-600 font-mono mt-2">
            ~{Math.round(questionCount * 2)} min estimated duration
          </p>
        </div>
      </section>
    );
  }

  // ── RESULT PHASE ───────────────────────────────────────────────
  if (phase === "result") {
    const grade =
      score >= 80 ? { label: "Excellent!", color: "#4ade80", icon: <Trophy className="w-12 h-12" /> } :
      score >= 60 ? { label: "Good job!", color: "#fbbf24", icon: <Star className="w-12 h-12" /> } :
      score >= 40 ? { label: "Keep going!", color: "#fb923c", icon: <Flame className="w-12 h-12" /> } :
      { label: "More practice needed", color: "#f87171", icon: <BookOpen className="w-12 h-12" /> };

    return (
      <section className="animate-fade-up max-w-3xl pb-24">
        <div className="breadcrumb mb-2">Interview Prep Lab / Simulation / Results</div>

        {/* Score hero */}
        <div className="mb-6 p-8 rounded-2xl bg-zinc-950/60 border border-zinc-900 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
          <div className="mb-3 flex justify-center" style={{ color: grade.color }}>{grade.icon}</div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
            Round Complete — {round.toUpperCase()}
          </div>
          <div className="text-5xl font-extrabold text-white mb-1">
            <span style={{ color: grade.color }}>{score}</span>
            <span className="text-zinc-600 text-2xl">%</span>
          </div>
          <div className="text-sm font-bold" style={{ color: grade.color }}>{grade.label}</div>
          <div className="mt-4 w-full h-2 bg-zinc-900 rounded-full overflow-hidden max-w-xs mx-auto">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${score}%`, background: `linear-gradient(90deg, ${grade.color}, ${grade.color}aa)` }}
            />
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Got It", count: gotItCount, css: "sim-score-got", color: "#4ade80", icon: <CheckCircle className="w-5 h-5 mx-auto mb-1" /> },
            { label: "Partial", count: partialCount, css: "sim-score-part", color: "#fbbf24", icon: <Minus className="w-5 h-5 mx-auto mb-1" /> },
            { label: "Missed", count: missedCount, css: "sim-score-miss", color: "#f87171", icon: <X className="w-5 h-5 mx-auto mb-1" /> },
          ].map((s) => (
            <div key={s.label} className={`p-5 rounded-xl text-center ${s.css}`}>
              <div style={{ color: s.color }}>{s.icon}</div>
              <div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.count}</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Per-question review */}
        <div className="space-y-3 mb-8">
          <h2 className="text-sm font-bold text-zinc-300 flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-orange-400" /> Question Review
          </h2>
          {questions.map((q, i) => {
            const r = ratings[q.id];
            const rColor = r === "got-it" ? "#4ade80" : r === "partial" ? "#fbbf24" : "#f87171";
            const rLabel = r === "got-it" ? "Got It" : r === "partial" ? "Partial" : r === "missed" ? "Missed" : "Skipped";
            return (
              <div key={q.id} className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-900 flex gap-4">
                <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs text-zinc-500 shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-zinc-200 font-medium leading-snug mb-1 truncate">{q.q}</p>
                  <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded diff-${q.difficulty}`}>
                    {q.difficulty}
                  </span>
                  <span className="text-[9px] text-zinc-600 font-mono ml-2">{q.category}</span>
                </div>
                <div className="text-[11px] font-mono font-bold shrink-0" style={{ color: rColor }}>
                  {rLabel}
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setQuestions([]);
              setPhase("setup");
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Try Another Round
          </button>
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-bold hover:bg-zinc-800 active:scale-95 transition-all"
          >
            Back to Modules
          </button>
        </div>
      </section>
    );
  }

  // ── INTERVIEW PHASE ────────────────────────────────────────────
  if (!currentQ) return null;

  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <section className="max-w-3xl pb-24">
      {/* Progress bar + header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="breadcrumb">Simulation / Question {currentIndex + 1} of {questions.length}</div>
          <button
            onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setPhase("setup"); }}
            className="text-[11px] font-mono text-zinc-600 hover:text-zinc-400 flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" /> Exit
          </button>
        </div>
        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #ff6b2b, #ffaa44)" }}
          />
        </div>
      </div>

      <div key={slideKey} className="sim-slide-in">
        {/* Question card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-zinc-800 mb-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/3 to-transparent pointer-events-none" />

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded diff-${currentQ.difficulty}`}>
              {currentQ.difficulty}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
              {currentQ.category}
            </span>
            <span className="text-[10px] font-mono text-zinc-600 flex items-center gap-1">
              <Timer className="w-3 h-3" /> {currentQ.timeLimit}s
            </span>
          </div>

          {/* Question + Timer */}
          <div className="flex items-start gap-5">
            <div className="flex-1">
              <h2 className="text-[19px] sm:text-[22px] font-bold text-white leading-snug tracking-tight">
                {currentQ.q}
              </h2>
              {!showIdeal && (
                <p className="text-[11px] text-zinc-600 font-mono mt-3 italic flex items-center">
                  <Lightbulb className="w-3 h-3 text-yellow-500 mr-1" /> Hint: {currentQ.hint}
                </p>
              )}
            </div>
            {!showIdeal && (
              <div className="shrink-0">
                <TimerRing timeLeft={timeLeft} totalTime={currentQ.timeLimit} />
              </div>
            )}
          </div>
        </div>

        {/* Answer area (only when not yet submitted) */}
        {!showIdeal && (
          <div className="mb-5">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2 block">
              Your Answer
            </label>
            <textarea
              className="sim-answer-textarea"
              placeholder="Type your answer here... Don't worry about being perfect — this is practice."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button
              onClick={handleSubmitAnswer}
              className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 active:scale-[0.99] transition-all"
            >
              <Eye className="w-4 h-4" /> Submit & Reveal Ideal Answer
            </button>
          </div>
        )}

        {/* Ideal answer reveal */}
        {showIdeal && (
          <div className="animate-fade-up space-y-5">
            {/* User's answer recap */}
            {userAnswer.trim() && (
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5">
                  <EyeOff className="w-3 h-3" /> Your Answer
                </div>
                <p className="text-zinc-300 text-[13px] leading-relaxed whitespace-pre-wrap">{userAnswer}</p>
              </div>
            )}

            {/* Ideal answer */}
            <div className="p-5 rounded-xl border border-orange-500/20 bg-gradient-to-b from-orange-500/5 to-transparent">
              <div className="text-[10px] font-mono uppercase tracking-widest text-orange-400 mb-3 flex items-center gap-1.5">
                <Star className="w-3 h-3" /> Ideal Answer
              </div>
              <p className="text-zinc-200 text-[14.5px] leading-relaxed whitespace-pre-wrap">{currentQ.answer}</p>
              {currentQ.code && (
                <div className="mt-4">
                  <CodeBlock code={currentQ.code} language={currentQ.language ?? "javascript"} />
                </div>
              )}
            </div>

            {/* Self-rating */}
            <div>
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-3 text-center">
                How did you do?
              </div>
              <div className="flex gap-3">
                <button className="sim-rating-btn got-it" onClick={() => handleRate("got-it")}>
                  <CheckCircle className="w-5 h-5" />
                  <span>Got It</span>
                </button>
                <button className="sim-rating-btn partial" onClick={() => handleRate("partial")}>
                  <Minus className="w-5 h-5" />
                  <span>Partial</span>
                </button>
                <button className="sim-rating-btn missed" onClick={() => handleRate("missed")}>
                  <X className="w-5 h-5" />
                  <span>Missed</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
function LeapfrogOverallPrepView() {
  return (
    <div className="space-y-12 animate-fade-up max-w-5xl mx-auto pb-32">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Leapfrog Interview Prep Schedule
        </h1>
        <p className="text-lg text-zinc-400 font-mono">3-Week Intensive Plan</p>
      </div>

      {/* Rhythm Tips */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" /> Daily Rhythm Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rhythmTips.map(tip => (
            <div key={tip.num} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-all">
              <div className="text-amber-500 font-mono text-xs font-bold mb-2">TIP {tip.num}</div>
              <h3 className="text-zinc-200 font-bold mb-2">{tip.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Week Schedule */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" /> The 3-Week Schedule
        </h2>
        {prepWeeks.map(week => (
          <div key={week.weekNum} className="space-y-6">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <h3 className="text-xl font-bold text-blue-400">Week {week.weekNum} <span className="text-zinc-500 text-sm ml-2 font-mono">{week.dates}</span></h3>
              <p className="text-blue-300 mt-1">{week.focus}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-0 md:pl-4">
              {week.days.map(day => (
                <div key={day.dayNum} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all">
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-800/50">
                    <span className="text-white font-bold">{day.label}</span>
                    <span className="text-xs font-mono px-2 py-1 bg-zinc-800 text-zinc-400 rounded">Day {day.dayNum}</span>
                  </div>
                  <div className="text-sm text-blue-400 font-medium mb-4">{day.topic}</div>
                  <div className="space-y-3">
                    {day.blocks.map((block, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-zinc-500 font-mono whitespace-nowrap w-24 flex-shrink-0">{block.time}</span>
                        <span className="text-zinc-300 leading-relaxed">{block.task} <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 font-mono uppercase">{block.tag}</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Priority Problems & Theory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" /> Top 15 Priority Problems
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            {priorityProblems.map(p => (
              <div key={p.num} className="flex items-center justify-between p-3 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors last:border-0">
                <span className="text-zinc-300 text-sm"><span className="text-zinc-500 font-mono w-6 inline-block">{p.num}.</span> {p.problem}</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-zinc-950 text-zinc-500">{p.platform}</span>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" /> JS Theory Questions
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden p-2">
            {jsTheoryQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-3 p-2 hover:bg-zinc-800/30 rounded transition-colors">
                <div className="w-5 h-5 rounded bg-purple-500/10 text-purple-400 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5">{i+1}</div>
                <span className="text-zinc-300 text-sm leading-relaxed">{q}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Stages & Questions */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-rose-400" /> Interview Prep Stages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prepStages.map(stage => (
            <div key={stage.num} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
              <div className="text-rose-500 font-mono text-xs font-bold mb-2 uppercase tracking-wider">Stage {stage.num}</div>
              <h3 className="text-white font-bold mb-4">{stage.title}</h3>
              <ul className="space-y-2">
                {stage.bullets.map((b, i) => (
                  <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                    <span className="text-rose-500/50 mt-1">•</span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Resources & Smart Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" /> Questions for Leapfrog
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
            {smartQuestions.map((q, i) => (
              <div key={i} className="text-sm text-zinc-300 bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                {q}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-teal-400" /> Resources
          </h2>
          <div className="space-y-3">
            {prepResources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-teal-500/30 transition-all group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium group-hover:text-teal-400 transition-colors">{r.title}</span>
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-teal-400 transition-colors" />
                </div>
                <div className="text-xs text-zinc-500">{r.description}</div>
              </a>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}
// ══════════════════════════════════════════════════════════════

export default function Home() {
  // -1 = interview simulation, 0 = dashboard, >0 = module section
  const [activeSectionId, setActiveSectionId] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>("flashcards");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [quizStates, setQuizStates] = useState<Record<string, { showAnswer: boolean; showHint?: boolean }>>({});
  const [mcqStates, setMcqStates] = useState<Record<string, { selectedIndex: number | null }>>({});
  const [activeF1SoftCategory, setActiveF1SoftCategory] = useState<string>("JS Core");

  // Sidebar accordion state — one entry per group key
  const [sidebarCollapsed, setSidebarCollapsed] = useState<Record<string, boolean>>({
    fundamentals: false,
    frontend: false,
    backend: false,
    softskills: false,
    f1soft: false,
  });

  const toggleGroup = (key: string) =>
    setSidebarCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  // ── Totals ─────────────────────────────────────────────────
  const totalFlashcards = useMemo(
    () => interviewData.reduce((a, s) => a + s.questions.length, 0),
    []
  );
  const totalMCQs = useMemo(
    () => interviewData.reduce((a, s) => a + (s.mcqs?.length ?? 0), 0),
    []
  );
  const completedFlashcards = useMemo(
    () => Object.values(quizStates).filter((q) => q.showAnswer).length,
    [quizStates]
  );
  const completedMCQs = useMemo(
    () => Object.values(mcqStates).filter((m) => m.selectedIndex !== null && m.selectedIndex !== undefined).length,
    [mcqStates]
  );
  const correctMCQs = useMemo(() => {
    let count = 0;
    interviewData.forEach((sec) => {
      sec.mcqs?.forEach((m) => {
        if (mcqStates[m.id]?.selectedIndex === m.correctAnswerIndex) count++;
      });
    });
    return count;
  }, [mcqStates]);

  const fcProgress = totalFlashcards > 0 ? Math.round((completedFlashcards / totalFlashcards) * 100) : 0;
  const mcqProgress = totalMCQs > 0 ? Math.round((completedMCQs / totalMCQs) * 100) : 0;

  // ── Navigation ─────────────────────────────────────────────
  const handleNav = (id: number, mode?: ViewMode) => {
    setActiveSectionId(id);
    if (mode) setViewMode(mode);
    setMobileMenuOpen(false);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeSection = interviewData.find((s) => s.id === activeSectionId);

  // ── State toggles ──────────────────────────────────────────
  const toggleFlashcard = (id: string) =>
    setQuizStates((prev) => ({ ...prev, [id]: { ...prev[id], showAnswer: !prev[id]?.showAnswer } }));

  const toggleHint = (id: string) =>
    setQuizStates((prev) => ({ ...prev, [id]: { ...prev[id], showHint: !prev[id]?.showHint } }));

  const selectMCQ = (qId: string, idx: number) => {
    if (mcqStates[qId]?.selectedIndex !== null && mcqStates[qId]?.selectedIndex !== undefined) return;
    setMcqStates((prev) => ({ ...prev, [qId]: { selectedIndex: idx } }));
  };

  // ── Search ─────────────────────────────────────────────────
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    const results: { type: "flashcard" | "mcq"; section: InterviewSection; item: InterviewQuestion | MCQQuestion }[] = [];
    interviewData.forEach((sec) => {
      sec.questions.forEach((fq) => {
        if (fq.q.toLowerCase().includes(q) || fq.answer.toLowerCase().includes(q) || fq.hint.toLowerCase().includes(q))
          results.push({ type: "flashcard", section: sec, item: fq });
      });
      sec.mcqs?.forEach((mq) => {
        if (mq.question.toLowerCase().includes(q) || mq.explanation.toLowerCase().includes(q))
          results.push({ type: "mcq", section: sec, item: mq });
      });
    });
    return results;
  }, [searchQuery]);

  // ── Sidebar group render helper ────────────────────────────
  const renderSidebarGroup = (group: typeof SIDEBAR_GROUPS[0]) => {
    const isOpen = !sidebarCollapsed[group.key];

    return (
      <div key={group.key} className="pt-1.5">
        <button
          onClick={() => toggleGroup(group.key)}
          className="sidebar-group-header"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2">
            {group.icon ? (
              group.icon
            ) : (
              <div className="sidebar-group-dot" style={{ background: group.dot }} />
            )}
            <span className={group.icon ? "text-emerald-400 font-bold tracking-wide" : ""}>{group.label}</span>
          </div>
          <ChevronDown
            className="w-3.5 h-3.5 transition-transform duration-200"
            style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
          />
        </button>

        {isOpen && (
          <div className="nav-group-children space-y-0.5 mt-1">
            {group.slugs.map((slugItem, idx) => {
              if (typeof slugItem === "string") {
                const sec = interviewData.find(s => s.slug === slugItem);
                if (!sec) return null;
                const isActive = activeSectionId === sec.id && !searchQuery;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleNav(sec.id)}
                    className={`w-full text-left px-3 py-1.5 rounded text-[12.5px] transition-all flex items-center gap-2 group/item ${
                      isActive
                        ? "text-orange-400 font-semibold bg-zinc-900/80"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/30"
                    }`}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0 transition-all"
                      style={{
                        background: isActive ? group.dot : "#3f3f46",
                        boxShadow: isActive ? `0 0 6px ${group.dot}` : "none",
                      }}
                    />
                    <span className="truncate">{sec.title}</span>
                  </button>
                );
              } else {
                const nestedKey = `${group.key}-nested-${idx}`;
                const nestedIsOpen = !sidebarCollapsed[nestedKey];
                return (
                  <div key={nestedKey} className="pt-1 pb-1">
                    <button
                      onClick={() => toggleGroup(nestedKey)}
                      className="w-full text-left px-3 py-1.5 rounded flex items-center justify-between group/nested hover:bg-zinc-900/50 transition-colors"
                      aria-expanded={nestedIsOpen}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                        <span className="text-[12px] font-semibold text-zinc-400 group-hover/nested:text-zinc-300">{slugItem.label}</span>
                      </div>
                      <ChevronDown
                        className="w-3 h-3 text-zinc-500 transition-transform duration-200"
                        style={{ transform: nestedIsOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
                      />
                    </button>
                    {nestedIsOpen && (
                      <div className="pl-4 mt-0.5 space-y-0.5 border-l border-zinc-800/30 ml-3.5">
                        {slugItem.slugs.map(subSlug => {
                          const sec = interviewData.find(s => s.slug === subSlug);
                          if (!sec) return null;
                          const isActive = activeSectionId === sec.id && !searchQuery;
                          return (
                            <button
                              key={sec.id}
                              onClick={() => handleNav(sec.id)}
                              className={`w-full text-left px-3 py-1.5 rounded text-[11.5px] transition-all flex items-center gap-2 ${
                                isActive
                                  ? "text-orange-400 font-semibold bg-zinc-900/80"
                                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
                              }`}
                            >
                              <span className="truncate">{sec.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] font-sans flex flex-col selection:bg-orange-500/20 selection:text-orange-400">

      {/* SCANLINE OVERLAY */}
      <div className="fixed inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.08)_2px,rgba(0,0,0,0.08)_4px)] pointer-events-none z-50 opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-[350px] bg-gradient-to-b from-orange-950/10 via-transparent to-transparent pointer-events-none z-0" />

      {/* ── MOBILE HEADER ─────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between lg:hidden">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav(0)}>
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="sidebar-logo text-lg text-white font-extrabold tracking-wider">PREP LAB</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
        >
          {mobileMenuOpen
            ? <X className="w-5 h-5" />
            : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          }
        </button>
      </header>

      <div className="flex flex-1 w-full max-w-[1600px] mx-auto relative z-10">

        {/* ── SIDEBAR ───────────────────────────────────────── */}
        <aside className={"fixed inset-y-0 left-0 z-40 w-[290px] bg-[#0d0d0d] border-r border-zinc-800/80 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out transform lg:sticky lg:translate-x-0 lg:h-screen lg:top-0 " + (mobileMenuOpen ? "translate-x-0" : "-translate-x-full")}>
          <div className="flex flex-col flex-1 overflow-y-auto pr-1">

            {/* Logo */}
            <div className="hidden lg:flex items-center gap-2 mb-6 cursor-pointer" onClick={() => handleNav(0)}>
              <span className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_#ff6b2b]" />
              <span className="sidebar-logo text-xl text-white tracking-widest font-extrabold">INTERVIEW PREP LAB</span>
            </div>

            {/* Search */}
            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder="Search questions, answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-sm text-[#f0ede8] placeholder-zinc-500 focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/30 transition-all font-mono"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-500 hover:text-zinc-300">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Progress bars */}
            <div className="mb-5 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-900/80 space-y-3">
              <div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-zinc-400 font-mono mb-1.5">
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3 h-3" />Flashcards</span>
                  <span className="font-semibold text-orange-400">{fcProgress}%</span>
                </div>
                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                  <div className="progress-fill h-full rounded-full transition-all duration-500 ease-out" style={{ width: fcProgress + "%" }} />
                </div>
                <div className="text-[9px] text-zinc-600 font-mono mt-1">{completedFlashcards}/{totalFlashcards} revealed</div>
              </div>
              <div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-zinc-400 font-mono mb-1.5">
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3" />MCQ Tests</span>
                  <span className="font-semibold text-emerald-400">{mcqProgress}%</span>
                </div>
                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" style={{ width: mcqProgress + "%" }} />
                </div>
                <div className="text-[9px] text-zinc-600 font-mono mt-1">
                  {completedMCQs}/{totalMCQs} answered · {completedMCQs > 0 ? Math.round((correctMCQs / completedMCQs) * 100) : 0}% correct
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-0.5">
              {/* Dashboard */}
              <button
                onClick={() => handleNav(0)}
                className={"w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium " + (activeSectionId === 0 && !searchQuery ? "bg-[#202020] text-white border-l-2 border-orange-500 pl-2.5" : "text-[#a8a39c] hover:bg-zinc-900/50 hover:text-white")}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                Dashboard
              </button>

              {/* Interview Simulation — top-level highlight */}
              <button
                onClick={() => { setActiveSectionId(-1); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={"w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium group " + (activeSectionId === -1 && !searchQuery ? "bg-violet-500/10 text-violet-400 border-l-2 border-violet-500 pl-2.5" : "text-[#a8a39c] hover:bg-zinc-900/50 hover:text-white")}
              >
                <Mic className="w-4 h-4 shrink-0 group-hover:text-violet-400 transition-colors" />
                <span className="flex-1 text-left">Interview Simulation</span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-400 border border-violet-500/20">
                  NEW
                </span>
              </button>

              {/* Separator */}
              <div className="pt-2 pb-1 text-[10px] uppercase font-bold text-zinc-700 tracking-widest font-mono px-3">
                Modules
              </div>

              {/* Accordion groups */}
              {SIDEBAR_GROUPS.map(renderSidebarGroup)}
            </nav>
          </div>

          <div className="pt-4 border-t border-zinc-900 text-[10px] text-zinc-600 font-mono text-center">
            INTERVIEW PREP LAB v2.1.0
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" />
        )}

        {/* ── MAIN CONTENT ──────────────────────────────────── */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 flex flex-col justify-start relative z-10 h-screen overflow-y-auto">

          {/* ── SEARCH RESULTS ──────────────────────────── */}
          {searchQuery && filteredData !== null ? (
            <section className="animate-fade-up max-w-7xl">
              <div className="breadcrumb mb-2">Interview Prep Lab / Search</div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-6">
                Search Results <span className="text-zinc-500 font-mono text-lg font-normal">({filteredData.length})</span>
              </h1>

              {filteredData.length === 0 ? (
                <div className="text-center py-20 bg-zinc-950/40 rounded-2xl border border-zinc-900 border-dashed">
                  <Search className="mx-auto h-10 w-10 text-zinc-700 mb-3" />
                  <p className="text-zinc-500">No results found for &quot;{searchQuery}&quot;</p>
                  <button onClick={() => setSearchQuery("")} className="mt-3 px-4 py-1.5 rounded-lg bg-zinc-900 text-xs hover:bg-zinc-800 text-zinc-400 font-mono border border-zinc-800/80 transition-colors">
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredData.map((res, i) => (
                    <div
                      key={i}
                      className="p-5 bg-zinc-950/60 rounded-xl border border-zinc-900 hover:border-orange-500/40 hover:bg-zinc-950 transition-all cursor-pointer group"
                      onClick={() => handleNav(res.section.id, res.type === "mcq" ? "mcqs" : "flashcards")}
                    >
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <span className={"text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded " + (res.type === "flashcard" ? "bg-orange-950/40 text-orange-400 border border-orange-900/60" : "bg-emerald-950/40 text-emerald-400 border border-emerald-900/60")}>
                          {res.type}
                        </span>
                        <span className="text-[10px] text-zinc-600 font-mono">{res.section.title}</span>
                      </div>
                      <h3 className="text-[15px] font-semibold text-white group-hover:text-orange-400 transition-colors">
                        {"q" in res.item ? res.item.q : res.item.question}
                      </h3>
                      {"hint" in res.item && (
                        <p className="text-zinc-500 text-xs leading-relaxed mt-2 font-mono">{res.item.hint}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

          ) : activeSectionId === -1 ? (
            /* ── INTERVIEW SIMULATION ─────────────────── */
            <SimulationView onExit={() => handleNav(0)} />

          ) : activeSectionId === 0 ? (
            /* ── DASHBOARD ──────────────────────────────── */
            <section className="animate-fade-up space-y-8 max-w-7xl">
              {/* Hero */}
              <div className="p-8 rounded-2xl bg-zinc-950/60 border border-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-orange-500/5 blur-[80px] pointer-events-none" />
                <div className="breadcrumb mb-2">Full Stack Interview Preparation</div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Interview Prep Lab &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Interactive MCQ Engine</span>
                </h1>
                <p className="text-zinc-400 max-w-xl text-sm leading-relaxed mt-3">
                  A comprehensive, single-page preparation hub for Junior Frontend &amp; Full-Stack roles. Study with interactive Flashcards, validate with MCQs, and simulate a real interview round.
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Modules", value: interviewData.length.toString(), sub: "Topics covered", icon: <Brain className="w-5 h-5" />, color: "text-orange-400", bg: "bg-orange-950/20 border-orange-900/30" },
                  { label: "Flashcards", value: totalFlashcards.toString(), sub: "Study questions", icon: <BookOpen className="w-5 h-5" />, color: "text-violet-400", bg: "bg-violet-950/20 border-violet-900/30" },
                  { label: "MCQ Questions", value: totalMCQs.toString(), sub: "Test questions", icon: <CheckCircle className="w-5 h-5" />, color: "text-emerald-400", bg: "bg-emerald-950/20 border-emerald-900/30" },
                  { label: "MCQ Accuracy", value: (completedMCQs > 0 ? Math.round((correctMCQs / completedMCQs) * 100) : 0) + "%", sub: "Current session", icon: <Trophy className="w-5 h-5" />, color: "text-amber-400", bg: "bg-amber-950/20 border-amber-900/30" },
                ].map((stat) => (
                  <div key={stat.label} className="p-5 rounded-xl bg-zinc-950/60 border border-zinc-900 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                      <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
                      <div className={"text-[10px] font-mono mt-1 " + stat.color}>{stat.sub}</div>
                    </div>
                    <div className={"w-10 h-10 rounded-lg border flex items-center justify-center " + stat.bg + " " + stat.color}>{stat.icon}</div>
                  </div>
                ))}
              </div>

              {/* Interview Simulation CTA */}
              <button
                onClick={() => { setActiveSectionId(-1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="w-full p-6 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/8 to-transparent hover:border-violet-500/40 hover:from-violet-500/12 transition-all text-left group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[160px] h-[160px] bg-violet-500/8 blur-[60px] pointer-events-none" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/15 transition-colors">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[16px] font-bold text-white">Try an Interview Simulation</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-400 border border-violet-500/20">NEW</span>
                    </div>
                    <p className="text-zinc-500 text-xs">Timed mock interview — Technical, HR, or Mixed round. Answer, then self-rate.</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-violet-400 ml-auto shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Module grid */}
              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-400" /> All Modules
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {interviewData.map((sec) => {
                    const stats = getSectionStats(sec, quizStates, mcqStates);
                    return (
                      <div key={sec.id} className="concept-card cursor-pointer group" onClick={() => handleNav(sec.id)}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono font-bold text-zinc-400 text-sm group-hover:border-orange-500/30 group-hover:text-orange-400 transition-all">
                            {String(sec.id).padStart(2, "0")}
                          </div>
                          <div className="text-[9px] font-mono text-zinc-600 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded flex items-center gap-1.5">
                            <span className="text-orange-400">{stats.fcDone}/{stats.fcTotal}</span>
                            <span>/</span>
                            <span className="text-emerald-400">{stats.mcqDone}/{stats.mcqTotal}</span>
                          </div>
                        </div>
                        <h3 className="text-[15px] font-bold text-zinc-100 group-hover:text-white transition-colors mb-1 truncate">{sec.title}</h3>
                        <p className="text-xs text-zinc-500 mb-4 line-clamp-2 h-8">{sec.subtitle}</p>
                        <div className="space-y-2">
                          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: (stats.fcTotal > 0 ? (stats.fcDone / stats.fcTotal) * 100 : 0) + "%" }} />
                          </div>
                          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: (stats.mcqTotal > 0 ? (stats.mcqDone / stats.mcqTotal) * 100 : 0) + "%" }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

          ) : activeSection?.slug === "leapfrog-overall" ? (
            <LeapfrogOverallPrepView />
          ) : activeSection ? (
            /* ── SECTION VIEW ───────────────────────────── */
            <section className="animate-fade-up max-w-7xl pb-32">

              {/* Section header */}
              <div className="breadcrumb mb-2">Interview Prep Lab / {activeSection.title}</div>
              <div className="mb-6 p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent pointer-events-none" />
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-[11px] font-mono text-orange-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Target className="w-3 h-3" /> Module {String(activeSection.id).padStart(2, "0")}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{activeSection.title}</h1>
                    <p className="text-zinc-400 text-sm mt-1">{activeSection.subtitle}</p>
                  </div>
                  {/* Quick stats */}
                  <div className="flex gap-3 flex-wrap">
                    {(() => {
                      const stats = getSectionStats(activeSection, quizStates, mcqStates);
                      return (
                        <>
                          <div className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                            <div className="text-[9px] font-mono text-zinc-500 uppercase">Flashcards</div>
                            <div className="text-sm font-bold text-orange-400 mt-0.5">{stats.fcDone}/{stats.fcTotal}</div>
                          </div>
                          <div className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                            <div className="text-[9px] font-mono text-zinc-500 uppercase">MCQs Done</div>
                            <div className="text-sm font-bold text-emerald-400 mt-0.5">{stats.mcqDone}/{stats.mcqTotal}</div>
                          </div>
                          {stats.mcqDone > 0 && (
                            <div className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                              <div className="text-[9px] font-mono text-zinc-500 uppercase">Accuracy</div>
                              <div className="text-sm font-bold text-amber-400 mt-0.5">{Math.round((stats.mcqCorrect / stats.mcqDone) * 100)}%</div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Daily Rhythm Tips for Leapfrog Prep Days */}
              {activeSection.slug.startsWith("leapfrog-overall-day-") && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-widest">Daily Rhythm Tips</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {rhythmTips.map(tip => (
                      <div key={tip.num} className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-900/80 hover:border-zinc-800 transition-colors">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-4 h-4 rounded bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 text-[9px] font-mono text-orange-400 font-bold">
                            {tip.num}
                          </div>
                          <div className="text-[10px] font-mono text-zinc-300 uppercase font-bold truncate">{tip.title}</div>
                        </div>
                        <div className="text-[10px] text-zinc-500 leading-relaxed">{tip.body}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── TAB SELECTOR ─────────────────────────────── */}
              <div className="flex flex-wrap gap-2 pt-2 pb-4 border-b border-zinc-900 mb-6">
                {activeSection.notes && activeSection.notes.length > 0 && (
                  <button
                    onClick={() => setViewMode("notes")}
                    className={"flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold border transition-all " + (viewMode === "notes"
                      ? "bg-violet-500/15 border-violet-500/40 text-violet-400"
                      : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700")}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Lecture Notes
                  </button>
                )}
                <button
                  onClick={() => setViewMode("flashcards")}
                  className={"flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold border transition-all " + (viewMode === "flashcards"
                    ? "bg-orange-500/15 border-orange-500/40 text-orange-400"
                    : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700")}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Flashcards ({activeSection.questions.length})
                </button>
                <button
                  onClick={() => setViewMode("mcqs")}
                  className={"flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold border transition-all " + (viewMode === "mcqs"
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                    : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700")}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  MCQ Test ({activeSection.mcqs?.length ?? 0})
                </button>
                {(() => {
                  const isF1SoftMock = activeSection.slug.startsWith("f1soft-");
                  const isLeapfrogMock = activeSection.slug.startsWith("leapfrog-");
                  const isProblemMock = activeSection.slug === "problem-solving";
                  if (!isF1SoftMock && !isLeapfrogMock && !isProblemMock) return null;

                  return (
                    <button
                      onClick={() => setViewMode("simulation")}
                      className={"flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold border transition-all " + (viewMode === "simulation"
                        ? "bg-violet-500/15 border-violet-500/40 text-violet-400"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700")}
                    >
                      <Mic className="w-3.5 h-3.5" />
                      Mock Interview
                    </button>
                  );
                })()}
              </div>

              {/* ── SIMULATION VIEW ────────────────────────────── */}
              {viewMode === "simulation" && (
                <div className="animate-fade-up">
                  <SimulationView 
                    onExit={() => setViewMode("flashcards")} 
                    initialRound={activeSection.slug.startsWith("f1soft-") ? "f1soft" : activeSection.slug.startsWith("leapfrog-") ? "leapfrog" : "hr"} 
                  />
                </div>
              )}

              {/* ── FLASHCARDS VIEW ──────────────────────────── */}
              {viewMode === "flashcards" && (
                <div className="space-y-5 animate-fade-up">
                  {/* Category Tabs for F1Soft */}
                  {activeSection.slug === "f1soft-interview" && (
                    <div className="flex flex-wrap gap-2 mb-6 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                      {["JS Core", "OOP & SOLID", "DSA", "React", "Backend & DB", "Arch & Security"].map(cat => (
                        <button 
                          key={cat} 
                          onClick={() => setActiveF1SoftCategory(cat)}
                          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                            activeF1SoftCategory === cat 
                              ? "bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.3)] border border-orange-500/50" 
                              : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:bg-zinc-900 hover:border-zinc-700"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}

                  {activeSection.questions.filter(q => activeSection.slug === "f1soft-interview" ? q.category === activeF1SoftCategory : true).map((q, idx) => {
                    const shown = quizStates[q.id]?.showAnswer;
                    const isCommon = q.q.includes("(common question)");
                    const questionText = q.q.replace(/\s*\(common question\)/i, "");
                    const borderColorClass = shown
                      ? (isCommon ? "border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]" : "border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.1)]")
                      : (isCommon ? "border-red-900/50 group-hover:border-red-700/80 shadow-[0_0_10px_rgba(239,68,68,0.05)]" : "border-zinc-800/80 group-hover:border-zinc-700");

                    return (
                      <div key={q.id} className="relative group">
                        <div className={`relative bg-zinc-950/80 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${borderColorClass}`}>

                          {/* ── CARD HEADER ── */}
                          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900/80 bg-zinc-900/30">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-950 text-zinc-500 font-mono text-[11px] font-bold border border-zinc-800 shadow-inner">
                                {idx + 1}
                              </span>
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold flex items-center">
                                Flashcard
                                {isCommon && <span className="ml-2 px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1"><Flame className="w-3 h-3" /> COMMON</span>}
                              </span>
                            </div>

                            {/* Hint Toggle */}
                            <button
                              onClick={() => toggleHint(q.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all ${quizStates[q.id]?.showHint ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]' : 'bg-zinc-950 text-zinc-500 border border-zinc-800 hover:text-amber-400 hover:border-amber-500/30 hover:bg-zinc-900'}`}
                            >
                              <Lightbulb className={`w-3.5 h-3.5 ${quizStates[q.id]?.showHint ? 'text-amber-400' : ''}`} />
                              {quizStates[q.id]?.showHint ? "Hide Hint" : "Need a Hint?"}
                            </button>
                          </div>

                          {/* ── CARD BODY (QUESTION) ── */}
                          <div className="px-6 py-8">
                            <h3 className="text-[18px] sm:text-[20px] font-semibold text-zinc-100 leading-relaxed tracking-tight">
                              {questionText}
                            </h3>

                            {/* Hint Content Area */}
                            {quizStates[q.id]?.showHint && (
                              <div className="mt-5 animate-fade-up">
                                <div className="inline-flex items-start gap-3 px-5 py-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 relative overflow-hidden">
                                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/40 rounded-l-xl" />
                                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                  <span className="italic text-[13.5px] text-amber-200/70 leading-relaxed">{q.hint}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* ── CARD FOOTER (ANSWER) ── */}
                          <div className="relative">
                            {!shown ? (
                              <button
                                onClick={() => toggleFlashcard(q.id)}
                                className={`w-full flex items-center justify-center gap-2 py-4 px-6 bg-zinc-900/40 text-[13px] font-mono font-semibold text-zinc-400 transition-all border-t border-dashed border-zinc-800 hover:border-solid group/reveal ${isCommon ? 'hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/30' : 'hover:text-orange-400 hover:bg-orange-500/5 hover:border-orange-500/30'}`}
                              >
                                <Eye className="w-4 h-4 group-hover/reveal:scale-110 transition-transform" /> Click to Reveal Answer
                              </button>
                            ) : (
                              <div className={`border-t animate-fade-up ${isCommon ? 'border-red-500/20 bg-gradient-to-b from-red-500/5 to-transparent' : 'border-orange-500/20 bg-gradient-to-b from-orange-500/5 to-transparent'}`}>
                                <div className="p-6 pb-20">
                                  <div className="flex items-center gap-2.5 mb-5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${isCommon ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-orange-500 shadow-[0_0_8px_#f97316]'}`} />
                                    <span className={`text-[11px] font-mono uppercase tracking-widest font-bold ${isCommon ? 'text-red-400' : 'text-orange-400'}`}>
                                      Answer
                                    </span>
                                  </div>

                                  <div className="text-zinc-200 text-[15px] whitespace-pre-wrap leading-relaxed">
                                    {q.answer}
                                  </div>

                                  {q.diagram && (
                                    <DiagramRenderer diagram={q.diagram} />
                                  )}

                                  {q.code && (
                                    <div className="mt-6">
                                      <CodeBlock code={q.code} language={q.language ?? "javascript"} />
                                    </div>
                                  )}
                                </div>

                                {/* Floating close button */}
                                <button
                                  onClick={() => toggleFlashcard(q.id)}
                                  className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-[11px] font-mono font-semibold text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all shadow-2xl hover:scale-105 active:scale-95"
                                >
                                  <EyeOff className="w-3.5 h-3.5" /> Hide Answer
                                </button>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── MCQ VIEW ─────────────────────────────────── */}
              {viewMode === "mcqs" && (
                <div className="space-y-6 animate-fade-up">
                  {/* MCQ Score bar */}
                  {(() => {
                    const stats = getSectionStats(activeSection, quizStates, mcqStates);
                    return stats.mcqDone > 0 ? (
                      <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-900 flex items-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2 text-sm">
                          <Trophy className="w-4 h-4 text-amber-400" />
                          <span className="font-bold text-white">{stats.mcqCorrect}</span>
                          <span className="text-zinc-500">/ {stats.mcqDone} correct</span>
                        </div>
                        <div className="flex-1 min-w-[100px] h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className={"h-full rounded-full transition-all " + (stats.mcqDone > 0 && stats.mcqCorrect / stats.mcqDone >= 0.7 ? "bg-emerald-500" : "bg-red-500")}
                            style={{ width: (stats.mcqDone > 0 ? (stats.mcqCorrect / stats.mcqDone) * 100 : 0) + "%" }}
                          />
                        </div>
                        <span className="text-sm font-mono font-bold text-amber-400">
                          {Math.round((stats.mcqCorrect / stats.mcqDone) * 100)}%
                        </span>
                      </div>
                    ) : null;
                  })()}

                  {activeSection.mcqs?.map((m, idx) => {
                    const state = mcqStates[m.id];
                    const answered = state?.selectedIndex !== null && state?.selectedIndex !== undefined;
                    const correct = answered && state.selectedIndex === m.correctAnswerIndex;

                    return (
                      <div key={m.id} className={"concept-card " + (answered ? (correct ? "!border-emerald-500/30" : "!border-red-500/30") : "")}>
                        <div className="flex gap-4">
                          <div className={"w-8 h-8 rounded-lg border flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 " + (answered ? (correct ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-red-500/20 border-red-500 text-red-400") : "bg-zinc-900 border-zinc-800 text-zinc-500")}>
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[16px] font-semibold text-white mb-5 leading-snug">{m.question}</h3>

                            <div className="space-y-2.5">
                              {m.options.map((opt, oIdx) => {
                                let cls = "mcq-option-btn";
                                if (answered) {
                                  cls += " cursor-default";
                                  if (oIdx === m.correctAnswerIndex) cls += " correct animate-pop-in";
                                  else if (state.selectedIndex === oIdx) cls += " incorrect animate-shake";
                                }
                                return (
                                  <button
                                    key={oIdx}
                                    disabled={answered}
                                    onClick={() => selectMCQ(m.id, oIdx)}
                                    className={cls}
                                  >
                                    <div className={"w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-bold shrink-0 " + (answered && oIdx === m.correctAnswerIndex ? "bg-emerald-500 border-emerald-500 text-black" : answered && state.selectedIndex === oIdx ? "bg-red-500 border-red-500 text-white" : "border-zinc-700 text-zinc-400")}>
                                      {answered && oIdx === m.correctAnswerIndex ? <CheckCircle className="w-3.5 h-3.5" /> : answered && state.selectedIndex === oIdx ? <X className="w-3.5 h-3.5" /> : LETTERS[oIdx]}
                                    </div>
                                    <span className="text-[14px] leading-relaxed">{opt}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {answered && (
                              <div className="animate-fade-up mt-5 pt-4 border-t border-zinc-800">
                                <div className="text-[10px] font-mono uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5 text-zinc-400">
                                  <Lightbulb className="w-3 h-3" /> Explanation
                                </div>
                                <p className="text-zinc-300 text-[14px] leading-relaxed">{m.explanation}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── NOTES VIEW ─────────────────────────────────── */}
              {viewMode === "notes" && (
                <div className="space-y-10 animate-fade-up pt-4">
                  {activeSection.notes?.map((sec, secIdx) => (
                    <div key={secIdx} className="space-y-4 border-b border-zinc-900 pb-10 last:border-b-0 last:pb-0">
                      <h2 className="text-xl font-bold text-white flex items-center flex-wrap gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                        <span>{sec.title}</span>
                      </h2>

                      <div className="text-zinc-300 text-[14.5px] leading-relaxed whitespace-pre-wrap">
                        {renderMarkdown(sec.content)}
                      </div>

                      {sec.code && (
                        <div className="mt-4">
                          <CodeBlock code={sec.code} language={sec.language || "javascript"} />
                        </div>
                      )}

                      {sec.tip && (
                        <div className="tip-box flex items-start gap-3 my-4">
                          <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 flex-shrink-0 mt-0.5 text-xs font-bold font-mono">!</div>
                          <p className="text-zinc-400 text-xs leading-relaxed">
                            <strong className="text-amber-400 font-semibold uppercase tracking-wider text-[10px] block mb-0.5 font-mono">Pro-Tip:</strong>
                            {sec.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
