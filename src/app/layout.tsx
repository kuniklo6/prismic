import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prismic Next.js Project",
  description: "Built with Antigravity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} ${jetbrainsMono.variable} antialiased`}
      >
        <Header />
        {children}
        {/* This enables the Prismic Edit Button and Live Previews */}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}