import express from "express";
import { createSchoolService } from "../services/school.service";
import authenticate from "../config/middleware/authenticate";

const router = express.Router();

router.post("/create", authenticate, createSchoolService);

export default router;
