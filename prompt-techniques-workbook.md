# The 12 Prompt Engineering Techniques

## A Complete Follow-Along Workbook for the Priority Builder Talk

> **What this workbook is**: a companion document to the talk *"From Prompt to Template: The Priority Builder Case Study."* It walks you through each of the 12 prompt engineering techniques demonstrated in the talk — with excerpts from Joey's actual prompt file, a 5-minute exercise for each, and a checklist you can use to audit any prompt of your own.
>
> **Time**: ~2 hours if you do every exercise. ~45 minutes if you read through and skip the exercises.
>
> **Prerequisite**: GitHub Copilot Chat (or any AI chat tool). A real task or code file you can practice on.
>
> **Read the talk deck or attend the talk first** for best results — this workbook assumes you've seen the overview. If you haven't, start with Chapter 1 below.

---

## How to Use This Workbook

The material is organized into five parts:

| Part | What It Does | How Long |
|------|--------------|----------|
| **1. Before You Start** | Context — Joey's story, the case study | 10 min read |
| **2. The 12 Techniques** | Deep dive on each technique + exercise | 80 min total |
| **3. Composition** | How the techniques compound when layered | 10 min read |
| **4. Synthesis** | Exercises applying what you learned | 20 min |
| **5. Reference** | Full priority builder file, glossary, tool setup | As needed |

Each technique chapter follows the same structure:

- **Definition** — one sentence
- **Why it matters** — what fails without it
- **In Joey's file** — actual excerpt showing the technique
- **Try it yourself** — a 5-minute exercise in Copilot Chat
- **Common pitfalls** — what tends to go wrong
- **When NOT to use it** — counter-cases

You can skip around. Each chapter is self-contained.

---

# PART 1 — BEFORE YOU START

## Chapter 1: The Case Study in 2 Minutes

Our colleague **Joey** built a prompt file to help him write his FY26 performance priorities. Instead of staring at the blank template like most of us do, he:

1. **Gathered three reference files** he already had access to:
   - `core_capabilities_manager.txt` — the rubric defining Level-7 behaviors
   - `unlocking_metrics.html` — the 30+ valid metric types
   - `example_of_priorities_ML7.md` — examples of well-written ML7 priorities

2. **Asked Copilot** to build a prompt file that would interview him, search his workspace for evidence, and produce polished priorities.

3. **Got back** a 287-line multi-phase coaching agent — `priority_builder_instructions_ai.md`.

4. **Now** writes every priority cycle in ~30 minutes instead of ~3 hours.

The prompt file he received is a **composition of 12 known prompt engineering techniques** layered together. This workbook is about understanding and applying each of those 12.

### The file's 6 phases

```
PHASE 1 — Initial Setup
    Greet user, ask how many priorities, which categories
PHASE 2 — 20 Questions
    Interview the user with 32 adaptive questions
PHASE 2.5 — Artifact Mining
    AI searches the user's workspace for evidence
PHASE 3 — Generate Versions
    Produces 3 variants per priority (Conservative/Balanced/Aspirational)
PHASE 4 — Iterative Refinement
    Pin elements, regenerate the rest, mix versions
PHASE 5 — Finalization
    Confirm complete; move to next priority
PHASE 6 — Final Output
    CSV (for the portal) + formatted doc (for review)
```

### What it produces (real excerpt)

```
PRIORITY 1: Client Value Creation — Platform Migrations
Level: Manager, ML7 | Status: Completed

Metrics:
| Non-Financial | Client Delivery     | 2 migrations, zero defects |
| Financial     | On Time/On Budget   | Within timeline and budget |
| Non-Financial | Client Partnership  | Restore client; renew      |

A — Accomplishments:
Delivered Java SpringBoot ECS-to-Lambda migration with the service
now fully serving production traffic. Executed HashiCorp Vault to
AWS Secrets Manager migration across Dev, QA, and Production...

B — Business Impact:
Transformed client relationship from "considering termination" to
"renewed for another year," preserving and extending a multi-year
engagement. Lambda migration eliminated legacy ECS infrastructure
costs...
```

**Publishable-quality output on first generation.** This is what 12 layered techniques produce.

> Full reproduction of Joey's file is in **Appendix B** at the end of this workbook. Flip to it any time you want to see a technique in context.

---

## Chapter 2: What You'll Know by the End

By the end of this workbook, you'll be able to:

1. **Name all 12 techniques** and explain what each does in plain language.
2. **Identify which techniques are used** in any prompt file you see.
3. **Audit a prompt you've written** and spot missing techniques.
4. **Write a prompt that composes 5+ techniques** without thinking about it.
5. **Explain to a teammate** why composing techniques beats picking one "magic" trick.

You will *not* be a prompt engineering expert. You will be someone who knows the patterns that make prompts reliable. That's enough for 95% of the work you'll ever need to do.

---

## Chapter 3: The 12 Techniques At a Glance

Before we dive in, here they all are. Don't try to memorize — this is just orientation.

| # | Technique | One-liner |
|---|-----------|-----------|
| 1 | **Role Assignment** | Tell the AI who it is before asking it to do anything |
| 2 | **Goal-First Writing** | State the deliverable in one sentence, up front |
| 3 | **Structured Context w/ Domain Knowledge** | Embed frameworks/taxonomies inline — don't assume AI knows them |
| 4 | **Multi-Phase Workflow** | Break complex tasks into explicit sequential phases |
| 5 | **Adaptive Question Bank** | Provide a library of questions + rules for when to ask which |
| 6 | **Manual RAG / Artifact Mining** | Have the AI read real files for evidence, not just your claims |
| 7 | **Multi-Persona / Multi-Version Generation** | Produce 2–3 variants, not one "best" answer |
| 8 | **Few-Shot Output Examples** | Show the exact shape of what you want back |
| 9 | **Iterative Refinement Loop** | Bake iteration into the workflow, not an afterthought |
| 10 | **Strict Multi-Format Output** | One output for the system, one for the human |
| 11 | **Tone & Style Directives** | Define voice, not just content |
| 12 | **Clarifying Questions (Bidirectional)** | Make the AI ask, not assume |

### Mental grouping

It helps to group them:

- **Foundational (use in nearly every prompt)**: 1, 2, 3
- **Structural (organize complex prompts)**: 4, 10
- **Interactive (make prompts conversational)**: 5, 9, 12
- **Quality-boosting (produce better output)**: 6, 7, 8, 11

If you only learn three techniques, learn **1, 2, and 12** — Role, Goal, and Clarifying Questions. Those three alone will measurably improve most of your prompts.

---

# PART 2 — THE 12 TECHNIQUES

> **Before you start Part 2**: open Copilot Chat in a separate window. You'll run a 5-minute exercise for each technique — do them live as you read. You'll retain 5x more than if you just read through.

---

## Technique 1 — Role Assignment

### Definition

Tell the AI who it is and what persona to adopt before asking it to do anything.

### Why it matters

Without a role, AI defaults to "generic helpful assistant." With one, the output sharpens: voice shifts, priorities align, and the AI evaluates choices through the specified lens.

**Career coach AI** writes different feedback than **generic AI**. **Senior backend engineer AI** writes different code than **"helpful AI."** The role shapes everything downstream.

### In Joey's file

```markdown
You are an expert career coach and performance management specialist
helping Accenture employees create compelling FY26 priorities with
ABCD reflections.
```

*(Line 9 — the first substantive line of the prompt.)*

Note the specificity. Not "a coach" — *"an expert career coach and performance management specialist"*. Not "employees" — *"Accenture employees"*. Specificity makes the persona sharper.

### Try it yourself (5 min)

Open Copilot Chat. Paste this prompt **without** any role:

```
Explain what this code does and suggest improvements:

function getUser(id) {
  return db.query("SELECT * FROM users WHERE id = " + id);
}
```

Note the response.

Now open a **fresh chat** and paste this prompt **with** a role:

```
You are a senior security engineer specializing in web application
security. Explain what this code does and suggest improvements:

function getUser(id) {
  return db.query("SELECT * FROM users WHERE id = " + id);
}
```

Compare the two outputs. The second should:
- Lead with the SQL injection vulnerability
- Suggest parameterized queries specifically
- Likely mention input validation, prepared statements, ORM
- Feel more urgent and precise

### Common pitfalls

- **Too generic** — "You are a developer" is only marginally better than no role. Aim for 2-3 qualifiers: *seniority + domain + specialty*.
- **Role conflicts with task** — don't make it "a career coach" if the task is writing code.
- **Role and goal separated** — put them in the first 2 sentences, not paragraphs apart.

### When NOT to use it

Almost never. Even for trivial one-off prompts, a role costs 10 words and consistently improves output.

### Your notes

*(Space for you to write your own observations or examples from your work.)*

---

## Technique 2 — Goal-First Writing

### Definition

State what you want back in one sentence, placed before any context.

### Why it matters

Most people bury the ask in paragraph 3. "I've been working on this project… and we use React… and there's this component… and it's slow… can you take a look?" By the time the AI gets to the real request, it's already context-soaked and hedging.

Leading with the goal is like subject-lining an email. The AI knows what "done" looks like in 15 words, and everything that follows is read *in service of that goal*.

### In Joey's file

```markdown
Your goal is to generate 2-3 high-quality priorities that will
position the user for success in their annual review.
```

*(Line 9, immediately after the role.)*

22 words. Includes the deliverable (2-3 priorities), the quality bar (high-quality), and the business purpose (annual review success).

### Try it yourself (5 min)

Write two versions of a prompt asking AI to improve an existing function.

**Version A (goal-buried):**

```
We have this function in our codebase. It's been in production for
6 months. Lately we noticed some issues with it — it seems slow
sometimes. The team uses Python 3.12 and FastAPI. There are a lot
of users hitting this endpoint. Can you help?
```

**Version B (goal-first):**

```
Reduce latency of the getUserOrders function below from ~800ms to
under 200ms. It's a FastAPI endpoint with ~10k requests/min.
```

Run both in Copilot Chat (paste the same function below each). Compare the directness and usefulness of the responses.

### Common pitfalls

- **Hedged goals** — "maybe help me improve this code?" is not a goal. "Improve the readability of this function" is.
- **Vague deliverables** — "help me with priorities" is not a goal. "Generate 3 priority descriptions" is.
- **Over-qualified** — "Generate priorities that are reasonable and thoughtful and also consider…" — just stop at the specific deliverable.

### When NOT to use it

If the task genuinely requires an interview before the goal is known (e.g., the AI needs to help you figure out *what* you want). But even then, make the meta-goal explicit: *"Help me figure out what to prioritize this cycle by asking me about my work."*

### Your notes

---

## Technique 3 — Structured Context with Domain Knowledge

### Definition

Embed the frameworks, taxonomies, and standards your task uses directly in the prompt — don't assume the AI knows them.

### Why it matters

AI training data doesn't include your company's priority framework. Or your team's specific testing conventions. Or your client's accepted metric definitions. When the AI doesn't know, it hallucinates — inventing plausible-sounding categories, labels, and structures that aren't real.

Embedding the domain knowledge inline forces the AI to use only your terminology. No invention. No drift.

### In Joey's file

```markdown
CONTEXT ABOUT ACCENTURE FY26 PRIORITIES:
- Every Accenture employee must set one priority in EACH of
  four categories
- The four FY26 priority categories are:
  1. Client Value Creation
  2. AI Enablement
  3. Great Place to Work for Reinventors
  4. Community

METRIC TYPES AVAILABLE:
NON-FINANCIAL:
- AI Proficiency / Skills
- AI Tool Usage
- Asset / Solution Development
- Client Partnership/Relationships
[... 20+ more ...]

FINANCIAL:
- Accurate Time/Expense Reporting
- On Time/On Budget Project Delivery
[... 2 more ...]
```

*(Lines 11-58.)*

Notice the structure: bullets, clear section headers, complete enumeration. Not "various categories including X, Y, etc." — **all of them, listed**.

### Try it yourself (5 min)

Pick a domain-specific framework you use daily. Examples:
- Your team's PR description template
- Your on-call severity levels (SEV-1, SEV-2, etc.)
- Your project's story-point definitions
- Your client's compliance rubric

Now write a prompt for a related task **without** the framework embedded, and another **with**.

Example pair for on-call severity:

**Without:**

```
A production alert just fired. What severity should this be?
The alert: "Database connection pool exhausted for 5 minutes."
```

**With:**

```
A production alert just fired. Classify severity.

Our severity definitions:
- SEV-1: Customer-facing outage or data loss (page on-call immediately)
- SEV-2: Degraded functionality affecting >10% of traffic
- SEV-3: Internal-only or affecting <10% of traffic
- SEV-4: Minor issue, no customer impact

The alert: "Database connection pool exhausted for 5 minutes."
```

Run both. The second will classify using YOUR definitions. The first will invent generic ones.

### Common pitfalls

- **Incomplete enumeration** — "The categories include X, Y, and others" → AI picks "others" and hallucinates. List them all.
- **Buried deep in the prompt** — domain knowledge should appear early, typically right after the goal.
- **Un-structured (prose instead of bullets)** — the AI parses bullets and structured lists better than paragraphs.

### When NOT to use it

For genuinely generic tasks that don't involve specialized vocabulary (e.g., "write a limerick"), skip it. Otherwise, always.

### Your notes

---

## Technique 4 — Multi-Phase Workflow

### Definition

Break a complex task into named, sequential phases. Each phase does one thing.

### Why it matters

Complex tasks fail when AI tries to do everything at once. You've seen this: you ask AI to "analyze this code and write tests and document it" and you get a mediocre version of all three.

Phases force the AI to finish each step before moving on. They also give the user natural checkpoints to validate progress mid-flow. ("Phase 2 is done — does the interview cover everything I needed?")

### In Joey's file

```markdown
YOUR PROCESS:
-------------
PHASE 1: INITIAL SETUP
PHASE 2: 20 QUESTIONS PER PRIORITY
PHASE 2.5: ARTIFACT MINING
PHASE 3: GENERATE PRIORITY VERSIONS
PHASE 4: ITERATIVE REFINEMENT
PHASE 5: FINALIZATION
PHASE 6: FINAL OUTPUT
```

*(Section headers throughout the file.)*

Each phase has its own sub-instructions. The AI works through them in order. The user sees progress.

### Try it yourself (5 min)

Take any task you'd normally ask AI in one prompt. Convert it to phases.

**Single-prompt version:**

```
Review this PR for security, performance, and readability issues,
then write a summary I can post as a review comment.
```

**Multi-phase version:**

```
You'll help me review this PR in 3 phases:

PHASE 1: Security review
Identify any security concerns (SQL injection, XSS, auth bypass,
exposed secrets). Report as a bullet list with severity.

PHASE 2: Performance review
Identify performance issues (N+1 queries, unnecessary allocations,
sync-in-async). Report as a bullet list with impact.

PHASE 3: Readability summary
Based on Phase 1 and 2 findings, write a 3-paragraph summary I can
post as a review comment. Lead with the critical issues.

Do the phases in order. After each phase, briefly confirm what
you found before moving to the next.
```

Compare outputs. The phased version produces organized, thorough reviews; the single prompt produces a mushy paragraph.

### Common pitfalls

- **Too many phases** — more than 6-7 is usually overkill. Combine or eliminate.
- **Phase boundaries unclear** — use ALL CAPS headers or explicit "PHASE 1:" labels. The AI needs to see them.
- **Phases in wrong order** — make sure each phase's inputs are outputs of earlier phases, not later ones.

### When NOT to use it

For simple tasks that are truly one thing ("translate this sentence to Spanish"). Phases add overhead that isn't worth it.

### Your notes

---

## Technique 5 — Adaptive Question Bank

### Definition

Give the AI a *library* of questions plus rules for when to ask which — rather than a rigid script.

### Why it matters

Rigid scripts produce robotic interviews. Every conversation starts to feel the same, and users disengage. An adaptive bank lets the AI skip irrelevant questions, dig deeper on weak answers, and stop when it has enough info.

This is the difference between a tax form and a good interviewer.

### In Joey's file

```markdown
PHASE 2: 20 QUESTIONS PER PRIORITY
For EACH priority they want to create, play "20 Questions" to
extract detailed information.

Ask questions conversationally, adapting based on their answers.
Don't ask all 20 if you have enough info.

QUESTION BANK (adapt these based on category):

DISCOVERY QUESTIONS (General):
1. "What's your current role and what do you work on day-to-day?"
2. "What's the biggest project or initiative you're working on this year?"
[... 30 more questions organized by category ...]
```

*(Lines 79-129.)*

Notice: Joey doesn't say "ask all 32 questions in order." He says *"here's a library — adapt based on the category and their answers."*

### Try it yourself (5 min)

Pick a task where you'd interview someone to gather requirements. Write 10 possible questions. Then write adaptation rules.

**Example for "requirements gathering for a new feature":**

```
Question bank:
Discovery:
1. What problem are users experiencing today?
2. How do users work around it now?
3. How often does this happen?

Scope:
4. Who is the target user of the feature?
5. What's the MVP vs. the nice-to-have?
6. Any constraints (regulatory, technical, timeline)?

Metrics:
7. How will we know the feature is successful?
8. What's the current baseline metric, if any?

Risk:
9. What could go wrong if we build this?
10. What could go wrong if we DON'T build this?

Adaptation rules:
- If the user is unclear on "who is the target user," stop and pursue
  that before going further.
- Skip Risk questions if the feature is clearly low-stakes.
- If the user mentions a metric, dig into it — ask for specific numbers
  and definitions.
- Stop asking when you can draft a user story with 80% confidence.
```

Run this pattern for one of your own tasks. Notice how adaptive rules change the conversation's feel.

### Common pitfalls

- **No adaptation rules** — just listing questions produces interrogation, not conversation.
- **Too many questions** — 30+ is fine if adaptive, 10 rigid questions is exhausting.
- **No "when to stop" rule** — the AI keeps asking. Add "Stop when you have enough info to proceed."

### When NOT to use it

For prompts where the user provides all info upfront (e.g., "here's my code, fix this bug"). Interviews add friction when context is already there.

### Your notes

---

## Technique 6 — Manual RAG / Artifact Mining

### Definition

Tell the AI to read real files from the user's workspace for evidence — rather than trusting only what the user types.

### Why it matters

This is the game-changer. In most prompts, you describe your work to the AI and hope the AI believes you. But descriptions drift, exaggerate, or miss details.

When the AI reads your actual files — your code, your commit history, your past reports — the output is **grounded in reality**. Numbers are real numbers. Accomplishments reference actual artifacts. No fluff.

This is **Retrieval-Augmented Generation** (RAG) done manually. Copilot's `#file:` and `@codebase` tags do this automatically; in this technique you're explicitly asking the AI to use them.

### In Joey's file

```markdown
PHASE 2.5: ARTIFACT MINING
Before generating versions, search the user's workspace for evidence:
- Use `find` or `glob` to locate relevant files
- Read presentations, READMEs, and code for metrics
- Validate claimed numbers against actual artifacts
- Extract quantifiable data from documents
```

*(Lines 131-136 — an entire dedicated phase.)*

Joey made this its own phase (2.5) to emphasize it runs *between* the interview (Phase 2) and generation (Phase 3). Evidence gets mined, then generation uses it.

### Try it yourself (5 min)

Open Copilot Chat in VS Code with a real project open. Pick a recent PR you wrote.

**Without RAG:**

```
Summarize what I changed in my last PR.
```

The AI has to guess. It'll produce a generic response.

**With RAG:**

```
#file:.git/HEAD #file:CHANGELOG.md

Run a git diff between my current branch and main. List the files
changed, the main code changes, and summarize the PR's purpose based
on the actual diff. Include specific file paths and function names
from the changes.
```

(In a real run, you'd use Copilot's git integration or explicitly paste the diff.)

The second response is grounded in actual changes — specific function names, real line counts, accurate file paths.

### Common pitfalls

- **Vague "search the workspace"** — tell the AI *what* to search for ("find files matching `*-test.md`", "look for metrics in any presentation").
- **No validation rule** — add "if the user's claim conflicts with what you find in the files, surface the discrepancy."
- **Over-reading** — don't tell the AI to read every file. Scope it: "read the 3 most recent PR descriptions in the `docs/` folder."

### When NOT to use it

For tasks where the AI doesn't need external evidence (explaining a concept, generating a code snippet from scratch). RAG adds a lookup step — only worth it when evidence improves the output.

### Your notes

---

## Technique 7 — Multi-Persona / Multi-Version Generation

### Definition

Ask the AI to produce **2-3 variants** of the answer on a spectrum, rather than one "best" version.

### Why it matters

Humans are bad at evaluating a single option in isolation ("is this good?"). Humans are great at comparing options ("which of these three feels right?").

Three variants turn a hard judgment call into an easy preference. You pick faster, and the final output is often better because you can see the spectrum of choices explicitly.

### In Joey's file

```markdown
PHASE 3: GENERATE PRIORITY VERSIONS
After gathering information, generate THREE different versions
of the priority:

VERSION A - CONSERVATIVE:
- Safe, achievable goals
- Standard metrics
- Moderate impact language

VERSION B - BALANCED:
- Ambitious but realistic goals
- Mix of quantitative and qualitative metrics
- Strong but honest impact statements

VERSION C - ASPIRATIONAL:
- Stretch goals that demonstrate high ambition
- Aggressive metrics and targets
- Maximum impact language
```

*(Lines 138-157.)*

Three versions on a risk/ambition spectrum. Users pick based on their tolerance that cycle.

### Try it yourself (5 min)

Pick a writing task you'd normally ask AI for. Generate one version, then three.

**Single version:**

```
Write an email to my manager requesting a 10% raise.
```

**Three versions:**

```
Write an email to my manager requesting a 10% raise, in three
versions:

VERSION A (Respectful / Low-pressure):
Gentle framing. Asks for a conversation. Easy to decline.

VERSION B (Confident / Direct):
States the request clearly. Provides 2-3 concrete justifications.
Opens dialogue.

VERSION C (Assertive / High-confidence):
States the request as an expectation. Heavy emphasis on
contributions and market data. Clear "here's what I want" stance.

Produce all three. Keep each under 200 words.
```

You'll find picking between three is way easier than evaluating one.

### Common pitfalls

- **Variants too similar** — make the spectrum explicit. If A and B read the same, widen the spread.
- **Forgetting the spectrum label** — name the axis (Conservative → Aspirational, Direct → Diplomatic, Short → Thorough). Otherwise readers can't tell what's different.
- **Too many versions** — 3 is the sweet spot. 5+ dilutes the comparison.

### When NOT to use it

For factual or deterministic tasks where there's one right answer ("what's the output of this code?"). Variants make sense only when there are genuine stylistic/strategic choices.

### Your notes

---

## Technique 8 — Few-Shot Output Examples

### Definition

Show the AI the **exact shape** of the desired output through 2-5 concrete examples, rather than describing the format in words.

### Why it matters

"Format it clearly" is vague — every AI interprets "clearly" differently. Showing 3-5 examples of the exact format you want locks in the pattern.

This technique is especially powerful for:
- Format-sensitive outputs (PR titles, commit messages, API contracts)
- Style-specific writing (team voice, client tone)
- Structured data (CSV rows, JSON objects, tables)

### In Joey's file

```markdown
Present all three versions in a clear table format like this:

PRIORITY: [Category Name] - [Short Title]

VERSION A (Conservative):
Priority Description: [detailed description]
Metrics: [1-3 metrics from the list]
Expected Value: [outcome]
---
ABCD Reflection:
A - Accomplishments: [what you did]
B - Business Impact: [measurable value]
C - Challenges Overcome: [obstacles]
D - Development & Learning: [skills gained]
```

*(Lines 161-180.)*

Joey could have said "format nicely" — instead he shows the exact skeleton. The AI now has a pattern to match.

### Try it yourself (5 min)

Pick a task with a specific output format. Write two prompts.

**Described format:**

```
Write a good commit message for: "Added retry logic to the payment
service when Stripe returns 503."
```

**Few-shot format:**

```
Write a commit message for this change, following our team's style.
Here are 3 examples of commits we consider well-written:

Example 1:
Change: Added retry logic to the payment service when Stripe returns 503
Message: fix(payments): add exponential backoff retry for Stripe 503 errors

Example 2:
Change: Updated user table to include last_login timestamp
Message: feat(db): add last_login column to users table

Example 3:
Change: Removed deprecated /v1/search endpoint
Message: chore(api): remove deprecated /v1/search endpoint

Now write a commit message for:
Change: Fixed double-email bug where users got two welcome messages on signup
```

The second version will match the `type(scope): description` pattern reliably. The first might or might not.

### Common pitfalls

- **Not enough examples** — one example can be ambiguous. Three is the minimum for reliable pattern-matching.
- **Examples too similar** — vary them. Show different types, scopes, styles so AI learns the *rule*, not one specific instance.
- **Examples don't match your actual need** — if your real task is bug fixes but your examples are all feature additions, the AI will generalize wrong.

### When NOT to use it

When the output format is genuinely open-ended and creativity is the point (e.g., "brainstorm product names"). Constraining it with examples narrows the creative space.

### Your notes

---

## Technique 9 — Iterative Refinement Loop

### Definition

Build iteration into the prompt workflow itself — with explicit options for the user to refine after the first draft.

### Why it matters

Most prompts stop at "produce the answer." But the first answer is rarely perfect. Smart prompt files treat the first output as a **draft** and give the user structured paths to refine:

- Keep the good parts, regenerate the rest
- Mix elements from different variants
- Answer more clarifying questions
- Start over with new info

Without this, the user has to figure out how to ask for improvements from scratch. With it, refinement is a menu pick.

### In Joey's file

```markdown
PHASE 4: ITERATIVE REFINEMENT
After showing all three versions, ask:
"Which version resonates with you most? Or would you like to mix
and match elements from different versions?"

Offer these options:
1. "I like Version [A/B/C] - use that one"
2. "Create a custom version combining elements I'll specify"
3. "Pin specific cells I like and regenerate the rest"
4. "Answer more questions to refine further"
5. "Start over with different information"
```

*(Lines 184-192.)*

The **"pin specific cells I like and regenerate the rest"** option is particularly powerful — it lets users keep 80% of the draft and regenerate only the 20% they didn't like.

### Try it yourself (5 min)

Take any prompt you've used recently. Add an iteration block at the end.

**Example — adding iteration to a code-gen prompt:**

```
(... your existing prompt ...)

After producing the code, ask me:
"Would you like to refine? Options:
1. Keep the code, regenerate the docstring
2. Keep the docstring, regenerate the code
3. Change the design approach entirely
4. Add specific features I'll describe
5. It's good, I'll take it."

Wait for my answer before doing anything else.
```

This transforms "accept or reject" into "refine via menu." You'll keep iterating longer, and each iteration will be targeted.

### Common pitfalls

- **Too many options** — 4-6 is the sweet spot. 10+ feels like a bureaucratic form.
- **No "I'm done" option** — always include one. Otherwise the loop never ends.
- **Refinement options too abstract** — "improve it" is useless. "Shorten to half length" is actionable.

### When NOT to use it

For one-shot tasks where iteration isn't expected ("translate this sentence"). Adds overhead that isn't worth it.

### Your notes

---

## Technique 10 — Strict Multi-Format Output

### Definition

Produce output in **two or more formats simultaneously** — typically one for downstream systems (CSV, JSON) and one for human review (formatted markdown).

### Why it matters

Real workflows have real constraints. The priority document has to go into a corporate portal (which wants CSV) *and* be reviewable by Joey (who wants readable markdown). Without this technique, he'd manually re-format — or worse, forget which format is canonical.

With it, the AI produces both in one pass. Same content, two shapes.

### In Joey's file

```markdown
PHASE 6: FINAL OUTPUT
When all priorities are completed, generate in TWO formats:

FORMAT 1 - CSV (Ready to Copy/Paste into Excel):
Priority,Prio Category,Metric,Value,Reflection-A,Reflection-B,
Reflection-C,Reflection-D,Status,Reviewer

CRITICAL CSV FORMATTING RULES:
- Use EXACT column headers as shown above (10 columns total)
- Wrap ALL cell values in double quotes
- Use comma as delimiter
- Keep line breaks WITHIN quotes for multi-line content
- Each priority = one row

FORMAT 2 - FORMATTED DOCUMENT (Human Readable):
═══════════════════════════════════════════════════════════
PRIORITY 1: [Category] - [Short Title]
═══════════════════════════════════════════════════════════

DESCRIPTION:
[...]

METRICS:
• [Metric 1]
• [Metric 2]

ABCD REFLECTIONS:
✅ ACCOMPLISHMENTS: [...]
💼 BUSINESS IMPACT: [...]
```

*(Lines 207-261.)*

Notice the **critical formatting rules** — Joey doesn't just say "CSV." He specifies column order, escaping, line-break handling. The AI follows the exact spec.

### Try it yourself (5 min)

Pick a task where output would plausibly go to two places. Try asking for both formats at once.

**Example — PR description for both GitHub and your tracking system:**

```
Produce the PR description in two formats:

FORMAT 1 - GitHub Markdown (for the PR body):
Use ## headers. Include sections: Summary, Why, How, Test Plan.

FORMAT 2 - Jira format (for the linked ticket):
Plain text, no headers. Start with "PR: [title]". Follow with
a one-paragraph summary (100 words max). End with "Link: [url]".

Produce both at the end.
```

The AI produces both; you paste each in its respective system. No reformatting needed.

### Common pitfalls

- **Format specs too loose** — "format it as JSON" produces inconsistent JSON. Specify the exact schema, field names, nesting.
- **Output order unclear** — specify which format comes first and use clear labels.
- **Too many formats** — stick to 2 or 3. 5 formats becomes unwieldy.

### When NOT to use it

When only one format is needed downstream. Don't add complexity without purpose.

### Your notes

---

## Technique 11 — Tone & Style Directives

### Definition

Define the **voice** the AI should use — not just what to say, but how to say it.

### Why it matters

Without tone directives, AI veers between "generic helpful" and "unnecessarily formal." For coaching use cases, client-facing content, or team-internal docs, a specific voice matters. Making it explicit locks it in across every interaction.

Voice isn't fluff. A career coach who sounds condescending is useless. A client email that's too casual is disrespectful. Tone shapes how the output is received.

### In Joey's file

```markdown
TONE & STYLE:
- Encouraging and supportive
- Professional but friendly
- Solution-oriented
- Celebrate their achievements
- Push for specificity without being pushy
- Make them feel confident about their priorities
```

*(Lines 276-283.)*

Six bullets. Each one is a behavioral directive — not abstract ("be nice") but specific ("celebrate their achievements", "push without being pushy").

### Try it yourself (5 min)

Pick a writing task. Run it with and without tone directives.

**Without:**

```
Write a Slack message to a teammate whose PR has 12 comments and
seems to be stuck. Encourage them to pick one and start moving.
```

**With:**

```
Write a Slack message to a teammate whose PR has 12 comments and
seems to be stuck. Encourage them to pick one and start moving.

Tone & style:
- Empathetic (this is stressful)
- Specific (reference actual examples of what to do)
- Solution-oriented (don't lecture — help)
- Conversational (they're a peer, not a subordinate)
- Short (under 80 words)
- No toxic positivity
```

The second message lands differently. Empathetic, actionable, peer-to-peer.

### Common pitfalls

- **Too abstract** — "friendly" is not a tone directive. "Warm; uses first names; includes a small joke if appropriate" is.
- **Conflicting tones** — "formal and casual" confuses the AI. Pick a lane.
- **No anti-examples** — add "avoid corporate jargon" or "no 'circle back' or 'synergy'" to rule out the most common drifts.

### When NOT to use it

For purely technical outputs (code, JSON, SQL) where there is no tone. Don't add fluff.

### Your notes

---

## Technique 12 — Clarifying Questions (Bidirectional)

### Definition

Make the AI **ask questions** when input is ambiguous, instead of silently guessing.

### Why it matters

The biggest differentiator between a "prompt" and a "prompt template." Without this, the AI silently guesses when inputs are unclear — and silent guesses produce subtly wrong output that the user doesn't catch until it's too late.

With this, the interaction becomes a conversation. The AI asks. You clarify. The output is grounded in shared understanding.

This is the **single highest-leverage technique most teams skip**.

### In Joey's file

```markdown
IMPORTANT GUIDELINES:
1. BE CONVERSATIONAL: Don't feel like you must ask all 20 questions.
   Stop when you have enough information.
2. ADAPT QUESTIONS: Based on their role (analyst, manager, etc.),
   tailor questions appropriately.
3. BE HONEST: If they haven't accomplished much yet, help them write
   forward-looking priorities with realistic reflections.
4. MATCH THEIR TONE: If they're formal, be formal. If casual, be casual.
5. PROVIDE EXAMPLES: When they're stuck, offer 2-3 concrete examples
   they can adapt.
```

*(Lines 265-275.)*

These aren't just "be nice" rules. They're **adaptive behavior rules**: when to stop, when to adapt, when to offer examples. All bidirectional.

### Try it yourself (5 min)

Write two versions of a prompt with ambiguous inputs.

**Without clarifying questions:**

```
Help me write a performance review for my direct report Maria.
```

(AI will guess about: Maria's level, her strengths, the time period,
the rating scale, format, etc.)

**With clarifying questions:**

```
Help me write a performance review for my direct report Maria.

Before producing anything, ask me up to 5 clarifying questions
covering: her role and tenure, the review period, her strengths
and areas for growth, any specific incidents to address, and
the target format (paragraph / bullet list / rubric). Wait for my
answers before generating the review.
```

The second version produces a targeted, accurate review. The first produces a generic one.

### Common pitfalls

- **"If needed, ask questions"** — too soft. AI rarely asks. Use *"ask up to N questions before producing output."*
- **Too many questions** — capping at 3-5 prevents interrogation.
- **No "stop when you have enough" rule** — without it, the AI may over-question.
- **Asking everything at once** — prefer one question at a time unless the user explicitly wants a single-batch interview.

### When NOT to use it

For prompts where the user has already provided complete context (e.g., "here's all the code and the failing test — fix it"). Clarifying questions here add friction, not value.

### Your notes

---

# PART 3 — COMPOSITION

## Chapter 16: Why Composition Beats Individual Techniques

You've now seen 12 techniques. Each one improves a specific dimension of output quality. The magic is when you **compose them** — that's what turns a prompt into a prompt file.

### The multiplier effect

Imagine four failure modes:
- **F1**: AI produces generic output (no role specified)
- **F2**: AI silently guesses on ambiguous input (no clarifying questions)
- **F3**: AI invents metrics that don't exist (no domain knowledge embedded)
- **F4**: AI's output format is inconsistent across runs (no few-shot examples)

Each failure mode has a single technique that prevents it:
- F1 → Role Assignment (#1)
- F2 → Clarifying Questions (#12)
- F3 → Structured Context (#3)
- F4 → Few-Shot Examples (#8)

**A prompt using only #1** eliminates F1 but suffers from F2, F3, F4.
**A prompt using all 4** eliminates all four failure modes.

Now extend this to 12 techniques. A prompt file that uses 10+ of them eliminates virtually all common failure modes. The output stops being mediocre and starts being **reliable**.

### Before / after, with one technique

**Prompt (role only)**:

```
You are a senior backend engineer. Help me write a PR description
for my auth refactor.
```

Typical output: reasonable but generic. Probably uses standard sections. May or may not match your team's style.

### Before / after, with eight techniques

**Prompt (roles + goal + context + constraints + few-shot + CoT + output format + clarifying)**:

```
(187 lines — the full Joey-style prompt file)
```

Typical output: matches your team's template exactly, references the actual Jira ticket, includes all required sections with correct voice, asks clarifying questions about edge cases, produces in the right format, ready to paste.

**The difference isn't marginal — it's categorical.** 12 techniques composed produces output that feels like it came from a skilled teammate who knows your conventions.

---

## Chapter 17: Auditing Your Own Prompts

Use this checklist on any prompt you've written recently. Check ✅ or ❌ for each technique.

### Your Prompt Audit

- [ ] **1. Role Assignment** — Does the prompt specify who the AI is?
- [ ] **2. Goal-First Writing** — Is the goal stated in the first sentence or two?
- [ ] **3. Structured Context** — Does it embed any domain-specific frameworks or taxonomies?
- [ ] **4. Multi-Phase Workflow** — If the task is complex, is it broken into phases?
- [ ] **5. Adaptive Question Bank** — If interview-style, are there adaptation rules?
- [ ] **6. Manual RAG** — Does the AI read real files where relevant?
- [ ] **7. Multi-Version Generation** — Does it produce variants when there are real choices?
- [ ] **8. Few-Shot Output Examples** — Does it show the exact output shape?
- [ ] **9. Iterative Refinement Loop** — Is iteration built in?
- [ ] **10. Strict Multi-Format Output** — Are output formats explicitly specified?
- [ ] **11. Tone & Style Directives** — Is voice defined?
- [ ] **12. Clarifying Questions** — Does it tell AI to ask before assuming?

**Scoring**:
- 0-3 checks: it's a one-shot prompt. Fine for throwaway use; don't rely on it.
- 4-7 checks: a decent prompt. Adding 2-3 more would meaningfully improve results.
- 8-11 checks: a real prompt file. Reusable. Shareable.
- 12 checks: you're operating at the Joey level.

---

# PART 4 — SYNTHESIS & APPLICATION

## Chapter 18: Post-Talk Exercises

These exercises let you practice what you learned. Pick one or more based on what fits your current work.

---

### Exercise A — Audit an Existing Prompt (15 min)

**Goal**: identify missing techniques in a real prompt you've used.

1. Find a prompt you've used recently. Could be:
   - A Copilot Chat message
   - A saved prompt file
   - A template shared by a teammate
2. Copy it into a text editor.
3. Use the Chapter 17 checklist. Mark each technique as ✅ or ❌.
4. For the top 3 missing techniques, write one sentence describing **how you'd add them**.
5. (Stretch) Actually add them. Test the improved version.

---

### Exercise B — Compose 4 Techniques Into a Mini-Prompt (20 min)

**Goal**: build a short prompt using 4 specific techniques.

1. Pick a simple task. Examples:
   - Generate a commit message
   - Summarize a meeting
   - Write a Slack announcement
2. Draft a short prompt using **exactly these four techniques**: #1 (Role), #2 (Goal-First), #8 (Few-Shot), #12 (Clarifying Questions).
3. Test it in Copilot Chat.
4. Now reduce to **just #2** (Goal-First only). Test that.
5. Compare the outputs. Write 2-3 sentences about what you notice.

**Example skeleton**:

```
ROLE: You are [specific role with 2-3 qualifiers].

GOAL: [One sentence describing what you want back.]

EXAMPLES of good output:
1. [Concrete example 1]
2. [Concrete example 2]
3. [Concrete example 3]

CLARIFYING QUESTIONS: If [specific inputs] are unclear, ask me
up to 2 questions before producing output.

Now: [the specific request].
```

---

### Exercise C — Spot Techniques in the Wild (15 min)

**Goal**: recognize techniques in prompts you didn't write.

1. Find a prompt from one of these sources:
   - A prompt shared on social media (LinkedIn, X)
   - A prompt from a paid AI tool's marketing
   - A prompt in your team's shared docs
   - The system prompt of a popular AI chatbot (many are public)
2. Annotate it — label each technique you see with `[T#]`.
3. Note which techniques are **missing** — what would make it better?
4. Share your annotations with a teammate. Discuss.

---

### Exercise D — Rewrite a Bad Prompt (20 min)

**Goal**: transform a weak prompt using the 12 techniques.

1. Start with this bad prompt:

```
hey can you help me write some tests for this code
```

2. Rewrite it using at least 8 of the 12 techniques. You can invent the context (what code, what language, what standards) — that's the point of the exercise.
3. Test both versions (original and your rewrite) against the same function.
4. Write a brief comparison: what did the 8 techniques add?

---

## Chapter 19: Applying This to Your Work

### Matching techniques to task types

Different task types benefit from different technique combinations. Here's a cheat sheet:

| Task Type | Essential Techniques |
|-----------|---------------------|
| **Writing (emails, docs, reports)** | 1, 2, 3, 7, 11 (Role, Goal, Context, Variants, Tone) |
| **Code generation** | 1, 2, 3, 6, 8, 12 (Role, Goal, Context, RAG, Few-Shot, Clarifying) |
| **Debugging** | 1, 2, 6, 9, 12 (Role, Goal, RAG, Iteration, Clarifying) |
| **Interview / requirements gathering** | 1, 4, 5, 12 (Role, Phases, Question Bank, Clarifying) |
| **Analysis / review** | 1, 2, 4, 7 (Role, Goal, Phases, Multi-Persona) |
| **Structured data generation** | 2, 3, 8, 10 (Goal, Context, Few-Shot, Multi-Format) |
| **Long-form workflow (like priorities)** | ALL 12 (the full compose) |

### The meta-skill

Over time, you stop thinking "which techniques should I use?" and start sensing it. The clues are in the task:

- *"This task has ambiguity"* → Clarifying Questions + Role
- *"The output has a specific format"* → Few-Shot Examples
- *"The task spans multiple steps"* → Multi-Phase Workflow
- *"The AI wouldn't know our lingo"* → Structured Context
- *"There are multiple reasonable answers"* → Multi-Version Generation

That sensing is the goal. Get there through reps: audit prompts, rewrite prompts, build prompt files. Five builds and you'll have the instinct.

---

# PART 5 — REFERENCE

## Appendix A: The 12 Techniques Quick-Reference Card

Cut this page out or print it. Use as a reminder while writing prompts.

```
┌─────────────────────────────────────────────────────────────────┐
│  THE 12 PROMPT ENGINEERING TECHNIQUES                           │
│  (from the Priority Builder case study)                         │
└─────────────────────────────────────────────────────────────────┘

FOUNDATIONAL (use in nearly every prompt)

1. ROLE ASSIGNMENT
   "You are a [specific role with 2-3 qualifiers]."

2. GOAL-FIRST WRITING
   "Your goal is to [specific deliverable] with [quality bar]."

3. STRUCTURED CONTEXT WITH DOMAIN KNOWLEDGE
   Embed frameworks, taxonomies, standards inline.
   Use bullets, not prose.

STRUCTURAL (for complex prompts)

4. MULTI-PHASE WORKFLOW
   PHASE 1: ... PHASE 2: ... PHASE 3: ...
   Each phase does one thing. In sequence.

10. STRICT MULTI-FORMAT OUTPUT
    Produce 2+ formats: one for the system,
    one for humans. Specify each exactly.

INTERACTIVE (for conversational prompts)

5. ADAPTIVE QUESTION BANK
    Library of Qs + adaptation rules.
    "Stop when you have enough info."

9. ITERATIVE REFINEMENT LOOP
    After draft, offer 4-5 refinement paths.
    Include "I'm done" as an option.

12. CLARIFYING QUESTIONS (BIDIRECTIONAL)
    "Before producing output, ask up to N
    questions if [inputs] are unclear."

QUALITY-BOOSTING (make output better)

6. MANUAL RAG / ARTIFACT MINING
   Tell AI to read real files for evidence.
   "Search for X. Validate against actual data."

7. MULTI-PERSONA / MULTI-VERSION GENERATION
   3 variants on a spectrum.
   Conservative / Balanced / Aspirational.

8. FEW-SHOT OUTPUT EXAMPLES
   Show 3-5 examples of the EXACT format.
   Don't describe — show.

11. TONE & STYLE DIRECTIVES
    6 bullets on voice. Include anti-examples.

┌─────────────────────────────────────────────────────────────────┐
│  MINIMUM PROMPT FILE: techniques 1, 2, 3, 8, 12                 │
│  GREAT PROMPT FILE: 10+ of the 12                               │
│  JOEY-LEVEL: all 12 composed intentionally                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Appendix B: Joey's Full Priority Builder File

The complete 287-line prompt file, reproduced verbatim. Use this as a reference example when building your own.

```markdown
---
trigger: manual
description: FY26 Priorities Builder - Interrogation agent for performance
             priorities
---

ACCENTURE FY26 PRIORITIES BUILDER AGENT
========================================

You are an expert career coach and performance management specialist
helping Accenture employees create compelling FY26 priorities with
ABCD reflections. Your goal is to generate 2-3 high-quality priorities
that will position the user for success in their annual review.

CONTEXT ABOUT ACCENTURE FY26 PRIORITIES:
-----------------------------------------
- Every Accenture employee (all levels) must set one priority in EACH
  of four categories
- The four FY26 priority categories are:
  1. Client Value Creation - How you create success for clients
  2. AI Enablement - How you use/develop AI skills and embed AI
  3. Great Place to Work for Reinventors - How you build exceptional teams
  4. Community - Corporate citizenship and community impact

- Each priority should have:
  * Clear description of what you'll accomplish
  * 1-3 measurable metrics (from predefined list)
  * Expected value/outcome
  * ABCD Reflection components:
    - A: Accomplishments (what you did)
    - B: Business Impact (measurable value created)
    - C: Challenges Overcome (obstacles navigated)
    - D: Development & Learning (skills gained)

METRIC TYPES AVAILABLE:
-----------------------
NON-FINANCIAL:
- AI Proficiency / Skills
- AI Tool Usage
- Asset / Solution Development
- Client Partnership/Relationships
- Community Board/Committee
- Community Volunteering
- High Quality Deliverables / Client Delivery
- Inclusive Programming / Initiatives
- Innovation
- Mentorship/People Leadership
- Office/Network Involvement
- One Accenture
- Other (Non-Financial)
- Project-Specific KPIs (Non-Financial)
- Recognition & Feedback
- Recruiting Events/Campaigns
- Reinvention Console / KX Contributions
- Skills/Specializations/Learning
- Social & Environmental Citizenship
- Team Engagement Survey / Actions

FINANCIAL:
- Accurate Time/Expense Reporting
- On Time/On Budget Project Delivery
- Other (Financial)
- Project-Specific KPIs (Financial)

YOUR PROCESS:
-------------

PHASE 1: INITIAL SETUP
1. Greet the user warmly and explain you'll help them create 2-3
   compelling FY26 priorities
2. Ask: "How many priorities would you like to create today?
   (Recommended: 2-3)"
3. Ask: "Which priority categories are you most interested in
   focusing on? Choose from:
   - Client Value Creation
   - AI Enablement
   - Great Place to Work for Reinventors
   - Community
   Or say 'help me decide' if you're unsure."

4. If they need help deciding, ask 3 quick discovery questions:
   - "What's your current role and level at Accenture?"
   - "What are your career goals for this year?"
   - "What type of work do you enjoy most?"
   Then recommend 2-3 categories based on their answers.

PHASE 2: 20 QUESTIONS PER PRIORITY
For EACH priority they want to create, play "20 Questions" to
extract detailed information.
Ask questions conversationally, adapting based on their answers.
Don't ask all 20 if you have enough info.

QUESTION BANK (adapt these based on category):

DISCOVERY QUESTIONS (General):
1. "What's your current role and what do you work on day-to-day?"
2. "What's the biggest project or initiative you're working on this year?"
3. "What skills are you trying to develop or strengthen?"
4. "What impact do you want to have on your team or clients?"
5. "What challenges are you currently facing in your work?"

CLIENT VALUE CREATION QUESTIONS:
6. "Who are your main clients and what problems are you solving for them?"
7. "What deliverables are you responsible for?"
8. "How do you measure success with your clients?"
9. "What makes your client relationships successful?"
10. "What innovative solutions are you bringing to client work?"

AI ENABLEMENT QUESTIONS:
11. "Which AI tools do you currently use?"
12. "How are you integrating AI into your daily work?"
13. "What AI skills do you want to develop?"
14. "Are you helping others learn about AI? How?"
15. "What AI-related certifications or training are you pursuing?"

GREAT PLACE TO WORK QUESTIONS:
16. "Do you manage or mentor anyone? How many people?"
17. "How are you contributing to team culture and engagement?"
18. "What diversity, equity, and inclusion initiatives are you involved in?"
19. "How do you support career development for others?"
20. "What employee engagement activities do you lead or participate in?"

COMMUNITY QUESTIONS:
21. "What volunteer activities are you involved in?"
22. "Do you participate in any Accenture community initiatives or ERGs?"
23. "What causes are you passionate about?"
24. "How do you give back to your local community?"
25. "Are you involved in pro bono work or skills-based volunteering?"

METRICS & MEASUREMENT QUESTIONS:
26. "What specific numbers or metrics can you track?
     (%, time saved, revenue, NPS, etc.)"
27. "How will you know you've been successful?"
28. "What tangible outcomes are you aiming for?"

ABCD REFLECTION QUESTIONS:
29. "What have you already accomplished toward this goal?"
30. "What business impact have you made so far?"
31. "What obstacles have you overcome or anticipate overcoming?"
32. "What are you learning through this work?"

PHASE 2.5: ARTIFACT MINING
Before generating versions, search the user's workspace for evidence:
- Use `find` or `glob` to locate relevant files
- Read presentations, READMEs, and code for metrics
- Validate claimed numbers against actual artifacts
- Extract quantifiable data from documents

PHASE 3: GENERATE PRIORITY VERSIONS
After gathering information, generate THREE versions:

VERSION A - CONSERVATIVE:
- Safe, achievable goals
- Standard metrics
- Moderate impact language

VERSION B - BALANCED:
- Ambitious but realistic goals
- Mix of quantitative and qualitative metrics
- Strong but honest impact statements

VERSION C - ASPIRATIONAL:
- Stretch goals that demonstrate high ambition
- Aggressive metrics and targets
- Maximum impact language

Present all three versions in a clear table format like this:

PRIORITY: [Category Name] - [Short Title]

VERSION A (Conservative):
Priority Description: [detailed description]
Metrics: [1-3 metrics from the list]
Expected Value: [outcome]
---
ABCD Reflection:
A - Accomplishments: [what you did]
B - Business Impact: [measurable value]
C - Challenges Overcome: [obstacles]
D - Development & Learning: [skills gained]

VERSION B (Balanced):
[same structure]

VERSION C (Aspirational):
[same structure]

PHASE 4: ITERATIVE REFINEMENT
After showing all three versions, ask:
"Which version resonates with you most? Or would you like to mix
and match elements from different versions?"

Offer these options:
1. "I like Version [A/B/C] - use that one"
2. "Create a custom version combining elements I'll specify"
3. "Pin specific cells I like and regenerate the rest"
4. "Answer more questions to refine further"
5. "Start over with different information"

PHASE 5: FINALIZATION
Once they're happy with a priority, ask:
"Great! Are you ready to move to the next priority, or would you
like to refine this one further?"

PHASE 6: FINAL OUTPUT
When all priorities are completed, generate in TWO formats:

FORMAT 1 - CSV (Ready to Copy/Paste into Excel):
Priority,Prio Category,Metric,Value,Reflection - Accomplishments,
Reflection - Business Impact,Reflection - Challenges Overcome,
Reflection - Development & Learning,Status,Reviewer

CRITICAL CSV FORMATTING RULES:
- Use EXACT column headers as shown above (10 columns total)
- Wrap ALL cell values in double quotes
- Use comma as delimiter
- Keep line breaks WITHIN quotes for multi-line content
- Each priority = one row

FORMAT 2 - FORMATTED DOCUMENT (Human Readable):
═══════════════════════════════════════════════════════════
PRIORITY 1: [Category] - [Short Title]
═══════════════════════════════════════════════════════════

DESCRIPTION: [Full priority description]

METRICS:
• [Metric 1]
• [Metric 2]

EXPECTED VALUE: [Expected outcome]

ABCD REFLECTIONS:
✅ ACCOMPLISHMENTS (What I Did):
[Detailed accomplishments]

💼 BUSINESS IMPACT (Value Created):
[Measurable business impact with numbers]

⚡ CHALLENGES OVERCOME (Obstacles Navigated):
[Challenges and solutions]

📚 DEVELOPMENT & LEARNING (Skills Gained):
[Professional growth and learning]

STATUS: [In Progress/Completed/Not Started]
REVIEWER: [enterprise.id]

IMPORTANT GUIDELINES:
1. BE CONVERSATIONAL: Don't feel like you must ask all 20 questions.
   Stop when you have enough information.
2. ADAPT QUESTIONS: Based on their role (analyst, manager, etc.),
   tailor questions appropriately.
3. QUANTIFY EVERYTHING: Push for specific numbers and measurable outcomes.
4. USE STAR METHOD: Help them structure accomplishments using
   Situation, Task, Action, Result.
5. BE HONEST: If they haven't accomplished much yet, help them write
   forward-looking priorities with realistic reflections.
6. MATCH THEIR TONE: If they're formal, be formal. If casual, be casual.
7. ENCOURAGE AMBITION: Gently push them toward Balanced or Aspirational.
8. HIGHLIGHT STRENGTHS: Point out impressive aspects they might be underselling.
9. PROVIDE EXAMPLES: When they're stuck, offer 2-3 concrete examples.
10. KEEP IT REAL: Ensure reflections are believable and authentic.

TONE & STYLE:
- Encouraging and supportive
- Professional but friendly
- Solution-oriented
- Celebrate their achievements
- Push for specificity without being pushy
- Make them feel confident about their priorities

NOW BEGIN:
Start by greeting the user and beginning Phase 1. Remember: you're
a helpful coach, not an interrogator.
```

---

## Appendix C: Glossary

Quick definitions for every term used in this workbook.

**Prompt** — A single instruction you type into an AI chat.

**Prompt file** — A reusable, multi-section instruction document. What Joey built. Larger and more structured than a one-off prompt.

**Meta-prompt** — A prompt that generates other prompts. The Priority Builder is a meta-prompt — it interviews you and produces a tailored prompt for your specific priorities.

**Role Assignment** — Technique #1. Telling the AI who it is.

**Goal-First Writing** — Technique #2. Stating the deliverable in the first sentence.

**Structured Context** — Technique #3. Embedding frameworks/taxonomies directly in the prompt.

**Multi-Phase Workflow** — Technique #4. Breaking complex tasks into explicit phases.

**Adaptive Question Bank** — Technique #5. Library of questions plus adaptation rules.

**Manual RAG** — Technique #6. Telling the AI to read real files for evidence. "Retrieval-Augmented Generation" done explicitly.

**Multi-Persona / Multi-Version Generation** — Technique #7. Producing 2-3 variants on a spectrum.

**Few-Shot Prompting** — Technique #8. Including 2-5 input/output examples in the prompt.

**Iterative Refinement Loop** — Technique #9. Offering explicit refinement options after the first draft.

**Multi-Format Output** — Technique #10. Producing content in multiple specified formats simultaneously.

**Tone & Style Directives** — Technique #11. Explicit voice rules.

**Clarifying Questions (Bidirectional)** — Technique #12. Making the AI ask when input is ambiguous.

**Artifact Mining** — Joey's term for Technique #6. Same thing as manual RAG.

**Chain-of-Thought** — Asking the AI to "think step by step." Related to Technique #4 but distinct — CoT is about *reasoning steps*, phases are about *workflow steps*.

**Frontmatter** — The YAML block at the top of a markdown file (between `---` lines). Required for Windsurf workflows and Claude Code skills, optional for Copilot prompt files.

**Hallucination** — When AI confidently produces output that's plausible-sounding but incorrect. Mitigated by Techniques #3 (Structured Context), #6 (Manual RAG), and #12 (Clarifying Questions).

**Prompt injection** — A security concern where user input is interpreted as instructions. Not directly addressed in these 12 techniques, but relevant if you're building public-facing prompts.

---

## Appendix D: Tool-Specific Setup

If you want to **save your prompt file** so you can invoke it with a shortcut, here's where each tool looks for it.

### GitHub Copilot Chat (VS Code)

```
your-repo/
├── .github/
│   ├── copilot-instructions.md        ← Always-on rules (optional)
│   └── prompts/
│       └── [task-name].prompt.md      ← Your prompt file
└── (rest of repo)
```

**Required**: filename ends in `.prompt.md`.

**To invoke**: in Copilot Chat, type `#[task-name]`. Copilot autocompletes from your file list.

---

### Windsurf (Cascade)

```
your-repo/
├── .windsurf/
│   ├── rules/
│   │   └── team-standards.md          ← Always-on rules (optional)
│   └── workflows/
│       └── [task-name].md             ← Your workflow
└── (rest of repo)
```

**Required frontmatter**:

```markdown
---
name: task-name
description: What this workflow does
---
```

**To invoke**: type `/[task-name]` in Windsurf Chat.

---

### Claude Code (terminal)

```
your-repo/
├── CLAUDE.md                          ← Project-wide context (optional)
├── .claude/
│   ├── settings.json                  ← Hooks, MCP servers (optional)
│   └── skills/
│       └── [task-name].md             ← Your skill
└── (rest of repo)
```

**Required frontmatter**:

```markdown
---
name: task-name
description: What this skill does
---
```

**To invoke**: type `/[task-name]` in Claude Code.

---

### Any tool (fallback)

```
your-repo/
└── prompts/
    ├── README.md                       ← Brief usage instructions
    └── [task-name].md                  ← Your prompt file
```

**To invoke**: open the file, copy contents, paste into any AI chat.

---

## Appendix E: Further Reading

### Going deeper on specific techniques

- **promptingguide.ai/techniques** — comprehensive taxonomy of prompting techniques, including advanced ones not covered here (Self-Consistency, Tree of Thoughts, ReAct, Reflexion, etc.).
- The main prompt engineering guide PDF (`prompt-engineering-guide.pdf`) — 31 hands-on exercises across 9 modules.

### Books worth reading

- *"Prompt Engineering for Generative AI"* (O'Reilly) — broader treatment with more advanced techniques.
- *"The AI Prompt Playbook"* (various) — pragmatic patterns for everyday use.

### Courses

- Anthropic's prompt engineering tutorial (free, on their site)
- Deep Learning AI's ChatGPT Prompt Engineering for Developers (free, Coursera)

### Communities

- The promptengineering subreddit
- Your internal #ai-tools channel (start one if it doesn't exist)

---

## Appendix F: Printable One-Page Checklist

Print this page and keep it at your desk.

```
═══════════════════════════════════════════════════════════
  THE 12 TECHNIQUES — ONE-PAGE AUDIT CHECKLIST
═══════════════════════════════════════════════════════════

Score your prompt file. Check each one.

FOUNDATIONAL
─────────────────────────────────────────────
[ ]  1. ROLE ASSIGNMENT
        Specific role with 2-3 qualifiers? Not "an AI."

[ ]  2. GOAL-FIRST WRITING
        Deliverable stated in first 2 sentences?

[ ]  3. STRUCTURED CONTEXT WITH DOMAIN KNOWLEDGE
        Frameworks, taxonomies, standards embedded?
        Used bullets, not prose?

STRUCTURAL
─────────────────────────────────────────────
[ ]  4. MULTI-PHASE WORKFLOW
        If complex, broken into labeled phases?

[ ]  10. STRICT MULTI-FORMAT OUTPUT
         Output formats specified exactly?
         CSV headers? JSON schema? Spelled out?

INTERACTIVE
─────────────────────────────────────────────
[ ]  5. ADAPTIVE QUESTION BANK
        If interview-style, has a library + adaptation rules?
        Includes "stop when enough info"?

[ ]  9. ITERATIVE REFINEMENT LOOP
        After draft, offers 4-5 refinement options?
        Includes "I'm done"?

[ ]  12. CLARIFYING QUESTIONS (BIDIRECTIONAL)
         Tells AI to ask before assuming?
         Caps at 1-3 questions?

QUALITY-BOOSTING
─────────────────────────────────────────────
[ ]  6. MANUAL RAG / ARTIFACT MINING
        Tells AI to read real files for evidence?
        Specifies what to look for?

[ ]  7. MULTI-PERSONA / MULTI-VERSION GENERATION
        Produces 2-3 variants on a spectrum?

[ ]  8. FEW-SHOT OUTPUT EXAMPLES
        Shows 3-5 concrete examples of exact format?

[ ]  11. TONE & STYLE DIRECTIVES
         Voice defined in 4-6 behavioral bullets?
         Includes at least one anti-example?

═══════════════════════════════════════════════════════════
  SCORING
═══════════════════════════════════════════════════════════

0-3 checks:  One-shot prompt. Fine for throwaway.
4-7 checks:  Decent prompt. 2-3 additions would help.
8-11 checks: Real prompt file. Reusable. Shareable.
12 checks:   Joey-level. You're operating at the top.

═══════════════════════════════════════════════════════════
```

---

## Final Note

The 12 techniques aren't 12 tricks. They're 12 ways of thinking about what AI needs to succeed at your task.

The shortcut isn't remembering which one to use. It's developing the **instinct** that senses when a prompt is incomplete — that hears the word "ambiguous" and reaches for Clarifying Questions, that hears "new framework" and reaches for Structured Context.

You build that instinct through reps. Audit prompts. Rewrite prompts. Build prompt files. Five builds and you'll feel it.

Then you'll be the Joey of your team.

---

*Workbook authored April 2026. Companion to the talk "From Prompt to Template: The Priority Builder Case Study." Free to use for learning purposes only.*
