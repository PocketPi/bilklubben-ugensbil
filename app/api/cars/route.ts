import { NextResponse } from "next/server"
import { MUTATIONS } from "@/app/server/db/queries"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const result = await MUTATIONS.createCar(body)
        return NextResponse.json(result)
    } catch (error) {
        console.error('Error in POST /api/cars:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}