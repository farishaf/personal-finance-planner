import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyJwt } from '@/lib/jwt' // Assuming you have a JWT utility

export async function GET(request: Request) {
  try {
    // Authentication
    const authHeader = request.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Missing or invalid token" },
        { status: 401 }
      )
    }

    const token = authHeader.split(" ")[1]
    const decoded = verifyJwt(token)
    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      )
    }

    const userId = decoded.id

    // Get all placements with their transactions
    const placements = await prisma.placement.findMany({
      where: {
        userId: userId,
        isActive: true
      },
      include: {
        transactions: {
          orderBy: {
            date: 'desc'
          }
        }
      },
      orderBy: {
        updateAt: 'desc'
      }
    })

    // Calculate summary for each placement
    const summary = placements.map(placement => {
      const income = placement.transactions
        .filter(t => t.type === 'INCOME')
        .reduce((sum, t) => sum + t.amount.toNumber(), 0)

      const outcome = placement.transactions
        .filter(t => t.type === 'OUTCOME')
        .reduce((sum, t) => sum + t.amount.toNumber(), 0)

      const totalAmount = income - outcome
      const lastTransaction = placement.transactions[0]

      return {
        placementId: placement.id,
        placementName: placement.name,
        placementTag: placement.placementTag,
        color: placement.color,
        totalAmount,
        lastUpdated: lastTransaction?.updatedAt || placement.updateAt
      }
    })

    return NextResponse.json(summary)
  } catch (error) {
    console.error('[TRANSACTION_SUMMARY_GET]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}