import { Express } from "express";
import UserRouter from "./auth.routes";
import ExamRouter from "./exam.routes"; 
import StudentRouter from "./student.route";  
import SchoolRouter from "./school.route"; // ✅ School API imported
import classRoutes from "./class.routes";

const importRoutings = (app: Express) => {
    // app.use("/api/auth", UserRouter);   // Authentication Routes
    // app.use("/api/students", StudentRouter);  // Students API
    // app.use("/api/exams", ExamRouter);  // Exams API
    app.use('/api/schools', SchoolRouter);  // ✅ Uncommented School Route
    app.use('/api/classes', classRoutes);
    // app.use("/api/results", ResultRouter);  // Results API
};


export default importRoutings;
