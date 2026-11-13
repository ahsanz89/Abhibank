"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="page-hero dots" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="container page-hero__inner stack" style={{ gap: 24 }}>
        <span className="overline">Something went wrong</span>
        <h1 className="h1">We hit an unexpected error.</h1>
        <p className="lead">Please try again. If the problem continues, call our 24/7 helpline on (042) 111-111-562.</p>
        <div className="cluster">
          <button type="button" className="btn btn--primary" onClick={reset}>
            Try again
          </button>
          <Link href="/" className="btn btn--secondary">
            Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
