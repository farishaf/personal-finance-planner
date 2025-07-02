import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";

interface TransactionData {
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
    // Authentication
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Token missing or invalid format" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyJwt(token);

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    const userId = decoded.id;

    // Parse and validate request body
    const body: TransactionData = await request.json();
    const { name, date, type, amount, placement, category, notes } = body;

    // Validate required fields
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!date) missingFields.push("date");
    if (!type) missingFields.push("type");
    if (amount === undefined || amount === null) missingFields.push("amount");
    if (!placement) missingFields.push("placement");
    if (!category) missingFields.push("category");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          missingFields,
        },
        { status: 400 }
      );
    }

    // Validate amount is a positive number
    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    // Validate date format (basic check)
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

    // Create transaction
    const newTransaction = await prisma.transaction.create({
      data: {
        name,
        date: new Date(date),
        type,
        amount,
        placement: { connect: { id: selectedPlacement.id } },
        category: { connect: { id: selectedCategory.id } },
        notes: notes || "",
        user: { connect: { id: userId } },
      },
      include: {
        placement: { select: { name: true } },
        category: { select: { name: true } },
      },
    });

    return NextResponse.json(
      {
        message: "Transaction created successfully",
        data: {
          ...newTransaction,
          amount: Number(newTransaction.amount), // Ensure proper number serialization
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Internal server error - Please try again later" },
      { status: 500 }
    );
  }
}
