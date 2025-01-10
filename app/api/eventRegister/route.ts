import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import School from "@/models/schoolSchema";
import User from "@/models/userSchema";

export async function POST(request: NextRequest) {
    try {
        console.log('1111')
        await connectDb();
        const {
            schoolName,
            address,
            teamName,
            StudentInchargeName,
            TeacherInchargeName,
            TeacherInchargeEmail,
            teamCode,
            email
        } = await request.json();
        console.log(teamCode)
        console.log('aaaaaaaaaaaaaaaaaaaa'+email)
        const existingUser = await User.findOne({ email : email });
        if (existingUser.schoolId != "null") {
            return NextResponse.json({ message: "User already registered for school" }, {status: 400});
        }
        const existingSchool = await School.findOne({ schoolName : schoolName });
        if (existingSchool) {
            return NextResponse.json({ message: "School already exists" }, {status: 400});
        }

        const newSchool = new School({
            schoolName,
            address,
            teamName,
            StudentInchargeName,
            TeacherInchargeName,
            TeacherInchargeEmail,
            teamCode: teamCode,
            team: [email],
        });

        console.log(newSchool);
        await newSchool.save();

        await User.updateOne({ email: email }, { 
            $set:{
                schoolId: newSchool._id
            }
         });

        return NextResponse.json({ message: "School created", user: newSchool }, {status: 201});

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occured while saving school." }, {status: 500});        
    }
}