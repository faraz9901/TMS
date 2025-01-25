import { z } from "zod";


const loginDto = z.object({
    email: z
        .string({
            required_error: "email is required",
        })
        .email({
            message: "Invalid email",
        }),
    password: z.
        string({
            required_error: "password is required",
        })
})



export { loginDto }