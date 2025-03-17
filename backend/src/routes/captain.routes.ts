import express from "express";
import { validate } from "../middlewares/validate";
import { captainLoginSchema, captainSignupSchema } from "../validations/captain.validation";
import { captainLogin, captainLogout, captainSignup, getCaptainProfile } from "../controllers/captain.controller";
import { authCaptainMiddleware } from "../middlewares/auth";


const captainRouter = express.Router();

captainRouter.post("/signup", validate(captainSignupSchema), captainSignup)
captainRouter.post("/login", validate(captainLoginSchema), captainLogin)
captainRouter.get("/profile", authCaptainMiddleware, getCaptainProfile);
captainRouter.get("/logout", authCaptainMiddleware, captainLogout);

export default captainRouter;