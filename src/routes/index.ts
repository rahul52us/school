import { Express } from "express";
import UserRouter from "./auth.routes";
import ExamRouter from "./exam.routes"; // Exam-related routes
// import QuestionRouter from "./question.routes"; // Questions API
// import ResultRouter from "./result.routes"; // Results API
import StudentRouter from "./student.route"; // Student API
// import SchoolRouter from "./school.route"; // ✅ School API added
import classRoutes from "./class.routes";


const importRoutings = (app: Express) => {
    // app.use("/api/auth", UserRouter);   // Authentication Routes
    // app.use("/api/students", StudentRouter);  // Students API
    // app.use("/api/exams", ExamRouter);  // Exams API
    // app.use('/api/schools', SchoolRouter);
    app.use('/api/classes', classRoutes);
    // app.use("/api/results", ResultRouter);  // Results API
};

export default importRoutings;
