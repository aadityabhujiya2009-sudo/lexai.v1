import Link from "next/link";

import { ArrowUpRight, Check, ChevronRight, Shield, Spark, TextDocument } from "@/components/icons";
import { Logo } from "@/components/logo";

const features = [
  {
    icon: TextDocument,
    number: "01",
    title: "Explore concepts",
    description:
      "Get a clearer starting point when a legal term or process feels unfamiliar.",
  },
  {
    icon: Spark,
    number: "02",
    title: "Understand documents",
    description:
      "Break down dense language into practical context you can review at your pace.",
  },
  {
    icon: ChevronRight,
    number: "03",
    title: "Prepare better questions",
    description:
      "Organize what you know so conversations with a qualified legal professional can be more focused.",
  },
];

const steps = [
  {
    number: "01",
    title: "Bring your question",
    description: "Start with the concept, document, or situation you want to understand.",
  },
  {
    number: "02",
    title: "Get oriented",
    description: "Use plain-language context to see the important ideas and open questions.",
  },
  {
    number: "03",
    title: "Decide what comes next",
    description: "Take a more considered next step, including when to seek professional advice.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-ivory text-forest-950">
      <header className="relative z-10 border-b border-forest-950/10">
        <div className="page-shell flex h-[76px] items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
            <Link className="nav-link" href="#features">
              Features
            </Link>
            <Link className="nav-link" href="#how-it-works">
              How it works
            </Link>
            <Link className="nav-link" href="#privacy">
              Privacy
            </Link>
          </nav>
          <Link className="button button-primary button-small" href="/chat">
            Try the assistant
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </header>

      <main>
        <section className="relative border-b border-forest-950/10">
          <div className="page-shell grid items-center gap-16 py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:gap-12 lg:py-28">
            <div className="relative z-10 max-w-3xl">
              <div className="eyebrow mb-7">
                <span className="eyebrow-dot" />
                A clearer way to start
              </div>
              <h1 className="display-title max-w-3xl text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[5.5rem]">
                Understand the law. <em>Make informed decisions.</em>
              </h1>
              <p className="body-copy mt-8 max-w-xl text-lg leading-8 sm:text-xl">
                LexAI helps you explore legal concepts, understand documents, and prepare better questions for a qualified legal professional.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-6 text-forest-800/65">First-launch scope: general legal information about Indian law only. Information may be incomplete or out of date, so verify important points with a qualified Indian lawyer.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link className="button button-primary" href="/chat">
                  Try the assistant
                  <ArrowUpRight className="size-4" />
                </Link>
                <Link className="button button-quiet" href="#features">
                  Learn more
                  <ChevronRight className="size-4" />
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-forest-950/10 pt-5 text-sm text-forest-800/75">
                <span className="inline-flex items-center gap-2">
                  <Check className="size-4 text-gold-600" />
                  Plain-language context
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check className="size-4 text-gold-600" />
                  Thoughtful next steps
                </span>
              </div>
            </div>

            <div className="hero-preview relative mx-auto w-full max-w-[490px] lg:mr-0">
              <div className="absolute -inset-7 rounded-[40px] border border-gold-500/15" />
              <div className="absolute -inset-3 rounded-[34px] border border-forest-950/10" />
              <div className="relative rounded-[28px] border border-forest-950/10 bg-white p-4 shadow-[0_24px_80px_rgba(24,55,45,0.12)] sm:p-6">
                <div className="flex items-center justify-between border-b border-forest-950/10 pb-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-forest-700/60">LexAI workspace</p>
                    <p className="mt-1 font-serif text-lg text-forest-950">A thoughtful first pass</p>
                  </div>
                  <span className="rounded-full border border-gold-600/30 bg-gold-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-forest-800">
                    Preview
                  </span>
                </div>
                <div className="mt-6 rounded-2xl bg-ivory px-5 py-5 sm:px-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-forest-950 text-xs font-semibold text-ivory">Q</span>
                    <p className="font-serif text-[1.08rem] leading-7 text-forest-950">
                      What should I understand before I speak with a lawyer?
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-forest-950/10 px-5 py-5 sm:px-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-gold-600/40 bg-gold-500/10 text-xs font-semibold text-gold-700">i</span>
                    <div>
                      <p className="font-semibold text-forest-950">Start with the basics</p>
                      <p className="mt-1 text-sm leading-6 text-forest-800/70">Clarify the key terms, what you already know, and what still needs a professional view.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs text-forest-800/55">
                  <span className="inline-flex items-center gap-2"><Shield className="size-3.5" /> Built with clear boundaries</span>
                  <span>01 / 03</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-32 left-1/2 hidden size-[520px] -translate-x-1/2 rounded-full border border-gold-500/10 lg:block" />
        </section>

        <section className="page-shell py-24 sm:py-32" id="features">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" /> What LexAI is for</div>
              <h2 className="section-title max-w-md">A calmer place to begin.</h2>
              <p className="body-copy mt-6 max-w-sm leading-7">Legal information can feel difficult to approach. LexAI gives you structure and context before the next conversation.</p>
            </div>
            <div className="grid divide-y divide-forest-950/10 border-y border-forest-950/10">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div className="group grid gap-5 py-7 sm:grid-cols-[80px_1fr] sm:gap-8 sm:py-9" key={feature.number}>
                    <div className="flex items-start justify-between sm:block">
                      <div className="flex size-12 items-center justify-center rounded-2xl border border-forest-950/10 bg-white text-forest-800 transition-colors duration-300 group-hover:border-gold-600/40 group-hover:text-gold-700">
                        <Icon className="size-5" />
                      </div>
                      <span className="font-mono text-xs tracking-[0.2em] text-forest-800/45 sm:mt-5 sm:block">{feature.number}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-forest-950">{feature.title}</h3>
                      <p className="mt-2 max-w-lg leading-7 text-forest-800/70">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-forest-950/10 bg-forest-950 text-ivory" id="how-it-works">
          <div className="page-shell py-24 sm:py-32">
            <div className="max-w-2xl">
              <div className="eyebrow eyebrow-on-dark mb-6"><span className="eyebrow-dot" /> How it works</div>
              <h2 className="section-title text-ivory">Move from uncertainty to a better question.</h2>
              <p className="mt-6 max-w-xl leading-7 text-ivory/65">A simple rhythm for gathering context, noticing what matters, and deciding what deserves a qualified professional’s attention.</p>
            </div>
            <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map((step, index) => (
                <div className="relative border-t border-ivory/20 pt-6" key={step.number}>
                  {index < steps.length - 1 ? <div className="absolute right-0 top-[-1px] hidden w-8 border-t border-gold-500/60 md:block" /> : null}
                  <span className="font-mono text-xs tracking-[0.2em] text-gold-400">{step.number}</span>
                  <h3 className="mt-6 font-serif text-2xl text-ivory">{step.title}</h3>
                  <p className="mt-3 leading-7 text-ivory/60">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-shell py-24 sm:py-32" id="privacy">
          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <div className="eyebrow mb-6"><span className="eyebrow-dot" /> Privacy & security</div>
              <h2 className="section-title max-w-md">Trust is built with precise promises.</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
              <div className="flex size-16 items-center justify-center rounded-3xl bg-gold-500/15 text-gold-700"><Shield className="size-7" /></div>
              <div>
                <p className="max-w-2xl text-xl leading-9 text-forest-950 sm:text-2xl">LexAI is designed to help you think clearly about Indian legal information, with boundaries you can see.</p>
                <div className="mt-9 grid gap-4 border-t border-forest-950/10 pt-6 sm:grid-cols-3 sm:gap-6">
                  <div><p className="font-semibold text-forest-950">Clear boundaries</p><p className="mt-2 text-sm leading-6 text-forest-800/65">No pretending to be a lawyer or law firm.</p></div>
                  <div><p className="font-semibold text-forest-950">No false promises</p><p className="mt-2 text-sm leading-6 text-forest-800/65">No guarantees about outcomes or decisions.</p></div>
                  <div><p className="font-semibold text-forest-950">Current information</p><p className="mt-2 text-sm leading-6 text-forest-800/65">Indian law can change. Verify important points, including newer criminal-law terminology.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-shell pb-24 sm:pb-32" id="disclaimer">
          <div className="rounded-[28px] border border-gold-600/25 bg-[#f4ead5] px-6 py-9 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <div className="eyebrow mb-5"><span className="eyebrow-dot" /> Important to know</div>
              <h2 className="font-serif text-3xl tracking-[-0.025em] text-forest-950 sm:text-4xl">Information for orientation, not advice.</h2>
              <p className="mt-5 max-w-xl leading-7 text-forest-800/75">LexAI gives general legal information about Indian law only, not legal advice. It is not a lawyer or law firm, information may be incomplete or out of date, and it cannot guarantee any outcome. For advice about your situation, speak with a qualified Indian lawyer.</p>
            </div>
            <Link className="button button-dark mt-8 shrink-0 self-start lg:mt-0" href="/chat">See the preview <ArrowUpRight className="size-4" /></Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-forest-950/10">
        <div className="page-shell flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-forest-800/60">A clearer starting point for Indian legal information.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-forest-800/65">
            <Link className="footer-link" href="/privacy">Privacy</Link>
            <Link className="footer-link" href="/terms">Terms</Link>
            <Link className="footer-link" href="/disclaimer">Disclaimer</Link>
          </div>
          <p className="text-xs text-forest-800/45">© 2026 LexAI</p>
        </div>
      </footer>
    </div>
  );
}
