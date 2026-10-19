"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ChatInterface } from "@/app/chat/chat-interface";
import { ArrowUpRight } from "@/components/icons";
import { Logo } from "@/components/logo";

type GateState = "review" | "saving" | "accepted" | "disagreed";

export function TermsGate() {
  const [state, setState] = useState<GateState>("review");
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const agreeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state === "disagreed" || state === "accepted") {
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const focusableSelector =
      "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])";
    const focusableElements = () => Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
    const previousActiveElement = document.activeElement as HTMLElement | null;

    agreeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const elements = focusableElements();
      if (elements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [state]);

  const handleAgree = async () => {
    setState("saving");
    setError(null);

    try {
      const response = await fetch("/api/terms-acceptance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Terms acceptance failed");
      }

      setState("accepted");
    } catch {
      setState("review");
      setError("We could not record your acceptance. Please try again.");
    }
  };

  if (state === "accepted") {
    return <ChatInterface />;
  }

  if (state === "disagreed") {
    return (
      <main className="min-h-screen bg-ivory text-forest-950">
        <header className="border-b border-forest-950/10">
          <div className="page-shell flex h-[76px] items-center justify-between">
            <Logo />
            <Link className="button button-quiet button-small" href="/">
              Return home
              <ArrowUpRight className="size-4 rotate-180" />
            </Link>
          </div>
        </header>
        <div className="page-shell flex min-h-[calc(100vh-76px)] items-center py-20">
          <div className="max-w-2xl">
            <div className="eyebrow mb-7"><span className="eyebrow-dot" /> Access paused</div>
            <h1 className="display-title text-5xl leading-[0.98] tracking-[-0.045em] sm:text-7xl">That’s okay.</h1>
            <p className="body-copy mt-8 max-w-xl text-lg leading-8">The assistant cannot be used without agreeing to the current LexAI terms. You can review them again whenever you are ready.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link className="button button-primary" href="/terms">Review the terms <ArrowUpRight className="size-4" /></Link>
              <Link className="button button-quiet" href="/">Return home</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory text-forest-950" aria-busy={state === "saving"}>
      <header className="border-b border-forest-950/10">
        <div className="page-shell flex h-[76px] items-center justify-between">
          <Logo />
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-800/55">Before you begin</span>
        </div>
      </header>
      <div className="page-shell flex min-h-[calc(100vh-76px)] items-center justify-center py-12 sm:py-20">
        <div
          aria-describedby="terms-gate-description"
          aria-labelledby="terms-gate-title"
          aria-modal="true"
          className="relative w-full max-w-2xl rounded-[28px] border border-forest-950/10 bg-white p-6 shadow-[0_24px_80px_rgba(24,55,45,0.12)] sm:p-10"
          ref={dialogRef}
          role="dialog"
        >
          <div className="eyebrow mb-5"><span className="eyebrow-dot" /> LexAI access</div>
          <h1 className="font-serif text-4xl leading-tight tracking-[-0.03em] text-forest-950" id="terms-gate-title">Please review before using the assistant.</h1>
          <p className="mt-5 leading-7 text-forest-800/75" id="terms-gate-description">LexAI provides general legal information about Indian law only. It is not legal advice, a lawyer, or a law firm, and using it does not create an attorney-client relationship.</p>
          <ul className="mt-6 grid gap-3 border-y border-forest-950/10 py-6 leading-7 text-forest-800/75">
            <li>Messages are sent to Google’s Gemini API to generate responses.</li>
            <li>Verify important information with a qualified Indian lawyer.</li>
            <li>You must be 18 or older to use the assistant.</li>
          </ul>
          <p className="mt-6 text-sm leading-6 text-forest-800/65">Read the full <Link className="underline underline-offset-4" href="/terms">Terms</Link> and <Link className="underline underline-offset-4" href="/privacy">Privacy notice</Link> before deciding.</p>
          {error ? <p className="mt-5 text-sm font-medium text-red-800" role="alert">{error}</p> : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              className="button button-primary"
              disabled={state === "saving"}
              onClick={() => void handleAgree()}
              ref={agreeButtonRef}
              type="button"
            >
              {state === "saving" ? "Recording…" : "I am 18 or older and I agree"}
            </button>
            <button className="button button-quiet" disabled={state === "saving"} onClick={() => setState("disagreed")} type="button">
              Disagree
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
