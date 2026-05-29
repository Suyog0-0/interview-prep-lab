<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white" />
</p>

<h1 align="center">Interview Prep Lab</h1>

<p align="center">
  <strong>An interactive frontend and full-stack engineering interview preparation suite.</strong>
  <br />
  Features spaced-repetition flashcards, multiple-choice testing, and curated technical lecture notes.
</p>

<p align="center">
  <a href="#key-capabilities">Capabilities</a> &bull;
  <a href="#curriculum-modules">Curriculum</a> &bull;
  <a href="#quick-start">Quick Start</a> &bull;
  <a href="#directory-structure">Structure</a> &bull;
  <a href="#data-extension">Data Extension</a>
</p>

---

## Key Capabilities

✦ **Interactive Flashcard Deck**
* Double-sided interactive cards featuring distinct, amber-themed lightbulb hints.
* Smooth, high-framerate flip/reveal animations using pure CSS/Tailwind transitions.
* Formatted, VS Code-styled inline and block-level code syntax highlighting.

✦ **MCQ Assessment Engine**
* Modular 20-question evaluation exams with instant color-coded visual feedback.
* Comprehensive technical explanations provided for both correct and incorrect choices.
* Real-time metrics dashboard tracking individual section completion and exam accuracy.

✦ **Structured Lecture Notes**
* Compact, university-inspired review notes built directly alongside flashcard and MCQ modules.
* Rich text formatting featuring precise typographic treatments and inline syntax markers.
* Highlights technical nuances through beautifully styled Pro-Tip alert callouts.

✦ **Unified Engine Search**
* In-memory indexing engine supporting instantaneous keyword search across all content areas.
* Segregated search results categorized by Question, Answer, Hint, and Explanation types.

---

## Curriculum Modules

| ID | Focus Area | Core Competencies |
| :--- | :--- | :--- |
| **01** | Core Programming | Execution contexts, lexical scope, closures, recursion, hoisting |
| **02** | Data Structures | Arrays, linked lists, stacks, queues, hash maps, binary trees |
| **03** | Big O Notation | Time and space complexity analysis, optimization strategies |
| **04** | OOP Paradigm | Encapsulation, inheritance, polymorphism, abstraction |
| **05** | SOLID Principles | Five-factor software design philosophy and clean architecture |
| **06** | Web Standards | Semantic HTML5, CSS box models, layouts (Flexbox/Grid), accessibility |
| **07** | JavaScript Core | Event loop, micro/macrotasks, prototype chains, promise pipelines |
| **08** | React Ecosystem | Fiber reconciliation, hook lifecycles, global and local state |
| **09** | Next.js Architecture | Server-side rendering (SSR), static site generation (SSG), App Router |
| **10** | API Topologies | RESTful design constraints, JSON RPC, SOAP protocols, status codes |
| **11** | CORS Protocol | Same-origin security policy, preflight handshakes, security headers |
| **12** | Authentication | Stateless JWT standards, sessions, tokens, claims, OAuth flows |
| **13** | Database Engines | Relational SQL, transactional ACID, indexes, query planning |
| **14** | Node.js Runtime | Event-driven I/O, middleware patterns, scaling, stream pipelines |
| **15** | Systems & Behavior | STAR method methodology, system-level design patterns |

---

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/Suyog0-0/interview-prep-lab.git

# Enter workspace
cd interview-prep-lab

# Install package dependencies
npm install

# Run the local development server
npm run dev
```

The server launches instantly at `http://localhost:3000`.

---

## Directory Structure

```
interview-prep-lab/
├── app/
│   ├── data/                 # Segmented question banks and lecture guides
│   │   ├── index.ts          # Aggregate exporter of study segments
│   │   ├── mcqs.ts           # Consolidated MCQ dataset across all modules
│   │   ├── s01_core.ts       # Module 01: Core programming concepts
│   │   ├── s02_ds.ts         # Module 02: Complex data structures
│   │   ├── s03_bigo.ts       # Module 03: Big O complexities
│   │   ├── s04_oop.ts        # Module 04: Object-oriented programming
│   │   └── s05_solid.ts      # Module 05: SOLID software design principles
│   ├── globals.css           # Global typography, color tokens, and animations
│   ├── layout.tsx            # Main layout wrapper injecting Google Fonts
│   └── page.tsx              # Application layout and state machine controller
├── types.ts                  # Static TypeScript schema definitions
├── package.json
└── tsconfig.json
```

---

## Data Extension

The system is highly modular. You can easily extend flashcards, MCQs, or lecture notes by adhering to the type structures.

### Extending Flashcards

Append new items to the `questions` array inside any data file (e.g., `app/data/s01_core.ts`):

```typescript
{
  id: "s01-q16",
  q: "What is type coercion?",
  hint: "Automatic casting during runtime operations.",
  answer: "The implicit conversion of values from one data type to another by the engine.",
  code: `console.log("5" + 3);  // "53" (string concatenation)
console.log("5" - 3);  // 2 (numeric subtraction)`,
  language: "javascript",
}
```

### Adding New Exams

Modify `app/data/mcqs.ts` and add questions to the relevant module section:

```typescript
{
  id: "core-mcq-21",
  question: "Which keyword declares block-scoped re-assignable bindings?",
  options: ["var", "let", "const", "global"],
  correctAnswerIndex: 1,
  explanation: "'let' assigns a mutable variable bound to the containing block.",
}
```

### Writing Lecture Guides

Add note records to any module configuration inside the `notes` list:

```typescript
notes: [
  {
    title: "Understanding Closures",
    content: "A **closure** is created when a inner function retains reference to its outer lexical environment...",
    code: `const counter = () => {
  let count = 0;
  return () => ++count;
};`,
    language: "javascript",
    tip: "Closures enable state encapsulation and form the foundational basis of React Hooks.",
  },
]
```

---

<p align="center">
  Crafted by <a href="https://github.com/Suyog0-0"><strong>Suyog</strong></a>
</p>
