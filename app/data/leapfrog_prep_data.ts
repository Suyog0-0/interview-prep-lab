import type { InterviewSection } from "../../types";

export type PrepTag = "JS" | "DSA" | "PROJECT" | "REVIEW" | "INTERVIEW" | "BREAK";

export interface TimeBlock {
  time: string;
  task: string;
  tag: PrepTag;
}

export interface PrepDay {
  dayNum: number;
  label: string;
  date: string; // ISO YYYY-MM-DD
  topic: string;
  blocks: TimeBlock[];
}

export interface PrepWeek {
  weekNum: number;
  dates: string;
  focus: string;
  days: PrepDay[];
}

export interface RhythmTip {
  num: number;
  title: string;
  body: string;
}

export interface PriorityProblem {
  num: number;
  problem: string;
  platform: "LeetCode" | "HackerRank" | "BFA/JS";
}

export interface PrepStage {
  num: number;
  title: string;
  bullets: string[];
}

export interface PrepResource {
  title: string;
  url: string;
  description: string;
}

// ─── Daily Rhythm Tips ────────────────────────────────────────
export const rhythmTips: RhythmTip[] = [
  {
    num: 1,
    title: "POMODORO BLOCKS",
    body: "Study 50 min, break 10 min. Don't grind for 3 hours straight — your recall drops sharply.",
  },
  {
    num: 2,
    title: "WRITE BEFORE YOU CODE",
    body: "For every DSA problem, write your approach in plain language first. This is what interviewers look for.",
  },
  {
    num: 3,
    title: "SPACED REPETITION",
    body: "Re-solve yesterday's problems from scratch each morning for 15 min before starting new material.",
  },
  {
    num: 4,
    title: "COMMIT DAILY",
    body: "Push code to GitHub every day during Week 2–3. Green squares show activity and interviewers notice.",
  },
  {
    num: 5,
    title: "TALK OUT LOUD",
    body: "Solve every problem out loud, as if someone is watching. This is the single biggest difference between passing and failing a technical interview.",
  },
];

// ─── 3-Week Schedule ──────────────────────────────────────────
export const prepWeeks: PrepWeek[] = [
  // ───── WEEK 1 ─────
  {
    weekNum: 1,
    dates: "June 9–15",
    focus: "JS Foundations + BFA Questions",
    days: [
      {
        dayNum: 1,
        label: "Monday, June 9",
        date: "2026-06-09",
        topic: "JS Core I — var/let/const, scope, hoisting",
        blocks: [
          { time: "9:00–10:30",  task: "Read & write: var vs let vs const, TDZ, scope", tag: "JS" },
          { time: "10:40–12:00", task: "Hoisting — variables and functions, mental model", tag: "JS" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "BFA: Reverse a string, Palindrome check, Count vowels", tag: "JS" },
          { time: "2:40–4:00",   task: "LeetCode: Two Sum (Easy) + Palindrome Number", tag: "DSA" },
          { time: "4:10–5:00",   task: "Review & write summary notes", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 2,
        label: "Tuesday, June 10",
        date: "2026-06-10",
        topic: "JS Core II — Closures, this, arrow functions",
        blocks: [
          { time: "9:00–10:30",  task: "Closures deep dive — counter example, private variables, real use cases", tag: "JS" },
          { time: "10:40–12:00", task: "Arrow functions vs regular, 'this' binding, call/apply/bind", tag: "JS" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "BFA: First non-repeating char, Anagram check, Word frequency count", tag: "JS" },
          { time: "2:40–4:00",   task: "LeetCode: Valid Anagram + Contains Duplicate", tag: "DSA" },
          { time: "4:10–5:00",   task: "Re-solve Day 1 problems from scratch", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 3,
        label: "Wednesday, June 11",
        date: "2026-06-11",
        topic: "Arrays & Objects — Custom map/filter/reduce",
        blocks: [
          { time: "9:00–10:30",  task: "Custom map, filter, reduce — implement from scratch", tag: "JS" },
          { time: "10:40–12:00", task: "BFA Arrays: Largest, 2nd largest, remove duplicates, find missing N", tag: "JS" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "BFA Objects: Merge objects, deep copy, flatten nested object", tag: "JS" },
          { time: "2:40–4:00",   task: "LeetCode: Merge Sorted Array + Binary Search", tag: "DSA" },
          { time: "4:10–5:00",   task: "Re-solve Day 2 problems", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 4,
        label: "Thursday, June 12",
        date: "2026-06-12",
        topic: "Async JS — Promises, async/await, event loop",
        blocks: [
          { time: "9:00–10:30",  task: "Event loop, call stack, microtask queue — draw it out mentally", tag: "JS" },
          { time: "10:40–12:00", task: "Promises: .then/.catch/.finally, Promise.all, Promise.race", tag: "JS" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "Async/await, error handling, real API fetch example", tag: "JS" },
          { time: "2:40–4:00",   task: "DOM: Fetch data from an API and display it (use JSONPlaceholder)", tag: "PROJECT" },
          { time: "4:10–5:00",   task: "Re-solve Day 3 problems", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 5,
        label: "Friday, June 13",
        date: "2026-06-13",
        topic: "DOM + Events — Todo list, event bubbling",
        blocks: [
          { time: "9:00–10:30",  task: "Event bubbling, capturing, stopPropagation, delegation", tag: "JS" },
          { time: "10:40–12:00", task: "DOM: Build a Todo list with add/delete/complete", tag: "PROJECT" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "DOM: Toggle dark mode + Search filter", tag: "PROJECT" },
          { time: "2:40–4:00",   task: "LeetCode: Valid Parentheses + Maximum Subarray", tag: "DSA" },
          { time: "4:10–5:00",   task: "Re-solve Day 4 problems", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 6,
        label: "Saturday, June 14",
        date: "2026-06-14",
        topic: "Debounce & Throttle, Prototype, Inheritance",
        blocks: [
          { time: "9:00–10:30",  task: "Implement debounce from scratch, explain use case", tag: "JS" },
          { time: "10:40–12:00", task: "Implement throttle from scratch, compare with debounce", tag: "JS" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "Prototype chain, inheritance, class vs prototype", tag: "JS" },
          { time: "2:40–4:00",   task: "BFA: Flatten nested arrays, group objects by property", tag: "JS" },
          { time: "4:10–5:00",   task: "Re-solve Day 5 problems", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 7,
        label: "Sunday, June 15",
        date: "2026-06-15",
        topic: "Review Day",
        blocks: [
          { time: "9:00–11:00",  task: "Re-solve all BFA problems from Day 1–6 WITHOUT looking at notes", tag: "REVIEW" },
          { time: "11:00–12:00", task: "Re-solve LeetCode: Two Sum, Valid Anagram, Binary Search", tag: "REVIEW" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "Write out JS concepts from memory: closures, event loop, promises", tag: "REVIEW" },
          { time: "2:30–4:00",   task: "LeetCode 30 Days JS — pick 3 problems from plan", tag: "DSA" },
          { time: "4:00–5:00",   task: "Rest, light reading, no heavy coding", tag: "REVIEW" },
        ],
      },
    ],
  },

  // ───── WEEK 2 ─────
  {
    weekNum: 2,
    dates: "June 16–22",
    focus: "DSA + HackerRank + JS Deep Dive",
    days: [
      {
        dayNum: 8,
        label: "Monday, June 16",
        date: "2026-06-16",
        topic: "HackerRank Warmup (all 8 warm-up problems)",
        blocks: [
          { time: "9:00–11:00",  task: "Solve all 8 HackerRank warm-up questions (Simple Array Sum, Triplets, etc.)", tag: "DSA" },
          { time: "11:00–12:00", task: "LeetCode: Best Time to Buy & Sell Stock", tag: "DSA" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "JS: Flatten nested object, Deep clone — practice 3x", tag: "JS" },
          { time: "2:40–4:00",   task: "LeetCode 30 Days JS — 3 questions", tag: "DSA" },
          { time: "4:10–5:00",   task: "Re-solve yesterday's problems", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 9,
        label: "Tuesday, June 17",
        date: "2026-06-17",
        topic: "Strings & Arrays — Sliding window, two-pointer",
        blocks: [
          { time: "9:00–10:30",  task: "Learn sliding window technique with examples", tag: "DSA" },
          { time: "10:40–12:00", task: "LeetCode: Longest Substring Without Repeating Characters", tag: "DSA" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "LeetCode: Product of Array Except Self", tag: "DSA" },
          { time: "2:40–4:00",   task: "HackerRank: Sales by Match, Counting Valleys", tag: "DSA" },
          { time: "4:10–5:00",   task: "Re-solve previous weak problems", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 10,
        label: "Wednesday, June 18",
        date: "2026-06-18",
        topic: "Hash Maps — Group Anagrams, Top K",
        blocks: [
          { time: "9:00–10:30",  task: "Hash map pattern: when and why to use it", tag: "DSA" },
          { time: "10:40–12:00", task: "LeetCode: Group Anagrams + Top K Frequent Elements", tag: "DSA" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "HackerRank: Ransom Note + Sherlock and Anagrams", tag: "DSA" },
          { time: "2:40–4:00",   task: "LeetCode 30 Days JS — 3 questions", tag: "DSA" },
          { time: "4:10–5:00",   task: "Re-solve Day 9 problems", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 11,
        label: "Thursday, June 19",
        date: "2026-06-19",
        topic: "Stacks & Queues — Balanced brackets, patterns",
        blocks: [
          { time: "9:00–10:30",  task: "Stack/queue concept, implement in JS (array-based)", tag: "DSA" },
          { time: "10:40–12:00", task: "LeetCode: Valid Parentheses (re-solve for speed)", tag: "DSA" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "HackerRank: Balanced Brackets + Jumping on Clouds", tag: "DSA" },
          { time: "2:40–4:00",   task: "HackerRank: Repeated String + 2D Array DS", tag: "DSA" },
          { time: "4:10–5:00",   task: "Re-solve Day 10 problems", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 12,
        label: "Friday, June 20",
        date: "2026-06-20",
        topic: "Linked Lists — Reverse, cycle detection",
        blocks: [
          { time: "9:00–10:30",  task: "Linked list concepts: node, pointer, null termination", tag: "DSA" },
          { time: "10:40–12:00", task: "LeetCode: Reverse Linked List", tag: "DSA" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "HackerRank: Left Rotation + New Year Chaos", tag: "DSA" },
          { time: "2:40–4:00",   task: "LeetCode: Search in Rotated Sorted Array", tag: "DSA" },
          { time: "4:10–5:00",   task: "Re-solve Day 11 problems", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 13,
        label: "Saturday, June 21",
        date: "2026-06-21",
        topic: "DOM Project Day — Build accordion + modal",
        blocks: [
          { time: "9:00–11:00",  task: "Build accordion component from scratch, push to GitHub", tag: "PROJECT" },
          { time: "11:00–12:00", task: "Build modal popup with close on outside click", tag: "PROJECT" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–3:00",   task: "Polish GitHub repo: good README, clean commits, live demo if possible", tag: "PROJECT" },
          { time: "3:00–5:00",   task: "HackerRank: Min Swaps 2 + Array Manipulation", tag: "DSA" },
        ],
      },
      {
        dayNum: 14,
        label: "Sunday, June 22",
        date: "2026-06-22",
        topic: "Review Day — Mock test (2 hrs, no hints)",
        blocks: [
          { time: "9:00–11:00",  task: "Mock coding test: pick 4 unseen problems, solve under time pressure", tag: "REVIEW" },
          { time: "11:00–12:00", task: "Review solutions and note mistakes", tag: "REVIEW" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "Re-solve all weak problems from Week 2", tag: "REVIEW" },
          { time: "2:30–4:00",   task: "LeetCode 30 Days JS — 3 more questions", tag: "DSA" },
          { time: "4:00–5:00",   task: "Update GitHub profile README with skills/projects", tag: "PROJECT" },
        ],
      },
    ],
  },

  // ───── WEEK 3 ─────
  {
    weekNum: 3,
    dates: "June 23–30",
    focus: "Interview Prep + GitHub Polish + Mock Exams",
    days: [
      {
        dayNum: 15,
        label: "Monday, June 23",
        date: "2026-06-23",
        topic: "Interview Q&A — JS theory: top 15 questions",
        blocks: [
          { time: "9:00–11:00",  task: "Prepare spoken answers: closures, hoisting, event loop, 'this' — say them OUT LOUD", tag: "INTERVIEW" },
          { time: "11:00–12:00", task: "Prepare: Promises vs async/await, call/apply/bind", tag: "INTERVIEW" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "LeetCode: 3Sum + Container With Most Water (Medium)", tag: "DSA" },
          { time: "2:40–4:30",   task: "Review your GitHub projects — know every line you wrote", tag: "PROJECT" },
          { time: "4:30–5:00",   task: "Write 2-min project pitch for each GitHub project", tag: "INTERVIEW" },
        ],
      },
      {
        dayNum: 16,
        label: "Tuesday, June 24",
        date: "2026-06-24",
        topic: "GitHub Polish — READMEs, project walkthroughs",
        blocks: [
          { time: "9:00–11:30",  task: "Add/update README for all 3–5 GitHub projects: description, tech used, how to run, screenshots", tag: "PROJECT" },
          { time: "11:30–12:00", task: "Pin your best 3 repositories on GitHub profile", tag: "PROJECT" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "Prepare: 'Tell me about a project you built' — 3 stories ready", tag: "INTERVIEW" },
          { time: "2:30–4:30",   task: "LeetCode: Number of Islands + Course Schedule", tag: "DSA" },
          { time: "4:30–5:00",   task: "Re-solve 3 problems from earlier weeks", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 17,
        label: "Wednesday, June 25",
        date: "2026-06-25",
        topic: "Mock Interview Day — Record yourself answering",
        blocks: [
          { time: "9:00–10:30",  task: "Self mock: Record yourself answering 10 JS theory questions — watch it back", tag: "INTERVIEW" },
          { time: "10:30–12:00", task: "Live code practice: solve problems while explaining out loud (screenshare mindset)", tag: "DSA" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:30",   task: "HR interview prep: 'Tell me about yourself', 'Why Leapfrog?', 'Strengths/weaknesses'", tag: "INTERVIEW" },
          { time: "2:30–4:30",   task: "LeetCode: Clone Graph + Mixed review (1 Easy, 1 Medium)", tag: "DSA" },
          { time: "4:30–5:00",   task: "Note down weak areas, schedule next-day fix", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 18,
        label: "Thursday, June 26",
        date: "2026-06-26",
        topic: "Remote Assignment Prep — Timed build: full mini-app",
        blocks: [
          { time: "9:00–12:00",  task: "Simulate a remote assignment: build a JS app in 3 hours (Fetch API + filter + display)", tag: "PROJECT" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:00",   task: "Review your build: is the code clean? Readable? Commented?", tag: "PROJECT" },
          { time: "2:00–4:00",   task: "DSA review: revisit all Medium problems you struggled with", tag: "DSA" },
          { time: "4:00–5:00",   task: "Prepare 'What questions do you have for us?' — 5 smart questions ready", tag: "INTERVIEW" },
        ],
      },
      {
        dayNum: 19,
        label: "Friday, June 27",
        date: "2026-06-27",
        topic: "On-site Tech Prep — Whiteboard + live coding",
        blocks: [
          { time: "9:00–11:00",  task: "Whiteboard practice: solve 3 problems on paper/notebook, no computer", tag: "INTERVIEW" },
          { time: "11:00–12:00", task: "Explain your solution line-by-line out loud (simulate examiner watching)", tag: "INTERVIEW" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–3:00",   task: "Final DSA sweep: Top 15 priority problems — re-solve all", tag: "DSA" },
          { time: "3:00–4:30",   task: "Final JS theory sweep: all BFA JS questions — write answers", tag: "JS" },
          { time: "4:30–5:00",   task: "Light review, no new material", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 20,
        label: "Saturday, June 28",
        date: "2026-06-28",
        topic: "Full Mock Test — 2-hr timed exam simulation",
        blocks: [
          { time: "9:00–11:00",  task: "Full timed mock: 2 hrs, mix of coding + JS theory — no hints, no Google", tag: "REVIEW" },
          { time: "11:00–12:00", task: "Grade yourself, identify gaps", tag: "REVIEW" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–3:00",   task: "Fix every gap identified from mock test", tag: "REVIEW" },
          { time: "3:00–4:30",   task: "Final GitHub commit — make sure repos look clean", tag: "PROJECT" },
          { time: "4:30–5:00",   task: "Rest. You've earned it.", tag: "REVIEW" },
        ],
      },
      {
        dayNum: 21,
        label: "Sunday, June 29",
        date: "2026-06-29",
        topic: "Light Review — Only revisit, NO new topics",
        blocks: [
          { time: "9:00–10:30",  task: "Re-read your own summary notes from Week 1 & 2", tag: "REVIEW" },
          { time: "10:30–12:00", task: "Solve 5 problems you're confident in — confidence boost", tag: "DSA" },
          { time: "LUNCH",       task: "Lunch Break", tag: "BREAK" },
          { time: "1:00–2:00",   task: "Rehearse project pitches and 'tell me about yourself' one more time", tag: "INTERVIEW" },
          { time: "2:00–3:00",   task: "Prepare physically: sleep schedule, what to bring, location, directions", tag: "INTERVIEW" },
          { time: "3:00+",       task: "REST. No heavy study. Sleep early.", tag: "REVIEW" },
        ],
      },
    ],
  },
];

// ─── Top 15 Priority Problems ─────────────────────────────────
export const priorityProblems: PriorityProblem[] = [
  { num: 1,  problem: "Two Sum",                                        platform: "LeetCode" },
  { num: 2,  problem: "Valid Anagram",                                  platform: "LeetCode" },
  { num: 3,  problem: "Contains Duplicate",                             platform: "LeetCode" },
  { num: 4,  problem: "Binary Search",                                  platform: "LeetCode" },
  { num: 5,  problem: "Group Anagrams",                                 platform: "LeetCode" },
  { num: 6,  problem: "Longest Substring Without Repeating Characters", platform: "LeetCode" },
  { num: 7,  problem: "Sales by Match",                                 platform: "HackerRank" },
  { num: 8,  problem: "Counting Valleys",                               platform: "HackerRank" },
  { num: 9,  problem: "Balanced Brackets",                              platform: "HackerRank" },
  { num: 10, problem: "Reverse String",                                 platform: "BFA/JS" },
  { num: 11, problem: "Palindrome Check",                               platform: "BFA/JS" },
  { num: 12, problem: "Remove Duplicates from Array",                   platform: "BFA/JS" },
  { num: 13, problem: "Closures — explain + implement",                 platform: "BFA/JS" },
  { num: 14, problem: "Promises + Async/Await",                         platform: "BFA/JS" },
  { num: 15, problem: "Debounce & Throttle — implement from scratch",   platform: "BFA/JS" },
];

// ─── JS Theory Questions ──────────────────────────────────────
export const jsTheoryQuestions: string[] = [
  "Difference between var, let, and const",
  "Explain closures (with a counter/private variable example)",
  "Explain hoisting",
  "Explain event bubbling",
  "Explain promises",
  "Explain async/await",
  "Explain the event loop",
  "Explain call, apply, and bind",
  "Explain prototype inheritance",
  "Explain arrow functions vs regular functions",
];

// ─── Interview Prep Stages ────────────────────────────────────
export const prepStages: PrepStage[] = [
  {
    num: 1,
    title: "Coding Exam",
    bullets: [
      "Focus: LeetCode Easy + specific Mediums + BFA problems",
      "Time pressure is real — practice solving fast",
      "Write your approach in comments before coding",
    ],
  },
  {
    num: 2,
    title: "Virtual Interview",
    bullets: [
      "Focus: JS theory questions (spoken answers)",
      "Be ready to explain closures, event loop, promises clearly",
      "Have your GitHub open and ready to walk through",
    ],
  },
  {
    num: 3,
    title: "Remote Assignment",
    bullets: [
      "Focus: Build a small JS app in limited time",
      "Practice: Fetch API + display data + filter/search",
      "Code must be clean, commented, and working",
      "Submit with a README explaining what you built",
    ],
  },
  {
    num: 4,
    title: "On-Site Technical Interview",
    bullets: [
      "Focus: Live coding + system thinking + explain your code",
      "Practice solving on paper/whiteboard first",
      "Think out loud — they want to hear your process",
    ],
  },
  {
    num: 5,
    title: "HR Interview",
    bullets: [
      "'Tell me about yourself' (2 min, JS-focused)",
      "'Why Leapfrog specifically?' (research the company)",
      "One project story per GitHub repo",
      "'What questions do you have for us?' (5 smart questions)",
    ],
  },
];

// ─── Smart Questions to ask Leapfrog ─────────────────────────
export const smartQuestions: string[] = [
  "What does the training period look like in the first 8–10 weeks?",
  "What tech stack do most frontend trainees work with?",
  "What does a typical day look like for a trainee developer?",
  "How is performance evaluated during the training period?",
  "What opportunities are there to work on real client projects?",
];

// ─── Resources ────────────────────────────────────────────────
export const prepResources: PrepResource[] = [
  {
    title: "LeetCode 30 Days of JavaScript",
    url: "https://leetcode.com/studyplan/30-days-of-javascript/",
    description: "Official structured 30-day JS plan on LeetCode",
  },
  {
    title: "JSONPlaceholder",
    url: "https://jsonplaceholder.typicode.com/",
    description: "Free fake API for practising fetch/display patterns",
  },
  {
    title: "HackerRank Interview Prep Kit",
    url: "https://www.hackerrank.com/interview/preparation-kit",
    description: "Curated problems used in real company hiring",
  },
  {
    title: "Reference Instagram Post",
    url: "https://www.instagram.com/p/DY9QsBXFKcr/?img_index=3",
    description: "Visual problem reference from your notes",
  },
];

// ─── Generated Day Sections ───────────────────────────────────
export const leapfrogDaysSections: InterviewSection[] = prepWeeks.flatMap(week => 
  week.days.map(day => ({
    id: 100 + day.dayNum, // 101 to 121
    slug: `leapfrog-overall-day-${day.dayNum}`,
    title: `Day ${day.dayNum}: ${day.topic.split('—')[0].trim()}`,
    subtitle: `Week ${week.weekNum} · ${day.label}`,
    color: "#3b82f6",
    questions: [],
    // We can store the day data in notes or a custom property, but we can just find it in page.tsx by slug
  }))
);
