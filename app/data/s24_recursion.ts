import type { InterviewSection, CodingQuestion, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/** Section 24 — Recursion. Priority: VERY IMPORTANT (DSA) */

const notes: NoteSection[] = [
  {
    title: "Base Case, Recursive Case, and the Call Stack",
    content:
      "Every recursive function needs a base case — a condition simple enough to answer directly, with no further recursive call — and a recursive case that reduces the problem toward that base case. Each call pushes a new frame onto the call stack holding its local variables and return address; when a function returns, its frame pops. Forgetting the base case, or writing a recursive case that doesn't actually get closer to it, causes infinite recursion and a stack overflow.",
    tip: "When debugging a recursive function that never terminates, print the input at the top of every call — you'll immediately see whether it's shrinking toward the base case.",
  },
  {
    title: "When Recursion Is (and Isn't) the Right Tool",
    content:
      "Recursion shines when a problem has natural self-similar substructure: tree/graph traversal, divide-and-conquer, generating all combinations or permutations, and anything defined by a mathematical recurrence (factorial, Fibonacci). It's often clearer than the iterative equivalent for these. Avoid it when a simple loop does the job — recursion has real overhead from stack frames, and naive recursion on overlapping subproblems (like un-memoized Fibonacci) is exponential.",
  },
];

const questions: InterviewQuestion[] = [
  {
    id: "s24-q01",
    q: "What two things must every recursive function have?",
    hint: "Stop condition + shrinking problem.",
    answer:
      "A base case — an input simple enough to return an answer immediately without recursing — and a recursive case that calls itself on a smaller/simpler version of the problem, guaranteed to progress toward the base case. Missing either causes infinite recursion.",
    category: "Recursion",
  },
  {
    id: "s24-q02",
    q: "What is the call stack and why can recursion cause a stack overflow?",
    hint: "Each call is a stack frame.",
    answer:
      "The call stack is where the runtime keeps track of active function calls — each call pushes a frame holding its local variables and where to return to. Deep or infinite recursion pushes more frames than the stack can hold, causing a 'stack overflow' error. This is why naive recursion is risky on very large inputs and why iterative or memoized alternatives matter.",
    category: "Recursion",
  },
];

const coding: CodingQuestion[] = [
  {
    id: "s24-c01",
    title: "Factorial",
    difficulty: "Easy",
    description: "Compute n! (n factorial) recursively.",
    examples: [{ input: "n = 5", output: "120" }, { input: "n = 0", output: "1" }],
    constraints: ["0 <= n <= 20 (beyond this, results exceed safe integer range)"],
    hint: "Base case: 0! = 1. Recursive case: n! = n * (n-1)!.",
    solution: "function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}",
  },
  {
    id: "s24-c02",
    title: "Fibonacci (with memoization)",
    difficulty: "Easy",
    description: "Return the n-th Fibonacci number, where fib(0)=0 and fib(1)=1, without the exponential blowup of naive recursion.",
    examples: [{ input: "n = 10", output: "55" }],
    constraints: ["0 <= n <= 40 for plain recursion; memoization extends this far higher"],
    hint: "Cache each result the first time it's computed so overlapping subproblems (fib(3) needed by both fib(4) and fib(5)) are never recomputed.",
    solution:
      "function fib(n, memo = new Map()) {\n  if (n <= 1) return n;\n  if (memo.has(n)) return memo.get(n);\n  const result = fib(n - 1, memo) + fib(n - 2, memo);\n  memo.set(n, result);\n  return result;\n}",
  },
  {
    id: "s24-c03",
    title: "Power (x^n)",
    difficulty: "Medium",
    description: "Implement pow(x, n) computing x raised to the power n, in O(log n) time rather than O(n).",
    examples: [{ input: "x = 2, n = 10", output: "1024" }, { input: "x = 2, n = -2", output: "0.25" }],
    constraints: ["n can be negative", "Naive repeated multiplication is O(n) — halve the exponent instead"],
    hint: "x^n = (x^(n/2))^2 when n is even, and x * x^(n-1) when n is odd. Handle negative n by inverting: x^n = 1 / x^(-n).",
    solution:
      "function myPow(x, n) {\n  if (n < 0) return 1 / myPow(x, -n);\n  if (n === 0) return 1;\n  const half = myPow(x, Math.floor(n / 2));\n  return n % 2 === 0 ? half * half : half * half * x;\n}",
  },
  {
    id: "s24-c04",
    title: "Generate Parentheses",
    difficulty: "Medium",
    description: "Given n pairs of parentheses, generate all combinations of well-formed parentheses strings.",
    examples: [{ input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]' }],
    constraints: ["1 <= n <= 8"],
    hint: "Backtracking: at each step you may add '(' if you haven't used all n yet, and may add ')' only if it wouldn't outnumber the '(' so far.",
    solution:
      "function generateParenthesis(n) {\n  const result = [];\n  function backtrack(current, open, close) {\n    if (current.length === 2 * n) {\n      result.push(current);\n      return;\n    }\n    if (open < n) backtrack(current + '(', open + 1, close);\n    if (close < open) backtrack(current + ')', open, close + 1);\n  }\n  backtrack('', 0, 0);\n  return result;\n}",
  },
];

const mcqs: MCQQuestion[] = [
  {
    id: "s24-m01",
    question: "Naive recursive Fibonacci without memoization has what time complexity?",
    options: ["O(n)", "O(n log n)", "O(2^n)", "O(n^2)"],
    correctAnswerIndex: 2,
    explanation:
      "Each call branches into two more calls, and the same subproblems (like fib(3)) get recomputed many times across different branches, producing an exponential call tree.",
  },
  {
    id: "s24-m02",
    question: "Why does the Power (x^n) recursive solution run in O(log n) instead of O(n)?",
    options: [
      "It uses a Map to cache results",
      "Each recursive call halves n instead of decrementing it by 1, so the depth is log2(n)",
      "JavaScript optimises exponentiation automatically",
      "It doesn't — it's still O(n)"
    ],
    correctAnswerIndex: 1,
    explanation:
      "By computing x^(n/2) once and squaring it, each level of recursion cuts the exponent in half rather than by one. That halving gives a recursion depth (and total work) of O(log n).",
  },
  {
    id: "s24-m03",
    question: "In Generate Parentheses, why is the check `close < open` needed before adding a closing bracket?",
    options: [
      "To limit the string length",
      "To ensure a closing bracket only ever closes an already-opened one — never letting close count exceed open count, which would be invalid",
      "It has no real purpose",
      "To alphabetically sort the results"
    ],
    correctAnswerIndex: 1,
    explanation:
      "A valid parentheses string never has more closing brackets than opening ones at any prefix. Requiring close < open before adding ')' enforces that invariant throughout the backtracking, so every generated string is automatically well-formed.",
  },
];

export const s24_recursion: InterviewSection = {
  id: 24,
  slug: "recursion-dsa",
  title: "Recursion",
  subtitle: "Base cases, the call stack, and backtracking",
  color: "#a855f7",
  priority: "VERY_IMPORTANT",
  stack: "DSA",
  questions,
  mcqs,
  notes,
  codingQuestions: coding,
};