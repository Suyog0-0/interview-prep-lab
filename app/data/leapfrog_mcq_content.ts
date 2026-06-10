import { MCQQuestion } from "../../types";

export function getDayMCQs(dayNum: number): MCQQuestion[] {
  switch (dayNum) {
    case 1:
      return [
        {
          id: "lf-mcq-1-1",
          question: "Which keyword in JavaScript provides block scope and does not allow reassignment?",
          options: ["var", "let", "const", "def"],
          correctAnswerIndex: 2,
          explanation: "const is block-scoped and its binding cannot be reassigned, though the properties of objects assigned to it can be mutated."
        },
        {
          id: "lf-mcq-1-2",
          question: "What does hoisting do to a 'var' variable declaration?",
          options: [
            "Moves it to the top of the scope and initializes it with the assigned value.",
            "Moves it to the top of the scope and initializes it with 'undefined'.",
            "Moves it to the bottom of the scope.",
            "Throws a ReferenceError if used before declaration."
          ],
          correctAnswerIndex: 1,
          explanation: "var declarations are hoisted to the top of their function/global scope and are initialized with 'undefined'."
        },
        {
          id: "lf-mcq-1-3",
          question: "Which of the following is true about the Temporal Dead Zone (TDZ)?",
          options: [
            "It applies to 'var' declarations.",
            "It is the period where a variable declared with 'let' or 'const' cannot be accessed before its initialization.",
            "It completely stops the event loop.",
            "It only occurs inside global scope."
          ],
          correctAnswerIndex: 1,
          explanation: "TDZ is the period between scope entry and variable initialization where 'let' and 'const' cannot be accessed."
        },
        {
          id: "lf-mcq-1-4",
          question: "How are function declarations hoisted compared to function expressions?",
          options: [
            "Both are fully hoisted.",
            "Neither is hoisted.",
            "Function declarations are fully hoisted, while function expressions are not.",
            "Function expressions are fully hoisted, while function declarations are not."
          ],
          correctAnswerIndex: 2,
          explanation: "Function declarations are fully hoisted (you can call them before they are defined), but function expressions (assigned to variables) only hoist the variable name, not the function body."
        },
        {
          id: "lf-mcq-1-5",
          question: "What is the output of: typeof undefined?",
          options: ["null", "undefined", "object", "string"],
          correctAnswerIndex: 1,
          explanation: "typeof undefined evaluates to the string 'undefined'."
        },
        {
          id: "lf-mcq-1-6",
          question: "To reverse a string 'hello' in JavaScript, what sequence of array methods can be used?",
          options: ["split('').reverse().join('')", "reverse().join('')", "split().reverse()", "join('').reverse()"],
          correctAnswerIndex: 0,
          explanation: "Strings don't have a reverse() method. You must split them into an array of characters, reverse the array, and join them back into a string."
        },
        {
          id: "lf-mcq-1-7",
          question: "If a variable is declared inside a function without var, let, or const (in non-strict mode), what is its scope?",
          options: ["Block scope", "Function scope", "Global scope", "It throws a syntax error immediately"],
          correctAnswerIndex: 2,
          explanation: "In non-strict mode, assigning to an undeclared variable creates a global variable."
        },
        {
          id: "lf-mcq-1-8",
          question: "What is a characteristic of 'let' that differentiates it from 'var'?",
          options: ["It is function-scoped.", "It can be accessed before it is declared.", "It cannot be redeclared in the same scope.", "It cannot be reassigned."],
          correctAnswerIndex: 2,
          explanation: "let variables cannot be redeclared in the same block scope, unlike var variables."
        },
        {
          id: "lf-mcq-1-9",
          question: "Which optimal time complexity can you achieve for the Two Sum problem using a Hash Map?",
          options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
          correctAnswerIndex: 2,
          explanation: "Using a hash map allows you to check if the complement exists in O(1) time per element, leading to a total O(n) time complexity."
        },
        {
          id: "lf-mcq-1-10",
          question: "When reversing a negative number, like -123, to check for a palindrome mathematically, what must you consider?",
          options: ["Negative numbers can never be palindromes because of the minus sign.", "The minus sign is placed at the end.", "You should ignore the minus sign.", "Convert it to absolute value first."],
          correctAnswerIndex: 0,
          explanation: "A negative number like -123 reversed becomes 321-, which does not equal -123, so negative numbers are never palindromes."
        }
      ];
    case 2:
      return [
        {
          id: "lf-mcq-2-1",
          question: "What is a Closure in JavaScript?",
          options: [
            "A way to block the event loop.",
            "A function that retains access to variables in its outer lexical scope even after the outer function has returned.",
            "A function that immediately invokes itself.",
            "A syntax to clear variable memory."
          ],
          correctAnswerIndex: 1,
          explanation: "Closures allow a function to access and remember the variables of its outer environment even when the outer function is finished."
        },
        {
          id: "lf-mcq-2-2",
          question: "Which of the following is NOT true about Arrow Functions?",
          options: [
            "They have shorter syntax.",
            "They do not have their own 'this'.",
            "They can be used as constructors with the 'new' keyword.",
            "They do not have an 'arguments' object."
          ],
          correctAnswerIndex: 2,
          explanation: "Arrow functions cannot be used as constructors and will throw an error if used with 'new'."
        },
        {
          id: "lf-mcq-2-3",
          question: "How does the 'this' keyword behave inside an arrow function?",
          options: [
            "It refers to the object calling the function.",
            "It inherits 'this' from the enclosing lexical context.",
            "It always refers to the global object.",
            "It is undefined."
          ],
          correctAnswerIndex: 1,
          explanation: "Arrow functions lexically bind 'this', meaning they inherit the 'this' value from their parent scope."
        },
        {
          id: "lf-mcq-2-4",
          question: "What is the difference between call() and apply()?",
          options: [
            "call() invokes the function immediately, apply() binds it for later.",
            "call() takes arguments individually, apply() takes them as an array.",
            "apply() takes arguments individually, call() takes them as an array.",
            "There is no difference."
          ],
          correctAnswerIndex: 1,
          explanation: "Both set the 'this' context, but call() expects arguments to be listed individually, while apply() expects an array of arguments."
        },
        {
          id: "lf-mcq-2-5",
          question: "What does the bind() method do?",
          options: [
            "Executes the function immediately with a specified 'this'.",
            "Returns a new function with the 'this' value permanently bound.",
            "Merges two functions together.",
            "Binds event listeners to the DOM."
          ],
          correctAnswerIndex: 1,
          explanation: "bind() creates and returns a new function where the 'this' keyword is fixed to the provided value."
        },
        {
          id: "lf-mcq-2-6",
          question: "Why are closures often used?",
          options: [
            "To increase rendering speed.",
            "To create private variables and encapsulate data.",
            "To fetch data from an API.",
            "To convert objects to arrays."
          ],
          correctAnswerIndex: 1,
          explanation: "Since variables in a closure cannot be accessed from the outside, they act as private variables."
        },
        {
          id: "lf-mcq-2-7",
          question: "If you want to check if two strings are anagrams, what is an efficient O(n) approach?",
          options: [
            "Sort both strings and compare.",
            "Use a Hash Map to count character frequencies of the first string, then decrement using the second.",
            "Use nested loops to check every character.",
            "Use a Set to keep track of unique characters."
          ],
          correctAnswerIndex: 1,
          explanation: "A frequency map avoids the O(n log n) cost of sorting, solving the problem in O(n) time."
        },
        {
          id: "lf-mcq-2-8",
          question: "Which data structure is best for checking 'Contains Duplicate' in O(n) time?",
          options: ["Array", "Linked List", "Set", "Queue"],
          correctAnswerIndex: 2,
          explanation: "A Set only stores unique values. If you add array elements to a Set and its size is less than the array's length, there are duplicates."
        },
        {
          id: "lf-mcq-2-9",
          question: "What does the 'arguments' object contain in a regular JavaScript function?",
          options: ["Only the named parameters.", "An array-like object of all arguments passed to the function.", "A strict array of arguments.", "The 'this' context."],
          correctAnswerIndex: 1,
          explanation: "The arguments object is an array-like structure containing the arguments passed to a regular function."
        },
        {
          id: "lf-mcq-2-10",
          question: "When finding the first non-repeating character in a string, what is the best strategy?",
          options: [
            "Iterate with two nested loops.",
            "Sort the string and look for adjacent differences.",
            "Use an object to map character frequencies, then iterate the string to find the first char with count 1.",
            "Reverse the string and pop elements."
          ],
          correctAnswerIndex: 2,
          explanation: "Using a frequency map allows you to find the first non-repeating character in O(n) time."
        }
      ];
    case 3:
      return [
        {
          id: "lf-mcq-3-1",
          question: "When creating a custom map() function, what must it return?",
          options: ["The original array.", "A completely new array of the same length.", "A single computed value.", "Undefined."],
          correctAnswerIndex: 1,
          explanation: "Array.prototype.map() creates and returns a new array populated with the results of calling a provided function on every element."
        },
        {
          id: "lf-mcq-3-2",
          question: "When writing a custom filter(), under what condition should you push an element to the new array?",
          options: ["Always.", "Only if the callback returns false.", "Only if the callback returns a truthy value.", "Only if it is a number."],
          correctAnswerIndex: 2,
          explanation: "filter() relies on the callback returning a truthy value to determine if the element should be kept in the new array."
        },
        {
          id: "lf-mcq-3-3",
          question: "If no initialValue is provided to reduce(), what does the accumulator start as?",
          options: ["0", "null", "undefined", "The first element of the array"],
          correctAnswerIndex: 3,
          explanation: "If initialValue is omitted, the accumulator is initialized to the first value in the array, and iteration starts from the second value."
        },
        {
          id: "lf-mcq-3-4",
          question: "How can you easily merge two objects (obj1 and obj2) in modern JavaScript?",
          options: ["{ obj1, obj2 }", "{ ...obj1, ...obj2 }", "Object.join(obj1, obj2)", "obj1 + obj2"],
          correctAnswerIndex: 1,
          explanation: "The spread syntax ({ ...obj1, ...obj2 }) or Object.assign() merges the properties of two objects into a new one."
        },
        {
          id: "lf-mcq-3-5",
          question: "Why does JSON.parse(JSON.stringify(obj)) fail as a perfect deep copy?",
          options: [
            "It crashes on any nested object.",
            "It cannot serialize functions, Dates, Maps, or undefined properties.",
            "It creates shallow copies instead of deep copies.",
            "It mutates the original object."
          ],
          correctAnswerIndex: 1,
          explanation: "JSON stringification ignores functions and undefined, and turns Dates into strings."
        },
        {
          id: "lf-mcq-3-6",
          question: "What is the formula to find the sum of the first N natural numbers (useful for 'Find Missing N' problem)?",
          options: ["n * n / 2", "n * (n + 1) / 2", "(n + 1) / 2", "n * 2"],
          correctAnswerIndex: 1,
          explanation: "The mathematical formula to sum numbers from 1 to N is n * (n + 1) / 2."
        },
        {
          id: "lf-mcq-3-7",
          question: "What is the time complexity of Binary Search on a sorted array?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
          correctAnswerIndex: 1,
          explanation: "Binary search halves the search space at each step, resulting in logarithmic O(log n) time complexity."
        },
        {
          id: "lf-mcq-3-8",
          question: "When merging two sorted arrays in place (like in LeetCode), what is the optimal strategy?",
          options: [
            "Start comparing from the beginning and shift elements right.",
            "Concat the arrays and sort them.",
            "Start comparing from the end and place the largest element at the very back of the first array.",
            "Use a Hash Map."
          ],
          correctAnswerIndex: 2,
          explanation: "Working backwards prevents overwriting elements in the first array that haven't been processed yet."
        },
        {
          id: "lf-mcq-3-9",
          question: "To flatten a nested object in JavaScript, what technique is most commonly used?",
          options: ["A simple for loop.", "Recursion.", "The flat() method.", "JSON parsing."],
          correctAnswerIndex: 1,
          explanation: "Because an object can be nested arbitrarily deep, a recursive function is needed to traverse all keys."
        },
        {
          id: "lf-mcq-3-10",
          question: "What built-in JS object allows you to easily remove duplicates from an array?",
          options: ["Map", "Object", "Set", "JSON"],
          correctAnswerIndex: 2,
          explanation: "A Set only allows unique values. Passing an array into a Set constructor instantly removes duplicates."
        }
      ];
    case 4:
      return [
        {
          id: "lf-mcq-4-1",
          question: "What handles asynchronous callbacks in JavaScript's single-threaded environment?",
          options: ["The V8 Engine.", "The Event Loop.", "The DOM.", "Service Workers."],
          correctAnswerIndex: 1,
          explanation: "The Event Loop continuously checks the call stack and pushes tasks from the queues to the stack when it is empty."
        },
        {
          id: "lf-mcq-4-2",
          question: "Which queue has a higher priority in the Event Loop?",
          options: ["The Macrotask (Callback) Queue", "The Microtask Queue", "They have equal priority", "The Render Queue"],
          correctAnswerIndex: 1,
          explanation: "The Event Loop will always completely empty the Microtask Queue (e.g., Promises) before executing the next Macrotask (e.g., setTimeout)."
        },
        {
          id: "lf-mcq-4-3",
          question: "What are the three states of a Promise?",
          options: [
            "Start, Running, End",
            "Waiting, Success, Failure",
            "Pending, Fulfilled, Rejected",
            "Open, Resolved, Closed"
          ],
          correctAnswerIndex: 2,
          explanation: "A Promise is always in one of three states: pending, fulfilled (resolved), or rejected."
        },
        {
          id: "lf-mcq-4-4",
          question: "What does Promise.all(iterable) do?",
          options: [
            "Resolves immediately with the first resolved promise.",
            "Waits for ALL promises to resolve, or rejects immediately if ANY reject.",
            "Waits for all promises to settle regardless of rejection.",
            "Executes promises sequentially."
          ],
          correctAnswerIndex: 1,
          explanation: "Promise.all returns an array of all resolved values but fails fast if even one promise in the iterable rejects."
        },
        {
          id: "lf-mcq-4-5",
          question: "Which Promise method should you use if you want to know when all promises have finished, regardless of success or failure?",
          options: ["Promise.all()", "Promise.race()", "Promise.any()", "Promise.allSettled()"],
          correctAnswerIndex: 3,
          explanation: "Promise.allSettled() waits for all to settle and returns an array of objects describing the outcome of each."
        },
        {
          id: "lf-mcq-4-6",
          question: "What does the 'await' keyword do?",
          options: [
            "Stops the entire browser.",
            "Pauses the execution of the async function until the Promise settles.",
            "Converts a synchronous function into an asynchronous one.",
            "Cancels an active fetch request."
          ],
          correctAnswerIndex: 1,
          explanation: "Inside an async function, 'await' pauses the execution of that specific function until the awaited Promise resolves or rejects."
        },
        {
          id: "lf-mcq-4-7",
          question: "Where do setTimeout callbacks go before execution?",
          options: ["Microtask Queue", "Call Stack", "Macrotask Queue (Callback Queue)", "Web APIs"],
          correctAnswerIndex: 2,
          explanation: "After the Web API timer finishes, the callback is pushed to the Macrotask Queue (Callback Queue) to wait for the call stack to empty."
        },
        {
          id: "lf-mcq-4-8",
          question: "If a function is marked with the 'async' keyword, what does it always return?",
          options: ["A boolean", "Undefined", "A Promise", "A Generator"],
          correctAnswerIndex: 2,
          explanation: "An async function implicitly wraps its return value in a Promise."
        },
        {
          id: "lf-mcq-4-9",
          question: "How do you handle errors in an async/await block?",
          options: ["Using .catch() chains", "Using a try/catch block", "Using error boundaries", "Using if/else statements"],
          correctAnswerIndex: 1,
          explanation: "Because async/await looks synchronous, you can use standard try/catch blocks to handle Promise rejections."
        },
        {
          id: "lf-mcq-4-10",
          question: "If Promise A is in the Microtask queue and setTimeout B is in the Macrotask queue, which runs first?",
          options: ["setTimeout B", "Promise A", "It depends on the browser", "They run concurrently"],
          correctAnswerIndex: 1,
          explanation: "The Event Loop always prioritizes the Microtask queue (Promises) over the Macrotask queue (setTimeout)."
        }
      ];
    case 5:
      return [
        {
          id: "lf-mcq-5-1",
          question: "What is the default phase for DOM event listeners (unless specified otherwise)?",
          options: ["Capturing Phase", "Target Phase", "Bubbling Phase", "Static Phase"],
          correctAnswerIndex: 2,
          explanation: "By default, event listeners are attached to the Bubbling phase (trickling up from the target to the root)."
        },
        {
          id: "lf-mcq-5-2",
          question: "Which method stops an event from continuing its propagation (bubbling or capturing)?",
          options: ["event.preventDefault()", "event.stop()", "event.stopPropagation()", "event.cancel()"],
          correctAnswerIndex: 2,
          explanation: "stopPropagation() stops the event from moving further up or down the DOM tree."
        },
        {
          id: "lf-mcq-5-3",
          question: "What does event.preventDefault() do?",
          options: [
            "Stops event bubbling.",
            "Stops event capturing.",
            "Prevents the browser's default action (e.g., following a link, submitting a form).",
            "Removes the event listener."
          ],
          correctAnswerIndex: 2,
          explanation: "preventDefault() stops default browser behaviors but does NOT stop event bubbling."
        },
        {
          id: "lf-mcq-5-4",
          question: "What is Event Delegation?",
          options: [
            "Delegating tasks to Web Workers.",
            "Attaching a single event listener to a parent element to manage events for its children.",
            "Passing an event object as an argument to a function.",
            "Creating custom events."
          ],
          correctAnswerIndex: 1,
          explanation: "Event delegation leverages event bubbling to handle events for multiple child elements efficiently on a common parent."
        },
        {
          id: "lf-mcq-5-5",
          question: "Why is Event Delegation useful for dynamically generated DOM elements?",
          options: [
            "It applies CSS styles faster.",
            "You don't need to manually attach listeners to newly created children; the parent listener catches them.",
            "It prevents memory leaks automatically.",
            "It stops cross-site scripting."
          ],
          correctAnswerIndex: 1,
          explanation: "Because the event bubbles up to the parent, the parent can listen for events triggered by children that didn't even exist when the listener was attached."
        },
        {
          id: "lf-mcq-5-6",
          question: "In the Valid Parentheses problem, which data structure is optimal to use?",
          options: ["Queue", "Hash Map", "Stack", "Binary Tree"],
          correctAnswerIndex: 2,
          explanation: "A Stack (LIFO) is perfect because you want to match the most recently opened parenthesis with the next closing one."
        },
        {
          id: "lf-mcq-5-7",
          question: "What algorithm is used to find the Maximum Subarray in O(n) time?",
          options: ["Dijkstra's Algorithm", "Kadane's Algorithm", "Kruskal's Algorithm", "Sliding Window"],
          correctAnswerIndex: 1,
          explanation: "Kadane's Algorithm keeps a running sum. If the running sum ever dips below 0, it resets to 0, efficiently finding the max contiguous sum."
        },
        {
          id: "lf-mcq-5-8",
          question: "How do you access the element that actually triggered the event when using Event Delegation?",
          options: ["event.currentTarget", "event.source", "this", "event.target"],
          correctAnswerIndex: 3,
          explanation: "event.target refers to the deeply nested element that originally triggered the event, while event.currentTarget refers to the parent element the listener is attached to."
        },
        {
          id: "lf-mcq-5-9",
          question: "How can you easily toggle a CSS class on an element?",
          options: ["element.className = 'toggle'", "element.classList.toggle('class-name')", "element.style.toggle('class-name')", "element.toggleClass('class-name')"],
          correctAnswerIndex: 1,
          explanation: "The classList API provides a convenient toggle() method to add or remove a class."
        },
        {
          id: "lf-mcq-5-10",
          question: "Which of the following is NOT a phase of DOM Event Propagation?",
          options: ["Capturing Phase", "Target Phase", "Rendering Phase", "Bubbling Phase"],
          correctAnswerIndex: 2,
          explanation: "The three phases of DOM event propagation are Capturing, Target, and Bubbling. Rendering is unrelated to this cycle."
        }
      ];
    case 6:
      return [
        {
          id: "lf-mcq-6-1",
          question: "What is the main purpose of Debounce?",
          options: [
            "To execute a function immediately on every click.",
            "To delay function execution until X milliseconds have passed since the last invocation.",
            "To limit a function to executing exactly once every X milliseconds.",
            "To bounce an event to the parent element."
          ],
          correctAnswerIndex: 1,
          explanation: "Debounce waits for a pause in the triggers before executing. (e.g. waiting for the user to stop typing)."
        },
        {
          id: "lf-mcq-6-2",
          question: "What is the main purpose of Throttle?",
          options: [
            "To delay execution until the user stops.",
            "To ensure a function is called at most once in a specified time period.",
            "To cancel API requests.",
            "To clear the call stack."
          ],
          correctAnswerIndex: 1,
          explanation: "Throttle ensures a steady rate limit. No matter how many times it's triggered, it only fires once per X milliseconds."
        },
        {
          id: "lf-mcq-6-3",
          question: "Which DOM event is a classic use-case for Throttle?",
          options: ["A form submission", "A Search bar input", "Window 'scroll' or 'resize' events", "A button click"],
          correctAnswerIndex: 2,
          explanation: "Scroll and resize events fire dozens of times per second. Throttling ensures the handler only runs, say, once every 100ms, improving performance."
        },
        {
          id: "lf-mcq-6-4",
          question: "How do objects inherit properties in JavaScript?",
          options: ["Class Inheritance", "Prototypal Inheritance", "Classical Inheritance", "Multiple Inheritance"],
          correctAnswerIndex: 1,
          explanation: "JavaScript uses Prototypal inheritance, where objects inherit directly from other objects via the hidden [[Prototype]] property."
        },
        {
          id: "lf-mcq-6-5",
          question: "What are ES6 Classes in JavaScript?",
          options: [
            "A completely new inheritance model.",
            "Syntactic sugar over prototypal inheritance.",
            "True Object-Oriented classes like in Java.",
            "A way to create strict typing."
          ],
          correctAnswerIndex: 1,
          explanation: "ES6 classes provide a cleaner, more familiar syntax but still utilize prototypes under the hood."
        },
        {
          id: "lf-mcq-6-6",
          question: "What happens when you try to access a property that doesn't exist on an object?",
          options: [
            "It throws an Error.",
            "It returns null.",
            "JavaScript looks up the Prototype Chain until it finds it or reaches null.",
            "It creates the property and sets it to undefined."
          ],
          correctAnswerIndex: 2,
          explanation: "JS will traverse the prototype chain. If it reaches the end (null) and still hasn't found it, it returns undefined."
        },
        {
          id: "lf-mcq-6-7",
          question: "Which keyword is used to access the parent class's constructor in an ES6 class?",
          options: ["parent", "super", "this", "extend"],
          correctAnswerIndex: 1,
          explanation: "The 'super()' keyword must be called inside the constructor of a child class to access the parent's constructor."
        },
        {
          id: "lf-mcq-6-8",
          question: "What function clears a timeout previously set by setTimeout?",
          options: ["stopTimeout()", "clear()", "clearTimeout()", "removeTimeout()"],
          correctAnswerIndex: 2,
          explanation: "clearTimeout(timerId) is used to cancel a timeout, which is the core mechanism behind how Debounce works."
        },
        {
          id: "lf-mcq-6-9",
          question: "How can you flatten a nested array natively in modern JavaScript?",
          options: ["Array.prototype.flat()", "Array.prototype.flatten()", "Array.prototype.reduce()", "Array.prototype.concat()"],
          correctAnswerIndex: 0,
          explanation: "The native flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth."
        },
        {
          id: "lf-mcq-6-10",
          question: "If you need to group an array of objects by a specific property, which array method is most suited?",
          options: ["map()", "filter()", "reduce()", "some()"],
          correctAnswerIndex: 2,
          explanation: "reduce() is perfect for grouping because you can iterate the array and build up a single Object (Hash Map) based on property keys."
        }
      ];
    case 7:
    case 14:
    case 21:
      // Review days
      return [
        {
          id: `lf-mcq-${dayNum}-1`,
          question: "Why are Review Days critical in the Leapfrog schedule?",
          options: ["To take a break", "To learn new complex algorithms", "To transition knowledge from short-term to long-term memory", "To finish incomplete tasks"],
          correctAnswerIndex: 2,
          explanation: "Review days are for consolidation. Spaced repetition and testing yourself from memory builds long-term retention."
        },
        {
          id: `lf-mcq-${dayNum}-2`,
          question: "What is the best way to practice during a Mock Test or Review Day?",
          options: ["Read tutorials", "Copy paste code to see if it works", "Write code entirely from memory and speak out loud", "Only solve easy problems"],
          correctAnswerIndex: 2,
          explanation: "Simulating interview conditions (no notes, speaking your thoughts) is the only way to prepare for the pressure of a real interview."
        },
        {
          id: `lf-mcq-${dayNum}-3`,
          question: "Which of the following problems relies on using a Hash Map for O(1) lookups?",
          options: ["Reverse Linked List", "Two Sum", "Binary Search", "Valid Parentheses"],
          correctAnswerIndex: 1,
          explanation: "Two Sum uses a Hash Map to store the complements, allowing O(1) lookups."
        },
        {
          id: `lf-mcq-${dayNum}-4`,
          question: "If an interviewer asks you to solve a problem without division, what should you look for?",
          options: ["Multiplication passes (e.g., Left and Right arrays)", "Binary Search", "Hash Maps", "Linked Lists"],
          correctAnswerIndex: 0,
          explanation: "Like in Product of Array Except Self, doing a pass from the left and a pass from the right solves the problem without division."
        },
        {
          id: `lf-mcq-${dayNum}-5`,
          question: "What is Kadane's algorithm used for?",
          options: ["Finding Anagrams", "Reversing Linked Lists", "Maximum Subarray", "Graph Traversal"],
          correctAnswerIndex: 2,
          explanation: "Kadane's algorithm finds the maximum contiguous subarray sum in O(n) time."
        },
        {
          id: `lf-mcq-${dayNum}-6`,
          question: "If you need to ensure a component triggers an API fetch ONLY after the user has stopped typing for 300ms, what do you use?",
          options: ["Throttle", "Debounce", "setInterval", "Promises"],
          correctAnswerIndex: 1,
          explanation: "Debounce waits for a pause in actions before executing."
        },
        {
          id: `lf-mcq-${dayNum}-7`,
          question: "What determines 'this' in a standard function call?",
          options: ["Where the function is defined", "How the function is called", "The global object", "It is always undefined"],
          correctAnswerIndex: 1,
          explanation: "In standard functions, 'this' is determined dynamically by the caller at execution time."
        },
        {
          id: `lf-mcq-${dayNum}-8`,
          question: "What determines 'this' in an arrow function?",
          options: ["Where the function is defined (lexical scope)", "How the function is called", "The caller object", "Strict mode only"],
          correctAnswerIndex: 0,
          explanation: "Arrow functions lexically bind 'this' based on where they are written in the code."
        },
        {
          id: `lf-mcq-${dayNum}-9`,
          question: "What data structure handles Event Bubbling?",
          options: ["Call Stack", "DOM Tree", "Event Loop", "Microtask Queue"],
          correctAnswerIndex: 1,
          explanation: "Event bubbling occurs traversing up the DOM Tree from the target element to the Window."
        },
        {
          id: `lf-mcq-${dayNum}-10`,
          question: "Which array method creates a new array by running a function that returns a truthy or falsy value?",
          options: ["map()", "filter()", "reduce()", "forEach()"],
          correctAnswerIndex: 1,
          explanation: "filter() uses a boolean return value to decide whether to keep an element in the new array."
        }
      ];
    case 8:
      return [
        {
          id: "lf-mcq-8-1",
          question: "In the 'Best Time to Buy and Sell Stock' problem, what is the optimal O(n) strategy?",
          options: ["Nested loops.", "Keep track of the minimum price seen so far and calculate potential max profit.", "Sort the array first.", "Use a Hash Map."],
          correctAnswerIndex: 1,
          explanation: "Iterating once while tracking the lowest price allows you to calculate the max profit for any subsequent day in O(n) time."
        },
        {
          id: "lf-mcq-8-2",
          question: "What is the primary difference between a shallow copy and a deep copy of an object?",
          options: [
            "Shallow copy is faster but uses more memory.",
            "Shallow copy creates new references for all nested objects.",
            "Shallow copy shares references for nested objects; deep copy creates completely new independent references.",
            "There is no difference in JavaScript."
          ],
          correctAnswerIndex: 2,
          explanation: "A shallow copy (like using the spread operator) only copies the top level. Deeply nested objects still point to the same memory reference."
        },
        {
          id: "lf-mcq-8-3",
          question: "Why is creating a deep clone manually via recursion preferred over JSON.parse(JSON.stringify(obj)) in some cases?",
          options: [
            "JSON parsing is too slow.",
            "JSON stringification strips out functions, undefined, and alters Dates.",
            "Recursion handles circular references automatically.",
            "JSON methods only work on arrays."
          ],
          correctAnswerIndex: 1,
          explanation: "The JSON method is a quick hack but fails to properly serialize complex data types like functions, RegExp, or Dates."
        },
        {
          id: "lf-mcq-8-4",
          question: "When writing a recursive deep clone function, what is the base case?",
          options: [
            "If the object is an array, return [].",
            "If the input is null or not of type 'object', return the input itself.",
            "If the object has no keys.",
            "There is no base case."
          ],
          correctAnswerIndex: 1,
          explanation: "Primitives and null do not need to be cloned, so if the type is not an object (or is null), you simply return it."
        },
        {
          id: "lf-mcq-8-5",
          question: "What built-in JavaScript method can now be used for deep cloning in modern browsers?",
          options: ["Object.clone()", "Object.assign()", "structuredClone()", "Array.from()"],
          correctAnswerIndex: 2,
          explanation: "structuredClone() is a modern native API for deep cloning objects in JS."
        },
        // Fill the rest with general DSA for day 8
        {
          id: "lf-mcq-8-6",
          question: "In HackerRank environments, how is input usually handled?",
          options: ["You receive parameters directly in the function.", "You must read from standard input (stdin) and write to standard output (stdout).", "Through window.prompt().", "By making API calls."],
          correctAnswerIndex: 1,
          explanation: "HackerRank uses stdin/stdout streams for test cases, though modern templates often parse it for you before passing to your function."
        },
        {
          id: "lf-mcq-8-7",
          question: "What is the time complexity of a single loop that iterates over an array?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
          correctAnswerIndex: 2,
          explanation: "A single iteration over 'n' elements takes Linear Time, O(n)."
        },
        {
          id: "lf-mcq-8-8",
          question: "What is the space complexity of creating a deep clone of an object with 'n' keys?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
          correctAnswerIndex: 2,
          explanation: "You must allocate new memory for every key/value pair, resulting in O(n) space complexity."
        },
        {
          id: "lf-mcq-8-9",
          question: "If an algorithm requires nested loops (a loop inside a loop) over the same array, what is its likely time complexity?",
          options: ["O(n)", "O(n log n)", "O(n^2)", "O(2^n)"],
          correctAnswerIndex: 2,
          explanation: "Nested loops over the same elements generally result in Quadratic Time, O(n^2)."
        },
        {
          id: "lf-mcq-8-10",
          question: "What does Array.isArray() do?",
          options: ["Converts an object to an array.", "Checks if a variable is an array.", "Creates a new array.", "Flattens an array."],
          correctAnswerIndex: 1,
          explanation: "Because typeof [] evaluates to 'object', Array.isArray() is the standard way to verify if a variable is actually an array."
        }
      ];
    case 9:
      return [
        {
          id: "lf-mcq-9-1",
          question: "What type of problems is the Sliding Window pattern best suited for?",
          options: ["Sorting an array.", "Finding the shortest path in a graph.", "Problems involving contiguous sub-arrays or sub-strings (longest, shortest, maximum).", "Tree traversals."],
          correctAnswerIndex: 2,
          explanation: "Sliding window reduces O(n^2) nested loops to O(n) for contiguous sub-array problems."
        },
        {
          id: "lf-mcq-9-2",
          question: "How does the Sliding Window pattern achieve O(n) time complexity?",
          options: ["By using recursive calls.", "By using two pointers (left and right) to expand and contract a single window.", "By sorting the array first.", "By using a Hash Map."],
          correctAnswerIndex: 1,
          explanation: "Instead of recalculating the entire window from scratch, it shifts pointers, doing at most 2n operations."
        },
        {
          id: "lf-mcq-9-3",
          question: "For 'Longest Substring Without Repeating Characters', which data structure pairs well with the sliding window?",
          options: ["Stack", "Queue", "Set or Map", "Linked List"],
          correctAnswerIndex: 2,
          explanation: "A Set allows you to track which characters are currently inside the window in O(1) time."
        },
        {
          id: "lf-mcq-9-4",
          question: "In the 'Longest Substring' problem, what do you do when you encounter a character that is already in your Set?",
          options: [
            "Stop the loop and return.",
            "Remove characters from the Set by advancing the 'left' pointer until the duplicate is gone.",
            "Skip the character and advance the 'right' pointer.",
            "Clear the entire Set."
          ],
          correctAnswerIndex: 1,
          explanation: "You contract the window from the left until the duplicate character falls outside the window."
        },
        {
          id: "lf-mcq-9-5",
          question: "How do you solve 'Product of Array Except Self' in O(n) time without using division?",
          options: [
            "Use nested loops.",
            "Calculate a prefix product array (left to right) and a postfix product array (right to left).",
            "Use a Hash Map.",
            "Sort the array."
          ],
          correctAnswerIndex: 1,
          explanation: "By multiplying the running product of elements to the left by the running product to the right, you get the result."
        },
        {
          id: "lf-mcq-9-6",
          question: "In the prefix/postfix array approach, what is the default product value for the edges (left of index 0, right of last index)?",
          options: ["0", "1", "null", "undefined"],
          correctAnswerIndex: 1,
          explanation: "Multiplying by 1 acts as a neutral starting point for the running product."
        },
        {
          id: "lf-mcq-9-7",
          question: "What is the time complexity of the prefix/postfix approach for Product of Array Except Self?",
          options: ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"],
          correctAnswerIndex: 1,
          explanation: "It requires multiple passes (e.g. 2 passes) over the array, but 2n is still O(n) linear time."
        },
        {
          id: "lf-mcq-9-8",
          question: "In the HackerRank 'Sales by Match' problem (finding pairs of socks), what is a quick way to count pairs?",
          options: ["Sort and count.", "Use a Hash Map to get frequencies, then sum Math.floor(count / 2).", "Use a sliding window.", "Use Kadane's algorithm."],
          correctAnswerIndex: 1,
          explanation: "A Hash Map easily tallies the counts, and dividing by 2 (floored) gives the exact number of pairs."
        },
        {
          id: "lf-mcq-9-9",
          question: "In the HackerRank 'Counting Valleys' problem, when do you know you've just walked through a valley?",
          options: ["When altitude reaches lowest point.", "When altitude goes from 1 to 0.", "When altitude goes from -1 to 0 (stepping up to sea level).", "When you step down from 0 to -1."],
          correctAnswerIndex: 2,
          explanation: "A valley is defined as a sequence below sea level ending with a step back up to sea level (0)."
        },
        {
          id: "lf-mcq-9-10",
          question: "If a sliding window problem asks for a minimum size sub-array, when do you update the minimum size tracker?",
          options: ["Every time the right pointer moves.", "While the window condition is VALID (while contracting the left pointer).", "Only at the very end.", "Before the loop starts."],
          correctAnswerIndex: 1,
          explanation: "You update the minimum size while shrinking a valid window to find the smallest possible valid window."
        }
      ];
    case 10:
      return [
        {
          id: "lf-mcq-10-1",
          question: "When is a Hash Map typically the correct choice in a coding interview?",
          options: ["When you need to sort elements.", "When you need to count frequencies, group items, or achieve O(1) lookups.", "When you need to traverse a tree.", "When you need a Last-In-First-Out structure."],
          correctAnswerIndex: 1,
          explanation: "Hash maps provide O(1) average time complexity for insertions and lookups, making them perfect for frequencies and grouping."
        },
        {
          id: "lf-mcq-10-2",
          question: "In 'Group Anagrams', what makes an effective key for the Hash Map?",
          options: ["The length of the string.", "The first letter of the string.", "The string sorted alphabetically (e.g., 'eat' -> 'aet').", "The index of the string."],
          correctAnswerIndex: 2,
          explanation: "Anagrams will always result in the exact same string when sorted alphabetically, making it a perfect grouping key."
        },
        {
          id: "lf-mcq-10-3",
          question: "What does Object.values(map) return?",
          options: ["An array of the map's keys.", "An array of the map's values.", "A boolean.", "A new map."],
          correctAnswerIndex: 1,
          explanation: "Object.values() extracts all the values from an object into an array."
        },
        {
          id: "lf-mcq-10-4",
          question: "To solve 'Top K Frequent Elements' using a Hash Map, what is the first step?",
          options: ["Sort the array.", "Build a frequency map tracking how many times each element appears.", "Return the first K elements.", "Filter the array."],
          correctAnswerIndex: 1,
          explanation: "You must first know the frequencies before you can determine which elements are the top K."
        },
        {
          id: "lf-mcq-10-5",
          question: "After building the frequency map for 'Top K Frequent Elements', how can you find the top K (basic approach)?",
          options: ["Sort the keys based on their mapped frequency values in descending order.", "Return the highest key.", "Use a queue.", "It is impossible without a heap."],
          correctAnswerIndex: 0,
          explanation: "Sorting the keys by frequency takes O(N log N) time, which is an acceptable basic solution."
        },
        {
          id: "lf-mcq-10-6",
          question: "What advanced O(n) algorithm can solve 'Top K Frequent Elements' without sorting?",
          options: ["Kadane's Algorithm", "Bucket Sort", "Binary Search", "Sliding Window"],
          correctAnswerIndex: 1,
          explanation: "Bucket Sort uses an array where the index is the frequency and the value is an array of elements with that frequency."
        },
        {
          id: "lf-mcq-10-7",
          question: "In 'Ransom Note', you have a note string and a magazine string. How does a Hash Map solve this?",
          options: [
            "Store ransom note frequencies and increment based on magazine.",
            "Store magazine letter frequencies, then iterate the note and decrement. If any map value goes below 0, return false.",
            "Use two pointers.",
            "Concat the strings and sort."
          ],
          correctAnswerIndex: 1,
          explanation: "Decrementing magazine frequencies ensures you have enough of each specific letter to write the note."
        },
        {
          id: "lf-mcq-10-8",
          question: "What is a potential downside of using a Hash Map?",
          options: ["Slow lookups.", "It uses O(n) extra space memory.", "It limits the array size.", "It can only store numbers."],
          correctAnswerIndex: 1,
          explanation: "Hash maps require additional memory allocation relative to the size of the input, resulting in O(n) Space Complexity."
        },
        {
          id: "lf-mcq-10-9",
          question: "What is the difference between a JavaScript Object '{}' and a 'Map' object?",
          options: [
            "Objects only allow string/symbol keys; Maps allow any data type as a key.",
            "Maps are faster for iteration but Objects are faster for lookups.",
            "There is no difference.",
            "Objects maintain insertion order reliably, Maps do not."
          ],
          correctAnswerIndex: 0,
          explanation: "Maps can use objects, arrays, or primitives as keys, and they reliably maintain insertion order."
        },
        {
          id: "lf-mcq-10-10",
          question: "If a Hash Map lookup is O(1), why wouldn't you use it for everything?",
          options: ["Because it requires extra memory space.", "Because it is difficult to write.", "Because arrays don't work with them.", "Because lookup can suddenly become O(n^2)."],
          correctAnswerIndex: 0,
          explanation: "The trade-off for O(1) speed is increased Space Complexity. In extreme memory-constrained environments, in-place algorithms are preferred."
        }
      ];
    case 11:
      return [
        {
          id: "lf-mcq-11-1",
          question: "What does LIFO stand for in relation to a Stack?",
          options: ["List In, First Out", "Last In, First Out", "Logical Iteration First Out", "Length In, Format Out"],
          correctAnswerIndex: 1,
          explanation: "Last In, First Out means the last element added is the first one removed, like a stack of plates."
        },
        {
          id: "lf-mcq-11-2",
          question: "What does FIFO stand for in relation to a Queue?",
          options: ["First In, First Out", "Fast Iteration, Fast Output", "Format In, Function Out", "Find Index, Filter Object"],
          correctAnswerIndex: 0,
          explanation: "First In, First Out means the first element added is the first one removed, like a line at a store."
        },
        {
          id: "lf-mcq-11-3",
          question: "Which array methods simulate a Stack in JavaScript?",
          options: ["push() and shift()", "unshift() and pop()", "push() and pop()", "concat() and slice()"],
          correctAnswerIndex: 2,
          explanation: "push() adds to the end, pop() removes from the end. This perfectly simulates Last-In-First-Out."
        },
        {
          id: "lf-mcq-11-4",
          question: "Which array methods simulate a Queue in JavaScript?",
          options: ["push() and pop()", "push() and shift()", "slice() and splice()", "map() and filter()"],
          correctAnswerIndex: 1,
          explanation: "push() adds to the end, shift() removes from the beginning. This simulates First-In-First-Out (though shift is technically O(n) in JS arrays)."
        },
        {
          id: "lf-mcq-11-5",
          question: "In the 'Valid Parentheses' problem, what should you push to the stack?",
          options: ["Closing brackets", "Numbers", "Opening brackets", "The entire string"],
          correctAnswerIndex: 2,
          explanation: "You push opening brackets. When you encounter a closing bracket, you pop the stack and check if it matches."
        },
        {
          id: "lf-mcq-11-6",
          question: "In the 'Valid Parentheses' problem, what if the stack is not empty at the end of the loop?",
          options: ["The string is valid.", "The string is invalid (unmatched opening brackets remain).", "It throws an error.", "You must run the loop again."],
          correctAnswerIndex: 1,
          explanation: "An empty stack at the end means every opening bracket found its matching closing bracket."
        },
        {
          id: "lf-mcq-11-7",
          question: "How can an object map make 'Valid Parentheses' cleaner?",
          options: ["It can sort the string.", "It maps closing brackets to their opening equivalents (e.g. '}': '{'), avoiding massive switch statements.", "It converts brackets to numbers.", "It removes the need for a stack."],
          correctAnswerIndex: 1,
          explanation: "By using an object map, you can simply check if stack.pop() !== map[char]."
        },
        {
          id: "lf-mcq-11-8",
          question: "In the HackerRank 'Jumping on the Clouds' problem, what approach is used?",
          options: ["Dynamic Programming", "Greedy Approach (always try to jump 2, else jump 1)", "Hash Map", "Binary Search"],
          correctAnswerIndex: 1,
          explanation: "The greedy choice of always attempting the longest jump (2) first guarantees the minimum steps in this specific problem."
        },
        {
          id: "lf-mcq-11-9",
          question: "In the HackerRank 'Repeated String' problem, why shouldn't you literally construct the repeated string of length N?",
          options: ["Because it's impossible in JS.", "Because N can be up to 10^12, which will cause a memory limit exceeded crash.", "Because strings cannot exceed 100 characters.", "It is actually the best approach."],
          correctAnswerIndex: 1,
          explanation: "N is too large to simulate. You must use math (division and modulo) to calculate the answer based on the initial string."
        },
        {
          id: "lf-mcq-11-10",
          question: "What is the time complexity of Array.prototype.shift() in JavaScript?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
          correctAnswerIndex: 2,
          explanation: "Removing the first element requires re-indexing every subsequent element in the array, taking O(n) time."
        }
      ];
    case 12:
      return [
        {
          id: "lf-mcq-12-1",
          question: "What are the two main properties of a basic Linked List Node?",
          options: ["key and value", "left and right", "val (data) and next (pointer)", "index and data"],
          correctAnswerIndex: 2,
          explanation: "A standard singly linked list node contains the data (val) and a reference pointer to the next node in the sequence (next)."
        },
        {
          id: "lf-mcq-12-2",
          question: "What is a major disadvantage of Linked Lists compared to Arrays?",
          options: ["They have a fixed size.", "They don't allow random access (you can't do arr[3]).", "Insertion is O(n).", "They use less memory."],
          correctAnswerIndex: 1,
          explanation: "To find the 4th element in a Linked List, you must traverse from the head 4 times. Arrays provide O(1) random access."
        },
        {
          id: "lf-mcq-12-3",
          question: "What is a major advantage of Linked Lists compared to Arrays?",
          options: ["Faster search.", "O(1) random access.", "O(1) insertion/deletion if you already have the node reference.", "Built-in sorting methods."],
          correctAnswerIndex: 2,
          explanation: "Arrays must shift elements when inserting/deleting in the middle. Linked lists just update a couple of pointers."
        },
        {
          id: "lf-mcq-12-4",
          question: "In 'Reverse Linked List', how many pointers do you typically use in the iterative approach?",
          options: ["One", "Two", "Three (prev, curr, nextTemp)", "Four"],
          correctAnswerIndex: 2,
          explanation: "You need 'prev' to point backwards, 'curr' to track the current node, and 'nextTemp' to avoid losing the rest of the list when you break the link."
        },
        {
          id: "lf-mcq-12-5",
          question: "When reversing a Linked List, what should the 'prev' pointer be initialized to?",
          options: ["The head node.", "null", "The tail node.", "undefined"],
          correctAnswerIndex: 1,
          explanation: "The first node (head) becomes the last node, so its 'next' pointer must point to null."
        },
        {
          id: "lf-mcq-12-6",
          question: "What does the iterative Reverse Linked List function return?",
          options: ["curr", "head", "prev", "nextTemp"],
          correctAnswerIndex: 2,
          explanation: "When the loop finishes, 'curr' is null, and 'prev' points to the last node processed, which is the new head."
        },
        {
          id: "lf-mcq-12-7",
          question: "In 'Search in Rotated Sorted Array', what algorithm is modified?",
          options: ["Bubble Sort", "Linear Search", "Binary Search", "Depth First Search"],
          correctAnswerIndex: 2,
          explanation: "It modifies Binary Search to determine which half of the array is normally sorted before deciding which way to narrow the search space."
        },
        {
          id: "lf-mcq-12-8",
          question: "How do you know if the left half of a rotated array is sorted?",
          options: ["If nums[left] <= nums[right]", "If nums[left] <= nums[mid]", "If nums[mid] <= nums[right]", "If target < nums[mid]"],
          correctAnswerIndex: 1,
          explanation: "If the value at the left pointer is less than or equal to the value at mid, the left half is strictly sorted."
        },
        {
          id: "lf-mcq-12-9",
          question: "In the HackerRank 'Left Rotation' problem, how can you solve it without looping element by element?",
          options: ["By using slice() and concat().", "By using a Hash Map.", "By sorting the array.", "By using a Linked List."],
          correctAnswerIndex: 0,
          explanation: "You can slice the array at the rotation index and concatenate the two halves together."
        },
        {
          id: "lf-mcq-12-10",
          question: "In the HackerRank 'New Year Chaos' problem, what is the maximum number of bribes a person can make before it's 'Too chaotic'?",
          options: ["1", "2", "3", "Unlimited"],
          correctAnswerIndex: 1,
          explanation: "The problem states a person can bribe at most 2 people. If an element has moved forward more than 2 spaces from its original position, it's Too chaotic."
        }
      ];
    case 13:
      return [
        {
          id: "lf-mcq-13-1",
          question: "When building an Accordion in Vanilla JS, which CSS property is commonly transitioned for smooth opening/closing?",
          options: ["display", "max-height", "position", "z-index"],
          correctAnswerIndex: 1,
          explanation: "You cannot transition 'display: none'. Transitioning 'max-height' from 0 to scrollHeight allows for a smooth sliding animation."
        },
        {
          id: "lf-mcq-13-2",
          question: "What JavaScript method gets you a collection of all accordion headers?",
          options: ["getElementById", "querySelector", "querySelectorAll", "getElementsByClassName"],
          correctAnswerIndex: 2,
          explanation: "querySelectorAll returns a NodeList of all elements matching the CSS selector."
        },
        {
          id: "lf-mcq-13-3",
          question: "To close a modal popup when clicking the dark background overlay, what logic is used?",
          options: ["if (e.target === overlayElement) closeModal()", "if (e.currentTarget === overlayElement) closeModal()", "e.stopPropagation()", "modal.hide()"],
          correctAnswerIndex: 0,
          explanation: "Checking if e.target strictly equals the overlay ensures the click happened on the background itself, not on the modal content box inside it."
        },
        {
          id: "lf-mcq-13-4",
          question: "Why is an optimized GitHub README important for interviews?",
          options: ["It compiles the code faster.", "It serves as your technical resume and demonstrates communication skills.", "It increases GitHub API limits.", "It hides your code from competitors."],
          correctAnswerIndex: 1,
          explanation: "Interviewers often skim GitHub profiles. A great README shows professionalism and explains the 'why' behind the code."
        },
        {
          id: "lf-mcq-13-5",
          question: "Which of these is a clean, professional commit message?",
          options: ["fixed bug", "feat: add modal component", "asdfasdf", "update"],
          correctAnswerIndex: 1,
          explanation: "Conventional Commits (feat:, fix:, refactor:) provide immediate context to reviewers."
        },
        {
          id: "lf-mcq-13-6",
          question: "In HackerRank 'Min Swaps 2', what graph concept helps find the minimum swaps?",
          options: ["Finding connected components", "Finding cycles", "Dijkstra's shortest path", "Topological sort"],
          correctAnswerIndex: 1,
          explanation: "Elements out of place form a cycle. The minimum swaps to resolve a cycle of size 'k' is 'k - 1'."
        },
        {
          id: "lf-mcq-13-7",
          question: "In HackerRank 'Array Manipulation', doing O(n) updates per query causes a timeout. What technique solves it?",
          options: ["Hash Maps", "Binary Search Trees", "Difference Array / Prefix Sum", "Sliding Window"],
          correctAnswerIndex: 2,
          explanation: "Adding 'k' to start_index and '-k' to end_index+1 allows you to perform range updates in O(1). A final prefix sum pass computes the results in O(n)."
        },
        {
          id: "lf-mcq-13-8",
          question: "What property gets the exact height of an element's content, even if it is hidden?",
          options: ["offsetHeight", "clientHeight", "scrollHeight", "innerHeight"],
          correctAnswerIndex: 2,
          explanation: "scrollHeight gives the total height of the content, which is used to set max-height dynamically in accordions."
        },
        {
          id: "lf-mcq-13-9",
          question: "How do you add a class using Vanilla JS?",
          options: ["element.className += ' new'", "element.classList.add('new')", "element.style.class = 'new'", "Both A and B are valid"],
          correctAnswerIndex: 3,
          explanation: "Both work, but classList.add() is the modern, preferred, and safer way."
        },
        {
          id: "lf-mcq-13-10",
          question: "Which CSS property hides content extending past an accordion header when closed?",
          options: ["display: none", "visibility: hidden", "overflow: hidden", "opacity: 0"],
          correctAnswerIndex: 2,
          explanation: "overflow: hidden prevents the inner content from showing when the max-height is set to 0."
        }
      ];
    case 15:
      return [
        {
          id: "lf-mcq-15-1",
          question: "Why is practicing spoken answers important for an interview?",
          options: ["It improves typing speed.", "It proves you memorize documentation.", "Code is only half the interview; communicating logic clearly is the other half.", "It makes the interview shorter."],
          correctAnswerIndex: 2,
          explanation: "Interviewers evaluate your ability to work on a team. If you can write code but can't explain it, you fail the communication aspect."
        },
        {
          id: "lf-mcq-15-2",
          question: "In the '3Sum' problem, what is the required first step to use the two-pointer approach?",
          options: ["Use a Hash Map.", "Sort the array.", "Reverse the array.", "Remove duplicates immediately."],
          correctAnswerIndex: 1,
          explanation: "Sorting the array allows you to intelligently move the left and right pointers based on whether the sum is too high or too low."
        },
        {
          id: "lf-mcq-15-3",
          question: "In '3Sum', how do you handle duplicate triplets?",
          options: ["Use a Set to store the final arrays.", "Throw an error.", "Skip adjacent duplicate elements during the iteration and pointer movement.", "Filter the final result array."],
          correctAnswerIndex: 2,
          explanation: "While a Set works, it is slow. The optimal way is to advance pointers past adjacent duplicate numbers."
        },
        {
          id: "lf-mcq-15-4",
          question: "In 'Container With Most Water', how do you calculate the area between two lines?",
          options: ["Math.max(height[left], height[right]) * (right - left)", "Math.min(height[left], height[right]) * (right - left)", "(height[left] + height[right]) / 2", "height[left] * height[right]"],
          correctAnswerIndex: 1,
          explanation: "The water level is limited by the shorter line, so you use Math.min on the heights, multiplied by the distance (width) between them."
        },
        {
          id: "lf-mcq-15-5",
          question: "In 'Container With Most Water', how do you decide which pointer to move?",
          options: ["Always move left.", "Always move right.", "Move the pointer pointing to the taller line.", "Move the pointer pointing to the shorter line."],
          correctAnswerIndex: 3,
          explanation: "You are limited by the shorter line. Moving the taller line cannot increase the area, so you must move the shorter line in hopes of finding a taller one."
        },
        {
          id: "lf-mcq-15-6",
          question: "When explaining Hoisting verbally, what key distinction should you make?",
          options: ["Functions are not hoisted.", "var is initialized with undefined, let/const enter the TDZ.", "var throws an error.", "Let and const are not hoisted at all."],
          correctAnswerIndex: 1,
          explanation: "The crucial difference is that 'var' gets undefined, while 'let' and 'const' are hoisted but remain inaccessible in the Temporal Dead Zone."
        },
        {
          id: "lf-mcq-15-7",
          question: "When explaining the Event Loop, what two queues must you differentiate?",
          options: ["Render Queue and Call Stack", "MacroTask Queue (setTimeout) and Microtask Queue (Promises)", "Local Queue and Global Queue", "Sync Queue and Async Queue"],
          correctAnswerIndex: 1,
          explanation: "Explaining that the Event Loop empties the Microtask Queue before moving to the Macrotask Queue shows deep understanding."
        },
        {
          id: "lf-mcq-15-8",
          question: "What is a good framework for answering 'Tell me about a project'?",
          options: ["List all dependencies in package.json.", "Explain what it does, why you built it, the hardest technical challenge, and how you solved it.", "Read the code line by line.", "Only talk about the UI design."],
          correctAnswerIndex: 1,
          explanation: "This structure provides context, shows problem-solving skills, and highlights technical competence."
        },
        {
          id: "lf-mcq-15-9",
          question: "What time complexity is the optimal 3Sum solution?",
          options: ["O(n)", "O(n log n)", "O(n^2)", "O(n^3)"],
          correctAnswerIndex: 2,
          explanation: "Sorting takes O(n log n). The nested loops (one fixed pointer, two moving pointers) take O(n^2). The overall complexity is O(n^2)."
        },
        {
          id: "lf-mcq-15-10",
          question: "If an interviewer asks 'Why did you use Vanilla JS instead of React?', what is a strong answer?",
          options: ["React is too hard.", "Vanilla JS is faster.", "I wanted to solidify my foundational understanding of DOM manipulation and state management before relying on abstractions.", "I hate JSX."],
          correctAnswerIndex: 2,
          explanation: "This answer demonstrates a commitment to learning fundamentals, which companies highly value in junior devs."
        }
      ];
    case 16:
      return [
        {
          id: "lf-mcq-16-1",
          question: "In the 'Number of Islands' problem, what does a '1' represent?",
          options: ["Water", "Land", "A visited node", "A bridge"],
          correctAnswerIndex: 1,
          explanation: "The problem uses '1's to represent land. Connected '1's form an island."
        },
        {
          id: "lf-mcq-16-2",
          question: "How do you ensure you don't count the same island twice in 'Number of Islands'?",
          options: ["Sort the matrix.", "Keep an array of counts.", "When you find a '1', use DFS/BFS to turn all connected '1's into '0's (sink the island).", "Use a sliding window."],
          correctAnswerIndex: 2,
          explanation: "Mutating the grid by 'sinking' the land (or marking it visited) prevents infinite loops and double-counting."
        },
        {
          id: "lf-mcq-16-3",
          question: "In graph problems, what does DFS stand for?",
          options: ["Direct File System", "Depth First Search", "Data Flow Stream", "Dynamic Function Scope"],
          correctAnswerIndex: 1,
          explanation: "Depth First Search explores as far as possible along each branch before backtracking, typically using Recursion."
        },
        {
          id: "lf-mcq-16-4",
          question: "In graph problems, what does BFS stand for?",
          options: ["Breadth First Search", "Binary File System", "Basic Function Stream", "Block Formatting Scope"],
          correctAnswerIndex: 0,
          explanation: "Breadth First Search explores neighbor nodes first, level by level, typically using a Queue."
        },
        {
          id: "lf-mcq-16-5",
          question: "The 'Course Schedule' problem is a classic example of what graph algorithm?",
          options: ["Dijkstra's Shortest Path", "Topological Sort / Cycle Detection", "A* Search", "Floyd-Warshall"],
          correctAnswerIndex: 1,
          explanation: "Prerequisites form a directed graph. If there is a cycle (e.g. A requires B, B requires A), you cannot finish the courses."
        },
        {
          id: "lf-mcq-16-6",
          question: "When asked about a difficult bug in an interview, what should you focus on?",
          options: ["How frustrated you were.", "Blaming the documentation.", "Your debugging process (e.g. using console logs, checking network tabs) and the final resolution.", "How someone else fixed it for you."],
          correctAnswerIndex: 2,
          explanation: "Interviewers want to see a logical, methodical approach to troubleshooting."
        },
        {
          id: "lf-mcq-16-7",
          question: "How can you easily add a screenshot to a GitHub README?",
          options: ["Host it on an external AWS server.", "Drag and drop the image into the GitHub issue/PR text editor to get a hosted markdown link, then paste it.", "Convert it to Base64.", "Email it to GitHub support."],
          correctAnswerIndex: 1,
          explanation: "GitHub provides a free image hosting trick by dragging images into any markdown text box on their site."
        },
        {
          id: "lf-mcq-16-8",
          question: "For a 2D matrix DFS, what are the typical recursive calls made from cell (r, c)?",
          options: ["(r+1, c+1)", "(r+1, c), (r-1, c), (r, c+1), (r, c-1)", "(r*2, c*2)", "None, DFS doesn't use recursion."],
          correctAnswerIndex: 1,
          explanation: "In a standard grid, you move down, up, right, and left to visit adjacent cells."
        },
        {
          id: "lf-mcq-16-9",
          question: "What is the time complexity of 'Number of Islands'?",
          options: ["O(m + n)", "O(m * n)", "O(m^2)", "O(log(m*n))"],
          correctAnswerIndex: 1,
          explanation: "In the worst case, you visit every cell in the grid (m rows * n columns) a constant number of times."
        },
        {
          id: "lf-mcq-16-10",
          question: "Why should every GitHub project have instructions on 'How to run it'?",
          options: ["Because GitHub requires it.", "So interviewers don't have to guess or troubleshoot how to start your app.", "To make the README longer.", "It is only required for Python."],
          correctAnswerIndex: 1,
          explanation: "If an interviewer can't start your project in 30 seconds, they will close it and move on."
        }
      ];
    case 17:
      return [
        {
          id: "lf-mcq-17-1",
          question: "What is the recommended framework for the 'Tell me about yourself' behavioral question?",
          options: ["Your entire life story from birth.", "Past, Present, Future.", "Only technical skills.", "Hobbies and personal life."],
          correctAnswerIndex: 1,
          explanation: "Past (your background), Present (what you are learning/building now), Future (why you want to work at this specific company)."
        },
        {
          id: "lf-mcq-17-2",
          question: "How long should your 'Tell me about yourself' pitch be?",
          options: ["30 seconds", "1 to 2 minutes", "5 minutes", "10 minutes"],
          correctAnswerIndex: 1,
          explanation: "Keep it concise and punchy. Anything over 2 minutes risks losing the interviewer's attention."
        },
        {
          id: "lf-mcq-17-3",
          question: "When answering 'Why Leapfrog?', what is the best approach?",
          options: ["'I just need a job.'", "'The salary looks good.'", "Show you researched them by mentioning their training program, culture, or specific projects.", "'It is close to my house.'"],
          correctAnswerIndex: 2,
          explanation: "Companies want to hire people who actually want to work for *them*, not just anyone who will pay them."
        },
        {
          id: "lf-mcq-17-4",
          question: "What is the best way to answer the 'What is your greatest weakness?' question?",
          options: ["'I am a perfectionist.'", "'I work too hard.'", "Be honest about a real weakness, but immediately follow up with actionable steps you are taking to fix it.", "'I don't have any.'"],
          correctAnswerIndex: 2,
          explanation: "Perfectionism is a cliché. Sharing a real, minor weakness (e.g., getting stuck too long before asking for help) and showing growth demonstrates self-awareness."
        },
        {
          id: "lf-mcq-17-5",
          question: "In 'Clone Graph', what is the biggest trap?",
          options: ["Syntax errors", "Infinite loops caused by cycles in the graph", "Memory limits", "Finding the starting node"],
          correctAnswerIndex: 1,
          explanation: "If A points to B, and B points to A, a naive recursive clone will bounce between them forever."
        },
        {
          id: "lf-mcq-17-6",
          question: "How do you prevent infinite loops in 'Clone Graph'?",
          options: ["Use a for loop instead of recursion.", "Use a Hash Map to store nodes you have already cloned, and return the clone if visited.", "Only clone one level deep.", "Sort the graph."],
          correctAnswerIndex: 1,
          explanation: "A 'visited' map mapping original nodes to cloned nodes breaks the cycle."
        },
        {
          id: "lf-mcq-17-7",
          question: "What is a 'STAR' story?",
          options: ["A story about space.", "Situation, Task, Action, Result — a format for answering behavioral questions.", "Standard Technical Array Response.", "A rating metric."],
          correctAnswerIndex: 1,
          explanation: "STAR is the industry standard for answering 'Tell me about a time when...' questions."
        },
        {
          id: "lf-mcq-17-8",
          question: "Why should you record yourself doing a self-mock interview?",
          options: ["To post it on YouTube.", "To hear if you use filler words ('um', 'like') and see if you explain things simply.", "To send to the recruiter.", "To test your microphone."],
          correctAnswerIndex: 1,
          explanation: "Hearing yourself speak highlights pacing issues and filler words you don't notice in the moment."
        },
        {
          id: "lf-mcq-17-9",
          question: "If an interviewer asks a JS theory question you don't know, what should you do?",
          options: ["Make up an answer.", "Say 'I don't know' and stay silent.", "Admit you don't know the exact term, but explain what you *do* know around the topic, or relate it to a similar concept.", "Ask to skip it."],
          correctAnswerIndex: 2,
          explanation: "Showing how you deduce answers or what surrounding knowledge you have is much better than a flat 'I don't know'."
        },
        {
          id: "lf-mcq-17-10",
          question: "What should you do at the very end of an HR interview?",
          options: ["Leave the meeting immediately.", "Ask smart, prepared questions about the team, culture, or role.", "Ask for feedback on your performance.", "Ask about salary right away."],
          correctAnswerIndex: 1,
          explanation: "Having prepared questions shows you are engaged, curious, and taking the opportunity seriously."
        }
      ];
    case 18:
      return [
        {
          id: "lf-mcq-18-1",
          question: "During a Remote Take-Home Assignment, what is often the most important evaluation criteria?",
          options: ["Using the newest, most complex framework.", "Clean code, modular functions, good variable names, and error handling.", "Making it look exactly like Apple's website.", "Finishing it in 30 minutes."],
          correctAnswerIndex: 1,
          explanation: "Companies want to see if your code is maintainable and if you handle edge cases (like API failures)."
        },
        {
          id: "lf-mcq-18-2",
          question: "When using the Fetch API, what should you always include?",
          options: ["A setTimeout.", "A try/catch block and an !res.ok check.", "A while loop.", "Local Storage."],
          correctAnswerIndex: 1,
          explanation: "Network requests can fail. You must handle rejections (catch) and non-200 HTTP responses (!res.ok)."
        },
        {
          id: "lf-mcq-18-3",
          question: "What is a good UI practice when fetching data asynchronously?",
          options: ["Freeze the screen.", "Show a 'Loading...' indicator state.", "Refresh the page.", "Alert the user."],
          correctAnswerIndex: 1,
          explanation: "Users need visual feedback that an operation is happening in the background."
        },
        {
          id: "lf-mcq-18-4",
          question: "If a user is typing in a search bar to filter API results locally, what JS method is best?",
          options: ["Array.prototype.map()", "Array.prototype.reduce()", "Array.prototype.filter()", "Array.prototype.splice()"],
          correctAnswerIndex: 2,
          explanation: "filter() is designed to create a new array containing only elements that pass a test condition."
        },
        {
          id: "lf-mcq-18-5",
          question: "How do you do a case-insensitive search filter in JavaScript?",
          options: ["Use CSS text-transform.", "Convert both the search query and the target string toLowerCase() before comparing.", "JavaScript does it automatically.", "Use the === operator."],
          correctAnswerIndex: 1,
          explanation: "Comparing 'a' to 'A' returns false. Converting both to the same case ensures a match."
        },
        {
          id: "lf-mcq-18-6",
          question: "If you need to display fetched data in a grid layout, what is the best CSS tool?",
          options: ["CSS Floats", "CSS Tables", "CSS Grid or Flexbox", "Absolute Positioning"],
          correctAnswerIndex: 2,
          explanation: "Grid and Flexbox are the modern standards for responsive layouts."
        },
        {
          id: "lf-mcq-18-7",
          question: "Why should you comment complex logic in a take-home assignment?",
          options: ["To make the file larger.", "To show the reviewer your thought process, even if they aren't in the room with you.", "To pass the compiler.", "Because all lines must be commented."],
          correctAnswerIndex: 1,
          explanation: "Since you can't verbally explain your code in a take-home, comments act as your voice."
        },
        {
          id: "lf-mcq-18-8",
          question: "What HTTP method does fetch() use by default?",
          options: ["POST", "GET", "PUT", "DELETE"],
          correctAnswerIndex: 1,
          explanation: "If no options object is provided, fetch defaults to a GET request."
        },
        {
          id: "lf-mcq-18-9",
          question: "How do you parse a JSON response from the Fetch API?",
          options: ["JSON.parse(res)", "res.json()", "res.parse()", "res.text()"],
          correctAnswerIndex: 1,
          explanation: "The response object has a built-in .json() method which returns a Promise resolving to the parsed data."
        },
        {
          id: "lf-mcq-18-10",
          question: "What happens if a fetch() request encounters a 404 Not Found error?",
          options: ["The Promise is automatically rejected.", "The browser crashes.", "The Promise resolves normally, but res.ok will be false.", "It throws a syntax error."],
          correctAnswerIndex: 2,
          explanation: "Fetch only rejects on network failures. 404 and 500 status codes still resolve normally, so you MUST check res.ok manually."
        }
      ];
    case 19:
      return [
        {
          id: "lf-mcq-19-1",
          question: "What is the primary goal of Whiteboarding during an on-site interview?",
          options: ["Writing perfectly compiling syntax.", "Showing off your handwriting.", "Communicating your logic, exploring edge cases, and demonstrating problem-solving steps.", "Solving it as fast as possible in silence."],
          correctAnswerIndex: 2,
          explanation: "Interviewers care more about how you think than if you forgot a semicolon."
        },
        {
          id: "lf-mcq-19-2",
          question: "Before writing any code on a whiteboard, what should you do first?",
          options: ["Draw a class diagram.", "Start writing 'function()'.", "Clarify requirements, identify inputs/outputs, and write down an example test case.", "Ask for the answer."],
          correctAnswerIndex: 2,
          explanation: "Jumping into code without clarifying assumptions often leads to solving the wrong problem."
        },
        {
          id: "lf-mcq-19-3",
          question: "When writing code on a whiteboard, how should you track variables?",
          options: ["In your head.", "Write them down on the side and manually update them as you trace through your loop.", "You don't need to track them.", "Use your fingers."],
          correctAnswerIndex: 1,
          explanation: "Manually dry-running your code with a sample input proves your logic works and catches off-by-one errors."
        },
        {
          id: "lf-mcq-19-4",
          question: "If you realize your whiteboard code has a bug halfway through, what do you do?",
          options: ["Panic and erase everything.", "Pretend it's not there.", "Acknowledge it out loud, explain why it's wrong, and correct it.", "Change the subject."],
          correctAnswerIndex: 2,
          explanation: "Finding your own bugs is a huge positive signal. It shows you can debug your own work."
        },
        {
          id: "lf-mcq-19-5",
          question: "Why do interviewers sometimes ask you to solve a problem on a whiteboard instead of an IDE?",
          options: ["To save electricity.", "Because it removes the crutch of autocomplete and syntax highlighting, forcing you to rely on core logic.", "To test your spelling.", "Because it is faster."],
          correctAnswerIndex: 1,
          explanation: "Whiteboarding exposes true understanding of algorithms without IDE assistance."
        },
        {
          id: "lf-mcq-19-6",
          question: "If you get completely stuck on the optimal approach during an on-site interview, what should you do?",
          options: ["Give up.", "Stare at the board in silence.", "Explain the brute force O(n^2) approach first to get something on the board, then ask if you can optimize.", "Ask to leave."],
          correctAnswerIndex: 2,
          explanation: "A working brute force solution is always better than a blank board."
        },
        {
          id: "lf-mcq-19-7",
          question: "Which of these is a good question to ask the interviewer to clarify inputs?",
          options: ["'Can the array be empty?'", "'Can it contain negative numbers?'", "'Will the input always be valid?'", "All of the above."],
          correctAnswerIndex: 3,
          explanation: "Asking about edge cases shows you think about real-world software engineering."
        },
        {
          id: "lf-mcq-19-8",
          question: "In the 'Two Sum' problem, if you explain the Hash Map solution on a whiteboard, what must you declare about complexity?",
          options: ["Time is O(1)", "Time is O(n), Space is O(n)", "Time is O(n^2)", "Space is O(1)"],
          correctAnswerIndex: 1,
          explanation: "You must note the trade-off: you get O(n) time, but it requires O(n) extra space memory."
        },
        {
          id: "lf-mcq-19-9",
          question: "When whiteboarding, is it okay to use pseudo-code?",
          options: ["Never.", "Yes, to outline the structure before writing real code, as long as the interviewer agrees.", "Always, pseudo-code is the only acceptable way.", "Only if you don't know the language."],
          correctAnswerIndex: 1,
          explanation: "Writing a quick pseudo-code outline helps structure your thoughts before committing to syntax."
        },
        {
          id: "lf-mcq-19-10",
          question: "What is the most important rule of the technical interview?",
          options: ["Never make a typo.", "Always use the newest JS features.", "Keep talking. Let the interviewer inside your head.", "Finish in 5 minutes."],
          correctAnswerIndex: 2,
          explanation: "Silence is the enemy. The interviewer cannot evaluate your problem-solving skills if they don't know what you are thinking."
        }
      ];
    case 20:
      return [
        {
          id: "lf-mcq-20-1",
          question: "What is the main purpose of the Full Mock Test on Day 20?",
          options: ["To learn new topics.", "To simulate the exact 2-hour pressure of the real exam without Google or hints.", "To memorize syntax.", "To take a break."],
          correctAnswerIndex: 1,
          explanation: "Simulation builds endurance and proves you are ready for the actual constraints."
        },
        {
          id: "lf-mcq-20-2",
          question: "When taking the Full Mock Test, what should you do if you forget a specific array method name?",
          options: ["Google it quickly.", "Look at old notes.", "Write a custom helper function with a basic loop to mimic it, or use pseudo-code and explain.", "Give up."],
          correctAnswerIndex: 2,
          explanation: "In a no-Google scenario, falling back to basic loops shows resilience."
        },
        {
          id: "lf-mcq-20-3",
          question: "After finishing the Full Mock Test, what is the crucial next step?",
          options: ["Go to sleep.", "Strictly grade yourself, check edge cases, and fix any gaps immediately.", "Post it on social media.", "Delete the code."],
          correctAnswerIndex: 1,
          explanation: "A mock test is useless if you don't review your mistakes and patch the holes in your knowledge."
        },
        {
          id: "lf-mcq-20-4",
          question: "Why should you check your GitHub profile in 'Incognito' mode?",
          options: ["To hide your history.", "To bypass rate limits.", "To see exactly what the recruiter/interviewer will see, ensuring nothing is hidden or broken.", "To change the theme color."],
          correctAnswerIndex: 2,
          explanation: "Incognito mode guarantees you are viewing the public version of your profile without your logged-in permissions."
        },
        {
          id: "lf-mcq-20-5",
          question: "During a timed test, if you are stuck on a bug for 20 minutes, what is the best strategy?",
          options: ["Keep trying until you fix it.", "Rewrite the whole file.", "Comment out the broken part, skip to the next problem, and come back if there is time.", "Submit it as is."],
          correctAnswerIndex: 2,
          explanation: "Time management is key. Getting partial points on multiple problems is better than failing all of them because you got stuck on one."
        },
        {
          id: "lf-mcq-20-6",
          question: "What edge case is common in Array problems that you should always test?",
          options: ["Negative numbers.", "Empty array [] or null.", "Decimals.", "Strings."],
          correctAnswerIndex: 1,
          explanation: "Always check what happens if the input is empty to prevent undefined errors."
        },
        {
          id: "lf-mcq-20-7",
          question: "What edge case is common in String problems?",
          options: ["Extremely long strings.", "Empty string '' or single character strings.", "Numbers.", "Arrays."],
          correctAnswerIndex: 1,
          explanation: "If a string is empty or length 1, algorithms like Sliding Window or Two Pointers can easily crash if bounds aren't checked."
        },
        {
          id: "lf-mcq-20-8",
          question: "If a problem requires O(log n) time complexity, what algorithm family is almost certainly expected?",
          options: ["Sorting", "Hash Maps", "Binary Search (or dividing the search space)", "Linear Search"],
          correctAnswerIndex: 2,
          explanation: "O(log n) is the hallmark of dividing a problem in half at each step, like Binary Search."
        },
        {
          id: "lf-mcq-20-9",
          question: "If a problem mentions 'Sorted Array', what two techniques should immediately come to mind?",
          options: ["Hash Maps and Queues", "Binary Search and Two Pointers", "Stacks and DFS", "Recursion and Bubble Sort"],
          correctAnswerIndex: 1,
          explanation: "Sorted arrays allow for O(log n) search (Binary Search) or O(n) solutions shrinking from the ends (Two Pointers)."
        },
        {
          id: "lf-mcq-20-10",
          question: "What is the most critical thing to do the evening before the real interview?",
          options: ["Cram all night.", "Learn a new framework.", "Rest your brain, eat well, and sleep early.", "Rewrite your resume."],
          correctAnswerIndex: 2,
          explanation: "Mental fatigue causes careless bugs. Rest is the most productive thing you can do the night before."
        }
      ];
    default:
      return [];
  }
}
