import { NextResponse } from "next/server"
import {
  adminAccessTokenCookieName,
  adminRefreshTokenCookieName,
} from "@/lib/api/admin-auth-session"
import { isSupabaseAuthApiError, loginAdminUser } from "@/lib/api/supabase-auth-server"

type LoginRequestBody = {
  email?: string
  password?: string
}

function isLoginRequestBody(value: unknown): value is Required<LoginRequestBody> {
  if (!value || typeof value !== "object") {
    return false
  }

  const body = value as LoginRequestBody

  return typeof body.email === "string" && typeof body.password === "string"
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 })
  }

  if (!isLoginRequestBody(body)) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
  }

  const email = body.email.trim().toLowerCase()
  const password = body.password

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
  }

  try {
    const session = await loginAdminUser(email, password)
    const response = NextResponse.json(
      {
        message: "Admin login successful.",
        user: session.user,
        expiresAt: session.expiresAt,
      },
      { status: 200 }
    )

    response.cookies.set(adminAccessTokenCookieName, session.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: session.expiresIn,
    })

    response.cookies.set(adminRefreshTokenCookieName, session.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })

    return response
  } catch (error) {
    if (isSupabaseAuthApiError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    console.error("Admin login failed", error)

    return NextResponse.json({ error: "Unexpected server error during admin login." }, { status: 500 })
  }
}
