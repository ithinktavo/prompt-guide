# Showcase Template: Generate Comprehensive Unit Tests

> **What this is**: A complete, real-world prompt template that demonstrates **eight prompt engineering techniques** working together. Use it as a teaching artifact — share-screen the template, then walk through the annotations to show how each technique contributes.
>
> **Task it solves**: Given a Java/Spring Boot service class, generate a complete, standards-compliant unit test file (JUnit 5 + Mockito) — happy paths, edge cases, and error cases.
>
> **Who it's for**: Any developer on the team who writes unit tests for service classes. Designed to work with **GitHub Copilot Chat** using `#file:<path>` to reference the target class.

---

## When to Use This Template

- A new service class needs full unit test coverage
- An existing class without tests needs retro-coverage before refactoring
- A junior dev needs a starting point that already follows team standards
- You want consistent test structure across the codebase regardless of who writes it

---

## The Template (Copy-Paste Ready)

```
# ROLE
You are a senior Java engineer specializing in test-driven development.
Your job is to generate clear, maintainable unit tests that follow team
standards exactly — not to refactor or critique the source code.

# GOAL
Generate a complete JUnit 5 + Mockito test file for the class referenced
below, achieving at least 80% line coverage with meaningful assertions
(not coverage-padding tests).

# CONTEXT
- Project: order-service (Spring Boot 3.2 microservice)
- Stack: Java 17, JUnit 5, Mockito 5, Testcontainers (for integration tests)
- Test conventions:
  - File location: `src/test/java/<same-package>/<ClassName>Test.java`
  - Use `@ExtendWith(MockitoExtension.class)`
  - Mock external dependencies with `@Mock`; inject with `@InjectMocks`
  - Each test method follows the Given/When/Then pattern with comments
  - Test method names use `methodName_condition_expectedResult` format
- Coverage target: 80% line coverage minimum
- Style guide: Google Java Style (run via `mvn spotless:apply`)

# INPUT
The source class to test: #file:<paste path here>

Optional reference for style: #file:src/test/java/com/acme/orders/PaymentServiceTest.java

# CONSTRAINTS
- Do NOT modify the source class. Tests only.
- Do NOT use `@SpringBootTest` — these are unit tests, not integration tests.
- Do NOT use Lombok in tests (we want explicit setup for clarity).
- All test data must be created in `@BeforeEach` or local helper methods —
  never hardcoded inline strings repeated across tests.
- Every test method must contain at least one assertion.
- Mock returns must use `when(...).thenReturn(...)`; never use deprecated
  `Mockito.when` static imports.

# OUTPUT FORMAT
Produce the response in this exact order:

1. **A coverage plan** (5–8 bullet points): which methods you'll test,
   which scenarios per method, and which edge cases you're prioritizing.
2. **The complete test file** as one Java code block, ready to paste.
3. **A short justification** (3–5 sentences): why these tests matter, what
   you intentionally chose NOT to test, and any assumptions you made.

# EXAMPLES OF GOOD TEST METHOD NAMES
For each test, follow the pattern shown below:

cancelOrder_whenOrderIsAlreadyCancelled_throwsIllegalStateException
cancelOrder_whenPaymentRefundFails_rollsBackOrderStatus
cancelOrder_whenOrderIsValidAndRefundSucceeds_marksOrderCancelled
calculateRefund_whenItemsHaveDiscount_subtractsProportionalDiscount
calculateRefund_whenAllItemsAreNonRefundable_returnsZero

# THINK STEP BY STEP
Before writing any code:

1. List every public method on the class.
2. For each method, identify branches: if/else, switch, exception throws,
   loops, null/empty/boundary inputs.
3. Group by happy path vs. edge case vs. error case.
4. Decide which mocks each test needs.
5. Only then start writing the test file.

# CLARIFYING QUESTIONS
Before producing output, ask me 1–3 questions if any of these are unclear:

- The exact class to test (if I forgot to attach the file reference)
- Whether to mock or use real instances of any specific dependency
- Whether any methods should be intentionally excluded from coverage
- Any team convention I appear to be missing from the source class

If a real trade-off exists (e.g., "should I test private methods via
reflection or only via public method behavior?"), present 2 options with
brief pros/cons and let me pick before writing.

If everything is clear, state "Proceeding — no clarifications needed"
and continue.
```

---

## Technique-by-Technique Breakdown

This section maps every part of the template to the technique it uses. Use this as your speaking notes when presenting.

### 1. **Role Assignment** — lines under `# ROLE`

> *"You are a senior Java engineer specializing in test-driven development. Your job is to generate clear, maintainable unit tests that follow team standards exactly — not to refactor or critique the source code."*

**What it does**: Sets the AI's persona and scope. The AI will write in the voice of someone who *cares about test quality*, and won't drift into refactoring suggestions or critiquing the source.

**Why it matters**: Without a role, the AI defaults to "helpful generalist." Tests written by a "senior Java engineer" persona consistently come out cleaner and more idiomatic than tests from no persona at all.

---

### 2. **Goal-First Writing** — `# GOAL` section

> *"Generate a complete JUnit 5 + Mockito test file for the class referenced below, achieving at least 80% line coverage with meaningful assertions (not coverage-padding tests)."*

**What it does**: One sentence that answers "what do I want back?" — placed before any context.

**Why it matters**: This is the single most underused technique. The AI now knows the deliverable in 25 words. Everything that follows is context for that goal, not a guessing game.

---

### 3. **Structured Context** — `# CONTEXT` section

> *"Project: order-service • Stack: Java 17, JUnit 5, Mockito 5 • Test conventions: <bullet points> • Coverage target: 80%"*

**What it does**: Bulleted facts about the project, stack, conventions, and standards. Not narrative — just signal.

**Why it matters**: The AI now knows everything a new team member would need to know before touching the codebase. Bullets are easier for the AI to parse than prose.

---

### 4. **Constraints** — `# CONSTRAINTS` section

> *"Do NOT modify the source class. Tests only. Do NOT use @SpringBootTest. Do NOT use Lombok in tests…"*

**What it does**: Explicit guardrails — what to do, what NOT to do, what's forbidden.

**Why it matters**: AI tools tend to "improve" things you didn't ask them to change. Negative constraints (`Do NOT…`) are as important as positive ones. Without these, expect surprises in the output.

---

### 5. **Few-Shot Examples** — `# EXAMPLES OF GOOD TEST METHOD NAMES` section

> *"cancelOrder_whenOrderIsAlreadyCancelled_throwsIllegalStateException…"*

**What it does**: Shows 5 concrete examples of the exact format/style you want.

**Why it matters**: Telling the AI to "use descriptive test names" is vague. Showing 5 examples in the exact `methodName_condition_expectedResult` format guarantees the output matches. **Few-shot prompting is the single highest-leverage technique** when you need a specific style.

---

### 6. **Chain-of-Thought** — `# THINK STEP BY STEP` section

> *"Before writing any code: 1. List every public method. 2. For each method, identify branches… 3. Group by happy path vs. edge case…"*

**What it does**: Forces the AI to reason through the problem before producing the answer.

**Why it matters**: When generating tests, AI without chain-of-thought tends to write tests for the methods it remembers and skip the harder ones. With CoT, the AI systematically enumerates everything first, which catches edge cases a junior dev would miss.

---

### 7. **Output Format Specification** — `# OUTPUT FORMAT` section

> *"Produce the response in this exact order: 1. A coverage plan (bullets) 2. The complete test file (one code block) 3. A short justification…"*

**What it does**: Defines the exact shape of the response — order, structure, and expected components.

**Why it matters**: Predictable output makes the template usable as part of a larger workflow (e.g., the team can copy the test file straight into their repo without parsing through commentary). Inconsistent formats break automation.

---

### 8. **Clarifying Questions (Bidirectional Interaction)** — `# CLARIFYING QUESTIONS` section

> *"Before producing output, ask me 1–3 questions if any of these are unclear… If a real trade-off exists, present 2 options with brief pros/cons and let me pick before writing."*

**What it does**: Tells the AI to converse, not just generate. When the input is ambiguous, the AI asks. When a real trade-off exists, the AI surfaces options.

**Why it matters**: Most prompt failures are silent — the AI guesses, you don't catch it, you ship a wrong answer. This block flips the dynamic from one-shot to dialogue. **It's the technique that makes the difference between "AI tool" and "AI collaborator."**

---

## Worked Example: Template Filled In

Here's how a developer would actually use this on a typical Monday:

```
[Open Copilot Chat in VS Code]

[Paste the template above, substituting the file references:]

# INPUT
The source class to test: #file:src/main/java/com/acme/orders/OrderService.java
Optional reference for style: #file:src/test/java/com/acme/orders/PaymentServiceTest.java

[Send.]
```

**What happens next** (per the CLARIFYING QUESTIONS directive):

> **AI**: Before I generate the tests, two quick questions:
>
> 1. I see `OrderService` has a `@Scheduled` method `cleanupExpiredOrders()`. Should this be unit-tested with mocked time, or excluded from coverage and tested via integration tests instead?
>
> 2. The class injects an `OrderEventPublisher` (Kafka). Should I mock it with verification (`verify(publisher).publish(...)`) or treat it as fire-and-forget?
>
> Once I have those, I'll proceed.

The developer answers, the AI confirms its plan, then produces:

1. A coverage plan (8 bullets — methods, scenarios, edge cases prioritized)
2. The complete `OrderServiceTest.java` (matches `PaymentServiceTest.java` style)
3. A short justification (notes which methods were excluded and why)

**Total dev time**: ~5 minutes prompt + ~3 minutes review = 8 minutes for a comprehensive test file that would have taken 60+ minutes to write by hand.

---

## Why This Composition Works

Each technique compensates for a different failure mode:

| Without this technique | The output would… |
|------------------------|-------------------|
| **Role** | Be technically correct but read like a tutorial, not production code |
| **Goal-first** | Take longer for the AI to figure out what's actually needed |
| **Structured context** | Use slightly wrong patterns (e.g., JUnit 4 style on a JUnit 5 project) |
| **Constraints** | Surprise you with refactoring, or use forbidden libraries |
| **Few-shot examples** | Have inconsistent test method names |
| **Chain-of-thought** | Skip edge cases the AI didn't immediately think of |
| **Output format** | Mix code with commentary in ways that break copy-paste |
| **Clarifying questions** | Silently guess at ambiguous things and ship wrong answers |

The composition is the point. Any one technique helps; eight together change the category of output you get.

---

## Variations / Adaptations

This template can be adapted to other test-generation contexts by changing:

- **Stack** (the CONTEXT section): TypeScript/Jest, Python/pytest, Go/testing, etc.
- **Framework conventions** (the CONSTRAINTS section): Vitest vs. Jest, table-driven vs. case-based tests
- **Style examples** (the EXAMPLES section): swap in your team's actual test naming conventions
- **Class type** (the GOAL section): swap "service class" for "API controller", "React component", "data transformer"

The 8-technique skeleton stays the same. Only the specifics change.

---

## How to Pitch This to a Team

If you're presenting this to a team meeting, here's the suggested arc:

1. **Lead with the time savings** — 60 min by hand vs. 8 min with the template, and the output is more consistent
2. **Show the template on screen** — let people see how dense it is
3. **Walk through the 8 techniques** — one per minute, using the breakdown above
4. **Show a live demo** — fill in the template, hit send, walk through the AI's questions and final output
5. **Make the close**: "Anyone on the team can use this without learning prompt engineering — the engineering is *in the template*. Let's build 5 of these for our most-repeated tasks."

That's the value proposition: **prompt engineering as a one-time investment that pays off every time anyone on the team needs the task done.**

---

*This template is a teaching artifact. Use it as the running example in a 15–20 minute presentation.*
