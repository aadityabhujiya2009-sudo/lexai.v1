type ErrorMessageProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div aria-live="assertive" className="chat-error" role="alert">
      <div>
        <p className="font-semibold text-forest-950">Something went wrong.</p>
        <p className="mt-1 text-sm leading-6 text-forest-800/75">{message}</p>
      </div>
      <button className="chat-retry-button" onClick={onRetry} type="button">Retry</button>
    </div>
  );
}
