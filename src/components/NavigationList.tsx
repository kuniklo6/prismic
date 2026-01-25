"use client";

import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

export function NavigationList({ nav }: { nav: any }) {
    const pathname = usePathname();

    return (
        <nav>
            <ul className="flex gap-8">
                {nav?.data.menu_items?.map((item: any) => {
                    // Check if pathname matches the link UID
                    // Home is a special case: if pathname is "/" and UID is "home"
                    const isHome = pathname === "/" && item.link.uid === "home";
                    const isInternal = pathname.includes(item.link.uid) && item.link.uid !== "home";
                    const isActive = isHome || isInternal;

                    return (
                        <li key={item.label}>
                            <PrismicNextLink
                                field={item.link}
                                className={`text-sm font-medium transition-colors ${isActive
                                    ? "text-blue-600 underline underline-offset-4"
                                    : "text-slate-600 hover:text-blue-600"
                                    }`}
                            >
                                {item.label}
                            </PrismicNextLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}