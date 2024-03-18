import { NextResponse } from "next/server";
import Report from "@/app/(models)/Report";


export async function POST(req: any) {
    try {
        const body = await req.json()
        const reportId = body.reportId


        if (!reportId) {
            return NextResponse.json({ message: "Mangler Raport informasjon" }, { status: 400 })
        }

        const existingReport = await Report.findOneAndDelete({ reportId: reportId }).lean().exec();

        return NextResponse.json({ data: existingReport }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}