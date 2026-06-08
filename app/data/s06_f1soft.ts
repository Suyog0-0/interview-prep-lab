import type { InterviewSection } from "../../types";

const allQuestions = [
    // ── SECTION A: JavaScript / Core ──────────────────────────────
    {
      id: "f1-q01",
      q: "How does the JavaScript event loop work? What is the call stack, task queue, and microtask queue?",
      hint: "Single-threaded + Web APIs + queues. Microtasks (Promises) run before macrotasks (setTimeout).",
      answer:
        "JavaScript is single-threaded. The event loop works like this:\n1. Call Stack — executes synchronous code top-to-bottom.\n2. Web APIs — async operations (setTimeout, fetch) are handed to the browser.\n3. Microtask Queue — Promises (.then, async/await) are queued here. Drained COMPLETELY before the next macrotask.\n4. Macrotask Queue — setTimeout, setInterval callbacks queue here. One is picked per loop tick.\n\nOrder: synchronous → microtasks (all) → one macrotask → repeat.\n\nExample: console.log('A'); setTimeout(()=>console.log('B'),0); Promise.resolve().then(()=>console.log('C')); console.log('D');\nOutput: A D C B",
      code: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
// Output: A D C B`,
      language: "javascript",
      diagram: `[Call Stack]         [Web APIs (Browser)]
|          | ------> | setTimeout()     |
| console  |         | fetch()          |
|__________|         |__________________|
     ^                        |
     |                        v
     |               [Task / Macrotask Queue]
     |               | callback()       |
[Event Loop] <-------|__________________|
     ^                        
     |               [Microtask Queue]
     |               | Promise.then()   |
     +---------------|__________________|
     (Drains Microtasks FIRST, then 1 Macrotask)`,
    },
    {
      id: "f1-q02",
      q: "What is multithreading and how does JavaScript simulate concurrent behaviour without it? (common question)",
      hint: "Web Workers for true threads, async/await and event loop for concurrency illusion.",
      answer:
        "JavaScript is single-threaded by design — it can only execute one piece of code at a time on the main thread.\n\nIt simulates concurrency through:\n1. Asynchronous APIs (setTimeout, fetch) — offloaded to the browser's C++ threads, result comes back via the event loop.\n2. async/await and Promises — allow non-blocking code that reads synchronously.\n3. Web Workers — true background threads in browsers, but they share NO memory with the main thread (communicate via postMessage).\n\nFor CPU-intensive tasks: use Web Workers. For I/O-heavy tasks: use async/await.",
    },
    {
      id: "f1-q03",
      q: "What is the difference between var, let, and const? (common question)",
      hint: "Scope, hoisting, re-assignment.",
      answer:
        "var: function-scoped, hoisted (initialized as undefined), can be re-declared and re-assigned.\nlet: block-scoped, hoisted but NOT initialized (temporal dead zone), can be re-assigned but not re-declared.\nconst: block-scoped, hoisted but NOT initialized, CANNOT be re-assigned or re-declared. Object properties can still change.\n\nBest practice: use const by default, let when re-assignment is needed, avoid var.",
    },
    {
      id: "f1-q04",
      q: "What is a closure? Give a practical real-world use case.",
      hint: "A function retaining access to its outer scope after that scope has returned.",
      answer:
        "A closure is a function that 'closes over' variables from its outer scope — it remembers them even after the outer function has returned.\n\nReal-world use cases:\n1. Data privacy / encapsulation — private counter pattern.\n2. Event handlers that remember configuration.\n3. Memoization — caching function results.\n4. Currying and partial application.\n\nExample: A counter factory where each counter maintains its own independent count.",
      code: `function makeCounter() {
  let count = 0;          // private — not accessible outside
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}
const c = makeCounter();
c.increment(); // 1
c.increment(); // 2
c.value();     // 2`,
      language: "javascript",
    },
    {
      id: "f1-q05",
      q: "Explain the difference between == and === in JavaScript. (common question)",
      hint: "Type coercion vs strict equality.",
      answer:
        '== performs type coercion before comparing. === checks value AND type without coercion.\n\nExamples:\n0 == false   → true  (false coerced to 0)\n0 === false  → false (different types)\nnull == undefined  → true\nnull === undefined → false\n"5" == 5     → true\n"5" === 5    → false\n\nAlways use === in production code to avoid subtle bugs. F1Soft\'s fintech apps handle money — type coercion bugs can be dangerous.',
    },
    {
      id: "f1-q06",
      q: "What are Promises? How is async/await different from .then()/.catch()?",
      hint: "Both handle async, but async/await reads like synchronous code.",
      answer:
        "A Promise represents a future value — pending, fulfilled, or rejected.\n\n.then()/.catch() uses chaining — good for pipelines but gets nested (callback-hell-like) for complex flows.\n\nasync/await is syntactic sugar over Promises — lets you write async code that reads top-to-bottom like synchronous code. You must handle errors with try/catch.\n\nKey difference: await pauses ONLY the current async function, not the entire thread. Both are equivalent under the hood.",
      code: `// .then() style
fetch('/api/user')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await style — easier to read and debug
async function getUser() {
  try {
    const res = await fetch('/api/user');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}`,
      language: "javascript",
    },
    {
      id: "f1-q07",
      q: "What is the difference between null and undefined? (common question)",
      hint: "One is intentional absence, the other is uninitialized.",
      answer:
        "undefined: a variable declared but never assigned. Also returned by functions with no return statement, or accessing non-existent object properties.\n\nnull: explicitly set by a developer to represent 'intentionally empty'. Typeof null returns 'object' (historical JS bug).\n\nnull == undefined → true (loose equality)\nnull === undefined → false (strict equality)\n\nUse null when YOU want to say 'no value here'. JavaScript uses undefined when it doesn't know what value to give.",
    },
    {
      id: "f1-q08",
      q: "What is hoisting in JavaScript? (common question)",
      hint: "Declarations are moved to top of scope before execution.",
      answer:
        "Hoisting is JavaScript's behavior of moving declarations (not initializations) to the top of their scope before code runs.\n\nvar: hoisted AND initialized to undefined.\nlet/const: hoisted but NOT initialized → accessing before declaration throws ReferenceError (Temporal Dead Zone).\nFunction declarations: fully hoisted — you can call them before they appear.\nFunction expressions (const fn = function(){}): NOT hoisted.\n\nExample: console.log(x); var x = 5; → logs undefined (not error).",
    },
    {
      id: "f1-q09",
      q: "What is prototype-based inheritance in JavaScript? How does it differ from classical OOP?",
      hint: "Objects inherit from other objects via the prototype chain.",
      answer:
        "In classical OOP (Java, C++): classes are blueprints, objects are instances. Inheritance via 'extends'.\n\nIn JavaScript: every object has an internal [[Prototype]] link to another object. Properties are looked up the chain until found or null is reached. ES6 class syntax is syntactic sugar over this prototype system.\n\nPrototype chain example: Array instance → Array.prototype → Object.prototype → null\n\nKey difference: JS prototypes are live — you can add methods to built-in prototypes (though this is bad practice). Classical inheritance is static at compile time.",
      code: `function Animal(name) { this.name = name; }
Animal.prototype.speak = function() {
  return this.name + ' makes a sound.';
};
const dog = new Animal('Rex');
dog.speak(); // "Rex makes a sound."
// dog.__proto__ === Animal.prototype → true`,
      language: "javascript",
    },
    {
      id: "f1-q10",
      q: "What is event delegation and why is it useful?",
      hint: "One listener on the parent instead of many on children.",
      answer:
        "Event delegation uses JavaScript's event bubbling — events propagate up from child to parent.\n\nInstead of attaching click listeners to 100 list items, attach ONE listener to the parent <ul> and use event.target to find which child was clicked.\n\nBenefits:\n1. Memory efficient — one listener instead of N.\n2. Works for dynamically added elements — no need to re-attach.\n3. Less DOM interaction on setup.\n\nUsed heavily in frameworks and virtual DOM implementations.",
      code: `// ✗ Bad — 100 listeners
document.querySelectorAll('li').forEach(li =>
  li.addEventListener('click', handler));

// ✓ Good — 1 listener via delegation
document.querySelector('ul').addEventListener('click', e => {
  if (e.target.tagName === 'LI') handler(e.target);
});`,
      language: "javascript",
    },

    // ── SECTION B: OOP / SOLID (F1Soft heavily tests this) ────────
    {
      id: "f1-q11",
      q: "Describe the SOLID principles in detail with one JavaScript example for each. (common question)",
      hint: "S-O-L-I-D: five design principles for clean, maintainable OOP code.",
      answer:
        "S — Single Responsibility: A class/function should have only ONE reason to change.\n  Example: UserService handles users, EmailService handles emails — never one class doing both.\n\nO — Open/Closed: Open for extension, closed for modification. Add new features by adding new code, not editing old code.\n  Example: Use a payment strategy interface — add new payment methods without touching existing ones.\n\nL — Liskov Substitution: Subclasses must be usable wherever the parent is used without breaking behavior.\n  Example: If Bird has a fly() method, Penguin should NOT extend Bird since penguins don't fly.\n\nI — Interface Segregation: Don't force classes to implement interfaces they don't use. Split fat interfaces.\n  Example: Separate Printable, Scannable, Faxable instead of one big OfficeMachine interface.\n\nD — Dependency Inversion: High-level modules should depend on abstractions, not concrete implementations.\n  Example: OrderService should depend on a PaymentGateway interface, not directly on eSewa or Khalti class.",
    },
    {
      id: "f1-q12",
      q: "What are the four pillars of OOP? Explain each with a real example from a payment app context. (common question)",
      hint: "APIE — Abstraction, Polymorphism, Inheritance, Encapsulation.",
      answer:
        "Abstraction: Hide complexity, show only what's needed. In eSewa, you call pay(amount) without knowing the bank API internals.\n\nPolymorphism: Same method, different behaviors. pay() on EsewaGateway, KhaltiGateway, and ConnectIPSGateway all work differently but share the same interface.\n\nInheritance: Child class extends parent. DigitalWallet extends PaymentMethod — gets base methods like validate() but overrides processPayment().\n\nEncapsulation: Bundle data + methods, restrict access. A Wallet class hides the internal balance and exposes only deposit(), withdraw(), getBalance(). Direct balance mutation is prevented.",
    },
    {
      id: "f1-q13",
      q: "What is the difference between an abstract class and an interface? When would you use each?",
      hint: "Abstract class = partial blueprint. Interface = pure contract.",
      answer:
        "Abstract class:\n- Can have both implemented and abstract (unimplemented) methods.\n- Can have constructors, state (fields).\n- A class can extend only ONE abstract class.\n- Use when classes share code AND a common contract.\n\nInterface:\n- Pure contract — only method signatures, no implementation (in most languages).\n- A class can implement MULTIPLE interfaces.\n- Use when unrelated classes need to share a capability.\n\nIn TypeScript/Java: PaymentGateway is an interface (shared by eSewa, Khalti, bank). BasePaymentProvider is an abstract class (shared retry logic, but payment differs).",
    },
    {
      id: "f1-q14",
      q: "What is method overriding vs method overloading?",
      hint: "Overriding = child redefines parent method. Overloading = same name, different params.",
      answer:
        "Method Overriding: A subclass redefines a method that already exists in the parent class. Same name, same signature. Used for runtime polymorphism.\n  Example: Dog.speak() overrides Animal.speak()\n\nMethod Overloading: Same method name but different parameters (number or types). Resolved at COMPILE time. JavaScript doesn't natively support overloading — simulate it with default params or rest args.\n\nJava supports both. JavaScript only supports overriding natively.",
    },
    {
      id: "f1-q15",
      q: "What is encapsulation? How do you implement it in JavaScript?",
      hint: "Private data + controlled public interface.",
      answer:
        "Encapsulation means bundling data and methods that operate on that data, and restricting direct access to internal state.\n\nIn JavaScript you can implement it with:\n1. Closures (pre-ES2022) — private variables inside factory functions.\n2. Class private fields (#) — ES2022+, truly private.\n3. Underscore convention (_balance) — communicates 'private' but not enforced.\n\nFintech relevance: A Wallet class should NEVER let external code set balance = 9999. All mutations must go through deposit()/withdraw() which can validate and log.",
      code: `class Wallet {
  #balance = 0;  // truly private — can't be accessed outside

  deposit(amount) {
    if (amount <= 0) throw new Error('Invalid amount');
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Insufficient funds');
    this.#balance -= amount;
  }

  getBalance() { return this.#balance; }
}

const w = new Wallet();
w.deposit(500);
w.#balance; // SyntaxError — truly private`,
      language: "javascript",
    },

    // ── SECTION C: Data Structures & Algorithms ───────────────────
    {
      id: "f1-q16",
      q: "Given an array of integers, find the two numbers that sum to a target. Write the solution. (common question)",
      hint: "Brute force is O(n²). Use a HashMap for O(n).",
      answer:
        "O(n²) brute force: nested loops checking every pair. Acceptable for very small arrays.\n\nO(n) HashMap solution: As you iterate, store each number in a Map. For each number, check if (target - number) already exists in the Map. If yes, you found the pair.\n\nThis is a classic F1Soft coding test question — array manipulation with real-world context (e.g., split a transaction amount into two valid denominations).",
      code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return null; // no pair found
}

twoSum([2, 7, 11, 15], 9); // [0, 1] — nums[0] + nums[1] = 9`,
      language: "javascript",
    },
    {
      id: "f1-q17",
      q: "Reverse an array without using the built-in reverse() method. (common question)",
      hint: "Two-pointer swap — left and right moving inward.",
      answer:
        "Use two pointers: one at the start, one at the end. Swap the elements, then move pointers inward until they meet. This is O(n) time, O(1) space — in-place reversal.\n\nThis exact problem appeared in F1Soft's written coding test according to Glassdoor reports.",
      code: `function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Swap
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}

reverseArray([1, 2, 3, 4, 5]); // [5, 4, 3, 2, 1]`,
      language: "javascript",
    },
    {
      id: "f1-q18",
      q: "Find the maximum element in an array without using Math.max().",
      hint: "Initialize max to first element, iterate and compare.",
      answer:
        "Initialize a variable max to the first element. Iterate through the rest — if any element is greater than max, update max. Return max at the end.\n\nTime: O(n), Space: O(1).",
      code: `function findMax(arr) {
  if (arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

findMax([3, 1, 7, 2, 9, 4]); // 9`,
      language: "javascript",
    },
    {
      id: "f1-q19",
      q: "Check if a string is a palindrome.",
      hint: "Compare string to its reverse, or use two pointers.",
      answer:
        "Method 1: Reverse the string and compare.\nMethod 2 (more efficient): Two pointers from both ends — stop if any characters don't match.\n\nFor real interviews, also handle: case sensitivity, spaces, and special characters.",
      code: `function isPalindrome(str) {
  // Clean: lowercase, alphanumeric only
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}

isPalindrome("racecar"); // true
isPalindrome("A man a plan a canal Panama"); // true`,
      language: "javascript",
    },
    {
      id: "f1-q20",
      q: "Remove duplicates from an array. (common question)",
      hint: "Set stores only unique values.",
      answer:
        "Fastest modern approach: spread a Set constructor. Set automatically stores only unique values.\n\nAlternative: filter with indexOf (works in older environments).\n\nFor arrays of objects: use a Map keyed by a unique property.",
      code: `// Modern — O(n)
const unique = [...new Set([1, 2, 2, 3, 3, 4])];
// [1, 2, 3, 4]

// Alternative for older environments
const arr = [1, 2, 2, 3, 3, 4];
const unique2 = arr.filter((val, idx) => arr.indexOf(val) === idx);`,
      language: "javascript",
    },
    {
      id: "f1-q21",
      q: "What is the time complexity of common array operations? (common question)",
      hint: "Think about what each operation actually does under the hood.",
      answer:
        "Access by index: O(1) — direct memory calculation.\nSearch (unsorted): O(n) — may check every element.\nSearch (sorted, binary): O(log n) — halves space each step.\nPush/Pop (end): O(1) — no re-indexing.\nShift/Unshift (start): O(n) — every element must re-index.\nSplice (middle): O(n) — elements after insertion point re-index.\nSort: O(n log n) — TimSort in V8.\nHash map lookup: O(1) average.",
    },
    {
      id: "f1-q22",
      q: "What is a stack vs a queue? Implement a simple stack using an array.",
      hint: "LIFO vs FIFO. Stack: push/pop from same end.",
      answer:
        "Stack — LIFO (Last In, First Out): push and pop happen at the same end (top). Use: browser back button, undo history, call stack.\n\nQueue — FIFO (First In, First Out): enqueue at back, dequeue from front. Use: payment processing queues, print queue, task schedulers.\n\nIn FinTech context: transaction retry queues use FIFO. Undo operations use LIFO.",
      code: `class Stack {
  #data = [];

  push(item) { this.#data.push(item); }
  pop()  { return this.#data.pop(); }
  peek() { return this.#data[this.#data.length - 1]; }
  isEmpty() { return this.#data.length === 0; }
  size() { return this.#data.length; }
}

const s = new Stack();
s.push(10);
s.push(20);
s.pop();  // 20
s.peek(); // 10`,
      language: "javascript",
    },
    {
      id: "f1-q23",
      q: "Write a function to flatten a nested array to any depth. (common question)",
      hint: "Recursion or Array.flat(Infinity).",
      answer:
        "Modern: array.flat(Infinity) handles any depth.\nManual recursive: check if element is an array — if yes, recurse; if no, push to result.\n\nKnowing both shows depth — the built-in for production, the manual for interviews.",
      code: `// Built-in
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]

// Manual recursive — good for interview
function flatten(arr) {
  return arr.reduce((flat, item) =>
    Array.isArray(item)
      ? flat.concat(flatten(item))
      : flat.concat(item),
  []);
}

flatten([1, [2, [3, [4]]]]); // [1, 2, 3, 4]`,
      language: "javascript",
    },

    // ── SECTION D: React ──────────────────────────────────────────
    {
      id: "f1-q24",
      q: "What is the virtual DOM and how does React's reconciliation work? (common question)",
      hint: "In-memory copy of the real DOM. Diff → batch update.",
      answer:
        "React maintains a virtual DOM — a lightweight in-memory JS object representation of the real DOM.\n\nWhen state or props change:\n1. React builds a NEW virtual DOM tree.\n2. React diffs (compares) new vs old virtual DOM using its reconciliation algorithm.\n3. Only the CHANGED nodes are updated in the real DOM (batched).\n\nWhy? Real DOM updates are slow (trigger reflow/repaint). Virtual DOM diffing is fast JS object comparison.\n\nKey prop helps React identify which list items changed, moved, or were removed without re-rendering the entire list.",
    },
    {
      id: "f1-q25",
      q: "Explain the difference between controlled and uncontrolled components in React.",
      hint: "Controlled = state drives value. Uncontrolled = DOM drives value.",
      answer:
        "Controlled component: React state is the single source of truth for the input value. Every keystroke triggers setState and re-render. You have full control over validation and formatting.\n\nUncontrolled component: The DOM itself holds the value. You read it with a ref when needed. Less code, but harder to validate in real-time.\n\nFor FinTech forms (payment amounts, OTP fields): always use controlled components — you need to validate, format, and potentially mask input on every change.",
      code: `// Controlled
function ControlledInput() {
  const [value, setValue] = useState('');
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

// Uncontrolled
function UncontrolledInput() {
  const ref = useRef(null);
  const handleSubmit = () => console.log(ref.current.value);
  return <input ref={ref} />;
}`,
      language: "javascript",
    },
    {
      id: "f1-q26",
      q: "What is the difference between useEffect, useMemo, and useCallback? When would you use each?",
      hint: "Effect = side effects. Memo = cached value. Callback = cached function.",
      answer:
        "useEffect: Run side effects after render (API calls, subscriptions, DOM manipulation). Dependencies array controls when it re-runs.\n\nuseMemo: Memoize an expensive computed VALUE. Only recalculates when dependencies change. Use for heavy computations (sorting large transaction lists).\n\nuseCallback: Memoize a FUNCTION reference. Prevents child re-renders when a callback is passed as a prop. Use when passing callbacks to memoized child components.\n\nRule of thumb: don't use useMemo/useCallback everywhere — only when you've identified a performance problem.",
    },
    {
      id: "f1-q27",
      q: "What is React's key prop and why is it important?",
      hint: "Helps React identify which items in a list changed.",
      answer:
        "The key prop is a unique identifier React uses during reconciliation to track which list items have changed, been added, or removed.\n\nWithout keys: React re-renders the entire list on any change.\nWith stable keys: React only re-renders the changed item.\n\nBad key: index (stable by position, not by item — causes bugs when list reorders).\nGood key: unique ID from your data (transaction ID, user ID).\n\nIn eSewa-style payment history lists, always key by transaction ID, never by array index.",
    },
    {
      id: "f1-q28",
      q: "What is state lifting in React? When and why do you do it?",
      hint: "Move state to the closest common ancestor of components that need it.",
      answer:
        "State lifting means moving state from a child component to their nearest common parent when multiple siblings need to share or sync that state.\n\nWhen to lift: two sibling components need to read or write the same piece of state.\n\nExample in a payment form: AmountInput and PaymentSummary both need the amount value. Lift amount state to the parent PaymentForm, pass it down as props.\n\nPitfall: lifting too high causes unnecessary re-renders of unrelated components. Context API or state managers (Redux/Zustand) solve deep lifting.",
    },
    {
      id: "f1-q29",
      q: "What is React Context API? When would you use it over props?",
      hint: "Global state without prop drilling.",
      answer:
        "Context API provides a way to share values across the component tree without manually passing props at every level (prop drilling).\n\nUse Context when:\n- Auth state (logged-in user, token).\n- Theme (dark/light mode).\n- Language/locale settings.\n- Any data needed by many components at different depths.\n\nDon't overuse it — Context causes ALL consumers to re-render when value changes. For high-frequency updates, use Zustand or Redux. For stable global state (auth, theme), Context is perfect.\n\nIn FinTech apps: auth context (JWT token, user roles), currency/locale context.",
    },
    {
      id: "f1-q30",
      q: "What is the useReducer hook? How is it different from useState?",
      hint: "useReducer for complex state logic with multiple sub-states.",
      answer:
        "useState: good for simple, independent state values.\nuseReducer: better when state has complex logic or the next state depends on the previous one — similar to Redux.\n\nPattern: useReducer(reducerFn, initialState) — the reducer takes (state, action) and returns new state.\n\nUse useReducer when:\n- Multiple related state values that update together.\n- State transitions have defined rules (form with validation stages).\n- You want Redux-like patterns without a library.\n\nIn a payment flow with multiple steps (amount → method → confirm → OTP → result), useReducer models the state machine cleanly.",
      code: `const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_AMOUNT':  return { ...state, amount: action.payload };
    case 'SET_METHOD':  return { ...state, method: action.payload };
    case 'CONFIRM':     return { ...state, step: 'otp' };
    case 'RESET':       return initialState;
    default: return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'SET_AMOUNT', payload: 500 });`,
      language: "javascript",
    },

    // ── SECTION E: REST API / HTTP ────────────────────────────────
    {
      id: "f1-q31",
      q: "What are the HTTP methods and their appropriate use? (common question)",
      hint: "GET, POST, PUT, PATCH, DELETE — map to CRUD.",
      answer:
        "GET: Read/retrieve data. Should be idempotent and safe (no side effects). Cached.\nPOST: Create a new resource. NOT idempotent — calling twice creates two resources.\nPUT: Replace an entire resource. Idempotent.\nPATCH: Partially update a resource. Send only changed fields.\nDELETE: Remove a resource. Idempotent.\n\nFinTech specifics: POST /payments creates a payment. PATCH /payments/{id} can update status. GET /transactions is safe to retry. Never use GET for state-changing operations.",
    },
    {
      id: "f1-q32",
      q: "What are important HTTP status codes? Which should a payment API return in various scenarios?",
      hint: "2xx = success, 4xx = client error, 5xx = server error.",
      answer:
        "200 OK — successful GET, PUT, PATCH.\n201 Created — successful POST (payment created).\n204 No Content — successful DELETE.\n400 Bad Request — invalid input (missing amount field).\n401 Unauthorized — no valid token.\n403 Forbidden — valid token but no permission (user trying to access another user's wallet).\n404 Not Found — transaction ID doesn't exist.\n409 Conflict — duplicate payment attempt.\n422 Unprocessable Entity — semantically invalid (negative amount).\n429 Too Many Requests — rate limiting (fraud prevention).\n500 Internal Server Error — unexpected server failure.\n503 Service Unavailable — payment gateway down.",
    },
    {
      id: "f1-q33",
      q: "What is CORS? How does it work and how do you fix a CORS error? (common question)",
      hint: "Browser security that blocks cross-origin requests unless server permits.",
      answer:
        "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks web pages from making requests to a different domain unless the SERVER explicitly permits it via response headers.\n\nHow it works:\n1. Browser sends a preflight OPTIONS request for non-simple requests.\n2. Server responds with Access-Control-Allow-Origin header.\n3. If the origin is allowed, the actual request proceeds.\n\nFix:\n- Server: Add Access-Control-Allow-Origin: https://yourdomain.com (never * in production for authenticated APIs).\n- Dev: Use a proxy in your Next.js/Vite config.\n\nFinTech context: eSewa's payment API must only allow CORS from registered merchant origins.",
    },
    {
      id: "f1-q34",
      q: "What is JWT authentication? How does it work end-to-end? (common question)",
      hint: "Three-part base64 token. Stateless auth.",
      answer:
        "JWT (JSON Web Token) is a compact, self-contained token for stateless authentication.\n\nStructure: header.payload.signature (three base64url parts separated by dots).\n1. Header: algorithm (HS256) and token type.\n2. Payload: claims — user ID, roles, expiry (exp).\n3. Signature: HMAC(header + payload, secret) — verifies token wasn't tampered.\n\nFlow:\n1. User logs in → server validates credentials → creates JWT signed with secret → sends to client.\n2. Client stores JWT (httpOnly cookie preferred over localStorage for security).\n3. Client sends JWT in Authorization: Bearer <token> header.\n4. Server verifies signature → if valid, grants access.\n\nStateless: No DB session lookup needed. Critical for eSewa's scale.",
    },
    {
      id: "f1-q35",
      q: "What is the difference between authentication and authorization?",
      hint: "AuthN = who are you. AuthZ = what are you allowed to do.",
      answer:
        "Authentication (AuthN): Verifying WHO you are. Login with username/password, OTP, biometrics.\n\nAuthorization (AuthZ): Verifying WHAT you are ALLOWED to do after authentication.\n\nExample in eSewa:\n- AuthN: You log in with your PIN → your identity is confirmed.\n- AuthZ: Even logged in, you cannot access another user's transaction history (role/permission check).\n\nJWT handles both: the token proves identity (AuthN) and can carry roles/permissions for authorization (AuthZ) in the payload.",
    },

    // ── SECTION F: SQL ────────────────────────────────────────────
    {
      id: "f1-q36",
      q: "What is the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN? (common question)",
      hint: "Think about which rows from each table are included in the result.",
      answer:
        "INNER JOIN: Only rows with a match in BOTH tables.\nLEFT JOIN: All rows from LEFT table + matched rows from right (NULL where no match on right).\nRIGHT JOIN: All rows from RIGHT table + matched rows from left (NULL where no match on left).\nFULL OUTER JOIN: All rows from BOTH tables (NULLs on either side where no match).\n\nFinTech example: Users LEFT JOIN Transactions gives all users even if they've never transacted (good for finding inactive accounts).",
      code: `-- All users even if no transactions (LEFT JOIN)
SELECT u.name, t.amount
FROM users u
LEFT JOIN transactions t ON u.id = t.user_id;

-- Only users who have made transactions (INNER JOIN)
SELECT u.name, t.amount
FROM users u
INNER JOIN transactions t ON u.id = t.user_id;`,
      language: "sql",
    },
    {
      id: "f1-q37",
      q: "What is the difference between WHERE and HAVING in SQL?",
      hint: "WHERE filters rows before grouping. HAVING filters groups after aggregation.",
      answer:
        "WHERE: Filters individual rows BEFORE any GROUP BY is applied. Cannot use aggregate functions.\nHAVING: Filters GROUPS after GROUP BY and aggregate calculations. Can use aggregate functions (SUM, COUNT, AVG).\n\nExample: Find users who have made more than 5 transactions — you can't use WHERE count(*) > 5 because the count doesn't exist yet at the WHERE stage.",
      code: `-- Find users with more than 5 transactions totalling > 1000
SELECT user_id, COUNT(*) as txn_count, SUM(amount) as total
FROM transactions
WHERE status = 'SUCCESS'   -- filters rows first
GROUP BY user_id
HAVING COUNT(*) > 5        -- filters groups after aggregation
  AND SUM(amount) > 1000;`,
      language: "sql",
    },
    {
      id: "f1-q38",
      q: "What is database indexing? Why is it important for a FinTech application?",
      hint: "Speeds up reads, slows down writes. Critical for query performance.",
      answer:
        "An index is a data structure (usually B-tree) that allows the database to find rows without scanning the entire table.\n\nWithout index: O(n) full table scan.\nWith index: O(log n) B-tree lookup.\n\nIn FinTech:\n- Index on user_id in transactions table — fetch user history without scanning millions of rows.\n- Index on created_at — range queries for reporting.\n- Composite index on (user_id, created_at) for user+date filters.\n\nTradeoffs: Indexes speed up reads but slow down writes (INSERT/UPDATE must also update the index). Don't index every column — only high-cardinality, frequently-queried columns.",
    },
    {
      id: "f1-q39",
      q: "What are database transactions and ACID properties?",
      hint: "Atomicity, Consistency, Isolation, Durability.",
      answer:
        "A database transaction is a unit of work that either completes entirely or rolls back entirely.\n\nACID:\nAtomicity: All operations in a transaction succeed, or ALL are rolled back. (Transfer: debit AND credit must both succeed, or neither.)\nConsistency: The database always moves from one valid state to another — constraints are never violated.\nIsolation: Concurrent transactions don't interfere with each other. (Two users paying from the same account simultaneously don't both see the full balance.)\nDurability: Once committed, data survives crashes (written to disk).\n\nAbsolutely critical for eSewa — a payment deducting money without crediting the recipient would be catastrophic.",
    },
    {
      id: "f1-q40",
      q: "Write a SQL query to find the top 5 users by total transaction amount.",
      hint: "SUM + GROUP BY + ORDER BY + LIMIT.",
      answer:
        "Group transactions by user, sum the amounts, sort descending, take top 5.",
      code: `SELECT
  u.name,
  u.email,
  SUM(t.amount) AS total_spent
FROM users u
INNER JOIN transactions t ON u.id = t.user_id
WHERE t.status = 'SUCCESS'
GROUP BY u.id, u.name, u.email
ORDER BY total_spent DESC
LIMIT 5;`,
      language: "sql",
    },

    // ── SECTION G: Frontend / HTML / CSS ─────────────────────────
    {
      id: "f1-q41",
      q: "What is the difference between display:block, display:inline, and display:inline-block?",
      hint: "Block takes full width. Inline flows with text. Inline-block is a mix.",
      answer:
        "block: Takes full available width, starts on a new line, respects width/height/margin. Examples: div, p, h1.\n\ninline: Flows within text, ignores width/height settings, only horizontal margin/padding respected. Examples: span, a, strong.\n\ninline-block: Flows inline like text BUT respects width, height, and all padding/margin. Use for buttons, icons, nav items you want side-by-side but with box properties.\n\nPractical tip: Most UI components in FinTech dashboards use flex or grid instead of manually managing display types.",
    },
    {
      id: "f1-q42",
      q: "What is CSS Flexbox? When would you use Flexbox vs Grid?",
      hint: "Flexbox = one dimension. Grid = two dimensions.",
      answer:
        "Flexbox: One-dimensional layout (row OR column). Items flex along a main axis. Use for: nav bars, card rows, centering elements, space distribution in a single axis.\n\nCSS Grid: Two-dimensional layout (rows AND columns simultaneously). Use for: page layouts, dashboards, complex two-axis positioning.\n\nRule of thumb: If you're laying out items along ONE line → Flexbox. If you're designing the PAGE layout or a two-dimensional component → Grid.\n\nCommon FinTech usage: Grid for dashboard layout (header + sidebar + main), Flexbox for transaction list items (icon + text + amount).",
    },
    {
      id: "f1-q43",
      q: "What is the difference between position:relative, absolute, fixed, and sticky?",
      hint: "What is each element positioned relative to?",
      answer:
        "relative: Positioned relative to its NORMAL flow position. Doesn't leave the flow — other elements still see it.\nabsolute: Positioned relative to the nearest POSITIONED ancestor (non-static). Removed from normal flow.\nfixed: Positioned relative to the VIEWPORT. Stays in place even when scrolling. Use: sticky headers, floating action buttons.\nsticky: A hybrid — scrolls with the page until it reaches a threshold, then acts like fixed. Use: sticky table headers, section labels while scrolling.",
    },
    {
      id: "f1-q44",
      q: "What is responsive design? What techniques do you use to implement it?",
      hint: "Fluid grids, media queries, flexible images.",
      answer:
        "Responsive design ensures a UI works well on all screen sizes (mobile, tablet, desktop).\n\nTechniques:\n1. Fluid grids — use % or fr units instead of fixed px.\n2. Media queries — apply different styles at different breakpoints (min-width: 768px).\n3. Flexible images — max-width: 100%; height: auto;\n4. CSS Flexbox/Grid — naturally responsive with flex-wrap and auto-placement.\n5. Mobile-first approach — design for mobile, add complexity for larger screens.\n6. Viewport meta tag — <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">.\n\nFinTech relevance: eSewa and banking apps are primarily used on mobile — responsive design is not optional.",
    },
    {
      id: "f1-q45",
      q: "What is the browser's critical rendering path?",
      hint: "HTML → DOM → CSSOM → Render Tree → Layout → Paint → Composite.",
      answer:
        "The critical rendering path is the sequence of steps a browser takes to convert HTML/CSS/JS into pixels on screen:\n\n1. Parse HTML → build DOM tree.\n2. Parse CSS → build CSSOM tree.\n3. Combine DOM + CSSOM → Render Tree (only visible elements).\n4. Layout (Reflow) — calculate position and size of each element.\n5. Paint — fill in pixels (colors, borders, shadows).\n6. Composite — layer pages and display final result.\n\nOptimization for FinTech dashboards:\n- Minimize render-blocking JS (defer/async scripts).\n- Reduce CSS complexity.\n- Use CSS transforms for animations (GPU compositing, no reflow).",
    },

    // ── SECTION H: Git & Tools ───────────────────────────────────
    {
      id: "f1-q46",
      q: "What is the difference between git merge and git rebase? When would you use each?",
      hint: "Merge preserves history. Rebase rewrites history for a cleaner line.",
      answer:
        "git merge: Combines two branches by creating a new 'merge commit'. History is preserved as-is — you can see when branches diverged. Safe for shared/public branches.\n\ngit rebase: Replays your commits on top of another branch. Creates a LINEAR history — cleaner log. NEVER rebase public/shared branches — it rewrites history and breaks others' copies.\n\nUsual workflow at a company:\n- Feature branches: rebase onto main before merging (clean linear history).\n- main/production: always merge (preserve audit trail).\n\nF1Soft is a FinTech — commit history auditability matters.",
    },
    {
      id: "f1-q47",
      q: "What is git stash and when would you use it?",
      hint: "Temporarily shelve uncommitted changes.",
      answer:
        "git stash saves your uncommitted changes (tracked files) to a stash stack and reverts your working directory to HEAD — letting you switch branches cleanly.\n\ngit stash apply / git stash pop restores the saved changes.\n\nUse case: You're mid-feature, boss says fix urgent bug on main. Stash your in-progress work, switch to main, fix bug, switch back, pop stash, continue.\n\ngit stash list — see all stashes.\ngit stash drop — delete a stash.",
    },
    {
      id: "f1-q48",
      q: "Explain your Git branching strategy. What is the difference between feature branches, hotfixes, and release branches?",
      hint: "Gitflow or trunk-based — either is fine, explain your reasoning.",
      answer:
        "Gitflow model (common in structured teams like F1Soft):\n\nfeature/* branches: Created from develop for each new feature. Merged back to develop when done. Never directly to main.\n\ndevelop branch: Integration branch — all features merge here first. Tested together before release.\n\nrelease/* branches: Created from develop when ready for production. Only bug fixes allowed. Merged into main AND develop.\n\nhotfix/* branches: Created from main for urgent production fixes. Merged directly to main AND develop.\n\nmain: Always production-ready.\n\nFinTech necessity: Multiple teams working on eSewa — isolation prevents one team's broken code from blocking others.",
    },

    // ── SECTION I: System Design / Architecture ───────────────────
    {
      id: "f1-q49",
      q: "How would you design a payment processing system at a high level? What components would you include?",
      hint: "Think: API gateway, validation, idempotency, queue, database, notifications.",
      answer:
        "High-level components for a payment system:\n\n1. API Gateway: Rate limiting, auth (JWT), routing.\n2. Payment Service: Validates input (amount > 0, account exists, sufficient balance).\n3. Idempotency Layer: Prevents duplicate payments from retries — use a unique idempotency key per request, stored in Redis.\n4. Transaction DB: ACID-compliant (PostgreSQL) — debit source, credit destination in one transaction.\n5. Message Queue (Kafka/RabbitMQ): Decouples payment confirmation from notification sending.\n6. Notification Service: Sends SMS/email/push asynchronously.\n7. Audit Log: Immutable record of every state change (for regulatory compliance — NRB requires this).\n8. Reconciliation Service: Daily batch job comparing internal records with bank/gateway records.\n\nKey design decisions: Idempotency, ACID transactions, async notifications, audit trail.",
    },
    {
      id: "f1-q50",
      q: "What is the difference between monolithic and microservices architecture?",
      hint: "One deployable unit vs many independent services.",
      answer:
        "Monolith: All features in one codebase, deployed together. Simple to develop initially. Hard to scale independently — if the notification module needs more resources, you scale the whole app.\n\nMicroservices: Each business domain is an independent service with its own database. Deployed independently. More complex infrastructure but scales horizontally per service.\n\nF1Soft's progression: likely started monolithic, moved toward microservices as eSewa, BankSmart, and Fonepay grew independently.\n\nFor an interview: acknowledge both tradeoffs. Don't say microservices is always better — it adds operational complexity.",
    },

    // ── SECTION J: Security (FinTech critical) ────────────────────
    {
      id: "f1-q51",
      q: "What is SQL Injection? How do you prevent it?",
      hint: "Malicious SQL in user input. Prevent with parameterized queries.",
      answer:
        "SQL Injection: An attacker inserts malicious SQL code into an input field, which is then executed by the database.\n\nExample: username input: admin'-- — this comments out the password check.\n\nPrevention:\n1. Parameterized queries / prepared statements — NEVER concatenate user input into SQL strings.\n2. ORM (Sequelize, Prisma, Hibernate) — handles parameterization automatically.\n3. Input validation — whitelist expected formats.\n4. Principle of least privilege — DB user should only have SELECT/INSERT on needed tables.\n\nFor FinTech: SQL injection on a payment DB could drain accounts or expose millions of user records.",
      code: `// ✗ DANGEROUS — SQL injection vulnerable
const query = "SELECT * FROM users WHERE email = '" + email + "'";

// ✓ SAFE — parameterized query (pg library example)
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);`,
      language: "javascript",
    },
    {
      id: "f1-q52",
      q: "What is XSS (Cross-Site Scripting)? How do you prevent it in a React app?",
      hint: "Injecting malicious scripts. React escapes by default but there are exceptions.",
      answer:
        "XSS: An attacker injects malicious JavaScript into a webpage that is then executed in victims' browsers. Can steal session tokens, redirect users, log keystrokes.\n\nReact defends against XSS by default — it escapes all values inserted via JSX.\n\nDangerous exceptions:\n1. dangerouslySetInnerHTML — renders raw HTML. Only use with sanitized content (DOMPurify library).\n2. Rendering user-provided URLs — always validate protocol (javascript: URLs are XSS vectors).\n3. eval() — never use with user input.\n\nBest practices: Content Security Policy (CSP) headers, sanitize all HTML, HttpOnly cookies for tokens.",
    },
    {
      id: "f1-q53",
      q: "Why should you store JWT tokens in HttpOnly cookies instead of localStorage?",
      hint: "XSS can steal localStorage. HttpOnly cookies are inaccessible to JavaScript.",
      answer:
        "localStorage: Accessible via JavaScript — if your site has an XSS vulnerability, an attacker's script can read document.cookie or localStorage and steal the token.\n\nHttpOnly cookie: Cannot be accessed by JavaScript at all. The browser sends it automatically with requests. Only vulnerable to CSRF (Cross-Site Request Forgery).\n\nBest setup:\n- JWT in HttpOnly, Secure, SameSite=Strict cookie → protects from XSS.\n- CSRF token in a separate header or cookie → protects from CSRF.\n\nFor eSewa/banking apps: token security is paramount — a stolen token means account takeover.",
    },
    {
      id: "f1-q54",
      q: "What is rate limiting and why is it important for a payment API?",
      hint: "Limit requests per user/IP to prevent abuse.",
      answer:
        "Rate limiting restricts how many requests a client can make in a time window.\n\nWhy critical for FinTech:\n1. Fraud prevention — limits brute-force PIN/OTP guessing attacks.\n2. Prevents DoS — protects API from being overwhelmed.\n3. Cost control — prevents excessive API calls to external banking gateways.\n4. Regulatory — many financial regulations require rate limiting as a security control.\n\nImplementation: Redis-based sliding window counter. After N requests in T seconds from one IP/user, return 429 Too Many Requests.\n\nE.g., maximum 3 incorrect PIN attempts before locking the account.",
    },

    // ── SECTION K: Behavioural / HR ───────────────────────────────
    {
      id: "f1-q55",
      q: "Why do you want to work at F1Soft specifically? What do you know about F1Soft and eSewa?",
      hint: "Show you've researched them. Specificity wins — vague answers lose points.",
      answer:
        "Strong answer structure:\n1. Show knowledge: 'F1Soft is Nepal's largest FinTech group, founded in 2004, parent of eSewa — South Asia's first digital wallet — Fonepay, BankSmart, and eXtensoData. You serve over 90% of Nepal's financial institutions and connect millions to digital financial services.'\n\n2. Show alignment: Connect their tech stack (React, Node.js, Java, PHP) to your skills. Mention their mission — financial inclusion — resonates with you.\n\n3. Show contribution: 'I want to contribute to building products that reach millions of Nepalis who are just entering the digital financial ecosystem.'\n\nNever say just 'good salary' or 'well-known company'. They ask why NOT just any tech company.",
    },
    {
      id: "f1-q56",
      q: "Tell me about yourself. How would you pitch yourself for a developer role at F1Soft?",
      hint: "Present → Past → Future. 90 seconds. Technical but human.",
      answer:
        "Structure: Present → Past → Why F1Soft.\n\nExample: 'I'm a frontend/full-stack developer with strong skills in React, JavaScript, Node.js, and SQL. I've built [specific project — e.g., a payment integration demo / e-commerce site / dashboard]. My background includes [relevant experience or education]. What drives me is building products that are used at scale — eSewa processes millions of transactions daily, and I want to write code that's part of that infrastructure. I've been studying F1Soft's tech stack and interview culture to make sure I come ready to contribute from day one.'\n\nKey: end on WHY F1Soft specifically. Show intent.",
    },
    {
      id: "f1-q57",
      q: "Describe a project you built. What technical challenges did you face and how did you overcome them?",
      hint: "STAR method. Go deep on YOUR role and technical decisions — not just 'we built...'",
      answer:
        "Structure (STAR):\nSituation: Brief context about the project and its purpose.\nTask: Your specific role and responsibility.\nAction: Technical choices you made — why you chose React over Vue, how you structured state, how you handled API errors, performance decisions.\nResult: What shipped, usage metrics if any, what you learned.\n\nGood triggers for 'challenges': handling API race conditions, optimizing for slow connections (Nepal's mobile data context), managing large form state, debugging production issues.\n\nAvoid vague answers. Saying 'we used React and built a dashboard' is not enough — say 'I implemented a custom debounce hook to prevent API spam on the search input which reduced API calls by 60%.'",
    },

    // ── BONUS: FinTech Specific ────────────────────────────────────
    {
      id: "f1-q58",
      q: "What is idempotency and why is it critical in payment APIs?",
      hint: "Same request, same result — regardless of how many times it's sent.",
      answer:
        "Idempotency means making the same API call multiple times produces the same result as calling it once.\n\nWhy it matters in payments: Network timeouts are common in Nepal's mobile data environment. A user taps 'Pay' and the request times out — the client doesn't know if the payment went through. If the client retries and the API is NOT idempotent, the user gets charged twice.\n\nSolution: The client generates a unique idempotency-key per payment attempt. The server stores the result keyed to this ID. If the same key comes again, return the stored result without processing again.\n\nImplementation: Store idempotency keys in Redis with TTL (24 hours). Check key before processing.",
    },
    {
      id: "f1-q59",
      q: "What is a race condition? Give an example in a payment context and how you'd prevent it.",
      hint: "Two operations competing on shared state — one wins, the other loses data.",
      answer:
        "Race condition: Two concurrent operations read and write the same data, and the final result depends on which finishes first — leading to incorrect results.\n\nPayment example: User has Rs. 1000. Two concurrent withdrawal requests for Rs. 800 each:\n1. Both read balance: Rs. 1000.\n2. Both check: 1000 >= 800 → proceed.\n3. Both deduct: balance becomes Rs. 200 (should be declined one).\nResult: Rs. 600 overspent.\n\nPrevention:\n1. Database-level locks (SELECT FOR UPDATE) — lock the row before reading.\n2. Optimistic locking — version field; if version changed since you read, retry.\n3. Atomic DB transactions — debit and credit in a single transaction.\n4. Message queues — serialize operations through a queue.\n\nF1Soft's payment systems must handle this — NRB regulations require accurate transaction records.",
    },
    {
      id: "f1-q60",
      q: "What is the difference between synchronous and asynchronous processing? When would you use a message queue?",
      hint: "Sync waits for a response. Async fires and moves on.",
      answer:
        "Synchronous: Request waits for the entire operation to complete before responding. Simple, easy to reason about, but blocks the thread.\n\nAsynchronous: Request returns immediately (202 Accepted), work happens in the background.\n\nWhen to use a message queue (Kafka, RabbitMQ, SQS):\n1. Operations that can fail and need retry (send SMS after payment).\n2. Operations that don't need to block the user response (email receipt).\n3. Decoupling services — payment service doesn't need to know about notification service.\n4. Traffic spikes — queue absorbs load, workers process at their own rate.\n\nFinTech example: eSewa payment succeeds → push event to queue → notification worker sends SMS/email. If SMS provider is down, the queue retries — payment doesn't fail.",
    },
  ];

allQuestions.slice(0, 10).forEach(q => q.category = "JS Core");
allQuestions.slice(10, 15).forEach(q => q.category = "OOP & SOLID");
allQuestions.slice(15, 23).forEach(q => q.category = "DSA");
allQuestions.slice(23, 30).forEach(q => q.category = "React");
allQuestions.slice(30, 40).forEach(q => q.category = "Backend & DB");
allQuestions.slice(40, 60).forEach(q => q.category = "Arch & Security");

export const s06_f1soft: InterviewSection = {
  id: 16,
  slug: "f1soft-interview",
  title: "F1Soft Interview Prep",
  subtitle: "Questions sourced from real F1Soft / eSewa interview reports",
  color: "#10b981",
  questions: allQuestions,
  mcqs: []
};