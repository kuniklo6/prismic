import { createClient } from "@/prismicio";
import Link from "next/link";
import { NavigationList } from "./NavigationList"; // We will create this next

export default async function Header() {
    const client = createClient();
    // Fetch the data on the server
    const nav = await client.getSingle("navigation").catch(() => null);

    return (
        <header className="px-6 py-4 flex items-center justify-between border-b bg-white">
            <Link href="/" className="font-bold text-xl tracking-tight">
                SITE NAME
            </Link>

            {/* Pass the data down to the Client Component */}
            <NavigationList nav={nav} />
        </header>
    );
}