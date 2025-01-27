import { z } from "zod";


const loginDto = z.object({
    username: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
})


const signUpDto = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
    username: z.string({ required_error: "Username is required" }),
    password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
})

const emailVerificationDto = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
})


export { loginDto, signUpDto, emailVerificationDto }