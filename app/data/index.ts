import type { InterviewSection } from "../../types";
import { s01_core } from "./s01_core";
import { s02_ds } from "./s02_ds";
import { s03_bigo } from "./s03_bigo";
import { s04_oop } from "./s04_oop";
import { s05_solid } from "./s05_solid";
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
  problem_mcqs
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
      hint: "STAR method.",
      answer: "Situation, Task, Action, Result. Focus on your debugging process and what you learned.",
    },
  ],
  mcqs: problem_mcqs,
};

s01_core.mcqs = core_mcqs;
s02_ds.mcqs = ds_mcqs;
s03_bigo.mcqs = bigo_mcqs;
s04_oop.mcqs = oop_mcqs;
s05_solid.mcqs = solid_mcqs;

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
];
