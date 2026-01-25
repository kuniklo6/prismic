"use client";

import { useState } from "react";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

export function NavigationList({ nav }: { nav: any }) {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <nav>
            <ul className="flex gap-8 items-center">
                {(nav?.data?.slices || []).map((slice: any, index: number) => {

                    // 1. Check if the current slice is "Active"
                    // For single links, we check if the pathname matches the link UID
                    const isVideosTop = slice.primary.link?.type === "videos";
                    const isLinkActive = slice.slice_type === "menu_link" &&
                        (isVideosTop ? pathname === "/videos" : (pathname === `/${slice.primary.link.uid}` || (pathname === "/" && slice.primary.link.uid === "home")));

                    // For dropdowns, we check if any of the sub-links match the current pathname
                    const isDropdownActive = slice.slice_type === "dropdown" &&
                        slice.primary.sub_label?.some((item: any) => {
                            if (item.sub_link.type === "videos") {
                                return pathname === "/videos";
                            }
                            return pathname === `/${item.sub_link.uid}`;
                        });

                    // CASE 1: Single Link
                    if (slice.slice_type === "menu_link") {
                        return (
                            <li key={index}>
                                <PrismicNextLink
                                    field={slice.primary.link}
                                    className={`text-sm font-medium transition-colors ${isLinkActive ? "text-blue-600 underline underline-offset-4" : "text-slate-600 hover:text-blue-600"
                                        }`}
                                >
                                    {slice.primary.label}
                                </PrismicNextLink>
                            </li>
                        );
                    }

                    // CASE 2: Dropdown
                    if (slice.slice_type === "dropdown") {
                        const parentLabel = slice.primary.label;
                        const subLinks = slice.primary.sub_label || [];

                        return (
                            <li
                                key={index}
                                className="relative flex items-center h-full py-4"
                                onMouseEnter={() => setOpenDropdown(parentLabel)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <button className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none ${isDropdownActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                                    }`}>
                                    {parentLabel}
                                    <svg className={`w-4 h-4 transition-transform ${openDropdown === parentLabel ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div className={`absolute top-full left-0 w-48 bg-white border border-slate-100 shadow-xl rounded-xl p-2 transition-all z-50 ${openDropdown === parentLabel ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"
                                    }`}>
                                    <ul className="flex flex-col gap-1">
                                        {subLinks.map((item: any, i: number) => {
                                            // Handling active state for both Single Types and UID-based pages
                                            const isVideos = item.sub_link.type === "videos";
                                            const isActiveSub = isVideos ? pathname === "/videos" : (item.sub_link.uid && pathname === `/${item.sub_link.uid}`);

                                            // Fallback for link text: Use the text from the link, or a manual label if you add one later
                                            const linkLabel = item.sub_link.text || item.sub_link.url || "Link";

                                            return (
                                                <li key={i}>
                                                    <PrismicNextLink
                                                        field={item.sub_link}
                                                        className={`block px-4 py-2 text-sm rounded-lg transition-colors ${isActiveSub ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                                                            }`}
                                                    >
                                                        {linkLabel}
                                                    </PrismicNextLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        </nav>
    );
}