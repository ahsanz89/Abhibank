import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";

export const metadata: Metadata = { title: "Terms of use", description: "The terms that govern access to and use of the ABHI website." };

export default function Page() {
  return <LegalDoc slug="terms-of-use" title="Terms of use" />;
}
