import type { MCQQuestion, CodingQuestion } from "../../types";

export const day7_mcqs: MCQQuestion[] = [
  {
    id: "rev-d7-01",
    question: "(Revision question) What is the main difference between let and var?",
    options: [
      "let is function-scoped; var is block-scoped.",
      "let is block-scoped; var is function-scoped.",
      "let is hoisted but var is not.",
      "There is no difference."
    ],
    correctAnswerIndex: 1,
    explanation: "let is block-scoped and is subject to the Temporal Dead Zone, while var is function-scoped and hoisted to undefined."
  },
  {
    id: "rev-d7-02",
    question: "(Revision question) What happens if you try to reassign a const variable?",
    options: [
      "It reassigns successfully.",
      "It throws a TypeError.",
      "It throws a ReferenceError.",
      "It fails silently."
    ],
    correctAnswerIndex: 1,
    explanation: "Reassigning a const variable throws a TypeError: Assignment to constant variable."
  },
  {
    id: "rev-d7-03",
    question: "(Revision question) Which of the following accurately describes a closure?",
    options: [
      "A function with no arguments.",
      "A function that executes immediately.",
      "A function that retains access to its lexical scope even after its outer function has returned.",
      "An anonymous function."
    ],
    correctAnswerIndex: 2,
    explanation: "A closure gives you access to an outer function's scope from an inner function even after the outer function has finished executing."
  },
  {
    id: "rev-d7-04",
    question: "(Revision question) What is the value of 'this' inside an arrow function?",
    options: [
      "The global object.",
      "Undefined.",
      "The object that called the function.",
      "It lexically inherits 'this' from the enclosing scope."
    ],
    correctAnswerIndex: 3,
    explanation: "Arrow functions do not have their own 'this'. They inherit it from the parent scope."
  },
  {
    id: "rev-d7-05",
    question: "(Revision question) Which method creates a new array with the results of calling a provided function on every element?",
    options: ["forEach", "filter", "map", "reduce"],
    correctAnswerIndex: 2,
    explanation: "map() creates a new array populated with the results of calling a provided function on every element in the calling array."
  },
  {
    id: "rev-d7-06",
    question: "(Revision question) How can you perform a deep copy of an object without using external libraries (assuming it has no functions or undefined values)?",
    options: [
      "Object.assign({}, obj)",
      "JSON.parse(JSON.stringify(obj))",
      "{ ...obj }",
      "Object.copy(obj)"
    ],
    correctAnswerIndex: 1,
    explanation: "JSON.parse(JSON.stringify(obj)) serialises and deserialises the object, creating a deep copy for data-only objects."
  },
  {
    id: "rev-d7-07",
    question: "(Revision question) In the event loop, which queue is processed immediately after the current operation and before the next macrotask?",
    options: [
      "Macrotask queue",
      "Microtask queue",
      "Call stack",
      "Render queue"
    ],
    correctAnswerIndex: 1,
    explanation: "The microtask queue (e.g., Promises) is drained entirely before the event loop picks up the next macrotask (e.g., setTimeout)."
  },
  {
    id: "rev-d7-08",
    question: "(Revision question) What does Promise.all() do?",
    options: [
      "Resolves when the first promise resolves.",
      "Resolves when all promises resolve, or rejects immediately if any promise rejects.",
      "Resolves only if all promises are rejected.",
      "Waits for all promises to settle regardless of success."
    ],
    correctAnswerIndex: 1,
    explanation: "Promise.all() takes an iterable of promises and resolves when all of them resolve, or rejects instantly if any one rejects."
  },
  {
    id: "rev-d7-09",
    question: "(Revision question) What is event delegation?",
    options: [
      "Stopping an event from bubbling up.",
      "Attaching a single event listener to a parent element to handle events on its children.",
      "Creating custom events.",
      "Delaying event execution."
    ],
    correctAnswerIndex: 1,
    explanation: "Event delegation leverages event bubbling to handle events at a higher level in the DOM, rather than attaching listeners to individual children."
  },
  {
    id: "rev-d7-10",
    question: "(Revision question) What is the difference between debounce and throttle?",
    options: [
      "Throttle delays execution until a pause; debounce limits execution to once per interval.",
      "Debounce delays execution until a pause in events; throttle ensures the function executes at most once in a specified interval.",
      "There is no difference.",
      "Debounce is used for arrays, throttle for objects."
    ],
    correctAnswerIndex: 1,
    explanation: "Debounce waits for a pause in the actions before executing. Throttle enforces a maximum number of times a function can be called over time."
  },
  {
    id: "rev-d7-11",
    question: "(Revision question) How does prototypal inheritance work in JavaScript?",
    options: [
      "Classes inherit directly from other classes via classical inheritance.",
      "Objects inherit properties and methods from other objects via the prototype chain.",
      "JavaScript does not support inheritance.",
      "Interfaces define the inheritance structure."
    ],
    correctAnswerIndex: 1,
    explanation: "JavaScript uses prototypal inheritance, where objects link to other objects via the internal [[Prototype]] link."
  },
  {
    id: "rev-d7-12",
    question: "(Revision question) What will Object.create(null) return?",
    options: [
      "null",
      "An empty object that inherits from Object.prototype",
      "An empty object with no prototype chain",
      "Throws an error"
    ],
    correctAnswerIndex: 2,
    explanation: "Object.create(null) creates an object that does not inherit from Object.prototype, meaning it lacks toString, hasOwnProperty, etc."
  },
  {
    id: "rev-d7-13",
    question: "(Revision question) What does the 'bind' method do?",
    options: [
      "Calls a function immediately with a specified 'this'.",
      "Returns a new function with its 'this' permanently bound to the provided value.",
      "Merges two objects together.",
      "Prevents an event from bubbling."
    ],
    correctAnswerIndex: 1,
    explanation: "bind() returns a new function with a fixed 'this' context, allowing you to pass it as a callback without losing the context."
  },
  {
    id: "rev-d7-14",
    question: "(Revision question) What is a 'pure function'?",
    options: [
      "A function that does not return anything.",
      "A function that modifies global variables.",
      "A function that always returns the same output for the same input and has no side effects.",
      "A function written without using 'this'."
    ],
    correctAnswerIndex: 2,
    explanation: "Pure functions always yield the same result for the same arguments and do not cause any observable side effects (like mutating external state)."
  },
  {
    id: "rev-d7-15",
    question: "(Revision question) Which statement about 'async/await' is true?",
    options: [
      "It completely replaces Promises under the hood.",
      "It is syntactic sugar over Promises, making asynchronous code look synchronous.",
      "It runs code on a separate thread.",
      "It can be used outside of functions natively."
    ],
    correctAnswerIndex: 1,
    explanation: "async/await is built on top of Promises, providing a cleaner, more readable syntax for handling asynchronous operations."
  }
];

export const day7_coding: CodingQuestion[] = [
  {
    id: "code-d7-rev-01",
    title: "(Revision) Hoisting and Scope",
    difficulty: "Easy",
    description: "Write a function `testScope` that demonstrates variable shadowing and hoisting. Inside it, declare a variable `a` using var, another using let, and shadow an outer variable. Explain the output in comments.",
    examples: [
      { input: "testScope()", output: "Console logs demonstrating hoisting and block scope" }
    ],
    constraints: ["Must demonstrate block scope vs function scope."],
    hint: "Use blocks {} to show how `let` is contained while `var` leaks."
  },
  {
    id: "code-d7-rev-02",
    title: "(Revision) Closure Data Privacy",
    difficulty: "Medium",
    description: "Create a function `createBank()` that returns an object with methods `deposit(amount)`, `withdraw(amount)`, and `getBalance()`. The balance should be strictly private and not accessible from outside the returned object.",
    examples: [
      { input: "const acc = createBank(); acc.deposit(100); acc.getBalance();", output: "100" }
    ],
    constraints: ["Do not use ES6 classes with # private fields. Use closures."],
    hint: "Declare `let balance = 0` inside `createBank` and return the methods."
  },
  {
    id: "code-d7-rev-03",
    title: "(Revision) Custom Filter",
    difficulty: "Medium",
    description: "Implement your own version of `Array.prototype.filter` called `customFilter` that takes an array and a callback, and returns a new array containing elements that pass the test.",
    examples: [
      { input: "customFilter([1, 2, 3, 4], n => n % 2 === 0)", output: "[2, 4]" }
    ],
    constraints: ["Do not use the native `.filter` method."],
    hint: "Use a simple `for` loop and push to a result array if `cb(item)` is true."
  },
  {
    id: "code-d7-rev-04",
    title: "(Revision) Promisify setTimeout",
    difficulty: "Easy",
    description: "Create a function `delay(ms)` that returns a Promise which resolves after `ms` milliseconds. Use it with `async/await` to log a message after 2 seconds.",
    examples: [
      { input: "await delay(2000); console.log('Done!');", output: "Logs 'Done!' after 2 seconds" }
    ],
    constraints: ["Must use the `new Promise` constructor."],
    hint: "Pass `resolve` into `setTimeout`."
  },
  {
    id: "code-d7-rev-05",
    title: "(Revision) Event Delegation",
    difficulty: "Easy",
    description: "Write JavaScript code that attaches a single click event listener to a `<ul>` element and logs the text of the specific `<li>` that was clicked.",
    examples: [
      { input: "Clicking <li>Item 1</li> inside <ul>", output: "Logs 'Item 1'" }
    ],
    constraints: ["Do not attach listeners to individual `<li>` elements."],
    hint: "Check `e.target.tagName === 'LI'` inside the `ul` click handler."
  },
  {
    id: "code-d7-rev-06",
    title: "(Revision) Implement Throttle",
    difficulty: "Medium",
    description: "Write a `throttle(fn, limit)` function that returns a new function. When invoked repeatedly, it should only call the original `fn` at most once every `limit` milliseconds.",
    examples: [
      { input: "const throttled = throttle(() => console.log('Hi'), 1000);", output: "Function that enforces the rate limit." }
    ],
    constraints: ["Must maintain the original `this` context and arguments."],
    hint: "Use a `lastRan` timestamp or a `timerId` flag to block execution."
  },
  {
    id: "code-d7-rev-07",
    title: "(Revision) Prototypal Inheritance",
    difficulty: "Hard",
    description: "Using constructor functions (not ES6 classes), create an `Animal` constructor that has a `speak` method on its prototype. Then create a `Dog` constructor that inherits from `Animal` and overrides `speak`.",
    examples: [
      { input: "const d = new Dog(); d.speak();", output: "Dog barks" }
    ],
    constraints: ["Use `Object.create` to set up the prototype chain."],
    hint: "`Dog.prototype = Object.create(Animal.prototype); Dog.prototype.constructor = Dog;`"
  }
];
