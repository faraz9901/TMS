import { Router } from "express";
import { changeProjectStatus, createProject, deleteProject, getProject, getUserOwnedProjects, updateProject } from "../controllers/project.controller";


const router = Router();

router
    .route("/")
    .post(createProject) //create the project
    .get(getUserOwnedProjects)  // to get all the projects owned by the user as collections array

router
    .route("/:id") // route
    .get(getProject) // to get the project with their tasks
    .delete(deleteProject) // to delete the project
    .put(updateProject) // to update the project
    .patch(changeProjectStatus) // to change the status of the project

export default router