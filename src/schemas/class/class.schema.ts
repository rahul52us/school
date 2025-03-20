import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  name: string;
  section: string;
  grade: string;
  schoolId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  students: mongoose.Types.ObjectId[];
  subjects: { name: string; teacher: mongoose.Types.ObjectId }[];
  classTeacher: mongoose.Types.ObjectId;
  schedule: { day: string; startTime: string; endTime: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    section: { type: String, required: true, trim: true },
    grade: { type: String, required: true, trim: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    subjects: [{ name: { type: String, required: true, trim: true }, teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true } }],
    classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    schedule: [{ day: { type: String, required: true }, startTime: { type: String, required: true }, endTime: { type: String, required: true } }]
  },
  { timestamps: true }
);

export default mongoose.model<IClass>("Class", ClassSchema);
