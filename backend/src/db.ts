import mongoose from "mongoose";

const URL = process.env.MONGODB_URL || "mongodb://localhost:27017/task-management";
const connectToDB = async () => {
    try {
        await mongoose.connect(URL);
    } catch (error) {
        throw new Error("Failed to connect to MongoDB");
    }
};

export default connectToDB;