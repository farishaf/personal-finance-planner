import { NextResponse } from "next/server";
import { serialize } from "cookie";
import axios from "axios";
import ApiConfig from "@/config/api";

interface LoginRequest {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    const { BACKEND_URL_CRM } = ApiConfig();
    console.log("BACKEND_URL_CRM:", BACKEND_URL_CRM); // Debugging line

    const body: LoginRequest = await request.json();
    const { username, password } = body;

    try {
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        };

        const url = `${BACKEND_URL_CRM}/auth/login`;
        console.log("Request URL:", url); // Debugging line

        const data = { username, password };
        const res = await axios.post(url, data, config);
        const token = res.data.data.access_token;
        const MAX_AGE = (60 * 60) - 5;

        const serialized = serialize("accessToken", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: MAX_AGE,
            path: "/"
        });

        const response = { message: "Authorized" };

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Set-Cookie": serialized }
        });

    } catch (e: unknown) {
        console.error("Error occurred:", e);
        return NextResponse.json(
            { message: "Authentication failed", error: e },
            { status: 401 }
        );
    }
}