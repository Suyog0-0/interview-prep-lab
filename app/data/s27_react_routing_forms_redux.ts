import type { InterviewSection, MCQQuestion, InterviewQuestion, NoteSection } from "../../types";

/**
 * Section 27 — React Routing, Forms, and Redux
 * Priority: IMPORTANT
 *
 * The audit found these almost entirely absent: React Router, useSearchParams,
 * nested routes, React Hook Form, Zod, and every piece of Redux Toolkit
 * (createSlice, useSelector, createAsyncThunk, RTK Query) had zero occurrences.
 */

const notes: NoteSection[] = [
  {
    title: "React Router — Routes, Params, and Nesting",
    content:
      "React Router maps URL paths to components. A dynamic segment like `/users/:id` captures a route parameter, read inside the component with `useParams()`. Query strings (`?sort=asc`) are read and written with `useSearchParams()`, which behaves like useState but is synced to the URL. Nested routes let a parent route render a shared layout (like a sidebar) with an `<Outlet />` placeholder where the matching child route's element appears.",
    code: "// App routes\n<Routes>\n  <Route path=\"/users\" element={<UsersLayout />}>\n    <Route index element={<UsersList />} />\n    <Route path=\":id\" element={<UserDetail />} />\n  </Route>\n</Routes>\n\n// Inside UserDetail\nfunction UserDetail() {\n  const { id } = useParams();\n  const [searchParams, setSearchParams] = useSearchParams();\n  const tab = searchParams.get('tab') ?? 'overview';\n  return <div>User {id}, tab: {tab}</div>;\n}\n\n// Inside UsersLayout\nfunction UsersLayout() {\n  return (\n    <div>\n      <Sidebar />\n      <Outlet /> {/* renders UsersList or UserDetail depending on the URL */}\n    </div>\n  );\n}",
    language: "javascript",
    tip: "useParams() reads path segments (/:id); useSearchParams() reads the query string (?tab=x). Confusing the two is a very common mistake.",
  },
  {
    title: "React Hook Form + Zod",
    content:
      "React Hook Form manages form state (values, touched, errors) without a re-render on every keystroke, by registering inputs via refs instead of controlled state. Zod defines a validation schema declaratively and React Hook Form's `zodResolver` plugs that schema straight into the form's validation step, so you get typed, validated form data with almost no boilerplate.",
    code: "import { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nimport { z } from 'zod';\n\nconst schema = z.object({\n  email: z.string().email(),\n  age: z.number().min(18),\n});\n\nfunction SignupForm() {\n  const { register, handleSubmit, formState: { errors } } = useForm({\n    resolver: zodResolver(schema),\n  });\n\n  const onSubmit = (data) => console.log(data); // data is validated & typed\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register('email')} />\n      {errors.email && <span>{errors.email.message}</span>}\n      <button type=\"submit\">Sign up</button>\n    </form>\n  );\n}",
    language: "javascript",
  },
  {
    title: "Controlled vs Uncontrolled Inputs",
    content:
      "A controlled input's value lives in React state — you set `value={state}` and update state `onChange`, so React is the single source of truth and re-renders on every keystroke. An uncontrolled input keeps its value in the DOM itself; you read it on demand via a ref (or React Hook Form's register, which wraps this pattern). Uncontrolled inputs avoid a re-render per keystroke, which is why React Hook Form defaults to them for performance on large forms.",
  },
  {
    title: "Redux — The Mental Model",
    content:
      "Redux centralises application state in one store. A component dispatches an action (a plain object describing what happened); a reducer, a pure function, takes the current state and the action and returns a NEW state — never mutating the old one. Components read state back out via selectors. The one-directional cycle is what makes state changes predictable and debuggable: state + action -> reducer -> new state -> dispatch -> store update -> selector -> component.",
    code: "// Redux Toolkit's createSlice generates action creators and the reducer together\nimport { createSlice } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => { state.value += 1; }, // Immer lets this LOOK like mutation but it isn't\n    incrementBy: (state, action) => { state.value += action.payload; },\n  },\n});\n\nexport const { increment, incrementBy } = counterSlice.actions;\nexport default counterSlice.reducer;\n\n// In a component:\nimport { useSelector, useDispatch } from 'react-redux';\nfunction Counter() {\n  const count = useSelector((state) => state.counter.value);\n  const dispatch = useDispatch();\n  return <button onClick={() => dispatch(increment())}>{count}</button>;\n}",
    language: "javascript",
    tip: "createSlice uses Immer under the hood, which is why `state.value += 1` inside a reducer is safe — Immer tracks the 'mutation' and produces a real new immutable state object behind the scenes.",
  },
  {
    title: "createAsyncThunk and RTK Query",
    content:
      "createAsyncThunk wraps an async operation (like a fetch call) and automatically dispatches pending/fulfilled/rejected actions around it, so a reducer can update loading/error/data state without writing that boilerplate by hand. RTK Query goes a level further: you describe your API endpoints declaratively and it generates the hooks (`useGetUsersQuery`, etc.), handling caching, re-fetching, and loading states for you — no manual useEffect + fetch + useState dance.",
    code: "export const fetchUser = createAsyncThunk('user/fetch', async (id) => {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json();\n});\n\n// in the slice's extraReducers:\nbuilder\n  .addCase(fetchUser.pending, (state) => { state.status = 'loading'; })\n  .addCase(fetchUser.fulfilled, (state, action) => {\n    state.status = 'succeeded';\n    state.data = action.payload;\n  })\n  .addCase(fetchUser.rejected, (state) => { state.status = 'failed'; });",
    language: "javascript",
  },
  {
    title: "Context vs Redux — When to Use Which",
    content:
      "Context solves prop-drilling for state that changes rarely (theme, current user, locale) — every consumer re-renders whenever the context value changes, with no fine-grained subscription. Redux (or Zustand) is built for frequently-changing, widely-shared state with fine-grained subscriptions (only components reading the specific slice that changed re-render) plus dev tools, middleware, and time-travel debugging. Don't reach for Redux by default — Context + useReducer covers most small-to-medium apps.",
  },
];

const questions: InterviewQuestion[] = [
  {
    id: "s27-q01",
    q: "What is the difference between useParams and useSearchParams in React Router?",
    hint: "Path segments vs query string.",
    answer:
      "useParams reads dynamic path segments defined in the route, like :id in /users/:id. useSearchParams reads and writes the query string (?key=value) and behaves like a piece of state that's synced to the URL.",
    category: "React Routing",
  },
  {
    id: "s27-q02",
    q: "What does <Outlet /> do in a nested route layout?",
    hint: "A placeholder for the matched child route.",
    answer:
      "It marks where the currently matched child route's element should render inside a parent layout route. This lets a shared layout (sidebar, header) wrap multiple pages without each page re-implementing that layout.",
    category: "React Routing",
  },
  {
    id: "s27-q03",
    q: "What is the difference between a controlled and an uncontrolled form input?",
    hint: "Who owns the value — React state or the DOM?",
    answer:
      "A controlled input's value is driven by React state (value + onChange), so React re-renders on every keystroke and is the single source of truth. An uncontrolled input keeps its value in the DOM itself, read on demand via a ref — no per-keystroke re-render, which is why libraries like React Hook Form default to this approach for performance.",
    category: "Forms",
  },
  {
    id: "s27-q04",
    q: "Describe the Redux mental model in one sentence.",
    hint: "state + action -> reducer -> new state.",
    answer:
      "A component dispatches an action describing what happened; a pure reducer function takes the current state plus that action and returns a brand-new state object; components read the updated state back out through selectors.",
    category: "Redux",
  },
  {
    id: "s27-q05",
    q: "What problem does createAsyncThunk solve?",
    hint: "Boilerplate around async pending/success/error states.",
    answer:
      "It wraps an async function (typically a data fetch) and automatically dispatches pending, fulfilled, and rejected actions around it, so a reducer's extraReducers can update loading/data/error state without hand-writing that dispatch sequence for every async operation.",
    category: "Redux",
  },
  {
    id: "s27-q06",
    q: "When would you choose Context over Redux, and vice versa?",
    hint: "Change frequency and how widely state is shared.",
    answer:
      "Choose Context for state that changes rarely and doesn't need fine-grained subscriptions — theme, current user, locale. Choose Redux (or Zustand) when state changes frequently, is read by many unrelated components, and you want fine-grained re-renders, middleware, or dev-tools time-travel debugging.",
    category: "Redux",
  },
];

const mcqs: MCQQuestion[] = [
  {
    id: "s27-m01",
    question: "In React Router, which hook would you use to read the value of `?sort=price` from the current URL?",
    options: ["useParams", "useSearchParams", "useLocation only", "useMatch"],
    correctAnswerIndex: 1,
    explanation:
      "useSearchParams reads (and can update) the query string portion of the URL. useParams is for path segments like :id, not query parameters.",
  },
  {
    id: "s27-m02",
    question: "What does createSlice from Redux Toolkit generate for you?",
    options: [
      "Only the reducer function",
      "Action creators AND the reducer, generated together from one definition",
      "A REST API client",
      "React components"
    ],
    correctAnswerIndex: 1,
    explanation:
      "createSlice takes a name, initial state, and a set of reducer functions, then automatically generates matching action creators and combines everything into one reducer — eliminating the separate action-type-constants and switch-statement boilerplate of classic Redux.",
  },
  {
    id: "s27-m03",
    question: "Why can you write `state.value += 1` inside a Redux Toolkit reducer, when Redux reducers must never mutate state?",
    options: [
      "Redux Toolkit secretly ignores the rule",
      "createSlice uses Immer internally, which lets you write mutation-looking code that is actually converted into a new immutable state object",
      "It's a bug that happens to work",
      "Only works for numbers, not objects"
    ],
    correctAnswerIndex: 1,
    explanation:
      "Immer wraps your reducer's draft state in a proxy. Writes to that proxy are recorded, and Immer produces a real new state object based on those recorded changes — so the reducer stays pure from Redux's perspective even though the code looks like direct mutation.",
  },
  {
    id: "s27-m04",
    question: "What is the main functional difference between a controlled and uncontrolled React input?",
    options: [
      "Controlled inputs can't have a default value",
      "Controlled inputs sync their value to React state on every change (re-rendering); uncontrolled inputs keep their value in the DOM, read via a ref only when needed",
      "Uncontrolled inputs don't support validation",
      "There is no real difference"
    ],
    correctAnswerIndex: 1,
    explanation:
      "Controlled means React state is the source of truth, updated via onChange, which triggers a re-render per keystroke. Uncontrolled means the DOM itself holds the current value, and you pull it out on demand — better performance on large forms, which is why React Hook Form defaults to this pattern.",
  },
  {
    id: "s27-m05",
    question: "Redux vs Context — which statement is accurate?",
    options: [
      "Context and Redux are functionally identical in every way",
      "Context is best for rarely-changing, broadly-needed values (theme, locale); Redux suits frequently-changing state needing fine-grained subscriptions and dev tooling",
      "Redux should always be used instead of Context",
      "Context cannot hold objects, only primitives"
    ],
    correctAnswerIndex: 1,
    explanation:
      "Context re-renders every consumer on any change to the provided value, with no selective subscription — fine for state that rarely changes. Redux (via react-redux's useSelector) only re-renders components reading the specific slice that changed, which matters far more as state updates get frequent and state trees get large.",
  },
];

export const s27_react_routing_forms_redux: InterviewSection = {
  id: 27,
  slug: "react-routing-forms-redux",
  title: "React Routing, Forms & Redux",
  subtitle: "React Router, React Hook Form + Zod, and Redux Toolkit",
  color: "#7c3aed",
  priority: "IMPORTANT",
  stack: "React",
  questions,
  mcqs,
  notes,
  codingQuestions: [],
};