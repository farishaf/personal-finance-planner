import { headers } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const authHeader = (await headers()).get("Authorization");

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
    const { namesOnly } = await request.json();

    if (namesOnly) {
      // Return only placement names
      const placements = await prisma.placement.findMany({
        where: { userId },
        select: { name: true }
      });
      
      const names = placements.map(p => p.name);
      return NextResponse.json({ names }, { status: 200 });
    } else {
      // Return all placements with total count
      const placements = await prisma.placement.findMany({
        where: { userId }
      });
      
      return NextResponse.json({ 
        data: placements,
        total: placements.length 
      }, { status: 200 });
    }

  } catch (error) {
    console.error('Error getting placements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const authHeader = (await headers()).get("Authorization");

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

    // GET request returns all placements with total count (default behavior)
    const placements = await prisma.placement.findMany({
      where: { userId }
    });
    
    return NextResponse.json({ 
      data: placements,
      total: placements.length 
    }, { status: 200 });

  } catch (error) {
    console.error('Error getting placements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}