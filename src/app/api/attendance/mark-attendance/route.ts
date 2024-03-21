
import connectDB from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Attendance from "@/models/attendance.model";

export async function POST(req: NextRequest, res: NextResponse) {
    try {

        await connectDB()
        const requestBody = await req.json();
        const { userId, status } = requestBody;
        if (!userId || !status) {
            return NextResponse.json(
                { message: "User ID and status are required", success: false },
                { status: 400 }
            );
        }
        // Create attendance record
        const attendance = new Attendance({ userId, status });
        await attendance.save();
        return NextResponse.json(
            { attendance, message: "Attendance marked ", success: true },
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



