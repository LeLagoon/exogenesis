import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import School from "@/models/schoolSchema";
import User from "@/models/userSchema";

export async function POST(request: NextRequest) {
    try {
        await connectDb();

        const { email } = await request.json();
        const existingUser = await User.findOne({ email : email });
        
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, {status: 400});
        }
        if(existingUser.schoolId === "null"){
            return NextResponse.json({ message: "School not found" }, {status: 400});
        }
        else{
            const existingSchool = await School.findOne({ _id : existingUser.schoolId });

            const users = []

            for (let i = 0; i < existingSchool.team.length; i++) {
                const user = await User.findOne({ email : existingSchool.team[i] });
                if (user === existingUser) {
                    continue;
                }
                users.push(user.name)
            }
            console.log(users)
            return NextResponse.json({ message: "School found", school: existingSchool, users: users, user: existingUser }, {status: 200});
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "An error occured while fetching school." }, {status: 500});
    }
}