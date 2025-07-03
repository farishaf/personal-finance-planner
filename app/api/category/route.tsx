import { headers } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    const { namesOnly } = await request.json();

    if (namesOnly) {
      // Return only category names
      const categories = await prisma.category.findMany({
        where: { userId },
        select: { name: true },
      });

      const names = categories.map((p) => p.name);
      return NextResponse.json({ names }, { status: 200 });
    } else {
      // Return all categories
      const categories = await prisma.category.findMany({
        where: { userId },
      });

      const formattedCategories = categories.map((category) => ({
        id: category.id,
        name: category.name,
        icon: category.icon,
      }));
      return NextResponse.json(
        {
          data: formattedCategories,
          total: formattedCategories.length,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
