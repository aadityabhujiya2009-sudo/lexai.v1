type UserBubbleProps = {
  content: string;
};

export function UserBubble({ content }: UserBubbleProps) {
  return (
    <div className="flex justify-end">
      <div className="chat-user-bubble">
        <span className="chat-bubble-label">You</span>
        <p className="whitespace-pre-wrap break-words leading-7">{content}</p>
      </div>
    </div>
  );
}
