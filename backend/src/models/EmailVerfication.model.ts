import mongoose from "mongoose";

const emailVerificatonSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    token: {
        type: String,
        required: true,
        unique: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 10, // This document will be deleted after 10 minutes 
    },
});


export const EmailVerification = mongoose.model("EmailVerification", emailVerificatonSchema);