import { NextRequest } from "next/server";

const ALLOWED_HOSTS = ["drive.google.com", "lh3.googleusercontent.com"];

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url");

  if (!target) {
    return new Response("Missing url", { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(target);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }

  if (!ALLOWED_HOSTS.includes(targetUrl.hostname)) {
    return new Response("Host not allowed", { status: 400 });
  }

  const upstreamResponse = await fetch(targetUrl.toString(), {
    redirect: "follow",
    next: { revalidate: 3600 },
  });

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return new Response("Failed to fetch image", { status: 502 });
  }

  const contentType = upstreamResponse.headers.get("content-type") || "image/jpeg";

  return new Response(upstreamResponse.body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
    },
  });
}
