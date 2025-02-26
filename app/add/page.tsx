import { AddCarForm } from "@/components/add-car-form"
import { SiteHeader } from "@/components/site-header"

export default function AddPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-8">Tilføj Ny Bil</h1>
        <AddCarForm />
      </main>
    </div>
  )
}
