<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

<h1 align="center">Interview Prep Lab</h1>

<p align="center">
  <strong>An interactive web application for full-stack and frontend interview preparation.</strong>
  <br />
  <em>Flashcards, MCQ assessments, and structured lecture notes — built for engineers, by an engineer.</em>
</p>

<p align="center">
  <a href="#features">Features</a> &middot;
  <a href="#modules">Modules</a> &middot;
  <a href="#getting-started">Getting Started</a> &middot;
  <a href="#project-structure">Structure</a> &middot;
  <a href="#customization">Customize</a>
</p>

---

## About

**Interview Prep Lab** is a single-page study application designed to help software engineers systematically prepare for technical interviews. It provides structured, topic-wise content across 15 modules covering core programming, frontend frameworks, backend technologies, and behavioral questions.

The application is built with Next.js 16 and React 19, and features a dark-mode-first design system with smooth animations, responsive layouts, and a focus on readability.

---

## Features

### Interactive Flashcards

Premium card-based UI with a three-zone layout — header, question body, and answer footer. Each card includes:

- A dedicated **"Need a Hint?"** toggle with distinct amber styling, separated from the answer reveal
- Full-width **"Click to Reveal Answer"** interaction zone with animated border transitions
- A floating **"Hide Answer"** pill button with scale-on-hover micro-interaction
- **VS Code-styled code blocks** with line numbers, language labels, macOS window chrome, and a copy button

### MCQ Testing Engine

Timed-style assessments with 20 multiple-choice questions per module:

- Instant visual feedback — correct answers highlighted in green, incorrect answers shake in red
- Per-question **explanations** revealed after answering
- Live **accuracy tracker** with a progress bar and percentage score per module

### Lecture Notes

Structured study material inspired by university-style lecture breakdowns:

- **Markdown rendering** with bold text and inline code highlighting
- Dedicated **code examples** rendered in VS Code-style blocks
- **Pro-Tips** in callout boxes for quick practical advice

### Progress Tracking

- Sidebar progress bars for flashcards revealed and MCQs answered
- Per-module completion indicators with color-coded badges
- Session-wide accuracy percentage displayed on the dashboard

### Global Search

Full-text search across all questions, answers, hints, and MCQ explanations. Results are grouped by type and module with one-click navigation to the relevant section.

---

## Modules

The curriculum is organized into **15 modules** covering the full spectrum of a modern web developer interview:

| #  | Module                      | Key Topics                                            |
|----|-----------------------------|-------------------------------------------------------|
| 01 | Core Programming            | Loops, Conditionals, Recursion, Scope, Hoisting       |
| 02 | Data Structures             | Arrays, Linked Lists, Stacks, Queues, Trees, Maps     |
| 03 | Big O Notation              | Time & Space Complexity, Common Patterns              |
| 04 | Object-Oriented Programming | Classes, Inheritance, Polymorphism, Encapsulation     |
| 05 | SOLID Principles            | SRP, OCP, LSP, ISP, DIP                              |
| 06 | Frontend Basics             | HTML, CSS, Box Model, Responsive Design               |
| 07 | JavaScript                  | Closures, Event Loop, Promises, Prototypes            |
| 08 | React                       | Components, Hooks, Virtual DOM, State Management      |
| 09 | Next.js                     | SSR, SSG, App Router, Optimization                    |
| 10 | REST API & SOAP             | HTTP Methods, Status Codes, API Design                |
| 11 | CORS                        | Cross-Origin Resource Sharing, Preflight Requests     |
| 12 | JWT & Authentication        | Token-Based Auth, Stateless vs Stateful Sessions      |
| 13 | SQL & PostgreSQL            | Joins, Indexing, Normalization, Query Optimization    |
| 14 | Node.js & Express           | Event Loop, Middleware, Routing, Error Handling       |
| 15 | Problem Solving             | STAR Method, System Design, Behavioural Questions     |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Suyog0-0/interview-prep-lab.git

# Navigate into the project directory
cd interview-prep-lab

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at **http://localhost:3000**.

---

## Project Structure

```
interview-prep-lab/
├── app/
│   ├── data/                 # Question banks and lecture content
│   │   ├── index.ts          # Data aggregator — exports interviewData[]
│   │   ├── mcqs.ts           # 300+ MCQ questions across all modules
│   │   ├── s01_core.ts       # Module 01: Core Programming
│   │   ├── s02_ds.ts         # Module 02: Data Structures
│   │   ├── s03_bigo.ts       # Module 03: Big O Notation
│   │   ├── s04_oop.ts        # Module 04: OOP
│   │   └── s05_solid.ts      # Module 05: SOLID Principles
│   ├── globals.css           # Design system — tokens, animations, components
│   ├── layout.tsx            # Root layout with font configuration
│   └── page.tsx              # Main application (single-page architecture)
├── types.ts                  # TypeScript interfaces for all data models
├── package.json
├── tsconfig.json
└── README.md
```

---

## Tech Stack

| Layer         | Technology                                        | Purpose                           |
|---------------|---------------------------------------------------|-----------------------------------|
| Framework     | [Next.js 16](https://nextjs.org/)                 | React framework with App Router   |
| UI Library    | [React 19](https://react.dev/)                    | Component-based interface         |
| Styling       | [Tailwind CSS 4](https://tailwindcss.com/)        | Utility-first CSS framework       |
| Icons         | [Lucide React](https://lucide.dev/)               | Consistent SVG icon library       |
| Typography    | [Google Fonts](https://fonts.google.com/)         | Syne, Inter, JetBrains Mono       |
| Language      | [TypeScript 5](https://www.typescriptlang.org/)   | Static type checking              |

---

## Customization

### Adding a Flashcard

Edit the relevant module file in `app/data/` and append to the `questions` array:

```typescript
{
  id: "s01-q16",
  q: "What is type coercion?",
  hint: "Automatic type conversion.",
  answer: "Type coercion is the automatic conversion of values from one type to another.",
  code: `console.log("5" + 3);  // "53" (string)
console.log("5" - 3);  // 2 (number)`,
  language: "javascript",
}
```

### Adding an MCQ

Append to the relevant MCQ array in `app/data/mcqs.ts`:

```typescript
{
  id: "core-mcq-21",
  question: "Which keyword declares a block-scoped variable?",
  options: ["var", "let", "function", "global"],
  correctAnswerIndex: 1,
  explanation: "let and const are block-scoped. var is function-scoped.",
}
```

### Adding Lecture Notes

Add a `notes` array to any module's `InterviewSection` object:

```typescript
notes: [
  {
    title: "Understanding Closures",
    content: "A **closure** is a function that retains access to its `outer scope`...",
    code: `function outer() {
  let count = 0;
  return () => ++count;
}`,
    language: "javascript",
    tip: "Closures are the foundation of React hooks like useState.",
  },
]
```

### Data Model Reference

All data conforms to the TypeScript interfaces defined in [`types.ts`](types.ts):

| Interface            | Description                                                          |
|----------------------|----------------------------------------------------------------------|
| `InterviewQuestion`  | Flashcard — question, hint, answer, and optional code example        |
| `MCQQuestion`        | Multiple-choice — 4 options, correct index, and explanation          |
| `NoteSection`        | Lecture note — markdown content, optional code block and tip         |
| `InterviewSection`   | Module container combining flashcards, MCQs, and notes              |

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built by <a href="https://github.com/Suyog0-0"><strong>Suyog</strong></a>
</p>
