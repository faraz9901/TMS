import mongoose from "mongoose";
import { ProjectDocument, STATUS } from "../types";

const projectSchema: mongoose.Schema<ProjectDocument> = new mongoose.Schema({
    collection_name: {
        type: String,
        required: true,
    },
    project_name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: STATUS.TODO,
        enum: [STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const Project = mongoose.model<ProjectDocument>("Project", projectSchema);