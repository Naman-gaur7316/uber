import express from "express";
import { loginSchema, userSignupSchema } from "../validations/user.validation";
import { getUserProfile, userLogin, userLogout, userSignup } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import authMiddleware from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/signup", validate(userSignupSchema), userSignup);
userRouter.post("/login", validate(loginSchema), userLogin);
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.get("/logout", authMiddleware, userLogout);


export default userRouter;