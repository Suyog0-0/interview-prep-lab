import type { InterviewSection, CodingQuestion, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/** Section 20 — Sliding Window. Priority: VERY IMPORTANT (DSA) */

const notes: NoteSection[] = [
  {
    title: "Fixed vs Variable Sliding Windows",
    content:
      "A fixed window has a constant size k — slide it one step at a time, subtracting the element that leaves and adding the one that enters, so each step is O(1) instead of re-summing the whole window. A variable window grows by moving the right pointer and shrinks by moving the left pointer whenever some constraint is violated (too many distinct characters, sum exceeds a limit). Both patterns are O(n) because each index enters and leaves the window at most once across the whole run.",
    tip: "If a problem asks for the longest/shortest/best CONTIGUOUS run under a condition, sliding window is almost always the answer before dynamic programming.",
  },
];

const questions: InterviewQuestion[] = [
  {
    id: "s20-q01",
    q: "What is the difference between a fixed-size and variable-size sliding window?",
    hint: "Constant k vs a condition-driven boundary.",
    answer:
      "A fixed window keeps a constant width k, sliding forward by dropping the outgoing element and adding the incoming one. A variable window's width changes dynamically: expand the right edge to include more, then shrink the left edge whenever a constraint (too many duplicates, sum too large) is violated.",
    category: "Sliding Window",
  },
  {
    id: "s20-q02",
    q: "Why is sliding window O(n) even though it looks like it has two nested loops (an outer expand and inner shrink)?",
    hint: "Amortised analysis — think about total pointer movement.",
    answer:
      "The left and right pointers each only move forward, never backward, and each can advance at most n times over the entire run. So even though the shrink step is written as an inner while loop, the total number of shrink-steps across the whole algorithm is bounded by n, giving O(n) overall rather than O(n^2).",
    category: "Sliding Window",
  },
];

const coding: CodingQuestion[] = [
  {
    id: "s20-c01",
    title: "Maximum Sum Subarray of Size K",
    difficulty: "Easy",
    description: "Given a list and an integer k, find the maximum sum of any contiguous subarray of exactly length k.",
    examples: [{ input: "arr = [2, 1, 5, 1, 3, 2], k = 3", output: "9", explanation: "[5, 1, 3] sums to 9" }],
    constraints: ["1 <= k <= n <= 10^5", "Target O(n) — do not re-sum each window from scratch"],
    hint: "Compute the first window's sum, then slide: subtract the element leaving, add the element entering.",
    solution:
      "def max_sum_subarray(arr, k):\n    window_sum = sum(arr[:k])\n    best = window_sum\n    for end in range(k, len(arr)):\n        window_sum += arr[end] - arr[end - k]\n        best = max(best, window_sum)\n    return best",
  },
  {
    id: "s20-c02",
    title: "Maximum Average Subarray",
    difficulty: "Easy",
    description: "Given a list and an integer k, find the contiguous subarray of length k with the maximum average value.",
    examples: [{ input: "nums = [1, 12, -5, -6, 50, 3], k = 4", output: "12.75", explanation: "[12, -5, -6, 50] sums to 51, average 12.75" }],
    constraints: ["n = len(nums), 1 <= k <= n <= 10^5"],
    hint: "Same fixed-window technique as maximum sum — just divide by k once at the end instead of every step.",
    solution:
      "def find_max_average(nums, k):\n    window_sum = sum(nums[:k])\n    best = window_sum\n    for end in range(k, len(nums)):\n        window_sum += nums[end] - nums[end - k]\n        best = max(best, window_sum)\n    return best / k",
  },
  {
    id: "s20-c03",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string, find the length of the longest substring without repeating characters.",
    examples: [
      { input: '"abcabcbb"', output: "3", explanation: '"abc" is the longest' },
      { input: '"bbbbb"', output: "1" },
    ],
    constraints: ["0 <= len(s) <= 5 * 10^4"],
    hint: "Variable window with a set. Expand right; whenever the incoming character is already in the window, shrink from the left until it isn't.",
    solution:
      "def length_of_longest_substring(s):\n    window = set()\n    left = 0\n    best = 0\n    for right in range(len(s)):\n        while s[right] in window:\n            window.discard(s[left])\n            left += 1\n        window.add(s[right])\n        best = max(best, right - left + 1)\n    return best",
  },
  {
    id: "s20-c04",
    title: "Minimum Size Subarray Sum",
    difficulty: "Medium",
    description: "Given a list of positive integers and a target sum, find the minimal length of a contiguous subarray whose sum is at least target. Return 0 if none exists.",
    examples: [{ input: "target = 7, nums = [2, 3, 1, 2, 4, 3]", output: "2", explanation: "[4, 3] has sum 7" }],
    constraints: ["1 <= len(nums) <= 10^5", "1 <= nums[i] <= 10^4", "All values are positive — required for the shrink logic to be valid"],
    hint: "Expand right adding to a running sum; whenever the sum meets the target, record the window length and shrink from the left to try for something smaller.",
    solution:
      "def min_sub_array_len(target, nums):\n    left = 0\n    total = 0\n    min_len = float('inf')\n    for right in range(len(nums)):\n        total += nums[right]\n        while total >= target:\n            min_len = min(min_len, right - left + 1)\n            total -= nums[left]\n            left += 1\n    return 0 if min_len == float('inf') else min_len",
  },
  {
    id: "s20-c05",
    title: "Maximum Consecutive Ones",
    difficulty: "Easy",
    description: "Given a binary list, return the maximum number of consecutive 1s.",
    examples: [{ input: "[1, 1, 0, 1, 1, 1]", output: "3" }],
    constraints: ["1 <= n <= 10^5"],
    hint: "A running counter that resets to 0 on a 0, tracking the max seen — a degenerate sliding window with no explicit left pointer needed.",
    solution:
      "def find_max_consecutive_ones(nums):\n    best = 0\n    current = 0\n    for n in nums:\n        current = current + 1 if n == 1 else 0\n        best = max(best, current)\n    return best",
  },
  {
    id: "s20-c06",
    title: "Fruit Into Baskets",
    difficulty: "Medium",
    description:
      "A list represents fruit types on a row of trees. You have exactly two baskets, each can hold only one type of fruit but unlimited quantity. Find the length of the longest contiguous run of trees you can pick from using at most two distinct fruit types.",
    examples: [{ input: "[1, 2, 1]", output: "3" }, { input: "[0, 1, 2, 2]", output: "3", explanation: "[1, 2, 2]" }],
    constraints: ["1 <= n <= 10^5", "This is 'longest substring with at most 2 distinct characters' in disguise"],
    hint: "Variable window with a frequency dict. Shrink from the left whenever the dict holds more than 2 distinct keys.",
    solution:
      "def total_fruit(fruits):\n    basket = {}  # fruit type -> count in window\n    left = 0\n    best = 0\n    for right in range(len(fruits)):\n        basket[fruits[right]] = basket.get(fruits[right], 0) + 1\n        while len(basket) > 2:\n            left_type = fruits[left]\n            basket[left_type] -= 1\n            if basket[left_type] == 0:\n                del basket[left_type]\n            left += 1\n        best = max(best, right - left + 1)\n    return best",
  },
];

const mcqs: MCQQuestion[] = [
  {
    id: "s20-m01",
    question: "In the fixed-window maximum-sum problem, what makes sliding the window O(1) per step instead of O(k)?",
    options: [
      "Python lists cache their sums automatically",
      "You subtract the element leaving and add the element entering, instead of re-summing all k elements",
      "The list is always small",
      "You use a set instead of a running sum",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Recomputing the sum of every new window from scratch (e.g. with sum(arr[i:i+k]) each time) is O(k) per slide, O(nk) overall. Updating the running total by removing the outgoing element and adding the incoming one keeps each slide O(1), giving O(n) total.",
  },
  {
    id: "s20-m02",
    question: "Minimum Size Subarray Sum requires nums to contain only POSITIVE integers. Why does the shrink-while-condition-holds logic break with negative numbers allowed?",
    options: [
      "It doesn't break — negatives are fine",
      "With negatives, shrinking the window is no longer guaranteed to decrease the sum monotonically, so the greedy shrink can miss valid windows",
      "Negative numbers raise a TypeError in Python",
      "The window would need to be size 0",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The technique relies on the sum strictly decreasing as you remove elements from the left — true only when every element is positive. With negatives present, removing an element could increase the sum, breaking the monotonic assumption the shrink loop depends on.",
  },
  {
    id: "s20-m03",
    question: "Fruit Into Baskets is really which more general pattern?",
    options: [
      "Binary search on answer",
      "Longest substring with at most K distinct characters (here K=2)",
      "Dynamic programming on subsequences",
      "Topological sort",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Two basket types map directly onto 'at most 2 distinct values in the window'. The same dict-based variable-window technique generalises to any K by changing the shrink condition to `len(basket) > K`.",
  },
];

export const s20_sliding_window: InterviewSection = {
  id: 20,
  slug: "sliding-window",
  title: "Sliding Window",
  subtitle: "Fixed and variable windows over lists and strings",
  color: "#0ea5e9",
  priority: "VERY_IMPORTANT",
  stack: "DSA",
  questions,
  mcqs,
  notes,
  codingQuestions: coding,
};