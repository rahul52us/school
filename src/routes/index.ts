import SchoolRouter from "./school.route";
import classRoutes from "./class.routes";
import authRouter from "./auth.routes";

const importRoutings = (app: any) => {
    app.use("/api/auth", authRouter);   // Authentication Routes

    // app.use("/api/students", StudentRouter);  // Students API
    // app.use("/api/exams", ExamRouter);  // Exams API
    app.use('/api/school', SchoolRouter); //
    app.use('/api/classes', classRoutes);
    // app.use("/api/results", ResultRouter);  // Results API
};


export default importRoutings;
