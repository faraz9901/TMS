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
