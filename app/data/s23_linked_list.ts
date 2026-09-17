import type { InterviewSection, CodingQuestion, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/** Section 23 — Linked List. Priority: VERY IMPORTANT (DSA) */

const notes: NoteSection[] = [
  {
    title: "Nodes, head, and next — the minimal shape",
    content:
      "A singly linked list is a chain of nodes, each holding a value and a `next` pointer to the following node (or None at the end). There is no random access by index — you must walk from `head`. This trade-off is the whole point: insertion/deletion at a known node is O(1) (no shifting, unlike a list), but reaching that node in the first place is O(n). Python has no built-in linked-list type, so you define the node yourself.",
    code: "class ListNode:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\n# build 1 -> 2 -> 3\nhead = ListNode(1, ListNode(2, ListNode(3)))",
    language: "python",
  },
  {
    title: "Slow/Fast Pointers (Floyd's Algorithm)",
    content:
      "Move one pointer one step at a time and another two steps at a time. If the list has a cycle, the fast pointer will eventually lap the slow one and they meet — proof: in a cycle, the gap between them shrinks by 1 every step, so it must hit 0. The same technique finds the middle of a list in one pass: when fast reaches the end, slow is at the midpoint.",
    tip: "Slow/fast pointers solve three totally different-looking problems with the same code shape: cycle detection, finding the middle, and finding the nth-from-end node.",
  },
];

const questions: InterviewQuestion[] = [
  {
    id: "s23-q01",
    q: "Why is inserting into a linked list O(1) but a list insert (at the front) is O(n)?",
    hint: "Pointers vs shifting.",
    answer:
      "Inserting into a linked list at a known node just rewires a couple of `next` pointers — O(1) regardless of list length. Inserting at the front of a Python list (`my_list.insert(0, x)`) requires shifting every existing element over by one slot — O(n). The trade-off is that reaching a specific position in a linked list requires walking from the head, which is itself O(n).",
    category: "Linked List",
  },
  {
    id: "s23-q02",
    q: "How do slow/fast pointers detect a cycle in a linked list?",
    hint: "Floyd's Tortoise and Hare.",
    answer:
      "Move a slow pointer one node at a time and a fast pointer two nodes at a time. If there is no cycle, fast reaches None and the search ends. If there IS a cycle, fast will eventually catch up to and meet slow inside the loop, because the distance between them shrinks by one every step once both are inside the cycle.",
    category: "Linked List",
  },
];

const coding: CodingQuestion[] = [
  {
    id: "s23-c01",
    title: "Reverse Linked List",
    difficulty: "Easy",
    description: "Reverse a singly linked list and return the new head.",
    examples: [{ input: "1 -> 2 -> 3 -> None", output: "3 -> 2 -> 1 -> None" }],
    constraints: ["0 <= number of nodes <= 5000"],
    hint: "Walk the list once, rewiring each node's `next` to point backward, using a `prev` pointer that starts at None.",
    solution:
      "def reverse_list(head):\n    prev = None\n    curr = head\n    while curr:\n        next_node = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_node\n    return prev",
  },
  {
    id: "s23-c02",
    title: "Middle of the Linked List",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second.",
    examples: [{ input: "1 -> 2 -> 3 -> 4 -> 5", output: "3" }, { input: "1 -> 2 -> 3 -> 4 -> 5 -> 6", output: "4" }],
    constraints: ["1 <= nodes <= 100", "Single pass, O(1) extra space"],
    hint: "Slow/fast pointers: when fast reaches the end (or None), slow sits exactly at the middle.",
    solution:
      "def middle_node(head):\n    slow = head\n    fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow",
  },
  {
    id: "s23-c03",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    description: "Merge two sorted linked lists into one sorted list by splicing their nodes together.",
    examples: [{ input: "l1 = 1->2->4, l2 = 1->3->4", output: "1->1->2->3->4->4" }],
    constraints: ["0 <= nodes in each list <= 50"],
    hint: "Use a dummy head node to simplify edge cases, then walk both lists picking the smaller current node each time.",
    solution:
      "def merge_two_lists(l1, l2):\n    dummy = ListNode(0)\n    tail = dummy\n    while l1 and l2:\n        if l1.val <= l2.val:\n            tail.next = l1\n            l1 = l1.next\n        else:\n            tail.next = l2\n            l2 = l2.next\n        tail = tail.next\n    tail.next = l1 if l1 else l2\n    return dummy.next",
  },
  {
    id: "s23-c04",
    title: "Linked List Cycle",
    difficulty: "Easy",
    description: "Given the head of a linked list, determine whether it contains a cycle.",
    examples: [{ input: "3 -> 2 -> 0 -> -4, with -4 pointing back to 2", output: "true" }],
    constraints: ["O(1) extra space required — no set of visited nodes"],
    hint: "Floyd's slow/fast pointers: if they ever meet, there's a cycle. If fast reaches None, there isn't.",
    solution:
      "def has_cycle(head):\n    slow = head\n    fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow is fast:\n            return True\n    return False",
  },
  {
    id: "s23-c05",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    description: "Given the head of a linked list, remove the nth node from the end and return the head.",
    examples: [{ input: "1->2->3->4->5, n = 2", output: "1->2->3->5" }],
    constraints: ["Do it in one pass"],
    hint: "Advance a lead pointer n steps first, then move both lead and a trailing pointer together — when lead hits the end, trailing is right before the node to remove.",
    solution:
      "def remove_nth_from_end(head, n):\n    dummy = ListNode(0, head)\n    lead = dummy\n    trail = dummy\n    for _ in range(n):\n        lead = lead.next\n    while lead.next:\n        lead = lead.next\n        trail = trail.next\n    trail.next = trail.next.next\n    return dummy.next",
  },
  {
    id: "s23-c06",
    title: "Palindrome Linked List",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, determine if it reads the same forwards and backwards.",
    examples: [{ input: "1 -> 2 -> 2 -> 1", output: "true" }],
    constraints: ["Aim for O(n) time, O(1) space (in-place reversal of the second half)"],
    hint: "Find the middle with slow/fast pointers, reverse the second half in place, then compare the two halves node by node.",
    solution:
      "def is_palindrome(head):\n    if not head or not head.next:\n        return True\n\n    slow = head\n    fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n\n    prev = None\n    curr = slow\n    while curr:\n        next_node = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_node\n\n    left = head\n    right = prev\n    while right:\n        if left.val != right.val:\n            return False\n        left = left.next\n        right = right.next\n    return True",
  },
];

const mcqs: MCQQuestion[] = [
  {
    id: "s23-m01",
    question: "Why does the Linked List Cycle detector use O(1) space instead of a set of visited nodes?",
    options: [
      "Sets don't work with custom objects",
      "Floyd's slow/fast pointer technique needs no extra storage — only two pointer variables, regardless of list length",
      "It's impossible to detect cycles with O(1) space",
      "The set-based approach is actually faster"
    ],
    correctAnswerIndex: 1,
    explanation:
      "A set-based approach also works (add each node, check membership) but costs O(n) space. Slow/fast pointers achieve the same detection with only two variables, trading a slightly less obvious proof for constant space.",
  },
  {
    id: "s23-m02",
    question: "In Remove Nth From End, why advance the 'lead' pointer n steps before starting to move 'trail'?",
    options: [
      "To create an n-node gap, so when lead reaches the end, trail is exactly at the node before the one to remove",
      "It has no purpose",
      "To count the total list length",
      "To detect a cycle"
    ],
    correctAnswerIndex: 0,
    explanation:
      "The fixed n-node gap between lead and trail means that when lead runs out of list, trail has covered exactly (length - n - 1) steps — putting it right before the target node, in a single pass without knowing the list's length up front.",
  },
  {
    id: "s23-m03",
    question: "Why is a dummy head node used in Merge Two Sorted Lists and Remove Nth From End?",
    options: [
      "It's required by the linked list data structure",
      "It removes special-casing for when the answer's real head changes (e.g. the smallest element isn't from l1, or the node to remove is the original head)",
      "It makes the list circular",
      "It reduces time complexity"
    ],
    correctAnswerIndex: 1,
    explanation:
      "Without a dummy node, you'd need an if-statement to handle the case where the new head differs from the original head. A dummy node sitting before the real head sidesteps that: you always return dummy.next, whatever the actual head turned out to be.",
  },
];

export const s23_linked_list: InterviewSection = {
  id: 23,
  slug: "linked-list-dsa",
  title: "Linked List",
  subtitle: "Nodes, traversal, and slow/fast pointer techniques",
  color: "#ec4899",
  priority: "VERY_IMPORTANT",
  stack: "DSA",
  questions,
  mcqs,
  notes,
  codingQuestions: coding,
};