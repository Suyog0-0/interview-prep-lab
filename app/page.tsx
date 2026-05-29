"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import { interviewData } from "./data";
import type { InterviewSection, InterviewQuestion, MCQQuestion } from "../types";

type ViewMode = "flashcards" | "mcqs" | "notes";

// ─── Option letter badge ───────────────────────────────────────
const LETTERS = ["A", "B", "C", "D"];

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
        <pre className="pl-4 pr-6 overflow-visible select-text w-full m-0 bg-transparent border-0 font-mono text-[13px] leading-5 whitespace-pre text-[#addb67]">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};

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

// ══════════════════════════════════════════════════════════════
export default function Home() {
  const [activeSectionId, setActiveSectionId] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>("flashcards");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [quizStates, setQuizStates] = useState<Record<string, { showAnswer: boolean; showHint?: boolean }>>({});
  const [mcqStates, setMcqStates] = useState<Record<string, { selectedIndex: number | null }>>({});

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
              <button
                onClick={() => handleNav(0)}
                className={"w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all font-medium " + (activeSectionId === 0 && !searchQuery ? "bg-[#202020] text-white border-l-2 border-orange-500 pl-2.5" : "text-[#a8a39c] hover:bg-zinc-900/50 hover:text-white")}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                Dashboard
              </button>

              <div className="pt-3 pb-1 text-[10px] uppercase font-bold text-zinc-600 tracking-widest font-mono px-2">
                Modules ({interviewData.length})
              </div>

              {interviewData.map((sec) => {
                const stats = getSectionStats(sec, quizStates, mcqStates);
                const isActive = activeSectionId === sec.id && !searchQuery;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleNav(sec.id)}
                    className={"w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all flex items-center gap-2.5 group " + (isActive ? "text-orange-400 font-semibold bg-zinc-900/80 border-l-2 border-orange-500 pl-2.5" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30")}
                  >
                    <span className={"w-1.5 h-1.5 rounded-full shrink-0 " + (isActive ? "bg-orange-500 shadow-[0_0_6px_#ff6b2b]" : "bg-zinc-700 group-hover:bg-zinc-500")} />
                    <span className="truncate flex-1">{sec.title}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      {stats.fcDone > 0 && (
                        <span className="text-[9px] font-mono text-orange-400 bg-orange-500/10 px-1 rounded">{stats.fcDone}</span>
                      )}
                      {stats.mcqDone > 0 && (
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">{stats.mcqDone}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-zinc-900 text-[10px] text-zinc-600 font-mono text-center">
            INTERVIEW PREP LAB v2.0.0
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
            <section className="animate-fade-up max-w-4xl">
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

          ) : activeSectionId === 0 ? (
            /* ── DASHBOARD ──────────────────────────────── */
            <section className="animate-fade-up space-y-8 max-w-5xl">
              {/* Hero */}
              <div className="p-8 rounded-2xl bg-zinc-950/60 border border-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-orange-500/5 blur-[80px] pointer-events-none" />
                <div className="breadcrumb mb-2">Full Stack Interview Preparation</div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Interview Prep Lab &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Interactive MCQ Engine</span>
                </h1>
                <p className="text-zinc-400 max-w-xl text-sm leading-relaxed mt-3">
                  A comprehensive, single-page preparation hub for Junior Frontend &amp; Full-Stack roles. Study with interactive Flashcards, then validate your knowledge with 20 MCQs per module.
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

          ) : activeSection ? (
            /* ── SECTION VIEW ───────────────────────────── */
            <section className="animate-fade-up max-w-4xl pb-32">

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

              {/* ── VIVAPREP-STYLE TAB SELECTOR ─────────────── */}
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
              </div>

              {/* ── FLASHCARDS VIEW ──────────────────────────── */}
              {viewMode === "flashcards" && (
                <div className="space-y-5 animate-fade-up">
                  {activeSection.questions.map((q, idx) => {
                    const shown = quizStates[q.id]?.showAnswer;
                    return (
                      <div key={q.id} className="relative group">
                        <div className={`relative bg-zinc-950/80 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${shown ? "border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.1)]" : "border-zinc-800/80 group-hover:border-zinc-700"}`}>
                          
                          {/* ── CARD HEADER ── */}
                          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900/80 bg-zinc-900/30">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-950 text-zinc-500 font-mono text-[11px] font-bold border border-zinc-800 shadow-inner">
                                {idx + 1}
                              </span>
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                                Flashcard
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
                              {q.q}
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
                                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-zinc-900/40 text-[13px] font-mono font-semibold text-zinc-400 hover:text-orange-400 hover:bg-orange-500/5 transition-all border-t border-dashed border-zinc-800 hover:border-solid hover:border-orange-500/30 group/reveal"
                              >
                                <Eye className="w-4 h-4 group-hover/reveal:scale-110 transition-transform" /> Click to Reveal Answer
                              </button>
                            ) : (
                              <div className="border-t border-orange-500/20 bg-gradient-to-b from-orange-500/5 to-transparent animate-fade-up">
                                <div className="p-6 pb-20">
                                  <div className="flex items-center gap-2.5 mb-5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
                                    <span className="text-[11px] font-mono text-orange-400 uppercase tracking-widest font-bold">
                                      Answer
                                    </span>
                                  </div>
                                  
                                  <div className="text-zinc-200 text-[15px] whitespace-pre-wrap leading-relaxed">
                                    {q.answer}
                                  </div>
                                  
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
                                      {answered && oIdx === m.correctAnswerIndex ? "✓" : answered && state.selectedIndex === oIdx ? "✕" : LETTERS[oIdx]}
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
