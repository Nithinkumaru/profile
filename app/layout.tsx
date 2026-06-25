import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nithin Kumar U — AI & ML Engineer",
  description:
    "Portfolio of Nithin Kumar U, an AI & Machine Learning Engineer and Full Stack Developer who builds intelligent products powered by AI.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Full Stack Developer",
    "LangChain",
    "Next.js",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Nithin Kumar U" }],
  openGraph: {
    title: "Nithin Kumar U — AI & ML Engineer",
    description: "I build intelligent products powered by AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nithin Kumar U — AI & ML Engineer",
    description: "I build intelligent products powered by AI.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
