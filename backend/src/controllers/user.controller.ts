import { Request, Response } from "express";
import User from "../models/user.model";
import { AuthRequest } from "../types/types";
import BlacklistModel from "../models/blackListToken.model";

export async function userSignup(req: Request, res: Response): Promise<any> {
    try {
        const { firstname, lastname, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await User.hashPassword(password);

        const user = await User.create({
            fullname: { firstname, lastname },
            email,
            password: hashedPassword,
        });

        const token = user.generateAuthToken();
        // console.log("inside userSignup:", token);

        return res.status(201).json({ token, user });
    } catch (error) {
        // console.error("Signup Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function userLogin(req: Request, res: Response): Promise<any> {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await existingUser.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = existingUser.generateAuthToken();
        return res.status(201).json({ token, existingUser });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getUserProfile(req: AuthRequest, res: Response): Promise<any> {
    try {
        const user = req.user;
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function userLogout(req: AuthRequest, res: Response): Promise<any> {
    try {
        res.clearCookie("token");
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        await BlacklistModel.create({ token });
        return res.status(200).json({ message: "Logout Successful" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}