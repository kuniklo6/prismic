import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// MUST be named POST (uppercase)
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Verify the secret from the URL (the one you put in Prismic)
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.PRISMIC_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // Check the payload type from the JSON you provided
  if (body.type === "api-update" || body.type === "test-trigger") {
    revalidateTag("prismic");
    console.log("Revalidation successful for:", body.domain);
    return NextResponse.json({ revalidated: true });
  }

  return NextResponse.json({ message: "No action taken" }, { status: 200 });
}