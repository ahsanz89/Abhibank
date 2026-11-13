import type { MetadataRoute } from "next";
import { deposits, loans, press } from "@/lib/content";
import { SITE } from "@/lib/site";

const STATIC = [
  "",
  "/about-us",
  "/our-history",
  "/leadership",
  "/partner-investors",
  "/financials",
  "/deposits",
  "/loans",
  "/digital-financial-services",
  "/client-protection",
  "/complaint-and-suggestion",
  "/women-centric-products-services",
  "/financial-literacy",
  "/ewa",
  "/contact-us-ewa",
  "/tutorials",
  "/branches",
  "/atm-network",
  "/head-office",
  "/online-application",
  "/press-release",
  "/abhi-intro",
  "/connect-with-abhi",
  "/whistle-blowing",
  "/iban-calculator",
  "/privacy",
  "/cookie-guidelines",
  "/privacy-guidelines",
  "/terms-of-use",
  "/onboarding-terms-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC.map((p) => ({ url: `${SITE.url}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...deposits.map((d) => ({ url: `${SITE.url}/deposits/${d.slug}`, lastModified: now, priority: 0.8 })),
    ...loans.map((l) => ({ url: `${SITE.url}/loans/${l.slug}`, lastModified: now, priority: 0.8 })),
    ...press.map((p) => ({ url: `${SITE.url}/press-release/${p.slug}`, lastModified: new Date(p.date), priority: 0.5 })),
  ];
}
