import {
  handleAdminCollectionGet,
  handleAdminCollectionPost,
} from "@/lib/api/admin-content-route-handlers"

const resource = "programs"

export async function GET() {
  return handleAdminCollectionGet(resource)
}

export async function POST(request: Request) {
  return handleAdminCollectionPost(resource, request)
}
