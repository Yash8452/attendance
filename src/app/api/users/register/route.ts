import connectDB from "@/dbConfig/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectDB()
        const requestBody = await req.json();
        const { name, email, password } = requestBody;
        if(!name || !email || !password){
            return NextResponse.json(
                { message: "All fields are required", success: false },
                { status: 400 }
            );
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // res.status(201).json(movie);
        return NextResponse.json(
            { user, message: "User registered successfully", success: true },
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
