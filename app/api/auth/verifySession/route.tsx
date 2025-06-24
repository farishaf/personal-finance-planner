import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import BACKEND_URL_CRM from "@/config/api";
import { serialize } from "cookie";

export async function GET() {

    const cookieStore = cookies()
    const token =  (await cookieStore).get('accessToken')

    if(!token){
        return NextResponse.json(
            { message: 'UNAUTHORIZED'},
            { status: 401 }
        )
    }else{

        try {
            const config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Authorization': 'Bearer ' + token.value
                }
            };
    
            const url = `${BACKEND_URL_CRM}/auth/validate`;

            const data = {
                allow_all_roles: true,
                allowed_roles: [],
            }
    
            const res = await axios.post(url, data, config);
            
            if(res.data.isError) {
                const serialized = serialize("accessToken", "token", {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 0,
                    path: "/"
                })

                const response = { message: "UNAUTHORIZED" }
                return new Response(JSON.stringify(response), {
                    status: 401,
                    headers: { "Set-Cookie": serialized }
                })

            }

            return NextResponse.json(
                { message: 'success', accessToken:token.value, role: res.data.data.role,
                username: res.data.data.username },
                { status: 200 }
            )
    
        } catch (e) {
            console.log("error occured", e);
            return NextResponse.json(
                { message: "failed" },
                { status: 401 }
            )
        }

    }


}