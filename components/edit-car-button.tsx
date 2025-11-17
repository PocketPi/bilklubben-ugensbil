"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EditCarForm } from "./edit-car-form"

interface EditCarButtonProps {
  car: {
    id: number
    manufacturer: string | null
    model: string | null
    points: number | null
    episode: number | null
    imageUrl: string | null
  }
}

export function EditCarButton({ car }: EditCarButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit car</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Car</DialogTitle>
        </DialogHeader>
        <EditCarForm 
          car={car} 
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

