import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";

export const metadata: Metadata = { title: "Privacy guidelines", description: "How ABHI collects, uses and protects your personal information." };

export default function Page() {
  return <LegalDoc slug="privacy-guidelines" title="Privacy guidelines" />;
}
