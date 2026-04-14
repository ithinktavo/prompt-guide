#!/usr/bin/env python3
"""
Generate a professional, shareable PDF of the Prompt Engineering Guide.

Features:
- Auto-generated Table of Contents with real page numbers (clickable)
- Custom-drawn diagrams (layered flow, file trees) replacing ASCII art
- Polished typography, section dividers, and page headers/footers
- PDF bookmarks/outline for in-viewer navigation
"""

import os
import re
import hashlib
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    Paragraph, Spacer, PageBreak, Table, TableStyle, Flowable,
    Frame, PageTemplate, BaseDocTemplate, NextPageTemplate,
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfgen import canvas as canvas_module
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


# Try to register a Unicode-capable monospace font. Falls back to Courier if unavailable.
MONO_FONT = "Courier"
try:
    # macOS ships Menlo in a TrueType Collection
    pdfmetrics.registerFont(TTFont("Menlo", "/System/Library/Fonts/Menlo.ttc", subfontIndex=0))
    MONO_FONT = "Menlo"
except Exception:
    try:
        # Try common DejaVu install locations
        for path in ("/Library/Fonts/DejaVuSansMono.ttf",
                     "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
                     "/usr/share/fonts/dejavu/DejaVuSansMono.ttf"):
            if os.path.exists(path):
                pdfmetrics.registerFont(TTFont("DejaVuSansMono", path))
                MONO_FONT = "DejaVuSansMono"
                break
    except Exception:
        pass

# ── Configuration ──────────────────────────────────────────────────

PROJECT_DIR = "/Users/gustavoam/Documents/GitHub/prompt-guide"
OUTPUT_FILE = os.path.join(PROJECT_DIR, "prompt-engineering-guide.pdf")

AUTHOR_NAME = "Gustavo Andres"

FILES_IN_ORDER = [
    ("README.md",                 "Introduction"),
    ("prompt-guide-topics.md",    "Topic Outline"),
    ("workbook.md",               "Hands-On Workbook"),
    ("build-your-meta-prompt.md", "Build Your Own Meta-Prompt"),
    ("prompt-guide.md",           "Quick Reference"),
    ("meta-prompt.md",            "Meta-Prompt File"),
]

# ── Color Palette (modern, team-friendly) ─────────────────────────

INDIGO_900 = HexColor("#1a237e")
INDIGO_700 = HexColor("#303f9f")
INDIGO_500 = HexColor("#3f51b5")
INDIGO_100 = HexColor("#e8eaf6")
INDIGO_050 = HexColor("#f5f6fd")

TEAL_700   = HexColor("#00796b")
TEAL_500   = HexColor("#26a69a")
TEAL_100   = HexColor("#b2dfdb")

AMBER_700  = HexColor("#ff8f00")
AMBER_500  = HexColor("#ffa726")
AMBER_100  = HexColor("#ffe0b2")

CORAL_700  = HexColor("#c62828")
CORAL_500  = HexColor("#ef5350")
CORAL_100  = HexColor("#ffcdd2")

SLATE_900  = HexColor("#212121")
SLATE_700  = HexColor("#424242")
SLATE_500  = HexColor("#757575")
SLATE_300  = HexColor("#bdbdbd")
SLATE_200  = HexColor("#e0e0e0")
SLATE_100  = HexColor("#f5f5f5")

HEADING_COLOR = INDIGO_900
SUBHEADING_COLOR = INDIGO_700
LINK_COLOR = INDIGO_500
CODE_BG = SLATE_100
CODE_COLOR = CORAL_700
BORDER_COLOR = SLATE_300

# ── Custom Flowables ──────────────────────────────────────────────

class HR(Flowable):
    """A horizontal rule."""
    def __init__(self, width, color=BORDER_COLOR, thickness=0.5):
        Flowable.__init__(self)
        self.width = width
        self.color = color
        self.thickness = thickness
        self.height = 8

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, 4, self.width, 4)


class AccentHR(Flowable):
    """A thicker accent divider with a gradient-like double-line."""
    def __init__(self, width):
        Flowable.__init__(self)
        self.width = width
        self.height = 8

    def draw(self):
        self.canv.setStrokeColor(INDIGO_500)
        self.canv.setLineWidth(2)
        self.canv.line(0, 4, self.width, 4)


def sanitize_for_courier(text):
    """
    Courier (the built-in ReportLab Type-1 font) lacks Unicode box-drawing
    and many other symbol glyphs. Substitute common ones with ASCII equivalents
    so file-tree and similar diagrams render cleanly instead of as tofu boxes.
    """
    replacements = {
        '\u2500': '-',   # ─ light horizontal
        '\u2502': '|',   # │ light vertical
        '\u250c': '+',   # ┌ top-left
        '\u2510': '+',   # ┐ top-right
        '\u2514': '`',   # └ bottom-left
        '\u2518': '+',   # ┘ bottom-right
        '\u251c': '|',   # ├ vertical + right
        '\u2524': '|',   # ┤ vertical + left
        '\u252c': '+',   # ┬ down + horizontal
        '\u2534': '+',   # ┴ up + horizontal
        '\u253c': '+',   # ┼ cross
        '\u2550': '=',   # ═ double horizontal
        '\u2551': '|',   # ║ double vertical
        '\u2554': '+',   # ╔
        '\u2557': '+',   # ╗
        '\u255a': '+',   # ╚
        '\u255d': '+',   # ╝
        '\u2190': '<-',  # ←
        '\u2192': '->',  # →
        '\u2191': '^',   # ↑
        '\u2193': 'v',   # ↓
        '\u2022': '*',   # •
        '\u2013': '-',   # –
        '\u2014': '--',  # —
        '\u2018': "'",   # ‘
        '\u2019': "'",   # ’
        '\u201c': '"',   # “
        '\u201d': '"',   # ”
        '\u2026': '...', # …
        '\u00a0': ' ',   # nbsp
    }
    for u, a in replacements.items():
        text = text.replace(u, a)
    return text


class CodeBlock(Flowable):
    """Monospaced code block with subtle background, border, and word-wrapping."""

    _FONT_SIZE = 8.5
    _LINE_HEIGHT = 11
    _PADDING = 10
    _LEFT_INSET = 14    # space for accent bar + gutter
    _RIGHT_INSET = 10

    def __init__(self, text, width):
        Flowable.__init__(self)
        text = text.rstrip()
        if MONO_FONT == "Courier":
            text = sanitize_for_courier(text)
        self.width = width

        # Compute max chars per rendered line based on actual font metrics
        from reportlab.pdfbase.pdfmetrics import stringWidth
        avail = width - self._LEFT_INSET - self._RIGHT_INSET
        char_w = stringWidth("M", MONO_FONT, self._FONT_SIZE)
        self._max_chars = max(10, int(avail / char_w))

        # Pre-wrap every line so we know the real height
        self._rendered_lines = []
        for line in text.split('\n'):
            self._rendered_lines.extend(self._wrap_line(line))

        self.height = len(self._rendered_lines) * self._LINE_HEIGHT + self._PADDING * 2

    def _wrap_line(self, line):
        """Wrap at word boundaries when possible; hard-break otherwise.
        Continuation lines are indented with a subtle marker."""
        if len(line) <= self._max_chars:
            return [line]

        out = []
        # Preserve leading whitespace on first line
        leading = len(line) - len(line.lstrip())
        indent = ' ' * leading + '  '  # continuation gets 2 extra spaces

        remaining = line
        first = True
        while len(remaining) > self._max_chars:
            limit = self._max_chars if first else self._max_chars
            # Find last space before the limit
            chunk = remaining[:limit]
            break_pos = chunk.rfind(' ')
            if break_pos > leading + 4:
                out.append(remaining[:break_pos])
                remaining = indent + remaining[break_pos + 1:]
            else:
                # No good space — hard break
                out.append(remaining[:limit])
                remaining = indent + remaining[limit:]
            first = False
        if remaining:
            out.append(remaining)
        return out

    def draw(self):
        c = self.canv
        # Background
        c.setFillColor(CODE_BG)
        c.setStrokeColor(BORDER_COLOR)
        c.setLineWidth(0.5)
        c.roundRect(0, 0, self.width, self.height, 4, fill=1, stroke=1)

        # Accent bar on left
        c.setFillColor(INDIGO_500)
        c.rect(0, 0, 3, self.height, fill=1, stroke=0)

        # Text
        c.setFillColor(SLATE_900)
        c.setFont(MONO_FONT, self._FONT_SIZE)
        y = self.height - self._PADDING - 8
        for line in self._rendered_lines:
            c.drawString(self._LEFT_INSET, y, line)
            y -= self._LINE_HEIGHT


class ThreeLayerDiagram(Flowable):
    """
    Visual replacement for the 3-layer meta-prompt ASCII diagram.
    Three color-coded stacked cards with downward arrows between them.
    """
    def __init__(self, width):
        Flowable.__init__(self)
        self.width = width
        self.height = 330

    def draw(self):
        c = self.canv
        w = self.width

        # Layout
        card_h = 85
        gap = 22       # space for arrow between cards
        margin_x = 20
        card_w = w - 2 * margin_x

        layers = [
            {
                "title": "LAYER 1 — Your Meta-Prompt",
                "subtitle": "Build it once, with AI's help.",
                "desc": "A markdown file in your repo. When pasted into AI chat, it turns the chat into a \"prompt engineer for you.\"",
                "fill": INDIGO_100,
                "border": INDIGO_500,
                "title_color": INDIGO_900,
                "icon": "1",
            },
            {
                "title": "LAYER 2 — Template Prompts",
                "subtitle": "Generated on-demand by AI.",
                "desc": "AI interviews you about a specific task, then produces a ready-to-use prompt template tailored to it.",
                "fill": TEAL_100,
                "border": TEAL_500,
                "title_color": TEAL_700,
                "icon": "2",
            },
            {
                "title": "LAYER 3 — Actual Deliverables",
                "subtitle": "Produced consistently, at quality.",
                "desc": "Code, tests, docs, reviews — whatever the task needs. Standards-compliant because the template was well-designed.",
                "fill": AMBER_100,
                "border": AMBER_500,
                "title_color": AMBER_700,
                "icon": "3",
            },
        ]

        # Start at top
        y = self.height

        for idx, layer in enumerate(layers):
            y -= card_h
            # Card background
            c.setFillColor(layer["fill"])
            c.setStrokeColor(layer["border"])
            c.setLineWidth(1.2)
            c.roundRect(margin_x, y, card_w, card_h, 8, fill=1, stroke=1)

            # Left-side circle badge
            badge_cx = margin_x + 28
            badge_cy = y + card_h - 28
            c.setFillColor(layer["border"])
            c.circle(badge_cx, badge_cy, 14, fill=1, stroke=0)
            c.setFillColor(white)
            c.setFont("Helvetica-Bold", 14)
            c.drawCentredString(badge_cx, badge_cy - 5, layer["icon"])

            # Title
            c.setFillColor(layer["title_color"])
            c.setFont("Helvetica-Bold", 12)
            c.drawString(margin_x + 52, y + card_h - 22, layer["title"])

            # Subtitle
            c.setFillColor(SLATE_700)
            c.setFont("Helvetica-Oblique", 9)
            c.drawString(margin_x + 52, y + card_h - 36, layer["subtitle"])

            # Description (word-wrap manually)
            c.setFillColor(SLATE_900)
            c.setFont("Helvetica", 9)
            desc = layer["desc"]
            words = desc.split()
            lines = []
            line = ""
            max_w = card_w - 60
            for word in words:
                test = (line + " " + word).strip()
                if c.stringWidth(test, "Helvetica", 9) < max_w:
                    line = test
                else:
                    lines.append(line)
                    line = word
            if line:
                lines.append(line)
            ly = y + card_h - 52
            for ln in lines[:3]:
                c.drawString(margin_x + 52, ly, ln)
                ly -= 11

            # Arrow to next layer
            if idx < len(layers) - 1:
                arrow_x = w / 2
                arrow_top = y - 4
                arrow_bottom = y - gap + 6
                c.setStrokeColor(SLATE_500)
                c.setLineWidth(1.5)
                c.line(arrow_x, arrow_top, arrow_x, arrow_bottom + 4)
                # Arrowhead
                c.setFillColor(SLATE_500)
                p = c.beginPath()
                p.moveTo(arrow_x, arrow_bottom)
                p.lineTo(arrow_x - 5, arrow_bottom + 6)
                p.lineTo(arrow_x + 5, arrow_bottom + 6)
                p.close()
                c.drawPath(p, fill=1, stroke=0)
            y -= gap


class LearningPathDiagram(Flowable):
    """Visual replacement for the learning path block in README.md."""
    def __init__(self, width):
        Flowable.__init__(self)
        self.width = width
        self.height = 260

    def draw(self):
        c = self.canv
        w = self.width

        groups = [
            {
                "label": "CORE CONCEPTS",
                "subtitle": "Any tool",
                "modules": ["M1 Foundations", "M2 Templates", "M3 Meta-Prompt", "M4 Advanced"],
                "fill": INDIGO_100,
                "border": INDIGO_500,
                "text": INDIGO_900,
            },
            {
                "label": "TOOL-SPECIFIC",
                "subtitle": "Pick what you have",
                "modules": ["M5 Copilot", "M6 Windsurf", "M7 Claude Code"],
                "fill": TEAL_100,
                "border": TEAL_500,
                "text": TEAL_700,
            },
            {
                "label": "APPLY IT",
                "subtitle": "Real work",
                "modules": ["M8 Client Work", "M9 Putting It Together"],
                "fill": AMBER_100,
                "border": AMBER_500,
                "text": AMBER_700,
            },
        ]

        group_h = 68
        group_gap = 14
        margin_x = 12

        y = self.height
        for idx, g in enumerate(groups):
            y -= group_h
            # Group card
            c.setFillColor(g["fill"])
            c.setStrokeColor(g["border"])
            c.setLineWidth(1)
            c.roundRect(margin_x, y, w - 2 * margin_x, group_h, 6, fill=1, stroke=1)

            # Left label
            c.setFillColor(g["text"])
            c.setFont("Helvetica-Bold", 10)
            c.drawString(margin_x + 14, y + group_h - 18, g["label"])
            c.setFillColor(SLATE_700)
            c.setFont("Helvetica-Oblique", 8)
            c.drawString(margin_x + 14, y + group_h - 30, g["subtitle"])

            # Module pills on the right
            pills = g["modules"]
            pill_h = 22
            pill_y = y + (group_h - pill_h) / 2
            right_edge = w - margin_x - 10
            available = right_edge - (margin_x + 130)
            pill_w = (available - (len(pills) - 1) * 6) / len(pills)

            px = margin_x + 130
            for m in pills:
                c.setFillColor(white)
                c.setStrokeColor(g["border"])
                c.setLineWidth(0.8)
                c.roundRect(px, pill_y, pill_w, pill_h, 4, fill=1, stroke=1)
                c.setFillColor(g["text"])
                c.setFont("Helvetica-Bold", 7.5)
                # Truncate if needed
                label = m
                while c.stringWidth(label, "Helvetica-Bold", 7.5) > pill_w - 8 and len(label) > 3:
                    label = label[:-1]
                if label != m:
                    label = label[:-1] + "…"
                c.drawCentredString(px + pill_w / 2, pill_y + pill_h / 2 - 3, label)
                px += pill_w + 6

            if idx < len(groups) - 1:
                # Connector arrow on left side
                arrow_x = margin_x + 14
                c.setStrokeColor(SLATE_500)
                c.setLineWidth(1.2)
                c.line(arrow_x, y, arrow_x, y - group_gap + 6)
                c.setFillColor(SLATE_500)
                p = c.beginPath()
                p.moveTo(arrow_x, y - group_gap + 3)
                p.lineTo(arrow_x - 4, y - group_gap + 9)
                p.lineTo(arrow_x + 4, y - group_gap + 9)
                p.close()
                c.drawPath(p, fill=1, stroke=0)
            y -= group_gap


class ToolMappingDiagram(Flowable):
    """A visual 3-column tool comparison chart."""
    def __init__(self, width):
        Flowable.__init__(self)
        self.width = width
        self.height = 220

    def draw(self):
        c = self.canv
        w = self.width
        margin_x = 10
        col_gap = 10
        col_w = (w - 2 * margin_x - 2 * col_gap) / 3

        tools = [
            {
                "name": "GitHub Copilot",
                "fill": INDIGO_100,
                "border": INDIGO_500,
                "text": INDIGO_900,
                "rows": [
                    ("Instructions", ".github/copilot-\ninstructions.md"),
                    ("Prompts", ".github/prompts/\n*.prompt.md"),
                    ("File context", "#file, #selection"),
                    ("Repo context", "@workspace"),
                ],
            },
            {
                "name": "Windsurf",
                "fill": TEAL_100,
                "border": TEAL_500,
                "text": TEAL_700,
                "rows": [
                    ("Instructions", ".windsurf/rules/\n*.md"),
                    ("Prompts", ".windsurf/workflows/\n*.md"),
                    ("File context", "@file"),
                    ("Repo context", "@codebase"),
                ],
            },
            {
                "name": "Claude Code",
                "fill": AMBER_100,
                "border": AMBER_500,
                "text": AMBER_700,
                "rows": [
                    ("Instructions", "CLAUDE.md"),
                    ("Prompts", ".claude/skills/\n*.md"),
                    ("File context", "Automatic"),
                    ("Repo context", "Automatic"),
                ],
            },
        ]

        for i, tool in enumerate(tools):
            x = margin_x + i * (col_w + col_gap)
            # Column background
            c.setFillColor(tool["fill"])
            c.setStrokeColor(tool["border"])
            c.setLineWidth(1)
            c.roundRect(x, 0, col_w, self.height, 6, fill=1, stroke=1)

            # Header
            c.setFillColor(tool["border"])
            c.rect(x, self.height - 28, col_w, 28, fill=1, stroke=0)
            # Re-draw rounded corners at top
            c.setFillColor(tool["border"])
            c.roundRect(x, self.height - 28, col_w, 28, 6, fill=1, stroke=0)
            # Clip bottom of header
            c.setFillColor(tool["border"])
            c.rect(x, self.height - 28, col_w, 14, fill=1, stroke=0)

            c.setFillColor(white)
            c.setFont("Helvetica-Bold", 11)
            c.drawCentredString(x + col_w / 2, self.height - 18, tool["name"])

            # Rows
            row_y = self.height - 40
            for key, val in tool["rows"]:
                c.setFillColor(SLATE_700)
                c.setFont("Helvetica-Bold", 7.5)
                c.drawString(x + 8, row_y, key.upper())
                row_y -= 10
                c.setFillColor(SLATE_900)
                c.setFont(MONO_FONT, 7.5)
                for vline in val.split('\n'):
                    c.drawString(x + 8, row_y, vline)
                    row_y -= 10
                row_y -= 6


# ── Styles ─────────────────────────────────────────────────────────

def build_styles():
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        name='CoverTitle', fontName='Helvetica-Bold', fontSize=34, leading=40,
        textColor=INDIGO_900, alignment=TA_CENTER, spaceAfter=12,
    ))
    styles.add(ParagraphStyle(
        name='CoverSubtitle', fontName='Helvetica', fontSize=14, leading=22,
        textColor=INDIGO_700, alignment=TA_CENTER, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name='CoverTag', fontName='Helvetica-Bold', fontSize=11, leading=16,
        textColor=TEAL_700, alignment=TA_CENTER,
    ))
    styles.add(ParagraphStyle(
        name='SectionTitle', fontName='Helvetica-Bold', fontSize=26, leading=32,
        textColor=INDIGO_900, spaceBefore=0, spaceAfter=12, alignment=TA_CENTER,
    ))
    styles.add(ParagraphStyle(
        name='SectionNumber', fontName='Helvetica-Bold', fontSize=10, leading=14,
        textColor=TEAL_700, alignment=TA_CENTER, spaceBefore=0, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name='H1', fontName='Helvetica-Bold', fontSize=20, leading=26,
        textColor=HEADING_COLOR, spaceBefore=22, spaceAfter=10,
    ))
    styles.add(ParagraphStyle(
        name='H2', fontName='Helvetica-Bold', fontSize=15, leading=21,
        textColor=SUBHEADING_COLOR, spaceBefore=16, spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name='H3', fontName='Helvetica-Bold', fontSize=12, leading=17,
        textColor=SUBHEADING_COLOR, spaceBefore=12, spaceAfter=5,
    ))
    styles.add(ParagraphStyle(
        name='H4', fontName='Helvetica-BoldOblique', fontSize=11, leading=15,
        textColor=SUBHEADING_COLOR, spaceBefore=10, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name='BodyText2', fontName='Helvetica', fontSize=10, leading=14.5,
        textColor=SLATE_900, spaceBefore=2, spaceAfter=6, alignment=TA_JUSTIFY,
    ))
    styles.add(ParagraphStyle(
        name='BulletItem', fontName='Helvetica', fontSize=10, leading=14,
        textColor=SLATE_900, leftIndent=18, spaceBefore=1, spaceAfter=1,
    ))
    styles.add(ParagraphStyle(
        name='BulletItem2', fontName='Helvetica', fontSize=10, leading=14,
        textColor=SLATE_900, leftIndent=36, spaceBefore=1, spaceAfter=1,
    ))
    styles.add(ParagraphStyle(
        name='BlockQuote', fontName='Helvetica-Oblique', fontSize=10, leading=14,
        textColor=SLATE_700, leftIndent=16, rightIndent=16,
        spaceBefore=6, spaceAfter=6, borderPadding=6,
        backColor=INDIGO_050, borderColor=INDIGO_500, borderWidth=0,
        leftBorderWidth=3,
    ))
    # TOC styles (level-based)
    styles.add(ParagraphStyle(
        name='TOC1', fontName='Helvetica-Bold', fontSize=12, leading=22,
        textColor=INDIGO_900, leftIndent=0, spaceBefore=6,
    ))
    styles.add(ParagraphStyle(
        name='TOC2', fontName='Helvetica-Bold', fontSize=10.5, leading=18,
        textColor=INDIGO_700, leftIndent=16,
    ))
    styles.add(ParagraphStyle(
        name='TOC3', fontName='Helvetica', fontSize=9.5, leading=15,
        textColor=SLATE_700, leftIndent=32,
    ))

    return styles


# ── Markdown Parser ────────────────────────────────────────────────

def escape_xml(text):
    return (text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'))


def format_inline(text):
    text = escape_xml(text)

    # Protect inline code
    code_spans = []
    def _rep(m):
        code_spans.append(m.group(1))
        return f'\x00CODE{len(code_spans)-1}\x00'
    text = re.sub(r'`([^`]+)`', _rep, text)

    text = re.sub(r'\*\*\*(.+?)\*\*\*', r'<b><i>\1</i></b>', text)
    text = re.sub(r'\*\*(.+?)\*\*',     r'<b>\1</b>', text)
    text = re.sub(r'(?<!\w)\*([^*]+?)\*(?!\w)', r'<i>\1</i>', text)
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)

    for i, code in enumerate(code_spans):
        text = text.replace(
            f'\x00CODE{i}\x00',
            f'<font name="{MONO_FONT}" size="9" color="#c62828">{code}</font>'
        )
    return text


def parse_table(lines, avail_width):
    rows = []
    for line in lines:
        s = line.strip()
        if s.startswith('|'): s = s[1:]
        if s.endswith('|'):   s = s[:-1]
        rows.append([c.strip() for c in s.split('|')])
    if len(rows) < 2:
        return None

    header = rows[0]
    data_rows = [r for r in rows[1:]
                 if not all(re.match(r'^[-:]+$', c.strip()) for c in r if c.strip())]
    if not data_rows:
        return None

    ncols = len(header)
    for i, r in enumerate(data_rows):
        while len(r) < ncols: r.append('')
        data_rows[i] = r[:ncols]

    cell_style = ParagraphStyle('TC', fontName='Helvetica',      fontSize=8.5, leading=11, textColor=SLATE_900)
    hdr_style  = ParagraphStyle('TH', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=white)

    data = [[Paragraph(format_inline(h), hdr_style) for h in header]]
    for r in data_rows:
        data.append([Paragraph(format_inline(c), cell_style) for c in r])

    col_w = (avail_width - 10) / ncols
    table = Table(data, colWidths=[col_w] * ncols, repeatRows=1)
    table.setStyle(TableStyle([
        ('BACKGROUND',    (0, 0), (-1, 0), INDIGO_700),
        ('TEXTCOLOR',     (0, 0), (-1, 0), white),
        ('FONTNAME',      (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE',      (0, 0), (-1, -1), 8.5),
        ('ALIGN',         (0, 0), (-1, 0), 'LEFT'),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING',    (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING',   (0, 0), (-1, -1), 6),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS',(0, 1), (-1, -1), [white, INDIGO_050]),
        ('LINEBELOW',     (0, 0), (-1, 0), 1, INDIGO_900),
        ('LINEBELOW',     (0, 1), (-1, -2), 0.25, SLATE_200),
        ('BOX',           (0, 0), (-1, -1), 0.5, BORDER_COLOR),
    ]))
    return table


# Known ASCII-art diagram patterns that should be replaced with custom flowables
def detect_diagram(code_text):
    """Return a flowable factory name if this code block matches a known diagram."""
    t = code_text.strip()
    if 'LAYER 1 — Your Meta-Prompt' in t and 'LAYER 3 — Actual Deliverables' in t:
        return 'three_layer'
    if 'CORE CONCEPTS' in t and 'TOOL-SPECIFIC' in t and 'APPLY IT' in t:
        return 'learning_path'
    return None


def md_to_flowables(md_text, avail_width, styles):
    flowables = []
    lines = md_text.split('\n')
    i = 0
    in_code = False
    code_lines = []

    while i < len(lines):
        line = lines[i]

        if line.strip().startswith('```'):
            if in_code:
                code_text = '\n'.join(code_lines)
                diagram = detect_diagram(code_text)
                if diagram == 'three_layer':
                    flowables.append(Spacer(1, 6))
                    flowables.append(ThreeLayerDiagram(avail_width))
                    flowables.append(Spacer(1, 6))
                elif diagram == 'learning_path':
                    flowables.append(Spacer(1, 6))
                    flowables.append(LearningPathDiagram(avail_width))
                    flowables.append(Spacer(1, 6))
                elif code_text.strip():
                    flowables.append(Spacer(1, 4))
                    flowables.append(CodeBlock(code_text, avail_width - 20))
                    flowables.append(Spacer(1, 4))
                code_lines = []
                in_code = False
            else:
                in_code = True
                code_lines = []
            i += 1
            continue

        if in_code:
            code_lines.append(line)
            i += 1
            continue

        s = line.strip()
        if not s:
            i += 1
            continue

        if re.match(r'^[-*_]{3,}\s*$', s):
            flowables.append(Spacer(1, 4))
            flowables.append(HR(avail_width - 20))
            flowables.append(Spacer(1, 4))
            i += 1
            continue

        m = re.match(r'^(#{1,4})\s+(.*)', s)
        if m:
            level = len(m.group(1))
            text = format_inline(m.group(2).strip())
            style_name = {1: 'H1', 2: 'H2', 3: 'H3', 4: 'H4'}[level]
            flowables.append(Paragraph(text, styles[style_name]))
            i += 1
            continue

        if s.startswith('|') and '|' in s[1:]:
            tbl_lines = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                tbl_lines.append(lines[i]); i += 1
            tbl = parse_table(tbl_lines, avail_width)
            if tbl:
                flowables.append(Spacer(1, 6))
                flowables.append(tbl)
                flowables.append(Spacer(1, 6))
            continue

        if s.startswith('>'):
            qlines = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                qlines.append(re.sub(r'^>\s*', '', lines[i].strip())); i += 1
            text = format_inline(' '.join(qlines))
            flowables.append(Paragraph(text, styles['BlockQuote']))
            continue

        b = re.match(r'^(\s*)([-*+]|\d+[.)]) (.+)', line)
        if b:
            indent = len(line) - len(line.lstrip())
            bullet = b.group(2)
            text = format_inline(b.group(3))
            style_name = 'BulletItem2' if indent >= 2 else 'BulletItem'
            prefix = bullet if re.match(r'\d+', bullet) else '\u2022'
            flowables.append(Paragraph(f'{prefix}  {text}', styles[style_name]))
            i += 1
            continue

        if s.startswith('<!--'):
            while i < len(lines) and '-->' not in lines[i]: i += 1
            i += 1
            continue

        para = []
        while i < len(lines):
            l = lines[i].strip()
            if (not l or l.startswith('#') or l.startswith('```')
                or l.startswith('|') or l.startswith('>')
                or re.match(r'^[-*+] ', l) or re.match(r'^\d+[.)] ', l)
                or re.match(r'^[-*_]{3,}$', l)):
                break
            para.append(l); i += 1

        if para:
            flowables.append(Paragraph(format_inline(' '.join(para)), styles['BodyText2']))

    return flowables


# ── Document Template with TOC + Bookmarks ────────────────────────

class GuideDocTemplate(BaseDocTemplate):
    """
    - Emits TOCEntry notifications for headings so the TableOfContents flowable
      can auto-populate with real page numbers.
    - Adds PDF bookmarks/outline entries for in-viewer navigation.
    """
    BOOKMARK_LEVELS = {
        'SectionTitle': 0,
        'H1': 1,
        'H2': 2,
    }

    def afterFlowable(self, flowable):
        if not isinstance(flowable, Paragraph):
            return
        style_name = flowable.style.name
        level = self.BOOKMARK_LEVELS.get(style_name)
        if level is None:
            return

        text = re.sub(r'<[^>]+>', '', flowable.getPlainText() or '').strip()
        if not text:
            return

        key = hashlib.md5(f'{text}-{self.page}-{level}-{id(flowable)}'.encode()).hexdigest()[:12]
        self.canv.bookmarkPage(key)
        self.canv.addOutlineEntry(text, key, level=level, closed=(level >= 2))

        # Notify TOC
        self.notify('TOCEntry', (level, text, self.page, key))


# ── Page Headers & Footers ────────────────────────────────────────

def on_cover_page(canvas, doc):
    canvas.showOutline()


def on_content_page(canvas, doc):
    canvas.saveState()
    width, height = letter

    # Top thin accent bar
    canvas.setFillColor(INDIGO_500)
    canvas.rect(0, height - 6, width, 6, fill=1, stroke=0)

    # Footer line
    canvas.setStrokeColor(BORDER_COLOR)
    canvas.setLineWidth(0.4)
    canvas.line(inch, 0.7 * inch, width - inch, 0.7 * inch)

    # Footer text
    canvas.setFillColor(SLATE_500)
    canvas.setFont('Helvetica', 8.5)
    canvas.drawString(inch, 0.5 * inch, "Prompt Engineering Guide")
    canvas.drawRightString(width - inch, 0.5 * inch, f"Page {doc.page}")

    canvas.restoreState()


# ── Page Builders ─────────────────────────────────────────────────

def build_cover(styles, avail_width):
    flows = []
    flows.append(Spacer(1, 1.5 * inch))
    flows.append(Paragraph("Prompt Engineering", styles['CoverTitle']))
    flows.append(Paragraph("Guide", styles['CoverTitle']))
    flows.append(Spacer(1, 10))

    # Accent line
    flows.append(HR(avail_width * 0.3, INDIGO_500, 2))
    flows.append(Spacer(1, 18))

    flows.append(Paragraph(
        "A hands-on guide to writing effective prompts,<br/>"
        "building reusable templates, and automating<br/>"
        "client work with AI coding tools.",
        styles['CoverSubtitle']
    ))
    flows.append(Spacer(1, 24))
    flows.append(Paragraph(
        "GitHub Copilot   \u2022   Windsurf   \u2022   Claude Code",
        styles['CoverTag']
    ))
    flows.append(Spacer(1, 1.2 * inch))

    info = ParagraphStyle(
        'Info', fontName='Helvetica', fontSize=10, leading=15,
        textColor=SLATE_700, alignment=TA_CENTER
    )
    flows.append(Paragraph("6 Guides  \u2022  35+ Exercises  \u2022  ~3.5 Hours", info))
    flows.append(Spacer(1, 4))
    flows.append(Paragraph(
        "Core concepts are tool-agnostic \u2014 learn once, apply anywhere.", info
    ))
    flows.append(Spacer(1, 0.5 * inch))

    # Cover: author credit
    author_style = ParagraphStyle(
        'CoverAuthor', fontName='Helvetica-Bold', fontSize=10, leading=14,
        textColor=INDIGO_700, alignment=TA_CENTER,
    )
    flows.append(Paragraph(f"Curated by {AUTHOR_NAME}", author_style))
    flows.append(Spacer(1, 4))

    # Cover footer: attribution + license
    cover_footer = ParagraphStyle(
        'CoverFooter', fontName='Helvetica-Oblique', fontSize=8, leading=12,
        textColor=SLATE_500, alignment=TA_CENTER,
    )
    flows.append(Paragraph(
        "Created with the help of AI \u2022 Free to use for learning purposes only",
        cover_footer
    ))
    flows.append(PageBreak())
    return flows


def build_about_page(styles, avail_width):
    """About / License page at the end of the document."""
    flows = []
    flows.append(Spacer(1, 0.6 * inch))
    flows.append(Paragraph("About This Guide", styles['SectionTitle']))
    flows.append(AccentHR(avail_width * 0.35))
    flows.append(Spacer(1, 18))

    body = styles['BodyText2']
    h3 = styles['H3']

    flows.append(Paragraph("How This Was Made", h3))
    flows.append(Paragraph(
        f"This guide was curated by <b>{AUTHOR_NAME}</b> and created "
        "collaboratively with the help of AI (Anthropic's Claude). The "
        "content \u2014 explanations, exercises, templates, diagrams, "
        "and this PDF itself \u2014 was drafted and refined through "
        "iterative prompting, exactly the same process the guide teaches. "
        "Human review, editing, and curation shaped the final material "
        "for accuracy and practical usefulness.",
        body
    ))
    flows.append(Spacer(1, 8))
    flows.append(Paragraph(
        "Treating this guide as a worked example is fair game: every "
        "prompting technique demonstrated here was used at some point "
        "to produce the guide itself.",
        body
    ))

    flows.append(Spacer(1, 16))
    flows.append(Paragraph("License & Usage", h3))
    flows.append(Paragraph(
        "<b>Free to use for learning purposes only.</b>",
        body
    ))
    flows.append(Spacer(1, 4))
    flows.append(Paragraph("You are welcome to:", body))

    allowed = [
        "Read, study, and practice with this guide personally or as a team.",
        "Share the PDF internally with colleagues for educational use.",
        "Adapt the templates and meta-prompts for your own work.",
        "Reference or cite portions of the guide with attribution.",
    ]
    for item in allowed:
        flows.append(Paragraph(f'\u2022  {item}', styles['BulletItem']))

    flows.append(Spacer(1, 8))
    flows.append(Paragraph("Please do not:", body))
    restricted = [
        "Resell, relicense, or distribute commercially without permission.",
        "Claim authorship or remove attribution.",
        "Use the content to train commercial AI models.",
    ]
    for item in restricted:
        flows.append(Paragraph(f'\u2022  {item}', styles['BulletItem']))

    flows.append(Spacer(1, 16))
    flows.append(Paragraph("Disclaimer &amp; Limitation of Liability", h3))
    flows.append(Paragraph(
        "This guide is provided <b>\u201cas-is\u201d</b>, for educational and "
        "informational purposes only, without any warranties of any kind, "
        "express or implied, including but not limited to warranties of "
        "merchantability, fitness for a particular purpose, accuracy, or "
        "non-infringement.",
        body
    ))
    flows.append(Spacer(1, 6))
    flows.append(Paragraph(
        f"<b>{AUTHOR_NAME}</b> (the curator) and any AI systems used in "
        "producing this material shall not be held liable for any direct, "
        "indirect, incidental, consequential, or other damages, losses, "
        "or issues arising from the use, misuse, or inability to use this "
        "guide. This includes, without limitation: incorrect or suboptimal "
        "AI output, bugs introduced into code, production incidents, "
        "security vulnerabilities, data loss, contractual or client-related "
        "consequences, or any other side effects that may result from "
        "applying the techniques, templates, prompts, or examples described "
        "herein.",
        body
    ))
    flows.append(Spacer(1, 6))
    flows.append(Paragraph(
        "AI tools evolve quickly \u2014 feature names, file paths, and tool "
        "behaviors may change. You are solely responsible for verifying any "
        "technique or recommendation against your tool\u2019s current "
        "documentation, applying appropriate code review and testing, and "
        "ensuring that AI-generated output meets your project\u2019s "
        "correctness, security, and compliance requirements before using it "
        "in client or production work.",
        body
    ))
    flows.append(Spacer(1, 6))
    flows.append(Paragraph(
        "<b>By using this guide, you acknowledge and accept that you do so "
        "entirely at your own risk.</b>",
        body
    ))

    flows.append(Spacer(1, 16))
    flows.append(Paragraph("Feedback", h3))
    flows.append(Paragraph(
        "Found something that could be clearer or more accurate? "
        "Contributions and suggestions that improve the guide for the "
        "whole team are welcomed.",
        body
    ))

    flows.append(Spacer(1, 0.4 * inch))
    footer_style = ParagraphStyle(
        'AboutFooter', fontName='Helvetica-Oblique', fontSize=8.5, leading=12,
        textColor=SLATE_500, alignment=TA_CENTER,
    )
    flows.append(HR(avail_width * 0.4))
    flows.append(Spacer(1, 8))
    flows.append(Paragraph(
        f"Prompt Engineering Guide \u2014 curated by {AUTHOR_NAME}.<br/>"
        "Built with AI, shared for learning.",
        footer_style
    ))
    return flows


def build_toc(styles):
    flows = []
    flows.append(Spacer(1, 12))
    flows.append(Paragraph("Table of Contents", styles['SectionTitle']))
    flows.append(AccentHR(4 * inch))
    flows.append(Spacer(1, 10))

    toc = TableOfContents()
    toc.levelStyles = [
        styles['TOC1'],
        styles['TOC2'],
        styles['TOC3'],
    ]
    flows.append(toc)
    flows.append(PageBreak())
    return flows


def build_section_cover(num, title, filename, styles, avail_width):
    flows = []
    flows.append(Spacer(1, 1 * inch))
    flows.append(Paragraph(f"SECTION {num}", styles['SectionNumber']))
    flows.append(Spacer(1, 4))
    flows.append(Paragraph(title, styles['SectionTitle']))
    flows.append(Spacer(1, 8))
    flows.append(AccentHR(avail_width * 0.35))
    flows.append(Spacer(1, 10))
    flows.append(Paragraph(
        f'<i>Source: {filename}</i>',
        ParagraphStyle('Src', fontName='Helvetica-Oblique', fontSize=9,
                       leading=12, textColor=SLATE_500, alignment=TA_CENTER)
    ))
    flows.append(PageBreak())
    return flows


# ── Main ──────────────────────────────────────────────────────────

def main():
    styles = build_styles()
    avail_width = letter[0] - 2 * inch

    doc = GuideDocTemplate(
        OUTPUT_FILE,
        pagesize=letter,
        leftMargin=inch, rightMargin=inch,
        topMargin=0.9 * inch, bottomMargin=0.9 * inch,
        title="Prompt Engineering Guide",
        author=AUTHOR_NAME,
        subject="AI Prompting for Developers",
        creator="Generated with the help of AI",
    )

    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='normal')
    doc.addPageTemplates([
        PageTemplate(id='cover', frames=frame, onPage=on_cover_page),
        PageTemplate(id='content', frames=frame, onPage=on_content_page),
    ])

    story = []

    # --- Cover
    story.extend(build_cover(styles, avail_width))

    # Switch to content template
    story.append(NextPageTemplate('content'))

    # --- About / License / Disclaimer (front matter — shown before TOC)
    story.extend(build_about_page(styles, avail_width))
    story.append(PageBreak())

    # --- Auto-generated TOC (filled by multiBuild)
    story.extend(build_toc(styles))

    # --- Each source file
    for idx, (filename, section_title) in enumerate(FILES_IN_ORDER):
        filepath = os.path.join(PROJECT_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            md_text = f.read()

        # Section cover page
        story.extend(build_section_cover(idx + 1, section_title, filename, styles, avail_width))

        # Content
        story.extend(md_to_flowables(md_text, avail_width, styles))

    # multiBuild runs passes until TOC and page refs resolve
    doc.multiBuild(story)

    size_kb = os.path.getsize(OUTPUT_FILE) / 1024
    print(f"\u2713 PDF generated: {OUTPUT_FILE}")
    print(f"  Size: {size_kb:.0f} KB")


if __name__ == "__main__":
    main()
