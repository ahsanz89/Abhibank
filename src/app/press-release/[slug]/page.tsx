import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/primitives";
import { formatDate, press } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return press.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/press-release/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = press.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.headline, description: p.excerpt, openGraph: { type: "article", publishedTime: p.date, images: p.image ? [p.image] : undefined } };
}

export default async function PressArticle({ params }: PageProps<"/press-release/[slug]">) {
  const { slug } = await params;
  const p = press.find((x) => x.slug === slug);
  if (!p) notFound();
  const more = press.filter((x) => x.slug !== p.slug).slice(0, 3);
  const jsonLd = { "@context": "https://schema.org", "@type": "NewsArticle", headline: p.headline, datePublished: p.date, publisher: { "@type": "Organization", name: "ABHI Microfinance Bank" } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <section className="page-hero dots">
          <div className="container page-hero__inner" style={{ maxWidth: 1040 }}>
            <Breadcrumbs items={[{ label: "Press releases", href: "/press-release" }, { label: p.title }]} />
            <div className="stack" style={{ gap: 22, marginTop: 48 }}>
              <span className="cluster" style={{ gap: 10 }}>
                <span className="badge">Press release</span>
                <time className="hint" dateTime={p.date}>
                  {formatDate(p.date)}
                </time>
              </span>
              <h1 className="h1" style={{ fontSize: "clamp(36px, 4.6vw, 64px)" }}>
                {p.headline}
              </h1>
            </div>
          </div>
        </section>
        <section className="section section--tight">
          <div className="container stack" style={{ maxWidth: 1040, gap: 48 }}>
            {p.image && <Image src={p.image} alt="" width={1000} height={600} className="article-hero-img" priority />}
            <div className="prose" style={{ fontSize: 17, marginInline: "auto" }}>
              {p.body.map((para, i) => (para.startsWith("• ") ? <p key={i} style={{ paddingLeft: 18 }}>{para}</p> : <p key={i}>{para}</p>))}
            </div>
          </div>
        </section>
      </article>
      <section className="section section--surface">
        <div className="container">
          <h2 className="h3" style={{ marginBottom: 32 }}>
            More from the newsroom
          </h2>
          <div className="grid grid-3">
            {more.map((m) => (
              <Link key={m.slug} href={`/press-release/${m.slug}`} className="card card--interactive card--pad" style={{ gap: 12 }}>
                <span className="hint">{formatDate(m.date)}</span>
                <span className="product-card__title" style={{ fontSize: 21 }}>
                  {m.title}
                </span>
                <span className="product-card__desc">{m.headline}</span>
                <span className="link-arrow">
                  Read <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
