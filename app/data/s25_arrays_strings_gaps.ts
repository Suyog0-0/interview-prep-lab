import type { InterviewSection, CodingQuestion, MCQQuestion, NoteSection } from "../../types";

/**
 * Section 25 — Arrays & Strings: Missing Problems
 * Priority: VERY IMPORTANT (DSA)
 *
 * The audit found Arrays/Strings/Sorting already had partial coverage scattered
 * across leapfrog_prep_data.ts, s02_ds.ts and the daily revision sets, but named
 * problems like Rotate Array, Sort Colors, Kadane's Algorithm, Insertion Sort,
 * Reverse Words and Is Subsequence were only ever MENTIONED, never coded. This
 * section fills exactly those gaps rather than re-teaching what already exists.
 */

const notes: NoteSection[] = [
  {
    title: "Prefix/Suffix Products — Product of Array Except Self",
    content:
      "When a problem needs, for every index, some aggregate of 'everything except me', build the aggregate from both directions: a prefix pass (everything to the left) and a suffix pass (everything to the right), then combine the two at each index. This avoids the O(n^2) trap of recomputing the whole aggregate for every index, and it works without division — important when the array can contain zero.",
    code: "function productExceptSelf(nums) {\n  const n = nums.length;\n  const result = new Array(n).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < n; i++) {\n    result[i] = prefix;\n    prefix *= nums[i];\n  }\n  let suffix = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    result[i] *= suffix;\n    suffix *= nums[i];\n  }\n  return result;\n}",
    language: "javascript",
  },
  {
    title: "Kadane's Algorithm",
    content:
      "Kadane's Algorithm finds the maximum sum of a contiguous subarray in O(n). At each position, decide whether extending the previous subarray is better than starting fresh at the current element: `currentSum = Math.max(nums[i], currentSum + nums[i])`. Track the best currentSum ever seen as the running answer.",
    code: "function maxSubArray(nums) {\n  let currentSum = nums[0];\n  let maxSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}",
    language: "javascript",
    tip: "The key insight: if currentSum ever goes negative, it can only hurt any subarray it's extended into — so the algorithm 'resets' by starting fresh at the current element whenever that's better.",
  },
];

const coding: CodingQuestion[] = [
  {
    id: "s25-c01",
    title: "Find Maximum and Minimum",
    difficulty: "Easy",
    description: "Given an array of numbers, find both the maximum and minimum values in a single pass.",
    examples: [{ input: "[3, 7, 1, 9, 4]", output: "{ max: 9, min: 1 }" }],
    constraints: ["1 <= n <= 10^5", "One pass — do not call Math.max/Math.min separately, which is two passes"],
    hint: "Initialize both to the first element, then update each on the fly as you scan once.",
    solution:
      "function findMaxMin(arr) {\n  let max = arr[0];\n  let min = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) max = arr[i];\n    if (arr[i] < min) min = arr[i];\n  }\n  return { max, min };\n}",
  },
  {
    id: "s25-c02",
    title: "Find Peak Element",
    difficulty: "Medium",
    description: "A peak is an element strictly greater than its neighbours. Given an array, find the index of any peak (treat out-of-bounds neighbours as -Infinity).",
    examples: [{ input: "[1, 2, 3, 1]", output: "2" }, { input: "[1, 2, 1, 3, 5, 6, 4]", output: "1 or 5" }],
    constraints: ["1 <= n <= 1000", "O(log n) is achievable with binary search"],
    hint: "If the middle element is smaller than its right neighbour, a peak must exist somewhere to the right (values are trending up); otherwise search left.",
    solution:
      "function findPeakElement(nums) {\n  let low = 0;\n  let high = nums.length - 1;\n  while (low < high) {\n    const mid = low + Math.floor((high - low) / 2);\n    if (nums[mid] < nums[mid + 1]) low = mid + 1;\n    else high = mid;\n  }\n  return low;\n}",
  },
  {
    id: "s25-c03",
    title: "Rotate Array",
    difficulty: "Medium",
    description: "Given an array, rotate it to the right by k steps, in place.",
    examples: [{ input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" }],
    constraints: ["1 <= n <= 10^5", "In-place, O(1) extra space using the reversal trick"],
    hint: "Reverse the whole array, then reverse the first k elements, then reverse the rest — three reversals produce the rotation.",
    solution:
      "function rotate(nums, k) {\n  k %= nums.length;\n  const reverse = (arr, start, end) => {\n    while (start < end) {\n      [arr[start], arr[end]] = [arr[end], arr[start]];\n      start++;\n      end--;\n    }\n  };\n  reverse(nums, 0, nums.length - 1);\n  reverse(nums, 0, k - 1);\n  reverse(nums, k, nums.length - 1);\n  return nums;\n}",
  },
  {
    id: "s25-c04",
    title: "Sort Colors (Dutch National Flag)",
    difficulty: "Medium",
    description: "Given an array containing only 0s, 1s, and 2s, sort it in place in one pass without using a library sort.",
    examples: [{ input: "[2, 0, 2, 1, 1, 0]", output: "[0, 0, 1, 1, 2, 2]" }],
    constraints: ["1 <= n <= 300", "One pass, O(1) space — no counting-sort bucket array"],
    hint: "Three pointers: low (boundary for 0s), mid (current), high (boundary for 2s). Swap based on the value at mid.",
    solution:
      "function sortColors(nums) {\n  let low = 0, mid = 0, high = nums.length - 1;\n  while (mid <= high) {\n    if (nums[mid] === 0) {\n      [nums[low], nums[mid]] = [nums[mid], nums[low]];\n      low++; mid++;\n    } else if (nums[mid] === 1) {\n      mid++;\n    } else {\n      [nums[mid], nums[high]] = [nums[high], nums[mid]];\n      high--;\n      // do NOT advance mid here — the swapped-in value hasn't been checked yet\n    }\n  }\n  return nums;\n}",
  },
  {
    id: "s25-c05",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    description: "Given an array, return an array where each element is the product of all other elements — without using division.",
    examples: [{ input: "[1, 2, 3, 4]", output: "[24, 12, 8, 6]" }],
    constraints: ["2 <= n <= 10^5", "No division operator", "O(n) time, O(1) extra space excluding the output array"],
    hint: "See the 'Prefix/Suffix Products' note above.",
    solution:
      "function productExceptSelf(nums) {\n  const n = nums.length;\n  const result = new Array(n).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < n; i++) {\n    result[i] = prefix;\n    prefix *= nums[i];\n  }\n  let suffix = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    result[i] *= suffix;\n    suffix *= nums[i];\n  }\n  return result;\n}",
  },
  {
    id: "s25-c06",
    title: "Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Medium",
    description: "Find the contiguous subarray with the largest sum and return that sum.",
    examples: [{ input: "[-2, 1, -3, 4, -1, 2, 1, -5, 4]", output: "6", explanation: "[4, -1, 2, 1] sums to 6" }],
    constraints: ["1 <= n <= 10^5", "O(n) required"],
    hint: "See the Kadane's Algorithm note above.",
    solution:
      "function maxSubArray(nums) {\n  let currentSum = nums[0];\n  let maxSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}",
  },
  {
    id: "s25-c07",
    title: "Merge Intervals",
    difficulty: "Medium",
    description: "Given an array of intervals, merge all overlapping intervals and return the non-overlapping result.",
    examples: [{ input: "[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }],
    constraints: ["1 <= n <= 10^4", "Sort by start time first — required before the linear merge pass"],
    hint: "Sort intervals by start. Walk through; if the current interval overlaps the last one added to the result, extend its end; otherwise push it as a new interval.",
    solution:
      "function merge(intervals) {\n  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);\n  const result = [sorted[0]];\n  for (let i = 1; i < sorted.length; i++) {\n    const last = result[result.length - 1];\n    const [start, end] = sorted[i];\n    if (start <= last[1]) {\n      last[1] = Math.max(last[1], end);\n    } else {\n      result.push([start, end]);\n    }\n  }\n  return result;\n}",
  },
  {
    id: "s25-c08",
    title: "Reverse Words in a String",
    difficulty: "Medium",
    description: "Given a string, reverse the order of the words. Collapse multiple spaces and trim leading/trailing whitespace.",
    examples: [{ input: '"  the sky   is blue  "', output: '"blue is sky the"' }],
    constraints: ["1 <= s.length <= 10^4"],
    hint: "Split on whitespace (a regex handles collapsing multiple spaces), filter out empty strings, reverse the array, join with a single space.",
    solution:
      "function reverseWords(s) {\n  return s.trim().split(/\\s+/).reverse().join(' ');\n}",
  },
  {
    id: "s25-c09",
    title: "String Compression",
    difficulty: "Medium",
    description: "Given a string, compress runs of repeated characters into character+count (only if the count is greater than 1), in place conceptually.",
    examples: [{ input: '"aabcccccaaa"', output: '"a2bc5a3"' }],
    constraints: ["1 <= s.length <= 2000"],
    hint: "Walk the string tracking the current character and a run length; flush character (+ count if > 1) whenever the character changes.",
    solution:
      "function compress(s) {\n  let result = '';\n  let i = 0;\n  while (i < s.length) {\n    const ch = s[i];\n    let count = 0;\n    while (i < s.length && s[i] === ch) {\n      count++;\n      i++;\n    }\n    result += ch + (count > 1 ? count : '');\n  }\n  return result;\n}",
  },
  {
    id: "s25-c10",
    title: "Is Subsequence",
    difficulty: "Easy",
    description: "Given strings s and t, determine if s is a subsequence of t (characters of s appear in t in the same order, not necessarily contiguous).",
    examples: [{ input: 's = "abc", t = "ahbgdc"', output: "true" }, { input: 's = "axc", t = "ahbgdc"', output: "false" }],
    constraints: ["0 <= s.length <= 100", "0 <= t.length <= 10^4"],
    hint: "Two pointers, one per string. Advance the t-pointer always; advance the s-pointer only on a match. s is a subsequence if its pointer reaches the end.",
    solution:
      "function isSubsequence(s, t) {\n  let i = 0;\n  for (let j = 0; j < t.length && i < s.length; j++) {\n    if (s[i] === t[j]) i++;\n  }\n  return i === s.length;\n}",
  },
  {
    id: "s25-c11",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    description: "Given a string, return its longest palindromic substring.",
    examples: [{ input: '"babad"', output: '"bab" (or "aba")' }],
    constraints: ["1 <= s.length <= 1000"],
    hint: "Expand around every possible center (there are 2n-1 of them, including between-character centers for even-length palindromes) and track the longest expansion.",
    solution:
      "function longestPalindrome(s) {\n  let start = 0, maxLen = 0;\n  const expand = (left, right) => {\n    while (left >= 0 && right < s.length && s[left] === s[right]) {\n      left--;\n      right++;\n    }\n    return right - left - 1; // length of palindrome found\n  };\n  for (let i = 0; i < s.length; i++) {\n    const oddLen = expand(i, i);\n    const evenLen = expand(i, i + 1);\n    const len = Math.max(oddLen, evenLen);\n    if (len > maxLen) {\n      maxLen = len;\n      start = i - Math.floor((len - 1) / 2);\n    }\n  }\n  return s.substring(start, start + maxLen);\n}",
  },
  {
    id: "s25-c12",
    title: "Insertion Sort",
    difficulty: "Easy",
    description: "Implement insertion sort: build the sorted array one element at a time by inserting each new element into its correct position among the already-sorted elements.",
    examples: [{ input: "[5, 2, 4, 6, 1, 3]", output: "[1, 2, 3, 4, 5, 6]" }],
    constraints: ["Educational — O(n^2) worst case, O(n) best case on nearly-sorted input"],
    hint: "For each element starting from index 1, shift larger elements in the sorted prefix one slot right, then drop the current element into the gap.",
    solution:
      "function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    const key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}",
  },
];

const mcqs: MCQQuestion[] = [
  {
    id: "s25-m01",
    question: "Why does Product of Array Except Self avoid using division?",
    options: [
      "Division is slower than multiplication in JavaScript",
      "It fails when the array contains a zero (division by zero, and it can't recover the other products correctly if there are multiple zeros)",
      "JavaScript doesn't support division on arrays",
      "There's no real reason — it's just convention"
    ],
    correctAnswerIndex: 1,
    explanation:
      "The division approach (total product / current element) breaks the moment any element is 0. The prefix/suffix approach naturally handles zeros because it never divides — it just multiplies running totals from each direction.",
  },
  {
    id: "s25-m02",
    question: "In Kadane's Algorithm, what does it mean when `currentSum` resets to `nums[i]` instead of continuing to add?",
    options: [
      "A bug in the implementation",
      "The subarray ending at the previous position was net-negative, so starting fresh at the current element beats extending it",
      "The array must be sorted first",
      "It only happens at the very last index"
    ],
    correctAnswerIndex: 1,
    explanation:
      "`Math.max(nums[i], currentSum + nums[i])` picks whichever is larger. When continuing the old subarray would only drag the sum down, starting over at the current element is strictly better — that's the core insight that makes Kadane's O(n) instead of checking every possible subarray.",
  },
  {
    id: "s25-m03",
    question: "In Sort Colors, why does the pointer `mid` NOT advance after swapping a 2 to the high side?",
    options: [
      "It's a mistake in the reference solution",
      "The value swapped INTO the mid position from the high side hasn't been examined yet, so mid must re-check it on the next iteration",
      "Advancing mid would cause an infinite loop",
      "2s are always already in the correct position"
    ],
    correctAnswerIndex: 1,
    explanation:
      "Swapping with `high` brings an unknown, unexamined value into the current `mid` slot. If mid advanced immediately, that value would never get classified. Swapping with `low` is safe to advance past, because the value that came from `low` was already known to be a 1 (mid had already passed it).",
  },
];

export const s25_arrays_strings_gaps: InterviewSection = {
  id: 25,
  slug: "arrays-strings-gaps",
  title: "Arrays & Strings — Core Problems",
  subtitle: "Rotate Array, Sort Colors, Kadane's, Product Except Self, and other named problems",
  color: "#ef4444",
  priority: "VERY_IMPORTANT",
  stack: "DSA",
  questions: [],
  mcqs,
  notes,
  codingQuestions: coding,
};