/**
 * daily_revision_mcqs.ts
 *
 * End-of-day revision sets for Days 1–6 of the Leapfrog prep schedule.
 * Each day has:
 *   - 15 MCQs  (type: DailyMCQ — matches the MCQQuestion shape in mcqs.ts)
 *   - 2 Coding practical questions (type: CodingQuestion)
 *
 * Topics map:
 *   Day 1 — var / let / const, scope, hoisting, TDZ + BFA string basics
 *   Day 2 — Closures, 'this', arrow functions, call/apply/bind + BFA string/char problems
 *   Day 3 — Arrays & Objects, custom map/filter/reduce, deep copy, flatten + BFA arrays/objects
 *   Day 4 — Async JS: event loop, Promises, async/await + fetch/DOM
 *   Day 5 — DOM, events, bubbling/capturing, delegation + Mini DOM projects
 *   Day 6 — Debounce, Throttle, Prototype chain, Inheritance + BFA advanced arrays
 */

import type { MCQQuestion, CodingQuestion } from "../../types";
import type { DailyRevisionSet } from "./leapfrog_prep_data";
// ─── Coding Question type ─────────────────────────────────────────────────────

// =============================================================================
// DAY 1 — var / let / const · Scope · Hoisting · TDZ
// =============================================================================
const day1_mcqs: MCQQuestion[] = [
  {
    id: "rev-d1-01",
    question: "What is the output of the following code?\n\nconsole.log(x);\nvar x = 5;",
    options: [
      "ReferenceError: x is not defined",
      "undefined",
      "5",
      "null",
    ],
    correctAnswerIndex: 1,
    explanation:
      "var declarations are hoisted to the top of their function (or global) scope and initialised to undefined. The declaration is moved up, but the assignment (= 5) stays in place. So at the time of console.log, x exists but holds undefined.",
  },
  {
    id: "rev-d1-02",
    question: "What is the output of the following code?\n\nconsole.log(y);\nlet y = 10;",
    options: [
      "undefined",
      "10",
      "ReferenceError: Cannot access 'y' before initialization",
      "null",
    ],
    correctAnswerIndex: 2,
    explanation:
      "let (and const) are also hoisted, but they are NOT initialised. They sit in the Temporal Dead Zone (TDZ) from the start of the block until the declaration line is reached. Accessing them in the TDZ throws a ReferenceError.",
  },
  {
    id: "rev-d1-03",
    question: "Which of the following statements about const is TRUE?",
    options: [
      "const variables cannot be declared without a value.",
      "const prevents the variable from ever being used again.",
      "const makes objects immutable.",
      "const variables can be reassigned if they hold primitive values.",
    ],
    correctAnswerIndex: 0,
    explanation:
      "const must be initialised at declaration — `const x;` is a SyntaxError. const only prevents reassignment of the binding, not mutation of the value. An object declared with const can still have its properties changed.",
  },
  {
    id: "rev-d1-04",
    question: "What does 'hoisting' mean in JavaScript?",
    options: [
      "Moving all code to the top of the file before execution.",
      "Moving variable and function declarations to the top of their scope during the compilation phase.",
      "Running async code before synchronous code.",
      "Optimising loops by pre-computing values.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "During the compilation (memory allocation) phase, JS moves declarations to the top of their scope. Only the declaration is hoisted — not the initialisation. Function declarations are hoisted fully (name + body); var declarations are hoisted but set to undefined.",
  },
  {
    id: "rev-d1-05",
    question: "What will this print?\n\nfunction test() {\n  console.log(a);\n  var a = 1;\n  console.log(a);\n}\ntest();",
    options: [
      "1, 1",
      "undefined, 1",
      "ReferenceError, 1",
      "undefined, undefined",
    ],
    correctAnswerIndex: 1,
    explanation:
      "var a is hoisted inside the function scope. At the first console.log, a exists but is undefined (not yet assigned). After var a = 1, the second console.log prints 1.",
  },
  {
    id: "rev-d1-06",
    question: "What is the Temporal Dead Zone (TDZ)?",
    options: [
      "The time between a Promise being created and it resolving.",
      "The region in the code before a let or const declaration where accessing the variable throws a ReferenceError.",
      "The gap between two function calls.",
      "The period during which a var variable holds null.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The TDZ is the block region from the start of the block up to the let/const declaration line. The variable exists in memory but is uninitialized. Any read or write in this zone throws ReferenceError: Cannot access '...' before initialization.",
  },
  {
    id: "rev-d1-07",
    question: "var has ________ scope. let has ________ scope.",
    options: [
      "block; function",
      "function; block",
      "global; function",
      "block; global",
    ],
    correctAnswerIndex: 1,
    explanation:
      "var is function-scoped (or globally scoped if declared outside a function). let and const are block-scoped — they are contained within the nearest set of curly braces {}. This is why let inside an if block is not accessible outside the if.",
  },
  {
    id: "rev-d1-08",
    question: "What is the output?\n\nfor (var i = 0; i < 3; i++) {}\nconsole.log(i);",
    options: [
      "ReferenceError: i is not defined",
      "2",
      "3",
      "undefined",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Because var is function-scoped (not block-scoped), i leaks out of the for block. After the loop finishes, i was incremented to 3 (the condition i < 3 failed at i === 3), so console.log(i) prints 3.",
  },
  {
    id: "rev-d1-09",
    question: "What is the output?\n\nfor (let j = 0; j < 3; j++) {}\nconsole.log(j);",
    options: [
      "3",
      "2",
      "undefined",
      "ReferenceError: j is not defined",
    ],
    correctAnswerIndex: 3,
    explanation:
      "let is block-scoped. The variable j only exists inside the for loop block. Once the block ends, j is gone. Accessing it outside throws ReferenceError: j is not defined.",
  },
  {
    id: "rev-d1-10",
    question: "Which of the following is TRUE about function declarations vs function expressions?",
    options: [
      "Both are fully hoisted.",
      "Neither is hoisted.",
      "Function declarations are fully hoisted; function expressions assigned to var are hoisted but as undefined.",
      "Function expressions are fully hoisted; declarations are not.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Function declarations (function foo() {}) are fully hoisted — you can call them before they appear in the code. Function expressions (var foo = function() {}) hoist only the var declaration (as undefined), so calling foo() before the assignment throws TypeError: foo is not a function.",
  },
  {
    id: "rev-d1-11",
    question: "What is the output?\n\nconst obj = { a: 1 };\nobj.a = 2;\nobj.b = 3;\nconsole.log(obj);",
    options: [
      "TypeError: Cannot assign to read only property",
      "{ a: 1 }",
      "{ a: 2, b: 3 }",
      "{ a: 2 }",
    ],
    correctAnswerIndex: 2,
    explanation:
      "const prevents reassignment of the binding (obj = something else would throw), but the object itself is still mutable. You can freely add, change, or delete properties on a const object. To make it immutable, use Object.freeze(obj).",
  },
  {
    id: "rev-d1-12",
    question: "What does this print?\n\nvar x = 'global';\nfunction foo() {\n  console.log(x);\n  var x = 'local';\n}\nfoo();",
    options: [
      "'global'",
      "'local'",
      "undefined",
      "ReferenceError",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Inside foo, var x is hoisted to the top of the function scope. So when console.log(x) runs, x already exists in the local scope but is undefined (assignment hasn't happened yet). The local x shadows the global x.",
  },
  {
    id: "rev-d1-13",
    question: "Which statement correctly creates a block scope in JavaScript?",
    options: [
      "Any set of curly braces {} with let or const inside.",
      "Only function bodies create a block scope.",
      "Only if/else statements create block scope.",
      "var always creates a new block scope.",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Any curly braces create a block — if, for, while, or even standalone {} blocks. Variables declared with let or const inside those braces are block-scoped. var ignores block scope and is only limited by function boundaries.",
  },
  {
    id: "rev-d1-14",
    question: "What is the output?\n\nconsole.log(foo());\nfunction foo() { return 'hello'; }",
    options: [
      "undefined",
      "TypeError: foo is not a function",
      "ReferenceError",
      "'hello'",
    ],
    correctAnswerIndex: 3,
    explanation:
      "Function declarations are fully hoisted — both the name and the body. So foo is fully available before its declaration in the source code. console.log(foo()) prints 'hello'.",
  },
  {
    id: "rev-d1-15",
    question: "What problem does let/const solve that var could not?",
    options: [
      "let/const allow async code to run faster.",
      "let/const prevent accidental global variable creation and scope leakage from blocks.",
      "let/const allow functions to be defined before they are called.",
      "let/const automatically initialise variables to null.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "var's function scope and hoisting-to-undefined led to subtle bugs — like loop variables leaking out of for blocks, or accidentally reading undefined instead of getting a clear error. let/const give block scoping and TDZ errors, making bugs immediately obvious.",
  },
];

const day1_coding: CodingQuestion[] = [
  {
    id: "code-d1-01",
    title: "Reverse a String",
    difficulty: "Easy",
    description:
      "Write a function reverseString(str) that takes a string and returns it reversed. Do NOT use the built-in .reverse() method directly on a string. Implement it manually using a loop or reduce.",
    examples: [
      { input: "reverseString('hello')", output: "'olleh'" },
      { input: "reverseString('Leapfrog')", output: "'gorpfaeL'" },
      { input: "reverseString('a')", output: "'a'" },
      { input: "reverseString('')", output: "''" },
    ],
    constraints: [
      "Do not use str.split('').reverse().join('') as a one-liner — implement the logic yourself.",
      "Handle empty strings gracefully.",
      "Must return a string, not an array.",
    ],
    hint: "Think about iterating from the last index down to 0, building a new string. Alternatively, use Array.prototype.reduce on the split characters.",
  },
  {
    id: "code-d1-02",
    title: "Palindrome Check",
    difficulty: "Easy",
    description:
      "Write a function isPalindrome(str) that returns true if the given string is a palindrome (reads the same forwards and backwards), and false otherwise. The check should be case-insensitive and ignore non-alphanumeric characters.",
    examples: [
      { input: "isPalindrome('racecar')", output: "true" },
      { input: "isPalindrome('hello')", output: "false" },
      { input: "isPalindrome('A man a plan a canal Panama')", output: "true", explanation: "After removing spaces and lowercasing: 'amanaplanacanalpanama'" },
      { input: "isPalindrome('No lemon no melon')", output: "true" },
    ],
    constraints: [
      "Convert to lowercase before comparing.",
      "Strip non-alphanumeric characters (spaces, punctuation).",
      "An empty string should return true.",
    ],
    hint: "Clean the string first with a regex replace, then compare it to its reverse. Use a two-pointer approach as a bonus implementation.",
  },
];

// =============================================================================
// DAY 2 — Closures · 'this' · Arrow Functions · call / apply / bind
// =============================================================================
const day2_mcqs: MCQQuestion[] = [
  {
    id: "rev-d2-01",
    question: "What is a closure in JavaScript?",
    options: [
      "A function that runs immediately after it is defined.",
      "A function that has access to its own scope, the outer function's scope, and the global scope — even after the outer function has returned.",
      "A function with no return value.",
      "A function that blocks the event loop.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A closure is formed when an inner function 'closes over' variables from its enclosing (outer) scope. Even after the outer function has finished executing and returned, the inner function retains a live reference to those variables — not a copy.",
  },
  {
    id: "rev-d2-02",
    question: "What does this closure-based counter return on the second call to increment()?\n\nfunction makeCounter() {\n  let count = 0;\n  return function increment() {\n    count++;\n    return count;\n  };\n}\nconst counter = makeCounter();\ncounter(); // first call\ncounter(); // second call — what does this return?",
    options: ["0", "1", "2", "undefined"],
    correctAnswerIndex: 2,
    explanation:
      "count is a private variable closed over by increment. Each call to counter() mutates count in the closure's scope. After the first call count is 1, after the second call count is 2. The counter persists state between calls without exposing count globally.",
  },
  {
    id: "rev-d2-03",
    question: "What is the classic closure-in-loop bug with var?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\nWhat is printed?",
    options: [
      "0, 1, 2",
      "0, 0, 0",
      "3, 3, 3",
      "undefined, undefined, undefined",
    ],
    correctAnswerIndex: 2,
    explanation:
      "All three arrow functions close over the SAME var i (function-scoped). By the time the timeouts fire, the loop has finished and i is 3. All three callbacks print 3. Fixing this requires let (block-scoped i per iteration) or an IIFE to capture the value.",
  },
  {
    id: "rev-d2-04",
    question: "How does using let instead of var fix the closure-in-loop bug?",
    options: [
      "let runs the setTimeout synchronously.",
      "let creates a new binding of i for each loop iteration, so each closure captures a different i.",
      "let prevents the loop from running in async mode.",
      "let changes the value of i to a string, preventing mutation.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "With let, a fresh binding of i is created for each iteration. Each closure captures its own i (0, 1, 2). This is a key difference from var, where all iterations share a single i in the function scope.",
  },
  {
    id: "rev-d2-05",
    question: "What is the value of 'this' inside a regular function called as a standalone function in non-strict mode?",
    options: [
      "null",
      "undefined",
      "The global object (window in browsers)",
      "The function itself",
    ],
    correctAnswerIndex: 2,
    explanation:
      "In non-strict mode, a standalone function call sets 'this' to the global object (window in browsers, global in Node). In strict mode ('use strict'), 'this' is undefined for standalone calls. This is one of the most common JS interview traps.",
  },
  {
    id: "rev-d2-06",
    question: "What is the key difference between arrow functions and regular functions regarding 'this'?",
    options: [
      "Arrow functions create their own 'this'; regular functions inherit from the parent.",
      "Arrow functions do NOT have their own 'this'; they lexically inherit 'this' from the enclosing scope.",
      "Regular functions do not support 'this' at all.",
      "Arrow functions bind 'this' to the global object always.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Arrow functions have no own 'this' binding. They capture 'this' from the surrounding lexical context at the time they are defined — not at the time they are called. This makes them ideal for callbacks inside methods (like setTimeout inside an object method).",
  },
  {
    id: "rev-d2-07",
    question: "What is the difference between call() and apply()?",
    options: [
      "call() is asynchronous; apply() is synchronous.",
      "call() passes arguments one by one; apply() passes arguments as an array.",
      "call() can only be used on objects; apply() works on primitives.",
      "They are completely identical.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Both call() and apply() invoke a function immediately with a specified 'this'. The difference is argument passing: call(thisArg, arg1, arg2) vs apply(thisArg, [arg1, arg2]). A memory aid: Apply = Array. bind() is different — it returns a NEW function rather than calling it immediately.",
  },
  {
    id: "rev-d2-08",
    question: "What does bind() return?",
    options: [
      "The result of calling the function immediately.",
      "A new function with 'this' permanently bound to the provided value.",
      "A Promise that resolves to the function result.",
      "The original function with no changes.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "bind(thisArg, ...partialArgs) returns a NEW function. That function, when called, will always use the bound 'this' — regardless of how it is called later. This is useful for event handlers, callbacks, or partial application.",
  },
  {
    id: "rev-d2-09",
    question: "What will this print?\n\nconst obj = {\n  name: 'Leapfrog',\n  greet: function() {\n    setTimeout(function() {\n      console.log(this.name);\n    }, 100);\n  }\n};\nobj.greet();",
    options: [
      "'Leapfrog'",
      "undefined",
      "ReferenceError",
      "'window' or ''",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The regular function inside setTimeout has its own 'this'. When called by the timer, 'this' defaults to the global object (or undefined in strict mode). window.name may be an empty string, or this.name is undefined. To fix this, use an arrow function: setTimeout(() => console.log(this.name), 100).",
  },
  {
    id: "rev-d2-10",
    question: "How do you fix the 'this' problem in the previous question using an arrow function?",
    options: [
      "Replace setTimeout with setInterval.",
      "Change the inner function to an arrow function so it lexically inherits 'this' from greet.",
      "Call obj.greet.bind(window).",
      "Use var instead of const for obj.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Arrow functions inherit 'this' from their lexical enclosing scope. If greet() is called as obj.greet(), 'this' inside greet is obj. An arrow function in setTimeout will capture that same 'this', so this.name correctly gives 'Leapfrog'.",
  },
  {
    id: "rev-d2-11",
    question: "Can arrow functions be used as constructors (with new)?",
    options: [
      "Yes, they work exactly like regular functions with new.",
      "Yes, but only if they return an object explicitly.",
      "No — arrow functions cannot be used as constructors and will throw a TypeError.",
      "Only in strict mode.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Arrow functions have no 'this' binding and no prototype property, so they cannot be used with new. Trying to do new (() => {}) throws TypeError: (intermediate value) is not a constructor. Use a regular function or class for constructors.",
  },
  {
    id: "rev-d2-12",
    question: "What is a practical real-world use case for closures?",
    options: [
      "Making code run faster by caching DOM nodes.",
      "Creating private variables and data encapsulation in module patterns.",
      "Preventing all asynchronous operations.",
      "Automatically converting strings to numbers.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Closures enable the module pattern — exposing only certain functions while keeping internal variables private. Example: a bank account where balance is a closed-over variable, only accessible/modifiable through the returned deposit/withdraw functions.",
  },
  {
    id: "rev-d2-13",
    question: "What is the output?\n\nfunction outer() {\n  let x = 10;\n  function inner() {\n    let x = 20;\n    console.log(x);\n  }\n  inner();\n  console.log(x);\n}\nouter();",
    options: [
      "10, 20",
      "20, 10",
      "20, 20",
      "10, 10",
    ],
    correctAnswerIndex: 1,
    explanation:
      "inner() has its own local x = 20. When inner() runs, it logs 20. inner's x shadows outer's x but does not change it. After inner() returns, outer's x is still 10, so the second console.log prints 10.",
  },
  {
    id: "rev-d2-14",
    question: "What is partial application using bind()?",
    options: [
      "Calling a function with half the expected arguments and getting an error.",
      "Using bind to pre-fill some arguments of a function, returning a new function that only needs the remaining arguments.",
      "Applying a function to only part of an array.",
      "A method to partially parse a JSON string.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "bind(thisArg, arg1) pre-fills arg1 permanently. The returned function, when called with the remaining arguments, combines them. Example: const double = multiply.bind(null, 2); — double(5) returns 10. This is partial application.",
  },
  {
    id: "rev-d2-15",
    question: "Which of the following correctly uses call() to borrow a method from one object for another?",
    options: [
      "const result = obj2.method.bind(obj1)();",
      "const result = obj2.method.call(obj1);",
      "const result = obj1.call(obj2.method);",
      "const result = call(obj2.method, obj1);",
    ],
    correctAnswerIndex: 1,
    explanation:
      "obj2.method.call(obj1) invokes obj2's method immediately but with 'this' set to obj1. This lets you reuse methods without copying them. option A also works (bind then call) but is unnecessarily verbose for immediate invocation.",
  },
];

const day2_coding: CodingQuestion[] = [
  {
    id: "code-d2-01",
    title: "First Non-Repeating Character",
    difficulty: "Easy",
    description:
      "Write a function firstNonRepeating(str) that returns the first character in the string that does not repeat. If all characters repeat, return null. The function should be case-sensitive.",
    examples: [
      { input: "firstNonRepeating('aabbcde')", output: "'c'" },
      { input: "firstNonRepeating('aabb')", output: "null" },
      { input: "firstNonRepeating('stress')", output: "'t'", explanation: "s repeats, t appears once" },
      { input: "firstNonRepeating('z')", output: "'z'" },
    ],
    constraints: [
      "Time complexity goal: O(n) using a frequency map.",
      "Do not use nested loops (O(n²) approach).",
      "The function must be case-sensitive ('A' !== 'a').",
    ],
    hint: "First pass: build a frequency map (object) of character counts. Second pass: iterate the string in order and return the first character with count === 1. This is O(n) time, O(k) space where k is unique characters.",
  },
  {
    id: "code-d2-02",
    title: "Make a Counter with Closure",
    difficulty: "Easy",
    description:
      "Implement a makeCounter(initialValue = 0) function that uses a closure to maintain a private count. It should return an object with three methods: increment(), decrement(), and getCount(). Each call to increment() adds 1, decrement() subtracts 1, and getCount() returns the current value. The internal count must not be accessible from outside.",
    examples: [
      {
        input:
          "const c = makeCounter(5);\nc.increment();\nc.increment();\nc.decrement();\nc.getCount();",
        output: "6",
        explanation: "Starts at 5, +1 = 6, +1 = 7, -1 = 6",
      },
      {
        input: "const c = makeCounter();\nc.getCount();",
        output: "0",
      },
      {
        input: "const c = makeCounter(0);\nconsole.log(c.count);",
        output: "undefined",
        explanation: "count is private and not directly accessible",
      },
    ],
    constraints: [
      "count must be a private variable — not a property on the returned object.",
      "Default initialValue should be 0.",
      "All three methods are required.",
    ],
    hint: "Declare count inside makeCounter using let. Return an object literal whose methods are functions that close over count. Because count is declared in makeCounter's scope, it's private to those methods.",
  },
];

// =============================================================================
// DAY 3 — Arrays & Objects · map / filter / reduce · Deep Copy · Flatten
// =============================================================================
const day3_mcqs: MCQQuestion[] = [
  {
    id: "rev-d3-01",
    question: "What does Array.prototype.map() return?",
    options: [
      "The original array, mutated.",
      "A new array with the results of calling the callback on every element.",
      "A single accumulated value.",
      "A boolean indicating if the callback passed for all elements.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "map() always returns a new array of the same length, where each element is the result of calling the callback on the corresponding element of the original array. The original array is never modified. If you need to mutate in place, use a for loop.",
  },
  {
    id: "rev-d3-02",
    question: "What is the difference between map() and forEach()?",
    options: [
      "forEach() returns a new array; map() returns undefined.",
      "map() returns a new array of transformed values; forEach() always returns undefined and is used purely for side effects.",
      "They are functionally identical.",
      "map() can only be used on numbers; forEach() works on any type.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "map() is for transformation — it produces a new array from the return values. forEach() is for side effects (logging, updating DOM, etc.) — it always returns undefined. A common mistake is trying to 'collect' results from forEach, which doesn't work.",
  },
  {
    id: "rev-d3-03",
    question: "What does Array.prototype.filter() return when no elements match the condition?",
    options: [
      "null",
      "undefined",
      "An empty array []",
      "The original array unchanged",
    ],
    correctAnswerIndex: 2,
    explanation:
      "filter() always returns an array. If no elements pass the test, it returns an empty array []. It never returns null or undefined. The original array is not mutated.",
  },
  {
    id: "rev-d3-04",
    question: "What is the output?\n\n[1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0);",
    options: ["6", "10", "24", "undefined"],
    correctAnswerIndex: 1,
    explanation:
      "reduce() with initial value 0: 0+1=1, 1+2=3, 3+3=6, 6+4=10. The initial value is the second argument to reduce(). If omitted, the first element becomes the initial accumulator and iteration starts from the second element.",
  },
  {
    id: "rev-d3-05",
    question: "What happens if you call reduce() on an empty array without providing an initial value?",
    options: [
      "Returns 0",
      "Returns undefined",
      "Throws a TypeError: Reduce of empty array with no initial value",
      "Returns null",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Without an initial value, reduce() uses the first element as the starting accumulator. On an empty array, there is no first element, so JS throws TypeError. Always provide an initial value when the array might be empty.",
  },
  {
    id: "rev-d3-06",
    question: "What is the difference between a shallow copy and a deep copy of an object?",
    options: [
      "A shallow copy copies methods; a deep copy copies properties only.",
      "A shallow copy copies only the top-level properties; nested objects are still shared by reference. A deep copy recursively copies all nested objects.",
      "A shallow copy is faster but incorrect; a deep copy is always slower.",
      "They are identical for objects without methods.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Shallow copy (Object.assign, spread {...obj}) creates a new object but nested objects still point to the same reference. Mutating a nested object in the copy affects the original. A deep copy (structured clone, JSON parse/stringify, or recursive function) creates fully independent nested objects.",
  },
  {
    id: "rev-d3-07",
    question: "Which of the following creates a DEEP copy of an object (no nested references shared)?",
    options: [
      "const copy = Object.assign({}, original);",
      "const copy = { ...original };",
      "const copy = JSON.parse(JSON.stringify(original));",
      "const copy = original;",
    ],
    correctAnswerIndex: 2,
    explanation:
      "JSON.parse(JSON.stringify(obj)) serialises the object to a string and parses it back — creating a fully independent copy. Limitation: it loses functions, undefined values, Date objects, and circular references. For complex objects, use structuredClone() (modern JS) or a library like Lodash cloneDeep.",
  },
  {
    id: "rev-d3-08",
    question: "What does Object.assign(target, source) do?",
    options: [
      "Creates a deep copy of source into a new object.",
      "Copies own enumerable properties from source into target (shallow), returning target.",
      "Merges source into target recursively.",
      "Creates an immutable copy of source.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Object.assign copies own enumerable properties from source objects into target. It modifies and returns target. It's a shallow copy — nested objects are copied by reference. You can use it to merge: Object.assign({}, obj1, obj2) creates a new merged object.",
  },
  {
    id: "rev-d3-09",
    question: "What is the output of [1, [2, [3, [4]]]].flat(Infinity)?",
    options: [
      "[1, [2, [3, [4]]]]",
      "[1, 2, [3, [4]]]",
      "[1, 2, 3, 4]",
      "[[1, 2, 3, 4]]",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Array.flat(depth) flattens nested arrays. With Infinity as depth, it recursively flattens all levels. [1, [2, [3, [4]]]].flat(Infinity) gives [1, 2, 3, 4]. flat(1) (the default) only flattens one level deep.",
  },
  {
    id: "rev-d3-10",
    question: "You want to remove all duplicate values from [1, 2, 2, 3, 3, 4]. Which is the most concise approach?",
    options: [
      "[...new Set([1, 2, 2, 3, 3, 4])]",
      "[1, 2, 2, 3, 3, 4].filter((v, i, arr) => arr.indexOf(v) === i)",
      "Both A and B work correctly.",
      "Neither works in JavaScript.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Both work. Option A uses Set (which stores only unique values) and spreads it back to an array — clean and idiomatic. Option B uses filter with indexOf to keep only the first occurrence of each value — more verbose but demonstrates understanding of array methods. Know both for interviews.",
  },
  {
    id: "rev-d3-11",
    question: "What is the output?\n\nconst arr = [1, 2, 3];\nconst doubled = arr.map(n => n * 2);\nconsole.log(arr);\nconsole.log(doubled);",
    options: [
      "[2, 4, 6] and [2, 4, 6]",
      "[1, 2, 3] and [2, 4, 6]",
      "[2, 4, 6] and [1, 2, 3]",
      "[1, 2, 3] and [1, 2, 3]",
    ],
    correctAnswerIndex: 1,
    explanation:
      "map() does not mutate the original array. arr remains [1, 2, 3]. doubled is the new array [2, 4, 6]. This immutability is a key principle in functional programming and React state management.",
  },
  {
    id: "rev-d3-12",
    question: "Which method would you use to check if AT LEAST ONE element in an array satisfies a condition?",
    options: ["every()", "some()", "find()", "includes()"],
    correctAnswerIndex: 1,
    explanation:
      "some() returns true if at least one element passes the test. every() requires ALL elements to pass. find() returns the first matching element (not a boolean). includes() checks for a specific value, not a condition. Know all four: some, every, find, findIndex.",
  },
  {
    id: "rev-d3-13",
    question: "What is the most efficient way to merge two objects obj1 and obj2 into a new object without mutating either?",
    options: [
      "Object.assign(obj1, obj2)",
      "obj1 + obj2",
      "const merged = { ...obj1, ...obj2 };",
      "Object.merge(obj1, obj2)",
    ],
    correctAnswerIndex: 2,
    explanation:
      "The spread operator { ...obj1, ...obj2 } creates a new object with all properties from both. If both have the same key, obj2's value wins (last spread wins). Object.assign(obj1, obj2) mutates obj1, which is usually undesirable. Object.merge() does not exist in standard JS.",
  },
  {
    id: "rev-d3-14",
    question: "How do you implement a custom map() from scratch?",
    options: [
      "Array.prototype.customMap = function(cb) { return this.filter(cb); }",
      "Array.prototype.customMap = function(cb) { const result = []; for (let i = 0; i < this.length; i++) { result.push(cb(this[i], i, this)); } return result; }",
      "Array.prototype.customMap = function(cb) { return cb(this); }",
      "Array.prototype.customMap = function(cb) { this.forEach(cb); }",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A correct custom map iterates all elements, calls the callback with (element, index, array) — the same signature as the native map — pushes the return value into a result array, and returns that result. The callback receives index and the full array as optional parameters.",
  },
  {
    id: "rev-d3-15",
    question: "What is the output?\n\nconst a = { x: 1 };\nconst b = a;\nb.x = 99;\nconsole.log(a.x);",
    options: ["1", "99", "undefined", "ReferenceError"],
    correctAnswerIndex: 1,
    explanation:
      "Objects in JavaScript are assigned by reference, not by value. const b = a means b and a point to the SAME object in memory. Changing b.x also changes a.x. This is a fundamental concept: primitives are copied by value, objects by reference.",
  },
];

const day3_coding: CodingQuestion[] = [
  {
    id: "code-d3-01",
    title: "Find the Second Largest Number in an Array",
    difficulty: "Easy",
    description:
      "Write a function secondLargest(arr) that returns the second largest unique number in an array. If the array has fewer than 2 unique values, return null.",
    examples: [
      { input: "secondLargest([3, 1, 4, 1, 5, 9, 2, 6])", output: "6" },
      { input: "secondLargest([5, 5, 5])", output: "null", explanation: "Only one unique value" },
      { input: "secondLargest([1, 2])", output: "1" },
      { input: "secondLargest([10])", output: "null" },
    ],
    constraints: [
      "Handle duplicate values correctly.",
      "Do not sort the array (try O(n) with two variables: max and secondMax).",
      "Return null (not undefined) for invalid cases.",
    ],
    hint: "Maintain two variables: max and secondMax. Iterate once. If current > max, update secondMax = max then max = current. If current > secondMax and current !== max, update secondMax. The tricky part is handling duplicates.",
  },
  {
    id: "code-d3-02",
    title: "Implement Array.prototype.reduce from Scratch",
    difficulty: "Medium",
    description:
      "Implement a function called myReduce(arr, callback, initialValue) that replicates the behaviour of the native Array.prototype.reduce(). If no initialValue is provided and the array is empty, throw a TypeError. If no initialValue is provided but the array has elements, use the first element as the accumulator and start iteration from index 1.",
    examples: [
      {
        input: "myReduce([1, 2, 3, 4], (acc, curr) => acc + curr, 0)",
        output: "10",
      },
      {
        input: "myReduce([1, 2, 3, 4], (acc, curr) => acc + curr)",
        output: "10",
        explanation: "No initial value — first element (1) is acc, iteration starts from 2",
      },
      {
        input: "myReduce(['a', 'b', 'c'], (acc, curr) => acc + curr, '')",
        output: "'abc'",
      },
      {
        input: "myReduce([], (acc, curr) => acc + curr)",
        output: "TypeError: Reduce of empty array with no initial value",
      },
    ],
    constraints: [
      "Do not use the native .reduce() method inside your implementation.",
      "Handle the missing initial value case correctly.",
      "The callback signature is: callback(accumulator, currentValue, currentIndex, array).",
    ],
    hint: "Start by checking if initialValue is provided (arguments.length check or using a sentinel). Set acc = initialValue and startIndex = 0, OR acc = arr[0] and startIndex = 1. Then loop from startIndex and call callback(acc, arr[i], i, arr), updating acc each time.",
  },
];

// =============================================================================
// DAY 4 — Event Loop · Promises · async/await · Fetch API
// =============================================================================
const day4_mcqs: MCQQuestion[] = [
  {
    id: "rev-d4-01",
    question: "In the JavaScript event loop, which queue runs FIRST after the call stack is empty?",
    options: [
      "The macrotask queue (setTimeout, setInterval)",
      "The microtask queue (Promise callbacks, queueMicrotask)",
      "Both run simultaneously",
      "The render queue",
    ],
    correctAnswerIndex: 1,
    explanation:
      "After the call stack empties, the event loop checks the microtask queue FIRST and drains it completely before picking ONE macrotask. Promise.then callbacks go into the microtask queue, while setTimeout callbacks go into the macrotask queue. This is why Promises resolve before timeouts.",
  },
  {
    id: "rev-d4-02",
    question: "What is the output order?\n\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');",
    options: [
      "A, B, C, D",
      "A, D, C, B",
      "A, D, B, C",
      "A, C, D, B",
    ],
    correctAnswerIndex: 1,
    explanation:
      "'A' and 'D' are synchronous — they run first. Then the microtask queue is drained: Promise.resolve().then → 'C'. Then one macrotask: setTimeout → 'B'. Order: A, D, C, B.",
  },
  {
    id: "rev-d4-03",
    question: "What are the three states of a Promise?",
    options: [
      "waiting, running, completed",
      "pending, fulfilled, rejected",
      "idle, processing, done",
      "created, resolved, closed",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A Promise is always in one of three states: pending (initial state, neither fulfilled nor rejected), fulfilled (operation completed successfully), or rejected (operation failed). Once a Promise transitions out of pending, it is settled and cannot change state again.",
  },
  {
    id: "rev-d4-04",
    question: "What does Promise.all([p1, p2, p3]) do?",
    options: [
      "Resolves as soon as the first promise resolves.",
      "Resolves when ALL promises resolve, with an array of results. Rejects immediately if any promise rejects.",
      "Resolves with only the fastest promise result.",
      "Ignores rejections and resolves with partial results.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Promise.all waits for all promises to fulfil and returns an array of results in the same order. If ANY promise rejects, Promise.all immediately rejects with that error. Use Promise.allSettled() if you want all results regardless of individual failures.",
  },
  {
    id: "rev-d4-05",
    question: "What is the difference between Promise.all() and Promise.race()?",
    options: [
      "Promise.all resolves with one result; Promise.race resolves with all results.",
      "Promise.all resolves when all resolve; Promise.race resolves or rejects as soon as the first promise settles.",
      "They are identical.",
      "Promise.race only works with exactly two promises.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Promise.all: all must succeed. Promise.race: first to settle (resolve OR reject) wins — like a timeout pattern. Also know Promise.any (first to fulfil, ignores rejections) and Promise.allSettled (all must settle, collects both fulfilled and rejected results).",
  },
  {
    id: "rev-d4-06",
    question: "What does the async keyword do to a function's return value?",
    options: [
      "It makes the function run in a separate thread.",
      "It automatically wraps the return value in a Promise.resolve().",
      "It prevents the function from being called synchronously.",
      "It forces the function to return undefined.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "An async function always returns a Promise. If you return a plain value (e.g., return 5), it gets wrapped in Promise.resolve(5). If you return a rejected Promise or throw an error, the function returns a rejected Promise. This is why you can .then() on any async function call.",
  },
  {
    id: "rev-d4-07",
    question: "What does await do inside an async function?",
    options: [
      "Blocks the entire JavaScript engine until the Promise resolves.",
      "Pauses execution of the async function and yields control back to the event loop until the awaited Promise settles.",
      "Converts a Promise to a synchronous value permanently.",
      "Runs the Promise in a background thread.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "await pauses only the current async function, not the whole event loop. Other code continues running. When the awaited Promise resolves, the function resumes from where it paused. This is syntactic sugar over Promise.then chaining.",
  },
  {
    id: "rev-d4-08",
    question: "How do you handle errors in async/await?",
    options: [
      "Use .catch() directly after the await expression.",
      "Wrap the await in a try/catch block.",
      "Errors in async functions are silently ignored.",
      "Pass an error-first callback as the second argument to await.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "try/catch is the standard pattern for error handling in async/await. If the awaited Promise rejects, the error is thrown into the catch block. You can also use .catch() on the async function call itself, but try/catch is more readable for complex flows.",
  },
  {
    id: "rev-d4-09",
    question: "What is the output?\n\nasync function foo() {\n  return 42;\n}\nconsole.log(foo());",
    options: [
      "42",
      "undefined",
      "Promise { <fulfilled>: 42 }",
      "Promise { <pending> }",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Async functions return a Promise. foo() returns Promise { <fulfilled>: 42 } — a Promise already fulfilled with 42. To get 42 directly, you need await foo() inside another async function, or foo().then(v => console.log(v)).",
  },
  {
    id: "rev-d4-10",
    question: "What does the fetch() API return?",
    options: [
      "The response body as a string immediately.",
      "A Promise that resolves to a Response object.",
      "An XMLHttpRequest object.",
      "A callback-based stream.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "fetch() returns a Promise that resolves to a Response object. The Response object is NOT the data itself — you then need to call response.json(), response.text(), etc. (which also return Promises) to extract the body. A common mistake is forgetting the second await for response.json().",
  },
  {
    id: "rev-d4-11",
    question: "fetch() only rejects on which condition?",
    options: [
      "When the server returns a 4xx or 5xx status code.",
      "When the server returns a 404.",
      "On network failure (no internet, DNS failure, etc.) — NOT on HTTP error status codes.",
      "When the response body is empty.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "This is a critical fetch() gotcha. fetch() only rejects its Promise on network-level failures. A 404 or 500 response is still a 'successful' fetch from the network perspective. You must check response.ok (true if status is 200–299) or response.status manually and throw if needed.",
  },
  {
    id: "rev-d4-12",
    question: "What is the call stack?",
    options: [
      "A list of all pending HTTP requests.",
      "A LIFO (Last In, First Out) data structure that tracks currently executing function calls.",
      "A queue of asynchronous tasks waiting to run.",
      "The memory heap where objects are stored.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The call stack is a LIFO stack of execution contexts (function calls). When a function is called, it's pushed onto the stack. When it returns, it's popped off. JavaScript is single-threaded — only one thing runs at a time. The event loop watches the call stack and only adds callback tasks when it's empty.",
  },
  {
    id: "rev-d4-13",
    question: "What is callback hell and how do Promises solve it?",
    options: [
      "Callback hell is when callbacks run too fast. Promises slow them down.",
      "Callback hell is deeply nested callbacks making code hard to read. Promises enable flat .then() chaining for sequential async operations.",
      "Callback hell is when too many Promises are created simultaneously.",
      "Callback hell only occurs in Node.js, not in browsers.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Callback hell (the 'pyramid of doom') occurs when sequential async operations are nested inside each other: getData(function(a) { getMore(a, function(b) { ... })}). Promises flatten this into getData().then(a => getMore(a)).then(b => ...). async/await makes it read like synchronous code.",
  },
  {
    id: "rev-d4-14",
    question: "What is the output?\n\nPromise.resolve(1)\n  .then(v => v + 1)\n  .then(v => v * 2)\n  .then(v => console.log(v));",
    options: ["2", "4", "3", "undefined"],
    correctAnswerIndex: 1,
    explanation:
      "Promise chains pass the return value of each .then callback as the input to the next. 1 → 1+1=2 → 2*2=4. The last .then logs 4. This is the power of Promise chaining — each .then transforms the value.",
  },
  {
    id: "rev-d4-15",
    question: "Why should you NOT use await in a loop like this for independent requests?\n\nfor (const id of ids) {\n  const data = await fetch(url + id);\n}",
    options: [
      "await inside a loop is a syntax error.",
      "It works fine and is the recommended approach.",
      "It runs requests sequentially — one must complete before the next starts. Use Promise.all() to run them concurrently.",
      "It causes a memory leak.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "await inside a for loop serialises the requests — each awaits the previous before starting. If the requests are independent, you waste time. Instead, map ids to fetch Promises and use Promise.all(ids.map(id => fetch(url + id))) to fire all requests concurrently.",
  },
];

const day4_coding: CodingQuestion[] = [
  {
    id: "code-d4-01",
    title: "Fetch Users and Display Names",
    difficulty: "Easy",
    description:
      "Write an async function fetchUserNames() that fetches the list of users from https://jsonplaceholder.typicode.com/users and returns an array of just the user names (the 'name' field). Handle errors gracefully — if the fetch fails or the response is not ok, throw an Error with message 'Failed to fetch users'.",
    examples: [
      {
        input: "await fetchUserNames()",
        output: "['Leanne Graham', 'Ervin Howell', 'Clementine Bauch', ...] // 10 names",
      },
    ],
    constraints: [
      "Use async/await (not .then chaining).",
      "Check response.ok and throw if false.",
      "Return only the names array, not the full user objects.",
      "Use try/catch for error handling.",
    ],
    hint: "const response = await fetch(url); if (!response.ok) throw new Error(...); const users = await response.json(); return users.map(u => u.name);",
  },
  {
    id: "code-d4-02",
    title: "Promise-Based Delay",
    difficulty: "Easy",
    description:
      "Write a function delay(ms) that returns a Promise which resolves after ms milliseconds. Then write an async function runSequence() that uses your delay function to: log 'Start', wait 1 second, log 'Middle', wait 1 second, log 'End'. Demonstrate understanding of how async/await pauses execution without blocking the thread.",
    examples: [
      {
        input: "runSequence()",
        output: "// immediately: 'Start'\n// after 1s: 'Middle'\n// after 2s: 'End'",
      },
      {
        input: "delay(500).then(() => console.log('done'))",
        output: "// after 500ms: 'done'",
      },
    ],
    constraints: [
      "delay() must return a Promise (use new Promise with setTimeout inside).",
      "runSequence() must use async/await.",
      "The two 1-second waits must be sequential, not concurrent.",
    ],
    hint: "const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); — this wraps setTimeout in a Promise. In runSequence, await delay(1000) will pause the function for 1 second without blocking the event loop.",
  },
];

// =============================================================================
// DAY 5 — DOM · Events · Bubbling / Capturing · Event Delegation
// =============================================================================
const day5_mcqs: MCQQuestion[] = [
  {
    id: "rev-d5-01",
    question: "What is event bubbling?",
    options: [
      "An event that fires multiple times rapidly.",
      "When an event triggered on a child element propagates up through its parent elements to the document root.",
      "When a parent element captures an event before the child receives it.",
      "When an event is delayed by the event loop.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Event bubbling is the default phase: the event fires on the target element first, then propagates upward to parents (e.g., div → section → body → document). This means a click on a button inside a div will also trigger click handlers on that div and all its ancestors.",
  },
  {
    id: "rev-d5-02",
    question: "What is event capturing (trickling)?",
    options: [
      "Preventing an event from reaching its target.",
      "When an event is handled at the document root first, then propagates DOWN to the target element.",
      "When an event fires repeatedly on the same element.",
      "The process of attaching event listeners to dynamically created elements.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Capturing is the first phase of event propagation (document → target). By default, listeners use the bubbling phase. To use capturing, pass true (or { capture: true }) as the third argument to addEventListener. Bubbling and capturing together form the three phases: capture → target → bubble.",
  },
  {
    id: "rev-d5-03",
    question: "What does event.stopPropagation() do?",
    options: [
      "Prevents the default browser action (e.g., form submission, link navigation).",
      "Stops the event from continuing to propagate (up or down the DOM) after the current listener.",
      "Removes all event listeners from an element.",
      "Cancels the event entirely before it reaches the target.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "stopPropagation() halts further propagation in the current phase (bubbling or capturing). It does NOT prevent the default action. event.preventDefault() prevents the default action. event.stopImmediatePropagation() additionally prevents other listeners on the SAME element from firing.",
  },
  {
    id: "rev-d5-04",
    question: "What does event.preventDefault() do?",
    options: [
      "Stops the event from bubbling up.",
      "Removes the event listener after it fires once.",
      "Prevents the browser's default action associated with the event (e.g., prevents a link from navigating, prevents a form from submitting).",
      "Prevents the event from reaching child elements.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "preventDefault() tells the browser not to execute the default behaviour for that event type. Common uses: preventing form submission to handle it with JavaScript, preventing a link from navigating, preventing drag default on elements. It does NOT stop propagation.",
  },
  {
    id: "rev-d5-05",
    question: "What is event delegation and why is it useful?",
    options: [
      "Passing an event handler from parent to child component.",
      "Attaching a single event listener to a parent element to handle events from multiple child elements using event.target.",
      "Delaying event handler execution using setTimeout.",
      "Binding event handlers to the document instead of individual elements.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Event delegation exploits bubbling. Instead of attaching listeners to every child (expensive), attach one listener to the parent. When a child fires an event, it bubbles up to the parent, where you use event.target to identify which child triggered it. Essential for dynamically added elements.",
  },
  {
    id: "rev-d5-06",
    question: "What is the difference between event.target and event.currentTarget?",
    options: [
      "They always refer to the same element.",
      "event.target is the element that originally triggered the event; event.currentTarget is the element the listener is attached to.",
      "event.target is the parent; event.currentTarget is the child.",
      "event.currentTarget is only available in the capturing phase.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "event.target = the element that was actually clicked/triggered. event.currentTarget = the element where the listener is currently executing. In event delegation, currentTarget is the parent with the listener, while target is the specific child that was interacted with.",
  },
  {
    id: "rev-d5-07",
    question: "What does document.querySelector() return when no matching element is found?",
    options: [
      "An empty array []",
      "undefined",
      "null",
      "An empty HTMLCollection",
    ],
    correctAnswerIndex: 2,
    explanation:
      "querySelector() returns the FIRST matching element, or null if none is found. This is why you should always check for null before accessing properties: const el = document.querySelector('.missing'); if (el) { el.style.color = 'red'; } — otherwise you get TypeError: Cannot set properties of null.",
  },
  {
    id: "rev-d5-08",
    question: "What is the difference between innerHTML and textContent?",
    options: [
      "innerHTML is faster; textContent is slower.",
      "innerHTML parses and renders HTML tags; textContent treats everything as plain text (safer against XSS).",
      "textContent works on all elements; innerHTML only works on div elements.",
      "They are identical in behaviour.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "innerHTML parses the string as HTML. el.innerHTML = '<b>bold</b>' renders bold text. el.textContent = '<b>bold</b>' displays the literal string '<b>bold</b>'. Never use innerHTML with user-provided data — it creates XSS vulnerabilities. Use textContent for user data.",
  },
  {
    id: "rev-d5-09",
    question: "Which method adds an event listener that fires only ONCE and then automatically removes itself?",
    options: [
      "element.addEventListener('click', handler, { once: false })",
      "element.addEventListener('click', handler, { once: true })",
      "element.addEventListenerOnce('click', handler)",
      "element.onClick = handler;",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The { once: true } option in addEventListener automatically removes the listener after it fires for the first time. Before this option existed, developers had to call removeEventListener inside the handler itself — much more verbose.",
  },
  {
    id: "rev-d5-10",
    question: "What is the difference between DOMContentLoaded and window.onload?",
    options: [
      "DOMContentLoaded fires when all images and stylesheets load; window.onload fires when only HTML is parsed.",
      "DOMContentLoaded fires when the HTML is fully parsed (DOM is ready); window.onload fires when ALL resources (images, CSS, scripts) have fully loaded.",
      "They fire at exactly the same time.",
      "window.onload is deprecated; DOMContentLoaded should always be used.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "DOMContentLoaded fires as soon as the HTML is parsed and the DOM tree is built (no need to wait for images). window.onload waits for everything — images, stylesheets, iframes. For most DOM manipulation, DOMContentLoaded is preferred as it fires earlier.",
  },
  {
    id: "rev-d5-11",
    question: "What does classList.toggle('active') do?",
    options: [
      "Adds the class 'active' if it exists, removes it if it doesn't.",
      "Adds 'active' if it doesn't exist, removes it if it does.",
      "Checks if 'active' exists and returns true or false.",
      "Replaces all classes with 'active'.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "classList.toggle(className) adds the class if it's absent, removes it if it's present — perfect for toggle buttons (dark mode, menu open/close). Know the full classList API: add(), remove(), toggle(), contains(), replace().",
  },
  {
    id: "rev-d5-12",
    question: "What is the most performant way to add 1000 elements to the DOM?",
    options: [
      "Use document.createElement in a loop and append each one immediately.",
      "Use innerHTML with a concatenated string.",
      "Build all elements in a DocumentFragment, then append the fragment once.",
      "Use setInterval to add elements one at a time.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Each DOM insertion triggers reflow/repaint. Appending 1000 elements individually causes 1000 reflows. DocumentFragment is an in-memory, off-DOM node. You append all 1000 elements to the fragment (no reflow), then append the fragment once (one reflow). This is dramatically faster.",
  },
  {
    id: "rev-d5-13",
    question: "In a todo list app, when the user types in the search box and you want to filter in real time, which approach is best?",
    options: [
      "Add an event listener for 'click' on the search box.",
      "Add an event listener for 'keyup' or 'input' on the search box and filter on each event.",
      "Use setTimeout to check the input value every 500ms.",
      "Reload the page with the search term in the URL on each keystroke.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "'input' fires on every change (typing, paste, cut) — it is more reliable than 'keyup'. The filter function then compares each todo's text to input.value.toLowerCase(). For performance with many items, add a debounce so the filter doesn't run on every single keystroke (covered on Day 6).",
  },
  {
    id: "rev-d5-14",
    question: "Why is it better to use event delegation for a list of dynamically added items?",
    options: [
      "It is faster to attach one listener than multiple identical listeners.",
      "It automatically handles items added AFTER the listener was attached, since events from new items bubble to the parent.",
      "Both A and B.",
      "Neither — individual listeners are always better.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Both benefits are real. Performance: one listener vs potentially hundreds. Dynamism: event delegation naturally handles items that don't exist at the time the listener is attached, because events from those new items still bubble up to the parent with the listener.",
  },
  {
    id: "rev-d5-15",
    question: "What is the output of document.querySelectorAll('p').length if there are 3 paragraph elements in the DOM?",
    options: [
      "The first <p> element",
      "3",
      "A NodeList with 3 elements",
      "null",
    ],
    correctAnswerIndex: 1,
    explanation:
      "querySelectorAll() returns a static NodeList. Calling .length on that NodeList gives the count, which is 3. Note: NodeList is not a real array (no map/filter), but you can convert it with Array.from(nodeList) or [...nodeList] to use array methods.",
  },
];

const day5_coding: CodingQuestion[] = [
  {
    id: "code-d5-01",
    title: "Todo List with Add, Delete, and Complete",
    difficulty: "Medium",
    description:
      "Build a vanilla JavaScript todo list using DOM manipulation. Requirements:\n1. An input field and 'Add' button to add new todos.\n2. Each todo renders as a list item with the text, a 'Complete' button, and a 'Delete' button.\n3. Clicking 'Complete' toggles a CSS class 'completed' on the item (strike-through style).\n4. Clicking 'Delete' removes the item from the DOM.\n5. Pressing Enter in the input should also add the todo.\n6. The input should be cleared after adding.\n7. Use event delegation on the <ul> element for the Complete and Delete buttons.",
    examples: [
      {
        input: "User types 'Buy milk' and clicks Add",
        output: "A new list item appears with text 'Buy milk', a Complete button, and a Delete button.",
      },
      {
        input: "User clicks Complete on 'Buy milk'",
        output: "The item gets strike-through styling (completed class added). Clicking again removes it.",
      },
    ],
    constraints: [
      "Use event delegation on the <ul> — do NOT attach click listeners to individual buttons.",
      "Use data attributes (e.g., data-action='complete', data-action='delete') to identify button intent.",
      "No frameworks — vanilla JS only.",
    ],
    hint: "Add one click listener to the <ul>. In the handler, check event.target.dataset.action. If 'delete', call event.target.closest('li').remove(). If 'complete', call event.target.closest('li').classList.toggle('completed').",
  },
  {
    id: "code-d5-02",
    title: "Live Search Filter",
    difficulty: "Easy",
    description:
      "Given an array of country names, render them all as a list on the page. Add a search input above the list. As the user types, filter the displayed countries in real time (case-insensitive). Countries that don't match the search term should be hidden (use display: none, not removed from DOM). When the search input is cleared, all countries should reappear.",
    examples: [
      {
        input: "User types 'ind'",
        output: "Only 'India', 'Indonesia' visible. Others hidden.",
      },
      {
        input: "User clears input",
        output: "All countries visible again.",
      },
    ],
    constraints: [
      "Use the 'input' event, not 'keyup'.",
      "Filter is case-insensitive.",
      "Do not re-render the list on each keystroke — only toggle visibility.",
      "All list items should be in the DOM at all times (just hidden/shown).",
    ],
    hint: "Render all items once with document.createElement. On input event, get the search value, then iterate all li elements and set style.display = 'none' or '' based on whether the text includes the search term.",
  },
];

// =============================================================================
// DAY 6 — Debounce · Throttle · Prototype Chain · Inheritance
// =============================================================================
const day6_mcqs: MCQQuestion[] = [
  {
    id: "rev-d6-01",
    question: "What is debouncing?",
    options: [
      "Executing a function repeatedly at a fixed interval.",
      "Delaying a function's execution until a specified time has passed since its LAST invocation.",
      "Preventing a function from ever being called more than once.",
      "Running a function immediately and then ignoring subsequent calls.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Debounce ensures a function only fires after the user has stopped triggering it for a set duration. Classic use: search input — don't fire an API call on every keystroke, only after the user pauses typing for 300ms. Each new keystroke resets the timer.",
  },
  {
    id: "rev-d6-02",
    question: "What is throttling?",
    options: [
      "Delaying a function until after the user stops an action.",
      "Ensuring a function executes at most once per specified time interval, regardless of how many times it is called.",
      "Preventing a function from running asynchronously.",
      "Limiting the number of event listeners on an element.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Throttle ensures consistent execution at a maximum rate. Even if an event fires 100 times per second, a throttled function only runs once per (e.g.) 100ms. Use case: scroll event handlers, resize handlers, mouse-move tracking where you want regular updates but not overwhelming the browser.",
  },
  {
    id: "rev-d6-03",
    question: "When would you use debounce vs throttle?",
    options: [
      "Debounce for scroll events; throttle for search inputs.",
      "Debounce for search/autocomplete (wait for user to pause); throttle for scroll/resize (run at a steady rate while happening).",
      "They are interchangeable and can always substitute for each other.",
      "Debounce for synchronous code; throttle for asynchronous code.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Debounce: 'only run after the action has stopped' — ideal for search inputs, form validation, window resize-end. Throttle: 'run at a controlled rate while the action is happening' — ideal for scroll-position tracking, infinite scroll, rate-limited API calls on mouse move.",
  },
  {
    id: "rev-d6-04",
    question: "What does the core debounce implementation use internally to reset the timer?",
    options: [
      "Promise.race()",
      "clearTimeout followed by setTimeout",
      "setInterval",
      "requestAnimationFrame",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A debounce function stores a timer ID. On each call, it clears the previous timer (clearTimeout) — cancelling the pending execution — and sets a new one (setTimeout). Only the final call's timer is allowed to complete without being cleared.",
  },
  {
    id: "rev-d6-05",
    question: "What is the prototype chain in JavaScript?",
    options: [
      "The order in which functions are added to the call stack.",
      "A linked chain of objects where each object has a __proto__ reference to its prototype. Property lookups traverse this chain until the property is found or null is reached.",
      "The sequence in which JavaScript loads script files.",
      "The chain of closures formed by nested functions.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Every JavaScript object has an internal [[Prototype]] (accessible via __proto__ or Object.getPrototypeOf()). When you access a property that doesn't exist on the object itself, JS walks up the prototype chain. This continues until the property is found or Object.prototype (whose __proto__ is null) is reached.",
  },
  {
    id: "rev-d6-06",
    question: "What is the difference between prototype-based inheritance and class-based inheritance in JavaScript?",
    options: [
      "They are fundamentally different — ES6 classes use a completely new object model.",
      "ES6 classes are syntactic sugar over the same prototype-based mechanism. Internally they work identically.",
      "Prototype-based inheritance is deprecated and should not be used.",
      "Class-based inheritance is faster but less flexible.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "ES6 classes are syntactic sugar. class Animal {} and function Animal() {} with Animal.prototype methods are equivalent under the hood. The class keyword provides cleaner syntax (constructor, extends, super) but the prototype chain mechanism is unchanged.",
  },
  {
    id: "rev-d6-07",
    question: "What does Object.create(proto) do?",
    options: [
      "Creates a deep copy of proto.",
      "Creates a new object with proto as its prototype (__proto__).",
      "Creates a class that extends proto.",
      "Creates an immutable version of proto.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Object.create(proto) creates a new, empty object whose [[Prototype]] is set to proto. The new object inherits all of proto's properties and methods through the chain. Object.create(null) creates an object with NO prototype — a pure dictionary.",
  },
  {
    id: "rev-d6-08",
    question: "In an ES6 class, what does the super() call do in a subclass constructor?",
    options: [
      "Calls all methods of the parent class.",
      "Calls the parent class's constructor, initialising the parent's properties on the new instance.",
      "Creates a new instance of the parent class.",
      "Prevents the parent constructor from running.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "super() must be called in a subclass constructor BEFORE accessing 'this'. It invokes the parent class constructor, setting up the parent's initialised properties on the current instance. Without super(), 'this' is not accessible and you get a ReferenceError.",
  },
  {
    id: "rev-d6-09",
    question: "What does the instanceof operator check?",
    options: [
      "Whether two objects are strictly equal.",
      "Whether an object's prototype chain contains the prototype property of the given constructor.",
      "Whether an object has a specific property.",
      "The type of a primitive value.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "instanceof traverses the object's prototype chain looking for the constructor's .prototype. arr instanceof Array is true because Array.prototype is in arr's chain. arr instanceof Object is also true (Array.prototype's proto is Object.prototype). It does NOT check the constructor property.",
  },
  {
    id: "rev-d6-10",
    question: "What is hasOwnProperty() used for?",
    options: [
      "To check if an object is the owner of a class.",
      "To check if a property exists directly on the object itself, NOT inherited from its prototype chain.",
      "To check if a property can be deleted.",
      "To copy a property from one object to another.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "In a for...in loop, inherited properties from the prototype chain are also iterated. obj.hasOwnProperty(key) returns true only if the property is directly on obj, not inherited. This is a classic pattern in older code: for (const key in obj) { if (obj.hasOwnProperty(key)) { ... } }.",
  },
  {
    id: "rev-d6-11",
    question: "How does throttle differ from debounce in its FIRST call behaviour?",
    options: [
      "Both delay the first call.",
      "Throttle typically allows the first call through immediately; debounce always delays the first call.",
      "Debounce allows the first call through immediately; throttle delays it.",
      "Both execute the first call immediately.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A typical leading-edge throttle executes the function on the FIRST call immediately, then ignores subsequent calls until the interval passes. A debounce always waits — the first call starts a timer and only fires if no more calls come in. This makes throttle feel more responsive.",
  },
  {
    id: "rev-d6-12",
    question: "What is method overriding in prototypal/class inheritance?",
    options: [
      "Deleting a method from the parent class.",
      "Defining a method with the same name in a subclass, which shadows the parent's version for instances of that subclass.",
      "Calling a parent method with different arguments.",
      "Replacing all instances of a method across the prototype chain.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "If a subclass defines speak() and the parent also has speak(), the subclass's speak() shadows the parent's when called on an instance of the subclass. The parent's version is still accessible via super.speak(). JS resolves methods by finding the first one in the prototype chain.",
  },
  {
    id: "rev-d6-13",
    question: "Which is the correct way to implement throttle using setTimeout?",
    options: [
      "Store a timer; on each call, clear the old timer and set a new one.",
      "Store an 'isThrottled' flag; on each call, if false: execute and set flag to true, then reset flag to false after the interval via setTimeout.",
      "Use setInterval to run the function at a fixed rate.",
      "Use requestAnimationFrame to synchronise with screen refresh.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Throttle uses a flag (not clearTimeout/setTimeout like debounce). If not throttled: execute immediately, set flag = true, schedule flag reset after the interval. If throttled: ignore the call. This ensures at most one execution per interval, with the first call going through immediately.",
  },
  {
    id: "rev-d6-14",
    question: "What is the prototype of a function in JavaScript?",
    options: [
      "Functions have no prototype.",
      "Every function has a .prototype property (used as the prototype for instances created with new) AND an internal [[Prototype]] pointing to Function.prototype.",
      "Only constructor functions have a .prototype property.",
      "Function.prototype is null.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Every function has two 'prototype' things: the .prototype property (a regular object used as the [[Prototype]] of instances when the function is called with new), and its own [[Prototype]] which is Function.prototype (giving it call, apply, bind, etc.). Regular object instances only have [[Prototype]], not a .prototype property.",
  },
  {
    id: "rev-d6-15",
    question: "What will this print?\n\nclass Animal {\n  speak() { return 'generic sound'; }\n}\nclass Dog extends Animal {\n  speak() { return 'woof'; }\n}\nconst d = new Dog();\nconsole.log(d.speak());\nconsole.log(d instanceof Animal);",
    options: [
      "'generic sound', false",
      "'woof', false",
      "'generic sound', true",
      "'woof', true",
    ],
    correctAnswerIndex: 3,
    explanation:
      "Dog overrides speak(), so d.speak() returns 'woof'. instanceof checks the prototype chain: Dog.prototype is in d's chain, and Animal.prototype is in Dog.prototype's chain, so d instanceof Animal is true. Subclass instances are also instances of the parent class.",
  },
];

const day6_coding: CodingQuestion[] = [
  {
    id: "code-d6-01",
    title: "Implement Debounce from Scratch",
    difficulty: "Medium",
    description:
      "Implement a debounce(fn, delay) function. It should return a new function that, when called repeatedly, will only invoke fn once — delay milliseconds after the LAST invocation. If the returned function is called again before the delay expires, the previous timer is cancelled and a new one starts. The debounced function should pass through all arguments to fn.",
    examples: [
      {
        input:
          "const log = debounce((msg) => console.log(msg), 300);\nlog('a'); // t=0ms\nlog('b'); // t=100ms (cancels previous)\nlog('c'); // t=200ms (cancels previous)\n// 300ms after last call...",
        output: "// Only prints: 'c'",
      },
      {
        input: "const add = debounce((a, b) => console.log(a + b), 200);\nadd(1, 2);\n// 200ms passes with no more calls",
        output: "3",
      },
    ],
    constraints: [
      "Must use clearTimeout and setTimeout internally.",
      "Must pass all arguments through to the original fn.",
      "Must not use any library functions.",
      "The returned function should have the same 'this' context as it was called with.",
    ],
    hint: "function debounce(fn, delay) { let timerId; return function(...args) { clearTimeout(timerId); timerId = setTimeout(() => fn.apply(this, args), delay); }; } — the key is: clear the old timer, set a new one.",
  },
  {
    id: "code-d6-02",
    title: "Flatten a Nested Array",
    difficulty: "Medium",
    description:
      "Write a function flattenArray(arr, depth = Infinity) that flattens a nested array to a specified depth. Do NOT use the built-in Array.flat() method — implement the recursion yourself. When depth is Infinity, flatten completely. When depth is 1, flatten only one level. When depth is 0 or negative, return the array unchanged.",
    examples: [
      {
        input: "flattenArray([1, [2, [3, [4]]]])",
        output: "[1, 2, 3, 4]",
        explanation: "Default depth Infinity — fully flattened",
      },
      {
        input: "flattenArray([1, [2, [3, [4]]]], 1)",
        output: "[1, 2, [3, [4]]]",
        explanation: "Depth 1 — only one level flattened",
      },
      {
        input: "flattenArray([1, [2, [3]]], 0)",
        output: "[1, [2, [3]]]",
        explanation: "Depth 0 — no change",
      },
    ],
    constraints: [
      "Do NOT use Array.flat() or Array.flatMap().",
      "Implement using recursion.",
      "Handle Infinity depth correctly.",
      "Handle non-array elements (numbers, strings) correctly — pass them through unchanged.",
    ],
    hint: "Use reduce: iterate each element. If it's an array AND depth > 0, recursively call flattenArray(element, depth - 1) and spread into accumulator. If it's not an array (or depth <= 0), push it directly. Use depth === Infinity ? Infinity : depth - 1 to propagate correctly.",
  },
];

// =============================================================================
// ─── Assembled Daily Revision Sets ───────────────────────────────────────────
// =============================================================================
export const dailyRevisionSets: DailyRevisionSet[] = [
  {
    dayNum: 8,
    topic: "var / let / const · Scope · Hoisting · TDZ",
    mcqs: day1_mcqs,
    codingQuestions: day1_coding,
  },
  {
    dayNum: 9,
    topic: "Closures · 'this' · Arrow Functions · call / apply / bind",
    mcqs: day2_mcqs,
    codingQuestions: day2_coding,
  },
  {
    dayNum: 10,
    topic: "Arrays & Objects · map / filter / reduce · Deep Copy · Flatten",
    mcqs: day3_mcqs,
    codingQuestions: day3_coding,
  },
  {
    dayNum: 11,
    topic: "Event Loop · Promises · async/await · Fetch API",
    mcqs: day4_mcqs,
    codingQuestions: day4_coding,
  },
  {
    dayNum: 12,
    topic: "DOM · Events · Bubbling / Capturing · Event Delegation",
    mcqs: day5_mcqs,
    codingQuestions: day5_coding,
  },
  {
    dayNum: 13,
    topic: "Debounce · Throttle · Prototype Chain · Inheritance",
    mcqs: day6_mcqs,
    codingQuestions: day6_coding,
  },
];

// ─── Convenience exports (individual days) ────────────────────────────────────
export {
  day1_mcqs, day1_coding,
  day2_mcqs, day2_coding,
  day3_mcqs, day3_coding,
  day4_mcqs, day4_coding,
  day5_mcqs, day5_coding,
  day6_mcqs, day6_coding,
};