import { AppProvider } from "@/providers/app-provider"

import { Metadata } from "next"
import { PropsWithChildren } from "react"
import "./globals.css"

import { siteConfig } from "@/config/site"
import { env } from "@/lib/env"
import { fontMono, fontSans } from "@/lib/font"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/providers/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  keywords: ["SEIBIM", "Seminário"],
  authors: [
    {
      name: "Davi Alcântara",
      url: "https://github.com/davialcantaraa",
    },
  ],
  creator: "Davi Alcântara",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html lang="pt-BR" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable
          )}
        >
          <AppProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <div className="flex-1">{children}</div>
            </ThemeProvider>
          </AppProvider>
        </body>
      </html>
    </>
  )
}
