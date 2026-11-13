import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { deposits } from "@/lib/content";
import options from "@/data/form-options.json";

export const dynamicParams = false;

export function generateStaticParams() {
  return deposits.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/deposits/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = deposits.find((x) => x.slug === slug);
  return d ? { title: d.name, description: d.summary } : {};
}

/** Map a product to the matching option of the original deposit application form. */
function accountOption(name: string) {
  const key = name.toLowerCase().replace("tahafuz", "tahaffuz").replace(" account", "");
  return options.accountTypes.find((o) => o.toLowerCase().replace(" account", "") === key) ?? "";
}

export default async function DepositDetail({ params }: PageProps<"/deposits/[slug]">) {
  const { slug } = await params;
  const d = deposits.find((x) => x.slug === slug);
  if (!d) notFound();
  const related = deposits
    .filter((x) => x.slug !== d.slug && x.type === d.type)
    .concat(deposits.filter((x) => x.slug !== d.slug && x.type !== d.type))
    .slice(0, 3)
    .map((x) => ({ href: `/deposits/${x.slug}`, title: x.name, image: x.image, text: x.summary }));
  return (
    <ProductDetail
      crumbs={[{ label: "Deposits", href: "/deposits" }, { label: d.name }]}
      overline={`${d.type} account`}
      name={d.name}
      summary={d.headline ?? d.summary}
      intro={d.intro}
      image={d.image}
      sections={d.sections}
      badge={d.categories.includes("women") ? "For women" : null}
      formId="deposit-application"
      formInitial={{ accountType: accountOption(d.name) }}
      formTitle="Deposit online application"
      related={related}
    />
  );
}
