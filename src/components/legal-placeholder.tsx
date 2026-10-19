import Link from "next/link";

import { ChevronRight } from "@/components/icons";
import { Logo } from "@/components/logo";

export function LegalPlaceholder({
  title,
  description,
  sections = [],
}: {
  title: string;
  description: string;
  sections?: readonly { heading: string; body: string }[];
}) {
  return (
    <main className="min-h-screen bg-ivory text-forest-950">
      <header className="border-b border-forest-950/10">
        <div className="page-shell flex h-[76px] items-center justify-between">
          <Logo />
          <Link className="button button-quiet button-small" href="/">Back to home <ChevronRight className="size-4 rotate-180" /></Link>
        </div>
      </header>
      <div className="page-shell flex min-h-[calc(100vh-76px)] items-center py-20">
        <div className="max-w-2xl">
          <div className="eyebrow mb-7"><span className="eyebrow-dot" /> LexAI {title.toLowerCase()}</div>
          <h1 className="display-title text-5xl leading-[0.98] tracking-[-0.045em] sm:text-7xl">{title}</h1>
          <p className="body-copy mt-8 max-w-xl text-lg leading-8">{description}</p>
          {sections.length > 0 ? (
            <div className="mt-8 grid max-w-2xl gap-4 border-t border-forest-950/10 pt-7">
              {sections.map((section) => (
                <section className="border-b border-forest-950/10 pb-6 last:border-b-0" key={section.heading}>
                  <h2 className="font-serif text-2xl tracking-[-0.02em] text-forest-950">{section.heading}</h2>
                  <p className="mt-2 leading-7 text-forest-800/75">{section.body}</p>
                </section>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
