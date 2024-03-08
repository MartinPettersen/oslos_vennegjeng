import { NextResponse } from "next/server";
import Post from '@/app/(models)/Post';

export async function POST(req: any) {
    try {
        const body = await req.json()
        const postData = body.form

        if (!postData) {
            return NextResponse.json({ message: "Mangler informasjon" }, { status: 400 })
        }

        await Post.findOneAndUpdate({ postId: postData.postId }, { reply: postData.reply })

        return NextResponse.json({ message: "Kommentar opdatert" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}