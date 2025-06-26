import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { LoginInput, SafeUser } from "@/types/auth";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_undefined";

// Input Validation Schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Login Version 1.0
export async function POST(request: Request) {
  try {
    const body: LoginInput = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Find user without password first
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid Credentials" }, // Generic message for security
        { status: 401 }
      );
    }

    // Compare hashed password
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      );
    }

    // Create token payload (without sensitive data)
    const tokenPayload: SafeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    // Generate JWT token
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });

    // Create response without password
    const responseUser: SafeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      {
        user: responseUser,
        message: "Login successful",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict${
            process.env.NODE_ENV === "production" ? "; Secure" : ""
          }`,
        },
      }
    );
  } catch (error: unknown) {
    console.error("Login Failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
