import mongoose, { Schema } from "mongoose";
import { IBlacklistedToken } from "../../types";

const blackListTokenSchema = new Schema<IBlacklistedToken>({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 7200, // time in seconds
    },
});

const BlacklistModel = mongoose.model<IBlacklistedToken>("Blacklist", blackListTokenSchema);

export default BlacklistModel;