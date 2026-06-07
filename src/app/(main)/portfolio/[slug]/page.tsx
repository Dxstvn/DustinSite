import { notFound } from "next/navigation";
import { portfolioProjects } from "@/lib/constants";
import type { Metadata } from "next";
import { CaseStudyHero } from "@/components/sections/work/case-study-hero";
import { CaseStudyOverview } from "@/components/sections/work/case-study-overview";
import { CaseStudyDemo } from "@/components/sections/work/case-study-demo";
import { CaseStudyGallery } from "@/components/sections/work/case-study-gallery";
import { CaseStudyResults } from "@/components/sections/work/case-study-results";
import { CaseStudyNext } from "@/components/sections/work/case-study-next";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug ?? project.id,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find(
    (p) => (p.slug ?? p.id) === slug
  );

  if (!project) return { title: "Project Not Found | Jaspire" };

  return {
    title: `${project.title} | Jaspire`,
    description: project.challenge ?? project.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find(
    (p) => (p.slug ?? p.id) === slug
  );

  if (!project) notFound();

  return (
    <>
      <CaseStudyHero project={project} />
      <CaseStudyOverview project={project} />
      <CaseStudyDemo project={project} />
      <CaseStudyGallery project={project} />
      <CaseStudyResults project={project} />
      <CaseStudyNext currentProject={project} />
    </>
  );
}
