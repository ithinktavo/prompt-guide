# Build Your Own Prompt File

## A Hands-On Workbook Inspired by the Priority Builder Case Study

> **What this is**: A self-contained workbook that walks you, step by step, through building a custom prompt file for one of *your* recurring tasks — using the same pattern Joey used to build the Priority Builder.
>
> **What you'll produce**: A reusable, tested prompt file you can share with your team and run any time the task comes up.
>
> **Time**: ~90 minutes end-to-end. Each step takes 5–15 minutes and can be done separately.
>
> **Prerequisite**: GitHub Copilot Chat (or any AI chat tool) and a recurring task you're willing to template.

---

## The Pattern, in One Picture

```
  REFERENCES          +        COPILOT         =     YOUR PROMPT FILE
  (docs you already                                  (paste into chat,
   have)                                              use every cycle)

  • Templates                                         287 lines.
  • Standards docs          "Using these,             6 phases.
  • Example outputs          help me build            32 questions.
  • Past work                 a prompt that...         Ready to share.
```

**The insight**: you don't need to be a prompt-engineering expert. You just need to ask AI to help you build the expert, once. Then you use that expert forever.

---

## What Joey Did (The Full Walkthrough)

Joey had to write his FY26 performance priorities. Instead of staring at the template, here's exactly what he did. Every part of the workbook below is a generalization of these moves.

### What he gathered (the references)

Three files he already had access to:

```
joeys-folder/
├── core_capabilities_manager.txt   ← What "Level 7" behaviors look like
├── unlocking_metrics.html          ← The 30+ valid metric types
└── example_of_priorities_ML7.md    ← Example priorities at his level
```

**Sample of `core_capabilities_manager.txt`** (the rubric):

```
High-Level Thinking
Thinks creatively and critically

Innovation - Level 7
- Actively identifies or pursues innovative opportunities/approaches
  to create and deliver client (internal and external) value
- Ensures that team's work is innovative and creates value for the client

Critical Thinking - Level 7
- Applies Accenture offerings and/or best practices to work
- Thoroughly synthesizes, distills and reconciles key findings...
```

**Sample of `unlocking_metrics.html`** (the taxonomy):

```
NON-FINANCIAL METRICS:
- AI Proficiency / Skills
- AI Tool Usage
- Asset / Solution Development
- Client Partnership/Relationships
- Community Volunteering
- High Quality Deliverables / Client Delivery
- Innovation
- Mentorship/People Leadership
... (30+ types)

FINANCIAL METRICS:
- Accurate Time/Expense Reporting
- On Time/On Budget Project Delivery
- Other (Financial)
- Project-Specific KPIs (Financial)
```

**Sample of `example_of_priorities_ML7.md`** (a few real ML7 priorities):

```
AI Enablement | Manager, ML7
Priority: Lead AI innovation and research workstream

Description:
Identify innovative AI topics for client opportunities, leveraging
Accenture Research knowledge and sources. Work collaboratively with
innovation hub workstream to bring and deliver relevant content...

Categories | Metrics | Targets
Non-Financial | Innovation | Identify 5 innovation opportunities
Non-Financial | KX Contributions | Share 3 innovations through the RC
Non-Financial | AI Proficiency / Skills | Contribute to AI pipeline
```

> Notice the pattern: each reference contributes something distinct. The capabilities doc tells the AI **what to look for**. The metrics taxonomy gives the AI a **valid-options menu**. The example file shows the AI what **good looks like**.

### What he asked Copilot

Roughly this (paraphrased — the exact prompt has been lost to history but the shape is clear):

```
I have to write my FY26 performance priorities. I've attached three
reference files: my capabilities rubric, the valid metrics taxonomy,
and example priorities at my level (ML7).

Help me build a prompt file that, when pasted into a future AI chat,
will:
1. Interview me about my work this cycle
2. Search my workspace for evidence of accomplishments
3. Produce 2-3 priorities per category in the ABCD format
4. Output both a CSV (for the corporate portal) and a formatted doc
   (for my own review)

Make it multi-phase, conversational, and reusable. Use proper
prompt engineering techniques.
```

### What he got back

A 287-line markdown file with **6 explicit phases** (Initial Setup → 20 Questions → Artifact Mining → Generate Versions → Iterative Refinement → Finalization → Final Output), embedding the metric taxonomy inline, asking 32 adaptive questions, generating 3 versions per priority (Conservative / Balanced / Aspirational), and producing both CSV and formatted-doc outputs.

> **The full priority builder file is reproduced in Appendix E** — flip to it as you work through the steps for a complete reference.

### What it produces when he runs it

A polished priority document. Excerpt of one priority it generated:

```
═══════════════════════════════════════════════════════════
PRIORITY 1: Client Value Creation — Platform Migrations
Level: Manager, ML7 | Status: Completed
═══════════════════════════════════════════════════════════

Priority Title: Deliver critical platform migrations and secure
contract renewal

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
costs and simplified the operational footprint...

C — Challenges Overcome:
Inherited a team with zero completed deliverables, a removed previous
Tech Lead, and active client doubt about the engagement's viability...

D — Development & Learning:
Deepened expertise in serverless architecture patterns (Lambda
optimization, ECS-to-Lambda migration strategies) and AWS security
services...
```

> See **Appendix E** for the full priority builder file (the source). See the worked example in **Appendix G** for a step-by-step build of a different, simpler prompt file (PR descriptions).

**This workbook is about doing that for any recurring task of yours.**

---

## The 12 Techniques You're Aiming For

Joey's prompt file uses 12 distinct prompt engineering techniques layered together. A good prompt file should use most of these. Don't memorize them — you'll see them as you build:

1. **Role Assignment** — tell the AI who it is
2. **Goal-First Writing** — one-sentence deliverable up front
3. **Structured Context with Domain Knowledge** — embed frameworks/taxonomies inline
4. **Multi-Phase Workflow** — break complex tasks into explicit phases
5. **Adaptive Question Bank** — library of questions + rules for when to ask
6. **Manual RAG / Artifact Mining** — have the AI read real files for evidence
7. **Multi-Persona / Multi-Version Generation** — produce 2–3 variants, not one "best"
8. **Few-Shot Output Examples** — show the exact shape of the answer
9. **Iterative Refinement Loop** — bake iteration into the workflow
10. **Strict Multi-Format Output** — one for the system, one for human review
11. **Tone & Style Directives** — set the voice explicitly
12. **Clarifying Questions (Bidirectional)** — make the AI ask, not assume

> **Reference card** at the end of this workbook has these expanded with examples.

---

## How to Use This Workbook

Each of the 8 steps below follows the same pattern:

- **WHY THIS STEP MATTERS** — the reasoning
- **WHAT TO DO** — plain-language instructions
- **🎯 SUGGESTED PROMPT** — a copy-paste prompt to give Copilot
- **WHAT YOU SHOULD GET BACK** — expected output shape
- **REVIEW CHECKLIST** — how to tell if the step worked
- **SAVE / COMMIT** — where the output goes

Have a file called `my-prompt-file.md` open and empty as you work. You'll paste into it after each step.

> **No recurring task in mind?** See **Appendix A — Task Candidates** at the end of this workbook for 10 options, then come back here.

---

# STEP 1 — Identify Your Recurring Task

### Why this matters

A prompt file only pays off if you use it repeatedly. Task selection is the most important decision in this workbook — a well-picked task produces a reusable asset; a poorly picked one produces a one-off novelty.

### What to do

Think about a task that:
- You do **at least once a month** (weekly is even better)
- Has a **recognizable pattern** (same rough shape every time)
- Requires the output to **match a standard** (team style, client format, compliance rubric)
- Is **cheap to re-run** if a draft is imperfect (i.e., you can regenerate without consequence)

Good candidates:
- Writing PR descriptions
- Generating unit tests for a new class
- Drafting client status reports
- Writing technical documentation from code
- Creating migration scripts
- Writing performance priorities (like Joey)
- Drafting incident post-mortems
- Creating ADRs (architecture decision records)

### 🎯 SUGGESTED PROMPT

```
I want to build a reusable prompt file for one of my recurring tasks.
Help me pick the best one.

Here are some candidate tasks I do regularly:
- [TASK 1 — e.g., writing PR descriptions for bug fixes]
- [TASK 2 — e.g., generating unit tests for Spring Boot services]
- [TASK 3 — e.g., writing weekly client status emails]
- [TASK 4 — your own]
- [TASK 5 — your own]

For each task, evaluate it on:
1. FREQUENCY — how often I do this task
2. PATTERN — how repeatable the task shape is
3. STANDARD — whether the output must match a known format/rubric
4. AVAILABLE REFERENCES — whether I likely have templates, examples,
   or standards docs I can provide
5. RISK — whether a poor first draft is cheap to fix

Rate each HIGH / MEDIUM / LOW on each dimension. Recommend the top 2
candidates with a one-sentence rationale each.
```

### What you should get back

A table like:

| Task | Frequency | Pattern | Standard | References | Risk | Recommendation |
|------|-----------|---------|----------|------------|------|----------------|
| PR descriptions | HIGH | HIGH | MEDIUM | HIGH | LOW | ★ Top pick |
| Unit tests | HIGH | HIGH | HIGH | MEDIUM | LOW | ★ Top pick |
| Client emails | MEDIUM | MEDIUM | LOW | LOW | MEDIUM | Skip |

### Review checklist

- [ ] The AI rated all your candidates on all 5 dimensions
- [ ] At least one candidate got HIGH on 4+ dimensions
- [ ] The top pick has clear references you can gather

### Save / commit

At the top of `my-prompt-file.md`, add a comment block:

```markdown
<!--
TARGET TASK: [your top pick, one line]
FREQUENCY: [how often]
OUTPUT STANDARD: [format/rubric it must match]
-->
```

---

# STEP 2 — Gather Your References

### Why this matters

This is the single highest-leverage step. The quality of your prompt file is bounded by the quality of references you feed it. Joey's 3 reference files (capabilities doc, metrics taxonomy, example priorities) are why his prompt file isn't generic.

### What to do

Find every existing artifact related to your chosen task. You're looking for:

1. **Templates** — what the final output is supposed to look like (blank forms, starter docs, example outputs)
2. **Standards / rubrics** — what "good" is measured against (style guides, review checklists, acceptance criteria)
3. **Taxonomies / frameworks** — canonical lists (valid metric types, severity levels, category labels)
4. **Examples** — 2–3 pieces of past work that were considered high-quality
5. **Anti-examples (optional)** — examples of work that needed rework, with notes on why

Put them all in one folder. Name it clearly (e.g., `prompt-refs-pr-descriptions/`).

### 🎯 SUGGESTED PROMPT

If you're unsure what references exist, use this prompt:

```
I want to build a prompt file for this task: [DESCRIBE THE TASK].

Before I start writing the prompt, help me identify what reference
material I likely have (or should gather) to make the prompt
grounded and team-specific.

Suggest:
1. What templates, forms, or blank starters likely exist for this task
2. What standards docs, rubrics, or style guides my team probably has
3. What taxonomies or canonical lists I should include
4. What kinds of example outputs I should collect (how many, what quality)
5. Any anti-examples that would help AI understand what NOT to do

For each suggestion, tell me where in a typical company I'd find it
(wiki, repo, shared drive, etc.) and what to do if I can't find it.
```

### What you should get back

A checklist of reference types tailored to your task, with suggestions on where to find each.

### Review checklist

- [ ] You have at least 2 concrete reference files collected (3+ is better)
- [ ] At least one is an **example** of the desired output
- [ ] At least one defines the **standard** or **format**
- [ ] They're all in one folder, not scattered

### Save / commit

Add to your workbook comment block:

```markdown
<!--
REFERENCES:
- [file 1 description]
- [file 2 description]
- [file 3 description]
-->
```

If you don't have enough references, pause here and gather more before continuing. Shortcutting this step produces weak prompt files.

---

# STEP 3 — Scope the Prompt File (AI Interview)

### Why this matters

Generic prompt files are weak. Joey's is strong because he scoped it to a *specific* use case (FY26 priorities at ML7) before asking AI to write it. You'll do the same — let AI interview you to clarify the scope before drafting anything.

### What to do

Open Copilot Chat in VS Code. Attach your reference files (`#file:ref1.md`, `#file:ref2.md`, etc.) if possible. Paste the prompt below and answer the AI's questions honestly. The conversation is the point.

### 🎯 SUGGESTED PROMPT

```
I'm going to build a reusable "prompt file" — a set of instructions I'll
paste into AI chats to help me with a recurring task.

Before I start building it, help me scope it correctly.

My target task: [ONE-LINE DESCRIPTION]

I've attached my reference files for context: [LIST YOUR #file references]

Ask me 5–8 questions to scope the prompt correctly. Cover:

1. The specific USE CASE — what "done" looks like
2. The typical INPUTS I'll have when using the prompt (code, tickets,
   free-text descriptions, etc.)
3. The typical OUTPUTS the prompt should produce (format, length, style,
   where the output goes)
4. The STANDARDS and CONSTRAINTS the output must follow
5. The AUDIENCE for the output (internal, external, client, automated system)
6. COMMON VARIATIONS I need the prompt to handle
7. ANY EDGE CASES or failure modes I've seen in the past

Ask the questions ONE AT A TIME. Wait for my answer. After each answer,
briefly restate what you've learned so I can confirm or correct.

At the end, produce a SCOPE SUMMARY with all the info we gathered.
I'll use that summary in the next step to build the prompt file.
```

### What you should get back

An interview that progresses through 5–8 questions, ending with a structured scope summary:

```
SCOPE SUMMARY
- Use case: [one sentence]
- Inputs: [what the user will provide]
- Outputs: [format + where they go]
- Standards: [rubric / rules]
- Audience: [who reads the output]
- Variations: [common branches]
- Edge cases: [known pitfalls]
```

### Review checklist

- [ ] The AI asked questions one at a time (not all at once)
- [ ] You provided specific examples — not generic answers
- [ ] The scope summary is 5–10 bullet points of concrete detail
- [ ] Another developer could understand your task from the summary

### Save / commit

Paste the scope summary at the top of `my-prompt-file.md` (after the comment block). This is your source of truth for the next step.

---

# STEP 4 — Draft the Prompt File

### Why this matters

You now have everything needed: references + scope. Ask AI to synthesize them into a first draft of the prompt file. The AI writes the initial structure — you refine it in later steps.

### What to do

Continue the same Copilot Chat conversation (so AI still has the scope and references in memory). Paste the prompt below.

### 🎯 SUGGESTED PROMPT

```
Great. Now, based on the scope summary we produced and the references
I've shared, draft my prompt file.

The prompt file is a markdown file I'll paste into a future AI chat to
help me with the task. When pasted, it should turn the AI into an
expert assistant for my specific use case.

Use this structure (adapt as needed for my task):

1. ROLE ASSIGNMENT — Tell the AI who it is (e.g., "You are a senior
   [domain] specialist helping [audience] with [task]")

2. GOAL — One sentence describing what the AI will produce

3. CONTEXT / DOMAIN KNOWLEDGE — Embed the frameworks, taxonomies, and
   standards from my references directly in the prompt. Don't assume
   AI knows them.

4. MULTI-PHASE WORKFLOW — Break the task into 3–6 explicit phases.
   Each phase does one thing. Give each a clear header.

5. CLARIFYING QUESTIONS / INTERVIEW PHASE — In the first phase, have
   the AI ask me questions to gather details about the specific instance
   of the task I'm doing right now.

6. ARTIFACT MINING (if applicable) — Tell the AI to search my workspace
   for evidence (files, code, past work) to ground the output.

7. GENERATION PHASE — Where the AI produces the output. Use few-shot
   examples of the desired output format. If useful, have it produce
   2–3 variants on a spectrum (conservative/balanced/aspirational).

8. ITERATION PHASE — Ask the AI to offer refinement options after the
   first draft (pin parts, regenerate rest, mix-and-match, etc.).

9. FINAL OUTPUT PHASE — Specify the EXACT output format(s). If the
   output goes to a system (CSV, JSON, portal), specify the format
   precisely. If it also goes to a human for review, produce a
   formatted version too.

10. GUARDRAILS — 4–6 rules the AI must always follow (e.g., "Do not
    make assumptions — ask if unclear", "Keep each priority under
    200 words", "Only use terminology from the provided taxonomy").

11. TONE & STYLE — 3–5 bullets defining the voice (encouraging,
    professional, concise, etc.).

Tailor everything to the scope and references. Output the full prompt
file as one markdown block I can paste directly into a file.
```

### What you should get back

A 150–350-line markdown file with labeled sections. It won't be perfect — you'll stress-test it next.

### Review checklist

- [ ] Has a ROLE section with a specific persona (not "helpful assistant")
- [ ] Has a one-sentence GOAL near the top
- [ ] Contains domain knowledge from your references embedded inline
- [ ] Has 3+ labeled PHASE sections
- [ ] Has a CLARIFYING QUESTIONS directive somewhere
- [ ] Specifies output format explicitly
- [ ] Has a GUARDRAILS section with 4+ rules
- [ ] Has a TONE section with 3+ bullets

If any of these are missing, ask the AI to add them before proceeding.

### Save / commit

Paste the full output into `my-prompt-file.md`. This is your **v1 draft**. Don't polish it yet.

---

# STEP 5 — Stress-Test It

### Why this matters

A prompt file is untested until you've used it against a real task. Most first-draft prompt files have at least 2–3 issues that only surface in use.

### What to do

Open a **fresh** Copilot Chat (new conversation — important, this simulates how teammates will use your file with no prior context).

Copy the entire contents of `my-prompt-file.md` and paste it into the new chat. The AI should respond as the assistant you defined — starting with whatever the first phase calls for (usually a greeting + clarifying questions).

Answer the questions using a **real instance** of your task. Walk through the full workflow. Get to the final output.

### 🎯 SUGGESTED PROMPT

You don't need a prompt here — you're running the prompt file itself. But when you reach the end, ask:

```
The prompt file worked for this run. Before I call it done, help me
evaluate its quality. Look at the output you produced and rate the
prompt file on:

1. CLARITY — were any instructions ambiguous?
2. COMPLETENESS — did it cover all phases thoroughly?
3. CONSISTENCY — would a different AI (or a second run) produce
   similar quality?
4. RIGOR — did the CLARIFYING QUESTIONS section actually prevent
   you from making silent assumptions?

For each dimension rated anything less than EXCELLENT, suggest one
specific change to the prompt file to fix it.
```

### Evaluation checklist

As you walked through the prompt file, did the AI:

- [ ] Start with Phase 1, not jump ahead?
- [ ] Ask clarifying questions *before* producing output?
- [ ] Stay in the specified persona (voice/tone)?
- [ ] Use only terminology from the reference material?
- [ ] Produce output in the exact specified format?
- [ ] Offer iteration options at the end?
- [ ] Stop when it had enough info (not interrogate you)?

### Save / commit

Note every issue you found. Copy the AI's evaluation into a section at the bottom of `my-prompt-file.md` called `<!-- V1 TEST NOTES -->`. You'll fix them in Step 6.

If everything passed (rare for a v1): skip to Step 7.

---

# STEP 6 — Diagnose and Fix Problems

### Why this matters

The fastest way to improve a prompt file is to show AI exactly where it failed and let AI fix it. You do not need to manually rewrite the prompt.

### What to do

In a **new** Copilot Chat, paste the prompt below. Include both the current prompt file and the test notes from Step 5.

### 🎯 SUGGESTED PROMPT

```
Here is a prompt file I'm building: [PASTE ENTIRE PROMPT FILE]

I tested it with a real task and found these problems:

Problem 1: [describe what went wrong — e.g., "The AI produced output
   before asking clarifying questions."]
Problem 2: [another issue]
Problem 3: [another issue]

For each problem:
1. DIAGNOSE the root cause — which section of the prompt file caused it?
2. PROPOSE a specific fix — give me the exact text to add, remove,
   or change, including which section to put it in.
3. EXPLAIN why your fix will prevent the problem from recurring.

Do NOT rewrite the whole prompt file. Only suggest targeted edits.
```

### What you should get back

A list of diagnosis → fix pairs, with exact text edits.

### Common problems and their fixes

| Problem | Typical fix |
|---------|-------------|
| AI skips clarifying questions | Add to guardrails: "You MUST ask all Phase 1 questions before generating anything." |
| AI produces generic output | Make domain knowledge section more specific; add anti-examples |
| Output format is inconsistent | Add explicit few-shot example of the exact format |
| AI invents data that isn't in the references | Add a rule: "Only use terminology and data from the provided references. If unsure, ask." |
| AI is too verbose | Add word/length constraints to each phase |
| AI won't iterate when user asks | Strengthen Phase 4 with explicit iteration options |
| AI doesn't adapt to user's role/context | Add "role-aware tailoring" to Phase 2 |

### Apply the fixes

Go into `my-prompt-file.md` and apply each suggested edit. Don't batch — do them one at a time and keep notes on each change.

### Re-test

Run Step 5 again in a new chat. Iterate until every checklist item passes.

### Save / commit

When all issues are resolved, remove the `<!-- V1 TEST NOTES -->` block.

---

# STEP 7 — Apply Your Team's Context

### Why this matters

The base prompt file works. To make it great, bake in your **team's specific context** so every generated output inherits the right defaults — without the user having to remember them.

### What to do

Paste this into Copilot Chat. Include your current prompt file.

### 🎯 SUGGESTED PROMPT

```
My prompt file works. Now I want to embed my team's specific context
so every generated output automatically reflects the right defaults.

Here's my team's context:

TECH STACK:
- [e.g., Java 17, Spring Boot 3.2, PostgreSQL 15]

CODING / WRITING STANDARDS:
- [e.g., Google Java Style, Conventional Commits, Airbnb style guide]

PATTERNS WE USE:
- [e.g., repository pattern, DTO mapping, Conventional Commits]

COMMON LIBRARIES / TOOLS:
- [e.g., Mockito, Testcontainers, Lombok]

THINGS TO AVOID:
- [e.g., field injection, raw SQL, inline styles]

CLIENT-FACING CONVENTIONS (if applicable):
- [e.g., PR descriptions use a specific template, status reports
   go into a specific format]

TEAM / DEPARTMENT QUIRKS:
- [e.g., we always include a "Risks" section even if empty,
   we use PST for all dates]

Here is my current prompt file: [PASTE ENTIRE PROMPT FILE]

Suggest 3–5 targeted edits to embed this context. For each suggestion:
- Name the exact section of the prompt file to modify
- Give me the exact text to add or change
- Explain the impact on the output

Do NOT rewrite the whole prompt file. Only suggest targeted edits.
```

### What you should get back

3–5 specific, surgical edits with rationale.

### Apply the edits

Update `my-prompt-file.md`. Save a copy of the generic version first (as `my-prompt-file-generic.md`) — you may want to customize for multiple teams/clients later.

### Multi-client note

If you work on multiple client projects with different stacks:

1. Keep a **generic** prompt file as your baseline
2. Create **client-specific overlays** that extend the baseline with client-specific context
3. Name them clearly: `my-prompt-file-[client-name].md`

Or ask AI to produce the variant:

```
Take my base prompt file and produce a variant tailored to [CLIENT
NAME], whose stack/standards are: [paste client context]. Output only
the variant — I'll save it as a separate file.
```

---

# STEP 8 — Operationalize and Share

### Why this matters

A prompt file that lives on your laptop helps only you. Putting it where your team can use it — and where your AI tool picks it up automatically — multiplies its value.

### What to do

Pick one (or more) of the options below based on the tools your team uses.

### Option A — Shared repo file (works with any tool)

Commit the prompt file to your project repo at a predictable location. The simplest layout:

```
your-repo/
├── prompts/
│   ├── README.md                   ← Short usage instructions
│   ├── pr-description.md           ← Your prompt file (rename to your task)
│   ├── unit-tests.md               ← Add more as you build them
│   └── status-report.md
└── (rest of your repo)
```

Anyone on the team copy-pastes the contents of the file into their AI chat. **No tool-specific setup required** — works in Copilot Chat, Windsurf, Claude Code, ChatGPT, Gemini, anywhere.

### Option B — GitHub Copilot prompt files (recommended for Copilot users)

If your team uses GitHub Copilot in VS Code, prompt files can be invoked with a `#name` shortcut. Layout:

```
your-repo/
├── .github/
│   ├── copilot-instructions.md    ← Always-on team standards (optional)
│   └── prompts/
│       ├── pr-description.prompt.md
│       ├── unit-tests.prompt.md
│       └── status-report.prompt.md
└── (rest of your repo)
```

The `.prompt.md` extension is required. Naming the file `pr-description.prompt.md` makes it triggerable as `#pr-description` in Copilot Chat.

**To use it**: open Copilot Chat in VS Code, type `#pr-description` (or whatever you named it), then add any task-specific context, then send.

### Option C — Windsurf workflows

If your team uses Windsurf, save the file as a workflow. Layout:

```
your-repo/
├── .windsurf/
│   ├── rules/
│   │   └── team-standards.md       ← Always-on team rules (optional)
│   └── workflows/
│       ├── pr-description.md
│       ├── unit-tests.md
│       └── status-report.md
└── (rest of your repo)
```

Each workflow file should start with YAML frontmatter:

```markdown
---
name: pr-description
description: Generate a PR description following team standards
---

# (rest of your prompt file content goes here)
```

**To use it**: in Windsurf Chat, type `/pr-description` and Cascade will run the workflow.

### Option D — Claude Code skills

If your team uses Claude Code, save the file as a skill. Layout:

```
your-repo/
├── CLAUDE.md                       ← Project-wide instructions (optional)
├── .claude/
│   ├── settings.json               ← Hooks, MCP servers (optional)
│   └── skills/
│       ├── pr-description.md
│       ├── unit-tests.md
│       └── status-report.md
└── (rest of your repo)
```

Each skill file should start with YAML frontmatter:

```markdown
---
name: pr-description
description: Generate a PR description following team standards
---

# (rest of your prompt file content goes here)
```

**To use it**: in Claude Code, type `/pr-description` and the skill runs.

### Quick reference: tool → file path → trigger

| Tool | Where the file goes | How to invoke it |
|------|---------------------|-----------------|
| Generic / any tool | `prompts/[name].md` | Copy-paste contents into chat |
| GitHub Copilot Chat | `.github/prompts/[name].prompt.md` | `#[name]` |
| Windsurf | `.windsurf/workflows/[name].md` | `/[name]` |
| Claude Code | `.claude/skills/[name].md` | `/[name]` |

### 🎯 SUGGESTED PROMPT — Create a README for your team

```
Write a short README (under 200 words) for the prompts/ folder in our
repo. The folder contains a prompt file called [FILENAME] that my team
uses for the task: [ONE-LINE TASK DESCRIPTION].

The README should explain:
1. WHAT the prompt file does (in plain language)
2. HOW a team member uses it (exact steps — paste where? answer what?)
3. WHEN to use it vs. writing a prompt from scratch
4. HOW to contribute improvements (where to file issues, how to test changes)

Use a friendly, practical tone. Output only the README markdown.
```

### Commit and share

```bash
git add prompts/ .github/prompts/ .windsurf/workflows/ .claude/skills/
git commit -m "Add prompt file for [task]"
git push
```

Then post in your team chat: *"Added a prompt file for [task]. Paste it into your AI chat next time you need to do this — feedback welcome."*

---

# You're Done — What You Now Have

After these 8 steps you have:

1. **`my-prompt-file.md`** — your custom, tested, team-context-aware prompt file
2. **A repeatable workflow** — paste prompt → answer questions → get output
3. **A distribution plan** — the file lives where your team can access it
4. **A README** — so teammates know how and when to use it

And — if you used it once for real — **hours of time saved on the next cycle**.

---

# REFERENCE CARD — The 12 Techniques at a Glance

Use this to audit your prompt file. A good one uses most of these.

| # | Technique | What it looks like in a prompt |
|---|-----------|-------------------------------|
| 1 | **Role Assignment** | `You are a senior [domain] specialist helping [audience] with [task].` |
| 2 | **Goal-First Writing** | `Your goal is to generate [specific deliverable] that [quality bar].` |
| 3 | **Structured Context** | `The valid categories are: 1. X  2. Y  3. Z. The standard format is...` |
| 4 | **Multi-Phase Workflow** | `PHASE 1: INTERVIEW. PHASE 2: GENERATE. PHASE 3: REFINE.` |
| 5 | **Adaptive Question Bank** | `Here are 20 possible questions. Ask conversationally. Stop when you have enough.` |
| 6 | **Manual RAG** | `Before generating, search the workspace for [filename pattern] and read those files for evidence.` |
| 7 | **Multi-Version Generation** | `Produce VERSION A (conservative), VERSION B (balanced), VERSION C (aspirational).` |
| 8 | **Few-Shot Output Examples** | `Format like this: [show exact template]` |
| 9 | **Iterative Refinement Loop** | `After showing the draft, ask: "Which version resonates? Pin parts to keep? Regenerate what?"` |
| 10 | **Strict Multi-Format Output** | `Produce: 1) CSV with exact columns: X,Y,Z  2) Markdown doc for review.` |
| 11 | **Tone & Style Directives** | `Tone: encouraging, professional, concise. Avoid: jargon, hedging, overclaim.` |
| 12 | **Clarifying Questions** | `If any input is ambiguous, ask 1–3 questions BEFORE producing output. Don't guess silently.` |

---

# APPENDIX A — Task Candidates (if you don't have one in mind)

10 recurring tasks that fit the prompt-file pattern well. Pick one, work through Steps 1–8 with it.

| Task | References you likely have | Rough complexity |
|------|---------------------------|------------------|
| PR description writing | Team style guide, past good PRs, commit conventions | Low |
| Unit test generation | Testing conventions, example test files | Low–Medium |
| Client status report (weekly) | Status report template, past reports, KPIs | Low |
| Code review feedback | Style guide, common issues list, past reviews | Medium |
| Architecture Decision Record | ADR template, past ADRs, team's tech radar | Medium |
| Incident post-mortem | Post-mortem template, past post-mortems, severity rubric | Medium |
| API documentation | OpenAPI spec, existing docs, naming conventions | Medium |
| Onboarding doc for new team members | Team handbook, past onboarding notes | Medium |
| Performance priorities (Joey's case) | Capabilities doc, metrics taxonomy, examples | Medium–High |
| Requirements gathering session notes | Meeting template, Jira fields, past requirements docs | Medium |

---

# APPENDIX B — Suggested Prompt Library

A catalog of ready-to-use prompts. Copy into Copilot Chat.

## B1 — Audit my prompt file for the 12 techniques

```
I have a prompt file I've been iterating on. Audit it against these
12 prompt engineering techniques and tell me which are present,
which are missing, and which are weak:

1. Role Assignment
2. Goal-First Writing
3. Structured Context with Domain Knowledge
4. Multi-Phase Workflow
5. Adaptive Question Bank
6. Manual RAG / Artifact Mining
7. Multi-Persona / Multi-Version Generation
8. Few-Shot Output Examples
9. Iterative Refinement Loop
10. Strict Multi-Format Output
11. Tone & Style Directives
12. Clarifying Questions (Bidirectional)

For each technique rated MISSING or WEAK, suggest a specific addition
with exact text.

My prompt file:
[PASTE HERE]
```

## B2 — Generate a worked example output (dogfood test)

```
Here is my prompt file: [PASTE]

Walk through it as if you were the AI receiving it, and a user
gave you this task instance: [DESCRIBE A REAL TASK INSTANCE]

Produce the final output you would have produced.

Then, separately, tell me:
1. Where the prompt file was unclear
2. Where you had to make assumptions and what they were
3. Whether the output meets the specified format exactly
```

## B3 — Create a shorter "executive" variant

```
Here is my prompt file: [PASTE]

Create a shorter "executive" variant — same task, same goal, but
50% shorter. Trim redundancy. Keep the CLARIFYING QUESTIONS section
intact (don't trim conversational guardrails).

Tell me what you removed and why, so I can verify nothing essential
was lost.
```

## B4 — Ask AI to critique vs. a public standard

```
Compare my prompt file to the prompting techniques at
promptingguide.ai/techniques. Which techniques from that site
does my prompt file use? Which doesn't it use, and would any of
the missing ones improve it for my specific task?

My task: [DESCRIPTION]
My prompt file: [PASTE]
```

## B5 — Create a test harness for the prompt file

```
Here is my prompt file: [PASTE]

Create a TEST HARNESS — a markdown document with 5 test scenarios
I can run the prompt file against. Each scenario should:

1. Have a realistic task instance (describe it)
2. Specify the expected output shape
3. List 3–5 checks I should apply to the actual output
4. Include at least one edge case (missing info, conflicting inputs, etc.)

Format as a checklist I can work through.
```

## B6 — Convert a prompt file between tools

```
I have a prompt file designed for [ORIGINAL TOOL — e.g., GitHub Copilot].

Help me adapt it for [TARGET TOOL — e.g., Claude Code]. Change:
- File references syntax (from #file: to whatever target tool uses)
- Tool-specific features (hooks, skills, workflows)
- Any tool-specific assumptions

Keep all prompt engineering techniques intact. Output only the
adapted file.

Original prompt file:
[PASTE]
```

---

# APPENDIX C — Common Pitfalls

Real failure modes you'll likely hit. Diagnose and fix.

### Pitfall 1 — The "helpful generalist" trap

**Symptom**: AI produces plausible but generic output that doesn't reflect your task's specifics.

**Cause**: Weak ROLE section, or the role is too generic ("helpful assistant").

**Fix**: Make the role hyper-specific. Not "an AI assistant" — instead: *"a senior Java engineer specializing in test-driven development for Spring Boot services at [company]."*

### Pitfall 2 — Silent assumption syndrome

**Symptom**: Output is subtly wrong. User didn't realize AI guessed at something ambiguous.

**Cause**: Missing or weak CLARIFYING QUESTIONS section.

**Fix**: Add an explicit rule: *"If any input is ambiguous or missing, ask 1–3 targeted questions BEFORE producing output. Don't guess silently."*

### Pitfall 3 — Phase confusion

**Symptom**: AI jumps ahead to generation without completing interview phases.

**Cause**: Phases are labeled but order isn't enforced.

**Fix**: Add to guardrails: *"You MUST complete Phase 1 and Phase 2 before beginning Phase 3. Do not generate output until all Phase 1 questions are answered."*

### Pitfall 4 — Format drift

**Symptom**: Output format is inconsistent across runs (different headings, different bullet styles, extra commentary).

**Cause**: Format is described, not shown.

**Fix**: Add a few-shot example of the EXACT format. Words like "use this format" before a filled-in example work better than verbal descriptions.

### Pitfall 5 — Hallucinated metrics / categories

**Symptom**: AI uses category labels or metric names that aren't in your taxonomy.

**Cause**: Taxonomy isn't embedded in the prompt, or is too buried.

**Fix**: Move the taxonomy near the top of the prompt (under CONTEXT). Add a rule: *"Use ONLY the categories listed above. If the user's situation doesn't fit, ask."*

### Pitfall 6 — Over-pleasing tone

**Symptom**: Every output sounds like marketing copy. Accomplishments feel exaggerated.

**Cause**: Missing or overly positive TONE directive.

**Fix**: Add balancing language: *"BE HONEST: if the user hasn't accomplished much, help them write forward-looking priorities with realistic reflections. Do not exaggerate."*

### Pitfall 7 — One-shot blindness

**Symptom**: First draft is treated as final. User accepts flawed output because they don't know how to iterate.

**Cause**: Missing iteration phase.

**Fix**: Add a Phase 4 that explicitly offers refinement options (pin, regenerate, mix, restart). See Technique 9 in the reference card.

### Pitfall 8 — Cargo-cult constraints

**Symptom**: Prompt file has 15+ constraints, most of which don't get followed.

**Cause**: Too many constraints dilute each one.

**Fix**: Limit CONSTRAINTS to 5–8 high-value rules. If you have more, split into required-always vs. situational.

---

# APPENDIX D — What to Do When Stuck

| If you're stuck because... | Try this |
|----------------------------|----------|
| You can't pick a task | Use Appendix A to pick one. Any candidate is better than no candidate. |
| You don't have references | Ask AI: *"What references would I likely need for [task]? Where would I find them?"* Then go get them. |
| Your prompt file keeps producing bad output | Rewind to Step 5. Re-test with a concrete real task. The problem is almost always in clarity of inputs. |
| AI keeps producing the same flaw after you "fix" it | The fix is too soft. Use stronger language ("You MUST...", "NEVER...") and move the rule to guardrails. |
| Your team won't adopt it | Make it easier to use. If it takes more than 1 step to invoke, adoption drops. Set up the tool-specific trigger (Step 8, Option B/C/D). |
| The prompt file is getting too long | See Appendix B3 — ask AI to create a shorter variant. 500-line prompts often underperform 200-line ones. |
| You don't know if the prompt file is "done" | Run Appendix B5 to create a test harness. If it passes 5 scenarios cleanly, it's done. |

---

# Final Note

**This workbook is a teaching artifact, not a cage.** Joey's pattern works because it composes known techniques into a real tool — not because of any specific step count or template. If you deviate from the 8 steps because you learn something new about your task, that's the point. The goal is to *think in prompt files* — not to follow a checklist.

Once you've built one, building the second is 3x faster. The third feels routine. By the fifth, you'll have opinions about which techniques suit which tasks, and you'll be the Joey of your team.

Good luck.

---

# APPENDIX E — The Priority Builder File (Full Reference)

This is Joey's actual prompt file, reproduced in full. Each phase is annotated with the technique(s) it demonstrates. Use this as your reference example as you build your own.

> **Note**: file is ~287 lines in the original. Reproduced here verbatim with technique labels in brackets `[T#]` referencing the 12 techniques from the Reference Card.

```markdown
---
trigger: manual
description: FY26 Priorities Builder - Interrogation agent for performance
             priorities
---

ACCENTURE FY26 PRIORITIES BUILDER AGENT
========================================
```

**[T1: Role Assignment + T2: Goal-First Writing]** — sets persona and goal in the first sentence.

```markdown
You are an expert career coach and performance management specialist
helping Accenture employees create compelling FY26 priorities with
ABCD reflections. Your goal is to generate 2-3 high-quality priorities
that will position the user for success in their annual review.
```

**[T3: Structured Context with Domain Knowledge]** — embeds frameworks, categories, and the metric taxonomy directly so the AI doesn't guess.

```markdown
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
```

**[T4: Multi-Phase Workflow]** — explicit phase headers begin here.

```markdown
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
```

**[T5: Adaptive Question Bank]** — provides a library, instructs the AI to adapt rather than enumerate.

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
11. "Which AI tools do you currently use? (Copilot, ChatGPT, etc.)"
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
30. "What business impact have you made so far? (quantify if possible)"
31. "What obstacles have you overcome or anticipate overcoming?"
32. "What are you learning through this work?"
```

**[T6: Manual RAG / Artifact Mining]** — a dedicated phase telling the AI to read real files.

```markdown
PHASE 2.5: ARTIFACT MINING
Before generating versions, search the user's workspace for evidence:
- Use `find` or `glob` to locate relevant files
- Read presentations, READMEs, and code for metrics
- Validate claimed numbers against actual artifacts
- Extract quantifiable data from documents
```

**[T7: Multi-Persona / Multi-Version Generation]** — three versions on a spectrum.

```markdown
PHASE 3: GENERATE PRIORITY VERSIONS
After gathering information through questions, generate THREE
different versions of the priority:

VERSION A - CONSERVATIVE:
- Safe, achievable goals
- Standard metrics
- Moderate impact language
- Good for risk-averse individuals or uncertain situations

VERSION B - BALANCED:
- Ambitious but realistic goals
- Mix of quantitative and qualitative metrics
- Strong but honest impact statements
- Recommended for most people

VERSION C - ASPIRATIONAL:
- Stretch goals that demonstrate high ambition
- Aggressive metrics and targets
- Maximum impact language
- Good for high performers seeking promotion
```

**[T8: Few-Shot Output Examples]** — exact format shown, not just described.

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

VERSION B (Balanced):
[same structure]

VERSION C (Aspirational):
[same structure]
```

**[T9: Iterative Refinement Loop]** — explicit options for the user to refine.

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

If they choose option 2 or 3, ask them to specify which parts:
- "Which description do you prefer?"
- "Which metrics feel most relevant?"
- "Which ABCD reflection points resonate?"
- "What would you like me to change or improve?"

Then regenerate based on their feedback.

PHASE 5: FINALIZATION
Once they're happy with a priority, ask:
"Great! Are you ready to move to the next priority, or would you
like to refine this one further?"

Repeat the process for each priority they want to create.
```

**[T10: Strict Multi-Format Output]** — two formats specified to the column.

```markdown
PHASE 6: FINAL OUTPUT
When all priorities are completed, generate the final output in
TWO formats:

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
- Status should be "In Progress", "Completed", or "Not Started"
- Reviewer should be enterprise ID format (firstname.lastname)

FORMAT 2 - FORMATTED DOCUMENT (Human Readable):
Present a nicely formatted version for review:

═══════════════════════════════════════════════════════════
PRIORITY 1: [Category] - [Short Title]
═══════════════════════════════════════════════════════════

DESCRIPTION:
[Full priority description]

METRICS:
• [Metric 1]
• [Metric 2]

EXPECTED VALUE:
[Expected outcome]

ABCD REFLECTIONS:
─────────────────

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
```

**[T12: Clarifying Questions / Bidirectional]** — guidelines that keep the AI conversational and adaptive.

```markdown
IMPORTANT GUIDELINES:
---------------------
1. BE CONVERSATIONAL: Don't feel like you must ask all 20 questions.
   Stop when you have enough information.
2. ADAPT QUESTIONS: Based on their role (analyst, manager, senior
   manager, etc.), tailor questions appropriately.
3. QUANTIFY EVERYTHING: Push for specific numbers, percentages,
   timeframes, and measurable outcomes.
4. USE STAR METHOD: Help them structure accomplishments using
   Situation, Task, Action, Result.
5. BE HONEST: If they haven't accomplished much yet, help them write
   forward-looking priorities with realistic reflections.
6. MATCH THEIR TONE: If they're formal, be formal. If casual, be casual.
7. ENCOURAGE AMBITION: Gently push them toward the Balanced or
   Aspirational version unless they explicitly want Conservative.
8. HIGHLIGHT STRENGTHS: Point out impressive aspects of their work
   they might be underselling.
9. PROVIDE EXAMPLES: When they're stuck, offer 2-3 concrete examples
   they can adapt.
10. KEEP IT REAL: Ensure reflections are believable and authentic,
    not exaggerated.
```

**[T11: Tone & Style Directives]** — explicit voice guidelines.

```markdown
TONE & STYLE:
-------------
- Encouraging and supportive
- Professional but friendly
- Solution-oriented
- Celebrate their achievements
- Push for specificity without being pushy
- Make them feel confident about their priorities

NOW BEGIN:
----------
Start by greeting the user and beginning Phase 1. Remember: you're
a helpful coach, not an interrogator. Make this collaborative and
energizing!
```

**End of Joey's prompt file.**

---

# APPENDIX F — What Reference Files Look Like

When Step 2 says "gather references," this is what you're collecting. Three categories, with a sample of each from Joey's actual references.

### F1 — A Standards / Capabilities Reference

This is a rubric document that defines what "good" looks like at a particular level or role. It's what your output is being evaluated against.

**Sample**: an excerpt from Joey's `core_capabilities_manager.txt`:

```
EXECUTION
Executes project tasks and services efficiently, comprehensively,
and ethically.

Planning - Level 7
- Ensures that work priorities and assumptions align with the
  program objectives
- Minimizes opportunity for mistakes by building review time into plan
- Sets challenging objectives to achieve high standards of performance
- Raises quality and/or scope issues to the necessary stakeholders
- Balances and prioritizes activities to make sure critical items are
  addressed in a timely manner
- Creates a logical plan, realistic estimates and reasonable schedule
  for an activity or project segment

Process-Orientation - Level 7
- Properly documents and follows through on progress, issues
  and agreements
- Takes full responsibility when making decisions and taking action
- Drives focus on the task or activity at hand to achieve the
  desired outcome

LEADERSHIP
Develops and engages people, building productive relationships and
maintaining team well-being.

People Leadership - Level 7
- Creates an inclusive and equitable environment where team members
  feel they belong and can succeed
- Recognizes individual contributions and provides constructive feedback
- Holds team members accountable for their commitments
```

**What makes this a good reference**: organized by capability, leveled (so AI knows which behaviors apply at the user's level), specific behavioral language (not vague aspirations).

### F2 — A Taxonomy / Categories Reference

A canonical list of valid options for some choice the AI has to make. Forces the AI to pick from your defined menu, not invent new categories.

**Sample**: Joey's `unlocking_metrics.html` (extracted to plain text):

```
NON-FINANCIAL METRIC TYPES
==========================
1. AI Proficiency / Skills
   - Develop AI skills, certifications, training completion
2. AI Tool Usage
   - Active use of approved AI tools in client/internal work
3. Asset / Solution Development
   - Building reusable assets or solutions
4. Client Partnership/Relationships
   - Strengthening relationships, NPS, retention
5. Community Volunteering
   - Volunteer hours, events organized
6. High Quality Deliverables / Client Delivery
   - Defect rates, client acceptance rates
7. Innovation
   - New ideas implemented, patents, opportunities identified
8. Mentorship/People Leadership
   - People mentored, team performance, retention
... (continues with full list)

FINANCIAL METRIC TYPES
======================
1. Accurate Time/Expense Reporting
   - Timely submission, accuracy
2. On Time/On Budget Project Delivery
   - Schedule adherence, budget variance
3. Project-Specific KPIs (Financial)
   - Custom KPIs defined per project
```

**What makes this a good reference**: complete enumeration (no "etc."), each option has a brief definition, organized into clear groups.

### F3 — Example Outputs Reference

2–5 examples of the kind of output the user wants the AI to produce. Functions as few-shot examples for the AI.

**Sample**: an excerpt from Joey's `example_of_priorities_ML7.md`:

```
AI Enablement | Manager, ML7
Priority: Lead AI innovation and research workstream

Description:
Identify innovative AI topics for client opportunities, leveraging
Accenture Research knowledge and sources. Work collaboratively with
innovation hub workstream to bring and deliver relevant and innovative
content on AI. Co-publish my presentation of my research white paper
on AI on media exchange to share knowledge.

Categories | Metrics | Targets
Non-Financial | Innovation | Identify 5 innovation opportunities
Non-Financial | KX Contributions | Share 3 innovations through the RC
Non-Financial | AI Proficiency / Skills | Contribute to AI pipeline
                                          by innovating at least
                                          1 new offering

---

Client Value Creation | Manager, ML7
Priority: Engage the C-suite with client research

Description:
Identify potential opportunities to support external client teams
through targeted client research. Demonstrate how the research adds
value to client opportunities. Serve as a SME in discussions with
the client teams. Deliver and lead strategic studies or point-of-views
on key subjects or industry topics.

Categories | Metrics | Targets
Non-Financial | Asset/Solution Development | Launch external offering
Non-Financial | One Accenture | Share knowledge as SME for at least 1
                                client team per quarter
Financial | Other (Financial) | Ensure all team members meet
                                chargeability targets
```

**What makes this a good reference**: variety (covers multiple categories), realistic specificity (real metrics with real targets), correct format (matches what AI should produce).

### Generic checklist: a good reference is...

- **Specific** — not generic platitudes; concrete behaviors, exact metrics, real examples
- **Complete** — exhaustive lists, not "..."
- **Organized** — clear sections/groupings with headers
- **At the right level** — matches the level/role/audience of the user
- **Recent** — current standards, not last year's deprecated framework
- **Authoritative** — sourced from a trusted document (style guide, rubric, official spec), not someone's opinion

---

# APPENDIX G — A Worked Example, End to End

> A complete walkthrough of someone using Steps 1–8 to build a different prompt file: **PR Description Writer**. Use this when you want to see what the workbook looks like in practice on a simpler task than priorities.
>
> The "user" in this example is fictional — call her **Maya**, a backend dev who writes 3–5 PR descriptions per week and is tired of the inconsistency.

### Step 1 — Maya picks her task

Maya has 4 candidates: PR descriptions, code review feedback, sprint demo prep, status emails. She uses the prompt from Step 1 of the workbook. AI rates her candidates:

| Task | Frequency | Pattern | Standard | References | Risk | Recommendation |
|------|-----------|---------|----------|------------|------|----------------|
| PR descriptions | HIGH | HIGH | HIGH | HIGH | LOW | ★ Top pick |
| Code review feedback | MEDIUM | MEDIUM | MEDIUM | LOW | MEDIUM | Skip for now |
| Sprint demo prep | LOW | LOW | LOW | LOW | LOW | Skip |
| Status emails | HIGH | LOW | LOW | LOW | LOW | Skip — too varied |

She picks **PR descriptions** as her target task.

### Step 2 — Maya gathers her references

She finds three things her team already has:

1. **`team-pr-template.md`** — the team's PR description template (with sections for Summary, Why, How, Test Plan, Risks)
2. **`good-prs.md`** — a doc her tech lead made with 3 example PRs the team considered "well-written"
3. **`commit-message-conventions.md`** — Conventional Commits spec the team adopted

### Step 3 — Maya scopes the prompt with AI

She pastes the Step 3 prompt with her references attached. AI asks her 6 questions over 6 messages:

> **AI**: What's the typical input you have when writing a PR description?
>
> **Maya**: A branch with 3-15 commits, a Jira ticket ID, sometimes screenshots. Code is already done.
>
> **AI**: What's the typical output? Where does it go?
>
> **Maya**: A markdown PR description in GitHub. Reviewers read it before looking at the diff.
>
> **AI**: What standards must the output follow?
>
> **Maya**: It must use the team template (Summary, Why, How, Test Plan, Risks). Reference the Jira ticket. Use Conventional Commits format for the title.
>
> *(Three more questions about audience, variations, edge cases.)*
>
> **AI**: Here's the SCOPE SUMMARY:
> - Use case: Generate a complete PR description for a finished branch
> - Inputs: Branch name, Jira ID, list of commits or short description
> - Outputs: Markdown PR description matching team template
> - Standards: Team template structure, Conventional Commits title, Jira link
> - Audience: Reviewers (peer devs, sometimes tech lead)
> - Variations: Bug fix vs. feature vs. refactor (different emphasis)
> - Edge cases: Trivial PRs (1-line fixes), large PRs (>500 lines)

### Step 4 — Maya gets the v1 draft

She pastes the Step 4 prompt. AI produces a 180-line markdown file. Excerpt:

```
# ROLE
You are a senior backend engineer who writes clear, concise PR
descriptions following the team's template. You don't review
the code — you only describe it.

# GOAL
Generate a complete PR description for the branch the user is
working on. The output should be ready to paste into the GitHub
PR description box.

# CONTEXT
- Team template structure: Summary, Why, How, Test Plan, Risks
- Title format: Conventional Commits (type(scope): description)
- All PRs reference a Jira ticket
- Reviewers are senior peers — assume technical fluency

... (continues for ~150 more lines)
```

### Step 5 — Maya stress-tests it

She pastes her v1 prompt file into a fresh Copilot Chat with a real branch (`feat/auth-refactor`, Jira ticket AUTH-123, 8 commits). The AI starts with Phase 1 and asks her clarifying questions. She walks through the workflow and gets a draft PR description.

She runs the self-evaluation prompt. AI tells her:
- ✅ Template structure correct
- ✅ Conventional Commits title used
- ⚠️ Test Plan section is too generic ("ran tests, all pass")
- ⚠️ Did not ask about screenshots even though she mentioned them as input

### Step 6 — Maya fixes the issues

She uses the Step 6 prompt to ask AI for targeted fixes. AI suggests:

1. Add to Phase 1: *"Ask if there are screenshots to include. If so, add an Evidence section before Test Plan."*
2. Add to Phase 3 (Test Plan generation): *"Be specific. List the exact scenarios tested (e.g., 'logged in as new user, expired token, malformed input'). Generic 'tests pass' is not acceptable."*

She pastes the edits. v2 of her prompt file is born.

She re-tests. Both issues are fixed. ✅

### Step 7 — Maya adds team context

She pastes the Step 7 prompt with her team's specifics:

- Stack: Node.js 20 / TypeScript / Express
- Standards: Airbnb style, ESLint + Prettier
- Patterns: dependency injection via tsyringe, repository pattern
- Avoid: `any`, raw fetch, console.log
- Conventions: PRs always link Jira, Test Plan always includes manual verification + automated test summary

AI suggests 4 additions:

1. Add a constraint: *"Always include both 'Automated tests' and 'Manual verification' subsections under Test Plan."*
2. Add to Domain Knowledge section: list the 5 approved Conventional Commit types this team uses (feat, fix, refactor, chore, docs).
3. Add to Risks section guidance: *"If the PR touches src/auth or src/payments, always include a 'Security review needed' note in Risks."*
4. Add to Tone: *"Direct and technical. No marketing language. No 'amazing' or 'awesome'."*

She applies. Final version saved as `pr-description.md` (179 lines).

### Step 8 — Maya operationalizes

Her team uses GitHub Copilot, so she saves it as `.github/prompts/pr-description.prompt.md`:

```
maya-team-repo/
├── .github/
│   └── prompts/
│       └── pr-description.prompt.md   ← her file
├── src/
└── (rest of repo)
```

She also writes a 150-word README and posts in the team Slack:
> *"Added a PR description prompt file. Type `#pr-description` in Copilot Chat. It interviews you, then produces a PR description matching our template. Try it on your next PR. Feedback welcome."*

### Result

- **First use**: 8 minutes from "branch is done" to "PR description posted." (Previously: 25 min average.)
- **First week**: 3 teammates use it. One finds an edge case (PRs that revert previous PRs) — they iterate the file together.
- **First month**: PR description quality across the team is visibly more consistent. Tech lead asks Maya to do the same for code review feedback.

This is what success looks like.

---

# APPENDIX H — Tool-Specific Quick Setup

A concise reference for getting your prompt file working in each tool.

### GitHub Copilot Chat (VS Code)

**File location**: `.github/prompts/[task-name].prompt.md`

**Structure**:

```
your-repo/
├── .github/
│   ├── copilot-instructions.md       ← (Optional) always-on team rules
│   └── prompts/
│       ├── pr-description.prompt.md
│       ├── unit-tests.prompt.md
│       └── status-report.prompt.md
└── (rest of repo)
```

**Required**: filename must end in `.prompt.md`.

**Frontmatter** (optional but recommended):

```markdown
---
mode: ask
description: Generate a PR description following team standards
---

(your prompt file content here)
```

**To invoke**: in Copilot Chat, type `#pr-description` (whatever the filename was, minus `.prompt.md`). Copilot autocompletes from your file list. Add any extra context after the trigger and send.

**Note**: if `@workspace` doesn't work in your Copilot version (deprecated in newer ones), workspace context is automatic — just ask repo-level questions normally.

---

### Windsurf (Cascade)

**File location**: `.windsurf/workflows/[task-name].md`

**Structure**:

```
your-repo/
├── .windsurf/
│   ├── rules/
│   │   └── team-standards.md         ← (Optional) always-on rules
│   └── workflows/
│       ├── pr-description.md
│       ├── unit-tests.md
│       └── status-report.md
└── (rest of repo)
```

**Required frontmatter**:

```markdown
---
name: pr-description
description: Generate a PR description following team standards
---

(your prompt file content here)
```

**To invoke**: in Windsurf Chat, type `/pr-description` and send.

**Note**: if `@codebase` isn't enabled in your install, just remove the tag from your prompt — Cascade has codebase awareness built in.

---

### Claude Code (terminal-based)

**File location**: `.claude/skills/[task-name].md`

**Structure**:

```
your-repo/
├── CLAUDE.md                          ← (Optional) project-wide instructions
├── .claude/
│   ├── settings.json                  ← (Optional) hooks, MCP servers
│   └── skills/
│       ├── pr-description.md
│       ├── unit-tests.md
│       └── status-report.md
└── (rest of repo)
```

**Required frontmatter**:

```markdown
---
name: pr-description
description: Generate a PR description following team standards
---

(your prompt file content here)
```

**To invoke**: in Claude Code, type `/pr-description` and send.

**Bonus**: Claude Code reads your repo automatically — you don't need to attach files. Just reference them by name in the conversation.

---

### Tool-agnostic fallback (any AI chat)

If you don't have any of the above, or you want maximum portability:

**File location**: `prompts/[task-name].md` (anywhere in your repo, or even in a Notion/Confluence page)

**Structure**:

```
your-repo/
├── prompts/
│   ├── README.md                      ← Brief usage instructions
│   ├── pr-description.md
│   ├── unit-tests.md
│   └── status-report.md
└── (rest of repo)
```

**To invoke**: open the file. Copy the entire contents. Paste into any AI chat (Copilot, ChatGPT, Claude.ai, Gemini, etc.). Continue the conversation.

This is the most portable option. Tool-specific options (above) just save the copy-paste step.

---

# APPENDIX I — Printable One-Page Checklist

Print this page. Use it as you build your prompt file.

```
═══════════════════════════════════════════════════════════
  BUILD YOUR OWN PROMPT FILE — 8-STEP CHECKLIST
═══════════════════════════════════════════════════════════

[ ] STEP 1 — Identify your recurring task
    [ ] Picked a task you do at least monthly
    [ ] Task has a recognizable repeating pattern
    [ ] Output should match a known standard
    [ ] Failures are cheap to recover from

[ ] STEP 2 — Gather your references
    [ ] Found a STANDARDS doc (rubric, style guide)
    [ ] Found a TAXONOMY doc (valid options, categories)
    [ ] Found 2-3 EXAMPLES of good output
    [ ] All references in one folder

[ ] STEP 3 — Scope the prompt file (AI interview)
    [ ] AI asked questions one at a time
    [ ] You answered with specific examples (not generic)
    [ ] Got back a SCOPE SUMMARY of 5-10 bullets
    [ ] Saved the summary at the top of my-prompt-file.md

[ ] STEP 4 — Draft the prompt file
    [ ] Has ROLE section (specific persona)
    [ ] Has GOAL (one sentence, near top)
    [ ] Embeds DOMAIN KNOWLEDGE from references
    [ ] Has 3+ labeled PHASE sections
    [ ] Has CLARIFYING QUESTIONS directive
    [ ] Specifies OUTPUT FORMAT
    [ ] Has GUARDRAILS (4+ rules)
    [ ] Has TONE section (3+ bullets)

[ ] STEP 5 — Stress-test it
    [ ] Tested in a fresh chat (no prior context)
    [ ] Used a real task instance (not invented)
    [ ] AI asked clarifying questions before generating
    [ ] Output matched specified format exactly
    [ ] Iteration options were offered

[ ] STEP 6 — Diagnose and fix
    [ ] Listed every issue from Step 5
    [ ] Got targeted fixes from AI
    [ ] Applied edits one at a time
    [ ] Re-tested after fixes

[ ] STEP 7 — Apply team context
    [ ] Embedded tech stack
    [ ] Embedded team standards/patterns
    [ ] Embedded "things to avoid"
    [ ] Saved generic + team-specific versions

[ ] STEP 8 — Operationalize and share
    [ ] Saved to the right location for your tool
    [ ] Wrote a README for teammates
    [ ] Committed to repo
    [ ] Posted in team chat with usage instructions

═══════════════════════════════════════════════════════════
  TECHNIQUE AUDIT — Does my prompt file have these?
═══════════════════════════════════════════════════════════

[ ]  1. Role Assignment
[ ]  2. Goal-First Writing
[ ]  3. Structured Context with Domain Knowledge
[ ]  4. Multi-Phase Workflow
[ ]  5. Adaptive Question Bank
[ ]  6. Manual RAG / Artifact Mining
[ ]  7. Multi-Persona / Multi-Version Generation
[ ]  8. Few-Shot Output Examples
[ ]  9. Iterative Refinement Loop
[ ] 10. Strict Multi-Format Output
[ ] 11. Tone & Style Directives
[ ] 12. Clarifying Questions (Bidirectional)

A good prompt file uses 8+ of these. A great one uses 10+.
```

---

# APPENDIX J — Mini Glossary

Quick definitions for the key terms in this workbook. Use this if you forget what something means.

**Prompt** — A single instruction you type into an AI chat.

**Prompt file** — A reusable, multi-section instruction document you paste into AI chat. Larger and more structured than a one-off prompt. The thing you're building in this workbook.

**Meta-prompt** — A prompt that *generates other prompts*. The Priority Builder is technically a meta-prompt (it interviews you and produces a tailored prompt for your specific priorities).

**Prompt template** — A fill-in-the-blank prompt with placeholders. Less elaborate than a prompt file. A prompt file usually contains several templated outputs.

**Tool-agnostic** — Works with any AI tool (Copilot, Windsurf, Claude Code, ChatGPT, etc.). Markdown prompt files are tool-agnostic.

**Tool-specific** — Uses features unique to one tool (e.g., Copilot's `#file:` references, Claude Code's hooks).

**Few-shot prompting** — Including 2+ input/output examples in the prompt to teach the AI a specific style or format.

**Chain-of-thought (CoT)** — Asking the AI to "think step by step" or show its reasoning before giving an answer. Improves accuracy on debugging and multi-step tasks.

**Manual RAG (Retrieval-Augmented Generation)** — Telling the AI to read real files from your workspace for evidence, instead of relying only on what you typed. The "Artifact Mining" phase in the Priority Builder.

**Multi-persona prompting** — Asking the AI to analyze something from multiple perspectives (e.g., "as a senior dev / as a security reviewer"), then synthesize.

**Iterative refinement** — Treating the first AI response as a draft and improving it via 2–3 short follow-ups instead of starting over.

**Clarifying questions / bidirectional** — A directive telling the AI to ask the user questions when input is ambiguous, instead of guessing silently.

**Frontmatter** — The YAML block at the top of a markdown file (between `---` lines) that some tools use for metadata. Required for Windsurf workflows and Claude Code skills, optional for Copilot prompt files.

**Domain knowledge** — Company-specific or project-specific frameworks, taxonomies, conventions that the AI doesn't know from its training data — and that you must embed in the prompt for accurate output.

**Hallucination** — When AI confidently produces output that's plausible-sounding but incorrect (made-up function names, fabricated facts, invented categories). Mitigated by manual RAG and clarifying questions.

---

*Workbook authored April 2026. Inspired by the Priority Builder case study shared internally. Free to use for learning purposes only.*
