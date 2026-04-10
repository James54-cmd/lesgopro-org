import {
  handleAdminItemDelete,
  handleAdminItemGet,
  handleAdminItemPatch,
} from "@/lib/api/admin-content-route-handlers"

type RouteContext = {
  params: {
    id: string
  }
}

const resource = "gallery-items"

export async function GET(_: Request, { params }: RouteContext) {
  return handleAdminItemGet(resource, params.id)
}

export async function PATCH(request: Request, { params }: RouteContext) {
  return handleAdminItemPatch(resource, params.id, request)
}

export async function DELETE(_: Request, { params }: RouteContext) {
  return handleAdminItemDelete(resource, params.id)
}
