import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes";
import ApiError from "./utils/ApiError";

const app = express();

app.use(express.json())

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(cookieParser())

app.use("/api/v1/user", userRoutes)

app.use("/api/v1/projects", projectRoutes)


// Error handler
app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,
        success: false,
        message: err.message || "Something went wrong",
    });
});




export default app 