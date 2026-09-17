import type { InterviewSection, CodingQuestion, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/**
 * Section 18 — HashMap / HashSet
 * Priority: VERY IMPORTANT (DSA)
 *
 * This is the single biggest gap the audit found: Map/Set API calls exist inside
 * other files' solutions, but nothing in the repo actually TEACHES the concept —
 * what a HashMap/HashSet is, how JavaScript implements it as Map/Set, and when to
 * reach for one over an array. This section fixes that explicitly.
 */

const hashmap_notes: NoteSection[] = [
  {
    title: "HashMap / HashSet: The Concept vs the JavaScript Implementation",
    content:
      "A HashMap is a key-value store with average O(1) insert, lookup, and delete, built on a hash table. A HashSet is the same idea holding only unique values, with no associated data. These are language-agnostic computer-science concepts — Java has HashMap/HashSet as literal class names, Python has dict/set. JavaScript does NOT have a class called HashMap. It implements the same concept through two built-ins: Map (key-value pairs) and Set (unique values). They are the HashMap/HashSet of JavaScript, not a coincidence or an analogy — treat the two names as interchangeable in interviews, but always write the JS code using Map/Set.",
    tip: "If an interviewer says 'use a HashMap', they want you to reach for `new Map()` in JavaScript. Saying so out loud shows you know both the concept and the language.",
  },
  {
    title: "Map vs plain Object — why prefer Map",
    content:
      "Before ES6, developers faked a HashMap with a plain object: obj[key] = value. This still works but has sharp edges: object keys are coerced to strings (so the number 1 and the string '1' collide), a plain object inherits properties from its prototype which can leak into `for...in` loops and break `has()` checks, and there is no direct .size — you need Object.keys(obj).length. Map fixes all three: any value can be a key (including objects and functions), there is no prototype pollution risk, iteration order matches insertion order, and .size is O(1).",
    code: "const map = new Map();\nmap.set(1, 'number one');\nmap.set('1', 'string one');\nmap.size; // 2 — a Map never merges these\n\nconst obj = {};\nobj[1] = 'number one';\nobj['1'] = 'string one';\nObject.keys(obj).length; // 1 — the object coerced both keys to '1'",
    language: "javascript",
  },
  {
    title: "Map — the full API",
    content:
      "The five methods and one property that cover almost every interview use of Map.",
    code: "const map = new Map();\nmap.set('apple', 3);     // insert or update — returns the map, so calls chain\nmap.get('apple');        // 3 — returns undefined if the key is absent\nmap.has('apple');        // true — O(1) membership check\nmap.delete('apple');     // true if it existed and was removed\nmap.size;                // number of entries — NOT a method, no ()\n\nfor (const [key, value] of map) { /* iterate in insertion order */ }",
    language: "javascript",
    tip: "map.get() on a missing key returns undefined, not an error and not 0 — a common source of NaN bugs when you forget to default it: `(map.get(key) || 0) + 1`.",
  },
  {
    title: "Set — the full API",
    content:
      "Set drops the value half of Map and keeps only unique keys. Use it for membership tests and de-duplication.",
    code: "const set = new Set();\nset.add(10);             // insert — no-op if already present, returns the set\nset.has(10);             // true — O(1) membership check\nset.delete(10);          // true if it existed and was removed\nset.size;                // number of unique members\n\nconst deduped = [...new Set([1, 2, 2, 3, 1])]; // [1, 2, 3]",
    language: "javascript",
    tip: "`[...new Set(array)]` is the standard one-line array de-duplication idiom — it comes up constantly and interviewers expect you to know it cold.",
  },
  {
    title: "When to reach for a HashMap/HashSet instead of an array",
    content:
      "Reach for a Set when the question is purely 'have I seen this before?' — duplicate detection, membership checks, intersection/union of collections. Reach for a Map when you need to associate a value with each key — counting frequency, pairing a value with its index, caching computed results, grouping items by a property. If your instinct is a nested loop checking every pair, that's the tell: an O(n^2) pairwise scan usually collapses to an O(n) pass with a Map or Set trading space for time.",
    tip: "The frequency-counter pattern — build a Map of value → count in one pass, then read the answer off the counts — solves more interview problems than any other single technique in this repository.",
  },
];

const hashmap_questions: InterviewQuestion[] = [
  {
    id: "s18-q01",
    q: "What is a HashMap, conceptually, and what is its JavaScript implementation called?",
    hint: "Key-value store, O(1) average — the concept has one name, JS gives it another.",
    answer:
      "A HashMap is a key-value data structure offering average O(1) insert, lookup, and delete via a hash table. JavaScript does not have a class named HashMap; it implements the same concept as Map. In an interview, use the two terms interchangeably but write `new Map()` in code.",
    category: "HashMap/HashSet",
  },
  {
    id: "s18-q02",
    q: "What is the difference between Map and Set?",
    hint: "Pairs vs uniques.",
    answer:
      "Map stores key-value pairs — you look a value up by its key. Set stores only unique values with no associated data — you only ask 'is this value present?'. Use Map when you need to associate information with each item (counts, indices, cached results); use Set when you only need membership or uniqueness.",
    category: "HashMap/HashSet",
  },
  {
    id: "s18-q03",
    q: "Why prefer a Map over a plain object as a hash table in JavaScript?",
    hint: "Key coercion, prototype pollution, size.",
    answer:
      "A plain object coerces every key to a string (so numeric key 1 and string key '1' collide), inherits properties from Object.prototype which can leak into iteration or break has()-style checks, and has no O(1) .size. Map avoids all three: any value can be a key, there's no prototype interference, and .size is instant.",
    category: "HashMap/HashSet",
  },
  {
    id: "s18-q04",
    q: "When would you choose a Map instead of an Array?",
    hint: "Lookup by identity vs lookup by position.",
    answer:
      "Choose Array when order and position matter and you mostly iterate. Choose Map when you need fast lookup by a key that is not a sequential index — counting occurrences, caching results by input, associating a user ID with a record. An array lookup by value is O(n); a Map lookup by key is O(1) average.",
    category: "HashMap/HashSet",
  },
];

const hashmap_coding: CodingQuestion[] = [
  {
    id: "s18-c01",
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers and a target, return the indices of the two numbers that add up to the target. Assume exactly one solution exists and you may not use the same element twice.",
    examples: [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
      { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]" },
    ],
    constraints: ["2 <= nums.length <= 10^4", "Exactly one valid answer exists", "Target O(n) time"],
    hint: "For each number, check whether (target - number) was already seen. Store value → index in a Map as you go.",
    solution:
      "function twoSum(nums, target) {\n  const seen = new Map(); // value -> index\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) return [seen.get(complement), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}",
  },
  {
    id: "s18-c02",
    title: "Contains Duplicate",
    difficulty: "Easy",
    description: "Given an array of integers, return true if any value appears at least twice.",
    examples: [
      { input: "[1, 2, 3, 1]", output: "true" },
      { input: "[1, 2, 3, 4]", output: "false" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "Target O(n) time"],
    hint: "A Set only ever holds unique values — if adding an element doesn't grow the size, it was already there.",
    solution:
      "function containsDuplicate(nums) {\n  const seen = new Set();\n  for (const n of nums) {\n    if (seen.has(n)) return true;\n    seen.add(n);\n  }\n  return false;\n}\n\n// One-liner using the size trick:\nfunction containsDuplicateShort(nums) {\n  return new Set(nums).size !== nums.length;\n}",
  },
  {
    id: "s18-c03",
    title: "Valid Anagram",
    difficulty: "Easy",
    description: "Given two strings, return true if the second is an anagram of the first (same letters, same counts, any order).",
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 5 * 10^4", "Lowercase English letters"],
    hint: "Build a frequency Map for s, then decrement per character of t. Any negative or leftover count means it's not an anagram.",
    solution:
      "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const freq = new Map();\n  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);\n  for (const ch of t) {\n    const count = freq.get(ch);\n    if (!count) return false;\n    freq.set(ch, count - 1);\n  }\n  return true;\n}",
  },
  {
    id: "s18-c04",
    title: "Intersection of Two Arrays",
    difficulty: "Easy",
    description: "Given two arrays, return an array of their unique shared elements.",
    examples: [
      { input: "nums1 = [1, 2, 2, 1], nums2 = [2, 2]", output: "[2]" },
      { input: "nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]", output: "[9, 4] (order may vary)" },
    ],
    constraints: ["1 <= length <= 1000", "Result contains no duplicates"],
    hint: "Put the first array in a Set, then filter the second array by membership, then de-duplicate the result with another Set.",
    solution:
      "function intersection(nums1, nums2) {\n  const set1 = new Set(nums1);\n  const result = new Set();\n  for (const n of nums2) if (set1.has(n)) result.add(n);\n  return [...result];\n}",
  },
  {
    id: "s18-c05",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    description: "Given an array of integers and an integer k, return the k most frequent elements, in any order.",
    examples: [
      { input: "nums = [1, 1, 1, 2, 2, 3], k = 2", output: "[1, 2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "k is always valid", "Aim for better than O(n log n) if possible"],
    hint: "Count frequencies in a Map, then bucket values by their count (bucket sort) so you never need a full sort — O(n) overall.",
    solution:
      "function topKFrequent(nums, k) {\n  const freq = new Map();\n  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);\n\n  const buckets = Array.from({ length: nums.length + 1 }, () => []);\n  for (const [value, count] of freq) buckets[count].push(value);\n\n  const result = [];\n  for (let count = buckets.length - 1; count >= 0 && result.length < k; count--) {\n    for (const value of buckets[count]) {\n      result.push(value);\n      if (result.length === k) break;\n    }\n  }\n  return result;\n}",
  },
  {
    id: "s18-c06",
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    description:
      "Given an array of n + 1 integers where every value is between 1 and n inclusive, exactly one value repeats (possibly more than once). Find that repeated value.",
    examples: [
      { input: "[1, 3, 4, 2, 2]", output: "2" },
      { input: "[3, 1, 3, 4, 2]", output: "3" },
    ],
    constraints: ["2 <= n <= 10^5", "Only one value repeats", "A Set solves it in O(n) time and space"],
    hint: "Walk the array; the first value you've already added to the Set is the duplicate.",
    solution:
      "function findDuplicate(nums) {\n  const seen = new Set();\n  for (const n of nums) {\n    if (seen.has(n)) return n;\n    seen.add(n);\n  }\n  return -1; // unreachable given the constraints\n}",
  },
  {
    id: "s18-c07",
    title: "Happy Number",
    difficulty: "Easy",
    description:
      "A happy number is found by repeatedly replacing it with the sum of the squares of its digits, until the result is 1 (happy) or it loops endlessly in a cycle that never includes 1 (not happy). Determine if a given number is happy.",
    examples: [
      { input: "19", output: "true", explanation: "1^2+9^2=82, 8^2+2^2=68, 6^2+8^2=100, 1^2+0^2+0^2=1" },
      { input: "2", output: "false" },
    ],
    constraints: ["1 <= n <= 2^31 - 1"],
    hint: "Use a Set to remember every sum you've produced. If you see one you've already produced, you're in a cycle — not happy.",
    solution:
      "function isHappy(n) {\n  const seen = new Set();\n  const sumOfSquares = (num) => {\n    let sum = 0;\n    while (num > 0) {\n      const digit = num % 10;\n      sum += digit * digit;\n      num = Math.floor(num / 10);\n    }\n    return sum;\n  };\n  while (n !== 1 && !seen.has(n)) {\n    seen.add(n);\n    n = sumOfSquares(n);\n  }\n  return n === 1;\n}",
  },
  {
    id: "s18-c08",
    title: "Ransom Note",
    difficulty: "Easy",
    description:
      "Given a ransom note string and a magazine string, determine whether the note can be built using letters from the magazine, where each magazine letter can be used only once.",
    examples: [
      { input: 'ransomNote = "aa", magazine = "aab"', output: "true" },
      { input: 'ransomNote = "aa", magazine = "ab"', output: "false" },
    ],
    constraints: ["1 <= length <= 10^5", "Lowercase English letters"],
    hint: "Frequency-count the magazine into a Map, then decrement per letter of the note — fail on a missing or exhausted letter.",
    solution:
      "function canConstruct(ransomNote, magazine) {\n  const available = new Map();\n  for (const ch of magazine) available.set(ch, (available.get(ch) || 0) + 1);\n  for (const ch of ransomNote) {\n    const left = available.get(ch) || 0;\n    if (left === 0) return false;\n    available.set(ch, left - 1);\n  }\n  return true;\n}",
  },
];

const hashmap_mcqs: MCQQuestion[] = [
  {
    id: "s18-m01",
    question: "JavaScript does not have a class literally named 'HashMap'. What is its equivalent?",
    options: ["Object", "Array", "Map", "WeakMap only"],
    correctAnswerIndex: 2,
    explanation:
      "Map is JavaScript's implementation of the HashMap concept — average O(1) get/set/has/delete keyed by arbitrary values, with insertion-order iteration.",
  },
  {
    id: "s18-m02",
    question: "Why does `obj[1]` and `obj['1']` refer to the SAME property on a plain object, but `map.get(1)` and `map.get('1')` are different on a Map?",
    options: [
      "Objects don't support numeric keys at all",
      "Plain object keys are coerced to strings, while Map preserves the original key type",
      "Map only supports string keys",
      "This is a JavaScript engine bug",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Every plain-object property key is coerced to a string internally, so numeric and string versions of the same value collide. Map stores keys by their actual type and value, so 1 and '1' are distinct entries.",
  },
  {
    id: "s18-m03",
    question: "What does `map.get('missingKey')` return if the key was never set?",
    options: ["null", "0", "undefined", "It throws an error"],
    correctAnswerIndex: 2,
    explanation:
      "Like reading a missing object property, Map.get returns undefined for an absent key rather than throwing. This is why frequency counters use `(map.get(key) || 0) + 1` — to default a missing count to 0.",
  },
  {
    id: "s18-m04",
    question: "Which one-liner de-duplicates an array using a HashSet?",
    options: [
      "array.filter((v, i) => array.indexOf(v) === i)",
      "[...new Set(array)]",
      "array.sort().filter(Boolean)",
      "Object.keys(array)",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Spreading a Set built from the array collapses duplicates in O(n). The filter/indexOf version also works but is O(n^2) since indexOf scans linearly for each element.",
  },
  {
    id: "s18-m05",
    question: "In Two Sum, why does storing 'value -> index' in a Map beat a nested loop?",
    options: [
      "It sorts the array as a side effect",
      "It turns an O(n^2) pairwise search into a single O(n) pass with O(1) lookups",
      "It uses less memory than a nested loop",
      "Nested loops are not allowed in JavaScript",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A nested loop checks every pair — O(n^2). Storing each value's index as you scan lets you check for the needed complement in O(1) per element, for O(n) total, trading a bit of extra space for a much better time bound.",
  },
];

export const s18_hashmap_hashset: InterviewSection = {
  id: 18,
  slug: "hashmap-hashset",
  title: "HashMap / HashSet",
  subtitle: "Map & Set — the concept, the JS API, and the problems that need them",
  color: "#8b5cf6",
  priority: "VERY_IMPORTANT",
  stack: "DSA",
  questions: hashmap_questions,
  mcqs: hashmap_mcqs,
  notes: hashmap_notes,
  codingQuestions: hashmap_coding,
};