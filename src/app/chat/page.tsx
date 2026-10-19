import type { Metadata } from "next";

import { ChatInterface } from "@/app/chat/chat-interface";

export const metadata: Metadata = {
  title: "Assistant",
  description: "Explore general legal information about Indian law with clear boundaries.",
};

export default function ChatPage() {
  return <ChatInterface />;
}
