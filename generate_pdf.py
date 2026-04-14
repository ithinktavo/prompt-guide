#!/usr/bin/env python3
"""
Generate a single professional PDF from all prompt-guide markdown files.
"""

import re
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, Flowable, Frame, PageTemplate, BaseDocTemplate
)
import hashlib
from reportlab.lib import colors


# ── Configuration ──────────────────────────────────────────────────

PROJECT_DIR = "/Users/gustavoam/Documents/GitHub/prompt-guide"
OUTPUT_FILE = os.path.join(PROJECT_DIR, "prompt-engineering-guide.pdf")

FILES_IN_ORDER = [
    ("README.md", "Introduction"),
    ("prompt-guide-topics.md", "Topic Outline"),
    ("workbook.md", "Hands-On Workbook"),
    ("prompt-guide.md", "Quick Reference"),
    ("meta-prompt.md", "Meta-Prompt File"),
]

# Colors
BRAND_DARK = HexColor("#1a1a2e")
BRAND_ACCENT = HexColor("#0f3460")
BRAND_LIGHT = HexColor("#e8eaf6")
CODE_BG = HexColor("#f5f5f5")
LINK_COLOR = HexColor("#1565c0")
BORDER_COLOR = HexColor("#cccccc")
HEADING_COLOR = HexColor("#1a1a2e")
SUBHEADING_COLOR = HexColor("#0f3460")


# ── Custom Flowables ──────────────────────────────────────────────

class SectionDivider(Flowable):
    """A horizontal line divider between major sections."""
    def __init__(self, width, color=BRAND_ACCENT, thickness=2):
        Flowable.__init__(self)
        self.width = width
        self.color = color
        self.thickness = thickness
        self.height = 20

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, 10, self.width, 10)


class CodeBlock(Flowable):
    """A styled code block with background."""
    def __init__(self, text, width, style):
        Flowable.__init__(self)
        self._text = text
        self._width = width
        self._style = style
        # Calculate height
        lines = text.split('\n')
        self._line_height = 11
        self._padding = 10
        self.height = len(lines) * self._line_height + self._padding * 2
        self.width = width

    def draw(self):
        # Background
        self.canv.setFillColor(CODE_BG)
        self.canv.setStrokeColor(BORDER_COLOR)
        self.canv.setLineWidth(0.5)
        self.canv.roundRect(0, 0, self._width, self.height, 4, fill=1, stroke=1)

        # Text
        self.canv.setFillColor(black)
        self.canv.setFont("Courier", 8)
        lines = self._text.split('\n')
        y = self.height - self._padding - 8
        for line in lines:
            # Truncate long lines
            if len(line) > 95:
                line = line[:92] + "..."
            self.canv.drawString(self._padding, y, line)
            y -= self._line_height


# ── Styles ────────────────────────────────────────────────────────

def build_styles():
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        name='CoverTitle',
        fontName='Helvetica-Bold',
        fontSize=32,
        leading=38,
        textColor=BRAND_DARK,
        alignment=TA_CENTER,
        spaceAfter=12,
    ))

    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        fontName='Helvetica',
        fontSize=14,
        leading=20,
        textColor=BRAND_ACCENT,
        alignment=TA_CENTER,
        spaceAfter=6,
    ))

    styles.add(ParagraphStyle(
        name='SectionTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=30,
        textColor=BRAND_DARK,
        spaceBefore=0,
        spaceAfter=16,
        alignment=TA_CENTER,
    ))

    styles.add(ParagraphStyle(
        name='H1',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=26,
        textColor=HEADING_COLOR,
        spaceBefore=24,
        spaceAfter=10,
    ))

    styles.add(ParagraphStyle(
        name='H2',
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=22,
        textColor=SUBHEADING_COLOR,
        spaceBefore=18,
        spaceAfter=8,
    ))

    styles.add(ParagraphStyle(
        name='H3',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=18,
        textColor=SUBHEADING_COLOR,
        spaceBefore=14,
        spaceAfter=6,
    ))

    styles.add(ParagraphStyle(
        name='H4',
        fontName='Helvetica-BoldOblique',
        fontSize=11,
        leading=15,
        textColor=SUBHEADING_COLOR,
        spaceBefore=10,
        spaceAfter=4,
    ))

    styles.add(ParagraphStyle(
        name='BodyText2',
        fontName='Helvetica',
        fontSize=10,
        leading=14.5,
        textColor=black,
        spaceBefore=2,
        spaceAfter=6,
        alignment=TA_JUSTIFY,
    ))

    styles.add(ParagraphStyle(
        name='BulletItem',
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=black,
        leftIndent=20,
        spaceBefore=1,
        spaceAfter=1,
        bulletIndent=8,
    ))

    styles.add(ParagraphStyle(
        name='BulletItem2',
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=black,
        leftIndent=40,
        spaceBefore=1,
        spaceAfter=1,
        bulletIndent=28,
    ))

    styles.add(ParagraphStyle(
        name='BlockQuote',
        fontName='Helvetica-Oblique',
        fontSize=10,
        leading=14,
        textColor=HexColor("#555555"),
        leftIndent=20,
        rightIndent=20,
        spaceBefore=6,
        spaceAfter=6,
        borderPadding=8,
    ))

    styles.add(ParagraphStyle(
        name='TOCEntry',
        fontName='Helvetica',
        fontSize=12,
        leading=20,
        textColor=BRAND_ACCENT,
        leftIndent=20,
    ))

    styles.add(ParagraphStyle(
        name='TOCSection',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=22,
        textColor=BRAND_DARK,
        spaceBefore=4,
    ))

    styles.add(ParagraphStyle(
        name='InlineCode',
        fontName='Courier',
        fontSize=9,
        leading=13,
        textColor=HexColor("#c62828"),
    ))

    return styles


# ── Markdown Parser ───────────────────────────────────────────────

def escape_xml(text):
    """Escape XML special chars for ReportLab paragraphs."""
    text = text.replace('&', '&amp;')
    text = text.replace('<', '&lt;')
    text = text.replace('>', '&gt;')
    return text


def format_inline(text):
    """Handle inline markdown: bold, italic, code, links."""
    # Escape XML first
    text = escape_xml(text)

    # Step 1: Extract inline code spans and replace with placeholders
    code_spans = []
    def replace_code(m):
        code_spans.append(m.group(1))
        return f'\x00CODE{len(code_spans)-1}\x00'
    text = re.sub(r'`([^`]+)`', replace_code, text)

    # Step 2: Process bold/italic on the remaining text (no code spans)
    # Bold+italic: ***text***
    text = re.sub(r'\*\*\*(.+?)\*\*\*', r'<b><i>\1</i></b>', text)
    # Bold: **text**
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    # Italic: *text* (not inside words)
    text = re.sub(r'(?<!\w)\*([^*]+?)\*(?!\w)', r'<i>\1</i>', text)

    # Links: [text](url) → just text
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)

    # Step 3: Restore code spans as formatted <font> tags
    for i, code in enumerate(code_spans):
        text = text.replace(
            f'\x00CODE{i}\x00',
            f'<font name="Courier" size="9" color="#c62828">{code}</font>'
        )

    return text


def parse_table(lines, styles, avail_width):
    """Parse markdown table lines into a ReportLab Table."""
    rows = []
    for line in lines:
        line = line.strip()
        if line.startswith('|'):
            line = line[1:]
        if line.endswith('|'):
            line = line[:-1]
        cells = [c.strip() for c in line.split('|')]
        rows.append(cells)

    if len(rows) < 2:
        return None

    # Remove separator row (second row with ----)
    header = rows[0]
    data_rows = []
    for row in rows[1:]:
        if all(re.match(r'^[-:]+$', cell.strip()) for cell in row if cell.strip()):
            continue
        data_rows.append(row)

    if not data_rows:
        return None

    # Normalize column count
    ncols = len(header)
    for i, row in enumerate(data_rows):
        while len(row) < ncols:
            row.append('')
        data_rows[i] = row[:ncols]

    # Build table data with Paragraphs
    cell_style = ParagraphStyle(
        'TableCell', fontName='Helvetica', fontSize=8.5, leading=11,
        textColor=black, alignment=TA_LEFT
    )
    header_style = ParagraphStyle(
        'TableHeader', fontName='Helvetica-Bold', fontSize=8.5, leading=11,
        textColor=white, alignment=TA_LEFT
    )

    table_data = []
    header_cells = [Paragraph(format_inline(h), header_style) for h in header]
    table_data.append(header_cells)

    for row in data_rows:
        table_data.append([Paragraph(format_inline(c), cell_style) for c in row])

    # Calculate column widths
    col_width = avail_width / ncols
    col_widths = [col_width] * ncols

    table = Table(table_data, colWidths=col_widths, repeatRows=1)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), BRAND_ACCENT),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8.5),
        ('ALIGN', (0, 0), (-1, 0), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('BACKGROUND', (0, 1), (-1, -1), white),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, BRAND_LIGHT]),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
    ]))

    return table


def md_to_flowables(md_text, styles, avail_width):
    """Convert markdown text to a list of ReportLab flowables."""
    flowables = []
    lines = md_text.split('\n')
    i = 0
    in_code_block = False
    code_lines = []

    while i < len(lines):
        line = lines[i]

        # Code blocks
        if line.strip().startswith('```'):
            if in_code_block:
                # End code block
                code_text = '\n'.join(code_lines)
                if code_text.strip():
                    flowables.append(Spacer(1, 4))
                    flowables.append(CodeBlock(code_text, avail_width - 20, styles))
                    flowables.append(Spacer(1, 4))
                code_lines = []
                in_code_block = False
            else:
                in_code_block = True
                code_lines = []
            i += 1
            continue

        if in_code_block:
            code_lines.append(line)
            i += 1
            continue

        stripped = line.strip()

        # Skip empty lines
        if not stripped:
            i += 1
            continue

        # Horizontal rules
        if re.match(r'^[-*_]{3,}\s*$', stripped):
            flowables.append(Spacer(1, 6))
            flowables.append(SectionDivider(avail_width - 40, BORDER_COLOR, 0.5))
            flowables.append(Spacer(1, 6))
            i += 1
            continue

        # Headings
        heading_match = re.match(r'^(#{1,4})\s+(.*)', stripped)
        if heading_match:
            level = len(heading_match.group(1))
            text = heading_match.group(2).strip()
            text = format_inline(text)

            style_map = {1: 'H1', 2: 'H2', 3: 'H3', 4: 'H4'}
            style_name = style_map.get(level, 'H4')
            flowables.append(Paragraph(text, styles[style_name]))
            i += 1
            continue

        # Tables
        if stripped.startswith('|') and '|' in stripped[1:]:
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                table_lines.append(lines[i])
                i += 1
            table = parse_table(table_lines, styles, avail_width - 10)
            if table:
                flowables.append(Spacer(1, 6))
                flowables.append(table)
                flowables.append(Spacer(1, 6))
            continue

        # Blockquotes
        if stripped.startswith('>'):
            quote_lines = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                q = re.sub(r'^>\s*', '', lines[i].strip())
                quote_lines.append(q)
                i += 1
            quote_text = ' '.join(quote_lines)
            quote_text = format_inline(quote_text)
            flowables.append(Paragraph(quote_text, styles['BlockQuote']))
            continue

        # Bullet lists
        bullet_match = re.match(r'^(\s*)([-*+]|\d+[.)]) (.+)', stripped)
        if bullet_match:
            indent = len(line) - len(line.lstrip())
            bullet_char = bullet_match.group(2)
            text = bullet_match.group(3)
            text = format_inline(text)

            if indent >= 2 or bullet_char.startswith(' '):
                style_name = 'BulletItem2'
            else:
                style_name = 'BulletItem'

            # Use a bullet character
            if re.match(r'\d+', bullet_char):
                prefix = bullet_char
            else:
                prefix = '\u2022'

            flowables.append(Paragraph(
                f'{prefix}  {text}', styles[style_name]
            ))
            i += 1
            continue

        # HTML comments (skip)
        if stripped.startswith('<!--'):
            while i < len(lines) and '-->' not in lines[i]:
                i += 1
            i += 1
            continue

        # Regular paragraph
        para_lines = []
        while i < len(lines):
            l = lines[i].strip()
            if not l or l.startswith('#') or l.startswith('```') or l.startswith('|') or l.startswith('>') or re.match(r'^[-*+] ', l) or re.match(r'^\d+[.)] ', l) or re.match(r'^[-*_]{3,}$', l):
                break
            para_lines.append(l)
            i += 1

        if para_lines:
            text = ' '.join(para_lines)
            text = format_inline(text)
            flowables.append(Paragraph(text, styles['BodyText2']))

    return flowables


# ── Page Templates ────────────────────────────────────────────────

def header_footer(canvas, doc):
    """Add header and footer to each page."""
    canvas.saveState()
    width, height = letter

    # Footer
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(HexColor("#888888"))
    canvas.drawString(inch, 0.5 * inch, "Prompt Engineering Guide")
    canvas.drawRightString(width - inch, 0.5 * inch, f"Page {doc.page}")

    # Thin line above footer
    canvas.setStrokeColor(BORDER_COLOR)
    canvas.setLineWidth(0.5)
    canvas.line(inch, 0.7 * inch, width - inch, 0.7 * inch)

    canvas.restoreState()


def cover_header_footer(canvas, doc):
    """No header/footer on cover page, but show outline panel."""
    canvas.showOutline()


# ── Build PDF ─────────────────────────────────────────────────────

def build_cover(styles, avail_width):
    """Build the cover page."""
    flowables = []

    flowables.append(Spacer(1, 2 * inch))

    # Title
    flowables.append(Paragraph("Prompt Engineering Guide", styles['CoverTitle']))
    flowables.append(Spacer(1, 8))

    # Divider
    flowables.append(SectionDivider(avail_width * 0.5, BRAND_ACCENT, 2))
    flowables.append(Spacer(1, 16))

    # Subtitle
    flowables.append(Paragraph(
        "A hands-on guide to writing effective prompts,<br/>"
        "building reusable templates, and automating<br/>"
        "client work with AI coding tools.",
        styles['CoverSubtitle']
    ))
    flowables.append(Spacer(1, 24))

    flowables.append(Paragraph(
        "GitHub Copilot  \u2022  Windsurf  \u2022  Claude Code",
        ParagraphStyle('ToolList', fontName='Helvetica', fontSize=12,
                      leading=16, textColor=BRAND_ACCENT, alignment=TA_CENTER)
    ))

    flowables.append(Spacer(1, 1.5 * inch))

    # Info box
    info_style = ParagraphStyle(
        'CoverInfo', fontName='Helvetica', fontSize=10, leading=15,
        textColor=HexColor("#555555"), alignment=TA_CENTER
    )
    flowables.append(Paragraph("35 Exercises  \u2022  9 Modules  \u2022  ~3.5 Hours", info_style))
    flowables.append(Spacer(1, 6))
    flowables.append(Paragraph("Core concepts are tool-agnostic \u2014 learn once, apply anywhere.", info_style))

    flowables.append(PageBreak())
    return flowables


def build_toc(styles, avail_width):
    """Build a table of contents page."""
    flowables = []
    flowables.append(Paragraph("Table of Contents", styles['SectionTitle']))
    flowables.append(Spacer(1, 12))

    toc_items = [
        ("1", "Introduction", "Overview, learning path, and how to use this guide"),
        ("2", "Topic Outline", "Full curriculum with 9 parts covering foundations through advanced"),
        ("3", "Hands-On Workbook", "35 exercises across 9 modules \u2014 the main learning path"),
        ("", "\u2003 Modules 1\u20134: Core Concepts", "Prompt foundations, templates, meta-prompts, advanced strategies"),
        ("", "\u2003 Module 5: GitHub Copilot", "Context references, slash commands, custom instructions"),
        ("", "\u2003 Module 6: Windsurf", "Cascade, rules, workflows (skip if not available)"),
        ("", "\u2003 Module 7: Claude Code", "CLAUDE.md, skills, hooks (skip if not available)"),
        ("", "\u2003 Modules 8\u20139: Client Work", "Automating tasks, validation, end-to-end challenge"),
        ("4", "Quick Reference", "One-page card with patterns, templates, and tool features"),
        ("5", "Meta-Prompt File", "Ready-to-use prompt that generates prompts"),
    ]

    for num, title, desc in toc_items:
        if num:
            flowables.append(Spacer(1, 4))
            text = f'<b>{num}. {title}</b> \u2014 <i>{desc}</i>'
            flowables.append(Paragraph(text, styles['TOCSection']))
        else:
            text = f'{title} \u2014 <i>{desc}</i>'
            flowables.append(Paragraph(text, styles['TOCEntry']))

    flowables.append(PageBreak())
    return flowables


class BookmarkedDocTemplate(BaseDocTemplate):
    """Doc template that adds PDF outline bookmarks from heading-styled paragraphs."""

    # Map style name → outline level (0 = top, deeper = higher numbers)
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

        # Strip HTML tags from the text for the bookmark title
        text = re.sub(r'<[^>]+>', '', flowable.getPlainText() or '')
        text = text.strip()
        if not text:
            return

        # Create a unique bookmark key
        key = hashlib.md5(f'{text}-{self.page}-{level}'.encode()).hexdigest()[:12]
        self.canv.bookmarkPage(key)
        self.canv.addOutlineEntry(text, key, level=level, closed=(level >= 2))


def main():
    styles = build_styles()
    avail_width = letter[0] - 2 * inch

    doc = BookmarkedDocTemplate(
        OUTPUT_FILE,
        pagesize=letter,
        leftMargin=inch,
        rightMargin=inch,
        topMargin=inch,
        bottomMargin=inch,
        title="Prompt Engineering Guide",
        author="Team",
        subject="AI Prompting for Developers",
    )


    # Page templates
    frame = Frame(
        doc.leftMargin, doc.bottomMargin,
        doc.width, doc.height,
        id='normal'
    )

    doc.addPageTemplates([
        PageTemplate(id='cover', frames=frame, onPage=cover_header_footer),
        PageTemplate(id='content', frames=frame, onPage=header_footer),
    ])

    story = []

    # Cover page
    story.extend(build_cover(styles, avail_width))

    # Switch to content template
    from reportlab.platypus.doctemplate import NextPageTemplate
    story.append(NextPageTemplate('content'))

    # Table of contents
    story.extend(build_toc(styles, avail_width))

    # Process each file
    for idx, (filename, section_title) in enumerate(FILES_IN_ORDER):
        filepath = os.path.join(PROJECT_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            md_text = f.read()

        # Section title page for major sections
        if idx > 0:
            story.append(PageBreak())

        # Section header
        story.append(Spacer(1, 12))
        section_num = idx + 1
        story.append(Paragraph(
            f"Section {section_num}",
            ParagraphStyle('SectionNum', fontName='Helvetica', fontSize=12,
                          leading=16, textColor=BRAND_ACCENT, alignment=TA_LEFT)
        ))
        story.append(Paragraph(section_title, styles['SectionTitle']))
        story.append(SectionDivider(avail_width, BRAND_ACCENT, 1.5))
        story.append(Spacer(1, 8))

        # Source file note
        story.append(Paragraph(
            f'<i>Source: {filename}</i>',
            ParagraphStyle('SourceNote', fontName='Helvetica-Oblique', fontSize=8,
                          leading=10, textColor=HexColor("#999999"))
        ))
        story.append(Spacer(1, 12))

        # Parse markdown content
        content_flowables = md_to_flowables(md_text, styles, avail_width)
        story.extend(content_flowables)

    # Build
    doc.build(story)
    print(f"PDF generated: {OUTPUT_FILE}")
    print(f"Size: {os.path.getsize(OUTPUT_FILE) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
