import { NextResponse } from "next/server";
import Post from '@/app/(models)/Post';

export async function POST(req: any) {
    try {
        const body = await req.json()
        const userName = body.userName


        if (!userName) {
            return NextResponse.json({ message: "Mangler Brukernavn" }, { status: 400 })
        }

        const existingPost = await Post.find({ userName: userName }).sort({ 'createdAt': -1 }).lean().exec();

        return NextResponse.json({ data: existingPost }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}