import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "@/components/ui/toast"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Sidebar } from "@/components/layout/sidebar"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EnlightEd - Modern Learning Dashboard",
  description: "Premium AI-powered EdTech platform for modern learning",
  keywords: ["education", "learning", "dashboard", "AI", "EdTech"],
  authors: [{ name: "EnlightEd Team" }],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          <ToastProvider>
            <Sidebar />
            <div className="lg:ml-[280px]">
              {children}
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}