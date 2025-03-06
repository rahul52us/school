import { Request, Response } from "express";
import Exam from "../models/Exam";

// Create a new exam
export const createExam = async (req: Request, res: Response) => {
    try {
        const { classId, subjectId, examDate, totalMarks } = req.body;

        const newExam = new Exam({ classId, subjectId, examDate, totalMarks });
        await newExam.save();

        res.status(201).json({ message: "Exam created successfully", newExam });
    } catch (error) {
        res.status(500).json({ error: "Failed to create exam" });
    }
};

// Get all exams
export const getExams = async (_req: Request, res: Response) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch exams" });
    }
};
