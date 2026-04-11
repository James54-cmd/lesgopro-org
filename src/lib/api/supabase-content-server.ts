import { requireCurrentAdminSession } from "@/lib/api/admin-auth-session"

type SupabaseHeadersMode = "anon" | "service"

type ContentResourceName =
  | "site-settings"
  | "school-years"
  | "enrollment-counts"
  | "officer-positions"
  | "officers"
  | "programs"
  | "projects"
  | "events"
  | "gallery-items"
  | "social-links"

type ContentResourceConfig = {
  table: string
  select: string
  order: string
  allowedFields: readonly string[]
  listSelect?: string
  itemSelect?: string
  transformRecord?: (record: Record<string, unknown>) => Record<string, unknown>
}

type SupabaseErrorResponse = {
  error?: string
  msg?: string
  message?: string
  details?: string
}

class SupabaseContentApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "SupabaseContentApiError"
    this.status = status
  }
}

function flattenOfficerRecord(record: Record<string, unknown>) {
  const schoolYear = record.school_year
  const officerPosition = record.officer_position
  const schoolYearRecord =
    schoolYear && typeof schoolYear === "object" && !Array.isArray(schoolYear)
      ? (schoolYear as Record<string, unknown>)
      : null
  const officerPositionRecord =
    officerPosition && typeof officerPosition === "object" && !Array.isArray(officerPosition)
      ? (officerPosition as Record<string, unknown>)
      : null

  const schoolYearLabel = typeof schoolYearRecord?.label === "string" ? schoolYearRecord.label : null

  const officerPositionLabel =
    typeof record.custom_position_name === "string" && record.custom_position_name.length > 0
      ? record.custom_position_name
      : typeof officerPositionRecord?.name === "string"
        ? officerPositionRecord.name
        : null

  return {
    ...record,
    school_year_label: schoolYearLabel,
    officer_position_label: officerPositionLabel,
  }
}

const contentResourceConfigs: Record<ContentResourceName, ContentResourceConfig> = {
  "school-years": {
    table: "school_years",
    select: "id,label,starts_on,ends_on,is_current,is_active,created_at,updated_at",
    order: "starts_on.desc.nullslast,created_at.desc",
    allowedFields: ["label", "starts_on", "ends_on", "is_current", "is_active"],
  },
  "site-settings": {
    table: "site_settings",
    select: "id,singleton,show_public_leadership,created_at,updated_at",
    order: "created_at.asc",
    allowedFields: ["show_public_leadership"],
  },
  "enrollment-counts": {
    table: "enrollment_counts",
    select:
      "id,school_year_id,department_slug,department_name,student_count,created_at,updated_at",
    order: "department_slug.asc,created_at.desc",
    allowedFields: ["school_year_id", "department_slug", "department_name", "student_count"],
  },
  "officer-positions": {
    table: "officer_positions",
    select: "id,name,slug,sort_order,is_active,created_at,updated_at",
    order: "sort_order.asc,name.asc",
    allowedFields: ["name", "slug", "sort_order", "is_active"],
  },
  officers: {
    table: "officers",
    select:
      "id,school_year_id,officer_position_id,custom_position_name,first_name,last_name,slug,bio,photo_url,profile_url,email,phone_number,sort_order,is_active,created_at,updated_at",
    listSelect:
      "id,school_year_id,officer_position_id,custom_position_name,first_name,last_name,slug,bio,photo_url,profile_url,email,phone_number,sort_order,is_active,created_at,updated_at,school_year:school_years(id,label,is_current),officer_position:officer_positions(id,name,slug,is_active)",
    itemSelect:
      "id,school_year_id,officer_position_id,custom_position_name,first_name,last_name,slug,bio,photo_url,profile_url,email,phone_number,sort_order,is_active,created_at,updated_at,school_year:school_years(id,label,is_current),officer_position:officer_positions(id,name,slug,is_active)",
    order: "sort_order.asc,last_name.asc,first_name.asc",
    allowedFields: [
      "school_year_id",
      "officer_position_id",
      "custom_position_name",
      "first_name",
      "last_name",
      "slug",
      "bio",
      "photo_url",
      "profile_url",
      "email",
      "phone_number",
      "sort_order",
      "is_active",
    ],
    transformRecord: flattenOfficerRecord,
  },
  programs: {
    table: "programs",
    select:
      "id,title,slug,description,thumbnail_url,video_url,cta_url,sort_order,is_published,created_at,updated_at",
    order: "sort_order.asc,title.asc",
    allowedFields: [
      "title",
      "slug",
      "description",
      "thumbnail_url",
      "video_url",
      "cta_url",
      "sort_order",
      "is_published",
    ],
  },
  projects: {
    table: "projects",
    select:
      "id,title,slug,description,github_url,live_demo_url,thumbnail_url,video_url,sort_order,is_featured,is_published,created_at,updated_at",
    order: "sort_order.asc,title.asc",
    allowedFields: [
      "title",
      "slug",
      "description",
      "github_url",
      "live_demo_url",
      "thumbnail_url",
      "video_url",
      "sort_order",
      "is_featured",
      "is_published",
    ],
  },
  events: {
    table: "events",
    select:
      "id,title,slug,description,starts_at,ends_at,venue,registration_url,external_url,thumbnail_url,video_url,sort_order,is_published,created_at,updated_at",
    order: "starts_at.asc.nullslast,sort_order.asc,title.asc",
    allowedFields: [
      "title",
      "slug",
      "description",
      "starts_at",
      "ends_at",
      "venue",
      "registration_url",
      "external_url",
      "thumbnail_url",
      "video_url",
      "sort_order",
      "is_published",
    ],
  },
  "gallery-items": {
    table: "gallery_items",
    select:
      "id,title,description,media_type,media_url,thumbnail_url,external_url,sort_order,is_published,created_at,updated_at",
    order: "sort_order.asc,created_at.desc",
    allowedFields: [
      "title",
      "description",
      "media_type",
      "media_url",
      "thumbnail_url",
      "external_url",
      "sort_order",
      "is_published",
    ],
  },
  "social-links": {
    table: "social_links",
    select: "id,platform,label,url,icon_name,sort_order,is_active,created_at,updated_at",
    order: "sort_order.asc,platform.asc",
    allowedFields: ["platform", "label", "url", "icon_name", "sort_order", "is_active"],
  },
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

function getSupabaseHeaders(mode: SupabaseHeadersMode, extraHeaders?: HeadersInit): HeadersInit {
  const { supabaseAnonKey, supabaseServiceRoleKey } = getSupabaseServerEnv()
  const key = mode === "service" ? supabaseServiceRoleKey : supabaseAnonKey

  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extraHeaders,
  }
}

function getResourceConfig(resource: string): ContentResourceConfig {
  const config = contentResourceConfigs[resource as ContentResourceName]

  if (!config) {
    throw new SupabaseContentApiError("Unsupported admin content resource.", 404)
  }

  return config
}

function formatSupabaseError(payload: SupabaseErrorResponse, fallbackMessage: string) {
  return payload.message || payload.details || payload.msg || payload.error || fallbackMessage
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

function filterPayload(
  payload: Record<string, unknown>,
  allowedFields: readonly string[]
): Record<string, unknown> {
  const filteredEntries = Object.entries(payload).filter(([key, value]) => {
    return allowedFields.includes(key) && value !== undefined
  })

  return Object.fromEntries(filteredEntries)
}

async function fetchFromSupabase<T>(url: URL | string, init: RequestInit, fallbackError: string) {
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
  })

  if (!response.ok) {
    const errorPayload = await parseJsonResponse<SupabaseErrorResponse>(response)
    throw new SupabaseContentApiError(formatSupabaseError(errorPayload, fallbackError), response.status)
  }

  if (response.status === 204) {
    return null as T
  }

  const contentLength = response.headers.get("content-length")

  if (contentLength === "0") {
    return null as T
  }

  return parseJsonResponse<T>(response)
}

export async function listAdminContent(resource: string) {
  await requireCurrentAdminSession()

  const config = getResourceConfig(resource)
  const { supabaseUrl } = getSupabaseServerEnv()
  const url = new URL(`${supabaseUrl}/rest/v1/${config.table}`)

  url.searchParams.set("select", config.listSelect || config.select)
  url.searchParams.set("order", config.order)

  const rows = await fetchFromSupabase<Record<string, unknown>[]>(
    url,
    {
      headers: getSupabaseHeaders("service"),
    },
    "Unable to list admin content."
  )

  return config.transformRecord ? rows.map((row) => config.transformRecord?.(row) || row) : rows
}

export async function getAdminContentItem(resource: string, id: string) {
  await requireCurrentAdminSession()

  const config = getResourceConfig(resource)
  const { supabaseUrl } = getSupabaseServerEnv()
  const url = new URL(`${supabaseUrl}/rest/v1/${config.table}`)

  url.searchParams.set("select", config.itemSelect || config.select)
  url.searchParams.set("id", `eq.${id}`)

  const rows = await fetchFromSupabase<Record<string, unknown>[]>(
    url,
    {
      headers: getSupabaseHeaders("service"),
    },
    "Unable to load the admin content item."
  )

  const record = rows[0] || null
  return record && config.transformRecord ? config.transformRecord(record) : record
}

export async function createAdminContentItem(resource: string, payload: Record<string, unknown>) {
  await requireCurrentAdminSession()

  const config = getResourceConfig(resource)
  const filteredPayload = filterPayload(payload, config.allowedFields)

  if (Object.keys(filteredPayload).length === 0) {
    throw new SupabaseContentApiError("No valid fields were provided for this resource.", 400)
  }

  const { supabaseUrl } = getSupabaseServerEnv()

  return fetchFromSupabase<Record<string, unknown>[]>(
    `${supabaseUrl}/rest/v1/${config.table}`,
    {
      method: "POST",
      headers: getSupabaseHeaders("service", {
        Prefer: "return=representation",
      }),
      body: JSON.stringify(filteredPayload),
    },
    "Unable to create the admin content item."
  )
}

export async function updateAdminContentItem(
  resource: string,
  id: string,
  payload: Record<string, unknown>
) {
  await requireCurrentAdminSession()

  const config = getResourceConfig(resource)
  const filteredPayload = filterPayload(payload, config.allowedFields)

  if (Object.keys(filteredPayload).length === 0) {
    throw new SupabaseContentApiError("No valid fields were provided for this resource.", 400)
  }

  const { supabaseUrl } = getSupabaseServerEnv()

  return fetchFromSupabase<Record<string, unknown>[]>(
    `${supabaseUrl}/rest/v1/${config.table}?id=eq.${id}`,
    {
      method: "PATCH",
      headers: getSupabaseHeaders("service", {
        Prefer: "return=representation",
      }),
      body: JSON.stringify(filteredPayload),
    },
    "Unable to update the admin content item."
  )
}

export async function deleteAdminContentItem(resource: string, id: string) {
  await requireCurrentAdminSession()

  const config = getResourceConfig(resource)
  const { supabaseUrl } = getSupabaseServerEnv()

  await fetchFromSupabase<unknown>(
    `${supabaseUrl}/rest/v1/${config.table}?id=eq.${id}`,
    {
      method: "DELETE",
      headers: getSupabaseHeaders("service", {
        Prefer: "return=minimal",
      }),
    },
    "Unable to delete the admin content item."
  )
}

export async function getPublicSiteContent() {
  const { supabaseUrl } = getSupabaseServerEnv()

  const currentSchoolYearUrl = new URL(`${supabaseUrl}/rest/v1/school_years`)
  currentSchoolYearUrl.searchParams.set(
    "select",
    "id,label,starts_on,ends_on,is_current,is_active,created_at,updated_at"
  )
  currentSchoolYearUrl.searchParams.set("is_current", "eq.true")
  currentSchoolYearUrl.searchParams.set("is_active", "eq.true")
  currentSchoolYearUrl.searchParams.set("limit", "1")

  const currentSchoolYearRows = await fetchFromSupabase<Record<string, unknown>[]>(
    currentSchoolYearUrl,
    {
      headers: getSupabaseHeaders("service"),
    },
    "Unable to load the current school year."
  )

  const currentSchoolYear = currentSchoolYearRows[0] || null
  const currentSchoolYearId = typeof currentSchoolYear?.id === "string" ? currentSchoolYear.id : null

  let currentItEnrollment: Record<string, unknown> | null = null

  if (currentSchoolYearId) {
    const enrollmentUrl = new URL(`${supabaseUrl}/rest/v1/enrollment_counts`)
    enrollmentUrl.searchParams.set(
      "select",
      "id,school_year_id,department_slug,department_name,student_count,created_at,updated_at"
    )
    enrollmentUrl.searchParams.set("school_year_id", `eq.${currentSchoolYearId}`)
    enrollmentUrl.searchParams.set("department_slug", "eq.it")
    enrollmentUrl.searchParams.set("limit", "1")

    const enrollmentRows = await fetchFromSupabase<Record<string, unknown>[]>(
      enrollmentUrl,
      {
        headers: getSupabaseHeaders("service"),
      },
      "Unable to load the current IT enrollment."
    )

    currentItEnrollment = enrollmentRows[0] || null
  }

  const [siteSettingsRows, positions, officers, programs, projects, events, galleryItems, socialLinks] = await Promise.all([
    fetchPublicCollection(
      "site_settings",
      "id,singleton,show_public_leadership,created_at,updated_at",
      [],
      "created_at.asc"
    ),
    fetchPublicCollection("officer_positions", "id,name,slug,sort_order,is_active", [
      ["is_active", "eq.true"],
    ], "sort_order.asc,name.asc"),
    currentSchoolYearId
      ? fetchPublicCollection(
          "current_active_officers",
          "id,school_year_id,school_year_label,school_year_is_current,officer_position_id,officer_position_name,officer_position_slug,officer_position_sort_order,custom_position_name,public_position_name,first_name,last_name,slug,bio,photo_url,profile_url,email,phone_number,sort_order,is_active,created_at,updated_at",
          [],
          "officer_position_sort_order.asc.nullslast,sort_order.asc,last_name.asc,first_name.asc"
        )
      : fetchPublicCollection(
          "officers",
          "id,school_year_id,officer_position_id,custom_position_name,first_name,last_name,slug,bio,photo_url,profile_url,email,phone_number,sort_order,is_active,created_at,updated_at",
          [["is_active", "eq.true"]],
          "sort_order.asc,last_name.asc,first_name.asc"
        ),
    fetchPublicCollection(
      "programs",
      "id,title,slug,description,thumbnail_url,video_url,cta_url,sort_order,is_published,created_at,updated_at",
      [["is_published", "eq.true"]],
      "sort_order.asc,title.asc"
    ),
    fetchPublicCollection(
      "projects",
      "id,title,slug,description,github_url,live_demo_url,thumbnail_url,video_url,sort_order,is_featured,is_published,created_at,updated_at",
      [["is_published", "eq.true"]],
      "sort_order.asc,title.asc"
    ),
    fetchPublicCollection(
      "events",
      "id,title,slug,description,starts_at,ends_at,venue,registration_url,external_url,thumbnail_url,video_url,sort_order,is_published,created_at,updated_at",
      [["is_published", "eq.true"]],
      "starts_at.asc.nullslast,sort_order.asc,title.asc"
    ),
    fetchPublicCollection(
      "gallery_items",
      "id,title,description,media_type,media_url,thumbnail_url,external_url,sort_order,is_published,created_at,updated_at",
      [["is_published", "eq.true"]],
      "sort_order.asc,created_at.desc"
    ),
    fetchPublicCollection(
      "social_links",
      "id,platform,label,url,icon_name,sort_order,is_active,created_at,updated_at",
      [["is_active", "eq.true"]],
      "sort_order.asc,platform.asc"
    ),
  ])

  const officerPositionsById = new Map<string, Record<string, unknown>>(
    positions
      .filter((position) => typeof position.id === "string")
      .map((position) => [position.id as string, position])
  )

  const officersWithPositions = officers.map((officer) => {
    const publicPositionName =
      typeof officer.public_position_name === "string" ? officer.public_position_name : null
    const officerPositionId =
      typeof officer.officer_position_id === "string" ? officer.officer_position_id : null

    return {
      ...officer,
      position:
        officerPositionId && officerPositionsById.has(officerPositionId)
          ? officerPositionsById.get(officerPositionId)
          : null,
      position_name:
        publicPositionName
          ? publicPositionName
          : officerPositionId && officerPositionsById.has(officerPositionId)
            ? officerPositionsById.get(officerPositionId)?.name || null
            : null,
    }
  })

  return {
    siteSettings: siteSettingsRows[0] || null,
    currentSchoolYear,
    currentItStudentsCount:
      typeof currentItEnrollment?.student_count === "number" ? currentItEnrollment.student_count : 0,
    currentItEnrollment,
    officerPositions: positions,
    officers: officersWithPositions,
    programs,
    projects,
    events,
    galleryItems,
    socialLinks,
  }
}

async function fetchPublicCollection(
  table: string,
  select: string,
  filters: Array<[string, string]>,
  order: string
) {
  const { supabaseUrl } = getSupabaseServerEnv()
  const url = new URL(`${supabaseUrl}/rest/v1/${table}`)

  url.searchParams.set("select", select)
  url.searchParams.set("order", order)

  for (const [key, value] of filters) {
    url.searchParams.set(key, value)
  }

  return fetchFromSupabase<Record<string, unknown>[]>(
    url,
    {
      headers: getSupabaseHeaders("service"),
    },
    "Unable to load public site content."
  )
}

export function isSupabaseContentApiError(error: unknown): error is SupabaseContentApiError {
  return error instanceof SupabaseContentApiError
}
