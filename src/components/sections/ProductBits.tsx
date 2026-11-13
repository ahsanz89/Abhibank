import { ProductCard } from "@/components/sections/shared";
import { SectionHeader } from "@/components/ui/primitives";

export { CheckList, PageHero } from "@/components/ui/primitives";

export function ProductLinks({ title, items }: { title: string; items: { href: string; title: string; image: string; text: string }[] }) {
  if (!items.length) return null;
  return (
    <section className="section section--surface">
      <div className="container">
        <SectionHeader title={title} />
        <div className="grid grid-3">
          {items.map((i) => (
            <ProductCard key={i.href} href={i.href} image={i.image} title={i.title} text={i.text} cta="View details" />
          ))}
        </div>
      </div>
    </section>
  );
}
