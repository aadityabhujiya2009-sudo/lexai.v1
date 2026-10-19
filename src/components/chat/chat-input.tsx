import type { RefObject } from "react";

import { SendButton } from "@/components/chat/send-button";

type ChatInputProps = {
  value: string;
  disabled: boolean;
  maxLength: number;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatInput({ value, disabled, maxLength, inputRef, onChange, onSubmit }: ChatInputProps) {
  const isNearLimit = value.length >= maxLength * 0.8;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <form
      aria-label="Send a message"
      className="chat-input-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className="sr-only" htmlFor="chat-message">Your question</label>
      <textarea
        aria-describedby="chat-input-meta"
        className="chat-textarea"
        disabled={disabled}
        id="chat-message"
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a general legal-information question..."
        ref={inputRef}
        rows={2}
        value={value}
      />
      <div className="flex items-center justify-between gap-3 pt-3" id="chat-input-meta">
        <p className={isNearLimit ? "chat-character-count chat-character-count-near-limit" : "chat-character-count"}>
          {value.length.toLocaleString()} / {maxLength.toLocaleString()}
        </p>
        <SendButton disabled={disabled || value.trim().length === 0} />
      </div>
    </form>
  );
}
