import Link from "next/link";

import { ChevronRight } from "@/components/icons";
import { Logo } from "@/components/logo";

export function LegalPlaceholder({ title, description }: { title: string; description: string }) {
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
        </div>
      </div>
    </main>
  );
}
