import { Router } from "express";
import { authorizeUser } from "../middlewares/authorizeUser";
import { createProject, getProjects } from "../controllers/project.controller";


const router = Router();

// Post route for creating a project 
// Get route for getting all the projects
router
    .post("/", authorizeUser, createProject)
    .get("/", authorizeUser, getProjects)

export default router