"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { appUserMenuItems } from "@/config/app/app-user-menu-items"
import { useUser } from "@/lib/api/user"
import { getFirstTwoLettersOfString } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Skeleton } from "../ui/skeleton"
import { UserMenuLogoutItem } from "./app-user-menu-logout-item"

export function AppUserMenu() {
  const router = useRouter()

  const { data: user, loading } = useUser({})

  console.log(user)

  return loading ? (
    <Skeleton className="w-full h-[35px] rounded-full" />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-full mt-auto mb-6 flex items-center mx-auto justify-center gap-2 py-3 px-6"
        >
          <Avatar className="h-8 w-8 border">
            <AvatarImage src="/" alt={`Avatar de ${user?.name}`} />
            <AvatarFallback>{getFirstTwoLettersOfString(String(user?.name))}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium leading-none">{user?.email}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {appUserMenuItems.map((item) => (
            <DropdownMenuItem key={item.url} onClick={() => router.push(item.url)}>
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <UserMenuLogoutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
