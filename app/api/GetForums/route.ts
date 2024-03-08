import Forum from "@/app/(models)/Forum";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {

        const body = await req.json()
        const forumData = body

        const clearForums = await Forum.find({ status: forumData.status })
            .lean()
            .exec();

        return NextResponse.json({ data: clearForums }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}