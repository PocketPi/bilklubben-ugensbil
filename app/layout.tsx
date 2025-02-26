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
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bilklubben Podcast - Ugens Bil",
  description: "Bilklubben Podcast - Ugens Bil",
};

function NoFlashScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if (localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') &&
              window.matchMedia('(prefers-color-scheme: dark)').matches)
          ) {
            document.documentElement.classList.add('ut--dark')
          }
        `,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <NoFlashScript />
      </head>
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
          suppressHydrationWarnings
        >
          <ClerkProvider>
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
