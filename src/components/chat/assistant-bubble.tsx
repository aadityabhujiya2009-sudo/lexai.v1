type AssistantBubbleProps = {
  content: string;
};

export function AssistantBubble({ content }: AssistantBubbleProps) {
  const isDevelopmentMock = content.startsWith("[DEV MOCK, not a real AI response]");

  return (
    <div className="flex justify-start">
      <div className="chat-assistant-bubble">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="chat-bubble-label">LexAI</span>
          {isDevelopmentMock ? <span className="chat-mock-label">Development placeholder</span> : null}
        </div>
        <p className="whitespace-pre-wrap break-words leading-7">{content}</p>
      </div>
    </div>
  );
}
