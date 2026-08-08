import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { projects } from "@/lib/data";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Nithin Kumar U`,
    description: project.tagline,
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}
