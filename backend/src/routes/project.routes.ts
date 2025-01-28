import { Router } from "express";
import { authorizeUser } from "../middlewares/authorizeUser";
import { createProject } from "../controllers/project.controller";


const router = Router();



router.post("/", authorizeUser, createProject)

export default router