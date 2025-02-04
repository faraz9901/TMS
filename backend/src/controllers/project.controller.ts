import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { RequestWithUser } from "../types";
import { createProjectDto, statusDto } from "../dto/project.dto";
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


export const getUserOwnedProjects = asyncHandler(async (req: RequestWithUser, res: Response) => {


    const query: any = {
        owner: stringToObjectId(req.user._id)  //  base query to get all the projects of the user
    }

    // checking if the user is sending some query parameters to search for projects
    const search = req.query?.search?.toString()?.trim() || ""

    if (search) { // checking if search is not empty
        const searchregex = new RegExp(search, "i") // i means case insensitive
        query.$or = [{ project_name: searchregex }, { collection_name: searchregex }] // adding the search query to the base query 
    }

    //getting all the projects of the user and grouping them based on the collections 
    const collections = await Project.aggregate([
        { $match: query },  // matching the query
        { $group: { _id: "$collection_name", projects: { $push: "$$ROOT" } } },  // grouping the projects based on the collections
        { $project: { _id: 0, name: "$_id", projects: 1 } }, // projecting the collection name as name and  projects as projects
        { $sort: { name: 1 } } // sorting the collections in alphabetical order
    ]);

    return res.status(200).json(new ApiResponse(200, "Projects fetched successfully", collections))
})


export const deleteProject = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const { id: projectId } = req.params
    const { _id: userId } = req.user

    //checking if the project exists
    const project = await Project.findOne({ _id: stringToObjectId(projectId), owner: stringToObjectId(userId) })

    if (!project) throw new ApiError(404, "Project not found")

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

    //getting the project with the given id and the tasks of the project
    const [project] = await Project.aggregate([  // as aggreate returns an array always the first element is the document
        { $match: { _id: stringToObjectId(projectId) } },
        { $lookup: { from: "tasks", localField: "_id", foreignField: "project", as: "tasks" } },
    ])

    if (!project) throw new ApiError(404, "Project not found")

    return res.status(200).json(new ApiResponse(200, "Project fetched successfully", project)) // 
})


export const changeProjectStatus = asyncHandler(async (req: RequestWithUser, res: Response) => {

    const projectId = req.params.id
    const user_id = req.user._id

    //checking if the project exists
    const project = await Project.findOne({ _id: stringToObjectId(projectId), owner: stringToObjectId(user_id) })

    if (!project) throw new ApiError(404, "Project not found")


    const { status } = req.body

    //checking if the status is valid
    const result = statusDto.safeParse(status);

    if (!result.success) throw new ApiError(400, result.error.issues[0].message);

    //updating the project with the given id and owner
    await Project.findOneAndUpdate({ _id: stringToObjectId(projectId), owner: stringToObjectId(user_id) }, { status })

    return res.status(200).json(new ApiResponse(200, "Project updated successfully"))

})
