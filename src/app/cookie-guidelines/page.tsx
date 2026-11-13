import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";

export const metadata: Metadata = { title: "Cookie guidelines", description: "How ABHI uses cookies and similar tracking technologies." };

export default function Page() {
  return <LegalDoc slug="cookie-guidelines" title="Cookie guidelines" />;
}
