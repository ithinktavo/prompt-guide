# The Priority Builder — A Real-World Case Study

> **What this is**: A teaching artifact for a 60-minute talk. Walks through a real prompt file — `priority_builder_instructions_ai.md` — built by our colleague **Joey** to help him (and now us) write FY26 performance priorities. The file is rich with prompt engineering techniques — this document maps them out so you can apply them to your own work.
>
> **The story**: Joey had to write his FY26 priorities. Instead of facing the blank page, he gathered the reference materials we all have access to, asked GitHub Copilot to help him build a "priority coaching" prompt, and ended up with a 287-line interrogation agent that interviews him and produces publish-ready priorities. He shared it with our team in a session — this talk is a deeper dive into what's *inside* the file and why each piece works.
>
> **Why this matters for you**: The 12 techniques baked into Joey's prompt are transferable. Whatever recurring task you have — priorities, PR descriptions, client status reports, test generation — the same patterns apply.

---

## The Workflow in One Picture

```
  ┌─────────────────────────────────────────────────────────────────┐
  │  STEP 1 — Gather references                                     │
  │  • core_capabilities_manager.txt  (what ML7 behaviors look like)│
  │  • unlocking_metrics.html         (valid metric categories)     │
  │  • example_of_priorities_ML7.md   (sample priorities at level) │
  └────────────────────────────┬────────────────────────────────────┘
                               │
                               ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │  STEP 2 — Ask Copilot to help build the prompt                  │
  │  "Using these references, build a prompt file that interviews  │
  │  me and produces FY26 priorities in the company's ABCD format."│
  └────────────────────────────┬────────────────────────────────────┘
                               │
                               ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │  STEP 3 — The output: priority_builder_instructions_ai.md       │
  │  287 lines. 6 phases. 30+ metric types embedded. 32 interview  │
  │  questions. 3 versions (Conservative/Balanced/Aspirational).   │
  │  CSV + formatted-doc output specs.                              │
  └────────────────────────────┬────────────────────────────────────┘
                               │
                               ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │  STEP 4 — Run it anytime                                        │
  │  Paste into Copilot Chat → answer its questions → get          │
  │  priorities ready for the review portal.                        │
  └─────────────────────────────────────────────────────────────────┘
```

**The meta-pattern**: References + Copilot = a reusable prompt file. Build it once, use it every cycle.

---

## The 6 Phases of the Priority Builder

The prompt file is structured as a **multi-phase workflow**. Each phase does one thing, and they chain:

| Phase | What it does |
|-------|-------------|
| **Phase 1 — Initial Setup** | Greets the user, asks how many priorities to build and in which categories |
| **Phase 2 — 20 Questions** | Interviews the user with an adaptive bank of 32 questions |
| **Phase 2.5 — Artifact Mining** | AI searches the workspace for evidence (files, code, presentations) |
| **Phase 3 — Generate Versions** | Produces THREE versions simultaneously: Conservative / Balanced / Aspirational |
| **Phase 4 — Iterative Refinement** | Lets user pin elements, mix versions, regenerate, or answer more questions |
| **Phase 5 — Finalization** | Confirms completion, moves to next priority |
| **Phase 6 — Final Output** | Outputs results in two formats: CSV (for Excel) and Formatted Doc (for review) |

Read the file ([`PA Process/priority_builder_instructions_ai.md`](PA%20Process/priority_builder_instructions_ai.md)) alongside this document for the full context.

---

## The 12 Prompt Engineering Techniques Inside

What follows is every technique baked into the priority builder, with the exact excerpt from Joey's file that demonstrates it.

---

### 1. Role Assignment

> **"You are an expert career coach and performance management specialist helping Accenture employees create compelling FY26 priorities with ABCD reflections."** *(line 9)*

**What it does**: Sets the AI's persona. The AI now writes as a career coach — not a generalist. Tone shifts accordingly: encouraging, specific, and performance-aware.

**Why it matters**: Without a role, AI defaults to "helpful assistant." Career-coach AI writes different output than generic AI. The role shapes voice, priorities, and what the AI thinks is important.

**Transferable lesson**: Always tell the AI *who* it is before asking it to do anything.

---

### 2. Goal-First Writing

> **"Your goal is to generate 2-3 high-quality priorities that will position the user for success in their annual review."** *(line 9, immediately after the role)*

**What it does**: States the deliverable in one sentence. Number of outputs, quality bar, and business purpose — all in 22 words.

**Why it matters**: The AI now knows what "done" looks like. Everything that follows in the prompt is context supporting that goal, not a guessing game.

**Transferable lesson**: One clear sentence about what you want back, before any context. Every time.

---

### 3. Structured Context with Domain Knowledge

> **"The four FY26 priority categories are:**
> **1. Client Value Creation — How you create success for clients**
> **2. AI Enablement — How you use/develop AI skills and embed AI into work**
> **3. Great Place to Work for Reinventors — How you build exceptional teams**
> **4. Community — Corporate citizenship and community impact"** *(lines 14–18)*
>
> *(Followed by 30+ metric types organized into Financial/Non-Financial)*

**What it does**: Embeds **domain knowledge** the AI wouldn't otherwise have. The company-specific categories, the metric taxonomy, the ABCD framework — all baked into the prompt itself.

**Why it matters**: The AI doesn't "know" Accenture's priority framework from its training. Giving it the framework inline means every output respects those categories — no hallucination of made-up metrics.

**Transferable lesson**: If your task uses company-specific or domain-specific knowledge (standards, taxonomies, frameworks), embed that knowledge directly in the prompt. Don't assume the AI knows it.

---

### 4. Multi-Phase Workflow (Prompt Chaining)

> **"PHASE 1: INITIAL SETUP ... PHASE 2: 20 QUESTIONS PER PRIORITY ... PHASE 2.5: ARTIFACT MINING ... PHASE 3: GENERATE PRIORITY VERSIONS ... PHASE 4: ITERATIVE REFINEMENT ... PHASE 5: FINALIZATION ... PHASE 6: FINAL OUTPUT"** *(throughout the file)*

**What it does**: Breaks a complex task into **6 explicit phases** that run sequentially. Each phase has its own instructions, inputs, and outputs.

**Why it matters**: Complex tasks fail when the AI tries to do everything at once. Chaining phases forces the AI to finish each step before moving on — and gives the user natural checkpoints to validate progress.

**Transferable lesson**: Any prompt that covers more than ~3 steps benefits from explicit phase labels. Name the phases, specify what each does, and tell the AI to complete them in order.

---

### 5. Adaptive Question Bank

> **"For EACH priority they want to create, play '20 Questions' to extract detailed information. Ask questions conversationally, adapting based on their answers. Don't ask all 20 if you have enough info."** *(line 80)*
>
> *(Followed by 32 questions organized into 6 categories: Discovery, Client Value, AI Enablement, Great Place to Work, Community, Metrics, ABCD)*

**What it does**: Provides the AI with a **library of possible questions** but tells it to pick the right ones based on context. Not a rigid script — a toolkit.

**Why it matters**: Rigid scripts produce robotic interviews. Giving the AI options plus adaptation rules produces conversation.

**Transferable lesson**: When you want the AI to interview someone, don't list every question to ask in order. Provide a bank and tell the AI to adapt.

---

### 6. Manual RAG / Artifact Mining

> **"PHASE 2.5: ARTIFACT MINING — Before generating versions, search the user's workspace for evidence: Use `find` or `glob` to locate relevant files. Read presentations, READMEs, and code for metrics. Validate claimed numbers against actual artifacts. Extract quantifiable data from documents."** *(lines 131–136)*

**What it does**: Explicitly tells the AI to go **look at the user's actual files** for evidence — don't just trust what the user claims in the interview.

**Why it matters**: This is **Retrieval-Augmented Generation** (RAG) in action. The AI retrieves real data from your workspace and uses it to ground the output. Numbers become real. Accomplishments are backed by artifacts. No fluff.

**Transferable lesson**: If your task involves claims that should be verifiable (metrics, completed work, code quality), tell the AI to look at the source files, not just your descriptions. This is what `#file:` and `@codebase` do in Copilot — naming it explicitly makes it intentional.

---

### 7. Multi-Persona / Multi-Version Generation

> **"VERSION A - CONSERVATIVE: Safe, achievable goals. Standard metrics. Moderate impact language.**
> **VERSION B - BALANCED: Ambitious but realistic goals. Mix of quantitative and qualitative metrics. Strong but honest impact statements.**
> **VERSION C - ASPIRATIONAL: Stretch goals that demonstrate high ambition. Aggressive metrics and targets. Maximum impact language."** *(lines 138–157)*

**What it does**: Asks the AI to generate **three different versions** of each priority — spanning a risk/ambition spectrum — in a single response.

**Why it matters**: Humans are bad at evaluating a single option in isolation ("is this good?"). Humans are great at comparing options ("which of these three feels right?"). Offering three versions turns a hard judgment call into an easy preference.

**Transferable lesson**: For any creative or judgment-heavy task, ask the AI for **2–3 variants** on a spectrum, not one "best" answer. You'll pick faster and get a better result.

---

### 8. Few-Shot Output Examples

> **"Present all three versions in a clear table format like this:**
> **```**
> **PRIORITY: [Category Name] - [Short Title]**
> **VERSION A (Conservative):**
> **Priority Description: [detailed description]**
> **Metrics: [1-3 metrics from the list]**
> **Expected Value: [outcome]**
> **---**
> **ABCD Reflection:**
> **A - Accomplishments: [what you did]**
> **B - Business Impact: [measurable value]**
> **..."** *(lines 161–180)*

**What it does**: Shows the AI the **exact shape** of the expected output — labels, structure, separators.

**Why it matters**: "Format it clearly" is vague. Showing the exact template guarantees the AI's output will match. This is few-shot prompting applied to format rather than content.

**Transferable lesson**: When you need consistent formatting, don't describe it — show a filled-in example. The AI will follow the pattern.

---

### 9. Iterative Refinement Loop

> **"After showing all three versions, ask: 'Which version resonates with you most? Or would you like to mix and match elements from different versions?'**
>
> **Offer these options:**
> **1. I like Version [A/B/C] - use that one**
> **2. Create a custom version combining elements I'll specify**
> **3. Pin specific cells I like and regenerate the rest**
> **4. Answer more questions to refine further**
> **5. Start over with different information"** *(lines 184–192)*

**What it does**: Builds **iteration into the workflow itself**. After producing the first draft, the AI explicitly offers paths to refine — including the brilliant "pin cells, regenerate the rest" pattern.

**Why it matters**: Most prompt templates stop at "produce the answer." The priority builder recognizes that the first answer is a *starting point*, not a deliverable. The iteration loop is baked in.

**Transferable lesson**: For any substantive deliverable, add an explicit refinement phase to your template. List the options the user has. Don't assume they know how to ask for changes.

---

### 10. Strict Multi-Format Output

> **"When all priorities are completed, generate the final output in TWO formats:**
>
> **FORMAT 1 - CSV (Ready to Copy/Paste into Excel):**
> **`Priority,Prio Category,Metric,Value,Reflection - Accomplishments,Reflection - Business Impact,...`**
>
> **FORMAT 2 - FORMATTED DOCUMENT (Human Readable)..."** *(lines 207–261)*
>
> Followed by: **"CRITICAL CSV FORMATTING RULES: Use EXACT column headers... Wrap ALL cell values in double quotes... Each priority = one row..."**

**What it does**: Specifies **two output formats** for the same content, with exact column headers for the machine-readable one. Same data, two shapes — one for the Accenture portal (CSV), one for the user's own review (formatted doc).

**Why it matters**: Real workflows need real output. Joey's priorities have to end up in a corporate system (CSV for Excel import) AND be reviewable by him (formatted markdown). The prompt produces both in one pass.

**Transferable lesson**: Think about where the output actually goes. If it has to be machine-readable for one system AND human-readable for review, ask for both formats explicitly.

---

### 11. Tone & Style Directives

> **"TONE & STYLE: Encouraging and supportive. Professional but friendly. Solution-oriented. Celebrate their achievements. Push for specificity without being pushy. Make them feel confident about their priorities."** *(lines 276–283)*

**What it does**: Sets the **voice** the AI should use throughout the interaction.

**Why it matters**: Without tone directives, AI veers between "generic helpful" and "unnecessarily formal." For a career-coaching use case, a warm but rigorous voice matters. Making this explicit locks it in.

**Transferable lesson**: For any conversational or customer-facing use case, add 3–5 tone bullets. It's cheap and makes a big difference.

---

### 12. Bidirectional / Clarifying Questions

> **"BE CONVERSATIONAL: Don't feel like you must ask all 20 questions. Stop when you have enough information."** *(line 265)*
>
> **"ADAPT QUESTIONS: Based on their role (analyst, manager, senior manager, etc.), tailor questions appropriately."** *(line 266)*
>
> **"BE HONEST: If they haven't accomplished much yet, help them write forward-looking priorities with realistic reflections."** *(line 269)*
>
> **"PROVIDE EXAMPLES: When they're stuck, offer 2-3 concrete examples they can adapt."** *(line 273)*

**What it does**: Makes the interaction **two-way**. The AI listens, adapts, provides examples when the user is stuck, and stops when it has enough. Not one-shot generation — conversation.

**Why it matters**: The single biggest differentiator between a "prompt" and a "prompt template." Without this, the AI silently guesses when inputs are ambiguous. With it, the AI asks, adapts, and collaborates.

**Transferable lesson**: Build conversation hooks into every template. Tell the AI when to ask, when to stop, when to offer examples, and when to adapt based on what it hears.

---

## What Running the Priority Builder Produces

Joey ran his own builder to produce his FY26 priorities. Here's an excerpt of what came out (edited lightly):

```
═══════════════════════════════════════════════════════════
PRIORITY 1: Client Value Creation — Platform Migrations & Contract Renewal
Level: Manager, ML7 | Status: Completed
═══════════════════════════════════════════════════════════

Priority Title: Deliver critical platform migrations and secure contract renewal

Description:
- Lead delivery of two major platform migration initiatives for Capital One's
  fraud detection infrastructure: Java SpringBoot ECS-to-Lambda and HashiCorp
  Vault to AWS Secrets Manager.
- Provide consistent technical leadership through weekly and quarterly status
  reporting, sprint management, and direct stakeholder engagement...

Metrics:
| Non-Financial | High Quality Deliverables / Client Delivery | Deliver 2
  platform migrations to production with zero critical defects |
| Financial     | On Time/On Budget Project Delivery          | Complete
  both migrations within contracted timeline and budget |

ABCD Reflection:

A — Accomplishments:
Delivered two major platform initiatives for Capital One's fraud detection
infrastructure. Completed the Java SpringBoot ECS-to-Lambda migration...

B — Business Impact:
Transformed client relationship from "considering termination" to "renewed
for another year," preserving and extending a multi-year engagement...

C — Challenges Overcome:
Inherited a team with zero completed deliverables, a removed previous Tech
Lead, and active client doubt about the engagement's viability...

D — Development & Learning:
Deepened expertise in serverless architecture patterns (Lambda optimization,
ECS-to-Lambda migration strategies) and AWS security services...
═══════════════════════════════════════════════════════════
```

This is **publishable quality on first generation**. The technique-dense prompt file produces technique-dense output.

---

## The ROI

| | Without the builder | With the builder |
|---|---|---|
| **Time to draft priorities** | ~3 hours per cycle | ~30 minutes |
| **Quality of metrics** | Variable, often vague | Backed by artifact mining |
| **Format consistency** | Manual re-formatting | CSV + doc in one pass |
| **Team scalability** | Each person figures it out alone | Joey's file → everyone benefits |
| **Reuse across cycles** | Start over each time | Same file, new data |

**One person, one evening to build the prompt. Infinite reuse for the team.**

---

## How to Apply This Pattern to Your Work

Joey's pattern generalizes. Any time you have:

1. A **recurring task** (priorities, PR reviews, status reports, test generation, client emails)
2. Available **reference material** (templates, examples, standards docs, past work)
3. A **clear output format** (report, code, doc, CSV)

You can build a prompt file for it. The workflow:

1. **Gather the references** — put all the relevant source material in one folder
2. **Ask Copilot to help build the prompt**: *"Using these references, build a prompt file that [interviews me / guides me / reviews my work] and produces [deliverable] in [format]."*
3. **Iterate the prompt file** — run it against a real task, note what's weak, tell Copilot how to improve it
4. **Share with the team** — commit the prompt file where others can find and use it

## A 3-Sentence Close for the Talk

*"Joey showed us that prompt engineering isn't magic — it's composition. Twelve well-known techniques layered into one file, built from references we all have access to, using a tool we all have. The question for every one of us is: what recurring task in your work deserves a prompt file of its own?"*

---

*Source prompt file: `PA Process/priority_builder_instructions_ai.md` (287 lines). Author: Joey. Shared internally with the team.*
