import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function IndexPage() {
  const client = createClient();

  // Fetch the specific document with the UID 'home' from your 'home' collection
  const page = await client.getByUID("home", "home");

  return (
    <main>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}