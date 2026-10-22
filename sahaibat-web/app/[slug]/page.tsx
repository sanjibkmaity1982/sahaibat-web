// SERVER COMPONENT. SEO landing pages from content/pages (section "landing").
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoPage } from "@/components/seo/SeoPage";
import { findPage, publishedPages } from "@/lib/seo/content";
import { seoMetadata } from "@/lib/seo/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPages().filter((p) => p.section === "landing").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = findPage("landing", (await params).slug);
  return page ? seoMetadata(page) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const page = findPage("landing", (await params).slug);
  if (!page) notFound();
  return <SeoPage page={page} />;
}
