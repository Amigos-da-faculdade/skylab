import { AppSidebar } from "@/components/app/app-sidebar"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"

export default async function Layout({ children }: PropsWithChildren) {
  const supabase = createServerComponentClient({
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/entrar")
  }

  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full">
        {/* <AppHeader /> */}
        {children}
      </div>
    </div>
  )
}
