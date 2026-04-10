import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { AdminAuthUser } from "@/lib/api/supabase-auth-server"

export const adminAccessTokenCookieName = "lesgopro_admin_access_token"
export const adminRefreshTokenCookieName = "lesgopro_admin_refresh_token"

type SupabaseAuthUserResponse = {
  id: string
  email?: string | null
}

type AdminSessionResult = {
  accessToken: string
  refreshToken: string
  user: AdminAuthUser
}

type SupabaseRestUserRow = {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  slug: string | null
  phone_number: string | null
  role: "admin"
  is_active: boolean
  last_login_at: string | null
  created_at: string
  updated_at: string
}

function getSupabaseServerEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables. Expected NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY."
    )
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
    supabaseServiceRoleKey,
  }
}

async function fetchSupabaseUser(accessToken: string): Promise<SupabaseAuthUserResponse | null> {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseServerEnv()

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    return null
  }

  return (await response.json()) as SupabaseAuthUserResponse
}

async function fetchAdminUser(userId: string): Promise<AdminAuthUser | null> {
  const { supabaseUrl, supabaseServiceRoleKey } = getSupabaseServerEnv()

  const url = new URL(`${supabaseUrl}/rest/v1/users`)
  url.searchParams.set(
    "select",
    "id,email,first_name,last_name,slug,phone_number,role,is_active,last_login_at,created_at,updated_at"
  )
  url.searchParams.set("id", `eq.${userId}`)
  url.searchParams.set("role", "eq.admin")
  url.searchParams.set("is_active", "eq.true")

  const response = await fetch(url, {
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    return null
  }

  const rows = (await response.json()) as SupabaseRestUserRow[]
  const user = rows[0]

  if (!user) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    slug: user.slug,
    phoneNumber: user.phone_number,
    role: user.role,
    isActive: user.is_active,
    lastLoginAt: user.last_login_at,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  }
}

export async function getCurrentAdminSession(): Promise<AdminSessionResult | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(adminAccessTokenCookieName)?.value
  const refreshToken = cookieStore.get(adminRefreshTokenCookieName)?.value

  if (!accessToken || !refreshToken) {
    return null
  }

  const supabaseUser = await fetchSupabaseUser(accessToken)

  if (!supabaseUser?.id) {
    return null
  }

  const user = await fetchAdminUser(supabaseUser.id)

  if (!user) {
    return null
  }

  return {
    accessToken,
    refreshToken,
    user,
  }
}

export async function requireCurrentAdminSession(): Promise<AdminSessionResult> {
  const session = await getCurrentAdminSession()

  if (!session) {
    redirect("/admin/login")
  }

  return session
}
