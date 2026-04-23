// Build the "From Prompt to Template" presentation deck.
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3" x 7.5" — gives more room for code excerpts
pres.author = "Gustavo Andres";
pres.title = "From Prompt to Template";
pres.subject = "Prompt Engineering Techniques in Action";

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
const SLATE_900  = "212121";
const SLATE_700  = "424242";
const SLATE_500  = "757575";
const SLATE_300  = "BDBDBD";
const SLATE_200  = "E0E0E0";
const SLATE_100  = "F5F5F5";
const SLATE_050  = "FAFAFA";
const WHITE      = "FFFFFF";

// Slide dims
const SW = 13.3;
const SH = 7.5;

// Fonts
const HEAD = "Calibri";
const BODY = "Calibri";
const MONO = "Consolas";

// Helper: footer bar on content slides
function addFooter(slide, num, total) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: SH - 0.35, w: SW, h: 0.04,
    fill: { color: SLATE_200 }, line: { color: SLATE_200 }
  });
  slide.addText("From Prompt to Template", {
    x: 0.6, y: SH - 0.32, w: 6, h: 0.3,
    fontSize: 9, fontFace: BODY, color: SLATE_500, margin: 0
  });
  slide.addText(`${num} / ${total}`, {
    x: SW - 1.5, y: SH - 0.32, w: 1, h: 0.3,
    fontSize: 9, fontFace: BODY, color: SLATE_500, align: "right", margin: 0
  });
}

const TOTAL = 19;

// ── Slide 1: TITLE ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: INDIGO_900 };

  // Decorative accent bars
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.4, w: 1.2, h: 0.08,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.85, y: 2.4, w: 0.4, h: 0.08,
    fill: { color: AMBER_500 }, line: { color: AMBER_500 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 2.3, y: 2.4, w: 0.2, h: 0.08,
    fill: { color: CORAL_500 }, line: { color: CORAL_500 }
  });

  s.addText("From Prompt to Template", {
    x: 0.6, y: 2.7, w: 12, h: 1.4,
    fontSize: 60, fontFace: HEAD, bold: true, color: WHITE, margin: 0
  });
  s.addText("Showcasing Prompt Engineering Techniques in Action", {
    x: 0.6, y: 4.1, w: 12, h: 0.7,
    fontSize: 24, fontFace: HEAD, color: INDIGO_100, italic: true, margin: 0
  });

  s.addText("Gustavo Andres", {
    x: 0.6, y: 5.6, w: 12, h: 0.5,
    fontSize: 18, fontFace: HEAD, bold: true, color: TEAL_500, margin: 0
  });
  s.addText("Internal team talk  •  ~15 min", {
    x: 0.6, y: 6.05, w: 12, h: 0.4,
    fontSize: 12, fontFace: BODY, color: INDIGO_100, margin: 0
  });

  s.addNotes(
    "Welcome the team. Frame: today is about taking prompting from a one-off skill to a team asset. " +
    "Promise: you'll see one real template that uses 8 techniques, and by the end you'll know how to build your own."
  );
}

// ── Slide 2: WHY THIS TALK ───────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("Why this talk", {
    x: 0.6, y: 0.5, w: 12, h: 0.7,
    fontSize: 32, fontFace: HEAD, bold: true, color: INDIGO_900, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.25, w: 0.8, h: 0.06,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });

  // Left column: text
  s.addText("Most of us write prompts one-off.", {
    x: 0.6, y: 1.9, w: 6, h: 0.6,
    fontSize: 22, fontFace: HEAD, bold: true, color: SLATE_900, margin: 0
  });
  s.addText("We retype, we tweak, we forget what worked.", {
    x: 0.6, y: 2.5, w: 6, h: 0.5,
    fontSize: 15, fontFace: BODY, color: SLATE_700, italic: true, margin: 0
  });

  s.addText("Today:", {
    x: 0.6, y: 3.6, w: 6, h: 0.4,
    fontSize: 14, fontFace: HEAD, bold: true, color: TEAL_700, margin: 0
  });
  s.addText("How a few well-known techniques compose into one template — and why that changes everything.", {
    x: 0.6, y: 4.0, w: 6, h: 1.5,
    fontSize: 18, fontFace: HEAD, color: SLATE_900, margin: 0
  });

  // Right column: visual — scattered prompts → one template
  // Scattered chips
  const chips = [
    { x: 7.5,  y: 1.7, w: 1.7, h: 0.5, text: "fix bug", fill: SLATE_100, color: SLATE_700 },
    { x: 9.4,  y: 2.1, w: 1.7, h: 0.5, text: "write tests", fill: SLATE_100, color: SLATE_700 },
    { x: 11.3, y: 1.6, w: 1.5, h: 0.5, text: "doc this", fill: SLATE_100, color: SLATE_700 },
    { x: 7.7,  y: 2.7, w: 1.6, h: 0.5, text: "refactor", fill: SLATE_100, color: SLATE_700 },
    { x: 9.7,  y: 3.0, w: 1.7, h: 0.5, text: "review PR", fill: SLATE_100, color: SLATE_700 },
    { x: 11.8, y: 2.7, w: 1.0, h: 0.5, text: "?", fill: SLATE_100, color: SLATE_700 }
  ];
  chips.forEach(c => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: c.x, y: c.y, w: c.w, h: c.h, rectRadius: 0.08,
      fill: { color: c.fill }, line: { color: SLATE_300, width: 0.5 }
    });
    s.addText(c.text, {
      x: c.x, y: c.y, w: c.w, h: c.h,
      fontSize: 11, fontFace: BODY, color: c.color, align: "center", valign: "middle", margin: 0
    });
  });

  // Arrow down
  s.addText("↓", {
    x: 9.4, y: 3.7, w: 1.5, h: 0.5,
    fontSize: 28, fontFace: HEAD, color: TEAL_700, align: "center", margin: 0
  });

  // One unified template card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.0, y: 4.5, w: 4.7, h: 1.7,
    fill: { color: INDIGO_050 }, line: { color: INDIGO_500, width: 1.5 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.0, y: 4.5, w: 0.08, h: 1.7,
    fill: { color: INDIGO_500 }, line: { color: INDIGO_500 }
  });
  s.addText("One Template", {
    x: 8.25, y: 4.7, w: 4.4, h: 0.5,
    fontSize: 18, fontFace: HEAD, bold: true, color: INDIGO_900, margin: 0
  });
  s.addText("Reusable. Consistent. Team-shareable.", {
    x: 8.25, y: 5.25, w: 4.4, h: 0.7,
    fontSize: 12, fontFace: BODY, italic: true, color: SLATE_700, margin: 0
  });

  addFooter(s, 2, TOTAL);

  s.addNotes(
    "Set the problem. Most teams have everyone reinventing prompts. The promise of templates: build it once, get consistent results every time. " +
    "Do not list the chips on the right — let the visual carry it."
  );
}

// ── Slide 3: THE BIG IDEA ────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: INDIGO_900 };

  s.addText("The big idea", {
    x: 0.6, y: 0.6, w: 12, h: 0.6,
    fontSize: 16, fontFace: BODY, color: TEAL_500, bold: true, charSpacing: 4, margin: 0
  });

  s.addText("A prompt template is just composition of techniques.", {
    x: 0.6, y: 2.0, w: 12, h: 1.6,
    fontSize: 44, fontFace: HEAD, bold: true, color: WHITE, margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.0, w: 1.5, h: 0.06,
    fill: { color: AMBER_500 }, line: { color: AMBER_500 }
  });

  s.addText("Any one technique helps.", {
    x: 0.6, y: 4.5, w: 12, h: 0.7,
    fontSize: 22, fontFace: HEAD, color: INDIGO_100, margin: 0
  });
  s.addText("Eight together change the category of output you get.", {
    x: 0.6, y: 5.2, w: 12, h: 0.7,
    fontSize: 22, fontFace: HEAD, color: WHITE, italic: true, margin: 0
  });

  addFooter(s, 3, TOTAL);

  s.addNotes(
    "Pause on this slide. The takeaway is composition over magic. People often hunt for 'the one trick' — the win is layering."
  );
}

// ── Slide 4: MEET THE TEMPLATE ───────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("Meet the template", {
    x: 0.6, y: 0.5, w: 12, h: 0.7,
    fontSize: 32, fontFace: HEAD, bold: true, color: INDIGO_900, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.25, w: 0.8, h: 0.06,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });

  // Today's example
  s.addText("Today's example:", {
    x: 0.6, y: 1.7, w: 6, h: 0.4,
    fontSize: 14, fontFace: HEAD, bold: true, color: TEAL_700, margin: 0
  });
  s.addText("Generate Comprehensive Unit Tests", {
    x: 0.6, y: 2.1, w: 8, h: 0.7,
    fontSize: 28, fontFace: HEAD, bold: true, color: SLATE_900, margin: 0
  });

  // Input → Output cards
  // Input card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 3.4, w: 4.5, h: 1.6,
    fill: { color: INDIGO_050 }, line: { color: INDIGO_500, width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 3.4, w: 0.06, h: 1.6,
    fill: { color: INDIGO_500 }, line: { color: INDIGO_500 }
  });
  s.addText("INPUT", {
    x: 0.85, y: 3.55, w: 4.2, h: 0.3,
    fontSize: 10, fontFace: HEAD, bold: true, color: INDIGO_700, charSpacing: 3, margin: 0
  });
  s.addText("A Java service class", {
    x: 0.85, y: 3.9, w: 4.2, h: 0.6,
    fontSize: 18, fontFace: HEAD, bold: true, color: SLATE_900, margin: 0
  });
  s.addText("Referenced via #file in Copilot Chat", {
    x: 0.85, y: 4.45, w: 4.2, h: 0.5,
    fontSize: 11, fontFace: BODY, italic: true, color: SLATE_700, margin: 0
  });

  // Arrow
  s.addText("→", {
    x: 5.3, y: 3.9, w: 0.7, h: 0.6,
    fontSize: 32, fontFace: HEAD, bold: true, color: TEAL_700, align: "center", margin: 0
  });

  // Output card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.2, y: 3.4, w: 6.5, h: 1.6,
    fill: { color: INDIGO_050 }, line: { color: TEAL_500, width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.2, y: 3.4, w: 0.06, h: 1.6,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });
  s.addText("OUTPUT", {
    x: 6.45, y: 3.55, w: 6.2, h: 0.3,
    fontSize: 10, fontFace: HEAD, bold: true, color: TEAL_700, charSpacing: 3, margin: 0
  });
  s.addText("Complete JUnit 5 + Mockito test file", {
    x: 6.45, y: 3.9, w: 6.2, h: 0.6,
    fontSize: 18, fontFace: HEAD, bold: true, color: SLATE_900, margin: 0
  });
  s.addText("Standards-compliant, ready to commit", {
    x: 6.45, y: 4.45, w: 6.2, h: 0.5,
    fontSize: 11, fontFace: BODY, italic: true, color: SLATE_700, margin: 0
  });

  // Time savings callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 5.6, w: 12.1, h: 0.9, rectRadius: 0.1,
    fill: { color: AMBER_100 }, line: { color: AMBER_500, width: 1 }
  });
  s.addText([
    { text: "TIME SAVED  ", options: { bold: true, color: AMBER_700, fontSize: 11, charSpacing: 3 } },
    { text: "  ~60 min by hand", options: { color: SLATE_700, fontSize: 16 } },
    { text: "  →  ", options: { color: AMBER_700, fontSize: 16, bold: true } },
    { text: "~8 min with the template", options: { color: SLATE_900, fontSize: 16, bold: true } }
  ], {
    x: 0.85, y: 5.6, w: 11.6, h: 0.9, valign: "middle", margin: 0, fontFace: BODY
  });

  addFooter(s, 4, TOTAL);

  s.addNotes(
    "Show the concrete deliverable. Do NOT walk through the template content here — that comes next when we screen-share the .md file. " +
    "Land the time-savings number. People remember 60→8."
  );
}

// ── Slide 5: SCREEN SHARE BREAK ──────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: SLATE_050 };

  // Big arrow + instruction
  s.addText("→", {
    x: 0.6, y: 2.4, w: 1.4, h: 1.6,
    fontSize: 110, fontFace: HEAD, bold: true, color: TEAL_500, align: "center", margin: 0
  });

  s.addText("Switch to", {
    x: 2.0, y: 2.5, w: 11, h: 0.5,
    fontSize: 18, fontFace: BODY, color: SLATE_500, italic: true, margin: 0
  });
  s.addText("example-template-talk.md", {
    x: 2.0, y: 3.0, w: 11, h: 0.9,
    fontSize: 36, fontFace: MONO, bold: true, color: INDIGO_900, margin: 0
  });
  s.addText("Walk through the template top to bottom — about 4 minutes.", {
    x: 2.0, y: 4.0, w: 11, h: 0.5,
    fontSize: 16, fontFace: BODY, color: SLATE_700, margin: 0
  });

  // Bottom hint
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 5.6, w: 12.1, h: 0.04,
    fill: { color: SLATE_200 }, line: { color: SLATE_200 }
  });
  s.addText("Come back to this deck after the walkthrough.", {
    x: 0.6, y: 5.8, w: 12.1, h: 0.5,
    fontSize: 13, fontFace: BODY, italic: true, color: SLATE_500, align: "center", margin: 0
  });

  addFooter(s, 5, TOTAL);

  s.addNotes(
    "Pause the deck. Switch screens to the .md file. Walk the template top to bottom — point out each labeled section. " +
    "Don't go deep on each technique yet — save that for the next 8 slides. Aim for 3-4 minutes here."
  );
}

// ── Slides 6-13: ONE TECHNIQUE PER SLIDE ─────────────────────────
const techniques = [
  {
    num: 1,
    name: "Role Assignment",
    desc: "Set the AI's persona and scope",
    excerpt: "You are a senior Java engineer specializing in TDD.\nYour job is to generate clear, maintainable unit\ntests — not to refactor or critique the source code.",
    why: "Without a role, the AI defaults to 'helpful generalist.' With one, output gets sharper.",
    section: "# ROLE",
    accent: INDIGO_500,
    accentLight: INDIGO_100,
    accentDark: INDIGO_900
  },
  {
    num: 2,
    name: "Goal-First Writing",
    desc: "Lead with what you want back",
    excerpt: "Generate a complete JUnit 5 + Mockito test file\nfor the class referenced below, achieving at least\n80% line coverage with meaningful assertions.",
    why: "The AI knows the deliverable in 25 words. Everything else is context for that goal.",
    section: "# GOAL",
    accent: INDIGO_500,
    accentLight: INDIGO_100,
    accentDark: INDIGO_900
  },
  {
    num: 3,
    name: "Structured Context",
    desc: "Bullets, not narrative",
    excerpt: "- Project: order-service (Spring Boot 3.2)\n- Stack: Java 17, JUnit 5, Mockito 5\n- Conventions: @ExtendWith(MockitoExtension),\n  Given/When/Then, name_condition_expectedResult\n- Coverage target: 80% minimum",
    why: "Bullets are easier for the AI to parse than prose. Signal, not story.",
    section: "# CONTEXT",
    accent: TEAL_500,
    accentLight: TEAL_100,
    accentDark: TEAL_700
  },
  {
    num: 4,
    name: "Constraints",
    desc: "What to do AND what NOT to do",
    excerpt: "- Do NOT modify the source class. Tests only.\n- Do NOT use @SpringBootTest.\n- Do NOT use Lombok in tests.\n- Every test must contain at least one assertion.",
    why: "AI tools 'improve' things you didn't ask them to. Negative constraints prevent surprises.",
    section: "# CONSTRAINTS",
    accent: TEAL_500,
    accentLight: TEAL_100,
    accentDark: TEAL_700
  },
  {
    num: 5,
    name: "Few-Shot Examples",
    desc: "Show, don't tell",
    excerpt: "cancelOrder_whenOrderIsAlreadyCancelled_throwsIllegalStateException\ncancelOrder_whenPaymentRefundFails_rollsBackOrderStatus\ncalculateRefund_whenAllItemsAreNonRefundable_returnsZero",
    why: "5 concrete examples beat any amount of style description. Highest-leverage technique for format consistency.",
    section: "# EXAMPLES",
    accent: AMBER_500,
    accentLight: AMBER_100,
    accentDark: AMBER_700
  },
  {
    num: 6,
    name: "Chain-of-Thought",
    desc: "Make the AI reason out loud",
    excerpt: "Before writing any code:\n1. List every public method.\n2. For each method, identify branches.\n3. Group by happy path, edge case, error case.\n4. Only then start writing.",
    why: "Forces systematic enumeration. Catches edge cases a junior dev would miss.",
    section: "# THINK STEP BY STEP",
    accent: AMBER_500,
    accentLight: AMBER_100,
    accentDark: AMBER_700
  },
  {
    num: 7,
    name: "Output Format",
    desc: "Define the exact shape of the response",
    excerpt: "Produce in this order:\n1. A coverage plan (bullets)\n2. The complete test file (one code block)\n3. A short justification (3-5 sentences)",
    why: "Predictable output makes the template part of a workflow. Inconsistent output breaks automation.",
    section: "# OUTPUT FORMAT",
    accent: INDIGO_500,
    accentLight: INDIGO_100,
    accentDark: INDIGO_900
  },
  {
    num: 8,
    name: "Clarifying Questions",
    desc: "Make AI ask, not assume",
    excerpt: "If anything is unclear, ask 1-3 questions BEFORE\nproducing output. If a real trade-off exists,\npresent 2 options with brief pros/cons and let\nme pick before writing.",
    why: "Most prompt failures are silent guesses. This block flips one-shot generation into dialogue.",
    section: "# CLARIFYING QUESTIONS",
    accent: CORAL_500,
    accentLight: CORAL_100,
    accentDark: CORAL_700,
    keyDifferentiator: true
  }
];

techniques.forEach((t, idx) => {
  const slideNum = 6 + idx;
  const s = pres.addSlide();
  s.background = { color: WHITE };

  // Number badge (large circle, top-left)
  s.addShape(pres.shapes.OVAL, {
    x: 0.6, y: 0.55, w: 0.95, h: 0.95,
    fill: { color: t.accent }, line: { color: t.accent }
  });
  s.addText(String(t.num), {
    x: 0.6, y: 0.55, w: 0.95, h: 0.95,
    fontSize: 38, fontFace: HEAD, bold: true, color: WHITE,
    align: "center", valign: "middle", margin: 0
  });

  // Section label (small, above title)
  s.addText("TECHNIQUE", {
    x: 1.85, y: 0.6, w: 5, h: 0.3,
    fontSize: 10, fontFace: HEAD, bold: true, color: SLATE_500, charSpacing: 4, margin: 0
  });

  // Technique name (large heading)
  s.addText(t.name, {
    x: 1.85, y: 0.9, w: 11, h: 0.7,
    fontSize: 32, fontFace: HEAD, bold: true, color: t.accentDark, margin: 0
  });

  // Description (subhead)
  s.addText(t.desc, {
    x: 1.85, y: 1.55, w: 11, h: 0.4,
    fontSize: 16, fontFace: HEAD, italic: true, color: SLATE_700, margin: 0
  });

  // "From the template" label
  s.addText("FROM THE TEMPLATE", {
    x: 0.6, y: 2.4, w: 5, h: 0.3,
    fontSize: 10, fontFace: HEAD, bold: true, color: SLATE_500, charSpacing: 3, margin: 0
  });
  s.addText(t.section, {
    x: 0.6, y: 2.65, w: 5, h: 0.4,
    fontSize: 14, fontFace: MONO, bold: true, color: t.accent, margin: 0
  });

  // Code excerpt box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 3.15, w: 12.1, h: 2.1,
    fill: { color: SLATE_050 }, line: { color: SLATE_200, width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 3.15, w: 0.08, h: 2.1,
    fill: { color: t.accent }, line: { color: t.accent }
  });
  s.addText(t.excerpt, {
    x: 0.95, y: 3.3, w: 11.6, h: 1.85,
    fontSize: 14, fontFace: MONO, color: SLATE_900, valign: "top", margin: 0
  });

  // "Why it matters" callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 5.55, w: 12.1, h: 1.25, rectRadius: 0.08,
    fill: { color: t.accentLight }, line: { color: t.accent, width: 1 }
  });
  s.addText("WHY IT MATTERS", {
    x: 0.9, y: 5.7, w: 11.6, h: 0.3,
    fontSize: 9, fontFace: HEAD, bold: true, color: t.accentDark, charSpacing: 3, margin: 0
  });
  s.addText(t.why, {
    x: 0.9, y: 5.95, w: 11.6, h: 0.85,
    fontSize: 15, fontFace: BODY, color: SLATE_900, italic: true, margin: 0, valign: "top"
  });

  // Special "key differentiator" badge for slide 13 (Clarifying Questions)
  if (t.keyDifferentiator) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 9.2, y: 0.62, w: 3.5, h: 0.45, rectRadius: 0.05,
      fill: { color: CORAL_700 }, line: { color: CORAL_700 }
    });
    s.addText("★ KEY DIFFERENTIATOR", {
      x: 9.2, y: 0.62, w: 3.5, h: 0.45,
      fontSize: 10, fontFace: HEAD, bold: true, color: WHITE,
      align: "center", valign: "middle", charSpacing: 2, margin: 0
    });
  }

  addFooter(s, slideNum, TOTAL);

  // Speaker notes per technique
  const notes = {
    1: "Don't read the excerpt. Say: every prompt benefits from telling the AI WHO it is. Senior engineers write tests differently than a 'helpful assistant.'",
    2: "Goal-first is the single most underused technique. Most people bury the request in paragraph 3. The first sentence should say what done looks like.",
    3: "Structured context = bullets. The AI parses bullets faster than prose. Note the SCOPE: project + stack + conventions + standards. That's all the AI needs.",
    4: "Negative constraints are as important as positive ones. 'Do NOT use @SpringBootTest' prevents the most common failure mode here.",
    5: "Few-shot prompting. Show 5 examples of the naming format you want. Telling AI 'use descriptive names' produces wildly inconsistent results. Showing 5 examples produces 50 matching ones.",
    6: "Chain-of-thought = 'think step by step'. Forces the AI to enumerate before generating. Catches the edge cases junior devs forget.",
    7: "Output format makes the template usable in a workflow. If the format is unpredictable, you can't pipe the result anywhere.",
    8: "This is the one most teams skip — and it's the highest-impact addition. Without this block, AI silently guesses when input is ambiguous. With it, the conversation becomes bidirectional. Demonstrate by reading the example questions in your example-template-talk.md."
  };
  s.addNotes(notes[t.num] || "");
});

// ── Slide 14: WHY COMPOSITION ────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("Why composition is the point", {
    x: 0.6, y: 0.5, w: 12, h: 0.7,
    fontSize: 30, fontFace: HEAD, bold: true, color: INDIGO_900, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.25, w: 0.8, h: 0.06,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });

  s.addText("Without each technique, the output would…", {
    x: 0.6, y: 1.6, w: 12, h: 0.5,
    fontSize: 16, fontFace: HEAD, italic: true, color: SLATE_700, margin: 0
  });

  // 4 columns showing failure modes
  const failures = [
    { without: "no role", result: "read like a tutorial,\nnot production code", color: INDIGO_500 },
    { without: "no constraints", result: "use forbidden libraries\nor refactor unprompted", color: TEAL_500 },
    { without: "no examples", result: "use inconsistent test\nnaming styles", color: AMBER_500 },
    { without: "no clarifying\nquestions", result: "silently guess at\nambiguous inputs", color: CORAL_500 }
  ];

  failures.forEach((f, i) => {
    const x = 0.6 + i * 3.1;
    const w = 2.85;

    // Top "without" bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.4, w: w, h: 0.7,
      fill: { color: f.color }, line: { color: f.color }
    });
    s.addText("WITHOUT", {
      x: x, y: 2.45, w: w, h: 0.25,
      fontSize: 8, fontFace: HEAD, bold: true, color: WHITE,
      align: "center", valign: "middle", charSpacing: 3, margin: 0
    });
    s.addText(f.without, {
      x: x, y: 2.65, w: w, h: 0.45,
      fontSize: 13, fontFace: HEAD, bold: true, color: WHITE,
      align: "center", valign: "middle", margin: 0
    });

    // Bottom "result" card
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 3.1, w: w, h: 1.6,
      fill: { color: SLATE_050 }, line: { color: SLATE_200, width: 1 }
    });
    s.addText("→  the output would", {
      x: x + 0.15, y: 3.25, w: w - 0.3, h: 0.4,
      fontSize: 10, fontFace: BODY, italic: true, color: SLATE_500, align: "center", margin: 0
    });
    s.addText(f.result, {
      x: x + 0.15, y: 3.65, w: w - 0.3, h: 0.95,
      fontSize: 13, fontFace: BODY, color: SLATE_900,
      align: "center", valign: "middle", margin: 0
    });
  });

  // Bottom callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 5.4, w: 12.1, h: 1.4, rectRadius: 0.1,
    fill: { color: INDIGO_900 }, line: { color: INDIGO_900 }
  });
  s.addText("8 techniques in one template", {
    x: 0.6, y: 5.55, w: 12.1, h: 0.5,
    fontSize: 18, fontFace: HEAD, color: INDIGO_100, align: "center", margin: 0
  });
  s.addText("=  a category change in output quality", {
    x: 0.6, y: 6.05, w: 12.1, h: 0.7,
    fontSize: 24, fontFace: HEAD, bold: true, color: WHITE, align: "center", margin: 0
  });

  addFooter(s, 14, TOTAL);

  s.addNotes(
    "Land the multiplier idea. One technique = small win. Eight = transformation. " +
    "Let people scan the failure modes silently — don't read them all out."
  );
}

// ── Slide 15: LIVE DEMO PROMPT / TIMELINE ───────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("What it looks like in practice", {
    x: 0.6, y: 0.5, w: 12, h: 0.7,
    fontSize: 30, fontFace: HEAD, bold: true, color: INDIGO_900, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.25, w: 0.8, h: 0.06,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });

  s.addText("A typical Monday: a Jira ticket asking for unit tests on OrderService", {
    x: 0.6, y: 1.55, w: 12, h: 0.45,
    fontSize: 14, fontFace: BODY, italic: true, color: SLATE_700, margin: 0
  });

  // Timeline: 5 steps in horizontal row
  const steps = [
    { n: 1, label: "Paste template +\n#file reference", time: "1 min", color: INDIGO_500 },
    { n: 2, label: "AI asks 2 clarifying\nquestions",       time: "1 min", color: CORAL_500 },
    { n: 3, label: "AI presents the\ncoverage plan",        time: "30 sec", color: TEAL_500 },
    { n: 4, label: "AI generates the\ntest file",           time: "2 min", color: AMBER_500 },
    { n: 5, label: "Review, tweak,\ncommit",                time: "3 min", color: INDIGO_500 }
  ];

  // Connecting line
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.25, y: 3.05, w: 10.85, h: 0.04,
    fill: { color: SLATE_200 }, line: { color: SLATE_200 }
  });

  steps.forEach((step, i) => {
    const cx = 1.4 + i * 2.42;
    // Circle node on timeline
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.32, y: 2.75, w: 0.65, h: 0.65,
      fill: { color: step.color }, line: { color: step.color }
    });
    s.addText(String(step.n), {
      x: cx - 0.32, y: 2.75, w: 0.65, h: 0.65,
      fontSize: 18, fontFace: HEAD, bold: true, color: WHITE,
      align: "center", valign: "middle", margin: 0
    });

    // Label below
    s.addText(step.label, {
      x: cx - 1.1, y: 3.55, w: 2.2, h: 0.85,
      fontSize: 12, fontFace: HEAD, bold: true, color: SLATE_900,
      align: "center", valign: "top", margin: 0
    });
    // Time
    s.addText(step.time, {
      x: cx - 1.1, y: 4.4, w: 2.2, h: 0.4,
      fontSize: 12, fontFace: BODY, color: step.color, italic: true, bold: true,
      align: "center", margin: 0
    });
  });

  // Total bar
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 5.5, w: 12.1, h: 1.3, rectRadius: 0.1,
    fill: { color: AMBER_100 }, line: { color: AMBER_500, width: 1 }
  });
  s.addText("TOTAL", {
    x: 0.95, y: 5.65, w: 12, h: 0.35,
    fontSize: 10, fontFace: HEAD, bold: true, color: AMBER_700, charSpacing: 3, margin: 0
  });
  s.addText([
    { text: "~8 min", options: { bold: true, fontSize: 28, color: AMBER_700 } },
    { text: "  for a comprehensive test file", options: { fontSize: 18, color: SLATE_900 } }
  ], {
    x: 0.95, y: 5.95, w: 11.5, h: 0.55, fontFace: HEAD, valign: "middle", margin: 0
  });
  s.addText("By hand: ~60 min.   With template: ~8 min.", {
    x: 0.95, y: 6.45, w: 11.5, h: 0.3,
    fontSize: 11, fontFace: BODY, italic: true, color: SLATE_700, margin: 0
  });

  addFooter(s, 15, TOTAL);

  s.addNotes(
    "Walk the timeline left to right. Land the bidirectional moment at step 2 — that's the conversation, not just generation. " +
    "Time numbers should be your closing emphasis."
  );
}

// ── Slide 16: HOW WE ADOPT ───────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("How we make this stick", {
    x: 0.6, y: 0.5, w: 12, h: 0.7,
    fontSize: 30, fontFace: HEAD, bold: true, color: INDIGO_900, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.25, w: 0.8, h: 0.06,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });

  const adoptionSteps = [
    {
      n: 1,
      title: "Save it where Copilot finds it",
      detail: ".github/prompts/generate-tests.prompt.md",
      mono: true
    },
    {
      n: 2,
      title: "Use it on a real class",
      detail: "Paste into Copilot Chat with #file:OrderService.java",
      mono: false
    },
    {
      n: 3,
      title: "Iterate based on what AI asks",
      detail: "The clarifying questions surface weak spots — strengthen the template.",
      mono: false
    },
    {
      n: 4,
      title: "Adopt as a team standard",
      detail: "After 3 successful uses, commit + share. Now everyone benefits.",
      mono: false
    }
  ];

  adoptionSteps.forEach((step, i) => {
    const y = 1.85 + i * 0.95;

    // Number circle
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: y, w: 0.7, h: 0.7,
      fill: { color: TEAL_500 }, line: { color: TEAL_500 }
    });
    s.addText(String(step.n), {
      x: 0.6, y: y, w: 0.7, h: 0.7,
      fontSize: 22, fontFace: HEAD, bold: true, color: WHITE,
      align: "center", valign: "middle", margin: 0
    });

    // Step title
    s.addText(step.title, {
      x: 1.55, y: y - 0.05, w: 10, h: 0.4,
      fontSize: 17, fontFace: HEAD, bold: true, color: SLATE_900, margin: 0
    });
    // Detail
    s.addText(step.detail, {
      x: 1.55, y: y + 0.32, w: 11, h: 0.4,
      fontSize: 13, fontFace: step.mono ? MONO : BODY,
      color: step.mono ? INDIGO_700 : SLATE_700,
      italic: !step.mono, margin: 0
    });
  });

  // Side callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 5.85, w: 12.1, h: 0.85, rectRadius: 0.08,
    fill: { color: INDIGO_050 }, line: { color: INDIGO_500, width: 1 }
  });
  s.addText("Repeat for our top 5 repetitive tasks. That's the win.", {
    x: 0.6, y: 5.85, w: 12.1, h: 0.85,
    fontSize: 16, fontFace: HEAD, bold: true, color: INDIGO_900,
    align: "center", valign: "middle", italic: true, margin: 0
  });

  addFooter(s, 16, TOTAL);

  s.addNotes(
    "Concrete adoption path. The 'top 5 tasks' pitch is the close — make it actionable. " +
    "Suggest each team member picks one repetitive task to template by next sprint."
  );
}

// ── Slide 17: BIGGER PICTURE / 3 LAYERS ─────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("This is just one template", {
    x: 0.6, y: 0.5, w: 12, h: 0.7,
    fontSize: 30, fontFace: HEAD, bold: true, color: INDIGO_900, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.25, w: 0.8, h: 0.06,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });
  s.addText("There's a bigger pattern behind it", {
    x: 0.6, y: 1.5, w: 12, h: 0.45,
    fontSize: 16, fontFace: BODY, italic: true, color: SLATE_700, margin: 0
  });

  // 3 stacked layered cards
  const layers = [
    {
      n: 1,
      label: "META-PROMPT",
      title: "Build it once. With AI's help.",
      detail: "A markdown file you keep in your repo. Turns any AI chat into a 'prompt engineer for you.'",
      fill: INDIGO_100, border: INDIGO_500, text: INDIGO_900
    },
    {
      n: 2,
      label: "TEMPLATES",
      title: "Generated on demand.",
      detail: "Use the meta-prompt to produce templates like today's — tailored to specific tasks.",
      fill: TEAL_100, border: TEAL_500, text: TEAL_700
    },
    {
      n: 3,
      label: "DELIVERABLES",
      title: "Produced consistently. At quality.",
      detail: "Tests. Code. Docs. Reviews. Whatever you need — every time, the same shape.",
      fill: AMBER_100, border: AMBER_500, text: AMBER_700
    }
  ];

  layers.forEach((layer, i) => {
    const y = 2.2 + i * 1.35;

    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 12.1, h: 1.2,
      fill: { color: layer.fill }, line: { color: layer.border, width: 1 }
    });

    // Number badge
    s.addShape(pres.shapes.OVAL, {
      x: 0.85, y: y + 0.3, w: 0.6, h: 0.6,
      fill: { color: layer.border }, line: { color: layer.border }
    });
    s.addText(String(layer.n), {
      x: 0.85, y: y + 0.3, w: 0.6, h: 0.6,
      fontSize: 20, fontFace: HEAD, bold: true, color: WHITE,
      align: "center", valign: "middle", margin: 0
    });

    // Label
    s.addText(layer.label, {
      x: 1.7, y: y + 0.2, w: 5, h: 0.3,
      fontSize: 10, fontFace: HEAD, bold: true, color: layer.text, charSpacing: 4, margin: 0
    });
    // Title
    s.addText(layer.title, {
      x: 1.7, y: y + 0.45, w: 11, h: 0.4,
      fontSize: 17, fontFace: HEAD, bold: true, color: SLATE_900, margin: 0
    });
    // Detail
    s.addText(layer.detail, {
      x: 1.7, y: y + 0.85, w: 11, h: 0.3,
      fontSize: 12, fontFace: BODY, italic: true, color: SLATE_700, margin: 0
    });

    // Down arrow between layers
    if (i < layers.length - 1) {
      s.addText("↓", {
        x: 1.0, y: y + 1.18, w: 0.4, h: 0.25,
        fontSize: 18, fontFace: HEAD, color: SLATE_500, align: "center", margin: 0
      });
    }
  });

  // Bottom caption
  s.addText("Build the meta-prompt once. It generates templates on demand. Templates produce consistent work.", {
    x: 0.6, y: 6.55, w: 12.1, h: 0.4,
    fontSize: 13, fontFace: BODY, italic: true, color: SLATE_700, align: "center", margin: 0
  });

  addFooter(s, 17, TOTAL);

  s.addNotes(
    "Zoom out. Today's template is one example of layer 2. Behind it sits layer 1 (the meta-prompt) " +
    "that you can build for ANY recurring task type. Briefly point at the prompt engineering guide PDF as the resource for going deeper."
  );
}

// ── Slide 18: TAKEAWAYS ──────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: INDIGO_900 };

  s.addText("Takeaways", {
    x: 0.6, y: 0.6, w: 12, h: 0.5,
    fontSize: 16, fontFace: BODY, color: TEAL_500, bold: true, charSpacing: 4, margin: 0
  });

  const takeaways = [
    {
      title: "Prompt engineering is composition,",
      titleAccent: "not magic words.",
      detail: "Eight known techniques layered into one template — that's the whole trick.",
      color: TEAL_500
    },
    {
      title: "A good template is a one-time investment",
      titleAccent: "that pays off every time anyone uses it.",
      detail: "Build once. Used by the whole team. Multiplies across every repetition.",
      color: AMBER_500
    },
    {
      title: "Bidirectional interaction",
      titleAccent: "is the upgrade most teams skip.",
      detail: "Tell AI to ask before it assumes. The conversation becomes a collaboration.",
      color: CORAL_500
    }
  ];

  takeaways.forEach((t, i) => {
    const y = 1.7 + i * 1.7;

    // Accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 0.08, h: 1.4,
      fill: { color: t.color }, line: { color: t.color }
    });

    // Title (white)
    s.addText([
      { text: t.title + " ", options: { color: WHITE } },
      { text: t.titleAccent, options: { color: t.color } }
    ], {
      x: 0.95, y: y + 0.1, w: 11.7, h: 0.6,
      fontSize: 22, fontFace: HEAD, bold: true, margin: 0
    });

    // Detail
    s.addText(t.detail, {
      x: 0.95, y: y + 0.7, w: 11.7, h: 0.6,
      fontSize: 14, fontFace: BODY, color: INDIGO_100, italic: true, margin: 0
    });
  });

  addFooter(s, 18, TOTAL);

  s.addNotes(
    "Land the three. If they remember nothing else, these three sentences should stick. " +
    "Pause briefly between each one."
  );
}

// ── Slide 19: Q&A ────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: WHITE };

  s.addText("Questions?", {
    x: 0.6, y: 2.6, w: 12.1, h: 1.5,
    fontSize: 80, fontFace: HEAD, bold: true, color: INDIGO_900,
    align: "center", margin: 0
  });

  // Accent line
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.0, y: 4.4, w: 1.3, h: 0.08,
    fill: { color: TEAL_500 }, line: { color: TEAL_500 }
  });

  s.addText("Resources", {
    x: 0.6, y: 5.1, w: 12.1, h: 0.4,
    fontSize: 12, fontFace: HEAD, bold: true, color: TEAL_700,
    align: "center", charSpacing: 4, margin: 0
  });

  s.addText([
    { text: "Source template:  ", options: { color: SLATE_700 } },
    { text: "example-template-talk.md", options: { color: INDIGO_700, fontFace: MONO, bold: true } }
  ], {
    x: 0.6, y: 5.5, w: 12.1, h: 0.4,
    fontSize: 14, fontFace: BODY, align: "center", margin: 0
  });

  s.addText([
    { text: "Full guide:  ", options: { color: SLATE_700 } },
    { text: "prompt-engineering-guide.pdf", options: { color: INDIGO_700, fontFace: MONO, bold: true } }
  ], {
    x: 0.6, y: 5.95, w: 12.1, h: 0.4,
    fontSize: 14, fontFace: BODY, align: "center", margin: 0
  });

  s.addNotes(
    "Open for questions. Have the .md file and the PDF ready to share if anyone wants a deeper dive."
  );
}

// ── Save ─────────────────────────────────────────────────────────
pres.writeFile({
  fileName: "/Users/gustavoam/Documents/GitHub/prompt-guide/prompt-techniques-talk.pptx"
}).then(fileName => {
  console.log(`✓ Created: ${fileName}`);
});
