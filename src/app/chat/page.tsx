import Link from "next/link";

import { ArrowUpRight, ChevronRight } from "@/components/icons";
import { Logo } from "@/components/logo";

export default function ChatPlaceholder() {
  return (
    <main className="min-h-screen bg-ivory text-forest-950">
      <header className="border-b border-forest-950/10">
        <div className="page-shell flex h-[76px] items-center justify-between">
          <Logo />
          <Link className="button button-quiet button-small" href="/">
            Back to home <ChevronRight className="size-4 rotate-180" />
          </Link>
        </div>
      </header>
      <div className="page-shell flex min-h-[calc(100vh-76px)] items-center py-20">
        <div className="w-full max-w-2xl">
          <div className="eyebrow mb-7"><span className="eyebrow-dot" /> Assistant preview</div>
          <h1 className="display-title max-w-xl text-5xl leading-[0.98] tracking-[-0.045em] sm:text-7xl">A more thoughtful conversation is on its way.</h1>
          <p className="body-copy mt-8 max-w-xl text-lg leading-8">The assistant will be added in the next stage. For now, this preview marks the place where you will be able to explore legal concepts and prepare better questions.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link className="button button-primary" href="/">Return to LexAI <ArrowUpRight className="size-4 rotate-180" /></Link>
            <Link className="button button-quiet" href="/#disclaimer">Read the boundaries <ChevronRight className="size-4" /></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
