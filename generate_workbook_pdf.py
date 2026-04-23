#!/usr/bin/env python3
"""
Generate a standalone PDF of the Priority Builder Workbook.

Reuses the visual style of the main prompt-engineering-guide.pdf but is its
own document with its own cover, About page, TOC, and structure.
"""

import os
import re
import hashlib
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    Paragraph, Spacer, PageBreak, Table, TableStyle, Flowable,
    Frame, PageTemplate, BaseDocTemplate, NextPageTemplate,
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


# ── Configuration ──────────────────────────────────────────────────

PROJECT_DIR = "/Users/gustavoam/Documents/GitHub/prompt-guide"
SOURCE_FILE = os.path.join(PROJECT_DIR, "priority-builder-workbook.md")
OUTPUT_FILE = os.path.join(PROJECT_DIR, "priority-builder-workbook.pdf")

AUTHOR_NAME = "Gustavo Andres"


# Try to register a Unicode-capable monospace font
MONO_FONT = "Courier"
try:
    pdfmetrics.registerFont(TTFont("Menlo", "/System/Library/Fonts/Menlo.ttc", subfontIndex=0))
    MONO_FONT = "Menlo"
except Exception:
    pass


# ── Color Palette (matches main guide) ────────────────────────────

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
SLATE_050  = HexColor("#fafafa")

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
    """A thicker accent divider."""
    def __init__(self, width):
        Flowable.__init__(self)
        self.width = width
        self.height = 8

    def draw(self):
        self.canv.setStrokeColor(INDIGO_500)
        self.canv.setLineWidth(2)
        self.canv.line(0, 4, self.width, 4)


def sanitize_for_courier(text):
    replacements = {
        '\u2500': '-', '\u2502': '|', '\u250c': '+', '\u2510': '+',
        '\u2514': '`', '\u2518': '+', '\u251c': '|', '\u2524': '|',
        '\u252c': '+', '\u2534': '+', '\u253c': '+',
        '\u2190': '<-', '\u2192': '->', '\u2191': '^', '\u2193': 'v',
        '\u2022': '*', '\u2013': '-', '\u2014': '--',
        '\u2018': "'", '\u2019': "'", '\u201c': '"', '\u201d': '"',
        '\u2026': '...', '\u00a0': ' ',
    }
    for u, a in replacements.items():
        text = text.replace(u, a)
    return text


class CodeBlock(Flowable):
    """Monospaced code block with subtle background, border, and word-wrapping.
    Splittable across pages for long code blocks."""
    _FONT_SIZE = 8.5
    _LINE_HEIGHT = 11
    _PADDING = 10
    _LEFT_INSET = 14
    _RIGHT_INSET = 10

    def __init__(self, text, width, _pre_wrapped_lines=None):
        Flowable.__init__(self)
        self.width = width

        if _pre_wrapped_lines is not None:
            # Already-wrapped lines (used for splitting)
            self._rendered_lines = _pre_wrapped_lines
        else:
            text = text.rstrip()
            if MONO_FONT == "Courier":
                text = sanitize_for_courier(text)

            from reportlab.pdfbase.pdfmetrics import stringWidth
            avail = width - self._LEFT_INSET - self._RIGHT_INSET
            char_w = stringWidth("M", MONO_FONT, self._FONT_SIZE)
            self._max_chars = max(10, int(avail / char_w))

            self._rendered_lines = []
            for line in text.split('\n'):
                self._rendered_lines.extend(self._wrap_line(line))

        self.height = len(self._rendered_lines) * self._LINE_HEIGHT + self._PADDING * 2

    def _wrap_line(self, line):
        if len(line) <= self._max_chars:
            return [line]
        out = []
        leading = len(line) - len(line.lstrip())
        indent = ' ' * leading + '  '
        remaining = line
        while len(remaining) > self._max_chars:
            limit = self._max_chars
            chunk = remaining[:limit]
            break_pos = chunk.rfind(' ')
            if break_pos > leading + 4:
                out.append(remaining[:break_pos])
                remaining = indent + remaining[break_pos + 1:]
            else:
                out.append(remaining[:limit])
                remaining = indent + remaining[limit:]
        if remaining:
            out.append(remaining)
        return out

    def split(self, available_width, available_height):
        """Split across pages when too tall. ReportLab calls this when the
        flowable doesn't fit in the current frame."""
        # Compute how many lines fit in the available height
        usable = available_height - self._PADDING * 2
        if usable <= self._LINE_HEIGHT:
            return []  # can't fit even one line — defer to next page

        max_lines_first = max(1, int(usable / self._LINE_HEIGHT))
        if max_lines_first >= len(self._rendered_lines):
            return [self]  # fits entirely — shouldn't happen if split was called, but safe

        first_lines = self._rendered_lines[:max_lines_first]
        rest_lines = self._rendered_lines[max_lines_first:]

        first = CodeBlock(text=None, width=self.width, _pre_wrapped_lines=first_lines)
        rest = CodeBlock(text=None, width=self.width, _pre_wrapped_lines=rest_lines)
        return [first, rest]

    def draw(self):
        c = self.canv
        c.setFillColor(CODE_BG)
        c.setStrokeColor(BORDER_COLOR)
        c.setLineWidth(0.5)
        c.roundRect(0, 0, self.width, self.height, 4, fill=1, stroke=1)

        c.setFillColor(INDIGO_500)
        c.rect(0, 0, 3, self.height, fill=1, stroke=0)

        c.setFillColor(SLATE_900)
        c.setFont(MONO_FONT, self._FONT_SIZE)
        y = self.height - self._PADDING - 8
        for line in self._rendered_lines:
            c.drawString(self._LEFT_INSET, y, line)
            y -= self._LINE_HEIGHT


class SuggestedPromptBox(Flowable):
    """A specially-styled box for the 🎯 SUGGESTED PROMPT sections — visually distinctive."""
    _FONT_SIZE = 8.5
    _LINE_HEIGHT = 11
    _PADDING_X = 14
    _PADDING_TOP = 32
    _PADDING_BOTTOM = 12
    _LEFT_INSET = 18
    _RIGHT_INSET = 12

    def __init__(self, text, width):
        Flowable.__init__(self)
        text = text.rstrip()
        if MONO_FONT == "Courier":
            text = sanitize_for_courier(text)
        self.width = width

        from reportlab.pdfbase.pdfmetrics import stringWidth
        avail = width - self._LEFT_INSET - self._RIGHT_INSET
        char_w = stringWidth("M", MONO_FONT, self._FONT_SIZE)
        self._max_chars = max(10, int(avail / char_w))

        self._rendered_lines = []
        for line in text.split('\n'):
            self._rendered_lines.extend(self._wrap_line(line))

        self.height = (
            len(self._rendered_lines) * self._LINE_HEIGHT
            + self._PADDING_TOP + self._PADDING_BOTTOM
        )

    def _wrap_line(self, line):
        if len(line) <= self._max_chars:
            return [line]
        out = []
        leading = len(line) - len(line.lstrip())
        indent = ' ' * leading + '  '
        remaining = line
        while len(remaining) > self._max_chars:
            limit = self._max_chars
            chunk = remaining[:limit]
            break_pos = chunk.rfind(' ')
            if break_pos > leading + 4:
                out.append(remaining[:break_pos])
                remaining = indent + remaining[break_pos + 1:]
            else:
                out.append(remaining[:limit])
                remaining = indent + remaining[limit:]
        if remaining:
            out.append(remaining)
        return out

    def draw(self):
        c = self.canv
        # Background: amber tint to make it stand out
        c.setFillColor(AMBER_100)
        c.setStrokeColor(AMBER_500)
        c.setLineWidth(1.2)
        c.roundRect(0, 0, self.width, self.height, 6, fill=1, stroke=1)

        # Left accent bar
        c.setFillColor(AMBER_700)
        c.rect(0, 0, 4, self.height, fill=1, stroke=0)

        # Header label inside the box
        c.setFillColor(AMBER_700)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(self._LEFT_INSET, self.height - 18, "SUGGESTED PROMPT")
        c.setFont("Helvetica-Oblique", 8)
        c.setFillColor(SLATE_700)
        c.drawString(self._LEFT_INSET + 130, self.height - 18, "(copy-paste into Copilot Chat)")

        # Code text
        c.setFillColor(SLATE_900)
        c.setFont(MONO_FONT, self._FONT_SIZE)
        y = self.height - self._PADDING_TOP - 4
        for line in self._rendered_lines:
            c.drawString(self._LEFT_INSET, y, line)
            y -= self._LINE_HEIGHT


# ── Styles ─────────────────────────────────────────────────────────

def build_styles():
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        name='CoverTitle', fontName='Helvetica-Bold', fontSize=36, leading=42,
        textColor=INDIGO_900, alignment=TA_CENTER, spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name='CoverSubtitle', fontName='Helvetica', fontSize=18, leading=24,
        textColor=INDIGO_700, alignment=TA_CENTER, spaceAfter=6, italic=True,
    ))
    styles.add(ParagraphStyle(
        name='CoverDesc', fontName='Helvetica', fontSize=13, leading=18,
        textColor=SLATE_700, alignment=TA_CENTER,
    ))
    styles.add(ParagraphStyle(
        name='CoverTag', fontName='Helvetica-Bold', fontSize=11, leading=16,
        textColor=TEAL_700, alignment=TA_CENTER,
    ))
    styles.add(ParagraphStyle(
        name='SectionTitle', fontName='Helvetica-Bold', fontSize=26, leading=32,
        textColor=INDIGO_900, spaceBefore=0, spaceAfter=12,
    ))
    styles.add(ParagraphStyle(
        name='H1', fontName='Helvetica-Bold', fontSize=22, leading=28,
        textColor=HEADING_COLOR, spaceBefore=24, spaceAfter=12,
    ))
    styles.add(ParagraphStyle(
        name='H2', fontName='Helvetica-Bold', fontSize=15, leading=21,
        textColor=SUBHEADING_COLOR, spaceBefore=18, spaceAfter=8,
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
        name='BodyText2', fontName='Helvetica', fontSize=10.5, leading=15,
        textColor=SLATE_900, spaceBefore=2, spaceAfter=6, alignment=TA_JUSTIFY,
    ))
    styles.add(ParagraphStyle(
        name='BulletItem', fontName='Helvetica', fontSize=10.5, leading=14.5,
        textColor=SLATE_900, leftIndent=18, spaceBefore=1, spaceAfter=1,
    ))
    styles.add(ParagraphStyle(
        name='BulletItem2', fontName='Helvetica', fontSize=10.5, leading=14.5,
        textColor=SLATE_900, leftIndent=36, spaceBefore=1, spaceAfter=1,
    ))
    styles.add(ParagraphStyle(
        name='BlockQuote', fontName='Helvetica-Oblique', fontSize=10.5, leading=15,
        textColor=SLATE_700, leftIndent=16, rightIndent=16,
        spaceBefore=6, spaceAfter=6, borderPadding=8,
        backColor=INDIGO_050, borderColor=INDIGO_500, borderWidth=0,
        leftBorderWidth=3,
    ))
    styles.add(ParagraphStyle(
        name='TOC1', fontName='Helvetica-Bold', fontSize=12, leading=22,
        textColor=INDIGO_900, leftIndent=0, spaceBefore=6,
    ))
    styles.add(ParagraphStyle(
        name='TOC2', fontName='Helvetica', fontSize=10.5, leading=18,
        textColor=INDIGO_700, leftIndent=20,
    ))
    styles.add(ParagraphStyle(
        name='TOC3', fontName='Helvetica', fontSize=9.5, leading=15,
        textColor=SLATE_700, leftIndent=36,
    ))

    return styles


# ── Markdown Parser ────────────────────────────────────────────────

def escape_xml(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def format_inline(text):
    text = escape_xml(text)
    code_spans = []
    def _rep(m):
        code_spans.append(m.group(1))
        return f'\x00CODE{len(code_spans)-1}\x00'
    text = re.sub(r'`([^`]+)`', _rep, text)
    text = re.sub(r'\*\*\*(.+?)\*\*\*', r'<b><i>\1</i></b>', text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
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


def md_to_flowables(md_text, avail_width, styles):
    flowables = []
    lines = md_text.split('\n')
    i = 0
    in_code = False
    code_lines = []

    # Track whether the previous heading was "🎯 SUGGESTED PROMPT" so the next
    # code block gets the special box treatment.
    next_code_is_suggested_prompt = False

    while i < len(lines):
        line = lines[i]

        if line.strip().startswith('```'):
            if in_code:
                code_text = '\n'.join(code_lines)
                if code_text.strip():
                    flowables.append(Spacer(1, 4))
                    if next_code_is_suggested_prompt:
                        flowables.append(SuggestedPromptBox(code_text, avail_width - 20))
                        next_code_is_suggested_prompt = False
                    else:
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
            text_raw = m.group(2).strip()
            text = format_inline(text_raw)
            style_name = {1: 'H1', 2: 'H2', 3: 'H3', 4: 'H4'}[level]
            flowables.append(Paragraph(text, styles[style_name]))
            # Detect the special "🎯 SUGGESTED PROMPT" heading so the NEXT code block
            # uses the highlighted box.
            if 'SUGGESTED PROMPT' in text_raw.upper():
                next_code_is_suggested_prompt = True
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


# ── Doc Template with Bookmarks + TOC ─────────────────────────────

class WorkbookDocTemplate(BaseDocTemplate):
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
        self.notify('TOCEntry', (level, text, self.page, key))


# ── Page Decorations ──────────────────────────────────────────────

def on_cover_page(canvas, doc):
    canvas.showOutline()


def on_content_page(canvas, doc):
    canvas.saveState()
    width, height = letter

    # Top accent bar (amber for the workbook to differentiate from main guide)
    canvas.setFillColor(AMBER_500)
    canvas.rect(0, height - 6, width, 6, fill=1, stroke=0)

    # Footer line
    canvas.setStrokeColor(BORDER_COLOR)
    canvas.setLineWidth(0.4)
    canvas.line(inch, 0.7 * inch, width - inch, 0.7 * inch)

    # Footer text
    canvas.setFillColor(SLATE_500)
    canvas.setFont('Helvetica', 8.5)
    canvas.drawString(inch, 0.5 * inch, "Build Your Own Prompt File — A Hands-On Workbook")
    canvas.drawRightString(width - inch, 0.5 * inch, f"Page {doc.page}")

    canvas.restoreState()


# ── Page Builders ─────────────────────────────────────────────────

def build_cover(styles, avail_width):
    flows = []
    flows.append(Spacer(1, 1.2 * inch))

    # Decorative accent
    flows.append(Paragraph(
        "<font color='#26a69a'>━━━</font>  <font color='#ff8f00'>WORKBOOK</font>  <font color='#c62828'>━━━</font>",
        ParagraphStyle('CoverAccent', fontName='Helvetica-Bold', fontSize=11,
                       alignment=TA_CENTER, leading=16, charSpacing=3)
    ))
    flows.append(Spacer(1, 24))

    flows.append(Paragraph("Build Your Own", styles['CoverTitle']))
    flows.append(Paragraph("Prompt File", styles['CoverTitle']))
    flows.append(Spacer(1, 12))
    flows.append(HR(avail_width * 0.3, INDIGO_500, 2))
    flows.append(Spacer(1, 18))

    flows.append(Paragraph(
        "A Hands-On Workbook<br/>Inspired by the Priority Builder Case Study",
        styles['CoverSubtitle']
    ))
    flows.append(Spacer(1, 30))

    flows.append(Paragraph(
        "Eight steps. Eight copy-paste prompts. One reusable prompt file you'll use every cycle.",
        styles['CoverDesc']
    ))
    flows.append(Spacer(1, 1.0 * inch))

    info = ParagraphStyle(
        'Info', fontName='Helvetica', fontSize=11, leading=16,
        textColor=SLATE_700, alignment=TA_CENTER
    )
    flows.append(Paragraph("8 Steps  \u2022  6 Suggested Prompts in the Library  \u2022  ~90 minutes", info))
    flows.append(Spacer(1, 30))

    author_style = ParagraphStyle(
        'CoverAuthor', fontName='Helvetica-Bold', fontSize=11, leading=14,
        textColor=INDIGO_700, alignment=TA_CENTER
    )
    flows.append(Paragraph(f"Curated by {AUTHOR_NAME}", author_style))
    flows.append(Spacer(1, 6))

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
    flows = []
    flows.append(Spacer(1, 0.5 * inch))
    flows.append(Paragraph("About This Workbook", styles['SectionTitle']))
    flows.append(AccentHR(avail_width * 0.35))
    flows.append(Spacer(1, 16))

    body = styles['BodyText2']
    h3 = styles['H3']

    flows.append(Paragraph("What This Is", h3))
    flows.append(Paragraph(
        "A self-contained, hands-on workbook that walks you step by step through "
        "building a custom prompt file for one of your recurring tasks \u2014 "
        "using the same pattern Joey used to build his Priority Builder. By the end, "
        "you'll have a tested, team-shareable prompt file that produces high-quality "
        "output for that task, every time.",
        body
    ))
    flows.append(Spacer(1, 8))
    flows.append(Paragraph(
        "Each step contains a <b>SUGGESTED PROMPT</b> in an amber-highlighted box. "
        "Those are copy-paste ready \u2014 paste them into GitHub Copilot Chat (or any AI chat) "
        "and walk through the conversation as instructed.",
        body
    ))

    flows.append(Spacer(1, 14))
    flows.append(Paragraph("How This Was Made", h3))
    flows.append(Paragraph(
        f"This workbook was curated by <b>{AUTHOR_NAME}</b> and created collaboratively "
        "with the help of AI (Anthropic's Claude). The pattern it teaches is real \u2014 "
        "it generalizes from a case study shared internally by our colleague Joey, "
        "whose Priority Builder prompt file inspired the workbook.",
        body
    ))

    flows.append(Spacer(1, 14))
    flows.append(Paragraph("License & Usage", h3))
    flows.append(Paragraph("<b>Free to use for learning purposes only.</b>", body))
    flows.append(Spacer(1, 4))
    flows.append(Paragraph("You are welcome to:", body))
    for item in [
        "Read, study, and practice with this workbook personally or as a team.",
        "Share the PDF internally with colleagues for educational use.",
        "Adapt the workbook structure for your own training material.",
    ]:
        flows.append(Paragraph(f'\u2022  {item}', styles['BulletItem']))

    flows.append(Spacer(1, 8))
    flows.append(Paragraph("Please do not:", body))
    for item in [
        "Resell, relicense, or distribute commercially without permission.",
        "Claim authorship or remove attribution.",
    ]:
        flows.append(Paragraph(f'\u2022  {item}', styles['BulletItem']))

    flows.append(Spacer(1, 14))
    flows.append(Paragraph("Disclaimer & Limitation of Liability", h3))
    flows.append(Paragraph(
        "This workbook is provided <b>\u201cas-is\u201d</b>, for educational and informational "
        "purposes only, without warranties of any kind. AI-generated prompt files may produce "
        "imperfect output \u2014 always review AI output before using it in client or production work. "
        f"<b>{AUTHOR_NAME}</b> and any AI systems used in producing this material shall not be "
        "held liable for any damages or issues arising from the use, misuse, or inability to use this workbook.",
        body
    ))

    flows.append(PageBreak())
    return flows


def build_toc(styles):
    flows = []
    flows.append(Spacer(1, 12))
    flows.append(Paragraph("Table of Contents", styles['SectionTitle']))
    flows.append(AccentHR(4 * inch))
    flows.append(Spacer(1, 10))
    toc = TableOfContents()
    toc.levelStyles = [styles['TOC1'], styles['TOC2'], styles['TOC3']]
    flows.append(toc)
    flows.append(PageBreak())
    return flows


# ── Main ──────────────────────────────────────────────────────────

def main():
    styles = build_styles()
    avail_width = letter[0] - 2 * inch

    doc = WorkbookDocTemplate(
        OUTPUT_FILE,
        pagesize=letter,
        leftMargin=inch, rightMargin=inch,
        topMargin=0.9 * inch, bottomMargin=0.9 * inch,
        title="Build Your Own Prompt File",
        author=AUTHOR_NAME,
        subject="A hands-on workbook for building custom prompt files",
        creator="Generated with the help of AI",
    )

    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='normal')
    doc.addPageTemplates([
        PageTemplate(id='cover', frames=frame, onPage=on_cover_page),
        PageTemplate(id='content', frames=frame, onPage=on_content_page),
    ])

    story = []

    # Cover
    story.extend(build_cover(styles, avail_width))

    # Switch to content template
    story.append(NextPageTemplate('content'))

    # About / License page
    story.extend(build_about_page(styles, avail_width))

    # TOC
    story.extend(build_toc(styles))

    # Body content
    with open(SOURCE_FILE, 'r', encoding='utf-8') as f:
        md_text = f.read()
    body_flowables = md_to_flowables(md_text, avail_width, styles)
    story.extend(body_flowables)

    # Build (multi-pass for TOC)
    doc.multiBuild(story)

    size_kb = os.path.getsize(OUTPUT_FILE) / 1024
    print(f"\u2713 PDF generated: {OUTPUT_FILE}")
    print(f"  Size: {size_kb:.0f} KB")


if __name__ == "__main__":
    main()
