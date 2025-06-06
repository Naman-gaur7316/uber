import mongoose from "mongoose"

export const connectToDB = () => {
    mongoose
        .connect(process.env.DATABASE_URL || "")
        .then(() => console.log("connected to db"))
        .catch((err) => console.log(err));
}