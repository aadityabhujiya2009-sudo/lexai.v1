import { ArrowUpRight } from "@/components/icons";

type SendButtonProps = {
  disabled: boolean;
};

export function SendButton({ disabled }: SendButtonProps) {
  return (
    <button aria-label="Send message" className="chat-send-button" disabled={disabled} type="submit">
      <span className="hidden sm:inline">Send</span>
      <ArrowUpRight className="size-4" />
    </button>
  );
}
