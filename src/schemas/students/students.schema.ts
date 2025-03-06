import mongoose, { Schema, Document } from "mongoose";

// 🎓 Define an interface for Student Document
export interface IStudent extends Document {
    schoolId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    gender: "Male" | "Female" | "Other";
    guardian: {
        name: string;
        relation: string;
        contact: string;
    };
    enrollmentStatus: "Active" | "Graduated" | "Dropped";
    currentClass: {
        classId: mongoose.Types.ObjectId;
        sectionId?: mongoose.Types.ObjectId;
        year: number;
    };
    academicHistory: {
        classId: mongoose.Types.ObjectId;
        sectionId?: mongoose.Types.ObjectId;
        year: number;
        result: "Promoted" | "Failed" | "Repeated";
    }[];
    createdAt: Date;
}

// 🏫 Define Student Schema
const StudentSchema: Schema = new Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        phone: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },

        guardian: {
            name: { type: String, required: true },
            relation: { type: String, required: true },
            contact: { type: String, required: true },
        },

        enrollmentStatus: { type: String, enum: ["Active", "Graduated", "Dropped"], default: "Active" },

        currentClass: {
            classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
            sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
            year: { type: Number, required: true },
        },

        academicHistory: [
            {
                classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
                sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
                year: { type: Number, required: true },
                result: { type: String, enum: ["Promoted", "Failed", "Repeated"], required: true },
            },
        ],

        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// 📌 Export the Student model
export default mongoose.model<IStudent>("Student", StudentSchema);
