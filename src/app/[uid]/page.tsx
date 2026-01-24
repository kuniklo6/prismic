import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio"; // Ensure this alias points to src/prismicio
import { components } from "@/slices";     // Ensure this alias points to src/slices

type Params = { uid: string };

export async function generateMetadata({
    params
}: {
    params: Promise<Params>
}): Promise<Metadata> {
    const { uid } = await params;
    const client = createClient();
    const page = await client.getByUID("page", uid).catch(() => notFound());

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
        openGraph: {
            images: [page.data.meta_image.url || ""],
        },
    };
}

export default async function Page({
    params
}: {
    params: Promise<Params>
}) {
    const { uid } = await params;
    const client = createClient();

    // Fetching the document of type 'page' with the matching UID
    const page = await client.getByUID("page", uid).catch(() => notFound());

    return (
        <main>
            <SliceZone slices={page.data.slices} components={components} />
        </main>
    );
}

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("page");

    return pages.map((page) => {
        return { uid: page.uid };
    });
}