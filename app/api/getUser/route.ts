import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";

export async function POST(request: NextRequest) {
    try {
        await connectDb();

        const { email } = await request.json();

        const existingUser = await User.findOne({ email : email });
        if (existingUser) {
            return NextResponse.json({ message: "User found", mongoUser: existingUser }, {status: 200});
        }
        
        return NextResponse.json({ message: "User not found" }, {status: 400});
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "An error occured while fetching user." }, {status: 500});
    }
}