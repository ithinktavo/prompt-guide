# Prompt Engineering Guide

A hands-on guide that teaches our team how to write effective prompts, build reusable prompt templates, and automate client work using AI coding tools.

**Core concepts are tool-agnostic** — learn once, apply to any tool. Tool-specific modules cover GitHub Copilot, Windsurf, and Claude Code separately.

## Who This Is For

Developers on our team who want to:
- Get better results from AI coding tools
- Create reusable prompt templates for common tasks (bug fixes, code gen, reviews, docs)
- Build client-specific prompts that any team member can use to automate repetitive work

No prior prompt engineering experience required.

## What's Inside

| File | What It Is | When to Use It |
|------|-----------|----------------|
| [workbook.md](workbook.md) | **35 hands-on exercises** across 9 modules | Start here — this is the main learning path (~3.5 hrs) |
| [prompt-guide-topics.md](prompt-guide-topics.md) | Full curriculum outline with explanations | Read alongside the workbook for deeper context |
| [prompt-guide.md](prompt-guide.md) | One-page quick-reference card | Keep open while working — patterns, templates, tool features |
| [meta-prompt.md](meta-prompt.md) | Ready-to-use meta-prompt | Paste into any AI chat to generate prompts on demand |

## Getting Started

1. **Open [workbook.md](workbook.md)** and start with Module 1
2. Keep [prompt-guide.md](prompt-guide.md) open as a reference
3. Work through exercises at your own pace — each module is self-contained
4. **For tool-specific modules (5–7)**: do the one(s) that match the tool(s) you have access to, skip the rest

### Prerequisites

- At least one AI coding tool: **GitHub Copilot Chat**, **Windsurf**, or **Claude Code**
- A project repo you can use for practice exercises

## Learning Path

```
 CORE CONCEPTS (any tool) ─────────────────────────────────────────
│
│  Module 1 — Prompt Foundations          (Ex. 1–5)    ~20 min
│    Write clear, structured prompts with goals, context, constraints
│
│  Module 2 — Reusable Templates         (Ex. 6–10)   ~25 min
│    Build fill-in-the-blank templates for bug fixes, code gen, reviews, docs
│
│  Module 3 — Build Your Own Meta-Prompt (Ex. 11–20)  ~35 min
│    Create a "prompt that generates prompts"
│
│  Module 4 — Advanced Strategies        (Ex. 21–23)  ~20 min
│    Iterative refinement, multi-persona analysis, constraint-based generation
│
├─ TOOL-SPECIFIC (do the modules for tools you have access to) ────
│
│  Module 5 — GitHub Copilot             (Ex. 24–26)  ~20 min
│    @workspace, #file, slash commands, .github/copilot-instructions.md
│
│  Module 6 — Windsurf                   (Ex. 27–28)  ~15 min
│    ⚠️  Skip if you don't have Windsurf yet
│    @codebase, Cascade, .windsurf/rules/, .windsurf/workflows/
│
│  Module 7 — Claude Code                (Ex. 29–31)  ~15 min
│    ⚠️  Skip if you don't have Claude Code yet
│    CLAUDE.md, .claude/skills/, hooks, MCP servers
│
├─ APPLYING IT ────────────────────────────────────────────────────
│
│  Module 8 — Automating Client Work     (Ex. 32–34)  ~20 min
│    Identify automatable tasks, build client templates, validate them
│
│  Module 9 — Putting It All Together    (Ex. 35)     ~15 min
│    End-to-end challenge and team prompt library
```

## How Concepts Map Across Tools

The same ideas have different names in each tool:

| Concept | GitHub Copilot | Windsurf | Claude Code |
|---------|---------------|----------|-------------|
| **Project instructions** | `.github/copilot-instructions.md` | `.windsurf/rules/*.md` | `CLAUDE.md` |
| **Reusable prompts** | `.github/prompts/*.prompt.md` | `.windsurf/workflows/*.md` | `.claude/skills/*.md` |
| **Trigger saved prompt** | `#<prompt-name>` | `/workflow-name` | `/skill-name` |
| **File context** | `#file:path`, `#selection` | `@file` | Automatic |
| **Codebase context** | `@workspace` | `@codebase` | Automatic |
| **Automation hooks** | — | — | Hooks (pre/post scripts) |

## Setting Up Your Team's Prompt Library

After completing the workbook, your repo should have:

```
your-repo/
├── .github/                           ← GitHub Copilot
│   ├── copilot-instructions.md        ←   Project instructions
│   └── prompts/*.prompt.md            ←   Reusable prompt files
├── .windsurf/                         ← Windsurf (when available)
│   ├── rules/*.md                     ←   Project instructions
│   └── workflows/*.md                 ←   Reusable workflows
├── CLAUDE.md                          ← Claude Code (when available)
├── .claude/
│   └── skills/*.md                    ←   Reusable skills
├── prompts/                           ← Shared (any tool)
│   ├── meta-prompt.md
│   ├── templates/
│   │   ├── bug-fix.md
│   │   ├── code-gen.md
│   │   ├── code-review.md
│   │   └── documentation.md
│   └── client-[project]/
│       └── [task-specific templates]
```

> The `prompts/` folder works with any tool — just paste template contents into chat. The tool-specific folders enable each tool's native features.

## Quick Wins

If you only have 10 minutes, do these:

1. **Set up project instructions** for your current project ([Ex. 26](workbook.md) for Copilot, [Ex. 28](workbook.md) for Windsurf, [Ex. 29](workbook.md) for Claude Code) — every conversation will automatically follow your team's standards
2. **Learn file references** ([Exercise 24](workbook.md)) — stop pasting code, start referencing it
3. **Skim the quick-reference card** ([prompt-guide.md](prompt-guide.md)) — the 6-step formula and template structures
