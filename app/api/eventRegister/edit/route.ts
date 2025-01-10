import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import School from "@/models/schoolSchema";
import User from "@/models/userSchema";

export async function POST(request: NextRequest) {
    try {
        await connectDb();

        const {
            schoolName,
            address,
            teamName,
            StudentInchargeName,
            TeacherInchargeName,
            TeacherInchargeEmail,
            email
        } = await request.json();

        const existingUser = await User.findOne({ email : email });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, {status: 400});
        }
        
        await School.updateOne({ schoolName : schoolName }, {
            schoolName,
            address,
            teamName,
            StudentInchargeName,
            TeacherInchargeName,
            TeacherInchargeEmail,
        }, { upsert: true });

        return NextResponse.json({ message: "Successfully updated details." }, {status: 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "An error occured while fetching user." }, {status: 500});
    }
}