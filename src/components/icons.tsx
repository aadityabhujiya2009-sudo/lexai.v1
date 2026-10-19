type IconProps = { className?: string };

export function ArrowUpRight({ className = "" }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 20 20"><path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

export function Check({ className = "" }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 20 20"><path d="m4.5 10.5 3.4 3.4L15.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
}

export function ChevronRight({ className = "" }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 20 20"><path d="m7.5 4.5 5.5 5.5-5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

export function Shield({ className = "" }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24"><path d="M12 3.5 19 6v5.5c0 4.4-2.6 7.7-7 9-4.4-1.3-7-4.6-7-9V6l7-2.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /><path d="m8.7 12 2.1 2.1 4.5-4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

export function Spark({ className = "" }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24"><path d="M12 3.5 13.8 10l6.7 2-6.7 2-1.8 6.5L10.2 14l-6.7-2 6.7-2L12 3.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

export function TextDocument({ className = "" }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24"><path d="M6 3.8h8.3L18 7.5v12.7H6V3.8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /><path d="M14 4v4h4M9 12h6M9 15.5h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}
