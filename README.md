# Interview Prep Lab

> A premium, interactive web application for full-stack and frontend interview preparation featuring flashcards, MCQs, and lecture notes.

![Interview Prep Lab](public/favicon.ico) <!-- Placeholder for actual screenshot -->

## Overview

**Interview Prep Lab** is a single-page interactive learning hub designed to help software engineers prepare for technical interviews. Built with Next.js, React, and Tailwind CSS, it offers a premium, app-like experience with smooth micro-animations, glassmorphism design, and an intuitive user interface.

Whether you are brushing up on Core Programming, mastering React, or diving deep into System Design, the Prep Lab provides structured modules to test and expand your knowledge.

## Features

- 🃏 **Interactive Flashcards**: Study efficiently with beautiful, interactive flashcards. Features include a dedicated "Hint" toggle, VS Code-styled code snippets, and a sleek reveal animation.
- ✅ **MCQ Testing Engine**: Validate your knowledge with multiple-choice questions for each module. Real-time feedback highlights correct/incorrect answers with animated states.
- 📚 **Lecture Notes**: Comprehensive markdown-supported study notes for each module, featuring Pro-Tips and code blocks.
- 📊 **Progress Tracking**: Visual progress bars and accuracy metrics track your study sessions across both Flashcards and MCQs.
- 🔍 **Global Search**: Quickly find specific questions, topics, or hints across all modules.

## Modules Covered

The curriculum covers 15 essential modules for modern web developers:
1. Core Programming
2. Data Structures
3. Big O Notation
4. Object-Oriented Programming (OOP)
5. SOLID Principles
6. Frontend Basics
7. JavaScript
8. React
9. Next.js
10. REST API & SOAP
11. CORS
12. JWT
13. SQL & PostgreSQL
14. Node.js & Express
15. Problem Solving & Behavioural

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Syne, JetBrains Mono, Inter (Google Fonts)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

You can add new questions, MCQs, or notes by modifying the data files located in the `app/data/` directory. Each module is typed using the `InterviewSection` interface defined in `types.ts`.
