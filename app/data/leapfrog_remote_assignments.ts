import { InterviewSection } from "../../types";

export const leapfrogRemoteAssignmentsSection: InterviewSection = {
  id: 200,
  slug: "leapfrog-remote-assignments",
  title: "Previous Remote Assignments",
  subtitle: "Sample Technical Take-Home Projects",
  color: "#f59e0b", // Amber/Orange
  questions: [], // No flashcards
  notes: [
    {
      title: "Assignment 1: 2D Canvas Web Game (Vanilla JS)",
      content: `### Objective
Build a complete, playable 2D web game using **only HTML5 Canvas and Vanilla JavaScript (ES6+)**. No external game engines or UI frameworks are allowed.

### Game Options
You may choose to build one of the following:
*   **Ant Smasher:** Bugs spawn at the top and move downwards. Clicking them squashes them.
*   **Flappy Bird Clone:** Side-scrolling obstacle avoidance game with gravity mechanics.
*   **Car Racing / Collision Avoidance:** A top-down driving game where you dodge oncoming traffic.

### Requirements
1.  **Object-Oriented Programming (OOP):** Use ES6 classes to structure your code (e.g., \`Game\`, \`Player\`, \`Enemy\`, \`Obstacle\`).
2.  **State Management:** Maintain game state (Score, Lives, Game Over, Playing).
3.  **Collision Detection:** Implement Axis-Aligned Bounding Box (AABB) or circular collision detection.
4.  **Game Loop:** Use \`requestAnimationFrame\` for smooth rendering.
5.  **Assets:** Include sprite images or draw geometric shapes.

### Evaluation Criteria
*   Clean, modular, and DRY code architecture.
*   Proper use of closures, 'this' binding, and scope.
*   Absence of global variables (encapsulate logic).
*   Smooth performance (60 FPS target).
`
    },
    {
      title: "Assignment 2: Pixel-Perfect Dashboard Clone (HTML/CSS)",
      content: `### Objective
Create a fully responsive, pixel-perfect clone of a provided Figma design mockup without using any external CSS frameworks (e.g., no Tailwind, no Bootstrap).

### Requirements
1.  **Vanilla CSS/SCSS:** You must write custom CSS. SCSS/SASS is highly encouraged for maintainability.
2.  **Semantic HTML:** Use proper HTML5 semantic tags (\`<header>\`, \`<nav>\`, \`<main>\`, \`<aside>\`).
3.  **Responsive Design:** The layout must adapt fluidly across Mobile (320px), Tablet (768px), and Desktop (1024px+) viewports using Media Queries and Flexbox/Grid.
4.  **Interactivity:** Add minor JS for interactivity (e.g., toggling a mobile hamburger menu, dropdowns).

### Evaluation Criteria
*   Accuracy to the Figma design (spacing, typography, colours).
*   CSS architecture (BEM methodology or similar naming convention).
*   Avoidance of deep CSS nesting and overly specific selectors.
*   Clean code organization.
`
    },
    {
      title: "Assignment 3: Data-Driven SPA (Vanilla JS or React)",
      content: `### Objective
Build a Single Page Application (SPA) that fetches data from a public API, displays it, and allows the user to filter, sort, and search through the results.

### Requirements
1.  **API Integration:** Fetch data asynchronously using the \`Fetch API\` or \`Axios\`.
2.  **State Management:** Manage the fetched data, loading states, and error states gracefully.
3.  **Features:**
    *   **Search Bar:** Filter items by name/title as the user types (implement debounce).
    *   **Sorting:** Sort items by various properties (e.g., price, date, rating).
    *   **Pagination / Infinite Scroll:** Do not load all items at once.
4.  **UI/UX:** Design a clean, modern interface. (Tailwind or custom CSS allowed based on specific prompt).

### Evaluation Criteria
*   Correct use of Promises and \`async/await\`.
*   Efficient DOM manipulation (if Vanilla JS) or optimal re-rendering (if React).
*   Implementation of Debounce/Throttle for search inputs.
*   Code splitting and component reusability.
`
    }
  ]
};
