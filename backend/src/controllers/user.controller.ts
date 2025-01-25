import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { loginDto } from "../dto/user.dto";
import ApiResponse from "../utils/ApiResponse";

export const loginUser = asyncHandler((req: Request, res: Response) => {

    // Validating the user data
    const result = loginDto.safeParse(req.body);

    // If the user data is not valid
    if (!result.success) {
        throw new ApiError(500, result.error.issues[0].message);
    }

    const { email, password } = result.data;


    res.status(200).json(new ApiResponse(200, "User Logged In", result.data));

})