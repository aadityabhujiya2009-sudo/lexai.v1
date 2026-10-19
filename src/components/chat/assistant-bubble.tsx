type AssistantBubbleProps = {
  content: string;
};

export function AssistantBubble({ content }: AssistantBubbleProps) {
  return (
    <div className="flex justify-start">
      <div className="chat-assistant-bubble">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="chat-bubble-label">LexAI</span>
        </div>
        <p className="whitespace-pre-wrap break-words leading-7">{content}</p>
      </div>
    </div>
  );
}
