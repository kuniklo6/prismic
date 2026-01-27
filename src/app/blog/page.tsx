import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
    const client = createClient();
    const page = await client.getSingle("blog").catch(() => notFound());

    return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Blog",
        description: "Blog content",
    };
}
