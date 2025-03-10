import express from "express";
import {
    createSchoolService,
    getAllSchoolsService,
    getSchoolByIdService,
    updateSchoolService,
    deleteSchoolService
} from "../services/school.service";
import authenticate from "../config/middleware/authenticate";

const router = express.Router();

router.post("/create", authenticate, createSchoolService);
router.get("/all", authenticate, getAllSchoolsService);
router.get("/:id", authenticate, getSchoolByIdService);
router.put("/:id", authenticate, updateSchoolService);
router.delete("/:id", authenticate, deleteSchoolService);

export default router;
