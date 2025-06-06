import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/types";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import BlacklistModel from "../models/blackListToken.model";
import Captain from "../models/captain.model";

type JwtPayload = {
    id: string;
}

const authUserMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "") || "";
        // console.log("Token:", token);
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const blackListedToken = await BlacklistModel.findOne({ token });
    if (blackListedToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = (jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload);

    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
    } catch (error) {
        console.log("Auth Middleware Error:", error);
        return res.status(401).json({ error: "Unauthorized" });
    }
};

export const authCaptainMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "") || "";
        // console.log("Token:", token);
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const blackListedToken = await BlacklistModel.findOne({ token });
    if (blackListedToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = (jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload);

    const captain = await Captain.findById(decoded.id);
    if (!captain) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    req.captain = captain;
    next();
    } catch (error) {
        console.log("Auth Middleware Error:", error);
        return res.status(401).json({ error: "Unauthorized" });
    }
};

export default authUserMiddleware;