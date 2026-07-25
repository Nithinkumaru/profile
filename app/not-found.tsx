import Link from "next/link";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center text-center px-5"
      style={{ minHeight: "calc(100dvh - 64px)" }}
    >
      <div className="card-label" style={{ justifyContent: "center", marginBottom: 18 }}>
        <Compass size={11} />
        404 — Page not found
      </div>
      <h1 className="heading-1" style={{ marginBottom: 14 }}>Lost in the carousel.</h1>
      <p className="subtitle" style={{ maxWidth: 440, marginBottom: 32 }}>
        That page doesn&apos;t exist — or it&apos;s a part of the site that&apos;s still being built.
        Let&apos;s get you back somewhere useful.
      </p>
      <Link href="/" className="card-btn">
        <Home size={14} />
        Back to Home
      </Link>
    </div>
  );
}
