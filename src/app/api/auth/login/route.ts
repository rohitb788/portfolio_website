import { NextResponse } from "next/server";
import { setSessionCookie, verifyPassword } from "@/lib/auth";
import { getClientIp } from "@/lib/request-ip";
import {
  delayForFailureCount,
  getRecentFailureCount,
  isLockedOut,
  recordFailure,
  recordSuccess,
  sleep,
} from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isLockedOut(ip)) {
    return NextResponse.json(
      { error: "Too many failed attempts. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let password: unknown;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  let valid: boolean;
  try {
    valid = verifyPassword(password);
  } catch {
    return NextResponse.json(
      { error: "Server is not configured for admin login." },
      { status: 500 }
    );
  }

  if (!valid) {
    recordFailure(ip);
    await sleep(delayForFailureCount(getRecentFailureCount(ip)));
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  recordSuccess(ip);
  await setSessionCookie();
  return NextResponse.json({ ok: true });
}
