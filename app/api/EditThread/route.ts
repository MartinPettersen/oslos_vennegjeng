import { NextResponse } from "next/server";
import Thread from '@/app/(models)/Thread';



export async function POST(req: any) {
    try {
        const body = await req.json()
        const formData = body.form

        if (!formData) {
            return NextResponse.json({ message: "Mangler informasjon" }, { status: 400 })
        }

        await Thread.findOneAndUpdate({ id: formData.id }, { headline: formData.headline, content: formData.content })

        return NextResponse.json({ message: "Tråd opdatert" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}