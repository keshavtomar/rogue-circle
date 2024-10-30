import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request) {
  const { password } = await request.json();
  
  
  if (password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.headers.set(
      "Set-Cookie",
      serialize("authToken", process.env.Token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })
    );
    return response;
  }
  return NextResponse.json({ error: "password error" }, { status: 401 });
}
