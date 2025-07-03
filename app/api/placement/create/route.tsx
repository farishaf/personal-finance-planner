// app/api/placement/create/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyJwt } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    // Authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized - Missing or invalid token' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyJwt(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    const userId = decoded.id;
    const { name, color, placementTag, isActive } = await request.json();

    // Validation
    const missingFields = [];
    if (!name?.trim()) missingFields.push('name');
    if (!color?.trim()) missingFields.push('color');
    if (!placementTag?.trim()) missingFields.push('placementTag');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          missingFields 
        },
        { status: 400 }
      );
    }

    // Check for existing placement
    const existingPlacement = await prisma.placement.findFirst({
      where: {
        name: name.trim(),
        userId
      }
    });

    if (existingPlacement) {
      return NextResponse.json(
        { error: 'You already have a placement with this name' },
        { status: 409 }
      );
    }

    // Create placement
    const newPlacement = await prisma.placement.create({
      data: {
        name: name.trim(),
        color: color.trim(),
        placementTag: placementTag.trim(),
        isActive: isActive ?? true,
        userId,
        amount: 0
      },
      select: {
        id: true,
        name: true,
        color: true,
        placementTag: true,
        isActive: true,
        createdAt: true
      }
    });

    return NextResponse.json(newPlacement, { status: 201 });

  } catch (error) {
    console.error('Error creating placement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}