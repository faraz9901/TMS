import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { loginDto, signUpDto } from "../dto/user.dto";
import ApiResponse from "../utils/ApiResponse";
import { User } from "../models/User.model";

export const loginUser = asyncHandler(async (req: Request, res: Response) => {

    // Validating the user data
    const result = loginDto.safeParse(req.body);

    // If the user data is not valid
    if (!result.success) throw new ApiError(400, result.error.issues[0].message);

    // check if the user exists
    const user = await User.findOne({ email: result.data.email })

    // if user does not exist
    if (!user) throw new ApiError(400, "User does not exist");


    res.status(200).json(new ApiResponse(200, "User Logged In", result.data));

})


export const signUpUser = asyncHandler(async (req: Request, res: Response) => {

    // Validating the user data
    const result = signUpDto.safeParse(req.body);

    // If the user data is not valid    
    if (!result.success) {
        throw new ApiError(400, result.error.issues[0].message);
    }

    // check if the user already exists with either email or username
    const user = await User.findOne({
        $or: [
            { email: result.data.email },
            { username: result.data.username }
        ]
    });

    if (user) {
        throw new ApiError(400, "User already exists with either email or username");
    }

    // create the user if it doesn't exist
    const newUser = await User.create(result.data);

    res.status(201).json(new ApiResponse(201, "User Signed Up", newUser));

})