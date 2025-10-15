import express from "express";
import { createTeacherService, getAllTeachersService, getTeacherByIdService, updateTeacherService, deleteTeacherService } from "../services/teacher.service";
import authenticate from "../config/middleware/authenticate";

const router = express.Router();

router.post("/create", authenticate, createTeacherService);
router.get("/all", authenticate, getAllTeachersService);
router.get("/:id", authenticate, getTeacherByIdService);
router.put("/:id", authenticate, updateTeacherService);
router.delete("/:id", authenticate, deleteTeacherService);

export default router;