import connectDB from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Attendance from "@/models/attendance.model";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const requestBody = await req.json();
    const { userId, status } = requestBody;
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in "YYYY-MM-DD" format

    if (!userId || !status) {
      return NextResponse.json(
        { message: "User ID and status are required", success: false },
        { status: 400 }
      );
    }

    // Check if attendance record for the same user and date already exists
    const existingAttendance = await Attendance.findOne({
      userId,
      date: currentDate,
    });

    if (existingAttendance) {
      return NextResponse.json(
        {
          message: "Attendance for the same date already exists",
          success: false,
        },
        { status: 400 }
      );
    }

    // Create attendance record
    const attendance = new Attendance({ userId, status, date: currentDate });
    await attendance.save();

    return NextResponse.json(
      { attendance, message: "Attendance marked", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
