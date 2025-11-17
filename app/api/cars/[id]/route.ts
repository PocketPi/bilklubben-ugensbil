import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { MUTATIONS } from "@/app/server/db/queries"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid car ID' },
        { status: 400 }
      )
    }

    const body = await req.json()
    const result = await MUTATIONS.updateCar(id, body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in PATCH /api/cars/[id]:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

