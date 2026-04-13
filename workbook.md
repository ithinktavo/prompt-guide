# Prompt Engineering — Complete Hands-On Workbook

> **What you'll do**: Work through 35 hands-on exercises that take you from writing your first good prompt to building reusable templates, constructing a meta-prompt, mastering advanced strategies, getting the most from your AI tools, and automating real client work.
>
> **Prerequisites**: Access to at least one AI coding tool — **GitHub Copilot Chat**, **Windsurf (Cascade)**, or **Claude Code**. No prior prompt-engineering experience required.
>
> **Time**: ~3.5 hours (work at your own pace — each module is self-contained)

---

## How This Workbook Is Organized

**Modules 1–4 are tool-agnostic** — the concepts work in any AI coding tool. Modules 5–7 cover tool-specific features for each platform. Do the module(s) that match the tool(s) you have access to.

| Module | What You'll Learn | Exercises | Time |
|--------|-------------------|-----------|------|
| **1 — Prompt Foundations** | Core techniques that make any prompt better | 1–5 | ~20 min |
| **2 — Reusable Templates** | Build fill-in-the-blank templates for common tasks | 6–10 | ~25 min |
| **3 — Build Your Own Meta-Prompt** | Construct a "prompt that generates prompts" | 11–20 | ~35 min |
| **4 — Advanced Strategies** | Iterative refinement, multi-persona, constraint-based | 21–23 | ~20 min |
| **5 — GitHub Copilot** | Context references, slash commands, custom instructions | 24–26 | ~20 min |
| **6 — Windsurf (Cascade)** | Codebase-aware prompting, rules, workflows | 27–28 | ~15 min |
| **7 — Claude Code** | CLAUDE.md, skills, hooks, MCP servers | 29–31 | ~15 min |
| **8 — Automating Client Work** | Identify tasks, build client prompts, test end-to-end | 32–34 | ~20 min |
| **9 — Putting It All Together** | End-to-end challenge and team prompt library | 35 | ~15 min |

### How the Concepts Map Across Tools

Every tool has its own names for the same underlying ideas. This table is your Rosetta Stone:

| Concept | GitHub Copilot | Windsurf | Claude Code |
|---------|---------------|----------|-------------|
| **Project instructions** (always-on rules for every conversation) | `.github/copilot-instructions.md` | `.windsurf/rules/*.md` | `CLAUDE.md` (root or any folder) |
| **Reusable prompt templates** (fill-in-the-blank prompts) | `.github/prompts/*.prompt.md` | `.windsurf/workflows/*.md` | Custom skills (`.claude/skills/*.md`) |
| **Trigger a saved prompt** | `#<prompt-name>` in chat | `/workflow-name` in chat | `/skill-name` in chat |
| **Give file context** | `#file:path` or `#selection` | `@file` or paste path | Automatic (reads files on demand) |
| **Give codebase context** | `@workspace` | `@codebase` | Automatic (indexes repo) |
| **Built-in shortcuts** | `/explain`, `/fix`, `/tests`, `/doc` | Built into Cascade flow | `/init`, built-in commands |
| **Automation hooks** | — | — | Hooks (pre/post command scripts) |
| **External tool integrations** | GitHub ecosystem | Built-in web search | MCP servers |

> **Key insight**: Once you learn the core prompting skills (Modules 1–4), you're learning the same muscle regardless of tool. The tool-specific modules just teach you where to put things.

### How Each Exercise Works

- **Concept** — a short explanation of the technique and why it matters.
- **Bad → Good** — a side-by-side comparison so you can see the difference (where applicable).
- **Your Turn** — a hands-on prompt you'll run in your AI tool.
- **Challenge** — an optional stretch task to deepen your understanding.

---

# Module 1 — Prompt Foundations

> These exercises teach you the building blocks that make any prompt — meta-prompt or otherwise — more effective.

---

## Exercise 1 — Goal-First Writing

### Concept
Most people write prompts like emails: background first, request buried at the end. LLMs perform better when you **lead with the goal**. The first sentence should answer: *"What do I want back?"*

### Bad → Good

**Bad prompt:**
```
I've been working on this project for a while and we use React with TypeScript.
There's this component called UserTable that fetches data from an API and
renders it. Lately it's been kind of slow. The team has complained about it.
Can you take a look?
```

**Good prompt:**
```
Fix the performance bottleneck in a React/TypeScript component called UserTable
that re-renders excessively when fetching data from an API.
```

The good version states the goal in the first sentence. Context comes after.

### Your Turn

Pick a real task from your current work (or invent one). Write it as a prompt following these rules:

1. Open your AI chat and paste:

```
I'm going to give you two versions of the same prompt. Tell me which one is
better and why, then rewrite the weaker one to match the stronger one's quality.

Version A:
So we have this database and it's PostgreSQL and there are these queries that
run every night as part of a batch job and some of them are really slow and
I think they need indexes or something. Can you help?

Version B:
Optimize three slow PostgreSQL queries in our nightly batch job. The queries
scan the `orders` and `shipments` tables (each ~10M rows) without indexes.
Suggest index strategies and rewrite the queries for better performance.
```

2. Read the AI's analysis. It should confirm Version B is stronger because it leads with the goal.

3. Now write your own prompt for a task you care about. **Start with one sentence that states the goal.** Paste it into the chat and ask:

```
Here is a prompt I wrote. Score it 1–10 on clarity, then rewrite it to be
stronger. Explain every change you made.

[paste your prompt here]
```

### Challenge
Rewrite 3 prompts from your recent chat history using goal-first structure. Compare the AI's responses to the originals.

---

## Exercise 2 — Providing Context Effectively

### Concept
After the goal, the AI needs **context** — but not all context is equal. Effective context answers three questions:
- What **system/project** is this about?
- What **tech stack** is involved?
- What has **already been tried** or decided?

Irrelevant context (project history, team politics, unrelated files) dilutes the signal.

### Bad → Good

**Bad context:**
```
We started this project last year and it's gone through a lot of changes.
The original dev left and now I'm maintaining it. We use a bunch of stuff.
```

**Good context:**
```
- Project: E-commerce order service (microservice)
- Stack: Java 17, Spring Boot 3.2, PostgreSQL 15, deployed on AWS ECS
- Current state: The /orders endpoint returns 200 but takes 4+ seconds under load
- Already tried: Added connection pooling (HikariCP), no improvement
```

### Your Turn

1. Paste this into your AI chat:

```
I'm going to give you a prompt with poor context. Rewrite it with strong,
structured context. Use bullet points. Remove anything irrelevant. Add any
context you think is missing (mark those with "[FILL IN]" so I know to
provide the real values).

Original prompt:
"We have a Node.js app and it crashes sometimes in production. The logs show
some error about memory. It's been happening for a few weeks. We're on AWS.
Can you figure out what's wrong?"
```

2. Review the AI's rewrite. It should produce structured context with tech details, error specifics, and environment info.

3. Now do it yourself — take a problem you're working on and write the context section using this format:

```
- Project: [name and what it does, one line]
- Stack: [languages, frameworks, versions]
- Current state: [what's happening now]
- Already tried: [what hasn't worked]
- Relevant files: [file names or modules]
```

Paste it into the chat and ask the AI to evaluate whether the context is sufficient.

### Challenge
Ask the AI: *"What additional context would you need to solve this problem confidently?"* — then fill in the gaps it identifies.

---

## Exercise 3 — Setting Constraints That Shape the Output

### Concept
Constraints tell the AI what the output **should and shouldn't** look like. Without them, the AI picks its own format, length, and style — which may not match what you need. Good constraints cover:

- **Format** — code, bullet list, table, paragraph, JSON, etc.
- **Length** — word count, number of items, "fit on one screen"
- **Audience** — senior dev, junior dev, non-technical stakeholder
- **Exclusions** — what to leave out ("don't change module X", "no new dependencies")

### Your Turn

1. Paste this into your AI chat:

```
Here is a prompt with no constraints. Add 4–5 constraints that would make the
output more useful for a senior developer reviewing a pull request.

Original prompt:
"Explain what this function does."

Add constraints for: output format, length, audience, what to focus on, and
what to skip.
```

2. Review the AI's version. It should add things like "explain in 3–5 bullet points," "assume the reader is a senior developer," "focus on side effects and edge cases," etc.

3. Now practice on your own. Paste a simple prompt into the chat and ask:

```
I wrote this prompt but it has no constraints. Suggest 5 constraints I should
add to get a more useful response. For each constraint, explain why it helps.

My prompt: [paste your prompt here]
```

### Challenge
Write the same prompt with two different constraint sets — one for a junior developer audience and one for a senior developer audience. Run both and compare how the outputs differ.

---

## Exercise 4 — Few-Shot Prompting (Teaching by Example)

### Concept
**Few-shot prompting** means giving the AI one or more examples of the input → output pattern you want *before* asking it to perform the task. This is one of the most powerful techniques available — it lets you show rather than tell.

- **Zero-shot**: No examples, just instructions.
- **One-shot**: One example.
- **Few-shot**: Two or more examples.

Use few-shot when the desired output format is unusual, when the AI keeps getting the format wrong, or when you need a very specific style.

### Your Turn

1. Paste this into your AI chat:

```
I want to write commit messages in a specific format. Here are 3 examples of
the style I want:

Example 1:
Input: Added retry logic to the payment service when Stripe returns a 503
Output: fix(payments): add retry with exponential backoff for Stripe 503 errors

Example 2:
Input: Updated the user table to include a `last_login` timestamp column
Output: feat(db): add last_login column to users table

Example 3:
Input: Removed the deprecated /v1/search endpoint
Output: chore(api): remove deprecated /v1/search endpoint

Now write a commit message in the same style for this change:
Input: Fixed a bug where the email notification was sent twice when a user
registered
```

2. Check the output. It should follow the `type(scope): description` pattern from your examples.

3. Now create your own few-shot prompt. Think of a task where you want a **specific output format** — commit messages, PR descriptions, code comments, error messages, test names, etc. Write 2–3 examples and then ask the AI to generate a new one.

```
I want [type of output] in this specific format. Here are my examples:

Example 1:
Input: [describe the situation]
Output: [show the desired output]

Example 2:
Input: [describe the situation]
Output: [show the desired output]

Now generate the output for:
Input: [your new situation]
```

### Challenge
Try the same task with zero-shot (no examples) vs. few-shot (3 examples). Compare the quality of the outputs and note the differences.

---

## Exercise 5 — Chain-of-Thought Prompting

### Concept
**Chain-of-thought (CoT)** prompting asks the AI to show its reasoning step by step before giving a final answer. This dramatically improves accuracy on tasks involving:
- Debugging (tracing through code logic)
- Multi-step problems (architecture decisions, migration plans)
- Anything where the AI might "jump to a conclusion" and get it wrong

The key phrase is: **"Think step by step."**

### Your Turn

1. Paste this into your AI chat — first **without** chain-of-thought:

```
What is the output of this code?

function mystery(arr) {
  let result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] % 2 === 0) {
      result.push(arr[i] * 2);
    }
  }
  return result;
}

console.log(mystery([1, 2, 3, 4, 5, 6]));
```

2. Note the answer. Now paste the same prompt **with** chain-of-thought:

```
What is the output of this code? Think step by step — trace through each
iteration of the loop, show the value of i, whether the condition is true,
and what gets pushed to result.

function mystery(arr) {
  let result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] % 2 === 0) {
      result.push(arr[i] * 2);
    }
  }
  return result;
}

console.log(mystery([1, 2, 3, 4, 5, 6]));
```

3. Compare the two responses. The CoT version should show each loop iteration explicitly, making it easier to verify correctness.

4. Now apply this to a real debugging scenario:

```
I have a bug in my code. Before suggesting a fix, think step by step:
1. Read the code and explain what each section does.
2. Trace the execution with the failing input.
3. Identify where the actual behavior diverges from expected behavior.
4. Only then suggest a minimal fix.

[paste your buggy code here]

Failing input: [describe]
Expected output: [describe]
Actual output: [describe]
```

### Challenge
Try adding "Think step by step" to 3 different types of prompts (debugging, architecture, data analysis) and note which ones benefit the most.

---

# Module 2 — Building Reusable Prompt Templates

> Now that you know the core techniques, you'll build **reusable templates** that anyone on the team can fill in and get consistent results — no prompt-engineering knowledge required.

---

## Exercise 6 — Build a Bug Fix Template

### Concept
Bug fixes are one of the most common AI tasks. A good bug-fix template ensures the AI always gets: the symptom, the expected behavior, the tech stack, what's been tried, and output constraints.

### Your Turn

1. Paste this into your AI chat:

```
Create a reusable prompt template for asking AI to help fix a bug. The template
should have fill-in-the-blank placeholders using [SQUARE BRACKETS]. It must
include these sections:

- GOAL: one-sentence bug description
- CONTEXT: language, framework, file/module, what the code should do
- SYMPTOM: exact error message or unexpected behavior
- EXPECTED BEHAVIOR: what should happen instead
- ALREADY TRIED: previous attempts that didn't work
- CONSTRAINTS: things the fix must not change
- OUTPUT FORMAT: what the AI's response should look like

After the template, write a short example showing the template filled in for a
real bug (e.g., a NullPointerException in a Spring Boot service).

Output ONLY the template and the filled-in example.
```

2. Review the template. Check that:
   - [ ] Every section has a `[PLACEHOLDER]`
   - [ ] The output format section specifies root-cause analysis + code fix
   - [ ] The example is realistic and complete

3. **Save the template** in a file called `templates/bug-fix.md` in your repo.

### Challenge
Test the template by filling it in with a real bug from your project, then paste the filled-in version into a new AI chat and evaluate the response quality.

---

## Exercise 7 — Build a Code Generation Template

### Concept
When asking AI to write code, vague prompts produce vague code. A template forces you to specify inputs, outputs, constraints, and coding standards every time.

### Your Turn

1. Paste this into your AI chat:

```
Create a reusable prompt template for asking AI to generate code. It should
include these sections with [PLACEHOLDER] values:

- GOAL: what the code should do
- LANGUAGE/FRAMEWORK: e.g., Python 3.12 / FastAPI
- INPUTS: what data or parameters the code receives
- OUTPUTS: what it returns or produces
- CONSTRAINTS: performance requirements, coding standards, libraries
  allowed/forbidden, backward compatibility needs
- EDGE CASES: specific scenarios the code must handle
- OUTPUT FORMAT: working code with inline comments, plus a brief explanation
  of design decisions

Also include a filled-in example for: "Write a Python function that validates
and parses a CSV upload, returning structured data or detailed error messages."

Output ONLY the template and the filled-in example.
```

2. Review and save as `templates/code-gen.md`.

---

## Exercise 8 — Build a Code Review Template

### Concept
AI-assisted code review works best when you tell the AI **what to focus on** — otherwise it gives generic feedback. This template targets specific quality dimensions.

### Your Turn

1. Paste this into your AI chat:

```
Create a reusable prompt template for asking AI to review code. It should
include:

- GOAL: what kind of review (quality, performance, security, readability, etc.)
- CODE: placeholder for pasting the code
- CONTEXT: what the code does, where it fits in the system
- FOCUS AREAS: specific concerns (e.g., error handling, SQL injection, N+1
  queries, memory leaks, naming conventions)
- KNOWN CONSTRAINTS: things that can't change (API contract, backward compat)
- OUTPUT FORMAT: issues listed by severity (critical → minor), with suggested
  fixes and code snippets

Include a filled-in example reviewing a REST controller for security issues.

Output ONLY the template and the filled-in example.
```

2. Review and save as `templates/code-review.md`.

---

## Exercise 9 — Build a Documentation Template

### Concept
Documentation is tedious to write by hand but easy for AI — if you specify the audience, format, and scope clearly. This template ensures consistent docs across the team.

### Your Turn

1. Paste this into your AI chat:

```
Create a reusable prompt template for asking AI to write documentation. Include:

- GOAL: what to document (function, API endpoint, architecture, onboarding guide)
- CONTEXT: project or system it belongs to
- AUDIENCE: who will read it (junior dev, senior dev, non-technical stakeholder,
  new team member)
- SCOPE: what to include and what to leave out
- FORMAT: paragraph, bullet list, table, README structure, JSDoc/Javadoc, etc.
- LENGTH: approximate word count or section count
- TONE: technical, conversational, formal

Include a filled-in example for: "Document the authentication flow for a new
developer joining the team."

Output ONLY the template and the filled-in example.
```

2. Review and save as `templates/documentation.md`.

### Challenge
Use the documentation template to generate docs for something real in your project, then have a teammate read it and give feedback.

---

## Exercise 10 — Have AI Generate a Template for Any Task

### Concept
You don't need to hand-craft every template. You can ask the AI to **generate a template for any task type**, then review and refine it. This is a meta-skill — prompting AI to create the prompts you'll use later.

### Your Turn

1. Think of a task type your team does frequently that isn't covered by the templates above. Examples:
   - Writing unit tests
   - Creating migration scripts
   - Writing PR descriptions
   - Designing API contracts
   - Writing incident post-mortems

2. Paste this into your AI chat:

```
Create a reusable prompt template for the following task type: [YOUR TASK TYPE].

Requirements:
- Use [PLACEHOLDER] syntax for all variable parts.
- Include sections for: GOAL, CONTEXT, INPUTS, CONSTRAINTS, and OUTPUT FORMAT.
- Add any task-specific sections that make sense (e.g., EDGE CASES for testing,
  SEVERITY for incidents).
- After the template, show it filled in with a realistic example.
- Keep the template concise — someone should be able to fill it in under 2
  minutes.

Output ONLY the template and the filled-in example.
```

3. Review the template. Ask the AI to improve it:

```
Here is the template you generated. Suggest 3 ways to make it more specific
and useful. For each suggestion, give me the exact text to add or change.
```

4. Save the final version in your `templates/` folder.

---

# Module 3 — Build Your Own Meta-Prompt

> A **meta-prompt** is a prompt that turns the AI into a prompt engineer. You paste it into a chat, the AI interviews you about your problem, and then it generates a high-quality prompt you can use in a separate conversation. In this module you'll build one from scratch — by prompting an LLM to write each section.

### Before you start

Create a blank file called `my-meta-prompt.md` in your repo. Leave it open — you'll paste into it after each exercise.

---

## Exercise 11 — Define the Role and Purpose

### Why this matters
Every good prompt starts by telling the AI **who it is** and **what it should do**. This sets the tone and scope for everything that follows. Without a clear role, the AI may try to solve your problem directly instead of helping you craft a prompt.

### What to do

Open GitHub Copilot Chat and paste this prompt:

```
I'm building a reusable "meta-prompt" — a set of instructions I can paste into
any AI chat so it becomes a prompt engineer that helps me write better prompts.

Right now I just need the opening section. Write me a short paragraph (3–5
sentences) that I will place at the top of my meta-prompt file. It should:

1. Tell the AI its role: "You are an expert prompt engineer."
2. Tell it its sole purpose: to help the user create a detailed, well-structured
   prompt that will be used in a SEPARATE AI conversation.
3. Make it clear that the AI must NOT solve the user's actual problem — only
   produce the prompt.

Write it in a direct, instructional tone. Use second person ("You are…",
"Your job is…"). Output only the paragraph, no extra commentary.
```

### Expected result
You should get a short paragraph that sounds something like:

> *You are an expert prompt engineer. Your sole job is to help the user create a detailed, well-structured prompt that they will then use in a separate AI conversation to solve their actual problem. You must not attempt to solve the user's problem yourself — only produce the prompt.*

### Save it
1. Copy the AI's output.
2. Open `my-meta-prompt.md`.
3. Add a heading and paste:

```markdown
# My Meta-Prompt

## SYSTEM INSTRUCTIONS

[paste the paragraph here]
```

---

## Exercise 12 — Create the Clarifying-Questions Protocol

### Why this matters
The biggest reason prompts fail is **missing context**. If your meta-prompt just says "generate a prompt," the AI will guess and fill in gaps with assumptions. Instead, we instruct it to **ask questions first** — like a consultant doing a discovery interview — so the generated prompt is grounded in real information.

### What to do

Paste this into your AI chat:

```
I'm continuing to build my meta-prompt file. I already have the role/purpose
section. Now I need the "clarifying questions" section.

Write instructions that tell the AI to ask the user clarifying questions BEFORE
generating a prompt. The questions should be asked in 3 rounds:

Round 1 — The Basics (3 questions):
- What problem is the user trying to solve?
- What type of task is it? (bug fix, code generation, code review, docs, etc.)
- What does "done" look like?

Round 2 — Context (3 questions):
- What languages, frameworks, or tools are involved?
- What has already been tried?
- Are there relevant files, error messages, or code snippets?

Round 3 — Constraints & Preferences (3 questions):
- Are there constraints? (don't change X, no new dependencies, etc.)
- What format should the final answer be in?
- Who is the audience?

Requirements for the instructions:
- Tell the AI to ask ONE round at a time and wait for the user's answers before
  continuing to the next round.
- After each round, the AI should briefly summarize what it has learned so the
  user can confirm or correct.
- If any answer is vague, the AI should ask a follow-up question before moving on.

Write this as a numbered set of instructions I can paste directly into my
meta-prompt file under a heading called "PHASE 1 — UNDERSTAND THE PROBLEM".
Output only the instructions, no extra commentary.
```

### Expected result
You should get a structured set of instructions with 3 rounds of questions plus rules about summarizing and follow-ups.

### Review checklist
- [ ] Does it tell the AI to ask questions **before** generating anything?
- [ ] Are the questions organized into clear rounds?
- [ ] Does it require a summary after each round?
- [ ] Does it handle vague answers?

### Save it
Paste the output into `my-meta-prompt.md` under the system instructions you added in Exercise 11.

---

## Exercise 13 — Add the Confirmation Step

### Why this matters
Before the AI generates a prompt, it should **play back its understanding** and get explicit confirmation. This prevents misunderstandings from silently propagating into the generated prompt. It's the same principle as reading back an order at a restaurant.

### What to do

Paste this into your AI chat:

```
Next section of my meta-prompt. After the AI finishes asking all clarifying
questions, it should present a structured summary and ask the user to confirm
before generating the prompt.

Write instructions for a section called "PHASE 2 — CONFIRM UNDERSTANDING" that
tell the AI to:

1. Present a summary in this exact format:

   HERE IS WHAT I UNDERSTAND:
   - Problem: [one sentence]
   - Task type: [category]
   - Goal: [desired outcome]
   - Tech stack: [languages/frameworks/tools]
   - Constraints: [list]
   - Output format: [format]
   - Audience: [who will read the output]

2. Ask: "Is this correct? Would you like to change or add anything before I
   generate the prompt?"

3. Only proceed to prompt generation once the user explicitly confirms.

Write this as a short, numbered instruction block. Output only the instructions.
```

### Expected result
A concise instruction block that describes the confirmation step with the summary template.

### Save it
Paste the output into `my-meta-prompt.md` right after the Phase 1 section.

---

## Exercise 14 — Define the Output Prompt Template

### Why this matters
This is the core of your meta-prompt: the **structure of the prompt that the AI will generate**. By defining labeled sections (ROLE, GOAL, CONTEXT, etc.), you ensure every generated prompt is consistent, complete, and easy for the next LLM to parse.

### What to do

Paste this into your AI chat:

```
Next section of my meta-prompt. After the user confirms the summary, the AI
should generate a prompt using a specific template structure.

Write instructions for a section called "PHASE 3 — GENERATE THE PROMPT" that
tell the AI to produce a prompt with these labeled sections:

- ROLE: A specific role relevant to the user's task
- GOAL: One clear sentence describing what the AI should accomplish
- CONTEXT: Project/system description, tech stack, background, what's been tried
- INPUTS: Any code, error messages, data, or files the AI needs
- CONSTRAINTS: A bulleted list of constraints
- OUTPUT FORMAT: Exactly how the AI should structure its response
- ADDITIONAL INSTRUCTIONS: Step-by-step thinking, assumption handling, etc.

Requirements:
- The generated prompt should be 100–400 words — concise but complete.
- The AI should use plain, direct language in the generated prompt.
- All section labels should be in ALL CAPS so the receiving LLM can parse them.

Write this as a clear instruction block with the template structure shown as an
example. Output only the instructions.
```

### Expected result
Instructions that include the template skeleton with all 7 labeled sections and guidance on length/tone.

### Review checklist
- [ ] Are all 7 sections present?
- [ ] Is there a word-count guideline?
- [ ] Does it specify plain, direct language?
- [ ] Are sections labeled in ALL CAPS?

### Save it
Paste the output into `my-meta-prompt.md` after Phase 2.

---

## Exercise 15 — Add the Review & Refine Loop

### Why this matters
The first draft of a generated prompt is rarely perfect. By adding a review step, you give the user a chance to iterate — adjusting wording, adding constraints, or changing the level of detail — before they take the prompt to a new conversation.

### What to do

Paste this into your AI chat:

```
Last main section of my meta-prompt. After the AI presents the generated prompt,
it should offer to refine it.

Write instructions for a section called "PHASE 4 — REVIEW & REFINE" that tell
the AI to:

1. Present the generated prompt to the user.
2. Ask: "Would you like me to adjust anything — wording, structure, constraints,
   or level of detail?"
3. Iterate until the user is satisfied.

Keep it short — 3–5 sentences max. Output only the instructions.
```

### Save it
Paste the output into `my-meta-prompt.md` after Phase 3.

---

## Exercise 16 — Add Guardrails

### Why this matters
Guardrails are rules that keep the AI on track. Without them, the AI might skip questions, make assumptions, or write a bloated 1,000-word prompt. Guardrails act as a safety net for consistent behavior.

### What to do

Paste this into your AI chat:

```
I need a "GUARDRAILS" section for my meta-prompt. Write 5–6 bullet-point rules
that the AI must always follow. Include rules like:

- Do not skip the clarifying questions — always ask before generating.
- Do not make assumptions — if something is unclear, ask.
- Keep the generated prompt concise (100–400 words).
- Use plain, direct language.
- Use labeled sections in the generated prompt.
- Do not solve the user's actual problem — only produce the prompt.

Write these as a bulleted list under the heading "GUARDRAILS". Output only the
list.
```

### Save it
Paste the output into `my-meta-prompt.md` after Phase 4.

---

## Exercise 17 — Add an Example Conversation (Optional but Recommended)

### Why this matters
An example conversation shows the AI **exactly** what the interaction should look like from start to finish. LLMs perform better when they can pattern-match against a concrete example. This is called **few-shot prompting** — a technique you learned in Exercise 4.

### What to do

Paste this into your AI chat:

```
Write a short example conversation that demonstrates how my meta-prompt should
work end to end. The example should show:

1. The AI asking Round 1 questions.
2. A user answering (use a realistic scenario — e.g., a React performance issue).
3. The AI asking Round 2 questions.
4. The user answering.
5. The AI asking Round 3 questions.
6. The user answering.
7. The AI presenting the confirmation summary.
8. The user confirming.
9. The AI outputting the final generated prompt.

Keep each exchange to 2–3 sentences. Format it as a blockquoted conversation
using "> **AI**:" and "> **User**:" prefixes. Output only the example.
```

### Save it
Paste the output into `my-meta-prompt.md` under a heading called "EXAMPLE CONVERSATION FLOW" at the bottom of the file.

---

## Exercise 18 — Test Your Meta-Prompt

### Why this matters
The only way to know if your meta-prompt works is to **use it**. This exercise has you start a fresh conversation, paste your entire meta-prompt, and walk through it with a real problem.

### What to do

1. **Open a new chat** in GitHub Copilot Chat.
2. **Copy the entire contents** of `my-meta-prompt.md`.
3. **Paste it** into the chat and press Enter.
4. The AI should begin by asking you Round 1 questions. **Answer them** using a real problem from your current work (or use a made-up scenario).
5. Walk through all 3 rounds of questions.
6. Check that the AI presents a confirmation summary.
7. Confirm and let it generate a prompt.
8. Review the generated prompt.

### Evaluation checklist
- [ ] Did the AI ask clarifying questions **before** generating a prompt?
- [ ] Did it ask questions in rounds (not all at once)?
- [ ] Did it summarize after each round?
- [ ] Did it present a confirmation summary and wait for approval?
- [ ] Is the generated prompt between 100–400 words?
- [ ] Does the generated prompt use labeled sections (ROLE, GOAL, etc.)?
- [ ] Did the AI offer to refine the prompt?

### If something didn't work
Go back to the relevant exercise and adjust that section of your meta-prompt. Common fixes:
- **AI skipped questions** → Strengthen the Phase 1 instructions with "You MUST ask questions before generating."
- **AI solved the problem instead** → Add to guardrails: "Under no circumstances should you solve the user's problem."
- **Generated prompt was too long** → Tighten the word-count constraint in Phase 3.
- **Missing sections in the generated prompt** → Make the template in Phase 3 more explicit.

---

## Exercise 19 — Customize for Your Team

### Why this matters
The meta-prompt you built is generic. To make it truly useful, you should tailor it to your team's tech stack, common tasks, and preferences.

### What to do

Paste this into your AI chat:

```
I have a working meta-prompt and I want to customize it for my team. Here is
some information about our work:

- We primarily work with [YOUR LANGUAGES/FRAMEWORKS — e.g., Java, Spring Boot,
  Angular, PostgreSQL].
- Our most common AI tasks are: [e.g., bug fixes, writing unit tests, code
  reviews, writing documentation].
- Our code must follow [YOUR STANDARDS — e.g., company style guide, specific
  linting rules, accessibility standards].
- We deploy to [YOUR PLATFORM — e.g., AWS, Azure, on-prem].

Suggest 3–5 specific changes I should make to my meta-prompt to tailor it for
this team. For each suggestion, give me the exact text I should add or modify.
```

Fill in the bracketed placeholders with your real information before sending.

### Save it
Apply the suggested changes to `my-meta-prompt.md`.

---

## Exercise 20 — Share and Version Your Meta-Prompt

### Why this matters
A meta-prompt that lives only on your machine helps only you. Sharing it with your team multiplies its value.

### What to do

**Option A — Store in your repo:**
```
prompts/
  meta-prompt.md       ← your finished file
  README.md            ← short instructions on how to use it
```

**Option B — GitHub Copilot custom instructions:**
Place shared instructions in your repo:
```
.github/copilot-instructions.md
```
Copilot will automatically include these instructions in every chat. You can reference the meta-prompt here or link to it.

### Commit it
```bash
git add my-meta-prompt.md
git commit -m "Add team meta-prompt for generating AI prompts"
git push
```

### Meta-Prompt Recap

| Phase | What It Does |
|-------|-------------|
| **System Instructions** | Sets the AI's role as a prompt engineer |
| **Phase 1 — Understand** | AI asks 3 rounds of clarifying questions |
| **Phase 2 — Confirm** | AI summarizes understanding and gets approval |
| **Phase 3 — Generate** | AI produces a structured prompt (ROLE, GOAL, CONTEXT, etc.) |
| **Phase 4 — Refine** | AI offers to iterate on the generated prompt |
| **Guardrails** | Rules that keep the AI focused and concise |
| **Example** | A sample conversation the AI can pattern-match against |

---

# Module 4 — Advanced Prompting Strategies

> These techniques go beyond the basics and are useful for complex, multi-step, or high-stakes tasks.

---

## Exercise 21 — Iterative Refinement (Treat It Like a Draft)

### Concept
The first AI response is a **draft, not a final answer**. Iterative refinement means sending follow-up prompts that improve the output incrementally. This is one of the most underused techniques — most people accept the first response or start over.

### Effective follow-up patterns:
- *"Make this more concise — cut it to half the length."*
- *"Add error handling for the case where X is null."*
- *"Rewrite this for a non-technical audience."*
- *"This is close but [specific issue]. Fix only that part."*

### Your Turn

1. Start a new chat and ask:

```
Write a Python function that fetches data from a REST API, retries on failure,
and caches results for 5 minutes.
```

2. Review the first response. Now send **three follow-up refinements**, one at a time:

```
Follow-up 1: Add type hints and a docstring. Use `httpx` instead of `requests`.
```

```
Follow-up 2: The retry logic should use exponential backoff with a max of 3
retries. Show the updated function only — don't repeat the explanation.
```

```
Follow-up 3: Add a unit test for the retry behavior using pytest and
respx for mocking.
```

3. Compare the final version to the first response. The iterative approach should produce significantly better code.

### Key takeaway
**Three short follow-ups > one giant prompt.** Each follow-up is easier to write and gives you a checkpoint to verify quality.

---

## Exercise 22 — Multi-Persona Prompting

### Concept
**Multi-persona prompting** asks the AI to analyze something from multiple perspectives and then synthesize them. This is useful for:
- Architecture decisions (developer vs. ops vs. security)
- Code reviews (performance vs. readability vs. maintainability)
- Trade-off analysis

### Your Turn

1. Paste this into your AI chat:

```
I need to decide whether to use a monorepo or a multi-repo setup for a new
microservices project (4 services, 6 developers, deploying to Kubernetes).

Analyze this decision from three perspectives:

1. As a **senior developer**, evaluate developer experience — code sharing,
   dependency management, and daily workflow.
2. As a **DevOps engineer**, evaluate CI/CD complexity, build times, and
   deployment independence.
3. As a **tech lead**, evaluate long-term maintainability, onboarding, and
   team scalability.

After all three perspectives, write a **synthesis** that weighs the trade-offs
and makes a recommendation with clear reasoning.

Format each perspective as a separate section with a heading.
```

2. Review the output. Each persona should surface different concerns.

3. Now try it with your own decision:

```
I need to decide [YOUR DECISION — e.g., which database, which framework,
build vs. buy, etc.].

Analyze from these perspectives:
1. As a [PERSONA 1], evaluate [DIMENSION 1].
2. As a [PERSONA 2], evaluate [DIMENSION 2].
3. As a [PERSONA 3], evaluate [DIMENSION 3].

Synthesize and recommend.
```

### Challenge
Use multi-persona for a code review: have the AI review the same code as a security engineer, then as a performance engineer, then as a readability-focused reviewer.

---

## Exercise 23 — Constraint-Based Generation

### Concept
Sometimes the best way to get specific output is to **over-constrain** the prompt. Instead of hoping the AI picks the right format, you define every dimension: structure, length, terminology, inclusions, exclusions.

This is especially useful for outputs that need to match a team standard (PR descriptions, ADRs, incident reports, API docs).

### Your Turn

1. Paste this into your AI chat:

```
Write an Architecture Decision Record (ADR) for choosing PostgreSQL over
MongoDB for the order management service.

Constraints:
- Use this exact structure: Title, Status, Context, Decision, Consequences
- Title must start with "ADR-001:"
- Status must be one of: Proposed, Accepted, Deprecated, Superseded
- Context section: exactly 3–5 sentences, no more
- Decision section: one clear sentence starting with "We will use…"
- Consequences section: exactly 3 bullet points — one positive, one negative,
  one neutral
- Total length: under 200 words
- Tone: formal, suitable for a team wiki
- Do not mention any database other than PostgreSQL and MongoDB
```

2. Check that **every constraint** was followed. If any were violated, point them out:

```
You missed these constraints: [list them]. Regenerate and follow ALL of them.
```

3. Now create your own over-constrained prompt for a format your team uses:

```
Write a [TYPE OF DOCUMENT] about [TOPIC].

Constraints:
- Structure: [exact sections]
- Length: [word/sentence/bullet count per section]
- Tone: [formal/conversational/technical]
- Must include: [specific elements]
- Must NOT include: [specific exclusions]
- Terminology: [use X, not Y]
```

### Challenge
Write a constraint set so tight that two different AI tools produce nearly identical outputs. This is the gold standard for repeatable prompt engineering.

---

# Module 5 — GitHub Copilot

> **Do this module if you have access to GitHub Copilot.** These exercises teach you how to get the most out of Copilot Chat's unique features.

---

## Exercise 24 — Context References: `@workspace`, `#file`, `#selection`

### Concept
Copilot Chat lets you inject context automatically using special references:
- **`@workspace`** — gives Copilot access to your entire repository structure
- **`#file:<filename>`** — references a specific file
- **`#selection`** — references the code you have highlighted in the editor

These are far more effective than pasting code into the chat manually. They keep the chat clean, provide accurate context, and update automatically if the file changes.

### Your Turn

1. Open a file in your editor that has a function you want explained.

2. **Highlight** the function, then type in Copilot Chat:

```
#selection Explain what this function does, what edge cases it handles, and
what edge cases it misses. Format as a bullet list.
```

3. Now try a workspace-wide question:

```
@workspace What authentication mechanism does this project use? List the
relevant files and explain the flow step by step.
```

4. Try referencing a specific file:

```
#file:package.json Are there any outdated or vulnerable dependencies? List
them with the current version and the recommended version.
```

5. Combine references with a template you built in Module 2:

```
#file:src/services/orderService.ts

GOAL: Review this file for error handling issues.
CONTEXT: This is a microservice that processes customer orders.
FOCUS AREAS: Missing try/catch blocks, unhandled promise rejections,
  generic catch blocks that swallow errors.
OUTPUT FORMAT: List issues by severity (critical → minor) with line
  numbers and suggested fixes.
```

### Key takeaway
Always use context references instead of pasting code. Combine them with your templates for powerful, context-aware prompts.

---

## Exercise 25 — Slash Commands: Built-In Prompt Shortcuts

### Concept
Copilot Chat has built-in slash commands that trigger specialized behaviors. These are shortcuts — each one is essentially a well-crafted prompt that GitHub has built in for you:

| Command | What It Does |
|---------|-------------|
| `/explain` | Explains the selected code |
| `/fix` | Suggests a fix for problems in the selected code |
| `/tests` | Generates unit tests for the selected code |
| `/doc` | Generates documentation comments |

You can combine these with your own instructions to get better results.

### Your Turn

1. **Select a function** in your editor, then try each slash command:

```
/explain — focus on what this function assumes about its inputs and what
happens when those assumptions are violated.
```

```
/fix — there's a potential null reference on line [X]. Fix only that issue
and explain the root cause.
```

```
/tests — use [your test framework, e.g., Jest/pytest/JUnit]. Cover:
1. Happy path with valid input
2. Edge case with empty input
3. Error case with invalid input
Write each test with a descriptive name that explains the scenario.
```

```
/doc — write JSDoc/Javadoc for this function. Include @param, @returns,
@throws, and a one-line description. Skip obvious parameters.
```

2. Notice that adding instructions **after** the slash command improves the output significantly compared to using the slash command alone.

### Key takeaway
Slash commands are a starting point, not the final prompt. Always add context and constraints after the command to shape the output.

---

## Exercise 26 — Custom Instructions: `.github/copilot-instructions.md`

### Concept
You can create a `.github/copilot-instructions.md` file in your repo that Copilot automatically includes in **every** chat conversation. This is where you encode your team's standards so nobody has to remember to include them manually.

### Your Turn

1. Paste this into Copilot Chat:

```
Write a `.github/copilot-instructions.md` file for a team that works with
[YOUR TECH STACK — e.g., TypeScript, React, Node.js, PostgreSQL]. It should
tell Copilot to:

- Always follow [YOUR CODING STANDARDS — e.g., Airbnb style guide]
- Use [YOUR PREFERRED PATTERNS — e.g., repository pattern, dependency injection]
- Write tests using [YOUR TEST FRAMEWORK — e.g., Jest, pytest, JUnit]
- Format code according to [YOUR FORMATTER/LINTER — e.g., Prettier, ESLint]
- Never suggest [THINGS TO AVOID — e.g., any, console.log in production code]
- When generating code, always include error handling for [COMMON CASES]
- Use [YOUR PROJECT'S NAMING CONVENTIONS — e.g., camelCase for variables,
  PascalCase for components]

Keep it under 30 lines. Make each instruction direct and specific.
Output the file content only.
```

2. Fill in the placeholders with your real team info before sending.

3. Review the output, then create the file:

```bash
mkdir -p .github
# paste the content into .github/copilot-instructions.md
```

4. **Test it**: Open a new Copilot Chat and ask it to write some code. Check that the generated code follows the instructions you just set.

### Key takeaway
Custom instructions are the highest-leverage Copilot feature for teams. Set them once, and every team member gets consistent, standards-compliant suggestions automatically.

### Challenge
Compare the output of the same prompt **before** and **after** adding custom instructions. Note the differences in code style, patterns, and conventions.

---

# Module 6 — Windsurf (Cascade)

> **Skip this module if you don't have Windsurf yet.** Come back when your team gets access. Windsurf's Cascade can read files, search your codebase, and make edits directly — your prompts become action-oriented, not just question-oriented.

---

## Exercise 27 — Codebase-Aware Prompting with Cascade

### Concept
Cascade has deep codebase awareness built in. Unlike tools where you manually reference files, Cascade can **read, search, and edit** your codebase autonomously. This means your prompts can be higher-level — describe the outcome, and Cascade figures out which files to touch.

Key context references:
- **`@file`** — reference a specific file by path
- **`@codebase`** — give Cascade access to search the entire project
- **`@web`** — let Cascade search the internet for documentation or solutions

### Your Turn

1. In Windsurf Chat, ask Cascade to explore your project:

```
@codebase Give me a brief summary of what this project does, the main
technologies used, and the entry point file. List the top-level folder
structure.
```

2. Ask it to find patterns across the codebase:

```
@codebase Find all the places in this project where we handle errors or
exceptions. List each file and line number. Are we consistent in our
error-handling approach? If not, describe the inconsistencies.
```

3. Ask it to take action (Cascade will propose changes for your approval):

```
@file:src/services/orderService.ts This function doesn't handle the case
where the API returns a 404. Add error handling that throws a descriptive
OrderNotFoundError. Don't change anything else in the file.
```

4. Combine codebase context with a template you built in Module 2:

```
@file:src/services/paymentService.ts

GOAL: Review this file for security issues.
CONTEXT: This service handles credit card tokenization via Stripe.
FOCUS AREAS: Input validation, secret handling, error messages that might
  leak internal details, missing authentication checks.
OUTPUT FORMAT: Issues by severity (critical → minor) with line numbers
  and suggested fixes.
```

### Key takeaway
Cascade's strength is that prompts can be **action-oriented** — you describe what to change, and it reads, edits, and proposes the diff. Use `@codebase` for discovery and `@file` for targeted work.

---

## Exercise 28 — Windsurf Rules and Workflows

### Concept
Windsurf has two mechanisms for reusable instructions — they map directly to concepts you already know:

| Windsurf Feature | What It Does | Equivalent To |
|-----------------|-------------|---------------|
| **Rules** (`.windsurf/rules/*.md`) | Always-on instructions included in every conversation | Copilot's `.github/copilot-instructions.md` |
| **Workflows** (`.windsurf/workflows/*.md`) | Saved multi-step prompts triggered by `/name` | Copilot's prompt files, Claude Code skills |

### Your Turn — Create a Rule

1. Paste this into Windsurf Chat:

```
Write a Windsurf rules file (`.windsurf/rules/team-standards.md`) for a
team that works with [YOUR TECH STACK]. The rule should tell Cascade to:

- Always follow [YOUR CODING STANDARDS]
- Use [YOUR PREFERRED PATTERNS]
- Write tests using [YOUR TEST FRAMEWORK]
- Never suggest [THINGS TO AVOID]

Use the Windsurf rules format: start with a short description line, then
the instructions as markdown. Keep it under 30 lines. Output only the
file content.
```

2. Save the output to `.windsurf/rules/team-standards.md`.

### Your Turn — Create a Workflow

1. Paste this into Windsurf Chat:

```
Write a Windsurf workflow file (`.windsurf/workflows/review-code.md`) that,
when I type `/review-code` in chat, does the following:

1. Asks which file to review.
2. Reads the file using @file.
3. Reviews it for: error handling, performance, security, and readability.
4. Lists issues by severity with suggested fixes.
5. Offers to apply the fixes directly.

Use the Windsurf workflow format with YAML frontmatter (name, description)
followed by markdown steps. Output only the file content.
```

2. Save it and test by typing `/review-code` in a new Windsurf Chat.

3. Now create a workflow for a task your team does frequently:

```
Write a Windsurf workflow for: [YOUR TASK — e.g., "generate unit tests for
a service class"]. It should:

1. [Step 1 — e.g., "Ask which file to test"]
2. [Step 2 — e.g., "Read the file and identify public methods"]
3. [Step 3 — e.g., "Generate tests using JUnit 5 and Mockito"]
4. [Step 4 — e.g., "Write the test file next to the source file"]

Use Windsurf workflow format with YAML frontmatter. Output only the file.
```

### Key takeaway
Rules = "always do this" (set once, affects every conversation). Workflows = "do this when I ask" (triggered on demand with `/name`). Together they let you encode team standards **and** automate specific tasks.

### Challenge
Create 3 workflows for your team's most common tasks and commit them to `.windsurf/workflows/`. Have a teammate test them.

---

# Module 7 — Claude Code

> **Skip this module if you don't have Claude Code yet.** Come back when your team gets access. Claude Code operates directly in your terminal with full codebase awareness, and its customization system (CLAUDE.md, skills, hooks) is the most programmable of the three tools.

---

## Exercise 29 — CLAUDE.md: Project Instructions

### Concept
`CLAUDE.md` is Claude Code's equivalent of project instructions. Place it at the root of your repo (or in any subfolder) and Claude Code reads it automatically at the start of every conversation.

What makes it different:
- **Hierarchical** — you can have a root `CLAUDE.md` plus folder-level ones (e.g., `src/api/CLAUDE.md`) that add context for that area of the codebase
- **Automatically loaded** — no need to reference it; Claude reads it on startup
- **Markdown format** — same format as everything else you've been writing

### Your Turn

1. Open Claude Code in your terminal and paste this prompt:

```
Help me write a CLAUDE.md file for the root of my project. Here's the info:

- Project: [NAME — what it does in one sentence]
- Stack: [languages, frameworks, versions]
- Coding standards: [style guide, linter, formatter]
- Test framework: [e.g., Jest, pytest, JUnit] with [coverage requirements]
- Architecture: [e.g., monolith, microservices, monorepo — key patterns]
- Common commands: [build, test, lint, deploy commands]
- Things to avoid: [anti-patterns, deprecated APIs, etc.]

Write it as a concise CLAUDE.md (under 50 lines). Use markdown headers to
organize sections. Include a "Common Commands" section with the exact shell
commands for building, testing, and linting. Output only the file content.
```

2. Save the output as `CLAUDE.md` in your repo root.

3. **Test it**: Start a new Claude Code session in the repo and ask it to write some code. Check that it follows the standards you defined.

4. (Optional) Create a subfolder-level CLAUDE.md:

```
Write a CLAUDE.md for the `src/api/` folder of my project. This folder
contains [DESCRIPTION — e.g., "REST API controllers using Express.js"].
Add instructions specific to this folder:
- [e.g., "All endpoints must validate request body with Zod schemas"]
- [e.g., "Use the ApiError class for error responses, never throw raw errors"]
- [e.g., "Every new endpoint needs an integration test in __tests__/"]

Keep it under 20 lines. Output only the file content.
```

### Key takeaway
Think of CLAUDE.md as a briefing document for a new team member — what they need to know before touching code in this project. The hierarchical system lets you add specialized context where it matters.

---

## Exercise 30 — Skills: Reusable Slash Commands

### Concept
**Skills** in Claude Code are reusable prompt templates saved as markdown files. Once created, any team member can trigger them with a slash command (e.g., `/generate-tests`). They're the Claude Code equivalent of Windsurf workflows and Copilot prompt files.

Skills are stored in:
- **Project skills**: `.claude/skills/*.md` (shared with the team via git)
- **Personal skills**: `~/.claude/skills/*.md` (only on your machine)

Each skill file is a markdown document with instructions that Claude Code follows when you invoke it.

### Your Turn

1. Ask Claude Code to help you create a skill:

```
Create a Claude Code skill file (`.claude/skills/review-pr.md`) that,
when invoked, does the following:

1. Asks which branch or PR to review (or defaults to the current branch diff)
2. Reads the changed files using git diff
3. Reviews each file for:
   - Bugs or logic errors
   - Missing error handling
   - Security issues
   - Code style violations based on the project's CLAUDE.md
4. Produces a summary organized by severity (critical → minor)
5. Offers to generate fix suggestions for critical issues

Write it as a markdown file with clear instructions. Include a frontmatter
section with the skill name and description. Output only the file content.
```

2. Save and test: run `/review-pr` in Claude Code.

3. Now create a skill for a task your team does frequently. Use this pattern:

```
Create a Claude Code skill (`.claude/skills/[SKILL-NAME].md`) that:

1. [STEP 1 — what Claude should do first]
2. [STEP 2 — what comes next]
3. [STEP 3 — the main action]
4. [STEP 4 — output or follow-up]

Context:
- This skill will be used for [TASK DESCRIPTION]
- Our stack is [TECH STACK]
- The output should follow [STANDARDS/FORMAT]

Write it as a markdown skill file. Output only the file content.
```

### Key takeaway
Skills turn your best prompts into one-command workflows the whole team can use. If you find yourself typing the same multi-step prompt more than twice, make it a skill.

---

## Exercise 31 — Hooks and MCP Servers

### Concept
Claude Code has two power features with no equivalent in Copilot or Windsurf:

**Hooks** — scripts that run automatically before or after Claude Code actions:
- `PreToolUse` — runs before Claude uses a tool (e.g., validate before writing a file)
- `PostToolUse` — runs after a tool completes (e.g., auto-format after code generation)
- `PreCommit` — runs before committing (e.g., run linter, check for secrets)

**MCP Servers** — external tool integrations that give Claude Code new capabilities (database access, API calls, Jira integration, etc.)

### Your Turn — Create a Hook

1. Ask Claude Code:

```
Help me create a Claude Code hook that automatically runs our linter after
any file is written or edited. The hook should:

- Trigger: after any file write (PostToolUse for Write and Edit tools)
- Action: run [YOUR LINT COMMAND — e.g., "npx eslint --fix"] on the
  changed file
- Only run on files matching [PATTERN — e.g., "*.ts", "*.tsx"]
- If the linter finds errors, show them to Claude so it can fix them

Show me the settings.json configuration for this hook and explain each field.
```

2. Review the configuration and add it to your `.claude/settings.json`.

3. **Test it**: Ask Claude Code to write a function with intentionally sloppy formatting. The hook should auto-format it.

### Your Turn — Understand MCP Servers

1. Ask Claude Code:

```
Explain MCP (Model Context Protocol) servers in Claude Code. Specifically:
1. What are they and what problem do they solve?
2. Give me 3 practical examples of MCP servers a development team would use
   (e.g., database, Jira, Slack).
3. For one of those examples, show me what the configuration in
   settings.json would look like.
4. How does a team share MCP server configurations?

Keep the explanation under 300 words. I'm a developer, not an AI researcher.
```

2. If your team uses a tool that has an MCP server (Jira, Linear, Postgres, etc.), try setting it up.

### Key takeaway
Hooks let you enforce team standards automatically — no discipline required. MCP servers extend what Claude Code can do beyond just reading code. Together, they make Claude Code the most customizable of the three tools.

### Challenge
Create a `PreCommit` hook that checks for hardcoded secrets (API keys, passwords) before allowing a commit.

---

# Module 8 — Automating Client Work

> This is where everything comes together with a practical focus: **how to identify tasks in client projects that your AI tool can help automate, and how to build the prompts to do it.** These exercises work with any tool.

---

## Exercise 32 — Identify Automatable Tasks

### Concept
Not every task is a good fit for Copilot. The best candidates are:
- **Repetitive** — you or the team do it frequently across projects
- **Well-defined** — clear inputs, expected outputs, known constraints
- **Code-centric** — involves writing, reviewing, transforming, or documenting code
- **Low-risk to iterate** — a wrong first attempt is cheap to fix

Poor candidates: tasks requiring deep business domain judgment, tasks with ambiguous requirements, or tasks where the output is highly creative and subjective.

### Your Turn

1. Think about your current or recent client work. Paste this into Copilot Chat:

```
I work on client software projects. Here are some tasks my team does regularly:

- [TASK 1 — e.g., writing CRUD endpoints for new entities]
- [TASK 2 — e.g., writing unit tests for service classes]
- [TASK 3 — e.g., converting SQL queries to ORM calls]
- [TASK 4 — e.g., writing API documentation from code]
- [TASK 5 — e.g., creating migration scripts for schema changes]
- [TASK 6 — e.g., reviewing PRs for security issues]

For each task, rate it as HIGH / MEDIUM / LOW suitability for automation
with an AI coding assistant (GitHub Copilot Chat — not agent mode, just chat).

For each rating, explain:
- Why it's suitable or not
- What parts could be automated vs. what needs human judgment
- What the prompt would need to include for good results

Format as a table.
```

2. Review the ratings. You should see that tasks with clear structure and repeatable patterns score highest.

3. Pick the **top 2 HIGH-rated tasks**. You'll build prompts for them in the next exercises.

### Challenge
Add tasks specific to your client's industry (healthcare compliance checks, financial data validation, etc.) and re-evaluate.

---

## Exercise 33 — Build a Client-Specific Prompt Template

### Concept
A client-specific prompt template is just like the templates from Module 2, but tailored to a specific client's tech stack, patterns, and requirements. The goal: any developer on your team can fill it in and get output that matches the client's standards.

### Your Turn

1. Pick one of the HIGH-rated tasks from Exercise 32. Paste this into Copilot Chat:

```
I need to create a reusable prompt template that my team can use in GitHub
Copilot Chat to automate the following task for a client project:

Task: [DESCRIBE THE TASK — e.g., "Generate unit tests for Spring Boot
service classes"]

Client context:
- Tech stack: [e.g., Java 17, Spring Boot 3.2, JUnit 5, Mockito, PostgreSQL]
- Coding standards: [e.g., Google Java Style, 80% code coverage minimum]
- Patterns used: [e.g., repository pattern, service-controller layers,
  DTOs for API responses]
- Special requirements: [e.g., all tests must use @Transactional with
  rollback, test database is H2 in-memory]

Create a prompt template with [PLACEHOLDER] syntax that:
1. Is specific enough to produce output matching this client's standards
2. Is generic enough that the team can use it for any class in this project
3. Includes a filled-in example showing the template in use

The template should work when pasted directly into Copilot Chat alongside
a #file reference to the target class.

Output ONLY the template and the filled-in example.
```

2. Review the template. Test it by filling it in for a real class in your project:
   - Use `#file:<path>` in Copilot Chat to reference the target file
   - Paste the filled-in template
   - Evaluate the output against the client's standards

3. If the output isn't right, iterate:

```
The generated output has these issues: [list them].
Update the template to prevent these issues. Add constraints or examples
as needed.
```

4. Save the final template in `templates/client-[project-name]/[task].md`.

### Key takeaway
Client-specific templates are your team's biggest time saver. Once a template produces good output, anyone can use it — no prompt engineering knowledge needed.

---

## Exercise 34 — Test and Validate Your Client Prompt

### Concept
A prompt template isn't ready until you've tested it against **multiple real inputs** and verified the output is production-quality. This exercise walks you through a validation workflow.

### Your Turn

1. Take the template you built in Exercise 33.

2. Fill it in for **3 different inputs** from the same client project (e.g., 3 different service classes, 3 different API endpoints, 3 different bug reports).

3. For each, run it in Copilot Chat using `#file` references and evaluate:

| Criterion | Input 1 | Input 2 | Input 3 |
|-----------|---------|---------|---------|
| Follows client coding standards? | Y/N | Y/N | Y/N |
| Correct and complete output? | Y/N | Y/N | Y/N |
| Required manual edits? | none / minor / major | ... | ... |
| Time saved vs. manual? | estimate | ... | ... |

4. If any input produced poor output, diagnose why:

```
I used this prompt template: [paste template]
With this input: [paste the input that failed]
The output had these problems: [list them]

What should I change in the template to prevent these problems?
Suggest specific additions or modifications.
```

5. Update the template and re-test until all 3 inputs produce good output.

6. **Document it**: At the top of the template file, add a short note:

```markdown
<!-- Tested against: OrderService, PaymentService, ShippingService -->
<!-- Last validated: [date] -->
<!-- Typical time saved: ~15 min per class -->
```

### Key takeaway
A template that works for 1 input is a draft. A template that works for 3+ diverse inputs is ready to share with the team.

---

# Module 9 — Putting It All Together

---

## Exercise 35 — End-to-End Challenge

### Concept
This exercise combines everything you've learned. You'll take a real problem, use the right technique to solve it, and evaluate the quality of the result.

### Your Turn

1. **Pick a real task** from your current work. Choose one:
   - A bug you need to fix
   - A feature you need to implement
   - Code you need to review
   - Documentation you need to write

2. **Decide which technique fits**:

| Task | Best Technique |
|------|---------------|
| Bug fix | Bug-fix template (Ex. 6) + chain-of-thought (Ex. 5) |
| New feature | Code-gen template (Ex. 7) + iterative refinement (Ex. 21) |
| Code review | Code-review template (Ex. 8) + multi-persona (Ex. 22) |
| Documentation | Documentation template (Ex. 9) + audience constraints (Ex. 3) |
| Architecture decision | Multi-persona (Ex. 22) + constraint-based (Ex. 23) |
| Client task automation | Client template (Ex. 33) + validation (Ex. 34) |
| Not sure how to start | Meta-prompt (Ex. 11–20) to generate the prompt for you |

3. **Build your prompt** using the matching template from Module 2 (or Module 8 for client work), enhanced with techniques from Modules 1 and 4.

4. **Run it** in your AI tool, using the tool-specific features from Modules 5–7.

5. **Refine** with 2–3 follow-up messages.

6. **Evaluate** the final result:
   - [ ] Did the output match the requested format?
   - [ ] Was the quality high enough to use (or nearly so)?
   - [ ] Did the prompt + follow-ups take less time than doing it manually?

---

## Bonus — Build a Team Prompt Library

### Concept
The most productive teams don't start from scratch every time — they maintain a **shared prompt library** that anyone can use. This includes both general templates and client-specific ones.

### Your Turn

1. Paste this into your AI tool's chat:

```
I want to create a team prompt library stored in our repo under a `prompts/`
folder. Based on the following common tasks our team performs, suggest a
folder structure and list the template files we should create:

Common tasks:
- [TASK 1 — e.g., fixing bugs]
- [TASK 2 — e.g., writing unit tests]
- [TASK 3 — e.g., code reviews]
- [TASK 4 — e.g., writing API documentation]
- [TASK 5 — e.g., incident post-mortems]

For each template file, write a one-line description of what it does.
Also include a README.md that explains how to use the library.

Output the folder structure and the README content.
```

2. Review the structure and create the files in your repo.

3. Fill in each template using the techniques from this workbook (or use Exercise 10 to have AI generate them).

4. Commit and share with your team:

```bash
git add prompts/
git commit -m "Add team prompt library with reusable templates"
git push
```

---

## Quick Reference — When to Use What

| Technique | Use When… |
|-----------|-----------|
| **Goal-first writing** | Every prompt — always start with the goal |
| **Structured context** | The AI needs project/tech/history details |
| **Constraints** | You need a specific format, length, or style |
| **Few-shot examples** | The output format is unusual or very specific |
| **Chain-of-thought** | Debugging, logic, or multi-step reasoning |
| **Iterative refinement** | The first response is close but not right |
| **Multi-persona** | Architecture decisions, trade-off analysis |
| **Constraint-based** | Team standards, repeatable outputs |
| **Templates** | Any task the team does repeatedly |
| **Client templates** | Automating repetitive client work |
| **Meta-prompt** | When you're not sure how to write the prompt at all |
| **Context references** | Always — give the AI real code context, don't paste |
| **Project instructions** | Set once per repo, enforces team standards automatically |

### Where to Put Things (By Tool)

| What | Copilot | Windsurf | Claude Code |
|------|---------|----------|-------------|
| Team standards | `.github/copilot-instructions.md` | `.windsurf/rules/*.md` | `CLAUDE.md` |
| Reusable prompts | `.github/prompts/*.prompt.md` | `.windsurf/workflows/*.md` | `.claude/skills/*.md` |
| Templates | `prompts/templates/*.md` | `prompts/templates/*.md` | `prompts/templates/*.md` |

---

## What's Next

- **Review `prompt-guide.md`** for a quick-reference of all patterns and techniques.
- **Review `meta-prompt.md`** for a polished, ready-to-use meta-prompt you can compare yours against.
- **Set up project instructions** for every active project (whichever tool you use).
- **Build client-specific templates** for your top 3 repetitive tasks and share them with the team.
- **Practice daily** — the more you prompt, the faster you get.

---

*Good prompts are a skill, not a talent. Every exercise you complete makes the next prompt better.*
