import type { InterviewSection, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/**
 * Section 28 — MongoDB/Mongoose, Backend Architecture, Authentication & Security
 * Priority: IMPORTANT
 *
 * The audit found: mongodb (2 mentions), mongoose (1 mention), virtuals/statics/
 * Atlas/Compass/connection pooling (all 0). Salting: 0 occurrences anywhere.
 * Encoding vs Encryption vs Hashing were never contrasted in one place.
 */

const notes: NoteSection[] = [
  {
    title: "MongoDB vs Mongoose",
    content:
      "MongoDB is the actual database — a document store where data lives as JSON-like BSON documents in collections, with no fixed schema enforced by the database itself. Mongoose is an ODM (Object Data Modeling library) that sits on top of the official MongoDB Node.js driver, giving you schemas, validation, and a model-based API in application code. The chain is: Node.js -> Mongoose -> MongoDB (schema/validation layer added), or Node.js -> MongoDB Driver -> MongoDB directly (no schema layer, more manual).",
    tip: "If asked 'what is Mongoose', the accurate one-line answer is: an ODM that adds schemas and validation on top of the schemaless MongoDB driver — not a database itself.",
  },
  {
    title: "Mongoose Schema, Model, Validation, Statics, and Virtuals",
    content:
      "A schema defines the shape and validation rules of a document. A model is the constructor built from that schema, used to create/read/update/delete documents. Custom validators run your own function against a field's value. A static method is attached to the Model itself (`User.findByEmail(...)`); an instance method is attached to individual documents (`user.comparePassword(...)`). A virtual is a computed property that isn't stored in the database — like a `fullName` built from `firstName` + `lastName` — but still shows up when you access the document.",
    code: "const userSchema = new mongoose.Schema({\n  email: {\n    type: String,\n    required: true,\n    unique: true,\n    validate: {\n      validator: (v) => /^\\S+@\\S+\\.\\S+$/.test(v),\n      message: 'Invalid email format',\n    },\n  },\n  firstName: String,\n  lastName: String,\n});\n\nuserSchema.virtual('fullName').get(function () {\n  return `${this.firstName} ${this.lastName}`;\n});\n\nuserSchema.statics.findByEmail = function (email) {\n  return this.findOne({ email });\n};\n\nconst User = mongoose.model('User', userSchema);",
    language: "javascript",
  },
  {
    title: "Indexing and Query Complexity",
    content:
      "Without an index, MongoDB scans every document in a collection to satisfy a query — O(n). An index is a separate, sorted data structure (a B-tree, the same structure relational databases use) that lets the database jump directly to matching documents in roughly O(log n). Indexes speed up reads but cost extra storage and slow down writes (every insert/update must also update the index) — so index the fields you actually filter or sort by, not every field.",
    tip: "The most common indexing interview question: 'why not just index everything?' — the answer is the write-cost/storage trade-off above.",
  },
  {
    title: "Backend Architecture — Routes -> Controller -> Service -> Model -> Database",
    content:
      "This layering is the practical form of MVC in a Node/Express API: a Route defines the URL + HTTP method and forwards to a Controller. The Controller handles the HTTP concerns (parsing the request, sending the response) and delegates business logic to a Service. The Service contains the actual logic and talks to a Model (Mongoose), which talks to the Database. Each layer only knows about the one below it — a Controller never touches the database directly, and a Service knows nothing about req/res. This separation of concerns is what makes each layer independently testable.",
    code: "// routes/users.js\nrouter.get('/:id', userController.getUser);\n\n// controllers/userController.js\nasync function getUser(req, res) {\n  const user = await userService.getUserById(req.params.id);\n  res.json(user);\n}\n\n// services/userService.js\nasync function getUserById(id) {\n  return User.findById(id); // Model call lives here, not in the controller\n}",
    language: "javascript",
  },
  {
    title: "Encoding vs Encryption vs Hashing vs Salting",
    content:
      "These four are commonly confused and interviewers test the distinction directly. Encoding transforms data into a different format for safe storage/transmission (Base64, URL-encoding) — it is reversible by anyone, with no secret required; it is NOT security. Encryption transforms data using a key such that only someone with the correct key can reverse it back to the original — reversible, but only with the key. Hashing is a one-way transformation: you cannot recover the original input from the hash, which is exactly why passwords are hashed rather than encrypted — even the server should never be able to recover the original password. Salting adds random data to the input before hashing (a different salt per user, stored alongside the hash) specifically to defeat precomputed rainbow-table attacks — two users with the same password get different hashes.",
    tip: "One-line test answer: 'Encoding is for format, encryption is for secrecy with a reversible key, hashing is one-way and used for passwords, salting makes hashing attack-resistant.'",
  },
  {
    title: "JWT, Access Tokens, Refresh Tokens, and Cookies",
    content:
      "A JWT (JSON Web Token) is a signed, self-contained token carrying claims (like user ID) that the server can verify without a database lookup, since the signature proves it hasn't been tampered with. An access token is short-lived and sent with each API request (commonly as a Bearer token in the Authorization header) to prove identity. A refresh token is long-lived, used only to obtain a new access token once the old one expires, and is typically stored in an HttpOnly cookie so client-side JavaScript can never read it — protecting it from XSS attacks. The typical refresh flow: access token expires -> client silently calls a refresh endpoint with the refresh token -> server issues a new access token -> the original request retries.",
  },
];

const questions: InterviewQuestion[] = [
  {
    id: "s28-q01",
    q: "What is the difference between MongoDB and Mongoose?",
    hint: "Database vs library layered on top.",
    answer:
      "MongoDB is the actual database engine — a schemaless document store. Mongoose is an ODM library that runs in your Node.js application on top of the MongoDB driver, adding schemas, validation, and a model-based API. MongoDB itself doesn't know or care that Mongoose exists.",
    category: "MongoDB/Mongoose",
  },
  {
    id: "s28-q02",
    q: "What is a Mongoose virtual, and why would you use one?",
    hint: "A computed field that isn't stored.",
    answer:
      "A virtual is a property computed from a document's real fields (like fullName from firstName + lastName) that behaves like a normal field when accessed, but is never written to the database. Use it to avoid storing redundant derived data that could go stale.",
    category: "MongoDB/Mongoose",
  },
  {
    id: "s28-q03",
    q: "What is an index, and why not index every field in a database?",
    hint: "Speed vs write cost and storage.",
    answer:
      "An index is a sorted data structure (typically a B-tree) that lets a database jump to matching rows in roughly O(log n) instead of scanning every document (O(n)). Every index also costs storage and must be updated on every write, so indexing every field would slow down all writes and bloat storage — you index only the fields you actually filter or sort by.",
    category: "Backend Architecture",
  },
  {
    id: "s28-q04",
    q: "Draw the Routes -> Controller -> Service -> Model -> Database chain and explain each layer's job.",
    hint: "Separation of concerns.",
    answer:
      "Routes map a URL and HTTP method to a handler. The Controller handles HTTP concerns — parsing the request, shaping the response — and delegates actual logic to a Service. The Service holds the business logic and calls a Model to talk to the Database. Each layer depends only on the one directly below it, which makes each layer independently testable and keeps HTTP-specific code out of your business logic.",
    category: "Backend Architecture",
  },
  {
    id: "s28-q05",
    q: "What is the difference between encoding, encryption, and hashing?",
    hint: "Format transform / reversible with key / one-way.",
    answer:
      "Encoding reformats data for safe storage or transmission and is trivially reversible by anyone — it provides no security. Encryption transforms data using a key, and is reversible only by someone holding the correct key. Hashing is a one-way transformation with no key to reverse it — used for passwords specifically because even the server should never be able to recover the original value.",
    category: "Authentication",
  },
  {
    id: "s28-q06",
    q: "What is salting, and what attack does it defend against?",
    hint: "Random data added before hashing.",
    answer:
      "Salting adds random data, unique per user, to a password before hashing it and stores the salt alongside the hash. It defends against precomputed rainbow-table attacks and against two users with the same password producing identical hashes — without salting, an attacker could crack every account sharing a password the moment they crack one.",
    category: "Authentication",
  },
  {
    id: "s28-q07",
    q: "What is the difference between an access token and a refresh token, and why is a refresh token often stored in an HttpOnly cookie?",
    hint: "Short-lived for requests vs long-lived for renewal; XSS protection.",
    answer:
      "An access token is short-lived and sent with every API request to prove identity. A refresh token is long-lived and used only to obtain a fresh access token once the old one expires. Storing the refresh token in an HttpOnly cookie means client-side JavaScript cannot read it at all, which protects it even if an XSS vulnerability lets an attacker run script on the page.",
    category: "Authentication",
  },
];

const mcqs: MCQQuestion[] = [
  {
    id: "s28-m01",
    question: "Which statement correctly distinguishes MongoDB from Mongoose?",
    options: [
      "They are the same thing with different names",
      "MongoDB is the database; Mongoose is an ODM library in your Node app that adds schemas/validation on top of the MongoDB driver",
      "Mongoose is a database; MongoDB is a query language",
      "MongoDB only works with Mongoose installed"
    ],
    correctAnswerIndex: 1,
    explanation:
      "MongoDB has no knowledge of Mongoose — it's schemaless and would accept documents without any Mongoose validation applied. Mongoose is purely an application-layer convenience.",
  },
  {
    id: "s28-m02",
    question: "What is the key difference between encryption and hashing?",
    options: [
      "There is no difference — they're synonyms",
      "Encryption is reversible with the right key; hashing is one-way and not meant to be reversed at all",
      "Hashing is reversible; encryption is not",
      "Encryption is only used for images"
    ],
    correctAnswerIndex: 1,
    explanation:
      "Encryption is designed to be undone — by the key holder. Hashing is designed to never be undone, which is exactly why passwords are hashed: nobody, not even the server operator, should be able to recover the original password from its hash.",
  },
  {
    id: "s28-m03",
    question: "Why does salting matter even though the hashing algorithm itself is already one-way?",
    options: [
      "It makes hashing faster",
      "It defeats precomputed rainbow-table attacks and ensures identical passwords don't produce identical hashes across different users",
      "It replaces the need for hashing entirely",
      "It's only relevant for encryption, not hashing"
    ],
    correctAnswerIndex: 1,
    explanation:
      "A one-way hash is still vulnerable to an attacker who has precomputed hashes for common passwords (a rainbow table) or who notices two accounts share a hash (meaning they share a password). A unique salt per user defeats both, since it changes the input to the hash function even when the underlying password is the same.",
  },
  {
    id: "s28-m04",
    question: "In the Routes -> Controller -> Service -> Model chain, which layer is allowed to talk directly to the database?",
    options: ["The Route", "The Controller", "The Service, through the Model", "All layers equally"],
    correctAnswerIndex: 2,
    explanation:
      "The Service holds business logic and calls the Model to interact with the database. Controllers should stay focused on HTTP request/response handling and never query the database directly — that's the separation of concerns the layering exists to enforce.",
  },
  {
    id: "s28-m05",
    question: "Why is a refresh token typically stored in an HttpOnly cookie rather than localStorage?",
    options: [
      "HttpOnly cookies are faster to read",
      "Client-side JavaScript cannot access an HttpOnly cookie at all, which protects the token even if the page has an XSS vulnerability",
      "localStorage has a smaller size limit",
      "It's purely a convention with no security benefit"
    ],
    correctAnswerIndex: 1,
    explanation:
      "localStorage is fully readable by any JavaScript running on the page — including malicious script injected via XSS. An HttpOnly cookie is invisible to JavaScript entirely; only the browser attaches it automatically to matching requests, which is a meaningfully stronger defense for a long-lived credential like a refresh token.",
  },
];

export const s28_mongoose_architecture_auth: InterviewSection = {
  id: 28,
  slug: "mongoose-architecture-auth",
  title: "MongoDB/Mongoose, Architecture & Security",
  subtitle: "Schemas, virtuals, indexing, MVC layering, and encoding vs encryption vs hashing vs salting",
  color: "#10b981",
  priority: "IMPORTANT",
  stack: "Backend",
  questions,
  mcqs,
  notes,
  codingQuestions: [],
};