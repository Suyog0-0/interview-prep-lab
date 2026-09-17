import type { InterviewSection } from "../../types";

export const s02_ds: InterviewSection = {
  id: 2,
  slug: "data-structures",
  title: "Data Structures & Arrays",
  subtitle: "Lists, Linked Lists, Stacks, Queues, Dicts",
  color: "#a78bfa",
  questions: [
    {
      id: "s02-q01",
      q: "What is a list in Python?",
      hint: "Ordered, mutable collection with index access.",
      answer: "A list is an ordered, mutable collection of elements accessible by index (starting at 0). Python lists can hold mixed types in the same list.",
    },
    {
      id: "s02-q02",
      q: "How do you find the length of a list?",
      hint: "The built-in len() function.",
      answer: "len(my_list) returns the number of elements. It's a built-in function, not a method on the list — unlike JS's array.length property.",
    },
    {
      id: "s02-q03",
      q: "What is the difference between append() and pop()?",
      hint: "Add vs remove from the end.",
      answer: "append(x) adds a single element to the END of a list.\npop() removes and returns the LAST element by default — pop(0) removes the first, but that's O(n) since everything shifts.",
    },
    {
      id: "s02-q04",
      q: "What is the difference between pop(0) and insert(0, x)?",
      hint: "Same idea as push/pop but for the beginning — both are O(n) on a list.",
      answer: "pop(0) removes the FIRST element. insert(0, x) adds to the BEGINNING.\nBoth are O(n) because every remaining element has to shift — for frequent operations at both ends, use collections.deque instead of a list.",
    },
    {
      id: "s02-q05",
      q: "How do you remove or insert elements at a specific position in a list?",
      hint: "Slice assignment, or del + insert.",
      answer: "del my_list[start:end] removes a slice in place. Slice assignment (my_list[start:end] = [...]) can remove, insert, or replace a range in one step — it's the closest Python equivalent to JS's splice().",
      code: "del arr[2:3]  # removes 1 element at index 2",
      language: "python",
    },
    {
      id: "s02-q06",
      q: "What is the difference between slicing and slice assignment?",
      hint: "One returns a new list, one mutates in place.",
      answer: "my_list[start:end] (plain slicing) returns a NEW list without modifying the original.\nmy_list[start:end] = [...] (slice assignment) modifies the original list in place.",
    },
    {
      id: "s02-q07",
      q: "How does a list comprehension (or map()) work?",
      hint: "Transform each element, produce a new list.",
      answer: "A list comprehension builds a NEW list by applying an expression to each element. The original list isn't modified. map() does the same thing but returns a lazy iterator — wrap it in list() to get an actual list.",
      code: `[x * 2 for x in [1, 2, 3]]        # [2, 4, 6]
list(map(lambda x: x * 2, [1, 2, 3]))  # [2, 4, 6] — equivalent, less idiomatic`,
      language: "python",
    },
    {
      id: "s02-q08",
      q: "How does a filtering comprehension (or filter()) work?",
      hint: "Keep only elements that pass a test.",
      answer: "A comprehension with an `if` clause returns a NEW list with only the elements where the condition is true. filter() does the same lazily.",
      code: `[x for x in [1, 2, 3, 4] if x > 2]        # [3, 4]
list(filter(lambda x: x > 2, [1, 2, 3, 4]))  # [3, 4] — equivalent, less idiomatic`,
      language: "python",
    },
    {
      id: "s02-q09",
      q: "How does functools.reduce() work?",
      hint: "Accumulate all elements into a single value.",
      answer: "reduce(function, iterable, initializer) processes each element and carries a running result, applying the function cumulatively. Unlike map/filter, reduce isn't a builtin — you must `from functools import reduce`. For simple accumulation like sum, prefer the builtin sum().",
      code: `from functools import reduce
reduce(lambda total, x: total + x, [1, 2, 3], 0)  # 6
sum([1, 2, 3])  # 6 — preferred for plain sums`,
      language: "python",
    },
    {
      id: "s02-q10",
      q: "How do you find the first element matching a condition, vs all matching elements?",
      hint: "Python has no built-in find() — use next() with a generator, or a comprehension.",
      answer: "Python doesn't have a dedicated find() like JS. For the FIRST match, use `next((x for x in items if condition), default)`.\nFor ALL matches, use a list comprehension `[x for x in items if condition]`.",
      code: `nums = [1, 5, 8, 12]
first_even = next((x for x in nums if x % 2 == 0), None)  # 8
all_even = [x for x in nums if x % 2 == 0]                # [8, 12]`,
      language: "python",
    },
    {
      id: "s02-q11",
      q: "How do you check if an element exists in a list?",
      hint: "The 'in' operator.",
      answer: "`value in my_list` returns True/False — this is the idiomatic way, and it works for any iterable (lists, sets, dicts, strings).\nmy_list.index(value) returns the index, but raises ValueError if not found (check `value in my_list` first, or wrap in try/except).",
    },
    {
      id: "s02-q12",
      q: "How do you remove duplicates from a list?",
      hint: "A set stores only unique values.",
      answer: "Convert to a set and back — set only stores unique, hashable values. Note this doesn't preserve order (use dict.fromkeys(list) instead if order matters, since dicts preserve insertion order in Python 3.7+).",
      code: `unique = list(set(my_list))               # order not guaranteed
unique_ordered = list(dict.fromkeys(my_list))  # preserves original order`,
      language: "python",
    },
    {
      id: "s02-q13",
      q: "How do you flatten a nested list?",
      hint: "No built-in flat() — use a comprehension or itertools.",
      answer: "Python has no built-in equivalent to JS's array.flat(). For one level, use a nested comprehension. For arbitrary depth, write a small recursive function.",
      code: `nested = [1, [2, [3]]]

# one level
flat_one = [x for sub in [[1, 2], [3]] for x in sub]  # [1, 2, 3]

# arbitrary depth (recursive)
def flatten(lst):
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

flatten(nested)  # [1, 2, 3]`,
      language: "python",
    },
    {
      id: "s02-q14",
      q: "What is a linked list? How does it differ from a list/array?",
      hint: "Nodes connected by pointers vs contiguous memory.",
      answer: "A linked list stores elements in nodes, each pointing to the next.\nPython lists are backed by a contiguous, dynamically-resized array under the hood — O(1) access by index.\nLinked lists have O(n) access but O(1) insertion/deletion at the head (Python has no built-in linked list type; you implement one with a Node class, or use collections.deque for a similar access pattern).",
    },
    {
      id: "s02-q15",
      q: "What is a stack? Give a real-world example.",
      hint: "LIFO — Last In, First Out.",
      answer: "A stack follows LIFO order. The last item pushed is the first popped.\nIn Python, a plain list works fine as a stack via append()/pop() (both O(1) at the end).\nReal-world examples: browser back button, undo history, the call stack itself.",
    },
    {
      id: "s02-q16",
      q: "What is a queue? Give a real-world example.",
      hint: "FIFO — First In, First Out.",
      answer: "A queue follows FIFO order. First item added is first to be removed.\nDon't use a plain list for this in Python — pop(0)/insert(0, x) are O(n). Use collections.deque, which gives O(1) appendleft()/popleft().\nReal-world examples: print queue, request queue, ticket line.",
      code: `from collections import deque
q = deque()
q.append("first")
q.append("second")
q.popleft()  # "first" — O(1), unlike list.pop(0)`,
      language: "python",
    },
    {
      id: "s02-q17",
      q: "What is a dictionary in Python?",
      hint: "Key-value pairs with O(1) average lookup.",
      answer: "A dict stores key-value pairs, implemented as a hash table. Lookup, insert, and delete are O(1) on average. Since Python 3.7, dicts preserve insertion order — this is a language guarantee, not an implementation detail.",
    },
    {
      id: "s02-q18",
      q: "How would you reverse a list without using reverse() or [::-1]?",
      hint: "Two-pointer swap from both ends.",
      answer: "Use two pointers starting at opposite ends and swap elements inward until they meet. Python's tuple-unpacking makes the swap a single line, with no temp variable needed.",
      code: `def reverse_list(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr`,
      language: "python",
    },
    {
      id: "s02-q19",
      q: "How do you sort a list with a custom comparison, e.g. by a specific key?",
      hint: "sorted()/sort() take a key= function, not a raw comparator.",
      answer: "Unlike JS, Python's sorted()/list.sort() correctly sort numbers by default — no string-coercion trap to worry about. For custom order, pass a `key` function (applied to each element before comparing) rather than a two-argument comparator. sorted() returns a new list; .sort() mutates in place and returns None.",
      code: `nums = [10, 2, 9]
sorted(nums)                        # [2, 9, 10] — correct numeric sort by default
sorted(nums, reverse=True)          # [10, 9, 2]

words = ["banana", "kiwi", "fig"]
sorted(words, key=len)              # ["fig", "kiwi", "banana"] — sort by length`,
      language: "python",
    },
    {
      id: "s02-q20",
      q: "What is a two-pointer technique?",
      hint: "Use two indices moving toward each other.",
      answer: "Two pointers start at opposite ends of a list and move inward. Commonly used for: find pair that sums to target, reverse a list, check if a string is a palindrome. Reduces O(n²) to O(n).",
    },
  ],
};