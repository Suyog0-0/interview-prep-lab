import type { InterviewSection, CodingQuestion, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/** Section 22 — Binary Search. Priority: VERY IMPORTANT (DSA) */

const notes: NoteSection[] = [
  {
    title: "The Binary Search Template",
    content:
      "Binary search halves the search space every iteration by comparing the middle element to the target, giving O(log n). The three things that go wrong most often: an infinite loop from an incorrect boundary update, an off-by-one from using <= vs < inconsistently, and integer overflow from (low + high) // 2 in fixed-width languages (Python ints are arbitrary precision, so this specific bug can't happen here — but interviewers still expect the safer `low + (high - low) // 2` form out of habit).",
    code: "def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if arr[mid] == target:\n            return mid\n        if arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1",
    language: "python",
    tip: "The list does not have to be literally sorted — it just needs a 'search space' where you can decide, from one comparison, which half to discard. That generalises binary search to 'search on the answer' problems.",
  },
];

const questions: InterviewQuestion[] = [
  {
    id: "s22-q01",
    q: "What is the time complexity of binary search and why?",
    hint: "Each comparison halves the space.",
    answer:
      "O(log n). Every comparison eliminates half of the remaining search space, so the number of comparisons needed to shrink n elements down to 1 is log2(n).",
    category: "Binary Search",
  },
  {
    id: "s22-q02",
    q: "How do you adapt binary search for a rotated sorted list?",
    hint: "One half is always properly sorted.",
    answer:
      "At any mid point in a rotated sorted list, at least one of the two halves (left of mid, or right of mid) is guaranteed to be normally sorted. Check which half is sorted by comparing its endpoints, determine whether the target falls within that sorted half's range, and recurse into that half — otherwise recurse into the other half.",
    category: "Binary Search",
  },
];

const coding: CodingQuestion[] = [
  {
    id: "s22-c01",
    title: "Binary Search",
    difficulty: "Easy",
    description: "Given a sorted list and a target, return its index or -1 if absent.",
    examples: [{ input: "nums = [-1, 0, 3, 5, 9, 12], target = 9", output: "4" }],
    constraints: ["1 <= n <= 10^4", "O(log n) required"],
    hint: "Standard low/high/mid template — see the notes.",
    solution:
      "def search(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1",
  },
  {
    id: "s22-c02",
    title: "Search Insert Position",
    difficulty: "Easy",
    description: "Given a sorted list and a target, return the index where the target is found, or where it would be inserted to keep the list sorted.",
    examples: [
      { input: "[1, 3, 5, 6], target = 5", output: "2" },
      { input: "[1, 3, 5, 6], target = 2", output: "1" },
    ],
    constraints: ["1 <= n <= 10^4", "O(log n) required"],
    hint: "Standard binary search, but when the loop ends without finding the target, `low` is exactly the correct insertion index.",
    solution:
      "def search_insert(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return low",
  },
  {
    id: "s22-c03",
    title: "Guess Number Higher or Lower",
    difficulty: "Easy",
    description:
      "You must guess a number between 1 and n. A function guess(num) returns 0 if you've guessed it, -1 if your guess is too high, and 1 if too low. Find the number in O(log n) calls.",
    examples: [{ input: "n = 10, pick = 6", output: "6" }],
    constraints: ["The guess() function is provided by the judge — treat it as an oracle"],
    hint: "This is literally binary search where the 'comparison' is a function call instead of a list read.",
    solution:
      "def guess_number(n, guess):\n    low, high = 1, n\n    while low <= high:\n        mid = low + (high - low) // 2\n        result = guess(mid)\n        if result == 0:\n            return mid\n        if result < 0:\n            high = mid - 1  # mid was too high\n        else:\n            low = mid + 1   # mid was too low\n    return -1",
  },
  {
    id: "s22-c04",
    title: "First Bad Version",
    difficulty: "Easy",
    description:
      "You have n versions [1..n] and a function is_bad_version(version) that returns True once a version is bad; every version after the first bad one is also bad. Find the first bad version with the minimum number of calls.",
    examples: [{ input: "n = 5, bad = 4", output: "4" }],
    constraints: ["Minimize calls to is_bad_version — O(log n) required"],
    hint: "This is 'find the boundary in a sorted true/false list' — binary search where the condition is monotonic (false...false, then true...true).",
    solution:
      "def first_bad_version(n, is_bad_version):\n    low, high = 1, n\n    while low < high:\n        mid = low + (high - low) // 2\n        if is_bad_version(mid):\n            high = mid       # bad version could still be the answer, keep it in range\n        else:\n            low = mid + 1     # mid is good, answer is strictly after it\n    return low",
  },
  {
    id: "s22-c05",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    description: "A sorted list has been rotated at an unknown pivot. Search for a target and return its index, or -1.",
    examples: [{ input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 0", output: "4" }],
    constraints: ["1 <= n <= 5000", "All values are unique", "O(log n) required"],
    hint: "At each mid, one side is guaranteed properly sorted. Check which side that is, then check if the target lies within that side's range to decide where to recurse.",
    solution:
      "def search(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if nums[mid] == target:\n            return mid\n\n        if nums[low] <= nums[mid]:\n            # left half [low..mid] is normally sorted\n            if nums[low] <= target < nums[mid]:\n                high = mid - 1\n            else:\n                low = mid + 1\n        else:\n            # right half [mid..high] is normally sorted\n            if nums[mid] < target <= nums[high]:\n                low = mid + 1\n            else:\n                high = mid - 1\n    return -1",
  },
];

const mcqs: MCQQuestion[] = [
  {
    id: "s22-m01",
    question: "What is the time complexity of binary search on a sorted list of n elements?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctAnswerIndex: 1,
    explanation: "Each comparison discards half the remaining candidates, so it takes about log2(n) comparisons to narrow n elements down to one.",
  },
  {
    id: "s22-m02",
    question: "In First Bad Version, why does the loop use `low < high` instead of `low <= high`, unlike plain binary search?",
    options: [
      "It's a typo that still happens to work",
      "The problem finds a BOUNDARY (first true in a monotonic false/true sequence), not an exact match, so low converges directly to the answer without needing a final equality check",
      "It makes the algorithm faster",
      "is_bad_version requires it"
    ],
    correctAnswerIndex: 1,
    explanation:
      "Boundary-search binary search keeps narrowing the range until low and high meet — at which point low IS the answer. Plain search needs the <= form because it might exit at any mid via an exact match; boundary search never needs an equality branch at all.",
  },
  {
    id: "s22-m03",
    question: "In Search in Rotated Sorted Array, how do you know which half of the list is 'normally sorted' at each step?",
    options: [
      "Always assume the left half",
      "Compare nums[low] to nums[mid]: if nums[low] <= nums[mid], the left half is sorted; otherwise the right half is",
      "Sort the list first",
      "It cannot be determined without extra data"
    ],
    correctAnswerIndex: 1,
    explanation:
      "A rotation creates exactly one 'break point'. If nums[low] <= nums[mid], no break occurred between low and mid, so that side is properly ordered and its endpoints can be trusted for a range check.",
  },
];

export const s22_binary_search: InterviewSection = {
  id: 22,
  slug: "binary-search-dsa",
  title: "Binary Search",
  subtitle: "Search-space halving on sorted and monotonic data",
  color: "#22c55e",
  priority: "VERY_IMPORTANT",
  stack: "DSA",
  questions,
  mcqs,
  notes,
  codingQuestions: coding,
};