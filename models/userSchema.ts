import mongoose, { Schema } from "mongoose";

const reqString = { type: String, required: true, default: "" };

const userSchema: Schema = new Schema(
    {
        name: reqString,
        email: reqString,
        clerkId: reqString,
        schoolId: reqString,
        money: {
            type: Number,
            default: 0,
            required: true
        }
    },
    { timestamps: true }
);

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;