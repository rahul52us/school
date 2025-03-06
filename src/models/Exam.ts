import mongoose, { Schema, Document } from "mongoose";

// Define the Exam interface
interface IExam extends Document {
  classId: string;
  subjectId: string;
  examDate: Date;
  totalMarks: number;
}

// Define the Exam schema
const ExamSchema = new Schema<IExam>({
  classId: { type: String, required: true },
  subjectId: { type: String, required: true },
  examDate: { type: Date, required: true },
  totalMarks: { type: Number, required: true }
});

// Create the model
const Exam = mongoose.model<IExam>("Exam", ExamSchema);

export default Exam;
