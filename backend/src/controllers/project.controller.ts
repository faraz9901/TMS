import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { RequestWithUser } from "../types";
import { createProjectDto } from "../dto/project.dto";
import ApiError from "../utils/ApiError";
import { Project } from "../models/Project.model";
import ApiResponse from "../utils/ApiResponse";
import { stringToObjectId } from "../utils/functions";

export const createProject = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const data = req.body

    // Validate the data send by the user
    const validation = createProjectDto.safeParse(data);

    if (!validation.success) {
        throw new ApiError(400, validation.error.issues[0].message);
    }

    // Adding the owner with the user in the request
    data.owner = req.user._id

    //creating the project document
    const newProject = new Project(data)

    //saving it in the db
    await newProject.save()

    //sending the response
    res.status(201).json(new ApiResponse(201, "Project created successfully", newProject))
})


export const getProjects = asyncHandler(async (req: RequestWithUser, res: Response) => {

    //getting all the projects of the user and grouping them based on the collections
    const collections = await Project.aggregate([
        { $match: { owner: stringToObjectId(req.user._id) } },
        { $group: { _id: "$collection_name", projects: { $push: "$$ROOT" } } },
        { $project: { _id: 0, name: "$_id", projects: 1 } }
    ]);

    return res.status(200).json(new ApiResponse(200, "Projects fetched successfully", collections))
})


export const deleteProject = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const { id: projectId } = req.params
    const { _id: userId } = req.user

    //deleting the project with the given id and owner
    await Project.findOneAndDelete({ _id: stringToObjectId(projectId), owner: stringToObjectId(userId) })

    return res.status(200).json(new ApiResponse(200, "Project deleted successfully"))
})

export const updateProject = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const { id: projectId } = req.params
    const { _id: userId } = req.user

    const validation = createProjectDto.safeParse(req.body);

    // Validation failed
    if (!validation.success) {
        throw new ApiError(400, validation.error.issues[0].message);
    }

    //checking if the project exists
    const project = await Project.findOne({ _id: stringToObjectId(projectId), owner: stringToObjectId(userId) })

    if (!project) throw new ApiError(404, "Project not found")

    //updating the project with the given id and owner
    await Project.findOneAndUpdate({ _id: stringToObjectId(projectId), owner: stringToObjectId(userId) }, req.body)

    return res.status(200).json(new ApiResponse(200, "Project updated successfully"))
})

export const getProject = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const { id: projectId } = req.params
    const { _id: userId } = req.user

    //getting the project with the given id and owner
    const project = await Project.findOne({ _id: stringToObjectId(projectId), owner: stringToObjectId(userId) })

    return res.status(200).json(new ApiResponse(200, "Project fetched successfully", project))
})

