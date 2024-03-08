import { NextResponse } from "next/server";
import User from '@/app/(models)/User';
import bcrypt from "bcrypt";

export async function POST(req: any) {
    try {
        const body = await req.json()
        const userData = body.form

        if (!userData.email || !userData.password) {
            return NextResponse.json({ message: "Mangler felt" }, { status: 400 })
        }

        const existingUser = await User.findOne({ email: userData.email }).lean().exec();

        if (existingUser) {
            return NextResponse.json({ message: "Bruker finnes allerede" }, { status: 409 })
        }

        const hashPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashPassword;

        await User.create(userData)
        return NextResponse.json({ message: "Bruker opprettet" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}