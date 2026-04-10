import {
  handleAdminCollectionGet,
  handleAdminCollectionPost,
} from "@/lib/api/admin-content-route-handlers"

const resource = "social-links"

export async function GET() {
  return handleAdminCollectionGet(resource)
}

export async function POST(request: Request) {
  return handleAdminCollectionPost(resource, request)
}
