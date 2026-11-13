import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { SmartForm } from "@/components/forms/SmartForm";
import { PageHero } from "@/components/ui/primitives";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "EWA employee / employer enquiry",
  description: "Bring Earned Wage Access to your organisation or experience EWA with ABHI. Send an enquiry to our team.",
};

export default function EwaContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Abhi Salary (EWA)", href: "/ewa" }, { label: "Enquiry" }]}
        overline="EWA employee / employer"
        title={
          <>
            Bring Earned Wage Access <span className="accent">to your organisation.</span>
          </>
        }
        lead="Experience Earned Wage Access with ABHI. Tell us about yourself and your company and our team will get in touch."
      />
      <section className="section">
        <div className="container split split--start split--wide-right">
          <div className="stack" style={{ gap: 20 }}>
            <h2 className="h3">Talk to the EWA team</h2>
            <p className="body">Employers get higher employee satisfaction, reduced financial stress and better retention. Employees get their earned salary in 30 seconds.</p>
            <a href={SITE.helplineHref} className="cluster" style={{ color: "#fff", gap: 10 }}>
              <Phone size={18} className="accent" aria-hidden="true" /> {SITE.helpline}
            </a>
            <a href={`mailto:${SITE.email}`} className="cluster" style={{ color: "#fff", gap: 10 }}>
              <Mail size={18} className="accent" aria-hidden="true" /> {SITE.email}
            </a>
          </div>
          <div className="card card--pad card--solid">
            <SmartForm formId="ewa-enquiry" submitLabel="Send enquiry" footnote="By submitting, you agree to be contacted by ABHI about Earned Wage Access." />
          </div>
        </div>
      </section>
    </>
  );
}
