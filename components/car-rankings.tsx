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
    image: "https://www.porsche.dk/globalassets/modeller/911/911-gt3-modeller/911-gt3-rs/slider_911gt3rs_640x720px_1.jpg",
  },
  {
    id: 2,
    rank: 2,
    points: 88,
    manufacturer: "BMW",
    model: "M3 Competition",
    image: "https://hips.hearstapps.com/hmg-prod/images/2025-bmw-m3-110-66562ddceaf59.jpg?crop=0.824xw:0.618xh;0.0737xw,0.274xh&resize=2048:*",
  },
  {
    id: 3,
    rank: 3,
    points: 85,
    manufacturer: "Audi",
    model: "RS6 Avant",
    image: "https://media.audi.com/is/image/audi/nemo/models/a6/rs-6-avant-performance/my-2023/parallax-teaser/RS_6_2022_4355-XL.jpg?auto=webp&width=1920",
  },
]

export function CarRankings() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="max-[500px]:hidden">Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <>
                <TableRow key={`${car.id}-text`}>
                  <TableCell className="font-medium">{car.rank}</TableCell>
                  <TableCell>{car.points}/100</TableCell>
                  <TableCell>{car.manufacturer}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell className="min-[501px]:align-middle max-[500px]:hidden">
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
                <TableRow key={`${car.id}-image`} className="min-[501px]:hidden">
                  <TableCell colSpan={4} className="pt-2 pb-6 text-center">
                    <div className="flex justify-center">
                      <Image
                        src={car.image || "/placeholder.svg"}
                        alt={`${car.manufacturer} ${car.model}`}
                        width={150}
                        height={100}
                        className="rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedImage(car.image)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>

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
