import connectDB from "@/dbConfig/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest, res: NextResponse) {
    try {

        await connectDB()
        const requestBody = await req.json();
        const { email, password } = requestBody;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required", success: false },
                { status: 400 }
            );
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {

            return NextResponse.json(
                { message: "User not found check your credentials", success: false },
                { status: 404 }
            );
        }
        // Validate password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { message: "User not found check your credentials", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { user, message: "Login Successfull", success: true },
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

