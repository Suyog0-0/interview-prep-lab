import { InterviewQuestion } from "../../types";

export function getDayQuestionsP1(dayNum: number): InterviewQuestion[] {
  switch (dayNum) {
    case 1:
      return [
        {
          id: "lf-p1-1",
          q: "What is the Temporal Dead Zone (TDZ)?",
          hint: "Period before initialization where variables cannot be accessed.",
          answer: "The Temporal Dead Zone is the period from the start of a block until a `let` or `const` variable is initialized. Accessing it during this time throws a ReferenceError.",
          code: "console.log(x); // ReferenceError: Cannot access 'x' before initialization\nlet x = 5;\nconsole.log(x); // 5",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p1-2",
          q: "Explain Hoisting in JavaScript.",
          hint: "Moving declarations to the top.",
          answer: "Hoisting moves variable and function declarations to the top of their scope before execution. `var` is initialized with `undefined`. `let`/`const` are hoisted but stay in the TDZ until their line.",
          code: "console.log(a); // undefined (var is hoisted with undefined)\nvar a = 10;\n\nconsole.log(b); // ReferenceError (let stays in TDZ)\nlet b = 20;\n\ngreet(); // 'Hello!' (function declaration is fully hoisted)\nfunction greet() { console.log('Hello!'); }",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p1-3",
          q: "What is the difference between `let`, `var`, and `const`?",
          hint: "Scope and reassignment.",
          answer: "`var` is function-scoped and hoisted with `undefined`. `let` is block-scoped and can be reassigned. `const` is block-scoped and cannot be reassigned (though object properties can be mutated).",
          code: "var x = 1; var x = 2; // OK - can redeclare\nlet y = 1; y = 2;    // OK - can reassign\n// let y = 3;         // Error - cannot redeclare\nconst z = { a: 1 };\nz.a = 99;            // OK - mutating property is allowed\n// z = {};            // Error - cannot reassign",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p1-4",
          q: "How do you reverse a string in JavaScript?",
          hint: "Split, reverse, join.",
          answer: "Strings are immutable and have no `.reverse()` method. Convert to array, reverse the array, then join back.",
          code: "const str = 'hello';\nconst reversed = str.split('').reverse().join('');\nconsole.log(reversed); // 'olleh'",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p1-5",
          q: "How do you check if a string is a palindrome?",
          hint: "Compare it to its reversed version.",
          answer: "A palindrome reads the same forwards and backwards. Reverse the string and compare to the original.",
          code: "function isPalindrome(str) {\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return cleaned === cleaned.split('').reverse().join('');\n}\nconsole.log(isPalindrome('racecar')); // true\nconsole.log(isPalindrome('hello'));   // false",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p1-6",
          q: "Two Sum: What is the optimal O(n) approach?",
          hint: "Use a Hash Map.",
          answer: "Iterate once. For each element, check if its complement (`target - element`) exists in a Map. If yes, return indices. If not, store the element.",
          code: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n}\nconsole.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p1-7",
          q: "Valid Anagram: How do you solve it in O(n) time?",
          hint: "Use a frequency map.",
          answer: "Build a frequency map from the first string. Decrement for the second string. If any count goes negative, or string lengths differ, they are not anagrams.",
          code: "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const freq = {};\n  for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;\n  for (const ch of t) {\n    if (!freq[ch]) return false;\n    freq[ch]--;\n  }\n  return true;\n}\nconsole.log(isAnagram('anagram', 'nagaram')); // true",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p1-8",
          q: "Why does `typeof null` return 'object'?",
          hint: "A historical bug in JavaScript.",
          answer: "It is a legacy bug from JS v1. Values were 32-bit; objects had a type tag of 000. `null` (the NULL pointer) was all zeros, so it matched the object type tag. It was never fixed to avoid breaking existing code.",
          code: "console.log(typeof null);       // 'object' (bug!)\nconsole.log(typeof undefined);  // 'undefined'\nconsole.log(typeof {});         // 'object'\n\n// Safe null check:\nconst val = null;\nconsole.log(val === null);      // true (use this instead)",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p1-9",
          q: "What is strict mode (`'use strict'`)?",
          hint: "Opt-in restricted variant of JavaScript.",
          answer: "Strict mode prevents sloppy JS patterns: assigning to undeclared variables throws an error, `this` is undefined in functions (not global), and reserved words can't be used as variable names.",
          code: "'use strict';\n\n// Without strict: this silently creates a global\n// With strict: throws ReferenceError\n// x = 10; // ReferenceError: x is not defined\n\nfunction show() {\n  'use strict';\n  console.log(this); // undefined (not the global object)\n}\nshow();",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p1-10",
          q: "How do you swap two variables without a temporary variable?",
          hint: "Array destructuring.",
          answer: "ES6 array destructuring lets you swap values in a single, elegant line.",
          code: "let a = 1, b = 2;\n[a, b] = [b, a];\nconsole.log(a, b); // 2 1\n\n// Old way needed a temp variable:\n// let temp = a; a = b; b = temp;",
          category: "Coding",
          language: "javascript"
        }
      ];
    case 2:
      return [
        {
          id: "lf-p2-1",
          q: "What is a Closure?",
          hint: "A function that remembers its lexical scope.",
          answer: "A closure is a function that retains access to variables in its outer (enclosing) lexical scope, even after that outer function has returned.",
          code: "function makeCounter() {\n  let count = 0; // private variable\n  return {\n    increment: () => ++count,\n    getCount: () => count\n  };\n}\nconst counter = makeCounter();\ncounter.increment();\ncounter.increment();\nconsole.log(counter.getCount()); // 2",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-2",
          q: "What are Arrow Functions and how do they handle `this`?",
          hint: "Shorter syntax, lexical `this`.",
          answer: "Arrow functions have concise syntax and do NOT have their own `this`. They inherit `this` from the surrounding lexical scope at definition time.",
          code: "const obj = {\n  name: 'Alice',\n  // Regular: 'this' depends on how it's called\n  greetRegular: function() { return this.name; },\n  // Arrow: 'this' is inherited from obj's context\n  greetArrow: () => 'no own this'\n};\nconsole.log(obj.greetRegular()); // 'Alice'\nconsole.log(obj.greetArrow());   // 'no own this'",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-3",
          q: "Explain `call()`, `apply()`, and `bind()`.",
          hint: "Ways to explicitly set `this`.",
          answer: "`call()` invokes a function immediately with a given `this` and individual args. `apply()` is the same but takes args as an array. `bind()` returns a new function with `this` permanently bound.",
          code: "function greet(greeting, punctuation) {\n  return `${greeting}, ${this.name}${punctuation}`;\n}\nconst user = { name: 'Alice' };\n\nconsole.log(greet.call(user, 'Hi', '!'));      // 'Hi, Alice!'\nconsole.log(greet.apply(user, ['Hi', '!']));  // 'Hi, Alice!'\n\nconst boundGreet = greet.bind(user, 'Hello');\nconsole.log(boundGreet('.')); // 'Hello, Alice.'",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-4",
          q: "What is the `arguments` object?",
          hint: "Array-like object of passed arguments.",
          answer: "The `arguments` object is an array-like object accessible inside regular functions containing all passed arguments. Arrow functions do NOT have `arguments`.",
          code: "function sum() {\n  let total = 0;\n  for (let i = 0; i < arguments.length; i++) {\n    total += arguments[i];\n  }\n  return total;\n}\nconsole.log(sum(1, 2, 3, 4)); // 10\n\n// Modern alternative: rest params\nconst sumRest = (...args) => args.reduce((a, b) => a + b, 0);",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-5",
          q: "Contains Duplicate: Optimal O(n) solution?",
          hint: "Use a Set.",
          answer: "Add all elements to a `Set`. A Set only stores unique values, so if its size is smaller than the array length, duplicates were removed.",
          code: "function containsDuplicate(nums) {\n  return new Set(nums).size !== nums.length;\n}\nconsole.log(containsDuplicate([1, 2, 3, 1])); // true\nconsole.log(containsDuplicate([1, 2, 3]));    // false",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p2-6",
          q: "How do you find the longest word in a string?",
          hint: "Split and reduce.",
          answer: "Split the string into words, then use `reduce()` to compare lengths and keep the longest.",
          code: "function longestWord(str) {\n  return str.split(' ').reduce((longest, word) =>\n    word.length > longest.length ? word : longest, '');\n}\nconsole.log(longestWord('The quick brown fox')); // 'quick'",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p2-7",
          q: "Explain lexical scoping.",
          hint: "Scope determined by where code is written.",
          answer: "Lexical scope means a function's access to variables is determined by where it is written in the source code, not by where it's called from.",
          code: "const outer = 'I am outer';\n\nfunction outer_fn() {\n  const inner = 'I am inner';\n  function inner_fn() {\n    // inner_fn can see both outer and inner due to lexical scope\n    console.log(outer); // 'I am outer'\n    console.log(inner); // 'I am inner'\n  }\n  inner_fn();\n}\nouter_fn();",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-8",
          q: "What does it mean that functions are 'first-class citizens' in JS?",
          hint: "They can be treated like any other variable.",
          answer: "Functions can be assigned to variables, passed as arguments, and returned from other functions — just like any other value.",
          code: "// Assign to variable\nconst greet = function(name) { return `Hello, ${name}`; };\n\n// Pass as argument (higher-order function)\n[1, 2, 3].map(n => n * 2); // [2, 4, 6]\n\n// Return from function (factory)\nfunction multiplier(factor) {\n  return (num) => num * factor;\n}\nconst double = multiplier(2);\nconsole.log(double(5)); // 10",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-9",
          q: "Group Anagrams: Optimal approach?",
          hint: "Sort string as Map key.",
          answer: "For each word, sort its characters to create a unique key. Words sharing the same sorted key are anagrams of each other. Group them in a Map.",
          code: "function groupAnagrams(strs) {\n  const map = {};\n  for (const str of strs) {\n    const key = str.split('').sort().join('');\n    if (!map[key]) map[key] = [];\n    map[key].push(str);\n  }\n  return Object.values(map);\n}\nconsole.log(groupAnagrams(['eat','tea','tan','ate','nat','bat']));\n// [['eat','tea','ate'],['tan','nat'],['bat']]",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p2-10",
          q: "What is an Immediately Invoked Function Expression (IIFE)?",
          hint: "Runs as soon as it is defined.",
          answer: "An IIFE is a function that runs the moment it's defined. Used to create a private scope and avoid polluting the global namespace.",
          code: "const result = (function() {\n  const privateVar = 'secret';\n  return {\n    getSecret: () => privateVar\n  };\n})();\n\nconsole.log(result.getSecret()); // 'secret'\n// console.log(privateVar); // ReferenceError",
          category: "JS Theory",
          language: "javascript"
        }
      ];
    case 3:
      return [
        {
          id: "lf-p3-1",
          q: "What does `Array.prototype.map()` do?",
          hint: "Transforms every element into a new array.",
          answer: "It creates a NEW array populated with the results of calling a provided function on every element. The original array is NOT modified.",
          code: "const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled); // [2, 4, 6]\nconsole.log(nums);    // [1, 2, 3] (unchanged)\n\n// Practical: transform objects\nconst users = [{id:1, name:'Alice'}, {id:2, name:'Bob'}];\nconst names = users.map(u => u.name); // ['Alice', 'Bob']",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p3-2",
          q: "What does `Array.prototype.reduce()` do?",
          hint: "Accumulates all elements to a single value.",
          answer: "It runs a reducer function on each element, passing the result forward, ultimately producing a single output value.",
          code: "const nums = [1, 2, 3, 4];\nconst sum = nums.reduce((accumulator, current) => accumulator + current, 0);\nconsole.log(sum); // 10\n\n// Count frequencies\nconst chars = ['a', 'b', 'a', 'c', 'b', 'a'];\nconst freq = chars.reduce((acc, ch) => {\n  acc[ch] = (acc[ch] || 0) + 1;\n  return acc;\n}, {});\nconsole.log(freq); // { a: 3, b: 2, c: 1 }",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p3-3",
          q: "How do you implement a custom `map()` function?",
          hint: "Create array, loop, push result.",
          answer: "Attach to Array.prototype. Loop over `this`, call the callback on each element with its index and the array, push results to a new array, and return it.",
          code: "Array.prototype.myMap = function(cb) {\n  const res = [];\n  for (let i = 0; i < this.length; i++) {\n    res.push(cb(this[i], i, this));\n  }\n  return res;\n};\n\nconsole.log([1, 2, 3].myMap(x => x * 10)); // [10, 20, 30]",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p3-4",
          q: "How do you shallow copy an object?",
          hint: "Spread or Object.assign.",
          answer: "The spread operator `{ ...obj }` or `Object.assign({}, obj)` copies top-level properties. Nested objects still share the same reference.",
          code: "const original = { a: 1, b: { c: 2 } };\nconst shallow = { ...original };\n\nshallow.a = 99;       // Does NOT affect original\nshallow.b.c = 99;     // DOES affect original (shared reference!)\n\nconsole.log(original.a);   // 1 (unchanged)\nconsole.log(original.b.c); // 99 (shared!)",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p3-5",
          q: "How do you deep copy an object?",
          hint: "structuredClone or JSON methods.",
          answer: "Use `structuredClone(obj)` (modern). Or `JSON.parse(JSON.stringify(obj))` (but it strips functions, undefined, and Dates become strings).",
          code: "const obj = { a: 1, b: { c: 2 } };\n\n// Method 1: structuredClone (modern, recommended)\nconst deep1 = structuredClone(obj);\ndeep1.b.c = 99;\nconsole.log(obj.b.c); // 2 (unchanged - true deep copy!)\n\n// Method 2: JSON trick (loses functions/undefined)\nconst deep2 = JSON.parse(JSON.stringify(obj));",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p3-6",
          q: "What is the time complexity of Binary Search?",
          hint: "Halves the search space each step.",
          answer: "O(log n). Each iteration halves the remaining search space, so it takes at most log₂(n) steps.",
          code: "function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}\nconsole.log(binarySearch([1, 3, 5, 7, 9], 5)); // 2",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p3-7",
          q: "Merge Two Sorted Arrays in-place: Strategy?",
          hint: "Start from the end to avoid overwriting.",
          answer: "Use three pointers at the ends of both arrays. Compare elements from the back, placing the larger at the tail of the first array.",
          code: "function merge(nums1, m, nums2, n) {\n  let i = m - 1, j = n - 1, k = m + n - 1;\n  while (i >= 0 && j >= 0) {\n    if (nums1[i] > nums2[j]) nums1[k--] = nums1[i--];\n    else nums1[k--] = nums2[j--];\n  }\n  while (j >= 0) nums1[k--] = nums2[j--];\n}\nconst a = [1, 3, 5, 0, 0, 0];\nmerge(a, 3, [2, 4, 6], 3);\nconsole.log(a); // [1, 2, 3, 4, 5, 6]",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p3-8",
          q: "Find Missing Number in an array of 1 to N.",
          hint: "Expected sum minus actual sum.",
          answer: "Use the math formula for the sum of first N numbers: `n*(n+1)/2`. Subtract the actual array sum to find the missing number.",
          code: "function missingNumber(nums) {\n  const n = nums.length;\n  const expectedSum = n * (n + 1) / 2;\n  const actualSum = nums.reduce((a, b) => a + b, 0);\n  return expectedSum - actualSum;\n}\nconsole.log(missingNumber([3, 0, 1])); // 2\nconsole.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p3-9",
          q: "Difference between `slice()` and `splice()`?",
          hint: "Non-mutating vs mutating.",
          answer: "`slice(start, end)` returns a shallow copy of a portion WITHOUT modifying the original. `splice(start, deleteCount, ...items)` modifies the array IN-PLACE and returns removed elements.",
          code: "const arr = [1, 2, 3, 4, 5];\n\n// slice: non-destructive\nconst sliced = arr.slice(1, 3);\nconsole.log(sliced); // [2, 3]\nconsole.log(arr);    // [1, 2, 3, 4, 5] (unchanged)\n\n// splice: destructive\nconst removed = arr.splice(1, 2, 99, 100);\nconsole.log(removed); // [2, 3] (removed elements)\nconsole.log(arr);     // [1, 99, 100, 4, 5] (modified!)",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p3-10",
          q: "How do you flatten a deeply nested array?",
          hint: "flat(Infinity) or reduce with recursion.",
          answer: "Use `arr.flat(Infinity)` natively. To build from scratch, use `reduce()` recursively.",
          code: "const nested = [1, [2, [3, [4]], 5]];\n\n// Native method\nconsole.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5]\n\n// From scratch (recursive reduce)\nfunction flatten(arr) {\n  return arr.reduce((acc, val) =>\n    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);\n}\nconsole.log(flatten(nested)); // [1, 2, 3, 4, 5]",
          category: "Coding",
          language: "javascript"
        }
      ];
    case 4:
      return [
        {
          id: "lf-p4-1",
          q: "What is the Event Loop?",
          hint: "Coordinates sync and async code execution.",
          answer: "The Event Loop allows JS to perform non-blocking operations despite being single-threaded. It checks if the Call Stack is empty, and if so, pushes callbacks from the Task Queues onto the Stack.",
          code: "// Conceptual order of execution:\nconsole.log('1 - sync');\n\nsetTimeout(() => console.log('4 - macrotask'), 0);\n\nPromise.resolve().then(() => console.log('3 - microtask'));\n\nconsole.log('2 - sync');\n// Output: 1, 2, 3, 4",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-2",
          q: "What are the Microtask and Macrotask queues?",
          hint: "Promises vs setTimeouts.",
          answer: "Microtask queue (Promises, queueMicrotask) has higher priority. Macrotask queue (setTimeout, setInterval) runs after. The Event Loop empties ALL microtasks before running the next macrotask.",
          code: "console.log('start');\n\nsetTimeout(() => console.log('setTimeout'), 0); // Macrotask\n\nPromise.resolve()\n  .then(() => console.log('promise 1'))          // Microtask\n  .then(() => console.log('promise 2'));          // Microtask\n\nconsole.log('end');\n// Output: start, end, promise 1, promise 2, setTimeout",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-3",
          q: "What are the three states of a Promise?",
          hint: "Pending, fulfilled, rejected.",
          answer: "1. Pending: initial state. 2. Fulfilled: operation completed successfully. 3. Rejected: operation failed. Once settled (fulfilled/rejected), a Promise cannot change state.",
          code: "// Creating a Promise\nconst p = new Promise((resolve, reject) => {\n  const success = true;\n  if (success) resolve('data');\n  else reject(new Error('failed'));\n});\n\np.then(data => console.log('Fulfilled:', data))\n .catch(err => console.log('Rejected:', err.message));",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-4",
          q: "Explain `async` and `await`.",
          hint: "Syntactic sugar for Promises.",
          answer: "`async` makes a function always return a Promise. `await` pauses execution inside the function until the Promise settles, making async code look synchronous.",
          code: "async function fetchUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error('HTTP error');\n    const user = await res.json();\n    return user;\n  } catch (err) {\n    console.error(err);\n  }\n}\n\n// async always returns a Promise\nfetchUser(1).then(user => console.log(user));",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-5",
          q: "Difference between `Promise.all` and `Promise.allSettled`?",
          hint: "Fail-fast vs wait for all.",
          answer: "`Promise.all` rejects immediately if ANY promise rejects. `Promise.allSettled` waits for all promises to finish (regardless of outcome) and returns an array of result objects.",
          code: "const p1 = Promise.resolve('a');\nconst p2 = Promise.reject('error!');\nconst p3 = Promise.resolve('c');\n\n// Promise.all fails fast:\nPromise.all([p1, p2, p3]).catch(e => console.log('all failed:', e)); // 'error!'\n\n// Promise.allSettled waits for all:\nPromise.allSettled([p1, p2, p3]).then(results => {\n  results.forEach(r => console.log(r.status, r.value || r.reason));\n});",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-6",
          q: "How do you fetch data from an API using async/await?",
          hint: "try/catch, fetch, res.ok, .json().",
          answer: "Wrap in try/catch. `fetch` only rejects on network errors, so manually check `res.ok`. Then `await res.json()` to parse the body.",
          code: "async function getData(url) {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Fetch failed:', err.message);\n    return null;\n  } finally {\n    // Runs always - e.g. hide loading spinner\n    console.log('fetch complete');\n  }\n}",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p4-7",
          q: "Does JS execute code in parallel?",
          hint: "Concurrency vs Parallelism.",
          answer: "Standard JS is single-threaded and uses concurrency via the Event Loop. True parallelism requires Web Workers, which run in separate threads.",
          code: "// Concurrent (not parallel): both fetches START together\nasync function concurrent() {\n  const [a, b] = await Promise.all([\n    fetch('/api/a'),\n    fetch('/api/b')\n  ]);\n  return [await a.json(), await b.json()];\n}\n\n// Sequential (one after other):\nasync function sequential() {\n  const a = await fetch('/api/a');\n  const b = await fetch('/api/b');\n}",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-8",
          q: "Execution order: setTimeout(0), Promise.resolve().then, console.log?",
          hint: "Sync → Microtask → Macrotask.",
          answer: "Synchronous code runs first, then microtasks (Promises), then macrotasks (setTimeout). Output: 3, 2, 1.",
          code: "setTimeout(() => console.log('1 - setTimeout'), 0); // Macrotask\nPromise.resolve().then(() => console.log('2 - Promise')); // Microtask\nconsole.log('3 - sync'); // Synchronous\n\n// Output order:\n// 3 - sync\n// 2 - Promise\n// 1 - setTimeout",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-9",
          q: "How to run Promises sequentially instead of concurrently?",
          hint: "for...of with await.",
          answer: "Use a `for...of` loop with `await`. Using `forEach` with async callbacks does NOT await each promise before starting the next.",
          code: "const urls = ['/api/1', '/api/2', '/api/3'];\n\n// Sequential (waits for each before next):\nasync function sequential() {\n  for (const url of urls) {\n    const res = await fetch(url);\n    console.log(await res.json()); // One at a time\n  }\n}\n\n// WRONG - forEach doesn't await:\n// urls.forEach(async url => await fetch(url));",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p4-10",
          q: "Valid Parentheses: Strategy?",
          hint: "Use a Stack.",
          answer: "Push opening brackets onto a stack. When you see a closing bracket, pop the stack and verify it matches. The string is valid only if the stack is empty at the end.",
          code: "function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (const ch of s) {\n    if ('({['.includes(ch)) stack.push(ch);\n    else if (stack.pop() !== map[ch]) return false;\n  }\n  return stack.length === 0;\n}\nconsole.log(isValid('()[]{}')); // true\nconsole.log(isValid('(]'));     // false",
          category: "DSA",
          language: "javascript"
        }
      ];
    case 5:
      return [
        {
          id: "lf-p5-1",
          q: "What are the three phases of DOM Event Propagation?",
          hint: "Capture → Target → Bubble.",
          answer: "1. Capturing: event travels down from window to the target. 2. Target: event hits the element. 3. Bubbling: event travels back up to the window.",
          code: "// Default: events bubble (3rd param = false)\ndocument.querySelector('.parent').addEventListener('click', () => {\n  console.log('parent clicked (bubbling)');\n});\n\n// Capture phase (3rd param = true)\ndocument.querySelector('.parent').addEventListener('click', () => {\n  console.log('parent capturing first!');\n}, true);",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p5-2",
          q: "What is Event Delegation?",
          hint: "Attach listener to parent, handle children.",
          answer: "Attach ONE event listener to a parent element to manage events for all its children, leveraging bubbling. Perfect for dynamically generated elements.",
          code: "// Instead of 100 individual listeners:\nconst list = document.querySelector('#todo-list');\nlist.addEventListener('click', (e) => {\n  // e.target = the specific <li> that was clicked\n  if (e.target.tagName === 'LI') {\n    e.target.classList.toggle('done');\n  }\n});\n// Works even for <li> elements added LATER",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p5-3",
          q: "Difference between `e.target` and `e.currentTarget`?",
          hint: "Who triggered it vs who caught it.",
          answer: "`e.target` is the original element that triggered the event. `e.currentTarget` is the element the event listener is attached to.",
          code: "document.querySelector('.parent').addEventListener('click', (e) => {\n  console.log('target:', e.target.id);       // clicked child ID\n  console.log('currentTarget:', e.currentTarget.className); // 'parent'\n});\n\n// If you click the child:\n// target: 'child-id'\n// currentTarget: 'parent'",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p5-4",
          q: "Difference between `stopPropagation()` and `preventDefault()`?",
          hint: "Bubbling vs browser's default action.",
          answer: "`stopPropagation()` stops the event from traveling further up/down the DOM. `preventDefault()` prevents the browser's default behavior (e.g. form submit, link navigation). They are independent.",
          code: "// Prevent form submission:\ndocument.querySelector('form').addEventListener('submit', (e) => {\n  e.preventDefault(); // stops page reload\n  // handle form data manually\n});\n\n// Stop click from bubbling to parent:\ndocument.querySelector('.child').addEventListener('click', (e) => {\n  e.stopPropagation(); // parent listener won't fire\n});",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p5-5",
          q: "How to select all elements with a class and add an event listener?",
          hint: "querySelectorAll and forEach.",
          answer: "`querySelectorAll` returns a NodeList. Use `forEach` to iterate and attach listeners.",
          code: "document.querySelectorAll('.btn').forEach((btn, index) => {\n  btn.addEventListener('click', (e) => {\n    console.log(`Button ${index} clicked`);\n    e.target.classList.toggle('active');\n  });\n});",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p5-6",
          q: "What is the DOM?",
          hint: "Document Object Model — a tree of nodes.",
          answer: "The DOM is a programming interface representing the HTML document as a tree of nodes. JS can manipulate it to dynamically change structure, style, and content.",
          code: "// Selecting elements\nconst h1 = document.querySelector('h1');\nconst items = document.querySelectorAll('li');\n\n// Modifying\nh1.textContent = 'New Title';\nh1.style.color = 'red';\nh1.classList.add('highlight');\n\n// Creating new nodes\nconst p = document.createElement('p');\np.textContent = 'New paragraph';\ndocument.body.appendChild(p);",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p5-7",
          q: "Maximum Subarray: Kadane's Algorithm?",
          hint: "Reset running sum to 0 if negative.",
          answer: "Keep a running sum. If it goes negative, reset to 0 (starting a new subarray is better). Track the maximum sum seen at each step.",
          code: "function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = 0;\n  for (const num of nums) {\n    currentSum += num;\n    maxSum = Math.max(maxSum, currentSum);\n    if (currentSum < 0) currentSum = 0;\n  }\n  return maxSum;\n}\nconsole.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p5-8",
          q: "How do you create an HTML element and append it using JS?",
          hint: "createElement → set properties → appendChild.",
          answer: "Use `document.createElement()`, modify its properties, and use `parentElement.appendChild()` to add it to the DOM.",
          code: "// Create a new list item\nconst li = document.createElement('li');\nli.textContent = 'New Todo Item';\nli.className = 'todo-item';\nli.dataset.id = '123';\n\n// Append to existing list\ndocument.querySelector('#todo-list').appendChild(li);\n\n// Or insert at a specific position:\n// list.insertBefore(li, list.firstChild);",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p5-9",
          q: "What does `classList.toggle()` do?",
          hint: "Adds if missing, removes if present.",
          answer: "It toggles a CSS class on an element. Removes it if present, adds it if not. You can pass a boolean as a second argument to force-add or force-remove.",
          code: "const btn = document.querySelector('#darkModeBtn');\nconst body = document.body;\n\nbtn.addEventListener('click', () => {\n  body.classList.toggle('dark-mode');\n  // Force add: body.classList.toggle('dark-mode', true)\n  // Force remove: body.classList.toggle('dark-mode', false)\n});",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p5-10",
          q: "Why is innerHTML potentially dangerous?",
          hint: "Cross-Site Scripting (XSS).",
          answer: "If `innerHTML` is set with unsanitized user input, an attacker can inject malicious `<script>` tags (XSS). Always use `textContent` for plain text.",
          code: "// DANGEROUS: user could inject <script>alert('xss')</script>\nconst userInput = '<img src=x onerror=\"alert(1)\">';\ndiv.innerHTML = userInput; // XSS attack!\n\n// SAFE: textContent escapes HTML\ndiv.textContent = userInput; // Displays raw string, no execution\n\n// If you MUST use innerHTML, sanitize:\n// div.innerHTML = DOMPurify.sanitize(userInput);",
          category: "JS Theory",
          language: "javascript"
        }
      ];
    case 6:
      return [
        {
          id: "lf-p6-1",
          q: "What is Debounce?",
          hint: "Wait for a pause before firing.",
          answer: "Debouncing delays function execution until after a specified period of inactivity. If the function is called again before the delay ends, the timer resets.",
          code: "// Usage: prevents API call on every keystroke\nconst searchInput = document.querySelector('#search');\n\nconst debouncedSearch = debounce((query) => {\n  fetch(`/api/search?q=${query}`);\n}, 300);\n\nsearchInput.addEventListener('input', (e) => {\n  debouncedSearch(e.target.value); // API only calls after 300ms pause\n});",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p6-2",
          q: "What is Throttle?",
          hint: "Fire at most once per time period.",
          answer: "Throttling ensures a function executes at most once per specified time window, regardless of how many times it's triggered.",
          code: "function throttle(fn, limit) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= limit) {\n      lastCall = now;\n      fn.apply(this, args);\n    }\n  };\n}\n// Scroll handler fires at most once every 100ms:\nwindow.addEventListener('scroll', throttle(() => {\n  console.log('scroll position:', window.scrollY);\n}, 100));",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p6-3",
          q: "Implement a basic Debounce function.",
          hint: "clearTimeout on each call, setTimeout at the end.",
          answer: "Return a closure. On each call, clear the previous timeout and set a new one. The wrapped function only runs after the specified delay of inactivity.",
          code: "function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  };\n}\n\n// Test:\nconst log = debounce((msg) => console.log(msg), 300);\nlog('a'); log('b'); log('c');\n// Only 'c' is logged (after 300ms of no calls)",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p6-4",
          q: "What is Prototypal Inheritance?",
          hint: "Objects inherit from other objects via the prototype chain.",
          answer: "JS objects have a hidden `[[Prototype]]` link to another object. When a property isn't found, JS traverses this chain until it hits null.",
          code: "const animal = {\n  breathe() { return 'breathing...'; }\n};\n\nconst dog = Object.create(animal);\ndog.bark = function() { return 'woof!'; };\n\nconsole.log(dog.bark());    // 'woof!' (own method)\nconsole.log(dog.breathe()); // 'breathing...' (from prototype!)\nconsole.log(Object.getPrototypeOf(dog) === animal); // true",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p6-5",
          q: "How do ES6 Classes differ from Java classes?",
          hint: "Syntactic sugar over prototypes.",
          answer: "ES6 classes are syntactic sugar. Under the hood, JS still uses prototypal inheritance, not the true class-based system of Java or C++.",
          code: "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return `${this.name} makes a noise.`; }\n}\n\nclass Dog extends Animal {\n  speak() { return `${this.name} barks.`; }\n}\n\nconst d = new Dog('Rex');\nconsole.log(d.speak()); // 'Rex barks.'\n// Under the hood: Dog.prototype.__proto__ === Animal.prototype",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p6-6",
          q: "What does the `super` keyword do in an ES6 Class?",
          hint: "Calls the parent class constructor/method.",
          answer: "`super()` calls the parent class constructor. You MUST call it before accessing `this` in a child constructor. You can also call parent methods: `super.methodName()`.",
          code: "class Vehicle {\n  constructor(make, model) {\n    this.make = make;\n    this.model = model;\n  }\n  info() { return `${this.make} ${this.model}`; }\n}\n\nclass Car extends Vehicle {\n  constructor(make, model, doors) {\n    super(make, model); // MUST call super first\n    this.doors = doors;\n  }\n  info() { return `${super.info()} (${this.doors} doors)`; }\n}\nconsole.log(new Car('Toyota', 'Camry', 4).info());",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p6-7",
          q: "What is `Object.create()`?",
          hint: "Creates an object with a specific prototype.",
          answer: "Creates a new object with the specified object as its prototype, allowing fine-grained control over prototypal inheritance.",
          code: "const personProto = {\n  greet() {\n    return `Hi, I am ${this.name}`;\n  }\n};\n\nconst alice = Object.create(personProto);\nalice.name = 'Alice';\n\nconsole.log(alice.greet()); // 'Hi, I am Alice'\nconsole.log(Object.getPrototypeOf(alice) === personProto); // true",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p6-8",
          q: "Longest Substring Without Repeating Characters: Strategy?",
          hint: "Sliding Window + Set.",
          answer: "Use a sliding window with left/right pointers and a Set. Expand right. If the character is already in the Set, shrink from the left until the duplicate is removed. Track max length.",
          code: "function lengthOfLongestSubstring(s) {\n  const set = new Set();\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}\nconsole.log(lengthOfLongestSubstring('abcabcbb')); // 3",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p6-9",
          q: "How do you check if an object is completely empty?",
          hint: "Object.keys().length === 0.",
          answer: "Check if the object has no own enumerable keys using `Object.keys(obj).length === 0`. Also ensure it's actually an object (not null).",
          code: "function isEmpty(obj) {\n  return obj !== null &&\n    typeof obj === 'object' &&\n    Object.keys(obj).length === 0;\n}\n\nconsole.log(isEmpty({}));         // true\nconsole.log(isEmpty({ a: 1 }));   // false\nconsole.log(isEmpty(null));       // false\nconsole.log(isEmpty([]));         // true (empty array)",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p6-10",
          q: "Difference between `__proto__` and `prototype`?",
          hint: "__proto__ is on instances; prototype is on constructor functions.",
          answer: "`__proto__` is the actual prototype link on an object instance. `prototype` is a property on constructor functions/classes used to set the `__proto__` of objects created with `new`.",
          code: "function Dog(name) { this.name = name; }\nDog.prototype.bark = function() { return 'woof'; };\n\nconst rex = new Dog('Rex');\n\nconsole.log(rex.__proto__ === Dog.prototype); // true\nconsole.log(rex.bark()); // 'woof' (found via prototype chain)\n\n// Modern way to read prototype:\nconsole.log(Object.getPrototypeOf(rex) === Dog.prototype); // true",
          category: "JS Theory",
          language: "javascript"
        }
      ];
    case 7:
      return [
        {
          id: "lf-p7-1",
          q: "Why is spaced repetition important?",
          hint: "Combats the forgetting curve.",
          answer: "Reviewing material at increasing intervals strengthens neural pathways, converting short-term memory into long-term retention. More effective than cramming.",
          code: "// Review schedule example:\n// Day 1: Learn topic\n// Day 2: Review (1 day later)\n// Day 5: Review (3 days later)\n// Day 12: Review (7 days later)\n// Day 26: Review (14 days later)\n\n// Anki (flashcard app) automates this formula.\n// The key: review right BEFORE you forget.",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p7-2",
          q: "Reverse Linked List: O(n) iterative strategy?",
          hint: "Three pointers: prev, curr, nextTemp.",
          answer: "Save `curr.next`, point `curr.next` to `prev`, advance `prev` to `curr`, advance `curr` to the saved next. Repeat until `curr` is null. Return `prev`.",
          code: "function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr !== null) {\n    const nextTemp = curr.next; // save next\n    curr.next = prev;          // reverse pointer\n    prev = curr;               // advance prev\n    curr = nextTemp;           // advance curr\n  }\n  return prev; // new head\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p7-3",
          q: "How to approach an interview question you've never seen?",
          hint: "Clarify → Example → Brute force → Optimize.",
          answer: "Don't panic. Ask clarifying questions, write a concrete example, propose the brute-force O(n²) solution first, then optimize. Thinking out loud shows your process.",
          code: "// Mental Framework:\n// 1. Clarify: 'Can the array be empty? Can values be negative?'\n// 2. Example: Input=[2,7,11,15], target=9 → Output=[0,1]\n// 3. Brute: Nested loops O(n²)\n//    for i: for j>i: if a[i]+a[j]==target return [i,j]\n// 4. Optimize: Use HashMap to get O(n)\n//    complement = target - a[i]; if in map → done",
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p7-4",
          q: "Explain the Temporal Dead Zone out loud.",
          hint: "TDZ: let/const exist but are inaccessible before their line.",
          answer: "Practice saying: 'The TDZ is the period where a let/const variable exists in memory but cannot be accessed until the interpreter reaches its declaration line. Accessing it before that throws a ReferenceError.'",
          code: "// Demonstrate TDZ for practice:\n{\n  // TDZ starts for 'x' here\n  // console.log(x); // ReferenceError if uncommented\n  let x = 10;       // TDZ ends here\n  console.log(x);   // 10 - accessible now\n}\n// x is not accessible here either (block scope)",
          category: "Interview Prep",
          language: "javascript"
        },
        {
          id: "lf-p7-5",
          q: "Explain Closures out loud.",
          hint: "A function that remembers its outer scope.",
          answer: "Practice saying: 'A closure is when an inner function retains access to variables from its outer function, even after the outer function has returned. I use them to create private state.'",
          code: "// Classic closure: private counter\nfunction createBankAccount(initialBalance) {\n  let balance = initialBalance; // private!\n  return {\n    deposit(amount) { balance += amount; },\n    withdraw(amount) { balance -= amount; },\n    getBalance() { return balance; }\n  };\n}\nconst acct = createBankAccount(100);\nacct.deposit(50);\nconsole.log(acct.getBalance()); // 150\n// balance is never directly accessible from outside",
          category: "Interview Prep",
          language: "javascript"
        },
        {
          id: "lf-p7-6",
          q: "Explain the Event Loop out loud.",
          hint: "Call Stack + Microtask Queue + Macrotask Queue.",
          answer: "Practice: 'JS is single-threaded. The Event Loop monitors the Call Stack. When it's empty, it first drains the Microtask queue (Promises), then takes one task from the Macrotask queue (setTimeout) and runs it.'",
          code: "// Visualize the Event Loop:\n// Call Stack: [greet()]\n// WebAPIs: [setTimeout 0ms]\n// After greet() finishes...\n// Microtask Q: [Promise.then callback]\n// Macrotask Q: [setTimeout callback]\n\n// Order: Call Stack → Microtask → Macrotask\nconsole.log('sync 1');                           // Stack\nPromise.resolve().then(() => console.log('micro')); // Microtask\nsetTimeout(() => console.log('macro'), 0);         // Macrotask\nconsole.log('sync 2');                           // Stack",
          category: "Interview Prep",
          language: "javascript"
        },
        {
          id: "lf-p7-7",
          q: "What is the time complexity of Array `splice()`?",
          hint: "O(n) due to shifting elements.",
          answer: "O(n). When you splice, all elements after the insertion/deletion point must be shifted. For large arrays, this is expensive.",
          code: "const arr = [1, 2, 3, 4, 5];\n\n// Worst case: splice at index 0 requires shifting ALL elements\narr.splice(0, 1); // O(n) — shifts [2,3,4,5] forward\n\n// Best case: splice at end is O(1)\narr.splice(arr.length - 1, 1);\n\n// Contrast with pop() which is always O(1):\narr.pop(); // O(1)",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p7-8",
          q: "Two Pointers technique: When to use?",
          hint: "Sorted arrays, pairs, palindromes.",
          answer: "Use Two Pointers when working with sorted arrays (searching pairs that sum to a target) or comparing elements from both ends of a structure (palindromes, container with most water).",
          code: "// Two Sum II (sorted array) - O(n) time, O(1) space\nfunction twoSumSorted(numbers, target) {\n  let left = 0, right = numbers.length - 1;\n  while (left < right) {\n    const sum = numbers[left] + numbers[right];\n    if (sum === target) return [left + 1, right + 1];\n    if (sum < target) left++;\n    else right--;\n  }\n}\nconsole.log(twoSumSorted([2,7,11,15], 9)); // [1, 2]",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p7-9",
          q: "Sliding Window technique: When to use?",
          hint: "Contiguous sub-arrays or sub-strings.",
          answer: "Sliding Window is ideal for finding the longest, shortest, or max-sum contiguous sub-array or sub-string. It reduces O(n²) nested loops to O(n).",
          code: "// Max sum subarray of size k - O(n)\nfunction maxSumSubarray(arr, k) {\n  let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);\n  let maxSum = windowSum;\n  for (let i = k; i < arr.length; i++) {\n    windowSum += arr[i] - arr[i - k]; // slide: add right, remove left\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  return maxSum;\n}\nconsole.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p7-10",
          q: "Best way to handle getting stuck on a coding test?",
          hint: "Communicate your thinking.",
          answer: "Never go silent. Verbalize: 'I know a brute-force O(n²) approach. I think we can optimize with a Hash Map to reduce it to O(n). Let me think through this…' Interviewers want to guide you.",
          code: "// Script for getting stuck:\n// 1. State what you know:\n//    'I know the brute force would be nested loops O(n²).'\n// 2. Think out loud:\n//    'If the array were sorted, I could use two pointers...'\n// 3. Ask for a hint gracefully:\n//    'Am I on the right track with the HashMap approach?'\n// 4. Never: sit in silence for 5+ minutes.",
          category: "Behavioral",
          language: "javascript"
        }
      ];
    case 8:
      return [
        {
          id: "lf-p8-1",
          q: "Best Time to Buy and Sell Stock: Optimal Strategy?",
          hint: "Track the minimum price seen so far.",
          answer: "Single pass. At each price, calculate the potential profit if sold today (price - minPrice). Update maxProfit. Update minPrice.",
          code: "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (const price of prices) {\n    minPrice = Math.min(minPrice, price);\n    maxProfit = Math.max(maxProfit, price - minPrice);\n  }\n  return maxProfit;\n}\nconsole.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (buy at 1, sell at 6)",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p8-2",
          q: "What is Space Complexity?",
          hint: "Memory usage relative to input size.",
          answer: "Space complexity measures the amount of extra/auxiliary memory an algorithm uses relative to the input size. O(1) = constant; O(n) = proportional to input.",
          code: "// O(1) space: only using fixed variables\nfunction sumArray(arr) {\n  let total = 0; // one variable regardless of array size\n  for (const n of arr) total += n;\n  return total;\n}\n\n// O(n) space: creating a new array of same size\nfunction doubleArray(arr) {\n  return arr.map(n => n * 2); // new array of size n\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p8-3",
          q: "How to write a recursive deep clone function?",
          hint: "Handle null, arrays, and objects separately.",
          answer: "Base case: if null or not an object, return as-is. For arrays, map recursively. For objects, reduce over keys and recursively clone values.",
          code: "function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (Array.isArray(obj)) return obj.map(deepClone);\n  const clone = {};\n  for (const key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      clone[key] = deepClone(obj[key]);\n    }\n  }\n  return clone;\n}\nconst orig = { a: 1, b: { c: [2, 3] } };\nconst copy = deepClone(orig);\ncopy.b.c.push(99);\nconsole.log(orig.b.c); // [2, 3] (unchanged!)",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p8-4",
          q: "What happens if a recursive clone encounters a circular reference?",
          hint: "Stack Overflow — prevent with a WeakMap.",
          answer: "Without a guard, it'll loop infinitely and throw 'Maximum call stack size exceeded'. Fix it by tracking visited objects in a WeakMap.",
          code: "function deepCloneSafe(obj, seen = new WeakMap()) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (seen.has(obj)) return seen.get(obj); // break cycle\n  const clone = Array.isArray(obj) ? [] : {};\n  seen.set(obj, clone);\n  for (const key of Object.keys(obj)) {\n    clone[key] = deepCloneSafe(obj[key], seen);\n  }\n  return clone;\n}\n// Works with circular refs:\nconst a = { name: 'a' }; a.self = a;\nconsole.log(deepCloneSafe(a).name); // 'a' (no stack overflow!)",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p8-5",
          q: "Product of Array Except Self: O(n) without division?",
          hint: "Left-pass then right-pass.",
          answer: "Two passes: left-to-right storing left products, right-to-left multiplying by right products.",
          code: "function productExceptSelf(nums) {\n  const n = nums.length;\n  const result = new Array(n).fill(1);\n  // Left pass: result[i] = product of all elements to the LEFT\n  let left = 1;\n  for (let i = 0; i < n; i++) {\n    result[i] = left;\n    left *= nums[i];\n  }\n  // Right pass: multiply by product of all to the RIGHT\n  let right = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    result[i] *= right;\n    right *= nums[i];\n  }\n  return result;\n}\nconsole.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p8-6",
          q: "In HackerRank environments, how is input usually handled?",
          hint: "Read from stdin, write to stdout.",
          answer: "You read raw text from stdin, parse it into arrays/numbers, and write results with `console.log()`. Modern HackerRank templates often pre-parse inputs for you.",
          code: "// HackerRank typical stdin pattern:\nprocess.stdin.resume();\nprocess.stdin.setEncoding('utf-8');\nlet inputData = '';\nprocess.stdin.on('data', data => inputData += data);\nprocess.stdin.on('end', () => {\n  const lines = inputData.trim().split('\\n');\n  const n = parseInt(lines[0]);\n  const arr = lines[1].split(' ').map(Number);\n  // Your solution:\n  console.log(arr.reduce((a, b) => a + b, 0));\n});",
          category: "Platform Specific",
          language: "javascript"
        },
        {
          id: "lf-p8-7",
          q: "Explain Big O Notation simply.",
          hint: "How runtime scales with input size.",
          answer: "Big O describes how the time or space an algorithm needs grows as the input size (n) increases toward infinity. We care about the dominant term.",
          code: "// O(1) - constant: array access\nconst getFirst = arr => arr[0];\n\n// O(log n) - logarithmic: binary search\n// O(n)   - linear: single loop\nconst sumAll = arr => arr.reduce((a, b) => a + b, 0);\n\n// O(n log n) - linearithmic: sort\nconst sorted = arr => [...arr].sort((a, b) => a - b);\n\n// O(n²) - quadratic: nested loops\nconst pairs = arr => arr.flatMap((a, i) => arr.slice(i+1).map(b => [a,b]));",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p8-8",
          q: "What is an 'in-place' algorithm?",
          hint: "Modifies input directly; O(1) auxiliary space.",
          answer: "An in-place algorithm transforms data using only O(1) extra memory — it modifies the input structure directly rather than creating a copy.",
          code: "// In-place: O(1) space — modifies original\nfunction reverseInPlace(arr) {\n  let left = 0, right = arr.length - 1;\n  while (left < right) {\n    [arr[left], arr[right]] = [arr[right], arr[left]];\n    left++; right--;\n  }\n  return arr;\n}\n\n// NOT in-place: O(n) space — creates new array\nconst reverseNew = arr => [...arr].reverse();",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p8-9",
          q: "How do you find the frequency of all elements in an array?",
          hint: "reduce() to build a frequency object.",
          answer: "Use `reduce()` to build an object where keys are elements and values are their counts.",
          code: "const arr = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];\n\nconst freq = arr.reduce((acc, val) => {\n  acc[val] = (acc[val] || 0) + 1;\n  return acc;\n}, {});\n\nconsole.log(freq);\n// { apple: 3, banana: 2, cherry: 1 }\n\n// Or with Map:\nconst map = new Map();\nfor (const item of arr) map.set(item, (map.get(item) || 0) + 1);",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p8-10",
          q: "What does `Math.floor()` do?",
          hint: "Always rounds down to the nearest integer.",
          answer: "Returns the largest integer less than or equal to a number. Essential for finding the midpoint in Binary Search.",
          code: "console.log(Math.floor(4.9));  // 4\nconsole.log(Math.floor(4.1));  // 4\nconsole.log(Math.floor(-4.1)); // -5 (rounds down, not toward 0!)\n\n// Binary search midpoint:\nconst mid = Math.floor((left + right) / 2);\n// For large numbers, use: left + Math.floor((right - left) / 2)\n// to avoid integer overflow",
          category: "JS Theory",
          language: "javascript"
        }
      ];
    case 9:
      return [
        {
          id: "lf-p9-1",
          q: "Sales by Match (Sock Merchant): Optimal approach?",
          hint: "Frequency map, then floor(count/2).",
          answer: "Build a frequency map of sock colors. For each color, `Math.floor(count / 2)` gives the number of pairs.",
          code: "function sockMerchant(n, ar) {\n  const freq = {};\n  for (const sock of ar) freq[sock] = (freq[sock] || 0) + 1;\n  return Object.values(freq).reduce((pairs, count) =>\n    pairs + Math.floor(count / 2), 0);\n}\nconsole.log(sockMerchant(9, [10,20,20,10,10,30,50,10,20])); // 3",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p9-2",
          q: "Counting Valleys: Strategy?",
          hint: "Track altitude; valley ends stepping UP to 0.",
          answer: "Maintain an altitude counter (+1 for U, -1 for D). A valley completes when you step UP ('U') and altitude becomes exactly 0.",
          code: "function countingValleys(steps, path) {\n  let altitude = 0, valleys = 0;\n  for (const step of path) {\n    if (step === 'U') altitude++;\n    else altitude--;\n    if (step === 'U' && altitude === 0) valleys++;\n  }\n  return valleys;\n}\nconsole.log(countingValleys(8, 'UDDDUDUU')); // 1",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p9-3",
          q: "Sliding Window: How to handle shrinking the window?",
          hint: "while loop inside the for loop.",
          answer: "Use a `while` loop inside the `for` loop. While the window condition is violated, remove the leftmost element and advance the left pointer.",
          code: "// Longest substring with at most K distinct characters\nfunction longestWithKDistinct(s, k) {\n  const freq = {};\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    freq[s[right]] = (freq[s[right]] || 0) + 1;\n    // Shrink if more than k distinct chars\n    while (Object.keys(freq).length > k) {\n      freq[s[left]]--;\n      if (freq[s[left]] === 0) delete freq[s[left]];\n      left++;\n    }\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p9-4",
          q: "Minimum Size Subarray Sum: Strategy?",
          hint: "Sliding window; shrink while valid.",
          answer: "Expand by adding elements. While current sum >= target, record the window size (update minimum), subtract the left element, and advance left.",
          code: "function minSubArrayLen(target, nums) {\n  let left = 0, sum = 0;\n  let minLen = Infinity;\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) {\n      minLen = Math.min(minLen, right - left + 1);\n      sum -= nums[left];\n      left++;\n    }\n  }\n  return minLen === Infinity ? 0 : minLen;\n}\nconsole.log(minSubArrayLen(7, [2,3,1,2,4,3])); // 2 ([4,3])",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p9-5",
          q: "Longest Repeating Character Replacement: Strategy?",
          hint: "Track max frequency char; shrink if window is invalid.",
          answer: "Maintain frequency map. Window is valid if `windowSize - maxFreq <= k`. If invalid, shrink from left. Track max window size.",
          code: "function characterReplacement(s, k) {\n  const freq = {};\n  let left = 0, maxFreq = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    freq[s[right]] = (freq[s[right]] || 0) + 1;\n    maxFreq = Math.max(maxFreq, freq[s[right]]);\n    // Invalid window: chars to replace > k\n    if ((right - left + 1) - maxFreq > k) {\n      freq[s[left]]--;\n      left++;\n    }\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p9-6",
          q: "What is `Object.entries()`?",
          hint: "Returns [key, value] pairs as an array.",
          answer: "Returns an array of `[key, value]` pairs from an object's own enumerable properties. Useful for iterating over objects.",
          code: "const scores = { Alice: 95, Bob: 87, Charlie: 92 };\n\n// Object.entries for iteration:\nfor (const [name, score] of Object.entries(scores)) {\n  console.log(`${name}: ${score}`);\n}\n\n// Convert object to sorted array:\nconst sorted = Object.entries(scores)\n  .sort(([,a], [,b]) => b - a);\nconsole.log(sorted); // [['Alice',95],['Charlie',92],['Bob',87]]",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p9-7",
          q: "How to easily loop over a string's characters?",
          hint: "for...of or spread operator.",
          answer: "Strings are iterable in JS. Use `for...of` to get each character directly, without splitting.",
          code: "const str = 'hello';\n\n// for...of (cleanest)\nfor (const char of str) {\n  console.log(char); // h, e, l, l, o\n}\n\n// Spread into array:\nconst chars = [...str]; // ['h','e','l','l','o']\n\n// Traditional:\nfor (let i = 0; i < str.length; i++) {\n  console.log(str[i]);\n}",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p9-8",
          q: "What happens if you slice an array with out-of-bounds indices?",
          hint: "No error — JS clamps the index.",
          answer: "`slice()` is forgiving. If start > length, it returns `[]`. If end > length, it extracts through the end of the array.",
          code: "const arr = [1, 2, 3];\n\nconsole.log(arr.slice(0, 10));  // [1, 2, 3] (end clamped)\nconsole.log(arr.slice(5, 10));  // [] (start past end)\nconsole.log(arr.slice(-2));     // [2, 3] (negative = from end)\nconsole.log(arr.slice(-1));     // [3] (last element)",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p9-9",
          q: "In HackerRank, how do you parse multi-line input?",
          hint: "Split on newline ('\\n').",
          answer: "Split the input string by '\\n' to get an array of lines. Each line can then be further split and parsed as needed.",
          code: "// Typical HackerRank input parsing:\nfunction processInput(inputString) {\n  const lines = inputString.trim().split('\\n');\n  const n = parseInt(lines[0]);             // first line: count\n  const arr = lines[1].split(' ').map(Number); // second: space-separated nums\n  return { n, arr };\n}\n\nconst { n, arr } = processInput('5\\n1 2 3 4 5');\nconsole.log(n, arr); // 5 [1, 2, 3, 4, 5]",
          category: "Platform Specific",
          language: "javascript"
        },
        {
          id: "lf-p9-10",
          q: "Difference between `substring()` and `slice()` for strings?",
          hint: "Negative indices behave differently.",
          answer: "`slice()` supports negative indices (counting from end). `substring()` treats negatives as 0 and also swaps start/end if start > end.",
          code: "const str = 'Hello World';\n\n// slice: negative index counts from end\nconsole.log(str.slice(-5));      // 'World'\nconsole.log(str.slice(0, 5));    // 'Hello'\n\n// substring: negative treated as 0\nconsole.log(str.substring(-5));  // 'Hello World' (same as substring(0))\nconsole.log(str.substring(6, 11)); // 'World'",
          category: "JS Theory",
          language: "javascript"
        }
      ];
    case 10:
      return [
        {
          id: "lf-p10-1",
          q: "Top K Frequent Elements: Basic approach?",
          hint: "Frequency Map + sort by frequency.",
          answer: "Build a frequency map. Extract keys, sort them by their frequency (descending), return the first K.",
          code: "function topKFrequent(nums, k) {\n  const freq = {};\n  for (const n of nums) freq[n] = (freq[n] || 0) + 1;\n  return Object.keys(freq)\n    .sort((a, b) => freq[b] - freq[a])\n    .slice(0, k)\n    .map(Number);\n}\nconsole.log(topKFrequent([1,1,1,2,2,3], 2)); // [1, 2]",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p10-2",
          q: "Top K Frequent Elements: O(n) Bucket Sort approach?",
          hint: "Array index = frequency.",
          answer: "Create an array of `n+1` buckets (index = frequency). Place elements in their frequency bucket. Iterate buckets from highest to lowest to collect top K.",
          code: "function topKFrequentBucket(nums, k) {\n  const freq = {};\n  for (const n of nums) freq[n] = (freq[n] || 0) + 1;\n  const buckets = Array.from({ length: nums.length + 1 }, () => []);\n  for (const [num, count] of Object.entries(freq)) {\n    buckets[count].push(Number(num));\n  }\n  const result = [];\n  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {\n    result.push(...buckets[i]);\n  }\n  return result.slice(0, k);\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p10-3",
          q: "Ransom Note: Optimal strategy?",
          hint: "Magazine frequency map, decrement for note.",
          answer: "Count available letters from the magazine. For each letter in the note, decrement. If any count goes to 0 (or the letter is missing), return false.",
          code: "function canConstruct(ransomNote, magazine) {\n  const freq = {};\n  for (const ch of magazine) freq[ch] = (freq[ch] || 0) + 1;\n  for (const ch of ransomNote) {\n    if (!freq[ch]) return false;\n    freq[ch]--;\n  }\n  return true;\n}\nconsole.log(canConstruct('aa', 'aab')); // true\nconsole.log(canConstruct('aa', 'ab'));  // false",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p10-4",
          q: "First Unique Character in a String: Strategy?",
          hint: "Build frequency map, find first with count === 1.",
          answer: "First pass: build frequency map. Second pass: return the index of the first character with count === 1.",
          code: "function firstUniqChar(s) {\n  const freq = {};\n  for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;\n  for (let i = 0; i < s.length; i++) {\n    if (freq[s[i]] === 1) return i;\n  }\n  return -1;\n}\nconsole.log(firstUniqChar('leetcode')); // 0 ('l')\nconsole.log(firstUniqChar('aabb'));     // -1",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p10-5",
          q: "Intersection of Two Arrays: Strategy?",
          hint: "Set for O(1) lookups.",
          answer: "Convert the first array to a Set. Filter the second array keeping only elements in the Set. Wrap in another Set to remove duplicates.",
          code: "function intersection(nums1, nums2) {\n  const set1 = new Set(nums1);\n  return [...new Set(nums2.filter(n => set1.has(n)))];\n}\nconsole.log(intersection([4,9,5], [9,4,9,8,4])); // [9, 4]",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p10-6",
          q: "What is a `Map` in JavaScript?",
          hint: "Key-value pairs with insertion order, any key type.",
          answer: "A `Map` holds key-value pairs, preserves insertion order, and allows any type as a key (including objects and arrays), unlike a plain object.",
          code: "const map = new Map();\nmap.set('name', 'Alice');\nmap.set(42, 'the answer');\nmap.set({ id: 1 }, 'an object key');\n\nconsole.log(map.get('name')); // 'Alice'\nconsole.log(map.get(42));     // 'the answer'\nconsole.log(map.size);        // 3\n\n// Iteration maintains insertion order:\nfor (const [k, v] of map) console.log(k, v);",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p10-7",
          q: "How to iterate over a `Map`?",
          hint: "for...of with entries().",
          answer: "Use `for...of` over `map.entries()`, `map.keys()`, or `map.values()`. Or use the `forEach` method.",
          code: "const map = new Map([['a', 1], ['b', 2], ['c', 3]]);\n\n// Destructured key-value pairs:\nfor (const [key, value] of map) {\n  console.log(key, value);\n}\n\n// Just values:\nfor (const val of map.values()) console.log(val);\n\n// forEach:\nmap.forEach((value, key) => console.log(key, value));",
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p10-8",
          q: "When to use a `Set` instead of a `Map`?",
          hint: "Unique values vs key-value pairs.",
          answer: "Use a `Set` when you only need unique values (visited nodes, deduplication). Use a `Map` when each element needs an associated value (frequency counts, cache).",
          code: "// Set: just unique items\nconst visited = new Set();\nvisited.add('nodeA');\nif (!visited.has('nodeB')) visited.add('nodeB');\n\n// Map: key-value association\nconst cache = new Map();\ncache.set('userId_1', { name: 'Alice', age: 25 });\nconst user = cache.get('userId_1');\n\n// Remove duplicates from array:\nconst unique = [...new Set([1, 2, 2, 3, 3])]; // [1, 2, 3]",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p10-9",
          q: "Is Hash Map lookup always O(1)?",
          hint: "O(1) average, O(n) worst case (hash collisions).",
          answer: "Average O(1), worst O(n). In rare cases with many hash collisions (all keys hash to the same bucket), lookups degrade to O(n). Modern implementations minimize this with good hash functions.",
          code: "// Normal O(1):\nconst map = new Map();\nmap.set('key', 'value');\nconsole.log(map.get('key')); // O(1) average\n\n// Hash collision example (hypothetical):\n// If hash('a') === hash('b') === hash('c'),\n// all go to bucket 0 → lookup becomes a linear scan.\n\n// In practice: JS engines guarantee good distribution.\n// For interviews: always say 'O(1) amortized/average'.",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p10-10",
          q: "Find the Majority Element (> n/2 times): O(n) Time, O(1) Space?",
          hint: "Boyer-Moore Voting Algorithm.",
          answer: "Keep a candidate and count. If count is 0, update candidate. If current element equals candidate, increment count, else decrement. The final candidate is the majority element.",
          code: "function majorityElement(nums) {\n  let candidate = null, count = 0;\n  for (const num of nums) {\n    if (count === 0) candidate = num;\n    count += (num === candidate) ? 1 : -1;\n  }\n  return candidate;\n}\nconsole.log(majorityElement([3, 2, 3]));     // 3\nconsole.log(majorityElement([2,2,1,1,1,2,2])); // 2",
          category: "DSA",
          language: "javascript"
        }
      ];
    default:
      return [];
  }
}
