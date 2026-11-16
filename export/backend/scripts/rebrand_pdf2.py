"""One-off: raster rebrand of PDF CRYPTO.pdf (image-only pages).
Uses measured fixed coordinates (page is 1920x1080 at scale 1):
- pages with a dark top band (1, 10): white 'young platform' wordmark at
  x[149-419] y[140-179], green circle at (73,130)-(132,190)
- page 24 (dark contact): same logo + email row at y ~687-699
- all pages: footer strip repainted with BLOCKSCANER
"""
import fitz
from PIL import Image, ImageDraw, ImageFont

SRC = "/tmp/pdf_crypto.pdf"
DST = "/app/frontend/public/docs/blockscaner-pagamenti-internazionali.pdf"
MARK = "/app/frontend/src/assets/brand/mark.png"
SCALE = 1

# corner logos measured on the full-res render (1920x1080).
# p1 & p24: circle (73,130)-(132,190) wordmark (149,140)-(419,179)
# p10:      circle (72,126)-(140,194) wordmark (159,137)-(466,181)
LOGO_PAGES = {
    0:  ((70, 126, 136, 194), (146, 134, 424, 184)),
    9:  ((68, 122, 144, 198), (156, 131, 472, 186)),
    23: ((70, 126, 136, 194), (146, 134, 424, 184)),
}
CONTACT_PAGE = 23
# contact page rows measured on the full-res render (1920x1080):
# names y 569..612, roles y 631..651, emails y 687..707
ROLE_ROW = (70, 628, 780, 654)
EMAIL_ROW = (70, 684, 820, 710)
ROLES = [("Account & Sales Manager", 76), ("Business Developer", 497)]
EMAIL_1 = ("Fabiomantovani@blockscaner.com", 77)
EMAIL_2 = ("Giusymora@blockscaner.com", 497)


def font(sz):
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
              "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(p, sz)
        except Exception:
            pass
    return ImageFont.load_default()


def s(v):
    return int(v * SCALE)


def main():
    doc = fitz.open(SRC)
    mark = Image.open(MARK).convert("RGBA")
    out = fitz.open()

    for page in doc:
        pno = page.number
        pm = page.get_pixmap(matrix=fitz.Matrix(1, 1), alpha=False)  # render at 1x = 1920x1080
        img = Image.frombytes("RGB", (pm.width, pm.height), pm.samples)
        dr = ImageDraw.Draw(img)
        w, h = img.size
        px = img.load()

        corners = [px[8, 8], px[w - 9, 8], px[8, h - 9], px[w - 9, h - 9]]
        avg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))
        dark = sum(avg) / 3 < 110

        # ---------- logo repaint (per-page measured coords) ----------
        if pno in LOGO_PAGES:
            circle, word = LOGO_PAGES[pno]
            cx0, cy0, cx1, cy1 = circle
            wx0, wy0, wx1, wy1 = word
            # background sampled just above the wordmark band (avoids the giant title below)
            bg_strip = [px[x, cy0 - 6] for x in range(cx0, wx1, 4)]
            bg = tuple(sum(c[i] for c in bg_strip) // len(bg_strip) for i in range(3))
            dr.rectangle([cx0 - 4, cy0 - 4, wx1 + 4, wy1 + 4], fill=bg)
            ch = cy1 - cy0
            m = mark.resize((ch, ch))
            img.paste(m, (cx0, cy0), m)
            # wordmark sized to match the original lowercase height (~38px)
            fl = font(46)
            fg = (245, 245, 245) if dark else (22, 160, 100)
            dr.text((cx1 + int(ch * 0.5), cy0 + int(ch * 0.12)), "Blockscaner",
                    font=fl, fill=fg)
            print(f"page {pno + 1}: logo ({'dark' if dark else 'light'})")

        # ---------- contact page roles + emails ----------
        if pno == CONTACT_PAGE:
            rx0, ry0, rx1, ry1 = ROLE_ROW
            dr.rectangle([rx0 - 10, ry0 - 6, rx1 + 10, ry1 + 6], fill=avg)
            f_role = font(34)
            for txt, x in ROLES:
                dr.text((x, ry0 + 6), txt, font=f_role, fill=(200, 200, 200))
            ex0, ey0, ex1, ey1 = EMAIL_ROW
            dr.rectangle([ex0 - 10, ey0 - 6, ex1 + 10, ey1 + 6], fill=avg)
            f_em = font(34)
            dr.text((EMAIL_1[1], ey0 + 8), EMAIL_1[0], font=f_em, fill=(235, 235, 235))
            dr.text((EMAIL_2[1], ey0 + 8), EMAIL_2[0], font=f_em, fill=(235, 235, 235))
            print(f"page {pno + 1}: roles + emails")

        # ---------- footer strip (old texts sit ~28px above the page bottom) ----------
        fbg = px[w // 2, h - 5]
        strip_h = 72
        dr.rectangle([0, h - strip_h, w, h], fill=fbg)
        foot_col = (140, 142, 145) if dark else (150, 152, 155)
        f_foot = font(20)
        dr.text((40, h - 32), "BLOCKSCANER", font=f_foot, fill=foot_col)
        rights = "© 2025 BLOCKSCANER ALL RIGHTS RESERVED."
        tw = dr.textlength(rights, font=f_foot)
        dr.text((w - 40 - tw, h - 32), rights, font=f_foot, fill=foot_col)

        pix = fitz.Pixmap(fitz.csRGB, img.width, img.height, img.tobytes(), False)
        newp = out.new_page(width=page.rect.width, height=page.rect.height)
        newp.insert_image(newp.rect, pixmap=pix)

    out.save(DST, garbage=3, deflate=True)
    print(f"saved {DST}")


main()
