import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";

export const metadata: Metadata = { title: "Terms & conditions (digital onboarding)", description: "Terms and conditions for digital onboarding and the ABHIBank App." };

export default function Page() {
  return <LegalDoc slug="onboarding-terms-conditions" title="Terms & conditions (digital onboarding)" />;
}
