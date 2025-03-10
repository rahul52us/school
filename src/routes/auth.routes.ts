import express from "express";
import {
  createAdminUser,
  getUserDetailsByIdService,
  loginUser,
  verifyLoginUser,
  verifySignUpUser,
} from "../services/user.service";
import authenticate from "../config/middleware/authenticate";

const authRouter = express.Router();

authRouter.post("/admin/signup", createAdminUser);
authRouter.post("/admin/signup/verify", verifySignUpUser);
authRouter.post("/login", loginUser);
authRouter.post("/login/verify", verifyLoginUser);
authRouter.get("/me", authenticate, getUserDetailsByIdService);

export default authRouter;
