import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt"; // Your JWT verification utility

interface UpdateTransactionData {
  id: number;
  name: string;
  date: string;
  type: "INCOME" | "OUTCOME";
  amount: number;
  placement: string;
  category: string;
  notes: string;
}

export async function POST(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = verifyJwt(token);

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const userId = decoded.id;

    // Parse the request body
    const body: UpdateTransactionData = await request.json();

    const { id, name, date, type, amount, placement, category, notes } = body;

    // Validate required fields
    const missingFields = [];
    if (!id) missingFields.push("id");
    if (!name?.trim()) missingFields.push("name");
    if (!date) missingFields.push("date");
    if (!type) missingFields.push("type");
    if (amount === undefined || isNaN(amount) || amount === null)
      missingFields.push("amount");
    if (!placement?.trim()) missingFields.push("placement");
    if (!category?.trim()) missingFields.push("category");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          missingFields,
        },
        { status: 400 }
      );
    }

    // Check if transaction exists
    const transactionRecord = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    // Validate amount
    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    // Validate date
    if (isNaN(Date.parse(date))) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    // Validate transaction type
    if (!["INCOME", "OUTCOME"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid transaction type" },
        { status: 400 }
      );
    }

    // Find placement and category (case-insensitive search)
    const [selectedPlacement, selectedCategory] = await Promise.all([
      prisma.placement.findFirst({
        where: {
          userId,
          name: { equals: placement.trim(), mode: "insensitive" },
        },
      }),
      prisma.category.findFirst({
        where: {
          userId,
          name: { equals: category.trim(), mode: "insensitive" },
        },
      }),
    ]);

    if (!selectedPlacement) {
      return NextResponse.json(
        { error: `Placement '${placement}' not found` },
        { status: 404 }
      );
    }

    if (!selectedCategory) {
      return NextResponse.json(
        { error: `Category '${category}' not found` },
        { status: 404 }
      );
    }

    if (!transactionRecord) {
      return NextResponse.json(
        { error: "Transaction record not found or access denied" },
        { status: 404 }
      );
    }

    const updatedTransactionRecord = await prisma.transaction.update({
      where: { id, userId },
      data: {
        name: name.trim(),
        date: new Date(date),
        type,
        amount,
        placement: { connect: { id: selectedPlacement.id } },
        category: { connect: { id: selectedCategory.id } },
        notes: notes?.trim(),
      },
      include: {
        placement: { select: { name: true } },
        category: { select: { name: true } }
      }
    });

    const formattedUpdatedTransactionRecord = {
      ...updatedTransactionRecord,
      placement: updatedTransactionRecord.placement.name,
      category: updatedTransactionRecord.category?.name
    }

    return NextResponse.json(formattedUpdatedTransactionRecord, { status: 200 });

  } catch (error) {
    console.error("Error creating placement:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
