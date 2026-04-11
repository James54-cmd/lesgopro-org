"use client"

import { FormEvent } from "react"
import { Pencil, Plus, RefreshCcw, Trash2 } from "lucide-react"
import { StatusBadge } from "@/components/app/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { ManagementRecord, ManagementResourceDefinition } from "../admin-management-types"
import { useManagementResource } from "../hooks/use-management-resource"

type ManagementResourcePanelProps = {
  definition: ManagementResourceDefinition
}

function formatValue(value: ManagementRecord[string]) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No"
  }

  if (value === null || value === undefined || value === "") {
    return "—"
  }

  return String(value)
}

export function ManagementResourcePanel({ definition }: ManagementResourcePanelProps) {
  const {
    items,
    isLoading,
    isSubmitting,
    errorMessage,
    fieldErrors,
    isEditing,
    formValues,
    fetchItems,
    startCreate,
    startEdit,
    updateField,
    submitForm,
    deleteItem,
  } = useManagementResource(definition)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submitForm()
  }

  return (
    <Card className="border-primary/10 bg-white shadow-card">
      <CardHeader className="gap-4 border-b border-primary/10 pb-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <CardTitle className="type-h3 text-ink-900">{definition.label}</CardTitle>
            <CardDescription className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-700">
              {definition.description}
            </CardDescription>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => void fetchItems()} disabled={isLoading || isSubmitting}>
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button type="button" onClick={startCreate} disabled={isSubmitting}>
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-6 pt-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-ink-900">{definition.listTitle}</p>
            <StatusBadge variant="neutral">{items.length} records</StatusBadge>
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-2xl border border-primary/10 bg-muted/40 px-4 py-8 text-sm text-ink-700">
              Loading records...
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary/20 bg-muted/30 px-4 py-8">
              <p className="text-sm font-semibold text-ink-900">{definition.emptyTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{definition.emptyDescription}</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-primary/10">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-primary/10 text-sm">
                  <thead className="bg-muted/40">
                    <tr>
                      {definition.columns.map((column) => (
                        <th
                          key={column.key}
                          className="px-4 py-3 text-left font-semibold text-ink-700"
                        >
                          {column.label}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-right font-semibold text-ink-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10 bg-white">
                    {items.map((item, index) => {
                      const itemId = typeof item.id === "string" ? item.id : `row-${index}`

                      return (
                        <tr key={itemId} className="align-top">
                          {definition.columns.map((column) => (
                            <td key={`${itemId}-${column.key}`} className="px-4 py-3 text-ink-800">
                              <span className="block max-w-[260px] truncate">
                                {formatValue(item[column.key])}
                              </span>
                            </td>
                          ))}
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => startEdit(item)}
                                disabled={isSubmitting}
                              >
                                <Pencil className="h-4 w-4" />
                                Edit
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="border-destructive/20 text-destructive hover:bg-destructive/5 hover:text-destructive"
                                onClick={() => {
                                  if (typeof item.id === "string") {
                                    void deleteItem(item.id)
                                  }
                                }}
                                disabled={isSubmitting}
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-primary/10 bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ink-900">{definition.formTitle}</p>
              <p className="mt-1 text-sm text-ink-700">
                {isEditing ? "Update the selected record." : "Create a new record for this resource."}
              </p>
            </div>
            <StatusBadge variant={isEditing ? "lead" : "active"}>
              {isEditing ? "Editing" : "Creating"}
            </StatusBadge>
          </div>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            {definition.fields.map((field) => {
              const fieldValue = formValues[field.name]

              return (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={`${definition.name}-${field.name}`}>{field.label}</Label>

                  {field.type === "textarea" ? (
                    <Textarea
                      id={`${definition.name}-${field.name}`}
                      value={typeof fieldValue === "string" ? fieldValue : ""}
                      onChange={(event) => updateField(field.name, event.target.value)}
                      placeholder={field.placeholder}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(fieldErrors[field.name])}
                    />
                  ) : field.type === "select" ? (
                    <Select
                      value={typeof fieldValue === "string" ? fieldValue : ""}
                      onValueChange={(value) => updateField(field.name, value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        id={`${definition.name}-${field.name}`}
                        aria-invalid={Boolean(fieldErrors[field.name])}
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white px-3 py-3 text-sm text-ink-800">
                      <Checkbox
                        id={`${definition.name}-${field.name}`}
                        checked={Boolean(fieldValue)}
                        onCheckedChange={(checked) => updateField(field.name, checked === true)}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(fieldErrors[field.name])}
                      />
                      <span>{field.label}</span>
                    </label>
                  ) : (
                    <Input
                      id={`${definition.name}-${field.name}`}
                      type={field.type === "number" ? "number" : field.type}
                      value={
                        typeof fieldValue === "number"
                          ? String(fieldValue)
                          : typeof fieldValue === "string"
                            ? fieldValue
                            : ""
                      }
                      onChange={(event) => updateField(field.name, event.target.value)}
                      placeholder={field.placeholder}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(fieldErrors[field.name])}
                    />
                  )}

                  {fieldErrors[field.name] ? (
                    <p className="text-xs leading-relaxed text-destructive">{fieldErrors[field.name]}</p>
                  ) : null}

                  {field.description ? (
                    <p className="text-xs leading-relaxed text-ink-500">{field.description}</p>
                  ) : null}
                </div>
              )
            })}

            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : isEditing ? "Save changes" : "Create record"}
              </Button>
              <Button type="button" variant="outline" onClick={startCreate} disabled={isSubmitting}>
                Reset form
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
