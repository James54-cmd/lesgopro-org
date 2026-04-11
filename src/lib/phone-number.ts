function digitsOnly(value: string) {
  return value.replace(/\D/g, "")
}

export function normalizePhilippineMobileNumber(value: string | null | undefined) {
  const raw = digitsOnly(value || "")

  if (!raw) {
    return ""
  }

  if (raw.startsWith("63")) {
    const localDigits = raw.slice(2)

    if (!localDigits) {
      return ""
    }

    return `0${localDigits}`.slice(0, 11)
  }

  if (raw.startsWith("9")) {
    return `0${raw}`.slice(0, 11)
  }

  if (raw.startsWith("0")) {
    return raw.slice(0, 11)
  }

  return raw.slice(0, 11)
}

export function formatPhilippineMobileNumber(value: string | null | undefined) {
  const normalized = normalizePhilippineMobileNumber(value)

  if (!normalized || normalized.length <= 1) {
    return ""
  }

  const subscriberNumber = normalized.startsWith("0") ? normalized.slice(1) : normalized
  const area = subscriberNumber.slice(0, 3)
  const middle = subscriberNumber.slice(3, 6)
  const last = subscriberNumber.slice(6, 10)

  if (!middle) {
    return `+63 ${area}`.trim()
  }

  if (!last) {
    return `+63 ${area} ${middle}`.trim()
  }

  return `+63 ${area} ${middle} ${last}`
}

export function isValidPhilippineMobileNumber(value: string | null | undefined) {
  const normalized = normalizePhilippineMobileNumber(value)
  return /^09\d{9}$/.test(normalized)
}
