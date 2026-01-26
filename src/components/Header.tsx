import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { NavigationList } from "./NavigationList";

export default async function Header() {
    const client = createClient();

    // Fetch the Single Type named "navigation"
    // We use the 'navigation' API ID you set up in Slice Machine
    const nav = await client.getSingle("navigation").catch(() => null);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo Section */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors"
                >
                    {/* You could eventually replace this with nav.data.site_name from Prismic */}
                    MY LOGO
                </Link>

                {/* Desktop Navigation List (Client Component) */}
                {/* We pass the slices directly to the interactive component */}
                <NavigationList nav={nav} />

                {/* Optional: Simple CTA Button or Search icon could go here */}
                <div className="hidden md:block">
                    <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors">
                        Contact Us
                    </button>
                </div>
            </div>
        </header>
    );
}