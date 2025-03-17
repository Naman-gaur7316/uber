import express from "express"
import userRouter from "./user.routes";
import captainRouter from "./captain.routes";

const indexRouter = express.Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/captain", captainRouter);

export default indexRouter;