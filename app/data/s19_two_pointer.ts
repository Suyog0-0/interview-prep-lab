import type { InterviewSection, CodingQuestion, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/** Section 19 — Two Pointer. Priority: VERY IMPORTANT (DSA) */

const notes: NoteSection[] = [
  {
    title: "The Two-Pointer Pattern",
    content:
      "Two pointers replace a nested loop with a single linear sweep, almost always on sorted data or a palindrome-style symmetric structure. The classic form starts one pointer at each end and moves them toward each other based on a comparison. A second form — 'fast and slow', used constantly on linked lists — moves both pointers from the same end at different speeds. Either way, each pointer moves at most n times total, giving O(n) instead of O(n^2).",
    tip: "If the problem says 'sorted array' and asks about pairs, sums, or differences, two pointers is almost always the intended solution before you even reach for a Map.",
  },
];

const questions: InterviewQuestion[] = [
  {
    id: "s19-q01",
    q: "When should you reach for two pointers instead of a nested loop?",
    hint: "Sorted input, pair relationships.",
    answer:
      "When the input is sorted (or can be sorted without losing needed information) and you're looking for pairs, sums, differences, or a partition point. Moving two pointers toward each other exploits the ordering to eliminate whole ranges of candidates in one comparison, turning an O(n^2) pairwise scan into O(n).",
    category: "Two Pointer",
  },
  {
    id: "s19-q02",
    q: "How do you decide which pointer to move in a converging two-pointer sweep?",
    hint: "Compare the current pair's result against the target.",
    answer:
      "If the current pair's sum (or comparison) is too small, move the left pointer right to increase it. If it's too large, move the right pointer left to decrease it. If it matches, you've found your answer. This works only because the array is sorted — moving a pointer has a predictable, monotonic effect on the result.",
    category: "Two Pointer",
  },
];

const coding: CodingQuestion[] = [
  {
    id: "s19-c01",
    title: "Valid Palindrome",
    difficulty: "Easy",
    description:
      "Given a string, determine if it is a palindrome after converting to lowercase and removing all non-alphanumeric characters.",
    examples: [
      { input: '"A man, a plan, a canal: Panama"', output: "true" },
      { input: '"race a car"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 2 * 10^5", "O(1) extra space with two pointers (no cleaned-copy string)"],
    hint: "Two pointers from each end; skip non-alphanumeric characters in place rather than building a cleaned string first.",
    solution:
      "function isPalindrome(s) {\n  const isAlnum = (ch) => /[a-z0-9]/i.test(ch);\n  let left = 0;\n  let right = s.length - 1;\n  while (left < right) {\n    while (left < right && !isAlnum(s[left])) left++;\n    while (left < right && !isAlnum(s[right])) right--;\n    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;\n    left++;\n    right--;\n  }\n  return true;\n}",
  },
  {
    id: "s19-c02",
    title: "Two Sum II (Sorted Input)",
    difficulty: "Easy",
    description: "Given a 1-indexed array sorted in ascending order, find two numbers that add up to a target and return their 1-indexed positions.",
    examples: [{ input: "numbers = [2, 7, 11, 15], target = 9", output: "[1, 2]" }],
    constraints: ["2 <= numbers.length <= 3 * 10^4", "Input is sorted", "Exactly one solution", "O(n) time, O(1) space"],
    hint: "Left pointer at the start, right at the end. If the sum is too small move left up; too large move right down.",
    solution:
      "function twoSumSorted(numbers, target) {\n  let left = 0;\n  let right = numbers.length - 1;\n  while (left < right) {\n    const sum = numbers[left] + numbers[right];\n    if (sum === target) return [left + 1, right + 1];\n    if (sum < target) left++;\n    else right--;\n  }\n  return [];\n}",
  },
  {
    id: "s19-c03",
    title: "Move Zeroes",
    difficulty: "Easy",
    description: "Given an array, move all zeroes to the end while keeping the relative order of the non-zero elements, in place.",
    examples: [{ input: "[0, 1, 0, 3, 12]", output: "[1, 3, 12, 0, 0]" }],
    constraints: ["1 <= nums.length <= 10^4", "Modify in place, O(n) time, O(1) space"],
    hint: "A slow pointer marks where the next non-zero value should go; a fast pointer scans the array.",
    solution:
      "function moveZeroes(nums) {\n  let insertPos = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] !== 0) {\n      [nums[insertPos], nums[i]] = [nums[i], nums[insertPos]];\n      insertPos++;\n    }\n  }\n  return nums;\n}",
  },
  {
    id: "s19-c04",
    title: "Squares of a Sorted Array",
    difficulty: "Easy",
    description: "Given an array sorted in non-decreasing order (which may contain negatives), return an array of the squares of each number, also sorted.",
    examples: [{ input: "[-4, -1, 0, 3, 10]", output: "[0, 1, 9, 16, 100]" }],
    constraints: ["1 <= n <= 10^4", "Target O(n) — sorting the squares directly is O(n log n)"],
    hint: "The largest squares come from the extreme ends (most negative or most positive). Fill the result array from the back.",
    solution:
      "function sortedSquares(nums) {\n  const n = nums.length;\n  const result = new Array(n);\n  let left = 0;\n  let right = n - 1;\n  for (let i = n - 1; i >= 0; i--) {\n    const leftSq = nums[left] * nums[left];\n    const rightSq = nums[right] * nums[right];\n    if (leftSq > rightSq) {\n      result[i] = leftSq;\n      left++;\n    } else {\n      result[i] = rightSq;\n      right--;\n    }\n  }\n  return result;\n}",
  },
  {
    id: "s19-c05",
    title: "Container With Most Water",
    difficulty: "Medium",
    description: "Given an array of heights representing vertical lines, find two lines that, together with the x-axis, form a container holding the most water.",
    examples: [{ input: "[1, 8, 6, 2, 5, 4, 8, 3, 7]", output: "49" }],
    constraints: ["2 <= n <= 10^5", "O(n) time required"],
    hint: "Start with the widest container (both ends). The shorter line is always the bottleneck, so move that pointer inward — moving the taller one can only shrink the area.",
    solution:
      "function maxArea(height) {\n  let left = 0;\n  let right = height.length - 1;\n  let max = 0;\n  while (left < right) {\n    const width = right - left;\n    const area = width * Math.min(height[left], height[right]);\n    max = Math.max(max, area);\n    if (height[left] < height[right]) left++;\n    else right--;\n  }\n  return max;\n}",
  },
  {
    id: "s19-c06",
    title: "3Sum",
    difficulty: "Medium",
    description: "Given an array of integers, find all unique triplets that sum to zero.",
    examples: [{ input: "[-1, 0, 1, 2, -1, -4]", output: "[[-1, -1, 2], [-1, 0, 1]]" }],
    constraints: ["3 <= n <= 3000", "No duplicate triplets in the result"],
    hint: "Sort first. Fix one element, then two-pointer the rest of the array for a pair summing to its negation. Skip duplicate values at every position to avoid repeat triplets.",
    solution:
      "function threeSum(nums) {\n  const sorted = [...nums].sort((a, b) => a - b);\n  const result = [];\n  for (let i = 0; i < sorted.length - 2; i++) {\n    if (i > 0 && sorted[i] === sorted[i - 1]) continue; // skip duplicate anchors\n    let left = i + 1;\n    let right = sorted.length - 1;\n    while (left < right) {\n      const sum = sorted[i] + sorted[left] + sorted[right];\n      if (sum === 0) {\n        result.push([sorted[i], sorted[left], sorted[right]]);\n        while (left < right && sorted[left] === sorted[left + 1]) left++;\n        while (left < right && sorted[right] === sorted[right - 1]) right--;\n        left++;\n        right--;\n      } else if (sum < 0) {\n        left++;\n      } else {\n        right--;\n      }\n    }\n  }\n  return result;\n}",
  },
];

const mcqs: MCQQuestion[] = [
  {
    id: "s19-m01",
    question: "Two Sum II gives you a SORTED array. Why is two pointers preferred over the Map-based Two Sum approach here?",
    options: [
      "Maps don't work on sorted arrays",
      "Two pointers achieves the same O(n) time with O(1) space, since sortedness lets you avoid the Map's O(n) space",
      "Two pointers is always faster in Big-O terms",
      "Sorted arrays cannot be searched with a Map",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Both are O(n) time. But when the array is already sorted, two pointers reaches the answer with zero extra space, while the Map approach still costs O(n) space regardless of order. Use the ordering when it's handed to you.",
  },
  {
    id: "s19-m02",
    question: "In Container With Most Water, why do you always move the pointer at the SHORTER line?",
    options: [
      "It's arbitrary — either pointer works equally well",
      "The shorter line caps the container's height, so keeping it and moving the other pointer can only shrink the area or keep it the same",
      "Moving the taller line is a syntax error",
      "It guarantees you find the exact global maximum on the first pass",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The container's height is bounded by the shorter of the two lines. Moving the taller line inward keeps that same bottleneck height while shrinking the width — strictly worse or equal. Only moving the shorter line has a chance of finding a taller line that increases the area.",
  },
  {
    id: "s19-m03",
    question: "In 3Sum, what does `while (left < right && sorted[left] === sorted[left + 1]) left++;` accomplish?",
    options: [
      "It's a bug that skips valid answers",
      "It skips over duplicate values after finding a valid triplet, preventing duplicate triplets in the result",
      "It reverses the array",
      "It removes negative numbers",
    ],
    correctAnswerIndex: 1,
    explanation:
      "After recording a valid triplet, the sorted array may have several identical values in a row at the current pointer. Advancing past all of them before continuing prevents emitting the same triplet more than once.",
  },
];

export const s19_two_pointer: InterviewSection = {
  id: 19,
  slug: "two-pointer",
  title: "Two Pointer",
  subtitle: "Converging pointers on sorted arrays and strings",
  color: "#06b6d4",
  priority: "VERY_IMPORTANT",
  stack: "DSA",
  questions,
  mcqs,
  notes,
  codingQuestions: coding,
};