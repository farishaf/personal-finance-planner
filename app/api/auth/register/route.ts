import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { RegisterInput } from "@/types/auth";

const prisma = new PrismaClient();

// Input Validation Schema
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().max(50),
});

// Register Version 1.0
export async function POST(request: Request) {
    try {
        const body: RegisterInput = await request.json();
        const validation = registerSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.flatten() },
                { status: 400 }
            );
        }

        const { email, password, name } = validation.data;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email is already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hasedPassword = await bcrypt.hash(password, 10);

        // Create user with default categories
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hasedPassword,
                categories: {
                    createMany: {
                        data: [
                            { name: 'Food', icon: 'utensils' },
                            { name: 'Transport', icon: 'car' },
                            { name: 'Shopping', icon: 'shopping-bag' },
                            { name: 'Bills', icon: 'file-invoice' },
                            { name: 'Entertainment', icon: 'film' },
                        ],
                    },
                },
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            }
        });

        return NextResponse.json({ user: newUser, message: "Registration successful" }, { status: 200 });

    } catch (error: unknown) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}