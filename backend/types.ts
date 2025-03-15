import { Request } from "express";
import { Document, Model } from "mongoose";

export interface AuthRequest extends Request {
    user?: IUser;
}


export interface IUser extends Document {
    fullname: {
        firstname: string;
        lastname?: string;
    };
    email: string;
    password: string;
    socketId?: string;
    generateAuthToken(): string;
    comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
    hashPassword(password: string): Promise<string>;
}

export interface IBlacklistedToken extends Document {
    token: string;
    createdAt: Date;
  }