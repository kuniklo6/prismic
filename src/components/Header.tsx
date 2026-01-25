// src/components/Header.tsx
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

export default async function Header() {
    const client = createClient();

    // Fetch the Single Type named "navigation"
    const nav = await client.getSingle("navigation").catch(() => null);

    return (
        <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
            {/* Your Site Logo/Name */}
            <Link href="/" className="font-bold text-xl tracking-tight">
                SITE NAME
            </Link>

            <nav>
                <ul className="flex gap-8 items-center">
                    {/* Loop through the group field in your Navigation type */}
                    {nav?.data.menu_items.map((item: any) => (
                        <li key={item.label}>
                            <PrismicNextLink
                                field={item.link}
                                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                {item.label}
                            </PrismicNextLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}