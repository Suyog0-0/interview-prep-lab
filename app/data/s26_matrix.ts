import type { InterviewSection, CodingQuestion, MCQQuestion, NoteSection } from "../../types";

/** Section 26 — Matrix. Priority: MEDIUM (DSA) */

const notes: NoteSection[] = [
  {
    title: "Matrix Traversal Basics",
    content:
      "A 2D matrix is usually stored as an array of arrays: `grid[row][col]`. Most matrix problems reduce to careful index bookkeeping — traversing in a spiral, transposing (swapping grid[i][j] with grid[j][i]), or walking boundary layers inward. Draw a small 3x3 or 4x4 example on paper before coding; matrix bugs are almost always off-by-one errors in the boundary indices, not algorithmic mistakes.",
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
      "function rotate(matrix) {\n  const n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];\n    }\n  }\n  for (const row of matrix) row.reverse();\n  return matrix;\n}",
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
      "function spiralOrder(matrix) {\n  const result = [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n\n  while (top <= bottom && left <= right) {\n    for (let col = left; col <= right; col++) result.push(matrix[top][col]);\n    top++;\n    for (let row = top; row <= bottom; row++) result.push(matrix[row][right]);\n    right--;\n    if (top <= bottom) {\n      for (let col = right; col >= left; col--) result.push(matrix[bottom][col]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let row = bottom; row >= top; row--) result.push(matrix[row][left]);\n      left++;\n    }\n  }\n  return result;\n}",
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
      "function setZeroes(matrix) {\n  const rows = matrix.length;\n  const cols = matrix[0].length;\n  let firstRowHasZero = false;\n  let firstColHasZero = false;\n\n  for (let c = 0; c < cols; c++) if (matrix[0][c] === 0) firstRowHasZero = true;\n  for (let r = 0; r < rows; r++) if (matrix[r][0] === 0) firstColHasZero = true;\n\n  for (let r = 1; r < rows; r++) {\n    for (let c = 1; c < cols; c++) {\n      if (matrix[r][c] === 0) {\n        matrix[r][0] = 0;\n        matrix[0][c] = 0;\n      }\n    }\n  }\n\n  for (let r = 1; r < rows; r++) {\n    for (let c = 1; c < cols; c++) {\n      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;\n    }\n  }\n\n  if (firstRowHasZero) for (let c = 0; c < cols; c++) matrix[0][c] = 0;\n  if (firstColHasZero) for (let r = 0; r < rows; r++) matrix[r][0] = 0;\n\n  return matrix;\n}",
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
    question: "In Set Matrix Zeroes, why record firstRowHasZero and firstColHasZero SEPARATELY before overwriting the first row/column as markers?",
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
  subtitle: "2D array traversal: rotate, spiral, and boundary manipulation",
  color: "#64748b",
  priority: "MEDIUM",
  stack: "DSA",
  questions: [],
  mcqs,
  notes,
  codingQuestions: coding,
};