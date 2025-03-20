import express from "express";
import { 
    createClassService, 
    getAllClassesService, 
    getClassByIdService, 
    updateClassService, 
    deleteClassService 
} from "../services/class.service";
import authenticate from "../config/middleware/authenticate";

const router = express.Router();

router.post("/create", authenticate, createClassService);
router.get("/all", authenticate, getAllClassesService);
router.get("/:id", authenticate, getClassByIdService);
router.put("/:id", authenticate, updateClassService);
router.delete("/:id", authenticate, deleteClassService);

export default router;
