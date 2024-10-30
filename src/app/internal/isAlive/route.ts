import {NextResponse} from "next/server";

export async function GET() {
    return NextResponse.json({message: "It's all good in the hood"});
}
