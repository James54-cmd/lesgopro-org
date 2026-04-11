import type { ManagementResourceDefinition, ManagementResourceName } from "./admin-management-types"

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

export const managementResourceDefinitions: ManagementResourceDefinition[] = [
  {
    name: "school-years",
    label: "School Years",
    description: "Control which school year is active and which one is currently driving public data.",
    endpoint: "/api/admin/school-years",
    itemEndpointPattern: "/api/admin/school-years/:id",
    listTitle: "School year records",
    formTitle: "School year details",
    emptyTitle: "No school years yet",
    emptyDescription: "Create the first school year so management can define the current cycle.",
    columns: [
      { key: "label", label: "Label" },
      { key: "starts_on", label: "Starts" },
      { key: "ends_on", label: "Ends" },
      { key: "is_current", label: "Current" },
    ],
    fields: [
      { name: "label", label: "Label", type: "text", required: true, placeholder: "2025-2026" },
      { name: "starts_on", label: "Start date", type: "date" },
      { name: "ends_on", label: "End date", type: "date" },
      { name: "is_current", label: "Current school year", type: "checkbox" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
  },
  {
    name: "enrollment-counts",
    label: "Enrollment Counts",
    description: "Store the current IT student count for a specific school year.",
    endpoint: "/api/admin/enrollment-counts",
    itemEndpointPattern: "/api/admin/enrollment-counts/:id",
    listTitle: "Enrollment records",
    formTitle: "Enrollment details",
    emptyTitle: "No enrollment data yet",
    emptyDescription: "Add the enrolled IT student count for the active school year.",
    columns: [
      { key: "school_year_id", label: "School year ID" },
      { key: "department_name", label: "Department" },
      { key: "student_count", label: "Count" },
    ],
    fields: [
      { name: "school_year_id", label: "School year ID", type: "text", required: true },
      { name: "department_slug", label: "Department slug", type: "text", required: true, placeholder: "it" },
      { name: "department_name", label: "Department name", type: "text", required: true, placeholder: "Information Technology" },
      { name: "student_count", label: "Student count", type: "number", required: true, placeholder: "350" },
    ],
  },
  {
    name: "officer-positions",
    label: "Officer Positions",
    description: "Define dynamic roles like president, vice president, secretary, and future positions.",
    endpoint: "/api/admin/officer-positions",
    itemEndpointPattern: "/api/admin/officer-positions/:id",
    listTitle: "Officer position records",
    formTitle: "Officer position details",
    emptyTitle: "No positions yet",
    emptyDescription: "Create dynamic leadership positions before assigning officers.",
    columns: [
      { key: "name", label: "Name" },
      { key: "slug", label: "Slug" },
      { key: "sort_order", label: "Order" },
      { key: "is_active", label: "Active" },
    ],
    fields: [
      { name: "name", label: "Position name", type: "text", required: true, placeholder: "President" },
      { name: "slug", label: "Slug", type: "text", required: true, placeholder: "president" },
      { name: "sort_order", label: "Sort order", type: "number", placeholder: "1" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
  },
  {
    name: "officers",
    label: "Officers",
    description: "Assign leadership members per school year with profile and contact details.",
    endpoint: "/api/admin/officers",
    itemEndpointPattern: "/api/admin/officers/:id",
    listTitle: "Officer records",
    formTitle: "Officer details",
    emptyTitle: "No officers yet",
    emptyDescription: "Add the current management team and connect them to positions.",
    listSelect:
      "id,school_year_id,officer_position_id,custom_position_name,first_name,last_name,slug,bio,photo_url,profile_url,email,phone_number,sort_order,is_active,created_at,updated_at,school_year:school_years(id,label,is_current),officer_position:officer_positions(id,name,slug,is_active)",
    itemSelect:
      "id,school_year_id,officer_position_id,custom_position_name,first_name,last_name,slug,bio,photo_url,profile_url,email,phone_number,sort_order,is_active,created_at,updated_at,school_year:school_years(id,label,is_current),officer_position:officer_positions(id,name,slug,is_active)",
    transformRecord: flattenOfficerRecord,
    columns: [
      { key: "first_name", label: "First name" },
      { key: "last_name", label: "Last name" },
      { key: "school_year_label", label: "School year" },
      { key: "officer_position_label", label: "Position" },
    ],
    fields: [
      { name: "school_year_id", label: "School year ID", type: "text", required: true },
      { name: "officer_position_id", label: "Position ID", type: "text" },
      { name: "custom_position_name", label: "Custom position name", type: "text" },
      { name: "first_name", label: "First name", type: "text", required: true },
      { name: "last_name", label: "Last name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "photo_url", label: "Photo URL", type: "url" },
      { name: "profile_url", label: "Profile URL", type: "url" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone_number", label: "Phone number", type: "text" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
  },
  {
    name: "programs",
    label: "Programs",
    description: "Manage the list of programs offered on the public site.",
    endpoint: "/api/admin/programs",
    itemEndpointPattern: "/api/admin/programs/:id",
    listTitle: "Program records",
    formTitle: "Program details",
    emptyTitle: "No programs yet",
    emptyDescription: "Create the first program offer to appear on the homepage.",
    columns: [
      { key: "title", label: "Title" },
      { key: "slug", label: "Slug" },
      { key: "is_published", label: "Published" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "thumbnail_url", label: "Thumbnail URL", type: "url" },
      { name: "video_url", label: "Video URL", type: "url" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "is_published", label: "Published", type: "checkbox" },
    ],
  },
  {
    name: "projects",
    label: "Projects",
    description: "Track projects with GitHub repositories, live demos, and media.",
    endpoint: "/api/admin/projects",
    itemEndpointPattern: "/api/admin/projects/:id",
    listTitle: "Project records",
    formTitle: "Project details",
    emptyTitle: "No projects yet",
    emptyDescription: "Add a project with repository and live demo details.",
    columns: [
      { key: "title", label: "Title" },
      { key: "github_url", label: "GitHub" },
      { key: "live_demo_url", label: "Live demo" },
      { key: "is_published", label: "Published" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "github_url", label: "GitHub URL", type: "url", required: true },
      { name: "live_demo_url", label: "Live demo URL", type: "url" },
      { name: "thumbnail_url", label: "Thumbnail URL", type: "url" },
      { name: "video_url", label: "Video URL", type: "url" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "is_featured", label: "Featured", type: "checkbox" },
      { name: "is_published", label: "Published", type: "checkbox" },
    ],
  },
  {
    name: "events",
    label: "Events",
    description: "Publish event details, schedules, venues, and related media.",
    endpoint: "/api/admin/events",
    itemEndpointPattern: "/api/admin/events/:id",
    listTitle: "Event records",
    formTitle: "Event details",
    emptyTitle: "No events yet",
    emptyDescription: "Create the first event entry for the public site.",
    columns: [
      { key: "title", label: "Title" },
      { key: "starts_at", label: "Starts at" },
      { key: "venue", label: "Venue" },
      { key: "is_published", label: "Published" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "starts_at", label: "Starts at", type: "datetime-local" },
      { name: "ends_at", label: "Ends at", type: "datetime-local" },
      { name: "venue", label: "Venue", type: "text" },
      { name: "registration_url", label: "Registration URL", type: "url" },
      { name: "external_url", label: "External URL", type: "url" },
      { name: "thumbnail_url", label: "Thumbnail URL", type: "url" },
      { name: "video_url", label: "Video URL", type: "url" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "is_published", label: "Published", type: "checkbox" },
    ],
  },
  {
    name: "gallery-items",
    label: "Gallery Items",
    description: "Manage gallery images or videos with descriptions and thumbnails.",
    endpoint: "/api/admin/gallery-items",
    itemEndpointPattern: "/api/admin/gallery-items/:id",
    listTitle: "Gallery records",
    formTitle: "Gallery item details",
    emptyTitle: "No gallery items yet",
    emptyDescription: "Add images or videos for the public gallery.",
    columns: [
      { key: "title", label: "Title" },
      { key: "media_type", label: "Media type" },
      { key: "media_url", label: "Media URL" },
      { key: "is_published", label: "Published" },
    ],
    fields: [
      {
        name: "media_type",
        label: "Media type",
        type: "select",
        required: true,
        options: [
          { label: "Image", value: "image" },
          { label: "Video", value: "video" },
        ],
      },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "media_url", label: "Media URL", type: "url", required: true },
      { name: "thumbnail_url", label: "Thumbnail URL", type: "url" },
      { name: "external_url", label: "External URL", type: "url" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "is_published", label: "Published", type: "checkbox" },
    ],
  },
  {
    name: "social-links",
    label: "Social Links",
    description: "Maintain the organization’s public social and community links.",
    endpoint: "/api/admin/social-links",
    itemEndpointPattern: "/api/admin/social-links/:id",
    listTitle: "Social link records",
    formTitle: "Social link details",
    emptyTitle: "No social links yet",
    emptyDescription: "Add the platforms that should appear on the public site.",
    columns: [
      { key: "platform", label: "Platform" },
      { key: "label", label: "Label" },
      { key: "url", label: "URL" },
      { key: "is_active", label: "Active" },
    ],
    fields: [
      { name: "platform", label: "Platform", type: "text", required: true, placeholder: "facebook" },
      { name: "label", label: "Label", type: "text", required: true, placeholder: "Facebook" },
      { name: "url", label: "URL", type: "url", required: true },
      { name: "icon_name", label: "Icon name", type: "text", placeholder: "facebook" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
  },
]

export function getManagementResourceDefinition(name: ManagementResourceName) {
  return managementResourceDefinitions.find((definition) => definition.name === name) || null
}
