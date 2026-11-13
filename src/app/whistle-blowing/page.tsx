import type { Metadata } from "next";
import { Lock, Mail, MapPin, Phone } from "lucide-react";
import { SmartForm } from "@/components/forms/SmartForm";
import { PageHero } from "@/components/ui/primitives";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Whistle-blowing",
  description: "Raise genuine concerns about wrongdoing or misconduct — including malpractice, fraud or harassment — through ABHI’s dedicated whistle-blowing channel.",
};

export default function WhistlePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Help" }, { label: "Whistle-blowing" }]}
        overline="Whistle-blowing"
        title={
          <>
            Speak up, <span className="accent">safely.</span>
          </>
        }
        lead="AMB is committed to maintaining a culture of the highest ethics, integrity, transparency and competence in its business and customer handling, and ensures compliance with its Code of Conduct and Code of Ethics. Staff and any other person with a genuine concern about wrongdoing or misconduct (including malpractice, fraud or harassment) can raise it through this dedicated whistle-blowing channel."
      />
      <section className="section">
        <div className="container split split--start split--wide-right">
          <div className="stack" style={{ gap: 18 }}>
            <h2 className="h3">You can also contact us at</h2>
            <a href={SITE.helplineHref} className="cluster" style={{ color: "#fff", gap: 10 }}>
              <Phone size={18} className="accent" aria-hidden="true" /> {SITE.helpline} (24/7)
            </a>
            <a href={`mailto:${SITE.whistleEmail}`} className="cluster" style={{ color: "#fff", gap: 10 }}>
              <Mail size={18} className="accent" aria-hidden="true" /> {SITE.whistleEmail}
            </a>
            <span className="cluster" style={{ gap: 10, color: "var(--text-secondary)", fontWeight: 300 }}>
              <MapPin size={18} className="accent" aria-hidden="true" /> {SITE.address}
            </span>
            <div className="alert alert--info" style={{ marginTop: 12 }}>
              <Lock size={18} aria-hidden="true" />
              <span>Reports are sent over an encrypted connection and handled in confidence by the whistle-blowing team.</span>
            </div>
          </div>
          <div className="card card--pad card--solid">
            <SmartForm formId="whistleblow" submitLabel="Submit report" />
          </div>
        </div>
      </section>
    </>
  );
}
