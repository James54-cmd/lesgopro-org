export type ManagementResourceName =
  | "school-years"
  | "enrollment-counts"
  | "officer-positions"
  | "officers"
  | "programs"
  | "projects"
  | "events"
  | "gallery-items"
  | "social-links"

export type ManagementFieldType =
  | "text"
  | "textarea"
  | "url"
  | "number"
  | "date"
  | "datetime-local"
  | "checkbox"
  | "select"

export type ManagementResourceFieldOption = {
  label: string
  value: string
}

export type ManagementResourceField = {
  name: string
  label: string
  type: ManagementFieldType
  required?: boolean
  placeholder?: string
  description?: string
  options?: ManagementResourceFieldOption[]
}

export type ManagementResourceColumn = {
  key: string
  label: string
}

export type ManagementResourceDefinition = {
  name: ManagementResourceName
  label: string
  description: string
  endpoint: string
  itemEndpointPattern: string
  listTitle: string
  formTitle: string
  emptyTitle: string
  emptyDescription: string
  columns: ManagementResourceColumn[]
  fields: ManagementResourceField[]
}

export type ManagementRecordValue = string | number | boolean | null
export type ManagementRecord = Record<string, ManagementRecordValue>
