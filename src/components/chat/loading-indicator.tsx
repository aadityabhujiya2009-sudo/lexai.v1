type LoadingIndicatorProps = {
  compact?: boolean;
};

export function LoadingIndicator({ compact = false }: LoadingIndicatorProps) {
  return (
    <div className={compact ? "chat-loading chat-loading-compact" : "chat-loading"} role="status">
      <span aria-hidden="true" className="chat-loading-dots"><span /><span /><span /></span>
      <span>{compact ? "LexAI is thinking" : "Preparing a response"}</span>
    </div>
  );
}
