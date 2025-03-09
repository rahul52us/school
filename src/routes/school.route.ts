import express from "express";
import { registerSchool } from "../controllers/school.controller";

const router = express.Router();

router.post("/register", registerSchool);

export default router;
