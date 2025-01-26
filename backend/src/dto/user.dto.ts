import { z } from "zod";


const loginDto = z.object({
    username: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required" })
})


const signUpDto = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
    username: z.string({ required_error: "Username is required" }),
    password: z.string({ required_error: "Password is required" })
})


export { loginDto, signUpDto }