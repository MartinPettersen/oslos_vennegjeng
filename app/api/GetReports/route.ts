import Report from "@/app/(models)/Report";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {

        const body = await req.json()
        const reportData = body

        const reports = await Report.find()
            .lean()
            .exec();

        return NextResponse.json({ data: reports }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}