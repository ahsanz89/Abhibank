/** Typed access to the content migrated from the original abhibank.com. */
import depositsJson from "@/data/deposits.json";
import loansJson from "@/data/loans.json";
import documentsJson from "@/data/documents.json";
import atmsJson from "@/data/atms.json";
import branchesJson from "@/data/branches.json";
import leadershipJson from "@/data/leadership.json";
import pressJson from "@/data/press.json";
import legalJson from "@/data/legal.json";
import complaintsJson from "@/data/complaints.json";
import logoListsData from "@/data/logo-lists.json";

export interface ProductSection {
  title: string;
  items: string[];
  text?: string[];
}
export interface Deposit {
  slug: string;
  name: string;
  type: "Savings" | "Current" | "Term deposit";
  summary: string;
  categories: string[];
  image: string;
  headline: string | null;
  intro: string[];
  sections: ProductSection[];
}
export interface Loan {
  slug: string;
  name: string;
  summary: string;
  categories: string[];
  amountRange: string | null;
  image: string;
  intro: string[];
  sections: ProductSection[];
}
export interface DocumentItem {
  title: string;
  url: string;
  category: string;
  language: "English" | "Urdu";
  year: number | null;
  type: "PDF" | "DOCX";
}
export interface Atm {
  city: string;
  id: string;
  address: string;
  type: string;
  status: string;
}
export interface Branch {
  city: string;
  address: string;
  phones: string[];
}
export interface Region {
  region: string;
  description: string;
  branches: Branch[];
}
export interface Person {
  name: string;
  role: string;
  image: string;
  slug: string;
  bio: string[];
}
export interface PressRelease {
  slug: string;
  title: string;
  headline: string;
  date: string;
  image: string | null;
  body: string[];
  excerpt: string;
}
export interface LegalPage {
  title: string;
  blocks: { k: "h" | "p" | "li"; t: string }[];
}

export const deposits = depositsJson as Deposit[];
export const loans = loansJson as Loan[];
export const documents = documentsJson as DocumentItem[];
export const atms = atmsJson as Atm[];
export const regions = branchesJson as Region[];
export const leadership = leadershipJson as { board: Person[]; shareholderRep: Person[]; management: Person[] };
export const press = pressJson as PressRelease[];
export const legal = legalJson as Record<string, LegalPage>;
export const pepFocalPersons = complaintsJson.pepFocalPersons;

export const branchCount = regions.filter((r) => !r.region.startsWith("Accessible")).reduce((n, r) => n + r.branches.length, 0);

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Original home-page product-walkthrough videos (hosted on the legacy site). */
export const WALKTHROUGHS = [
  { title: "Salary Advance", text: "Request an advance on the salary you’ve already earned.", poster: "/assets/app/walkthrough-salary-advance.webp", video: "https://abhibank.com/wp-content/uploads/2026/04/FAQ-Salary-Abhi-Bank-Revised1-3.mp4" },
  { title: "Gold Top-Up", text: "Top up an existing gold-backed loan in the app.", poster: "/assets/app/walkthrough-gold-topup.webp", video: "https://abhibank.com/wp-content/uploads/2026/01/Topup-1.mp4" },
  { title: "Rollover", text: "Roll over your loan in a few simple steps.", poster: "/assets/app/walkthrough-rollover.webp", video: "https://abhibank.com/wp-content/uploads/2026/01/Rollover-1.mp4" },
];

export const CAMPAIGN_BANNERS = [
  { src: "/assets/banners/ipo-live.webp", alt: "Public subscription is live now — the IPO of ABHI Microfinance Bank, 12–13 November 2026", href: "/abhi-intro" },
  { src: "/assets/banners/ipo-opens.webp", alt: "Public subscription opens tomorrow — 12–13 November 2026", href: "/abhi-intro" },
  { src: "/assets/banners/ipo-bigger-step.webp", alt: "A bigger step towards financial inclusion — the IPO of ABHI Microfinance Bank", href: "/abhi-intro" },
  { src: "/assets/banners/ipo-details.webp", alt: "The IPO of ABHI Microfinance Bank: book building 5–6 November, retail subscription 12–13 November 2026", href: "/abhi-intro" },
  { src: "/assets/banners/ipo-oversubscribed.webp", alt: "100% subscribed — book building complete", href: "/abhi-intro" },
  { src: "/assets/banners/financial-freedom.webp", alt: "Financial freedom for all", href: "/about-us" },
  { src: "/assets/banners/ewa.webp", alt: "Advance salary chahiye? Advance approved, ABHI!", href: "/ewa" },
  { src: "/assets/banners/bills.webp", alt: "Need help with bills? Bills paid, ABHI", href: "/digital-financial-services" },
  { src: "/assets/banners/gold.webp", alt: "Turn your gold into money with Sunheri Karza", href: "/loans/sunheri-karza" },
  { src: "/assets/banners/digital-account.webp", alt: "Digital account? ABHI", href: "/digital-financial-services" },
  { src: "/assets/banners/freedom-for-all.webp", alt: "Financial freedom for all", href: "/about-us" },
  { src: "/assets/banners/sunwai.webp", alt: "Facing unresolved banking issues? SBP Sunwai is here to help", href: "/complaint-and-suggestion" },
  { src: "/assets/banners/notice.webp", alt: "ABHI Microfinance Bank has received in-principle approval from the State Bank of Pakistan to establish an Islamic Microfinance Division", href: "/press-release" },
  { src: "/assets/banners/payday-ewa.webp", alt: "Every day is payday — Earned Wage Access (EWA)", href: "/ewa" },
];

export const CLIENT_LOGOS: string[] = logoListsData.clients;


export const EWA_CLIENT_LOGOS = logoListsData["ewa-clients"];
export const INVESTOR_LOGOS = logoListsData.investors;
