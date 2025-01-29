import { NextFunction, Response } from "express";
import { RequestWithUser } from "../types";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { decodeJwtToken } from "../utils/jwtService";



export const authorizeUser = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
        throw new ApiError(401, "Invalid access token");
    }

    const decodedToken = decodeJwtToken(accessToken);

    if (!decodedToken) {
        throw new ApiError(401, "Invalid access token");
    }

    req.user = decodedToken;
    next()
})