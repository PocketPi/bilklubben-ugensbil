import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from "react"
import { QUERIES } from "@/app/server/db/queries"
import { ImageLightbox } from "./image-lightbox"
import { auth } from "@clerk/nextjs/server"
import { EditCarButton } from "./edit-car-button"

const placeholderImage = "/car-placeholder.jpg"

export async function CarRankings() {
  const cars = await QUERIES.getCars()
  const session = await auth()
  const isLoggedIn = !!session?.userId

  return (
    <>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead className="w-[80px]">Point</TableHead>
              <TableHead>Producent</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="w-[80px]">Episode</TableHead>
              <TableHead className="max-[500px]:hidden w-[200px]">Billede</TableHead>
              {isLoggedIn && <TableHead className="w-[60px]">Actions</TableHead>}
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
                  <TableCell>{car.episode}</TableCell>
                  <TableCell className="min-[501px]:align-middle max-[500px]:hidden p-2">
                    <ImageLightbox imageUrl={car.imageUrl || placeholderImage} alt={`${car.manufacturer} ${car.model}`}>
                      <div className="relative aspect-[3/2] w-full">
                        <Image
                          src={car.imageUrl || placeholderImage}
                          alt={`${car.manufacturer} ${car.model}`}
                          fill
                          sizes="(min-width: 501px) 200px, 100vw"
                          priority={index < 3}
                          className="rounded-md cursor-pointer hover:opacity-80 transition-opacity object-contain"
                        />
                      </div>
                    </ImageLightbox>
                  </TableCell>
                  {isLoggedIn && (
                    <TableCell>
                      <EditCarButton car={car} />
                    </TableCell>
                  )}
                </TableRow>
                <TableRow className="min-[501px]:hidden">
                  <TableCell colSpan={isLoggedIn ? 6 : 5} className="pt-2 pb-6 text-center">
                    <ImageLightbox imageUrl={car.imageUrl || placeholderImage} alt={`${car.manufacturer} ${car.model}`}>
                      <div className="relative aspect-[3/2] w-[200px] mx-auto">
                        <Image
                          src={car.imageUrl || placeholderImage}
                          alt={`${car.manufacturer} ${car.model}`}
                          fill
                          sizes="200px"
                          priority={index < 3}
                          className="rounded-md cursor-pointer hover:opacity-80 transition-opacity object-contain"
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
