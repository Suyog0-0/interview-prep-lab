import type { InterviewSection } from "../../types";

export const s01_core: InterviewSection = {
  id: 1,
  slug: "core-programming",
  title: "Core Programming",
  subtitle: "Loops, Conditionals, Basics",
  color: "#f97316",
  questions: [
    {
      id: "s01-q01",
      q: "What is the difference between a while loop and a for loop?",
      hint: "Think about when you know the number of iterations vs when you don't.",
      answer: "A for loop is used when the number of iterations is known beforehand.\nA while loop runs as long as a condition is true — better when the iteration count is unknown. Both can technically do the same job.",
      code: `// for loop: we know it runs 5 times
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while loop: runs until condition becomes false
let running = true;
while (running) {
  // do something
  running = false; // exit condition
}`,
      language: "javascript"
    },
    {
      id: "s01-q02",
      q: "What does a break statement do inside a loop?",
      hint: "It stops something early.",
      answer: "`break` immediately exits the loop, skipping any remaining iterations, even if the loop condition is still true.",
      code: `for (let i = 0; i < 10; i++) {
  if (i === 3) break; // loop stops when i is 3
  console.log(i); // prints 0, 1, 2
}`,
      language: "javascript"
    },
    {
      id: "s01-q03",
      q: "What does continue do inside a loop?",
      hint: "It skips, not stops.",
      answer: "`continue` skips the current iteration and jumps to the next one. The loop itself keeps running.",
      code: `for (let i = 0; i < 5; i++) {
  if (i === 2) continue; // skips rest of the body when i is 2
  console.log(i); // prints 0, 1, 3, 4
}`,
      language: "javascript"
    },
    {
      id: "s01-q04",
      q: "What is the difference between == and === in JavaScript?",
      hint: "One cares about type, one doesn't.",
      answer: '`==` does type coercion (e.g. `"5" == 5` is true).\n`===` checks both value AND type (e.g. `"5" === 5` is false).\nAlways prefer `===` in JavaScript.',
      code: `console.log("5" == 5);   // true (coerced)
console.log("5" === 5);  // false (types differ: string vs number)

console.log(0 == false); // true
console.log(0 === false);// false`,
      language: "javascript"
    },
    {
      id: "s01-q05",
      q: "What is a ternary operator? Write an example.",
      hint: "It's a one-line if-else.",
      answer: "Syntax: condition ? valueIfTrue : valueIfFalse",
      code: "const label = age >= 18 ? \"Adult\" : \"Minor\";",
      language: "javascript",
    },
    {
      id: "s01-q06",
      q: "What is a switch statement used for?",
      hint: "Multiple specific value checks.",
      answer: "switch evaluates a variable against multiple case values. Cleaner than long if-else chains when checking exact values. Always include a default case.",
      code: `const role = "admin";
switch (role) {
  case "admin":
    console.log("Full access");
    break; // remember to break!
  case "user":
    console.log("Limited access");
    break;
  default:
    console.log("Guest access");
}`,
      language: "javascript"
    },
    {
      id: "s01-q07",
      q: "What is the difference between pass by value and pass by reference?",
      hint: "Primitives vs objects.",
      answer: "Primitives (number, string, boolean) are passed by value — a copy is made.\nObjects and arrays are passed by reference — the original can be mutated.",
      code: `// By value (Primitives)
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)

// By reference (Objects)
let obj1 = { name: "Bob" };
let obj2 = obj1;
obj2.name = "Alice";
console.log(obj1.name); // "Alice" (mutated!)`,
      language: "javascript"
    },
    {
      id: "s01-q08",
      q: "What is an infinite loop? How do you avoid it?",
      hint: "A loop that never ends.",
      answer: "An infinite loop occurs when the exit condition is never met.\nAvoid it by ensuring the loop variable changes on each iteration and the condition will eventually become false.",
      code: `// INFINITE LOOP (DO NOT RUN)
// let i = 0;
// while (i < 5) {
//   console.log(i);
//   // forgot i++ here!
// }

// CORRECT
let j = 0;
while (j < 5) {
  console.log(j);
  j++; // important!
}`,
      language: "javascript"
    },
    {
      id: "s01-q09",
      q: "What is recursion?",
      hint: "A function that calls itself.",
      answer: "Recursion is when a function calls itself to solve a smaller version of the same problem. Every recursive function needs a base case (stopping condition) to prevent infinite recursion.",
      code: `function countDown(n) {
  // Base case
  if (n <= 0) {
    console.log("Done!");
    return;
  }
  
  console.log(n);
  countDown(n - 1); // Recursive call
}
countDown(3); // 3, 2, 1, Done!`,
      language: "javascript"
    },
    {
      id: "s01-q10",
      q: "Write a recursive function to calculate factorial of n.",
      hint: "factorial(n) = n * factorial(n-1). Base case: factorial(0) = 1.",
      answer: "A recursive factorial function: base case returns 1 when n is 0, otherwise multiplies n by factorial(n-1).",
      code: `function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}`,
      language: "javascript",
    },
    {
      id: "s01-q11",
      q: "What is the difference between a function declaration and a function expression?",
      hint: "One is hoisted, one isn't.",
      answer: "Function declarations are hoisted — you can call them before they appear in code. Function expressions (`const fn = function(){}`) are not hoisted.",
      code: `// Function Declaration (Hoisted)
sayHi(); // Works!
function sayHi() { console.log("Hi"); }

// Function Expression (Not Hoisted)
// sayBye(); // ReferenceError
const sayBye = function() { console.log("Bye"); };
sayBye(); // Works here`,
      language: "javascript"
    },
    {
      id: "s01-q12",
      q: "What is hoisting in JavaScript?",
      hint: "JavaScript moves some things to the top before executing.",
      answer: "Hoisting is JavaScript's behaviour of moving variable and function declarations to the top of their scope before execution.\n`var` is hoisted (but undefined). `let`/`const` are hoisted but not initialized (temporal dead zone). Function declarations are fully hoisted.",
      code: `console.log(a); // undefined
var a = 5;

// console.log(b); // ReferenceError
let b = 10;`,
      language: "javascript"
    },
    {
      id: "s01-q13",
      q: "What is the difference between null and undefined?",
      hint: "One is intentional, one is not.",
      answer: "`undefined` means a variable was declared but not assigned.\n`null` is an intentional empty value assigned by a developer.",
      code: `let x;
console.log(x); // undefined

let y = null;
console.log(y); // null`,
      language: "javascript"
    },
    {
      id: "s01-q14",
      q: "What is NaN? How do you check for it?",
      hint: "Not a Number.",
      answer: '`NaN` means "Not a Number" — result of invalid math (e.g. "abc" * 2).\nCheck with `Number.isNaN(value)` — do NOT use `value === NaN` (always false).',
      code: `const result = "apples" * 2;
console.log(result); // NaN

console.log(result === NaN); // false!
console.log(Number.isNaN(result)); // true`,
      language: "javascript"
    },
    {
      id: "s01-q15",
      q: "What is scope in programming?",
      hint: "Where a variable is accessible.",
      answer: "Scope defines where variables are accessible. JavaScript has:\n- Global scope (accessible everywhere)\n- Function scope (`var` inside a function)\n- Block scope (`let`/`const` inside `{}`)",
      code: `const globalVar = "I am everywhere";

function example() {
  var funcVar = "I am inside this function";
  
  if (true) {
    let blockVar = "I am inside this block";
    console.log(blockVar); // Works
  }
  // console.log(blockVar); // Error: blockVar is not defined
}
// console.log(funcVar); // Error: funcVar is not defined`,
      language: "javascript"
    },
  ],
  notes: [
    {
      title: "Core Programming Fundamentals",
      content: "This section covers the absolute foundational building blocks of programming, focusing heavily on control flow mechanisms such as loops and conditionals. Understanding these mechanisms is crucial before diving into more advanced topics like OOP or Data Structures.\n\n**Key Takeaways:**\n- **Loops** allow repeated execution of logic.\n- **Conditionals** allow branching logic based on boolean values.\n- Always be wary of **infinite loops** and properly handle loop exits using `break` or correct condition checks.",
      tip: "When writing any loop, explicitly write down your exit condition before writing the loop body to avoid infinite loops."
    },
    {
      title: "Loops in Detail",
      content: "A `for` loop is typically used when you know exactly how many iterations you need. A `while` loop is typically used when the iterations depend on an external condition (like fetching data until there is no more).",
      code: `// For loop example
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// While loop example
let limit = 5;
while (limit > 0) {
  console.log(limit);
  limit--;
}`,
      language: "javascript"
    },
    {
      title: "Conditionals & Operators",
      content: "Always use strict equality (`===`) in JavaScript. Loose equality (`==`) can lead to unexpected type coercions.",
      tip: "If you have a short `if/else` statement returning a value, consider using the ternary operator `condition ? true : false` for cleaner syntax."
    }
  ]
};
