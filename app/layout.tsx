import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nithin Kumar U — AI & ML Engineer",
  description:
    "AI & Machine Learning Engineer and Full Stack Developer who builds intelligent products powered by AI.",
  keywords: ["AI Engineer", "Machine Learning", "Full Stack Developer", "LangChain", "Next.js", "Python"],
  authors: [{ name: "Nithin Kumar U" }],
  openGraph: {
    title: "Nithin Kumar U — AI & ML Engineer",
    description: "I build intelligent products powered by AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
