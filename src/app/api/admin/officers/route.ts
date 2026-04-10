import {
  handleAdminCollectionGet,
  handleAdminCollectionPost,
} from "@/lib/api/admin-content-route-handlers"

const resource = "officers"

export async function GET() {
  return handleAdminCollectionGet(resource)
}

export async function POST(request: Request) {
  return handleAdminCollectionPost(resource, request)
}
