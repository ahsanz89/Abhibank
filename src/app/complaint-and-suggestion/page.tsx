import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { SmartForm } from "@/components/forms/SmartForm";
import { Accordion } from "@/components/ui/interactive";
import { CheckList, PageHero, SectionHeader, Feature } from "@/components/ui/primitives";
import { pepFocalPersons } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Complaints & suggestions",
  description: "Lodge a complaint or share feedback with ABHI Microfinance Bank by helpline, email, post or the online form. Escalate to the State Bank of Pakistan through Sunwai.",
};

export default function ComplaintsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Help" }, { label: "Complaints & suggestions" }]}
        overline="Customer support centre"
        title={
          <>
            We’re listening. <span className="accent">24/7.</span>
          </>
        }
        lead="If you’re not satisfied with any aspect of our product or service, or with misreporting in eCIB, you may lodge a formal complaint with ABHI Bank through any of the channels below."
      >
        <div className="cluster">
          <a href="#complaint-form" className="btn btn--primary">
            Lodge a complaint
          </a>
          <a href={SITE.helplineHref} className="btn btn--secondary">
            <Phone size={16} aria-hidden="true" /> {SITE.helpline}
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeader overline="Complaints lodgement" title="Choose the channel that suits you" />
          <div className="grid grid-4">
            {[
              [Phone, "Helpline", SITE.helpline, SITE.helplineHref],
              [Printer, "Fax", SITE.fax, `tel:${SITE.fax.replace(/-/g, "")}`],
              [Mail, "Email", SITE.email, `mailto:${SITE.email}`],
              [MapPin, "By post", "Customer Experience Unit, ABHI Microfinance Bank Limited Head Office, Plot No. 12, D-12 Markaz, Islamabad", "/head-office"],
            ].map(([I, t, v, h]) => {
              const Ico = I as typeof Phone;
              return (
                <a key={t as string} href={h as string} className="card card--interactive card--pad" style={{ gap: 14 }}>
                  <span className="icon-tile">
                    <Ico size={19} aria-hidden="true" />
                  </span>
                  <span className="hint">{t as string}</span>
                  <b style={{ fontWeight: 500, lineHeight: 1.45 }}>{v as string}</b>
                </a>
              );
            })}
          </div>
          <p className="body" style={{ marginTop: 28 }}>
            You can also send written complaints on the complaint form available in our branches or on plain paper to the address above, or drop them in the complaint boxes in our branches.
          </p>
        </div>
      </section>

      <section className="section section--surface" id="complaint-form">
        <div className="container split split--start split--wide-right">
          <div className="stack" style={{ gap: 24 }}>
            <span className="overline">Online form</span>
            <h2 className="h2">Complaint &amp; feedback form</h2>
            <p className="body">You’ll receive a reference number as soon as you submit. Keep it for follow-up with our helpline.</p>
            <div className="stack" style={{ gap: 14 }}>
              <h3 className="h4">Also on the helpline (IVR)</h3>
              <CheckList
                items={[
                  "Self-service digital channel blocking (ATM card and account blocking)",
                  "TPIN generation",
                  "Balance inquiry",
                  "Mini statement of the last 5 transactions",
                  "Callback facility: request a callback instead of waiting in the queue",
                ]}
              />
            </div>
          </div>
          <div className="card card--pad" style={{ background: "var(--navy-950)" }}>
            <SmartForm formId="complaint" submitLabel="Submit complaint" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader overline="Escalation" title="If you’re not satisfied, here’s what happens next" />
          <div className="grid grid-3">
            <Feature brand num="01" title="Contact ABHI" text="Use the helpline, email, post, branch complaint boxes or the online form. You’ll get a reference number." />
            <Feature brand num="02" title="State Bank of Pakistan" text="Lodge a complaint with the SBP Banking Conduct & Consumer Protection Department or through Sunwai." />
            <Feature brand num="03" title="Federal Ombudsman" text="Overseas Pakistanis can also approach the Grievance Commissioner Cell at the Federal Ombudsman Secretariat." />
          </div>
          <div className="card card--pad" style={{ marginTop: 40, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            <div className="stack" style={{ gap: 8 }}>
              <span className="overline">Complaint logging with SBP</span>
              <p className="body">Banking Conduct and Consumer Protection Department, State Bank of Pakistan, I.I. Chundrigar Road, Karachi.</p>
            </div>
            <div className="stack small" style={{ gap: 6, fontWeight: 300 }}>
              <span>Phone: <a href="tel:+9221111727273">+92-21-111-727-273</a></span>
              <span>Fax: +92-21-99221160</span>
              <span>Email: <a href="mailto:cpd.helpdesk@sbp.org.pk">cpd.helpdesk@sbp.org.pk</a></span>
              <span>Sunwai: <a href={SITE.sunwai} target="_blank" rel="noopener noreferrer">sunwai.sbp.org.pk</a></span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHeader overline="Politically exposed persons (PEPs)" title="Focal persons" />
          <div className="table-wrap">
            <table className="table" style={{ minWidth: 880 }}>
              <thead>
                <tr>
                  {["Name", "Department", "Designation", "Landline", "Cell", "Email"].map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pepFocalPersons.map((p) => (
                  <tr key={p.name}>
                    <td className="strong">{p.name}</td>
                    <td>{p.department}</td>
                    <td>{p.designation}</td>
                    <td>{p.landline || "—"}</td>
                    <td>{p.cell}</td>
                    <td>
                      <a href={`mailto:${p.email}`}>{p.email}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--start">
          <div className="stack" style={{ gap: 24 }}>
            <span className="overline">Electronic funds transfer</span>
            <h2 className="h2">EFT complaints &amp; resolution times</h2>
            <p className="body">ABHI Bank provides Electronic Funds Transfer through the ABHIBank App and ATMs. To report theft or loss, or for any query, call {SITE.helpline}.</p>
            <Image src="/assets/about/eft.webp" alt="Electronic funds transfer information in Urdu" width={1400} height={438} style={{ borderRadius: 16, border: "1px solid var(--line)" }} />
          </div>
          <Accordion
            items={[
              {
                q: "How long does an EFT complaint take to resolve?",
                a: (
                  <div className="stack" style={{ gap: 10 }}>
                    <CheckList items={["Fund transfer within the bank — next working day.", "Inter-bank funds transfer (IBFT) — 3 working days."]} />
                    <p>For IBFT transactions, if a complaint is lodged on the same day as the transaction, the bank will log the dispute on the basis of settlement on the next working day.</p>
                  </div>
                ),
              },
              { q: "Will my information be shared with the receiving bank?", a: "In case of inter-bank funds transfer, the sender’s information may be shared with the receiving bank to meet SBP obligations." },
              {
                q: "What are the consequences of late payment or default?",
                a: "All banks and financial institutions obtain a Credit Information Report (CIR) from the Credit Information Bureau before approving financing. Delayed or missed instalments are reported in the CIR, which can make it very difficult to obtain future loans. The collection and recovery process may also be initiated against the customer, guarantor, co-borrower or business partner, including phone calls and field visits.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
