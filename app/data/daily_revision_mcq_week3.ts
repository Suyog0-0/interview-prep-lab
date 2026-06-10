/**
 * daily_revision_mcq_week3.ts
 *
 * End-of-day revision sets for Days 14–18 of the Leapfrog prep schedule.
 * Each day has:
 *   - 20 MCQs
 *   - 2 Coding practical questions
 *
 * Topics map:
 *   Day 14 — Week 2 Review: Sliding window, Hash maps, Stacks, Linked Lists, DOM Projects
 *   Day 15 — JS Theory Deep Dive: Closures, Hoisting, Event Loop, this, Promises, Prototypes
 *   Day 16 — GitHub + Graph Algorithms (Number of Islands, Course Schedule / BFS/DFS)
 *   Day 17 — Mock Interview + HR Prep: Behavioural questions, STAR method, live coding mindset
 *   Day 18 — Remote Assignment: Fetch API, filter/search UI, clean code patterns
 */

import type { MCQQuestion, CodingQuestion } from "../../types";
import type { DailyRevisionSet } from "./leapfrog_prep_data";


// =============================================================================
// DAY 14 — Week 2 Review: Sliding Window · Hash Maps · Stacks · Linked Lists
// =============================================================================
const day14_mcqs: MCQQuestion[] = [
  {
    id: "rev-d14-01",
    question: "What is the sliding window technique used for?",
    options: [
      "Sorting arrays in O(n log n) time.",
      "Efficiently solving problems on contiguous subarrays or substrings by maintaining a window that expands and shrinks.",
      "Finding all permutations of a string.",
      "Reversing a linked list in place.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The sliding window technique maintains a 'window' (range of indices) that slides through an array/string. Instead of recomputing from scratch for each position, you add the new element entering the window and remove the element leaving it — reducing O(n²) brute force to O(n).",
  },
  {
    id: "rev-d14-02",
    question: "What is the time complexity of finding the longest substring without repeating characters using sliding window?",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
    correctAnswerIndex: 2,
    explanation:
      "With a sliding window + hash set/map, each character is added and removed from the set at most once. This gives O(n) time. The brute force approach checking every substring is O(n²) or O(n³).",
  },
  {
    id: "rev-d14-03",
    question: "In the 'Best Time to Buy and Sell Stock' problem, what is the optimal one-pass strategy?",
    options: [
      "Sort the array and take the difference of max and min.",
      "Track the minimum price seen so far and the maximum profit seen so far as you iterate once.",
      "Use a stack to track all peaks and valleys.",
      "Use dynamic programming with a 2D table.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "One pass: maintain minPrice (lowest seen so far) and maxProfit. For each price, check if (price - minPrice) > maxProfit. Update minPrice if price < minPrice. This is O(n) time, O(1) space — optimal.",
  },
  {
    id: "rev-d14-04",
    question: "What is the main advantage of using a hash map over an array for counting character frequencies?",
    options: [
      "Hash maps are always faster than arrays.",
      "Hash maps handle arbitrary keys (any string/char) with O(1) average lookup; arrays require numeric index mapping.",
      "Hash maps use less memory than arrays.",
      "Arrays cannot store duplicate values.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Arrays need numeric indices, so you'd need to map chars to numbers (e.g. charCode). Hash maps accept any key type directly. Both give O(1) average access, but hash maps are more readable and flexible for arbitrary key types.",
  },
  {
    id: "rev-d14-05",
    question: "In the Group Anagrams problem, what is the standard key used to group words?",
    options: [
      "The first character of each word.",
      "The length of each word.",
      "The sorted version of each word (e.g. 'eat' → 'aet').",
      "The sum of character codes.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Sorting each word gives a canonical key — all anagrams produce the same sorted string. Use a hash map: sorted_word → [list of originals]. Time: O(n × k log k) where n = words, k = avg word length.",
  },
  {
    id: "rev-d14-06",
    question: "What data structure is best for solving the 'Valid Parentheses' problem?",
    options: ["Queue (FIFO)", "Stack (LIFO)", "Hash map", "Sorted array"],
    correctAnswerIndex: 1,
    explanation:
      "A stack is perfect: push opening brackets onto the stack. When you see a closing bracket, check if the top of the stack is the matching opener. If not, or if the stack is empty, it's invalid. At the end, the stack must be empty for valid input.",
  },
  {
    id: "rev-d14-07",
    question: "What is the time and space complexity of the Valid Parentheses solution using a stack?",
    options: [
      "O(n²) time, O(1) space",
      "O(n) time, O(n) space",
      "O(n log n) time, O(n) space",
      "O(1) time, O(1) space",
    ],
    correctAnswerIndex: 1,
    explanation:
      "You iterate through n characters once — O(n) time. In the worst case (all opening brackets), the stack holds n items — O(n) space.",
  },
  {
    id: "rev-d14-08",
    question: "How do you reverse a singly linked list iteratively?",
    options: [
      "Swap values of adjacent nodes.",
      "Use three pointers: prev (null), curr (head), next. Iterate: save next, reverse curr.next to prev, advance prev and curr.",
      "Copy all values to an array, reverse the array, write back.",
      "Start from the tail and re-link backwards using recursion only.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Three pointer approach: prev=null, curr=head. Each iteration: next=curr.next, curr.next=prev, prev=curr, curr=next. When curr is null, prev is the new head. O(n) time, O(1) space.",
  },
  {
    id: "rev-d14-09",
    question: "What is the key insight for the 'Counting Valleys' problem (HackerRank)?",
    options: [
      "Count all 'D' steps and subtract from 'U' steps.",
      "Track altitude level; a valley is completed when you return to level 0 from a sequence that went below 0.",
      "Count the number of contiguous 'DDD' sequences.",
      "Use a stack to track elevation changes.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Increment altitude on 'U', decrement on 'D'. A valley is counted each time the altitude returns to 0 from a negative value (i.e., level goes from -1 to 0). A mountain is counted when it returns from positive to 0.",
  },
  {
    id: "rev-d14-10",
    question: "What is the 'two-pointer' technique and when is it most useful?",
    options: [
      "Using two nested loops to compare every pair of elements.",
      "Maintaining two index pointers (often start and end) that move toward each other, useful for sorted arrays and palindrome problems.",
      "Splitting an array into exactly two halves for divide and conquer.",
      "Using two hash maps to track frequency from both ends.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Two pointers (left=0, right=n-1) walk toward each other. Useful for: sorted array pair sum, palindrome check, container with most water, removing duplicates from sorted arrays. Reduces O(n²) brute force to O(n).",
  },
  {
    id: "rev-d14-11",
    question: "What is the difference between Array.prototype.push/pop and Array.prototype.shift/unshift in terms of performance?",
    options: [
      "All four are O(1).",
      "push/pop are O(1); shift/unshift are O(n) because they shift all other elements.",
      "shift/unshift are O(1); push/pop are O(n).",
      "All four are O(n).",
    ],
    correctAnswerIndex: 1,
    explanation:
      "push/pop operate on the end of the array — O(1). shift/unshift operate on the beginning — every other element must be re-indexed, making them O(n). For queue (FIFO) behaviour, prefer a proper queue or a pointer-based approach over using shift().",
  },
  {
    id: "rev-d14-12",
    question: "In the 'Product of Array Except Self' problem, what approach avoids using division in O(n)?",
    options: [
      "Sort the array and multiply adjacent elements.",
      "For each element, multiply all others using nested loops.",
      "Build a prefix product array (left pass) and suffix product array (right pass), then multiply them.",
      "Use a hash map to store products.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Left pass: result[i] = product of all elements to the LEFT of i. Right pass: multiply result[i] by the product of all elements to the RIGHT of i. Two O(n) passes, O(1) extra space (excluding output array). No division needed.",
  },
  {
    id: "rev-d14-13",
    question: "What does the HackerRank 'Left Rotation' problem ask you to do?",
    options: [
      "Rotate elements in a 2D matrix counter-clockwise.",
      "Shift each element of a 1D array k positions to the left, wrapping elements from the front to the back.",
      "Sort the array in reverse order.",
      "Find the leftmost element that is less than its right neighbour.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Left rotation by k: the element at index 0 moves to the end, repeated k times. Efficiently: result = arr.slice(k).concat(arr.slice(0, k)). Or use modulo for in-place: new_index = (old_index - k + n) % n.",
  },
  {
    id: "rev-d14-14",
    question: "What is the purpose of a visited set/array in graph traversal (BFS/DFS)?",
    options: [
      "To count the number of nodes.",
      "To prevent revisiting already-processed nodes and avoid infinite loops in cyclic graphs.",
      "To store the shortest path.",
      "To sort nodes by their values.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Without tracking visited nodes, you could infinitely loop in a graph with cycles. Mark a node as visited before processing it (or when adding to queue/stack) to ensure each node is processed at most once — giving O(V+E) time complexity.",
  },
  {
    id: "rev-d14-15",
    question: "What is the difference between BFS and DFS?",
    options: [
      "BFS uses a stack; DFS uses a queue.",
      "BFS uses a queue and explores level by level (shortest path); DFS uses a stack (or recursion) and explores as deep as possible first.",
      "BFS is only for trees; DFS works on graphs.",
      "They are identical but with different names.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "BFS (queue, level-order): finds shortest path in unweighted graphs. DFS (stack/recursion): good for cycle detection, topological sort, connected components, maze solving. BFS memory usage is O(width); DFS is O(depth/height).",
  },
  {
    id: "rev-d14-16",
    question: "In the 'Min Swaps 2' problem, what is the key observation that leads to an efficient solution?",
    options: [
      "Sort both arrays and compare.",
      "The minimum swaps to sort an array equals n minus the number of cycles in the position mapping (where positions are relative to the sorted order).",
      "Count the number of elements not in their correct position divided by 2.",
      "Use selection sort and count the swaps directly.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Map each element to its index in the sorted array. Count the number of cycles in this permutation. Minimum swaps = n - (number of cycles). A cycle of length k requires k-1 swaps. This gives O(n log n) due to sorting.",
  },
  {
    id: "rev-d14-17",
    question: "What is the Stack's LIFO property and how does it help in solving bracket matching?",
    options: [
      "LIFO means First In First Out — elements leave in the order they entered.",
      "LIFO means Last In First Out — the most recently pushed element is the first to be popped, which matches the nesting nature of brackets.",
      "LIFO refers to the sorted order of elements.",
      "LIFO means the stack can only hold one element at a time.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Brackets nest: the most recently opened bracket must be closed first. LIFO perfectly mirrors this — push opening brackets, and when you see a closing bracket, the top of the stack must be the matching opener. If it isn't, the brackets are unbalanced.",
  },
  {
    id: "rev-d14-18",
    question: "What is the time complexity of searching for an element in an unsorted array vs a hash set?",
    options: [
      "Both are O(1).",
      "Both are O(n).",
      "Unsorted array is O(n) linear search; hash set is O(1) average.",
      "Unsorted array is O(log n) with binary search; hash set is O(n).",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Unsorted array requires checking every element in the worst case — O(n). A hash set computes the hash of the key and looks it up in a bucket — O(1) average. This is why converting arrays to Sets is common before membership checks in algorithm problems.",
  },
  {
    id: "rev-d14-19",
    question: "What is the Ransom Note problem checking?",
    options: [
      "Whether the ransom note is longer than the magazine.",
      "Whether all letters needed for the ransom note can be found in the magazine (each letter used only as many times as it appears).",
      "Whether the ransom note contains uppercase letters.",
      "Whether the magazine is a palindrome.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Build a frequency map of magazine letters. Then for each letter in the ransom note, check if it exists in the map with count >= 1, decrementing as you go. If any letter is missing or exhausted, return false. O(n+m) time.",
  },
  {
    id: "rev-d14-20",
    question: "Why is it important to push code to GitHub every day during interview prep (Week 2-3)?",
    options: [
      "GitHub automatically fixes bugs in your code.",
      "Daily commits build a visible activity graph; interviewers check GitHub history to assess consistency, discipline, and real-world coding habits.",
      "GitHub stores code faster than local drives.",
      "Daily commits prevent merge conflicts.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Interviewers and hiring managers look at GitHub contribution graphs and recent commits as a signal of consistency and genuine passion for coding. Regular commits during prep also show your projects are actively maintained, not just created once.",
  },
];

const day14_coding: CodingQuestion[] = [
  {
    id: "code-d14-01",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description:
      "Write a function lengthOfLongestSubstring(s) that returns the length of the longest substring without repeating characters. Use the sliding window technique with a Map or Set.",
    examples: [
      { input: "lengthOfLongestSubstring('abcabcbb')", output: "3", explanation: "The answer is 'abc', with length 3." },
      { input: "lengthOfLongestSubstring('bbbbb')", output: "1", explanation: "The answer is 'b', with length 1." },
      { input: "lengthOfLongestSubstring('pwwkew')", output: "3", explanation: "'wke' has length 3." },
      { input: "lengthOfLongestSubstring('')", output: "0" },
    ],
    constraints: [
      "Time complexity must be O(n).",
      "Use a Map to store the last seen index of each character for optimal window shrinking.",
      "Handle empty string input.",
    ],
    hint: "Use a Map<char, lastIndex>. Keep a 'start' pointer. For each char at index i: if the char is in the map AND its last index >= start, move start to lastIndex + 1. Update the map and track max(i - start + 1).",
  },
  {
    id: "code-d14-02",
    title: "Valid Parentheses",
    difficulty: "Easy",
    description:
      "Write a function isValid(s) that takes a string containing only '(', ')', '{', '}', '[', ']' and returns true if the string is valid. A string is valid if every opening bracket is closed by the same type of bracket, in the correct order.",
    examples: [
      { input: "isValid('()')", output: "true" },
      { input: "isValid('()[]{}')", output: "true" },
      { input: "isValid('(]')", output: "false" },
      { input: "isValid('([)]')", output: "false" },
      { input: "isValid('{[]}')", output: "true" },
    ],
    constraints: [
      "Use a stack.",
      "O(n) time, O(n) space.",
      "An empty string should return true.",
      "Odd-length strings should immediately return false.",
    ],
    hint: "Create a map: closing → opening. Push opening brackets onto the stack. For closing brackets, pop the stack and check if it matches the expected opener. At the end, the stack must be empty.",
  },
];

// =============================================================================
// DAY 15 — JS Theory Deep Dive: Closures · Hoisting · Event Loop · Promises · Prototypes
// =============================================================================
const day15_mcqs: MCQQuestion[] = [
  {
    id: "rev-d15-01",
    question: "When asked 'Explain closures' in an interview, what is the most complete one-sentence definition?",
    options: [
      "A closure is a function that runs immediately after it is defined.",
      "A closure is a function that retains access to variables from its enclosing lexical scope even after that outer function has returned.",
      "A closure is a function with no parameters.",
      "A closure is when two functions share the same scope.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The key phrase interviewers want: 'lexical scope' + 'even after the outer function has returned.' This shows you understand that closures are about the persistence of scope, not just function nesting. Always follow up with a counter example to demonstrate.",
  },
  {
    id: "rev-d15-02",
    question: "What is the most common real-world use case for closures that every interviewer expects you to mention?",
    options: [
      "Sorting arrays alphabetically.",
      "Data encapsulation / private variables — creating a module where internal state is hidden and only exposed through specific methods.",
      "Fetching data from an API.",
      "Handling CSS animations.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The module pattern using closures is the canonical real-world example: a factory function returns methods that close over private state (like a bank account balance). This shows you understand closures beyond the academic definition.",
  },
  {
    id: "rev-d15-03",
    question: "What is the exact interview-ready explanation of the JavaScript event loop?",
    options: [
      "The event loop is a function that runs setTimeouts faster.",
      "The event loop monitors the call stack; when empty, it moves microtasks (Promise callbacks) first, then macrotasks (setTimeout) onto the stack — enabling async behaviour in a single thread.",
      "The event loop runs JavaScript on multiple CPU threads simultaneously.",
      "The event loop prevents stack overflow errors.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The complete answer: JavaScript is single-threaded. The event loop watches the call stack. When empty: drain the entire microtask queue (Promises, queueMicrotask), then pick ONE macrotask (setTimeout, setInterval, I/O). This cycle repeats. This is why Promises always run before timeouts.",
  },
  {
    id: "rev-d15-04",
    question: "An interviewer asks: 'What is hoisting?' What answer scores full marks?",
    options: [
      "Hoisting means JavaScript runs faster by pre-loading functions.",
      "During the compilation phase, JS allocates memory for variable and function declarations before code executes — var is initialised to undefined, function declarations are fully hoisted, but let/const are in the TDZ.",
      "Hoisting moves all code to the top of the file.",
      "Hoisting only applies to variables declared inside functions.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The complete answer covers: compilation phase, var→undefined, function declarations→fully available, let/const→TDZ (exist in memory but uninitialized, accessing throws ReferenceError). Mentioning TDZ differentiates a strong answer from an average one.",
  },
  {
    id: "rev-d15-05",
    question: "How do you explain 'this' in JavaScript in an interview without getting confused?",
    options: [
      "'this' always refers to the object that created the function.",
      "'this' is determined at call time (not definition time) for regular functions — it refers to the object calling the method; standalone functions get the global object or undefined in strict mode; arrow functions inherit 'this' lexically.",
      "'this' always refers to the global window object.",
      "'this' is the same as 'self' in all contexts.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The structured answer: (1) Method call: 'this' = the object before the dot. (2) Standalone call: global (non-strict) or undefined (strict). (3) Arrow functions: lexically inherited from enclosing scope. (4) call/apply/bind: explicitly set. This covers all cases interviewers ask about.",
  },
  {
    id: "rev-d15-06",
    question: "What is the prototype chain and why does it matter for interviews?",
    options: [
      "A chain of imported files in a Node.js project.",
      "Every object has an internal [[Prototype]] link to another object; property lookups traverse this chain until the property is found or null is reached — this is JavaScript's inheritance mechanism.",
      "A list of all methods defined on a class.",
      "The order in which constructor functions are called.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Interviewers ask this to check if you understand that JS inheritance is prototype-based, not class-based (classes are syntax sugar). Key points: every object has [[Prototype]], property lookup walks the chain, Object.prototype is the root (its [[Prototype]] is null), and methods like toString() are found on Object.prototype.",
  },
  {
    id: "rev-d15-07",
    question: "When asked 'Promises vs async/await', what is the most complete answer?",
    options: [
      "They are completely different technologies with different use cases.",
      "async/await is syntactic sugar over Promises — an async function always returns a Promise, and await pauses the async function (not the thread) until the Promise settles, making async code read like synchronous code while Promises enable .then() chaining.",
      "Promises are older and should never be used.",
      "async/await is faster because it runs on multiple threads.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Full answer: Both handle async operations. Promises use .then/.catch chains. async/await is sugar over Promises — under the hood they're identical. async functions return Promises. await pauses only that function. Error handling: try/catch vs .catch(). Interview bonus: mention that await can only be used inside async functions.",
  },
  {
    id: "rev-d15-08",
    question: "What is the difference between == and === in JavaScript?",
    options: [
      "They are identical in modern JavaScript.",
      "== performs type coercion before comparison (loose equality); === checks both value AND type without coercion (strict equality). Always use ===.",
      "=== is slower because it checks more things.",
      "== only works with numbers; === works with all types.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "'0' == 0 is true (coercion), '0' === 0 is false (different types). Classic traps: null == undefined is true, null === undefined is false. NaN == NaN is false (use Number.isNaN()). Always use === unless you have a specific reason for coercion.",
  },
  {
    id: "rev-d15-09",
    question: "How do you explain call(), apply(), and bind() in one clear paragraph?",
    options: [
      "They are three different ways to declare functions.",
      "All three allow you to explicitly set 'this': call() invokes immediately with arguments listed separately; apply() invokes immediately with arguments as an array; bind() returns a NEW function with 'this' permanently bound without invoking it.",
      "bind() and apply() are the same; call() is different.",
      "They only work on arrow functions.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Memory aid: call=comma (args comma-separated), apply=array, bind=bound-later. Practical use: call/apply for method borrowing, bind for event handlers and partial application. bind() is essential when you need to preserve 'this' in callbacks.",
  },
  {
    id: "rev-d15-10",
    question: "What is event delegation and what two problems does it solve?",
    options: [
      "It only solves performance problems.",
      "Event delegation attaches one listener to a parent instead of many listeners to children, solving: (1) performance with many items and (2) dynamic elements — newly added items automatically work because their events bubble up to the parent.",
      "It prevents event bubbling entirely.",
      "It is only useful for keyboard events.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Two problems solved: Performance (1 listener vs hundreds) and Dynamism (works for elements that don't exist yet). Implementation: attach listener to parent, use event.target to identify the clicked child, optionally use event.target.closest() to handle nested HTML inside list items.",
  },
  {
    id: "rev-d15-11",
    question: "What is the difference between null and undefined in JavaScript?",
    options: [
      "They are completely identical.",
      "undefined means a variable has been declared but not assigned a value (JS sets it automatically); null is an intentional assignment meaning 'no value' — it is explicitly set by the programmer.",
      "null is for numbers; undefined is for strings.",
      "undefined throws an error when accessed; null does not.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "undefined: JS assigns it automatically (uninitialized var, missing function parameter, missing object property). null: developer explicitly sets it to mean 'intentionally empty.' typeof undefined = 'undefined'; typeof null = 'object' (the famous bug). Strict equality: null !== undefined.",
  },
  {
    id: "rev-d15-12",
    question: "What does 'immutability' mean and why is it important in modern JavaScript?",
    options: [
      "Immutability means variables cannot be declared with var.",
      "Immutability means not modifying the original data — instead creating new values. This prevents side effects, makes state changes predictable, and is fundamental to React's state management.",
      "Immutability means all objects are frozen by default.",
      "Immutability only matters in functional programming.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Immutable patterns: use map/filter/reduce (return new arrays), spread {...obj} for objects, Object.freeze() for deep freeze. React requires immutable state updates because it detects changes by reference comparison. Mutating state directly causes React to miss re-renders.",
  },
  {
    id: "rev-d15-13",
    question: "What is the difference between synchronous and asynchronous code?",
    options: [
      "Synchronous code runs in browsers; asynchronous code only runs in Node.js.",
      "Synchronous code executes line by line, blocking the thread until each operation completes; asynchronous code initiates an operation and registers a callback/Promise, allowing other code to run while waiting.",
      "Asynchronous code always runs faster than synchronous code.",
      "Synchronous code uses Promises; asynchronous code uses callbacks.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Sync: each line waits for the previous. Async: long operations (network, file I/O, timers) are offloaded to Web APIs. The callback/Promise is placed in a task queue and runs when the call stack is empty. This is why JavaScript can handle I/O efficiently despite being single-threaded.",
  },
  {
    id: "rev-d15-14",
    question: "What is 'scope chain' in JavaScript?",
    options: [
      "A chain of function calls on the call stack.",
      "The lookup sequence JS uses to resolve a variable: starts in the current scope, then moves to outer scopes, up through the lexical nesting, until the global scope — throws ReferenceError if not found.",
      "The order in which modules are imported.",
      "A list of all variables declared in a program.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Scope chain is the 'where do I look for this variable?' mechanism. JS looks in current scope first, then each containing scope outward (lexical scoping), up to global. This is what makes closures work — inner functions can access outer variables through the scope chain.",
  },
  {
    id: "rev-d15-15",
    question: "What does 'Promise.allSettled()' do differently from 'Promise.all()'?",
    options: [
      "They are identical.",
      "Promise.all() short-circuits on the first rejection; Promise.allSettled() waits for ALL promises to settle (fulfilled OR rejected) and returns an array of result objects with status and value/reason for each.",
      "Promise.allSettled() is faster than Promise.all().",
      "Promise.allSettled() only works with exactly two promises.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Use Promise.allSettled() when you need all results regardless of failures (e.g. sending emails to multiple recipients — you want to know which succeeded AND which failed). Use Promise.all() when all must succeed or it's pointless (e.g. loading all required data before rendering).",
  },
  {
    id: "rev-d15-16",
    question: "What is the difference between deep equality and reference equality in JavaScript?",
    options: [
      "They are the same in JavaScript.",
      "Reference equality (===) checks if two variables point to the SAME object in memory; deep equality checks if two objects have the same structure and values regardless of being different objects.",
      "Deep equality is only available in TypeScript.",
      "Reference equality checks values; deep equality checks types.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "[] === [] is false (different references, same structure). JSON.stringify([]) === JSON.stringify([]) is true (deep). React uses reference equality for re-render checks — this is why you must return NEW array/object references from state updates. Deep equality is expensive; reference equality is O(1).",
  },
  {
    id: "rev-d15-17",
    question: "What is a pure function?",
    options: [
      "A function that only accepts numbers as arguments.",
      "A function that: (1) given the same inputs, always returns the same output, and (2) has no side effects (doesn't modify external state, no I/O, no mutations).",
      "A function with no return statement.",
      "A function declared with the 'pure' keyword.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Pure functions are predictable, testable, and composable. math.add(2, 3) is pure. A function that calls console.log, mutates an array, or reads a global variable is impure. React components should be pure (same props → same output). map/filter/reduce are pure; push/splice are impure.",
  },
  {
    id: "rev-d15-18",
    question: "What does 'lexical scoping' mean?",
    options: [
      "Variables are resolved based on where the function is called.",
      "Variable scope is determined by where the function is DEFINED in the source code (the lexical/textual structure), not where it is called.",
      "All variables are globally scoped by default.",
      "Variables declared with let are always global.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Lexical (static) scoping: the scope of a variable is fixed at write time based on its position in the code. This is why closures work — a function defined inside another function will always have access to the outer function's variables, regardless of where the inner function is eventually called.",
  },
  {
    id: "rev-d15-19",
    question: "How would you explain debounce to a non-technical interviewer?",
    options: [
      "Debounce makes functions run multiple times in parallel.",
      "Debounce is like a 'wait for the user to stop typing' mechanism — the function only fires after the user has paused for a set time, preventing excessive calls on every single keystroke.",
      "Debounce is a security technique to prevent SQL injection.",
      "Debounce is how JavaScript handles memory allocation.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Analogy: a search box that waits until you stop typing before calling the API. Each keystroke resets a 300ms timer. Only when 300ms pass without a keystroke does the search fire. This reduces API calls from potentially hundreds to just one per search intent.",
  },
  {
    id: "rev-d15-20",
    question: "What are the four main ways 'this' can be bound in JavaScript?",
    options: [
      "global, local, arrow, class",
      "Implicit (method call), Explicit (call/apply/bind), new binding (constructor), and Default (standalone call — global or undefined in strict mode). Arrow functions use lexical binding (not their own 'this').",
      "window, document, module, function",
      "There is only one way 'this' is bound in JavaScript.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The four rules in order of priority: 1. new binding (new Foo()) → new object. 2. Explicit (call/apply/bind) → specified object. 3. Implicit (obj.method()) → the object before the dot. 4. Default → global (non-strict) or undefined (strict). Arrow functions are a special case — they capture 'this' from the enclosing lexical context at definition time.",
  },
];

const day15_coding: CodingQuestion[] = [
  {
    id: "code-d15-01",
    title: "Implement a Module Pattern with Private State",
    difficulty: "Easy",
    description:
      "Implement a createBankAccount(initialBalance) factory function that demonstrates closures for data privacy. It should return an object with four methods: deposit(amount), withdraw(amount), getBalance(), and getTransactionHistory(). The balance and transaction log must be private (not accessible directly). withdraw() should throw an error if the amount exceeds the balance.",
    examples: [
      {
        input:
          "const acc = createBankAccount(100);\nacc.deposit(50);\nacc.withdraw(30);\nacc.getBalance();",
        output: "120",
        explanation: "100 + 50 - 30 = 120",
      },
      {
        input: "const acc = createBankAccount(100);\nconsole.log(acc.balance);",
        output: "undefined",
        explanation: "balance is private — not exposed on the returned object",
      },
      {
        input: "const acc = createBankAccount(50);\nacc.withdraw(100);",
        output: "Error: Insufficient funds",
      },
    ],
    constraints: [
      "balance and transactionHistory must be private (closure variables, not object properties).",
      "withdraw() must throw an Error if amount > balance.",
      "getTransactionHistory() returns an array of strings describing each transaction.",
      "Both deposit and withdraw should add to the history.",
    ],
    hint: "Declare balance and transactionHistory with let inside createBankAccount. Return an object whose methods close over these variables. Since balance is not a property of the returned object, it cannot be accessed with dot notation from outside.",
  },
  {
    id: "code-d15-02",
    title: "Explain and Fix the Classic Closure-in-Loop Bug",
    difficulty: "Easy",
    description:
      "Given the following broken code, fix it using THREE different approaches: (1) using let, (2) using an IIFE, (3) using bind().\n\nBroken code:\nconst funcs = [];\nfor (var i = 0; i < 5; i++) {\n  funcs.push(function() { return i; });\n}\n// funcs[0]() through funcs[4]() all return 5 (broken)\n\nEach fixed approach should produce funcs[0]() === 0, funcs[1]() === 1, ... funcs[4]() === 4.",
    examples: [
      {
        input: "// After fix:\nfuncs[0]()",
        output: "0",
      },
      {
        input: "funcs[3]()",
        output: "3",
      },
    ],
    constraints: [
      "Implement all three approaches as separate functions: fixWithLet(), fixWithIIFE(), fixWithBind().",
      "Each must return an array of 5 functions.",
      "The returned functions must return their captured index value.",
    ],
    hint: "let approach: replace var with let — each iteration gets a new binding. IIFE approach: wrap the function in an immediately invoked function that receives i as a parameter, creating a new scope per iteration. bind approach: use function.bind(null, i) to fix the value of the first argument.",
  },
];

// =============================================================================
// DAY 16 — GitHub Polish · Graph Algorithms: BFS/DFS · Number of Islands · Course Schedule
// =============================================================================
const day16_mcqs: MCQQuestion[] = [
  {
    id: "rev-d16-01",
    question: "What is the 'Number of Islands' problem asking you to find?",
    options: [
      "The number of '1's in a 2D grid.",
      "The count of connected components of '1's (land) in a 2D grid of '1's and '0's (water), where connectivity is horizontal and vertical.",
      "The largest island by area.",
      "The number of rows containing at least one '1'.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Find the number of connected groups of '1's. For each unvisited '1', run BFS or DFS to mark all connected land as visited, increment island count. Time: O(m×n), Space: O(m×n) for the visited state.",
  },
  {
    id: "rev-d16-02",
    question: "What traversal do you use in DFS for the Number of Islands problem?",
    options: [
      "Visit each cell once and count '1's.",
      "For each unvisited '1', recursively visit all 4 neighbours (up, down, left, right) that are '1' and unvisited, marking each as visited to avoid double-counting.",
      "Sort all cells by value and process in order.",
      "Use a priority queue to process cells by their grid coordinate.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "DFS from each unvisited '1': mark it visited (set to '0' or use a separate visited array), then recurse on valid unvisited neighbours. Each DFS call explores one full island. Count the number of times you initiate a DFS from an unvisited '1'.",
  },
  {
    id: "rev-d16-03",
    question: "What does the 'Course Schedule' problem (LeetCode 207) reduce to in graph theory?",
    options: [
      "Finding the shortest path between two nodes.",
      "Detecting a cycle in a directed graph (DAG check) — if there is a cycle in the prerequisite graph, it is impossible to finish all courses.",
      "Finding the minimum spanning tree.",
      "Counting connected components.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Build a directed graph: edge A→B means 'A is a prerequisite for B'. If the graph has a cycle, some courses are mutually dependent and cannot all be completed. Use DFS with a 3-state coloring (unvisited/in-progress/done) or Kahn's algorithm (topological sort via BFS) to detect cycles.",
  },
  {
    id: "rev-d16-04",
    question: "What are the three states in DFS cycle detection for a directed graph?",
    options: [
      "empty, full, partial",
      "WHITE (unvisited), GRAY (currently in DFS path/in-progress), BLACK (fully processed). Finding a GRAY node during DFS means there is a back edge — a cycle.",
      "pending, active, complete",
      "0, 1, 2 with no specific meaning",
    ],
    correctAnswerIndex: 1,
    explanation:
      "WHITE=0 (not started), GRAY=1 (in current DFS path), BLACK=2 (DFS complete, no cycle from here). If you visit a GRAY node, you've found a cycle (back edge). If you visit a BLACK node, it's already been cleared — no cycle through that path.",
  },
  {
    id: "rev-d16-05",
    question: "What is Kahn's algorithm used for?",
    options: [
      "Finding the shortest path in a weighted graph.",
      "Topological sorting of a DAG using BFS — start with nodes of in-degree 0, process them and reduce neighbours' in-degrees, repeating until all nodes are processed or a cycle is detected.",
      "Finding all strongly connected components.",
      "Detecting negative cycles in a graph.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Kahn's algorithm: build in-degree count for each node. Queue all nodes with in-degree 0. Process queue: for each node, reduce all its neighbours' in-degrees by 1; if any reach 0, add them to the queue. If the processed count < total nodes, a cycle exists.",
  },
  {
    id: "rev-d16-06",
    question: "What should a good GitHub README include for an interview portfolio project?",
    options: [
      "Only the project title.",
      "Project title and description, tech stack, live demo link, setup/installation steps, screenshots or GIFs, and key features or challenges solved.",
      "Only the installation commands.",
      "A list of all files in the project.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A strong README: title + one-sentence description, badges (tech stack), live demo URL, screenshots/GIFs, installation steps, usage examples, and optionally: challenges faced and how you solved them. Interviewers often read README before looking at code.",
  },
  {
    id: "rev-d16-07",
    question: "What is an adjacency list and why is it preferred over an adjacency matrix for sparse graphs?",
    options: [
      "An adjacency list stores all edges in a sorted array; matrices are unsorted.",
      "An adjacency list stores each node's neighbours in a list — O(V+E) space. An adjacency matrix stores a V×V grid — O(V²) space. For sparse graphs (few edges), the list is far more memory-efficient.",
      "An adjacency matrix is always preferred.",
      "They are identical in performance.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Adjacency list: array/map where each index holds a list of its neighbours. Space: O(V+E). Adjacency matrix: V×V boolean/weight grid. Space: O(V²). For a graph with 1000 nodes and 1005 edges, list uses ~2005 cells; matrix uses 1,000,000. Most real graphs are sparse — use lists.",
  },
  {
    id: "rev-d16-08",
    question: "What is a topological ordering and when does it exist?",
    options: [
      "Sorting graph nodes alphabetically.",
      "A linear ordering of vertices such that for every directed edge u→v, u comes before v. It exists if and only if the graph is a DAG (Directed Acyclic Graph — no cycles).",
      "The order in which DFS finishes visiting nodes.",
      "The BFS level-order traversal of a tree.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Topological sort gives a 'task order' — complete prerequisites before dependents. It only exists for DAGs. Cyclic dependencies (A needs B, B needs A) make topological ordering impossible. Use cases: build systems, package managers, course scheduling.",
  },
  {
    id: "rev-d16-09",
    question: "What does 'pinning repositories' on GitHub do for your interview profile?",
    options: [
      "It backs up the repository to a secondary server.",
      "It showcases up to 6 of your best projects prominently on your profile page — first thing a recruiter or interviewer sees when they visit your GitHub.",
      "It locks the repository from further edits.",
      "It notifies your followers of updates.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "GitHub lets you pin up to 6 repositories. Pin your 3 best projects that demonstrate the skills relevant to the job. A recruiter spending 30 seconds on your profile will immediately see your best work rather than hunting through all repositories.",
  },
  {
    id: "rev-d16-10",
    question: "What is the time complexity of BFS on a graph represented as an adjacency list?",
    options: ["O(V²)", "O(V + E)", "O(E log V)", "O(V × E)"],
    correctAnswerIndex: 1,
    explanation:
      "BFS visits each vertex once (O(V)) and processes each edge once (O(E)), giving O(V+E). With an adjacency matrix it would be O(V²) since you must scan the entire row for each vertex. This is why adjacency lists are preferred for BFS/DFS.",
  },
  {
    id: "rev-d16-11",
    question: "Why do we mark a node as visited BEFORE adding to the BFS queue (not after processing)?",
    options: [
      "It doesn't matter when we mark nodes as visited.",
      "Marking before adding prevents the same node from being added to the queue multiple times by different neighbours — which would cause redundant processing and incorrect results.",
      "Marking before adding is slower but more correct.",
      "We should always mark after dequeuing, not before adding.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "If two neighbours both point to node X, and we only mark as visited when dequeuing, both will add X to the queue. This causes X to be processed twice. Marking when enqueuing prevents duplicate queue entries — critical for correctness.",
  },
  {
    id: "rev-d16-12",
    question: "What is the difference between 'git add .', 'git commit -m', and 'git push'?",
    options: [
      "They all do the same thing in different orders.",
      "git add stages changes to the index; git commit saves the staged snapshot to local history with a message; git push uploads local commits to the remote repository (GitHub).",
      "git push stages; git commit adds; git add uploads.",
      "git add is only for new files; git commit is for all changes.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Three-step Git workflow: (1) git add . — stage all changed files. (2) git commit -m 'message' — save staged changes to local repository with a descriptive message. (3) git push — upload local commits to GitHub remote. You can commit multiple times before pushing.",
  },
  {
    id: "rev-d16-13",
    question: "What does 'Clone Graph' (LeetCode 133) test about your understanding of graphs?",
    options: [
      "Only BFS traversal.",
      "Deep copying a graph — traversing all nodes via BFS/DFS while maintaining a map of original→copy to handle cycles and shared references correctly without infinite loops.",
      "Finding the shortest path in a graph.",
      "Detecting if a graph is a tree.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Clone Graph requires: traversal (BFS/DFS), creating new node copies, and a HashMap<original, copy> to avoid infinite loops on cyclic graphs. Without the map, you'd loop forever on cycles. The map also handles nodes that are reachable through multiple paths.",
  },
  {
    id: "rev-d16-14",
    question: "What is the difference between undirected and directed graphs?",
    options: [
      "Undirected graphs have fewer edges than directed graphs.",
      "In an undirected graph, edges have no direction — if A connects to B, B connects to A. In a directed graph (digraph), edges have direction — A→B does not imply B→A.",
      "Directed graphs are always weighted; undirected are not.",
      "Undirected graphs cannot have cycles.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Undirected: friend networks (friendship is mutual). Directed: Twitter follows (I can follow you without you following me), task dependencies (A must come before B). Directed graphs have additional concepts: in-degree, out-degree, strongly connected components.",
  },
  {
    id: "rev-d16-15",
    question: "What makes a graph a tree (in graph theory terms)?",
    options: [
      "A tree is any graph with more than one node.",
      "A tree is a connected, undirected graph with no cycles — equivalently, a connected graph with exactly V-1 edges (where V is the number of vertices).",
      "A tree must have a single root node.",
      "A tree must have all nodes at the same level.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A tree is a special graph: connected (all nodes reachable) + acyclic (no cycles) + undirected. With V nodes, a tree always has exactly V-1 edges. Rooted trees add the concept of a designated root, parent-child relationships, and depth levels — but from pure graph theory, it's just a connected acyclic graph.",
  },
  {
    id: "rev-d16-16",
    question: "When walking an interviewer through your GitHub project, what should you cover?",
    options: [
      "Only describe what the project looks like visually.",
      "What problem it solves, key technical decisions made, interesting challenges overcome, your specific contribution, and what you would improve with more time.",
      "Only read the README aloud.",
      "Focus entirely on the folder structure.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The STAR structure works here: Situation (what problem), Task (what you built), Action (technical decisions — why did you choose X over Y?), Result (outcome). The most impressive part is discussing tradeoffs and what you'd do differently — it shows engineering maturity.",
  },
  {
    id: "rev-d16-17",
    question: "What is a connected component in an undirected graph?",
    options: [
      "Any path from one node to another.",
      "A maximal subgraph where every pair of vertices is connected by a path — nodes within a component can all reach each other, but cannot reach nodes in other components.",
      "A node with more than two edges.",
      "The root node of a graph.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Finding connected components: run DFS/BFS from each unvisited node, marking all reachable nodes as visited and counting each new traversal as a new component. This is exactly what Number of Islands does — each island is a connected component of '1' cells.",
  },
  {
    id: "rev-d16-18",
    question: "What is the purpose of writing a descriptive commit message in Git?",
    options: [
      "Longer commit messages run faster.",
      "Descriptive messages (e.g. 'Add debounce to search input for performance') explain WHY a change was made, making the project history readable to interviewers and future collaborators.",
      "Commit messages are only visible to the original author.",
      "Git requires commit messages of exactly 50 characters.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Interviewers scroll commit history to assess your thought process. Bad: 'fix stuff'. Good: 'Fix closure bug in counter — use let instead of var in for loop'. The message should explain what and why, not just what (the diff already shows what changed).",
  },
  {
    id: "rev-d16-19",
    question: "What is the space complexity of DFS on a graph with V vertices and E edges?",
    options: [
      "O(E) for the stack.",
      "O(V) for the recursion call stack and visited array — in the worst case (a linear chain), the stack depth equals V.",
      "O(1) because DFS is in-place.",
      "O(V²) because of the adjacency matrix.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "DFS space: O(V) for the visited array/set + O(V) for the recursion stack in the worst case (long chain graph). For a balanced tree, stack depth is O(log V). The adjacency list itself is O(V+E) but that's input space, not algorithm space.",
  },
  {
    id: "rev-d16-20",
    question: "What does it mean for a directed graph to be a DAG?",
    options: [
      "A Doubly-linked Acyclic Graph.",
      "A Directed Acyclic Graph — a directed graph with no directed cycles. Every path eventually reaches a node with no outgoing edges (a sink). DAGs are used to model dependencies, task ordering, and data pipelines.",
      "A graph with exactly one edge per node.",
      "A graph where all edges point in the same direction.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "DAG (Directed Acyclic Graph): directed edges + no cycles. Real-world examples: build dependency graphs (Webpack), course prerequisites (take A before B), Git commit history, spreadsheet cell dependencies. Topological sort only works on DAGs.",
  },
];

const day16_coding: CodingQuestion[] = [
  {
    id: "code-d16-01",
    title: "Number of Islands",
    difficulty: "Medium",
    description:
      "Write a function numIslands(grid) that takes a 2D grid of '1's (land) and '0's (water) and returns the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    examples: [
      {
        input:
          "numIslands([\n  ['1','1','1','1','0'],\n  ['1','1','0','1','0'],\n  ['1','1','0','0','0'],\n  ['0','0','0','0','0']\n])",
        output: "1",
      },
      {
        input:
          "numIslands([\n  ['1','1','0','0','0'],\n  ['1','1','0','0','0'],\n  ['0','0','1','0','0'],\n  ['0','0','0','1','1']\n])",
        output: "3",
      },
    ],
    constraints: [
      "Use DFS or BFS.",
      "You may modify the grid in-place (mark visited cells as '0') or use a separate visited array.",
      "Time complexity: O(m × n). Space: O(m × n) worst case.",
      "Handle empty grid input.",
    ],
    hint: "Outer loop: iterate every cell. When you find a '1', increment count and start DFS/BFS to sink (mark as '0') the entire connected island. DFS: mark current as '0', recurse on 4 neighbours if they are '1' and within bounds.",
  },
  {
    id: "code-d16-02",
    title: "Can Finish All Courses (Cycle Detection in Directed Graph)",
    difficulty: "Medium",
    description:
      "Write a function canFinish(numCourses, prerequisites) that returns true if it is possible to finish all courses given the prerequisites. prerequisites[i] = [a, b] means you must take course b before course a. This reduces to detecting a cycle in a directed graph.",
    examples: [
      {
        input: "canFinish(2, [[1,0]])",
        output: "true",
        explanation: "Take course 0 first, then course 1.",
      },
      {
        input: "canFinish(2, [[1,0],[0,1]])",
        output: "false",
        explanation: "Cycle: 0 requires 1, and 1 requires 0.",
      },
      {
        input: "canFinish(5, [[1,0],[2,1],[3,2],[4,3]])",
        output: "true",
        explanation: "Linear chain, no cycle.",
      },
    ],
    constraints: [
      "Build an adjacency list from prerequisites.",
      "Use DFS with 3-state coloring (0=unvisited, 1=in-progress, 2=done) OR Kahn's BFS topological sort.",
      "Return false if any cycle is detected.",
      "Time: O(V+E), Space: O(V+E).",
    ],
    hint: "DFS approach: for each unvisited node, run DFS marking it as IN_PROGRESS (1). If you encounter an IN_PROGRESS node, you found a cycle — return false. When DFS completes for a node, mark it DONE (2). DONE nodes are safe — no need to re-explore.",
  },
];

// =============================================================================
// DAY 17 — Mock Interview Day · HR Prep · STAR Method · Live Coding Mindset
// =============================================================================
const day17_mcqs: MCQQuestion[] = [
  {
    id: "rev-d17-01",
    question: "What is the STAR method and when is it used in an interview?",
    options: [
      "STAR is a coding framework for solving algorithmic problems.",
      "STAR is a storytelling framework for behavioural questions: Situation (context), Task (your responsibility), Action (what you specifically did), Result (measurable outcome). Used for 'Tell me about a time when...' questions.",
      "STAR stands for Structured Technical Assessment Review.",
      "STAR is a method for writing clean code.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "STAR: Situation (2-3 sentences of context), Task (what was YOUR role/challenge), Action (specific steps YOU took — use 'I' not 'we'), Result (quantifiable outcome — what improved, what you learned). Keep it under 2 minutes. Always prepare 3-4 STAR stories before interviews.",
  },
  {
    id: "rev-d17-02",
    question: "When a technical interviewer gives you a problem, what should you do BEFORE writing any code?",
    options: [
      "Start coding immediately to show speed.",
      "Clarify the problem (ask about edge cases, constraints, input/output types), state your approach out loud, discuss time/space complexity, then code with a running commentary.",
      "Ask for the solution to compare against.",
      "Write the code silently and then explain it at the end.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The process matters more than the answer. Interviewers want to see: clarify (handle edge cases?), plan (what approach and why), estimate complexity before coding, then code while explaining. Silence is the biggest mistake — talk through every decision.",
  },
  {
    id: "rev-d17-03",
    question: "How should you handle not knowing the answer to a technical question in an interview?",
    options: [
      "Say nothing and wait for the interviewer to move on.",
      "Acknowledge what you don't know, explain what you DO know related to it, reason through it out loud, and ask clarifying questions — showing problem-solving process is valued over rote memorization.",
      "Make up an answer that sounds plausible.",
      "Ask to use Google to look it up.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "'I don't know exactly, but here's how I'd think through it...' is a strong answer. Interviewers know you won't know everything — they assess your reasoning process. Showing you can work from first principles is more valuable than having every answer memorized.",
  },
  {
    id: "rev-d17-04",
    question: "What is a strong answer to 'Tell me about yourself' for a junior frontend developer interview?",
    options: [
      "A detailed description of your entire life history.",
      "A 2-minute structured pitch: current skills/background (1-2 sentences), what you've built (1-2 relevant projects), what you're looking for and why this company, ending with why you're excited about this specific role.",
      "Only your educational background.",
      "A list of every technology you've ever used.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Formula: 'I'm a [X] developer with experience in [skills]. I recently built [project A] which [impact], and [project B] where I solved [challenge]. I'm looking to join a team like Leapfrog because [specific reason — research the company]. I'm excited about [specific role aspect].' Keep it under 90 seconds.",
  },
  {
    id: "rev-d17-05",
    question: "What is the best way to explain a bug you found and fixed in a live coding interview?",
    options: [
      "Pretend the bug doesn't exist.",
      "Proactively catch the bug — say 'I see a potential issue here with edge case X, let me add a guard for that.' Fixing bugs you spot shows quality awareness.",
      "Let the interviewer find it and then apologize.",
      "Rewrite the entire function when you find a bug.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Proactively catching your own bugs is a strong signal. Say: 'I realize this will fail if the input is empty — let me add an early return.' This shows self-review habits, attention to edge cases, and that you test your own code. It's a green flag for interviewers.",
  },
  {
    id: "rev-d17-06",
    question: "What should you say when the interviewer asks 'What is your greatest weakness?'",
    options: [
      "'I have no weaknesses.'",
      "Name a genuine, non-critical weakness, immediately follow with the specific steps you're taking to improve it, and ideally show evidence of improvement. Avoid clichés like 'I'm a perfectionist.'",
      "'I work too hard.'",
      "Name a core technical skill required for the job as your weakness.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Example: 'I used to struggle with explaining my code to non-technical teammates. I've been actively working on this by writing better comments, giving short code walkthroughs in team meetings, and asking for feedback. I've seen improvement in how my code reviews go.' Genuine + growth-focused.",
  },
  {
    id: "rev-d17-07",
    question: "What are the most important 'smart questions' to ask an interviewer at the end of a technical round?",
    options: [
      "'What is the salary?'",
      "Questions about the team's tech stack, code review process, how juniors are mentored, what a typical sprint looks like, or what the biggest technical challenge the team is facing right now.",
      "'Can I start next week?'",
      "'How many vacation days do I get?'",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Smart questions show genuine interest and research. Good ones: 'What does the onboarding process look like for a junior developer?', 'How does the team handle code reviews?', 'What does a typical day look like for someone in this role?' Avoid compensation questions in the first round.",
  },
  {
    id: "rev-d17-08",
    question: "When asked 'Why do you want to work at Leapfrog specifically?', what makes a strong answer?",
    options: [
      "'Because you're hiring.'",
      "Specific research-based reasons: their work with international clients, their training program for juniors, specific projects or technologies they use, their culture/values, and how it aligns with your career goals.",
      "'Because the office is nearby.'",
      "'I applied to many companies and this is the first to respond.'",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Research before every interview: check Leapfrog's website, recent projects, Glassdoor, LinkedIn. Mention specific things: 'Your focus on building international-quality products from Nepal aligns with my goal to work on impactful projects. Your training program is particularly exciting because...' Specificity signals genuine interest.",
  },
  {
    id: "rev-d17-09",
    question: "What is the best strategy when you're stuck on a coding problem mid-interview?",
    options: [
      "Give up and ask the interviewer to solve it.",
      "Verbalize what you know and what's blocking you, try a simpler subproblem or brute force first, ask targeted clarifying questions, and if truly stuck, ask for a small hint — interviewers expect to give hints.",
      "Sit in silence and think for 10 minutes.",
      "Start over with a completely different approach immediately.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "When stuck: (1) Talk — 'I know I need to track frequency, so I'll use a map...' (2) Try brute force first, then optimize. (3) Work through a small example by hand. (4) Ask: 'Would it be okay if I asked for a small hint?' Asking for hints gracefully is better than silence or random coding.",
  },
  {
    id: "rev-d17-10",
    question: "Why is it important to practice explaining your solution out loud before the interview?",
    options: [
      "Talking makes you code faster.",
      "Interviewers evaluate both your solution AND your ability to communicate technical ideas clearly. Thinking and speaking simultaneously is a skill that requires practice — without it, even correct solutions can appear weak.",
      "Talking helps you memorize syntax.",
      "Interviewers prefer candidates who are talkative.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Communication is half the interview. A candidate who says 'I'm using a sliding window here because we want O(n) instead of O(n²)' and explains the tradeoff shows engineering thinking. A candidate who codes correctly but silently is harder to evaluate. Practice coding + narrating simultaneously.",
  },
  {
    id: "rev-d17-11",
    question: "What does 'culture fit' mean in an interview context and how do you prepare for it?",
    options: [
      "It means you need to share the same hobbies as the interviewers.",
      "Culture fit assesses whether your working style, values, and attitude align with the team's. Prepare by researching the company's mission and values, and having authentic stories about collaboration, learning from failure, and handling disagreement.",
      "Culture fit is only for senior roles.",
      "It means you should copy the company's communication style.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Culture fit questions: 'Tell me about a time you disagreed with a teammate,' 'How do you handle tight deadlines?' Prepare STAR stories showing: initiative, collaboration, learning mindset, and handling feedback. Research the company values and tie your answers to them authentically.",
  },
  {
    id: "rev-d17-12",
    question: "What is the best way to handle a follow-up question like 'Can you optimize this further?'",
    options: [
      "Say your current solution is already optimal without analysis.",
      "Analyze your current solution's time/space complexity, then reason through possible improvements (better data structure, different algorithm paradigm), discussing tradeoffs even if you can't implement the optimization in the moment.",
      "Rewrite the solution from scratch.",
      "Ask the interviewer what the optimal solution is.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "'Can you optimize this?' is an invitation to show algorithmic thinking. Say: 'My current solution is O(n²) because of nested loops. I think we could get O(n) by using a hash map to store... [reasoning]. The tradeoff is O(n) extra space.' Even if you don't implement it, the analysis shows maturity.",
  },
  {
    id: "rev-d17-13",
    question: "What should you do in the 24 hours before a technical interview?",
    options: [
      "Study as many new topics as possible.",
      "Review your own notes and previously solved problems (not new material), get good sleep, prepare your environment (laptop charged, IDE ready, GitHub open), rehearse your 'tell me about yourself' pitch, and prepare 5 questions for the interviewer.",
      "Solve 20 new LeetCode hard problems.",
      "Read documentation for every framework you've used.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The night before is for consolidation, not learning. Your brain needs sleep to consolidate what you've studied. Review: your summary notes, 5 problems you know well (confidence building), your project pitches. Set up your workspace. Sleep 7-8 hours. Arrive/log in 5 minutes early.",
  },
  {
    id: "rev-d17-14",
    question: "How do you write clean, readable code under interview time pressure?",
    options: [
      "Write one-liners using advanced operators to show off.",
      "Use meaningful variable names, add brief comments for non-obvious logic, break complex operations into named helper functions, and handle edge cases explicitly with early returns.",
      "Prioritize speed over readability — clean it up after.",
      "Use single-letter variable names to write faster.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Interviewers read your code. Good practices under pressure: names like 'maxProfit' not 'mp', handle edge cases first (early return), one concern per block. A working but unreadable solution scores lower than a slightly slower but clean one. Imagine your code is a pull request a senior will review.",
  },
  {
    id: "rev-d17-15",
    question: "What is the purpose of running through an example in a coding interview?",
    options: [
      "To check if the interviewer is following along.",
      "To verify your logic before coding — catching bugs early, confirming edge cases are handled, and showing the interviewer your verification process. Always trace through at least one example and one edge case after writing your solution.",
      "To stall for time while thinking.",
      "Examples are only needed for the interviewer, not for you.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Trace through an example step-by-step after coding: 'Let's test with input [3,1,4]: step 1 — i=0, current=3, minPrice=3... final answer=6. Let me also check the edge case of a single-element array.' This shows discipline and catches off-by-one or logic errors before the interviewer points them out.",
  },
  {
    id: "rev-d17-16",
    question: "How do you handle a technical question you've never seen in a new domain?",
    options: [
      "Immediately say you don't know this area.",
      "Apply first principles: break the problem into smaller pieces, identify what data structures or patterns might apply, state what you do know, attempt a brute force solution, and iterate.",
      "Ask the interviewer to skip it.",
      "Answer a similar question you DO know instead.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "First principles thinking: 'I haven't seen this exact problem, but it looks like we need to track... a Set might work. Let me try a brute force first: for each element... OK, that's O(n²). Can we do better with a hash?' The process of working through it is what the interviewer is evaluating.",
  },
  {
    id: "rev-d17-17",
    question: "What is an effective way to practice for a mock interview you're recording yourself on?",
    options: [
      "Only record the final version once you have a perfect answer.",
      "Record from the start, including when you're unsure — watch it back to identify hesitations, filler words, clarity of explanation, and whether your code walkthrough is logical. The discomfort of watching yourself improves faster than any other method.",
      "Have someone else record you without you knowing.",
      "Only record the code, not your verbal explanations.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Self-recording is uncomfortable but powerful. After watching: note where you said 'um' excessively, where your explanation was unclear, where you jumped to code before clarifying, and where your body language showed confusion. Specific feedback beats vague practice.",
  },
  {
    id: "rev-d17-18",
    question: "What should your tone be during a technical interview?",
    options: [
      "Overly formal and robotic.",
      "Confident but collaborative — treat it like a technical conversation with a senior colleague, not an interrogation. Show curiosity, acknowledge when something is tricky, and be genuine.",
      "Casual and joke frequently.",
      "Match the tone of a written exam — serious and silent.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The best interviews feel like a technical discussion. Say things like: 'That's an interesting constraint, it rules out sorting...' or 'I'm not 100% sure about this edge case — let me think for a second.' Genuine curiosity and collaborative thinking make you memorable.",
  },
  {
    id: "rev-d17-19",
    question: "When asked 'Where do you see yourself in 5 years?', what is the ideal answer for a junior developer?",
    options: [
      "'I plan to be the CEO of this company.'",
      "An honest growth-focused answer: mastering your technical fundamentals in year 1-2, taking on more independent features and mentoring newer developers by year 3-4, and potentially moving into a senior or lead role while still enjoying technical work.",
      "'I have no idea.'",
      "Exactly what you think the interviewer wants to hear.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Interviewers want to know you're growth-oriented and planning to stay long enough to be worth investing in. Mention: deepening technical skills, contributing more, and eventually taking on responsibility. Avoid: 'I want to start my own company in 2 years' (signals short tenure).",
  },
  {
    id: "rev-d17-20",
    question: "What is the best way to close a technical interview?",
    options: [
      "Leave immediately after the last question.",
      "Thank the interviewer, express specific enthusiasm for the role (not generic), ask your 2-3 prepared smart questions, clarify next steps, and reiterate your fit briefly: 'I'm really excited — my background in X aligns well with what you described.'",
      "Ask what went wrong in your answers.",
      "Promise to send a follow-up email with better answers to the questions you struggled with.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Closing well leaves a strong final impression. The close: ask your best prepared question (shows curiosity), ask about next steps (shows you want the job), and restate your genuine interest specific to the role and company. A brief, confident handshake/sign-off is remembered.",
  },
];

const day17_coding: CodingQuestion[] = [
  {
    id: "code-d17-01",
    title: "Three Sum",
    difficulty: "Medium",
    description:
      "Write a function threeSum(nums) that returns all unique triplets [a, b, c] from the array such that a + b + c === 0. The solution set must not contain duplicate triplets.",
    examples: [
      {
        input: "threeSum([-1, 0, 1, 2, -1, -4])",
        output: "[[-1, -1, 2], [-1, 0, 1]]",
      },
      {
        input: "threeSum([0, 1, 1])",
        output: "[]",
      },
      {
        input: "threeSum([0, 0, 0])",
        output: "[[0, 0, 0]]",
      },
    ],
    constraints: [
      "Sort the array first — this enables the two-pointer approach.",
      "For each element nums[i], use two pointers (left=i+1, right=n-1) to find pairs summing to -nums[i].",
      "Skip duplicates: if nums[i] === nums[i-1], skip. After finding a triplet, skip duplicate values of left and right pointers.",
      "Time: O(n²), Space: O(1) excluding output.",
    ],
    hint: "Sort first. Outer loop: fix nums[i]. Inner: left=i+1, right=n-1. If sum < 0, left++. If sum > 0, right--. If sum === 0, push triplet, then skip duplicates by advancing both pointers past repeated values.",
  },
  {
    id: "code-d17-02",
    title: "Container With Most Water",
    difficulty: "Medium",
    description:
      "Write a function maxArea(height) that takes an array of heights and returns the maximum water that can be contained between two vertical lines. The water contained = min(height[left], height[right]) × (right - left).",
    examples: [
      { input: "maxArea([1,8,6,2,5,4,8,3,7])", output: "49", explanation: "Lines at index 1 and 8: min(8,7) × 7 = 49" },
      { input: "maxArea([1,1])", output: "1" },
      { input: "maxArea([4,3,2,1,4])", output: "16" },
    ],
    constraints: [
      "Use the two-pointer approach — O(n) time, O(1) space.",
      "Start with left=0, right=n-1.",
      "Always move the pointer pointing to the SHORTER line (moving the taller line can never increase area).",
      "Track the maximum area seen.",
    ],
    hint: "Two pointers: left=0, right=n-1. Calculate area = min(h[left], h[right]) × (right-left). Update max. Move the shorter pointer inward — moving the taller pointer would only decrease width without guaranteed height improvement.",
  },
];

// =============================================================================
// DAY 18 — Remote Assignment Prep · Fetch API · Filter/Search UI · Clean Code
// =============================================================================
const day18_mcqs: MCQQuestion[] = [
  {
    id: "rev-d18-01",
    question: "What is the standard pattern for fetching data and displaying it with error handling in vanilla JavaScript?",
    options: [
      "Use XMLHttpRequest with callbacks.",
      "Use async/await with try/catch: fetch the URL, check response.ok (throw if false), parse with response.json(), then update the DOM. Catch displays an error message to the user.",
      "Use setTimeout to repeatedly check if data arrived.",
      "Use synchronous XMLHttpRequest to block until data arrives.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The modern pattern: async function fetchData() { try { const res = await fetch(url); if (!res.ok) throw new Error(res.status); const data = await res.json(); renderData(data); } catch (e) { showError(e.message); } }. Separate concerns: fetch, render, error handling in clean named functions.",
  },
  {
    id: "rev-d18-02",
    question: "In a remote assignment, why is it critical to check response.ok before calling response.json()?",
    options: [
      "response.json() only works if response.ok is true.",
      "fetch() does not reject on HTTP errors (4xx/5xx) — only on network failure. Without checking response.ok, your code will silently try to parse an error response body as valid data, causing confusing bugs.",
      "response.ok is required for CORS compliance.",
      "response.ok speeds up the JSON parsing.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A 404 or 500 response still resolves the fetch() Promise. If you call response.json() on a 404 HTML error page, it will throw a SyntaxError (not JSON). Always: if (!response.ok) throw new Error(`HTTP error: ${response.status}`);",
  },
  {
    id: "rev-d18-03",
    question: "What is the best approach for rendering a list of fetched items to the DOM for performance?",
    options: [
      "Append each item one by one with document.createElement inside the loop.",
      "Build all elements in a DocumentFragment inside the loop, then append the fragment to the DOM once — minimising reflows to a single operation.",
      "Set innerHTML with a concatenated HTML string built in the loop.",
      "Use document.write() for fastest DOM updates.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "DocumentFragment approach: const frag = document.createDocumentFragment(); items.forEach(item => { const li = createElement(item); frag.appendChild(li); }); list.appendChild(frag); One reflow vs N reflows. innerHTML works too and is acceptable in assignments, but DocumentFragment is the performant answer for interviews.",
  },
  {
    id: "rev-d18-04",
    question: "How do you implement a live search filter in vanilla JS that does NOT re-render the list on every keystroke?",
    options: [
      "Remove and re-create all list items on each input event.",
      "Render all items once. On the input event, iterate all existing list items and toggle visibility (style.display = 'none' or '') based on whether the item's text matches the search term.",
      "Fetch filtered data from the server on every keystroke.",
      "Use setTimeout to delay full re-renders.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Render once, filter by showing/hiding: const items = document.querySelectorAll('li'); input.addEventListener('input', () => { const q = input.value.toLowerCase(); items.forEach(li => { li.style.display = li.textContent.toLowerCase().includes(q) ? '' : 'none'; }); }); No DOM creation — just style changes. Fast and correct.",
  },
  {
    id: "rev-d18-05",
    question: "What clean code principle means 'a function should do one thing and do it well'?",
    options: [
      "DRY — Don't Repeat Yourself",
      "Single Responsibility Principle — functions/classes should have one clearly defined purpose. A function called fetchAndDisplayAndFilter() violates this; three separate functions fetchData(), renderList(), filterList() is correct.",
      "YAGNI — You Aren't Gonna Need It",
      "KISS — Keep It Simple Stupid",
    ],
    correctAnswerIndex: 1,
    explanation:
      "In a remote assignment, interviewers look for: small functions with clear names, separation of concerns (fetch logic separate from DOM logic), no 200-line functions, and meaningful naming. A function called 'handleClick' that does 40 things is a red flag.",
  },
  {
    id: "rev-d18-06",
    question: "What should a loading state look like in a fetch-based vanilla JS app?",
    options: [
      "A loading state is not necessary — users expect instant responses.",
      "Show a loading indicator (spinner, text) before the fetch, hide it on success or error. This prevents users from thinking the app is broken during network delay.",
      "Use a setTimeout of 5 seconds before showing data.",
      "Display a blank page while loading.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Pattern: show loading indicator → fetch → on success: hide indicator + show data → on error: hide indicator + show error message. Even a simple 'Loading...' text is better than nothing. Remote assignments that handle loading and error states stand out.",
  },
  {
    id: "rev-d18-07",
    question: "What is the purpose of separating data fetching from DOM rendering in a vanilla JS app?",
    options: [
      "It makes the app load faster.",
      "Separation of concerns: fetching logic can be tested and reused independently; rendering logic can be swapped without touching network code. It also makes the code easier to read, debug, and extend.",
      "JavaScript requires this separation to run.",
      "It is only necessary in large apps.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Example: async function getUsers() { return fetch(url).then(r => r.json()); } — pure data. function renderUsers(users) { ... } — pure DOM. function init() { getUsers().then(renderUsers); } — orchestration. Each function is testable and independently changeable. This pattern is what seniors look for in remote assignments.",
  },
  {
    id: "rev-d18-08",
    question: "What does 'debouncing a search input' mean in a remote assignment context?",
    options: [
      "Preventing the search input from accepting more than 10 characters.",
      "Delaying the search/filter function call until the user has stopped typing for a set time (e.g. 300ms), preventing excessive filtering or API calls on every single keystroke.",
      "Caching the search results for 5 minutes.",
      "Running the search on a separate thread.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Without debounce: 10 keystrokes = 10 filter calls (or API calls). With 300ms debounce: only 1 call fires after typing stops. Implementation: let timer; input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => filter(input.value), 300); }); Adding this to a remote assignment shows production-quality thinking.",
  },
  {
    id: "rev-d18-09",
    question: "How should you handle an empty search query in a live filter?",
    options: [
      "Hide all items when the query is empty.",
      "Show all items when the query is empty (or only whitespace) — checking if the trimmed value is empty string and resetting all items to visible.",
      "Display an 'empty search' error message.",
      "Reload the page when the input is cleared.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Edge case: if (query.trim() === '') { items.forEach(li => li.style.display = ''); return; } This prevents the filter from hiding everything when the user clears the input. Edge case handling is what separates a good remote assignment submission from an average one.",
  },
  {
    id: "rev-d18-10",
    question: "What HTTP methods correspond to CRUD operations in a REST API?",
    options: [
      "CREATE=DELETE, READ=PUT, UPDATE=POST, DELETE=GET",
      "Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE",
      "All CRUD operations use POST.",
      "Create=GET, Read=POST, Update=DELETE, Delete=PUT",
    ],
    correctAnswerIndex: 1,
    explanation:
      "REST CRUD mapping: POST (create new resource), GET (read/retrieve), PUT (replace entire resource), PATCH (partial update), DELETE (remove). RESTful APIs use these semantically — a GET should never modify data, a DELETE should remove. Knowing this correctly signals API literacy.",
  },
  {
    id: "rev-d18-11",
    question: "What is the purpose of a README in a remote assignment submission?",
    options: [
      "READMEs are optional and don't affect evaluation.",
      "The README explains: what the app does, how to run it locally, what tech was used, assumptions made, and known limitations. It shows professional communication and that you consider the reviewer's experience.",
      "The README is only for open source projects.",
      "A README is just a list of files in the project.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Remote assignment README should include: project description (1-2 sentences), setup steps (npm install, how to run), what features were implemented, any design decisions explained, and limitations or what you'd add with more time. A reviewer should be able to run the app in 2 minutes from your README.",
  },
  {
    id: "rev-d18-12",
    question: "What is XSS (Cross-Site Scripting) and how do you prevent it in DOM manipulation?",
    options: [
      "XSS is a performance issue caused by too many DOM updates.",
      "XSS is an attack where malicious scripts are injected into your app via user input. Prevent it by using textContent instead of innerHTML for user-provided data — textContent never parses HTML tags.",
      "XSS only affects server-side code.",
      "XSS is prevented by using HTTPS.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "If user input contains <script>alert('hacked')</script> and you set innerHTML, the script runs. textContent treats it as literal text — safe. Rule: never use innerHTML with untrusted data. Use textContent, createTextNode(), or a sanitization library. Mentioning this in a remote assignment is a strong security signal.",
  },
  {
    id: "rev-d18-13",
    question: "In a remote assignment, what is the best way to structure your JavaScript files?",
    options: [
      "Put all code in one giant script tag in the HTML file.",
      "Separate concerns into logical files or sections: api.js (fetch functions), render.js (DOM functions), utils.js (helpers like debounce), main.js (initialization). Or, in a single file, use clearly separated named functions with comments.",
      "One function per file always.",
      "Put all CSS, HTML, and JS in one file.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Even in a small assignment, organization matters. If using modules: api.js, render.js, utils.js, main.js. If using a single file: clear sections with comments // ─── DATA FETCHING ─── // ─── DOM RENDERING ───. Reviewers assess your sense of architecture, not just whether the feature works.",
  },
  {
    id: "rev-d18-14",
    question: "What does 'progressive enhancement' mean in frontend development?",
    options: [
      "Loading JavaScript progressively to reduce bundle size.",
      "Building a core experience that works for everyone (basic HTML/CSS), then layering JavaScript enhancements on top. If JS fails, the core functionality still works.",
      "Progressively adding more features after deployment.",
      "Using CSS animations to enhance the user experience.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Progressive enhancement: HTML works without CSS, CSS works without JS, JS enhances the experience. Contrast with graceful degradation (build for the best, degrade for limited environments). In practice: semantic HTML first, CSS second, JS for interactivity. Shows you think about accessibility and resilience.",
  },
  {
    id: "rev-d18-15",
    question: "How do you implement pagination for a large list of fetched items in a vanilla JS app?",
    options: [
      "Fetch all items at once and display all of them.",
      "Store all data in memory after one fetch; implement a currentPage variable; slice the array based on page number and items-per-page; render only the current slice; provide prev/next buttons that update currentPage and re-render.",
      "Make a new API call for each page change.",
      "Use infinite scroll only — pagination is outdated.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Client-side pagination: const ITEMS_PER_PAGE = 10; function getPage(data, page) { return data.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE); } Prev/Next buttons decrement/increment page and re-render. This is a common remote assignment requirement.",
  },
  {
    id: "rev-d18-16",
    question: "What does it mean for a fetch call to have a 'race condition' and how do you prevent it?",
    options: [
      "Race conditions only happen in multi-threaded languages, not JavaScript.",
      "If a user types quickly, multiple fetches fire; an older slow response can arrive AFTER a newer fast one, displaying stale results. Prevent with debounce, or track a request ID and ignore responses that don't match the latest.",
      "Race conditions in fetch are caused by incorrect JSON parsing.",
      "Use setTimeout to space out fetch calls.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Stale data race: type 'r' (fires fetch A), type 'react' (fires fetch B). If fetch A resolves after B, you display results for 'r' after 'react'. Fix: let currentSearch = ''; before fetch, store the term; after fetch resolves, only render if term === currentSearch. Or use debounce to prevent excessive requests.",
  },
  {
    id: "rev-d18-17",
    question: "What is the difference between innerHTML, textContent, and innerText?",
    options: [
      "They are all identical.",
      "innerHTML parses and renders HTML (XSS risk with user data); textContent gets/sets plain text content, ignoring HTML tags (safest); innerText is like textContent but respects CSS styling (e.g. hides text from display:none elements).",
      "textContent is only for input elements.",
      "innerHTML is for reading; textContent is for writing.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Use innerHTML when you control the content and need HTML rendered. Use textContent for user-provided data (XSS safe). innerText triggers a reflow (reads CSS) so it's slower. In practice: textContent is your default choice for setting text from dynamic data.",
  },
  {
    id: "rev-d18-18",
    question: "How should you handle multiple concurrent API calls in a remote assignment (e.g. load users AND posts simultaneously)?",
    options: [
      "Use await in sequence: await getUsers(); await getPosts();",
      "Use Promise.all([getUsers(), getPosts()]) to fire both requests concurrently and wait for both to complete — faster than sequential awaits which are unnecessarily serialized.",
      "Use setTimeout to stagger the calls.",
      "Make only one call and combine the data server-side.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Sequential awaits total time = time(A) + time(B). Promise.all total time = max(time(A), time(B)) — both run in parallel. const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]); If either rejects, Promise.all rejects. Use Promise.allSettled if you need both results regardless of failure.",
  },
  {
    id: "rev-d18-19",
    question: "What does a well-structured async init function look like for a remote assignment app?",
    options: [
      "Put all logic directly in window.onload with no functions.",
      "A clean init() function: show loading → fetch data with error handling → hide loading → render data → attach event listeners (search, filter, pagination). Each step is a named function call. Called once on DOMContentLoaded.",
      "Put fetch calls directly in event listeners.",
      "Use setInterval to check if data is available.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Example pattern: async function init() { showLoading(); try { const data = await fetchUsers(); renderUsers(data); attachSearchListener(data); } catch (e) { showError(e.message); } finally { hideLoading(); } } document.addEventListener('DOMContentLoaded', init); Clean, readable, testable.",
  },
  {
    id: "rev-d18-20",
    question: "What is the most important thing to verify before submitting a remote assignment?",
    options: [
      "That the CSS looks perfect on every screen size.",
      "That the app works end-to-end: run it in a fresh browser tab (no cached state), test all stated requirements, check edge cases (empty search, network error), verify the README instructions work from scratch, and ensure no console errors remain.",
      "That the code has at least 500 lines.",
      "That you used the latest version of every library.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Pre-submission checklist: fresh browser test, test each feature from requirements, test edge cases, open browser console (no errors/warnings), follow your own README to set it up (as if you're the reviewer), check all links and buttons work, and read the code once for obvious cleanup.",
  },
];

const day18_coding: CodingQuestion[] = [
  {
    id: "code-d18-01",
    title: "Build a User Directory App (Fetch + Filter + Display)",
    difficulty: "Medium",
    description:
      "Simulate a remote assignment. Build a complete vanilla JavaScript user directory:\n1. On page load, fetch all users from https://jsonplaceholder.typicode.com/users\n2. Display each user as a card showing: name, email, phone, and company name\n3. Add a live search input that filters cards by name or email (case-insensitive)\n4. Add a loading state while fetching\n5. Handle fetch errors gracefully with a user-facing error message\n6. Implement all in clean, separated functions",
    examples: [
      {
        input: "Page loads",
        output: "Loading spinner shown → 10 user cards render → search input is active",
      },
      {
        input: "User types 'le' in search",
        output: "Only cards whose name or email contains 'le' (case-insensitive) remain visible",
      },
      {
        input: "Network fails",
        output: "Error message: 'Failed to load users. Please try again.'",
      },
    ],
    constraints: [
      "Separate functions: fetchUsers(), renderUsers(users), filterUsers(users, query), showError(message), showLoading(bool).",
      "Use textContent for user data (not innerHTML) — XSS safety.",
      "Use the 'input' event for search (not 'keyup').",
      "Filter by hiding/showing cards (not re-rendering).",
      "Use DocumentFragment for batch DOM insertion.",
    ],
    hint: "Structure: async function init() { showLoading(true); try { const users = await fetchUsers(); renderUsers(users); attachSearch(users); } catch(e) { showError(e.message); } finally { showLoading(false); } } document.addEventListener('DOMContentLoaded', init);",
  },
  {
    id: "code-d18-02",
    title: "Implement Throttle from Scratch",
    difficulty: "Medium",
    description:
      "Implement a throttle(fn, limit) function. The returned function should execute fn at most once per limit milliseconds. Unlike debounce (which waits for silence), throttle executes immediately on the first call and then ignores subsequent calls until the time window passes.",
    examples: [
      {
        input:
          "const log = throttle((x) => console.log(x), 1000);\nlog('a'); // t=0ms — executes\nlog('b'); // t=200ms — ignored\nlog('c'); // t=400ms — ignored\n// t=1000ms window passes\nlog('d'); // t=1100ms — executes",
        output: "// Prints: 'a' then 'd'",
      },
      {
        input: "const scroll = throttle(updateUI, 100);\n// Called 50 times in 1 second",
        output: "// updateUI runs at most 10 times (once every 100ms)",
      },
    ],
    constraints: [
      "Use a flag (isThrottled) not clearTimeout/setTimeout like debounce.",
      "The first call must execute immediately.",
      "Must pass all arguments through to fn.",
      "Must preserve 'this' context.",
    ],
    hint: "function throttle(fn, limit) { let isThrottled = false; return function(...args) { if (!isThrottled) { fn.apply(this, args); isThrottled = true; setTimeout(() => { isThrottled = false; }, limit); } }; }",
  },
];

// =============================================================================
// ─── Assembled Daily Revision Sets ───────────────────────────────────────────
// =============================================================================
export const dailyRevisionSetsWeek3: DailyRevisionSet[] = [
  {
    dayNum: 14,
    topic: "Week 2 Review · Sliding Window · Hash Maps · Stacks · Linked Lists",
    mcqs: day14_mcqs,
    codingQuestions: day14_coding,
  },
  {
    dayNum: 15,
    topic: "JS Theory Deep Dive · Closures · Event Loop · this · Promises · Prototypes",
    mcqs: day15_mcqs,
    codingQuestions: day15_coding,
  },
  {
    dayNum: 16,
    topic: "GitHub Polish · Graph Algorithms · BFS/DFS · Number of Islands · Course Schedule",
    mcqs: day16_mcqs,
    codingQuestions: day16_coding,
  },
  {
    dayNum: 17,
    topic: "Mock Interview Day · HR Prep · STAR Method · Live Coding Mindset",
    mcqs: day17_mcqs,
    codingQuestions: day17_coding,
  },
  {
    dayNum: 18,
    topic: "Remote Assignment Prep · Fetch API · Filter/Search UI · Clean Code Patterns",
    mcqs: day18_mcqs,
    codingQuestions: day18_coding,
  },
];

export {
  day14_mcqs, day14_coding,
  day15_mcqs, day15_coding,
  day16_mcqs, day16_coding,
  day17_mcqs, day17_coding,
  day18_mcqs, day18_coding,
};