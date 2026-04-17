# Curriculum at a Glance

> A 60-second overview of what's in this guide and why each section matters. The actual teaching happens in the **Hands-On Workbook** section — this page is just the map.

---

## What You'll Learn

By the end of this guide, you'll be able to:

1. **Write effective AI prompts** that produce useful results on the first try (instead of having to re-prompt repeatedly)
2. **Build reusable prompt templates** your team can fill in to get consistent output for common tasks
3. **Construct meta-prompts** — prompts that teach AI to generate prompts for you on demand
4. **Use your AI tool's power features** (GitHub Copilot, Windsurf, or Claude Code) to give the AI rich context without manual copy-paste
5. **Automate parts of client work** that are repetitive enough to benefit from a templated AI workflow

---

## How the Guide Is Organized

| # | Section | Purpose | When to Read |
|---|---------|---------|--------------|
| 1 | **Introduction** | Goal, audience, learning paths | Right now |
| 2 | **Curriculum at a Glance** *(this page)* | What's covered and why | Right now |
| 3 | **Hands-On Workbook** | 36 exercises across 9 modules — the main learning | The bulk of your time |
| 4 | **Build Your Own Meta-Prompt** | A focused 6-step path to build a meta-prompt for one specific use case | After Module 3, or as a faster alternative |
| 5 | **Quick Reference** | Patterns, templates, and tool features condensed | Cheat sheet — flip back to it constantly |
| 6 | **Meta-Prompt File** | A polished, ready-to-use meta-prompt | Compare against your own; copy-paste when you don't want to build from scratch |
| 7 | **Practice Scenarios** | 10 realistic tasks if you don't have a current real one | When an exercise says "use a real task" and you don't have one |
| 8 | **Glossary** | One-line definitions of every term | When you forget what "few-shot" or "MCP" means |

---

## The Modules in 30 Seconds Each

### Modules 1–4 — Tool-Agnostic Core

The foundational skills. Work in any AI tool. **Do these regardless of which AI assistant you use.**

- **Module 1 — Prompt Foundations** *(Exercises 1–5)*
  Goal-first writing, context, constraints, examples (few-shot), and chain-of-thought reasoning. The five techniques every good prompt uses.

- **Module 2 — Reusable Templates** *(Exercises 6–10)*
  Build fill-in-the-blank templates for the four tasks teams do most: bug fixes, code generation, code review, and documentation.

- **Module 3 — Build Your Own Meta-Prompt** *(Exercises 11–20)*
  Construct a "prompt that generates prompts." Build it section by section. After Module 3, you have a generic meta-prompt anyone on the team can use.

- **Module 4 — Advanced Strategies** *(Exercises 21–23)*
  Iterative refinement, multi-persona analysis, and constraint-based generation. Power tools for complex or trade-off-heavy tasks.

### Modules 5–7 — Tool-Specific

Pick the module(s) for the tool(s) you have access to. Skip the rest.

- **Module 5 — GitHub Copilot** *(Exercises 24–26)*
  `#file`, `#selection`, slash commands (`/explain`, `/fix`, `/tests`, `/doc`), and `.github/copilot-instructions.md` for team-wide standards.

- **Module 6 — Windsurf (Cascade)** *(Exercises 27–28)*
  Codebase-aware prompting with `@codebase` and `@file`, plus `.windsurf/rules/` and `.windsurf/workflows/` for reusable team patterns.

- **Module 7 — Claude Code** *(Exercises 29–31)*
  `CLAUDE.md` for project context, `.claude/skills/` for reusable slash commands, hooks for automation, and MCP servers for external integrations.

### Modules 8–9 — Apply It to Real Work

- **Module 8 — Automating Client Work** *(Exercises 32–34)*
  Identify which client tasks are good automation candidates, build a client-specific prompt template, and validate it against multiple real inputs.

- **Module 9 — Putting It All Together** *(Exercises 35–36)*
  An end-to-end challenge using a real task, plus building a shared team prompt library so the work compounds across the team.

---

## Two Paths to a Meta-Prompt

This guide gives you two ways to build a meta-prompt — pick one or do both:

| Path | Where | When to Use |
|------|-------|-------------|
| **Generic, learn-by-doing** | Module 3 of the Workbook | You want to understand every part of a meta-prompt; you'll use it for many different tasks |
| **Specific, use-case-focused** | Section 4 (Build Your Own Meta-Prompt) | You have one recurring task in mind; you want to build something tailored fast |

If you have time for one: do **Module 3** first (you learn the parts), then **Section 4** (you apply that knowledge to a real recurring task).

If you're in a hurry: jump straight to **Section 4**.

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

That's the entire skill in 6 steps. Everything in the Workbook is a deeper dive into one of them.

---

*Ready? Continue to the Hands-On Workbook section to start with Module 1.*
