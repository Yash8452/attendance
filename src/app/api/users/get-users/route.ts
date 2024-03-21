import connectDB from "@/dbConfig/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function GET(req: NextRequest, res: NextResponse) {

    try {
        await connectDB()


        // Assuming 'role' is a field in your User model
        const users = await User.find({ role: "USER" }); // Query users with role 'user'
        return NextResponse.json(
            { users, message: "Users fetched  successfully", success: true },
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
