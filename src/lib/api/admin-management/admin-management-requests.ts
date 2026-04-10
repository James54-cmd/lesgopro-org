type ManagementRecordValue = string | number | boolean | null
export type ManagementRecord = Record<string, ManagementRecordValue>

type ManagementRecordListResponse = {
  items?: ManagementRecord[]
  error?: string
}

type ManagementRecordItemResponse = {
  item?: ManagementRecord | null
  error?: string
}

async function parseResponse<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

export async function listManagementRecords(endpoint: string) {
  const response = await fetch(endpoint, { method: "GET" })
  const payload = await parseResponse<ManagementRecordListResponse>(response)

  if (!response.ok) {
    throw new Error(payload.error || "Unable to load management records.")
  }

  return payload.items || []
}

export async function createManagementRecord(
  endpoint: string,
  body: Record<string, unknown>
) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const payload = await parseResponse<ManagementRecordItemResponse>(response)

  if (!response.ok) {
    throw new Error(payload.error || "Unable to save the record.")
  }

  return payload.item || null
}

export async function updateManagementRecord(
  endpoint: string,
  id: string,
  body: Record<string, unknown>
) {
  const response = await fetch(`${endpoint}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const payload = await parseResponse<ManagementRecordItemResponse>(response)

  if (!response.ok) {
    throw new Error(payload.error || "Unable to save the record.")
  }

  return payload.item || null
}

export async function deleteManagementRecord(endpoint: string, id: string) {
  const response = await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  })

  const payload = await parseResponse<{ error?: string }>(response)

  if (!response.ok) {
    throw new Error(payload.error || "Unable to delete the record.")
  }
}
