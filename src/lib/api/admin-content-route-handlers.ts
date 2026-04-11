import { NextResponse } from "next/server"
import {
  createAdminContentItem,
  deleteAdminContentItem,
  findOfficerWithPositionInSchoolYear,
  getAdminContentItem,
  isSupabaseContentApiError,
  listAdminContent,
  updateAdminContentItem,
} from "@/lib/api/supabase-content-server"
import { validateAdminContentPayload } from "@/lib/validation/admin-content-validation"

function parseObjectBody(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return null
  }

  return body as Record<string, unknown>
}

async function validateOfficerPositionUniqueness(
  payload: Record<string, unknown>,
  currentOfficerId?: string
) {
  const schoolYearId =
    typeof payload.school_year_id === "string" ? payload.school_year_id.trim() : ""
  const officerPositionId =
    typeof payload.officer_position_id === "string" ? payload.officer_position_id.trim() : ""

  if (!schoolYearId || !officerPositionId) {
    return null
  }

  const duplicateOfficer = await findOfficerWithPositionInSchoolYear(
    schoolYearId,
    officerPositionId,
    currentOfficerId
  )

  if (!duplicateOfficer) {
    return null
  }

  const firstName =
    typeof duplicateOfficer.first_name === "string" ? duplicateOfficer.first_name : "Another"
  const lastName =
    typeof duplicateOfficer.last_name === "string" ? duplicateOfficer.last_name : "officer"

  return NextResponse.json(
    {
      error: "That position is already assigned for the selected school year.",
      fieldErrors: {
        officer_position_id: `${firstName} ${lastName} already holds this position for that school year.`,
      },
    },
    { status: 400 }
  )
}

export async function handleAdminCollectionGet(resource: string) {
  try {
    const items = await listAdminContent(resource)

    return NextResponse.json({ items }, { status: 200 })
  } catch (error) {
    if (isSupabaseContentApiError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    console.error(`Unable to list ${resource}`, error)

    return NextResponse.json({ error: "Unexpected server error while listing content." }, { status: 500 })
  }
}

export async function handleAdminCollectionPost(resource: string, request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 })
  }

  const payload = parseObjectBody(body)

  if (!payload) {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 })
  }

  const validationResult = validateAdminContentPayload(resource, payload)

  if (!validationResult.success) {
    return NextResponse.json(
      {
        error: validationResult.error,
        fieldErrors: validationResult.fieldErrors,
      },
      { status: 400 }
    )
  }

  if (resource === "officers") {
    const uniquenessError = await validateOfficerPositionUniqueness(validationResult.data)

    if (uniquenessError) {
      return uniquenessError
    }
  }

  try {
    const items = await createAdminContentItem(resource, validationResult.data)

    return NextResponse.json({ item: items[0] || null }, { status: 201 })
  } catch (error) {
    if (isSupabaseContentApiError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    console.error(`Unable to create ${resource}`, error)

    return NextResponse.json({ error: "Unexpected server error while creating content." }, { status: 500 })
  }
}

export async function handleAdminItemGet(resource: string, id: string) {
  try {
    const item = await getAdminContentItem(resource, id)

    if (!item) {
      return NextResponse.json({ error: "Content item not found." }, { status: 404 })
    }

    return NextResponse.json({ item }, { status: 200 })
  } catch (error) {
    if (isSupabaseContentApiError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    console.error(`Unable to load ${resource} item`, error)

    return NextResponse.json({ error: "Unexpected server error while loading content." }, { status: 500 })
  }
}

export async function handleAdminItemPatch(resource: string, id: string, request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 })
  }

  const payload = parseObjectBody(body)

  if (!payload) {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 })
  }

  const validationResult = validateAdminContentPayload(resource, payload)

  if (!validationResult.success) {
    return NextResponse.json(
      {
        error: validationResult.error,
        fieldErrors: validationResult.fieldErrors,
      },
      { status: 400 }
    )
  }

  if (resource === "officers") {
    const uniquenessError = await validateOfficerPositionUniqueness(validationResult.data, id)

    if (uniquenessError) {
      return uniquenessError
    }
  }

  try {
    const items = await updateAdminContentItem(resource, id, validationResult.data)

    return NextResponse.json({ item: items[0] || null }, { status: 200 })
  } catch (error) {
    if (isSupabaseContentApiError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    console.error(`Unable to update ${resource} item`, error)

    return NextResponse.json({ error: "Unexpected server error while updating content." }, { status: 500 })
  }
}

export async function handleAdminItemDelete(resource: string, id: string) {
  try {
    await deleteAdminContentItem(resource, id)

    return NextResponse.json({ message: "Content item deleted successfully." }, { status: 200 })
  } catch (error) {
    if (isSupabaseContentApiError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    console.error(`Unable to delete ${resource} item`, error)

    return NextResponse.json({ error: "Unexpected server error while deleting content." }, { status: 500 })
  }
}
