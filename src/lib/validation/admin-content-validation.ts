import {
  isValidPhilippineMobileNumber,
  normalizePhilippineMobileNumber,
} from "@/lib/phone-number"

type ValidationFieldErrors = Record<string, string>

type ValidationSuccess = {
  success: true
  data: Record<string, unknown>
}

type ValidationFailure = {
  success: false
  error: string
  fieldErrors: ValidationFieldErrors
}

export type AdminContentValidationResult = ValidationSuccess | ValidationFailure

function readTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function readBoolean(value: unknown) {
  return value === true
}

function readOptionalUrl(value: unknown) {
  const nextValue = readTrimmedString(value)

  if (!nextValue) {
    return null
  }

  if (nextValue.startsWith("data:image/")) {
    return nextValue
  }

  try {
    const url = new URL(nextValue)
    return url.toString()
  } catch {
    return null
  }
}

function readOptionalEmail(value: unknown) {
  const nextValue = readTrimmedString(value)

  if (!nextValue) {
    return null
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValue) ? nextValue : null
}

function readOptionalPhoneNumber(value: unknown) {
  const nextValue = readTrimmedString(value)

  if (!nextValue) {
    return null
  }

  const normalizedValue = normalizePhilippineMobileNumber(nextValue)
  return isValidPhilippineMobileNumber(normalizedValue) ? normalizedValue : null
}

function readOptionalInteger(value: unknown) {
  if (typeof value === "number" && Number.isInteger(value)) {
    return value
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsedValue = Number(value)
    return Number.isInteger(parsedValue) ? parsedValue : null
  }

  return null
}

function readRequiredDate(value: unknown) {
  const nextValue = readTrimmedString(value)

  if (!nextValue) {
    return null
  }

  const parsedDate = new Date(nextValue)
  return Number.isNaN(parsedDate.getTime()) ? null : nextValue
}

function slugifyOfficerName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function validateSchoolYears(payload: Record<string, unknown>): AdminContentValidationResult {
  const fieldErrors: ValidationFieldErrors = {}
  const label = readTrimmedString(payload.label)
  const startsOn = readRequiredDate(payload.starts_on)
  const endsOn = readRequiredDate(payload.ends_on)
  const isCurrent = readBoolean(payload.is_current)
  const isActive = readBoolean(payload.is_active)

  if (label.length < 3) {
    fieldErrors.label = "Enter a clear school year label."
  }

  if (!startsOn) {
    fieldErrors.starts_on = "Choose a valid start date."
  }

  if (!endsOn) {
    fieldErrors.ends_on = "Choose a valid end date."
  }

  if (startsOn && endsOn && new Date(endsOn).getTime() <= new Date(startsOn).getTime()) {
    fieldErrors.ends_on = "End date must be after the start date."
  }

  if (isCurrent && !isActive) {
    fieldErrors.is_active = "A current school year must stay active."
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: "Fix the school year details before saving.",
      fieldErrors,
    }
  }

  return {
    success: true,
    data: {
      ...payload,
      label,
      starts_on: startsOn,
      ends_on: endsOn,
      is_current: isCurrent,
      is_active: isActive,
    },
  }
}

function validateOfficers(payload: Record<string, unknown>): AdminContentValidationResult {
  const fieldErrors: ValidationFieldErrors = {}
  const schoolYearId = readTrimmedString(payload.school_year_id)
  const officerPositionId = readTrimmedString(payload.officer_position_id)
  const customPositionName = readTrimmedString(payload.custom_position_name)
  const firstName = readTrimmedString(payload.first_name)
  const lastName = readTrimmedString(payload.last_name)
  const bio = readTrimmedString(payload.bio)
  const photoUrl = readOptionalUrl(payload.photo_url)
  const profileUrl = readOptionalUrl(payload.profile_url)
  const email = readOptionalEmail(payload.email)
  const phoneNumber = readOptionalPhoneNumber(payload.phone_number)
  const sortOrder = readOptionalInteger(payload.sort_order)
  const isActive = readBoolean(payload.is_active)
  const slug = readTrimmedString(payload.slug) || slugifyOfficerName(firstName, lastName)

  if (!schoolYearId) {
    fieldErrors.school_year_id = "Choose a school year."
  }

  if (!officerPositionId && !customPositionName) {
    fieldErrors.officer_position_id = "Choose a position or provide a custom role."
    fieldErrors.custom_position_name = "Enter a custom role if no standard position is selected."
  }

  if (firstName.length < 2) {
    fieldErrors.first_name = "Enter the officer's first name."
  }

  if (lastName.length < 2) {
    fieldErrors.last_name = "Enter the officer's last name."
  }

  if (!slug) {
    fieldErrors.first_name = fieldErrors.first_name || "Enter the officer's name."
    fieldErrors.last_name = fieldErrors.last_name || "Enter the officer's name."
  }

  if (payload.photo_url && !photoUrl) {
    fieldErrors.photo_url = "Use a valid image URL or upload a supported image."
  }

  if (payload.profile_url && !profileUrl) {
    fieldErrors.profile_url = "Use a valid profile URL."
  }

  if (payload.email && !email) {
    fieldErrors.email = "Use a valid email address."
  }

  if (payload.phone_number && !phoneNumber) {
    fieldErrors.phone_number = "Use a valid phone number."
  }

  if (sortOrder === null || sortOrder < 1) {
    fieldErrors.sort_order = "Display order must be 1 or higher."
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: "Fix the officer details before saving.",
      fieldErrors,
    }
  }

  return {
    success: true,
    data: {
      ...payload,
      school_year_id: schoolYearId,
      officer_position_id: officerPositionId || null,
      custom_position_name: officerPositionId ? null : customPositionName || null,
      first_name: firstName,
      last_name: lastName,
      slug,
      bio: bio || null,
      photo_url: photoUrl,
      profile_url: profileUrl,
      email,
      phone_number: phoneNumber,
      sort_order: sortOrder,
      is_active: isActive,
    },
  }
}

export function validateAdminContentPayload(
  resource: string,
  payload: Record<string, unknown>
): AdminContentValidationResult {
  if (resource === "school-years") {
    return validateSchoolYears(payload)
  }

  if (resource === "officers") {
    return validateOfficers(payload)
  }

  return {
    success: true,
    data: payload,
  }
}

export type { ValidationFieldErrors }
