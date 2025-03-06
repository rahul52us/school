import { Express } from "express";
import UserRouter from "./auth.routes";
import ExamRouter from "./exam.routes"; // Exam-related routes
// import QuestionRouter from "./question.routes"; // Questions API
// import ResultRouter from "./result.routes"; // Results API
// import StudentRouter from "./student.routes"; // Student API

const importRoutings = (app: Express) => {
    app.use("/api/auth", UserRouter);   // Authentication Routes
    app.use("/api/exams", ExamRouter);  // Exams API
    // app.use("/api/questions", QuestionRouter);  // Questions API
    // app.use("/api/results", ResultRouter);  // Results API
    // app.use("/api/students", StudentRouter);  // Students API
};

export default importRoutings;
