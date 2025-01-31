import { Router } from "express";
import { createTask, deleteTask, getTask } from "../controllers/task.controller";

const router = Router();


router.post("/", createTask)


router
    .route("/:project_id/:task_id")
    .get(getTask)
    .delete(deleteTask)

export default router