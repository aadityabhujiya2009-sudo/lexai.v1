import { NextResponse } from "next/server";

import type { ChatRequestMessage } from "@/components/chat/types";

const DEV_MOCK_PREFIX = "[DEV MOCK, not a real AI response]";

function isChatRequestMessage(value: unknown): value is ChatRequestMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const message = value as { role?: unknown; content?: unknown };
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.length > 0 &&
    message.content.length <= 4000
  );
}

export async function POST(request: Request) {
  // TEMPORARY: This route exists only to exercise the Stage 2 UI. Replace it with
  // the server-side provider implementation before enabling production chat.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "The LexAI assistant is not available in this stage." },
      { status: 503 },
    );
  }

  try {
    const body: unknown = await request.json();
    const messages = body && typeof body === "object" && "messages" in body ? body.messages : null;

    if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isChatRequestMessage)) {
      return NextResponse.json({ error: "Invalid chat request." }, { status: 400 });
    }

    return NextResponse.json({
      reply: {
        role: "assistant",
        content: `${DEV_MOCK_PREFIX} This temporary response confirms that the chat interface received your message. No real AI analysis has been generated.`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to process the chat request." }, { status: 400 });
  }
}
