import type { InterviewSection } from "../../types";

export const s02_ds: InterviewSection = {
  id: 2,
  slug: "data-structures",
  title: "Data Structures & Arrays",
  subtitle: "Arrays, Linked Lists, Stacks, Queues, Hash Maps",
  color: "#a78bfa",
  questions: [
    {
      id: "s02-q01",
      q: "What is an array?",
      hint: "Ordered collection with index access.",
      answer: "An array is an ordered collection of elements accessible by index (starting at 0). Arrays can hold mixed types in JavaScript.",
    },
    {
      id: "s02-q02",
      q: "How do you find the length of an array?",
      hint: ".length property.",
      answer: "array.length returns the number of elements. It's a property, not a method.",
    },
    {
      id: "s02-q03",
      q: "What is the difference between push() and pop()?",
      hint: "Add vs remove from the end.",
      answer: "push() adds one or more elements to the END of an array.\npop() removes and returns the LAST element.",
    },
    {
      id: "s02-q04",
      q: "What is the difference between shift() and unshift()?",
      hint: "Same as push/pop but for the beginning.",
      answer: "shift() removes the FIRST element. unshift() adds to the BEGINNING.\nBoth are slower than push/pop because all elements must re-index.",
    },
    {
      id: "s02-q05",
      q: "What does splice() do?",
      hint: "Remove/insert at a specific position.",
      answer: "splice(start, deleteCount, ...items) modifies an array in place.\nIt can remove elements, insert new ones, or both.",
      code: "arr.splice(2, 1); // removes 1 element at index 2",
      language: "javascript",
    },
    {
      id: "s02-q06",
      q: "What is the difference between slice() and splice()?",
      hint: "One mutates, one doesn't.",
      answer: "slice(start, end) returns a new array without modifying the original.\nsplice() modifies the original array in place.",
    },
    {
      id: "s02-q07",
      q: "How does map() work?",
      hint: "Transform each element, return a new array.",
      answer: "map() creates a NEW array by applying a function to each element. Original array is not modified.",
      code: "[1,2,3].map(x => x * 2); // [2,4,6]",
      language: "javascript",
    },
    {
      id: "s02-q08",
      q: "How does filter() work?",
      hint: "Keep only elements that pass a test.",
      answer: "filter() returns a NEW array with only elements where the callback returns true.",
      code: "[1,2,3,4].filter(x => x > 2); // [3,4]",
      language: "javascript",
    },
    {
      id: "s02-q09",
      q: "How does reduce() work?",
      hint: "Accumulate all elements into a single value.",
      answer: "reduce((accumulator, current) => ..., initialValue) processes each element and carries a running result.",
      code: "[1,2,3].reduce((sum, x) => sum + x, 0); // 6",
      language: "javascript",
    },
    {
      id: "s02-q10",
      q: "What is the difference between find() and filter()?",
      hint: "One returns the first match, one returns all matches.",
      answer: "find() returns the FIRST element that satisfies the condition (or undefined).\nfilter() returns ALL matching elements as a new array.",
    },
    {
      id: "s02-q11",
      q: "How do you check if an element exists in an array?",
      hint: "includes() or indexOf().",
      answer: "arr.includes(value) returns true/false.\narr.indexOf(value) returns the index or -1 if not found.\nFor objects, use find() or some().",
    },
    {
      id: "s02-q12",
      q: "How do you remove duplicates from an array?",
      hint: "Set removes duplicates automatically.",
      answer: "Use the Set constructor — Set only stores unique values. Spread converts it back to an array.",
      code: "const unique = [...new Set(array)];",
      language: "javascript",
    },
    {
      id: "s02-q13",
      q: "How do you flatten a nested array?",
      hint: "flat() method.",
      answer: "array.flat() flattens one level. array.flat(Infinity) flattens all levels.",
      code: "[1,[2,[3]]].flat(Infinity); // [1,2,3]",
      language: "javascript",
    },
    {
      id: "s02-q14",
      q: "What is a linked list? How does it differ from an array?",
      hint: "Nodes connected by pointers vs contiguous memory.",
      answer: "A linked list stores elements in nodes, each pointing to the next.\nArrays have indexed, contiguous memory — O(1) access by index.\nLinked lists have O(n) access but O(1) insertion/deletion at head.",
    },
    {
      id: "s02-q15",
      q: "What is a stack? Give a real-world example.",
      hint: "LIFO — Last In, First Out.",
      answer: "A stack follows LIFO order. The last item pushed is the first popped.\nReal-world examples: browser back button, undo history, call stack.",
    },
    {
      id: "s02-q16",
      q: "What is a queue? Give a real-world example.",
      hint: "FIFO — First In, First Out.",
      answer: "A queue follows FIFO order. First item added is first to be removed.\nReal-world examples: print queue, request queue, ticket line.",
    },
    {
      id: "s02-q17",
      q: "What is a hash map / object in JavaScript?",
      hint: "Key-value pairs with O(1) lookup.",
      answer: "A hash map stores key-value pairs. In JavaScript, plain objects {} and Map() serve this purpose. Lookup, insert, delete are O(1) average.",
    },
    {
      id: "s02-q18",
      q: "How would you reverse an array without using reverse()?",
      hint: "Two-pointer swap from both ends.",
      answer: "Use two pointers starting at opposite ends and swap elements inward until they meet.",
      code: `function reverseArray(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++; right--;
  }
  return arr;
}`,
      language: "javascript",
    },
    {
      id: "s02-q19",
      q: "How do you sort an array of numbers correctly in JavaScript?",
      hint: "Default sort is alphabetical — you must pass a comparator.",
      answer: "Without a comparator, sort converts to strings: [10,9,2].sort() → [10,2,9]. Always pass a comparator function for numbers.",
      code: `arr.sort((a, b) => a - b); // ascending
arr.sort((a, b) => b - a); // descending`,
      language: "javascript",
    },
    {
      id: "s02-q20",
      q: "What is a two-pointer technique?",
      hint: "Use two indices moving toward each other.",
      answer: "Two pointers start at opposite ends of an array and move inward. Commonly used for: find pair that sums to target, reverse an array, check if string is palindrome. Reduces O(n²) to O(n).",
    },
  ],
};
