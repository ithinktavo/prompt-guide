# Build Your Own Meta-Prompt with AI

> **What this is**: A focused, hands-on guide that shows you how to use AI (GitHub Copilot Chat) to help you build a **reusable prompt-builder** — a single prompt file you can hand back to AI anytime in the future, and it will produce tailored, high-quality prompt templates for your specific use cases and deliverables.
>
> **Time**: ~45–60 minutes
>
> **Prerequisite**: Access to GitHub Copilot Chat (or any AI chat tool).

---

## The Big Idea — Three Layers

Most people think about AI prompts in one layer: *"I have a task, I write a prompt, AI does the task."* That works, but every task starts from scratch.

This guide teaches a **three-layer pattern** that compounds over time:

```
  ┌─────────────────────────────────────────────────────────────────┐
  │  LAYER 1 — Your Meta-Prompt (build it once, with AI's help)     │
  │  A markdown file you keep in your repo. It contains instructions │
  │  that turn any AI chat into a "prompt engineer for you."        │
  └─────────────────────────────┬───────────────────────────────────┘
                                │  paste it into AI chat
                                ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │  LAYER 2 — Template Prompts (AI generates these on-demand)      │
  │  AI interviews you about a specific use case, then produces a   │
  │  ready-to-use prompt template tailored to that exact task.      │
  └─────────────────────────────┬───────────────────────────────────┘
                                │  use the generated template
                                ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │  LAYER 3 — Actual Deliverables (AI produces the work)           │
  │  Code, tests, docs, reviews — whatever the task needs,          │
  │  produced consistently because the template was well-designed.  │
  └─────────────────────────────────────────────────────────────────┘
```

**Why bother?**
- You build Layer 1 **once, with AI's help**. You don't need to be a prompt engineering expert.
- Every time you face a new task, Layer 1 produces a high-quality Layer 2 template in a few minutes.
- Templates from Layer 2 produce consistent, standards-compliant work at Layer 3.
- Your team can all share Layer 1 — everyone gets the same quality without having to learn prompt engineering.

---

## How This Guide Works

Six hands-on exercises. Each one you'll:

1. **Read** a short explanation of what you're doing and why.
2. **Paste** a prompt into Copilot Chat.
3. **Iterate** with AI to refine the output.
4. **Save** the result into your meta-prompt file.

Before you start, create an empty file:

```bash
touch my-meta-prompt.md
```

Keep it open — you'll paste into it after each exercise.

---

## Exercise 1 — Define Your Target Use Case

### Why start here
Generic meta-prompts work, but **personalized ones work better**. Before you ask AI to help you build a meta-prompt, you need to know *what recurring task* you want to get better at automating.

Good candidates:
- A task you or your team do **at least weekly**
- Tasks with a recognizable pattern (unit tests, PR descriptions, client status updates, API scaffolds, migration scripts, bug reports)
- Tasks where the output needs to match a **standard** (team style, client template, compliance format)

### Your turn

Paste this into Copilot Chat:

```
I'm going to build a reusable "meta-prompt" — a single prompt file I'll
reference in the future so AI can generate tailored prompt templates for
me on demand.

Before I start building it, help me scope it correctly. Ask me 5–7
questions to figure out:

1. What specific use case or deliverable I want the meta-prompt to
   specialize in (e.g., "generating unit tests", "writing PR descriptions",
   "drafting client emails").
2. The typical inputs I have when starting the task (code files, tickets,
   requirements, etc.).
3. The typical outputs the task needs to produce (format, length, style).
4. The standards, constraints, or conventions the output must follow.
5. The audience or recipient of the output (teammates, clients, automated
   systems).

Ask the questions one at a time, wait for my answer before moving on, and
after each question briefly restate what you've learned so I can confirm
or correct.

At the end, produce a "scope summary" with all the info we gathered. I
will use that summary to build the meta-prompt itself.
```

### What you'll get
AI will interview you. Answer each question honestly — use a real task, not a hypothetical one. At the end, you'll have a scope summary that looks something like:

```
SCOPE SUMMARY
- Use case: Generating unit tests for Spring Boot service classes
- Inputs: A Java class file, existing test patterns in the project
- Outputs: A complete JUnit 5 test file with happy-path + edge cases
- Standards: Google Java Style, Mockito for mocking, 80% coverage target
- Audience: Internal dev team, reviewed by senior devs in PRs
```

### Save it
Paste the scope summary at the top of `my-meta-prompt.md` as a comment block. You'll reference it in the next exercises.

---

## Exercise 2 — Ask AI to Draft Your Meta-Prompt

### Why this works
You just gave AI a scope summary. Now you're asking it to write the first draft of your meta-prompt based on that scope. AI is *much* better at writing prompts when it has concrete context than when asked to write generic ones.

### Your turn

Paste this into the **same** Copilot Chat conversation (so AI still has the scope in memory):

```
Great. Now, based on the scope summary we just produced, draft a
meta-prompt for me.

A meta-prompt is a markdown file I'll paste into a future AI chat. When
pasted, it should turn that AI into a "prompt template generator" for my
specific use case.

The draft should include these sections:

1. SYSTEM INSTRUCTIONS — Tell the AI its role ("You are a prompt engineer
   specializing in [my use case]") and forbid it from solving the actual
   task (it only produces templates).

2. CLARIFYING QUESTIONS — 3–5 questions the AI should ask me to gather
   the specific details of a task instance (e.g., which class to test,
   what constraints, etc.).

3. CONFIRMATION STEP — After I answer, the AI should summarize its
   understanding and wait for my confirmation.

4. OUTPUT TEMPLATE STRUCTURE — Define the exact format of the prompt
   template the AI will produce. Use labeled sections (ROLE, GOAL,
   CONTEXT, INPUTS, CONSTRAINTS, OUTPUT FORMAT, CLARIFYING QUESTIONS).
   The CLARIFYING QUESTIONS section is critical — it tells the
   receiving AI to ask me 1–3 targeted questions BEFORE producing
   output when any input is ambiguous, and to surface
   options-with-pros/cons when a real trade-off exists. This makes
   every downstream interaction bidirectional instead of one-shot.

5. GUARDRAILS — 4–6 rules that keep the AI focused (e.g., "keep the
   generated template under 400 words", "don't solve the task yourself",
   "always include the CLARIFYING QUESTIONS section").

6. EXAMPLE — A short sample showing how a conversation using the
   meta-prompt would flow end-to-end, ending with a generated template.

Tailor everything to the scope summary. Output the full meta-prompt as
markdown I can paste directly into my file.
```

### What you'll get
A full meta-prompt, typically 200–400 lines of markdown, tailored to your use case. It won't be perfect yet — you'll fix it in later exercises.

### Save it
Paste the full output into `my-meta-prompt.md` (under the scope summary comment).

---

## Exercise 3 — Stress-Test Your Meta-Prompt

### Why this matters
A meta-prompt is only as good as its output. Before trusting it, you need to **run it against a real task** and see if the generated template is usable.

### Your turn

1. **Open a NEW Copilot Chat** (fresh context — this simulates how you'll use the file in the future).

2. Copy the **entire contents** of `my-meta-prompt.md` and paste it into the new chat.

3. The AI should immediately start asking you the clarifying questions your meta-prompt defined. Answer them using a **real, specific instance** of your use case.

4. Let the AI produce the generated template.

5. Now open a **third** Copilot Chat. Paste the generated template into it. Does it produce usable output?

### Evaluation checklist
- [ ] Did the AI ask the clarifying questions **before** producing the template?
- [ ] Were the questions the right ones (i.e., answering them gave enough context)?
- [ ] Did the AI wait for your confirmation before generating?
- [ ] Does the generated template use labeled sections (ROLE, GOAL, etc.)?
- [ ] When pasted into a new chat, does the template produce quality output?
- [ ] Does the output match your team's standards?

**If everything passes**: you're ready for Exercise 4.

**If something failed**: note exactly what went wrong. You'll fix it in the next exercise.

---

## Exercise 4 — Ask AI to Diagnose and Fix Problems

### Why this matters
The fastest way to improve a meta-prompt is to show AI exactly where it failed and ask AI to patch it. Do not manually rewrite — let AI do the work.

### Your turn

If Exercise 3 revealed issues, paste this into Copilot Chat:

```
Here is my meta-prompt:

[paste the entire meta-prompt]

I tested it with a real task and ran into these problems:

Problem 1: [describe what went wrong — e.g., "The AI skipped the
   clarifying questions and generated a template immediately."]
Problem 2: [another issue]
Problem 3: [another issue]

For each problem:
1. Diagnose the root cause — which section of the meta-prompt caused it?
2. Propose a specific fix — give me the exact text to add or change.
3. Explain why your fix will prevent the problem from recurring.

Do not rewrite the whole meta-prompt. Only suggest targeted edits.
```

### Apply the fixes
Go into `my-meta-prompt.md` and apply each suggested edit.

### Re-test
Run Exercise 3 again in a new chat. Iterate until every item on the checklist passes.

### Common problems and typical fixes

| Problem | Typical fix |
|---------|-------------|
| AI skips questions and generates template right away | Add "You MUST ask all clarifying questions before generating anything" to guardrails |
| Generated templates are too generic | Make the clarifying questions more specific to your use case |
| Template output is too long / too short | Add word count constraint in the OUTPUT TEMPLATE STRUCTURE section |
| AI solves the actual task instead of producing a template | Add explicit guardrail: "Do not solve the user's task. Only produce a template." |
| Generated template misses a critical section | Update the OUTPUT TEMPLATE STRUCTURE section with the missing section explicitly |

---

## Exercise 5 — Add Your Team's Context

### Why this matters
The base meta-prompt is generic. To make it truly powerful, you need to embed **your team's specific context** so every generated template inherits the right defaults.

### Your turn

Paste this into Copilot Chat:

```
I have a working meta-prompt (pasted below). I want to make it even more
useful by embedding my team's specific context so the generated templates
always inherit the right defaults.

Here's my team's context:

- Tech stack: [e.g., Java 17, Spring Boot 3.2, PostgreSQL 15, Angular 17]
- Coding standards: [e.g., Google Java Style, 80% coverage, no any types]
- Common libraries: [e.g., Mockito, Testcontainers, Lombok, MapStruct]
- Patterns we use: [e.g., repository pattern, CQRS, DTO mapping]
- Things to avoid: [e.g., field injection, raw SQL, nested ternaries]
- Deployment target: [e.g., AWS ECS, Kubernetes, on-prem]
- Client-facing conventions: [e.g., PR descriptions use a template,
  commits follow Conventional Commits]

Suggest 3–5 targeted edits to my meta-prompt that will bake this context
in so every generated template automatically references these defaults.
For each edit, give me the exact text to add and which section to put it in.

My meta-prompt:

[paste entire meta-prompt]
```

### Apply the edits
Update `my-meta-prompt.md` with the suggested changes.

### Optional — Multi-client setup
If you work on multiple client projects with different stacks:

1. Keep a **generic** meta-prompt in `prompts/my-meta-prompt.md`
2. Create **per-client overlays** in `prompts/clients/[client-name]/meta-prompt.md` that include the base prompt plus client-specific overrides

Or use AI to generate the client-specific version:

```
Take my base meta-prompt and produce a variant tailored to [CLIENT NAME],
whose stack/standards are: [paste client context]. Output only the
variant — I'll save it as a separate file.
```

---

## Exercise 6 — Operationalize It

### Why this matters
A meta-prompt sitting in a file on your laptop only helps you. Putting it where your team can use it — and where AI tools pick it up automatically — multiplies its value.

### Your turn

Pick one (or more) of these options based on the tools your team uses:

#### Option A — As a shared repo file (any tool)
Commit `my-meta-prompt.md` to your project repo at a predictable location:

```
your-repo/
└── prompts/
    ├── meta-prompt.md          ← your personalized meta-prompt
    └── README.md               ← usage instructions
```

Anyone on the team can copy-paste it into their AI chat.

#### Option B — GitHub Copilot custom instructions
If you want the meta-prompt **always active** in Copilot Chat for this project, put its key instructions in:

```
.github/copilot-instructions.md
```

Copilot automatically includes that file in every chat. Be selective about what you put there — it competes with other context.

#### Option C — Tool-specific reusable prompts
When your team gets access to newer tools, the meta-prompt can be saved as a reusable prompt that's triggered with a slash command:

| Tool | Location | Invocation |
|------|----------|------------|
| GitHub Copilot | `.github/prompts/meta-prompt.prompt.md` | `#meta-prompt` |
| Windsurf | `.windsurf/workflows/meta-prompt.md` | `/meta-prompt` |
| Claude Code | `.claude/skills/meta-prompt.md` | `/meta-prompt` |

The file contents are the same — only the storage location and invocation differ.

### Create a README for your team

Paste this into Copilot Chat:

```
Write a short README (under 200 words) for a prompts/ folder in our repo.
The folder contains a meta-prompt file (meta-prompt.md) that our team uses
to generate task-specific prompt templates.

The README should explain:
1. What the meta-prompt is and what it does
2. How a team member uses it (copy into AI chat, answer questions, get
   template)
3. When to use the generic meta-prompt vs. client-specific overlays
4. How to contribute improvements

Use a friendly, practical tone. Output only the README markdown.
```

Save the output as `prompts/README.md`, commit, and share.

---

## You're Done — What You Now Have

After these 6 exercises you have:

1. **`my-meta-prompt.md`** — your personalized, tested, team-context-aware meta-prompt
2. **A repeatable workflow**: paste meta-prompt → answer questions → get template → use template
3. **A distribution plan**: the meta-prompt lives where your team can access it

---

## The 3-Layer Pattern in Action (End-to-End Example)

Here's what using your meta-prompt looks like on a typical day.

> **Monday morning. You get a Jira ticket: "Add unit tests for OrderService."**

### Layer 1 → Layer 2
You open Copilot Chat, paste your meta-prompt.

> **AI**: Hi! I help generate prompt templates for unit testing Spring Boot services. A few questions:
> 1. Which class needs testing?
> 2. Are there existing tests in the same module I should match the style of?
> 3. Any specific edge cases you want prioritized?
> 4. What coverage target?
>
> **You**: OrderService in `src/main/java/com/acme/orders`. Yes, look at `PaymentServiceTest.java` for style. Focus on the `cancelOrder` and `refund` methods. 85% coverage.
>
> **AI**: *summarizes + confirms* → generates a 300-word template prompt.

### Layer 2 → Layer 3
You paste the generated template into a **new** chat, along with the `#file:OrderService.java` reference. AI produces a complete JUnit 5 test file that matches `PaymentServiceTest.java` style and hits your coverage target.

### Total time
- Before meta-prompt: 45 min of writing + iterating prompts.
- With meta-prompt: 5 min to generate template, 2 min to get tests. ~6x faster.

---

## Tips for Long-Term Success

1. **Review your meta-prompt monthly.** As your project evolves, so should the embedded context.
2. **Keep an improvements log.** When a generated template needs heavy editing, note it — that's feedback for the meta-prompt.
3. **Share what works.** If a teammate's meta-prompt variant produces better output, merge their improvements back.
4. **Don't over-engineer.** A 500-line meta-prompt is usually worse than a 200-line one. Every line should earn its keep.
5. **One meta-prompt per use case.** Resist the urge to make one giant meta-prompt that handles everything. Specialization wins.

---

## How This Fits the Bigger Picture

If you've gone through the [Complete Workbook](workbook.md), you've seen the concept of meta-prompts in Module 3. This guide is the **fast path**: build one good meta-prompt for your specific use case, in one sitting, with AI's help. Once you've done it once, you can do it for every recurring task type your team has.

**Related files in this repo:**
- [README.md](README.md) — overall navigation
- [workbook.md](workbook.md) — full 35-exercise curriculum (meta-prompts covered in Module 3)
- [meta-prompt.md](meta-prompt.md) — a polished, ready-to-use generic meta-prompt you can compare yours against
- [prompt-guide.md](prompt-guide.md) — one-page reference card with patterns and templates

---

*You're no longer writing prompts — you're teaching AI how to write prompts for you. That's the compound-interest skill.*
