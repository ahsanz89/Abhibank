import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { loans } from "@/lib/content";
import options from "@/data/form-options.json";

export const dynamicParams = false;

export function generateStaticParams() {
  return loans.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/loans/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = loans.find((x) => x.slug === slug);
  return l ? { title: l.name, description: l.summary } : {};
}

/** Map a product to the matching option of the original loan application form. */
function loanOption(name: string) {
  const first = name.split(/[ (]/)[0].toLowerCase().replace("light", "light commercial");
  return options.loanTypes.find((o) => o.toLowerCase().startsWith(first)) ?? "";
}

export default async function LoanDetail({ params }: PageProps<"/loans/[slug]">) {
  const { slug } = await params;
  const l = loans.find((x) => x.slug === slug);
  if (!l) notFound();
  const related = loans
    .filter((x) => x.slug !== l.slug && x.categories.some((c) => l.categories.includes(c)))
    .concat(loans.filter((x) => x.slug !== l.slug))
    .filter((x, i, a) => a.findIndex((y) => y.slug === x.slug) === i)
    .slice(0, 3)
    .map((x) => ({ href: `/loans/${x.slug}`, title: x.name, image: x.image, text: x.summary }));
  return (
    <ProductDetail
      crumbs={[{ label: "Loans", href: "/loans" }, { label: l.name }]}
      overline="Loan"
      name={l.name}
      summary={l.summary}
      intro={l.intro}
      image={l.image}
      sections={l.sections}
      badge={l.amountRange}
      formId="loan-application"
      formInitial={{ loanType: loanOption(l.name) }}
      formTitle="Apply for a loan"
      related={related}
    />
  );
}
