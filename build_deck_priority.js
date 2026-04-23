// Build the "Priority Builder Case Study" 60-min presentation deck.
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3" x 7.5"
pres.author = "Gustavo Andres";
pres.title = "The Priority Builder — A Case Study in Prompt Engineering";
pres.subject = "How prompt techniques compose in a real-world prompt file";

// ── Color Palette ────────────────────────────────────────────────
const INDIGO_900 = "1A237E";
const INDIGO_700 = "303F9F";
const INDIGO_500 = "3F51B5";
const INDIGO_100 = "E8EAF6";
const INDIGO_050 = "F5F6FD";
const TEAL_700   = "00796B";
const TEAL_500   = "26A69A";
const TEAL_100   = "B2DFDB";
const AMBER_700  = "FF8F00";
const AMBER_500  = "FFA726";
const AMBER_100  = "FFE0B2";
const CORAL_700  = "C62828";
const CORAL_500  = "EF5350";
const CORAL_100  = "FFCDD2";
const PURPLE_700 = "6A1B9A";
const PURPLE_500 = "AB47BC";
const PURPLE_100 = "E1BEE7";
const SLATE_900  = "212121";
const SLATE_700  = "424242";
const SLATE_500  = "757575";
const SLATE_300  = "BDBDBD";
const SLATE_200  = "E0E0E0";
const SLATE_100  = "F5F5F5";
const SLATE_050  = "FAFAFA";
const WHITE      = "FFFFFF";

const SW = 13.3;
const SH = 7.5;

const HEAD = "Calibri";
const BODY = "Calibri";
const MONO = "Consolas";

const TOTAL = 29; // total slide count

function addFooter(slide, num) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: SH - 0.35, w: SW, h: 0.04,
    fill: { color: SLATE_200 }, line: { color: SLATE_200 }
  });
  slide.addText("The Priority Builder Case Study", {
    x: 0.6, y: SH - 0.32, w: 6, h: 0.3,
    fontSize: 9, fontFace: BODY, color: SLATE_500, margin: 0
  });
  slide.addText(`${num} / ${TOTAL}`, {
    x: SW - 1.5, y: SH - 0.32, w: 1, h: 0.3,
    fontSize: 9, fontFace: BODY, color: SLATE_500, align: "right", margin: 0
  });
}

function addSectionHeader(slide, text) {
  // Small section-header bar at top of content slides (not title/break/Q&A)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SW, h: 0.04,
    fill: { color: INDIGO_500 }, line: { color: INDIGO_500 }
  });
  slide.addText(text, {
    x: 0.6, y: 0.08, w: 12, h: 0.3,
    fontSize: 9, fontFace: BODY, color: SLATE_500, bold: true, charSpacing: 3, margin: 0
  });
}

function addSlideTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.6, y: 0.5, w: 12, h: 0.75,
    fontSize: 32, fontFace: HEAD, bold: true, color: INDIGO_900, margin: 0
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.3, w: 0.8, h: 0.06,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 1.55, w: 12, h: 0.5,
      fontSize: 15, fontFace: BODY, italic: true, color: SLATE_700, margin: 0
    });
  }
}

let slideCounter = 0;
function nextSlide() {
  slideCounter++;
  return pres.addSlide();
}

// ══════════════════════════════════════════════════════════════════
// PART 1 — SETUP (5 min)
// ══════════════════════════════════════════════════════════════════

// Slide 1 — TITLE
{
  const s = nextSlide();
  s.background = { color: INDIGO_900 };

  // Decorative color bars
  [TEAL_500, AMBER_500, CORAL_500, PURPLE_500].forEach((color, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6 + i * 0.55, y: 2.4, w: 0.42, h: 0.08,
      fill: { color }, line: { color }
    });
  });

  s.addText("The Priority Builder", {
    x: 0.6, y: 2.7, w: 12.5, h: 1.1,
    fontSize: 54, fontFace: HEAD, bold: true, color: WHITE, margin: 0
  });
  s.addText("A Real-World Case Study in Prompt Engineering", {
    x: 0.6, y: 3.85, w: 12.5, h: 0.6,
    fontSize: 22, fontFace: HEAD, italic: true, color: INDIGO_100, margin: 0
  });
  s.addText("How 12 prompting techniques compose into one file — and what that means for your work.", {
    x: 0.6, y: 4.55, w: 12.5, h: 0.7,
    fontSize: 15, fontFace: BODY, color: INDIGO_100, margin: 0
  });

  s.addText("Gustavo Andres", {
    x: 0.6, y: 6.0, w: 12, h: 0.5,
    fontSize: 18, fontFace: HEAD, bold: true, color: TEAL_500, margin: 0
  });
  s.addText("Internal team talk  •  ~60 min", {
    x: 0.6, y: 6.45, w: 12, h: 0.4,
    fontSize: 12, fontFace: BODY, color: INDIGO_100, margin: 0
  });

  s.addNotes(
    "Welcome the team. This is a case study — not my work, but work from our colleague Joey that I think is worth studying. " +
    "The goal today is to extract the techniques and show how you can apply them. Promise upfront: by minute 45 you'll know 12 techniques and have a pattern you can use."
  );
}

// Slide 2 — THE PROBLEM (relatable)
{
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 1  •  SETUP");
  addSlideTitle(s, "The blank-page problem", "Everyone hits it at priority-writing time");

  // Big cold-open quote
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 2.3, w: 12.1, h: 1.8, rectRadius: 0.1,
    fill: { color: SLATE_050 }, line: { color: SLATE_200, width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.3, w: 0.1, h: 1.8,
    fill: { color: CORAL_500 }, line: { color: CORAL_500 }
  });
  s.addText("\u201C", {
    x: 0.95, y: 2.15, w: 0.8, h: 0.8,
    fontSize: 80, fontFace: HEAD, color: CORAL_500, margin: 0
  });
  s.addText("I need to write my FY26 priorities by Friday. I have the template open. I've been staring at it for 45 minutes.", {
    x: 1.8, y: 2.55, w: 10.5, h: 1.2,
    fontSize: 22, fontFace: HEAD, italic: true, color: SLATE_900, margin: 0, valign: "middle"
  });
  s.addText("— every manager, every year", {
    x: 1.8, y: 3.75, w: 10.5, h: 0.3,
    fontSize: 12, fontFace: BODY, color: SLATE_500, margin: 0
  });

  // Why it's hard
  s.addText("Why it's hard", {
    x: 0.6, y: 4.7, w: 12, h: 0.4,
    fontSize: 14, fontFace: HEAD, bold: true, color: TEAL_700, charSpacing: 3, margin: 0
  });

  const reasons = [
    { n: "1", text: "Remembering everything you did this cycle" },
    { n: "2", text: "Fitting it into the ABCD framework" },
    { n: "3", text: "Picking the right metrics from 30+ options" },
    { n: "4", text: "Writing it compellingly without overclaiming" }
  ];
  reasons.forEach((r, i) => {
    const x = 0.6 + i * 3.1;
    s.addShape(pres.shapes.OVAL, {
      x: x, y: 5.2, w: 0.5, h: 0.5,
      fill: { color: CORAL_100 }, line: { color: CORAL_500, width: 1 }
    });
    s.addText(r.n, {
      x: x, y: 5.2, w: 0.5, h: 0.5,
      fontSize: 16, fontFace: HEAD, bold: true, color: CORAL_700,
      align: "center", valign: "middle", margin: 0
    });
    s.addText(r.text, {
      x: x + 0.65, y: 5.2, w: 2.4, h: 1.3,
      fontSize: 11, fontFace: BODY, color: SLATE_900, margin: 0
    });
  });

  addFooter(s, 2);

  s.addNotes(
    "Open with relatability. Ask the room: 'Show of hands — who has started their FY26 priorities?' " +
    "Count the hands. Then: 'Who has STARED at a blank priority template for more than 30 minutes?' More hands. Land the problem."
  );
}

// Slide 3 — MEET JOEY
{
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 1  •  SETUP");
  addSlideTitle(s, "Then Joey did something interesting", "A story from a session earlier this year");

  // Timeline of Joey's solve
  const steps = [
    { n: 1, title: "Had to write his priorities", detail: "Same pressure. Same blank page." },
    { n: 2, title: "Gathered the references we all have", detail: "Capabilities doc, metrics page, example priorities at ML7" },
    { n: 3, title: "Asked Copilot to help build a prompt", detail: "Not 'write my priorities' — 'help me build a prompt file that will write them'" },
    { n: 4, title: "Got a 287-line coaching agent", detail: "Reusable. Multi-phase. Interviews you, then produces publishable output." }
  ];

  steps.forEach((step, i) => {
    const y = 2.3 + i * 1.05;

    s.addShape(pres.shapes.OVAL, {
      x: 0.7, y: y, w: 0.75, h: 0.75,
      fill: { color: TEAL_500 }, line: { color: TEAL_500 }
    });
    s.addText(String(step.n), {
      x: 0.7, y: y, w: 0.75, h: 0.75,
      fontSize: 22, fontFace: HEAD, bold: true, color: WHITE,
      align: "center", valign: "middle", margin: 0
    });

    s.addText(step.title, {
      x: 1.75, y: y - 0.05, w: 10, h: 0.45,
      fontSize: 18, fontFace: HEAD, bold: true, color: SLATE_900, margin: 0
    });
    s.addText(step.detail, {
      x: 1.75, y: y + 0.4, w: 11, h: 0.4,
      fontSize: 13, fontFace: BODY, italic: true, color: SLATE_700, margin: 0
    });

    // Connector line
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 1.06, y: y + 0.75, w: 0.03, h: 0.35,
        fill: { color: SLATE_300 }, line: { color: SLATE_300 }
      });
    }
  });

  // Bottom callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 6.7, w: 12.1, h: 0.5, rectRadius: 0.08,
    fill: { color: INDIGO_050 }, line: { color: INDIGO_500, width: 1 }
  });
  s.addText("Today: we're going to pick that file apart and see what's inside.", {
    x: 0.6, y: 6.7, w: 12.1, h: 0.5,
    fontSize: 14, fontFace: HEAD, italic: true, bold: true, color: INDIGO_900,
    align: "center", valign: "middle", margin: 0
  });

  addFooter(s, 3);

  s.addNotes(
    "Narrate the story. Joey's a colleague — we saw this in a session earlier this year. " +
    "Emphasize the meta-move: he didn't ask AI to write his priorities, he asked AI to help him BUILD A PROMPT that writes priorities. That's the leverage point."
  );
}

// Slide 4 — AGENDA
{
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 1  •  SETUP");
  addSlideTitle(s, "Today's arc", "~60 minutes. Arranged so you can copy the pattern.");

  const parts = [
    { num: "1", time: "5 min",  title: "Setup",                   detail: "The problem, the story, the pattern" },
    { num: "2", time: "10 min", title: "The Workflow",            detail: "References → Copilot → Prompt File (the meta-pattern)" },
    { num: "3", time: "10 min", title: "Meet the Prompt File",    detail: "Screen-share the priority_builder file" },
    { num: "4", time: "25 min", title: "The 12 Techniques",       detail: "One per slide. How each piece earns its place." },
    { num: "5", time: "5 min",  title: "The Output & ROI",         detail: "What running it actually produces" },
    { num: "6", time: "5 min",  title: "Apply It + Q&A",           detail: "Your homework + open discussion" }
  ];

  parts.forEach((part, i) => {
    const y = 2.3 + i * 0.78;

    // Row background
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 12.1, h: 0.68,
      fill: { color: i % 2 === 0 ? SLATE_050 : WHITE }, line: { color: SLATE_200, width: 0.5 }
    });

    // Number
    s.addText(part.num, {
      x: 0.8, y: y, w: 0.8, h: 0.68,
      fontSize: 24, fontFace: HEAD, bold: true, color: INDIGO_500,
      align: "center", valign: "middle", margin: 0
    });

    // Time
    s.addText(part.time, {
      x: 1.7, y: y, w: 1.2, h: 0.68,
      fontSize: 12, fontFace: MONO, color: TEAL_700, bold: true,
      valign: "middle", margin: 0
    });

    // Title
    s.addText(part.title, {
      x: 3.0, y: y, w: 3.5, h: 0.68,
      fontSize: 15, fontFace: HEAD, bold: true, color: SLATE_900,
      valign: "middle", margin: 0
    });

    // Detail
    s.addText(part.detail, {
      x: 6.6, y: y, w: 6.0, h: 0.68,
      fontSize: 12, fontFace: BODY, italic: true, color: SLATE_700,
      valign: "middle", margin: 0
    });
  });

  addFooter(s, 4);

  s.addNotes(
    "Walk the agenda. Land the payoff at part 4: 'if you only remember one thing, you'll know 12 techniques by minute 45.' " +
    "Also land that part 6 isn't just Q&A — it's 'what's YOUR first prompt file going to be?'"
  );
}

// ══════════════════════════════════════════════════════════════════
// PART 2 — THE WORKFLOW (10 min)
// ══════════════════════════════════════════════════════════════════

// Slide 5 — THE META-PATTERN
{
  const s = nextSlide();
  s.background = { color: INDIGO_900 };

  s.addText("PART 2  •  THE WORKFLOW", {
    x: 0.6, y: 0.6, w: 12, h: 0.5,
    fontSize: 12, fontFace: BODY, color: TEAL_500, bold: true, charSpacing: 4, margin: 0
  });

  s.addText("The meta-pattern", {
    x: 0.6, y: 1.3, w: 12, h: 0.7,
    fontSize: 14, fontFace: BODY, color: INDIGO_100, charSpacing: 3, margin: 0
  });

  s.addText("References  +  Copilot  =  a reusable prompt file.", {
    x: 0.6, y: 2.5, w: 12, h: 1.3,
    fontSize: 42, fontFace: HEAD, bold: true, color: WHITE, margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.1, w: 2, h: 0.08,
    fill: { color: AMBER_500 }, line: { color: AMBER_500 }
  });

  s.addText("Build it once. Use it every cycle.", {
    x: 0.6, y: 4.5, w: 12, h: 0.7,
    fontSize: 22, fontFace: HEAD, italic: true, color: AMBER_500, margin: 0
  });

  s.addText("Share it with the team. Multiply the value.", {
    x: 0.6, y: 5.2, w: 12, h: 0.7,
    fontSize: 22, fontFace: HEAD, italic: true, color: TEAL_500, margin: 0
  });

  addFooter(s, 5);

  s.addNotes(
    "Land the meta-pattern. This is the ONE insight if they remember nothing else. " +
    "References (which already exist) + Copilot (which they have) = a prompt file that keeps paying off. Pause here for 3-5 seconds."
  );
}

// Slide 6 — STEP 1: GATHER REFERENCES
{
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 2  •  THE WORKFLOW");
  addSlideTitle(s, "Step 1 — Gather the references", "All of these were already available to Joey (and to you)");

  // Three reference file cards
  const refs = [
    {
      filename: "core_capabilities_manager.txt",
      label: "CAPABILITIES DOC",
      detail: "What 'Level 7' behaviors look like — Thinking, Execution, Relationships. The rubric Joey is being evaluated against.",
      color: INDIGO_500,
      tint: INDIGO_100
    },
    {
      filename: "unlocking_metrics.html",
      label: "METRICS TAXONOMY",
      detail: "The 30+ valid metric types across Financial and Non-Financial categories. The menu Joey must pick from.",
      color: TEAL_500,
      tint: TEAL_100
    },
    {
      filename: "example_of_priorities_ML7.md",
      label: "EXAMPLE PRIORITIES",
      detail: "What well-written ML7 priorities actually look like, with targets and ABCD structure. The bar to match.",
      color: AMBER_500,
      tint: AMBER_100
    }
  ];

  refs.forEach((r, i) => {
    const x = 0.6 + i * 4.15;
    const w = 3.95;

    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.3, w: w, h: 4.25,
      fill: { color: r.tint }, line: { color: r.color, width: 1 }
    });
    // Top accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.3, w: w, h: 0.3,
      fill: { color: r.color }, line: { color: r.color }
    });
    s.addText(r.label, {
      x: x, y: 2.3, w: w, h: 0.3,
      fontSize: 9, fontFace: HEAD, bold: true, color: WHITE, charSpacing: 3,
      align: "center", valign: "middle", margin: 0
    });

    // Filename
    s.addText(r.filename, {
      x: x + 0.2, y: 2.8, w: w - 0.4, h: 0.8,
      fontSize: 13, fontFace: MONO, bold: true, color: SLATE_900, margin: 0
    });

    // Detail
    s.addText(r.detail, {
      x: x + 0.2, y: 3.8, w: w - 0.4, h: 2.5,
      fontSize: 12, fontFace: BODY, color: SLATE_900, margin: 0, valign: "top"
    });
  });

  // Bottom note
  s.addText("These already existed. Joey didn't write them — he just collected them in one place.", {
    x: 0.6, y: 6.8, w: 12.1, h: 0.4,
    fontSize: 13, fontFace: BODY, italic: true, color: SLATE_700, align: "center", margin: 0
  });

  addFooter(s, 6);

  s.addNotes(
    "Walk the three references. Emphasize that NONE of this is new content Joey created — it's all pre-existing. " +
    "The key move is RECOGNIZING that he had enough raw material to build a prompt from."
  );
}

// Slide 7 — STEP 2: THE ASK
{
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 2  •  THE WORKFLOW");
  addSlideTitle(s, "Step 2 — Ask Copilot to build the prompt", "Not 'do the task' — 'help me build a tool that does the task'");

  // The meta-question in a styled card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 2.3, w: 11.3, h: 2.0, rectRadius: 0.1,
    fill: { color: SLATE_050 }, line: { color: INDIGO_500, width: 1.5 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0, y: 2.3, w: 0.1, h: 2.0,
    fill: { color: INDIGO_500 }, line: { color: INDIGO_500 }
  });
  s.addText("THE ASK (paraphrased)", {
    x: 1.3, y: 2.45, w: 11, h: 0.3,
    fontSize: 10, fontFace: HEAD, bold: true, color: INDIGO_700, charSpacing: 3, margin: 0
  });
  s.addText(
    "Using these three reference files, help me build a prompt file that:\n" +
    "1) interviews me about my work this cycle,\n" +
    "2) mines my workspace for evidence,\n" +
    "3) generates FY26 priorities in the company's ABCD format — CSV for the portal, readable doc for review.",
    {
      x: 1.3, y: 2.8, w: 10.9, h: 1.5,
      fontSize: 14, fontFace: MONO, color: SLATE_900, margin: 0, valign: "top"
    }
  );

  // Why this worked
  s.addText("Why this is the right level of abstraction", {
    x: 0.6, y: 4.7, w: 12, h: 0.4,
    fontSize: 14, fontFace: HEAD, bold: true, color: TEAL_700, charSpacing: 2, margin: 0
  });

  const whys = [
    { title: "References = grounding",       detail: "The AI isn't guessing what FY26 priorities look like — the examples are right there." },
    { title: "Prompt file = leverage",       detail: "One-time build. Every cycle thereafter costs ~30 min, not 3 hours." },
    { title: "Team-shareable",               detail: "Joey's file works for anyone at ML7. Same pattern adapts to other levels." }
  ];
  whys.forEach((w, i) => {
    const y = 5.3 + i * 0.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y + 0.1, w: 0.08, h: 0.35,
      fill: { color: TEAL_500 }, line: { color: TEAL_500 }
    });
    s.addText([
      { text: w.title + "  ", options: { bold: true, color: SLATE_900 } },
      { text: "— " + w.detail, options: { color: SLATE_700, italic: true } }
    ], {
      x: 0.8, y: y, w: 12, h: 0.5, fontSize: 13, fontFace: BODY, margin: 0, valign: "middle"
    });
  });

  addFooter(s, 7);

  s.addNotes(
    "This slide is the conceptual leverage point. Most people ask AI to 'do the task' — Joey asked AI to 'build a tool that does the task.' " +
    "That's 10x thinking. The references grounded the AI so it produced something real, not generic."
  );
}

// Slide 8 — STEP 3: THE RESULT
{
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 2  •  THE WORKFLOW");
  addSlideTitle(s, "Step 3 — The result", "priority_builder_instructions_ai.md");

  // Stats cards
  const stats = [
    { num: "287",  label: "lines of prompt",               color: INDIGO_500 },
    { num: "6",    label: "explicit phases",               color: TEAL_500 },
    { num: "32",   label: "interview questions",           color: AMBER_500 },
    { num: "3",    label: "output versions per priority",  color: CORAL_500 },
    { num: "12",   label: "prompt techniques in use",      color: PURPLE_500 }
  ];

  stats.forEach((stat, i) => {
    const x = 0.6 + i * 2.48;
    const w = 2.3;

    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.3, w: w, h: 2.0,
      fill: { color: WHITE }, line: { color: stat.color, width: 2 }
    });

    s.addText(stat.num, {
      x: x, y: 2.35, w: w, h: 1.1,
      fontSize: 56, fontFace: HEAD, bold: true, color: stat.color,
      align: "center", valign: "middle", margin: 0
    });
    s.addText(stat.label, {
      x: x + 0.1, y: 3.55, w: w - 0.2, h: 0.6,
      fontSize: 11, fontFace: BODY, color: SLATE_700, italic: true,
      align: "center", valign: "middle", margin: 0
    });
  });

  // What it does
  s.addText("What the file is", {
    x: 0.6, y: 4.8, w: 12, h: 0.4,
    fontSize: 14, fontFace: HEAD, bold: true, color: TEAL_700, charSpacing: 2, margin: 0
  });

  s.addText(
    "A multi-phase coaching agent. You paste it into Copilot Chat and it takes over:  " +
    "greets you → asks what categories you want to focus on → interviews you with 20+ questions → " +
    "searches your workspace for evidence → produces three versions of each priority " +
    "(Conservative, Balanced, Aspirational) → offers to iterate → outputs both CSV (for the portal) and a formatted doc (for review).",
    {
      x: 0.6, y: 5.3, w: 12.1, h: 1.7,
      fontSize: 13, fontFace: BODY, color: SLATE_900, margin: 0, valign: "top"
    }
  );

  addFooter(s, 8);

  s.addNotes(
    "The stats build the 'wow.' 287 lines, 6 phases, 12 techniques — Joey built a legitimately sophisticated tool. " +
    "Then describe what it does in plain terms so people know the shape before we dive in."
  );
}

// Slide 9 — THE PATTERN GENERALIZES
{
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 2  •  THE WORKFLOW");
  addSlideTitle(s, "This pattern works beyond priorities", "Any recurring task with reference material is a candidate");

  const examples = [
    { task: "FY26 Priorities",       refs: "capabilities, metrics, example priorities",            color: INDIGO_500, current: true },
    { task: "PR Descriptions",       refs: "team style guide, past good PRs, commit conventions",  color: TEAL_500 },
    { task: "Client Status Reports", refs: "status report template, KPI definitions, past reports", color: AMBER_500 },
    { task: "Unit Test Generation",  refs: "testing conventions, example tests, coverage standards", color: CORAL_500 },
    { task: "Onboarding Docs",       refs: "team handbook, project docs, past onboarding notes",    color: PURPLE_500 },
    { task: "Code Review Feedback",  refs: "style guide, common issues list, past reviews",         color: INDIGO_700 }
  ];

  examples.forEach((ex, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15;
    const y = 2.3 + row * 1.45;

    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 5.95, h: 1.25,
      fill: { color: ex.current ? INDIGO_050 : WHITE },
      line: { color: ex.color, width: ex.current ? 2 : 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 0.08, h: 1.25,
      fill: { color: ex.color }, line: { color: ex.color }
    });

    // Task name
    s.addText(ex.task, {
      x: x + 0.2, y: y + 0.15, w: 5.7, h: 0.4,
      fontSize: 16, fontFace: HEAD, bold: true, color: SLATE_900, margin: 0
    });

    // "TODAY'S EXAMPLE" badge on the current one
    if (ex.current) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: x + 3.8, y: y + 0.18, w: 2.0, h: 0.3, rectRadius: 0.04,
        fill: { color: ex.color }, line: { color: ex.color }
      });
      s.addText("TODAY'S EXAMPLE", {
        x: x + 3.8, y: y + 0.18, w: 2.0, h: 0.3,
        fontSize: 8, fontFace: HEAD, bold: true, color: WHITE,
        align: "center", valign: "middle", charSpacing: 2, margin: 0
      });
    }

    // References
    s.addText("References:", {
      x: x + 0.2, y: y + 0.55, w: 1.3, h: 0.3,
      fontSize: 10, fontFace: HEAD, bold: true, color: SLATE_500, charSpacing: 2, margin: 0
    });
    s.addText(ex.refs, {
      x: x + 0.2, y: y + 0.8, w: 5.7, h: 0.4,
      fontSize: 11, fontFace: BODY, italic: true, color: SLATE_700, margin: 0
    });
  });

  addFooter(s, 9);

  s.addNotes(
    "Plant the seed: this works for lots of things. By the time we finish today, I want each of you to have ONE task in mind from this list (or your own) that you'll template. " +
    "We'll come back to this at the end for a commitment moment."
  );
}

// ══════════════════════════════════════════════════════════════════
// PART 3 — MEET THE PROMPT FILE (10 min)
// ══════════════════════════════════════════════════════════════════

// Slide 10 — SCREEN SHARE BREAK
{
  const s = nextSlide();
  s.background = { color: SLATE_050 };

  s.addText("PART 3  •  MEET THE PROMPT FILE", {
    x: 0.6, y: 0.6, w: 12, h: 0.5,
    fontSize: 12, fontFace: BODY, color: TEAL_700, bold: true, charSpacing: 4, margin: 0
  });

  // Big arrow
  s.addText("\u2192", {
    x: 0.6, y: 2.4, w: 1.4, h: 1.6,
    fontSize: 110, fontFace: HEAD, bold: true, color: TEAL_500, align: "center", margin: 0
  });

  s.addText("Switch to", {
    x: 2.0, y: 2.6, w: 11, h: 0.5,
    fontSize: 18, fontFace: BODY, color: SLATE_500, italic: true, margin: 0
  });
  s.addText("priority_builder_instructions_ai.md", {
    x: 2.0, y: 3.1, w: 11, h: 0.9,
    fontSize: 30, fontFace: MONO, bold: true, color: INDIGO_900, margin: 0
  });
  s.addText("Walk top to bottom — about 10 minutes.", {
    x: 2.0, y: 4.1, w: 11, h: 0.5,
    fontSize: 16, fontFace: BODY, color: SLATE_700, margin: 0
  });

  // What to point out on each phase
  s.addText("What to point out as you scroll", {
    x: 0.6, y: 5.1, w: 12, h: 0.4,
    fontSize: 12, fontFace: HEAD, bold: true, color: TEAL_700, charSpacing: 2, margin: 0
  });
  s.addText([
    { text: "•  Phase labels  ", options: { bold: true, color: SLATE_900 } },
    { text: "— each one does one thing", options: { color: SLATE_700, italic: true, breakLine: true } },
    { text: "•  Question bank  ", options: { bold: true, color: SLATE_900 } },
    { text: "— notice it says 'adapt based on answers'", options: { color: SLATE_700, italic: true, breakLine: true } },
    { text: "•  Phase 2.5: Artifact Mining  ", options: { bold: true, color: CORAL_700 } },
    { text: "— AI searches your actual files for evidence", options: { color: SLATE_700, italic: true, breakLine: true } },
    { text: "•  Three versions  ", options: { bold: true, color: SLATE_900 } },
    { text: "— Conservative / Balanced / Aspirational", options: { color: SLATE_700, italic: true, breakLine: true } },
    { text: "•  Tone & Style section  ", options: { bold: true, color: SLATE_900 } },
    { text: "— explicit voice instructions", options: { color: SLATE_700, italic: true } }
  ], {
    x: 0.6, y: 5.5, w: 12.1, h: 1.6, fontSize: 12, fontFace: BODY, margin: 0
  });

  addFooter(s, 10);

  s.addNotes(
    "Switch to the priority_builder file. Open in VS Code so people see the markdown. Scroll through the 6 phases. " +
    "Point out the labels but do NOT dive deep on technique yet — save that for Part 4. Aim for 8-10 minutes here. " +
    "Come back to this deck when done."
  );
}

// Slide 11 — RECAP OF WHAT WE JUST SAW
{
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 3  •  MEET THE PROMPT FILE");
  addSlideTitle(s, "What you just saw", "6 phases. Each one earns its place.");

  const phases = [
    { n: "1",   name: "Initial Setup",        detail: "Greet. Ask how many priorities. Which categories." },
    { n: "2",   name: "20 Questions",          detail: "Adaptive interview, 32 questions organized by category." },
    { n: "2.5", name: "Artifact Mining",       detail: "AI searches YOUR workspace for evidence.", highlight: true },
    { n: "3",   name: "Generate Versions",     detail: "Three versions per priority (Conservative / Balanced / Aspirational)." },
    { n: "4",   name: "Iterative Refinement",  detail: "Pin elements, mix, regenerate, or answer more questions." },
    { n: "5",   name: "Finalization",          detail: "Confirm complete. Move to next priority." },
    { n: "6",   name: "Final Output",          detail: "CSV for the portal + formatted doc for review." }
  ];

  phases.forEach((p, i) => {
    const y = 2.3 + i * 0.62;

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 12.1, h: 0.55,
      fill: { color: p.highlight ? CORAL_100 : (i % 2 === 0 ? SLATE_050 : WHITE) },
      line: { color: p.highlight ? CORAL_500 : SLATE_200, width: p.highlight ? 1 : 0.5 }
    });

    // Phase badge
    s.addShape(pres.shapes.OVAL, {
      x: 0.75, y: y + 0.08, w: 0.4, h: 0.4,
      fill: { color: p.highlight ? CORAL_500 : INDIGO_500 }, line: { color: p.highlight ? CORAL_500 : INDIGO_500 }
    });
    s.addText(p.n, {
      x: 0.75, y: y + 0.08, w: 0.4, h: 0.4,
      fontSize: 11, fontFace: HEAD, bold: true, color: WHITE,
      align: "center", valign: "middle", margin: 0
    });

    // Phase name
    s.addText(p.name, {
      x: 1.3, y: y, w: 3.5, h: 0.55,
      fontSize: 14, fontFace: HEAD, bold: true,
      color: p.highlight ? CORAL_700 : SLATE_900,
      valign: "middle", margin: 0
    });

    // Detail
    s.addText(p.detail, {
      x: 4.8, y: y, w: 7.8, h: 0.55,
      fontSize: 12, fontFace: BODY,
      color: p.highlight ? CORAL_700 : SLATE_700,
      italic: true, valign: "middle", margin: 0
    });
  });

  // Note on the highlighted phase
  s.addText("Phase 2.5 (Artifact Mining) is highlighted — we'll come back to it as Technique #6. That's where the magic is.", {
    x: 0.6, y: 6.75, w: 12.1, h: 0.4,
    fontSize: 11, fontFace: BODY, italic: true, color: CORAL_700, align: "center", margin: 0
  });

  addFooter(s, 11);

  s.addNotes(
    "Recap the phases. Land Phase 2.5 as the 'oh interesting' moment — it's where the AI actually reads the user's files. " +
    "Now we're ready to dive into the techniques."
  );
}

// ══════════════════════════════════════════════════════════════════
// PART 4 — THE 12 TECHNIQUES (25 min)
// ══════════════════════════════════════════════════════════════════

// Slide 12 — TECHNIQUES OVERVIEW
{
  const s = nextSlide();
  s.background = { color: INDIGO_900 };

  s.addText("PART 4  •  THE 12 TECHNIQUES", {
    x: 0.6, y: 0.6, w: 12, h: 0.5,
    fontSize: 12, fontFace: BODY, color: TEAL_500, bold: true, charSpacing: 4, margin: 0
  });

  s.addText("What's inside Joey's file", {
    x: 0.6, y: 1.4, w: 12, h: 0.8,
    fontSize: 36, fontFace: HEAD, bold: true, color: WHITE, margin: 0
  });
  s.addText("12 techniques. Each one earns its place.", {
    x: 0.6, y: 2.1, w: 12, h: 0.5,
    fontSize: 18, fontFace: HEAD, italic: true, color: INDIGO_100, margin: 0
  });

  // Grid of 12 technique names
  const techNames = [
    "Role Assignment", "Goal-First Writing",
    "Structured Context", "Multi-Phase Workflow",
    "Adaptive Question Bank", "Manual RAG",
    "Multi-Persona Generation", "Few-Shot Output Examples",
    "Iterative Refinement Loop", "Strict Multi-Format Output",
    "Tone & Style Directives", "Clarifying Questions"
  ];

  techNames.forEach((name, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.6 + col * 4.15;
    const y = 3.0 + row * 0.8;

    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 3.95, h: 0.65,
      fill: { color: INDIGO_700 }, line: { color: INDIGO_500, width: 1 }
    });

    // Number
    s.addText(String(i + 1), {
      x: x + 0.15, y: y, w: 0.6, h: 0.65,
      fontSize: 22, fontFace: HEAD, bold: true, color: TEAL_500,
      align: "center", valign: "middle", margin: 0
    });

    // Name
    s.addText(name, {
      x: x + 0.75, y: y, w: 3.1, h: 0.65,
      fontSize: 12, fontFace: HEAD, color: WHITE, bold: true,
      valign: "middle", margin: 0
    });
  });

  addFooter(s, 12);

  s.addNotes(
    "Overview slide. Don't read them all — just say 'here are the 12 we'll walk through. Some you'll recognize, some will be new.' " +
    "Then jump into slide 13."
  );
}

// Helper to build a technique slide
function addTechniqueSlide(num, name, description, excerpt, phase, why, accentColor, accentLight, accentDark, keyCallout) {
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 4  •  THE 12 TECHNIQUES");

  // Number badge
  s.addShape(pres.shapes.OVAL, {
    x: 0.6, y: 0.6, w: 0.95, h: 0.95,
    fill: { color: accentColor }, line: { color: accentColor }
  });
  s.addText(String(num), {
    x: 0.6, y: 0.6, w: 0.95, h: 0.95,
    fontSize: 38, fontFace: HEAD, bold: true, color: WHITE,
    align: "center", valign: "middle", margin: 0
  });

  // Label
  s.addText("TECHNIQUE", {
    x: 1.85, y: 0.65, w: 5, h: 0.3,
    fontSize: 10, fontFace: HEAD, bold: true, color: SLATE_500, charSpacing: 4, margin: 0
  });

  // Name
  s.addText(name, {
    x: 1.85, y: 0.95, w: 11, h: 0.7,
    fontSize: 30, fontFace: HEAD, bold: true, color: accentDark, margin: 0
  });

  // Description
  s.addText(description, {
    x: 1.85, y: 1.6, w: 11, h: 0.4,
    fontSize: 15, fontFace: HEAD, italic: true, color: SLATE_700, margin: 0
  });

  // Key differentiator badge (if provided)
  if (keyCallout) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 9.5, y: 0.7, w: 3.2, h: 0.4, rectRadius: 0.05,
      fill: { color: accentColor }, line: { color: accentColor }
    });
    s.addText("\u2605 " + keyCallout, {
      x: 9.5, y: 0.7, w: 3.2, h: 0.4,
      fontSize: 10, fontFace: HEAD, bold: true, color: WHITE,
      align: "center", valign: "middle", charSpacing: 2, margin: 0
    });
  }

  // Phase label
  s.addText("FROM THE PRIORITY BUILDER", {
    x: 0.6, y: 2.35, w: 6, h: 0.3,
    fontSize: 9, fontFace: HEAD, bold: true, color: SLATE_500, charSpacing: 3, margin: 0
  });
  s.addText(phase, {
    x: 0.6, y: 2.6, w: 8, h: 0.4,
    fontSize: 13, fontFace: MONO, bold: true, color: accentColor, margin: 0
  });

  // Excerpt box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 3.1, w: 12.1, h: 2.3,
    fill: { color: SLATE_050 }, line: { color: SLATE_200, width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 3.1, w: 0.08, h: 2.3,
    fill: { color: accentColor }, line: { color: accentColor }
  });
  s.addText(excerpt, {
    x: 0.95, y: 3.25, w: 11.6, h: 2.05,
    fontSize: 12, fontFace: MONO, color: SLATE_900, valign: "top", margin: 0
  });

  // Why it matters
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 5.65, w: 12.1, h: 1.4, rectRadius: 0.08,
    fill: { color: accentLight }, line: { color: accentColor, width: 1 }
  });
  s.addText("WHY IT MATTERS", {
    x: 0.9, y: 5.8, w: 11.6, h: 0.3,
    fontSize: 9, fontFace: HEAD, bold: true, color: accentDark, charSpacing: 3, margin: 0
  });
  s.addText(why, {
    x: 0.9, y: 6.05, w: 11.6, h: 0.95,
    fontSize: 14, fontFace: BODY, color: SLATE_900, italic: true, margin: 0, valign: "top"
  });

  addFooter(s, slideCounter);
  return s;
}

// Technique 1 — Role Assignment
{
  const s = addTechniqueSlide(
    1,
    "Role Assignment",
    "Set the AI's persona before anything else",
    "You are an expert career coach and performance\nmanagement specialist helping Accenture employees\ncreate compelling FY26 priorities with ABCD reflections.",
    "Line 9 — first line of the prompt",
    "Career-coach AI writes different output than 'helpful generalist.' Voice, priorities, and judgment all shift. Without a role, the AI defaults to middle-of-the-road help.",
    INDIGO_500, INDIGO_100, INDIGO_900
  );
  s.addNotes(
    "Technique 1. Simple, high-leverage. Notice Joey picked SPECIFIC role — not 'helpful AI' but 'career coach and performance management specialist.' " +
    "The more specific the role, the sharper the output."
  );
}

// Technique 2 — Goal-First Writing
{
  const s = addTechniqueSlide(
    2,
    "Goal-First Writing",
    "State the deliverable in one sentence, early",
    "Your goal is to generate 2-3 high-quality priorities\nthat will position the user for success in their\nannual review.",
    "Line 9 — immediately after the role",
    "The AI knows what 'done' looks like in 22 words. Everything that follows is context supporting that goal — not a guessing game about what the user actually wants.",
    INDIGO_500, INDIGO_100, INDIGO_900
  );
  s.addNotes(
    "Technique 2. The single most underused technique. Most people bury the ask in paragraph 3. Joey puts it in the first sentence after the role."
  );
}

// Technique 3 — Structured Context with Domain Knowledge
{
  const s = addTechniqueSlide(
    3,
    "Structured Context with Domain Knowledge",
    "Embed domain-specific frameworks directly in the prompt",
    "The four FY26 priority categories are:\n  1. Client Value Creation\n  2. AI Enablement\n  3. Great Place to Work for Reinventors\n  4. Community\n\n(Followed by 30+ valid metric types across\nFinancial and Non-Financial groupings)",
    "Lines 11-58 — the entire context block",
    "The AI doesn't 'know' Accenture's priority framework from training data. Baking it into the prompt means every output respects the categories — no hallucinated metrics, no made-up rubrics.",
    TEAL_500, TEAL_100, TEAL_700
  );
  s.addNotes(
    "Technique 3. This is where Joey's 3 reference files earn their keep. He lifted the frameworks out of those files and put them in the prompt. " +
    "Audience takeaway: if your domain has a taxonomy or framework, don't assume AI knows it — include it."
  );
}

// Technique 4 — Multi-Phase Workflow (Prompt Chaining)
{
  const s = addTechniqueSlide(
    4,
    "Multi-Phase Workflow  (aka Prompt Chaining)",
    "Break a complex task into explicit sequential phases",
    "PHASE 1: INITIAL SETUP\nPHASE 2: 20 QUESTIONS PER PRIORITY\nPHASE 2.5: ARTIFACT MINING\nPHASE 3: GENERATE PRIORITY VERSIONS\nPHASE 4: ITERATIVE REFINEMENT\nPHASE 5: FINALIZATION\nPHASE 6: FINAL OUTPUT",
    "Structural backbone of the entire file",
    "Complex tasks fail when the AI tries to do everything at once. Naming explicit phases forces the AI to finish each step before moving on — and gives the user natural checkpoints to validate progress.",
    TEAL_500, TEAL_100, TEAL_700
  );
  s.addNotes(
    "Technique 4. This is the backbone of the file. Each phase is a 'mini-prompt' in the chain. " +
    "If your task is more than 3 steps, don't hope the AI figures it out — name the phases."
  );
}

// Technique 5 — Adaptive Question Bank
{
  const s = addTechniqueSlide(
    5,
    "Adaptive Question Bank",
    "Library of questions + rules for when to ask which",
    "For EACH priority they want to create, play \"20 Questions\"\nto extract detailed information.\n\nAsk questions conversationally, adapting based on their\nanswers. Don't ask all 20 if you have enough info.\n\n(Followed by 32 questions grouped by category:\n Discovery, Client Value, AI, Team, Community, Metrics, ABCD)",
    "Lines 79-129 — the question bank",
    "Rigid scripts produce robotic interviews. Giving the AI a library PLUS adaptation rules (\"stop when you have enough info\") produces conversation — which gets better input than interrogation.",
    AMBER_500, AMBER_100, AMBER_700
  );
  s.addNotes(
    "Technique 5. Notice the subtle move: Joey doesn't say 'ask these 32 questions in order.' He says 'here are 32 possible questions, adapt based on what you hear.' " +
    "That's the difference between a form and a conversation."
  );
}

// Technique 6 — Manual RAG (Artifact Mining)
{
  const s = addTechniqueSlide(
    6,
    "Manual RAG  (Artifact Mining)",
    "Have the AI read real files for evidence — don't just trust claims",
    "PHASE 2.5: ARTIFACT MINING\n\nBefore generating versions, search the user's workspace\nfor evidence:\n  - Use `find` or `glob` to locate relevant files\n  - Read presentations, READMEs, and code for metrics\n  - Validate claimed numbers against actual artifacts\n  - Extract quantifiable data from documents",
    "Lines 131-136 — an entire dedicated phase",
    "This is Retrieval-Augmented Generation in action. The AI retrieves real data from your workspace and grounds the output in it. Numbers become real. No fluff. No exaggeration. This is what `#file:` and `@codebase` do in Copilot — Joey names it explicitly.",
    CORAL_500, CORAL_100, CORAL_700,
    "GAME CHANGER"
  );
  s.addNotes(
    "Technique 6. THIS is the slide that makes audiences lean forward. Joey tells the AI to READ THE USER'S FILES for evidence. " +
    "This is RAG — retrieval augmented generation — done manually. It means when the AI writes your Business Impact section, the numbers are REAL numbers from YOUR artifacts. " +
    "Pause here. Let it land."
  );
}

// Technique 7 — Multi-Persona / Multi-Version Generation
{
  const s = addTechniqueSlide(
    7,
    "Multi-Persona / Multi-Version Generation",
    "Generate 2-3 variants on a spectrum, not one 'best' answer",
    "VERSION A - CONSERVATIVE:\n  Safe, achievable goals. Standard metrics.\n\nVERSION B - BALANCED:\n  Ambitious but realistic. Mix of quant and qual metrics.\n\nVERSION C - ASPIRATIONAL:\n  Stretch goals. Aggressive metrics. Maximum impact.",
    "Lines 138-157 — Phase 3",
    "Humans are bad at evaluating a single option in isolation (\"is this good?\"). Humans are great at comparing options (\"which of these three feels right?\"). Three variants turns a hard judgment call into an easy preference.",
    AMBER_500, AMBER_100, AMBER_700
  );
  s.addNotes(
    "Technique 7. This is a creative reframing. Instead of asking AI for 'the best version' (which triggers decision paralysis), ask for 3 on a spectrum. " +
    "You pick faster. You get a better result. Works for any creative task — priorities, emails, architecture options."
  );
}

// Technique 8 — Few-Shot Output Examples
{
  const s = addTechniqueSlide(
    8,
    "Few-Shot Output Examples",
    "Show the exact shape of what you want back",
    "Present all three versions in a clear table format like this:\n\nPRIORITY: [Category Name] - [Short Title]\n\nVERSION A (Conservative):\n  Priority Description: [detailed description]\n  Metrics: [1-3 metrics from the list]\n  Expected Value: [outcome]\n  ---\n  ABCD Reflection:\n    A - Accomplishments: [what you did]\n    B - Business Impact: [measurable value]\n    ...",
    "Lines 161-180 — the format template",
    "\"Format it clearly\" is vague. Showing the exact template guarantees the output matches. This is few-shot prompting applied to format rather than content.",
    AMBER_500, AMBER_100, AMBER_700
  );
  s.addNotes(
    "Technique 8. Classic few-shot. Joey could have said 'format nicely.' Instead he shows the EXACT skeleton. AI now has a pattern to match."
  );
}

// Technique 9 — Iterative Refinement Loop
{
  const s = addTechniqueSlide(
    9,
    "Iterative Refinement Loop",
    "Bake iteration into the workflow, don't leave it to the user",
    "After showing all three versions, ask:\n\"Which version resonates with you most?\"\n\nOffer these options:\n  1. I like Version [A/B/C] — use that one\n  2. Create a custom version combining elements I specify\n  3. Pin specific cells I like and regenerate the rest\n  4. Answer more questions to refine further\n  5. Start over with different information",
    "Lines 184-192 — Phase 4",
    "Most prompts stop at \"produce the answer.\" The priority builder recognizes the first answer is a starting point, not a deliverable. The loop is built in — including the brilliant \"pin cells, regenerate the rest\" pattern.",
    PURPLE_500, PURPLE_100, PURPLE_700
  );
  s.addNotes(
    "Technique 9. The 'pin cells' option is particularly good — it lets the user keep the 80% they like and regenerate only the 20% that's off. " +
    "No more 'start over from scratch.'"
  );
}

// Technique 10 — Strict Multi-Format Output
{
  const s = addTechniqueSlide(
    10,
    "Strict Multi-Format Output",
    "Produce for the system AND for the reviewer in one pass",
    "FORMAT 1 - CSV (Ready to Copy/Paste into Excel):\nPriority,Prio Category,Metric,Value,Reflection-A,...\n\nFORMAT 2 - FORMATTED DOCUMENT (Human Readable):\n\u2550\u2550\u2550 PRIORITY 1: [Category] - [Title] \u2550\u2550\u2550\nDESCRIPTION: ...\n\nCRITICAL CSV FORMATTING RULES:\n  - Use EXACT column headers\n  - Wrap ALL cell values in double quotes\n  - Each priority = one row",
    "Lines 207-261 — Phase 6",
    "Real workflows need real output. Joey's priorities end up in a corporate portal (CSV) AND get self-reviewed (formatted doc). The prompt produces both in one pass — no manual reformatting.",
    INDIGO_500, INDIGO_100, INDIGO_900
  );
  s.addNotes(
    "Technique 10. Think about WHERE the output actually goes. If you need machine-readable AND human-readable, ask for both. " +
    "The AI doesn't mind producing two formats — but it won't do it unless you tell it to."
  );
}

// Technique 11 — Tone & Style Directives
{
  const s = addTechniqueSlide(
    11,
    "Tone & Style Directives",
    "Define the voice, not just the content",
    "TONE & STYLE:\n  - Encouraging and supportive\n  - Professional but friendly\n  - Solution-oriented\n  - Celebrate their achievements\n  - Push for specificity without being pushy\n  - Make them feel confident about their priorities",
    "Lines 276-283 — final voice block",
    "Without tone directives, AI veers between 'generic helpful' and 'unnecessarily formal.' For a coaching use case, a warm-but-rigorous voice matters. Making it explicit locks it in across every interaction.",
    TEAL_500, TEAL_100, TEAL_700
  );
  s.addNotes(
    "Technique 11. Cheap to add, disproportionate impact. 5-6 bullets on voice = the entire UX of the interaction shifts. " +
    "Especially matters for client-facing or HR-adjacent use cases."
  );
}

// Technique 12 — Clarifying Questions (BIDIRECTIONAL)
{
  const s = addTechniqueSlide(
    12,
    "Clarifying Questions  (Bidirectional)",
    "Make AI ask, not assume — across the entire workflow",
    "BE CONVERSATIONAL:\n  Don't feel like you must ask all 20 questions.\n  Stop when you have enough information.\n\nADAPT QUESTIONS:\n  Based on their role, tailor questions appropriately.\n\nBE HONEST:\n  If they haven't accomplished much yet, help them write\n  forward-looking priorities with realistic reflections.\n\nPROVIDE EXAMPLES:\n  When they're stuck, offer 2-3 concrete examples.",
    "Lines 265-275 — guidelines section",
    "The biggest differentiator between a prompt and a prompt template. Without this, AI silently guesses when inputs are ambiguous. With it, AI asks, adapts, and collaborates. The interaction becomes a conversation, not a command.",
    CORAL_500, CORAL_100, CORAL_700,
    "KEY DIFFERENTIATOR"
  );
  s.addNotes(
    "Technique 12. The close of the techniques section. This is the one most teams skip — and it's the highest-leverage addition. " +
    "Build conversation hooks into every template. Tell the AI when to ask, when to stop, when to offer examples."
  );
}

// ══════════════════════════════════════════════════════════════════
// PART 5 — THE OUTPUT & ROI (5 min)
// ══════════════════════════════════════════════════════════════════

// Slide — OUTPUT EXAMPLE
{
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 5  •  THE OUTPUT & ROI");
  addSlideTitle(s, "What running it actually produces", "Excerpt from real generated priorities");

  // Output box (simulated code-block style)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.2, w: 12.1, h: 4.1,
    fill: { color: SLATE_050 }, line: { color: SLATE_200, width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.2, w: 0.08, h: 4.1,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });

  s.addText([
    { text: "\u2550\u2550\u2550  PRIORITY 1: Client Value Creation  \u2550\u2550\u2550\n", options: { color: INDIGO_900, bold: true, fontSize: 13 } },
    { text: "Priority Title: ", options: { bold: true, color: SLATE_900 } },
    { text: "Deliver critical platform migrations and secure contract renewal\n\n", options: { color: SLATE_900 } },
    { text: "Metrics:\n", options: { bold: true, color: SLATE_900 } },
    { text: "  \u2022 Non-Financial | Client Delivery | 2 platform migrations, zero critical defects\n", options: { color: SLATE_700 } },
    { text: "  \u2022 Financial     | On Time/On Budget | Both migrations within contracted timeline\n", options: { color: SLATE_700 } },
    { text: "  \u2022 Non-Financial | Client Partnership | Restore client from red to green + renew contract\n\n", options: { color: SLATE_700 } },
    { text: "A \u2014 Accomplishments: ", options: { bold: true, color: TEAL_700 } },
    { text: "Delivered Java SpringBoot ECS-to-Lambda migration with the service now fully serving production traffic...\n\n", options: { color: SLATE_900, italic: true } },
    { text: "B \u2014 Business Impact: ", options: { bold: true, color: TEAL_700 } },
    { text: "Transformed client relationship from \"considering termination\" to \"renewed for another year,\" preserving a multi-year engagement...\n\n", options: { color: SLATE_900, italic: true } },
    { text: "C \u2014 Challenges Overcome: ", options: { bold: true, color: TEAL_700 } },
    { text: "Inherited a team with zero completed deliverables and active client doubt about the engagement's viability...\n\n", options: { color: SLATE_900, italic: true } },
    { text: "D \u2014 Development & Learning: ", options: { bold: true, color: TEAL_700 } },
    { text: "Deepened expertise in serverless architecture patterns and AWS security services...", options: { color: SLATE_900, italic: true } }
  ], {
    x: 0.95, y: 2.4, w: 11.6, h: 3.8,
    fontSize: 11, fontFace: MONO, valign: "top", margin: 0
  });

  s.addText("Publishable-quality on first generation. The technique-dense prompt file produces technique-dense output.", {
    x: 0.6, y: 6.55, w: 12.1, h: 0.5,
    fontSize: 13, fontFace: BODY, italic: true, color: TEAL_700, align: "center", bold: true, margin: 0
  });

  addFooter(s, slideCounter);

  s.addNotes(
    "Show what the output looks like. Land that these are REAL, publishable priorities — not generic AI fluff. " +
    "The Business Impact and Accomplishments are concrete because Phase 2.5 (Artifact Mining) grounded them in real work."
  );
}

// Slide — ROI
{
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 5  •  THE OUTPUT & ROI");
  addSlideTitle(s, "The ROI", "One evening of prompt-building. Every cycle, forever.");

  // Comparison table
  const roiRows = [
    { label: "Time to draft priorities",       before: "~3 hours per cycle",         after: "~30 minutes",                     color: CORAL_500 },
    { label: "Quality of metrics",              before: "Variable, often vague",       after: "Backed by artifact mining",        color: TEAL_500 },
    { label: "Format consistency",              before: "Manual re-formatting",        after: "CSV + doc in one pass",            color: AMBER_500 },
    { label: "Team scalability",                before: "Each person figures it out",  after: "One file \u2192 everyone benefits", color: INDIGO_500 },
    { label: "Reuse across cycles",             before: "Start over each time",        after: "Same file, new data",              color: PURPLE_500 }
  ];

  // Table header
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.3, w: 12.1, h: 0.5,
    fill: { color: INDIGO_900 }, line: { color: INDIGO_900 }
  });
  s.addText("DIMENSION", { x: 0.8, y: 2.3, w: 4.5, h: 0.5,
    fontSize: 10, fontFace: HEAD, bold: true, color: WHITE, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("WITHOUT THE BUILDER", { x: 5.3, y: 2.3, w: 3.7, h: 0.5,
    fontSize: 10, fontFace: HEAD, bold: true, color: WHITE, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("WITH THE BUILDER", { x: 9.0, y: 2.3, w: 3.7, h: 0.5,
    fontSize: 10, fontFace: HEAD, bold: true, color: WHITE, charSpacing: 3, valign: "middle", margin: 0 });

  roiRows.forEach((row, i) => {
    const y = 2.8 + i * 0.6;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 12.1, h: 0.55,
      fill: { color: i % 2 === 0 ? WHITE : SLATE_050 }, line: { color: SLATE_200, width: 0.5 }
    });
    // Accent stripe
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 0.08, h: 0.55,
      fill: { color: row.color }, line: { color: row.color }
    });
    s.addText(row.label, { x: 0.9, y: y, w: 4.3, h: 0.55,
      fontSize: 12, fontFace: HEAD, bold: true, color: SLATE_900, valign: "middle", margin: 0 });
    s.addText(row.before, { x: 5.3, y: y, w: 3.7, h: 0.55,
      fontSize: 11, fontFace: BODY, color: SLATE_700, italic: true, valign: "middle", margin: 0 });
    s.addText(row.after, { x: 9.0, y: y, w: 3.7, h: 0.55,
      fontSize: 11, fontFace: BODY, color: row.color, bold: true, valign: "middle", margin: 0 });
  });

  // Bottom callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 6.15, w: 12.1, h: 0.9, rectRadius: 0.1,
    fill: { color: INDIGO_900 }, line: { color: INDIGO_900 }
  });
  s.addText("One person. One evening of prompt-building. Infinite reuse for the team.", {
    x: 0.6, y: 6.15, w: 12.1, h: 0.9,
    fontSize: 17, fontFace: HEAD, bold: true, italic: true, color: WHITE,
    align: "center", valign: "middle", margin: 0
  });

  addFooter(s, slideCounter);

  s.addNotes(
    "Don't just describe the ROI — quantify it. If 10 managers each save 2.5 hours on priorities twice a year, that's 50 person-hours reclaimed annually from ONE prompt file. " +
    "Multiply that by 5 templates and the math gets silly fast."
  );
}

// ══════════════════════════════════════════════════════════════════
// PART 6 — APPLY IT + Q&A (5 min)
// ══════════════════════════════════════════════════════════════════

// Slide — APPLY THE PATTERN
{
  const s = nextSlide();
  s.background = { color: WHITE };
  addSectionHeader(s, "PART 6  •  APPLY IT");
  addSlideTitle(s, "Your turn", "The pattern works for any recurring task with reference material");

  // 4-step workflow
  const applySteps = [
    { n: 1, title: "Gather the references you already have",          detail: "Templates, examples, standards docs, past work — anything that defines 'good.'" },
    { n: 2, title: "Ask Copilot to help build the prompt file",       detail: "\"Using these references, build a prompt that [interviews me / guides me / generates X].\"" },
    { n: 3, title: "Test it against a real task and iterate",         detail: "Note what's weak. Tell Copilot how to fix the prompt file. Repeat until solid." },
    { n: 4, title: "Commit it where the team can find it",             detail: ".github/prompts/  \u2022  .windsurf/workflows/  \u2022  .claude/skills/" }
  ];

  applySteps.forEach((step, i) => {
    const y = 2.3 + i * 0.95;

    s.addShape(pres.shapes.OVAL, {
      x: 0.7, y: y, w: 0.7, h: 0.7,
      fill: { color: TEAL_500 }, line: { color: TEAL_500 }
    });
    s.addText(String(step.n), {
      x: 0.7, y: y, w: 0.7, h: 0.7,
      fontSize: 22, fontFace: HEAD, bold: true, color: WHITE,
      align: "center", valign: "middle", margin: 0
    });

    s.addText(step.title, {
      x: 1.65, y: y - 0.05, w: 11, h: 0.4,
      fontSize: 17, fontFace: HEAD, bold: true, color: SLATE_900, margin: 0
    });
    s.addText(step.detail, {
      x: 1.65, y: y + 0.35, w: 11, h: 0.5,
      fontSize: 12, fontFace: BODY, italic: true, color: SLATE_700, margin: 0
    });
  });

  // Commitment callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 6.3, w: 12.1, h: 0.85, rectRadius: 0.1,
    fill: { color: AMBER_100 }, line: { color: AMBER_500, width: 1 }
  });
  s.addText("HOMEWORK", {
    x: 0.95, y: 6.4, w: 12, h: 0.3,
    fontSize: 10, fontFace: HEAD, bold: true, color: AMBER_700, charSpacing: 3, margin: 0
  });
  s.addText("Pick ONE recurring task in your work. Build the first draft of a prompt file for it by next week.", {
    x: 0.95, y: 6.65, w: 11.5, h: 0.45,
    fontSize: 14, fontFace: HEAD, bold: true, color: SLATE_900, margin: 0
  });

  addFooter(s, slideCounter);

  s.addNotes(
    "The commitment moment. Ask the room: 'What's the ONE recurring task you'll template first?' " +
    "Give people 30 seconds to think. Then do a quick lightning round — 4-5 people share."
  );
}

// Slide — TAKEAWAYS
{
  const s = nextSlide();
  s.background = { color: INDIGO_900 };

  s.addText("PART 6  •  APPLY IT", {
    x: 0.6, y: 0.6, w: 12, h: 0.5,
    fontSize: 12, fontFace: BODY, color: TEAL_500, bold: true, charSpacing: 4, margin: 0
  });
  s.addText("Takeaways", {
    x: 0.6, y: 1.2, w: 12, h: 0.7,
    fontSize: 32, fontFace: HEAD, bold: true, color: WHITE, margin: 0
  });

  const takeaways = [
    {
      title: "Prompt engineering is composition,",
      accent: "not magic words.",
      detail: "Twelve known techniques layered into one file. That's the whole trick.",
      color: TEAL_500
    },
    {
      title: "References + Copilot",
      accent: "= a reusable prompt file.",
      detail: "The leverage isn't in 'doing the task with AI.' It's in 'building a tool that does the task with AI.'",
      color: AMBER_500
    },
    {
      title: "Bidirectional interaction",
      accent: "is the upgrade most teams skip.",
      detail: "Tell AI to ask before it assumes. Artifact mining. Clarifying questions. Three versions instead of one.",
      color: CORAL_500
    }
  ];

  takeaways.forEach((t, i) => {
    const y = 2.3 + i * 1.55;

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 0.08, h: 1.3,
      fill: { color: t.color }, line: { color: t.color }
    });

    s.addText([
      { text: t.title + " ", options: { color: WHITE } },
      { text: t.accent, options: { color: t.color } }
    ], {
      x: 0.95, y: y + 0.1, w: 11.7, h: 0.6,
      fontSize: 22, fontFace: HEAD, bold: true, margin: 0
    });

    s.addText(t.detail, {
      x: 0.95, y: y + 0.75, w: 11.7, h: 0.5,
      fontSize: 13, fontFace: BODY, color: INDIGO_100, italic: true, margin: 0
    });
  });

  addFooter(s, slideCounter);

  s.addNotes(
    "Final takeaways. Pause between each one. If they remember nothing else, these three should stick."
  );
}

// Slide — Q&A
{
  const s = nextSlide();
  s.background = { color: WHITE };

  s.addText("Questions?", {
    x: 0.6, y: 2.4, w: 12.1, h: 1.5,
    fontSize: 80, fontFace: HEAD, bold: true, color: INDIGO_900,
    align: "center", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.0, y: 4.3, w: 1.3, h: 0.08,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });

  s.addText("Also — what's YOUR first prompt file?", {
    x: 0.6, y: 4.7, w: 12.1, h: 0.5,
    fontSize: 18, fontFace: HEAD, italic: true, color: TEAL_700,
    align: "center", margin: 0
  });

  // Resources
  s.addText("Resources", {
    x: 0.6, y: 5.8, w: 12.1, h: 0.4,
    fontSize: 11, fontFace: HEAD, bold: true, color: SLATE_500,
    align: "center", charSpacing: 4, margin: 0
  });
  s.addText([
    { text: "Source prompt file: ", options: { color: SLATE_700 } },
    { text: "PA Process/priority_builder_instructions_ai.md", options: { color: INDIGO_700, fontFace: MONO, bold: true } }
  ], {
    x: 0.6, y: 6.15, w: 12.1, h: 0.4,
    fontSize: 13, fontFace: BODY, align: "center", margin: 0
  });
  s.addText([
    { text: "Talk artifact: ", options: { color: SLATE_700 } },
    { text: "priority-builder-talk.md", options: { color: INDIGO_700, fontFace: MONO, bold: true } }
  ], {
    x: 0.6, y: 6.5, w: 12.1, h: 0.4,
    fontSize: 13, fontFace: BODY, align: "center", margin: 0
  });
  s.addText([
    { text: "Full guide: ", options: { color: SLATE_700 } },
    { text: "prompt-engineering-guide.pdf", options: { color: INDIGO_700, fontFace: MONO, bold: true } }
  ], {
    x: 0.6, y: 6.85, w: 12.1, h: 0.4,
    fontSize: 13, fontFace: BODY, align: "center", margin: 0
  });

  s.addNotes(
    "Open for questions. If energy is low, prompt: 'Who's willing to share what task they'd template first?' " +
    "That typically gets 3-4 hands and sparks more discussion."
  );
}

// ── Save ─────────────────────────────────────────────────────────
pres.writeFile({
  fileName: "/Users/gustavoam/Documents/GitHub/prompt-guide/prompt-techniques-talk-priority.pptx"
}).then(fileName => {
  console.log(`\u2713 Created: ${fileName}`);
  console.log(`  Total slides: ${slideCounter}`);
});
