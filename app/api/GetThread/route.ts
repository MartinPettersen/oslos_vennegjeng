import { NextResponse } from "next/server";
import Thread from '@/app/(models)/Thread';

export async function POST(req: any) {
    try {
        const body = await req.json()
        const parentId = body.parentId

        if (!parentId) {
            return NextResponse.json({ message: "Mangler Tråd" }, { status: 400 })
        }

        const existingThread = await Thread.findOne({ id: parentId }).lean().exec();

        return NextResponse.json({ data: existingThread }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}