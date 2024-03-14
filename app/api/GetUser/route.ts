import { NextResponse } from "next/server";
import User from '@/app/(models)/User';

export async function POST(req: any) {
    try {
        const body = await req.json()
        const userName = body.userName

        if (!userName) {
            return NextResponse.json({ message: "Mangler Brukernavn" }, { status: 400 })
        }

        const existingThread = await User.findOne({ name: userName }).lean().exec();

        return NextResponse.json({ data: existingThread }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}