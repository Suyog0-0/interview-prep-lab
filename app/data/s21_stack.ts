import type { InterviewSection, CodingQuestion, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/** Section 21 — Stack. Priority: VERY IMPORTANT (DSA) */

const notes: NoteSection[] = [
  {
    title: "LIFO and the Python List as a Stack",
    content:
      "A stack is Last-In-First-Out: the most recently added item is the first one removed. Python has no separate Stack class — a plain list IS a stack, using append() to add to the top and pop() to remove from the top, both O(1) amortized. Use a stack whenever a problem involves matching or undoing the most recent unmatched thing: brackets, nested structure, 'undo' semantics, or backtracking through a call-like history.",
    code: "stack = []\nstack.append(1)\nstack.append(2)\nstack.pop()   # 2 — removes and returns the top\nstack[-1]     # peek without removing",
    language: "python",
  },
  {
    title: "The Monotonic Stack Pattern",
    content:
      "A monotonic stack keeps its elements in strictly increasing (or decreasing) order at all times. Before pushing a new element, pop everything that violates the order — each pop tells you something (usually 'this popped element's next greater/smaller value is the current element'). It solves 'next greater element', 'daily temperatures', and histogram-area problems in O(n) total, because each element is pushed once and popped at most once across the whole run.",
    tip: "The tell for a monotonic stack: the problem asks for 'the next element that is greater/smaller than me' for every position in the list.",
  },
];

const questions: InterviewQuestion[] = [
  {
    id: "s21-q01",
    q: "What does LIFO mean and how does it map to list methods in Python?",
    hint: "Last-In-First-Out — append/pop.",
    answer:
      "LIFO means the last element added is the first one removed. Python lists implement this natively: append() adds to the end (the 'top' of the stack) and pop() removes from the end, both O(1) amortized. There's no dedicated Stack class — you just use a list and only ever touch its end.",
    category: "Stack",
  },
  {
    id: "s21-q02",
    q: "What is a monotonic stack and what class of problem does it solve?",
    hint: "Order-preserving stack, 'next greater element' style problems.",
    answer:
      "A monotonic stack maintains its elements in strictly increasing or decreasing order by popping violators before every push. It solves 'next greater/smaller element' and similar problems in O(n) total, since every element is pushed once and popped at most once — each pop reveals a relationship between the popped value and the value that caused the pop.",
    category: "Stack",
  },
];

const coding: CodingQuestion[] = [
  {
    id: "s21-c01",
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string of only ( ) [ ] { }, determine if the brackets are balanced and correctly nested.",
    examples: [
      { input: '"()[]{}"', output: "true" },
      { input: '"(]"', output: "false" },
    ],
    constraints: ["1 <= len(s) <= 10^4"],
    hint: "Push openers. On a closer, pop and check it matches; the stack must be empty at the end.",
    solution:
      "def is_valid(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        else:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return len(stack) == 0",
  },
  {
    id: "s21-c02",
    title: "Min Stack",
    difficulty: "Medium",
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element, all in O(1).",
    examples: [{ input: "push(-2), push(0), push(-3), get_min(), pop(), top(), get_min()", output: "-3, 0, -2" }],
    constraints: ["Every operation must be O(1) — no scanning the stack to find the minimum"],
    hint: "Keep a second stack tracking the minimum seen so far at each depth, pushed and popped in lockstep with the main stack.",
    solution:
      "class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n\n    def push(self, val):\n        self.stack.append(val)\n        current_min = val if not self.min_stack else min(val, self.min_stack[-1])\n        self.min_stack.append(current_min)\n\n    def pop(self):\n        self.min_stack.pop()\n        return self.stack.pop()\n\n    def top(self):\n        return self.stack[-1]\n\n    def get_min(self):\n        return self.min_stack[-1]",
  },
  {
    id: "s21-c03",
    title: "Next Greater Element",
    difficulty: "Medium",
    description: "Given a list, for each element find the next element to its right that is greater. If none exists, use -1.",
    examples: [{ input: "[2, 1, 2, 4, 3]", output: "[4, 2, 4, -1, -1]" }],
    constraints: ["1 <= n <= 10^5", "Target O(n) — a nested loop is O(n^2)"],
    hint: "Monotonic decreasing stack of indices. When the current value is bigger than the stack's top, that top's answer is the current value — pop and record it.",
    solution:
      "def next_greater_element(nums):\n    result = [-1] * len(nums)\n    stack = []  # indices, values kept decreasing bottom to top\n    for i, n in enumerate(nums):\n        while stack and nums[stack[-1]] < n:\n            idx = stack.pop()\n            result[idx] = n\n        stack.append(i)\n    return result",
  },
  {
    id: "s21-c04",
    title: "Daily Temperatures",
    difficulty: "Medium",
    description: "Given daily temperatures, return a list where each position holds how many days you'd have to wait for a warmer temperature. Use 0 if there is none.",
    examples: [{ input: "[73, 74, 75, 71, 69, 72, 76, 73]", output: "[1, 1, 4, 2, 1, 1, 0, 0]" }],
    constraints: ["1 <= n <= 10^5"],
    hint: "Same monotonic-stack shape as Next Greater Element, but store the DAY GAP (i - popped_index) instead of the value.",
    solution:
      "def daily_temperatures(temperatures):\n    result = [0] * len(temperatures)\n    stack = []  # indices, decreasing temperatures bottom to top\n    for i, t in enumerate(temperatures):\n        while stack and temperatures[stack[-1]] < t:\n            idx = stack.pop()\n            result[idx] = i - idx\n        stack.append(i)\n    return result",
  },
  {
    id: "s21-c05",
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    description: "Evaluate an arithmetic expression given in Reverse Polish (postfix) Notation, where each token is either an integer or one of + - * /.",
    examples: [{ input: '["2", "1", "+", "3", "*"]', output: "9", explanation: "(2 + 1) * 3 = 9" }],
    constraints: ["Division truncates toward zero", "1 <= len(tokens) <= 10^4"],
    hint: "Push numbers. On an operator, pop the top two operands (order matters for - and /), compute, push the result.",
    solution:
      "def eval_rpn(tokens):\n    stack = []\n    ops = {'+', '-', '*', '/'}\n    for token in tokens:\n        if token in ops:\n            b = stack.pop()\n            a = stack.pop()\n            if token == '+':\n                result = a + b\n            elif token == '-':\n                result = a - b\n            elif token == '*':\n                result = a * b\n            else:\n                result = int(a / b)  # truncate toward zero, like JS — // alone floors, which is wrong for negatives\n            stack.append(result)\n        else:\n            stack.append(int(token))\n    return stack.pop()",
  },
];

const mcqs: MCQQuestion[] = [
  {
    id: "s21-m01",
    question: "Why is a stack the right structure for validating balanced brackets, rather than a queue?",
    options: [
      "Queues can't hold characters",
      "Brackets must close in the reverse order they opened (LIFO), which is exactly what a stack models; a queue would match the wrong opener",
      "Stacks are faster in every scenario",
      "It's arbitrary convention",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The most recently opened bracket must be the next one closed. A queue would try to match the EARLIEST unclosed opener instead, which fails on any nested input like ([)].",
  },
  {
    id: "s21-m02",
    question: "In Min Stack, why keep a SECOND stack instead of just calling min(stack) on get_min()?",
    options: [
      "min() doesn't work on lists",
      "Scanning the whole stack for the min is O(n); the requirement is O(1) for every operation",
      "It uses less memory",
      "It's required by Python syntax",
    ],
    correctAnswerIndex: 1,
    explanation:
      "min(stack) is O(n) per call. The parallel min_stack records the running minimum at each depth as items are pushed, so get_min() is a plain list-index read — O(1) — matching push/pop/top which are already O(1).",
  },
  {
    id: "s21-m03",
    question: "In the monotonic-stack solution to Next Greater Element, what does popping an index from the stack signify?",
    options: [
      "That element has no next greater value",
      "The current element IS the next greater value for the popped index",
      "The list is not sorted",
      "An error occurred",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The stack only pops an index when the current value beats it. That's exactly the definition of 'next greater element' for the popped index, so its answer is written immediately at pop time.",
  },
];

export const s21_stack: InterviewSection = {
  id: 21,
  slug: "stack-dsa",
  title: "Stack",
  subtitle: "LIFO structures and the monotonic stack pattern",
  color: "#f59e0b",
  priority: "VERY_IMPORTANT",
  stack: "DSA",
  questions,
  mcqs,
  notes,
  codingQuestions: coding,
};