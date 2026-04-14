# Prompt Guide — Topic Outline

> **Goal**: A step-by-step guide that teaches developers how to write better prompts, build reusable prompt templates, and automate real work using AI coding tools (GitHub Copilot, Windsurf, Claude Code). Core concepts are tool-agnostic — learn once, apply anywhere.

### Hands-On Workbook

This outline maps to a companion [workbook](workbook.md) with 35 hands-on exercises:

| Topic Outline Part | Workbook Module | Exercises |
|---|---|---|
| **Part 1** — Foundations | Module 1 — Prompt Foundations | Ex. 1–2 |
| **Part 2** — Writing Better Prompts | Module 1 — Prompt Foundations | Ex. 1–5 |
| **Part 3** — Reusable Templates | Module 2 — Reusable Templates | Ex. 6–10 |
| **Part 4** — The Meta-Prompt File | Module 3 — Build Your Own Meta-Prompt | Ex. 11–20 |
| **Part 5** — GitHub Copilot | Module 5 — GitHub Copilot | Ex. 24–26 |
| **Part 6** — Windsurf | Module 6 — Windsurf (Cascade) | Ex. 27–28 |
| **Part 7** — Claude Code | Module 7 — Claude Code | Ex. 29–31 |
| **Part 8** — Automating Client Work | Module 8 — Automating Client Work | Ex. 32–34 |
| **Part 9** — Putting It All Together | Module 9 — Putting It All Together | Ex. 35 |

> Open the [Complete Workbook](workbook.md) and work through the exercises at your own pace. Each module is self-contained.

---

## Part 1 — Foundations (Why This Matters)

### 1. What Is a Prompt?
- Plain-language definition — it's just an instruction you give to AI
- Why the quality of the instruction determines the quality of the answer
- Quick demo: bad prompt vs. good prompt (same problem, different results)

### 2. The "Garbage In, Garbage Out" Problem
- Common mistakes people make (too vague, no context, no goal)
- Real before/after examples from daily work

> 📘 **Practice**: [Workbook](workbook.md) → Module 1, Exercises 1–2 (Goal-First Writing, Providing Context)

---

## Part 2 — How to Write a Better Prompt (Step by Step)

### 3. Step 1: State the Goal First
- Lead with *what* you need, not background
- One sentence that answers: "What do I want back?"

### 4. Step 2: Give Context
- What project, language, framework, or system is involved?
- What has already been tried or decided?

### 5. Step 3: Set Constraints
- Output format (code, list, table, paragraph)
- Length, tone, audience
- What to include and what to leave out

### 6. Step 4: Provide Examples
- Show a sample input → expected output
- When to use one example (one-shot) vs. several (few-shot)

### 7. Step 5: Ask AI to Think Step by Step
- Chain-of-thought prompting in plain terms
- When to use it (debugging, logic, multi-step tasks)

### 8. Step 6: Review, Refine, Repeat
- Treat the first answer as a draft
- How to give follow-up instructions to improve the result

> 📘 **Practice**: [Workbook](workbook.md) → Module 1, Exercises 1–5 (all foundational techniques) and Module 4, Exercise 21 (Iterative Refinement)

---

## Part 3 — Building Reusable Prompt Templates

### 9. What Is a Prompt Template?
- A fill-in-the-blank prompt that the team can reuse
- Why templates make results consistent and save time

### 10. Anatomy of a Good Template
- Placeholders: `[GOAL]`, `[CONTEXT]`, `[CONSTRAINTS]`, `[EXAMPLES]`
- Fixed instructions that never change (guardrails, format rules)
- Variable sections the user fills in each time

### 11. Template: Bug Fix / Issue Resolution
```
GOAL: [Describe the bug or issue in one sentence]
CONTEXT: [Language/framework, file or module, what the code should do]
ERROR: [Paste the exact error message or describe the unexpected behavior]
ALREADY TRIED: [What you or the team have already attempted]
CONSTRAINTS: [Do not change X, must stay compatible with Y]
OUTPUT: Provide a root-cause explanation, then a minimal fix with code.

CLARIFYING QUESTIONS:
If anything above is ambiguous or missing context, ask me 1–3 targeted
questions BEFORE producing the fix. Don't guess silently. If you must
make assumptions, state them explicitly so I can correct them.
```

### 12. Template: Code Generation
```
GOAL: [What the code should do]
LANGUAGE/FRAMEWORK: [e.g., Python 3.12 / FastAPI]
INPUTS: [What data or parameters it receives]
OUTPUTS: [What it returns or produces]
CONSTRAINTS: [Performance, style, libraries allowed]
OUTPUT: Working code with brief inline comments.

CLARIFYING QUESTIONS:
If requirements are ambiguous or you see multiple reasonable designs,
ask me 1–3 questions first. When a genuine trade-off exists
(performance vs. readability, library A vs. B), present the options
with brief pros/cons and let me choose before writing code.
```

### 13. Template: Code Review / Refactor
```
GOAL: Review the following code for [quality / performance / security].
CODE:
[Paste code here]
FOCUS AREAS: [Specific concerns, e.g., error handling, readability]
OUTPUT: List issues by severity (critical → minor), then suggest fixes.

CLARIFYING QUESTIONS:
If the code's purpose or constraints are unclear, ask me before
critiquing. If there's context you'd need to judge severity accurately
(e.g., "is this hot path?", "is this user-facing?"), ask up to 3
questions first.
```

### 14. Template: Documentation / Explanation
```
GOAL: Explain [concept / function / architecture] for [audience level].
CONTEXT: [Project or system it belongs to]
CONSTRAINTS: [Length, format — e.g., "one paragraph" or "bullet list"]
OUTPUT: Clear explanation a [junior dev / non-technical stakeholder] can follow.

CLARIFYING QUESTIONS:
If the audience's background or the desired depth isn't clear, ask me
first. If there are multiple reasonable framings (analogy-based vs.
technical-first, top-down vs. bottom-up), propose 2 options and let me
pick.
```

### 15. How to Ask AI to *Generate* a Template for You
- Prompt: "Create a reusable prompt template for [task type] that my team can fill in to get consistent results."
- Walk through how to iterate on the template AI gives you
- Always include a **CLARIFYING QUESTIONS** block in the template so AI dialogues with the user when inputs are ambiguous — don't let AI make silent assumptions

> 📘 **Practice**: [Workbook](workbook.md) → Module 2, Exercises 6–10 (build bug-fix, code-gen, code-review, documentation, and custom templates)

---

## Part 4 — The Meta-Prompt File (A Prompt That Generates Prompts)

> **Key idea**: Instead of writing prompts by hand every time, you create *one* reusable prompt file. You feed it to the AI, the AI asks you clarifying questions, and then it outputs a perfectly structured prompt you can use to solve your actual problem.

### 16. What Is a Meta-Prompt File?
- A single markdown file you keep in your repo or shared folder
- It contains instructions *for the AI* on how to interview you and then produce a high-quality prompt
- Think of it as a "prompt factory" — one file, unlimited output prompts

### 17. Why This Matters
- Team members don't need to learn prompt engineering — they just run the file
- Every generated prompt follows the same proven structure
- The clarifying-questions step prevents vague, low-quality prompts
- Works in any AI coding tool (Copilot, Windsurf, Claude Code)

### 18. How to Build a Meta-Prompt File (Step by Step)

**Step 1 — Define the role and purpose**
- Tell the AI what it is: "You are a prompt engineer."
- Tell it what it will produce: "Your job is to generate a detailed, structured prompt."

**Step 2 — Instruct it to ask clarifying questions first**
- The AI must NOT generate a prompt immediately
- It should ask 3–7 targeted questions to understand the user's problem
- Questions should cover: goal, context, constraints, format, examples

**Step 3 — Define the output format**
- Tell the AI exactly how to structure the final prompt it generates
- Use labeled sections the next LLM will parse easily (ROLE, GOAL, CONTEXT, CONSTRAINTS, OUTPUT FORMAT, etc.)

**Step 4 — Add guardrails**
- "Do not make assumptions — ask if unsure"
- "Keep the generated prompt under 500 words"
- "Use clear, direct language — no filler"

**Step 5 — Include the clarifying-question loop**
- After the AI asks questions and gets answers, it should summarize its understanding
- The user confirms or corrects before the AI generates the final prompt

**Step 6 — Save and share**
- Store as a `.md` file in your repo (e.g., `prompts/meta-prompt.md`)
- Anyone on the team can open it, paste it into their AI tool, and start generating prompts

### 19. Anatomy of the Meta-Prompt File
- **Section 1 — System Instructions**: Role, behavior rules, guardrails
- **Section 2 — Clarifying Questions Protocol**: What to ask, when to stop asking
- **Section 3 — Output Prompt Template**: The structure the AI must use for generated prompts
- **Section 4 — Examples** *(optional)*: A sample conversation showing the flow from questions → generated prompt

### 20. Reference: The Meta-Prompt File
- See `meta-prompt.md` — a ready-to-use meta-prompt file the team can start with today
- Walkthrough of each section and why it's there
- How to customize it for your project's specific needs

> 📘 **Practice**: [Workbook](workbook.md) → Module 3, Exercises 11–20 (build a meta-prompt step by step by prompting an LLM)

---

## Part 5 — GitHub Copilot *(do this module if you have Copilot)*

### 21. Using Templates in GitHub Copilot Chat
- How to paste a template or meta-prompt into Copilot Chat
- Using `@workspace` and `#file` references to add context automatically
- Using chat participants: `@workspace`, `@terminal`, `@vscode`
- Using slash commands: `/explain`, `/fix`, `/tests`, `/doc`
- Combining slash commands with your templates for faster workflows

### 22. Custom Instructions for the Team
- Saving prompts in a team `.github/copilot-instructions.md` file
- What to include: tech stack, coding standards, patterns, test frameworks
- How Copilot automatically includes these instructions in every chat

### 23. Tips for Getting the Most Out of Copilot Chat
- Keep prompts under one screen of text when possible
- Use `#file` and `#selection` instead of pasting huge blocks of code
- Highlight code in the editor before prompting for context-aware responses

> 📘 **Practice**: [Workbook](workbook.md) → Module 5, Exercises 24–26 (context references, slash commands, custom instructions)

---

## Part 6 — Windsurf *(do this module when you have Windsurf — skip if not yet available)*

### 24. Codebase-Aware Prompting with Cascade
- Using `@codebase` for project-wide discovery and `@file` for targeted work
- Cascade can read, search, and edit files directly — prompts become action-oriented
- Combining codebase context with templates from Part 3

### 25. Windsurf Rules and Workflows
- **Rules** (`.windsurf/rules/*.md`) — always-on instructions for every conversation (like Copilot's custom instructions)
- **Workflows** (`.windsurf/workflows/*.md`) — multi-step saved prompts triggered with `/name`
- How to create, test, and share both with the team

> 📘 **Practice**: [Workbook](workbook.md) → Module 6, Exercises 27–28 (Cascade prompting, rules, workflows)

---

## Part 7 — Claude Code *(do this module when you have Claude Code — skip if not yet available)*

### 26. CLAUDE.md: Project Instructions
- `CLAUDE.md` at repo root — loaded automatically in every conversation
- Hierarchical: folder-level `CLAUDE.md` files add context for specific areas
- What to include: stack, standards, commands, architecture, things to avoid

### 27. Skills: Reusable Slash Commands
- `.claude/skills/*.md` — saved prompts triggered with `/skill-name`
- Project skills (shared via git) vs. personal skills (local only)
- Creating multi-step skills for common team tasks

### 28. Hooks and MCP Servers
- **Hooks** — scripts that run before/after actions (auto-lint, auto-format, secret checks)
- **MCP servers** — external tool integrations (databases, Jira, Slack, etc.)
- The most programmable customization of any AI coding tool

> 📘 **Practice**: [Workbook](workbook.md) → Module 7, Exercises 29–31 (CLAUDE.md, skills, hooks)

---

## Part 8 — Automating Client Work

### 29. Identifying Automatable Tasks in Client Work
- How to spot tasks that are good candidates for AI automation
- The sweet spot: repetitive, well-defined, code-centric tasks
- Examples: boilerplate generation, test writing, migrations, data transformations, API scaffolding
- When NOT to automate — tasks requiring deep business logic or domain judgment

### 30. From Client Requirement to Reusable Prompt
- Walkthrough: translating a client task into a reusable prompt template
- Using the meta-prompt to generate the initial prompt
- Testing the prompt against real client code
- Iterating until the output is production-ready

### 31. Building a Client-Ready Prompt Library
- Organizing prompts by client, project, or task type
- Storing them in the repo so the whole team can use them
- Versioning prompts alongside the code they operate on
- Review cycle: improving prompts based on team feedback

> 📘 **Practice**: [Workbook](workbook.md) → Module 8, Exercises 32–34 (identify automatable tasks, build a client prompt, test it end-to-end)

---

## Part 9 — Putting It All Together

### 32. Live Walkthrough: From Problem to Solution
- Pick a real issue from the backlog
- Run the meta-prompt file → answer the AI's questions → get a generated prompt
- Paste the generated prompt into your AI tool
- Show the result and any follow-up refinement

### 33. Team Playbook
- Where to store your templates and meta-prompt files (repo, shared folder)
- How to version and improve them over time
- Encouraging the team to share prompts that worked

> 📘 **Practice**: [Workbook](workbook.md) → Module 9, Exercise 35 (end-to-end challenge)

---

## Quick-Start Cheat Sheet

| Step | Action |
|------|--------|
| 1 | **State the goal** — one clear sentence |
| 2 | **Give context** — project, language, what's been tried |
| 3 | **Set constraints** — format, length, what to avoid |
| 4 | **Add examples** — show what good output looks like |
| 5 | **Ask for step-by-step reasoning** if the problem is complex |
| 6 | **Refine** — treat the first response as a draft |

---

*Keep it simple. A good prompt is just a clear instruction with enough context for the AI to do its job.*
