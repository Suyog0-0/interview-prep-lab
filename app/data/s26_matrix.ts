import type { InterviewSection, CodingQuestion, MCQQuestion, NoteSection } from "../../types";

/** Section 26 — Matrix. Priority: MEDIUM (DSA) */

const notes: NoteSection[] = [
  {
    title: "Matrix Traversal Basics",
    content:
      "A 2D matrix is usually stored as a list of lists: `grid[row][col]`. Most matrix problems reduce to careful index bookkeeping — traversing in a spiral, transposing (swapping grid[i][j] with grid[j][i]), or walking boundary layers inward. Draw a small 3x3 or 4x4 example on paper before coding; matrix bugs are almost always off-by-one errors in the boundary indices, not algorithmic mistakes. One Python-specific trap: `[[0] * n] * n` does NOT create n independent rows — all rows are the same underlying list, so mutating one mutates all of them. Use a list comprehension (`[[0] * n for _ in range(n)]`) instead.",
  },
];

const coding: CodingQuestion[] = [
  {
    id: "s26-c01",
    title: "Rotate Image",
    difficulty: "Medium",
    description: "Given an n x n matrix, rotate it 90 degrees clockwise, in place.",
    examples: [{ input: "[[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" }],
    constraints: ["1 <= n <= 20", "Must be done in place — no second matrix"],
    hint: "Transpose the matrix (swap grid[i][j] with grid[j][i] for i < j), then reverse each row.",
    solution:
      "def rotate(matrix):\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i + 1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    for row in matrix:\n        row.reverse()\n    return matrix",
  },
  {
    id: "s26-c02",
    title: "Spiral Matrix",
    difficulty: "Medium",
    description: "Given an m x n matrix, return all its elements in spiral order (clockwise from the outside in).",
    examples: [{ input: "[[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" }],
    constraints: ["1 <= rows, cols <= 10"],
    hint: "Track four boundaries (top, bottom, left, right). Walk each of the four directions, shrinking the corresponding boundary after each pass, until they cross.",
    solution:
      "def spiral_order(matrix):\n    result = []\n    top, bottom = 0, len(matrix) - 1\n    left, right = 0, len(matrix[0]) - 1\n\n    while top <= bottom and left <= right:\n        for col in range(left, right + 1):\n            result.append(matrix[top][col])\n        top += 1\n        for row in range(top, bottom + 1):\n            result.append(matrix[row][right])\n        right -= 1\n        if top <= bottom:\n            for col in range(right, left - 1, -1):\n                result.append(matrix[bottom][col])\n            bottom -= 1\n        if left <= right:\n            for row in range(bottom, top - 1, -1):\n                result.append(matrix[row][left])\n            left += 1\n    return result",
  },
  {
    id: "s26-c03",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    description: "Given an m x n matrix, if an element is 0, set its entire row and column to 0, in place.",
    examples: [{ input: "[[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" }],
    constraints: ["1 <= rows, cols <= 200", "O(1) extra space is achievable using the first row/column as markers"],
    hint: "Use the first row and first column of the matrix itself as marker flags for which rows/columns need zeroing — track separately whether the first row/column themselves need zeroing.",
    solution:
      "def set_zeroes(matrix):\n    rows = len(matrix)\n    cols = len(matrix[0])\n    first_row_has_zero = any(matrix[0][c] == 0 for c in range(cols))\n    first_col_has_zero = any(matrix[r][0] == 0 for r in range(rows))\n\n    for r in range(1, rows):\n        for c in range(1, cols):\n            if matrix[r][c] == 0:\n                matrix[r][0] = 0\n                matrix[0][c] = 0\n\n    for r in range(1, rows):\n        for c in range(1, cols):\n            if matrix[r][0] == 0 or matrix[0][c] == 0:\n                matrix[r][c] = 0\n\n    if first_row_has_zero:\n        for c in range(cols):\n            matrix[0][c] = 0\n    if first_col_has_zero:\n        for r in range(rows):\n            matrix[r][0] = 0\n\n    return matrix",
  },
];

const mcqs: MCQQuestion[] = [
  {
    id: "s26-m01",
    question: "Rotate Image uses 'transpose then reverse each row' to rotate 90° clockwise. What does the transpose step do geometrically?",
    options: [
      "Flips the matrix upside down",
      "Reflects the matrix across its main diagonal (swaps rows and columns)",
      "Sorts each row",
      "Reverses the whole matrix"
    ],
    correctAnswerIndex: 1,
    explanation:
      "Transposing swaps matrix[i][j] with matrix[j][i], reflecting across the diagonal from top-left to bottom-right. Following that with a row reversal produces exactly a 90° clockwise rotation.",
  },
  {
    id: "s26-m02",
    question: "In Set Matrix Zeroes, why record first_row_has_zero and first_col_has_zero SEPARATELY before overwriting the first row/column as markers?",
    options: [
      "They aren't needed — this is unnecessary code",
      "The first row and column are being reused as marker storage for the rest of the matrix, so their OWN original zero-state must be saved before that reuse overwrites it",
      "To detect an empty matrix",
      "To improve time complexity"
    ],
    correctAnswerIndex: 1,
    explanation:
      "Using row 0 and column 0 as flags for the rest of the matrix is what gets this down to O(1) extra space — but it means their own zero-ness needs to be captured first, since the marking process itself may write zeros into them for unrelated reasons.",
  },
];

export const s26_matrix: InterviewSection = {
  id: 26,
  slug: "matrix",
  title: "Matrix",
  subtitle: "2D list traversal: rotate, spiral, and boundary manipulation",
  color: "#64748b",
  priority: "MEDIUM",
  stack: "DSA",
  questions: [],
  mcqs,
  notes,
  codingQuestions: coding,
};