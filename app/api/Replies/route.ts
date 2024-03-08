import { NextResponse } from "next/server";
import Forum from '@/app/(models)/Forum';
import Thread from '@/app/(models)/Thread';
import Reply from "@/app/(models)/Reply";
import Post from "@/app/(models)/Post";
import { ThreadT } from "@/types/Thread";


export async function POST(req: any) {
    try {
        const body = await req.json()
        const formData = body.form

        if (!formData) {
            return NextResponse.json({ message: "Mangler informasjon" }, { status: 400 })
        }

        const existingThread = await Thread.findOne({ id: formData.threadId }).lean().exec() as any as ThreadT;

        await Post.create(formData)
        await Thread.findOneAndUpdate({ id: formData.threadId }, { replies: [formData.postId, ...existingThread!.replies] })
        return NextResponse.json({ message: "Innlegg opprettet" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}