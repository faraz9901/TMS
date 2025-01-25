import { NextFunction, Request, Response } from "express"

const asyncHandler = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await fn(req, res, next)
    } catch (error) {
        next(error)
    }
}

export default asyncHandler