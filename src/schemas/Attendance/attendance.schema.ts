import mongoose, { Schema, Document } from "mongoose";

// 🎓 Define Attendance Interface
export interface IAttendance extends Document {
    studentId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
    sectionId?: mongoose.Types.ObjectId;
    date: Date;
    status: "Present" | "Absent" | "Leave";
    recordedAt: Date;
}

// 📝 Define Attendance Schema
const AttendanceSchema: Schema = new Schema(
    {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },

        date: { type: Date, required: true },
        status: { type: String, enum: ["Present", "Absent", "Leave"], required: true },

        recordedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// 📌 Export the Attendance Model
export default mongoose.model<IAttendance>("Attendance", AttendanceSchema);
