import { QUERIES } from "@/app/server/db/queries"

export function GetCars() {
    const cars = QUERIES.getCars()

    console.log(cars)
}