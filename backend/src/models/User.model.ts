import mongoose from "mongoose";
import * as argon2d from "argon2";

interface UserDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    hashPassword(): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
}

const userSchema: mongoose.Schema<UserDocument> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });


userSchema.methods.hashPassword = async function () {
    this.password = await argon2d.hash(this.password);
};

userSchema.methods.comparePassword = async function (password: string) {
    return await argon2d.verify(this.password, password);
};


export const User = mongoose.model<UserDocument>("User", userSchema);