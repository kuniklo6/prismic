"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

export function NavigationList({ nav }: { nav: any }) {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    // Close mobile menu on path change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <nav>
            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-8 items-center">
                {(nav?.data?.slices || []).map((slice: any, index: number) => {
                    const isVideosTop = slice.primary.link?.type === "videos";
                    const isDevotionalTop = slice.primary.link?.type === "devotional";
                    const isBlogTop = slice.primary.link?.type === "blog";
                    const isLinksTop = slice.primary.link?.type === "links";

                    const isLinkActive = slice.slice_type === "menu_link" &&
                        (
                            isVideosTop ? pathname === "/videos" :
                                isDevotionalTop ? pathname === "/devotional" :
                                    isBlogTop ? pathname === "/blog" :
                                        isLinksTop ? pathname === "/links" :
                                            (pathname === `/${slice.primary.link.uid}` || (pathname === "/" && slice.primary.link.uid === "home"))
                        );

                    const isDropdownActive = slice.slice_type === "dropdown" &&
                        slice.primary.sub_label?.some((item: any) => {
                            if (item.sub_link.type === "videos") return pathname === "/videos";
                            if (item.sub_link.type === "devotional") return pathname === "/devotional";
                            if (item.sub_link.type === "blog") return pathname === "/blog";
                            if (item.sub_link.type === "links") return pathname === "/links";
                            return pathname === `/${item.sub_link.uid}`;
                        });

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

                                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white border border-slate-100 shadow-xl rounded-xl p-2 transition-all z-50 ${openDropdown === parentLabel ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"
                                    }`}>
                                    <div className="absolute -top-2 left-0 w-full h-2 bg-transparent" /> {/* Bridge for hover */}
                                    <ul className="flex flex-col gap-1">
                                        {subLinks.map((item: any, i: number) => {
                                            const isVideos = item.sub_link.type === "videos";
                                            const isDevotional = item.sub_link.type === "devotional";
                                            const isBlog = item.sub_link.type === "blog";
                                            const isLinks = item.sub_link.type === "links";

                                            const isActiveSub = isVideos ? pathname === "/videos" :
                                                isDevotional ? pathname === "/devotional" :
                                                    isBlog ? pathname === "/blog" :
                                                        isLinks ? pathname === "/links" :
                                                            (item.sub_link.uid && pathname === `/${item.sub_link.uid}`);
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

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-slate-800 focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay - Portaled to Body */}
            {mounted && mobileMenuOpen && createPortal(
                <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 transition-all duration-300 ease-in-out md:hidden flex flex-col">
                    <ul className="flex flex-col gap-6">
                        {(nav?.data?.slices || []).map((slice: any, index: number) => {
                            const isVideosTop = slice.primary.link?.type === "videos";
                            const isDevotionalTop = slice.primary.link?.type === "devotional";
                            const isBlogTop = slice.primary.link?.type === "blog";
                            const isLinksTop = slice.primary.link?.type === "links";

                            const isLinkActive = slice.slice_type === "menu_link" &&
                                (
                                    isVideosTop ? pathname === "/videos" :
                                        isDevotionalTop ? pathname === "/devotional" :
                                            isBlogTop ? pathname === "/blog" :
                                                isLinksTop ? pathname === "/links" :
                                                    (pathname === `/${slice.primary.link.uid}` || (pathname === "/" && slice.primary.link.uid === "home"))
                                );

                            if (slice.slice_type === "menu_link") {
                                return (
                                    <li key={index} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                        <PrismicNextLink
                                            field={slice.primary.link}
                                            className={`text-lg font-medium transition-colors block ${isLinkActive ? "text-blue-600" : "text-slate-800"
                                                }`}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {slice.primary.label}
                                        </PrismicNextLink>
                                    </li>
                                );
                            }

                            if (slice.slice_type === "dropdown") {
                                const parentLabel = slice.primary.label;
                                const subLinks = slice.primary.sub_label || [];
                                const isOpen = mobileDropdownOpen === parentLabel;

                                return (
                                    <li key={index} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                        <button
                                            onClick={() => setMobileDropdownOpen(isOpen ? null : parentLabel)}
                                            className="flex items-center justify-between w-full text-lg font-medium text-slate-800"
                                        >
                                            {parentLabel}
                                            <svg className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}>
                                            <ul className="flex flex-col gap-3 pl-4 border-l-2 border-slate-100 ml-1">
                                                {subLinks.map((item: any, i: number) => {
                                                    const linkLabel = item.sub_link.text || item.sub_link.url || "Link";
                                                    return (
                                                        <li key={i}>
                                                            <PrismicNextLink
                                                                field={item.sub_link}
                                                                className="block text-base text-slate-600 hover:text-blue-600"
                                                                onClick={() => setMobileMenuOpen(false)}
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

                    {/* Mobile Contact Button */}
                    <div className="mt-8 border-t border-slate-100 pt-6">
                        <button className="w-full rounded-full bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white shadow-lg shadow-slate-200">
                            Contact Us
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </nav>
    );
}