import { Request } from "express"
import mongoose from "mongoose";

export interface RequestWithUser extends Request {
    user?: any
}

export enum STATUS {
    TODO = "TODO",
    IN_PROGRESS = "IN PROGRESS",
    DONE = "DONE"
}

export interface ProjectDocument extends mongoose.Document {
    collection_name: string;
    project_name: string;
    owner: mongoose.Schema.Types.ObjectId | UserDocument;
    status: STATUS;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    tasks: mongoose.Schema.Types.ObjectId[];
}

export interface TaskDocument extends mongoose.Document {
    task_name: string;
    description: string;
    project: mongoose.Schema.Types.ObjectId | ProjectDocument;
    status: STATUS;
    createdAt: Date;
    updatedAt: Date;
}

export interface CommentDocument extends mongoose.Document {
    task: mongoose.Schema.Types.ObjectId | TaskDocument;
    posted_by: mongoose.Schema.Types.ObjectId | UserDocument;
    message: string;
}


export interface UserDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    hashPassword(): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
}


