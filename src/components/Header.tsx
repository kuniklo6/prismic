import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

export default async function Header() {
    const client = createClient();

    // Fetch the single 'navigation' document
    const navigation = await client.getSingle("navigation");

    return (
        <header className="p-6 flex justify-between items-center border-b">
            <Link href="/" className="font-bold text-xl">
                My Site
            </Link>
            <nav>
                <ul className="flex gap-6">
                    {navigation.data.menu_items.map((item) => (
                        <li key={item.label}>
                            <PrismicNextLink field={item.link} className="hover:underline">
                                {item.label}
                            </PrismicNextLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}