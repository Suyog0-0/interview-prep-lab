import type { InterviewSection } from "../../types";

export const s03_bigo: InterviewSection = {
  id: 3,
  slug: "time-complexity",
  title: "Time Complexity & Big-O",
  subtitle: "Algorithm efficiency, space/time trade-offs",
  color: "#34d399",
  questions: [
    {
      id: "s03-q01",
      q: "What is Big-O notation?",
      hint: "How an algorithm's performance scales with input size.",
      answer: "Big-O describes the worst-case growth rate of an algorithm's time or space requirements as input size n grows. It ignores constants and lower-order terms.",
    },
    {
      id: "s03-q02",
      q: "What is O(1)?",
      hint: "Constant time — doesn't depend on input size.",
      answer: "O(1) means the operation takes the same time regardless of input size.\nExamples: accessing an array element by index, HashMap lookup.",
    },
    {
      id: "s03-q03",
      q: "What is O(n)?",
      hint: "Linear — grows proportionally with input.",
      answer: "O(n) means time grows linearly with input size.\nExample: looping through an array once.",
    },
    {
      id: "s03-q04",
      q: "What is O(n²)?",
      hint: "Nested loops.",
      answer: "O(n²) is quadratic — typical of nested loops where each element is compared to every other.\nExample: bubble sort, selection sort.",
    },
    {
      id: "s03-q05",
      q: "What is O(log n)?",
      hint: "Halving the problem each time.",
      answer: "O(log n) means the input is halved on each step.\nExample: binary search. Very efficient for large inputs.",
    },
    {
      id: "s03-q06",
      q: "What is O(n log n)?",
      hint: "Efficient sorting algorithms.",
      answer: "O(n log n) is typical of efficient sorting algorithms like merge sort and quicksort (average case). Better than O(n²) for large datasets.",
    },
    {
      id: "s03-q07",
      q: "What is the time complexity of accessing an element in an array by index?",
      hint: "Direct access.",
      answer: "O(1) — arrays store elements in contiguous memory, so index access is a direct memory calculation.",
    },
    {
      id: "s03-q08",
      q: "What is the time complexity of searching an unsorted array?",
      hint: "You might have to check every element.",
      answer: "O(n) — in the worst case you check every element (linear search).",
    },
    {
      id: "s03-q09",
      q: "What is the time complexity of binary search?",
      hint: "Halving each time.",
      answer: "O(log n). Binary search requires a SORTED array. It halves the search space on each step.",
    },
    {
      id: "s03-q10",
      q: "What is the time complexity of this code?\nfor (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) { ... } }",
      hint: "Count the nested iterations.",
      answer: "O(n²) — the inner loop runs n times for each of n outer iterations.",
    },
    {
      id: "s03-q11",
      q: "What is space complexity?",
      hint: "How much extra memory does an algorithm use?",
      answer: "Space complexity measures how memory usage grows with input size.\nAn algorithm that creates a copy of the input is O(n) space.\nOne that only uses a few variables is O(1) space.",
    },
    {
      id: "s03-q12",
      q: "What is the time complexity of JavaScript's Array.sort()?",
      hint: "It uses an efficient sorting algorithm under the hood.",
      answer: "O(n log n) — modern JS engines (V8) use TimSort.",
    },
    {
      id: "s03-q13",
      q: "What is the difference between best case, worst case, and average case?",
      hint: "Think about finding an element in an array.",
      answer: "Best case: element is at the first position — O(1).\nWorst case: element is last or absent — O(n).\nAverage case: element is somewhere in the middle — O(n/2) = O(n).",
    },
    {
      id: "s03-q14",
      q: "What is the time complexity of push() and pop() on an array?",
      hint: "No re-indexing needed.",
      answer: "O(1) amortized — adding/removing from the end doesn't require shifting other elements.",
    },
    {
      id: "s03-q15",
      q: "What is the time complexity of unshift() and shift()?",
      hint: "All elements must move.",
      answer: "O(n) — every existing element must be re-indexed when adding/removing from the front.",
    },
  ],
};
