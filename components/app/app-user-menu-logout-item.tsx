"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { DropdownMenuItem } from "../ui/dropdown-menu"

export const UserMenuLogoutItem = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (!!error) {
      return toast.error(error.message)
    }
    router.push("/entrar")
  }

  return (
    <DropdownMenuItem onClick={signOut}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sair</span>
    </DropdownMenuItem>
  )
}
