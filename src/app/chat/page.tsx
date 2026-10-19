import type { Metadata } from "next";
import { cookies } from "next/headers";

import { ChatInterface } from "@/app/chat/chat-interface";
import { TermsGate } from "@/app/chat/terms-gate";
import { hasCurrentTermsAcceptance, TERMS_ACCEPTANCE_COOKIE } from "@/lib/terms";

export const metadata: Metadata = {
  title: "Assistant",
  description: "Explore general legal information about Indian law with clear boundaries.",
};

export default async function ChatPage() {
  const cookieStore = await cookies();
  const accepted = hasCurrentTermsAcceptance(cookieStore.get(TERMS_ACCEPTANCE_COOKIE)?.value);

  return accepted ? <ChatInterface /> : <TermsGate />;
}
