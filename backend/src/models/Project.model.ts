import mongoose from "mongoose";

interface ProjectDocument extends mongoose.Document {
    collection_name: string;
    project_name: string;
    owner: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    tasks: mongoose.Schema.Types.ObjectId[];
}

const projectSchema: mongoose.Schema<ProjectDocument> = new mongoose.Schema({
    collection_name: {
        type: String,
        required: true,
    },
    project_name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    }]
}, { timestamps: true });

export const Project = mongoose.model<ProjectDocument>("Project", projectSchema);