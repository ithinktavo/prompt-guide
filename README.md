# Prompt Engineering Guide for GitHub Copilot

A hands-on guide that teaches our team how to write effective prompts, build reusable prompt templates, and automate client work using GitHub Copilot Chat.

## Who This Is For

Developers on our team who want to:
- Get better results from GitHub Copilot Chat
- Create reusable prompt templates for common tasks (bug fixes, code gen, reviews, docs)
- Build client-specific prompts that any team member can use to automate repetitive work

No prior prompt engineering experience required.

## What's Inside

| File | What It Is | When to Use It |
|------|-----------|----------------|
| [workbook.md](workbook.md) | **31 hands-on exercises** across 7 modules | Start here — this is the main learning path (~3 hrs) |
| [prompt-guide-topics.md](prompt-guide-topics.md) | Full curriculum outline with explanations | Read alongside the workbook for deeper context |
| [prompt-guide.md](prompt-guide.md) | One-page quick-reference card | Keep open while working — patterns, templates, Copilot features |
| [meta-prompt.md](meta-prompt.md) | Ready-to-use meta-prompt | Paste into Copilot Chat to generate prompts on demand |

## Getting Started

1. **Open [workbook.md](workbook.md)** and start with Module 1
2. Keep [prompt-guide.md](prompt-guide.md) open as a reference
3. Work through exercises at your own pace — each module is self-contained

### Prerequisites

- VS Code (or JetBrains) with **GitHub Copilot Chat** enabled
- Access to a project repo you can use for practice exercises

## Learning Path

```
Module 1 — Prompt Foundations          (Ex. 1–5)    ~20 min
  Write clear, structured prompts with goals, context, and constraints

Module 2 — Reusable Templates         (Ex. 6–10)   ~25 min
  Build fill-in-the-blank templates for bug fixes, code gen, reviews, docs

Module 3 — Build Your Own Meta-Prompt (Ex. 11–20)  ~35 min
  Create a "prompt that generates prompts" — paste it once, get structured
  prompts for any task

Module 4 — Advanced Strategies        (Ex. 21–23)  ~20 min
  Iterative refinement, multi-persona analysis, constraint-based generation

Module 5 — GitHub Copilot Features    (Ex. 24–26)  ~20 min
  Context references (@workspace, #file), slash commands, custom instructions

Module 6 — Automating Client Work     (Ex. 27–29)  ~20 min
  Identify automatable tasks, build client-specific templates, validate them

Module 7 — Putting It All Together    (Ex. 30–31)  ~15 min
  End-to-end challenge and team prompt library
```

## Setting Up Your Team's Prompt Library

After completing the workbook, your repo should have:

```
your-repo/
├── .github/
│   └── copilot-instructions.md    ← Team-wide Copilot settings (Ex. 26)
└── prompts/
    ├── meta-prompt.md             ← Prompt that generates prompts (Ex. 11–20)
    └── templates/
        ├── bug-fix.md             ← (Ex. 6)
        ├── code-gen.md            ← (Ex. 7)
        ├── code-review.md         ← (Ex. 8)
        ├── documentation.md       ← (Ex. 9)
        └── client-[project]/      ← Client-specific templates (Ex. 28–29)
```

## Quick Wins

If you only have 10 minutes, do these:

1. **Set up `.github/copilot-instructions.md`** for your project ([Exercise 26](workbook.md)) — every Copilot Chat will automatically follow your team's standards
2. **Learn `#file` and `@workspace`** references ([Exercise 24](workbook.md)) — stop pasting code, start referencing it
3. **Use slash commands with extra instructions** ([Exercise 25](workbook.md)) — `/tests` alone is okay, `/tests` + constraints is great
