import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
    const client = createClient();

    // Fetch the 'videos' single document
    const page = await client.getSingle("videos").catch(() => notFound());

    return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();
    const page = await client.getSingle("videos").catch(() => notFound());

    return {
        title: page.data.meta_title || "Videos",
        description: page.data.meta_description,
    };
}