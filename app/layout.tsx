import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@uploadthing/react/styles.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: false
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false
});

export const metadata: Metadata = {
  title: "Bilklubben Podcast - Ugens Bil",
  description: "Bilklubben Podcast - Ugens Bil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen font-sans antialiased",
        geistSans.variable,
        geistMono.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
          storageKey="theme"
        >
          <ClerkProvider>
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
