import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import {
  adminAccessTokenCookieName,
  adminRefreshTokenCookieName,
} from "@/lib/api/admin-auth-session"

type SupabaseErrorResponse = {
  error?: string
  msg?: string
  message?: string
}

function getSupabaseServerEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Expected NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    )
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  }
}

function clearAdminAuthCookies(response: NextResponse) {
  response.cookies.set(adminAccessTokenCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })

  response.cookies.set(adminRefreshTokenCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
}

export async function POST() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(adminAccessTokenCookieName)?.value
  const response = NextResponse.json({ message: "Admin logout successful." }, { status: 200 })

  if (accessToken) {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseServerEnv()

    const supabaseResponse = await fetch(`${supabaseUrl}/auth/v1/logout?scope=global`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!supabaseResponse.ok) {
      const errorPayload = (await supabaseResponse.json()) as SupabaseErrorResponse
      const errorResponse = NextResponse.json(
        {
          error:
            errorPayload.message ||
            errorPayload.msg ||
            errorPayload.error ||
            "Unable to sign out from Supabase.",
        },
        { status: supabaseResponse.status }
      )

      clearAdminAuthCookies(errorResponse)

      return errorResponse
    }
  }

  clearAdminAuthCookies(response)

  return response
}
