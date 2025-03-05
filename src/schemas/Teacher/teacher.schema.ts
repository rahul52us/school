import mongoose, { Schema, Document } from "mongoose";

export interface ITeacher extends Document {
    schoolId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    gender: "Male" | "Female" | "Other";
    dateOfBirth: Date;
    qualification: string;
    subjects: mongoose.Types.ObjectId[];  // Subjects handled by teacher
    classesAssigned: {
        classId: mongoose.Types.ObjectId;
        sectionId?: mongoose.Types.ObjectId;
    }[];
    joiningDate: Date;
    employmentStatus: "Active" | "Resigned" | "Retired";
    createdAt: Date;
}

const TeacherSchema: Schema = new Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        phone: { type: String, required: true },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
        dateOfBirth: { type: Date, required: true },
        qualification: { type: String, required: true },

        subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }], // Teacher handles these subjects

        classesAssigned: [
            {
                classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
                sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section" }
            }
        ],

        joiningDate: { type: Date, required: true },
        employmentStatus: { type: String, enum: ["Active", "Resigned", "Retired"], default: "Active" },

        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export default mongoose.model<ITeacher>("Teacher", TeacherSchema);
