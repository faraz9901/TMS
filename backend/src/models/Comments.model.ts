import mongoose from "mongoose";
import { CommentDocument } from "../types";

const commentSchema = new mongoose.Schema<CommentDocument>({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },

    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    message: {
        type: String,
        required: true
    },
}, { timestamps: true });


export const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);