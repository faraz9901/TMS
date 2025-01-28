import mongoose from "mongoose"

export const stringToObjectId = (id: string) => {
    return new mongoose.Types.ObjectId(id)
}