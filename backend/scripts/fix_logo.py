"""One-off step 2: repaint the logo wordmark on cover / wallet / contacts pages.
Detects the green checkmark circle, covers only the wordmark to its right
with the sampled background, and writes 'blockscaner' in the original color.
Runs on the already-rebranded PDF (footers/body already fixed)."""
import fitz

DST = "/app/frontend/public/docs/blockscaner-tesoreria-aziendale.pdf"
LOGO_PAGES = [0, 19, 21]  # pages 1, 20, 22


def logo_fix(page):
    pm = page.get_pixmap(matrix=fitz.Matrix(1, 1), alpha=False)
    w, h = pm.width, pm.height
    px = pm.pixel
    # 1) find the green checkmark circle in the top-left quadrant
    greens = []
    for y in range(0, h // 3, 3):
        for x in range(0, w // 3, 3):
            r, g, b = px(x, y)
            if g > 150 and g > r + 45 and g > b + 30:
                greens.append((x, y))
    if not greens:
        print(f"page {page.number + 1}: no green mark found")
        return
    gx0 = min(g[0] for g in greens); gx1 = max(g[0] for g in greens)
    gy0 = min(g[1] for g in greens); gy1 = max(g[1] for g in greens)
    cy = (gy0 + gy1) // 2
    # 2) background = page corner pixel; find contrast pixels right of the circle
    bg = px(15, 15)
    def contrast(x, y):
        c = px(x, y)
        return sum((c[i] - bg[i]) ** 2 for i in range(3)) > 9000
    cols = {}
    fg_sum, fg_n = [0, 0, 0], 0
    for x in range(gx1 + 12, min(w, gx1 + 420)):
        n = 0
        for y in range(max(0, gy0 - 8), min(h, gy1 + 8)):
            if contrast(x, y):
                n += 1
                c = px(x, y)
                for i in range(3):
                    fg_sum[i] += c[i]
                fg_n += 1
        if n > 2:
            cols[x] = n
    if not cols:
        # fallback (cover page): same template, logo at the measured spot
        tx0, ty0, tx1, ty1 = 143, 122, 429, 199
        lum = 0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2]
        fg = (255, 255, 255) if lum < 140 else (25, 25, 25)
    else:
        tx0, tx1 = min(cols) - 6, max(cols) + 10
        ty0, ty1 = gy0 - 10, gy1 + 10
        fg = tuple(v // fg_n for v in fg_sum) if fg_n else (255, 255, 255)
    # sample the LOCAL background: strip right above the wordmark (cover has a gradient)
    strip = [px(x, max(0, ty0 - 14)) for x in range(tx0, tx1, 4)]
    bg = tuple(sum(c[i] for c in strip) // len(strip) for i in range(3))
    rect = fitz.Rect(tx0, ty0, tx1, ty1)
    page.draw_rect(rect, color=None, fill=tuple(v / 255 for v in bg))
    fs = (ty1 - ty0) * 0.66
    page.insert_text((tx0 + 2, cy + fs * 0.34), "blockscaner",
                     fontname="hebo", fontsize=fs, color=tuple(v / 255 for v in fg))
    print(f"page {page.number + 1}: logo wordmark repainted rect={rect} fg={fg}", flush=True)


import os
doc = fitz.open(DST)
for p in LOGO_PAGES:
    logo_fix(doc[p])
doc.save(DST + ".tmp", garbage=3, deflate=True)
doc.close()
os.replace(DST + ".tmp", DST)
print("done")
