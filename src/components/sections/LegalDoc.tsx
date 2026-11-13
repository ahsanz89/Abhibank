import { PageHero } from "@/components/ui/primitives";
import { legal } from "@/lib/content";
import Link from "next/link";
import { LEGAL_LINKS } from "@/lib/site";

export function LegalDoc({ slug, title }: { slug: string; title: string }) {
  const doc = legal[slug];
  const blocks = doc.blocks;
  return (
    <>
      <PageHero crumbs={[{ label: "Privacy", href: "/privacy" }, { label: title }]} overline="Legal" title={title} />
      <section className="section section--tight">
        <div className="container doc-layout">
          <nav aria-label="Legal documents" className="doc-filters">
            <div className="stack" style={{ gap: 4 }}>
              {LEGAL_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="doc-cat" aria-current={l.href === `/${slug}` ? "page" : undefined} style={l.href === `/${slug}` ? { background: "var(--navy-800)", color: "var(--brand)" } : undefined}>
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="prose" style={{ maxWidth: 820 }}>
            {groupLists(blocks).map((b, i) =>
              Array.isArray(b) ? (
                <ul key={i}>
                  {b.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : b.k === "h" ? (
                <h2 key={i}>{b.t}</h2>
              ) : (
                <p key={i}>{b.t}</p>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function groupLists(blocks: { k: string; t: string }[]) {
  const out: ({ k: string; t: string } | string[])[] = [];
  for (const b of blocks) {
    if (b.k === "li") {
      const last = out[out.length - 1];
      if (Array.isArray(last)) last.push(b.t);
      else out.push([b.t]);
    } else out.push(b);
  }
  return out;
}
