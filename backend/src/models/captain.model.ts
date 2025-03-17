import mongoose, { Schema } from "mongoose";
import { ICaptain, ICaptainModel } from "../types/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new Schema<ICaptain>({
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
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  socketId: { type: String, default: null },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, "Plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      enum: ["car", "motorcycle", "auto"],
      required: true,
    },
  },
  location: {
    lat: {
        type: Number,
        default: null,
    },
    lng: {
        type: Number,
        default: null,
    }
  }
});


captainSchema.methods.generateAuthToken = function (): string {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, { expiresIn: "2h" });
};

captainSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// Static method
captainSchema.statics.hashPassword = async function (password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
};

const Captain = mongoose.model<ICaptain, ICaptainModel>("Captain", captainSchema);

export default Captain;