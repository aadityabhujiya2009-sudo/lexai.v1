import Link from "next/link";

export function Logo() {
  return (
    <Link aria-label="LexAI home" className="group inline-flex items-center gap-2.5" href="/">
      <span className="logo-mark" aria-hidden="true">
        <svg fill="none" viewBox="0 0 32 32"><path d="M9 7v18h13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /><path d="M23 7c-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" /></svg>
      </span>
      <span className="font-serif text-[1.45rem] tracking-[-0.04em] text-forest-950">LexAI</span>
    </Link>
  );
}
