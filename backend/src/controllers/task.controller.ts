import { Response } from "express";
import { ProjectDocument, RequestWithUser, TaskDocument } from "../types";
import asyncHandler from "../utils/asyncHandler";
import { createTaskDto } from "../dto/task.dto";
import ApiError from "../utils/ApiError";
import { stringToObjectId } from "../utils/functions";
import { Project } from "../models/Project.model";
import ApiResponse from "../utils/ApiResponse";
import { Task } from "../models/Task.model";



export const createTask = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const data = req.body

    // Validate the data send by the user
    const result = createTaskDto.safeParse(data);

    if (!result.success) throw new ApiError(400, result.error.issues[0].message);

    // Checking if the project exists and belongs to the user
    const project = await Project.findOne({ _id: stringToObjectId(data.project), owner: stringToObjectId(req.user._id) })

    if (!project) throw new ApiError(404, "Project not found")

    //  Creating the task document
    const newTask = new Task(data)

    //  Saving it in the db 
    await newTask.save()

    return res.status(201).json(new ApiResponse(201, "Task created successfully"))
})


export const deleteTask = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const { task_id, project_id } = req.params

    // Checking if the task exists   
    const task: TaskDocument | null = await Task.findOne({ _id: stringToObjectId(task_id), project: stringToObjectId(project_id) }).populate("project")

    if (!task) throw new ApiError(404, "Task not found")

    const project = task.project as ProjectDocument

    //checking if the user is the owner of the project
    if (project.owner?.toString() !== req.user._id) throw new ApiError(403, "You are not authorized to delete this task")

    //  Deleting the task with the given id
    await Task.findOneAndDelete({ _id: stringToObjectId(task_id) })

    return res.status(200).json(new ApiResponse(200, "Task deleted successfully"))
})


export const getTask = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const { task_id, project_id } = req.params

    // Checking if the task exists
    const task: TaskDocument | null = await Task.findOne({ _id: stringToObjectId(task_id), project: stringToObjectId(project_id) }).populate("project")

    if (!task) throw new ApiError(404, "Task not found")

    return res.status(200).json(new ApiResponse(200, "Task fetched successfully", task))
})

