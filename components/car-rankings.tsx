"use client"

import Image from "next/image"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// This would typically come from an API or database
const cars = [
  {
    id: 1,
    rank: 1,
    points: 95,
    manufacturer: "Porsche",
    model: "911 GT3",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    rank: 2,
    points: 88,
    manufacturer: "BMW",
    model: "M3 Competition",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    rank: 3,
    points: 85,
    manufacturer: "Audi",
    model: "RS6 Avant",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function CarRankings() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell className="font-medium">{car.rank}</TableCell>
              <TableCell>{car.points}/100</TableCell>
              <TableCell>{car.manufacturer}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={`${car.manufacturer} ${car.model}`}
                  width={150}
                  height={100}
                  className="rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedImage(car.image)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          {selectedImage && (
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Selected car"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

