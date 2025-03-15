import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./db/db";
import indexRouter from "./routes";
// import indexRouter from "./routes";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// app.use("/api", indexRouter);
connectToDB();

app.use("/api/v1", indexRouter);

app.listen(port, () => {
    console.log("server is listening at port " + port)
})