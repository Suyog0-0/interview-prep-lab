import type { InterviewSection, CodingQuestion, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/** Section 24 — Recursion. Priority: VERY IMPORTANT (DSA) */

const notes: NoteSection[] = [
  {
    title: "Base Case, Recursive Case, and the Call Stack",
    content:
      "Every recursive function needs a base case — a condition simple enough to answer directly, with no further recursive call — and a recursive case that reduces the problem toward that base case. Each call pushes a new frame onto the call stack holding its local variables and return address; when a function returns, its frame pops. Forgetting the base case, or writing a recursive case that doesn't actually get closer to it, causes infinite recursion and a `RecursionError`. Python's default recursion limit is much lower than most languages — 1000 frames (`sys.getrecursionlimit()`) — so deep recursion that would be fine in JS can hit this ceiling in Python; raise it with `sys.setrecursionlimit()` if genuinely needed, or convert to an iterative solution.",
    tip: "When debugging a recursive function that never terminates, print the input at the top of every call — you'll immediately see whether it's shrinking toward the base case.",
  },
  {
    title: "When Recursion Is (and Isn't) the Right Tool",
    content:
      "Recursion shines when a problem has natural self-similar substructure: tree/graph traversal, divide-and-conquer, generating all combinations or permutations, and anything defined by a mathematical recurrence (factorial, Fibonacci). It's often clearer than the iterative equivalent for these. Avoid it when a simple loop does the job — recursion has real overhead from stack frames (and Python, unlike some languages, does NOT optimize tail calls, so a tail-recursive function gets no special treatment), and naive recursion on overlapping subproblems (like un-memoized Fibonacci) is exponential.",
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
    q: "What is the call stack and why can recursion cause a RecursionError in Python?",
    hint: "Each call is a stack frame, and Python's limit is lower than you might expect.",
    answer:
      "The call stack is where the runtime keeps track of active function calls — each call pushes a frame holding its local variables and where to return to. Deep or infinite recursion pushes more frames than allowed, raising `RecursionError: maximum recursion depth exceeded`. Python's default limit is 1000 frames (much lower than many other languages), so this can trigger even on moderately deep, legitimately-terminating recursion — which is why iterative or memoized alternatives matter, or `sys.setrecursionlimit()` for cases you're confident are safe.",
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
    constraints: ["0 <= n <= 20 (Python ints have no overflow limit, but keep it reasonable for a demo)"],
    hint: "Base case: 0! = 1. Recursive case: n! = n * (n-1)!.",
    solution: "def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)",
  },
  {
    id: "s24-c02",
    title: "Fibonacci (with memoization)",
    difficulty: "Easy",
    description: "Return the n-th Fibonacci number, where fib(0)=0 and fib(1)=1, without the exponential blowup of naive recursion.",
    examples: [{ input: "n = 10", output: "55" }],
    constraints: ["0 <= n <= 40 for plain recursion; memoization extends this far higher (within Python's recursion limit)"],
    hint: "Cache each result the first time it's computed so overlapping subproblems (fib(3) needed by both fib(4) and fib(5)) are never recomputed. functools.lru_cache does this automatically.",
    solution:
      "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\n# Equivalent, with an explicit memo dict instead of the decorator:\ndef fib_manual(n, memo=None):\n    if memo is None:\n        memo = {}\n    if n <= 1:\n        return n\n    if n in memo:\n        return memo[n]\n    memo[n] = fib_manual(n - 1, memo) + fib_manual(n - 2, memo)\n    return memo[n]",
  },
  {
    id: "s24-c03",
    title: "Power (x^n)",
    difficulty: "Medium",
    description: "Implement my_pow(x, n) computing x raised to the power n, in O(log n) time rather than O(n).",
    examples: [{ input: "x = 2, n = 10", output: "1024" }, { input: "x = 2, n = -2", output: "0.25" }],
    constraints: ["n can be negative", "Naive repeated multiplication is O(n) — halve the exponent instead", "Python's built-in x ** n already does this efficiently — this is for demonstrating the technique"],
    hint: "x^n = (x^(n/2))^2 when n is even, and x * x^(n-1) when n is odd. Handle negative n by inverting: x^n = 1 / x^(-n).",
    solution:
      "def my_pow(x, n):\n    if n < 0:\n        return 1 / my_pow(x, -n)\n    if n == 0:\n        return 1\n    half = my_pow(x, n // 2)\n    return half * half if n % 2 == 0 else half * half * x",
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
      "def generate_parenthesis(n):\n    result = []\n\n    def backtrack(current, open_count, close_count):\n        if len(current) == 2 * n:\n            result.append(current)\n            return\n        if open_count < n:\n            backtrack(current + '(', open_count + 1, close_count)\n        if close_count < open_count:\n            backtrack(current + ')', open_count, close_count + 1)\n\n    backtrack('', 0, 0)\n    return result",
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
      "It uses a dict to cache results",
      "Each recursive call halves n instead of decrementing it by 1, so the depth is log2(n)",
      "Python optimises exponentiation automatically in user-written recursive functions",
      "It doesn't — it's still O(n)"
    ],
    correctAnswerIndex: 1,
    explanation:
      "By computing x^(n//2) once and squaring it, each level of recursion cuts the exponent in half rather than by one. That halving gives a recursion depth (and total work) of O(log n).",
  },
  {
    id: "s24-m03",
    question: "In Generate Parentheses, why is the check `close_count < open_count` needed before adding a closing bracket?",
    options: [
      "To limit the string length",
      "To ensure a closing bracket only ever closes an already-opened one — never letting close count exceed open count, which would be invalid",
      "It has no real purpose",
      "To alphabetically sort the results"
    ],
    correctAnswerIndex: 1,
    explanation:
      "A valid parentheses string never has more closing brackets than opening ones at any prefix. Requiring close_count < open_count before adding ')' enforces that invariant throughout the backtracking, so every generated string is automatically well-formed.",
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