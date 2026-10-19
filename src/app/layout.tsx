import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LexAI — Understand the law with clarity",
    template: "%s — LexAI",
  },
  description:
    "LexAI helps you explore legal concepts, understand documents, and prepare better questions for a qualified legal professional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
