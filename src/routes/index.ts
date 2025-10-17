// importRoutings.ts

import SchoolRouter from "./school.route";
import classRoutes from "./class.routes";
import superAdminRouter from "./superadmin.routes";
import authRouter from "./auth.routes";

const importRoutings = (app: any) => {
    app.use("/api/auth", authRouter);
    app.use("/api/superadmin", superAdminRouter);
    app.use("/api/school", SchoolRouter);
    app.use("/api/classes", classRoutes);
    // app.use("/api/teachers", teacherRouter);
    // app.use("/api/students", studentRouter);
};

export default importRoutings;