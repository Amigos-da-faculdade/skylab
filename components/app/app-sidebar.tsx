"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { appNavigation } from "@/config/app/app-navigation"
import { cn } from "@/lib/utils"
import { Banana } from "lucide-react"
import { AppUserMenu } from "./app-user-menu"

export function AppSidebar() {
  const pathname = usePathname()

  const navigationMarkup = appNavigation
    .filter((item) => !!item.enabled)
    .map((item) => {
      return (
        <div key={item.label}>
          <h2 className="mb-1 mt-2 px-2 text-sm font-semibold tracking-tight">{item.label}</h2>
          <ul className="space-y-1">
            {item.items
              .filter((item) => !!item.enabled)
              .map((item) => {
                const isCurrentUrl = pathname === item.url
                return (
                  <li key={item.url}>
                    <Link
                      key={item.url}
                      href={item.url}
                      className={cn(
                        "group flex h-8 w-full items-center gap-2 rounded-md border border-transparent px-2 py-1 text-sm hover:bg-primary hover:text-white",
                        isCurrentUrl && "bg-primary text-white dark:text-background"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                    {item.items && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.items
                          .filter((item) => !!item.enabled)
                          .map((item) => {
                            const isCurrentUrl = pathname === item.url
                            return (
                              <li key={item.url}>
                                <Link
                                  key={item.url}
                                  href={item.url}
                                  className={cn(
                                    "group flex h-8 w-full items-center gap-2 rounded-md border border-transparent px-2 py-1 text-sm hover:bg-primary hover:text-white",
                                    isCurrentUrl && "bg-primary text-white dark:text-background"
                                  )}
                                >
                                  {item.icon}
                                  {item.label}
                                </Link>
                              </li>
                            )
                          })}
                      </ul>
                    )}
                  </li>
                )
              })}
          </ul>
        </div>
      )
    })

  return (
    <aside className="sticky left-0 top-0 z-40 hidden h-screen w-80 border-r bg-background px-4 md:flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-full items-center justify-center">
          <Link
            href="/"
            className="hidden md:flex text-lg gap-2 items-center font-extrabold text-primary"
          >
            <Banana />
            Skylab
          </Link>
        </div>
        <nav className="mt-6 flex w-full flex-col gap-4">
          <ul className="grid grid-flow-row auto-rows-max gap-2 text-sm">{navigationMarkup}</ul>
        </nav>
      </div>
      <AppUserMenu />
    </aside>
  )
}
