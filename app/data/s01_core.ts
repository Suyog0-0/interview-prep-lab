import type { InterviewSection } from "../../types";

export const s01_core: InterviewSection = {
  id: 1,
  slug: "core-programming",
  title: "Core Programming",
  subtitle: "Loops, Conditionals, Basics",
  color: "#f97316",
  questions: [
    {
      id: "s01-q01",
      q: "What is the difference between a while loop and a for loop?",
      hint: "Think about when you know the number of iterations vs when you don't.",
      answer: "A for loop is used when you're iterating over a known sequence (a range, list, string, etc).\nA while loop runs as long as a condition is true — better when the number of iterations isn't known ahead of time. Both can technically do the same job.",
      code: `# for loop: we know it runs 5 times
for i in range(5):
    print(i)

# while loop: runs until condition becomes false
running = True
while running:
    # do something
    running = False  # exit condition`,
      language: "python"
    },
    {
      id: "s01-q02",
      q: "What does a break statement do inside a loop?",
      hint: "It stops something early.",
      answer: "`break` immediately exits the loop, skipping any remaining iterations, even if the loop condition is still true.",
      code: `for i in range(10):
    if i == 3:
        break  # loop stops when i is 3
    print(i)  # prints 0, 1, 2`,
      language: "python"
    },
    {
      id: "s01-q03",
      q: "What does continue do inside a loop?",
      hint: "It skips, not stops.",
      answer: "`continue` skips the current iteration and jumps to the next one. The loop itself keeps running.",
      code: `for i in range(5):
    if i == 2:
        continue  # skips rest of the body when i is 2
    print(i)  # prints 0, 1, 3, 4`,
      language: "python"
    },
    {
      id: "s01-q04",
      q: "What is the difference between == and is in Python?",
      hint: "One compares value, one compares identity.",
      answer: "`==` compares **values** — whether two objects contain the same data.\n`is` compares **identity** — whether two variables point to the exact same object in memory.\nTwo lists with identical contents are `==` but usually not `is`. Python has no `===` like JavaScript; `==` already does the value comparison JS uses `===` for (no implicit type coercion).",
      code: `a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)  # True  (same values)
print(a is b)  # False (different objects in memory)

c = a
print(a is c)  # True  (c points to the same list as a)

# small ints and short strings are cached/interned by CPython,
# so "is" can look True for them — never rely on that
x = 5
y = 5
print(x is y)  # True, but this is an implementation detail — use == for values`,
      language: "python"
    },
    {
      id: "s01-q05",
      q: "What is a ternary/conditional expression? Write an example.",
      hint: "It's a one-line if-else, written as an expression.",
      answer: "Python's conditional expression syntax is `value_if_true if condition else value_if_false` — the condition sits in the middle, unlike JavaScript's `condition ? a : b`.",
      code: `age = 20
label = "Adult" if age >= 18 else "Minor"
print(label)  # "Adult"`,
      language: "python",
    },
    {
      id: "s01-q06",
      q: "What is a match statement used for?",
      hint: "Python's structural pattern matching (3.10+), the closest thing to switch.",
      answer: "`match` (added in Python 3.10) compares a value against multiple patterns — cleaner than long if/elif chains for checking exact values. Unlike JS's `switch`, there's no fallthrough to worry about — each `case` is self-contained and there's no need for `break`. Use `case _:` as the default/catch-all.",
      code: `role = "admin"
match role:
    case "admin":
        print("Full access")
    case "user":
        print("Limited access")
    case _:
        print("Guest access")`,
      language: "python"
    },
    {
      id: "s01-q07",
      q: "What is the difference between pass by value and pass by reference in Python?",
      hint: "Python doesn't strictly do either — it's 'pass by object reference'.",
      answer: "Python passes the **reference to the object**, but whether you see a change outside the function depends on whether the object is mutable.\nImmutable types (int, str, tuple) — reassigning inside the function doesn't affect the caller's variable, because reassignment just points the local name at a new object.\nMutable types (list, dict, set) — mutating the object in place (e.g. `.append()`) IS visible to the caller, because both names still reference the same object.",
      code: `# Immutable (int) — reassignment doesn't leak out
def try_change(n):
    n = 20

a = 10
try_change(a)
print(a)  # 10 (unchanged)

# Mutable (list) — in-place mutation IS visible outside
def add_item(lst):
    lst.append("new")

items = ["a", "b"]
add_item(items)
print(items)  # ["a", "b", "new"]  (mutated!)`,
      language: "python"
    },
    {
      id: "s01-q08",
      q: "What is an infinite loop? How do you avoid it?",
      hint: "A loop that never ends.",
      answer: "An infinite loop occurs when the exit condition is never met.\nAvoid it by ensuring the loop variable changes on each iteration and the condition will eventually become false.",
      code: `# INFINITE LOOP (DO NOT RUN)
# i = 0
# while i < 5:
#     print(i)
#     # forgot i += 1 here!

# CORRECT
j = 0
while j < 5:
    print(j)
    j += 1  # important!`,
      language: "python"
    },
    {
      id: "s01-q09",
      q: "What is recursion?",
      hint: "A function that calls itself.",
      answer: "Recursion is when a function calls itself to solve a smaller version of the same problem. Every recursive function needs a base case (stopping condition) to prevent infinite recursion. Python's default recursion limit is 1000 frames (`sys.getrecursionlimit()`), so very deep recursion will raise a `RecursionError`.",
      code: `def count_down(n):
    # Base case
    if n <= 0:
        print("Done!")
        return

    print(n)
    count_down(n - 1)  # Recursive call

count_down(3)  # 3, 2, 1, Done!`,
      language: "python"
    },
    {
      id: "s01-q10",
      q: "Write a recursive function to calculate factorial of n.",
      hint: "factorial(n) = n * factorial(n-1). Base case: factorial(0) = 1.",
      answer: "A recursive factorial function: base case returns 1 when n is 0, otherwise multiplies n by factorial(n-1).",
      code: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)`,
      language: "python",
    },
    {
      id: "s01-q11",
      q: "What is the difference between a def function and a lambda in Python?",
      hint: "One is a full statement, one is a single-expression anonymous function.",
      answer: "`def` creates a named function that can contain multiple statements, docstrings, and complex logic. A `lambda` is a small anonymous function limited to a single expression (no statements, no assignments) — useful as a quick throwaway, e.g. passed to `sorted(key=...)`. Unlike JavaScript, Python functions are **not hoisted** — a function must be defined before it's called, regardless of whether it's `def` or a `lambda` assigned to a name.",
      code: `# def — named, full function body
def say_hi():
    print("Hi")

say_hi()  # works — but only because it's called AFTER the def

# lambda — anonymous, single expression, often assigned to a name
say_bye = lambda: print("Bye")
say_bye()

# calling before definition fails either way (no hoisting in Python)
# greet()  # NameError: name 'greet' is not defined
def greet():
    print("Hello")`,
      language: "python"
    },
    {
      id: "s01-q12",
      q: "Does Python hoist variables and functions the way JavaScript does?",
      hint: "No — Python resolves names at the point the enclosing scope is entered, not by moving declarations to the top.",
      answer: "Python does **not** hoist declarations the way JavaScript's `var` does. Referencing a name before it's assigned in a scope raises a `NameError` (or `UnboundLocalError` inside a function if the name is assigned later in that same function). Python does determine a variable's scope for the *whole* function at compile time — which is why assigning to a name anywhere in a function makes Python treat it as local throughout that function, even on lines before the assignment.",
      code: `print(a)  # NameError: name 'a' is not defined
a = 5

def example():
    print(b)  # UnboundLocalError, not a lookup of the global b —
    b = 10    # because b is assigned later in this function,
              # Python treats it as local for the whole function body

b = 10
example()`,
      language: "python"
    },
    {
      id: "s01-q13",
      q: "How does Python represent 'no value', and how is that different from a variable that was never assigned?",
      hint: "Python only has one null-like value: None.",
      answer: "Python has a single value for 'intentionally empty', `None` — there's no separate `undefined`. A variable that was never assigned at all doesn't have a placeholder value; referencing it raises a `NameError`. This is different from JavaScript, where an unassigned `let`/`var` evaluates to `undefined` rather than throwing.",
      code: `y = None
print(y)  # None

# print(x)  # NameError: name 'x' is not defined — Python has no "undefined" value`,
      language: "python"
    },
    {
      id: "s01-q14",
      q: "What is NaN in Python? How do you check for it?",
      hint: "Not a Number — but you need the math or float type to get it.",
      answer: "Python doesn't produce `NaN` from ordinary invalid operations the way JS does — multiplying a string by a number raises a `TypeError` instead. `NaN` shows up when you explicitly create it via `float('nan')` or from certain floating-point operations (e.g. `0.0 / 0.0` in some contexts via `math`). Check for it with `math.isnan(value)` — never `value == float('nan')`, which is always False (NaN is not equal to itself, by IEEE 754 design).",
      code: `import math

result = float("nan")
print(result)  # nan

print(result == float("nan"))  # False!
print(math.isnan(result))      # True

# "apples" * 2 raises TypeError in Python — it doesn't silently become NaN like in JS`,
      language: "python"
    },
    {
      id: "s01-q15",
      q: "What is scope in Python?",
      hint: "Where a variable is accessible — Python's rule is LEGB.",
      answer: "Scope defines where variables are accessible. Python resolves names using the LEGB rule:\n- **Local** — inside the current function\n- **Enclosing** — inside any enclosing function (closures)\n- **Global** — top-level of the module\n- **Built-in** — Python's built-in names (`len`, `print`, etc.)\n\nUnlike JavaScript, Python has no separate block scope — an `if`/`for` block does not create a new scope; only functions (and modules) do.",
      code: `global_var = "I am everywhere"

def example():
    func_var = "I am inside this function"

    if True:
        block_var = "I am inside this block, but NOT block-scoped"
        print(block_var)  # works

    print(block_var)  # ALSO works — unlike JS, no block scoping here
# print(func_var)  # NameError: func_var is not defined outside example()`,
      language: "python"
    },
  ],
  notes: [
    {
      title: "Core Programming Fundamentals",
      content: "This section covers the absolute foundational building blocks of programming, focusing heavily on control flow mechanisms such as loops and conditionals. Understanding these mechanisms is crucial before diving into more advanced topics like OOP or Data Structures.\n\n**Key Takeaways:**\n- **Loops** allow repeated execution of logic.\n- **Conditionals** allow branching logic based on boolean values.\n- Always be wary of **infinite loops** and properly handle loop exits using `break` or correct condition checks.",
      tip: "When writing any loop, explicitly write down your exit condition before writing the loop body to avoid infinite loops."
    },
    {
      title: "Loops in Detail",
      content: "A `for` loop in Python iterates directly over a sequence (list, string, range, etc) rather than a counter — this is closer to JS's `for...of` than its C-style `for`. A `while` loop is typically used when the iterations depend on an external condition (like fetching data until there is no more).",
      code: `# For loop example
for i in range(5):
    print(i)

# While loop example
limit = 5
while limit > 0:
    print(limit)
    limit -= 1`,
      language: "python"
    },
    {
      title: "Conditionals & Operators",
      content: "In Python, `==` already compares by value with no implicit type coercion between unrelated types (comparing an `int` and a `str` with `==` is simply `False`, not an error) — so there's no separate strict-equality operator to reach for like JS's `===`. Use `is` only for identity checks (most commonly `is None`), never for comparing values.",
      tip: "For a short if/else that returns a value, use a conditional expression: `value = a if condition else b`."
    }
  ]
};