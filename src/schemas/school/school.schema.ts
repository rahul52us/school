import mongoose, { Schema, Document } from "mongoose";

// 🏫 Define an interface for School Document
export interface ISchool extends Document {
    name: string;
    address: string;
    principal: {
        name: string;
        contact: string;
    };
    academicYears: {
        year: number;
        status: "Active" | "Closed";
    }[];
    createdAt: Date;
}

// 🏫 Define School Schema
const SchoolSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        principal: {
            name: { type: String, required: true },
            contact: { type: String, required: true },
        },
        academicYears: [
            {
                year: { type: Number, required: true },
                status: { type: String, enum: ["Active", "Closed"], default: "Active" },
            },
        ],
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// 📌 Export the School model
export default mongoose.model<ISchool>("School", SchoolSchema);
