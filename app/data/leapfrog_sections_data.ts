/**
 * leapfrog_sections_data.ts
 *
 * Five Leapfrog-specific InterviewSection objects, each populated with:
 *   - questions  (flashcard Q&A, drawn from real candidate reports)
 *   - mcqs       (20 per section)
 *
 * Sections
 *   leapfrog_coding   — Written Coding Exam prep
 *   leapfrog_virtual  — Virtual / 1st-round Interview prep
 *   leapfrog_onsite   — On-Site Technical Interview prep
 *   leapfrog_hr       — HR & Behavioural Interview prep
 *   leapfrog_remote   — Remote Assignment Samples (NEW)
 */

import type { InterviewSection } from "../../types";

// ─────────────────────────────────────────────────────────────────────────────
// 1. CODING EXAM PREP
// ─────────────────────────────────────────────────────────────────────────────
export const leapfrog_coding: InterviewSection = {
  id: 17,
  slug: "leapfrog-coding",
  title: "Coding Exam Prep",
  subtitle: "Arrays · Strings · HashMap · Stack · Two-Pointer · Complexity",
  color: "#3b82f6",
  questions: [
    {
      id: "lfc-q01",
      q: "Find the second largest element in an array (no sorting).",
      hint: "Track two variables: largest and secondLargest.",
      answer: `Iterate once. Keep two variables: \`largest\` and \`secondLargest\` (both -Infinity to start).
For each number:
  • If num > largest  → secondLargest = largest, largest = num
  • Else if num > secondLargest && num !== largest → secondLargest = num
Return secondLargest.

Time: O(n)  Space: O(1)`,
      code: `function secondLargest(arr) {
  let largest = -Infinity;
  let second  = -Infinity;
  for (const num of arr) {
    if (num > largest) {
      second  = largest;
      largest = num;
    } else if (num > second && num !== largest) {
      second = num;
    }
  }
  return second === -Infinity ? null : second;
}

console.log(secondLargest([3, 1, 4, 1, 5, 9, 2])); // 5`,
    },
    {
      id: "lfc-q02",
      q: "Remove duplicates from an unsorted array without extra DS (in-place).",
      hint: "Use a Set for O(n), or nested loops for O(n²) in-place.",
      answer: `Two common approaches:

1. Set approach (O(n) time, O(n) space):
   Return [...new Set(arr)]

2. In-place with index tracking (O(n²) no extra space):
   Walk with a 'write' pointer. For each element check if it already appears
   in arr[0..writeIdx-1]. If not, write it.

The Set approach is almost always preferred in interviews unless the constraint specifically says "no extra space".`,
      code: `// Approach 1 — clean, O(n)
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// Approach 2 — in-place O(n²)
function removeDuplicatesInPlace(arr) {
  let write = 0;
  for (let i = 0; i < arr.length; i++) {
    let found = false;
    for (let j = 0; j < write; j++) {
      if (arr[j] === arr[i]) { found = true; break; }
    }
    if (!found) arr[write++] = arr[i];
  }
  return arr.slice(0, write);
}`,
    },
    {
      id: "lfc-q03",
      q: "Implement Valid Parentheses (Balanced Brackets).",
      hint: "Push open brackets onto a stack; pop and match for every closing bracket.",
      answer: `Use a stack.
• For '(' '{' '[' → push onto stack.
• For ')' '}' ']' → if stack is empty or top doesn't match, return false.
• After full traversal, stack must be empty.

Time: O(n)  Space: O(n)`,
      code: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if ('([{'.includes(ch)) {
      stack.push(ch);
    } else {
      if (stack.pop() !== map[ch]) return false;
    }
  }
  return stack.length === 0;
}

console.log(isValid("()[]{}")); // true
console.log(isValid("(]"));     // false`,
    },
    {
      id: "lfc-q04",
      q: "Find the Longest Common Prefix of an array of strings.",
      hint: "Sort and compare only the first and last strings.",
      answer: `Sort the array lexicographically. The common prefix of the whole array
equals the common prefix of just the first and last string (after sorting).

Compare character by character until they diverge.

Time: O(n log n + m)  where m = length of shortest string.`,
      code: `function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  strs.sort();
  const first = strs[0];
  const last  = strs[strs.length - 1];
  let i = 0;
  while (i < first.length && first[i] === last[i]) i++;
  return first.slice(0, i);
}

console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"]));    // ""`,
    },
    {
      id: "lfc-q05",
      q: "Two Sum — return indices of the two numbers that add up to target.",
      hint: "HashMap: store value → index. For each element, look up complement.",
      answer: `As you iterate, store each value and its index in a Map.
For each num, check if (target - num) already exists in the map.
If yes → return [map.get(complement), currentIndex].
If no  → store num → index.

Time: O(n)  Space: O(n)`,
      code: `function twoSum(nums, target) {
  const seen = new Map(); // value → index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`,
    },
    {
      id: "lfc-q06",
      q: "Frequency Counter — find the most frequent element in an array.",
      hint: "Build a frequency map, then find the max.",
      answer: `One pass to build a frequency map (object / Map).
Second pass over the map to find the key with highest count.

Time: O(n)  Space: O(k) where k = unique elements.`,
      code: `function mostFrequent(arr) {
  const freq = {};
  for (const el of arr) freq[el] = (freq[el] || 0) + 1;
  let maxEl = null, maxCount = 0;
  for (const [el, count] of Object.entries(freq)) {
    if (count > maxCount) { maxCount = count; maxEl = el; }
  }
  return maxEl;
}

console.log(mostFrequent([1, 3, 2, 1, 4, 1, 3])); // 1`,
    },
    {
      id: "lfc-q07",
      q: "Reverse a string in-place (or as a new string in JS).",
      hint: "Two-pointer swap from both ends, or use built-ins for JS.",
      answer: `In JS strings are immutable, so you convert to array first.

Two-pointer approach (O(n) time, O(n) space for the array):
  Convert to array, left/right pointers swap toward the centre.

Or simply: str.split('').reverse().join('')

Always mention the O(n) time and O(n) space (new array).`,
      code: `// One-liner
const reverseStr = s => s.split('').reverse().join('');

// Two-pointer (shows understanding)
function reverseInPlace(s) {
  const arr = s.split('');
  let l = 0, r = arr.length - 1;
  while (l < r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++; r--;
  }
  return arr.join('');
}

console.log(reverseStr("hello")); // "olleh"`,
    },
    {
      id: "lfc-q08",
      q: "Check if a string is a palindrome (ignore case and non-alphanumeric chars).",
      hint: "Clean the string first, then two-pointer comparison.",
      answer: `1. Lowercase and remove non-alphanumeric characters.
2. Two-pointer: compare chars from both ends moving inward.
3. If any mismatch → false. If pointers cross → true.

Time: O(n)  Space: O(n) for cleaned string (O(1) if you skip in the original).`,
      code: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let l = 0, r = clean.length - 1;
  while (l < r) {
    if (clean[l] !== clean[r]) return false;
    l++; r--;
  }
  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false`,
    },
    {
      id: "lfc-q09",
      q: "Sliding Window — Longest Substring Without Repeating Characters.",
      hint: "Expand the window right; when duplicate found, shrink from the left.",
      answer: `Use a Set to track characters in the current window.
Two pointers: left and right.
Expand right. If s[right] is already in the Set → remove s[left] and advance left.
Track max window size throughout.

Time: O(n)  Space: O(min(n,k)) where k = charset size.`,
      code: `function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0, max = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left++]);
    }
    seen.add(s[right]);
    max = Math.max(max, right - left + 1);
  }
  return max;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("pwwkew"));   // 3`,
    },
    {
      id: "lfc-q10",
      q: "Two-Pointer — Remove duplicates from a SORTED array in-place, return new length.",
      hint: "Keep a slow pointer that only advances when a new unique value is found.",
      answer: `Because the array is sorted, duplicates are adjacent.
Use a slow pointer (write) starting at 1.
Fast pointer (i) scans from 1 onward.
When nums[i] !== nums[i-1] → nums[write++] = nums[i].
Return write.

Time: O(n)  Space: O(1)`,
      code: `function removeDuplicatesSorted(nums) {
  if (!nums.length) return 0;
  let write = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[write++] = nums[i];
    }
  }
  return write;
}

const arr = [0,0,1,1,1,2,2,3,3,4];
console.log(removeDuplicatesSorted(arr)); // 5  arr becomes [0,1,2,3,4,...]`,
    },
    {
      id: "lfc-q11",
      q: "What is the time complexity of: a nested loop where the inner loop runs from i to n for each i?",
      hint: "Count total iterations: n + (n-1) + ... + 1.",
      answer: `Total iterations = n + (n-1) + (n-2) + ... + 1 = n(n+1)/2.

Drop constants and lower-order terms → O(n²).

This pattern appears in Bubble Sort, Selection Sort, and many brute-force nested-loop problems. Always flag it and suggest if a HashMap/Set could reduce it to O(n).`,
    },
    {
      id: "lfc-q12",
      q: "Explain Big-O notation. What are the most common complexities in order?",
      hint: "From fastest to slowest: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).",
      answer: `Big-O describes the worst-case growth rate of an algorithm as input size n grows.

Common complexities (best → worst):
  O(1)       — Constant: array index access, HashMap lookup
  O(log n)   — Logarithmic: Binary Search
  O(n)       — Linear: single loop
  O(n log n) — Linearithmic: Merge Sort, built-in sort
  O(n²)      — Quadratic: nested loops
  O(2ⁿ)      — Exponential: naive recursion (subsets)

When answering in an interview:
1. State the complexity.
2. Explain WHY (what causes each loop/recursion).
3. Mention if you could do better.`,
    },
  ],
  mcqs: [
    {
      id: "mcq-lfc-01",
      question: "What is the time complexity of finding an element in an unsorted array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswerIndex: 2,
      explanation: "Without sorting or a hash structure, you must scan every element in the worst case → O(n) linear search.",
    },
    {
      id: "mcq-lfc-02",
      question: "Which data structure makes the Two Sum problem solvable in O(n)?",
      options: ["Stack", "Queue", "HashMap / Set", "Sorted Array"],
      correctAnswerIndex: 2,
      explanation: "A HashMap stores each number's index as you iterate. For every element you check if (target - num) exists in O(1), giving an overall O(n) solution.",
    },
    {
      id: "mcq-lfc-03",
      question: "You need to track character frequencies in a string. Which JavaScript structure is most appropriate?",
      options: ["Array", "Set", "Map / plain object", "Linked List"],
      correctAnswerIndex: 2,
      explanation: "A Map (or plain object) maps each character to its count in O(1) per operation — perfect for frequency counters.",
    },
    {
      id: "mcq-lfc-04",
      question: "Valid Parentheses: what happens when the stack is empty and you encounter a closing bracket?",
      options: ["Push the closing bracket", "Return true", "Return false — unmatched closing bracket", "Skip the character"],
      correctAnswerIndex: 2,
      explanation: "An empty stack means there is no matching open bracket to pair with the closing one, so the string is immediately invalid.",
    },
    {
      id: "mcq-lfc-05",
      question: "What is the space complexity of the sliding-window substring algorithm (using a Set)?",
      options: ["O(1)", "O(n)", "O(min(n, charset_size))", "O(n²)"],
      correctAnswerIndex: 2,
      explanation: "The Set holds at most one copy of each character in the current window, bounded by both the window length n and the total character set size.",
    },
    {
      id: "mcq-lfc-06",
      question: "Longest Common Prefix: sorting the array then comparing first vs last string is O(___)?",
      options: ["O(n)", "O(n log n + m)", "O(n·m)", "O(m) where m = shortest string length"],
      correctAnswerIndex: 1,
      explanation: "Sorting n strings costs O(n log n). The final character-by-character comparison of the two extreme strings costs O(m). Combined: O(n log n + m).",
    },
    {
      id: "mcq-lfc-07",
      question: "Which approach finds the second-largest element in ONE pass?",
      options: [
        "Sort descending, return index 1",
        "Use a min-heap of size 2",
        "Track two variables: largest and secondLargest",
        "Use a nested loop comparing every pair",
      ],
      correctAnswerIndex: 2,
      explanation: "Maintaining two variables (largest and secondLargest) updated in a single O(n) pass is both optimal in time (O(n)) and space (O(1)).",
    },
    {
      id: "mcq-lfc-08",
      question: "Two-pointer technique is most naturally applied to which type of array?",
      options: ["Unsorted array", "Sorted array", "Array with only positive numbers", "Array with unique elements"],
      correctAnswerIndex: 1,
      explanation: "Two pointers converge from both ends or advance together and rely on sorted order to decide which pointer to move — making sorted arrays the natural fit.",
    },
    {
      id: "mcq-lfc-09",
      question: "What does `[...new Set(arr)]` achieve in JavaScript?",
      options: [
        "Sorts the array",
        "Removes duplicates, preserving insertion order",
        "Flattens a nested array",
        "Reverses the array",
      ],
      correctAnswerIndex: 1,
      explanation: "Spreading a Set into an array is the idiomatic JS one-liner for deduplication. Set maintains insertion order and ignores duplicates automatically.",
    },
    {
      id: "mcq-lfc-10",
      question: "A brute-force solution uses two nested loops each from 0 to n. Its complexity is?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
      correctAnswerIndex: 2,
      explanation: "Two independent loops each iterating n times multiplies to n × n = n² total operations → O(n²).",
    },
    {
      id: "mcq-lfc-11",
      question: "In the sliding-window pattern, what triggers shrinking the window from the left?",
      options: [
        "The window reaches size n",
        "A constraint is violated (e.g. duplicate character found)",
        "The right pointer reaches the end",
        "The sum exceeds target",
      ],
      correctAnswerIndex: 1,
      explanation: "The window expands greedily to the right. When a constraint is broken (e.g. a repeated character), the left boundary advances until the constraint is satisfied again.",
    },
    {
      id: "mcq-lfc-12",
      question: "Which sorting algorithm runs in O(n log n) guaranteed (worst case)?",
      options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
      correctAnswerIndex: 2,
      explanation: "Merge Sort divides the array in half recursively (log n levels) and merges in O(n) per level → O(n log n) in all cases. Quick Sort degrades to O(n²) in the worst case.",
    },
    {
      id: "mcq-lfc-13",
      question: "You must check if a large string S contains all characters of pattern P. Best approach?",
      options: [
        "Nested loop O(|S|·|P|)",
        "Frequency map of P, slide window over S — O(|S|)",
        "Sort both strings and compare",
        "Recursive backtracking",
      ],
      correctAnswerIndex: 1,
      explanation: "Build a frequency map of P, then use a sliding window of size |P| over S, adjusting counts as the window moves. This achieves O(|S|) time.",
    },
    {
      id: "mcq-lfc-14",
      question: "What is the space complexity of in-place two-pointer on a sorted array?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctAnswerIndex: 2,
      explanation: "In-place two-pointer only uses a constant number of additional variables (left, right, possibly a result variable) regardless of input size → O(1) extra space.",
    },
    {
      id: "mcq-lfc-15",
      question: "Binary Search requires the array to be ___.",
      options: ["Unsorted", "Sorted", "Unique", "Non-negative"],
      correctAnswerIndex: 1,
      explanation: "Binary Search works by comparing the target to the middle element and discarding half the search space. This only works correctly when the array is sorted.",
    },
    {
      id: "mcq-lfc-16",
      question: "What is the time complexity of accessing an element by index in a JavaScript array?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctAnswerIndex: 2,
      explanation: "Arrays in JavaScript are backed by contiguous-like memory (or an optimized internal structure). Index access is a constant-time O(1) operation.",
    },
    {
      id: "mcq-lfc-17",
      question: "Which of these is the MOST efficient way to check for a palindrome string?",
      options: [
        "Reverse it and compare — O(n) time O(n) space",
        "Two-pointer from both ends — O(n) time O(1) space",
        "Nested loop comparing every pair — O(n²)",
        "Sort the characters — O(n log n)",
      ],
      correctAnswerIndex: 1,
      explanation: "Two-pointer from both ends is optimal: O(n) time and O(1) space (no extra string created). It's the answer interviewers want to hear.",
    },
    {
      id: "mcq-lfc-18",
      question: "When the interviewer asks 'can you do better?', they usually mean:",
      options: [
        "Make the code shorter",
        "Reduce time or space complexity",
        "Add more comments",
        "Use a newer ES6 syntax",
      ],
      correctAnswerIndex: 1,
      explanation: "'Can you do better?' in a coding interview context almost always means 'can you reduce the time or space complexity?'. Think about what data structure or algorithm pattern could improve it.",
    },
    {
      id: "mcq-lfc-19",
      question: "What does a Stack's LIFO property mean for Valid Parentheses?",
      options: [
        "The first bracket pushed is matched first",
        "The most recently opened bracket must be closed first",
        "All brackets are checked simultaneously",
        "Brackets are sorted before matching",
      ],
      correctAnswerIndex: 1,
      explanation: "LIFO (Last In First Out) ensures the most recently opened bracket is at the top of the stack — which is exactly the innermost bracket and must be closed before outer brackets.",
    },
    {
      id: "mcq-lfc-20",
      question: "What is the best strategy when you're stuck on a coding exam problem?",
      options: [
        "Skip it immediately",
        "Write comments describing your approach even if you can't finish the code",
        "Guess and submit",
        "Rewrite the problem statement",
      ],
      correctAnswerIndex: 1,
      explanation: "Leapfrog interviewers review your thought process. Writing pseudocode or comments that explain your approach demonstrates problem-solving ability even if implementation is incomplete — it earns partial credit.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. VIRTUAL INTERVIEW PREP
// ─────────────────────────────────────────────────────────────────────────────
export const leapfrog_virtual: InterviewSection = {
  id: 18,
  slug: "leapfrog-virtual",
  title: "Virtual Interview Prep",
  subtitle: "JS Theory · Project Walkthrough · Communication",
  color: "#3b82f6",
  questions: [
    {
      id: "lfv-q01",
      q: "Explain the `this` keyword in JavaScript. How does it behave in arrow functions vs regular functions?",
      hint: "this is determined at call time for regular functions, at definition time for arrow functions.",
      answer: `\`this\` refers to the execution context — the object that is calling the function.

Regular functions:
  \`this\` is set dynamically when the function is called.
  • Called as obj.method() → this = obj
  • Called as standalone fn() → this = undefined (strict) or window (non-strict)
  • Called with new → this = the newly created object

Arrow functions:
  \`this\` is lexically bound — it inherits \`this\` from the enclosing scope at DEFINITION time.
  It can never be rebound with .call(), .apply(), or .bind().
  This makes arrow functions ideal for callbacks inside class methods.

Interview signal: draw the contrast clearly, give a one-liner example of each.`,
      code: `const obj = {
  name: "Leapfrog",
  regularFn: function() { console.log(this.name); }, // "Leapfrog"
  arrowFn:   () => { console.log(this);         },   // outer 'this' (window/undefined)
};
obj.regularFn(); // ✓ Leapfrog
obj.arrowFn();   // ✗ undefined — arrow captures outer this`,
    },
    {
      id: "lfv-q02",
      q: "What is callback hell? How do Promises and async/await solve it?",
      hint: "Callback hell = deeply nested callbacks (pyramid of doom). Promises flatten the chain.",
      answer: `Callback hell occurs when you nest callbacks within callbacks to handle sequential async operations. The code becomes an indented 'pyramid of doom' — hard to read, debug, and maintain.

Promises solve this by chaining .then() calls, making the flow linear.

async/await goes further — it lets you write async code that looks synchronous. Under the hood it's still Promises.

Three key improvements async/await brings:
  1. Linear, top-to-bottom reading
  2. try/catch for error handling (same as synchronous code)
  3. Easy to use inside loops (for...of with await works; .forEach does not)`,
      code: `// Callback hell
getUser(id, (user) => {
  getPosts(user, (posts) => {
    getComments(posts[0], (comments) => { /*...*/ });
  });
});

// Promises — linear chain
getUser(id)
  .then(user  => getPosts(user))
  .then(posts => getComments(posts[0]))
  .catch(err  => console.error(err));

// async/await — reads like sync code
async function loadData(id) {
  try {
    const user     = await getUser(id);
    const posts    = await getPosts(user);
    const comments = await getComments(posts[0]);
    return comments;
  } catch (err) {
    console.error(err);
  }
}`,
    },
    {
      id: "lfv-q03",
      q: "Explain the JavaScript Event Loop. What is the difference between the microtask queue and the macrotask queue?",
      hint: "Call Stack → Microtasks (Promises) → ONE Macrotask (setTimeout) → repeat.",
      answer: `The Event Loop coordinates execution between the call stack and the task queues.

Call Stack: runs synchronous code.
Microtask Queue: Promises (.then), queueMicrotask(), MutationObserver.
Macrotask Queue: setTimeout, setInterval, I/O, UI events.

Order of execution in each loop tick:
  1. Run all synchronous code (empty the call stack).
  2. Drain the ENTIRE microtask queue (run every pending Promise callback).
  3. Pick ONE macrotask (e.g. one setTimeout callback) and execute it.
  4. Drain the microtask queue again.
  5. Repeat.

Practical consequence: Promise.resolve().then(fn) always runs before setTimeout(fn, 0).`,
      code: `console.log("1 sync");

setTimeout(() => console.log("3 setTimeout"), 0);   // macrotask

Promise.resolve()
  .then(() => console.log("2 microtask"));           // microtask

console.log("1 sync end");

// Output order:
// 1 sync
// 1 sync end
// 2 microtask
// 3 setTimeout`,
    },
    {
      id: "lfv-q04",
      q: "What is an IIFE? Why would you use one?",
      hint: "Immediately Invoked Function Expression — creates a private scope instantly.",
      answer: `An IIFE (Immediately Invoked Function Expression) is a function that is declared and called in the same statement.

Syntax: (function() { ... })()  or  (() => { ... })()

Why use it?
  1. Scope isolation — variables inside don't pollute the outer/global scope.
  2. Module pattern (pre-ES6) — used to create private state before classes/modules existed.
  3. Avoid variable conflicts in scripts that share a global scope.

In modern code (ES6+) you'd use let/const scoped inside a block, or an actual module. But IIFEs still appear in legacy codebases and interview questions.`,
      code: `// Classic IIFE
(function() {
  const secret = "only visible here";
  console.log(secret); // works fine
})();

console.log(typeof secret); // "undefined" — not in outer scope

// Arrow IIFE
const result = (() => {
  const x = 10, y = 20;
  return x + y;
})();
console.log(result); // 30`,
    },
    {
      id: "lfv-q05",
      q: "Explain `let` vs `var` vs `const`. What is the Temporal Dead Zone?",
      hint: "Scope (function vs block), hoisting, reassignability, TDZ.",
      answer: `var:
  • Function-scoped (or global if outside any function).
  • Hoisted to the top of its function and initialized to undefined.
  • Can be re-declared and reassigned.
  • Cause of many bugs — avoid in modern code.

let:
  • Block-scoped ({ }).
  • Hoisted but NOT initialized → accessing before declaration throws ReferenceError.
  • Can be reassigned, cannot be re-declared in the same scope.

const:
  • Block-scoped.
  • Must be initialized at declaration.
  • Cannot be reassigned (the binding is constant, not the value — objects/arrays can be mutated).

Temporal Dead Zone (TDZ):
  The period between entering a block and the let/const declaration being executed.
  Accessing the variable in this period → ReferenceError.`,
      code: `// var hoisting (no TDZ)
console.log(x); // undefined — var hoisted
var x = 5;

// let TDZ
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// const immutable binding
const obj = { a: 1 };
obj.a = 2;     // ✓ mutation allowed
obj = {};      // ✗ TypeError: Assignment to constant variable`,
    },
    {
      id: "lfv-q06",
      q: "How would you walk an interviewer through a project from your GitHub?",
      hint: "Problem → Tech choices → Architecture → Challenges → Lessons learned.",
      answer: `Structure your project walkthrough in 5 parts (90 seconds max):

1. PROBLEM — What does it solve? One sentence.
   "It's a task manager that lets teams track project progress in real time."

2. TECH STACK — What and why?
   "React for the UI because of component reusability, Node + Express for the API, PostgreSQL for relational data."

3. ARCHITECTURE — How is it structured?
   "Client → REST API → Database. I separated concerns into controllers, services, and a data layer."

4. HARDEST CHALLENGE — Pick one real technical hurdle.
   "The toughest part was handling optimistic UI updates — I had to roll back state if the API call failed."

5. LESSONS LEARNED — What would you do differently?
   "I'd add integration tests earlier. I learned the cost of retrofitting them later."

Leapfrog interviewers have reviewed your repos beforehand — be ready to explain every file and every decision.`,
    },
    {
      id: "lfv-q07",
      q: "Explain call(), apply(), and bind() in JavaScript.",
      hint: "All three set `this` explicitly. Difference is in how arguments are passed and when the function runs.",
      answer: `All three let you control what \`this\` refers to inside a function.

call(thisArg, arg1, arg2, ...):
  Invokes the function immediately.
  Arguments passed individually.

apply(thisArg, [arg1, arg2, ...]):
  Invokes the function immediately.
  Arguments passed as an array.

bind(thisArg, arg1, ...):
  Does NOT call the function.
  Returns a NEW function with \`this\` permanently bound.
  Arguments can be partially applied (currying).

Memory trick: Call = Comma, Apply = Array.`,
      code: `function greet(greeting, punctuation) {
  return \`\${greeting}, \${this.name}\${punctuation}\`;
}
const user = { name: "Anish" };

console.log(greet.call(user,  "Hello", "!"));   // Hello, Anish!
console.log(greet.apply(user, ["Hi",   "?"]));  // Hi, Anish?

const boundGreet = greet.bind(user, "Hey");
console.log(boundGreet(".")); // Hey, Anish.`,
    },
    {
      id: "lfv-q08",
      q: "What is prototype-based inheritance in JavaScript? How does it differ from classical (class-based) inheritance?",
      hint: "JS objects have a [[Prototype]] chain. Classes in JS are syntactic sugar over prototypes.",
      answer: `In JavaScript every object has a hidden [[Prototype]] link to another object (or null).
When you access a property, JS walks the chain until it finds it or reaches null.

Classical OOP (Java/C++):
  Classes are blueprints. Instances are copies of the blueprint.

JavaScript prototypal:
  Objects inherit directly from other objects. No copies — the chain is live.

ES6 \`class\` syntax is syntactic sugar — under the hood it still uses prototype chains.
  • class Foo {} creates a constructor function.
  • extends sets up the prototype chain.
  • super() calls the parent constructor.

Key interview point: typeof Dog === 'function' even when defined with class syntax.`,
      code: `// Pre-ES6 (prototype manually)
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return this.name + " makes a sound."; };

// ES6 class (same thing, nicer syntax)
class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound.\`; }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks.\`; }
}
console.log(new Dog("Rex").speak()); // Rex barks.`,
    },
  ],
  mcqs: [
    {
      id: "mcq-lfv-01",
      question: "What does `this` refer to inside an arrow function defined as a class method callback?",
      options: [
        "The global object (window)",
        "undefined",
        "The class instance — it inherits `this` from the enclosing method",
        "The arrow function itself",
      ],
      correctAnswerIndex: 2,
      explanation: "Arrow functions capture `this` lexically from their enclosing scope at definition time. Defined inside a class method, they inherit the instance as `this` — which is why they're preferred for event handler callbacks.",
    },
    {
      id: "mcq-lfv-02",
      question: "Which queue is drained FIRST after the call stack empties?",
      options: ["Macrotask queue (setTimeout)", "Microtask queue (Promises)", "I/O queue", "Animation frame queue"],
      correctAnswerIndex: 1,
      explanation: "After synchronous code completes, the event loop drains the entire microtask queue before picking even one macrotask. This is why Promise callbacks always run before setTimeout callbacks.",
    },
    {
      id: "mcq-lfv-03",
      question: "What error is thrown when you access a `let` variable before its declaration?",
      options: ["TypeError", "SyntaxError", "ReferenceError", "undefined is returned"],
      correctAnswerIndex: 2,
      explanation: "Accessing a let (or const) variable in its Temporal Dead Zone throws a ReferenceError: 'Cannot access variable before initialization'. var would return undefined instead.",
    },
    {
      id: "mcq-lfv-04",
      question: "What does `.bind()` return?",
      options: [
        "The result of calling the function immediately",
        "A new function with `this` permanently bound",
        "A Promise",
        "A reference to the original function",
      ],
      correctAnswerIndex: 1,
      explanation: "bind() does not invoke the function. It returns a NEW function object where `this` is permanently set to the provided argument, regardless of how the new function is later called.",
    },
    {
      id: "mcq-lfv-05",
      question: "Which of the following correctly describes `async/await`?",
      options: [
        "A new async runtime that replaces the event loop",
        "Syntactic sugar over Promises that lets async code look synchronous",
        "A way to run code in parallel threads",
        "A replacement for try/catch blocks",
      ],
      correctAnswerIndex: 1,
      explanation: "async/await is syntactic sugar over Promises. An async function returns a Promise, and await pauses execution within that function until the awaited Promise resolves. The event loop is unchanged.",
    },
    {
      id: "mcq-lfv-06",
      question: "What is the key problem that IIFE (Immediately Invoked Function Expression) solves?",
      options: [
        "Eliminates the need for async code",
        "Prevents variable name collisions by creating a private scope",
        "Makes functions run faster",
        "Allows functions to return multiple values",
      ],
      correctAnswerIndex: 1,
      explanation: "IIFEs wrap code in a function scope that executes immediately, keeping all inner variables private and preventing them from polluting the global or outer scope.",
    },
    {
      id: "mcq-lfv-07",
      question: "What is `Promise.all()` used for?",
      options: [
        "Run promises sequentially one after another",
        "Run multiple promises concurrently and wait for ALL to resolve",
        "Return the first promise that resolves",
        "Catch errors from all promises",
      ],
      correctAnswerIndex: 1,
      explanation: "Promise.all([p1, p2, p3]) runs all promises concurrently and returns a single Promise that resolves when ALL input promises resolve. It rejects immediately if ANY promise rejects.",
    },
    {
      id: "mcq-lfv-08",
      question: "Which statement about `const` is TRUE?",
      options: [
        "const variables cannot be mutated in any way",
        "const variables must be initialized at declaration and the binding cannot be reassigned",
        "const is function-scoped like var",
        "const hoisting works the same as var hoisting",
      ],
      correctAnswerIndex: 1,
      explanation: "const prevents reassignment of the BINDING (the variable reference), not mutation of the value. Object properties and array elements can still be changed. const is block-scoped and has a TDZ.",
    },
    {
      id: "mcq-lfv-09",
      question: "In a virtual Leapfrog interview, which response BEST demonstrates strong project ownership?",
      options: [
        "'I just followed the tutorial to build it.'",
        "'I built it with a team and I handled the frontend part.'",
        "'I designed the architecture, made specific technology choices because of X, faced challenge Y, and solved it by Z.'",
        "'It's on my GitHub, you can check it there.'",
      ],
      correctAnswerIndex: 2,
      explanation: "Interviewers want to see that you understand WHY decisions were made and can articulate the problems you solved. Specificity — architecture, tradeoffs, challenges — signals genuine ownership.",
    },
    {
      id: "mcq-lfv-10",
      question: "What is closure in JavaScript?",
      options: [
        "A way to close a browser window",
        "A function that has access to variables from its outer scope even after the outer function has returned",
        "A method to end a Promise chain",
        "A design pattern for OOP in JavaScript",
      ],
      correctAnswerIndex: 1,
      explanation: "A closure is created when an inner function retains a reference to the variables of its enclosing outer function, even after that outer function has finished executing. This enables patterns like data privacy and function factories.",
    },
    {
      id: "mcq-lfv-11",
      question: "Which of the following CORRECTLY uses async/await with error handling?",
      options: [
        "async function f() { const d = await fetch(url); }",
        "async function f() { try { const d = await fetch(url); } catch(e) { console.error(e); } }",
        "function f() { await fetch(url); }",
        "async function f() { fetch(url).await(); }",
      ],
      correctAnswerIndex: 1,
      explanation: "await must be inside an async function. Errors from awaited promises are caught with try/catch — the same pattern as synchronous error handling, which is one of async/await's key advantages.",
    },
    {
      id: "mcq-lfv-12",
      question: "What is prototype chain lookup order in JavaScript?",
      options: [
        "Object itself → Object.prototype → null",
        "Object itself → its [[Prototype]] → the [[Prototype]]'s [[Prototype]] → ... → null",
        "Class → Parent Class → null",
        "Object itself → global scope → null",
      ],
      correctAnswerIndex: 1,
      explanation: "When a property is accessed, JavaScript first checks the object itself, then walks up the [[Prototype]] chain through each inherited object until either the property is found or null is reached.",
    },
    {
      id: "mcq-lfv-13",
      question: "What is the difference between `==` and `===` in JavaScript?",
      options: [
        "No difference in modern JS",
        "== checks value only (with type coercion); === checks value AND type (strict equality)",
        "=== is slower but more accurate",
        "== only works with primitives; === works with all types",
      ],
      correctAnswerIndex: 1,
      explanation: "== performs type coercion (e.g. '5' == 5 is true). === requires both value AND type to match ('5' === 5 is false). Always prefer === to avoid unexpected coercion bugs.",
    },
    {
      id: "mcq-lfv-14",
      question: "How does hoisting differ between `var` and `function` declarations?",
      options: [
        "Neither is hoisted",
        "var is hoisted and initialized to undefined; function declarations are hoisted fully (name + body)",
        "Both are hoisted and initialized to undefined",
        "Only function expressions are hoisted",
      ],
      correctAnswerIndex: 1,
      explanation: "var declarations are hoisted to the top of their scope but only initialized to undefined. Function declarations are hoisted with their full body, meaning you can call them before their definition in the code.",
    },
    {
      id: "mcq-lfv-15",
      question: "Which built-in array method does NOT modify the original array?",
      options: ["push()", "splice()", "map()", "sort()"],
      correctAnswerIndex: 2,
      explanation: "map() always returns a new array and leaves the original untouched. push(), splice(), and sort() all mutate the original array in place.",
    },
    {
      id: "mcq-lfv-16",
      question: "What is event bubbling in JavaScript?",
      options: [
        "Events that are fired multiple times",
        "When an event propagates upward from the target element through its ancestors in the DOM",
        "When async events are queued in the microtask queue",
        "A method to create custom events",
      ],
      correctAnswerIndex: 1,
      explanation: "When an event fires on an element (e.g. a button click), it bubbles up through each parent element to the document root unless stopped with stopPropagation(). This enables event delegation.",
    },
    {
      id: "mcq-lfv-17",
      question: "What does `typeof null` return in JavaScript?",
      options: ['"null"', '"undefined"', '"object"', '"NaN"'],
      correctAnswerIndex: 2,
      explanation: "typeof null returns 'object' — this is a historical bug in JavaScript that was never fixed for backward compatibility. To check for null, always use === null.",
    },
    {
      id: "mcq-lfv-18",
      question: "Which method creates a permanently-bound function copy that can be called LATER?",
      options: ["call()", "apply()", "bind()", "invoke()"],
      correctAnswerIndex: 2,
      explanation: "bind() returns a new function with `this` and optionally some arguments pre-filled. call() and apply() invoke the function immediately. invoke() is not a built-in JS method.",
    },
    {
      id: "mcq-lfv-19",
      question: "What does `Promise.race([p1, p2, p3])` return?",
      options: [
        "An array of all resolved values",
        "A promise that resolves/rejects with the value of the FIRST settled promise",
        "A promise that only resolves when all three resolve",
        "The fastest executing function",
      ],
      correctAnswerIndex: 1,
      explanation: "Promise.race() returns a Promise that resolves (or rejects) as soon as any one of the input promises settles first — regardless of the others.",
    },
    {
      id: "mcq-lfv-20",
      question: "In a virtual interview, when asked a question you don't know, what is the BEST response?",
      options: [
        "Guess confidently",
        "Say nothing and wait",
        "Say you're not sure, but reason through what you do know and show your thinking process",
        "Change the subject to something you know well",
      ],
      correctAnswerIndex: 2,
      explanation: "Interviewers at Leapfrog value reasoning and communication over memorized answers. Admitting uncertainty while showing structured thinking ('I'm not sure, but I know X, so I'd guess Y because...') demonstrates intellectual honesty and problem-solving maturity.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. ON-SITE TECHNICAL INTERVIEW PREP
// ─────────────────────────────────────────────────────────────────────────────
export const leapfrog_onsite: InterviewSection = {
  id: 19,
  slug: "leapfrog-onsite",
  title: "On-Site Technical Interview",
  subtitle: "OOP · CSS · HTTP · Middleware · Live Coding · System Thinking",
  color: "#3b82f6",
  questions: [
    {
      id: "lfo-q01",
      q: "What is the difference between `display: none` and `visibility: hidden` in CSS?",
      hint: "Both hide the element, but one removes it from flow; the other keeps the space.",
      answer: `display: none
  • Removes the element completely from the document flow.
  • No space is taken up. Neighbouring elements reflow to fill the gap.
  • The element is NOT accessible by screen readers.
  • Triggers layout reflow — more expensive.

visibility: hidden
  • Element is invisible but still occupies its space in the layout.
  • Neighbouring elements are NOT affected.
  • Still takes up the same width and height as before.
  • Screen readers may still announce it (browser-dependent).

When to use which:
  display: none → truly remove something (modal closed, accordion collapsed).
  visibility: hidden → hide content but preserve layout space (prevent reflow jank).`,
    },
    {
      id: "lfo-q02",
      q: "Explain the CSS Box Model. What does `box-sizing: border-box` change?",
      hint: "Content → Padding → Border → Margin. border-box includes padding and border in width.",
      answer: `Every HTML element is a rectangular box with 4 layers (inside out):
  1. Content — the actual text/image
  2. Padding  — space between content and border
  3. Border   — the visible edge
  4. Margin   — space outside the border, between elements

Default (box-sizing: content-box):
  width = content only.
  Adding padding and border INCREASES the total rendered size.
  This causes layout surprises.

box-sizing: border-box:
  width INCLUDES padding and border.
  The content area shrinks to accommodate them.
  Total rendered size = exactly the declared width.
  This is why most CSS resets use:
    *, *::before, *::after { box-sizing: border-box; }`,
    },
    {
      id: "lfo-q03",
      q: "What is the difference between Flexbox and CSS Grid? When do you use each?",
      hint: "Flex = one-dimensional (row OR column). Grid = two-dimensional (rows AND columns).",
      answer: `Flexbox (1D):
  • Arranges items along a SINGLE axis (row or column).
  • Items flex to fill available space.
  • Best for: navigation bars, button groups, centering an item, card rows.
  • Key properties: flex-direction, justify-content, align-items, flex-grow.

Grid (2D):
  • Arranges items in ROWS AND COLUMNS simultaneously.
  • Explicit control over both axes.
  • Best for: page layouts, dashboards, image galleries, complex forms.
  • Key properties: grid-template-columns, grid-template-rows, gap, grid-area.

Rule of thumb:
  "Is it a list of items in a line?" → Flexbox.
  "Does it need rows AND columns to align?" → Grid.
  They are NOT mutually exclusive — use both together in a single design.`,
    },
    {
      id: "lfo-q04",
      q: "What is an abstract class in OOP? Does JavaScript have them?",
      hint: "Abstract class = a blueprint that cannot be instantiated directly. JS has no native keyword but it can be simulated.",
      answer: `An abstract class is a class designed to be inherited, never directly instantiated.
It typically defines the interface (method signatures) that subclasses must implement.

In Java/C++: abstract keyword prevents instantiation and marks abstract methods.

JavaScript has NO native abstract class keyword.
Simulation approaches:
  1. Throw in constructor if new.target === BaseClass.
  2. Throw in base method if it's not overridden.
  3. TypeScript supports abstract classes natively.`,
      code: `// Simulating an abstract class in JavaScript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("Shape is abstract — cannot instantiate directly.");
    }
  }
  area() {
    throw new Error("area() must be implemented by subclass.");
  }
}

class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r ** 2; }
}

// new Shape(); // ✗ Error
console.log(new Circle(5).area()); // ✓ 78.53...`,
    },
    {
      id: "lfo-q05",
      q: "What is middleware in the context of Express.js?",
      hint: "Functions that have access to req, res, and next — they sit between the request and the route handler.",
      answer: `Middleware are functions that execute BETWEEN receiving a request and sending a response.

Signature: (req, res, next) => {}

They can:
  • Read/modify the request (req) or response (res).
  • End the request-response cycle by calling res.send() / res.json().
  • Pass control to the next middleware by calling next().
  • If next() is not called, the request hangs.

Common uses:
  • Authentication (check JWT before handler runs).
  • Logging (log every incoming request).
  • Body parsing (convert raw JSON body to req.body).
  • Error handling (4-argument middleware: err, req, res, next).

Middleware executes in the ORDER it is defined with app.use().`,
      code: `const express = require('express');
const app = express();

// 1. Logging middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next(); // must call next or request hangs
});

// 2. Auth middleware
function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/protected', requireAuth, (req, res) => {
  res.json({ data: 'secret' });
});`,
    },
    {
      id: "lfo-q06",
      q: "What is the difference between PUT and PATCH in HTTP?",
      hint: "PUT = full replacement. PATCH = partial update.",
      answer: `PUT:
  Replaces the ENTIRE resource with the provided data.
  If you omit a field, it gets removed (or set to null).
  Idempotent — calling it multiple times gives the same result.
  Use when the client is sending a complete representation of the resource.

PATCH:
  Updates ONLY the fields provided in the request body.
  Fields not included are left unchanged.
  Should be idempotent (by convention, though not required).
  Use for partial updates (e.g. changing only a user's email).

Interview example:
  User { name: "Anish", email: "a@a.com", role: "user" }
  PUT  { name: "Anish Jr" }   → { name: "Anish Jr", email: null, role: null }  ← replaces
  PATCH{ name: "Anish Jr" }   → { name: "Anish Jr", email: "a@a.com", role: "user" }  ← merges`,
    },
    {
      id: "lfo-q07",
      q: "Explain `position: relative` vs `position: absolute` in CSS.",
      hint: "Relative = offset from its own normal position. Absolute = removed from flow, positioned relative to nearest non-static ancestor.",
      answer: `position: relative
  • Element stays in the normal document flow.
  • top/left/right/bottom shift it VISUALLY from where it would normally sit.
  • Its original space is preserved (other elements still see it there).
  • Creates a new stacking context (with z-index).
  • Acts as the anchor for any absolutely positioned descendants.

position: absolute
  • Removed from normal document flow (other elements ignore it).
  • Positioned relative to its nearest POSITIONED ancestor
    (i.e. an ancestor with position other than static).
  • If no such ancestor exists, positioned relative to <html>.
  • Use for tooltips, dropdowns, overlays, badges on a card.

Common pattern: parent { position: relative } + child { position: absolute }
This pins the child to a corner of the parent card.`,
    },
    {
      id: "lfo-q08",
      q: "What is the difference between Authentication and Authorization?",
      hint: "Auth-N = who are you? Auth-Z = what are you allowed to do?",
      answer: `Authentication (AuthN):
  Verifying IDENTITY — who is this user?
  Examples: login with username + password, Google OAuth, JWT verification.
  Answer: "You are Anish."

Authorization (AuthZ):
  Verifying PERMISSIONS — what are they allowed to do?
  Examples: role-based access (admin vs user), resource ownership checks.
  Answer: "Anish is allowed to read posts but not delete other users' posts."

Order: Authentication ALWAYS comes before Authorization.
  You cannot check what someone is allowed to do until you know who they are.

Analogy:
  AuthN = Your ID card at the office door (proves who you are).
  AuthZ = Your key card that opens only certain floors (defines what you can access).`,
    },
    {
      id: "lfo-q09",
      q: "How would you whiteboard / explain your solution to a coding problem?",
      hint: "Problem → Approach → Walk through example → Code → Complexity.",
      answer: `Leapfrog on-site interviews include live coding with explanation. Use this framework:

1. RESTATE the problem (30 sec)
   "So I need to find X given Y with constraint Z — is that correct?"
   This shows listening and catches misunderstandings early.

2. EXAMPLE (30 sec)
   Walk through a small example by hand before touching code.
   "If the input is [2,7,11] and target is 9, I need indices 0 and 1."

3. APPROACH (1 min)
   Explain your data structure choice and algorithm BEFORE writing code.
   "I'll use a HashMap — for each number I'll check if the complement exists."

4. CODE (3-5 min)
   Write clean, readable code. Name variables clearly. Add a comment per block.
   Talk as you type. Don't go silent.

5. COMPLEXITY (30 sec)
   "Time is O(n) because we do one pass. Space is O(n) for the HashMap."

6. EDGE CASES (30 sec)
   "What if the array is empty? What about duplicates? What about negatives?"`,
    },
  ],
  mcqs: [
    {
      id: "mcq-lfo-01",
      question: "Which CSS property makes an element take up NO space and be completely removed from the document flow?",
      options: ["visibility: hidden", "opacity: 0", "display: none", "overflow: hidden"],
      correctAnswerIndex: 2,
      explanation: "display: none removes the element from the layout entirely — it takes up no space and neighbouring elements reflow as if it doesn't exist. visibility: hidden and opacity: 0 keep the space reserved.",
    },
    {
      id: "mcq-lfo-02",
      question: "What does `box-sizing: border-box` mean?",
      options: [
        "The box has a visible border",
        "Width and height include padding and border, not just content",
        "The box ignores margin",
        "Width includes margin as well",
      ],
      correctAnswerIndex: 1,
      explanation: "border-box changes the box model so that the declared width/height includes padding and border. This makes layout math predictable and is why it's used in CSS resets.",
    },
    {
      id: "mcq-lfo-03",
      question: "You need to build a 3-column dashboard layout where rows and columns must align precisely. Which CSS tool is BEST?",
      options: ["Flexbox", "Float", "CSS Grid", "Inline-block"],
      correctAnswerIndex: 2,
      explanation: "CSS Grid is designed for two-dimensional layouts. When you need alignment across both rows AND columns simultaneously (like a dashboard), Grid is the right choice. Flexbox only controls one axis at a time.",
    },
    {
      id: "mcq-lfo-04",
      question: "In Express.js, what happens if middleware does NOT call `next()` and does NOT send a response?",
      options: [
        "The next middleware runs automatically",
        "The request completes with a 200 OK",
        "The request hangs and eventually times out",
        "An automatic error is sent to the client",
      ],
      correctAnswerIndex: 2,
      explanation: "Middleware MUST either call next() to pass control forward, or send a response (res.send, res.json, etc.). If neither happens, the request/response cycle is stuck and the client will time out.",
    },
    {
      id: "mcq-lfo-05",
      question: "Which HTTP method should be used to UPDATE only the `email` field of a user record?",
      options: ["PUT", "POST", "PATCH", "GET"],
      correctAnswerIndex: 2,
      explanation: "PATCH is the semantically correct method for partial updates — it merges the provided fields into the existing resource. PUT would replace the entire user resource, potentially erasing other fields.",
    },
    {
      id: "mcq-lfo-06",
      question: "What are the four pillars of OOP?",
      options: [
        "Looping, Branching, Functions, Classes",
        "Encapsulation, Abstraction, Inheritance, Polymorphism",
        "Composition, Delegation, Mutation, Isolation",
        "Typing, Sorting, Searching, Hashing",
      ],
      correctAnswerIndex: 1,
      explanation: "The four pillars are: Encapsulation (bundle data + methods, hide internals), Abstraction (expose only what's necessary), Inheritance (child class reuses parent code), Polymorphism (same interface, different implementations).",
    },
    {
      id: "mcq-lfo-07",
      question: "What is the correct HTTP status code to return when a resource is NOT found?",
      options: ["200 OK", "301 Moved Permanently", "404 Not Found", "500 Internal Server Error"],
      correctAnswerIndex: 2,
      explanation: "404 Not Found is the standard response when the requested resource doesn't exist on the server. 500 indicates a server-side error. 301 is for redirects. 200 means success.",
    },
    {
      id: "mcq-lfo-08",
      question: "position: absolute is positioned relative to which element?",
      options: [
        "Always the <body> element",
        "Always the <html> element",
        "Its nearest ancestor with a position value other than static",
        "Its direct parent element",
      ],
      correctAnswerIndex: 2,
      explanation: "Absolutely positioned elements are placed relative to their nearest positioned ancestor (any position value except static). If none exists, they fall back to the initial containing block (html element).",
    },
    {
      id: "mcq-lfo-09",
      question: "Which concept does Liskov Substitution Principle (LSP) describe?",
      options: [
        "A class should have only one reason to change",
        "Subclasses must be substitutable for their parent class without breaking the program",
        "Classes should be open for extension but closed for modification",
        "Depend on abstractions, not concrete implementations",
      ],
      correctAnswerIndex: 1,
      explanation: "LSP states that if S is a subtype of T, then objects of type T can be replaced with objects of type S without breaking the program. A classic violation: Penguin extends Bird but throws when fly() is called.",
    },
    {
      id: "mcq-lfo-10",
      question: "What is the difference between authentication and authorization?",
      options: [
        "They are the same concept",
        "Authentication verifies identity; authorization determines permissions",
        "Authorization verifies identity; authentication determines permissions",
        "Authentication is for APIs; authorization is for web pages",
      ],
      correctAnswerIndex: 1,
      explanation: "Authentication answers 'Who are you?' (identity verification via login/token). Authorization answers 'What can you do?' (permission checking). Auth always comes before AuthZ.",
    },
    {
      id: "mcq-lfo-11",
      question: "In Flexbox, which property controls alignment along the CROSS axis (perpendicular to flex-direction)?",
      options: ["justify-content", "align-items", "flex-direction", "flex-wrap"],
      correctAnswerIndex: 1,
      explanation: "align-items controls alignment on the cross axis. If flex-direction is row, the cross axis is vertical and align-items centers items vertically. justify-content controls the main axis.",
    },
    {
      id: "mcq-lfo-12",
      question: "What HTTP status code indicates that the request was successful and a NEW resource was created?",
      options: ["200 OK", "201 Created", "204 No Content", "202 Accepted"],
      correctAnswerIndex: 1,
      explanation: "201 Created is the correct response for a successful POST request that created a new resource. 200 is for successful GET/PUT/PATCH. 204 is for successful DELETE with no response body.",
    },
    {
      id: "mcq-lfo-13",
      question: "Which CSS unit is relative to the root element's font size?",
      options: ["em", "rem", "px", "vh"],
      correctAnswerIndex: 1,
      explanation: "rem (root em) is relative to the font-size of the <html> element (usually 16px). em is relative to the font-size of the CURRENT element, which cascades unpredictably. rem is more predictable for design systems.",
    },
    {
      id: "mcq-lfo-14",
      question: "What is encapsulation in OOP?",
      options: [
        "A class extending another class",
        "Bundling data (state) and methods together, and restricting direct access from outside",
        "A function that calls itself",
        "Writing one class that works for multiple data types",
      ],
      correctAnswerIndex: 1,
      explanation: "Encapsulation bundles state and behavior together inside a class and hides internal details using private fields/methods. External code interacts only through a defined public interface (getters/setters, public methods).",
    },
    {
      id: "mcq-lfo-15",
      question: "What does the `opacity: 0` CSS property do compared to `display: none`?",
      options: [
        "Both remove the element from the layout",
        "opacity: 0 makes the element invisible but it still occupies space and receives pointer events",
        "opacity: 0 is identical to visibility: hidden",
        "opacity: 0 removes the element from accessibility trees",
      ],
      correctAnswerIndex: 1,
      explanation: "opacity: 0 makes an element fully transparent but it still takes up layout space and by default still receives mouse events. Use pointer-events: none if you want to disable interaction as well.",
    },
    {
      id: "mcq-lfo-16",
      question: "What is polymorphism in OOP?",
      options: [
        "A class having multiple constructors",
        "The ability for different classes to be treated through a common interface, each implementing it differently",
        "A function returning different types",
        "An object that can store any data type",
      ],
      correctAnswerIndex: 1,
      explanation: "Polymorphism (many forms) allows objects of different classes to respond to the same method call in different ways. E.g. Dog and Cat both extend Animal — calling animal.speak() calls the appropriate overridden method for each.",
    },
    {
      id: "mcq-lfo-17",
      question: "When solving a problem on a whiteboard interview, when should you start writing code?",
      options: [
        "Immediately — speed is the most important signal",
        "After clarifying the problem, walking through an example, and explaining your approach first",
        "After you've written pseudocode for the entire solution",
        "Only when asked to by the interviewer",
      ],
      correctAnswerIndex: 1,
      explanation: "Leapfrog interviewers want to see structured thinking. Clarifying requirements, working through an example by hand, and explaining your approach before coding demonstrates strong problem-solving process — which is what they're actually evaluating.",
    },
    {
      id: "mcq-lfo-18",
      question: "What does the CSS `z-index` property control?",
      options: [
        "The zoom level of an element",
        "The stacking order of elements on the z-axis (which element appears on top)",
        "The spacing between elements",
        "The transition speed of animations",
      ],
      correctAnswerIndex: 1,
      explanation: "z-index controls the stacking order along the z-axis (depth). Higher z-index values appear in front of lower ones. It only works on positioned elements (position: relative, absolute, fixed, or sticky).",
    },
    {
      id: "mcq-lfo-19",
      question: "In an on-site technical interview, what does 'think out loud' mean and why does it matter?",
      options: [
        "Speak faster to finish more problems",
        "Narrate your reasoning process so the interviewer can follow your thought, give hints, and assess problem-solving beyond just the final answer",
        "Ask lots of questions to stall for time",
        "Read the problem statement out loud before solving",
      ],
      correctAnswerIndex: 1,
      explanation: "Leapfrog interviewers explicitly assess the process, not just the solution. Thinking out loud lets the interviewer understand your reasoning, redirect you if needed, and judge communication skills — which matter greatly for team-based work.",
    },
    {
      id: "mcq-lfo-20",
      question: "Which of these correctly describes inheritance in OOP?",
      options: [
        "An object stores its data privately",
        "A child class reuses properties and methods of a parent class and can extend or override them",
        "A function calls itself recursively",
        "Two classes share a method without one extending the other",
      ],
      correctAnswerIndex: 1,
      explanation: "Inheritance allows a child class to reuse code from a parent (super) class. The child can also override inherited methods to provide specialised behaviour, reducing code duplication.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. HR INTERVIEW PREP
// ─────────────────────────────────────────────────────────────────────────────
export const leapfrog_hr: InterviewSection = {
  id: 20,
  slug: "leapfrog-hr",
  title: "HR Interview Prep",
  subtitle: "Behavioural · Cultural Fit · Why Leapfrog · STAR Stories",
  color: "#3b82f6",
  questions: [
    {
      id: "lfh-q01",
      q: "Tell me about yourself. (2-minute version tailored for a Leapfrog Fellowship)",
      hint: "Past → Present → Future. Technical with personality. Under 2 minutes.",
      answer: `Structure: Past → Present → Future

Past (30 sec):
  State your degree/background concisely. Pick ONE defining academic or personal project.
  "I studied [X] at [University]. During my second year I built [Y] — a [one-sentence description]."

Present (45 sec):
  What are you doing right now? What technologies are you focused on?
  "I'm currently sharpening my JavaScript fundamentals — closures, async patterns, and data structures.
  I've been working on [GitHub project] to put those skills into practice."

Future (30 sec):
  Why Leapfrog, why now?
  "I want to grow as an engineer in a team that builds real products for real users.
  Leapfrog's culture of mentorship and engineering excellence is exactly the environment I want to start in."

Close (15 sec):
  One honest sentence showing self-awareness.
  "I learn fastest when I have hard problems to work through with a strong team — which is exactly why I applied."`,
    },
    {
      id: "lfh-q02",
      q: "Why Leapfrog Technology specifically? (not just any IT company)",
      hint: "Research is key. Mention specific things: products, culture, engineering blog, people you follow.",
      answer: `This question separates candidates who want 'a job' from those who want 'this job'.

Research before your interview:
  • Leapfrog's product portfolio (Sparrow SMS, F1Soft associations, enterprise products).
  • Their engineering culture (they publish on Medium and LinkedIn).
  • The fact they grow their own talent through the Fellowship — show you know this.
  • Specific technologies in their stack (React, Node.js, AWS are commonly mentioned).

Sample answer structure:
  1. What you know about them (specific product or initiative).
  2. Why that aligns with your goals.
  3. The Fellowship / training culture angle — show it's not accidental.

"I specifically chose Leapfrog because your Fellowship program is designed for engineers who are early in their career but serious about craft. I've followed your engineering blog and seen how deeply you invest in your developers over the first year. I want to start my career where growth is structured and intentional — not just thrown into the deep end."`,
    },
    {
      id: "lfh-q03",
      q: "What is your greatest technical weakness? (Give a real one)",
      hint: "Pick something real but growth-oriented. Pair it with what you're doing about it.",
      answer: `Rules:
  1. Make it REAL — interviewers smell generic answers like "I work too hard."
  2. Choose something IMPROVABLE — not a core skill for the job.
  3. Always follow with concrete steps you're taking to fix it.

Strong example:
  "My weakest area is system design and architecture thinking. I can build features well,
  but when it comes to designing a system from the ground up — caching strategy, scaling decisions,
  database sharding — I rely too much on guessing.

  To address this, I've started reading 'Designing Data-Intensive Applications' and
  I work through one system design problem on YouTube (ByteByteGo) every weekend.
  I'm not there yet, but I have a clear path."

What NOT to say:
  • "I'm a perfectionist." — cliché and unbelievable.
  • A core job requirement (e.g. "I'm not great with JavaScript" for a JS role).
  • A weakness with no improvement plan.`,
    },
    {
      id: "lfh-q04",
      q: "Describe a project you built and are proud of. Walk me through it.",
      hint: "Problem → Stack choice with reasoning → Hardest challenge → Result → What you'd change.",
      answer: `This is often the most important HR question for Leapfrog because they've READ YOUR GITHUB.
Be specific. Be technical. Show ownership.

Framework:
  PROBLEM:    "I built X because Y pain point existed / I wanted to learn Z."
  STACK:      "I chose React + Node because... [specific reason, not just 'it's popular']."
  CHALLENGE:  "The hardest part was... [one specific real technical problem]."
  SOLUTION:   "I solved it by... [concrete approach]."
  RESULT:     "The outcome was... [does it work? live link? users? learnings?]."
  REFLECTION: "If I rebuilt it today I would... [shows growth mindset]."

Red flags interviewers look for:
  • Vague answers ("I just built a website").
  • Inability to explain decisions ("I used Redux because everyone uses Redux").
  • Can't explain challenges (means you didn't build it yourself).
  • No reflection (means you haven't grown from the experience).`,
    },
    {
      id: "lfh-q05",
      q: "Where do you see yourself in 3 years?",
      hint: "Be ambitious but grounded. Tie it to what Leapfrog's Fellowship provides.",
      answer: `What Leapfrog HR wants to hear:
  1. You have direction — you're not aimless.
  2. Your 3-year goal is achievable FROM this role.
  3. You plan to grow WITHIN the company, not just use it as a launchpad.

Strong structure:
  Year 1: Master the core stack, contribute meaningfully to a real product team.
  Year 2: Lead a feature or small module end-to-end. Mentor newer trainees.
  Year 3: Own a product area or work on more complex architectural decisions.

Sample:
  "In three years I want to be the engineer on a team who others come to for JavaScript and system design questions.
  I want to have shipped features that real users depend on, and to have grown from receiving mentorship to
  providing it to newer trainees. Leapfrog's progression path makes that arc realistic."`,
    },
    {
      id: "lfh-q06",
      q: "What questions do you have for us? (5 smart questions for Leapfrog)",
      hint: "Ask about growth, mentorship, team culture, tech stack, and real project work.",
      answer: `This is not a formality. It signals how seriously you've researched Leapfrog and how clearly you think about your career.

5 strong questions:
  1. "What does the training structure look like in the first 8–10 weeks, and how is a trainee's progress evaluated?"
  2. "What tech stack do most Frontend/Full-Stack trainees work with on their first real project?"
  3. "What does a typical day look like for a trainee developer — how much is structured learning vs. contributing to a product?"
  4. "What distinguishes the engineers who grow fastest at Leapfrog in their first year?"
  5. "Is there a defined pathway from Fellowship trainee to mid-level engineer, and what milestones mark that transition?"

Questions to AVOID:
  • "What does Leapfrog do?" (you should already know this)
  • "What is the salary?" (save for after an offer)
  • "How many leave requests do I get?"`,
    },
    {
      id: "lfh-q07",
      q: "Tell me about a time you worked in a team and there was a conflict. How did you handle it?",
      hint: "STAR method. Show empathy + assertiveness. End with a preserved relationship.",
      answer: `STAR framework:
  Situation: Briefly set the scene. One sentence.
  Task:      What was YOUR role and responsibility?
  Action:    What did YOU specifically do? (Not 'we'.)
  Result:    What was the outcome? What was preserved?

Strong example structure:
  "During a university group project, a teammate and I disagreed on the API design.
  He wanted a single large endpoint; I thought we should split it by resource type.

  Instead of escalating or going passive, I asked if we could spend 20 minutes drawing both
  approaches on a whiteboard and listing the trade-offs. Once we could see both side by side,
  we aligned on a hybrid approach — his simpler structure for MVP, with a refactoring plan built in.

  The project shipped on time, and we maintained a good working relationship throughout."

Key signals for Leapfrog:
  • You listened first.
  • You used data/reasoning, not authority or emotion.
  • The relationship was preserved.
  • The outcome was better because of the conflict, not despite it.`,
    },
  ],
  mcqs: [
    {
      id: "mcq-lfh-01",
      question: "The 'Tell me about yourself' answer should follow which structure?",
      options: [
        "Childhood → Education → Hobbies",
        "Past (background) → Present (current focus) → Future (why this role)",
        "Skills list → Achievements → Career goals",
        "Projects → Technologies → Salary expectations",
      ],
      correctAnswerIndex: 1,
      explanation: "Past → Present → Future gives a narrative arc that's easy to follow, keeps it under 2 minutes, and naturally leads into why you're applying for THIS specific role at THIS company.",
    },
    {
      id: "mcq-lfh-02",
      question: "Why is 'I'm a perfectionist' a weak answer to 'What is your greatest weakness?'",
      options: [
        "It's not specific enough",
        "It's a cliché that sounds like a disguised strength and signals a lack of genuine self-reflection",
        "Perfectionism is too technical a weakness",
        "It's too personal to share in an interview",
      ],
      correctAnswerIndex: 1,
      explanation: "Interviewers hear 'I'm a perfectionist' constantly and recognize it as an avoidance strategy. It fails to demonstrate genuine self-awareness. A strong weakness answer names something real, explains its impact, and describes concrete improvement steps.",
    },
    {
      id: "mcq-lfh-03",
      question: "In a behavioural question answer using STAR, what should the 'Action' section focus on?",
      options: [
        "What the team collectively did",
        "The background and context",
        "Specifically what YOU did — your individual decisions and steps",
        "The final result and lessons learned",
      ],
      correctAnswerIndex: 2,
      explanation: "The 'Action' step is the most important — it must describe YOUR specific actions, not the team's. Interviewers are evaluating your individual decision-making and behaviour, not the group's.",
    },
    {
      id: "mcq-lfh-04",
      question: "Why does Leapfrog ask about your GitHub projects in the HR round?",
      options: [
        "To check code quality automatically",
        "Because they want to verify your projects exist",
        "They review repos beforehand and use project walkthroughs to assess technical depth, decision-making, and genuine ownership",
        "It's a formality they don't actually follow up on",
      ],
      correctAnswerIndex: 2,
      explanation: "Multiple candidates reported Leapfrog interviewers had reviewed their GitHub repos before the interview and asked specific questions about architecture decisions and code. Project walkthroughs are a primary technical assessment tool.",
    },
    {
      id: "mcq-lfh-05",
      question: "Asking 'What does Leapfrog do?' in the 'Do you have questions for us?' section signals:",
      options: [
        "Curiosity and openness",
        "A lack of basic preparation — this information is publicly available",
        "Good communication skills",
        "Interest in company culture",
      ],
      correctAnswerIndex: 1,
      explanation: "Asking what the company does tells the interviewer you didn't research before the interview — a significant negative signal. All public information should be known before you walk in.",
    },
    {
      id: "mcq-lfh-06",
      question: "When describing a team conflict in an HR interview, which outcome is MOST valued?",
      options: [
        "You proved you were right",
        "You escalated to management quickly",
        "The relationship was preserved AND the outcome improved through the conflict resolution process",
        "You gave in to avoid further conflict",
      ],
      correctAnswerIndex: 2,
      explanation: "Leapfrog values team culture highly. The ideal conflict story shows empathy, data-driven reasoning, and a preserved working relationship — not 'winning' the argument.",
    },
    {
      id: "mcq-lfh-07",
      question: "What makes 'Why Leapfrog?' stand out from a generic 'Why any IT company?' answer?",
      options: [
        "Mentioning that Leapfrog pays well",
        "Referencing specific Leapfrog products, the Fellowship structure, their engineering culture, or specific technologies",
        "Saying Leapfrog is close to your home",
        "Mentioning that many people recommended it",
      ],
      correctAnswerIndex: 1,
      explanation: "Specificity is the only differentiator. Generic answers ('great company', 'good culture') don't stand out. Referencing Leapfrog's actual products, their training methodology, or their published engineering content shows genuine research.",
    },
    {
      id: "mcq-lfh-08",
      question: "A '3 years from now' answer is strongest when it:",
      options: [
        "Shows you plan to leave Leapfrog for a bigger company",
        "Describes ambitions unrelated to the role",
        "Paints a realistic growth arc that starts from what this role provides and stays within the company's growth structure",
        "Focuses entirely on salary progression",
      ],
      correctAnswerIndex: 2,
      explanation: "A strong 3-year answer shows self-awareness and alignment: your goals are achievable from this specific role, and you plan to grow within the company rather than using it as a stepping stone.",
    },
    {
      id: "mcq-lfh-09",
      question: "In a 2-minute 'Tell me about yourself', approximately how long should the 'Future (why this role)' section be?",
      options: ["60 seconds", "30 seconds", "5 seconds", "The entire 2 minutes"],
      correctAnswerIndex: 1,
      explanation: "A balanced 2-minute self-introduction allocates roughly: 30s past background, 45s current focus/projects, 30s future/why this role, 15s closing self-awareness statement. The future section should be purposeful but concise.",
    },
    {
      id: "mcq-lfh-10",
      question: "Which of the following is the BEST question to ask Leapfrog interviewers at the end?",
      options: [
        "'What is the salary range for this position?'",
        "'Do you have free snacks in the office?'",
        "'What tech stack do trainees work with on their first real product assignment?'",
        "'How long does the interview process take?'",
      ],
      correctAnswerIndex: 2,
      explanation: "Questions about the actual work, technology, and growth structure signal that you're genuinely interested in the job itself — not just getting hired. Asking about the tech stack also shows technical curiosity.",
    },
    {
      id: "mcq-lfh-11",
      question: "Saying 'We built the feature' in a behavioural answer is weaker than 'I specifically did X because':",
      options: [
        "'We' sounds more collaborative",
        "Interviewers cannot evaluate your individual contribution if you describe only team actions",
        "'We' is grammatically incorrect in interviews",
        "It makes the answer too long",
      ],
      correctAnswerIndex: 1,
      explanation: "HR interviews assess YOUR behaviour and decision-making. Using 'we' throughout makes your individual contribution invisible. The interviewer needs to understand what YOU specifically thought, decided, and did.",
    },
    {
      id: "mcq-lfh-12",
      question: "If you're asked about a time you failed, the strongest answers include:",
      options: [
        "A story where it was actually someone else's fault",
        "A minor issue that had no real consequences",
        "A genuine failure, honest ownership, concrete actions taken, and the durable lesson learned",
        "A story about a success that almost went wrong",
      ],
      correctAnswerIndex: 2,
      explanation: "Interviewers value genuine self-reflection. A real failure story with honest ownership, recovery actions, and a clear lesson demonstrates emotional maturity and a growth mindset — both highly valued in Leapfrog's culture.",
    },
    {
      id: "mcq-lfh-13",
      question: "Why is it important to tie your 'greatest weakness' to what you're actively doing to improve it?",
      options: [
        "To make the answer longer",
        "To show self-awareness is paired with action — you don't just recognize the gap, you're closing it",
        "To distract from the weakness",
        "Interviewers don't actually care about the improvement plan",
      ],
      correctAnswerIndex: 1,
      explanation: "Naming a weakness without an improvement plan signals stagnation. Pairing the weakness with concrete steps (books, practice, projects) shows initiative and a growth mindset — key traits for a Leapfrog Fellowship trainee.",
    },
    {
      id: "mcq-lfh-14",
      question: "What tone is MOST appropriate for the Leapfrog HR interview?",
      options: [
        "Formal and stiff, like a written job application",
        "Casual and humorous throughout",
        "Professional but conversational — prepared, honest, and human",
        "Technical jargon-heavy to impress",
      ],
      correctAnswerIndex: 2,
      explanation: "Leapfrog has a culture that values genuine people. The right tone is professional but natural — prepared answers delivered conversationally, not robotically recited. Being human and honest is valued over sounding impressive.",
    },
    {
      id: "mcq-lfh-15",
      question: "If asked 'What is your biggest strength?', the BEST format is:",
      options: [
        "One-word answer: 'Hardworking'",
        "List 5 strengths to be comprehensive",
        "Name one specific strength + give one concrete example that demonstrates it",
        "Describe what your friends say about you",
      ],
      correctAnswerIndex: 2,
      explanation: "Abstract claims without evidence are unconvincing. One strength + one concrete demonstration (STAR mini-story) is far more persuasive and memorable than a laundry list.",
    },
    {
      id: "mcq-lfh-16",
      question: "What does 'cultural fit' mean in the context of Leapfrog's hiring?",
      options: [
        "You enjoy Nepali food",
        "You agree with everything the interviewer says",
        "Your work values, communication style, and approach to growth align with Leapfrog's engineering culture",
        "You've worked at other Nepali IT companies",
      ],
      correctAnswerIndex: 2,
      explanation: "Cultural fit at Leapfrog means you value continuous learning, enjoy working collaboratively, communicate proactively, take ownership, and see mentorship as bidirectional — receiving it and eventually giving it.",
    },
    {
      id: "mcq-lfh-17",
      question: "Which STAR component is most frequently underdeveloped in candidate answers?",
      options: ["Situation", "Task", "Action", "Result"],
      correctAnswerIndex: 2,
      explanation: "Candidates often spend too long on Situation/Task (the context) and rush the Action section. Yet Action is what the interviewer is evaluating — your specific decisions, steps, and reasoning. Give it the most detail.",
    },
    {
      id: "mcq-lfh-18",
      question: "When is it appropriate to mention salary expectations in a Leapfrog HR interview?",
      options: [
        "At the start — to establish expectations",
        "When asked directly, or after an offer is extended",
        "Never discuss salary with HR",
        "Ask about it in the 'Do you have questions for us?' section",
      ],
      correctAnswerIndex: 1,
      explanation: "Salary discussions are appropriate when the HR interviewer raises the topic, or after an offer has been extended and you're negotiating. Volunteering it too early — especially in the questions section — signals that the job is primarily about compensation rather than the work.",
    },
    {
      id: "mcq-lfh-19",
      question: "A candidate says: 'I just followed a tutorial to build my GitHub project.' How does this affect perception?",
      options: [
        "Positively — honesty is valued",
        "Neutrally — tutorials are a valid learning method",
        "Negatively — it suggests shallow understanding and inability to make independent decisions",
        "Positively — it shows they know how to use resources",
      ],
      correctAnswerIndex: 2,
      explanation: "Interviewers assess your ability to make independent technical decisions. A tutorial-followed project with no customization or original thinking suggests you can copy code but not write it. Always extend tutorials with your own features or architectural changes.",
    },
    {
      id: "mcq-lfh-20",
      question: "The best way to conclude a 'Tell me about yourself' answer is:",
      options: [
        "List all your certificates",
        "A confident statement of why this specific role/company is the right next step for you",
        "A question back to the interviewer",
        "Summarize your entire CV again",
      ],
      correctAnswerIndex: 1,
      explanation: "Ending with a clear, confident statement of why THIS role is the right next step bridges your story into the interview. It answers the unspoken interviewer question: 'Why are you here?' — before they have to ask it.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. REMOTE ASSIGNMENT SAMPLES (NEW)
// ─────────────────────────────────────────────────────────────────────────────
export const leapfrog_remote: InterviewSection = {
  id: 23,
  slug: "leapfrog-remote",
  title: "Remote Assignment Samples",
  subtitle: "Timed Mini-Apps · Fetch API · Filter/Search · Clean Code · README",
  color: "#3b82f6",
  questions: [
    {
      id: "lfr-q01",
      q: "What is a Remote Assignment at Leapfrog and how should you approach it?",
      hint: "3-hour timed build. Functional > perfect. Code quality + README matter.",
      answer: `Leapfrog's Remote Assignment is a timed take-home build — typically 3 hours.
You are given a specification and expected to deliver a working JS application.

What they evaluate:
  1. Does it work? (Correctness — highest priority)
  2. Is the code clean and readable? (Naming, structure, comments)
  3. Is there a README explaining what you built and how to run it?
  4. Are edge cases handled gracefully?
  5. Is there a live demo or clear setup instructions?

Strategy:
  • Read the spec fully before writing a single line. Re-read it.
  • Plan your data flow on paper: input → state → render.
  • Build MVP first (it works, but ugly) → then polish.
  • Write one meaningful commit every 30 minutes so your progress is visible.
  • The last 20 minutes: README, edge cases, quick clean-up.
  • Never submit broken code. A simpler working version beats a broken complex one.`,
    },
    {
      id: "lfr-q02",
      q: "Build a user list app: fetch users from JSONPlaceholder, display them, add a search filter.",
      hint: "fetch() → render to DOM → input event listener for search filter.",
      answer: `This is the most common Remote Assignment pattern at Leapfrog.
Core pattern: Fetch → Store → Render → Filter.

Architecture:
  1. Fetch users from https://jsonplaceholder.typicode.com/users on load.
  2. Store the full list in a variable (allUsers).
  3. Render all cards to the DOM.
  4. Add an 'input' event listener to the search field.
  5. On each keystroke, filter allUsers and re-render only matching cards.

Key decisions to mention in your README:
  • Why you stored the full list (to filter client-side without extra fetches).
  • Error handling (what if the API is down?).
  • Loading state (show a spinner while fetching).`,
      code: `// index.js — User List with Search Filter

const API = 'https://jsonplaceholder.typicode.com/users';
const grid   = document.getElementById('user-grid');
const search = document.getElementById('search-input');
let allUsers = [];

// ── Fetch ──────────────────────────────────────────────────
async function fetchUsers() {
  try {
    grid.innerHTML = '<p class="loading">Loading users...</p>';
    const res  = await fetch(API);
    if (!res.ok) throw new Error(\`HTTP error: \${res.status}\`);
    allUsers = await res.json();
    renderUsers(allUsers);
  } catch (err) {
    grid.innerHTML = \`<p class="error">Failed to load users: \${err.message}</p>\`;
  }
}

// ── Render ─────────────────────────────────────────────────
function renderUsers(users) {
  if (!users.length) {
    grid.innerHTML = '<p class="empty">No users match your search.</p>';
    return;
  }
  grid.innerHTML = users
    .map(u => \`
      <div class="user-card">
        <h3>\${u.name}</h3>
        <p>📧 \${u.email}</p>
        <p>🌐 \${u.website}</p>
        <p>🏢 \${u.company.name}</p>
      </div>
    \`)
    .join('');
}

// ── Search / Filter ────────────────────────────────────────
search.addEventListener('input', () => {
  const q = search.value.toLowerCase().trim();
  const filtered = allUsers.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.email.toLowerCase().includes(q) ||
    u.company.name.toLowerCase().includes(q)
  );
  renderUsers(filtered);
});

// ── Init ───────────────────────────────────────────────────
fetchUsers();`,
    },
    {
      id: "lfr-q03",
      q: "What should a good README for a Remote Assignment contain?",
      hint: "Title, description, tech used, how to run, features, known limitations.",
      answer: `A README is NOT optional for a Leapfrog Remote Assignment.
It's the first thing reviewers see. It signals professionalism and communication skill.

Required sections:
  # Project Title
  One sentence of what it does.

  ## Features
  Bullet list of implemented features. Be specific.
  • Fetches users from JSONPlaceholder API on load
  • Real-time search filter (name, email, company)
  • Loading and error states

  ## Tech Used
  Plain JavaScript (ES6+), HTML5, CSS3. No frameworks (or list them if used).

  ## How to Run
  1. Clone the repository
  2. Open index.html in any browser
  (Or: npm install && npm run dev if there's a build step)

  ## Known Limitations / Future Improvements
  • No pagination for large datasets
  • Would add unit tests with Jest in a production version

  ## Author
  Your name + GitHub profile link`,
    },
    {
      id: "lfr-q04",
      q: "Build a Todo App with add, delete, and mark-complete features. No framework.",
      hint: "Array as state. Re-render on every mutation. Don't manipulate DOM directly — derive it from state.",
      answer: `Pattern: State array → render function → event handlers that mutate state and call render.

This is the single most important architectural pattern to demonstrate in a Remote Assignment.
It shows you understand separation of concerns even without a framework.

State: let todos = []  (single source of truth)
Each todo: { id, text, completed }

render() clears the container and rebuilds from state.
Never patch individual DOM nodes — always re-render from the full array.
This makes the app predictable and debuggable.`,
      code: `// todo.js — Pure JS Todo App

let todos = [];
let nextId = 1;

// ── State mutators ─────────────────────────────────────────
const addTodo    = text  => { todos.push({ id: nextId++, text, completed: false }); render(); };
const deleteTodo = id    => { todos = todos.filter(t => t.id !== id); render(); };
const toggleTodo = id    => { todos = todos.map(t => t.id === id ? {...t, completed: !t.completed} : t); render(); };

// ── Render (derives DOM from state) ───────────────────────
function render() {
  const list = document.getElementById('todo-list');
  list.innerHTML = todos.map(t => \`
    <li class="\${t.completed ? 'done' : ''}">
      <span onclick="toggleTodo(\${t.id})">\${t.text}</span>
      <button onclick="deleteTodo(\${t.id})">✕</button>
    </li>
  \`).join('');

  document.getElementById('count').textContent =
    \`\${todos.filter(t => !t.completed).length} remaining\`;
}

// ── Input handler ──────────────────────────────────────────
document.getElementById('add-btn').addEventListener('click', () => {
  const input = document.getElementById('todo-input');
  const text  = input.value.trim();
  if (text) { addTodo(text); input.value = ''; }
});

document.getElementById('todo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('add-btn').click();
});

render(); // initial render`,
    },
    {
      id: "lfr-q05",
      q: "How do you handle loading, error, and empty states in a Fetch-based app?",
      hint: "Three states: loading (spinner), error (message + retry), empty (friendly message).",
      answer: `A Remote Assignment that only handles the happy path (data loads fine) signals inexperience.
Interviewers look for graceful handling of the other three states.

Loading state:
  Set before the fetch call. Show a spinner or 'Loading...' text.
  Clear when fetch resolves or rejects.

Error state:
  Catch block. Show a human-readable message. Log the technical error to console.
  Optionally: show a 'Try again' button that re-calls the fetch function.

Empty state:
  When the API returns an empty array OR a search filter returns zero results.
  Show a friendly message: 'No users found matching "xyz"'.
  Never show a blank white box — that looks like a bug.

Clean pattern: a renderState(state, data) function that handles all four states
(loading | error | empty | success) in one place.`,
      code: `// Clean state-based rendering pattern
function renderState(state, data = []) {
  const container = document.getElementById('content');

  const states = {
    loading: '<div class="loading"><span class="spinner"></span> Loading...</div>',
    error:   '<div class="error">⚠️ Failed to load. <button id="retry">Retry</button></div>',
    empty:   '<div class="empty">🔍 No results found.</div>',
    success: data.map(item => \`<div class="card">\${item.name}</div>\`).join(''),
  };

  container.innerHTML = states[state] ?? states.empty;

  if (state === 'error') {
    document.getElementById('retry')?.addEventListener('click', loadData);
  }
}

async function loadData() {
  renderState('loading');
  try {
    const res  = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    renderState(data.length ? 'success' : 'empty', data);
  } catch {
    renderState('error');
  }
}

loadData();`,
    },
    {
      id: "lfr-q06",
      q: "What makes code 'clean' in a Remote Assignment context? List the key signals.",
      hint: "Naming, single responsibility, no magic numbers, consistent style, helpful comments.",
      answer: `Leapfrog reviewers are checking code quality, not just functionality. These are the signals they look for:

1. NAMING — Every variable, function, and class name explains what it is.
   Bad:  function fn(d) { const x = d.filter(i => i.s > 5); }
   Good: function filterActiveUsers(users) { const activeUsers = users.filter(u => u.score > 5); }

2. SINGLE RESPONSIBILITY — Each function does ONE thing.
   fetchAndDisplayAndFilter() is a red flag.
   fetchUsers(), renderUsers(users), filterUsers(query) is clean.

3. NO MAGIC NUMBERS / STRINGS
   Bad:  if (score > 5) ...
   Good: const MIN_SCORE = 5;  if (score > MIN_SCORE) ...

4. CONSISTENT FORMATTING — Pick a style and stick to it throughout.
   Consistent indentation, quote style, semicolons.

5. MEANINGFUL COMMENTS — Comment WHY, not WHAT.
   Bad:  // increment i  → i++
   Good: // Store full list so we can filter client-side without extra API calls

6. ERROR HANDLING — Always wrap fetch calls in try/catch. Never let the app break silently.

7. NO DEAD CODE — Remove commented-out code, console.logs, and unused variables before submitting.`,
    },
    {
      id: "lfr-q07",
      q: "Explain debounce and why you should use it on a search input in a Remote Assignment.",
      hint: "Without debounce, every keystroke fires a filter/fetch. Debounce waits until typing stops.",
      answer: `Without debounce:
  Every single keystroke fires the filter (or worse, a fetch call).
  For 'leapfrog', that's 8 separate filter operations.
  For an API-backed search, that's 8 network requests.

With debounce:
  The function is only called after the user STOPS typing for a defined delay (e.g. 300ms).
  Dramatically reduces unnecessary work. Smoother UX.

Adding debounce to a Remote Assignment search input is a clear signal of production awareness —
it shows you think about performance, not just correctness.`,
      code: `// Debounce implementation from scratch (interviewer-approved)
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Apply to search input
const handleSearch = debounce((e) => {
  const q = e.target.value.toLowerCase().trim();
  const filtered = allUsers.filter(u => u.name.toLowerCase().includes(q));
  renderUsers(filtered);
}, 300);

document.getElementById('search-input').addEventListener('input', handleSearch);`,
    },
    {
      id: "lfr-q08",
      q: "What is the minimal folder structure for a clean Remote Assignment vanilla JS submission?",
      hint: "index.html / style.css / script.js / README.md — clean separation is enough.",
      answer: `For a vanilla JS Remote Assignment, simplicity and separation of concerns matter more than complex build tooling.

Recommended minimal structure:
  /project-name
    ├── index.html      ← HTML structure only (no inline JS, minimal inline styles)
    ├── style.css       ← All styles (responsive, state styles, loading/error/empty)
    ├── script.js       ← All application logic (or split: api.js, render.js, app.js)
    └── README.md       ← Required

If the project is larger, split the JS:
    ├── js/
    │   ├── api.js      ← All fetch calls
    │   ├── render.js   ← All DOM manipulation
    │   └── app.js      ← Entry point — wires everything together

Clean commit history (minimum 3-4 commits):
  1. "Initial project structure and HTML skeleton"
  2. "Fetch and render users from API"
  3. "Add search filter with debounce"
  4. "Add loading, error, empty states and README"

This commit history tells a clear story of progress and is a positive signal.`,
    },
  ],
  mcqs: [
    {
      id: "mcq-lfr-01",
      question: "In a Leapfrog Remote Assignment, which should take the HIGHEST priority?",
      options: [
        "Beautiful UI and animations",
        "A working, correct solution that meets the spec requirements",
        "Using the most modern framework",
        "Maximum number of features",
      ],
      correctAnswerIndex: 1,
      explanation: "A simpler, working solution always beats a complex, broken one. Correctness is the baseline. Polish and extra features matter only if the core works perfectly first.",
    },
    {
      id: "mcq-lfr-02",
      question: "Why should you store the FULL API response in a variable before filtering?",
      options: [
        "It's faster to store everything",
        "So you can filter client-side on each keystroke without making new API calls",
        "localStorage requires it",
        "The API rate-limits filtered requests",
      ],
      correctAnswerIndex: 1,
      explanation: "Storing allUsers means each search keystroke only runs a .filter() on an in-memory array — O(n) and instant. Without it, you'd need a new network request per keystroke, which is slow and inefficient.",
    },
    {
      id: "mcq-lfr-03",
      question: "Which event on an `<input>` fires on EVERY keystroke (including paste and delete)?",
      options: ["change", "keydown", "input", "blur"],
      correctAnswerIndex: 2,
      explanation: "The 'input' event fires whenever the value changes — including keyboard input, paste, and programmatic changes. 'change' only fires when the input loses focus. 'keydown' fires on key press but doesn't capture paste.",
    },
    {
      id: "mcq-lfr-04",
      question: "What does debounce do to a search input event handler?",
      options: [
        "Makes it fire faster",
        "Prevents it from firing more than once total",
        "Delays execution until the user stops typing for a set duration, reducing unnecessary calls",
        "Throttles to exactly one call per second",
      ],
      correctAnswerIndex: 2,
      explanation: "Debounce resets a timer on each keystroke. The handler only fires after the user has stopped typing for the specified delay (e.g. 300ms). This prevents dozens of filter/fetch calls from a single word typed.",
    },
    {
      id: "mcq-lfr-05",
      question: "What should the catch block in a fetch() call always do at minimum?",
      options: [
        "Silently fail — don't confuse the user",
        "Refresh the page",
        "Show the user a readable error message and log the technical error to the console",
        "Retry the fetch automatically 10 times",
      ],
      correctAnswerIndex: 2,
      explanation: "A blank screen or silent failure looks like a bug. A user-friendly error message ('Failed to load data — please try again') paired with console.error() for debugging is the professional minimum.",
    },
    {
      id: "mcq-lfr-06",
      question: "Which approach to DOM rendering is more scalable and predictable in a JS app?",
      options: [
        "Directly patch individual DOM nodes when data changes",
        "Derive the entire DOM from state in a render() function called after every state mutation",
        "Use setInterval to refresh the DOM every second",
        "Manipulate innerHTML in multiple separate places throughout the code",
      ],
      correctAnswerIndex: 1,
      explanation: "Re-rendering from state (like React's approach, but in vanilla JS) ensures the UI always reflects the current state — no stale DOM patches, no inconsistencies. This is the pattern that signals architectural thinking.",
    },
    {
      id: "mcq-lfr-07",
      question: "A README for a Remote Assignment MUST include which of the following?",
      options: [
        "Your full CV and work history",
        "Project description, features list, how to run it, and technologies used",
        "Screenshots of every browser tested",
        "A performance benchmark report",
      ],
      correctAnswerIndex: 1,
      explanation: "The minimum viable README covers: what the project does, what features it has, what tech it uses, and how to run it locally. These four elements are what a reviewer needs to evaluate the submission without reverse-engineering it.",
    },
    {
      id: "mcq-lfr-08",
      question: "What is a 'magic number' in code, and why is it a problem?",
      options: [
        "A number that appears in animations",
        "A hard-coded numeric value with no explanation of what it represents",
        "A randomly generated number",
        "A number larger than 1000",
      ],
      correctAnswerIndex: 1,
      explanation: "A magic number is a literal number (like 5 or 300) embedded in code without context. 'if (score > 5)' is unclear — is 5 a minimum score? A threshold? Naming it 'const MINIMUM_SCORE = 5' makes the code self-documenting.",
    },
    {
      id: "mcq-lfr-09",
      question: "What should you do FIRST when you receive a Remote Assignment specification?",
      options: [
        "Open a text editor and start coding immediately",
        "Set up the folder structure",
        "Read the ENTIRE spec before writing any code, then re-read the requirements",
        "Choose a framework",
      ],
      correctAnswerIndex: 2,
      explanation: "Reading and fully understanding the spec before coding prevents wasted effort on features that weren't asked for and catches constraints you might miss. Re-reading after the first pass ensures nothing was skimmed.",
    },
    {
      id: "mcq-lfr-10",
      question: "What does an 'empty state' mean in a UI context?",
      options: [
        "A page with no CSS styling",
        "The state when there is no data to display — e.g. search returns zero results",
        "A component with no props",
        "An empty JavaScript object {}",
      ],
      correctAnswerIndex: 1,
      explanation: "An empty state is the UI condition when there is no data to show — e.g. a search filter with no matches, or an API that returns an empty array. Always show a friendly, informative message rather than a blank container.",
    },
    {
      id: "mcq-lfr-11",
      question: "In a Todo app built with vanilla JS, which approach is BEST for re-rendering the list?",
      options: [
        "Find the changed DOM node and update only that node",
        "Clear the entire list container and rebuild it from the todos array on every change",
        "Use window.location.reload() to refresh",
        "Manually create and append DOM nodes for each change",
      ],
      correctAnswerIndex: 1,
      explanation: "For small-to-medium lists, rebuilding the entire list from the state array in a render() function is predictable, debuggable, and easy to maintain. It mirrors how React works. Direct DOM patching is error-prone and hard to reason about.",
    },
    {
      id: "mcq-lfr-12",
      question: "What does a clean commit history signal to a Leapfrog reviewer?",
      options: [
        "You worked faster",
        "You made fewer mistakes",
        "You work incrementally with intention — each commit represents a logical unit of work, showing professional development habits",
        "You understand Git commands",
      ],
      correctAnswerIndex: 2,
      explanation: "A commit history like 'Add fetch', 'Add render', 'Add search filter', 'Add README' tells a story of structured progress. A single 'final project' commit — or no commits at all — suggests the work was done in one chaotic session.",
    },
    {
      id: "mcq-lfr-13",
      question: "Which of the following is a sign of POOR code quality in a Remote Assignment?",
      options: [
        "Using const for variables that don't change",
        "Naming a function fetchAndDisplayAndFilterAndSortUsers()",
        "Adding try/catch around fetch calls",
        "Separating HTML, CSS, and JS into different files",
      ],
      correctAnswerIndex: 1,
      explanation: "A function name that does four things signals the function violates the Single Responsibility Principle. Functions should do one thing, named clearly. Long chained-action names are a red flag for reviewers.",
    },
    {
      id: "mcq-lfr-14",
      question: "What is the correct way to convert a Response object from fetch() to JSON?",
      options: [
        "JSON.parse(response)",
        "response.text()",
        "await response.json()",
        "response.body.json()",
      ],
      correctAnswerIndex: 2,
      explanation: "response.json() is an async method on the Response object that parses the JSON body and returns a Promise. It must be awaited. JSON.parse() is for strings, not Response objects.",
    },
    {
      id: "mcq-lfr-15",
      question: "In a Remote Assignment, when should you submit?",
      options: [
        "As early as possible, even if incomplete",
        "Only when every edge case is handled perfectly",
        "When the core features work correctly, with a README, and any unfinished polish is noted as known limitations",
        "After adding as many bonus features as possible",
      ],
      correctAnswerIndex: 2,
      explanation: "Submit when the core requirements are working and documented. Note what you'd add with more time. A working MVP with a good README beats an over-engineered, partially-working submission — and clearly noted limitations show professional self-awareness.",
    },
    {
      id: "mcq-lfr-16",
      question: "Which JS method is used to filter an array and returns a NEW array without mutating the original?",
      options: ["splice()", "filter()", "forEach()", "reduce()"],
      correctAnswerIndex: 1,
      explanation: "filter() returns a new array containing only elements that pass the test function. It does not modify the original array. splice() mutates in place. forEach() iterates without returning a new array. reduce() aggregates to a single value.",
    },
    {
      id: "mcq-lfr-17",
      question: "What is the purpose of the `.trim()` method when processing search input?",
      options: [
        "Removes HTML tags from the string",
        "Converts the string to lowercase",
        "Removes leading and trailing whitespace to prevent false negatives in comparisons",
        "Limits the string to a maximum length",
      ],
      correctAnswerIndex: 2,
      explanation: "A user might accidentally type ' leapfrog' (with a leading space). Without .trim(), this would fail to match 'leapfrog'. Trimming ensures whitespace-only differences don't cause filtering bugs.",
    },
    {
      id: "mcq-lfr-18",
      question: "Why should you remove `console.log` statements before submitting a Remote Assignment?",
      options: [
        "They slow down the code",
        "They are a security vulnerability",
        "Leftover console.logs signal unfinished debugging and reduce code quality impression",
        "Browsers block them in production",
      ],
      correctAnswerIndex: 2,
      explanation: "Leftover console.logs are a tell-tale sign of code that hasn't been properly cleaned up. In a professional setting, they'd pollute the console in production. Removing them before submission signals code quality awareness.",
    },
    {
      id: "mcq-lfr-19",
      question: "What is the difference between throttle and debounce?",
      options: [
        "They are identical",
        "Debounce delays until inactivity; throttle ensures the function fires at most once per interval regardless of how often it's triggered",
        "Throttle delays until inactivity; debounce fires at a fixed rate",
        "Debounce is for clicks; throttle is for keyboard events",
      ],
      correctAnswerIndex: 1,
      explanation: "Debounce: fires AFTER the user stops for N ms (ideal for search input). Throttle: fires at most once every N ms regardless of trigger rate (ideal for scroll events, window resize). Different tools for different UX needs.",
    },
    {
      id: "mcq-lfr-20",
      question: "A reviewer opens your Remote Assignment repo and the first file they see is README.md. It says only 'Todo App'. What does this signal?",
      options: [
        "Clean minimalism — good practice",
        "A lack of professional documentation habits — the README is the first impression and should be informative",
        "Intentional mystery to intrigue the reviewer",
        "That the code speaks for itself",
      ],
      correctAnswerIndex: 1,
      explanation: "A one-line README signals that documentation wasn't taken seriously. In a professional team, a README is how you communicate intent to colleagues. Leapfrog reviewers consider documentation a core engineering skill, not an optional extra.",
    },
  ],
};