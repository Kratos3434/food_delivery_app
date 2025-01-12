import { NextResponse } from "next/server";

export async function DELETE() {
    const res = NextResponse.json({message: "Cookie delete"});

    res.cookies.set('token', '', {expires: new Date(0)});

    return res;
}