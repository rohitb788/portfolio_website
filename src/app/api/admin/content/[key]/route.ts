import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getRepoFile, updateRepoFile, GitHubApiError } from "@/lib/github";
import { CONTENT_PATHS, isContentKey, validateContent } from "@/lib/validate-content";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/admin/content/[key]">
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { key } = await ctx.params;
  if (!isContentKey(key)) {
    return NextResponse.json({ error: "Unknown content key." }, { status: 404 });
  }

  try {
    const { content } = await getRepoFile(CONTENT_PATHS[key]);
    return NextResponse.json({ data: JSON.parse(content) });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/admin/content/[key]">
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { key } = await ctx.params;
  if (!isContentKey(key)) {
    return NextResponse.json({ error: "Unknown content key." }, { status: 404 });
  }

  let body: { data?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validateContent(key, body.data);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    const content = JSON.stringify(body.data, null, 2) + "\n";
    const { commitUrl } = await updateRepoFile(
      CONTENT_PATHS[key],
      content,
      `content: update ${key} via admin UI`
    );
    return NextResponse.json({ ok: true, commitUrl });
  } catch (err) {
    return errorResponse(err);
  }
}

function errorResponse(err: unknown) {
  if (err instanceof GitHubApiError) {
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
  const message = err instanceof Error ? err.message : "Unexpected server error.";
  return NextResponse.json({ error: message }, { status: 500 });
}
