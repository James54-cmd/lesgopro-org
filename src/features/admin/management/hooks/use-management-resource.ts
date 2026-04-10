"use client"

import { useCallback, useEffect, useState } from "react"
import {
  createManagementRecord,
  deleteManagementRecord,
  listManagementRecords,
  updateManagementRecord,
} from "@/lib/api/admin-management/admin-management-requests"
import type {
  ManagementRecord,
  ManagementResourceDefinition,
  ManagementResourceField,
} from "../admin-management-types"
import { useManagementResourceState } from "./use-management-resource-state"

function sanitizeFieldValue(field: ManagementResourceField, value: ManagementRecord[string]) {
  if (field.type === "checkbox") {
    return Boolean(value)
  }

  if (field.type === "number") {
    if (value === "" || value === null) {
      return null
    }

    const parsedValue = Number(value)
    return Number.isNaN(parsedValue) ? null : parsedValue
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim()
    return trimmedValue.length === 0 ? null : trimmedValue
  }

  return value
}

export function useManagementResource(definition: ManagementResourceDefinition) {
  const [items, setItems] = useState<ManagementRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const state = useManagementResourceState(definition)

  const fetchItems = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const nextItems = await listManagementRecords(definition.endpoint)
      setItems(nextItems)
    } catch {
      setErrorMessage("Unable to reach the management API.")
    } finally {
      setIsLoading(false)
    }
  }, [definition.endpoint])

  useEffect(() => {
    void fetchItems()
  }, [fetchItems])

  async function submitForm() {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const body = Object.fromEntries(
        definition.fields.map((field) => [field.name, sanitizeFieldValue(field, state.formValues[field.name])])
      )

      if (state.isEditing && state.editingItemId) {
        await updateManagementRecord(definition.endpoint, state.editingItemId, body)
      } else {
        await createManagementRecord(definition.endpoint, body)
      }

      await fetchItems()
      state.startCreate()

      return true
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to reach the management API."
      )
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  async function deleteItem(id: string) {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await deleteManagementRecord(definition.endpoint, id)

      if (state.editingItemId === id) {
        state.startCreate()
      }

      await fetchItems()
      return true
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to reach the management API."
      )
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  function startCreate() {
    setErrorMessage(null)
    state.startCreate()
  }

  function startEdit(item: ManagementRecord) {
    setErrorMessage(null)
    state.startEdit(item)
  }

  return {
    items,
    isLoading,
    isSubmitting,
    errorMessage,
    isEditing: state.isEditing,
    formValues: state.formValues,
    fetchItems,
    startCreate,
    startEdit,
    updateField: state.updateField,
    submitForm,
    deleteItem,
  }
}
