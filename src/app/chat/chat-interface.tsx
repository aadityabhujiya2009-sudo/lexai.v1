"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { ChatInput } from "@/components/chat/chat-input";
import { ErrorMessage } from "@/components/chat/error-message";
import { LoadingIndicator } from "@/components/chat/loading-indicator";
import { MessageList } from "@/components/chat/message-list";
import type { ChatMessage, ChatRequestMessage } from "@/components/chat/types";
import { ArrowUpRight, ChevronRight, Shield } from "@/components/icons";
import { Logo } from "@/components/logo";

const MAX_MESSAGE_LENGTH = 4000;
const ERROR_MESSAGE = "The assistant could not generate a response.";

const starterQuestions = [
  "What is the difference between a lease and a license?",
  "What should I look for when reviewing a contract?",
  "How can I prepare questions before speaking with a lawyer?",
];

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Welcome to LexAI. Ask about a legal concept, a document, or the questions you want to prepare for a qualified Indian legal professional. LexAI provides general information about Indian law only, and information may be incomplete or out of date.",
  },
];

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isAssistantReply(value: unknown): value is { role: "assistant"; content: string } {
  if (!value || typeof value !== "object") {
    return false;
  }

  const reply = value as { role?: unknown; content?: unknown };
  return reply.role === "assistant" && typeof reply.content === "string" && reply.content.length > 0;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryMessages, setRetryMessages] = useState<ChatRequestMessage[] | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isLoading, error]);

  const requestReply = useCallback(async (requestMessages: ChatRequestMessage[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: requestMessages }),
      });

      const data: unknown = await response.json();
      if (!response.ok || !data || typeof data !== "object" || !isAssistantReply((data as { reply?: unknown }).reply)) {
        throw new Error("Chat request failed");
      }

      const reply = (data as { reply: ChatRequestMessage }).reply;
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: createMessageId(), role: "assistant", content: reply.content },
      ]);
      setRetryMessages(null);
    } catch {
      setError(ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const trimmedContent = content.trim();
    if (!trimmedContent || isLoading || trimmedContent.length > MAX_MESSAGE_LENGTH) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmedContent,
    };
    const requestMessages: ChatRequestMessage[] = [
      ...messages.map(({ role, content: messageContent }) => ({ role, content: messageContent })),
      { role: userMessage.role, content: userMessage.content },
    ];

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setDraft("");
    setRetryMessages(requestMessages);
    await requestReply(requestMessages);
  }, [isLoading, messages, requestReply]);

  const handleRetry = useCallback(() => {
    if (retryMessages && !isLoading) {
      void requestReply(retryMessages);
    }
  }, [isLoading, requestReply, retryMessages]);

  const handleNewChat = () => {
    if (isLoading) {
      return;
    }

    setMessages(initialMessages);
    setDraft("");
    setError(null);
    setRetryMessages(null);
    inputRef.current?.focus();
  };

  return (
    <div className="flex min-h-screen flex-col bg-ivory text-forest-950">
      <header className="border-b border-forest-950/10 bg-ivory/95">
        <div className="page-shell flex min-h-[76px] items-center justify-between gap-4 py-3">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="button button-quiet button-small"
              disabled={isLoading}
              onClick={handleNewChat}
              type="button"
            >
              New chat
            </button>
            <Link className="button button-primary button-small" href="/">
              <span className="hidden sm:inline">Back to home</span>
              <span className="sm:hidden">Home</span>
              <ArrowUpRight className="size-4 rotate-180" />
            </Link>
          </div>
        </div>
      </header>

      <main className="page-shell flex w-full flex-1 flex-col pb-5 pt-8 sm:pb-8 sm:pt-12">
        <div className="mb-6 flex flex-col justify-between gap-6 sm:mb-8 sm:flex-row sm:items-end">
          <div>
            <div className="eyebrow mb-4"><span className="eyebrow-dot" /> Assistant preview</div>
            <h1 className="display-title text-4xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">Bring a better question.</h1>
            <p className="body-copy mt-4 max-w-2xl leading-7">Use this space to explore general information about Indian law and organize what you want to ask next.</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-forest-800/60">Information may be incomplete or out of date. Messages are sent to Google’s Gemini API for processing and are not stored by LexAI.</p>
          </div>
          <div className="chat-legal-notice shrink-0" id="chat-legal-notice">
            <Shield className="size-4 text-gold-700" />
            <span>Indian law information only; not legal advice.</span>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-7">
          <section aria-label="LexAI conversation" className="chat-card flex min-h-[calc(100svh-250px)] min-w-0 flex-col sm:min-h-[620px]">
            <div className="flex items-center justify-between border-b border-forest-950/10 px-4 py-4 sm:px-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-forest-800/55">Conversation</p>
                <p className="mt-1 font-serif text-lg text-forest-950">Start where you are</p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs text-forest-800/55"><span className="chat-status-dot" /> Ready</span>
            </div>

            <MessageList messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />

            <div className="chat-composer">
              {error ? <ErrorMessage message={error} onRetry={handleRetry} /> : null}
              {isLoading ? <LoadingIndicator /> : null}
              <ChatInput
                disabled={isLoading}
                inputRef={inputRef}
                maxLength={MAX_MESSAGE_LENGTH}
                onChange={setDraft}
                onSubmit={() => void sendMessage(draft)}
                value={draft}
              />
            </div>
          </section>

          <aside className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">
            <div className="chat-side-card">
              <div className="eyebrow mb-4"><span className="eyebrow-dot" /> Try a starting point</div>
              <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em]">Questions can be simple.</h2>
              <p className="mt-3 text-sm leading-6 text-forest-800/65">Choose one to see how a conversation can begin.</p>
              <div className="mt-6 flex flex-col gap-2">
                {starterQuestions.map((question) => (
                  <button
                    className="starter-question"
                    disabled={isLoading}
                    key={question}
                    onClick={() => void sendMessage(question)}
                    type="button"
                  >
                    <span>{question}</span>
                    <ChevronRight className="mt-0.5 size-4 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
            <div className="chat-side-card bg-forest-950 text-ivory">
              <Shield className="size-5 text-gold-400" />
              <p className="mt-4 font-serif text-xl leading-tight">Keep your judgment in the room.</p>
              <p className="mt-3 text-sm leading-6 text-ivory/60">Use LexAI for context and preparation. Speak with a qualified legal professional for advice about your situation.</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
