import Link from "next/link";
import { ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="page-hero dots" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container page-hero__inner stack" style={{ gap: 28 }}>
        <span className="overline">Error 404</span>
        <h1 className="display">
          This page has <span className="accent">moved on.</span>
        </h1>
        <p className="lead">The page you’re looking for doesn’t exist or has a new address on our redesigned website.</p>
        <div className="cluster">
          <ButtonLink href="/" arrow>
            Go to the homepage
          </ButtonLink>
          <ButtonLink href="/connect-with-abhi" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
        <p className="hint">
          Looking for documents? Try the <Link href="/financials">document centre</Link>.
        </p>
      </div>
    </section>
  );
}
