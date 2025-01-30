import { Router } from "express";
import { authorizeUser } from "../middlewares/authorizeUser";
import { changeProjectStatus, createProject, deleteProject, getProject, getUserOwnedProjects, updateProject } from "../controllers/project.controller";


const router = Router();

// Post route for creating a project 
// Get route for getting all the projects
router
    .route("/")
    .post(createProject)
    .get(getUserOwnedProjects)

router
    .route("/:id") // route
    .get(getProject)
    .delete(deleteProject)
    .put(updateProject)
    .patch(changeProjectStatus)

export default router