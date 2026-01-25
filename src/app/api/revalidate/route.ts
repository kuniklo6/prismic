import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // 1. Security Check
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.PRISMIC_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // 2. The Updated Revalidation Call
  if (body.type === "api-update" || body.type === "api-published") {
    // In Next.js 16, you must provide a cacheLife profile (e.g., "max")
    revalidateTag("prismic", "max");

    console.log("Revalidation successful for:", body.domain);
    return NextResponse.json({ revalidated: true });
  }

  return NextResponse.json({ revalidated: false });
}