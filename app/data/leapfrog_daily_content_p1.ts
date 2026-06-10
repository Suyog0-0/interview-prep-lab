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
          code: `// Log 'x' before init: Throws ReferenceError (TDZ)
console.log(x); // ReferenceError: Cannot access 'x' before initialization

// Init 'x' with 5. TDZ ends.
let x = 5;

// Now it works.
console.log(x); // 5`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p1-2",
          q: "Explain Hoisting in JavaScript.",
          hint: "Moving declarations to the top.",
          answer: "Hoisting moves variable and function declarations to the top of their scope before execution. `var` is initialized with `undefined`. `let`/`const` are hoisted but stay in the TDZ until their line.",
          code: `// 'var' is hoisted and initialized to undefined
console.log(a); // undefined
var a = 10;

// 'let' is in TDZ until declaration
// console.log(b); // ReferenceError
let b = 20;

// Function declarations are fully hoisted
greet(); // 'Hello!'

function greet() { 
  console.log('Hello!'); 
}`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p1-3",
          q: "What is the difference between `let`, `var`, and `const`?",
          hint: "Scope and reassignment.",
          answer: "`var` is function-scoped and hoisted with `undefined`. `let` is block-scoped and can be reassigned. `const` is block-scoped and cannot be reassigned (though object properties can be mutated).",
          code: `var x = 1; var x = 2; // 'var' allows redeclaration
let y = 1; y = 2;     // 'let' allows reassignment
// let y = 3;         // Error: 'let' cannot be redeclared

const z = { a: 1 };
z.a = 99;             // OK: 'const' allows object mutation
// z = {};            // Error: 'const' cannot be reassigned`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p1-4",
          q: "How do you reverse a string in JavaScript?",
          hint: "Split, reverse, join.",
          answer: "Strings are immutable and have no `.reverse()` method. Convert to array, reverse the array, then join back.",
          code: `const str = 'hello';

// Split to array, reverse array, join back to string
const reversed = str.split('').reverse().join('');

console.log(reversed); // 'olleh'`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p1-5",
          q: "How do you check if a string is a palindrome?",
          hint: "Compare it to its reversed version.",
          answer: "A palindrome reads the same forwards and backwards. Reverse the string and compare to the original.",
          code: `function isPalindrome(str) {
  // Remove non-alphanumeric chars and convert to lowercase
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Compare string with its reversed self
  return cleaned === cleaned.split('').reverse().join('');
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello'));   // false`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p1-6",
          q: "Two Sum: What is the optimal O(n) approach?",
          hint: "Use a Hash Map.",
          answer: "Iterate once. For each element, check if its complement (`target - element`) exists in a Map. If yes, return indices. If not, store the element.",
          code: `function twoSum(nums, target) {
  const map = new Map(); // Store seen numbers and indices
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    // If complement exists in map, return indices
    if (map.has(complement)) return [map.get(complement), i];
    
    // Otherwise store the current number
    map.set(nums[i], i);
  }
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p1-7",
          q: "Valid Anagram: How do you solve it in O(n) time?",
          hint: "Use a frequency map.",
          answer: "Build a frequency map from the first string. Decrement for the second string. If any count goes negative, or string lengths differ, they are not anagrams.",
          code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  
  const freq = {};
  
  // Count character frequencies of first string
  for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;
  
  // Decrement counts for second string
  for (const ch of t) {
    if (!freq[ch]) return false; // Extra or mismatched char
    freq[ch]--;
  }
  
  return true;
}

console.log(isAnagram('anagram', 'nagaram')); // true`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p1-8",
          q: "Why does `typeof null` return 'object'?",
          hint: "A historical bug in JavaScript.",
          answer: "It is a legacy bug from JS v1. Values were 32-bit; objects had a type tag of 000. `null` (the NULL pointer) was all zeros, so it matched the object type tag. It was never fixed to avoid breaking existing code.",
          code: `// Legacy JS bug: null is evaluated as an object
console.log(typeof null);       // 'object' (bug!)

console.log(typeof undefined);  // 'undefined'
console.log(typeof {});         // 'object'

// Safe check using strict equality
const val = null;
console.log(val === null);      // true`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p1-9",
          q: "What is strict mode (`'use strict'`)?",
          hint: "Opt-in restricted variant of JavaScript.",
          answer: "Strict mode prevents sloppy JS patterns: assigning to undeclared variables throws an error, `this` is undefined in functions (not global), and reserved words can't be used as variable names.",
          code: `'use strict'; // Enforce strict mode

// x = 10; // ReferenceError: prevents global pollution

function show() {
  'use strict';
  
  // 'this' is undefined in strict mode (not global window)
  console.log(this); 
}

show();`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p1-10",
          q: "How do you swap two variables without a temporary variable?",
          hint: "Array destructuring.",
          answer: "ES6 array destructuring lets you swap values in a single, elegant line.",
          code: `let a = 1, b = 2;

// Swap using ES6 array destructuring
[a, b] = [b, a];

console.log(a, b); // 2 1

// Old way: let temp = a; a = b; b = temp;`,
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
          code: `function makeCounter() {
  let count = 0; // Private closure variable
  
  return {
    increment: () => ++count, // Accesses private count
    getCount: () => count
  };
}

const counter = makeCounter();
counter.increment(); 
counter.increment();

console.log(counter.getCount()); // 2`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-2",
          q: "What are Arrow Functions and how do they handle `this`?",
          hint: "Shorter syntax, lexical `this`.",
          answer: "Arrow functions have concise syntax and do NOT have their own `this`. They inherit `this` from the surrounding lexical scope at definition time.",
          code: `const obj = {
  name: 'Alice',
  // Regular function binds 'this' to caller (obj)
  greetRegular: function() { return this.name; },
  // Arrow function inherits 'this' from lexical scope
  greetArrow: () => 'no own this'
};

console.log(obj.greetRegular()); // 'Alice'
console.log(obj.greetArrow());   // 'no own this'`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-3",
          q: "Explain `call()`, `apply()`, and `bind()`.",
          hint: "Ways to explicitly set `this`.",
          answer: "`call()` invokes a function immediately with a given `this` and individual args. `apply()` is the same but takes args as an array. `bind()` returns a new function with `this` permanently bound.",
          code: `function greet(greeting, punctuation) {
  return \`\${greeting}, \${this.name}\${punctuation}\`;
}

const user = { name: 'Alice' };

// call: invoke instantly with comma-separated args
console.log(greet.call(user, 'Hi', '!'));      // 'Hi, Alice!'

// apply: invoke instantly with array of args
console.log(greet.apply(user, ['Hi', '!']));  // 'Hi, Alice!'

// bind: returns a new function with locked 'this'
const boundGreet = greet.bind(user, 'Hello');
console.log(boundGreet('.')); // 'Hello, Alice.'`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-4",
          q: "What is the `arguments` object?",
          hint: "Array-like object of passed arguments.",
          answer: "The `arguments` object is an array-like object accessible inside regular functions containing all passed arguments. Arrow functions do NOT have `arguments`.",
          code: `function sum() {
  let total = 0;
  // 'arguments' is an array-like object of passed params
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(sum(1, 2, 3, 4)); // 10

// Modern ES6 approach uses rest parameters
const sumRest = (...args) => args.reduce((a, b) => a + b, 0);`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-5",
          q: "Contains Duplicate: Optimal O(n) solution?",
          hint: "Use a Set.",
          answer: "Add all elements to a `Set`. A Set only stores unique values, so if its size is smaller than the array length, duplicates were removed.",
          code: `function containsDuplicate(nums) {
  // Sets only store unique values. Compare sizes.
  return new Set(nums).size !== nums.length;
}

console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3]));    // false`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p2-6",
          q: "How do you find the longest word in a string?",
          hint: "Split and reduce.",
          answer: "Split the string into words, then use `reduce()` to compare lengths and keep the longest.",
          code: `function longestWord(str) {
  // Split words, reduce to find longest string
  return str.split(' ').reduce((longest, word) =>
    word.length > longest.length ? word : longest, '');
}

console.log(longestWord('The quick brown fox')); // 'quick'`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p2-7",
          q: "Explain lexical scoping.",
          hint: "Scope determined by where code is written.",
          answer: "Lexical scope means a function's access to variables is determined by where it is written in the source code, not by where it's called from.",
          code: `const outer = 'I am outer';

function outer_fn() {
  const inner = 'I am inner';
  
  function inner_fn() {
    // Lexical scope allows access to outer scopes
    console.log(outer); 
    console.log(inner); 
  }
  
  inner_fn();
}

outer_fn();`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-8",
          q: "What does it mean that functions are 'first-class citizens' in JS?",
          hint: "They can be treated like any other variable.",
          answer: "Functions can be assigned to variables, passed as arguments, and returned from other functions — just like any other value.",
          code: `// Assign function to a variable
const greet = function(name) { return \`Hello, \${name}\`; };

// Pass function as an argument (higher-order)
[1, 2, 3].map(n => n * 2); 

// Return a function to create a closure
function multiplier(factor) {
  return (num) => num * factor;
}

const double = multiplier(2);
console.log(double(5)); // 10`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p2-9",
          q: "Group Anagrams: Optimal approach?",
          hint: "Sort string as Map key.",
          answer: "For each word, sort its characters to create a unique key. Words sharing the same sorted key are anagrams of each other. Group them in a Map.",
          code: `function groupAnagrams(strs) {
  const map = {};
  
  for (const str of strs) {
    // Sort chars to use as a unique hash key
    const key = str.split('').sort().join('');
    
    if (!map[key]) map[key] = [];
    map[key].push(str); // Group anagrams together
  }
  
  return Object.values(map);
}

console.log(groupAnagrams(['eat','tea','tan','ate','nat','bat']));`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p2-10",
          q: "What is an Immediately Invoked Function Expression (IIFE)?",
          hint: "Runs as soon as it is defined.",
          answer: "An IIFE is a function that runs the moment it's defined. Used to create a private scope and avoid polluting the global namespace.",
          code: `// IIFE executes instantly, creating a private scope
const result = (function() {
  const privateVar = 'secret'; // Hidden from outside
  return { getSecret: () => privateVar };
})();

console.log(result.getSecret()); // 'secret'
// console.log(privateVar); // ReferenceError`,
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
          code: `const nums = [1, 2, 3];
// map: transforms every element, returns NEW array
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
console.log(nums);    // [1, 2, 3] (original unchanged)

// Practical: extract object properties
const users = [{id:1, name:'Alice'}, {id:2, name:'Bob'}];
const names = users.map(u => u.name); // ['Alice', 'Bob']`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p3-2",
          q: "What does `Array.prototype.reduce()` do?",
          hint: "Accumulates all elements to a single value.",
          answer: "It runs a reducer function on each element, passing the result forward, ultimately producing a single output value.",
          code: `const nums = [1, 2, 3, 4];
// reduce: collapses array to one value
const sum = nums.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 10

// Count character frequencies
const chars = ['a', 'b', 'a', 'c', 'b', 'a'];
const freq = chars.reduce((acc, ch) => {
  acc[ch] = (acc[ch] || 0) + 1;
  return acc;
}, {});
console.log(freq); // { a: 3, b: 2, c: 1 }`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p3-3",
          q: "How do you implement a custom `map()` function?",
          hint: "Create array, loop, push result.",
          answer: "Attach to Array.prototype. Loop over `this`, call the callback on each element with its index and the array, push results to a new array, and return it.",
          code: `// Extend Array.prototype with a custom map
Array.prototype.myMap = function(cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    // Call the callback with (element, index, array)
    res.push(cb(this[i], i, this));
  }
  return res;
};

console.log([1, 2, 3].myMap(x => x * 10)); // [10, 20, 30]`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p3-4",
          q: "How do you shallow copy an object?",
          hint: "Spread or Object.assign.",
          answer: "The spread operator `{ ...obj }` or `Object.assign({}, obj)` copies top-level properties. Nested objects still share the same reference.",
          code: `const original = { a: 1, b: { c: 2 } };
// Spread: copies top-level only (shallow)
const shallow = { ...original };

shallow.a = 99;    // Primitive copied, no effect on original
shallow.b.c = 99;  // Object is shared ref! Affects original

console.log(original.a);   // 1 (unchanged)
console.log(original.b.c); // 99 (shared ref!)`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p3-5",
          q: "How do you deep copy an object?",
          hint: "structuredClone or JSON methods.",
          answer: "Use `structuredClone(obj)` (modern). Or `JSON.parse(JSON.stringify(obj))` (but it strips functions, undefined, and Dates become strings).",
          code: `const obj = { a: 1, b: { c: 2 } };

// structuredClone: modern deep copy
const deep1 = structuredClone(obj);
deep1.b.c = 99;
console.log(obj.b.c); // 2 (truly independent!)

// JSON trick: loses functions and undefined values
const deep2 = JSON.parse(JSON.stringify(obj));`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p3-6",
          q: "What is the time complexity of Binary Search?",
          hint: "Halves the search space each step.",
          answer: "O(log n). Each iteration halves the remaining search space, so it takes at most log₂(n) steps.",
          code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid; // Found!
    if (arr[mid] < target) left = mid + 1;  // Search right
    else right = mid - 1;                   // Search left
  }
  return -1; // Not found
}
console.log(binarySearch([1, 3, 5, 7, 9], 5)); // 2`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p3-7",
          q: "Merge Two Sorted Arrays in-place: Strategy?",
          hint: "Start from the end to avoid overwriting.",
          answer: "Use three pointers at the ends of both arrays. Compare elements from the back, placing the larger at the tail of the first array.",
          code: `function merge(nums1, m, nums2, n) {
  // Start from back to avoid overwriting unprocessed vals
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
    else nums1[k--] = nums2[j--];
  }
  // Copy any remaining elements from nums2
  while (j >= 0) nums1[k--] = nums2[j--];
}
const a = [1, 3, 5, 0, 0, 0];
merge(a, 3, [2, 4, 6], 3);
console.log(a); // [1, 2, 3, 4, 5, 6]`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p3-8",
          q: "Find Missing Number in an array of 1 to N.",
          hint: "Expected sum minus actual sum.",
          answer: "Use the math formula for the sum of first N numbers: `n*(n+1)/2`. Subtract the actual array sum to find the missing number.",
          code: `function missingNumber(nums) {
  const n = nums.length;
  // Expected sum of 0..n using Gauss formula
  const expectedSum = n * (n + 1) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum; // Difference = missing
}
console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p3-9",
          q: "Difference between `slice()` and `splice()`?",
          hint: "Non-mutating vs mutating.",
          answer: "`slice(start, end)` returns a shallow copy of a portion WITHOUT modifying the original. `splice(start, deleteCount, ...items)` modifies the array IN-PLACE and returns removed elements.",
          code: `const arr = [1, 2, 3, 4, 5];

// slice: non-destructive, returns a portion
const sliced = arr.slice(1, 3);
console.log(sliced); // [2, 3]
console.log(arr);    // [1, 2, 3, 4, 5] (unchanged)

// splice: destructive, modifies in-place
const removed = arr.splice(1, 2, 99, 100);
console.log(removed); // [2, 3] (removed elements)
console.log(arr);     // [1, 99, 100, 4, 5]`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p3-10",
          q: "How do you flatten a deeply nested array?",
          hint: "flat(Infinity) or reduce with recursion.",
          answer: "Use `arr.flat(Infinity)` natively. To build from scratch, use `reduce()` recursively.",
          code: `const nested = [1, [2, [3, [4]], 5]];

// flat(Infinity) flattens all levels
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5]

// Custom: recursive reduce
function flatten(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}
console.log(flatten(nested)); // [1, 2, 3, 4, 5]`,
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
          code: `// JS is single-threaded; Event Loop manages async tasks
console.log('1 - sync');

// setTimout callback goes to macrotask queue
setTimeout(() => console.log('4 - macrotask'), 0);

// Promise.then goes to microtask queue (higher priority)
Promise.resolve().then(() => console.log('3 - microtask'));

console.log('2 - sync');
// Output: 1, 2, 3, 4`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-2",
          q: "What are the Microtask and Macrotask queues?",
          hint: "Promises vs setTimeouts.",
          answer: "Microtask queue (Promises, queueMicrotask) has higher priority. Macrotask queue (setTimeout, setInterval) runs after. The Event Loop empties ALL microtasks before running the next macrotask.",
          code: `console.log('start');

// Macrotask: runs after all microtasks
setTimeout(() => console.log('setTimeout'), 0);

// Microtasks: run before macrotasks
Promise.resolve()
  .then(() => console.log('promise 1'))
  .then(() => console.log('promise 2'));

console.log('end');
// Output: start, end, promise 1, promise 2, setTimeout`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-3",
          q: "What are the three states of a Promise?",
          hint: "Pending, fulfilled, rejected.",
          answer: "1. Pending: initial state. 2. Fulfilled: operation completed successfully. 3. Rejected: operation failed. Once settled (fulfilled/rejected), a Promise cannot change state.",
          code: `// A Promise has 3 states: pending, fulfilled, rejected
const p = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve('data');    // transitions to fulfilled
  else reject(new Error('failed')); // transitions to rejected
});

// .then handles fulfilled, .catch handles rejected
p.then(data => console.log('Fulfilled:', data))
 .catch(err => console.log('Rejected:', err.message));`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-4",
          q: "Explain `async` and `await`.",
          hint: "Syntactic sugar for Promises.",
          answer: "`async` makes a function always return a Promise. `await` pauses execution inside the function until the Promise settles, making async code look synchronous.",
          code: `// async: makes function return a Promise
async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`); // pause here
    if (!res.ok) throw new Error('HTTP error');
    const user = await res.json(); // pause again
    return user;
  } catch (err) {
    console.error(err);
  }
}

fetchUser(1).then(user => console.log(user));`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-5",
          q: "Difference between `Promise.all` and `Promise.allSettled`?",
          hint: "Fail-fast vs wait for all.",
          answer: "`Promise.all` rejects immediately if ANY promise rejects. `Promise.allSettled` waits for all promises to finish (regardless of outcome) and returns an array of result objects.",
          code: `const p1 = Promise.resolve('a');
const p2 = Promise.reject('error!');
const p3 = Promise.resolve('c');

// Promise.all: fails fast if ANY promise rejects
Promise.all([p1, p2, p3])
  .catch(e => console.log('all failed:', e)); // 'error!'

// Promise.allSettled: waits for ALL, never rejects
Promise.allSettled([p1, p2, p3]).then(results => {
  results.forEach(r => console.log(r.status, r.value || r.reason));
});`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-6",
          q: "How do you fetch data from an API using async/await?",
          hint: "try/catch, fetch, res.ok, .json().",
          answer: "Wrap in try/catch. `fetch` only rejects on network errors, so manually check `res.ok`. Then `await res.json()` to parse the body.",
          code: `async function getData(url) {
  try {
    const res = await fetch(url);
    // fetch only rejects on network error; check .ok manually
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Fetch failed:', err.message);
    return null;
  } finally {
    console.log('fetch complete'); // Always runs
  }
}`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p4-7",
          q: "Does JS execute code in parallel?",
          hint: "Concurrency vs Parallelism.",
          answer: "Standard JS is single-threaded and uses concurrency via the Event Loop. True parallelism requires Web Workers, which run in separate threads.",
          code: `// Concurrent: both fetches start at the same time
async function concurrent() {
  const [a, b] = await Promise.all([
    fetch('/api/a'),
    fetch('/api/b')
  ]);
  return [await a.json(), await b.json()];
}

// Sequential: each fetch waits for the previous
async function sequential() {
  const a = await fetch('/api/a');
  const b = await fetch('/api/b'); // Starts after 'a' done
}`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-8",
          q: "Execution order: setTimeout(0), Promise.resolve().then, console.log?",
          hint: "Sync → Microtask → Macrotask.",
          answer: "Synchronous code runs first, then microtasks (Promises), then macrotasks (setTimeout). Output: 3, 2, 1.",
          code: `// Execution order: Sync → Microtask → Macrotask
setTimeout(() => console.log('1 - setTimeout'), 0); // Macrotask
Promise.resolve().then(() => console.log('2 - Promise')); // Microtask
console.log('3 - sync'); // Runs immediately

// Output:
// 3 - sync
// 2 - Promise
// 1 - setTimeout`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p4-9",
          q: "How to run Promises sequentially instead of concurrently?",
          hint: "for...of with await.",
          answer: "Use a `for...of` loop with `await`. Using `forEach` with async callbacks does NOT await each promise before starting the next.",
          code: `const urls = ['/api/1', '/api/2', '/api/3'];

// for...of with await runs them one at a time
async function sequential() {
  for (const url of urls) {
    const res = await fetch(url); // Waits before next
    console.log(await res.json());
  }
}

// forEach does NOT await - all fire concurrently!
// urls.forEach(async url => await fetch(url));`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p4-10",
          q: "Valid Parentheses: Strategy?",
          hint: "Use a Stack.",
          answer: "Push opening brackets onto a stack. When you see a closing bracket, pop the stack and verify it matches. The string is valid only if the stack is empty at the end.",
          code: `function isValid(s) {
  const stack = [];
  // Map closing to opening bracket
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if ('({['.includes(ch)) stack.push(ch); // Push opening
    else if (stack.pop() !== map[ch]) return false; // Check match
  }
  return stack.length === 0; // All pairs matched
}
console.log(isValid('()[]{}')); // true
console.log(isValid('(]'));     // false`,
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
          code: `// Events bubble by default (bottom-up)
document.querySelector('.parent').addEventListener('click', () => {
  console.log('parent clicked (bubbling)');
});

// Capture phase: fires top-down (3rd arg = true)
document.querySelector('.parent').addEventListener('click', () => {
  console.log('parent capturing first!');
}, true);`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p5-2",
          q: "What is Event Delegation?",
          hint: "Attach listener to parent, handle children.",
          answer: "Attach ONE event listener to a parent element to manage events for all its children, leveraging bubbling. Perfect for dynamically generated elements.",
          code: `// One listener on the parent handles all children
const list = document.querySelector('#todo-list');
list.addEventListener('click', (e) => {
  // e.target is the exact element clicked
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('done');
  }
});
// Works even for <li> elements added dynamically later`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p5-3",
          q: "Difference between `e.target` and `e.currentTarget`?",
          hint: "Who triggered it vs who caught it.",
          answer: "`e.target` is the original element that triggered the event. `e.currentTarget` is the element the event listener is attached to.",
          code: `document.querySelector('.parent').addEventListener('click', (e) => {
  // e.target: the actual clicked element
  console.log('target:', e.target.id);
  // e.currentTarget: the element with the listener
  console.log('currentTarget:', e.currentTarget.className);
});

// Clicking a child: target='child-id', currentTarget='parent'`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p5-4",
          q: "Difference between `stopPropagation()` and `preventDefault()`?",
          hint: "Bubbling vs browser's default action.",
          answer: "`stopPropagation()` stops the event from traveling further up/down the DOM. `preventDefault()` prevents the browser's default behavior (e.g. form submit, link navigation). They are independent.",
          code: `// preventDefault: stops browser default behavior
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevents page reload
  // handle form data manually
});

// stopPropagation: stops event from bubbling up
document.querySelector('.child').addEventListener('click', (e) => {
  e.stopPropagation(); // Parent listener won't fire
});`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p5-5",
          q: "How to select all elements with a class and add an event listener?",
          hint: "querySelectorAll and forEach.",
          answer: "`querySelectorAll` returns a NodeList. Use `forEach` to iterate and attach listeners.",
          code: `// querySelectorAll returns a NodeList; use forEach to iterate
document.querySelectorAll('.btn').forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    console.log(\`Button \${index} clicked\`);
    e.target.classList.toggle('active'); // Toggle class
  });
});`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p5-6",
          q: "What is the DOM?",
          hint: "Document Object Model — a tree of nodes.",
          answer: "The DOM is a programming interface representing the HTML document as a tree of nodes. JS can manipulate it to dynamically change structure, style, and content.",
          code: `// Select elements
const h1 = document.querySelector('h1');
const items = document.querySelectorAll('li'); // NodeList

// Modify content and style
h1.textContent = 'New Title';
h1.style.color = 'red';
h1.classList.add('highlight');

// Create and add new elements
const p = document.createElement('p');
p.textContent = 'New paragraph';
document.body.appendChild(p);`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p5-7",
          q: "Maximum Subarray: Kadane's Algorithm?",
          hint: "Reset running sum to 0 if negative.",
          answer: "Keep a running sum. If it goes negative, reset to 0 (starting a new subarray is better). Track the maximum sum seen at each step.",
          code: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = 0;
  for (const num of nums) {
    currentSum += num;
    maxSum = Math.max(maxSum, currentSum);
    // Reset if running sum goes negative
    if (currentSum < 0) currentSum = 0;
  }
  return maxSum;
}
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p5-8",
          q: "How do you create an HTML element and append it using JS?",
          hint: "createElement → set properties → appendChild.",
          answer: "Use `document.createElement()`, modify its properties, and use `parentElement.appendChild()` to add it to the DOM.",
          code: `// Create a new list item element
const li = document.createElement('li');
li.textContent = 'New Todo Item';
li.className = 'todo-item';
li.dataset.id = '123';

// Append to existing list in the DOM
document.querySelector('#todo-list').appendChild(li);

// Insert at a specific position:
// list.insertBefore(li, list.firstChild);`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p5-9",
          q: "What does `classList.toggle()` do?",
          hint: "Adds if missing, removes if present.",
          answer: "It toggles a CSS class on an element. Removes it if present, adds it if not. You can pass a boolean as a second argument to force-add or force-remove.",
          code: `const btn = document.querySelector('#darkModeBtn');
const body = document.body;

btn.addEventListener('click', () => {
  // Adds 'dark-mode' if absent, removes it if present
  body.classList.toggle('dark-mode');
  // Force add: .toggle('dark-mode', true)
  // Force remove: .toggle('dark-mode', false)
});`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p5-10",
          q: "Why is innerHTML potentially dangerous?",
          hint: "Cross-Site Scripting (XSS).",
          answer: "If `innerHTML` is set with unsanitized user input, an attacker can inject malicious `<script>` tags (XSS). Always use `textContent` for plain text.",
          code: `// DANGEROUS: user input could contain <script> tags (XSS)
const userInput = '<img src=x onerror="alert(1)">';
div.innerHTML = userInput; // Executes attacker code!

// SAFE: textContent displays as plain text, no execution
div.textContent = userInput;

// If HTML is truly needed, sanitize it first:
// div.innerHTML = DOMPurify.sanitize(userInput);`,
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
          code: `// Debounce: delays call until X ms after last invocation
const searchInput = document.querySelector('#search');

const debouncedSearch = debounce((query) => {
  fetch(\`/api/search?q=\${query}\`);
}, 300);

// API only fires 300ms after user stops typing
searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p6-2",
          q: "What is Throttle?",
          hint: "Fire at most once per time period.",
          answer: "Throttling ensures a function executes at most once per specified time window, regardless of how many times it's triggered.",
          code: `function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    // Only execute if enough time has passed
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
// Fires at most once per 100ms regardless of scroll speed
window.addEventListener('scroll', throttle(() => {
  console.log('scroll position:', window.scrollY);
}, 100));`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p6-3",
          q: "Implement a basic Debounce function.",
          hint: "clearTimeout on each call, setTimeout at the end.",
          answer: "Return a closure. On each call, clear the previous timeout and set a new one. The wrapped function only runs after the specified delay of inactivity.",
          code: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    // Cancel previous timer on each call
    clearTimeout(timer);
    // Start a fresh timer
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const log = debounce((msg) => console.log(msg), 300);
log('a'); log('b'); log('c');
// Only 'c' is logged (after 300ms pause)`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p6-4",
          q: "What is Prototypal Inheritance?",
          hint: "Objects inherit from other objects via the prototype chain.",
          answer: "JS objects have a hidden `[[Prototype]]` link to another object. When a property isn't found, JS traverses this chain until it hits null.",
          code: `const animal = {
  breathe() { return 'breathing...'; }
};

// Object.create sets the prototype of the new object
const dog = Object.create(animal);
dog.bark = function() { return 'woof!'; };

console.log(dog.bark());    // own method
console.log(dog.breathe()); // inherited from prototype
console.log(Object.getPrototypeOf(dog) === animal); // true`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p6-5",
          q: "How do ES6 Classes differ from Java classes?",
          hint: "Syntactic sugar over prototypes.",
          answer: "ES6 classes are syntactic sugar. Under the hood, JS still uses prototypal inheritance, not the true class-based system of Java or C++.",
          code: `// ES6 class syntax (sugar over prototypes)
class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a noise.\`; }
}

// extends sets up the prototype chain
class Dog extends Animal {
  speak() { return \`\${this.name} barks.\`; } // Override
}

const d = new Dog('Rex');
console.log(d.speak()); // 'Rex barks.'`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p6-6",
          q: "What does the `super` keyword do in an ES6 Class?",
          hint: "Calls the parent class constructor/method.",
          answer: "`super()` calls the parent class constructor. You MUST call it before accessing `this` in a child constructor. You can also call parent methods: `super.methodName()`.",
          code: `class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  info() { return \`\${this.make} \${this.model}\`; }
}

class Car extends Vehicle {
  constructor(make, model, doors) {
    super(make, model); // Must call super() before using 'this'
    this.doors = doors;
  }
  info() { return \`\${super.info()} (\${this.doors} doors)\`; }
}
console.log(new Car('Toyota', 'Camry', 4).info());`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p6-7",
          q: "What is `Object.create()`?",
          hint: "Creates an object with a specific prototype.",
          answer: "Creates a new object with the specified object as its prototype, allowing fine-grained control over prototypal inheritance.",
          code: `const personProto = {
  greet() { return \`Hi, I am \${this.name}\`; }
};

// Creates a new object with personProto as its prototype
const alice = Object.create(personProto);
alice.name = 'Alice';

console.log(alice.greet()); // 'Hi, I am Alice'
console.log(Object.getPrototypeOf(alice) === personProto); // true`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p6-8",
          q: "Longest Substring Without Repeating Characters: Strategy?",
          hint: "Sliding Window + Set.",
          answer: "Use a sliding window with left/right pointers and a Set. Expand right. If the character is already in the Set, shrink from the left until the duplicate is removed. Track max length.",
          code: `function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    // Shrink window from left until no duplicates
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
console.log(lengthOfLongestSubstring('abcabcbb')); // 3`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p6-9",
          q: "How do you check if an object is completely empty?",
          hint: "Object.keys().length === 0.",
          answer: "Check if the object has no own enumerable keys using `Object.keys(obj).length === 0`. Also ensure it's actually an object (not null).",
          code: `function isEmpty(obj) {
  // Must be non-null, must be an object, must have no keys
  return obj !== null &&
    typeof obj === 'object' &&
    Object.keys(obj).length === 0;
}

console.log(isEmpty({}));       // true
console.log(isEmpty({ a: 1 })); // false
console.log(isEmpty(null));     // false
console.log(isEmpty([]));       // true (empty array)`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p6-10",
          q: "Difference between `__proto__` and `prototype`?",
          hint: "__proto__ is on instances; prototype is on constructor functions.",
          answer: "`__proto__` is the actual prototype link on an object instance. `prototype` is a property on constructor functions/classes used to set the `__proto__` of objects created with `new`.",
          code: `function Dog(name) { this.name = name; }
// prototype: property on constructor functions
Dog.prototype.bark = function() { return 'woof'; };

const rex = new Dog('Rex');

// __proto__: the actual prototype link on an instance
console.log(rex.__proto__ === Dog.prototype); // true
console.log(rex.bark()); // 'woof' via prototype chain

// Preferred modern approach:
console.log(Object.getPrototypeOf(rex) === Dog.prototype); // true`,
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
          code: `// Spaced repetition schedule example:
// Day 1:  Learn topic
// Day 2:  Review (1 day later)
// Day 5:  Review (3 days later)
// Day 12: Review (7 days later)
// Day 26: Review (14 days later)

// Anki automates this formula.
// Review right BEFORE you forget!`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p7-2",
          q: "Reverse Linked List: O(n) iterative strategy?",
          hint: "Three pointers: prev, curr, nextTemp.",
          answer: "Save `curr.next`, point `curr.next` to `prev`, advance `prev` to `curr`, advance `curr` to the saved next. Repeat until `curr` is null. Return `prev`.",
          code: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const nextTemp = curr.next; // Save next
    curr.next = prev;           // Reverse pointer
    prev = curr;                // Move prev forward
    curr = nextTemp;            // Move curr forward
  }
  return prev; // New head
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p7-3",
          q: "How to approach an interview question you've never seen?",
          hint: "Clarify → Example → Brute force → Optimize.",
          answer: "Don't panic. Ask clarifying questions, write a concrete example, propose the brute-force O(n²) solution first, then optimize. Thinking out loud shows your process.",
          code: `// Mental Framework for unknown problems:
// 1. Clarify: 'Can the array be empty?'
// 2. Example: Input=[2,7,11,15], target=9 → [0,1]
// 3. Brute: nested loops O(n²)
//    for i: for j>i: if a[i]+a[j]==target → done
// 4. Optimize: HashMap for O(n)
//    complement = target - a[i]; if in map → found`,
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p7-4",
          q: "Explain the Temporal Dead Zone out loud.",
          hint: "TDZ: let/const exist but are inaccessible before their line.",
          answer: "Practice saying: 'The TDZ is the period where a let/const variable exists in memory but cannot be accessed until the interpreter reaches its declaration line. Accessing it before that throws a ReferenceError.'",
          code: `// TDZ demonstration:
{
  // TDZ starts for 'x' here
  // console.log(x); // ReferenceError
  let x = 10;       // TDZ ends here
  console.log(x);   // 10
}
// x is not accessible here (block scope)`,
          category: "Interview Prep",
          language: "javascript"
        },
        {
          id: "lf-p7-5",
          q: "Explain Closures out loud.",
          hint: "A function that remembers its outer scope.",
          answer: "Practice saying: 'A closure is when an inner function retains access to variables from its outer function, even after the outer function has returned. I use them to create private state.'",
          code: `// Classic closure: private bank account state
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable
  return {
    deposit(amount)   { balance += amount; },
    withdraw(amount)  { balance -= amount; },
    getBalance()      { return balance; }
  };
}
const acct = createBankAccount(100);
acct.deposit(50);
console.log(acct.getBalance()); // 150
// 'balance' is never accessible from outside`,
          category: "Interview Prep",
          language: "javascript"
        },
        {
          id: "lf-p7-6",
          q: "Explain the Event Loop out loud.",
          hint: "Call Stack + Microtask Queue + Macrotask Queue.",
          answer: "Practice: 'JS is single-threaded. The Event Loop monitors the Call Stack. When it's empty, it first drains the Microtask queue (Promises), then takes one task from the Macrotask queue (setTimeout) and runs it.'",
          code: `// Order: Call Stack → Microtask → Macrotask
console.log('sync 1');                              // 1. Stack
Promise.resolve().then(() => console.log('micro')); // 2. Microtask
setTimeout(() => console.log('macro'), 0);          // 3. Macrotask
console.log('sync 2');                              // 1. Stack
// Output: sync 1, sync 2, micro, macro`,
          category: "Interview Prep",
          language: "javascript"
        },
        {
          id: "lf-p7-7",
          q: "What is the time complexity of Array `splice()`?",
          hint: "O(n) due to shifting elements.",
          answer: "O(n). When you splice, all elements after the insertion/deletion point must be shifted. For large arrays, this is expensive.",
          code: `const arr = [1, 2, 3, 4, 5];

// Worst: splice at index 0 — all elements shift (O(n))
arr.splice(0, 1);

// Best: splice at end — no shifting needed
arr.splice(arr.length - 1, 1);

// pop() is always O(1)
arr.pop();`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p7-8",
          q: "Two Pointers technique: When to use?",
          hint: "Sorted arrays, pairs, palindromes.",
          answer: "Use Two Pointers when working with sorted arrays (searching pairs that sum to a target) or comparing elements from both ends of a structure (palindromes, container with most water).",
          code: `// Two Sum II (sorted array) — O(n) time, O(1) space
function twoSumSorted(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1]; // Found!
    if (sum < target) left++;  // Need bigger sum
    else right--;              // Need smaller sum
  }
}
console.log(twoSumSorted([2,7,11,15], 9)); // [1, 2]`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p7-9",
          q: "Sliding Window technique: When to use?",
          hint: "Contiguous sub-arrays or sub-strings.",
          answer: "Sliding Window is ideal for finding the longest, shortest, or max-sum contiguous sub-array or sub-string. It reduces O(n²) nested loops to O(n).",
          code: `// Max sum subarray of fixed size k — O(n)
function maxSumSubarray(arr, k) {
  // Build first window
  let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
  let maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    // Slide: add right element, remove left element
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p7-10",
          q: "Best way to handle getting stuck on a coding test?",
          hint: "Communicate your thinking.",
          answer: "Never go silent. Verbalize: 'I know a brute-force O(n²) approach. I think we can optimize with a Hash Map to reduce it to O(n). Let me think through this…' Interviewers want to guide you.",
          code: `// Script for getting stuck during a coding interview:
// 1. State what you know:
//    'Brute force: nested loops, O(n²)'
// 2. Think out loud:
//    'If sorted, I could use two pointers...'
// 3. Ask for a hint gracefully:
//    'Am I on the right track with HashMap?'
// 4. Never: go silent for 5+ minutes.`,
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
          code: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price); // Track lowest buy
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (buy@1, sell@6)`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p8-2",
          q: "What is Space Complexity?",
          hint: "Memory usage relative to input size.",
          answer: "Space complexity measures the amount of extra/auxiliary memory an algorithm uses relative to the input size. O(1) = constant; O(n) = proportional to input.",
          code: `// O(1) space: only a single variable regardless of input size
function sumArray(arr) {
  let total = 0;
  for (const n of arr) total += n;
  return total;
}

// O(n) space: creates a new array the same size as input
function doubleArray(arr) {
  return arr.map(n => n * 2);
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p8-3",
          q: "How to write a recursive deep clone function?",
          hint: "Handle null, arrays, and objects separately.",
          answer: "Base case: if null or not an object, return as-is. For arrays, map recursively. For objects, reduce over keys and recursively clone values.",
          code: `function deepClone(obj) {
  // Base case: return primitives and null as-is
  if (obj === null || typeof obj !== 'object') return obj;
  // Arrays: recursively clone each element
  if (Array.isArray(obj)) return obj.map(deepClone);
  // Objects: clone each own key recursively
  const clone = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) clone[key] = deepClone(obj[key]);
  }
  return clone;
}
const orig = { a: 1, b: { c: [2, 3] } };
const copy = deepClone(orig);
copy.b.c.push(99);
console.log(orig.b.c); // [2, 3] unchanged`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p8-4",
          q: "What happens if a recursive clone encounters a circular reference?",
          hint: "Stack Overflow — prevent with a WeakMap.",
          answer: "Without a guard, it'll loop infinitely and throw 'Maximum call stack size exceeded'. Fix it by tracking visited objects in a WeakMap.",
          code: `function deepCloneSafe(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  // Return cached clone if already seen (break cycle)
  if (seen.has(obj)) return seen.get(obj);
  const clone = Array.isArray(obj) ? [] : {};
  seen.set(obj, clone); // Register before recursing
  for (const key of Object.keys(obj)) {
    clone[key] = deepCloneSafe(obj[key], seen);
  }
  return clone;
}
// Handles circular refs without stack overflow:
const a = { name: 'a' }; a.self = a;
console.log(deepCloneSafe(a).name); // 'a'`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p8-5",
          q: "Product of Array Except Self: O(n) without division?",
          hint: "Left-pass then right-pass.",
          answer: "Two passes: left-to-right storing left products, right-to-left multiplying by right products.",
          code: `function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);
  // Left pass: result[i] = product of elements to the LEFT
  let left = 1;
  for (let i = 0; i < n; i++) {
    result[i] = left;
    left *= nums[i];
  }
  // Right pass: multiply by product of elements to the RIGHT
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }
  return result;
}
console.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p8-6",
          q: "In HackerRank environments, how is input usually handled?",
          hint: "Read from stdin, write to stdout.",
          answer: "You read raw text from stdin, parse it into arrays/numbers, and write results with `console.log()`. Modern HackerRank templates often pre-parse inputs for you.",
          code: `// HackerRank stdin pattern:
process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputData = '';
process.stdin.on('data', data => inputData += data);
process.stdin.on('end', () => {
  const lines = inputData.trim().split('\n');
  const n = parseInt(lines[0]);        // line 0: count
  const arr = lines[1].split(' ').map(Number); // line 1: array
  // Your solution:
  console.log(arr.reduce((a, b) => a + b, 0));
});`,
          category: "Platform Specific",
          language: "javascript"
        },
        {
          id: "lf-p8-7",
          q: "Explain Big O Notation simply.",
          hint: "How runtime scales with input size.",
          answer: "Big O describes how the time or space an algorithm needs grows as the input size (n) increases toward infinity. We care about the dominant term.",
          code: `// O(1): constant — not affected by input size
const getFirst = arr => arr[0];

// O(log n): logarithmic — binary search
// O(n)   : linear     — single loop
const sumAll = arr => arr.reduce((a, b) => a + b, 0);

// O(n log n): sort
const sorted = arr => [...arr].sort((a, b) => a - b);

// O(n²): quadratic — nested loops
const pairs = arr => arr.flatMap(
  (a, i) => arr.slice(i+1).map(b => [a,b]));`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p8-8",
          q: "What is an 'in-place' algorithm?",
          hint: "Modifies input directly; O(1) auxiliary space.",
          answer: "An in-place algorithm transforms data using only O(1) extra memory — it modifies the input structure directly rather than creating a copy.",
          code: `// In-place: O(1) extra space — swaps elements directly
function reverseInPlace(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]; // swap
    left++; right--;
  }
  return arr;
}

// NOT in-place: O(n) space — creates a new array
const reverseNew = arr => [...arr].reverse();`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p8-9",
          q: "How do you find the frequency of all elements in an array?",
          hint: "reduce() to build a frequency object.",
          answer: "Use `reduce()` to build an object where keys are elements and values are their counts.",
          code: `const arr = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];

// reduce: build a frequency object
const freq = arr.reduce((acc, val) => {
  acc[val] = (acc[val] || 0) + 1;
  return acc;
}, {});
console.log(freq);
// { apple: 3, banana: 2, cherry: 1 }

// Alternative with Map:
const map = new Map();
for (const item of arr) map.set(item, (map.get(item) || 0) + 1);`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p8-10",
          q: "What does `Math.floor()` do?",
          hint: "Always rounds down to the nearest integer.",
          answer: "Returns the largest integer less than or equal to a number. Essential for finding the midpoint in Binary Search.",
          code: `console.log(Math.floor(4.9));  // 4
console.log(Math.floor(4.1));  // 4
console.log(Math.floor(-4.1)); // -5 (always rounds DOWN)

// Binary search midpoint:
const left = 0, right = 10;
const mid = Math.floor((left + right) / 2);
// For very large values, prevent overflow:
// left + Math.floor((right - left) / 2)`,
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
          code: `function sockMerchant(n, ar) {
  const freq = {};
  // Build frequency map of sock colors
  for (const sock of ar) freq[sock] = (freq[sock] || 0) + 1;
  // Each color contributes floor(count/2) pairs
  return Object.values(freq).reduce((pairs, count) =>
    pairs + Math.floor(count / 2), 0);
}
console.log(sockMerchant(9, [10,20,20,10,10,30,50,10,20])); // 3`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p9-2",
          q: "Counting Valleys: Strategy?",
          hint: "Track altitude; valley ends stepping UP to 0.",
          answer: "Maintain an altitude counter (+1 for U, -1 for D). A valley completes when you step UP ('U') and altitude becomes exactly 0.",
          code: `function countingValleys(steps, path) {
  let altitude = 0, valleys = 0;
  for (const step of path) {
    if (step === 'U') altitude++;
    else altitude--;
    // A valley completes when stepping UP back to sea level (0)
    if (step === 'U' && altitude === 0) valleys++;
  }
  return valleys;
}
console.log(countingValleys(8, 'UDDDUDUU')); // 1`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p9-3",
          q: "Sliding Window: How to handle shrinking the window?",
          hint: "while loop inside the for loop.",
          answer: "Use a `while` loop inside the `for` loop. While the window condition is violated, remove the leftmost element and advance the left pointer.",
          code: `// Longest substring with at most K distinct characters
function longestWithKDistinct(s, k) {
  const freq = {};
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    freq[s[right]] = (freq[s[right]] || 0) + 1;
    // Shrink window if too many distinct chars
    while (Object.keys(freq).length > k) {
      freq[s[left]]--;
      if (freq[s[left]] === 0) delete freq[s[left]];
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p9-4",
          q: "Minimum Size Subarray Sum: Strategy?",
          hint: "Sliding window; shrink while valid.",
          answer: "Expand by adding elements. While current sum >= target, record the window size (update minimum), subtract the left element, and advance left.",
          code: `function minSubArrayLen(target, nums) {
  let left = 0, sum = 0;
  let minLen = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]; // Expand window right
    while (sum >= target) { // Shrink while valid
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}
console.log(minSubArrayLen(7, [2,3,1,2,4,3])); // 2`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p9-5",
          q: "Longest Repeating Character Replacement: Strategy?",
          hint: "Track max frequency char; shrink if window is invalid.",
          answer: "Maintain frequency map. Window is valid if `windowSize - maxFreq <= k`. If invalid, shrink from left. Track max window size.",
          code: `function characterReplacement(s, k) {
  const freq = {};
  let left = 0, maxFreq = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    freq[s[right]] = (freq[s[right]] || 0) + 1;
    maxFreq = Math.max(maxFreq, freq[s[right]]);
    // Window invalid if replacements needed exceed k
    if ((right - left + 1) - maxFreq > k) {
      freq[s[left]]--;
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p9-6",
          q: "What is `Object.entries()`?",
          hint: "Returns [key, value] pairs as an array.",
          answer: "Returns an array of `[key, value]` pairs from an object's own enumerable properties. Useful for iterating over objects.",
          code: `const scores = { Alice: 95, Bob: 87, Charlie: 92 };

// Object.entries: iterate with both key and value
for (const [name, score] of Object.entries(scores)) {
  console.log(\`\${name}: \${score}\`);
}

// Sort by value descending:
const sorted = Object.entries(scores)
  .sort(([,a], [,b]) => b - a);
console.log(sorted); // [['Alice',95],['Charlie',92],['Bob',87]]`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p9-7",
          q: "How to easily loop over a string's characters?",
          hint: "for...of or spread operator.",
          answer: "Strings are iterable in JS. Use `for...of` to get each character directly, without splitting.",
          code: `const str = 'hello';

// for...of: cleanest way to loop over characters
for (const char of str) {
  console.log(char); // h, e, l, l, o
}

// Spread into an array:
const chars = [...str]; // ['h','e','l','l','o']

// Traditional index loop:
for (let i = 0; i < str.length; i++) {
  console.log(str[i]);
}`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p9-8",
          q: "What happens if you slice an array with out-of-bounds indices?",
          hint: "No error — JS clamps the index.",
          answer: "`slice()` is forgiving. If start > length, it returns `[]`. If end > length, it extracts through the end of the array.",
          code: `const arr = [1, 2, 3];

// slice is forgiving with out-of-bounds indices
console.log(arr.slice(0, 10)); // [1, 2, 3] (end clamped)
console.log(arr.slice(5, 10)); // [] (start past array end)
console.log(arr.slice(-2));    // [2, 3] (negative = from end)
console.log(arr.slice(-1));    // [3] (last element)`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p9-9",
          q: "In HackerRank, how do you parse multi-line input?",
          hint: "Split on newline ('\\n').",
          answer: "Split the input string by '\\n' to get an array of lines. Each line can then be further split and parsed as needed.",
          code: `function processInput(inputString) {
  const lines = inputString.trim().split('\n');
  const n = parseInt(lines[0]);              // Line 0: count
  const arr = lines[1].split(' ').map(Number); // Line 1: array
  return { n, arr };
}

const { n, arr } = processInput('5\n1 2 3 4 5');
console.log(n, arr); // 5 [1, 2, 3, 4, 5]`,
          category: "Platform Specific",
          language: "javascript"
        },
        {
          id: "lf-p9-10",
          q: "Difference between `substring()` and `slice()` for strings?",
          hint: "Negative indices behave differently.",
          answer: "`slice()` supports negative indices (counting from end). `substring()` treats negatives as 0 and also swaps start/end if start > end.",
          code: `const str = 'Hello World';

// slice: negative index counts from end
console.log(str.slice(-5));       // 'World'
console.log(str.slice(0, 5));     // 'Hello'

// substring: treats negatives as 0
console.log(str.substring(-5));   // 'Hello World'
console.log(str.substring(6, 11)); // 'World'`,
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
          code: `function topKFrequent(nums, k) {
  const freq = {};
  for (const n of nums) freq[n] = (freq[n] || 0) + 1;
  // Sort keys by frequency, take top k
  return Object.keys(freq)
    .sort((a, b) => freq[b] - freq[a])
    .slice(0, k)
    .map(Number);
}
console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1, 2]`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p10-2",
          q: "Top K Frequent Elements: O(n) Bucket Sort approach?",
          hint: "Array index = frequency.",
          answer: "Create an array of `n+1` buckets (index = frequency). Place elements in their frequency bucket. Iterate buckets from highest to lowest to collect top K.",
          code: `function topKFrequentBucket(nums, k) {
  const freq = {};
  for (const n of nums) freq[n] = (freq[n] || 0) + 1;
  // Index = frequency; bucket[i] = elements with freq i
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of Object.entries(freq)) {
    buckets[count].push(Number(num));
  }
  const result = [];
  // Iterate from highest freq bucket to lowest
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  return result.slice(0, k);
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p10-3",
          q: "Ransom Note: Optimal strategy?",
          hint: "Magazine frequency map, decrement for note.",
          answer: "Count available letters from the magazine. For each letter in the note, decrement. If any count goes to 0 (or the letter is missing), return false.",
          code: `function canConstruct(ransomNote, magazine) {
  const freq = {};
  // Count available letters from magazine
  for (const ch of magazine) freq[ch] = (freq[ch] || 0) + 1;
  // Use up letters for the note
  for (const ch of ransomNote) {
    if (!freq[ch]) return false; // Not enough letters
    freq[ch]--;
  }
  return true;
}
console.log(canConstruct('aa', 'aab')); // true
console.log(canConstruct('aa', 'ab'));  // false`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p10-4",
          q: "First Unique Character in a String: Strategy?",
          hint: "Build frequency map, find first with count === 1.",
          answer: "First pass: build frequency map. Second pass: return the index of the first character with count === 1.",
          code: `function firstUniqChar(s) {
  const freq = {};
  // Pass 1: build frequency map
  for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;
  // Pass 2: find first char with count 1
  for (let i = 0; i < s.length; i++) {
    if (freq[s[i]] === 1) return i;
  }
  return -1;
}
console.log(firstUniqChar('leetcode')); // 0 ('l')
console.log(firstUniqChar('aabb'));     // -1`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p10-5",
          q: "Intersection of Two Arrays: Strategy?",
          hint: "Set for O(1) lookups.",
          answer: "Convert the first array to a Set. Filter the second array keeping only elements in the Set. Wrap in another Set to remove duplicates.",
          code: `function intersection(nums1, nums2) {
  const set1 = new Set(nums1); // O(1) lookup
  // Filter nums2 for elements in set1, then deduplicate
  return [...new Set(nums2.filter(n => set1.has(n)))];
}
console.log(intersection([4,9,5], [9,4,9,8,4])); // [9, 4]`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p10-6",
          q: "What is a `Map` in JavaScript?",
          hint: "Key-value pairs with insertion order, any key type.",
          answer: "A `Map` holds key-value pairs, preserves insertion order, and allows any type as a key (including objects and arrays), unlike a plain object.",
          code: `const map = new Map();
// Map allows any type as key
map.set('name', 'Alice');
map.set(42, 'the answer');
map.set({ id: 1 }, 'object key');

console.log(map.get('name')); // 'Alice'
console.log(map.get(42));     // 'the answer'
console.log(map.size);        // 3

// Map preserves insertion order
for (const [k, v] of map) console.log(k, v);`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p10-7",
          q: "How to iterate over a `Map`?",
          hint: "for...of with entries().",
          answer: "Use `for...of` over `map.entries()`, `map.keys()`, or `map.values()`. Or use the `forEach` method.",
          code: `const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

// Destructured key-value pairs:
for (const [key, value] of map) {
  console.log(key, value);
}

// Just values:
for (const val of map.values()) console.log(val);

// forEach callback: value comes before key
map.forEach((value, key) => console.log(key, value));`,
          category: "Coding",
          language: "javascript"
        },
        {
          id: "lf-p10-8",
          q: "When to use a `Set` instead of a `Map`?",
          hint: "Unique values vs key-value pairs.",
          answer: "Use a `Set` when you only need unique values (visited nodes, deduplication). Use a `Map` when each element needs an associated value (frequency counts, cache).",
          code: `// Set: unique values only
const visited = new Set();
visited.add('nodeA');
if (!visited.has('nodeB')) visited.add('nodeB');

// Map: associate values with keys
const cache = new Map();
cache.set('userId_1', { name: 'Alice', age: 25 });
const user = cache.get('userId_1');

// Deduplicate an array with Set:
const unique = [...new Set([1, 2, 2, 3, 3])]; // [1, 2, 3]`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p10-9",
          q: "Is Hash Map lookup always O(1)?",
          hint: "O(1) average, O(n) worst case (hash collisions).",
          answer: "Average O(1), worst O(n). In rare cases with many hash collisions (all keys hash to the same bucket), lookups degrade to O(n). Modern implementations minimize this with good hash functions.",
          code: `// Normal case: O(1) average
const map = new Map();
map.set('key', 'value');
console.log(map.get('key')); // O(1)

// Hash collision (hypothetical):
// If hash('a') === hash('b'), both land in same bucket
// Lookup degrades to O(n) linear scan.
// JS engines minimize this with good hash functions.
// For interviews: say 'O(1) amortized/average'`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p10-10",
          q: "Find the Majority Element (> n/2 times): O(n) Time, O(1) Space?",
          hint: "Boyer-Moore Voting Algorithm.",
          answer: "Keep a candidate and count. If count is 0, update candidate. If current element equals candidate, increment count, else decrement. The final candidate is the majority element.",
          code: `function majorityElement(nums) {
  let candidate = null, count = 0;
  for (const num of nums) {
    if (count === 0) candidate = num; // New candidate
    count += (num === candidate) ? 1 : -1; // Vote
  }
  return candidate; // Survivor is the majority
}
console.log(majorityElement([3, 2, 3]));       // 3
console.log(majorityElement([2,2,1,1,1,2,2])); // 2`,
          category: "DSA",
          language: "javascript"
        }
      ];
    default:
      return [];
  }
}
