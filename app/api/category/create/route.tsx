import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { verifyJwt } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    // Authentication
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Missing or invalid token" },
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

    // Parse request body
    const { name, icon } = await request.json();

    // Validate required fields (only name is required now)
    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Check for existing category
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: name.trim(),
        userId
      }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'You already have a category with this name' },
        { status: 409 }
      );
    }

    // Create the category
    const newCategory = await prisma.category.create({
      data: {
        name: name.trim(),
        icon: icon?.trim() || "", // Set to null if empty/undefined
        userId
      }
    });

    return NextResponse.json(newCategory, { status: 201 });

  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}