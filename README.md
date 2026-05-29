<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

<h1 align="center">
  🧪 Interview Prep Lab
</h1>

<p align="center">
  <strong>A premium, interactive web application for full-stack & frontend interview preparation.</strong>
  <br />
  <em>Master technical interviews with flashcards, MCQ assessments, and structured lecture notes — all in one place.</em>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-modules">Modules</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-customization">Customize</a>
</p>

---

## ✨ Features

### 🃏 Interactive Flashcards
Premium card-based UI with a three-zone layout — **header**, **question body**, and **answer footer**. Each card features:
- A dedicated **"Need a Hint?"** toggle button with warm amber styling, separate from the answer reveal
- Full-width **"Click to Reveal Answer"** interaction zone with dashed-to-solid border animation on hover
- A floating **"Hide Answer"** pill button with scale-on-hover micro-interaction
- **VS Code-styled code blocks** with line numbers, syntax highlighting, macOS window chrome, and a copy button

### ✅ MCQ Testing Engine
Battle-test your knowledge with 20 multiple-choice questions per module:
- Instant visual feedback — correct answers glow **emerald**, wrong answers shake in **red**
- Per-question **explanations** reveal after answering
- Live **accuracy tracker** with a progress bar and percentage score

### 📖 Lecture Notes
Structured study material for each module, inspired by university-style lecture breakdowns:
- **Markdown rendering** with bold text and inline code highlighting
- Dedicated **code examples** with full VS Code-style blocks
- **Pro-Tips** in amber callout boxes for quick practical advice

### 📊 Real-Time Progress Tracking
- Sidebar progress bars for **Flashcards revealed** and **MCQs answered**
- Per-module completion badges with **orange** (flashcards) and **emerald** (MCQs) indicators
- Session-wide **accuracy percentage** displayed on the dashboard

### 🔍 Global Search
Instantly search across all questions, answers, hints, and MCQ explanations. Results are grouped by type and module, with one-click navigation.

### 🎨 Premium Design System
- **Dark mode** with a rich `#0d0d0d` base and carefully curated zinc/orange/emerald palette
- **Glassmorphism** cards with `backdrop-blur` and subtle glow shadows
- **Micro-animations**: `fade-up`, `pop-in`, `shake` for a polished, app-like feel
- **Custom fonts**: Syne (headings), Inter (body), JetBrains Mono (code)
- **Retro scanline overlay** for a unique developer aesthetic
- Fully **responsive** — works beautifully on mobile, tablet, and desktop

---

## 📚 Modules

The curriculum is structured into **15 essential modules** covering the full spectrum of a modern web developer interview:

| # | Module | Topics |
|---|--------|--------|
| 01 | **Core Programming** | Loops, Conditionals, Recursion, Scope |
| 02 | **Data Structures** | Arrays, Linked Lists, Stacks, Queues, Trees, Hash Maps |
| 03 | **Big O Notation** | Time/Space Complexity, Common Patterns |
| 04 | **OOP** | Classes, Inheritance, Polymorphism, Encapsulation |
| 05 | **SOLID Principles** | SRP, OCP, LSP, ISP, DIP |
| 06 | **Frontend Basics** | HTML, CSS, Box Model, Responsive Design |
| 07 | **JavaScript** | Closures, Event Loop, Promises, Prototypes |
| 08 | **React** | Components, Hooks, Virtual DOM, State Management |
| 09 | **Next.js** | SSR, SSG, App Router, Optimization |
| 10 | **REST API & SOAP** | HTTP Methods, Status Codes, API Design |
| 11 | **CORS** | Cross-Origin Resource Sharing, Preflight |
| 12 | **JWT** | Authentication, Stateless vs Stateful Sessions |
| 13 | **SQL & PostgreSQL** | Joins, Indexing, Normalization, Queries |
| 14 | **Node.js & Express** | Event Loop, Middleware, Routing |
| 15 | **Problem Solving** | STAR Method, System Design, Behavioural |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Suyog0-0/interview-prep-lab.git

# Navigate into the project
cd interview-prep-lab

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser and start studying!

---

## 📁 Project Structure

```
interview-prep-lab/
├── app/
│   ├── data/                # All question & notes data
│   │   ├── index.ts         # Main data aggregator (exports interviewData[])
│   │   ├── mcqs.ts          # 300+ MCQ questions across all modules
│   │   ├── s01_core.ts      # Module 01: Core Programming flashcards + notes
│   │   ├── s02_ds.ts        # Module 02: Data Structures
│   │   ├── s03_bigo.ts      # Module 03: Big O Notation
│   │   ├── s04_oop.ts       # Module 04: OOP
│   │   └── s05_solid.ts     # Module 05: SOLID Principles
│   ├── globals.css          # Design system — tokens, animations, components
│   ├── layout.tsx           # Root layout with Google Fonts
│   └── page.tsx             # Main application (single-page)
├── types.ts                 # TypeScript interfaces for all data models
├── package.json
└── README.md
```

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | [Next.js 16](https://nextjs.org/) | React framework with App Router |
| **UI Library** | [React 19](https://react.dev/) | Component-based UI |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS |
| **Icons** | [Lucide React](https://lucide.dev/) | Beautiful, consistent icon set |
| **Fonts** | Google Fonts | Syne · Inter · JetBrains Mono |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Type-safe development |

---

## 🧩 Customization

### Adding a New Flashcard

Edit the relevant module file in `app/data/` and add an entry to the `questions` array:

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

### Adding a New MCQ

Add to the module's `mcqs` array in `app/data/mcqs.ts`:

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

Add a `notes` array to any module's `InterviewSection`:

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

All data is strongly typed. See [`types.ts`](types.ts) for the full interface definitions:

- **`InterviewQuestion`** — Flashcard with question, hint, answer, and optional code
- **`MCQQuestion`** — Multiple choice with 4 options, correct index, and explanation
- **`NoteSection`** — Lecture note block with markdown content, code, and tips
- **`InterviewSection`** — A module combining all three content types

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ☕ and late nights by <a href="https://github.com/Suyog0-0"><strong>Suyog</strong></a>
</p>
