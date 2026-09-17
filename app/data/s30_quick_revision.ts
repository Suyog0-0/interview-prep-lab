import type { InterviewSection, InterviewQuestion } from "../../types";

/**
 * Section 30 — Quick Revision
 * Top 15 Last-Minute list + Leapfrog 20-Question Core DSA Revision.
 * Each card is a one-line trigger + a one-line answer/approach so this is
 * skimmable in under 10 minutes. Full problems, code, and complexity live in
 * their home sections (HashMap/HashSet, Two Pointer, Sliding Window, Stack,
 * Binary Search, Linked List, Arrays & Strings, JavaScript) — this is the
 * index, not a replacement for them.
 */

const top15: InterviewQuestion[] = [
  { id: "rev-top15-01", q: "Two Sum", hint: "Map of value -> index, one pass.", answer: "Store each value's index in a Map as you scan; for each element check whether (target - element) is already a key. O(n) time. Full solution: HashMap/HashSet section.", category: "Top 15" },
  { id: "rev-top15-02", q: "Valid Anagram", hint: "Frequency Map, decrement.", answer: "Build a frequency Map from the first string, decrement per character of the second. Any negative or leftover count fails. Full solution: HashMap/HashSet section.", category: "Top 15" },
  { id: "rev-top15-03", q: "Contains Duplicate", hint: "Set size vs array length.", answer: "new Set(nums).size !== nums.length. Any array shorter after de-duplication contained a duplicate. Full solution: HashMap/HashSet section.", category: "Top 15" },
  { id: "rev-top15-04", q: "Binary Search", hint: "low/high/mid, halve each step.", answer: "mid = low + Math.floor((high-low)/2); compare, move low or high. O(log n). Full solution: Binary Search section.", category: "Top 15" },
  { id: "rev-top15-05", q: "Group Anagrams", hint: "Sorted-letters key groups words.", answer: "Sort each word's letters to build a key; a Map from key -> array of words groups anagrams together in one pass. Full solution: Strings coverage (leapfrog_mcq_content / prep data).", category: "Top 15" },
  { id: "rev-top15-06", q: "Longest Substring Without Repeating Characters", hint: "Sliding window + Set.", answer: "Expand right; when the incoming char is already in the window Set, shrink from the left until it isn't. O(n). Full solution: Sliding Window section.", category: "Top 15" },
  { id: "rev-top15-07", q: "Sales by Match (HackerRank)", hint: "Sum floor(count/2) per value.", answer: "Frequency-count each shoe size, then sum Math.floor(count/2) across all sizes — that's the number of matching pairs. Full solution: HackerRank Problem Solving section.", category: "Top 15" },
  { id: "rev-top15-08", q: "Counting Valleys (HackerRank)", hint: "Track altitude, count U-at-0.", answer: "Walk the U/D string tracking altitude; increment a counter every time a 'U' step brings altitude from -1 back to 0. Full solution: HackerRank Problem Solving section.", category: "Top 15" },
  { id: "rev-top15-09", q: "Balanced Brackets", hint: "Stack — push openers, pop on closers.", answer: "Push every opening bracket; on a closer, pop and check it matches. The stack must be empty at the end. Full solution: Stack section.", category: "Top 15" },
  { id: "rev-top15-10", q: "Reverse String", hint: "Two pointers swap from both ends.", answer: "left/right pointers starting at each end, swap and move inward until they cross. O(n) time, O(1) space if done in place.", category: "Top 15" },
  { id: "rev-top15-11", q: "Palindrome Check", hint: "Two pointers, or compare to reversed.", answer: "Two pointers from each end comparing characters, OR compare the string to its reversed self — the pointer approach avoids building a second string.", category: "Top 15" },
  { id: "rev-top15-12", q: "Remove Duplicates from Array", hint: "Set, or two pointers on sorted input.", answer: "Unsorted: [...new Set(arr)]. Sorted, in-place required: a slow 'write' pointer and a fast 'read' pointer, only writing when the value differs from the last written one.", category: "Top 15" },
  { id: "rev-top15-13", q: "Closures", hint: "A function remembers its defining scope.", answer: "A closure is a function bundled with references to its surrounding lexical scope, so it can still access those variables after the outer function has returned. Classic use: a counter factory, or private state.", category: "Top 15" },
  { id: "rev-top15-14", q: "Promises + Async/Await", hint: "pending -> fulfilled/rejected; await pauses.", answer: "A Promise has three states (pending, fulfilled, rejected). async/await is syntax sugar over .then() — `await` pauses the async function until the Promise settles, and a rejected Promise becomes a thrown error catchable with try/catch.", category: "Top 15" },
  { id: "rev-top15-15", q: "Debounce & Throttle", hint: "Delay until quiet vs cap the rate.", answer: "Debounce delays execution until a pause in events (fires once after the user stops typing). Throttle caps execution to at most once per fixed interval regardless of how many events fire (e.g. scroll handlers). Both wrap a function with a timer.", category: "Top 15" },
];

const leapfrog20: InterviewQuestion[] = [
  { id: "rev-lf20-01", q: "1. Two Sum", hint: "Map value -> index.", answer: "See HashMap/HashSet section.", category: "Leapfrog 20" },
  { id: "rev-lf20-02", q: "2. Valid Anagram", hint: "Frequency Map.", answer: "See HashMap/HashSet section.", category: "Leapfrog 20" },
  { id: "rev-lf20-03", q: "3. Contains Duplicate", hint: "Set size check.", answer: "See HashMap/HashSet section.", category: "Leapfrog 20" },
  { id: "rev-lf20-04", q: "4. Move Zeroes", hint: "Slow/fast pointer swap.", answer: "See Two Pointer section.", category: "Leapfrog 20" },
  { id: "rev-lf20-05", q: "5. Remove Duplicates", hint: "Two pointers on sorted array.", answer: "See Two Pointer section.", category: "Leapfrog 20" },
  { id: "rev-lf20-06", q: "6. Reverse String", hint: "Two pointers from both ends.", answer: "In-place swap converging inward. O(n) time, O(1) space.", category: "Leapfrog 20" },
  { id: "rev-lf20-07", q: "7. Reverse Words", hint: "Split, filter, reverse, join.", answer: "s.trim().split(/\\s+/).reverse().join(' '). See Arrays & Strings — Core Problems section.", category: "Leapfrog 20" },
  { id: "rev-lf20-08", q: "8. Valid Palindrome", hint: "Two pointers, skip non-alphanumeric.", answer: "See Two Pointer section.", category: "Leapfrog 20" },
  { id: "rev-lf20-09", q: "9. Longest Substring Without Repeating Characters", hint: "Sliding window + Set.", answer: "See Sliding Window section.", category: "Leapfrog 20" },
  { id: "rev-lf20-10", q: "10. Product of Array Except Self", hint: "Prefix pass then suffix pass.", answer: "See Arrays & Strings — Core Problems section.", category: "Leapfrog 20" },
  { id: "rev-lf20-11", q: "11. Maximum Subarray (Kadane's)", hint: "Extend or restart at each index.", answer: "currentSum = Math.max(nums[i], currentSum + nums[i]). See Arrays & Strings — Core Problems section.", category: "Leapfrog 20" },
  { id: "rev-lf20-12", q: "12. Best Time to Buy/Sell Stock", hint: "Track min price seen so far.", answer: "Track the minimum price seen so far; at each day compute profit = price - minSoFar and keep the max.", category: "Leapfrog 20" },
  { id: "rev-lf20-13", q: "13. Merge Intervals", hint: "Sort by start, merge overlaps.", answer: "See Arrays & Strings — Core Problems section.", category: "Leapfrog 20" },
  { id: "rev-lf20-14", q: "14. Binary Search", hint: "low/high/mid halving.", answer: "See Binary Search section.", category: "Leapfrog 20" },
  { id: "rev-lf20-15", q: "15. Reverse Linked List", hint: "prev/curr walk, rewire next.", answer: "See Linked List section.", category: "Leapfrog 20" },
  { id: "rev-lf20-16", q: "16. Middle of Linked List", hint: "Slow/fast pointers.", answer: "See Linked List section.", category: "Leapfrog 20" },
  { id: "rev-lf20-17", q: "17. Valid Parentheses", hint: "Stack, pop and match.", answer: "See Stack section.", category: "Leapfrog 20" },
  { id: "rev-lf20-18", q: "18. Merge Two Sorted Lists", hint: "Dummy head, pick smaller each step.", answer: "See Linked List section.", category: "Leapfrog 20" },
  { id: "rev-lf20-19", q: "19. Group Anagrams", hint: "Sorted-letters key groups words.", answer: "See Strings coverage in the Leapfrog prep data / MCQ content.", category: "Leapfrog 20" },
  { id: "rev-lf20-20", q: "20. Top K Frequent Elements", hint: "Frequency Map + bucket sort.", answer: "See HashMap/HashSet section.", category: "Leapfrog 20" },
];

export const s30_quick_revision: InterviewSection = {
  id: 30,
  slug: "quick-revision",
  title: "Quick Revision",
  subtitle: "Top 15 Last-Minute List + Leapfrog 20-Question Core DSA Revision",
  color: "#eab308",
  priority: "VERY_IMPORTANT",
  stack: "Revision",
  questions: [...top15, ...leapfrog20],
  mcqs: [],
  notes: [],
  codingQuestions: [],
};