import { User } from "lucide-react"

export const appUserMenuItems = [
  {
    label: "Minha conta",
    url: "/minha-conta",
    icon: <User height={16} width={16} className="mr-2" />,
  },
]

export type UserMenuItems = typeof appUserMenuItems
