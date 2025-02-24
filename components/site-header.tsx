import Link from "next/link"
import { Car, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#5D4B8C]">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-white">
          <Car className="h-6 w-6" />
          <span className="text-xl font-bold">Bilklubben Podcast</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/add">
            <Button variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              Tilføj Bil
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

