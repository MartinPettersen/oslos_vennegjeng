import { NextResponse } from "next/server";
import Report from '@/app/(models)/Report';

export async function POST(req: any) {
    try {
        const body = await req.json()
        const reportData = body.report

        if (!reportData.label) {
            return NextResponse.json({ message: "Mangler Data" }, { status: 400 })
        }

        await Report.create(reportData)
        return NextResponse.json({ message: "Rapport opprettet" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}