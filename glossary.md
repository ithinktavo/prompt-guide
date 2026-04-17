# Glossary

> Quick definitions of every term used in this guide. If you forget what something means, look here first.

---

## Core Prompting Concepts

**Prompt** — A single instruction you give an AI (typed into a chat). Could be one sentence or several paragraphs.

**Prompt template** — A reusable, fill-in-the-blank prompt. Has fixed structural sections and `[PLACEHOLDER]` slots the user fills in for each task. The point: same task → same shape → consistent output.

**Meta-prompt** — A prompt that *generates other prompts*. You paste it into AI chat, the AI interviews you, and it outputs a tailored prompt you can use in a separate conversation. A "prompt factory."

**Tool-agnostic** — Works with any AI tool (Copilot, Windsurf, Claude Code, ChatGPT, etc.). Modules 1–4 of this guide are tool-agnostic.

**Tool-specific** — Uses features unique to one tool (e.g., Copilot's `#file`, Windsurf's `@codebase`, Claude Code's hooks). Modules 5–7 of this guide are tool-specific.

---

## Prompting Techniques

**Goal-first writing** — Lead the prompt with what you want back, not background. "Fix the N+1 query in OrderRepository" beats "I've been working on this project and we use Spring Boot…"

**Context** — The background information the AI needs to do the task: project, stack, what's been tried, current state. Effective context is structured (bullet points) and relevant — not exhaustive.

**Constraints** — Rules that shape the output: format, length, audience, exclusions ("don't change module X"). Without constraints the AI picks its own.

**Few-shot prompting** — Including 2+ input/output examples in the prompt to teach the AI a specific style or format. Variants:
- **Zero-shot** = no examples, instructions only
- **One-shot** = one example
- **Few-shot** = two or more examples

**Chain-of-thought (CoT)** — Asking the AI to "think step by step" or show its reasoning before giving a final answer. Dramatically improves accuracy on debugging, multi-step logic, and reasoning tasks.

**Multi-persona prompting** — Asking the AI to analyze something from multiple perspectives (e.g., "as a senior dev / as a DevOps engineer / as a security reviewer"), then synthesize. Useful for trade-off analysis.

**Constraint-based generation** — Over-constraining a prompt by specifying every dimension (structure, length, terminology, inclusions, exclusions). Used for outputs that must match team standards exactly.

**Iterative refinement** — Treating the first AI response as a draft and improving it via 2–3 short follow-ups instead of starting over with a giant prompt.

**Clarifying questions / bidirectional interaction** — A directive added to templates telling AI to ask the user 1–3 questions when input is ambiguous, instead of guessing silently. Makes the conversation two-way.

---

## GitHub Copilot Terms

**Copilot Chat** — The chat interface inside VS Code (or JetBrains) where you converse with Copilot. Distinct from the inline auto-complete suggestions.

**`#file:<path>`** — A reference in Copilot Chat that pulls a specific file's contents into the conversation context.

**`#selection`** — A reference that pulls the code currently highlighted in the editor.

**`@workspace`** *(legacy)* — Older Copilot chat participant for repo-wide questions. No longer needed in current Copilot for VS Code — workspace context is implicit.

**Slash commands** — Built-in shortcuts: `/explain`, `/fix`, `/tests`, `/doc`. Each is essentially a pre-written prompt that GitHub provides.

**`.github/copilot-instructions.md`** — A file in your repo that Copilot automatically includes in every chat. Used to set team-wide standards (style, patterns, things to avoid).

**Prompt files** — Reusable saved prompts in `.github/prompts/*.prompt.md`, triggered with `#<prompt-name>` in chat.

---

## Windsurf Terms

**Windsurf** — An AI-powered code editor (similar to VS Code with Copilot, but with more autonomous agent behavior).

**Cascade** — Windsurf's AI agent. Can read files, search the codebase, and make edits directly.

**`@codebase`** — Windsurf reference giving Cascade access to search the entire project. (May not be available in all installs; the prompts work without it because Cascade has codebase awareness built in.)

**`@file`** — Reference a specific file by path.

**`@web`** — Let Cascade search the internet (e.g., for documentation).

**`.windsurf/rules/*.md`** — Always-on team standards files (Windsurf's equivalent of `copilot-instructions.md`).

**`.windsurf/workflows/*.md`** — Reusable multi-step prompts triggered with `/workflow-name`.

---

## Claude Code Terms

**Claude Code** — Anthropic's terminal-based AI coding agent. Operates on your local repo with full codebase awareness.

**`CLAUDE.md`** — Project instructions file at your repo root. Claude Code reads it automatically. Hierarchical: you can have additional `CLAUDE.md` files in subfolders for area-specific context.

**Skills** — Reusable slash commands stored as `.claude/skills/*.md` files. Triggered with `/skill-name` in chat.

**Hooks** — Scripts in `.claude/settings.json` that run automatically before or after Claude Code actions:
- **PreToolUse** — runs before Claude uses a tool (e.g., validate before write)
- **PostToolUse** — runs after a tool completes (e.g., auto-format)
- **PreCommit** — runs before commits (e.g., lint, secret scan)

**MCP (Model Context Protocol)** — A standard for giving AI tools access to external systems (databases, Jira, Slack, etc.) via "MCP servers" configured in `.claude/settings.json`.

**MCP server** — An external integration that extends what Claude Code can do — e.g., a Postgres MCP server lets Claude query your database directly.

---

## Generic AI / LLM Terms

**LLM (Large Language Model)** — The kind of AI that powers Copilot, Claude, ChatGPT, etc. Predicts the next token based on training data + your prompt.

**Context window** — The amount of text an LLM can "see" at once (your prompt + its previous responses + any files you reference). When it's full, older content gets dropped.

**Token** — Roughly a word or word-fragment. LLMs read and write in tokens, not characters. ~750 words ≈ 1000 tokens.

**Hallucination** — When an AI confidently produces output that's plausible-sounding but incorrect (made-up function names, wrong API signatures, fabricated facts). Mitigated by giving the AI real context (`#file`, `@codebase`, etc.) and asking clarifying questions.

**Agent mode** — A mode where the AI can autonomously take actions (read files, run commands, edit code) instead of just answering questions. This guide focuses on chat mode, not agent mode.
