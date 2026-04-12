# Prompt Engineering — Quick Reference

> **What this is**: A one-page reference card for writing effective prompts in GitHub Copilot Chat. Use this alongside the [Workbook](workbook.md) for hands-on practice or the [Topic Outline](prompt-guide-topics.md) for the full curriculum.

---

## The 6-Step Prompt Formula

| Step | What to Do | Example |
|------|-----------|---------|
| **1. Goal** | Lead with what you want back — one clear sentence | "Fix the N+1 query in the OrderRepository" |
| **2. Context** | Project, stack, file, what's been tried | "Spring Boot 3.2, PostgreSQL, the `/orders` endpoint" |
| **3. Constraints** | Format, length, audience, exclusions | "Don't change the API contract, keep backward compat" |
| **4. Examples** | Show input → expected output (few-shot) | "Like this: `feat(api): add pagination to /orders`" |
| **5. Step-by-step** | Ask for reasoning on complex tasks | "Think step by step before suggesting a fix" |
| **6. Refine** | Iterate — treat the first response as a draft | "Make it more concise. Add error handling for nulls." |

---

## Prompt Patterns

### Role-Based
```
You are a [role]. [Task with role-specific context].
```

### Chain of Thought
```
Think step by step:
1. Read the code and explain what each section does.
2. Trace execution with the failing input.
3. Identify where actual behavior diverges from expected.
4. Suggest a minimal fix.
```

### Few-Shot (Teaching by Example)
```
I want [output type] in this format:

Example 1:
Input: [situation]
Output: [desired output]

Example 2:
Input: [situation]
Output: [desired output]

Now generate for:
Input: [new situation]
```

### Multi-Persona
```
Analyze [topic] from three perspectives:
1. As a [persona 1], evaluate [dimension 1].
2. As a [persona 2], evaluate [dimension 2].
3. As a [persona 3], evaluate [dimension 3].
Synthesize and recommend.
```

### Constraint-Based
```
Write [content] with these constraints:
- Structure: [exact sections]
- Length: [per-section limits]
- Must include: [specific elements]
- Must NOT include: [exclusions]
```

---

## GitHub Copilot Chat — Key Features

### Context References
| Reference | What It Does | When to Use |
|-----------|-------------|-------------|
| `@workspace` | Gives Copilot your full repo context | Codebase-wide questions, architecture, finding files |
| `#file:<path>` | References a specific file | Reviewing, explaining, or modifying a known file |
| `#selection` | References highlighted code in editor | Explaining, fixing, or testing selected code |

### Slash Commands
| Command | What It Does | Pro Tip |
|---------|-------------|---------|
| `/explain` | Explains selected code | Add "focus on edge cases" or "for a junior dev" |
| `/fix` | Suggests a fix | Add "fix only [specific issue], explain root cause" |
| `/tests` | Generates unit tests | Add framework name + specific scenarios to cover |
| `/doc` | Generates doc comments | Add format (JSDoc/Javadoc) + what to skip |

### Custom Instructions
Store team-wide instructions in `.github/copilot-instructions.md` — Copilot includes them in every chat automatically.

---

## Reusable Template Structure

```
GOAL: [What you want — one sentence]
CONTEXT:
- Project: [name, what it does]
- Stack: [languages, frameworks, versions]
- Current state: [what's happening now]
- Already tried: [what didn't work]
CONSTRAINTS:
- [Constraint 1]
- [Constraint 2]
OUTPUT FORMAT: [How the response should be structured]
```

---

## Common Templates

### Bug Fix
```
GOAL: [One-sentence bug description]
CONTEXT: [Language, framework, file, what the code should do]
SYMPTOM: [Exact error message or unexpected behavior]
EXPECTED: [What should happen instead]
ALREADY TRIED: [Previous attempts]
CONSTRAINTS: [What the fix must not change]
OUTPUT: Root-cause analysis, then minimal code fix.
```

### Code Generation
```
GOAL: [What the code should do]
LANGUAGE/FRAMEWORK: [e.g., Python 3.12 / FastAPI]
INPUTS: [Parameters it receives]
OUTPUTS: [What it returns]
CONSTRAINTS: [Performance, standards, libraries]
OUTPUT: Working code with inline comments.
```

### Code Review
```
GOAL: Review for [quality / performance / security]
CODE: [Use #file or #selection reference]
FOCUS AREAS: [Specific concerns]
OUTPUT: Issues by severity (critical → minor) with fixes.
```

### Documentation
```
GOAL: Document [concept / function / architecture]
AUDIENCE: [Junior dev / senior dev / non-technical]
FORMAT: [Bullet list / paragraph / README / JSDoc]
LENGTH: [Approximate scope]
OUTPUT: Clear explanation the audience can follow.
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Vague response | Add more constraints and context |
| Wrong format | Specify exact output structure with an example |
| Off-topic | Add "Stay focused on X. Do not discuss Y." |
| Too long/short | Specify word count or section count |
| Ignores your code | Use `#file` or `#selection` instead of pasting |
| Inconsistent style | Set up `.github/copilot-instructions.md` |

---

## Iterative Refinement Phrases

Use these follow-ups to improve the first response:

- *"Make this more concise — cut it to half the length."*
- *"Add error handling for the case where X is null."*
- *"Rewrite this for a non-technical audience."*
- *"This is close but [specific issue]. Fix only that part."*
- *"Show only the updated function — don't repeat the explanation."*
- *"Add a unit test for the edge case where [scenario]."*

---

## File Organization

```
your-repo/
├── .github/
│   └── copilot-instructions.md    ← Team-wide Copilot settings
├── prompts/
│   ├── meta-prompt.md             ← Prompt that generates prompts
│   ├── templates/
│   │   ├── bug-fix.md
│   │   ├── code-gen.md
│   │   ├── code-review.md
│   │   └── documentation.md
│   └── client-[project]/          ← Client-specific templates
│       ├── unit-tests.md
│       └── api-scaffold.md
```

---

*Keep it simple. A good prompt is just a clear instruction with enough context for the AI to do its job.*
