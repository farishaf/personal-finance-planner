import { headers } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface TransactionRequestBody {
  type?: "income" | "outcome";
  startDate?: string;
  endDate?: string;
  filterBy?: "category" | "placement";
  page?: number;
  limit?: number;
  filterValue?: string; // Additional field for category/placement value
  sort?: "asc" | "desc";
}

export async function POST(request: Request) {
  try {
    // Authentication
    const authHeader = (await headers()).get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyJwt(token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const userId = decoded.id;
    const body: TransactionRequestBody = await request.json();

    // Validate and set default values for pagination
    const page = Number(body.page) || 1;
    const limit = Number(body.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = body.sort || "desc";

    // Build the where clause for filtering
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { userId };

    if (body.type) {
      where.type = body.type;
    }

    if (body.startDate || body.endDate) {
      where.date = {};
      if (body.startDate) {
        where.date.gte = new Date(body.startDate);
      }
      if (body.endDate) {
        where.date.lte = new Date(body.endDate);
      }
    }

    if (body.filterBy && body.filterValue) {
      if (body.filterBy === "category") {
        where.categoryName = body.filterValue;
      } else if (body.filterBy === "placement") {
        where.placementName = body.filterValue;
      }
    }

    // Get transactions with pagination
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          date: sort, // Default sorting by latest
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          placement: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.transaction.count({ where }),
    ]);

    const formattedTransactions = transactions.map((tx) => ({
      id: tx.id,
      date: tx.date.toISOString(),
      name: tx.name,
      type: tx.type,
      amount: tx.amount,
      placement: tx.placement.name || null,
      category: tx.category?.name || null,
      notes: tx.notes,
    }));

    return NextResponse.json(
      {
        data: formattedTransactions,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
