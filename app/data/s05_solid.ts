import type { InterviewSection } from "../../types";

export const s05_solid: InterviewSection = {
  id: 5,
  slug: "solid-principles",
  title: "SOLID Principles",
  subtitle: "Five design principles for clean, maintainable OOP code",
  color: "#60a5fa",
  questions: [
    {
      id: "s05-q01",
      q: "What does SOLID stand for?",
      hint: "Five design principles for clean OOP code.",
      answer: "S - Single Responsibility Principle\nO - Open/Closed Principle\nL - Liskov Substitution Principle\nI - Interface Segregation Principle\nD - Dependency Inversion Principle",
    },
    {
      id: "s05-q02",
      q: "What is the Single Responsibility Principle?",
      hint: "One class, one reason to change.",
      answer: "A class should have only ONE reason to change — meaning it should do one thing only.\nExample: a UserService should handle user logic, not also send emails (that's EmailService's job).",
    },
    {
      id: "s05-q03",
      q: "What is the Open/Closed Principle?",
      hint: "Open for extension, closed for modification.",
      answer: "Software entities should be open to extension but closed to modification.\nAdd new behaviour by adding new code, not by changing existing code. Example: use polymorphism or strategy pattern instead of if/else chains.",
    },
    {
      id: "s05-q04",
      q: "What is the Liskov Substitution Principle?",
      hint: "Subclasses should be substitutable for their parent.",
      answer: "A subclass should be replaceable for its parent class without breaking the program.\nIf Square extends Rectangle but overriding setWidth breaks the area calculation — that violates LSP.",
    },
    {
      id: "s05-q05",
      q: "What is the Interface Segregation Principle?",
      hint: "Don't force classes to implement what they don't use.",
      answer: "Clients should not be forced to depend on interfaces they don't use.\nSplit fat interfaces into smaller, more specific ones. Example: instead of one big Animal interface, have Swimmable, Flyable, etc.",
    },
    {
      id: "s05-q06",
      q: "What is the Dependency Inversion Principle?",
      hint: "Depend on abstractions, not concrete implementations.",
      answer: "High-level modules should not depend on low-level modules — both should depend on abstractions (interfaces). This enables easy swapping of implementations and makes code testable. Core of dependency injection.",
    },
    {
      id: "s05-q07",
      q: "Why are SOLID principles important?",
      hint: "Think about maintainability and testability.",
      answer: "SOLID principles make code easier to maintain, extend, and test. They reduce coupling, increase cohesion, and prevent code from becoming a brittle, hard-to-change mess as it grows.",
    },
    {
      id: "s05-q08",
      q: "Can you give a real code example that violates Single Responsibility?",
      hint: "One class doing too many things.",
      answer: "A User class that handles user data AND sends emails AND logs to a file violates SRP. Each concern should be in its own class: User, EmailService, Logger.",
    },
  ],
};
