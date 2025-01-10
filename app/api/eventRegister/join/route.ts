import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import School from "@/models/schoolSchema";
import User from "@/models/userSchema";

export async function POST(request: NextRequest) {
    try {
        await connectDb();

        const { email, teamCode } = await request.json();
        const existingUser = await User.findOne({ email : email });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, {status: 400});
        }
        const existingSchool = await School.findOne({ code: existingUser.teamCode });

        if (!existingSchool) {
            return NextResponse.json({ message: "No team found with this code." }, {status: 400});
        }

        if (existingSchool.teamCode === teamCode) {
            await School.updateOne({ code: existingUser.teamCode }, { $push: { team: email } });
            await User.updateOne({ email: email }, { schoolId: existingSchool._id });
    
            return NextResponse.json({ message: "User added successfully to the team.", school: existingSchool }, {status: 200});
        } else {
            return NextResponse.json({ message: "Invalid team code." }, {status: 400});
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "An error occured while fetching user." }, {status: 500});
    }
}