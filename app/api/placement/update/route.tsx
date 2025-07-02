import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt"; // Your JWT verification utility

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
    const { name, color, placementTag, isActive } = await request.json();

    // check if placement exists
    const existingPlacement = await prisma.placement.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (!existingPlacement) {
      return NextResponse.json(
        { error: "Placement did not exist" },
        { status: 409 }
      );
    }

    const updatedPlacement = await prisma.placement.update({
      where: {
        id: existingPlacement.id,
      },
      data: {
        name,
        color,
        placementTag,
        isActive,
      },
    });

    return NextResponse.json(updatedPlacement, { status: 200 });
  } catch (error) {
    console.error("Error creating placement:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
