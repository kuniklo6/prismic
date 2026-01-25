import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function IndexPage() {
  const client = createClient();

  // This line looks specifically for the UID you just created
  const page = await client.getSingle("home").catch(() => notFound());

  return (
    <main>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}