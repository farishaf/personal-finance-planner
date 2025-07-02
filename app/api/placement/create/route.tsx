import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyJwt } from '@/lib/jwt'; // Your JWT verification utility

export async function POST(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized Access' },
        { status: 401 }
      );
    }

    // Extract the token
    const token = authHeader.split(' ')[1];
    
    // Verify the token
    const decoded = verifyJwt(token);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized Access' },
        { status: 401 }
      );
    }
    const userId = decoded.id;

    // Parse the request body
    const { name, color, placementTag, isActive } = await request.json();

    // Validate required fields
    if (!name || !color || !placementTag) {
      return NextResponse.json(
        { error: 'Name, color, and placementTag are required' },
        { status: 400 }
      );
    }

    // Check if a placement with the same name already exists for this user
    const existingPlacement = await prisma.placement.findFirst({
      where: {
        name,
        userId
      }
    });

    if (existingPlacement) {
      return NextResponse.json(
        { error: 'A placement with this name already exists for your account' },
        { status: 409 }
      );
    }

    // Create the new placement
    const newPlacement = await prisma.placement.create({
      data: {
        name,
        color,
        placementTag,
        isActive: isActive !== undefined ? isActive : true,
        userId,
        amount: 0 // initial value of 0
      }
    });

    return NextResponse.json(newPlacement, { status: 200 });

  } catch (error) {
    console.error('Error creating placement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}