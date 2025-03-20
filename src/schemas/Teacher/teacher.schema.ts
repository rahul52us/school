import mongoose, { Schema, Document } from "mongoose";

export interface ITeacher extends Document {
    name: string;
    email: string;
    phone: string;
    subjects: string[];
    assignedClasses: mongoose.Types.ObjectId[]; // Reference to Class schema
    schoolId: mongoose.Types.ObjectId; // Reference to School schema
    createdBy: mongoose.Types.ObjectId; // Who added this teacher
    createdAt: Date;
    updatedAt: Date;
}

const TeacherSchema: Schema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        phone: { type: String, required: true, unique: true, trim: true },
        subjects: [{ type: String, required: true }], // Example: ["Math", "Science"]
        assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true } // Adds createdAt and updatedAt
);

export default mongoose.model<ITeacher>("Teacher", TeacherSchema);
