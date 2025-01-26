import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import ApiError from "./utils/ApiError";

const app = express();

app.use(express.json())

app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use("/api/v1/user", userRoutes)


// Error handler
app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        success: err.success,
        message: err.message
    });
});




export default app 