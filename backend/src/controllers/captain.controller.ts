import { Request, Response } from "express";
import Captain from "../models/captain.model";
import { AuthRequest } from "../types/types";
import BlacklistModel from "../models/blackListToken.model";


export async function captainSignup(req: Request, res: Response): Promise<any> {
    try {
        const {firstname, lastname, email,password, vehicleColor, vehiclePlate, vehicleCapacity, vehicleType} = req.body;

        const existingCaptain = await Captain.findOne({ email });
        if(existingCaptain){
            return res.status(400).json({error: "Email already exists"});
        }

        const hashedPassword = await Captain.hashPassword(password);

        const captain = await Captain.create({
            fullname: {firstname, lastname},
            email,
            password: hashedPassword,
            vehicle: {color: vehicleColor, plate: vehiclePlate, capacity: vehicleCapacity, vehicleType}
        })

        const token = captain.generateAuthToken();
        return res.status(201).json({token, captain});
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export async function captainLogin(req: Request, res: Response): Promise<any> {
    try {
        const { email, password } = req.body;

        const existingCaptain = await Captain.findOne({ email }).select("+password");
        if (!existingCaptain) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await existingCaptain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = existingCaptain.generateAuthToken();
        return res.status(201).json({ token, existingCaptain });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function getCaptainProfile(req: AuthRequest, res: Response): Promise<any> {
    try {
        const captain = req.captain;
        return res.status(200).json({ captain });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function captainLogout(req: AuthRequest, res: Response): Promise<any> {
    try {
        res.clearCookie("token");
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        await BlacklistModel.create({ token });
        return res.status(200).json({ message: "Logout Successful" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}