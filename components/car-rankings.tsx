import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from "react"
import { QUERIES } from "@/app/server/db/queries"
import { ImageLightbox } from "./image-lightbox"

const placeholderImage = "/car-placeholder.jpg"

export async function CarRankings() {
  const cars = await QUERIES.getCars()

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
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{car.points}/100</TableCell>
                  <TableCell>{car.manufacturer}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell className="min-[501px]:align-middle max-[500px]:hidden p-2">
                    <ImageLightbox>
                      <div className="relative aspect-[3/2] w-full">
                        <Image
                          src={car.imageUrl || placeholderImage}
                          alt={`${car.manufacturer} ${car.model}`}
                          fill
                          sizes="(min-width: 501px) 200px, 100vw"
                          priority={index === 0}
                          className="rounded-md cursor-pointer hover:opacity-80 transition-opacity object-cover"
                        />
                      </div>
                    </ImageLightbox>
                  </TableCell>
                </TableRow>
                <TableRow className="min-[501px]:hidden">
                  <TableCell colSpan={4} className="pt-2 pb-6 text-center">
                    <ImageLightbox>
                      <div className="relative aspect-[3/2] w-[200px] mx-auto">
                        <Image
                          src={car.imageUrl || placeholderImage}
                          alt={`${car.manufacturer} ${car.model}`}
                          fill
                          sizes="200px"
                          priority={index === 0}
                          className="rounded-md cursor-pointer hover:opacity-80 transition-opacity object-cover"
                        />
                      </div>
                    </ImageLightbox>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
