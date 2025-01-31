import { Router } from "express";
import { changeTaskStatus, createComment, createTask, deleteTask, getAllComments, getTask } from "../controllers/task.controller";

const router = Router();


router.post("/", createTask)   // create the task

router.route("/:task_id/comment")
    .post(createComment) // to post a comment
    .get(getAllComments) // to get all the comments

router
    .route("/:project_id/:task_id")
    .get(getTask) // get the task with the comments
    .delete(deleteTask) // delete the task
    .patch(changeTaskStatus) // route to change status of the task



export default router