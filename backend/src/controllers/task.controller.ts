import { Response } from "express";
import { ProjectDocument, RequestWithUser, TaskDocument } from "../types";
import asyncHandler from "../utils/asyncHandler";
import { commentDto, createTaskDto } from "../dto/task.dto";
import ApiError from "../utils/ApiError";
import { stringToObjectId } from "../utils/functions";
import { Project } from "../models/Project.model";
import ApiResponse from "../utils/ApiResponse";
import { Task } from "../models/Task.model";
import { statusDto } from "../dto/project.dto";
import { Comment } from "../models/Comments.model";
import { User } from "../models/User.model";



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

export const changeTaskStatus = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const taskId = req.params.task_id
    const projectId = req.params.project_id
    const user_id = req.user._id

    //checking if the task exists with the given id and project
    const task = await Task.findOne({ _id: stringToObjectId(taskId), project: stringToObjectId(projectId) }).populate("project")

    if (!task) throw new ApiError(404, "Task not found")

    const project = task.project as ProjectDocument

    // checking if the user is authorized to change the status of the task
    if (project.owner?.toString() !== user_id) throw new ApiError(403, "You are not authorized to change the status of this task")

    const { status } = req.body

    //checking if the status is valid
    const result = statusDto.safeParse(status);

    if (!result.success) throw new ApiError(400, result.error.issues[0].message);

    //updating the project with the given id and owner
    await Task.findOneAndUpdate({ _id: stringToObjectId(taskId) }, { status })

    return res.status(200).json(new ApiResponse(200, "Task Status Updated"))

})


export const createComment = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const { task_id } = req.params
    const data = req.body
    const userId = req.user._id

    //checking if the task exists
    const task = await Task.findOne({ _id: stringToObjectId(task_id) })

    if (!task) throw new ApiError(404, "Task not found")

    //validating the data send by the user
    const result = commentDto.safeParse(data);


    if (!result.success) throw new ApiError(400, result.error.issues[0].message);

    //adding task to the comment
    data.task = task_id

    //checking if user exists or not
    const user = await User.findOne({ _id: stringToObjectId(userId) })

    if (!user) throw new ApiError(404, "User not found")

    // Adding the user in the request to the comment
    data.posted_by = req.user._id

    //creating the comment document
    const newComment = new Comment(data)

    //saving it in the db
    await newComment.save()

    return res.status(201).json(new ApiResponse(201, "Comment Posted"))

})

export const getAllComments = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const { task_id } = req.params

    //checking if the task exists
    const task = await Task.findOne({ _id: stringToObjectId(task_id) })

    if (!task) throw new ApiError(404, "Task not found")

    //getting all the comments of the task with latest first
    const comments = await Comment.find({ task: stringToObjectId(task_id) }).populate("posted_by").sort({ createdAt: -1 })

    return res.status(200).json(new ApiResponse(200, "Comments fetched successfully", comments))
})
