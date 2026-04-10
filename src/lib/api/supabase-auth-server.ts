type SupabaseAuthUser = {
  id: string
  email: string | null
}

type SupabasePasswordLoginResponse = {
  access_token: string
  refresh_token: string
  expires_in: number
  expires_at: number
  token_type: string
  user: SupabaseAuthUser
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

type SupabaseErrorResponse = {
  error?: string
  error_code?: string
  error_description?: string
  msg?: string
  message?: string
}

export type AdminAuthUser = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  slug: string | null
  phoneNumber: string | null
  role: "admin"
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
}

export type AdminLoginResult = {
  accessToken: string
  refreshToken: string
  expiresIn: number
  expiresAt: number
  tokenType: string
  user: AdminAuthUser
}

type SupabaseServerEnv = {
  supabaseUrl: string
  supabaseAnonKey: string
  supabaseServiceRoleKey: string
}

class SupabaseAuthApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "SupabaseAuthApiError"
    this.status = status
  }
}

function getSupabaseServerEnv(): SupabaseServerEnv {
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

function formatSupabaseError(payload: SupabaseErrorResponse, fallbackMessage: string): string {
  return payload.message || payload.msg || payload.error_description || payload.error || fallbackMessage
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

async function signInWithPassword(email: string, password: string): Promise<SupabasePasswordLoginResponse> {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseServerEnv()

  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorPayload = await parseJsonResponse<SupabaseErrorResponse>(response)

    throw new SupabaseAuthApiError(
      formatSupabaseError(errorPayload, "Unable to authenticate with Supabase."),
      response.status
    )
  }

  return parseJsonResponse<SupabasePasswordLoginResponse>(response)
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
    const errorPayload = await parseJsonResponse<SupabaseErrorResponse>(response)

    throw new SupabaseAuthApiError(
      formatSupabaseError(errorPayload, "Unable to load the admin user."),
      response.status
    )
  }

  const users = await parseJsonResponse<SupabaseRestUserRow[]>(response)
  const user = users[0]

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

async function updateAdminLastLogin(userId: string): Promise<void> {
  const { supabaseUrl, supabaseServiceRoleKey } = getSupabaseServerEnv()

  const response = await fetch(`${supabaseUrl}/rest/v1/users?id=eq.${userId}`, {
    method: "PATCH",
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      last_login_at: new Date().toISOString(),
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorPayload = await parseJsonResponse<SupabaseErrorResponse>(response)

    throw new SupabaseAuthApiError(
      formatSupabaseError(errorPayload, "Unable to update the admin login timestamp."),
      response.status
    )
  }
}

export async function loginAdminUser(email: string, password: string): Promise<AdminLoginResult> {
  const session = await signInWithPassword(email, password)
  const adminUser = await fetchAdminUser(session.user.id)

  if (!adminUser) {
    throw new SupabaseAuthApiError("This account is not an active admin user.", 403)
  }

  await updateAdminLastLogin(adminUser.id)

  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresIn: session.expires_in,
    expiresAt: session.expires_at,
    tokenType: session.token_type,
    user: {
      ...adminUser,
      lastLoginAt: new Date().toISOString(),
    },
  }
}

export function isSupabaseAuthApiError(error: unknown): error is SupabaseAuthApiError {
  return error instanceof SupabaseAuthApiError
}
