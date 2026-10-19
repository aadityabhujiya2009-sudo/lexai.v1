import type { RefObject } from "react";

import { AssistantBubble } from "@/components/chat/assistant-bubble";
import { LoadingIndicator } from "@/components/chat/loading-indicator";
import { UserBubble } from "@/components/chat/user-bubble";
import type { ChatMessage } from "@/components/chat/types";

type MessageListProps = {
  messages: ChatMessage[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
};

export function MessageList({ messages, isLoading, messagesEndRef }: MessageListProps) {
  return (
    <div aria-live="polite" aria-relevant="additions text" className="chat-message-list" role="log" aria-label="Conversation messages">
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? <UserBubble content={message.content} /> : <AssistantBubble content={message.content} />}
        </div>
      ))}
      {isLoading ? <LoadingIndicator compact /> : null}
      <div aria-hidden="true" ref={messagesEndRef} />
    </div>
  );
}
