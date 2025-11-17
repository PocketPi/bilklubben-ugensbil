"use client"

import { useState, useRef } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { EditCarForm, EditCarFormRef } from "./edit-car-form"

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
  const [imageUrl, setImageUrl] = useState<string | null>(car.imageUrl)
  const formRef = useRef<EditCarFormRef>(null)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen) {
      setImageUrl(car.imageUrl)
    }
  }

  const handleSubmit = () => {
    formRef.current?.submit()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
          ref={formRef}
          car={car} 
          formId="edit-car-form"
          onSuccess={() => setOpen(false)}
          onImageUrlChange={setImageUrl}
        />
        <DialogFooter className="justify-center">
          <Button onClick={handleSubmit} disabled={!imageUrl}>
            Update Car
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

