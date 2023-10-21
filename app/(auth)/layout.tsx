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

  if (session) {
    redirect("/inicio")
  }
  return <div className="flex h-screen w-full flex-1 items-center justify-center">{children}</div>
}
