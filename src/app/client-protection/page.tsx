import type { Metadata } from "next";
import { Globe, Mail, MapPin, Phone, Printer } from "lucide-react";
import { ButtonLink, PageHero } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Client protection",
  description: "Grievance Commissioner Cell for Overseas Pakistanis at the Federal Ombudsman Secretariat — contact details and how to raise a grievance.",
};

export default function ClientProtectionPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Help" }, { label: "Client protection" }]}
        overline="Client protection"
        title={
          <>
            Your rights, <span className="accent">protected.</span>
          </>
        }
        lead="The Honorable Federal Ombudsman of Pakistan, Mr. M. Salman Faruqui NI, has established the Grievance Commissioner Cell for Overseas Pakistanis in the Federal Ombudsman Secretariat to address the individual and systemic issues of overseas Pakistanis related to Federal Government ministries, departments, organisations and agencies."
      >
        <div className="cluster">
          <ButtonLink href="/complaint-and-suggestion" arrow>
            Complain to ABHI first
          </ButtonLink>
        </div>
      </PageHero>
      <section className="section">
        <div className="container split split--start">
          <div className="stack" style={{ gap: 18 }}>
            <span className="overline">Grievance Commissioner for Overseas Pakistanis</span>
            <h2 className="h2">Hafiz Ahsaan Ahmad Khokhar</h2>
            <p className="body">
              Advocate Supreme Court of Pakistan, Senior Advisor Law / Registrar, appointed as Grievance Commissioner for Overseas Pakistanis under section 7 of the Federal Ombudsman Institutional Reforms Act, 2013.
            </p>
          </div>
          <div className="stack" style={{ gap: 12 }}>
            {[
              [Globe, "www.ombudsman.gov.pk", "https://www.ombudsman.gov.pk"],
              [Mail, "hafizahsaan1973@gmail.com", "mailto:hafizahsaan1973@gmail.com"],
              [Mail, "Advisor.hakhokhar@ombusdsman.gov.pk", "mailto:Advisor.hakhokhar@ombusdsman.gov.pk"],
              [Phone, "Landline: 0092-51-9217243", "tel:+92519217243"],
              [Printer, "Fax: 0092-51-9217256", null],
              [Phone, "Mobile: 0092-51-300-8487161", null],
              [MapPin, "Federal (Wafaqi Mohtasib) Ombudsman Secretariat, 36-Constitution Avenue, G-5/2 Islamabad, Pakistan", null],
            ].map(([I, t, h], k) => {
              const Ico = I as typeof Phone;
              const inner = (
                <>
                  <span className="icon-tile">
                    <Ico size={18} aria-hidden="true" />
                  </span>
                  <span style={{ alignSelf: "center", wordBreak: "break-word" }}>{t as string}</span>
                </>
              );
              return h ? (
                <a key={k} href={h as string} className="card card--interactive locator__item" style={{ flexDirection: "row" }} {...((h as string).startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {inner}
                </a>
              ) : (
                <div key={k} className="card locator__item">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
