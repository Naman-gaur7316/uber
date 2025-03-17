import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import { IUser, IUserModel } from "../types/types";


const userSchema = new Schema<IUser>({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [4, "First name must be at least 4 characters long"],
        },
        lastname: {
            type: String,
            minLength: [4, "Last name must be at least 4 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    socketId: { type: String, default: null }
});

// Instance methods
userSchema.methods.generateAuthToken = function (): string {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, { expiresIn: "2h" });
};

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// Static method
userSchema.statics.hashPassword = async function (password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;