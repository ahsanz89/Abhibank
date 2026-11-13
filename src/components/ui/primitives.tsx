import Link from "next/link";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

function btnClass(variant: Variant = "primary", size: Size = "md", block?: boolean, extra?: string) {
  return ["btn", `btn--${variant}`, size !== "md" && `btn--${size}`, block && "btn--block", extra].filter(Boolean).join(" ");
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function ButtonLink({
  href,
  children,
  variant,
  size,
  block,
  arrow,
  className,
  ...rest
}: { href: string; variant?: Variant; size?: Size; block?: boolean; arrow?: boolean; children: ReactNode } & Omit<ComponentProps<"a">, "href">) {
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="arrow" size={18} strokeWidth={1.8} aria-hidden="true" />}
    </>
  );
  const cls = btnClass(variant, size, block, className);
  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

export function Button({
  variant,
  size,
  block,
  className,
  children,
  ...rest
}: { variant?: Variant; size?: Size; block?: boolean } & ComponentProps<"button">) {
  return (
    <button type="button" className={btnClass(variant, size, block, className)} {...rest}>
      {children}
    </button>
  );
}

export function SmartLink({ href, children, ...rest }: { href: string; children: ReactNode } & Omit<ComponentProps<"a">, "href">) {
  if (isExternal(href)) {
    return (
      <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export function SectionHeader({
  overline,
  title,
  lead,
  action,
  center,
  as: Tag = "h2",
}: {
  overline?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`section-head${center ? " section-head--center" : ""}`}>
      <div className="section-head__text">
        {overline && <span className="overline">{overline}</span>}
        <Tag className="h2">{title}</Tag>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((it, i) => (
          <li key={it.label}>
            <ChevronRight size={14} aria-hidden="true" />
            {it.href && i < items.length - 1 ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumbs,
  overline,
  title,
  lead,
  aside,
  children,
}: {
  crumbs: { label: string; href?: string }[];
  overline?: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero dots">
      <div className="container page-hero__inner">
        <Breadcrumbs items={crumbs} />
        <div className={`page-hero__body${aside ? "" : " page-hero__body--single"}`}>
          <div className="page-hero__text">
            {overline && <span className="overline">{overline}</span>}
            <h1 className="h1">{title}</h1>
            {lead && <p className="lead">{lead}</p>}
            {children}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="check-list">
      {items.map((it, i) => (
        <li key={i}>
          <Check size={16} strokeWidth={2.4} aria-hidden="true" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: ReactNode;
  text: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section section--flush-top">
      <div className="container">
        <div className="cta-band">
          <div className="cta-band__text">
            <h2 className="h2">{title}</h2>
            <p className="lead">{text}</p>
          </div>
          <div className="cluster">
            <ButtonLink href={primary.href} arrow>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="secondary">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Feature({ num, title, text, brand }: { num?: string; title: ReactNode; text: ReactNode; brand?: boolean }) {
  return (
    <div className={`feature${brand ? " feature--brand" : ""}`}>
      {num && <span className="feature__num">{num}</span>}
      <b className="feature__title">{title}</b>
      <p className="feature__text">{text}</p>
    </div>
  );
}
