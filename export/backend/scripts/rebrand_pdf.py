"""One-off: rebrand the treasury report PDF - replaces ONLY the brand name
(Young Platform -> Blockscaner), keeping every other element identical.
v2: dedupes overlapping search hits (search_for is case-insensitive),
samples text color robustly, and repaints the vector logo wordmark on the
cover / wallet / contacts pages (not extractable text).
"""
import fitz  # pymupdf

SRC = "/tmp/report.pdf"
DST = "/app/frontend/public/docs/blockscaner-tesoreria-aziendale.pdf"

# longest first so dedupe keeps the full phrase
REPLACEMENTS = [
    ("YOUNG PLATFORM ALL RIGHTS RESERVED", "BLOCKSCANER ALL RIGHTS RESERVED"),
    ("YOUNGPLATFORM.COM", "BLOCKSCANER"),
    ("Young Platform", "Blockscaner"),
    ("young platform", "blockscaner"),
]

ZOOM = 2.0


def sample_bg_fg(page, rect):
    pm = page.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=rect, alpha=False)
    w, h = pm.width, pm.height
    px = pm.pixel
    if w < 4 or h < 4:
        return (0.1, 0.1, 0.1), (0.9, 0.9, 0.9)
    edges = []
    for x in range(0, w, 2):
        edges.append(px(x, 0)); edges.append(px(x, h - 1))
    for y in range(0, h, 2):
        edges.append(px(0, y)); edges.append(px(w - 1, y))
    bg = tuple(sum(c[i] for c in edges) // len(edges) for i in range(3))
    # fg = average of the 8% of inner pixels furthest from bg
    scored = []
    for y in range(1, h - 1):
        for x in range(1, w - 1):
            c = px(x, y)
            d = sum((c[i] - bg[i]) ** 2 for i in range(3))
            scored.append((d, c))
    scored.sort(key=lambda t: -t[0])
    top = scored[: max(8, len(scored) // 12)] or [(0, bg)]
    fg = tuple(sum(c[1][i] for c in top) // len(top) for i in range(3))
    return tuple(v / 255 for v in bg), tuple(v / 255 for v in fg)


def dedupe(rects):
    """Drop rects that intersect an already-kept (earlier = longer) match."""
    kept = []
    for r, new, old in rects:
        if any(r.intersects(k[0]) for k in kept):
            continue
        kept.append((r, new, old))
    return kept


def insert_fit(page, rect, text, fg):
    fs = max(4.0, rect.height * 0.78)
    while fitz.get_text_length(text, fontname="hebo", fontsize=fs) > rect.width * 1.3 and fs > 4:
        fs -= 0.5
    page.insert_text((rect.x0, rect.y1 - rect.height * 0.14), text,
                     fontname="hebo", fontsize=fs, color=fg)


def main():
    doc = fitz.open(SRC)
    total = 0
    for page in doc:
        hits = []
        for old, new in REPLACEMENTS:
            for r in page.search_for(old):
                hits.append((fitz.Rect(r), new, old))
        hits = dedupe(hits)
        if not hits:
            continue
        entries = []
        for rect, new, old in hits:
            bg, fg = sample_bg_fg(page, rect)
            entries.append((rect, new, fg))
            page.add_redact_annot(rect, fill=bg)
        page.apply_redactions()
        for rect, new, fg in entries:
            insert_fit(page, rect, new, fg)
            total += 1
        print(f"page {page.number + 1}: {len(entries)} replacements", flush=True)

    doc.save(DST, garbage=3, deflate=True)
    print(f"saved {DST} with {total} text replacements")


main()
