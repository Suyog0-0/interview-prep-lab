import type { InterviewSection } from "../../types";
import { s01_core } from "./s01_core";
import { s02_ds } from "./s02_ds";
import { s03_bigo } from "./s03_bigo";
import { s04_oop } from "./s04_oop";
import { s05_solid } from "./s05_solid";
import { s06_f1soft } from "./s06_f1soft";
import { s16_system_design } from "./s16_system_design";
import { leapfrogDaysSections } from "./leapfrog_prep_data";
export { dailyRevisionSetsWeek3 } from "./daily_revision_mcq_week3";
import { generateExams } from "./exams";
export { generateExams };
import {
  core_mcqs,
  ds_mcqs,
  bigo_mcqs,
  oop_mcqs,
  solid_mcqs,
  frontend_mcqs,
  js_mcqs,
  react_mcqs,
  nextjs_mcqs,
  rest_mcqs,
  cors_mcqs,
  jwt_mcqs,
  sql_mcqs,
  node_mcqs,
  problem_mcqs,
  f1soft_mcqs,   
} from "./mcqs";
 
export const s06_frontend: InterviewSection = {
  id: 6,
  slug: "frontend-basics",
  title: "Frontend Basics",
  subtitle: "HTML, CSS, Responsive Design",
  color: "#f43f5e",
  questions: [
    {
      id: "s06-q01",
      q: "What is the DOM?",
      hint: "The tree representation of a web page.",
      answer: "The Document Object Model is a tree-like representation of an HTML document. JavaScript uses the DOM API to read and manipulate page elements.",
    },
    {
      id: "s06-q02",
      q: "What is the box model in CSS?",
      hint: "Content, padding, border, margin.",
      answer: "Every HTML element is a box with four layers: Content → Padding → Border → Margin (outside in). box-sizing: border-box makes width include padding and border.",
    },
  ],
  mcqs: frontend_mcqs,
};
 
export const s07_js: InterviewSection = {
  id: 7,
  slug: "javascript",
  title: "JavaScript",
  subtitle: "Core + Advanced JavaScript Concepts",
  color: "#eab308",
  questions: [
    {
      id: "s07-q01",
      q: "What is a closure?",
      hint: "A function that remembers its outer scope.",
      answer: "A closure is a function that retains access to variables from its outer (enclosing) scope even after that scope has returned.",
    },
    {
      id: "s07-q02",
      q: "What is event delegation?",
      hint: "Attach one listener to the parent instead of many to children.",
      answer: "Instead of adding click listeners to every list item, add ONE listener to the parent <ul> and use event.target to detect which child was clicked. More efficient.",
    },
  ],
  mcqs: js_mcqs,
};
 
export const s08_react: InterviewSection = {
  id: 8,
  slug: "react",
  title: "React",
  subtitle: "Components, Hooks, State, Props",
  color: "#0ea5e9",
  questions: [
    {
      id: "s08-q01",
      q: "What is the virtual DOM?",
      hint: "An in-memory representation of the real DOM.",
      answer: "React keeps a virtual DOM in memory. When state changes, React builds a new virtual DOM, diffs it against the previous version, and only updates the CHANGED parts in the real DOM.",
    },
    {
      id: "s08-q02",
      q: "What is useEffect?",
      hint: "Hook for side effects.",
      answer: "useEffect runs after render. It takes a callback and an array of dependencies. Empty array means it runs only on mount.",
    },
  ],
  mcqs: react_mcqs,
};
 
export const s09_nextjs: InterviewSection = {
  id: 9,
  slug: "nextjs",
  title: "Next.js",
  subtitle: "SSR, SSG, App Router, Optimization",
  color: "#71717a",
  questions: [
    {
      id: "s09-q01",
      q: "What is the difference between SSR, SSG, and CSR?",
      hint: "When and where is the HTML generated?",
      answer: "CSR: React renders in browser. SSR: HTML built on server per request. SSG: HTML built at BUILD TIME. Fastest — served as file.",
    },
  ],
  mcqs: nextjs_mcqs,
};
 
export const s10_rest: InterviewSection = {
  id: 10,
  slug: "rest-soap",
  title: "REST API & SOAP",
  subtitle: "APIs, HTTP Methods, Status Codes",
  color: "#8b5cf6",
  questions: [
    {
      id: "s10-q01",
      q: "What are the HTTP methods and what do they do?",
      hint: "CRUD maps to HTTP methods.",
      answer: "GET: read, POST: create, PUT: replace, PATCH: partial update, DELETE: remove.",
      diagram: `[Client]                      [REST API Server]
   |                             |
   |--- GET /users/1 ----------->| (Read user 1)
   |<-- 200 OK { id: 1 } --------|
   |                             |
   |--- POST /users ------------>| (Create new user)
   |    { name: "John" }         |
   |<-- 201 Created { id: 2 } ---|
   |                             |
   |--- PUT /users/2 ----------->| (Replace user 2)
   |    { name: "Jane" }         |
   |<-- 200 OK { id: 2 } --------|
   |                             |
   |--- DELETE /users/2 -------->| (Delete user 2)
   |<-- 204 No Content ----------|`,
    },
  ],
  mcqs: rest_mcqs,
};
 
export const s11_cors: InterviewSection = {
  id: 11,
  slug: "cors",
  title: "CORS",
  subtitle: "Cross-Origin Resource Sharing",
  color: "#ec4899",
  questions: [
    {
      id: "s11-q01",
      q: "What is CORS?",
      hint: "Cross-Origin Resource Sharing.",
      answer: "CORS is a security feature built into web browsers that blocks web pages from making requests to a different domain than the one that served the web page.",
      diagram: `[Browser]                             [Server (api.com)]
    |                                     |
    |--- 1. Preflight OPTIONS request --->|
    |    (Origin: site.com)               |
    |                                     |-- Check allowed origins
    |<-- 2. 204 No Content ---------------|
    |    (Access-Control-Allow-Origin: *) |
    |                                     |
    |--- 3. Actual GET/POST request ----->|
    |                                     |-- Process request
    |<-- 4. 200 OK (with Data) -----------|`,
    },
  ],
  mcqs: cors_mcqs,
};
 
export const s12_jwt: InterviewSection = {
  id: 12,
  slug: "jwt",
  title: "JWT, Stateless & Stateful",
  subtitle: "Authentication and Sessions",
  color: "#14b8a6",
  questions: [
    {
      id: "s12-q01",
      q: "What is JWT?",
      hint: "JSON Web Token.",
      answer: "JWT is a compact URL-safe means of representing claims to be transferred between two parties. It's often used for stateless authentication.",
      diagram: `[Client]                      [Server]
   |                             |
   |--- 1. POST /login --------->|
   |    (username, password)     |
   |                             |-- Validate credentials
   |                             |-- Generate JWT (Header.Payload.Signature)
   |<-- 2. Return JWT -----------|
   |                             |
   |--- 3. GET /protected ------>|
   |    (Header: Bearer <JWT>)   |
   |                             |-- Verify Signature using Secret
   |                             |-- Extract Payload (e.g. userId: 123)
   |<-- 4. Return 200 OK --------|`,
    },
  ],
  mcqs: jwt_mcqs,
};
 
export const s13_sql: InterviewSection = {
  id: 13,
  slug: "sql",
  title: "SQL & PostgreSQL",
  subtitle: "Relational Databases, Queries, Joins",
  color: "#0284c7",
  questions: [
    {
      id: "s13-q01",
      q: "What is a JOIN in SQL?",
      hint: "Combining rows from two or more tables.",
      answer: "A JOIN clause is used to combine rows from two or more tables, based on a related column between them.",
    },
  ],
  mcqs: sql_mcqs,
};
 
export const s14_node: InterviewSection = {
  id: 14,
  slug: "node",
  title: "Node.js & Express",
  subtitle: "Backend JavaScript",
  color: "#22c55e",
  questions: [
    {
      id: "s14-q01",
      q: "What is Node.js?",
      hint: "JavaScript runtime.",
      answer: "Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser.",
      diagram: `[Incoming Requests]
       |
       v
[V8 Engine (JS Execution)] <---> [Event Queue]
       |                               |
       | (Non-blocking I/O)            | (Event Loop picks up callbacks)
       v                               |
[libuv (C++ Thread Pool)] -------------+
   |        |        |
[ File ] [ DB ] [ Network ]`,
    },
  ],
  mcqs: node_mcqs,
};
 
export const s15_problem: InterviewSection = {
  id: 15,
  slug: "problem-solving",
  title: "Problem Solving & Behavioural",
  subtitle: "Soft skills, System Design, Algorithms",
  color: "#f59e0b",
  questions: [
    {
      id: "s15-q01",
      q: "Describe a time you solved a difficult bug.",
      hint: "STAR method — focus on your debugging process.",
      answer: "Use the STAR framework: Situation (what was the context?), Task (what was your responsibility?), Action (how did you isolate and fix it — what tools, logs, or steps did you use?), Result (what was the outcome and what did you learn?). Interviewers want to see methodical thinking, not luck.",
    },
    {
      id: "s15-q02",
      q: "Tell me about a time you had to meet a very tight deadline. How did you handle it?",
      hint: "Show prioritisation + proactive communication — not just 'I worked harder'.",
      answer: "Structure your answer around: (1) Scope triage — immediately identify what is truly essential vs nice-to-have. (2) Honest estimation — break the work into tasks and time-box each one. (3) Early communication — flag risks to your manager before they become blockers. (4) Focused delivery — cut distractions and deliver the core functionality first. End with what you shipped and any post-sprint reflection.",
    },
    {
      id: "s15-q03",
      q: "Describe a situation where you had a conflict with a teammate. How did you resolve it?",
      hint: "Show maturity — you listened first, then communicated clearly.",
      answer: "Key signals interviewers look for: (1) You didn't escalate immediately or go passive-aggressive. (2) You sought to understand their perspective first (active listening). (3) You raised your own view calmly with reasoning, not emotion. (4) You sought a compromise or escalated appropriately if needed. (5) The working relationship was preserved. Use STAR and make sure the 'Action' section is detailed.",
    },
    {
      id: "s15-q04",
      q: "Give an example of a time you took initiative without being asked.",
      hint: "Pick something that had measurable impact — not just extra hours.",
      answer: "Good examples: noticing a recurring bug and proactively fixing it, writing documentation that didn't exist, automating a manual process, or onboarding a new teammate when no one else offered. Frame it as: (1) What you noticed. (2) Why you decided to act. (3) What you did. (4) The outcome. Avoid stories where the 'initiative' was just doing your job.",
    },
    {
      id: "s15-q05",
      q: "How do you prioritise tasks when everything feels urgent?",
      hint: "Show a system — not just 'I make a list'.",
      answer: "Mention a framework: (1) Urgency vs Impact matrix — what is both urgent AND high impact? Start there. (2) Clarify with stakeholders — urgency is often perception, not reality. A quick conversation can reorder priorities. (3) Time-box context switching — avoid multitasking by batching related tasks. (4) Communicate your current priority to the team so expectations are aligned. Tools: Kanban boards, linear, notion task lists.",
    },
    {
      id: "s15-q06",
      q: "Tell me about a project that failed or didn't go as planned. What did you learn?",
      hint: "Own it — don't deflect. Interviewers want to see resilience and a growth mindset.",
      answer: "Choose a REAL failure — not a humble-brag. Structure: (1) What was the project and what was your role. (2) What went wrong — be specific (missed requirements, underestimated complexity, poor communication). (3) What was the impact. (4) What you did to recover or mitigate. (5) The durable lesson — what do you do differently now? Avoid blaming others entirely even if they contributed.",
    },
    {
      id: "s15-q07",
      q: "How do you approach learning a new technology or framework quickly?",
      hint: "Show a structured process — not just 'I watch YouTube tutorials'.",
      answer: "(1) Read the official docs first — not blog posts. (2) Build a minimal proof-of-concept rather than just reading. (3) Identify the core concepts (e.g. for React: components, state, props, lifecycle). (4) Find the gaps by doing something real and hitting actual problems. (5) Read source code or study popular open-source projects using the tech. (6) Apply it to a real side project to solidify understanding.",
    },
    {
      id: "s15-q08",
      q: "Describe a time you disagreed with a technical decision made by your team or manager.",
      hint: "Show you can advocate for your view professionally AND accept decisions gracefully.",
      answer: "Structure: (1) What was the decision and why you disagreed — be specific (performance, maintainability, scalability concerns). (2) How you raised it — ideally with data, a prototype, or a written comparison. (3) What happened — was your view accepted, partially accepted, or overruled? (4) How you responded if overruled — you committed fully and professionally, and you may have revisited it later if you were proven right. Shows maturity and professionalism.",
    },
    {
      id: "s15-q09",
      q: "What is your approach to giving and receiving code review feedback?",
      hint: "Empathy + specificity in both directions.",
      answer: "Giving feedback: (1) Be specific — not 'this is wrong', but 'consider using useMemo here because X re-renders on every render'. (2) Distinguish blocking issues from suggestions. (3) Ask questions rather than make demands ('What was the reasoning for this approach?'). (4) Acknowledge good code too. Receiving feedback: (1) Separate your ego from your code. (2) Ask for clarification if you don't understand. (3) Thank reviewers — they're investing their time in you.",
    },
    {
      id: "s15-q10",
      q: "Walk me through how you would design a simple system from scratch. For example: a to-do app.",
      hint: "Think out loud — requirements → data model → API → frontend → edge cases.",
      answer: "Step-by-step approach: (1) Clarify requirements — CRUD operations, user auth needed? Multi-user? (2) Data model — a Task has id, title, completed, userId, createdAt. (3) API design — GET /tasks, POST /tasks, PATCH /tasks/:id, DELETE /tasks/:id. (4) Frontend — components: TaskList, TaskItem, AddTaskForm. State: array of tasks + loading/error. (5) Edge cases — what if the network fails? Optimistic UI? Offline support? This structured thinking is what interviewers evaluate.",
    },
  ],
  mcqs: problem_mcqs,
};
 
import {
  leapfrog_coding,
  leapfrog_virtual,
  leapfrog_onsite,
  leapfrog_hr,
  leapfrog_remote,
} from "./leapfrog_sections_data";
import { leapfrogRemoteAssignmentsSection } from "./leapfrog_remote_assignments";
 
s01_core.mcqs = core_mcqs;
s02_ds.mcqs = ds_mcqs;
s03_bigo.mcqs = bigo_mcqs;
s04_oop.mcqs = oop_mcqs;
s05_solid.mcqs = solid_mcqs;
s06_f1soft.mcqs = f1soft_mcqs;
 
export const leapfrog_overall: InterviewSection = {
  id: 22,
  slug: "leapfrog-overall",
  title: "Overall Prep",
  subtitle: "3-Week Study Plan · Coding Exam → HR Interview",
  color: "#3b82f6",
  questions: [],
};



export const leapfrog_simulation: InterviewSection = {
  id: 21,
  slug: "leapfrog-simulation",
  title: "Interview Simulation",
  subtitle: "Mock Leapfrog Interview",
  color: "#3b82f6",
  questions: [],
};

export const interviewData: InterviewSection[] = [
  s01_core,
  s02_ds,
  s03_bigo,
  s04_oop,
  s05_solid,
  s06_frontend,
  s07_js,
  s08_react,
  s09_nextjs,
  s10_rest,
  s11_cors,
  s12_jwt,
  s13_sql,
  s14_node,
  s15_problem,
  s16_system_design,
  s06_f1soft,
  ...leapfrogDaysSections,
  leapfrog_overall,
  leapfrog_coding,
  leapfrog_virtual,
  leapfrog_onsite,
  leapfrog_hr,
  leapfrog_remote,
  leapfrogRemoteAssignmentsSection,
  leapfrog_simulation
];

export const examsData = generateExams(interviewData);