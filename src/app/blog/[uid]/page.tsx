import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';
import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

type Params = { uid: string };

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType('blog_post');

    return pages.map((page) => {
        return { uid: page.uid };
    });
}

export default async function Page({ params }: { params: Promise<Params> }) {
    const { uid } = await params;
    const client = createClient();
    const page = await client.getByUID('blog_post', uid).catch(() => notFound());

    return (
        <article className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 pb-20">
            <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24">
                {/* Header */}
                <header className="mb-12 text-center">
                    {page.data.date && (
                        <time className="text-zinc-500 text-sm mb-4 block" dateTime={page.data.date as string}>
                            {new Date(page.data.date as string).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    )}
                    <div className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                        <PrismicRichText field={page.data.title} />
                    </div>

                    {page.data.featured_image?.url && (
                        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
                            <PrismicNextImage
                                field={page.data.featured_image}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    )}
                </header>

                {/* Content */}
                <SliceZone slices={page.data.slices} components={components} />
            </div>
        </article>
    );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { uid } = await params;
    const client = createClient();
    const page = await client.getByUID('blog_post', uid).catch(() => notFound());

    return {
        title: prismic.asText(page.data.title),
        description: `Read ${prismic.asText(page.data.title)} on our blog.`,
    };
}
