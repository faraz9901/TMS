import { NextFunction, Request, Response } from "express"

const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
        return fn(req, res, next)
    } catch (error) {
        next(error)
    }
}

export default asyncHandler