#!/usr/bin/env python3
"""Generate a PDF version of summary_to_share.md using fpdf2."""

from fpdf import FPDF
import re
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FILE = os.path.join(SCRIPT_DIR, "summary_to_share_email.txt")
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "summary_to_share.pdf")

def sanitize(text):
    """Replace Unicode chars unsupported by Helvetica with ASCII equivalents."""
    replacements = {
        "\u2014": "--",   # em dash
        "\u2013": "-",    # en dash
        "\u2018": "'",    # left single quote
        "\u2019": "'",    # right single quote
        "\u201c": '"',    # left double quote
        "\u201d": '"',    # right double quote
        "\u2026": "...",  # ellipsis
        "\u2192": "->",   # right arrow
        "\u2022": "-",    # bullet
        "\u2011": "-",    # non-breaking hyphen
        "\u00a0": " ",    # non-breaking space
        "\u2010": "-",    # hyphen
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    return text


class SummaryPDF(FPDF):
    def header(self):
        pass

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")

    def section_divider(self):
        self.ln(2)
        self.set_draw_color(180, 180, 180)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(4)

    def add_title(self, text):
        self.set_font("Helvetica", "B", 16)
        self.set_text_color(40, 40, 40)
        self.cell(0, 10, sanitize(text), new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def add_subtitle(self, text):
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(100, 100, 100)
        self.multi_cell(0, 5, sanitize(text))
        self.ln(2)

    def add_heading(self, text):
        self.ln(3)
        self.set_font("Helvetica", "B", 13)
        self.set_text_color(50, 50, 50)
        self.cell(0, 8, sanitize(text), new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def add_subheading(self, text):
        self.ln(2)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(60, 60, 60)
        self.cell(0, 7, sanitize(text), new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def add_body(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(50, 50, 50)
        self.multi_cell(0, 5, sanitize(text))
        self.ln(1)

    def add_bullet(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(50, 50, 50)
        bullet_x = self.l_margin + 4
        text_x = self.l_margin + 10
        self.set_x(bullet_x)
        self.cell(6, 5, "-")
        self.set_x(text_x)
        self.multi_cell(self.w - self.r_margin - text_x, 5, sanitize(text))
        self.ln(0.5)

    def add_quote(self, text):
        self.set_font("Helvetica", "I", 10)
        self.set_text_color(80, 80, 80)
        x = self.l_margin + 6
        self.set_x(x)
        self.multi_cell(self.w - self.r_margin - x, 5, sanitize(text))
        self.ln(1)

    def add_data_row(self, label, value):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(50, 50, 50)
        label_w = 55
        self.cell(label_w, 5.5, sanitize(label))
        self.set_font("Helvetica", "", 10)
        self.multi_cell(self.w - self.r_margin - self.l_margin - label_w, 5.5, sanitize(value))
        self.ln(0.5)

    def add_quote_block(self, theme, quote):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(60, 60, 60)
        self.cell(0, 6, sanitize(theme) + ":", new_x="LMARGIN", new_y="NEXT")
        self.set_font("Helvetica", "I", 9.5)
        self.set_text_color(80, 80, 80)
        x = self.l_margin + 6
        self.set_x(x)
        self.multi_cell(self.w - self.r_margin - x, 5, sanitize(quote))
        self.ln(1.5)


def build_pdf():
    with open(INPUT_FILE, "r") as f:
        content = f.read()

    pdf = SummaryPDF()
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()
    pdf.set_margins(18, 15, 18)

    lines = content.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # Skip empty lines
        if not line:
            i += 1
            continue

        # Divider lines
        if line.startswith("——————"):
            pdf.section_divider()
            i += 1
            continue

        # Main title
        if "FY26 PERFORMANCE SUMMARY" in line:
            pdf.add_title(line)
            i += 1
            continue

        # Purpose line
        if line.startswith("Purpose:"):
            pdf.add_subtitle(line)
            i += 1
            continue

        # Section headings (ALL CAPS, standalone)
        if line in [
            "AT A GLANCE",
            "WHAT I'VE ACCOMPLISHED THIS CYCLE",
            "3-MINUTE PITCH — FOR PEOPLE LEAD USE",
            "KEY DATA POINTS — QUICK REFERENCE",
        ]:
            pdf.add_heading(line)
            i += 1
            continue

        if line.startswith("DELIVERY LEAD QUOTES"):
            pdf.add_heading(line)
            i += 1
            continue

        # Pitch section subheadings
        if line.startswith("OPEN —") or line.startswith("DELIVERY RESULTS") or \
           line.startswith("PEOPLE LEADERSHIP") or line.startswith("INNOVATION &") or \
           line.startswith("CLOSE —"):
            pdf.add_subheading(line)
            i += 1
            continue

        # Numbered accomplishment subheadings
        if re.match(r"^\d+\.\s", line) and "[Completed]" in line or "In Progress" in line:
            pdf.add_subheading(line)
            i += 1
            continue

        # Data rows (dot-leader format)
        if ".........." in line:
            parts = re.split(r"\.{3,}", line)
            if len(parts) == 2:
                pdf.add_data_row(parts[0].strip(), parts[1].strip())
            i += 1
            continue

        # DL Quote blocks - theme followed by quoted text
        if line.startswith("Overall delivery:") or line.startswith("Client impact:") or \
           line.startswith("Team & culture:") or line.startswith("People development:") or \
           line.startswith("AI initiative:") or line.startswith("AI enablement model:") or \
           line.startswith("Strategic positioning:"):
            theme = line.rstrip(":")
            i += 1
            if i < len(lines):
                quote = lines[i].strip()
                pdf.add_quote_block(theme, quote)
            i += 1
            continue

        # Instruction/note lines
        if line.startswith("Below is a structured") or line.startswith("Use these direct quotes"):
            pdf.add_quote(line)
            i += 1
            continue

        # Bullet points
        if line.startswith("- "):
            pdf.add_bullet(line[2:])
            i += 1
            continue

        # At a glance items (indented with label: value)
        if line.startswith("Role:") or line.startswith("Team:") or \
           line.startswith("Current Level:") or line.startswith("Completed Priorities:") or \
           line.startswith("Recognition:"):
            parts = line.split(":", 1)
            pdf.add_data_row(parts[0].strip() + ":", parts[1].strip() if len(parts) > 1 else "")
            i += 1
            continue

        # Default: body text
        pdf.add_body(line)
        i += 1

    pdf.output(OUTPUT_FILE)
    print(f"PDF generated: {OUTPUT_FILE}")


if __name__ == "__main__":
    build_pdf()
