import { NextRequest, NextResponse } from "next/server";
import { assertOrigin, readJSON, limited, adminPassword, equalSecret, createSession, sessionCookie, failure } from "@/lib/order-service";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    assertOrigin(request); limited(request, "login", 10, 900); const data = await readJSON(request);
    if(typeof data.password !== "string" || data.password.length > 300 || !equalSecret(data.password, adminPassword())) return NextResponse.json({ error: "Пароль не подошёл." }, { status: 401, headers: { "Cache-Control": "no-store" } });
    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(sessionCookie, createSession(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 8*3600, path: "/api/admin" });
    return response;
  } catch(error) { return failure(error); }
}
export async function DELETE(request: NextRequest) {
  try { assertOrigin(request); const response = NextResponse.json({ ok: true }); response.cookies.set(sessionCookie, "", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 0, path: "/api/admin" }); return response; }
  catch(error) { return failure(error); }
}
