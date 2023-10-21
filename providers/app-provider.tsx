"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"
import { Toaster } from "sonner"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      cacheTime: 60 * 1000,
    },
  },
})

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}
