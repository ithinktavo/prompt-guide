# Build Your Own Meta-Prompt — Hands-On Workbook

> **What you'll do**: In this workbook you will build a meta-prompt from scratch — step by step — by having a conversation with an LLM. By the end you'll have a reusable file that turns any AI assistant into a prompt engineer that interviews you and generates high-quality prompts on demand.
>
> **Prerequisites**: Access to **GitHub Copilot Chat** or **Windsurf (Cascade)**. No prior prompt-engineering experience required.
>
> **Time**: ~30–45 minutes

---

## How This Workbook Works

Each exercise follows the same pattern:

1. **Read** a short explanation of what you're about to do and why.
2. **Prompt** — copy the provided prompt into your AI tool and run it.
3. **Review** — look at the AI's output and compare it to the expected result.
4. **Refine** — tweak the output until you're happy with it.
5. **Save** — paste the final version into your meta-prompt file.

You will build your meta-prompt in a new file. Create it now:

- **In your repo**, create a blank file called `my-meta-prompt.md`.
- Leave it open — you'll paste into it after each exercise.

---

## Exercise 1 — Define the Role and Purpose

### Why this matters
Every good prompt starts by telling the AI **who it is** and **what it should do**. This sets the tone and scope for everything that follows. Without a clear role, the AI may try to solve your problem directly instead of helping you craft a prompt.

### What to do

Open GitHub Copilot Chat or Windsurf Chat and paste this prompt:

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

## Exercise 2 — Create the Clarifying-Questions Protocol

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
Paste the output into `my-meta-prompt.md` under the system instructions you added in Exercise 1.

---

## Exercise 3 — Add the Confirmation Step

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

## Exercise 4 — Define the Output Prompt Template

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

## Exercise 5 — Add the Review & Refine Loop

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

## Exercise 6 — Add Guardrails

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

## Exercise 7 — Add an Example Conversation (Optional but Recommended)

### Why this matters
An example conversation shows the AI **exactly** what the interaction should look like from start to finish. LLMs perform better when they can pattern-match against a concrete example. This is called **few-shot prompting**.

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

## Exercise 8 — Test Your Meta-Prompt

### Why this matters
The only way to know if your meta-prompt works is to **use it**. This exercise has you start a fresh conversation, paste your entire meta-prompt, and walk through it with a real problem.

### What to do

1. **Open a new chat** in GitHub Copilot Chat or Windsurf Chat.
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

## Exercise 9 — Customize for Your Team

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

## Exercise 10 — Share and Version Your Meta-Prompt

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
If your team uses GitHub Copilot, you can place shared instructions in:
```
.github/copilot-instructions.md
```
Copilot will automatically include these instructions in every chat.

**Option C — Windsurf Workflows:**
If your team uses Windsurf, you can save the meta-prompt as a workflow:
```
.windsurf/workflows/generate-prompt.md
```
Then anyone on the team can invoke it with `/generate-prompt` in Windsurf Chat.

### Commit it
```bash
git add my-meta-prompt.md
git commit -m "Add team meta-prompt for generating AI prompts"
git push
```

---

## Recap — What You Built

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

## Next Steps

- **Use it daily** — Every time you need to ask AI for help, run your meta-prompt first to generate a better prompt.
- **Iterate** — After a few uses, you'll notice patterns. Update your meta-prompt to handle them.
- **Share what works** — When a generated prompt produces great results, save it as a template for the team.
- **Review `meta-prompt.md`** in this repo for a polished reference implementation you can compare against.

---

*You now know how to build a meta-prompt from scratch by prompting an LLM. The key insight: you don't need to be a prompt engineer — you just need to tell the AI to be one for you.*
