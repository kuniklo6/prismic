import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // 1. Security Check: Ensure the secret matches Prismic's webhook secret
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.PRISMIC_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // 2. Prismic sends an 'api-update' type when content changes
  if (body.type === "api-update") {
    // This clears the cache for every fetch call tagged with 'prismic'
    revalidateTag("prismic");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({ revalidated: false });
}