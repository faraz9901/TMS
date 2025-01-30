import mongoose from "mongoose";
import { STATUS, TaskDocument } from "../types";

const taskSchema: mongoose.Schema<TaskDocument> = new mongoose.Schema({
    task_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: [STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE],
    },
}, { timestamps: true });

export const Task = mongoose.model<TaskDocument>("Task", taskSchema);