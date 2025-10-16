import express from "express";
import {
  createSuperAdminService,
  getAllSuperAdminsService,
  getSuperAdminByIdService,
  updateSuperAdminService,
  deleteSuperAdminService,
} from "../services/superadmin.service";
import authenticate from "../config/middleware/authenticate";

const router = express.Router();

router.post("/create", authenticate, createSuperAdminService);
router.get("/all", authenticate, getAllSuperAdminsService);
router.get("/:id", authenticate, getSuperAdminByIdService);
router.put("/:id", authenticate, updateSuperAdminService);
router.delete("/:id", authenticate, deleteSuperAdminService);

export default router;