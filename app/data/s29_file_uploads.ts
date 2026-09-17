import type { InterviewSection, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/**
 * Section 29 — File Uploads
 * Priority: IMPORTANT
 * The audit found this at ZERO occurrences for every required term:
 * multipart/form-data, Multer, req.file, Cloudinary, disk/memory storage.
 */

const notes: NoteSection[] = [
  {
    title: "multipart/form-data — why file uploads need a different content type",
    content:
      "A normal form submits as application/x-www-form-urlencoded or application/json — fine for text, but binary file data doesn't fit cleanly into either. multipart/form-data splits the request body into named parts, each with its own headers, letting text fields and binary file data live side by side in one request. The browser sets this content type automatically when you use a `<form>` with `enctype=\"multipart/form-data\"` or build a `FormData` object in JavaScript.",
    code: "// Client side\nconst formData = new FormData();\nformData.append('avatar', fileInput.files[0]);\nformData.append('username', 'ina');\n\nfetch('/api/upload', { method: 'POST', body: formData }); // no Content-Type header needed — fetch sets it, including the boundary",
    language: "javascript",
  },
  {
    title: "Multer — parsing multipart/form-data in Express",
    content:
      "Express does not parse multipart/form-data on its own (express.json() only handles JSON bodies). Multer is the standard middleware that parses multipart requests and exposes the uploaded file as `req.file` (single) or `req.files` (multiple), plus any other form fields as `req.body`, just like a normal form.",
    code: "const multer = require('multer');\nconst upload = multer({ dest: 'uploads/' }); // disk storage by default\n\napp.post('/api/upload', upload.single('avatar'), (req, res) => {\n  console.log(req.file);   // { fieldname, originalname, mimetype, size, path, ... }\n  console.log(req.body);   // other text fields, e.g. { username: 'ina' }\n  res.json({ received: req.file.filename });\n});",
    language: "javascript",
    tip: "`upload.single('avatar')` — the string must match the FormData key the client used (`formData.append('avatar', ...)`), or req.file will be undefined.",
  },
  {
    title: "Memory Storage vs Disk Storage",
    content:
      "Multer's diskStorage writes the uploaded file straight to disk as it streams in — good for large files, low memory use, but you then own cleanup and serving those files yourself. memoryStorage buffers the whole file in RAM as a Buffer on req.file.buffer instead — simpler when you're about to immediately re-upload the buffer to a cloud service (like Cloudinary) without ever needing it on your own disk, but risky for very large files since it all sits in memory.",
    code: "// Disk storage with custom naming\nconst storage = multer.diskStorage({\n  destination: (req, file, cb) => cb(null, 'uploads/'),\n  filename: (req, file, cb) => {\n    const uniqueName = `${Date.now()}-${crypto.randomUUID()}${path.extname(file.originalname)}`;\n    cb(null, uniqueName);\n  },\n});\nconst upload = multer({ storage });\n\n// Memory storage — for piping straight to a cloud service\nconst uploadToMemory = multer({ storage: multer.memoryStorage() });\napp.post('/upload', uploadToMemory.single('file'), async (req, res) => {\n  const result = await cloudinary.uploader.upload_stream(req.file.buffer);\n  res.json(result);\n});",
    language: "javascript",
  },
  {
    title: "Why file naming needs a UUID or timestamp",
    content:
      "Never save an uploaded file under its original name directly. Two users uploading 'photo.jpg' at the same time will overwrite each other, and an attacker could craft a filename to overwrite something sensitive (a form of path traversal). Generate a unique name — a timestamp, a UUID, or both — and keep the original extension so the file type is still recognisable.",
  },
  {
    title: "Cloud Storage and Orphan Files",
    content:
      "Storing uploaded files directly on your application server doesn't scale past one server and is lost if that server dies — so production systems upload to a dedicated service like Cloudinary or S3 instead, storing only the returned URL in your database. An 'orphan file' is a file that made it to storage but whose corresponding database record was never created (or was later deleted) — for example if the upload succeeds but the subsequent database write fails. Guard against this by either uploading inside the same transaction-like flow as the database write, or running a periodic cleanup job that deletes storage files with no matching database record.",
  },
];

const questions: InterviewQuestion[] = [
  {
    id: "s29-q01",
    q: "Why can't a normal JSON or urlencoded request body carry an uploaded file?",
    hint: "Binary data doesn't fit those text-based formats.",
    answer:
      "application/json and application/x-www-form-urlencoded are both text-based formats meant for key-value data, not binary content. multipart/form-data solves this by splitting the request into separate named parts, each able to carry its own content type — so a binary file part and text field parts can coexist in one request.",
    category: "File Uploads",
  },
  {
    id: "s29-q02",
    q: "What does Multer do, and where does the uploaded file end up on the request object?",
    hint: "Express middleware; req.file / req.files.",
    answer:
      "Multer is Express middleware that parses multipart/form-data requests. A single uploaded file appears at req.file; multiple files (depending on configuration) appear at req.files. Any other non-file form fields land in req.body, just like a normal form submission.",
    category: "File Uploads",
  },
  {
    id: "s29-q03",
    q: "What is the difference between Multer's disk storage and memory storage?",
    hint: "Where the bytes live while being processed.",
    answer:
      "Disk storage streams the file directly to disk as it arrives — lower memory use, good for large files, but you manage the resulting files on your filesystem yourself. Memory storage buffers the entire file into a Buffer in RAM, available at req.file.buffer — convenient when immediately forwarding the buffer to a cloud storage service, but risky for very large uploads since it all sits in memory at once.",
    category: "File Uploads",
  },
  {
    id: "s29-q04",
    q: "Why should you never save an uploaded file under its original filename?",
    hint: "Collisions and path traversal.",
    answer:
      "Two uploads with the same original name would overwrite each other, and an attacker could deliberately craft a filename to attempt a path-traversal attack. Generating a unique name — a timestamp, a UUID, or both — while preserving the original extension avoids both problems.",
    category: "File Uploads",
  },
  {
    id: "s29-q05",
    q: "What is an orphan file, and how do you prevent them?",
    hint: "Storage succeeded, database record didn't.",
    answer:
      "An orphan file is one that exists in storage (disk or cloud) with no corresponding database record — usually because the upload succeeded but a subsequent database write failed, or the record was deleted without deleting the file. Prevent it by tying the upload and the database write together as tightly as possible, or by running a periodic cleanup job that removes storage files with no matching record.",
    category: "File Uploads",
  },
];

const mcqs: MCQQuestion[] = [
  {
    id: "s29-m01",
    question: "What content type does a form need to actually send an uploaded file's binary data to the server?",
    options: ["application/json", "text/plain", "multipart/form-data", "application/x-www-form-urlencoded"],
    correctAnswerIndex: 2,
    explanation:
      "multipart/form-data splits the request into separate parts so binary file content can be sent alongside regular text fields — something the other listed content types cannot represent.",
  },
  {
    id: "s29-m02",
    question: "Why doesn't `express.json()` parse an incoming file upload?",
    options: [
      "express.json() is broken",
      "express.json() only parses application/json bodies — file uploads arrive as multipart/form-data, which needs different middleware (like Multer)",
      "Express cannot handle files under any circumstances",
      "File size limits prevent parsing"
    ],
    correctAnswerIndex: 1,
    explanation:
      "express.json() is specifically a JSON body parser. A multipart request has an entirely different structure (boundary-delimited parts), which is why a separate library like Multer exists to parse it.",
  },
  {
    id: "s29-m03",
    question: "You're building an endpoint that immediately forwards every uploaded image to Cloudinary without ever needing it on your own server's disk. Which Multer storage engine fits best?",
    options: ["diskStorage", "memoryStorage", "Neither — Multer can't do this", "A custom database storage engine"],
    correctAnswerIndex: 1,
    explanation:
      "memoryStorage buffers the file as req.file.buffer, which you can pipe directly to a cloud SDK's upload call without ever writing it to your own filesystem — appropriate here since the file was never meant to live on your server.",
  },
  {
    id: "s29-m04",
    question: "What security problem does generating a UUID-based filename for uploads help prevent?",
    options: [
      "SQL injection",
      "Filename collisions between different uploads AND path-traversal attacks via a crafted original filename",
      "Cross-site scripting",
      "CORS violations"
    ],
    correctAnswerIndex: 1,
    explanation:
      "Using the original, attacker-controllable filename risks both silent overwrites between unrelated uploads and deliberate path-traversal attempts. A generated unique name (UUID and/or timestamp) with the original extension preserved avoids both.",
  },
];

export const s29_file_uploads: InterviewSection = {
  id: 29,
  slug: "file-uploads",
  title: "File Uploads",
  subtitle: "multipart/form-data, Multer, storage engines, and cloud storage",
  color: "#f97316",
  priority: "IMPORTANT",
  stack: "FullStack",
  questions,
  mcqs,
  notes,
  codingQuestions: [],
};