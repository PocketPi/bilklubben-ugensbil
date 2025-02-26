import { CarRankings } from "@/components/car-rankings"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Ugens Bil</h1>
        <CarRankings />
      </main>
    </div>
  )
}
