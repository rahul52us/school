// 📌 class.schema.ts
import mongoose, { Schema, Document } from "mongoose";

// Class Interface
export interface IClass extends Document {
    name: string;           // e.g., 5th Grade, 10th Grade
    section: string;        // e.g., A, B, C
    school: mongoose.Types.ObjectId;  // Reference to School
    students: mongoose.Types.ObjectId[]; // List of student IDs (from Student model)
    subjects: mongoose.Types.ObjectId[]; // List of subjects IDs (from Subject model)
    createdAt: Date;
}

const ClassSchema: Schema = new Schema(
    {
        name: { type: String, required: true },        // Class Name, e.g., 5th, 10th
        section: { type: String, required: true },     // Section Name, e.g., A, B, C
        school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },  // Reference to School Model
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],  // Array of Students
        subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }], // Array of Subjects
        createdAt: { type: Date, default: Date.now },  // Automatically set created date
    },
    { timestamps: true }  // Optional: Automatically adds createdAt and updatedAt fields
);

export default mongoose.model<IClass>("Class", ClassSchema);
