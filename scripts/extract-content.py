"""
Converts the content scraped from the original abhibank.com (content.json,
content2.json, branches.json) into the typed JSON data files used by the site
under src/data. Re-run only when refreshing content from the old site.

Usage: python3 scripts/extract-content.py <raw-dir>
"""
import json, os, re, sys

RAW = sys.argv[1] if len(sys.argv) > 1 else "../raw"
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "data")
os.makedirs(OUT, exist_ok=True)
c1 = json.load(open(os.path.join(RAW, "content.json")))
c2 = json.load(open(os.path.join(RAW, "content2.json")))
br = json.load(open(os.path.join(RAW, "branches.json")))

def save(name, obj):
    json.dump(obj, open(os.path.join(OUT, name), "w"), ensure_ascii=False, indent=1)
    print("wrote", name)

def tidy(s):
    s = s.replace("​", "").replace(" ", " ")
    s = re.sub(r"\s+", " ", s).strip()
    return s

def text_blocks(blocks):
    return [b for b in blocks if b["t"] not in ("img", "settings", "button")]

# ---------------- product details ----------------
def product_detail(key):
    bl = text_blocks(c2[key]["blocks"])
    out = {"intro": [], "sections": []}
    cur = None
    for b in bl:
        t, x = b["t"], tidy(b.get("x", ""))
        if t == "form":
            break
        if t in ("h1", "h2", "h3"):
            if x.lower().startswith(("deposit online application", "apply for loan")):
                break
            if not out["intro"] and not out["sections"] and cur is None:
                out["tagline"] = x if "tagline" in out else x  # first heading = name/tagline
                out.setdefault("headings", []).append(x)
                continue
            cur = {"title": x.rstrip(":"), "items": []}
            out["sections"].append(cur)
        elif t == "p":
            if cur is None:
                out["intro"].append(x)
            else:
                cur.setdefault("text", []).append(x)
        elif t == "li":
            if x.lower().rstrip(":") in ("features & specifications", "min eligibility requirements"):
                cur = {"title": x.rstrip(":"), "items": []}
                out["sections"].append(cur)
                continue
            if cur is None:
                cur = {"title": "Features", "items": []}
                out["sections"].append(cur)
            cur["items"].append(x)
    out.pop("tagline", None)
    out["headings"] = [h for h in out.get("headings", [])]
    return out

DEPOSITS = [
 ("niswan-rozana-munafa", "Niswan Rozana Munafa", "Savings", "A daily savings account designed exclusively for women, offering all the benefits of our Rozana Munafa Account with features tailored to suit female customers.", ["savings", "women"]),
 ("asaan-account", "Asaan Account", "Savings", "Banking made effortless, no minimum balance, no transaction requirements, just simplicity at your fingertips.", ["savings"]),
 ("sahulat-current-account", "Sahulat Current Account", "Current", "The perfect choice for businesses looking to streamline operations and boost development.", ["current", "business"]),
 ("rozana-munafa", "Rozana Munafa", "Savings", "ABHI Microfinance Bank offers Rozana Munafa, a brilliant opportunity for you to save meaningfully.", ["savings"]),
 ("aitemad-bachat-account", "Aitemad Bachat Account", "Savings", "Saving is essential for a prosperous future. That’s why the Aitemad Bachat Account is the best choice for you!", ["savings"]),
 ("muhaffiz-term-deposit", "Muhaffiz Term Deposit", "Term deposit", "Retirement is not the end of your dreams, it’s just another milestone.", ["term"]),
 ("tahafuz-term-deposit", "Tahafuz Term Deposit", "Term deposit", "For a prosperous life, all you need is a Tahafuz Term Deposit Account.", ["term"]),
 ("sahulat-plus-current-account", "Sahulat Plus Current Account", "Current", "A current account offering a wide array of value added services and hassle free banking for all our customers.", ["current", "business"]),
]
LOANS = [
 ("tractor-loan", "Tractor Loan", "A tractor is an essential necessity of farming therefore ABHI brings Tractor Loan for all farmers.", ["farming"], "PKR 500,000 – 2,000,000"),
 ("niswan-karza", "Niswan Karza", "A short to medium-term loan facility for female entrepreneurs.", ["business", "women"], None),
 ("light-commercial-vehicle-loan", "Light Commercial Vehicle Loan", "This loan facility caters to the needs of business individuals involved in the transportation business.", ["business", "vehicles"], "PKR 400,000 – 2,000,000"),
 ("karobari-karza", "Karobari Karza", "A loan facility that helps businessmen raise capital for their businesses.", ["business"], None),
 ("kashtkar-karza", "Kashtkar Karza", "A loan that meets a farmer’s financial needs to support expansion of their farming business.", ["farming"], None),
 ("maweshi-karza", "Maweshi Karza", "A convenient lending product that caters to the needs of livestock farmers.", ["farming"], None),
 ("sunheri-karza", "Sunheri Karza", "Convert your gold jewelry into working capital for your business needs.", ["gold", "business"], "PKR 40,000 – 2,000,000"),
 ("house-loan-renovation-improvement", "House Loan (Renovation / Improvement)", "A medium to long-term loan facility for house renovation purposes.", ["vehicles"], "PKR 75,000 – 2,000,000"),
 ("motorcycle-loan", "Motorcycle Loan", "A short to medium-term conveyance loan facility designed to finance motorcycle (s) of reputed brand (s).", ["vehicles"], None),
]
deps = []
for slug, name, typ, summary, cats in DEPOSITS:
    d = product_detail(slug)
    deps.append({"slug": slug, "name": name, "type": typ, "summary": summary, "categories": cats,
                 "image": "/assets/products/%s.webp" % slug, "headline": d["headings"][1] if len(d["headings"]) > 1 else None,
                 "intro": d["intro"], "sections": d["sections"]})
save("deposits.json", deps)
loans = []
for slug, name, summary, cats, rng in LOANS:
    d = product_detail("products/" + slug)
    loans.append({"slug": slug, "name": name, "summary": summary, "categories": cats, "amountRange": rng,
                  "image": "/assets/products/%s.webp" % slug, "intro": d["intro"], "sections": d["sections"]})
save("loans.json", loans)

# form option lists (from the original forms)
def form_fields(key):
    for b in c2[key]["blocks"]:
        if b["t"] == "form":
            return b["fields"]
dep_form = form_fields("asaan-account")
cities = [o for o in dep_form[5]["opts"][1:]]
heard = []
for f in dep_form:
    if f.get("opts") and f["opts"][0].startswith("Where did you hear"):
        heard = [o for o in dict.fromkeys(f["opts"][1:]) if not o.startswith("Where did you hear")]
loan_form = form_fields("products/tractor-loan")
loan_types = loan_form[0]["opts"][1:]
save("form-options.json", {"cities": cities, "heardAbout": heard, "accountTypes": dep_form[0]["opts"][1:], "loanTypes": loan_types,
     "complaintNatures": ["Branch Complaint", "Branchless Banking Complaint", "ATM/Card Complaint", "EWA Complaint", "Feedback"],
     "ewaEmployees": ["51–200", "201–500", "500+"], "ewaIndustries": ["Manufacturing", "Retail", "Services", "Logistics", "Healthcare", "Other"],
     "ewaHeard": ["TikTok", "Instagram", "YouTube", "LinkedIn", "Facebook", "Snapchat", "Other"],
     "whistleRoles": ["Employee", "Customer", "Vendor", "Other"]})

# ---------------- documents (financials) ----------------
docs = []
for b in c1["financials"]["blocks"]:
    if b["t"] != "li":
        continue
    links = b.get("links") or []
    href = links[0]["h"] if links else None
    title = tidy(b["x"])
    if not href:
        continue
    low = title.lower()
    if "soc" in low or "schedule of charges" in low:
        cat = "Schedule of charges"
    elif "deposit" in low and "rate" in low or "pricing" in low or "mark-up" in low or "rate of loan" in low:
        cat = "Rates & pricing"
    elif any(k in low for k in ("rfp", "eoi", "tender", "request for proposal", "proposal", "business requirement", "vendor", "scope of services", "job placement", "sale of vehicles", "disposal")):
        cat = "Tenders & notices"
    else:
        cat = "Policies & disclosures"
    lang = "Urdu" if "urdu" in low else "English"
    m = re.search(r"/uploads/(\d{4})/", href)
    years = re.findall(r"20\d\d", title)
    year = int(years[-1]) if years else (int(m.group(1)) if m else None)
    docs.append({"title": title, "url": href, "category": cat, "language": lang, "year": year,
                 "type": "DOCX" if href.endswith(".docx") else "PDF"})
docs.insert(0, {"title": "1st Quarter Financial Report 2026 (Condensed Interim Financial Statements, March 2026)",
                "url": "https://abhibank.com/wp-content/uploads/2026/06/Condensed-Interim-Financial-Statements-March-2026.pdf",
                "category": "Financial reports", "language": "English", "year": 2026, "type": "PDF"})
docs.insert(0, {"title": "ABHI Microfinance Bank — IPO Prospectus", "url": "https://abhibank.com/wp-content/uploads/2026/10/ABHI-Updated-Prospectus-Final_compressed.pdf",
                "category": "IPO", "language": "English", "year": 2026, "type": "PDF"})
save("documents.json", docs)

# ---------------- ATMs & branches ----------------
atm_rows = [b for b in c1["atm-network"]["blocks"] if b["t"] == "table"][0]["rows"]
atms = []
for r in atm_rows[1:]:
    if len(r) < 6 or not r[0].strip():
        continue
    atms.append({"city": tidy(r[1]).title(), "id": tidy(r[2]), "address": tidy(r[3]), "type": tidy(r[4]), "status": tidy(r[5])})
save("atms.json", atms)

regions = []
for r in br:
    name = tidy(r["region"]).replace("Balouchistan", "Balochistan")
    items = []
    for it in r["items"]:
        lines = [tidy(l) for l in it["lines"] if tidy(l)]
        city = tidy(it["city"]) or (lines[0] if lines else "")
        tel = [tidy(t) for t in it["tel"]]
        addr = [l for l in lines if l != city and l not in tel and not re.fullmatch(r"[\d\-\s,]+", l)]
        if lines and lines[0].startswith(city) and lines[0] != city and not addr:
            addr = [lines[0][len(city):].strip()]
        phone_lines = [l for l in lines if re.fullmatch(r"[\d\-\s,]+", l)]
        items.append({"city": city, "address": ", ".join(a.rstrip(",") for a in addr).strip(" ,"), "phones": tel or phone_lines})
    regions.append({"region": name, "description": tidy(r.get("sub", "")), "branches": items})
save("branches.json", regions)

# ---------------- leadership ----------------
pops = {p["id"]: [tidy(b.get("x", "")) for b in p["blocks"] if b.get("x") and tidy(b.get("x")) not in ("×",)] for p in c1["home"]["popups"]}
def bio(pid):
    return [p for p in pops.get(pid, []) if p]
people = {
 "board": [
  ("Atif Riaz Bokhari", "Independent Director & Chairman", "atif-riaz-bokhari", "pum-10543"),
  ("Omair Ansari", "Director", "omair-ansari", "pum-10484"),
  ("Ali Ladhubhai", "Director", "ali-ladhubhai", "pum-10308"),
  ("Ms. Ammara Masood", "Independent Director", "ammara-masood", "pum-10520"),
  ("Ms. Khursheed Kotwal", "Independent Director", "khursheed-kotwal", "pum-10538"),
  ("Mr. Jehangir Shah", "Director", "jehangir-shah", "pum-10528"),
  ("Pavel Khristolubov", "Director", "pavel-khristolubov", "pum-10548")],
 "shareholderRep": [("Mr. Kabeer Naqvi", "Entrepreneur in Residence", "kabeer-naqvi", "pum-11208")],
 "management": [
  ("Muhammad Farooq Kamran", "Chief Financial Officer / Acting CEO", "farooq-kamran", "pum-10819"),
  ("Mariam Pervaiz", "Chief Innovation & Financial Inclusion Officer", "mariam-pervaiz", "pum-10810"),
  ("Atif Aziz Ahmed", "Chief Technology Officer", "atif-aziz-ahmed", "pum-10827"),
  ("Manzoor Ahmed Janjua", "Chief Legal & Business Support Officer / Company Secretary", "manzoor-janjua", "pum-10833"),
  ("Mubashar Shahani", "Chief Compliance Officer", "mubashar-shahani", "pum-10839"),
  ("Syed Mohammed Ali Raza", "Chief Strategy Officer", "syed-ali-raza", "pum-10851"),
  ("Sardar Hasan Raza", "Chief People & Culture Officer", "sardar-hasan-raza", "pum-10845")]}
lead = {k: [{"name": n, "role": r, "image": "/assets/people/%s.webp" % img, "slug": img, "bio": bio(pid)} for n, r, img, pid in v] for k, v in people.items()}
save("leadership.json", lead)

# ---------------- press ----------------
PRESS_META = {
 "the-ipo-pakistan-has-not-seen-yet": ("2026-10-14", "ipo-pakistan"), "abhi-x-redtone": ("2026-06-17", "redtone"),
 "abhi-x-dastak": ("2026-06-17", "dastak"), "1link-1go": ("2026-06-17", "1link-1go"), "abhi-x-cba": ("2026-05-19", "cba"),
 "abhi-x-betacodes": ("2026-05-18", "betacodes"), "pemra": ("2026-04-11", "pemra"), "efu": ("2026-04-11", "efu")}
press = []
for url, v in c1["__press"].items():
    slug = url.rstrip("/").split("/")[-1]
    date, img = PRESS_META.get(slug, ("2026-01-01", None))
    paras = []
    for b in v["blocks"]:
        if b["t"] in ("p", "li", "h2", "h3"):
            x = tidy(b["x"]).replace("**", "")
            if x and x not in paras:
                paras.append(("• " if b["t"] == "li" else "") + x)
    title = v["title"].split(" - ABHI")[0]
    headline = paras[0] if paras else title
    body = paras[1:] if slug != "the-ipo-pakistan-has-not-seen-yet" else paras
    press.append({"slug": slug, "title": title, "headline": headline if slug != "the-ipo-pakistan-has-not-seen-yet" else "The IPO Pakistan Has Not Seen Yet",
                  "date": date, "image": "/assets/press/%s.webp" % img if img else None, "body": body,
                  "excerpt": (body[0] if body else headline)[:220]})
press.sort(key=lambda p: p["date"], reverse=True)
save("press.json", press)

# ---------------- legal pages ----------------
legal = {}
for k in ["cookie-guidelines", "privacy-guidelines", "terms-of-use", "onboarding-terms-conditions"]:
    bl = [b for b in c2[k]["blocks"] if b["t"] in ("h1", "h2", "h3", "h4", "p", "li")]
    title = tidy(bl[0]["x"]) if bl else k
    items = []
    for b in bl[1:]:
        x = tidy(b["x"])
        if not x:
            continue
        kind = "li" if b["t"] == "li" else ("h" if b["t"].startswith("h") or re.match(r"^\d+(\.\d+)+\s+\S", x) and len(x) < 90 else "p")
        items.append({"k": kind, "t": x})
    legal[k] = {"title": title, "blocks": items}
save("legal.json", legal)

# ---------------- complaints page content ----------------
cp = c1["complaint-and-suggestion"]["blocks"]
pep = [b for b in cp if b["t"] == "table"][0]["rows"]
save("complaints.json", {"pepFocalPersons": [dict(zip(["name", "department", "designation", "landline", "cell", "email"], r)) for r in pep[1:]]})
print("done")

# ---------------- corrections from a second, structure-aware scrape (fix.json) ----------------
fix_path = os.path.join(RAW, "fix.json")
if os.path.exists(fix_path):
    fx = json.load(open(fix_path))
    regions = []
    for r in fx["branches"]:
        name = tidy(r["region"]).replace("Balouchistan", "Balochistan")
        items = []
        for i in r["items"]:
            addr = re.sub(r",\s*,", ",", tidy(i["address"])).strip(" ,")
            phones = [tidy(t) for t in i["tel"]]
            m = re.search(r",?\s*(-[\d,\s]+)$", addr)
            if m and phones:
                phones[-1] += m.group(1).replace(" ", "")
                addr = addr[:m.start()].strip(" ,")
            items.append({"city": tidy(i["city"]).rstrip(","), "address": addr.rstrip("."), "phones": phones})
        regions.append({"region": name, "description": "Providing seamless physical access to financial empowerment across key regions." if "Accessible" in name else "", "branches": items})
    save("branches.json", regions)
    save("complaints.json", {"pepFocalPersons": [dict(zip(["name", "department", "designation", "landline", "cell", "email"], r)) for r in fx["pep"][1:]]})
    lead = json.load(open(os.path.join(OUT, "leadership.json")))
    mub = tidy(fx.get("mubashar") or "").replace("Mubashar Shahani ", "", 1).rstrip("× ").strip()
    for p in lead["management"]:
        if p["slug"] == "mubashar-shahani" and mub:
            p["bio"] = [s.strip() for s in re.split(r"(?<=\.)\s+(?=Mubashar|Currently|By profession)", mub) if s.strip()]
    save("leadership.json", lead)
