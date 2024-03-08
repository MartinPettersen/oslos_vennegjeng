import { NextResponse } from "next/server";
import Thread from '@/app/(models)/Thread';
import Post from "@/app/(models)/Post";

type ThreadT = {
    headline: String;
    userName: String;
    content: String;
    replies: Post[];
}

export async function POST(req: any) {
    try {
        const body = await req.json()
        const postId = body.postId
        const threadId = body.threadId

        if (!postId || !threadId) {
            return NextResponse.json({ message: "Mangler Post informasjon" }, { status: 400 })
        }

        const existingPost = await Post.findOneAndDelete({ postId: postId }).lean().exec();

        let existingThread = await Thread.findOne({ id: threadId }).lean().exec() as any as ThreadT;

        const index = existingThread!.replies.indexOf(postId);
        if (index > -1) {
            existingThread!.replies.splice(index, 1);
        }

        await Thread.findOneAndUpdate({ id: threadId }, { replies: existingThread!.replies })

        return NextResponse.json({ data: existingPost }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}