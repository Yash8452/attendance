
import connectDB from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Attendance from "@/models/attendance.model";

export async function GET(req: NextRequest, res: NextResponse) {
    try {

        await connectDB()
        const attendances = await Attendance.find();
        return NextResponse.json(
            { attendances, message: "All attendance fetched ", success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
}



