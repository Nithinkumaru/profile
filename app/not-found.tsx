import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Background   from "@/components/Background";
import CustomCursor from "@/components/CustomCursor";

export default function NotFound() {
  return (
    <>
      <CustomCursor />
      <Background />
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: "100dvh" }}
      >
        <span className="section-label">404</span>
        <h1 className="project-title" style={{ margin: "18px 0 12px" }}>Page not found</h1>
        <p className="section-subtitle" style={{ maxWidth: 420, marginBottom: 28 }}>
          That page doesn&apos;t exist, or the link may be outdated.
        </p>
        <Link href="/" className="card-btn">
          <ArrowLeft size={14} /> Back to home
        </Link>
      </div>
    </>
  );
}
