import type { Metadata } from "next";
import { Locator } from "@/components/tools/Locator";
import { PageHero } from "@/components/ui/primitives";
import { atms, branchCount, regions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Branch network",
  description: `Find any of ABHI Microfinance Bank’s ${branchCount} branches across Azad Kashmir, Balochistan, Gilgit Baltistan, Islamabad, KPK, Punjab and Sindh, including accessible model branches.`,
};

export default function BranchesPage() {
  const accessible = regions.find((r) => r.region.startsWith("Accessible"));
  return (
    <>
      <PageHero
        crumbs={[{ label: "Help" }, { label: "Branch network" }]}
        overline="Branch network"
        title={
          <>
            Find ABHI <span className="accent">near you.</span>
          </>
        }
        lead={`${branchCount} branches across Pakistan — search by city, filter by region, or find an accessible model branch.`}
      />
      <section className="section section--tight">
        <div className="container stack" style={{ gap: 48 }}>
          <Locator regions={regions} atms={atms} initial="branches" />
          {accessible && (
            <div className="card card--pad stack" style={{ gap: 20 }}>
              <div className="stack" style={{ gap: 8 }}>
                <span className="overline">Accessible model branches</span>
                <h2 className="h3">{accessible.description || "Accessible branches for persons with disabilities"}</h2>
              </div>
              <div className="grid grid-3">
                {accessible.branches.map((b) => (
                  <div key={b.address} className="stack" style={{ gap: 4, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
                    <b style={{ fontWeight: 500 }}>{b.city}</b>
                    <span className="muted small" style={{ fontWeight: 300 }}>
                      {b.address}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
