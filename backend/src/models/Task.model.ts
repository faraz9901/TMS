import mongoose from "mongoose";

interface TaskDocument extends mongoose.Document {
    task_name: string;
    description: string;
    status: string;
    priority: string;
    due_date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema: mongoose.Schema<TaskDocument> = new mongoose.Schema({
    task_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

export const Task = mongoose.model<TaskDocument>("Task", taskSchema);