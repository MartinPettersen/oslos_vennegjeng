import { NextResponse } from "next/server";
import Forum from '@/app/(models)/Forum';

export async function POST(req: any) {
    try {
        const body = await req.json()
        const forumLabel = body.forumLabel

        if (!forumLabel) {
            return NextResponse.json({ message: "Mangler forum navn" }, { status: 400 })
        }

        const existingForum = await Forum.findOne({ label: forumLabel }).lean().exec();

        return NextResponse.json({ data: existingForum }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}