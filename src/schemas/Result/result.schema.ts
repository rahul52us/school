import mongoose, { Schema, Document } from "mongoose";

// ✅ Exam Interface
export interface IExam extends Document {
    classId: mongoose.Types.ObjectId;
    subjectId: mongoose.Types.ObjectId;
    examDate: Date;
    totalMarks: number;
}

// ✅ Exam Schema
const ExamSchema: Schema = new Schema({
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    examDate: { type: Date, required: true },
    totalMarks: { type: Number, required: true }
}, { timestamps: true });

// ✅ Result Interface
export interface IResult extends Document {
    studentId: mongoose.Types.ObjectId;
    examId: mongoose.Types.ObjectId;
    marksObtained: number;
}

// ✅ Result Schema
const ResultSchema: Schema = new Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    marksObtained: { type: Number, required: true }
});

// ✅ Single Export Object
const Exam = mongoose.model<IExam>("Exam", ExamSchema);
const Result = mongoose.model<IResult>("Result", ResultSchema);

export { Exam, Result };
