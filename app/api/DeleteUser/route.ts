import { NextResponse } from "next/server";
import User from '@/app/(models)/User';


export async function POST(req: any) {
    try {
        const body = await req.json()
        const userName = body.userName

        console.log(userName)

        if (!userName) {
            return NextResponse.json({ message: "Mangler Bruker informasjon" }, { status: 400 })
        }

        await User.findOneAndDelete({ name: userName }).lean().exec();

        console.log('kom hit')
        return NextResponse.json({ data: "Slettet" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}