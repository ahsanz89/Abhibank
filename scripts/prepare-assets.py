"""
One-off asset pipeline: converts the original abhibank.com uploads (extracted
to RAW) into optimised WebP files under public/assets with semantic names.

Usage: python3 scripts/prepare-assets.py <path-to-abhibank-assets>
Requires Pillow. Output is committed, so this only needs re-running when the
source assets change.
"""
import os, re, sys, glob
from PIL import Image

RAW = sys.argv[1] if len(sys.argv) > 1 else "../raw/abhibank-assets"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets")

def src(pattern):
    m = sorted(glob.glob(os.path.join(RAW, pattern)))
    if not m:
        raise SystemExit("missing " + pattern)
    return m[0]

MAP = {
  # brand
  "brand/logo-white.webp": ("2025/05/AMB-ENG-White-1.webp", 600),
  "brand/icon-mark.png": ("2026/03/cropped-Icon-wrapper-3-150x150.webp", 150),
  "brand/mascot.webp": ("2026/07/Mask-group-2-246x300.png", 500),
  "brand/head-office.webp": ("2026/03/abhi-building1-2-768x528.png", 900),
  # home product icons
  "icons/deposits.webp": ("2025/05/Vector-Smart-Object.png", 160),
  "icons/loans.webp": ("2025/05/Vector-Smart-Object-1.png", 160),
  "icons/digital.webp": ("2025/05/Vector-Smart-Object-2.png", 160),
  "icons/mission.webp": ("2025/06/Group-1-1.webp", 160),
  "icons/vision.webp": ("2025/06/Group-3-1.webp", 160),
  # deposit products
  "products/niswan-rozana-munafa.webp": ("2026/03/Artboard-10@3x-1.png", 320),
  "products/asaan-account.webp": ("2026/03/Artboard-12@3x-1.png", 320),
  "products/sahulat-current-account.webp": ("2026/03/Artboard-13@3x-1.png", 320),
  "products/rozana-munafa.webp": ("2026/03/Artboard-14@3x-1.png", 320),
  "products/aitemad-bachat-account.webp": ("2026/03/Artboard-15@3x-1-1*.png", 320),
  "products/muhaffiz-term-deposit.webp": ("2026/03/Artboard-16@3x-1.png", 320),
  "products/tahafuz-term-deposit.webp": ("2026/03/Artboard-17@3x-1*.png", 320),
  "products/sahulat-plus-current-account.webp": ("2026/03/Artboard-19@3x-1.png", 320),
  # loan products
  "products/tractor-loan.webp": ("2026/03/Artboard-1-copy-8@3x-1.png", 320),
  "products/niswan-karza.webp": ("2026/03/e04cef7c03a5f93493be3b2a498de20ba7d72e43*.png", 320),
  "products/light-commercial-vehicle-loan.webp": ("2026/03/Artboard-1-copy-7@3x-1.png", 320),
  "products/karobari-karza.webp": ("2026/03/Artboard-1-copy-5@3x-1-1.png", 320),
  "products/kashtkar-karza.webp": ("2026/03/Artboard-1-copy-3@3x-1.png", 320),
  "products/maweshi-karza.webp": ("2026/03/Artboard-1-copy-4@3x-1.png", 320),
  "products/sunheri-karza.webp": ("2026/03/Artboard-1-copy-6@3x-1.png", 320),
  "products/house-loan-renovation-improvement.webp": ("2026/03/Artboard-1-copy-2@3x-1.png", 320),
  "products/motorcycle-loan.webp": ("2026/03/Artboard-1-copy@3x-1-1.png", 320),
  # campaign banners (home slider)
  "banners/ipo-live.webp": ("2026/11/live-ipo.jpeg", 1600),
  "banners/ipo-opens.webp": ("2026/11/ipo1.webp", 1600),
  "banners/ipo-bigger-step.webp": ("2026/11/1600x531-Bank-Website-Banner-scaled.webp", 1600),
  "banners/ipo-details.webp": ("2026/10/ipo.jpeg", 1600),
  "banners/ipo-oversubscribed.webp": ("2026/10/IPO-banner.png", 1600),
  "banners/financial-freedom.webp": ("2026/07/Financial-freedom.jpeg", 1600),
  "banners/ewa.webp": ("2026/07/KV-2-EWA*.jpeg", 1600),
  "banners/bills.webp": ("2026/07/KV-6-Bill*.jpeg", 1600),
  "banners/gold.webp": ("2026/07/KV-3-Gold*.jpeg", 1600),
  "banners/digital-account.webp": ("2026/07/KV-6-Digital*.jpeg", 1600),
  "banners/freedom-for-all.webp": ("2026/07/KV-5-freedom*.jpeg", 1600),
  "banners/sunwai.webp": ("2026/09/Abhi-Bank-Sunwai*.png", 1600),
  "banners/notice.webp": ("2026/09/Abhi-notice.jpeg", 1600),
  "banners/payday-ewa.webp": ("2026/06/Homeimage.jpeg", 1600),
  # app
  "app/phones.webp": ("2026/05/image-5-768x668.png", 900),
  "app/feature-transfer.webp": ("2026/10/Column-1.webp", 500),
  "app/feature-bills.webp": ("2026/10/Column-2.webp", 500),
  "app/feature-secure.webp": ("2026/10/Column.webp", 500),
  "app/walkthrough-salary-advance.webp": ("2026/04/1-1-172x300.webp", 400),
  "app/walkthrough-gold-topup.webp": ("2026/04/2-1-174x300.webp", 400),
  "app/walkthrough-rollover.webp": ("2026/04/3-1-1-172x300.webp", 400),
  # about / history
  "about/acquisition.webp": ("2025/06/image-6-1.jpg", 1200),
  "about/history-2008.webp": ("2026/04/cdee77965102be140d8f011fce9b3233cc7614c0*.png", 700),
  "about/history-2009.webp": ("2026/04/Frame-11-1-300x197.png", 500),
  "about/history-2010.webp": ("2026/04/pk-1.svg", 0),
  "about/history-2011.webp": ("2026/04/Rectangle-7.png", 500),
  "about/history-2012.webp": ("2026/04/rs-1.webp", 400),
  "about/history-2013.webp": ("2026/04/Finca-calendar-1-1-300x241.png", 500),
  "about/history-2014.webp": ("2026/04/envato-labs-image-edit*.png", 600),
  "about/history-2024.webp": ("2026/04/abhi-building1-1-1-1.png", 700),
  "about/eft.webp": ("2025/10/abhi-electronic-funds.jpg", 1400),
  # people
  "people/omair-ansari.webp": ("2026/04/Team-1-color-213x300-2.png", 360),
  "people/ali-ladhubhai.webp": ("2026/04/Group-339-1-214x300.png", 360),
  "people/ammara-masood.webp": ("2026/05/image-10-300x275.png", 360),
  "people/khursheed-kotwal.webp": ("2026/05/image-11-300x273.png", 360),
  "people/atif-riaz-bokhari.webp": ("2026/05/Group-359-289x300.png", 360),
  "people/jehangir-shah.webp": ("2026/05/image-12-300x274.png", 360),
  "people/pavel-khristolubov.webp": ("2026/05/image-13-300x276.png", 360),
  "people/kabeer-naqvi.webp": ("2026/08/Mr-kabhir-naqvi.png", 360),
  "people/mariam-pervaiz.webp": ("2026/08/Ms-Mariam.png", 360),
  "people/farooq-kamran.webp": ("2026/04/Group-346-3-256x300.png", 360),
  "people/atif-aziz-ahmed.webp": ("2026/04/Group-345-256x300.png", 360),
  "people/manzoor-janjua.webp": ("2026/04/Group-342-256x300.png", 360),
  "people/mubashar-shahani.webp": ("2026/04/Group-343-256x300.png", 360),
  "people/syed-ali-raza.webp": ("2026/04/Group-348-256x300.png", 360),
  "people/sardar-hasan-raza.webp": ("2026/04/Group-344-256x300.png", 360),
  # partners & shareholders
  "partners/ubl-omni.webp": ("2026/04/AbhiLanding-2.png", 400),
  "partners/pathfinder.webp": ("2026/04/AbhiLanding.png", 400),
  "partners/touchpoint.webp": ("2026/04/AbhiLanding-1.png", 400),
  "partners/autosoft.webp": ("2026/04/AbhiLanding-3.png", 400),
  "partners/ncr.webp": ("2025/06/NCR_logo_without_background.png", 400),
  "partners/ptcl.webp": ("2025/06/Pakistan_Telecommunication_Company_Ltd.png", 400),
  "partners/abhi.webp": ("2026/04/abhi-296x300.png", 300),
  "partners/tpl.webp": ("2026/04/tpl-296x300.png", 300),
  "partners/kashf.webp": ("2026/04/kashf-296x300.png", 300),
  "partners/mastercard.webp": ("2026/10/Mastercard-logo-300x234.webp", 300),
  # press
  "press/ipo-pakistan.webp": ("2026/10/IPO-2-Website-Banner*.webp", 1000),
  "press/redtone.webp": ("2026/06/ABHI-X-REDTONE*.jpg", 1000),
  "press/dastak.webp": ("2026/06/Abhi-x-Dastak*.jpg", 1000),
  "press/1link-1go.webp": ("2026/06/1link-1go*.jpg", 1000),
  "press/cba.webp": ("2026/06/ABHI-X-CBA*.png", 1000),
  "press/betacodes.webp": ("2026/06/abhi-x-betacodes*.jpg", 1000),
  "press/pemra.webp": ("2026/04/WhatsApp-Image-2026-04-17-at-4.58.50*.jpeg", 1000),
  "press/efu.webp": ("2026/04/WhatsApp-Image-2026-04-17-at-5.01.54*.jpeg", 1000),
  # ipo
  "ipo/hero.webp": ("2026/11/ipo-live-1536x863.jpeg", 1600),
  "ipo/details.webp": ("2026/11/ipo-page.webp", 1400),
  "ipo/heading.webp": ("2026/10/o-heading.webp", 1400),
  "ipo/what-is-abhi.webp": ("2026/07/1233.png", 1200),
  "ipo/stakeholder-farooq-kamran.webp": ("2026/09/Stackholder1.jpeg", 900),
  "ipo/stakeholder-mariam-pervaiz.webp": ("2026/09/stakeholder-2.jpeg", 900),
  "ipo/investor-thomas-tsao.webp": ("2026/10/Thomas-573x1024.jpeg", 600),
  "ipo/investor-misbah-naqvi.webp": ("2026/08/Misbah-1-577x1024.png", 600),
  "ipo/investor-kirill.webp": ("2026/08/Kirill-1-574x1024.png", 600),
  "ipo/investor-stefan.webp": ("2026/08/Stefan-thumbnail-576x1024.jpeg", 600),
  "ipo/investor-faisal-aftab.webp": ("2026/08/faisal-aftab-thumbnail-576x1024.jpeg", 600),
  "ipo/investor-dave.webp": ("2026/08/Dave-Thumbnail-576x1024.jpeg", 600),
}
for f in ["Merchant-Financing", "Stat-Post-1-Urdu", "Abhi-bank-IPO-post-2a-Urdu", "Abhi-bank-IPO-post-2c", "Abhi-bank-IPO-post-3",
          "Abhi-bank-IPO-post-2b-Urdu", "Stat-Post-1", "Generic-Post-1"]:
    MAP["ipo/social-%s.webp" % f.lower()] = ("2026/07/%s.jpg" % f, 900)

# client logos (home "7,000+ companies" wall) and investor logos (IPO page)
for p in sorted(glob.glob(os.path.join(RAW, "2026/04/Group-[0-9]*-300x152.webp"))):
    n = "client-%02d" % int(re.match(r"Group-(\d+)", os.path.basename(p)).group(1))
    MAP["clients/%s.webp" % n] = (os.path.relpath(p, RAW), 300)
for p in sorted(glob.glob(os.path.join(RAW, "2026/07/Logo-investor-*.webp"))):
    n = "investor-%02d" % int(re.search(r"800-(\d+)", p).group(1))
    MAP["investors/%s.webp" % n] = (os.path.relpath(p, RAW), 420)
# EWA client logos (white on transparent)
for p in sorted(glob.glob(os.path.join(RAW, "2026/04/Frame-*.png"))):
    if "Frame-11-1" in p:
        continue
    n = "ewa-client-%02d" % int(re.match(r"Frame-(\d+)", os.path.basename(p)).group(1))
    MAP["ewa-clients/%s.webp" % n] = (os.path.relpath(p, RAW), 300)

# copy SVGs as-is
SVG = {"brand/logo-white.svg": "2026/07/abhi-logo-white.svg", "badges/google-play.svg": "2026/03/Google-Play-1.svg",
       "badges/app-store.svg": "2026/03/App-Store-1.svg", "partners/1link.svg": "2025/06/1LINK_logo.svg",
       "about/history-2010.svg": "2026/04/pk-1.svg"}

total = 0
for out, (pat, width) in MAP.items():
    if pat.endswith(".svg"):
        continue
    dst = os.path.join(OUT, out)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im = Image.open(src(pat))
    im.seek(0)
    im = im.convert("RGBA") if im.mode in ("P", "LA", "RGBA") or "transparency" in im.info else im.convert("RGB")
    if width and im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    if out.endswith(".png"):
        im.save(dst, optimize=True)
    else:
        im.save(dst, "WEBP", quality=82, method=6)
    total += os.path.getsize(dst)
for out, pat in SVG.items():
    dst = os.path.join(OUT, out)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    data = open(src(pat), "rb").read()
    open(dst, "wb").write(data)
    total += len(data)
print("assets:", len(MAP) + len(SVG), "files,", round(total / 1024 / 1024, 2), "MB")
