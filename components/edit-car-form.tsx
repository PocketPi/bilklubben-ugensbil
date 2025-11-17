"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UploadButton } from "@/app/utils/uploadthing"

const formSchema = z.object({
  manufacturer: z.string().min(1, "Manufacturer is required"),
  model: z.string().min(1, "Model is required"),
  points: z.number().min(0).max(100),
  episode: z.number().min(1),
})

type FormValues = z.infer<typeof formSchema>

interface EditCarFormProps {
  car: {
    id: number
    manufacturer: string | null
    model: string | null
    points: number | null
    episode: number | null
    imageUrl: string | null
  }
  onSuccess?: () => void
}

export function EditCarForm({ car, onSuccess }: EditCarFormProps) {
  const router = useRouter()
  const [isImageUploaded, setIsImageUploaded] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(car.imageUrl)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      manufacturer: car.manufacturer || "",
      model: car.model || "",
      points: car.points || 0,
      episode: car.episode || 1,
    },
  })

  useEffect(() => {
    if (car.imageUrl) {
      setImageUrl(car.imageUrl)
      setIsImageUploaded(true)
    }
  }, [car.imageUrl])

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch(`/api/cars/${car.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          manufacturer: values.manufacturer,
          model: values.model,
          points: values.points,
          imageUrl: imageUrl,
          episode: values.episode,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update car')
      }

      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error('Error updating car:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl">
        <FormField
          control={form.control}
          name="manufacturer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manufacturer</FormLabel>
              <FormControl>
                <Input placeholder="e.g. BMW" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input placeholder="e.g. M3 Competition" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points (0-100)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  max="100" 
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="episode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Episode Number</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value === "" ? 1 : Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Car Image</FormLabel>
          {imageUrl ? (
            <div className="relative w-full h-96 flex items-center justify-center bg-muted/50 rounded-lg">
              <Image
                src={imageUrl}
                alt="Uploaded car image"
                fill
                className="object-contain rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => {
                  setImageUrl(null)
                  setIsImageUploaded(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res?.[0]) {
                  setImageUrl(res[0].url)
                  setIsImageUploaded(true)
                }
              }}
              onUploadError={(error: Error) => {
                setIsImageUploaded(false)
                alert(`ERROR! ${error.message}`)
              }}
            />
          )}
        </div>

        <Button type="submit" disabled={!imageUrl}>
          Update Car
        </Button>
      </form>
    </Form>
  )
}

