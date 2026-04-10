import { redirect } from "next/navigation"
import { AdminLoginPage } from "@/features/admin/auth"
import { getCurrentAdminSession } from "@/lib/api/admin-auth-session"

export default async function AdminLoginRoute() {
  const session = await getCurrentAdminSession()

  if (session) {
    redirect("/admin")
  }

  return <AdminLoginPage />
}
