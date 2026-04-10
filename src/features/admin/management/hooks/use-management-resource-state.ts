"use client"

import { useMemo, useState } from "react"
import type {
  ManagementRecord,
  ManagementResourceDefinition,
  ManagementResourceField,
} from "../admin-management-types"

function getInitialFormValues(fields: ManagementResourceField[]): ManagementRecord {
  return Object.fromEntries(
    fields.map((field) => [
      field.name,
      field.type === "checkbox" ? false : field.type === "number" ? 0 : "",
    ])
  )
}

function normalizeRecord(
  record: ManagementRecord | null | undefined,
  fields: ManagementResourceField[]
): ManagementRecord {
  const defaults = getInitialFormValues(fields)

  if (!record) {
    return defaults
  }

  return {
    ...defaults,
    ...record,
  }
}

export function useManagementResourceState(definition: ManagementResourceDefinition) {
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<ManagementRecord>(() =>
    getInitialFormValues(definition.fields)
  )

  const isEditing = useMemo(() => editingItemId !== null, [editingItemId])

  function startCreate() {
    setEditingItemId(null)
    setFormValues(getInitialFormValues(definition.fields))
  }

  function startEdit(item: ManagementRecord) {
    const id = typeof item.id === "string" ? item.id : null

    if (!id) {
      return
    }

    setEditingItemId(id)
    setFormValues(normalizeRecord(item, definition.fields))
  }

  function updateField(fieldName: string, value: ManagementRecord[string]) {
    setFormValues((current) => ({
      ...current,
      [fieldName]: value,
    }))
  }

  return {
    editingItemId,
    formValues,
    isEditing,
    startCreate,
    startEdit,
    updateField,
  }
}
