import type { InterviewSection, CodingQuestion, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/**
 * Section 18 — HashMap / HashSet (dict / set in Python)
 * Priority: VERY IMPORTANT (DSA)
 *
 * This is the single biggest gap the audit found: dict/set API calls exist inside
 * other files' solutions, but nothing in the repo actually TEACHES the concept —
 * what a HashMap/HashSet is, how Python implements it as dict/set, and when to
 * reach for one over a list. This section fixes that explicitly.
 */

const hashmap_notes: NoteSection[] = [
  {
    title: "HashMap / HashSet: The Concept vs the Python Implementation",
    content:
      "A HashMap is a key-value store with average O(1) insert, lookup, and delete, built on a hash table. A HashSet is the same idea holding only unique values, with no associated data. These are language-agnostic computer-science concepts — Java has HashMap/HashSet as literal class names. Python does NOT have a class called HashMap. It implements the same concept through two built-ins: dict (key-value pairs) and set (unique values). They ARE the HashMap/HashSet of Python, not a coincidence or an analogy — treat the two names as interchangeable in interviews, but always write the Python code using dict/set.",
    tip: "If an interviewer says 'use a HashMap', they want you to reach for `{}` or `dict()` in Python. Saying so out loud shows you know both the concept and the language.",
  },
  {
    title: "Why Python's dict just IS the HashMap — no separate class needed",
    content:
      "Unlike JavaScript, Python never had the 'plain object vs Map' problem. dict was built from the start to be a proper hash table: any hashable value can be a key (numbers, strings, tuples — but not lists, since lists are mutable and unhashable), there's no prototype-chain leakage into iteration, and len(d) is O(1). Since Python 3.7, dicts also preserve insertion order as a language guarantee.",
    code: "d = {}\nd[1] = 'number one'\nd['1'] = 'string one'\nlen(d)  # 2 — int key 1 and str key '1' are distinct, unlike coerced string keys in some other languages",
    language: "python",
  },
  {
    title: "dict — the core API",
    content:
      "The handful of operations that cover almost every interview use of dict.",
    code: "d = {}\nd['apple'] = 3            # insert or update\nd.get('apple')             # 3 — returns None if the key is absent (no KeyError)\nd.get('missing', 0)        # 0 — get() with a default, avoids the None-check dance\n'apple' in d                # True — O(1) membership check\ndel d['apple']              # removes the key (raises KeyError if absent)\nlen(d)                      # number of entries\n\nfor key, value in d.items():  # iterate in insertion order\n    pass",
    language: "python",
    tip: "d[key] on a missing key raises KeyError. d.get(key) returns None instead — a common source of bugs is forgetting to default it: `d.get(key, 0) + 1` for a frequency counter, or use collections.Counter / defaultdict.",
  },
  {
    title: "set — the core API",
    content:
      "set drops the value half of dict and keeps only unique keys. Use it for membership tests and de-duplication.",
    code: "s = set()\ns.add(10)                  # insert — no-op if already present\n10 in s                     # True — O(1) membership check\ns.discard(10)               # removes if present, no error if absent (s.remove(10) raises KeyError if missing)\nlen(s)                       # number of unique members\n\ndeduped = list(set([1, 2, 2, 3, 1]))  # [1, 2, 3] (order not guaranteed)",
    language: "python",
    tip: "`list(set(my_list))` is the standard one-line list de-duplication idiom — it comes up constantly and interviewers expect you to know it cold. Use `list(dict.fromkeys(my_list))` instead if you need to preserve order.",
  },
  {
    title: "When to reach for a HashMap/HashSet instead of a list",
    content:
      "Reach for a set when the question is purely 'have I seen this before?' — duplicate detection, membership checks, intersection/union of collections. Reach for a dict when you need to associate a value with each key — counting frequency, pairing a value with its index, caching computed results, grouping items by a property. If your instinct is a nested loop checking every pair, that's the tell: an O(n^2) pairwise scan usually collapses to an O(n) pass with a dict or set trading space for time.",
    tip: "The frequency-counter pattern — build a dict (or collections.Counter) of value -> count in one pass, then read the answer off the counts — solves more interview problems than any other single technique in this repository.",
  },
];

const hashmap_questions: InterviewQuestion[] = [
  {
    id: "s18-q01",
    q: "What is a HashMap, conceptually, and what is its Python implementation called?",
    hint: "Key-value store, O(1) average — the concept has one name, Python gives it another.",
    answer:
      "A HashMap is a key-value data structure offering average O(1) insert, lookup, and delete via a hash table. Python does not have a class named HashMap; it implements the same concept as dict (the built-in `{}`). In an interview, use the two terms interchangeably but write `{}` or `dict()` in code.",
    category: "HashMap/HashSet",
  },
  {
    id: "s18-q02",
    q: "What is the difference between dict and set?",
    hint: "Pairs vs uniques.",
    answer:
      "dict stores key-value pairs — you look a value up by its key. set stores only unique values with no associated data — you only ask 'is this value present?'. Use dict when you need to associate information with each item (counts, indices, cached results); use set when you only need membership or uniqueness.",
    category: "HashMap/HashSet",
  },
  {
    id: "s18-q03",
    q: "Why is dict considered a proper HashMap in Python — is there anything to watch out for, unlike JS's plain-object trap?",
    hint: "Python's dict avoids the string-coercion and prototype-pollution problems entirely.",
    answer:
      "Python's dict never had those problems: any hashable value can be a key (numbers, strings, tuples), there's no prototype/inheritance leakage into iteration, and len(d) is O(1) always. The one gotcha to know: only hashable (effectively, immutable) types can be dict keys or set members — a list can't be a key or set element, but a tuple can.",
    category: "HashMap/HashSet",
  },
  {
    id: "s18-q04",
    q: "When would you choose a dict instead of a list?",
    hint: "Lookup by identity vs lookup by position.",
    answer:
      "Choose a list when order and position matter and you mostly iterate. Choose a dict when you need fast lookup by a key that is not a sequential index — counting occurrences, caching results by input, associating a user ID with a record. A list lookup by value is O(n); a dict lookup by key is O(1) average.",
    category: "HashMap/HashSet",
  },
];

const hashmap_coding: CodingQuestion[] = [
  {
    id: "s18-c01",
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given a list of integers and a target, return the indices of the two numbers that add up to the target. Assume exactly one solution exists and you may not use the same element twice.",
    examples: [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
      { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]" },
    ],
    constraints: ["2 <= len(nums) <= 10^4", "Exactly one valid answer exists", "Target O(n) time"],
    hint: "For each number, check whether (target - number) was already seen. Store value -> index in a dict as you go.",
    solution:
      "def two_sum(nums, target):\n    seen = {}  # value -> index\n    for i, n in enumerate(nums):\n        complement = target - n\n        if complement in seen:\n            return [seen[complement], i]\n        seen[n] = i\n    return []",
  },
  {
    id: "s18-c02",
    title: "Contains Duplicate",
    difficulty: "Easy",
    description: "Given a list of integers, return true if any value appears at least twice.",
    examples: [
      { input: "[1, 2, 3, 1]", output: "true" },
      { input: "[1, 2, 3, 4]", output: "false" },
    ],
    constraints: ["1 <= len(nums) <= 10^5", "Target O(n) time"],
    hint: "A set only ever holds unique values — if adding an element doesn't grow the size, it was already there.",
    solution:
      "def contains_duplicate(nums):\n    seen = set()\n    for n in nums:\n        if n in seen:\n            return True\n        seen.add(n)\n    return False\n\n# One-liner using the size trick:\ndef contains_duplicate_short(nums):\n    return len(set(nums)) != len(nums)",
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
    constraints: ["1 <= len(s) <= 5 * 10^4", "Lowercase English letters"],
    hint: "Build a frequency dict for s, then decrement per character of t. Any negative or leftover count means it's not an anagram. (Or just compare Counter(s) == Counter(t).)",
    solution:
      "from collections import Counter\n\ndef is_anagram(s, t):\n    if len(s) != len(t):\n        return False\n    return Counter(s) == Counter(t)\n\n# Manual version, without Counter:\ndef is_anagram_manual(s, t):\n    if len(s) != len(t):\n        return False\n    freq = {}\n    for ch in s:\n        freq[ch] = freq.get(ch, 0) + 1\n    for ch in t:\n        if freq.get(ch, 0) == 0:\n            return False\n        freq[ch] -= 1\n    return True",
  },
  {
    id: "s18-c04",
    title: "Intersection of Two Arrays",
    difficulty: "Easy",
    description: "Given two lists, return a list of their unique shared elements.",
    examples: [
      { input: "nums1 = [1, 2, 2, 1], nums2 = [2, 2]", output: "[2]" },
      { input: "nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]", output: "[9, 4] (order may vary)" },
    ],
    constraints: ["1 <= length <= 1000", "Result contains no duplicates"],
    hint: "Put the first list in a set, then keep only the elements of the second list that are members — sets even support this directly with &.",
    solution:
      "def intersection(nums1, nums2):\n    return list(set(nums1) & set(nums2))\n\n# Equivalent, spelled out without the & operator:\ndef intersection_manual(nums1, nums2):\n    set1 = set(nums1)\n    result = set()\n    for n in nums2:\n        if n in set1:\n            result.add(n)\n    return list(result)",
  },
  {
    id: "s18-c05",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    description: "Given a list of integers and an integer k, return the k most frequent elements, in any order.",
    examples: [
      { input: "nums = [1, 1, 1, 2, 2, 3], k = 2", output: "[1, 2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: ["1 <= len(nums) <= 10^5", "k is always valid", "Aim for better than O(n log n) if possible"],
    hint: "Count frequencies with collections.Counter, then bucket values by their count (bucket sort) so you never need a full sort — O(n) overall.",
    solution:
      "from collections import Counter\n\ndef top_k_frequent(nums, k):\n    freq = Counter(nums)\n\n    buckets = [[] for _ in range(len(nums) + 1)]\n    for value, count in freq.items():\n        buckets[count].append(value)\n\n    result = []\n    for count in range(len(buckets) - 1, -1, -1):\n        for value in buckets[count]:\n            result.append(value)\n            if len(result) == k:\n                return result\n    return result",
  },
  {
    id: "s18-c06",
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    description:
      "Given a list of n + 1 integers where every value is between 1 and n inclusive, exactly one value repeats (possibly more than once). Find that repeated value.",
    examples: [
      { input: "[1, 3, 4, 2, 2]", output: "2" },
      { input: "[3, 1, 3, 4, 2]", output: "3" },
    ],
    constraints: ["2 <= n <= 10^5", "Only one value repeats", "A set solves it in O(n) time and space"],
    hint: "Walk the list; the first value you've already added to the set is the duplicate.",
    solution:
      "def find_duplicate(nums):\n    seen = set()\n    for n in nums:\n        if n in seen:\n            return n\n        seen.add(n)\n    return -1  # unreachable given the constraints",
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
    hint: "Use a set to remember every sum you've produced. If you see one you've already produced, you're in a cycle — not happy.",
    solution:
      "def is_happy(n):\n    def sum_of_squares(num):\n        total = 0\n        while num > 0:\n            digit = num % 10\n            total += digit * digit\n            num //= 10\n        return total\n\n    seen = set()\n    while n != 1 and n not in seen:\n        seen.add(n)\n        n = sum_of_squares(n)\n    return n == 1",
  },
  {
    id: "s18-c08",
    title: "Ransom Note",
    difficulty: "Easy",
    description:
      "Given a ransom note string and a magazine string, determine whether the note can be built using letters from the magazine, where each magazine letter can be used only once.",
    examples: [
      { input: 'ransom_note = "aa", magazine = "aab"', output: "true" },
      { input: 'ransom_note = "aa", magazine = "ab"', output: "false" },
    ],
    constraints: ["1 <= length <= 10^5", "Lowercase English letters"],
    hint: "Frequency-count the magazine into a dict (or Counter), then decrement per letter of the note — fail on a missing or exhausted letter.",
    solution:
      "from collections import Counter\n\ndef can_construct(ransom_note, magazine):\n    available = Counter(magazine)\n    for ch in ransom_note:\n        if available[ch] <= 0:\n            return False\n        available[ch] -= 1\n    return True",
  },
];

const hashmap_mcqs: MCQQuestion[] = [
  {
    id: "s18-m01",
    question: "Python does not have a class literally named 'HashMap'. What is its equivalent?",
    options: ["list", "tuple", "dict", "frozenset only"],
    correctAnswerIndex: 2,
    explanation:
      "dict is Python's implementation of the HashMap concept — average O(1) get/set/has(in)/delete keyed by arbitrary hashable values, with insertion-order iteration since Python 3.7.",
  },
  {
    id: "s18-m02",
    question: "Why can both 1 and '1' exist as separate keys in the same dict, without colliding?",
    options: [
      "Dicts don't support numeric keys at all",
      "Python's dict keys are compared by actual type and value (via hash + equality), not coerced to a common type",
      "Dicts only support string keys",
      "This is a Python interpreter bug",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Unlike some languages that coerce object keys to strings, Python's dict hashes and compares keys by their real type and value — so the int 1 and the str '1' hash differently and are distinct entries.",
  },
  {
    id: "s18-m03",
    question: "What does `d.get('missingKey')` return if the key was never set (with no default argument)?",
    options: ["0", "raises KeyError", "None", "an empty string"],
    correctAnswerIndex: 2,
    explanation:
      "d.get(key) returns None for an absent key instead of raising — unlike d[key], which raises KeyError. This is why frequency counters use `d.get(key, 0) + 1` — to default a missing count to 0.",
  },
  {
    id: "s18-m04",
    question: "Which one-liner de-duplicates a list using a HashSet?",
    options: [
      "[v for i, v in enumerate(lst) if lst.index(v) == i]",
      "list(set(lst))",
      "sorted(lst)",
      "lst.keys()",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Converting to a set collapses duplicates in O(n), then list() converts back. The index()-based version also works but is O(n^2) since index() scans linearly for each element.",
  },
  {
    id: "s18-m05",
    question: "In Two Sum, why does storing 'value -> index' in a dict beat a nested loop?",
    options: [
      "It sorts the list as a side effect",
      "It turns an O(n^2) pairwise search into a single O(n) pass with O(1) lookups",
      "It uses less memory than a nested loop",
      "Nested loops are not allowed in Python",
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
  subtitle: "dict & set — the concept, the Python API, and the problems that need them",
  color: "#8b5cf6",
  priority: "VERY_IMPORTANT",
  stack: "DSA",
  questions: hashmap_questions,
  mcqs: hashmap_mcqs,
  notes: hashmap_notes,
  codingQuestions: hashmap_coding,
};