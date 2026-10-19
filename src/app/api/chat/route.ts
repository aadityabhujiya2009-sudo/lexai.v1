import { NextResponse } from "next/server";

import type { ChatRequestMessage } from "@/components/chat/types";
import {
  LegalInformationProviderError,
  type LegalInformationProviderErrorKind,
} from "@/lib/ai/provider";
import { GeminiLegalInformationProvider } from "@/lib/ai/gemini-provider";
import { getCookieValue, hasCurrentTermsAcceptance, TERMS_ACCEPTANCE_COOKIE } from "@/lib/terms";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_MESSAGES = 20;
const MAX_TOTAL_REQUEST_BYTES = 100_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

const rateLimitStore = new Map<string, number[]>();

function getClientIp(request: Request) {
  if (process.env.NETLIFY === "true") {
    const netlifyIp = request.headers.get("x-nf-client-connection-ip")?.trim();
    return netlifyIp || "unknown-client";
  }

  // Do not fall back to client-supplied forwarding headers. During local
  // development, use one shared bucket because no trusted platform IP exists.
  return "local-dev";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recentRequests = (rateLimitStore.get(ip) ?? []).filter((timestamp) => timestamp > windowStart);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, recentRequests);
    return true;
  }

  rateLimitStore.set(ip, [...recentRequests, now]);
  return false;
}

function isChatRequestMessage(value: unknown): value is ChatRequestMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const message = value as { role?: unknown; content?: unknown };
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_MESSAGE_LENGTH
  );
}

function getMessages(body: unknown): unknown {
  if (!body || typeof body !== "object" || !("messages" in body)) {
    return null;
  }

  return body.messages;
}

function logDiagnostic(status: number, errorType: string, startedAt: number) {
  console.info("[chat]", {
    status,
    errorType,
    durationMs: Date.now() - startedAt,
  });
}

function jsonResponse(body: object, status: number, errorType: string, startedAt: number) {
  logDiagnostic(status, errorType, startedAt);
  return NextResponse.json(body, { status });
}

function providerFailureResponse(error: unknown, startedAt: number) {
  if (error instanceof LegalInformationProviderError) {
    const responseByKind: Record<LegalInformationProviderErrorKind, { status: number; message: string }> = {
      rate_limit: { status: 429, message: "The assistant is temporarily rate limited. Please try again shortly." },
      timeout: { status: 504, message: "The assistant took too long to respond. Please try again." },
      unavailable: { status: 502, message: "The assistant is temporarily unavailable. Please try again later." },
      empty_response: { status: 502, message: "The assistant could not generate a response." },
      unknown: { status: 500, message: "The assistant could not generate a response." },
    };
    const mapped = responseByKind[error.kind];
    return jsonResponse({ error: mapped.message }, mapped.status, error.kind, startedAt);
  }

  return jsonResponse({ error: "The assistant could not generate a response." }, 500, "unknown", startedAt);
}

export async function POST(request: Request) {
  const startedAt = Date.now();

  if (!hasCurrentTermsAcceptance(getCookieValue(request.headers.get("cookie"), TERMS_ACCEPTANCE_COOKIE))) {
    return jsonResponse(
      { error: "Please review and accept the current LexAI terms before using the assistant." },
      403,
      "terms_not_accepted",
      startedAt,
    );
  }

  // Best effort only: each serverless instance has separate memory. A shared
  // store such as Netlify Blobs, Upstash, or Redis should replace this later.
  if (isRateLimited(getClientIp(request))) {
    return jsonResponse({ error: "Too many requests. Please try again shortly." }, 429, "rate_limit", startedAt);
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_TOTAL_REQUEST_BYTES) {
    return jsonResponse({ error: "Request is too large." }, 413, "request_too_large", startedAt);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_TOTAL_REQUEST_BYTES) {
    return jsonResponse({ error: "Request is too large." }, 413, "request_too_large", startedAt);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Invalid chat request." }, 400, "invalid_payload", startedAt);
  }

  const messages = getMessages(body);
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_HISTORY_MESSAGES ||
    !messages.every(isChatRequestMessage)
  ) {
    return jsonResponse({ error: "Invalid chat request." }, 400, "invalid_payload", startedAt);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: "The assistant is temporarily unavailable." }, 503, "missing_configuration", startedAt);
  }

  try {
    const provider = new GeminiLegalInformationProvider(apiKey);
    const result = await provider.getInformation({ messages });

    return jsonResponse(
      { reply: { role: "assistant", content: result.text } },
      200,
      "success",
      startedAt,
    );
  } catch (error) {
    return providerFailureResponse(error, startedAt);
  }
}
