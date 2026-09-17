import type { InterviewSection, CodingQuestion, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/**
 * Section 17 — HackerRank-Style Problem Solving
 *
 * Scope: the pattern coverage of HackerRank's "Interview Preparation Kit"
 * (Warm-Up, Arrays, Dictionaries & Hashmaps, Sorting, String Manipulation,
 * Greedy, Search, Dynamic Programming, Stacks & Queues, Recursion),
 * targeted at the Leapfrog written / online entrance test.
 *
 * All problem statements, examples and solutions below are original wording
 * written for this repository. They reproduce the *techniques* the kit drills,
 * not HackerRank's copyrighted problem text. Solve the originals on
 * hackerrank.com/interview/interview-preparation-kit for the real test cases.
 */

// ─── Coding Questions ──────────────────────────────────────────────────────

const hackerrank_coding: CodingQuestion[] = [
  // ── Warm-Up: counting & simulation ──
  {
    id: "s17-c01",
    title: "Count Matching Pairs",
    difficulty: "Easy",
    description:
      "You are given an array of integers where each value is a colour code. Count how many complete pairs of identical colours can be formed. Leftover single items are discarded.",
    examples: [
      { input: "[1, 2, 1, 2, 1, 3, 2]", output: "2", explanation: "Two 1s form one pair, two 2s form one pair; the extra 1, 2 and 3 are unpaired." },
      { input: "[4, 4, 4, 4]", output: "2" },
    ],
    constraints: ["1 <= n <= 100", "Values fit in a 32-bit integer", "Target O(n) time"],
    hint: "Count occurrences in a dict, then sum count // 2.",
    solution:
      "def count_pairs(arr):\n    freq = {}\n    for v in arr:\n        freq[v] = freq.get(v, 0) + 1\n    pairs = 0\n    for count in freq.values():\n        pairs += count // 2\n    return pairs",
  },
  {
    id: "s17-c02",
    title: "Altitude Valley Counter",
    difficulty: "Easy",
    description:
      "A hiker starts at sea level (altitude 0). The string s contains only 'U' (step up one unit) and 'D' (step down one unit). A valley is any sequence of steps that starts by stepping below sea level and ends when the hiker returns to sea level. Count the valleys walked.",
    examples: [
      { input: '"UDDDUDUU"', output: "1", explanation: "The hiker drops below 0 once and returns to 0 once." },
      { input: '"DDUUDDUDUUUD"', output: "2" },
    ],
    constraints: ["2 <= s.length <= 10^6", "s contains only 'U' and 'D'", "Single pass, O(1) extra space"],
    hint: "Track altitude. Increment the counter each time a 'U' brings altitude from -1 back to 0.",
    solution:
      "def count_valleys(s):\n    altitude = 0\n    valleys = 0\n    for step in s:\n        if step == 'U':\n            altitude += 1\n            if altitude == 0:\n                valleys += 1\n        else:\n            altitude -= 1\n    return valleys",
  },
  {
    id: "s17-c03",
    title: "Character Count in a Repeated String",
    difficulty: "Easy",
    description:
      "A string s is repeated infinitely to form an endless sequence. Given an integer n, count how many times the character 'a' appears in the first n characters of that endless sequence.",
    examples: [
      { input: 's = "aba", n = 10', output: "7", explanation: "The first 10 characters are 'abaabaabaa', which contain seven 'a'." },
      { input: 's = "a", n = 1000000000000', output: "1000000000000" },
    ],
    constraints: ["1 <= s.length <= 100", "1 <= n <= 10^12", "Do NOT build the string — it will not fit in memory"],
    hint: "Full repetitions x count in s, plus the count in the leftover prefix of length n % len(s).",
    solution:
      "def repeated_string(s, n):\n    def count_a(text):\n        return text.count('a')\n\n    full_repeats = n // len(s)\n    remainder = n % len(s)\n    return full_repeats * count_a(s) + count_a(s[:remainder])",
  },
  {
    id: "s17-c04",
    title: "Minimum Jumps Over Obstacles",
    difficulty: "Easy",
    description:
      "An array c represents a path where 0 is a safe tile and 1 is an obstacle. Starting at index 0, you may jump forward 1 or 2 tiles at a time and may never land on an obstacle. Return the minimum number of jumps needed to reach the last index.",
    examples: [
      { input: "[0, 0, 1, 0, 0, 1, 0]", output: "4" },
      { input: "[0, 0, 0, 0, 1, 0]", output: "3" },
    ],
    constraints: ["2 <= c.length <= 100", "c[0] === 0 and c[c.length - 1] === 0", "A valid path is guaranteed"],
    hint: "Greedy: always take the 2-step jump when the landing tile is safe.",
    solution:
      "def jumping_on_clouds(c):\n    i = 0\n    jumps = 0\n    while i < len(c) - 1:\n        i += 2 if (i + 2 < len(c) and c[i + 2] == 0) else 1\n        jumps += 1\n    return jumps",
  },

  // ── Arrays ──
  {
    id: "s17-c05",
    title: "Left Rotate an Array d Times",
    difficulty: "Easy",
    description:
      "Rotate the array to the left by d positions. A single left rotation moves the first element to the end. Return the rotated array.",
    examples: [
      { input: "arr = [1, 2, 3, 4, 5], d = 2", output: "[3, 4, 5, 1, 2]" },
      { input: "arr = [1, 2, 3], d = 3", output: "[1, 2, 3]", explanation: "Rotating by the array length returns the original order." },
    ],
    constraints: ["1 <= n <= 10^5", "0 <= d <= n", "Aim for O(n) time"],
    hint: "Element at index i moves to index (i - d + n) % n — or just slice and concatenate.",
    solution:
      "def rotate_left(arr, d):\n    n = len(arr)\n    shift = d % n\n    return arr[shift:] + arr[:shift]\n\n\n# O(1) extra space per element, index-math version:\ndef rotate_left_math(arr, d):\n    n = len(arr)\n    out = [None] * n\n    for i in range(n):\n        out[(i - d % n + n) % n] = arr[i]\n    return out",
  },
  {
    id: "s17-c06",
    title: "Hourglass Sum in a 2D Grid",
    difficulty: "Medium",
    description:
      "Given a 6x6 grid of integers, an hourglass is the set of 7 values arranged in a 3-3 shape: three cells on the top row, the single cell beneath the middle of those, and three cells on the row below that. Return the largest hourglass sum in the grid.",
    examples: [
      {
        input: "A 6x6 grid where the maximum hourglass is the block at rows 2-4, cols 2-4",
        output: "19",
        explanation: "There are 16 possible hourglasses in a 6x6 grid; return the maximum of their sums.",
      },
    ],
    constraints: ["Grid is exactly 6 x 6", "-9 <= value <= 9", "Initialise the max to negative infinity, not 0 — sums can be negative"],
    hint: "Nested loops over the 4x4 valid top-left corners. Sum the 7 offsets directly.",
    solution:
      "def hourglass_sum(grid):\n    best = float('-inf')\n    for r in range(4):\n        for c in range(4):\n            total = (\n                grid[r][c] + grid[r][c + 1] + grid[r][c + 2] +\n                grid[r + 1][c + 1] +\n                grid[r + 2][c] + grid[r + 2][c + 1] + grid[r + 2][c + 2]\n            )\n            best = max(best, total)\n    return best",
  },
  {
    id: "s17-c07",
    title: "Range Update, Then Find the Maximum",
    difficulty: "Hard",
    description:
      "You start with an array of n zeros. You are given q operations, each written as [a, b, k], which adds k to every element from index a to index b inclusive (1-indexed). Return the maximum value in the array after all operations are applied.",
    examples: [
      { input: "n = 5, ops = [[1,2,100],[2,5,100],[3,4,100]]", output: "200" },
    ],
    constraints: ["3 <= n <= 10^7", "1 <= q <= 2 * 10^5", "A naive nested loop will time out — you need O(n + q)"],
    hint: "Difference array: add k at index a, subtract k at index b+1, then take a running prefix sum.",
    solution:
      "def array_manipulation(n, ops):\n    diff = [0] * (n + 2)\n    for a, b, k in ops:\n        diff[a] += k\n        diff[b + 1] -= k\n    running = 0\n    best = 0\n    for i in range(1, n + 1):\n        running += diff[i]\n        if running > best:\n            best = running\n    return best",
  },
  {
    id: "s17-c08",
    title: "Minimum Swaps to Sort a Permutation",
    difficulty: "Medium",
    description:
      "You are given an unordered array containing each integer from 1 to n exactly once. Return the minimum number of swaps required to sort it in ascending order.",
    examples: [
      { input: "[4, 3, 1, 2]", output: "3" },
      { input: "[2, 3, 4, 1, 5]", output: "3" },
    ],
    constraints: ["1 <= n <= 10^5", "The array is a permutation of 1..n", "Target O(n) time"],
    hint: "Walk the array; while the value at index i is not i+1, swap it into the position where it belongs. Each swap places at least one element correctly.",
    solution:
      "def minimum_swaps(arr):\n    swaps = 0\n    for i in range(len(arr)):\n        while arr[i] != i + 1:\n            target = arr[i] - 1\n            arr[i], arr[target] = arr[target], arr[i]\n            swaps += 1\n    return swaps",
  },

  // ── Dictionaries & Hashmaps ──
  {
    id: "s17-c09",
    title: "Can the Note Be Built From the Magazine?",
    difficulty: "Easy",
    description:
      "Given two arrays of words — the words available in a magazine and the words needed for a note — determine whether the note can be assembled. Each magazine word can be used at most once, and matching is case-sensitive.",
    examples: [
      { input: 'magazine = ["give","one","grand","today"], note = ["give","one","grand","today"]', output: '"Yes"' },
      { input: 'magazine = ["two","times","three"], note = ["two","times","two"]', output: '"No"', explanation: 'Only one "two" is available but two are needed.' },
    ],
    constraints: ["1 <= words <= 3 * 10^4", "Words are lowercase alphanumeric", "Target O(m + n) time"],
    hint: "Build a frequency dict of the magazine, then decrement per note word; fail if a count hits zero or is missing.",
    solution:
      "def check_magazine(magazine, note):\n    pool = {}\n    for w in magazine:\n        pool[w] = pool.get(w, 0) + 1\n    for w in note:\n        left = pool.get(w, 0)\n        if left == 0:\n            return 'No'\n        pool[w] = left - 1\n    return 'Yes'",
  },
  {
    id: "s17-c10",
    title: "Do Two Strings Share Any Substring?",
    difficulty: "Easy",
    description:
      "Given two strings, determine whether they have any substring in common. Return 'YES' if they do and 'NO' otherwise.",
    examples: [
      { input: 's1 = "hello", s2 = "world"', output: '"YES"', explanation: "Both contain the letter 'o', and a single character is a valid substring." },
      { input: 's1 = "hi", s2 = "world"', output: '"NO"' },
    ],
    constraints: ["1 <= length <= 10^5", "Lowercase letters only"],
    hint: "Any shared substring implies a shared single character — so this reduces to a set intersection.",
    solution:
      "def two_strings(s1, s2):\n    seen = set(s1)\n    for ch in s2:\n        if ch in seen:\n            return 'YES'\n    return 'NO'",
  },
  {
    id: "s17-c11",
    title: "Count Geometric Triplets",
    difficulty: "Medium",
    description:
      "Given a sorted array of numbers and a common ratio r, count the triplets (i, j, k) with i < j < k where arr[j] === arr[i] * r and arr[k] === arr[j] * r. Triplets are counted by index, so duplicate values produce multiple triplets.",
    examples: [
      { input: "arr = [1, 2, 2, 4], r = 2", output: "2" },
      { input: "arr = [1, 3, 9, 9, 27, 81], r = 3", output: "6" },
    ],
    constraints: ["1 <= n <= 10^5", "1 <= r <= 10^9", "Values can be large — a triple loop will time out"],
    hint: "One pass with two dicts: how many valid pairs end at this value, and how many single elements could precede it.",
    solution:
      "def count_triplets(arr, r):\n    left = {}\n    right = {}\n    for v in arr:\n        right[v] = right.get(v, 0) + 1\n\n    total = 0\n    for v in arr:\n        right[v] -= 1\n        if v % r == 0:\n            before = left.get(v // r, 0)\n            after = right.get(v * r, 0)\n            total += before * after\n        left[v] = left.get(v, 0) + 1\n    return total",
  },

  // ── Sorting ──
  {
    id: "s17-c12",
    title: "Count Bubble Sort Swaps",
    difficulty: "Easy",
    description:
      "Implement bubble sort on an array and report the total number of adjacent swaps performed, plus the first and last elements of the sorted array.",
    examples: [
      { input: "[3, 2, 1]", output: "{ swaps: 3, first: 1, last: 3 }" },
      { input: "[1, 2, 3]", output: "{ swaps: 0, first: 1, last: 3 }" },
    ],
    constraints: ["2 <= n <= 600", "Use an early-exit flag so an already-sorted array costs O(n)"],
    hint: "Outer loop n times, inner loop compares neighbours. Break out if a full inner pass makes no swap.",
    solution:
      "def count_swaps(a):\n    arr = list(a)\n    swaps = 0\n    for i in range(len(arr)):\n        swapped_this_pass = False\n        for j in range(len(arr) - 1 - i):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swaps += 1\n                swapped_this_pass = True\n        if not swapped_this_pass:\n            break\n    return {'swaps': swaps, 'first': arr[0], 'last': arr[-1]}",
  },
  {
    id: "s17-c13",
    title: "Counting Sort Frequency Table",
    difficulty: "Easy",
    description:
      "Given an array of integers where every value is between 0 and 99 inclusive, return an array of length 100 in which index i holds the number of times i appeared in the input.",
    examples: [
      { input: "[1, 1, 3, 2, 1]", output: "[0, 3, 1, 1, 0, ... 0]", explanation: "1 appears three times, 2 once, 3 once." },
    ],
    constraints: ["1 <= n <= 10^6", "0 <= value <= 99", "O(n) time, O(1) extra space since the range is fixed"],
    hint: "Pre-fill a list of 100 zeros and increment by value as index. No comparisons needed.",
    solution:
      "def counting_sort(arr):\n    buckets = [0] * 100\n    for v in arr:\n        buckets[v] += 1\n    return buckets",
  },

  // ── String Manipulation ──
  {
    id: "s17-c14",
    title: "Is the Sentence a Pangram?",
    difficulty: "Easy",
    description:
      "Determine whether a sentence uses every letter of the English alphabet at least once. Ignore case and non-letter characters. Return 'pangram' or 'not pangram'.",
    examples: [
      { input: '"We promptly judged antique ivory buckles for the next prize"', output: '"pangram"' },
      { input: '"We promptly judged antique ivory buckles for the prize"', output: '"not pangram"' },
    ],
    constraints: ["0 < length <= 10^5", "Single pass, O(1) extra space (26 slots)"],
    hint: "Lowercase the input, drop anything outside a-z into a set, and check whether the set size is 26.",
    solution:
      "def pangrams(s):\n    letters = {ch for ch in s.lower() if 'a' <= ch <= 'z'}\n    return 'pangram' if len(letters) == 26 else 'not pangram'",
  },
  {
    id: "s17-c15",
    title: "Minimum Deletions to Remove Adjacent Duplicates",
    difficulty: "Easy",
    description:
      "A string contains only the characters 'A' and 'B'. Return the minimum number of characters that must be deleted so that no two adjacent characters are the same.",
    examples: [
      { input: '"AABAAB"', output: "2" },
      { input: '"ABABABAB"', output: "0" },
    ],
    constraints: ["1 <= length <= 10^5", "Only 'A' and 'B' appear", "Single pass"],
    hint: "Count every position where a character equals the one before it.",
    solution:
      "def alternating_characters(s):\n    deletions = 0\n    for i in range(1, len(s)):\n        if s[i] == s[i - 1]:\n            deletions += 1\n    return deletions",
  },
  {
    id: "s17-c16",
    title: "Valid Frequency String",
    difficulty: "Medium",
    description:
      "A string is 'valid' if every character occurs the same number of times, or if removing exactly one character from the whole string would make that true. Return 'YES' or 'NO'.",
    examples: [
      { input: '"aabbcc"', output: '"YES"', explanation: "All counts are already equal." },
      { input: '"aabbccc"', output: '"YES"', explanation: "Deleting one 'c' makes every count 2." },
      { input: '"aabbcccc"', output: '"NO"' },
    ],
    constraints: ["1 <= length <= 10^5", "Lowercase letters only", "Watch the single-outlier-of-count-1 edge case"],
    hint: "Build character counts, then count how often each count value occurs. At most two distinct counts may exist, and the odd one out must differ by 1 or be 1 itself.",
    solution:
      "def is_valid(s):\n    char_count = {}\n    for ch in s:\n        char_count[ch] = char_count.get(ch, 0) + 1\n\n    count_of_counts = {}\n    for c in char_count.values():\n        count_of_counts[c] = count_of_counts.get(c, 0) + 1\n\n    if len(count_of_counts) == 1:\n        return 'YES'\n    if len(count_of_counts) > 2:\n        return 'NO'\n\n    entries = sorted(count_of_counts.items(), key=lambda pair: pair[1])\n    odd_count, odd_freq = entries[0]\n    main_count, _ = entries[1]\n    if odd_freq != 1:\n        return 'NO'\n    return 'YES' if (odd_count == 1 or odd_count - main_count == 1) else 'NO'",
  },

  // ── Greedy ──
  {
    id: "s17-c17",
    title: "Minimum Absolute Difference in an Array",
    difficulty: "Easy",
    description:
      "Given an array of integers, find the smallest absolute difference between any two elements.",
    examples: [
      { input: "[3, -7, 0]", output: "3", explanation: "|3 - 0| = 3, which is smaller than |3 - (-7)| and |0 - (-7)|." },
      { input: "[-59, -36, -13, 1, -53, -92, -2, -96, -54, 75]", output: "1" },
    ],
    constraints: ["2 <= n <= 10^5", "Comparing every pair is O(n^2) and will time out"],
    hint: "Sort first — the closest pair must be adjacent in sorted order.",
    solution:
      "def minimum_absolute_difference(arr):\n    sorted_arr = sorted(arr)\n    best = float('inf')\n    for i in range(1, len(sorted_arr)):\n        best = min(best, sorted_arr[i] - sorted_arr[i - 1])\n    return best",
  },
  {
    id: "s17-c18",
    title: "Cheapest Group Purchase with Escalating Price",
    difficulty: "Medium",
    description:
      "A group of k friends wants to buy n items. Each item has a base price. Every time a person buys an additional item, they pay (base price x (number of items that person has already bought + 1)). Return the minimum total the group can spend.",
    examples: [
      { input: "prices = [2, 5, 6], k = 3", output: "13", explanation: "Each friend buys one item at base price." },
      { input: "prices = [2, 5, 6], k = 2", output: "15", explanation: "Buy the expensive items first at base price; the cheapest item is bought second by one friend at double price." },
    ],
    constraints: ["1 <= n, k <= 10^5", "Greedy choice: buy the most expensive items at the lowest multiplier"],
    hint: "Sort descending, then the i-th purchase (0-indexed) carries multiplier (i // k) + 1.",
    solution:
      "def get_minimum_cost(prices, k):\n    sorted_prices = sorted(prices, reverse=True)\n    total = 0\n    for i in range(len(sorted_prices)):\n        total += sorted_prices[i] * (i // k + 1)\n    return total",
  },

  // ── Search ──
  {
    id: "s17-c19",
    title: "Binary Search on a Sorted Array",
    difficulty: "Easy",
    description:
      "Given a sorted array and a target value, return the index of the target, or -1 if it is absent. Your solution must run in logarithmic time.",
    examples: [
      { input: "arr = [1, 3, 5, 7, 9, 11], target = 7", output: "3" },
      { input: "arr = [1, 3, 5], target = 4", output: "-1" },
    ],
    constraints: ["1 <= n <= 10^6", "The array is sorted ascending", "O(log n) time required"],
    hint: "Use low + (high - low) // 2 rather than (low + high) // 2 to avoid overflow in fixed-width languages (habit worth keeping even though Python ints don't overflow).",
    solution:
      "def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if arr[mid] == target:\n            return mid\n        if arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1",
  },
  {
    id: "s17-c20",
    title: "Pairs With a Given Difference",
    difficulty: "Medium",
    description:
      "Given an array of distinct integers and a target difference k, count the pairs of elements whose difference equals exactly k.",
    examples: [
      { input: "arr = [1, 5, 3, 4, 2], k = 2", output: "3", explanation: "The pairs are (5,3), (4,2) and (3,1)." },
    ],
    constraints: ["2 <= n <= 10^5", "All values are distinct", "0 < k < 10^9", "Target O(n) time"],
    hint: "Put everything in a set, then for each value check whether value + k is also present.",
    solution:
      "def pairs(arr, k):\n    seen = set(arr)\n    count = 0\n    for v in arr:\n        if (v + k) in seen:\n            count += 1\n    return count",
  },

  // ── Stacks & Queues ──
  {
    id: "s17-c21",
    title: "Balanced Brackets",
    difficulty: "Medium",
    description:
      "Given a string containing only the characters ( ) [ ] { }, determine whether the brackets are balanced. Every opening bracket must be closed by the matching type, in the correct order. Return 'YES' or 'NO'.",
    examples: [
      { input: '"{[()]}"', output: '"YES"' },
      { input: '"{[(])}"', output: '"NO"' },
      { input: '"{{[[(())]]}}"', output: '"YES"' },
    ],
    constraints: ["1 <= length <= 10^3", "Only bracket characters appear", "O(n) time and space"],
    hint: "Push openers onto a stack; on a closer, the popped value must be its partner. The stack must be empty at the end.",
    solution:
      "def is_balanced(s):\n    partners = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        else:\n            if not stack or stack.pop() != partners[ch]:\n                return 'NO'\n    return 'YES' if not stack else 'NO'",
  },

  // ── Recursion & DP ──
  {
    id: "s17-c22",
    title: "Maximum Non-Adjacent Subsequence Sum",
    difficulty: "Medium",
    description:
      "Given an array of integers, find the largest sum obtainable from a subsequence in which no two chosen elements are adjacent in the original array. The empty subsequence (sum 0) is allowed.",
    examples: [
      { input: "[3, 7, 4, 6, 5]", output: "13", explanation: "Choosing 3, 4 and 6 gives 13." },
      { input: "[-2, 1, 3, -4, 5]", output: "8", explanation: "Choosing 3 and 5 gives 8." },
    ],
    constraints: ["1 <= n <= 10^5", "-10^4 <= value <= 10^4", "O(n) time, O(1) space"],
    hint: "Two rolling values: the best sum including the previous element, and the best excluding it.",
    solution:
      "def max_subset_sum(arr):\n    including = 0\n    excluding = 0\n    for v in arr:\n        new_including = excluding + v\n        excluding = max(including, excluding)\n        including = new_including\n    return max(including, excluding)",
  },
  {
    id: "s17-c23",
    title: "Memoized Fibonacci",
    difficulty: "Easy",
    description:
      "Return the n-th Fibonacci number where fib(0) = 0 and fib(1) = 1. A naive recursive solution is O(2^n) and will time out; make it linear.",
    examples: [
      { input: "n = 10", output: "55" },
      { input: "n = 50", output: "12586269025" },
    ],
    constraints: ["0 <= n <= 90", "Python's ints are arbitrary precision, so large Fibonacci numbers stay exact with no overflow concern"],
    hint: "Cache results in a dict keyed by n, or drop recursion entirely and iterate with two rolling variables.",
    solution:
      "def fib(n, memo=None):\n    if memo is None:\n        memo = {}\n    if n <= 1:\n        return n\n    if n in memo:\n        return memo[n]\n    result = fib(n - 1, memo) + fib(n - 2, memo)\n    memo[n] = result\n    return result\n\n\n# Iterative, O(1) space:\ndef fib_iterative(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a",
  },
  {
    id: "s17-c24",
    title: "Read Input From stdin (HackerRank I/O Harness)",
    difficulty: "Easy",
    description:
      "HackerRank's Python environment does not hand you arguments — you must read the test case from standard input yourself. Write a program that reads n on the first line, an array of n space-separated integers on the second line, and prints their sum.",
    examples: [
      { input: "5\\n1 2 3 4 5", output: "15" },
    ],
    constraints: [
      "Python 3 runtime",
      "Input arrives via sys.stdin (or repeated input() calls), output goes to print()",
      "Trailing whitespace and newlines should be stripped before parsing",
    ],
    hint: "Read all of stdin at once and split it into lines, or call input() the right number of times.",
    solution:
      "import sys\n\n\ndef main():\n    data = sys.stdin.read().split('\\n')\n    n = int(data[0])\n    values = list(map(int, data[1].split()))[:n]\n    print(sum(values))\n\n\nif __name__ == '__main__':\n    main()",
  },
];

// ─── MCQs ──────────────────────────────────────────────────────────────────

const hackerrank_mcqs: MCQQuestion[] = [
  {
    id: "s17-m01",
    question: "You must apply q range-increment operations to an array of n zeros, then read one maximum. Which approach avoids a timeout at n = 10^7?",
    options: [
      "A nested loop updating every index in each range",
      "A difference array plus a single prefix-sum pass",
      "Sorting the operations by start index",
      "Recomputing the maximum after each operation",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The difference array records +k at the start and -k just past the end of each range, making each operation O(1). One prefix-sum pass then reconstructs the values in O(n), giving O(n + q) overall instead of O(n * q).",
  },
  {
    id: "s17-m02",
    question: "What is the time complexity of finding the minimum absolute difference between any two elements of an unsorted array, using the optimal approach?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    correctAnswerIndex: 1,
    explanation:
      "Sorting dominates at O(n log n); the subsequent single pass comparing adjacent elements is only O(n). The brute-force pairwise comparison would be O(n^2).",
  },
  {
    id: "s17-m03",
    question: "A string s is repeated infinitely and you must count occurrences of 'a' in the first 10^12 characters. Why does building the string fail?",
    options: [
      "String concatenation is not supported in Python",
      "Memory is exhausted long before 10^12 characters are allocated",
      "String indexing is O(n) in Python",
      "Python cannot represent integers larger than 10^12",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A 10^12-character string would need roughly a terabyte of memory. The arithmetic approach — full repetitions times the per-copy count, plus the leftover prefix — runs in O(|s|) regardless of n.",
  },
  {
    id: "s17-m04",
    question: "Which data structure is the natural fit for validating balanced brackets?",
    options: ["Queue", "Stack", "Min-heap", "Hash set"],
    correctAnswerIndex: 1,
    explanation:
      "Brackets close in last-opened-first-closed order, which is exactly LIFO. A queue would match the earliest opener instead of the most recent one and produce wrong answers on nested input.",
  },
  {
    id: "s17-m05",
    question: "Counting sort achieves O(n) time. What is the catch?",
    options: [
      "It only works on already-sorted data",
      "It is unstable and cannot be made stable",
      "It needs extra space proportional to the value range, so it is impractical for large ranges",
      "It requires the input to be a permutation",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Counting sort allocates a bucket per possible value, so its space is O(k) where k is the value range. It shines when k is small and bounded (for example 0-99) and becomes unusable when values span billions.",
  },
  {
    id: "s17-m06",
    question: "In the minimum-swaps-to-sort problem on a permutation of 1..n, why is the nested while loop still O(n) overall?",
    options: [
      "The while loop runs at most twice per index",
      "Every swap places at least one element into its final position, so there are at most n - 1 swaps total",
      "Python optimises the inner loop away",
      "The array is already nearly sorted by assumption",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The loop is amortised. Each swap is productive — it puts a value where it belongs permanently — so the total number of swaps across the entire outer loop is bounded by n - 1, not by n per index.",
  },
  {
    id: "s17-m07",
    question: "Two strings 'share a common substring'. What is the smallest case you must consider?",
    options: [
      "A substring of length 2",
      "A single shared character",
      "The full shorter string",
      "The empty string, which is always shared",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A single character is a valid non-empty substring, so the whole problem collapses to a set intersection over characters — O(n + m) rather than any substring-enumeration approach.",
  },
  {
    id: "s17-m08",
    question: "Which pattern solves 'longest substring satisfying a constraint' most efficiently?",
    options: ["Sorting then binary search", "Sliding window with two pointers", "Recursion with memoization", "Depth-first search"],
    correctAnswerIndex: 1,
    explanation:
      "A sliding window expands the right pointer and contracts the left one only when the constraint breaks. Each index enters and leaves the window at most once, giving O(n) instead of the O(n^2) cost of checking all substrings.",
  },
  {
    id: "s17-m09",
    question: "Initialising the running maximum to 0 rather than negative infinity in the hourglass-sum problem causes what?",
    options: [
      "A RecursionError",
      "A wrong answer when every hourglass sum is negative",
      "An off-by-one index error",
      "Nothing — the results are identical",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Grid values may be negative, so all 16 hourglass sums can be below zero. Seeding the maximum at 0 would return 0, a value no hourglass actually produces. Seed with float('-inf') or with the first computed sum.",
  },
  {
    id: "s17-m10",
    question: "When buying n items among k people with an escalating price multiplier, what makes the greedy choice correct?",
    options: [
      "Buying the cheapest items first minimises early cost",
      "Buying the most expensive items first keeps them at the lowest multiplier",
      "The order does not affect the total",
      "Items must be distributed alphabetically",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Multipliers only increase. Pairing the largest base prices with the smallest multipliers, and the smallest prices with the largest multipliers, minimises the sum of products — a rearrangement-inequality argument.",
  },
  {
    id: "s17-m11",
    question: "Naive recursive Fibonacci has what time complexity, and why?",
    options: [
      "O(n), because each value is computed once",
      "O(n log n), because of the branching factor",
      "O(2^n), because each call spawns two more and subproblems are recomputed",
      "O(n^2), because of the addition step",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Each call branches into two, and the same subproblems are recalculated across branches, producing an exponential call tree. Memoization collapses it to O(n) by storing each result the first time it is computed.",
  },
  {
    id: "s17-m12",
    question: "In the maximum non-adjacent subsequence sum, why keep two rolling variables instead of one?",
    options: [
      "To handle arrays of even and odd length differently",
      "To track the best sum that includes the previous element separately from the best that excludes it",
      "To cache the array length",
      "To detect negative numbers",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The decision at each index depends on whether the previous element was taken. Keeping 'best including previous' and 'best excluding previous' lets you resolve that in O(1) per element with O(1) total space.",
  },
  {
    id: "s17-m13",
    question: "Why is mid computed as low + (high - low) // 2 in binary search?",
    options: [
      "It is faster than (low + high) // 2",
      "It avoids integer overflow when low + high exceeds the maximum integer",
      "It guarantees the loop terminates",
      "It handles unsorted arrays",
    ],
    correctAnswerIndex: 1,
    explanation:
      "In fixed-width integer languages like Java or C++, low + high can overflow on large arrays. The subtraction form never exceeds the array bounds. Python's arbitrary-precision integers make it unnecessary here, but it is the habit interviewers expect from any language background.",
  },
  {
    id: "s17-m14",
    question: "Which statement about the counting-pairs (Sales by Match) problem is correct?",
    options: [
      "Sorting is required before counting",
      "The answer is the sum of (frequency // 2) across all values",
      "The answer equals the number of distinct values",
      "It requires a nested loop over all pairs",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Each value contributes count // 2 complete pairs independently of the others, so one frequency pass in O(n) is enough. Sorting would only add unnecessary O(n log n) overhead.",
  },
  {
    id: "s17-m15",
    question: "In HackerRank's Python environment, how does your program receive the test input?",
    options: [
      "As command-line arguments in sys.argv",
      "By reading sys.stdin (or using input()) and parsing it yourself",
      "As parameters automatically bound to your function",
      "From a global variable named input_data",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The Python runner pipes the test case into standard input. You read it via sys.stdin.read() or repeated input() calls, then parse it yourself. Forgetting this is a common reason otherwise-correct solutions score zero.",
  },
  {
    id: "s17-m16",
    question: "The 'valid frequency string' check allows removing at most one character. Which edge case is most often missed?",
    options: [
      "An empty input string",
      "A single character whose count is 1 while all others share a higher count",
      "Strings containing uppercase letters",
      "Strings of length exactly 26",
    ],
    correctAnswerIndex: 1,
    explanation:
      "If one character appears exactly once and the rest appear k times, deleting that one character leaves a valid string even when k is far from 1. Checking only 'the counts differ by one' misses this case.",
  },
  {
    id: "s17-m17",
    question: "Given a sorted array, which technique finds pairs with a fixed difference k in O(n)?",
    options: [
      "Nested loops over all pairs",
      "A hash set membership check for value + k, or a two-pointer sweep",
      "Binary search for every element",
      "Sorting a second time by difference",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A set lookup for value + k is O(1) per element, giving O(n) overall. On sorted input a two-pointer sweep achieves the same without extra space. Binary search per element would be O(n log n).",
  },
  {
    id: "s17-m18",
    question: "Bubble sort with an early-exit flag has what best-case time complexity?",
    options: ["O(1)", "O(n)", "O(n log n)", "O(n^2)"],
    correctAnswerIndex: 1,
    explanation:
      "On already-sorted input the first pass performs no swaps, the flag stays false, and the algorithm stops after a single O(n) sweep. Its average and worst cases remain O(n^2).",
  },
  {
    id: "s17-m19",
    question: "Left-rotating an array by d positions moves the element at index i to which index?",
    options: ["(i + d) % n", "(i - d + n) % n", "(n - i - d) % n", "(i * d) % n"],
    correctAnswerIndex: 1,
    explanation:
      "A left rotation shifts elements toward lower indices, so index i becomes i - d, with + n before the modulo to keep the result non-negative. (i + d) % n describes a right rotation.",
  },
  {
    id: "s17-m20",
    question: "The count-triplets problem multiplies two counts per element. What does each count represent?",
    options: [
      "The elements smaller than and larger than the current element",
      "How many valid predecessors appear to the left, and how many valid successors appear to the right",
      "The number of even and odd values",
      "The array length before and after the current index",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Treating each element as the middle of the triplet, the number of triplets through it is (occurrences of v / r already seen) times (occurrences of v * r still ahead). Summing that product over all positions gives the total in one pass.",
  },
];

// ─── Flashcards ────────────────────────────────────────────────────────────

const hackerrank_questions: InterviewQuestion[] = [
  {
    id: "s17-q01",
    q: "What are the 13 topics in HackerRank's Interview Preparation Kit?",
    hint: "Warm-up, then data structures, then algorithm families.",
    answer:
      "Warm-Up Challenges, Arrays, Dictionaries and Hashmaps, Sorting, String Manipulation, Greedy Algorithms, Search, Dynamic Programming, Stacks and Queues, Graphs, Trees, Linked Lists, and Recursion and Backtracking. Entrance tests draw most heavily from the first nine.",
    category: "Meta",
  },
  {
    id: "s17-q02",
    q: "What is a prefix sum, and when does it help?",
    hint: "Precompute cumulative totals once.",
    answer:
      "A prefix sum array stores the running total up to each index, so the sum of any range [i, j] becomes prefix[j+1] - prefix[i] in O(1) after an O(n) build. Use it whenever many range-sum queries hit the same static array.",
    code: "prefix = [0]\nfor v in arr:\n    prefix.append(prefix[-1] + v)\n\ndef range_sum(i, j):\n    return prefix[j + 1] - prefix[i]",
    language: "python",
    category: "Arrays",
  },
  {
    id: "s17-q03",
    q: "What is a difference array?",
    hint: "The inverse of a prefix sum — for range updates instead of range queries.",
    answer:
      "A difference array makes range *updates* O(1): to add k over [a, b], record +k at a and -k at b+1. After all updates, a prefix-sum pass reconstructs the real values. It turns O(n * q) range-increment work into O(n + q).",
    code: "diff[a] += k\ndiff[b + 1] -= k\n# then: running += diff[i] for each i",
    language: "python",
    category: "Arrays",
  },
  {
    id: "s17-q04",
    q: "When should you reach for the sliding window pattern?",
    hint: "Contiguous subarray or substring, with a constraint.",
    answer:
      "Whenever the question asks for the longest, shortest or best *contiguous* run satisfying some condition. Expand the right pointer, shrink the left one when the condition breaks. Each index is visited at most twice, so it runs in O(n).",
    category: "Patterns",
  },
  {
    id: "s17-q05",
    q: "When is the two-pointer pattern applicable?",
    hint: "Usually requires sorted input.",
    answer:
      "On sorted arrays, for pair-sum, pair-difference, closest-pair and partitioning problems. One pointer starts at each end (or both at the start) and they converge, replacing an O(n^2) nested loop with an O(n) sweep.",
    category: "Patterns",
  },
  {
    id: "s17-q06",
    q: "Why does a frequency dict beat sorting for counting problems?",
    hint: "O(n) versus O(n log n).",
    answer:
      "Counting how many times each value occurs needs no ordering, so a dict does it in one O(n) pass with O(k) space. Sorting first costs O(n log n) and throws away nothing useful in return.",
    code: "freq = {}\nfor v in arr:\n    freq[v] = freq.get(v, 0) + 1\n\n# Or, idiomatically:\nfrom collections import Counter\nfreq = Counter(arr)",
    language: "python",
    category: "Hashmaps",
  },
  {
    id: "s17-q07",
    q: "What distinguishes a greedy algorithm from dynamic programming?",
    hint: "Locally optimal choice versus exploring overlapping subproblems.",
    answer:
      "Greedy commits to the best-looking choice at each step and never reconsiders — correct only when the problem has the greedy-choice property (interval scheduling, minimum absolute difference, the escalating-price purchase). DP explores overlapping subproblems and caches results, which is needed when a locally optimal choice can be globally wrong.",
    category: "Algorithms",
  },
  {
    id: "s17-q08",
    q: "What are the two ways to implement dynamic programming?",
    hint: "Memoization versus tabulation.",
    answer:
      "Top-down memoization keeps the recursive structure and caches results in a dict or list — easy to derive from a brute-force solution but risks hitting Python's recursion limit. Bottom-up tabulation fills a table iteratively from the base cases — no recursion depth limit and often allows O(1) space with rolling variables.",
    category: "Algorithms",
  },
  {
    id: "s17-q09",
    q: "How do you read input in HackerRank's Python environment?",
    hint: "sys.stdin, not function arguments.",
    answer:
      "Read the whole input with sys.stdin.read() (or call input() the right number of times), split into lines, then parse each line. Strip whitespace before splitting on it. Output with print().",
    code: "import sys\n\ndata = sys.stdin.read().split('\\n')\n# parse lines here",
    language: "python",
    category: "Platform",
  },
  {
    id: "s17-q10",
    q: "What does 'the naive solution will time out' usually signal in a HackerRank constraint block?",
    hint: "Read the upper bound on n.",
    answer:
      "The constraints tell you the required complexity. n up to 10^3 tolerates O(n^2); 10^5 to 10^6 demands O(n log n) or better; 10^7 and above demands O(n) or O(log n). Read the bound before writing code — it is effectively a hint about which pattern to use.",
    category: "Meta",
  },
  {
    id: "s17-q11",
    q: "What is amortised complexity, and where does it appear in these problems?",
    hint: "Total work across all iterations, not per iteration.",
    answer:
      "Amortised analysis bounds the total cost across a sequence of operations rather than the worst single one. The minimum-swaps problem has a nested while loop that still totals O(n) because each swap permanently places an element; the sliding window is O(n) for the same reason.",
    category: "Big O",
  },
  {
    id: "s17-q12",
    q: "Which edge cases should you check before submitting any HackerRank solution?",
    hint: "Empty, single, negative, duplicate, maximum.",
    answer:
      "Empty or single-element input, all-negative values (never seed a maximum at 0), duplicates, and the smallest and largest values the constraints permit. Python's integers are arbitrary precision, so overflow isn't a concern the way it is in fixed-width languages — but floating-point results (divisions, averages) can still lose precision, so check whether the expected output wants an int or a float. Hidden test cases target exactly these edges.",
    category: "Meta",
  },
];

// ─── Notes ─────────────────────────────────────────────────────────────────

const hackerrank_notes: NoteSection[] = [
  {
    title: "Reading the Constraints Is Half the Solution",
    content:
      "HackerRank always publishes the bounds on n. Those bounds are a complexity specification in disguise. Map the bound to the required complexity before writing a single line: n <= 1000 allows O(n^2); n up to 10^5 needs O(n log n); n up to 10^7 needs O(n) or O(log n). If your instinct is a nested loop but n is 10^5, stop and look for a dict, a sort, or a prefix/difference array.",
    tip: "Two-thirds of 'timed out' verdicts are a correct algorithm at the wrong complexity class — not a bug.",
  },
  {
    title: "The Frequency Dict Pattern",
    content:
      "A surprising share of the Interview Preparation Kit reduces to counting. Build a dict from value to occurrence count in one pass, then read the answer off the counts. This covers pair matching, anagram checks, ransom-note feasibility, and the 'valid frequency string' family. The follow-up move is a second dict — a count of counts — which is what makes the validity check tractable.",
    code: "freq = {}\nfor v in items:\n    freq[v] = freq.get(v, 0) + 1\n\ncount_of_counts = {}\nfor c in freq.values():\n    count_of_counts[c] = count_of_counts.get(c, 0) + 1",
    language: "python",
    tip: "collections.Counter(items) builds the frequency dict in one call, and Counter.most_common(k) gives you the top-k directly.",
  },
  {
    title: "Prefix Sums vs Difference Arrays",
    content:
      "These are duals of one another and people mix them up under time pressure. A prefix sum answers many range *queries* on a static array in O(1) each. A difference array applies many range *updates* in O(1) each, then a single prefix pass reveals the final values. If the problem says 'apply q operations, then report one value', you want the difference array.",
    code: "# Query-heavy: prefix sum\nprefix = [0]\nfor v in arr:\n    prefix.append(prefix[-1] + v)\n\n# Update-heavy: difference array\ndiff = [0] * (n + 2)\nfor a, b, k in ops:\n    diff[a] += k\n    diff[b + 1] -= k",
    language: "python",
  },
  {
    title: "Sliding Window and Two Pointers",
    content:
      "Both replace a nested loop with a linear sweep. Use a sliding window for contiguous ranges under a constraint — expand right, contract left when the constraint breaks, record the best. Use two pointers on sorted data for pair-sum, pair-difference and partition problems, moving the pointer that brings you closer to the target. The tell for 'sort first' is a problem about relationships between values rather than positions.",
    tip: "If the problem cares about order of elements, you usually cannot sort. If it cares only about values, sorting is almost always allowed.",
  },
  {
    title: "Greedy vs Dynamic Programming",
    content:
      "Greedy works when the locally best choice is provably part of a globally optimal solution. Sorting is usually the setup step: sort descending and pair large values with small multipliers, or sort ascending and compare neighbours. DP is needed when a choice now forecloses a better option later — the non-adjacent subsequence sum is the canonical example, since taking a large element blocks its neighbours. Start from the recurrence, then decide between memoization and a rolling-variable table.",
    tip: "If you can state 'the best answer ending at index i depends on the best answer at i-1 and i-2', you are in DP territory, and the space can almost always be reduced to O(1).",
  },
  {
    title: "The Python stdin Harness",
    content:
      "HackerRank's Python runner does not call your function with arguments — it pipes the test case into standard input and expects output on stdout. Solutions that work perfectly with hardcoded values in a local editor score zero if this harness is missing or mis-parses. Read all of stdin at once with sys.stdin.read(), split on newlines, and parse each field explicitly — everything arrives as a string, so ints and floats need to be converted.",
    code: "import sys\n\ndata = sys.stdin.read().split('\\n')\nn = int(data[0])\narr = list(map(int, data[1].split()))\nprint(solve(n, arr))",
    language: "python",
    tip: "Write the harness first, print the parsed input back once to confirm it is correct, then replace that print with your solution.",
  },
  {
    title: "Pre-Submission Checklist",
    content:
      "Before hitting submit, run through: empty and single-element input; all-negative values (seed maxima at float('-inf'), never 0); duplicate values; and the largest n the constraints permit. Python's ints don't overflow, but confirm the output format exactly — several problems want the literal strings 'YES'/'NO' or 'Yes'/'No', and the casing is graded, as is whether a numeric answer should print as an int or a float.",
    tip: "Hidden test cases are built specifically from these edge cases. Checking them costs thirty seconds and is the difference between a partial and a full score.",
  },
];

// ─── Section Export ────────────────────────────────────────────────────────

export const s17_hackerrank: InterviewSection = {
  id: 17,
  slug: "hackerrank-problem-solving",
  title: "HackerRank Problem Solving",
  subtitle: "Interview Prep Kit patterns for the Leapfrog written test",
  color: "#2ec866", // HackerRank green
  questions: hackerrank_questions,
  mcqs: hackerrank_mcqs,
  notes: hackerrank_notes,
  codingQuestions: hackerrank_coding,
};

export {
  hackerrank_coding,
  hackerrank_mcqs,
  hackerrank_questions,
  hackerrank_notes,
};