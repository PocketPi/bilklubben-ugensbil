"use client"

import Image from "next/image"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import React from "react"

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

const placeholderImage = "/placeholder.svg"

export function CarRankings() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead className="w-[80px]">Points</TableHead>
              <TableHead className="w-[120px]">Manufacturer</TableHead>
              <TableHead className="w-[120px]">Model</TableHead>
              <TableHead className="max-[500px]:hidden w-[200px]">Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car, index) => (
              <React.Fragment key={car.id}>
                <TableRow>
                  <TableCell className="font-medium">{car.rank}</TableCell>
                  <TableCell>{car.points}/100</TableCell>
                  <TableCell>{car.manufacturer}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell className="min-[501px]:align-middle max-[500px]:hidden p-2">
                    <div className="relative aspect-[3/2] w-full">
                      <Image
                        src={car.image || placeholderImage}
                        alt={`${car.manufacturer} ${car.model}`}
                        fill
                        sizes="(min-width: 501px) 200px, 100vw"
                        priority={index === 0}
                        className="rounded-md cursor-pointer hover:opacity-80 transition-opacity object-cover"
                        onClick={() => car.image && setSelectedImage(car.image)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="min-[501px]:hidden">
                  <TableCell colSpan={4} className="pt-2 pb-6 text-center">
                    <div className="relative aspect-[3/2] w-[200px] mx-auto">
                      <Image
                        src={car.image || placeholderImage}
                        alt={`${car.manufacturer} ${car.model}`}
                        fill
                        sizes="200px"
                        priority={index === 0}
                        className="rounded-md cursor-pointer hover:opacity-80 transition-opacity object-cover"
                        onClick={() => car.image && setSelectedImage(car.image)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected car"
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, 800px"
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
