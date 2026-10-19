import Link from "next/link";

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: "primary" | "dark" | "quiet";
  size?: "default" | "small";
};

export function ButtonLink({ className = "", variant = "primary", size = "default", ...props }: ButtonLinkProps) {
  return <Link className={`button button-${variant} button-${size} ${className}`} {...props} />;
}
