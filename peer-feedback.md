# Peer Feedback — Prompt Engineering Guide

> Consolidated feedback received from peer reviewers on the guide. Captured verbatim, organized by reviewer.

---

## From Andrew

> Hey Gustavo, I reviewed the guide, it's all good on factual information excepting one about the workspace annotation. I have some very mild recommendations, but overall it looks solid to me.

### Review — Prompting Guide — Modules 1, 2 & 3

#### Module 1

**Notes:**
- The `@workspace` command no longer exists in Copilot for VSCode

| Exercise | Result | Notes |
|---|---|---|
| Exercise 1 | Good | — |
| Exercise 2 | Good | — |
| Exercise 3 | Good | — |
| Exercise 4 | Good | — |
| Exercise 5 | Good | — |

#### Module 2

**Before you start:**
- Result: Good
- Notes:
  - Include the fact that the meta-prompting template file's location is temporary and that they will eventually place it in one of:
    - `.windsurf/workflows/` if Windsurf
    - `.github/prompts/` if Copilot
    - `.claude/skills/` if Claude

| Exercise | Result | Notes |
|---|---|---|
| Exercise 6 | Good | — |
| Exercise 7 | Good | — |
| Exercise 8 | Good | — |
| Exercise 9 | Good | — |
| Exercise 10 | Good | — |

#### Module 3

| Exercise | Result | Notes |
|---|---|---|
| Exercise 11 | Good | — |
| Exercise 12 | Good | — |
| Exercise 13 | Good | — |
| Exercise 14 | Good | — |
| Exercise 15 | Good | — |
| Exercise 16 | Good | — |
| Exercise 17 | Good | — |
| Exercise 18 | Good | — |
| Exercise 19 | Good | Suggest saving the new, customized meta-prompt as a new file instead of overwriting the existing one. |
| Exercise 20 | Good | — |

---

## From Deepa

> Hi Team, here is my feedback on Modules 5 and 6.

### Part 5 — GitHub Copilot

**Item 21 — Using Templates in GitHub Copilot Chat**
- `@workspace` is currently not working, so this should be removed.
- In the Capital Slack channel, came across a note that `#workspace` is working with Claude models. If anyone has access to Claude models, they can help confirm this.

**Item 22 — Custom Instructions for the Team**
- No changes are required.

**Item 23 — Tips for Getting the Most Out of Copilot Chat**
- No changes are required.

### Part 6 — Windsurf

**Item 24 — Codebase-Aware Prompting with Cascade**
- I do not currently have access to Windsurf, so Ali is helping review and validate this content.

**Item 25 — Windsurf Rules and Workflows**
- I do not currently have access to Windsurf, so Ali is helping review and validate this content.

---

## From Ali

### Feedback on Module 7 (Windsurf)

- **Test 1** — using the codebase tag (`@codebase`) doesn't seem to work on Windsurf on the Cap1 side. I still used the prompt without the `@` and it worked.
- **Test 2** — similar to Test 1, the codebase command doesn't exist, but the prompt still works as intended with a proper response.
- **Workflows examples** — great and work well, very easy to set up and follow through with.

---

## From Lijun

### Feedback on Modules 7–9

> The only suggestion I have is, for each file, put a sample file link so the reader knows what the file looks like.
>
> For instance, when you say "add the configuration to your `.claude/settings.json`", if a reader has never worked with MCP before, they may have no clue what `settings.json` looks like. Even though Claude Code can create one, it would be nice to have some reference in the doc.
>
> This is my 2 cents.

---

## From Tanner

> Hi — I'm starting this now. The first error I see is this: it gave these steps and did not explain what or how `workbook.md` is.

*(Note: feedback appears to reference initial onboarding instructions that mention `workbook.md` without first explaining what the file is.)*

---

## Summary of Issues Raised (Quick Index)

| # | Source | Area | Issue |
|---|--------|------|-------|
| 1 | Andrew, Deepa | Module 1, Part 5 | `@workspace` no longer exists in Copilot for VSCode — needs removal/update |
| 2 | Deepa | Part 5 | Investigate `#workspace` for Claude models in Copilot |
| 3 | Andrew | Module 2 (intro) | Add note that meta-prompt file location is temporary; eventually moves to tool-specific folders (`.windsurf/workflows/`, `.github/prompts/`, `.claude/skills/`) |
| 4 | Andrew | Exercise 19 | Suggest saving customized meta-prompt as a new file instead of overwriting |
| 5 | Ali | Module 7 (Windsurf) | `@codebase` tag doesn't work on Cap1's Windsurf setup; prompts still work without it |
| 6 | Lijun | Modules 7–9 | Add sample file references / examples (e.g., what `.claude/settings.json` looks like) for readers unfamiliar with the format |
| 7 | Tanner | Onboarding | First-time reader confused by reference to `workbook.md` without explanation of what it is |
