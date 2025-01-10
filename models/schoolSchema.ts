import mongoose, { Schema } from "mongoose";

const reqString = { type: String, required: true, default: "" };

const schoolSchema: Schema = new Schema(
    {
        schoolName: reqString,
        address: reqString,
        teamName: reqString,
        StudentInchargeName: reqString,
        TeacherInchargeEmail: reqString,
        TeacherInchargeName: reqString,
        teamCode: reqString,
        team: {
            type: Array,
            required: true,
            default: []
        },
    },
    { timestamps: true }
);

const School = mongoose.models.Schools || mongoose.model("Schools", schoolSchema);

export default School;