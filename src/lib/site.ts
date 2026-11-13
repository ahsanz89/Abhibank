/** Site-wide constants and the information architecture (single source of truth for header, footer and sitemap). */

export const SITE = {
  name: "ABHI Microfinance Bank",
  shortName: "ABHI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abhibank.com",
  description:
    "ABHI Microfinance Bank — savings accounts, loans, earned wage access and digital banking for everyone in Pakistan. 24/7 helpline (042) 111-111-562.",
  helpline: "(042) 111-111-562",
  helplineHref: "tel:042111111562",
  fax: "051-2706274",
  email: "info@abhibank.com",
  whistleEmail: "whistle.blowing@abhibank.com",
  address: "Plot #12, S. A. House, D-12 Markaz, Islamabad",
  social: {
    facebook: "https://www.facebook.com/ABHIMicrofinanceBank",
    instagram: "https://www.instagram.com/abhimicrofinancebank",
    linkedin: "https://www.linkedin.com/company/abhi-microfinance-bank/",
  },
  apps: {
    android: "https://play.google.com/store/apps/details?id=com.finja.simsim",
    ios: "https://apps.apple.com/lu/app/abhi-bank/id1181010608",
  },
  psxEipo: "https://eipo.psx.com.pk/EIPO/home/index",
  cdcPortal: "https://cdcaccess.com.pk/#/login",
  sunwai: "https://sunwai.sbp.org.pk/",
  mapsEmbed: "https://maps.google.com/maps?q=ABHI%20Microfinance%20Bank%20Limited%20islamabad&t=m&z=16&output=embed&iwloc=near",
} as const;

const LEGACY = process.env.NEXT_PUBLIC_LEGACY_ASSET_ORIGIN ?? "https://abhibank.com";

/** Files (PDFs, videos) still served by the original WordPress install. */
export function legacyAsset(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?abhibank\.com/, LEGACY);
}

export type IconName =
  | "piggy"
  | "loan"
  | "venus"
  | "gem"
  | "zap"
  | "users"
  | "receipt"
  | "phone"
  | "play"
  | "calculator"
  | "book"
  | "info"
  | "history"
  | "leader"
  | "file"
  | "handshake"
  | "news"
  | "pin"
  | "atm"
  | "building"
  | "help"
  | "shield"
  | "mail"
  | "megaphone"
  | "trend";

export interface NavLink {
  label: string;
  description: string;
  href: string;
  icon: IconName;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
  feature?: { title: string; text: string; cta: string; href: string };
}

export const NAV: NavGroup[] = [
  {
    label: "Personal",
    links: [
      { label: "Deposits", description: "Savings, current and term deposit accounts", href: "/deposits", icon: "piggy" },
      { label: "Loans", description: "Finance for farms, businesses, homes and vehicles", href: "/loans", icon: "loan" },
      { label: "Women-centric products", description: "Niswan Karza and Niswan Rozana Munafa", href: "/women-centric-products-services", icon: "venus" },
      { label: "Gold-backed finance", description: "Sunheri Karza: turn gold into working capital", href: "/loans/sunheri-karza", icon: "gem" },
    ],
    feature: { title: "Ready to start?", text: "Open an account or apply for a loan online", cta: "Apply", href: "/online-application" },
  },
  {
    label: "Business & employers",
    links: [
      { label: "Abhi Salary (EWA)", description: "Earned salary in just 30 seconds", href: "/ewa", icon: "zap" },
      { label: "Corporate solutions", description: "Bulk disbursements, payroll, collections", href: "/digital-financial-services#business", icon: "users" },
      { label: "Bring EWA to your team", description: "Employer and employee enquiries", href: "/contact-us-ewa", icon: "handshake" },
      { label: "Business loans", description: "Karobari Karza and commercial vehicle finance", href: "/loans?need=business", icon: "receipt" },
    ],
    feature: { title: "7,000+ companies trust ABHI", text: "Financial wellness for your workforce", cta: "Talk to us", href: "/contact-us-ewa" },
  },
  {
    label: "Digital banking",
    links: [
      { label: "ABHIBank App", description: "Transfers, 500+ billers, no minimum balance", href: "/digital-financial-services", icon: "phone" },
      { label: "Tutorials", description: "Salary Advance, Gold Top-Up and Rollover", href: "/tutorials", icon: "play" },
      { label: "IBAN calculator", description: "Generate your IBAN in seconds", href: "/iban-calculator", icon: "calculator" },
      { label: "Financial literacy", description: "National Financial Literacy Program", href: "/financial-literacy", icon: "book" },
    ],
    feature: { title: "Get the ABHIBank App", text: "Available on Android and iOS", cta: "Download", href: "/digital-financial-services#download" },
  },
  {
    label: "About",
    links: [
      { label: "About ABHI", description: "Mission, vision and impact", href: "/about-us", icon: "info" },
      { label: "Our history", description: "From 2008 to today", href: "/our-history", icon: "history" },
      { label: "Leadership", description: "Board of Directors and management", href: "/leadership", icon: "leader" },
      { label: "Financials", description: "Reports, schedules of charges, disclosures", href: "/financials", icon: "file" },
      { label: "Partners & investors", description: "Shareholders, partners and clients", href: "/partner-investors", icon: "handshake" },
      { label: "Press releases", description: "News and announcements", href: "/press-release", icon: "news" },
    ],
  },
  {
    label: "Help",
    links: [
      { label: "Branch network", description: "131 branches across Pakistan", href: "/branches", icon: "pin" },
      { label: "ATM network", description: "Find an ABHI ATM", href: "/atm-network", icon: "atm" },
      { label: "Complaints & suggestions", description: "Lodge and track a complaint", href: "/complaint-and-suggestion", icon: "help" },
      { label: "Client protection", description: "Your rights and grievance channels", href: "/client-protection", icon: "shield" },
      { label: "Contact us", description: "Helpline, email and head office", href: "/connect-with-abhi", icon: "mail" },
      { label: "Whistle-blowing", description: "Report misconduct confidentially", href: "/whistle-blowing", icon: "megaphone" },
    ],
    feature: { title: "24/7 helpline", text: "(042) 111-111-562", cta: "Call", href: "tel:042111111562" },
  },
];

export const UTILITY_LINKS = [
  { label: "Contact us", href: "/connect-with-abhi" },
  { label: "Financials", href: "/financials" },
  { label: "Branch network", href: "/branches" },
  { label: "Head office", href: "/head-office" },
];

export const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie guidelines", href: "/cookie-guidelines" },
  { label: "Terms of use", href: "/terms-of-use" },
  { label: "Digital onboarding T&Cs", href: "/onboarding-terms-conditions" },
];

export const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Deposits", href: "/deposits" },
      { label: "Loans", href: "/loans" },
      { label: "Abhi Salary (EWA)", href: "/ewa" },
      { label: "Digital financial services", href: "/digital-financial-services" },
      { label: "Women-centric products", href: "/women-centric-products-services" },
      { label: "Online application", href: "/online-application" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Our history", href: "/our-history" },
      { label: "Leadership", href: "/leadership" },
      { label: "Partners & investors", href: "/partner-investors" },
      { label: "Press releases", href: "/press-release" },
      { label: "IPO", href: "/abhi-intro" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Head office", href: "/head-office" },
      { label: "Branch network", href: "/branches" },
      { label: "ATM network", href: "/atm-network" },
      { label: "Complaints & suggestions", href: "/complaint-and-suggestion" },
      { label: "Client protection", href: "/client-protection" },
      { label: "Whistle-blowing", href: "/whistle-blowing" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "IBAN calculator", href: "/iban-calculator" },
      { label: "Public documents", href: "/financials" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Financial literacy", href: "/financial-literacy" },
      { label: "Contact us", href: "/connect-with-abhi" },
    ],
  },
];
