import { NextResponse } from "next/server";
import Forum from '@/app/(models)/Forum';

export async function POST(req: any) {
    try {
        const body = await req.json()
        const forumData = body.forum

        if (!forumData.label) {
            return NextResponse.json({ message: "Mangler forum navn" }, { status: 400 })
        }

        const existingForum = await Forum.findOne({ label: forumData.label }).lean().exec();

        if (existingForum) {
            return NextResponse.json({ message: "Forum finnes allerede" }, { status: 409 })
        }

        await Forum.create(forumData)
        return NextResponse.json({ message: "Forum opprettet" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}