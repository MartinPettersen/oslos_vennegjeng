import { NextResponse } from "next/server";
import Thread from '@/app/(models)/Thread';

export async function POST(req: any) {
    try {
        const body = await req.json()
        const userName = body.userName


        if (!userName) {
            return NextResponse.json({ message: "Mangler Brukernavn" }, { status: 400 })
        }

        const existingThread = await Thread.find({ userName: userName }).sort({ 'createdAt': -1 }).lean().exec();

        return NextResponse.json({ data: existingThread }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}