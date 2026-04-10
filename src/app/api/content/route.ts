import { NextResponse } from "next/server"
import {
  getPublicSiteContent,
  isSupabaseContentApiError,
} from "@/lib/api/supabase-content-server"

export async function GET() {
  try {
    const content = await getPublicSiteContent()

    return NextResponse.json(content, { status: 200 })
  } catch (error) {
    if (isSupabaseContentApiError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    console.error("Unable to load public site content", error)

    return NextResponse.json({ error: "Unexpected server error while loading content." }, { status: 500 })
  }
}
