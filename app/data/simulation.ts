import type { SimulationQuestion } from "../../types";

export const simulationQuestions: SimulationQuestion[] = [
  // ── TECHNICAL ──────────────────────────────────────────────────────────────
  {
    id: "sim-t01",
    category: "JavaScript",
    difficulty: "medium",
    timeLimit: 120,
    roundType: ["technical", "mixed"],
    q: "Explain the difference between `null` and `undefined` in JavaScript.",
    hint: "One is deliberately empty, one is uninitialized.",
    answer:
      "`undefined` means a variable has been declared but not assigned a value. `null` is an intentional assignment representing 'no value'. typeof null is 'object' (a legacy bug). Strict equality: null !== undefined, but null == undefined is true.",
  },
  {
    id: "sim-t02",
    category: "JavaScript",
    difficulty: "medium",
    timeLimit: 120,
    roundType: ["technical", "mixed"],
    q: "What is the event loop in JavaScript and how does it work?",
    hint: "Call stack + Web APIs + task queue + microtask queue.",
    answer:
      "JS is single-threaded. The event loop continuously checks: (1) Is the call stack empty? (2) Are there microtasks (Promises)? If yes, run them all first. (3) Then run one macrotask (setTimeout, setInterval). This is why Promises resolve before setTimeout callbacks.",
  },
  {
    id: "sim-t03",
    category: "React",
    difficulty: "medium",
    timeLimit: 150,
    roundType: ["technical", "mixed"],
    q: "What is the difference between `useCallback` and `useMemo`?",
    hint: "One memoizes a function, the other memoizes a computed value.",
    answer:
      "`useMemo` memoizes the RESULT of a function call — used for expensive computations. `useCallback` memoizes the FUNCTION ITSELF — used to prevent child re-renders when passing callbacks as props. Both only recompute when their dependency array changes.",
  },
  {
    id: "sim-t04",
    category: "CSS",
    difficulty: "easy",
    timeLimit: 90,
    roundType: ["technical", "mixed"],
    q: "What is the difference between `position: absolute` and `position: fixed`?",
    hint: "What is each element positioned relative to?",
    answer:
      "`absolute` is positioned relative to its nearest positioned ancestor (one with position other than static). `fixed` is positioned relative to the VIEWPORT — it stays in place even when the page scrolls.",
  },
  {
    id: "sim-t05",
    category: "Node.js",
    difficulty: "medium",
    timeLimit: 120,
    roundType: ["technical"],
    q: "What is the difference between `require()` and ES module `import`?",
    hint: "CommonJS vs ESM — synchronous vs static.",
    answer:
      "`require()` is CommonJS — synchronous, can be called conditionally, evaluated at runtime. `import` is ESM — statically analyzed at parse time, supports tree-shaking, always hoisted. Node.js supports both but you must configure `type: 'module'` in package.json for ESM.",
  },
  {
    id: "sim-t06",
    category: "SQL",
    difficulty: "medium",
    timeLimit: 120,
    roundType: ["technical", "mixed"],
    q: "What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?",
    hint: "Think about which rows from each table are included.",
    answer:
      "INNER JOIN: only rows where there's a match in BOTH tables. LEFT JOIN: all rows from the left table + matched rows from the right (NULLs where no match). FULL OUTER JOIN: all rows from BOTH tables, NULLs where there's no match on either side.",
  },
  {
    id: "sim-t07",
    category: "Next.js",
    difficulty: "hard",
    timeLimit: 180,
    roundType: ["technical"],
    q: "What is the difference between Server Components and Client Components in Next.js App Router?",
    hint: "Where does each render? What can they access?",
    answer:
      "Server Components render on the server — they can directly access databases, secrets, and file system. They send HTML to the client with zero JS bundle overhead. Client Components (marked 'use client') run in the browser — they can use state, effects, and browser APIs. You can nest Client Components inside Server Components but NOT vice versa.",
  },
  {
    id: "sim-t08",
    category: "REST API",
    difficulty: "easy",
    timeLimit: 90,
    roundType: ["technical", "mixed"],
    q: "What HTTP status codes should you return for: successful creation, not found, unauthorized, and server error?",
    hint: "201, 404, 401, 500.",
    answer:
      "201 Created (POST success), 404 Not Found (resource doesn't exist), 401 Unauthorized (not authenticated), 403 Forbidden (authenticated but no permission), 500 Internal Server Error (unexpected server failure), 400 Bad Request (invalid client input).",
  },
  {
    id: "sim-t09",
    category: "Big-O",
    difficulty: "medium",
    timeLimit: 120,
    roundType: ["technical", "mixed"],
    q: "What is the time complexity of looking up a value in a hash map vs a sorted array?",
    hint: "O(1) average vs O(log n).",
    answer:
      "Hash map lookup: O(1) average case (hash function maps key to index directly). Sorted array lookup (binary search): O(log n) — halves the search space each step. Hash maps are faster for lookups but use more memory and can degrade to O(n) in worst case (collisions).",
  },
  {
    id: "sim-t10",
    category: "Security",
    difficulty: "medium",
    timeLimit: 150,
    roundType: ["technical", "mixed"],
    q: "How does JWT authentication work? What are the three parts of a JWT?",
    hint: "Header.Payload.Signature — the dot-separated token.",
    answer:
      "A JWT has 3 base64-encoded parts: (1) Header — algorithm and token type. (2) Payload — claims (user ID, roles, expiry). (3) Signature — HMAC of header + payload, signed with a secret key. The server verifies the signature on every request — if valid, the user is authenticated. JWTs are stateless — no session DB needed.",
  },
  {
    id: "sim-t11",
    category: "OOP",
    difficulty: "medium",
    timeLimit: 120,
    roundType: ["technical"],
    q: "Explain polymorphism with a real-world code example.",
    hint: "Same method name, different behaviour per subclass.",
    answer:
      "Polymorphism means the same interface behaves differently for different types. Example: a base class `Shape` has `area()`. `Circle` and `Rectangle` both override `area()` with their own formula. Code that calls `shape.area()` works for any shape without knowing the specific type — this is runtime polymorphism (method overriding).",
    code: "class Shape { area() { return 0; } }\nclass Circle extends Shape {\n  constructor(r) { super(); this.r = r; }\n  area() { return Math.PI * this.r ** 2; }\n}\nclass Rect extends Shape {\n  constructor(w, h) { super(); this.w = w; this.h = h; }\n  area() { return this.w * this.h; }\n}\n\nconst shapes = [new Circle(5), new Rect(4, 6)];\nshapes.forEach(s => console.log(s.area())); // 78.5, 24",
    language: "javascript",
  },
  {
    id: "sim-t12",
    category: "CSS / Layout",
    difficulty: "easy",
    timeLimit: 90,
    roundType: ["technical", "mixed"],
    q: "How would you center a div both horizontally and vertically using CSS?",
    hint: "Flexbox is the modern answer.",
    answer:
      "Using Flexbox: set the parent to `display: flex; justify-content: center; align-items: center;`. Using Grid: `display: grid; place-items: center;`. Both work on the PARENT element. Older approach: `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);` on the child.",
  },
  {
    id: "sim-t13",
    category: "Debugging",
    difficulty: "hard",
    timeLimit: 180,
    roundType: ["technical"],
    q: "A React component is re-rendering infinitely. What are the likely causes and how do you debug it?",
    hint: "Check useEffect dependencies and setState calls inside renders.",
    answer:
      "Common causes: (1) `useEffect` with a missing/incorrect dependency that triggers a state change which retriggers the effect. (2) Creating a new object/array as a dependency — object identity changes every render. (3) Calling setState unconditionally inside a render. Debug steps: add console.log in the effect, check React DevTools Profiler, use `useCallback`/`useMemo` to stabilize references.",
  },
  {
    id: "sim-t14",
    category: "Performance",
    difficulty: "hard",
    timeLimit: 180,
    roundType: ["technical", "mixed"],
    q: "How would you optimize a slow React application? Name at least 4 techniques.",
    hint: "Memoization, lazy loading, virtualization, code splitting.",
    answer:
      "1. `React.memo` — prevent unnecessary re-renders of pure components. 2. `useMemo` / `useCallback` — memoize expensive values and callbacks. 3. `React.lazy` + `Suspense` — code split and lazy load heavy components. 4. Virtualization (`react-window`) — only render visible list items. 5. Move state down — avoid lifting state too high. 6. Avoid anonymous functions in JSX — they create new references every render.",
  },
  {
    id: "sim-t15",
    category: "Data Structures",
    difficulty: "medium",
    timeLimit: 150,
    roundType: ["technical"],
    q: "When would you use a Stack vs a Queue? Give a real-world use case for each.",
    hint: "LIFO vs FIFO.",
    answer:
      "Stack (LIFO — Last In First Out): browser history (back button), undo/redo in editors, function call stack. Queue (FIFO — First In First Out): job/task queues (print queue, email queue), BFS graph traversal, request queues in servers.",
  },

  // ── HR / BEHAVIOURAL ───────────────────────────────────────────────────────
  {
    id: "sim-h01",
    category: "Behavioural",
    difficulty: "easy",
    timeLimit: 120,
    roundType: ["hr", "mixed"],
    q: "Tell me about yourself and why you're applying for this role.",
    hint: "Present → past → future. Keep it under 2 minutes.",
    answer:
      "Structure: (1) Who you are now — current skills, what you build. (2) Your background — what led you here, key experiences. (3) Why THIS role — specific alignment with the company's tech stack or mission. Keep it concise (90s), end with why you're excited about this opportunity.",
  },
  {
    id: "sim-h02",
    category: "Behavioural",
    difficulty: "easy",
    timeLimit: 120,
    roundType: ["hr"],
    q: "What is your biggest weakness? How are you working on it?",
    hint: "Be genuine — pick a real weakness, show self-awareness and a plan.",
    answer:
      "Choose a REAL weakness that isn't critical to the job. Structure: (1) Name the weakness honestly. (2) Show you're self-aware — give a specific example. (3) Describe concrete steps you're taking to improve. Example: 'I tend to over-engineer solutions. I'm working on this by setting time-boxed spikes and asking for code review earlier.'",
  },
  {
    id: "sim-h03",
    category: "Behavioural",
    difficulty: "medium",
    timeLimit: 150,
    roundType: ["hr", "mixed"],
    q: "Describe a time you disagreed with a teammate or manager. How did you handle it?",
    hint: "Use STAR. Show maturity — you listened, explained your view, and found a resolution.",
    answer:
      "STAR: Situation — context of the disagreement. Task — what was at stake. Action — how you approached it: active listening, asked clarifying questions, presented data/reasoning calmly, sought a compromise. Result — what was decided and what you learned. Avoid making the other person look bad.",
  },
  {
    id: "sim-h04",
    category: "Behavioural",
    difficulty: "medium",
    timeLimit: 150,
    roundType: ["hr"],
    q: "Tell me about a project you're most proud of and what your specific contribution was.",
    hint: "Go deep on YOUR role — use 'I', not just 'we'.",
    answer:
      "Pick a project with a clear outcome. Explain: (1) The problem it solved. (2) YOUR specific responsibilities — what YOU built, decided, or fixed. (3) Technical details that show depth. (4) The measurable impact (users, performance improvement, time saved). Practice this story in under 3 minutes.",
  },
  {
    id: "sim-h05",
    category: "Behavioural",
    difficulty: "medium",
    timeLimit: 120,
    roundType: ["hr", "mixed"],
    q: "Where do you see yourself in 3 years?",
    hint: "Show ambition but stay grounded — tie it to growth within the company.",
    answer:
      "Answer honestly but with self-awareness: (1) Show technical growth ambition — moving from junior to mid/senior. (2) Mention specific skills or domains you want to master. (3) Tie it loosely to the company's trajectory — you want to grow WITH the team. Avoid 'I want your job' or 'running my own startup.'",
  },
  {
    id: "sim-h06",
    category: "Behavioural",
    difficulty: "hard",
    timeLimit: 180,
    roundType: ["hr"],
    q: "Describe a time you failed at something. What did you learn?",
    hint: "Own it — don't deflect. Interviewers want to see resilience and growth mindset.",
    answer:
      "Choose a REAL failure (not a 'humble-brag' failure). Structure: (1) What happened — be specific. (2) Why it was your fault or responsibility. (3) The immediate impact. (4) What you did to fix or recover from it. (5) The lasting lesson — what you do differently now. This shows maturity and learning agility.",
  },
  {
    id: "sim-h07",
    category: "Motivation",
    difficulty: "easy",
    timeLimit: 90,
    roundType: ["hr", "mixed"],
    q: "Why do you want to work here specifically? What do you know about our company?",
    hint: "Do your research. Specificity wins — vague answers lose points.",
    answer:
      "Structure: (1) Something specific about the company — their product, tech stack, engineering blog, recent news. (2) How it aligns with YOUR interests or goals. (3) What you want to contribute. Research: company website, LinkedIn, Glassdoor, engineering blog, recent product releases. Never say 'good salary' or 'job security.'",
  },
  {
    id: "sim-h08",
    category: "Teamwork",
    difficulty: "medium",
    timeLimit: 150,
    roundType: ["hr", "mixed"],
    q: "How do you handle tight deadlines and pressure? Give a specific example.",
    hint: "Show prioritization, communication, and delivery — not just 'I work harder'.",
    answer:
      "Show a systematic approach: (1) Clarify scope — what's truly essential vs nice-to-have. (2) Break down into tasks, estimate honestly. (3) Communicate proactively — flag risks early. (4) Focus on high-impact work first. Example: describe a specific sprint where you cut scope, communicated with stakeholders, and still delivered core functionality.",
  },
  {
    id: "sim-h09",
    category: "Growth",
    difficulty: "easy",
    timeLimit: 90,
    roundType: ["hr"],
    q: "How do you stay up to date with new technologies and best practices?",
    hint: "Show curiosity and consistency — not just 'I Google things.'",
    answer:
      "Be specific: (1) Sources — MDN, official docs, specific newsletters (ByteByteGo, JavaScript Weekly, Kent C. Dodds blog). (2) Practice — side projects, open source contributions. (3) Community — meetups, Discord communities, Twitter/X dev community. (4) Structured learning — Udemy courses, Frontend Masters, official docs walkthroughs.",
  },
  {
    id: "sim-h10",
    category: "Salary",
    difficulty: "hard",
    timeLimit: 120,
    roundType: ["hr"],
    q: "What are your salary expectations?",
    hint: "Research the market. Give a range, not a single number. Anchor high.",
    answer:
      "Research beforehand using Glassdoor, LinkedIn Salary, Levels.fyi for your market and role. Give a range where your target is at the LOW end: 'Based on my research and experience, I'm looking in the range of X–Y.' If pushed for a single number, give your target. Never undersell yourself. It's okay to ask 'What's the budget for this role?' first.",
  },

  // ── MIXED / SYSTEM DESIGN ──────────────────────────────────────────────────
  {
    id: "sim-m01",
    category: "System Design",
    difficulty: "hard",
    timeLimit: 180,
    roundType: ["technical", "mixed"],
    q: "How would you design a URL shortener like bit.ly at a high level?",
    hint: "Think: API endpoints, hash generation, database, redirect.",
    answer:
      "Core components: (1) POST /shorten → accept long URL, generate a 6-char hash (base62), store mapping in DB, return short URL. (2) GET /{code} → look up hash in DB, return 301/302 redirect. (3) Database: key-value store (Redis for speed, PostgreSQL for persistence). (4) Scale: CDN for popular links, cache top links in Redis. Edge cases: collision handling, expiry, analytics tracking.",
  },
  {
    id: "sim-m02",
    category: "Architecture",
    difficulty: "hard",
    timeLimit: 180,
    roundType: ["technical", "mixed"],
    q: "What is the difference between REST and GraphQL? When would you choose each?",
    hint: "Over-fetching vs precise queries.",
    answer:
      "REST: fixed endpoints, server defines data shape, can over/under-fetch. Simple, cacheable, widely understood. GraphQL: single endpoint, client defines exact data shape with a query, eliminates over-fetching. Choose REST for: simple CRUD, public APIs, caching requirements. Choose GraphQL for: complex nested data, multiple clients with different data needs (mobile vs web), rapid iteration on data requirements.",
  },
  {
    id: "sim-m03",
    category: "Debugging",
    difficulty: "medium",
    timeLimit: 150,
    roundType: ["technical", "mixed"],
    q: "A user reports your website is slow. Walk me through how you would investigate and fix it.",
    hint: "Network tab → Performance tab → Lighthouse → fix the bottleneck.",
    answer:
      "Step-by-step: (1) Open Chrome DevTools Network tab — check largest assets (bundle size, images), slow requests. (2) Run Lighthouse audit — get LCP, FCP, TTI scores and specific recommendations. (3) Performance tab — record page load, identify long tasks. Fixes: compress images (WebP), code split JS, lazy load below-fold content, add caching headers, use a CDN, optimize DB queries if API is slow.",
  },
  {
    id: "sim-m04",
    category: "Code Quality",
    difficulty: "medium",
    timeLimit: 120,
    roundType: ["technical", "mixed"],
    q: "What does SOLID stand for and which principle do you find most valuable in daily coding?",
    hint: "S-O-L-I-D — 5 principles of OOP design.",
    answer:
      "S — Single Responsibility: a class/function does ONE thing. O — Open/Closed: open for extension, closed for modification. L — Liskov Substitution: subclasses should be substitutable for their parent. I — Interface Segregation: don't force clients to implement interfaces they don't need. D — Dependency Inversion: depend on abstractions, not concretions. Most valuable daily: SRP — functions that do one thing are easier to test, reuse, and debug.",
  },
  {
    id: "sim-m05",
    category: "Collaboration",
    difficulty: "easy",
    timeLimit: 90,
    roundType: ["hr", "mixed"],
    q: "How do you approach a code review — both as the author and as the reviewer?",
    hint: "Empathy, clarity, and specificity matter in both roles.",
    answer:
      "As author: write small PRs (< 400 lines), add a description explaining the 'why', self-review first, add comments for complex logic. As reviewer: be kind and specific — 'Consider using useMemo here for performance' not 'This is wrong'. Distinguish blocking issues from suggestions. Ask questions rather than demand changes. Acknowledge good code too.",
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

import { interviewData } from "./index";
import type { SimRound, SimulationQuestion as SQ } from "../../types";

/**
 * Build the question pool for a given round.
 * Mixes new simulation-specific questions with existing flashcard questions
 * from the interviewData modules.
 */
export function buildQuestionPool(round: SimRound, count: number): SQ[] {
  // 1. Start with simulation-specific questions for this round
  const simPool = simulationQuestions.filter((q) => q.roundType.includes(round));

  // 2. Pull flashcard questions from interviewData modules and adapt them
  const adaptedFlashcards: SQ[] = [];
  const technicalSlugs = ["core-programming", "data-structures", "big-o", "oop", "solid", "frontend-basics", "javascript", "react", "nextjs", "rest-soap", "cors", "jwt", "sql", "node"];
  const hrSlugs = ["problem-solving"];

  const targetSlugs =
    round === "hr" ? hrSlugs :
    round === "technical" ? technicalSlugs :
    round === "f1soft" ? ["f1soft-interview"] :
    [...technicalSlugs, ...hrSlugs]; // mixed = all

  interviewData.forEach((sec) => {
    if (!targetSlugs.includes(sec.slug)) return;
    sec.questions.forEach((q) => {
      adaptedFlashcards.push({
        ...q,
        category: sec.title,
        difficulty: "medium" as const,
        timeLimit: 120,
        roundType: [round],
      });
    });
  });

  // 3. Shuffle each pool independently, then interleave sim questions first
  const shuffledSim = shuffle(simPool);
  const shuffledFlash = shuffle(adaptedFlashcards);
  const combined = [...shuffledSim, ...shuffledFlash];

  return combined.slice(0, count);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
