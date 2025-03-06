import express from "express";
import { createExam, getExams } from "../controllers/examController";  // ✅ Correct relative path


const router = express.Router();

// Create an exam
router.post("/", createExam);

// Get all exams
router.get("/", getExams);

export default router;
