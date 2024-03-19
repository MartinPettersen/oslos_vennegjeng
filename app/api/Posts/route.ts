import { NextResponse } from "next/server";
import Forum from '@/app/(models)/Forum';
import Thread from '@/app/(models)/Thread';
import Post from '@/app/(models)/Post';
import { ThreadT } from "@/types/Thread";



export async function POST(req: any) {
    try {
        const body = await req.json()
        const postData = body.form
        const parentType = body.parentType


        if (!postData) {
            return NextResponse.json({ message: "Mangler informasjon" }, { status: 400 })
        }
        await Post.create(postData)

        if (parentType === 'thread') {
            const existingThread = await Thread.findOne({ id: postData.parentId }).lean().exec() as any as ThreadT;            
            await Thread.findOneAndUpdate({ id: postData.parentId }, { replies: [postData.postId, ...existingThread!.replies] })
        }
        if (parentType === 'post') {
            const existingPost = await Post.findOne({ postId: postData.parentId }).lean().exec() as any as Post;            
            await Post.findOneAndUpdate({ postId: postData.parentId }, { children: [postData.postId, ...existingPost!.children] })
        }

        return NextResponse.json({ message: "Kommentar opprettet" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}