import { serialize } from "cookie";

export async function GET() {
    try{

    const serialized = serialize("accessToken", "token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 0,
        path: "/"
    })
    const response = { message: "Logout success" }

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Set-Cookie": serialized }
    })
    }
    catch(e){
        if (e instanceof Error) {
            return new Response(JSON.stringify({ error: e.message }), {
                status: 500
            });
        }

        return new Response(JSON.stringify({ error: "Unknown error occurred" }), {
            status: 500
        })
    }

}