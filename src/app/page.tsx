import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

/**
 * Fetch the 'page' document with the UID 'home' for SEO metadata
 */
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("page", "home").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [page.data.meta_image.url || ""],
    },
  };
}

/**
 * The Root Homepage
 */
export default async function IndexPage() {
  const client = createClient();

  // We explicitly ask for the 'page' document that has the UID 'home'
  const page = await client.getByUID("page", "home").catch(() => notFound());

  return (
    <main>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}