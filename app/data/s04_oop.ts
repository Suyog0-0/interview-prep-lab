import type { InterviewSection } from "../../types";

export const s04_oop: InterviewSection = {
  id: 4,
  slug: "oop",
  title: "Object-Oriented Programming",
  subtitle: "Classes, Inheritance, Encapsulation, Polymorphism",
  color: "#fb923c",
  questions: [
    {
      id: "s04-q01",
      q: "What are the four pillars of OOP?",
      hint: "APIE.",
      answer: "Abstraction, Polymorphism, Inheritance, Encapsulation.",
    },
    {
      id: "s04-q02",
      q: "What is a class?",
      hint: "A blueprint for creating objects.",
      answer: "A class defines the structure and behaviour of objects. It contains properties (data) and methods (functions). Objects are instances of classes.",
    },
    {
      id: "s04-q03",
      q: "What is an object?",
      hint: "An instance of a class.",
      answer: "An object is a concrete instance created from a class. It has its own state (property values) and can use the class's methods.",
    },
    {
      id: "s04-q04",
      q: "What is a constructor?",
      hint: "The method called when creating a new instance.",
      answer: "A constructor is a special method that runs when an object is instantiated with new. It initializes the object's properties.",
    },
    {
      id: "s04-q05",
      q: "What is inheritance?",
      hint: "Child class gets parent class's properties/methods.",
      answer: "Inheritance allows a class to derive properties and methods from another class. The child (subclass) extends the parent (superclass). Promotes code reuse.",
      code: "class Dog extends Animal {}",
      language: "javascript",
    },
    {
      id: "s04-q06",
      q: "What is encapsulation?",
      hint: "Hiding internal details, exposing only what's needed.",
      answer: "Encapsulation bundles data and methods together and restricts direct access to internal state. Access is controlled through getters/setters or public methods.",
    },
    {
      id: "s04-q07",
      q: "What is abstraction?",
      hint: "Show only what matters, hide complexity.",
      answer: "Abstraction hides implementation details and shows only essential features. Example: you use Array.sort() without knowing the algorithm.",
    },
    {
      id: "s04-q08",
      q: "What is polymorphism?",
      hint: "Same method name, different behaviour.",
      answer: "Polymorphism means the same interface can have different implementations. Example: a speak() method on Dog returns 'Woof' and on Cat returns 'Meow' — same method name, different behaviour.",
    },
    {
      id: "s04-q09",
      q: "What is method overriding?",
      hint: "Child class redefines a parent method.",
      answer: "Method overriding is when a subclass provides its own implementation of a method already defined in the parent class.",
    },
    {
      id: "s04-q10",
      q: "What is the difference between an abstract class and an interface?",
      hint: "One can have implementation, one is a pure contract.",
      answer: "Abstract class can have both implemented and abstract (unimplemented) methods. A class can only extend one abstract class.\nInterface is a pure contract — only method signatures, no implementation. A class can implement multiple interfaces. (TypeScript/Java context.)",
    },
    {
      id: "s04-q11",
      q: "What is a static method?",
      hint: "Belongs to the class, not the instance.",
      answer: "Static methods belong to the class itself, not to any instance. Called as ClassName.method() — you don't need to create an object.\nExample: Math.round() — you never do new Math().",
    },
    {
      id: "s04-q12",
      q: "What is the this keyword in JavaScript?",
      hint: "Refers to the current context/object.",
      answer: "this refers to the object that called the method. In a class method, this refers to the instance. In arrow functions, this is inherited from the surrounding scope (lexical this).",
    },
    {
      id: "s04-q13",
      q: "What is the difference between call(), apply(), and bind()?",
      hint: "All three control what this refers to.",
      answer: "call(obj, arg1, arg2) invokes the function immediately with this = obj.\napply(obj, [args]) same but arguments as array.\nbind(obj) returns a NEW function with this permanently set — doesn't call it.",
    },
    {
      id: "s04-q14",
      q: "What is a prototype in JavaScript?",
      hint: "JavaScript's mechanism for inheritance.",
      answer: "Every JS object has a prototype — a reference to another object from which it inherits properties/methods. This forms the prototype chain. Classes in JS are syntactic sugar over prototype-based inheritance.",
    },
    {
      id: "s04-q15",
      q: "What is the difference between composition and inheritance?",
      hint: '"has-a" vs "is-a".',
      answer: 'Inheritance = "is-a" relationship (Dog IS an Animal).\nComposition = "has-a" relationship (Car HAS an Engine).\nComposition is often preferred — more flexible, avoids deep inheritance chains (favour composition over inheritance).',
    },
  ],
};
